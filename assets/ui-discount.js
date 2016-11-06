/*eslint
comma-spacing: 2,
dot-notation: [2, {"allowKeywords": true}],
eqeqeq: 2,
indent: 2,
key-spacing: [2, {"beforeColon": false, "afterColon": true}],
no-console: 0,
no-empty-function: 2,
no-empty: ["error", { "allowEmptyCatch": true }],
no-eval: 2,
no-extend-native: 2,
no-inner-declarations: 2,
no-loop-func: 2,
no-mixed-spaces-and-tabs: 2,
no-multi-spaces: 2,
no-new-func: 2,
no-new: 2,
no-shadow: 2,
no-trailing-spaces: "error",
no-undef: 0,
no-underscore-dangle: 2,
no-unused-vars: 2,
no-use-before-define: 2,
quotes: [2, "double"],
semi: 2,
space-before-blocks: 2,
space-before-function-paren: [2, {"anonymous": "always", "named": "never"}],
strict: [2, "function"]*/

ui.discount = {
    duration: 7,
    passed: 0,
    hash: function (param) {
        "use strict";

        var arr = location.hash.slice(1).split("&"),
            obj = {},
            pair,
            i;

        if (arr.length) {
            for (i = 0; i < arr.length; i += 1) {
                pair = arr[i].split("=");

                if (pair[0]) {
                    obj[pair[0]] = !isNaN(pair[1]) ? Number(pair[1]) : pair[1] && decodeURIComponent(pair[1]);
                }
            }
        }

        return param ? obj[param] : obj;
    },
    diff: function () {
        "use strict";

        try {
            /* MailChimp tags http://kb.mailchimp.com/merge-tags/all-the-merge-tags-cheat-sheet
               #discount=*|DATE:U|*   => date
               #discount=*|DATE:U|*-2 => date - 2 days
               #discount=1478448145-2 */
            var hash = this.hash("discount"),
                now = new Date(),
                start,
                date,
                end;

            if (hash) {
                hash = String(hash).split("-");
                date = new Date(hash[0] * 1000);

                if (hash[1] && !isNaN(hash[1])) {
                    this.passed = Number(hash[1]);
                }

                start = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
                end = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

                return Math.abs(Math.floor((end - start) / 8.64e+7));
            } else {
                return Infinity;
            }
        } catch (e) {
            return Infinity;
        }
    },
    run: function () {
        "use strict";

        this.handler = this.handler || ui.d.querySelector("[data-discount]");
        this.origin = this.origin || ui.d.querySelector("[data-origin]");
        this.discount = this.handler && this.handler.getAttribute("data-discount");

        if (this.discount && this.origin) {
            var duration = this.handler.getAttribute("data-duration"),
                origin = this.origin.getAttribute("data-origin");

            if (duration && !isNaN(duration)) {
                this.duration = Number(duration);
            }
            if (this.diff() <= this.duration - this.passed) {
                this.handler.classList.add("active");
                this.origin.setAttribute("data-origin", this.origin.value);
                this.origin.value = this.discount;
            } else {
                this.handler.classList.remove("active");

                if (origin) {
                    this.origin.setAttribute("data-origin", "");
                    this.origin.value = origin;
                }
            }
        }
    },
    init: function () {
        "use strict";

        window.onhashchange = window.onhashchange || function () {
            ui.discount.run();
        };

        this.run();
    }
};

ui.discount.init();
