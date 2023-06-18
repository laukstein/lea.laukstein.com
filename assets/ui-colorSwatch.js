"use strict";

ui.colorSwatch = (function () {
    // -> /color-swatch?affiliate=foo&campaign=bar
    // <- /payment#orderid=1&utm_campaign=foo&utm_source=bar
    var buttons = Array.from(ui.d.querySelectorAll(".x-button")),
        hash = ui.hash({hash: location.search}),
        baseurl = buttons[0] && buttons[0].href,
        schema = {
            affiliate: "utm_source",
            campaign: "utm_campaign"
        },
        query = {};

    if (baseurl && baseurl.indexOf("#")) {
        Object.keys(hash).forEach(function (key) {
            if (schema[key]) {
                query[schema[key]] = hash[key];
            }
        });

        if (Object.keys(query).length) {
            baseurl += "&" + ui.serialize(query);

            buttons.forEach(function (button) {
                button.href = baseurl;
            });
        }
    }
}());
