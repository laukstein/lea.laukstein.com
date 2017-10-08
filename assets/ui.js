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

        if (this.environment === "prod") {
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id
            this.asyncScript("https://www.google-analytics.com/analytics.js", {
                onSuccess: function () {
                    if (window.ga) {
                        ga("create", "UA-11883501-1", "laukstein.com", {
                            clientId: localStorage.gaClientId,
                            storage: "none",
                            userId: ui.identify.user.email
                        });

                        if (!localStorage.gaClientId) {
                            ga(function (tracker) {
                                localStorage.gaClientId = tracker.get("clientId");
                            });
                        }

                        // Page tracking
                        // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
                        ga("send", {
                            hitType: "pageview",
                            title: ui.d.title,
                            page: location.pathname
                        });

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
                    },
                    onSuccess: function () {
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
            this.asyncScript("https://cdn.ravenjs.com/3.17.0/raven.min.js", {
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
        } else {
            this.identify.all();
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
                retryMax = 4,
                init;

            if (ui.environment === "prod") {
                init = function () {
                    retryCount += 1;

                    if (retryCount < retryMax) {
                        if (options.condition(self)) {
                            options.callback(self);
                            options.log(self);
                        } else {
                            setTimeout(init, (retryCount - 1) * 1000);
                        }
                    }
                };

                init();
            } else if (self.user.email) {
                options.log(self);
            }
        },
        fs: function () {
            "use strict";

            this.track({
                name: "FullStory",
                condition: function (self) {
                    return window.FS && self.user.email;
                },
                params: function (self) {
                    var obj = {};

                    obj.email = self.user.email;

                    if (self.user.fullName) {
                        obj.displayName = self.user.fullName;
                    }
                    if (self.user.phone) {
                        obj.phone_str = self.user.phone; // eslint-disable-line
                    }

                    return obj;
                },
                callback: function (self) {
                    // http://help.fullstory.com/develop-js/identify
                    FS.identify(self.user.email, this.params(self));
                },
                log: function (self) {
                    console.log("FullStory", self.user.email, this.params(self));
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
                },
                log: function (self) {
                    console.log("Google Analytics", self.user.email);
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
                params: function (self) {
                    var obj = {};

                    obj.email = self.user.email;

                    if (self.user.fullName) {
                        obj.username = self.user.fullName;
                    }

                    return obj;
                },
                callback: function (self) {
                    // https://docs.sentry.io/learn/context/
                    Raven.setUserContext(this.params(self));
                },
                log: function (self) {
                    console.log("Sentry", this.params(self));
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
                    user.phone = session.tel || session.PHONE;
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

        if (this.identify.user.telephone) {
            // Parameter rename 2017/08/09
            this.identify.user.phone = this.identify.user.telephone;
            delete this.identify.user.telephone;

            localStorage.user = JSON.stringify(this.identify.user);
        }

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
            localStorage.localStorage = "1";
            delete localStorage.localStorage;
        } catch (e) {
            if (ui.w.localStorage) {
                // Required for Safari Private Browsing
                delete ui.w.localStorage;
            }
            if (ui.w.sessionStorage) {
                // Required for Safari Private Browsing
                delete ui.w.sessionStorage;
            }

            ui.w.localStorage = {};
            ui.w.sessionStorage = {};
        }
    },
    video: {
        getData: function (id) {
            "use strict";

            var obj = ui.videoLegacy && ui.videoLegacy[id] || {},
                res = {},
                prop;

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    res[prop] = "https://dl.dropboxusercontent.com/s/" + obj[prop] +
                        "/" + id + (prop === "image" ? ".jpg" : "-" + prop + ".mp4");
                }
            }

            return res;
        },
        size: (function () {
            "use strict";

            if (sessionStorage.videoSize) {
                return sessionStorage.videoSize;
            }

            var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection,
                result = "720p";

            if (connection && connection.type) {
                // Example https://github.com/daniellmb/downlinkMax/blob/master/downlinkmax.js
                switch (connection.type) {
                    case "none":
                    case "2g":
                    case "bluetooth":
                    case "cellular":
                    case "3g":
                    // case "4g":
                        result = "360p";
                        break;
                }
            } else if (navigator.maxTouchPoints > 0 || window.matchMedia && window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
                // Is touch device
                result = "360p";
            }

            sessionStorage.videoSize = result;

            return result;
        }()),
        template: function (id) {
            "use strict";

            var obj = this.getData(id);

            return id ? "<video poster=\"" + obj.image + "\" preload=auto controls controlsList=nodownload>" +
                "    <source src=\"" + obj[this.size] + "\" type=\"video/mp4\">" +
                "</video>" : "";
        },
        applyPlyr: function () {
            "use strict";

            if (!this.youtubeSupport) {
                var success = function () {
                    plyr.setup && plyr.setup({
                        showPosterOnEnd: true,
                        iconUrl: "/assets/plyr.svg",
                        blankUrl: "/assets/blank.mp4",
                        volume: 10
                    });
                    delete ui.video.youtubeSupportProgress;
                };

                if (ui.w.plyr) {
                    success();
                } else if (!this.youtubeSupportProgress) {
                    this.youtubeSupportProgress = true;

                    ui.asyncScript("/assets/plyr.js", success);
                }
            }
        },
        youtubeSupport: function () {
            "use strict";

            var loadImage = {},
                callback;

            callback = function () {
                var self = ui.video,
                    arr = ui.d.querySelectorAll(".video iframe"),
                    el,
                    i;

                if (ui.videoLegacy) {
                    sessionStorage["ui.videoLegacy"] = JSON.stringify(ui.videoLegacy);
                } else {
                    try {
                        ui.videoLegacy = JSON.parse(sessionStorage["ui.videoLegacy"]);
                    } catch (e) {
                        ui.videoLegacy = {};
                    }
                }

                self.youtubeSupport = sessionStorage.youtubeSupport === "true";

                for (i = 0; i < arr.length; i += 1) {
                    arr[i].outerHTML = self.template(arr[i].src.replace(/^.*\/embed\//, "").replace(/\?.*$/, ""));
                }

                if (!ui.w.plyr && !self.youtubeSupportProgress) {
                    self.applyPlyr();

                    el = ui.d.createElement("link");
                    el.href = "/assets/plyr.css";
                    el.rel = "stylesheet";

                    ui.d.body.appendChild(el);
                }
                // if (!self.youtubeSupport && ui.w.FS && FS.setUserVars) {
                //     FS.setUserVars({youTube_bool: false}); // eslint-disable-line
                // }

                return self.youtubeSupport;
            };

            if (sessionStorage["ui.videoLegacy"] && sessionStorage.youtubeSupport) {
                return callback();
            }

            loadImage.get = function (url, onload, onerror) {
                var image = new Image();

                image.onload = onload;
                image.onerror = onerror;
                image.src = url;
            };
            loadImage.result = function (isLoaded) {
                sessionStorage.youtubeSupport = isLoaded;

                if (!isLoaded) {
                    ui.asyncScript("/assets/ui-videoLegacy.js", callback);
                }
            };
            loadImage.error = function () {
                // console.log(e.target.src);
                loadImage.result(false);
            };
            loadImage.success = function (e) {
                if (e.target.naturalWidth > 1) {
                    loadImage.result(true);
                } else {
                    loadImage.error(e);
                }
            };

            loadImage.get("https://www.youtube.com/favicon.ico", function (e) {
                if (e.target.naturalWidth > 1) {
                    loadImage.get("https://img.youtube.com/vi/fkS2Go4_H7E/1.jpg", loadImage.success, loadImage.error);
                } else {
                    loadImage.error(e);
                }
            }, loadImage.error);

            return "checking";
        }
    },
    init: function () {
        "use strict";

        this.legacy();
        this.getUser();
        this.analytics();
        this.video.youtubeSupport();

        var el = this.d.getElementById("bar-close");

        if (el) {
            el.addEventListener("touchstart", el.click);
        }
    }
};

ui.init();
