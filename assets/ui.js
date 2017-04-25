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
    confirm: function (el) {
        "use strict";

        if (el && el.type === "checkbox") {
            var arr = el.parentNode.parentNode.querySelectorAll("button, .button"),
                i;

            for (i = 0; i < arr.length; i += 1) {
                if (el.checked) {
                    arr[i].removeAttribute("disabled");
                } else {
                    arr[i].setAttribute("disabled", "");
                }
            }
        }
    },
    legacy: function () {
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
        if (!Element.prototype.remove) {
            Object.defineProperty(Element.prototype, "remove", {
                value: function () {
                    if (this.parentElement) {
                        this.parentElement.removeChild(this);
                    }
                }
            });
        }
        if (!String.prototype.format) {
            // Reference: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
            Object.defineProperty(String.prototype, "format", {
                value: function () {
                    var args = arguments;

                    return this.replace(/{(\d+)}/g, function (match, number) {
                        return typeof args[number] !== "undefined" ? args[number] : match;
                    });
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

        try {
            // Safari Private Browsing doesn't support localStorage
            localStorage.setItem("localStorage", "1");
            localStorage.removeItem("localStorage");
        } catch (err) {
            if (ui.w.localStorage) {
                // Required for Safari Private Browsing
                delete ui.w.localStorage;
            }

            ui.w.localStorage = {};
        }
    },
    asyncScript: function (src/*, success, options |, options */) {
        "use strict";

        if (src) {
            var script = this.d.createElement("script"),
                onSuccess = typeof arguments[1] === "function" && arguments[1],
                options = onSuccess ? arguments[2] || {} : arguments[1] || {},
                params = JSON.parse(JSON.stringify(options)),
                onReadyStateChange,
                toggleListener,
                onLoad,
                key;

            script.src = src;
            script.async = true;

            delete params.remove;
            delete params.onStart;

            if (Object.keys(params).length) {
                for (key in params) {
                    if (params.hasOwnProperty(key)) {
                        script.setAttribute(key, params[key]);
                    }
                }
            }
            if (typeof options.onStart === "function") {
                options.onStart();
            }

            (this.d.head || this.d.body).appendChild(script);

            if (onSuccess) {
                toggleListener = function (flag) {
                    flag = flag === true ? "addEventListener" : "removeEventListener";

                    script[flag]("load", onLoad);
                    script[flag]("error", toggleListener);
                    script[flag]("readystatechange", onReadyStateChange);
                };
                onLoad = function () {
                    toggleListener();
                    onSuccess(script);

                    if (options.remove) {
                        script.remove();
                    }
                };
                onReadyStateChange = function () {
                    if (this.readyState === "complete" || this.readyState === "loaded") {
                        onLoad();
                    }
                };

                toggleListener(true);
            } else if (options.remove) {
                script.remove();
            }

            return script;
        } else {
            return null;
        }
    },
    identify: {},
    analytics: function () {
        "use strict";

        if (location.host === "lea.laukstein.com") {
            ui.asyncScript("https://www.google-analytics.com/analytics.js", function () {
                if (window.ga) {
                    // Disabling cookies https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#disabling_cookies
                    ga("create", "UA-11883501-1", "laukstein.com", {
                        storage: "none",
                        clientId: localStorage.gaClientId
                    });

                    if (!localStorage.gaClientId) {
                        ga(function (tracker) {
                            localStorage.gaClientId = tracker.get("clientId");
                        });
                    }

                    ga("send", "pageview");

                    if (ui.identify.ga) {
                        ui.identify.ga();
                    }
                }
            }, {
                remove: true
            });

            if (!window.FS) {
                ui.asyncScript("https://www.fullstory.com/s/fs.js", function () {
                    var g = window.FS = function (a, b) {
                        if (g.q) {
                            g.q.push([a, b]);
                        } else {
                            g._api(a, b); // eslint-disable-line
                        }
                    };
                    g.q = [];
                    g.setUserVars = function (v) {
                        g("user", v);
                    };
                    g.identify = function (i, v) {
                        g("user", {uid: i});

                        if (v) {
                            g.setUserVars(v);
                        }
                    };
                    g.identifyAccount = function (i, v) {
                        o = "account";
                        v = v || {};
                        v.acctId = i;

                        g(o, v);
                    };
                    g.clearUserCookie = function (c, d, i) {
                        if (!c || ui.d.cookie.match("fs_uid=[`;`]*`[`;`]*`[`;`]*`")) {
                            d = n.domain;

                            while (1) {
                                n.cookie = "fs_uid=;domain=" + d + ";path=/;expires=" + new Date(0).toUTCString();
                                i = d.indexOf(".");

                                if (i < 0) break;

                                d = d.slice(i + 1);
                            }
                        }
                    };

                    if (ui.identify.FS) {
                        ui.identify.FS();
                    }
                }, {
                    onStart: function () {
                        window._fs_debug = false; // eslint-disable-line
                        window._fs_host = "www.fullstory.com"; // eslint-disable-line
                        window._fs_org = "3YG86"; // eslint-disable-line
                        window._fs_namespace = "FS"; // eslint-disable-line
                    },
                    remove: true
                });
            }

            ui.asyncScript("https://connect.facebook.net/en_US/fbevents.js", {
                onStart: function () {
                    // Facebook Pixel https://www.facebook.com/business/help/952192354843755
                    if (!window.fbq) {
                        var n = window.fbq = function () {
                            if (n.callMethod) {
                                n.callMethod.apply(n, arguments);
                            } else {
                                n.queue.push(arguments);
                            }
                        };

                        window._fbq = window._fbq || n; // eslint-disable-line
                        n.push = n;
                        n.loaded = true;
                        n.version = "2.0";
                        n.queue = [];
                    }

                    fbq("init", "1265828396834846");
                    fbq("track", "PageView");
                }
            });
        }
    },
    init: function () {
        "use strict";

        this.legacy();
        this.analytics();
    }
};

ui.init();
