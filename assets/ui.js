window.ui = {
    w: window,
    d: document,
    environment: location.host === "lea.laukstein.com" ? "production" : "development",
    has: {
        classList: "classList" in document.documentElement,
        eventListener: !!document.addEventListener
    },
    asyncScript: function (src/* , success, options |, options */) {
        "use strict";

        var script = this.d.createElement("script"),
            onSuccess = typeof arguments[1] === "function" && arguments[1],
            options = onSuccess ? arguments[2] || {} : arguments[1] || {},
            params = JSON.parse(JSON.stringify(options)),
            onReadyStateChange,
            toggleListener,
            onLoad,
            key;

        if (src) {
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
        }

        return null;
    },
    analytics: function () {
        "use strict";

        if (this.environment === "production") {
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id
            this.asyncScript("https://www.google-analytics.com/analytics.js", {
                onSuccess: function () {
                    if (window.ga) {
                        ga("create", "UA-11883501-1", "laukstein.com", {
                            clientId: localStorage.gaClientId,
                            storage: "none"
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
                this.asyncScript("https://www.fullstory.com/s/fs.js", {
                    onStart: function () {
                        window._fs_debug = false; // eslint-disable-line
                        window._fs_host = "www.fullstory.com"; // eslint-disable-line
                        window._fs_org = "3YG86"; // eslint-disable-line
                        window._fs_namespace = "FS"; // eslint-disable-line
                    },
                    onSuccess: function () {
                        var g = window[window._fs_namespace || "FS"] = function (a, b) { // eslint-disable-line
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

                                while (1) { // eslint-disable-line
                                    n.cookie = "fs_uid=;domain=" + d + ";path=/;expires=" + new Date(0).toUTCString();
                                    i = d.indexOf(".");

                                    if (i < 0) break;

                                    d = d.slice(i + 1);
                                }
                            }
                        };

                        ui.identify.fs();
                    }
                });
            }

            // Facebook Pixel https://www.facebook.com/business/help/952192354843755
            this.asyncScript("https://connect.facebook.net/en_US/fbevents.js", {
                onStart: function () {
                    var n;

                    if (!window.fbq) {
                        n = window.fbq = function () {
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
            this.asyncScript("https://cdn.ravenjs.com/3.14.2/raven.min.js", {
                crossorigin: "anonymous",
                onSuccess: function () {
                    if (window.Raven && Raven.config) {
                        Raven.config("https://1e8b57d9fb744a9ba1068e9b5cc5386c@sentry.io/156066", {
                            environment: ui.environmen
                        }).install();
                        ui.identify.raven();
                    }
                }
            });
        }
    },
    identify: {
        all: function () {
            "use strict";

            var arr = Object.keys(this),
                ignoredKeys = ["all", "user", "track"],
                i;

            ui.getUser();

            for (i = 0; i < arr.length; i += 1) {
                if (ignoredKeys.indexOf(arr[i]) === -1 && typeof this[arr[i]] === "function") {
                    this[arr[i]]();
                }
            }
        },
        track: function (options) {
            "use strict";

            options = options || {};
            var self = this,
                retryCount = 0,
                retryMax = 5,
                sequence,
                init;

            if (ui.environment === "production") {
                // https://www.quora.com/What-is-the-next-number-in-the-sequence-1-3-7-13-21-31-43-The-function-f-n
                // http://stackoverflow.com/questions/7944239/
                // http://stackoverflow.com/questions/37217953/
                // Array.apply(null, Array(6)).reduce(function(x, y, z){
                //     return x.concat(z < 2 ? z : x[z-1] + 2 * (x[z-2])); }, [])
                //     .filter(function(x, y, z){ return x && y === z.indexOf(x); });
                // [1, 3, 5, 11]
                sequence = function (n) {
                    return n < 2 ? 1 : sequence(n - 1) + 2 * (n - 1);
                };
                init = function () {
                    retryCount += 1;

                    if (retryCount < retryMax) {
                        if (typeof options.callback !== "function") {
                            console.log("Analytics disabled", options);
                        } else if (!options.hasOwnProperty("condition") || typeof options.condition === "function" ? options.condition(self) : options.condition) {
                            options.callback(self);
                        } else {
                            setTimeout(init, sequence(retryCount) * 500);
                        }
                    }
                };

                init();
            } else {
                console.log("Identified: " + options.name, this.user);
            }
        },
        fs: function () {
            "use strict";

            this.track({
                name: "FullStory",
                condition: function (self) {
                    return window.FS && self.user.email;
                },
                callback: function (self) {
                    // http://help.fullstory.com/develop-js/identify
                    FS.identify(self.user.email, self.user.fullName && {
                        displayName: self.user.fullName,
                        email: self.user.email
                    });
                }
            });
        },
        ga: function () {
            "use strict";

            this.track({
                name: "Google Analytics",
                condition: function (self) {
                    return window.ga && self.user.email;
                },
                callback: function (self) {
                    // https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#user_id
                    ga("set", "userId", self.user.email);
                }
            });
        },
        raven: function () {
            "use strict";

            this.track({
                name: "Sentry",
                condition: function (self) {
                    return window.Raven && Raven.setUserContext && self.user.email;
                },
                callback: function (self) {
                    var obj = {};

                    obj.email = self.user.email;

                    if (self.user.fullName) {
                        obj.username = self.user.fullName;
                    }

                    // https://docs.sentry.io/learn/context/
                    Raven.setUserContext(obj);
                }
            });
        },
        user: {}
    },
    setUser: function (session) {
        "use strict";

        var user = {},
            name = [],
            email,
            diff;

        try {
            email = session && (session.email || session.EMAIL);
            diff = email !== this.identify.user.email;

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
        } catch (e) {
            return {};
        }
    },
    getUser: function () {
        "use strict";

        this.identify.user = (function () {
            try {
                return JSON.parse(localStorage.user);
            } catch (e) {
                return {};
            }
        }());

        return this.identify.user;
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
                    obj[pair[0]] = isNaN(pair[1]) ? pair[1] && decodeURIComponent(pair[1]) : Number(pair[1]);
                }
            }
        }

        return param ? obj[param] : obj;
    },
    confirm: function (el) {
        "use strict";

        var arr,
            i;

        if (el && el.type === "checkbox") {
            arr = el.parentNode.parentNode.querySelectorAll("button, .button");

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
                        contains: function (value) {
                            return !!~classlist().indexOf(value);
                        },
                        item: function (index) {
                            return classlist()[index] || null;
                        },
                        remove: update(function (classes, index) {
                            ~index && classes.splice(index, 1);
                        }),
                        toggle: update(function (classes, index, value) {
                            ~index ? classes.splice(index, 1) : classes.push(value);
                        })
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
                        return typeof args[number] === "undefined" ? match : args[number];
                    });
                }
            });
        }
        if (!this.has.eventListener) {
            // EventListener polyfill https://gist.github.com/jonathantneal/3748027
            (function (wPrototype, dPrototype, ePrototype, on, off, event, registry) { // eslint-disable-line
                wPrototype[on] = dPrototype[on] = ePrototype[on] = function (type, listener) {
                    var self = this;

                    registry.unshift([self, type, listener, function (e) {
                        e.currentTarget = self;
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };
                        e.stopPropagation = function () {
                            e.cancelBubble = true;
                        };
                        e.target = e.srcElement || self;

                        listener.call(self, e);
                    }]);

                    this.attachEvent("on" + type, registry[0][3]);
                };
                wPrototype[off] = dPrototype[off] = ePrototype[off] = function (type, listener) {
                    var register,
                        i;

                    for (i = 0; register = registry[i]; i += 1) { // eslint-disable-line
                        if (register[0] === this && register[1] === type && register[2] === listener) {
                            return this.detachEvent("on" + type, registry.splice(i, 1)[0][3]);
                        }
                    }
                };
                wPrototype[event] = dPrototype[event] = ePrototype[event] = function (eventObject) {
                    return this.fireEvent("on" + eventObject.type, eventObject);
                };
            }(this.w.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener",
                    "dispatchEvent", []));
        }
        if (typeof console === "undefined") {
            this.w.console = {
                log: function () {
                    return arguments;
                },
                error: function () {
                    return arguments;
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
    init: function () {
        "use strict";

        this.legacy();
        this.getUser();
        this.analytics();
    }
};

ui.init();
