ui.colorSwatch = (function () {
    "use strict";

    var buttons = Array.from(ui.d.querySelectorAll(".x-button")),
        hash = ui.hash({hash: location.search}),
        baseurl = buttons[0] && buttons[0].href,
        urlParams = ["affiliate", "campaign"],
        query;

    if (baseurl && baseurl.indexOf("#") && Object.keys(hash).length) {
        query = ui.serialize(ui.filterObj(hash, function (key) {
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
