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

ui.has.valid = function (fn) {
    "use strict";

    try {
        return fn();
    } catch (e) {
        if (!this.error) {
            this.error = {
                e: null
            };
        }

        this.error.e = e;

        return this.error;
    }
};
ui.contact = {
    key: "8a321b1a-8fa6-470f-91ab-fcbe92ffbfbf",
    url: "https://lab.laukstein.com/contact",
    success: function () {
        "use strict";

        var self = ui.contact,
            response = this.response,
            error = [],
            result;
        response = response && ui.has.valid(function () {
            return JSON.parse(response);
        });

        if (self.status) {
            self.status.innerHTML = "";
        }
        if (response) {
            if (response.result === "success") {
                result = "<h1 class=success>תודה</h1><p>הודעה נשלחה</p>";
            } else if (response.error) {
                if (response.error.email) {
                    if (self.email) {
                        self.email.parentNode.classList.add("error");
                    }

                    error.push("אימייל לא קיים");
                }
                if (response.error.message) {
                    if (self.message) {
                        self.message.parentNode.classList.add("error");
                    }

                    error.push("הודעה קצרה מדי");
                }
                if (error.length && self.status) {
                    self.status.innerHTML = "<ul class=error><li>" + error.join("<li>") + "</ul>";
                    ui.form.accessibility(true);
                }
            }
        }
        if (!error.length && !result) {
            result = "<h1 class=error>שגיאה בשרת...</h1><p>ניתן להירשם דרך <a href=//www.facebook.com/LeaLaukstein/>LeaLaukstein</a> או <a onclick=location.reload() tabindex=0>תנסי שוב</a>.</p>";
        }
        if (result) {
            self.el.innerHTML = result;
        }
    },
    send: function (e) {
        "use strict";

        var self = ui.contact,
            client;

        if (e) {
            e.preventDefault();
        }
        if (self.active && ui.form.valid(self.required)) {
            client = new XMLHttpRequest();

            client.open("POST", self.el.action, true);
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            client.send(ui.form.serialize(self.el) + "&key=" + self.key);
            client.addEventListener("error", self.success, true);
            client.addEventListener("load", self.success, true);
            ui.form.accessibility();
        }
    },
    option: function () {
        "use strict";

        var self = ui.contact,
            val = location.hash,
            arr = self.subject && self.subject.options,
            selected = false,
            i;
        val = val && val.substring(1);

        if (arr) {
            if (val) {
                for (i = 0; i < arr.length; i += 1) {
                    if (arr[i].getAttribute("data-name") === val) {
                        if (self.subject.selectedIndex > -1) {
                            arr[self.subject.selectedIndex].selected = false;
                        }

                        selected = true;
                        arr[i].selected = true;
                    }
                }
            }
            if (!selected && self.subject.selectedIndex !== 0) {
                arr[0].selected = true;
            }
        }
    },
    autogrow: function (e) {
        "use strict";

        e = e || ui.w.event; // IE8 backward compatibility
        var el = e.target || e.srcElement;

        if (el.scrollHeight <= 301) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + el.offsetHeight - el.clientHeight + "px";
        }
    },
    init: function (id) {
        "use strict";

        if (!this.active) {
            this.el = ui.form.el = id && ui.d.getElementById(id);

            if (this.el) {
                this.active = true;
                this.subject = ui.d.getElementById("subject");
                this.email = ui.d.getElementById("email");
                this.tel = ui.d.getElementById("tel");
                this.message = ui.d.getElementById("message");
                this.status = ui.d.getElementById("status");
                this.el.action = this.url;
                this.required = ui.form.list("[data-required]");

                ui.dependencies();
                this.option();
                this.el.addEventListener("submit", this.send);

                ui.w.onhashchange = this.option;

                if (this.tel) {
                    this.tel.addEventListener("keypress", ui.form.number, true);
                    this.tel.addEventListener("paste", ui.form.paste, true);
                    this.tel.addEventListener("drop", ui.form.drop, true);
                }
                if (this.message) {
                    this.message.addEventListener(ui.has.classList ? "input" : "keyup", this.autogrow, true);
                }
            }
        }
    }
};

ui.contact.init("contact");
