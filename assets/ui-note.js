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
no-extend-native: 0,
no-inner-declarations: 2,
no-loop-func: 2,
no-mixed-spaces-and-tabs: 2,
no-multi-spaces: 2,
no-new-func: 0,
no-new: 0,
no-shadow: 2,
no-trailing-spaces: "error",
no-undef: 0,
no-underscore-dangle: 0,
no-unused-vars: 0,
no-use-before-define: 2,
quotes: [2, "double"],
semi: 2,
space-before-blocks: 2,
space-before-function-paren: [2, {"anonymous": "always", "named": "never"}],
strict: [2, "function"]*/

ui.note = {
    el: ui.d.getElementById("note"),
    init: function () {
        "use strict";

        if (ui.note.el) {
            if (location.hash === "#paypal") {
                ui.note.el.removeAttribute("hidden", "");
            } else {
                ui.note.el.setAttribute("hidden", "");
            }
        }
        if (!arguments.length) {
            ui.w.onhashchange = ui.note.init;
        }
    }
};

ui.note.init();
