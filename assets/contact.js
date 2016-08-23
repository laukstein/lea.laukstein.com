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

var contact = {
    key: "8a321b1a-8fa6-470f-91ab-fcbe92ffbfbf",
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
                error,
                i;

            for (i = 0; i < arr.length; i += 1) {
                arr[i].classList.remove("error");
            }

            arr = this.required;

            for (i = 0; i < arr.length; i += 1) {
                if (!arr[i].value ||
                    arr[i].type === "email" && !/^\S+@\S+\.\S+$/.test(arr[i].value) ||
                    arr[i].type === "tel" && !/^(\+972(\-)?|0)([1-468-9](\-)?\d{7}|(5|7)[0-9](\-)?\d{7})$/.test(arr[i].value) ||
                    arr[i].name === "message" && arr[i].value.length < 5) {
                    error = arr[i].getAttribute("data-error");
                    flag = false;

                    arr[i].parentNode.classList.add("error");

                    if (error) {
                        arr[i].setAttribute("placeholder", error);
                    }
                }
            }

            return flag;
        } else {
            return true;
        }
    },
    has: {
        classList: "classList" in document.documentElement,
        eventListener: !!document.addEventListener,
        valid: function (fn) {
            "use strict";

            try {
                return fn();
            } catch (e) {
                this.error.e = e;
                return this.error;
            }
        },
        error: {
            e: null
        }
    },
    accessibility: function (flag) {
        "use strict";

        var arr = contact.list("input, select, textarea, button"),
            i;

        for (i = 0; i < arr.length; i += 1) {
            if (flag) {
                arr[i].removeAttribute("disabled");
            } else {
                arr[i].setAttribute("disabled", "");
            }
            if (arr[i].tagName === "BUTTON") {
                if (flag) {
                    arr[i].innerHTML = arr[i].getAttribute("data-text");
                    arr[i].removeAttribute("data-text");
                } else {
                    arr[i].setAttribute("data-text", arr[i].innerHTML);
                    arr[i].innerHTML = "שולח...";
                }
            }
        }
    },
    success: function () {
        "use strict";

        var response = this.response,
            error = [],
            result;
        response = response && contact.has.valid(function () {
            return JSON.parse(response);
        });

        if (contact.status) {
            contact.status.innerHTML = "";
        }
        if (response) {
            if (response.result === "success") {
                result = "<h1 class=success>תודה</h1><p>הודעה נשלחה</p>";
            } else if (response.error) {
                if (response.error.email) {
                    if (contact.email) {
                        contact.email.parentNode.classList.add("error");
                    }

                    error.push("אימייל לא קיים");
                }
                if (response.error.message) {
                    if (contact.message) {
                        contact.message.parentNode.classList.add("error");
                    }

                    error.push("הודעה קצרה מדי");
                }
                if (error.length && contact.status) {
                    contact.status.innerHTML = "<ul class=error><li>" + error.join("<li>") + "</ul>";
                    contact.accessibility(true);
                }
            }
        }
        if (!error.length && !result) {
            result = "<h1 class=error>שגיאה בשרת...</h1><p>ניתן להירשם דרך <a href=//www.facebook.com/LeaLaukstein/>LeaLaukstein</a> או <a onclick=location.reload() tabindex=0>תנסי שוב</a>.</p>";
            // console.error("Form error", response);
        }
        if (result) {
            contact.el.innerHTML = result;
        }
    },
    serialize: function () {
        "use strict";

        var arr = this.list("input, select, textarea"),
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
        if (contact.active && contact.valid()) {
            var client = new XMLHttpRequest();

            client.open("POST", contact.el.action, true);
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            client.send(contact.serialize(contact.el) + "&key=" + contact.key);
            client.addEventListener("error", contact.success, true);
            client.addEventListener("load", contact.success, true);
            contact.accessibility(false);
        }
    },
    dependencies: function () {
        "use strict";

        if (!this.has.classList && Element.prototype) {
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
        if (!this.has.eventListener) {
            // EventListener polyfill https://gist.github.com/jonathantneal/3748027
            (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
                WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
                    var target = this;

                    registry.unshift([target, type, listener, function (event) {
                        event.currentTarget = target;
                        event.preventDefault = function () {
                            event.returnValue = false;
                        };
                        event.stopPropagation = function () {
                            event.cancelBubble = true;
                        };
                        event.target = event.srcElement || target;

                        listener.call(target, event);
                    }]);

                    this.attachEvent("on" + type, registry[0][3]);
                };
                WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
                    var register,
                        i;

                    for (i = 0; register = registry[i]; i += 1) {
                        if (register[0] === this && register[1] === type && register[2] === listener) {
                            return this.detachEvent("on" + type, registry.splice(i, 1)[0][3]);
                        }
                    }
                };
                WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
                    return this.fireEvent("on" + eventObject.type, eventObject);
                };
            })(window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
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
                contact.number(e, val);
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
    option: function () {
        "use strict";

        var val = location.hash,
            arr = contact.subject && contact.subject.options,
            selected = false,
            i;
        val = val && val.substring(1);

        if (arr) {
            if (val) {
                for (i = 0; i < arr.length; i += 1) {
                    if (arr[i].getAttribute("data-name") === val) {
                        if (contact.subject.selectedIndex > -1) {
                            arr[contact.subject.selectedIndex].selected = false;
                        }

                        selected = true;
                        arr[i].selected = true;
                    }
                }
            }
            if (!selected && contact.subject.selectedIndex !== 0) {
                arr[0].selected = true;
            }
        }
    },
    autogrow: function (e) {
        "use strict";

        e = e || window.event; // IE8 backward compatibility
        var el = e.target || e.srcElement;

        if (el.scrollHeight <= 301) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + el.offsetHeight - el.clientHeight + "px";
        }
    },
    init: function (id) {
        "use strict";

        if (this.active) return;

        this.el = id && document.getElementById(id);

        if (this.el) {
            this.active = true;
            this.subject = document.getElementById("subject");
            this.email = document.getElementById("email");
            this.tel = document.getElementById("tel");
            this.message = document.getElementById("message");
            this.status = document.getElementById("status");
            this.el.action = "//lab.laukstein.com/contact";
            this.required = this.list("[data-required]");

            this.dependencies();
            this.option();
            this.el.addEventListener("submit", this.send);

            window.onhashchange = this.option;

            if (this.tel) {
                this.tel.addEventListener("keypress", this.number, true);
                this.tel.addEventListener("paste", this.paste, true);
                this.tel.addEventListener("drop", this.drop, true);
            }
            if (this.message) {
                this.message.addEventListener(this.has.classList ? "input" : "keyup", this.autogrow, true);
            }
        }

    }
};

contact.init("contact");
