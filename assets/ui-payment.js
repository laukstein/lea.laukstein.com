ui.payment = ui.legacy(function () {
    "use strict";

    // -> /payment#orderid=1&firstname=a&lastname=b&email=a@b.com&phone=0&utm_campaign=foo&utm_source=bar
    // <- /order?firstname=a&lastname=b&email=a@b.com&phone=0&payfor=product&custom=...&orderid=1...
    var status = ui.d.getElementById("status"),
        locale = {},
        controller,
        getData,
        session;

    locale.toContact = " לשאלות אנא <a href=/contact>צרי קשר</a>";

    Object.assign(locale, {
        notFound: "הזמנה זו לא נמצאה." + locale.toContact,
        networkError: "ישנה תקלה בשרת." + locale.toContact,
        networkOutage: "ישנה תקלה זמנית בשרת. אנא נסי שוב מאוחר יותר",
        serverError: "ישנה תקלה בשרת, אנא <a href=/contacts>צרי קשר</a> להמשך הטיפול בהזמנה",
        invalidRequest: "קישור לא תקין." + locale.toContact,
        hijacking: "ישנה תקלה, אנא <a href=/contacts>צרי קשר</a> להמשך הטיפול בהזמנה"
    });

    getData = function () {
        var form = ui.d.pelepayform,
            hash = ui.hash(),
            orderHash = ui.serialize({orderid: hash.orderid}),
            urlParams,
            endpoint;

        ui.pageProgress = ui.pageProgress || status.innerHTML;
        status.innerHTML = ui.pageProgress;

        if (history.replaceState) {
            if (location.search) {
                console.log(location.href);

                // Remove query string from URL
                history.replaceState("", ui.d.title, location.pathname + location.hash);
            }
            if (orderHash && orderHash !== location.hash.substring(1)) {
                if (!location.search) {
                    console.log(location.href);
                }

                // Hide private details from URL
                history.replaceState("", ui.d.title, location.pathname + "#" + orderHash);
            }
        }
        if (hash.email) {
            hash.email = hash.email.toLowerCase();

            ui.setUser(ui.filterObj({
                email: hash.email,
                tel: hash.phone,
                firstname: hash.firstname,
                lastname: hash.lastname
            }));
        }
        if (hash.orderid && form) {
            endpoint = (function () {
                var parts = location.hostname.split(".");

                while (parts.length > 2) {
                    parts.shift();
                }

                return "https://lab." + parts.join(".") + "/webhook";
            }());
            urlParams = [
                "orderid",
                "email",
                "phone",
                "firstname",
                "lastname",
                "utm_campaign",
                "utm_source"
            ];

            hash = ui.filterObj(hash, function (key) {
                var res = urlParams.includes(key) &&
                    // Escape MailChimp non-merged tags https://mailchimp.com/help/all-the-merge-tags-cheat-sheet/
                    !/\*\|.*?\|\*/.test(hash[key]);

                if (res && key.startsWith("utm_")) {
                    console.log(key, hash[key]);
                }

                return res;
            });

            getData.onlyFetch(function (signal, token) {
                hash.token = token;

                fetch(endpoint + "/payment", {
                    method: "POST",
                    redirect: "error",
                    body: JSON.stringify(hash)
                }).then(function (response) {
                    return getData.verifyStatus(response, token, "notFound");
                }).then(function (json) {
                    return json.error ? Promise.reject(json) : json;
                }).then(function (obj) {
                    var paymentToken = obj.custom && ui.hash({
                        hash: atob(obj.custom),
                        param: "token"
                    });

                    if (!paymentToken) {
                        return Promise.reject(new Error("serverError"));
                    } else if (paymentToken === token) {
                        ui.payment = obj;

                        // Use to prevent fraud activity, token with 3 days expiration
                        ui.cookie({paymentToken: paymentToken}, 259200);

                        Object.keys(obj).forEach(function (key) {
                            var input = ui.d.createElement("input");

                            input.type = "hidden";
                            input.name = key;
                            input.value = obj[key];

                            form.appendChild(input);
                        });

                        ui.log("Invalid token " + paymentToken);
                        console.log("Payment " + obj.orderid + " " + obj.email);
                        console.log(obj);

                        form.submit();
                    } else {
                        return Promise.reject(new Error("hijacking"));
                    }
                }).catch(function (err) {
                    if (token === session) {
                        getData.onError(locale.notFound, err, hash);
                    }
                });
            });
        } else {
            getData.onError(locale.invalidRequest, undefined, hash);
        }
    };

    getData.onlyFetch = function (fn) {
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
            session = ui.generateID();
            fn(signal, session);
        }
    };
    getData.onError = function (str, err, hash) {
        err = err || {};

        if (err.name !== "AbortError") {
            console.warn(hash);

            switch (err.message) {
                case "notFound":
                case "serverError":
                case "hijacking":
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

            if (console.trace) {
                console.trace();
            }

            status.innerHTML = "<div class=error>" + str +"</div>";

            if (controller) {
                // Cancel fetch request
                controller.abort();
            }
        }
    };
    getData.verifyStatus = function (response, token, errorType) {
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

    ui.w.addEventListener("hashchange", getData);

    return getData();
});
