ui.colourSwatch = ui.legacy(function () {
    "use strict";

    var endpoint = (function () {
            var parts = location.host.split(".");

            while (parts.length > 2) {
                parts.shift();
            }

            return "https://lab." + parts.join(".") + "/webhook";
        }()),
        wrapper = ui.d.querySelector(".table.scale"),
        status = ui.d.getElementById("status"),
        generateLayout,
        unfilledForm,
        transaction,
        controller,
        onlyFetch,
        session,
        onError,
        getData,
        hash;

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
    onError = function (str, err) {
        err = err || {};

        if (err.name !== "AbortError") {
            console.warn(hash);
            wrapper.classList.remove("no-padding");

            if (err.message === "Failed to fetch") {
                console.error(err.message);
                str = "תקלה זמנית בשרת. תנסי שוב מאוחר יותר";
            } else if (err.message === "NetworkError when attempting to fetch resource.") {
                console.error(err.message);
                str = "תקלה בשרת. לשאלות <a href=/contact>צרי קשר</a>";
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
    getData = function () {
        var filterObj,
            urlParams,
            getOrder;

        wrapper.classList.remove("no-padding");

        session = undefined;
        ui.pageProgress = ui.pageProgress || status.innerHTML;
        status.innerHTML = ui.pageProgress;

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
                            if (response.status === 200) {
                                return token === session && response.json();
                            }

                            return Promise.reject(new Error("Failed to fetch"));
                        }).then(function (json) {
                            return json.error ? Promise.reject(json) : json;
                        }).then(function (obj) {
                            generateLayout(obj, token);
                        }).catch(function (err) {
                            if (token === session) {
                                onError("ההזמנה זו לא נמצא. לשאלות <a href=/contact>צרי קשר</a>", err);
                            }
                        });
                    });

                    return true;
                }
            }

            onError("גישה רק ללקוחות <a href=/colour>" + ui.d.title + "</a>");

            return false;
        };

        if (location.search) {
            hash = ui.hash({hash: location.search});
            filterObj = function (raw, condition) {
                return Object.keys(raw).filter(function (key) {
                    return condition(key, raw);
                }).reduce(function (obj, key) {
                    obj[key] = raw[key];

                    return obj;
                }, {});
            };
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

                ui.setUser(filterObj({
                    email: hash.email,
                    tel: hash.phone,
                    firstName: hash.firstname,
                    lastName: hash.lastname
                }, function (key, obj) {
                    return !!obj[key];
                }));
            }
            if (hash.token === sessionStorage.paymentToken && hash.orderid && hash.email && hash.transaction) {
                hash = filterObj(hash, function (key) {
                    return urlParams.includes(key);
                });

                onlyFetch(function (signal, token) {
                    fetch(endpoint + "/payment/register", {
                        method: "POST",
                        redirect: "error",
                        signal: signal,
                        body: JSON.stringify(hash)
                    }).then(function (response) {
                        if (response.status === 200) {
                            return token === session && response.json();
                        }

                        return Promise.reject(new Error("Failed to fetch"));
                    }).then(function (obj) {
                        transaction = obj.transaction;

                        if (history.replaceState) {
                            // Remove query string from URL
                            history.replaceState("", ui.d.title, location.pathname + "#transaction=" + transaction);
                        }

                        generateLayout(obj, token);
                    }).catch(function (err) {
                        if (token === session) {
                            onError("גישה לדף הזה מורשית רק דרך דף התשלום", err);
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
    generateLayout = function (obj, token) {
        var self = generateLayout,
            timer = 0,
            label;

        if (obj && obj.valueLocale) {
            status.innerHTML = self.formFinal(obj);
        } else {
            label = ui.d.getElementById("label");

            if (label) {
                // timeout with details for better UX
                label.innerHTML = "תשלום בוצע בהצלחה. לסיום ההזמנה צפי בסרטון ומלאי שאלון";
                timer = 3500;
            }

            setTimeout(function () {
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
    generateLayout.uniqueID = function () {
        return Math.random().toString(16).substr(2, 8);
    };
    generateLayout.formStart = function () {
        var self = generateLayout;

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
            var el = e.target.tagName === "LABEL" ? e.target : e.target.closest("label"),
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
        ui.formDialog = function (e, index, type, finalEl) {
            var el = finalEl || e.target,
                title = self.valueLocale[type],
                result = "";

            if (!finalEl && e) {
                ui.formClick(e);
            }
            if (el && title) {
                result += "<div class=dialog>" +
                    "   <div class=table>" +
                    "   <div class=cel>" +
                    "       <div class=close onclick=ui.formReset(this) tabindex=0>" + self.getIcon("close") + "</div>" +
                    "       <h1>" + title + "</h1>" +
                    "       <button onclick=\"ui.formSubmit(this, '" + type + "')\">אישור</button>" +
                    "   </div>" +
                    "   </div>" +
                    "</div>";

                if (!finalEl) {
                    el = index === 1 ? el.parentNode : el.parentNode.parentNode.parentNode;
                    el.insertAdjacentHTML("afterbegin", result);
                }
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
            wrapper.classList.remove("no-padding");

            status.innerHTML = ui.pageProgress;

            var label = ui.d.getElementById("label");

            if (label) {
                label.innerHTML = "סיום";
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
                    if (response.status === 200) {
                        return token === session && response.json();
                    }

                    return Promise.reject(new Error("Failed to fetch"));
                }).then(function (json) {
                    return json.error ? Promise.reject(json) : json;
                }).then(function (obj) {
                    generateLayout(obj, token);
                }).catch(function (err) {
                    if (token === session) {
                        onError("תקלה בשרת, בבקשה <a href=/contacts>צרי קשר</a> להמשך טיפול הזמנה", err);
                    }
                });
            });
        };

        wrapper.classList.add("no-padding");

        unfilledForm = true;

        return "<div class=absolute>" +
            "<div class=\"table\">" +
            "    <div class=cel><p>תשלום בוצע בהצלחה. לסיום ההזמנה צפי בסרטון ומלאי שאלון</p></div>" +
            "</div>" +
            "</div>" +
            "<div class=video dir=ltr>" +
            "    <iframe title=\"ערכת &quot;צבע מבפנים&quot;\"" +
            " src=\"https://www.youtube.com/embed/ihxGT0A1OrE\"" +
            " allow=\"autoplay; encrypted-media; fullscreen\" allowfullscreen></iframe>" +
            "</div>" +
            "<div class=\"content form qa\" dir=rtl>" +
            "    <h1 id=title>" + ui.d.title + "</h1>" +
            "    <div class=figure>" + self.label(self.template, false) + "</div>" +
            "</div>";
    };
    generateLayout.formFinal = function (obj) {
        var result = "",
            date = "";

        if (obj.valueLocale) {
            if (obj.modified) {
                date = new Date(obj.modified);
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                date = "<time>ההזמנה בוצע ב" + date + "</time>";
            }

            wrapper.classList.remove("no-padding");

            unfilledForm = false;

            result += "<div class=\"dialog final\">" +
                "   <div class=table>" +
                "   <div class=cel>" +
                "   <div class=context>" +
                "       <h1>" + obj.valueLocale + "</h1>" +
                "       <p>" + (obj.descriptionLocale || "").replace(/\n/g, "<br>") + "</p>" + date +
                "   </div>" +
                "   </div>" +
                "   </div>" +
                "</div>";
        } else {
            result += generateLayout();
        }

        return result;
    };

    ui.w.addEventListener("hashchange", getData);
    ui.w.addEventListener("beforeunload", function (e) {
        if (unfilledForm) {
            e.preventDefault();
            e.returnValue = "תהליך ההזמנה לא הסתיים, ברצונך לסגור כעט?";

            return e.returnValue;
        }
    });
    ui.w.addEventListener("unload", function () {
        if (unfilledForm) {
            navigator.sendBeacon(endpoint + "/payment/reminder", JSON.stringify({
                transaction: transaction,
                url: location.href
            }));
        }
    });

    return getData();
});
