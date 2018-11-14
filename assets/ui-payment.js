ui.payment = ui.legacy(function () {
    "use strict";

    // Mailchimp variables https://mailchimp.com/help/all-the-merge-tags-cheat-sheet/
    // -> /payment#orderid=1&firstname=a&lastname=b&email=a@b.com&phone=0&utm_campaign=foo&utm_source=bar
    // <- /product?firstname=a&lastname=b&email=a@b.com&phone=0&payfor=product&custom=...&orderid=1...
    var getData,
        session;

    getData = function () {
        var status = ui.d.getElementById("status"),
            form = ui.d.pelepayform,
            hash = ui.hash(),
            onError = function (str, err) {
                err = err || {};

                if (err.message === "Failed to fetch") {
                    str = "תקלה זמנית בשרת. תנסי שוב מאוחר יותר";
                } else {
                    str = err.message || str;
                }

                console.warn(hash);
                status.innerHTML = "<div class=error>" + str +"</div>";
            },
            filterObj = function (raw, condition) {
                return Object.keys(raw).filter(function (key) {
                    return condition(key, raw);
                }).reduce(function (obj, key) {
                    obj[key] = raw[key];

                    return obj;
                }, {});
            },
            affiliate = location.search && ui.hash({
                hash: location.search,
                param: "affiliate"
            }),
            campaign = location.search && ui.hash({
                hash: location.search,
                param: "campaign"
            }),
            orderHash = ui.serialize({orderid: hash.orderid}),
            urlParams,
            endpoint;

        ui.pageProgress = ui.pageProgress || status.innerHTML;
        status.innerHTML = ui.pageProgress;

        if (campaign) {
            // Mailchimp affiliate campaign, link contains ?campaign=foo
            hash.utm_campaign = campaign; // eslint-disable-line
        }
        if (affiliate) {
            // Mailchimp affiliate source, link contains ?affiliate=bar
            hash.utm_source = affiliate; // eslint-disable-line
        }
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

            ui.setUser(filterObj({
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

            hash = filterObj(hash, function (key) {
                return urlParams.includes(key);
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
                    return Promise.reject(new Error("קישור תשלום לא קיים. לשאלות <a href=/contact>צרי קשר</a"));
                }
            }).catch(function (err) {
                if (hash.token === session) {
                    onError("תקלה בשרת. לשאלות <a href=/contact>צרי קשר</a>", err);
                }
            });
        } else {
            onError("קישור לא תקין. לשאלות <a href=/contact>צרי קשר</a>");
        }
    };

    ui.w.addEventListener("hashchange", getData);

    return getData();
});
