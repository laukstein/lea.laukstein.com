/*eslint
comma-spacing: 2,
dot-notation: [2, {"allowKeywords": true}],
eqeqeq: 2,
indent: 2,
key-spacing: [2, {"beforeColon": false, "afterColon": true}],
no-console: 0,
no-empty-function: 2,
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

var form = {
    key: "2d8c12be3a09dc2eb907c9be7",
    list: function (selector) {
        "use strict";

        if (!this.el || !selector) return [];

        var arr = this.el.querySelectorAll(selector);
        return arr.length ? Array.from && Array.from(arr) || [].slice.call(arr) : [];
    },
    valid: function () {
        "use strict";

        if (this.required.length) {
            var arr = this.list(".error"),
                flag = true,
                i;

            for (i = 0; i < arr.length; i += 1) {
                arr[i].classList.remove("error");
            }

            arr = this.required;

            for (i = 0; i < arr.length; i += 1) {
                if (!arr[i].value || (arr[i].type === "email" && !/^\S+@\S+\.\S+$/.test(arr[i].value))) {
                    flag = false;
                    arr[i].parentNode.classList.add("error");
                    arr[i].setAttribute("placeholder", arr[i].getAttribute("data-error"));
                }
            }

            return flag;
        } else {
            return true;
        }
    },
    success: function (data) {
        "use strict";

        var message;

        if (data) {
            if (data.result === "success") {
                message = "<h1 class=success>תודה</h1><p>לסיום ההרשמה תקבל עכשיו מייל לאישור</p>";
            } else if (data.msg && data.msg.indexOf("list-manage.com/subscribe/send-email")) {
                message = "<h1 class=error>שגיאה...</h1><p>את כבר רשומה, תנסי עם <a href=" + document.location.href + ">אימייל אחר</a></p>";
            } else {
                message = "<h1 class=error>שגיאה...</h1><p>בבקשה <a href=" + document.location.href + ">תנסי שוב</a> מאוחר יותר</p>";
            }
        } else {
            message = "<h1 class=error>שגיאה בשרת...</h1><p>ניתן להירשם דרך <a href=//www.facebook.com/LeaLaukstein/>LeaLaukstein</a> או <a href=" + document.location.href + ">תנסי שוב</a></p>";
            console.error("Form error", data);
        }

        this.el.innerHTML = message;
    },
    serialize: function () {
        "use strict";

        var arr = this.list("input"),
            q = [],
            i;

        for (i = 0; i < arr.length; i += 1) {
            if (!(arr[i].type === "checkbox" || arr[i].type === "radio") && arr[i].value || arr[i].checked) {
                q.push(arr[i].name + "=" + encodeURIComponent(arr[i].value));
            }
        }

        return q.join("&");
    },
    send: function (e) {
        "use strict";

        if (e) {
            e.preventDefault();
        }
        if (form.active && form.valid()) {
            var head = document.getElementsByTagName("head")[0],
                script = document.createElement("script"),
                arr = form.list("input, button"),
                i;
            script.src = form.el.action + "&" + form.serialize(form.el) + "&b_" + form.key + "_" + form.name + "&_=" + Math.random().toString(16).substr(2, 8) + "&c=form.success";

            for (i = 0; i < arr.length; i += 1) {
                arr[i].setAttribute("disabled", "");

                if (arr[i].tagName === "BUTTON") {
                    arr[i].innerHTML = "שולח...";
                }
            }

            if (form.currentScript) {
                head.removeChild(currentScript);
            }

            head.appendChild(script);
            form.currentScript = script;
        }
    },
    dependencies: function () {
        "use strict";

        if (!("classList" in document.documentElement) && Element.prototype) {
            Object.defineProperty(Element.prototype, "classList", {
                get: function () {
                    var self = this;

                    function classlist() {
                        return self.className.split(/\s+/);
                    }
                    function update(fn) {
                        return function (value) {
                            var classes = classlist(),
                                index = classes.indexOf(value);

                            fn(classes, index, value);
                            self.className = classes.join(" ");
                        };
                    }

                    return {
                        add: update(function (classes, index, value) {
                            ~index || classes.push(value);
                        }),
                        remove: update(function (classes, index) {
                            ~index && classes.splice(index, 1);
                        }),
                        item: function (index) {
                            return classlist()[index] || null;
                        },
                        toggle: update(function (classes, index, value) {
                            ~index ? classes.splice(index, 1) : classes.push(value);
                        }),
                        contains: function (value) {
                            return !!~classlist().indexOf(value);
                        }
                    };
                }
            });
        }
        if (typeof console === "undefined") {
            window.console = {
                log: function () {
                    return;
                },
                error: function () {
                    return;
                }
            };
        }
    },
    number: function (e, val) {
        "use strict";

        if (e) {
            try {
                val = val || String.fromCharCode(e.keyCode || e.which);
                if (val === " " || isNaN(val)) e.preventDefault();
            } catch (err) {
                e.preventDefault();
            }
        }
    },
    paste: function (e) {
        "use strict";

        if (e) {
            var val;

            if (e.clipboardData) {
                val = e.clipboardData.getData("text/plain");
            } else if (window.clipboardData) {
                val = window.clipboardData.getData("Text");
            }
            if (val) {
                form.number(e, val);
            } else {
                e.preventDefault();
            }
        }
    },
    drop: function (e) {
        "use strict";

        if (e) {
            e.preventDefault();
        }
    },
    init: function (id) {
        "use strict";

        if (this.active) return;

        this.el = id && document.getElementById(id);

        if (this.el) {
            this.name = this.el.getAttribute("name");

            if (this.name) {
                this.active = true;
                this.el.action = "//laukstein.us13.list-manage.com/subscribe/post-json?u=" + this.key + "&id=" + this.name;
                this.el.addEventListener("submit", this.send);
                this.required = this.list("[data-required]");
                this.dependencies();

                var tel = document.getElementById("tel");

                if (tel) {
                    tel.addEventListener("keypress", this.number);
                    tel.addEventListener("paste", this.paste);
                    tel.addEventListener("drop", this.drop);
                }
            }
        }
    }
};

form.init("form");
