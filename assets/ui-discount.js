ui.discount = {
    duration: 7,
    passed: 0,
    diff: function () {
        "use strict";

        try {
            /* MailChimp tags http://kb.mailchimp.com/merge-tags/all-the-merge-tags-cheat-sheet
               #discount=*|DATE:U|*   => date
               #discount=*|DATE:U|*-2 => date - 2 days
               #discount=1478448145-2 */
            var hash = ui.hash("discount"),
                now = new Date,
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
            }

            return Infinity;
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
