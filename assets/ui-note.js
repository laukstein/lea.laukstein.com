"use strict";

ui.note = {
    el: ui.d.getElementById("note"),
    init: function () {
        if (ui.note.el) {
            if (location.hash === "#paypal") {
                ui.note.el.removeAttribute("hidden", "");
            } else {
                ui.note.el.setAttribute("hidden", "");
            }
        }
        if (!arguments.length) {
            ui.w.addEventListener("hashchange", ui.note.init);
        }
    }
};

ui.note.init();
