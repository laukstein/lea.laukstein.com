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

var ui = {
    d: document,
    w: window,
    has: {
        classList: "classList" in document.documentElement,
        eventListener: !!document.addEventListener
    },
    hash: function (param) {
        "use strict";

        var arr = location.hash.slice(1).split("&"),
            obj = {},
            pair,
            i;

        if (arr.length) {
            for (i = 0; i < arr.length; i += 1) {
                pair = arr[i].split("=");

                if (pair[0]) {
                    obj[pair[0]] = !isNaN(pair[1]) ? Number(pair[1]) : pair[1] && decodeURIComponent(pair[1]);
                }
            }
        }

        return param ? obj[param] : obj;
    },
    dependencies: function () {
        "use strict";

        // var arguments;

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
        if (!Element.prototype.remove) {
            Object.defineProperty(Element.prototype, "remove", {
                value: function () {
                    if (this.parentElement) {
                        this.parentElement.removeChild(this);
                    }
                }
            });
        }
        if (!this.has.eventListener) {
            // EventListener polyfill https://gist.github.com/jonathantneal/3748027
            (function (wPrototype, dPrototype, ePrototype, on, off, event, registry) {
                wPrototype[on] = dPrototype[on] = ePrototype[on] = function (type, listener) {
                    var target = this;

                    registry.unshift([target, type, listener, function (e) {
                        e.currentTarget = target;
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };
                        e.stopPropagation = function () {
                            e.cancelBubble = true;
                        };
                        e.target = e.srcElement || target;

                        listener.call(target, e);
                    }]);

                    this.attachEvent("on" + type, registry[0][3]);
                };
                wPrototype[off] = dPrototype[off] = ePrototype[off] = function (type, listener) {
                    var register,
                        i;

                    for (i = 0; register = registry[i]; i += 1) {
                        if (register[0] === this && register[1] === type && register[2] === listener) {
                            return this.detachEvent("on" + type, registry.splice(i, 1)[0][3]);
                        }
                    }
                };
                wPrototype[event] = dPrototype[event] = ePrototype[event] = function (eventObject) {
                    return this.fireEvent("on" + eventObject.type, eventObject);
                };
            })(this.w.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
        }
        if (typeof console === "undefined") {
            this.w.console = {
                log: function () {
                    return;
                },
                error: function () {
                    return;
                }
            };
        }
    },
    analytics: {
        key: "UA-11883501-1",
        url: "laukstein.com",
        listener: function (flag) {
            "use strict";

            var self = ui.analytics;
            flag = flag === true ? "addEventListener" : "removeEventListener";

            self.el[flag]("load", self.load);
            self.el[flag]("error", self.listener);
            self.el[flag]("readystatechange", self.readystatechange);

            if (!flag) {
                self.el.removeAttribute("id");
            } else if (flag !== true) {
                self.el.remove();
            }
        },
        load: function () {
            "use strict";

            var self = ui.analytics;

            // Disabling cookies https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#disabling_cookies
            if (ui.w.ga) {
                ga("create", self.key, self.url, {
                    storage: "none",
                    clientId: localStorage.gaClientId
                });

                if (!localStorage.gaClientId) {
                    ga(function (tracker) {
                        localStorage.gaClientId = tracker.get("clientId");
                    });
                }

                ga("send", "pageview");
            }

            self.listener();
        },
        readystatechange: function () {
            "use strict";

            var self = ui.analytics;

            if (this.readyState === "complete" || this.readyState === "loaded") {
                if (ui.w.ga) {
                    self.load();
                } else {
                    self.listener();
                }
            }
        },
        init: function () {
            "use strict";

            this.el = ui.d.createElement("script");
            this.el.src = "https://www.google-analytics.com/analytics.js";
            this.el.id = +new Date + "";

            ui.d.body.appendChild(this.el);

            this.el = ui.d.getElementById(this.el.id);

            if (this.el) {
                ui.dependencies("event");
                this.listener(true);
            }
        }
    }
};

ui.analytics.init();
