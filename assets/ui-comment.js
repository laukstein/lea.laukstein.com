ui.comment = {
    hashIdentifier: /^\/(academy|videos)$/.test(location.pathname),
    setEmptyValue: /^\/videos$/.test(location.pathname),
    load: function (container, avoidError) {
        "use strict";

        function config() {
            var identifier = "https://lea.laukstein.com" + location.pathname;

            if (ui.comment.hashIdentifier && location.hash) {
                identifier += "?" + ui.serialize(ui.hash({
                    hash: [location.hash, location.search].reduce(function (a, b) {
                        return a.length > b.length ? a : b;
                    })
                }), {setEmptyValue: ui.comment.setEmptyValue});
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
            if (!ui.w.disqus_config && ui.asyncScript) {
                ui.w.disqus_config = config;

                ui.asyncScript("https://lealaukstein.disqus.com/count.js", {id: "dsq-count-scr"});
                ui.asyncScript("https://lealaukstein.disqus.com/embed.js", {"data-timestamp": Number(new Date)});
            } else if (ui.w.DISQUS) {
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

        if (this.hashIdentifier && location.search) {
            var search = ui.hash({hash: location.search}),
                hash;

            Object.keys(search).forEach(function (key) {
                if (key.startsWith("utm_") || key.startsWith("mc_")) {
                    delete search[key];
                }
            });

            if (search.length && location.search.length > location.hash.length) {
                hash = ui.serialize(ui.hash({hash: search}), {setEmptyValue: this.setEmptyValue});
            } else {
                hash = location.hash.replace(/^#/, "");
            }
            if (history.replaceState) {
                history.replaceState("", ui.d.title, location.pathname + "#" + hash);
            } else {
                ui.w.location = location.pathname + "#" + hash;

                return;
            }
        }

        this.load(null, true);
    }
};

ui.comment.init();
