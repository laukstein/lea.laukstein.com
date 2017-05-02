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
no-underscore-dangle: 0,
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
    environment: location.host === "lea.laukstein.com" ? "production" : "development",
    has: {
        classList: "classList" in document.documentElement,
        eventListener: !!document.addEventListener
    },
    hash: function (param) {
        "use strict";

        var arr = location.hash.replace(/^#!?/, "").split("&"),
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
            delete params.onSuccess;

            if (Object.keys(params).length) {
                for (key in params) {
                    if (params.hasOwnProperty(key)) {
                        script.setAttribute(key, params[key]);
                    }
                }
            }
            if (typeof options.onStart === "function") {
                options.onStart(script);
            }
            if (onSuccess) {
                options.onSuccess = onSuccess;
            }

            (this.d.head || this.d.body).appendChild(script);

            if (options.onSuccess) {
                toggleListener = function (flag) {
                    flag = flag === true ? "addEventListener" : "removeEventListener";

                    script[flag]("load", onLoad);
                    script[flag]("error", toggleListener);
                    script[flag]("readystatechange", onReadyStateChange);
                };
                onLoad = function () {
                    toggleListener();
                    options.onSuccess(script);

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
    setUser: function (session) {
        "use strict";

        try {
            var email = session && (session.email || session.EMAIL),
                diff = email !== this.identify.user.email,
                user = {},
                name = [];

            this.getUser();

            if (email) {
                if (!diff) {
                    user = this.identify.user;
                }

                user.date = +new Date();
                user.referrer = location.href;
                user.email = email;

                if (session.avatar) {
                    user.avatar = session.avatar;
                }
                if (session.tel || session.PHONE) {
                    user.telephone = session.tel || session.PHONE;
                }
                if (session.name || session.FNAME || session.firstName) {
                    name.push(session.name || session.FNAME || session.firstName);
                    user.firstName = session.name || session.FNAME || session.firstName;
                }
                if (session.lastName) {
                    name.push(session.lastName);
                    user.lastName = session.lastName;
                }
                if (name.length && (!user.fullName || session.lastName)) {
                    user.fullName = name.join(" ");
                }

                this.identify.user = user;
                localStorage.user = JSON.stringify(user);

                this.identify.all();
            }

            return user;
        } catch(e) {
            return {};
        }
    },
    getUser: function () {
        "use strict";

        this.identify.user = (function () {
            try {
                return JSON.parse(localStorage.user);
            } catch(e) {
                return {};
            }
        }());

        return this.identify.user;
    },
    identify: {
        user: {},
        ga: function () {
            "use strict";

            if (window.ga && this.user.email) {
                // Resource https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#user_id
                ga("set", "userId", this.user.email);
            }
        },
        FS: function () {
            "use strict";

            if (window.FS && this.user.email) {
                // Resource http://help.fullstory.com/develop-js/identify
                FS.identify(this.user.email, this.user.fullName && {
                    email: this.user.email,
                    displayName: this.user.fullName
                });
            }
        },
        Raven: function () {
            "use strict";

            if (window.Raven && Raven.setUserContext && this.user.email) {
                // Documentation https://docs.sentry.io/learn/context/
                var obj = {
                    email: this.user.email
                };

                if (this.user.fullName) {
                    obj.username = this.user.fullName;
                }

                Raven.setUserContext(obj);
            }
        },
        all: function () {
            "use strict";

            var arr = Object.keys(this),
                ignoredKeys = ["all", "user"],
                i;

            ui.getUser();

            for (i = 0; i < arr.length; i += 1) {
                if (ignoredKeys.indexOf(arr[i]) === -1 && typeof this[i] === "function") {
                    this[i]();
                }
            }
        }
    },
    analytics: function () {
        "use strict";

        ui.asyncScript("https://www.google-analytics.com/analytics.js", {
            onSuccess: function () {
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

                    ui.identify.ga();
                }
            },
            remove: true
        });

        if (!window.FS) {
            ui.asyncScript("https://www.fullstory.com/s/fs.js", {
                onStart: function () {
                    window._fs_debug = false;
                    window._fs_host = "www.fullstory.com";
                    window._fs_org = "3YG86";
                    window._fs_namespace = "FS";
                },
                onSuccess: function () {
                    var g = window[window._fs_namespace || "FS"] = function (a, b) {
                        if (g.q) {
                            g.q.push([a, b]);
                        } else if (g._api) {
                            g._api(a, b);
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

                    ui.identify.FS();
                }
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

        // Sentry JavaScript client Raven.js https://docs.sentry.io/clients/javascript/install/
        ui.asyncScript("https://cdn.ravenjs.com/3.14.2/raven.min.js", {
            crossorigin: "anonymous",
            onSuccess: function () {
                if (window.Raven && Raven.config) {
                    Raven.config("https://1e8b57d9fb744a9ba1068e9b5cc5386c@sentry.io/156066", {
                        environment: ui.environment
                    }).install();
                }
            }
        });
    },
    init: function () {
        "use strict";

        this.legacy();
        this.getUser();

        if (ui.environment === "production") {
            this.analytics();
        }
    }
};

ui.init();
