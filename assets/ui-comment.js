/*eslint
comma-spacing: 2,
dot-notation: [2, {"allowKeywords": true}],
eqeqeq: 2,
indent: ["error", 4, { "SwitchCase": 1 }],
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

ui.comment = {
    load: function (container) {
        "use strict";

        function config() {
            this.page.identifier = location.hash.replace(/^#/, "");
            this.page.url = location.href;
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
                ui.asyncScript("https://lealaukstein.disqus.com/embed.js", {"data-timestamp": +new Date()});
            } else if (ui.w.DISQUS) {
                DISQUS.reset({
                    reload: true,
                    config: config
                });
            }
        } else {
            console.error("Missing container element");
        }
    },
    remove: function () {
        "use strict";

        if (this.el) {
            this.el.innerHTML = "";
        }
    }
};
