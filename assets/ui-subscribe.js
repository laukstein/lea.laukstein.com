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

ui.subscribe = {
    key: "2d8c12be3a09dc2eb907c9be7",
    url: "https://laukstein.us13.list-manage.com/subscribe/post-json",
    success: function (data) {
        "use strict";

        var message;

        if (data) {
            if (data.result === "success") {
                message = "<h1 class=success>תודה</h1><p>לסיום ההרשמה תקבלי עכשיו מייל לאישור</p>";
            } else if (data.msg && data.msg.indexOf("list-manage.com/subscribe/send-email")) {
                message = "<h1 class=error>שגיאה...</h1><p>את כבר רשומה, תנסי עם <a href=" + location.href + ">אימייל אחר</a></p>";
            } else {
                message = "<h1 class=error>שגיאה...</h1><p>בבקשה <a href=" + location.href + ">תנסי שוב</a> מאוחר יותר</p>";
            }
        } else {
            message = "<h1 class=error>שגיאה בשרת...</h1><p>ניתן להירשם דרך <a href=//www.facebook.com/LeaLaukstein/>LeaLaukstein</a> או <a href=" + location.href + ">תנסי שוב</a></p>";
        }

        this.el.innerHTML = message;
    },
    send: function (e) {
        "use strict";

        var self = ui.subscribe,
            script,
            head;

        if (e) {
            e.preventDefault();
        }
        if (self.active && ui.form.valid(self.required)) {
            script = ui.d.createElement("script");
            script.src = self.el.action + "&" + ui.form.serialize(self.el) + "&b_" + self.key + "_" + self.name + "&_=" + Math.random().toString(16).substr(2, 8) + "&c=ui.subscribe.success";
            head = ui.d.getElementsByTagName("head")[0];

            ui.form.accessibility();

            if (self.currentScript) {
                head.removeChild(currentScript);
            }

            head.appendChild(script);

            self.currentScript = script;
        }
    },
    init: function (id) {
        "use strict";

        if (!this.active) {
            this.el = ui.form.el = id && ui.d.getElementById(id);

            if (this.el) {
                this.name = this.el.getAttribute("name");

                if (this.name) {
                    this.active = true;
                    this.el.action = this.url + "?u=" + this.key + "&id=" + this.name;
                    this.el.addEventListener("submit", this.send);
                    this.required = ui.form.list("[data-required]");

                    ui.dependencies();

                    var tel = ui.d.getElementById("tel");

                    if (tel) {
                        tel.addEventListener("keypress", ui.form.number);
                        tel.addEventListener("paste", ui.form.paste);
                        tel.addEventListener("drop", ui.form.drop);
                    }
                }
            }
        }
    }
};

ui.subscribe.init("subscribe");
