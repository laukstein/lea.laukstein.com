ui.colorSwatch = (function () {
    "use strict";

    var buttons = Array.from(ui.d.querySelectorAll(".x-button")),
        hash = ui.hash({hash: location.search}),
        baseurl = buttons[0] && buttons[0].href,
        urlParams = ["affiliate", "campaign"],
        filterObj,
        query;

    if (baseurl && baseurl.indexOf("#") && Object.keys(hash).length) {
        filterObj = function (raw, condition) {
            return Object.keys(raw).filter(function (key) {
                return condition(key, raw);
            }).reduce(function (obj, key) {
                obj[key] = raw[key];

                return obj;
            }, {});
        };

        query = ui.serialize(filterObj(hash, function (key) {
            return urlParams.includes(key);
        }));

        if (query) {
            baseurl += "&" + query;

            buttons.forEach(function (button) {
                button.href = baseurl;
            });
        }
    }
}());
