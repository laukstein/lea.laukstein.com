ui.payment = ui.legacy(function () {
    "use strict";

    // -> /payment#orderid=1&firstname=a&lastname=b&email=a@b.com&phone=0&utm_campaign=foo&utm_source=bar
    // <- /order?firstname=a&lastname=b&email=a@b.com&phone=0&payfor=product&custom=...&orderid=1...
    var getData,
        session;

    getData = function () {
        var status = ui.d.getElementById("status"),
            form = ui.d.pelepayform,
            hash = ui.hash(),
            onError = function (str, err) {
                err = err || {};

                if (err.message === "Failed to fetch") {
                    console.error(err.message);
                    str = "ישנה תקלה זמנית בשרת. אנא נסי שוב מאוחר יותר";
                } else if (err.message === "NetworkError when attempting to fetch resource.") {
                    console.error(err.message);
                    str = "ישנה תקלה בשרת. לשאלות אנא <a href=/contact>צרי קשר</a>";
                } else {
                    str = err.message || str;
                }

                console.warn(hash);
                status.innerHTML = "<div class=error>" + str +"</div>";
            },
            orderHash = ui.serialize({orderid: hash.orderid}),
            urlParams,
            endpoint;

        ui.pageProgress = ui.pageProgress || status.innerHTML;
        status.innerHTML = ui.pageProgress;

        if (history.replaceState) {
            if (location.search) {
                // Remove query string from URL
                history.replaceState("", ui.d.title, location.pathname + location.hash);
            }
            if (orderHash && orderHash !== location.hash.substring(1)) {
                // Hide private details from URL
                history.replaceState("", ui.d.title, location.pathname + "#" + orderHash);
            }
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
        if (hash.orderid && form) {
            endpoint = (function () {
                var parts = location.host.split(".");

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

            hash.token = Math.random().toString(16).substr(2, 8).toUpperCase();
            // Ignore previous fetch requests
            session = hash.token;

            fetch(endpoint + "/payment", {
                method: "POST",
                redirect: "error",
                body: JSON.stringify(hash)
            }).then(function (response) {
                if (response.status === 200) {
                    return hash.token === session && response.json();
                }

                return Promise.reject(new Error("Failed to fetch"));
            }).then(function (obj) {
                var token = obj.custom && ui.hash({
                    hash: atob(obj.custom),
                    param: "token"
                });

                if (hash.token === token) {
                    ui.payment = obj;
                    // Prevent fraud activity
                    sessionStorage.paymentToken = token;

                    Object.keys(obj).forEach(function (key) {
                        var input = ui.d.createElement("input");

                        input.type = "hidden";
                        input.name = key;
                        input.value = obj[key];

                        form.appendChild(input);
                    });

                    console.log("Payment " + obj.orderid + " " + obj.email);
                    console.log(obj);

                    form.submit();
                } else {
                    return Promise.reject(new Error("קישור לתשלום לא קיים. לשאלות <a href=/contact>צרי קשר</a"));
                }
            }).catch(function (err) {
                if (hash.token === session) {
                    onError("ישנה תקלה בשרת. לשאלות אנא <a href=/contact>צרי קשר</a>", err);
                }
            });
        } else {
            onError("קישור לא תקין. לשאלות אנא <a href=/contact>צרי קשר</a>");
        }
    };

    ui.w.addEventListener("hashchange", getData);

    return getData();
});
