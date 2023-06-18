"use strict";

ui.success = (function () {
    function init() {
        var hash = ui.hash({hash: location.search}),
            locale;

        if (hash.utm_source) {
            locale = init.l10n[hash.utm_source];

            if (locale) {
                if (hash.utm_campaign && locale[hash.utm_campaign]) {
                    locale = locale[hash.utm_campaign];
                } else {
                    locale = locale.default;
                }
            }
        }
        if (hash.email) {
            // Identify user from Pelepay success page query
            ui.setUser(ui.filterObj({
                email: hash.email.toLowerCase(),
                tel: hash.phone,
                firstname: hash.firstname,
                lastname: hash.lastname
            }));
        }

        locale = locale || init.l10n.default;

        if (init.el) {
            init.el.innerHTML = locale;
        } else {
            console.error("Missing text container");
        }

        return locale;
    }

    init.el = ui.d.getElementById("text");
    init.l10n = {
        // Strings https://docs.google.com/spreadsheets/d/1wsVz9kItQUj-taqEil9wRLJJ7kGqxDeWRgKYSjnThy0
        default: "ההרשמה הסתיימה בהצלחה",
        products: {
            default: "ההרשמה התבצע בהצלחה, תתקשרי כדי לתאם פגישה <a href=\"tel:0585800020\">058-5800020</a>",
            diy: "ההרשמה הסתיימה בהצלחה, תכף תקבלי מייל עם כל הפרטים"
        },
        subscribe: {
            default: "המדריך כבר בדרך אליך"
        }
    };

    return init();
}());
