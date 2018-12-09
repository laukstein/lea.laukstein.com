ui.order = ui.legacy(function () {
    "use strict";

    // -> /order?Response=000&ConfirmationCode=1&index=2&amount=3.00&firstname=foo&lastname=bar&email=a@b.com&phone=0&payfor=product&custom=dXRt...&orderid=1
    var endpoint = (function () {
            var parts = location.host.split(".");

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
            hash = ui.hash({hash: location.search});
            urlParams = [
                "orderid",
                "transaction",
                "email",
                "phone",
                "firstname",
                "lastname",
                "utm_source",
                "utm_campaign"
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
                // decode to reach token, utm_source, utm_campaign
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

            shortURL(btoa(hash.transaction));

            if (hash.token === sessionStorage.paymentToken && hash.orderid && hash.email && hash.transaction) {
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
            navigator.sendBeacon(endpoint + "/payment/reminder", JSON.stringify({
                transaction: transaction,
                url: location.href
            }));
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
                status.innerHTML = self.formFinal(obj, true);
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
            option: [{
                title: "האם צבע השיער שלך שחור או חום כהה?",
                option: [{
                    title: "העיניים שלך מבריקות, בולטות, בצבע ירוק כהה, ירוק זית? האם יש קונטראסט בין הלבן בעיניים לבין האישון?",
                    final: "clear"
                }, {
                    title: "העיניים שלך בצבע חום כהה?",
                    final: "deep"
                }, {
                    title: "העיניים שלך בהירות, בצבע כחול, ירוק בהיר או אפור בהיר?",
                    final: "bright"
                }]
            }, {
                title: "האם צבע השיער שלך בלונד בהיר, אפור בהיר, חום בהיר?",
                option: [{
                    title: "העיניים שלך בהירות בצבעים כחול, אפור או ירוק בהיר?",
                    final: "bright"
                }, {
                    title: "העיניים שלך בצבע חום בהיר, מתמזגות עם צבע השיער?",
                    final: "mixed"
                }]
            }, {
                title: "האם צבע השיער שלך חום בינוני או עכברי, אפור בינוני, בלונד אפורי, בלונד כהה?",
                option: [{
                    title: "העיניים שלך בהירות בצבעים כחול בהיר, אפור או ירוק בהיר?",
                    final: "bright"
                }, {
                    title: "העיניים שלך חום בהיר, מתמזג עם צבע השיער?",
                    final: "mixed"
                }]
            }, {
                title: "האם צבע השיער שלך ג'ינג'י, דבש, ערמוני, והעיניים שלך ירוק חם כהה, חום ירקרק, חום דבש, כחול ירוק?",
                final: "warm"
            }, {
                title: "האם צבע השיער שלך חום אפרפר (עכברי), בלונדי-אפרורי, כסוף, שיבה אפור, והצבע העיניים שלך כחול או חום או ירקרק?",
                final: "cold"
            }]
        };
        self.getIcon = function (name) {
            return "<svg class=icon-" + name + "><use xlink:href=#" + name + " /></svg>";
        };
        self.label = function (data, index, sameLoop) {
            var skipLoop = index !== false,
                result = "",
                final,
                key,
                id;

            index = index || 0;

            if (skipLoop && !sameLoop) {
                index += 1;
            }
            if (data) {
                if (skipLoop) {
                    final = !data.option;
                    id = !final && self.uniqueID();
                    result += (sameLoop ? "" : "<ol>") +
                        "<li><input type=radio name=" + index + (id ? " id=" + id : "") + ">" +
                        "<label onclick=" +
                        (data.final ?
                            "\"ui.formDialog(event, " + index + ", '" + data.final + "')\"" :
                            "ui.formClick(event) for=" + id) +
                        "><div class=checkbox></div>" + data.title + "</label>";
                }
                if (Array.isArray(data.option)) {
                    index += 1;
                    result += "<ol>";

                    for (key in data.option) {
                        if (data.option.hasOwnProperty(key)) {
                            result += self.label(data.option[key], index, true);
                        }
                    }

                    result += "</ol>";
                } else if (data.option) {
                    result += self.label(data.option, index);
                }
                if (skipLoop) {
                    result += "</li>" +
                        (sameLoop ? "" : "</ol>");
                }
            }

            return result;
        };
        ui.formClick = function (e) {
            var el = e.currentTarget,
                active = el.getAttribute("data-active") === "true",
                arrB,
                arr,
                i,
                o;

            if (active) {
                e.preventDefault();

                arr = el.parentNode.querySelectorAll("[data-active]");

                for (i = 0; i < arr.length; i += 1) {
                    arr[i].removeAttribute("data-active");
                }

                arr = el.parentNode.querySelectorAll("input:checked");

                for (i = 0; i < arr.length; i += 1) {
                    arr[i].checked = false;
                }
            } else {
                el.setAttribute("data-active", "true");
            }

            arr = el.parentNode.parentNode.children;

            for (i = 0; i < arr.length; i += 1) {
                if (!active && arr[i] === el.parentNode) {
                    el.removeAttribute("disabled");
                } else {
                    arrB = arr[i].querySelectorAll("label");

                    for (o = 0; o < arrB.length; o += 1) {
                        if (active) {
                            arrB[o].removeAttribute("disabled");
                        } else {
                            arrB[o].setAttribute("disabled", "");
                        }
                    }
                }
            }
        };
        ui.formDialog = function (e, index, type) {
            var el = e.currentTarget,
                title = self.valueLocale[type],
                result = "";

            ui.formClick(e);

            if (el && title) {
                result += "<div class=dialog>" +
                    "   <div class=table>" +
                    "   <div class=cel id=result>" +
                    "       <div class=close onclick=ui.formReset(this) tabindex=0>" + self.getIcon("close") + "</div>" +
                    "       <h1>" + title + "</h1>" +
                    "       <button onclick=\"ui.formSubmit(this, '" + type + "')\">אישור</button>" +
                    "   </div>" +
                    "   </div>" +
                    "</div>";

                el = index === 1 ? el.parentNode : el.parentNode.parentNode.parentNode;
                el.insertAdjacentHTML("afterbegin", result);
            }

            return result;
        };
        ui.formReset = function (el) {
            if (el) {
                el.parentNode.parentNode.parentNode.remove();
            }

            var arr = ui.d.querySelectorAll(".qa [disabled]"),
                i;

            for (i = 0; i < arr.length; i += 1) {
                arr[i].removeAttribute("disabled");
            }

            arr = ui.d.querySelectorAll(".qa input:checked");

            for (i = 0; i < arr.length; i += 1) {
                arr[i].checked = false;
            }

            arr = ui.d.querySelectorAll(".qa [data-active]");

            for (i = 0; i < arr.length; i += 1) {
                arr[i].removeAttribute("data-active");
            }
        };
        ui.formSubmit = function (el, value) {
            var result = ui.d.getElementById("result"),
                startTime = +new Date,
                label;

            if (result) {
                result.innerHTML = ui.pageProgress;
                label = ui.d.getElementById("label");

                if (label) {
                    label.innerHTML = "סיום";
                }
            }

            onlyFetch(function (signal, token) {
                fetch(endpoint + "/payment/update", {
                    method: "POST",
                    redirect: "error",
                    signal: signal,
                    body: JSON.stringify({
                        transaction: transaction,
                        value: value,
                        url: location.href
                    })
                }).then(function (response) {
                    return onlyFetch.verifyStatus(response, token, "notPermitted");
                }).then(function (json) {
                    return json.error ? Promise.reject(json) : json;
                }).then(function (obj) {
                    self.timer = setTimeout(function () {
                        generateLayout(obj, token);
                    }, 2500 - (+new Date - startTime) || 0);
                }).catch(function (err) {
                    if (token === session) {
                        onlyFetch.onError(locale.serverError, err);
                    }
                });
            });
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
            "    <h1 id=title>" + ui.d.title + "</h1>" +
            "    <div class=\"figure form qa\">" + self.label(self.template, false) + "</div>" +
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
            if (obj.modified) {
                date = new Date(obj.modified * 1000);
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                date = "<time>ההזמנה בוצעה ב " + date + "</time>";
            }

            unfilledForm = false;

            result += (includeVideo ? self.video : "") +
                "<div class=content>" +
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
