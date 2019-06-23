ui.order = ui.legacy(function () {
    "use strict";

    // -> /order?Response=000&ConfirmationCode=1&index=2&amount=3.00&firstname=foo&lastname=bar&email=a@b.com&phone=0&payfor=product&custom=dXRt...&orderid=1
    var endpoint = (function () {
            var parts = location.hostname.split(".");

            while (parts.length > 2) {
                parts.shift();
            }

            return "https://lab." + parts.join(".") + "/webhook";
        }()),
        wrapper = ui.d.querySelector(".table.scale"),
        status = ui.d.getElementById("status"),
        events = {},
        locale = {},
        generateLayout,
        unfilledForm,
        transaction,
        controller,
        onlyFetch,
        session,
        hash;

    locale.toContact = " לשאלות אנא <a href=/contact>צרי קשר</a>";

    Object.assign(locale, {
        notFound: "הזמנה זו לא נמצאה." + locale.toContact,
        notPermitted: "פעולה לא מאושרת." + locale.toContact,
        networkError: "ישנה תקלה בשרת." + locale.toContact,
        networkOutage: "ישנה תקלה זמנית בשרת. אנא נסי שוב מאוחר יותר",
        unauthorized: "גישה רק ללקוחות <a href=/colour>" + ui.d.title + "</a>",
        accessRevoked: "גישה לדף זה מורשית רק דרך דף התשלום",
        paymentSuccess: "תשלום בוצע בהצלחה. לסיום ההזמנה צפי בסרטון ומלאי את השאלון",
        serverError: "ישנה תקלה בשרת, אנא <a href=/contacts>צרי קשר</a> להמשך הטיפול בהזמנה",
        incompleteSubmission: "תהליך ההזמנה לא הסתיים, האם ברצונך לסגור כעט?"
    });

    onlyFetch = function (fn) {
        var signal;

        delete ui.inProgress;

        if (ui.w.AbortController) {
            if (controller) {
                // Cancel the previous request
                controller.abort();
            }

            // Make fetch cancelable https://www.loxodrome.io/post/cancelling-requests/
            controller = new AbortController();
            signal = controller.signal;
        }
        if (typeof fn === "function") {
            session = generateLayout.uniqueID();
            fn(signal, session);
        }
    };
    onlyFetch.onError = function (str, err) {
        err = err || {};

        delete ui.inProgress;

        if (err.name !== "AbortError") {
            console.warn(hash);
            wrapper.classList.remove("no-padding");

            switch (err.message) {
                case "notFound":
                case "notPermitted":
                case "serverError":
                    console.error(err.message);
                    str = locale[err.message];
                    break;
                case "Failed to fetch":
                    console.error(err.message);
                    str = locale.networkOutage;
                    break;
                case "NetworkError when attempting to fetch resource.":
                    console.error(err.message);
                    str = locale.networkError;
                    break;
            }

            unfilledForm = false;
            status.innerHTML = "<div class=\"table center\">" +
                "    <div class=cel>" +
                "        <div class=error>" + str +"</div>" +
                "    </div>" +
                "</div>";

            if (controller) {
                // Cancel fetch request
                controller.abort();
            }
        }
    };
    onlyFetch.verifyStatus = function (response, token, errorType) {
        switch (response.status) {
            case 200:
                return token === session && response.json();
            case 400:
                return Promise.reject(new Error(errorType));
            case 503:
                return Promise.reject(new Error("serverError"));
            default:
                return Promise.reject(new Error("Failed to fetch"));
        }
    };
    events.getData = function () {
        var urlParams,
            shortURL,
            getOrder;

        wrapper.classList.remove("no-padding");

        session = undefined;
        ui.pageProgress = ui.pageProgress || status.innerHTML;
        status.innerHTML = ui.pageProgress;

        if (generateLayout.timer) {
            clearTimeout(generateLayout.timer);
        }

        getOrder = function () {
            unfilledForm = false;

            if (location.hash) {
                hash = ui.hash();
                transaction = hash.transaction;

                if (transaction) {
                    onlyFetch(function (signal, token) {
                        fetch(endpoint + "/payment/order", {
                            method: "POST",
                            redirect: "error",
                            signal: signal,
                            body: JSON.stringify({transaction: transaction})
                        }).then(function (response) {
                            return onlyFetch.verifyStatus(response, token, "notFound");
                        }).then(function (json) {
                            return json.error ? Promise.reject(json) : json;
                        }).then(function (obj) {
                            generateLayout(obj, token);
                        }).catch(function (err) {
                            if (token === session) {
                                onlyFetch.onError(locale.notFound, err);
                            }
                        });
                    });

                    return true;
                }
            }

            onlyFetch.onError(locale.unauthorized);

            return false;
        };

        if (location.search) {
            console.log(location.href);

            hash = ui.hash({hash: location.search});
            urlParams = [
                "orderid",
                "service",
                "transaction",
                "amount",
                "email",
                "phone",
                "firstname",
                "lastname",
                "startDate",
                "utm_campaign",
                "utm_source"
            ];

            shortURL = function (encodedTransaction) {
                if (encodedTransaction && encodedTransaction !== transaction) {
                    transaction = encodedTransaction;

                    if (history.replaceState) {
                        // Remove query string from URL
                        history.replaceState("", ui.d.title, location.pathname + "#transaction=" + transaction);
                    }
                }
            };

            if (hash.custom) {
                // decode to reach token, utm_campaign, utm_source
                Object.assign(hash, ui.hash({hash: atob(hash.custom)}));
                delete hash.custom;
            }
            if (hash.index) {
                hash.transaction = hash.index;
                delete hash.index;
            }
            if (hash.email) {
                hash.email = hash.email.toLowerCase();

                ui.setUser(ui.filterObj({
                    email: hash.email,
                    tel: hash.phone,
                    firstName: hash.firstname,
                    lastName: hash.lastname
                }, function (key, obj) {
                    return !!obj[key];
                }));
            }
            if (hash.transaction) {
                shortURL(btoa(hash.transaction));
            }
            if (hash.token === ui.cookie("paymentToken") && hash.orderid && hash.email && hash.transaction) {
                hash = ui.filterObj(hash, function (key) {
                    return urlParams.includes(key);
                });

                onlyFetch(function (signal, token) {
                    fetch(endpoint + "/payment/register", {
                        method: "POST",
                        redirect: "error",
                        signal: signal,
                        body: JSON.stringify(hash)
                    }).then(function (response) {
                        return onlyFetch.verifyStatus(response, token, "notPermitted");
                    }).then(function (obj) {
                        shortURL(obj.transaction);
                        generateLayout(obj, token);
                    }).catch(function (err) {
                        if (token === session) {
                            onlyFetch.onError(locale.accessRevoked, err);
                        }
                    });
                });
            } else {
                getOrder();
            }
        } else {
            getOrder();
        }

        return hash;
    };
    events.alert = function (e) {
        if (unfilledForm) {
            e.preventDefault();
            e.returnValue = locale.incompleteSubmission;

            return e.returnValue;
        }
    };
    events.remind = function () {
        if (unfilledForm && events.remind.done !== transaction) {
            events.remind.done = transaction;

            if (navigator.sendBeacon) {
                navigator.sendBeacon(endpoint + "/payment/reminder", JSON.stringify({
                    transaction: transaction,
                    url: location.href
                }));
            }
        }
    };
    generateLayout = function (obj, token) {
        var self = generateLayout,
            content = ui.d.getElementById("content"),
            timer = 0,
            label;

        if (obj && obj.valueLocale) {
            if (content) {
                content.outerHTML = self.formFinal(obj);
            } else {
                status.innerHTML = self.formFinal(obj, obj.service === "color-swatch");
            }
        } else {
            label = ui.d.getElementById("label");

            if (label) {
                // timeout with details for better UX
                label.innerHTML = locale.paymentSuccess;
                timer = 3500;
            }

            self.timer = setTimeout(function () {
                if (!token || token === session) {
                    status.innerHTML = self.formStart();

                    self.addEvents();

                    // YouTube fallback
                    ui.video.applyPlyr();
                }
            }, timer);
        }
    };
    generateLayout.valueLocale = {
        bright: "את בעלת צבעים בהירים",
        clear: "את בעלת צבעים צלולים",
        cold: "את בעלת צבעים קרים",
        deep: "את בעלת צבעים עמוקים",
        mixed: "את בעלת צבעים מעורבים",
        warm: "את בעלת צבעים חמים"
    };
    generateLayout.video = "<div class=video dir=ltr>" +
        "    <iframe title=\"ערכת &quot;צבע מבפנים&quot;\"" +
        " src=\"https://www.youtube.com/embed/ihxGT0A1OrE\"" +
        " allow=\"autoplay; encrypted-media; fullscreen\" allowfullscreen></iframe>" +
        "</div>";
    generateLayout.uniqueID = function () {
        return Math.random().toString(16).substr(2, 8);
    };
    generateLayout.formStart = function () {
        var self = generateLayout;

        unfilledForm = true;

        self.template = {
            hair: {
                title: "באיזה צבע השיער שלך?",
                placeholder: "לבחור צבע השיער",
                option: {
                    black: "שחור",
                    darkBrown: "חום כהה",
                    mediumBrown: "חום בינוני",
                    lightBrown: "חום בהיר",
                    honey: "דבש",
                    brightBlond: "בלונד בהיר",
                    darkBlond: "בלונד כהה",
                    redhead: "ג'ינג'י",
                    chestnut: "ערמוני",
                    blondeGray: "בלונד אפור",
                    lightGray: "אפור בהיר",
                    mediumGray: "אפור בינוני",
                    grayGray: "שיבה אפור",
                    mousey: "עכברי",
                    silver: "כסוף"
                }
            },
            eyes: {
                title: "באיזה צבע העיניים שלך?",
                placeholder: "לבחור צבע העיניים",
                option: {
                    brown: "חום",
                    darkBrown: "חום כהה",
                    honeyBrown: "חום דבש",
                    greenishBrown: "חום ירקרק",
                    lightGray: "אפור בהיר",
                    greenish: "ירקרק",
                    brightGreen: "ירוק בהיר",
                    oliveGreen: "ירוק זית",
                    darkGreen: "ירוק כהה",
                    blue: "כחול",
                    lightBlue: "כחול בהיר",
                    blueGreen: "כחול ירוק"
                }
            },
            skin: {
                title: "מה גוון העור שלך?",
                placeholder: "לבחור גוון העור",
                option: {
                    tan: "שזוף",
                    bright: "בהיר",
                    dark: "כהה"
                }
            }
        };
        self.value = {};
        self.button = "אשר הזמנה";

        self.form = function (obj) {
            var result = "",
                field,
                value;

            result += "<ul>";

            for (field in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, field)) {
                    result += "<li>" +
                        "<h3>" + obj[field].title + "</h3>" +
                        "<select name=" + field + " required>" +
                        "    <option class=placeholder value=\"\">" + obj[field].placeholder + "</option>";

                    for (value in obj[field].option) {
                        if (Object.prototype.hasOwnProperty.call(obj[field].option, value)) {
                            result += "    <option value=" + value + ">" + obj[field].option[value] + "</option>";
                        }
                    }

                    result += "</select>" +
                        "</li>";
                }
            }

            result += "</ul>" +
                "<button>" + self.button + "</button>";

            return "<form class=\"unselectable form cs\" name=cs method=post novalidate>" + result + "</form>";
        };
        self.addEvents = function () {
            ui.d.forms.cs.addEventListener("submit", self.addEvents.submit);

            Object.keys(self.template).forEach(function (field) {
                ui.d.forms.cs[field].addEventListener("change", self.addEvents.change);
            });
        };
        self.addEvents.submit = function (e) {
            var content = ui.d.getElementById("content"),
                startTime = +new Date,
                valid = true,
                label;

            e.preventDefault();

            Object.keys(self.template).forEach(function (field) {
                if (!self.value[field]) {
                    valid = false;
                    ui.d.forms.cs[field].classList.add("error");
                }
            });

            if (valid) {
                if (content) {
                    content.innerHTML = ui.pageProgress;
                    label = ui.d.getElementById("label");

                    if (label) {
                        label.innerHTML = "סיום הזמנה";
                    }
                }

                onlyFetch(function (signal, token) {
                    ui.inProgress = true;

                    fetch(endpoint + "/payment/update", {
                        method: "POST",
                        redirect: "error",
                        signal: signal,
                        body: JSON.stringify({
                            transaction: transaction,
                            service: "color-swatch",
                            value: JSON.stringify(self.value),
                            url: location.href
                        })
                    }).then(function (response) {
                        return onlyFetch.verifyStatus(response, token, "notPermitted");
                    }).then(function (json) {
                        return json.error ? Promise.reject(json) : json;
                    }).then(function (obj) {
                        self.timer = setTimeout(function () {
                            generateLayout(obj, token);
                            delete ui.inProgress;
                        }, 2500 - (+new Date - startTime) || 0);
                    }).catch(function (err) {
                        if (token === session) {
                            onlyFetch.onError(locale.serverError, err);
                        }
                    });
                });
            } else {
                console.warn("Incomplete submission");
            }
        };
        self.addEvents.change = function (e) {
            var el = e.target;

            if (el.value) {
                self.value[el.name] = el.value;
            } else {
                delete self.value[el.name];
            }

            // Sort object by key
            self.value = Object.keys(self.value).sort().reduce(function (result, key) {
                result[key] = self.value[key];

                return result;
            }, {});

            if (el.value) {
                el.classList.remove("error");
            }

            console.log(self.value);
        };

        (function () {
            var eventListenerOption,
                lastAction,
                update,
                start,
                reset;

            eventListenerOption = (function () {
                // Resource http://tonsky.me/blog/chrome-intervention/
                // Spec issue https://github.com/whatwg/dom/issues/491
                var passiveSupported = false,
                    options;

                try {
                    options = Object.defineProperty({}, "passive", {
                        get: function () {
                            passiveSupported = true;

                            return passiveSupported;
                        }
                    });

                    addEventListener("test", options, options);
                    removeEventListener("test", options, options);
                } catch (err) {
                    passiveSupported = false;
                }

                return passiveSupported ? {passive: true} : true;
            }());
            start = setInterval(function () {
                if (!unfilledForm) {
                    reset();
                }
                if (Math.round((new Date() - lastAction) / 60000) >= 60) {
                    // Send reminding message after 1h inactivity, checked every 4min
                    reset();
                    events.remind();
                }
            }, 240000);
            update = function () {
                if (unfilledForm) {
                    lastAction = new Date();
                }
            };
            reset = function () {
                if (start) {
                    ui.w.removeEventListener("pointerdown", update, eventListenerOption);
                    ui.w.removeEventListener("pointermove", update, eventListenerOption);
                    clearTimeout(start);
                    start = undefined;
                }
            };

            ui.w.addEventListener("pointerdown", update, eventListenerOption);
            ui.w.addEventListener("pointermove", update, eventListenerOption);
        }());

        wrapper.classList.add("no-padding");

        return self.video +
            "<div class=content id=content dir=rtl>" +
            "    <h1 id=title>" + ui.d.title + "</h1>" + self.form(self.template) +
            "    <div class=\"figure footer\">" +
            "        <div class=notice>לא בטוחה לאלו צבעים את שייכת?<br>שלחי לי תמונת פנים ברורה שצולמה באור היום לוואטסאפ" +
            " <a href=\"https://wa.me/972585800020\" target=_blank dir=auto>0585800020</a> או למייל" +
            " <a href=\"mailto:lea@laukstein.com\" target=_blank dir=auto>lea@laukstein.com</a></div>" +
            "    </div>" +
            "</div>";
    };
    generateLayout.formFinal = function (obj, includeVideo) {
        var self = generateLayout,
            result = "",
            date = "";

        if (obj.valueLocale) {
            if (obj.date) {
                date = new Date(obj.date * 1000);
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                date = "<time>ההזמנה בוצעה ב " + date + "</time>";
            }

            unfilledForm = false;

            result += (includeVideo ? self.video : "") +
                "<div class=" + (obj.service === "color-swatch" ? "content" : "\"content center\"") + ">" +
                "   <h1>" + obj.valueLocale + "</h1>" +
                "   <p>" + (obj.descriptionLocale || "").replace(/\n/g, "<br>") + "</p>" + date +
                "</div>";
        } else {
            result += generateLayout();
        }

        return result;
    };

    ui.w.addEventListener("hashchange", events.getData);
    ui.w.addEventListener("beforeunload", events.alert);
    ui.w.addEventListener("unload", events.remind);

    return events.getData();
});
