ui.comment = {
    load: function (container, avoidError) {
        "use strict";

        function config() {
            var identifier = "https://lea.laukstein.com" + location.pathname;

            if (location.hash && location.pathname === "/academy") {
                identifier += "?" + ui.serialize(ui.hash({
                    hash: [location.hash, location.search].reduce(function (a, b) {
                        return a.length > b.length ? a : b;
                    })
                }));
            }

            this.page.identifier = identifier;
            this.page.url = identifier;
        }

        this.el = ui.d.getElementById("disqus_thread");

        if (!this.el && container) {
            container.insertAdjacentHTML("beforeend", "<div class=comment id=disqus_thread></div>");
            this.el = ui.d.getElementById("disqus_thread");
        }
        if (this.el) {
            if (!window.disqus_config && ui.asyncScript) {
                window.disqus_config = config; // eslint-disable-line

                ui.asyncScript("https://lealaukstein.disqus.com/count.js", {id: "dsq-count-scr"});
                ui.asyncScript("https://lealaukstein.disqus.com/embed.js", {"data-timestamp": +new Date});
            } else if (window.DISQUS) {
                DISQUS.reset({
                    reload: true,
                    config: config
                });
            }
        } else if (!avoidError) {
            console.error("Missing container element");
        }
    },
    remove: function () {
        "use strict";

        if (this.el) {
            this.el.innerHTML = "";
        }
    },
    init: function () {
        "use strict";

        this.load(null, true);
    }
};

ui.comment.init();
