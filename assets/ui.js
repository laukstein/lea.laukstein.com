window.ui = {
    w: window,
    d: document,
    environment: location.hostname === "lea.laukstein.com" ? "prod" : "dev",
    awaitCallback: [],
    has: {
        classList: "classList" in document.documentElement
    },
    asyncScript: function (src/* , success, options |, options */) {
        "use strict";

        var script = this.d.createElement("script"),
            onSuccess = typeof arguments[1] === "function" && arguments[1],
            options = onSuccess ? arguments[2] || {} : arguments[1] || {},
            params = JSON.parse(JSON.stringify(options)),
            onReadyStateChange,
            toggleListener,
            onError,
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

            if (options.onSuccess || options.onError) {
                toggleListener = function (flag) {
                    flag = flag === true ? "addEventListener" : "removeEventListener";

                    script[flag]("load", onLoad);
                    script[flag]("error", onError);
                    script[flag]("readystatechange", onReadyStateChange);

                    if (flag === "removeEventListener" && options.remove) {
                        script.remove();
                    }
                };
                onLoad = function () {
                    toggleListener(false);

                    if (options.onSuccess) {
                        options.onSuccess(script);
                    }
                };
                onError = function () {
                    toggleListener(false);

                    if (options.onError) {
                        options.onError();
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

            // Sentry SDK https://docs.sentry.io/quickstart/?platform=browser
            this.asyncScript("https://browser.sentry-cdn.com/4.4.2/bundle.min.js", {
                // Generator SRI hash https://www.srihash.org
                integrity: "sha384-bW79dask6g+4MR7Fa/Bt863WjHb3vxrp96tBD8j/fYluPKn8xq8OySgurAopQ/j0",
                crossorigin: "anonymous",
                onSuccess: function () {
                    if (window.Sentry && Sentry.init) {
                        Sentry.init({
                            dsn: "https://1e8b57d9fb744a9ba1068e9b5cc5386c@sentry.io/156066",
                            environment: ui.environment,
                            whitelistUrls: [/lea\.laukstein\.com/]
                        });
                        ui.identify.sentry();
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
            } /* else if (self.user.email) {
                options.log(self);
            } */
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
        sentry: function () {
            "use strict";

            this.track({
                name: "Sentry",
                condition: function (self) {
                    return window.Sentry && Sentry.configureScope && self.user.email;
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
                    var root = this;

                    Sentry.configureScope(function (scope) {
                        scope.setUser(root.params(self));
                    });
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
            email = session && (session.email || session.EMAIL || "").toLowerCase();
            diff = email !== this.identify.user.email;

            this.getUser();

            if (email) {
                if (!diff) {
                    user = this.identify.user;
                }

                user.date = +new Date;
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
    isNumber: function (str) {
        "use strict";

        // Is a number
        return !isNaN(parseFloat(str)) && isFinite(str) &&
            // Isn't a phone number that begins with "0"
            (String(str).length === String(Number(str)).length || str.indexOf(".") > 0);
    },
    isObj: function (str) {
        "use strict";

        try {
            var obj = JSON.parse(str);

            return typeof obj === "object";
        } catch (e) {
            return false;
        }
    },
    hash: function (opt /* param */) {
        "use strict";

        // opt => key | hash, param, getCookie
        opt = typeof opt === "string" || Array.isArray(opt) ? {param: opt} : opt || {};

        if (typeof opt.hash !== "string") {
            opt.hash = opt.getCookie ? ui.d.cookie : location.hash;
        }

        var arr = opt.getCookie ? opt.hash.split("; ") :
                opt.hash.replace(/^\??#?!?/, "").split(/\?|#|&/),
            obj = {},
            pair,
            i;

        if (arr.length) {
            for (i = 0; i < arr.length; i += 1) {
                pair = arr[i].split(/\x3D(.+)/, 2);

                if (pair[0] && !obj.hasOwnProperty(pair[0])) {
                    pair[0] = decodeURIComponent(pair[0]);

                    if (this.isNumber(pair[1])) {
                        obj[pair[0]] = Number(pair[1]);
                    } else {
                        // Percent-decoding https://github.com/MithrilJS/mithril.js/issues/2060
                        pair[1] = pair[1] && pair[1].replace(/(?:%[a-f0-9]+)+/gim, decodeURIComponent);

                        if (pair[1] && this.isObj(pair[1])) {
                            pair[1] = JSON.parse(pair[1]);
                        }

                        obj[pair[0]] = pair[1];
                    }
                }
            }
        }
        if (Array.isArray(opt.param)) {
            return this.filterObj(obj, function (key) {
                return opt.param.includes(key);
            });
        }

        return opt.param ? obj[opt.param] : obj;
    },
    serialize: function (obj, options) {
        "use strict";

        if (typeof obj === "object") {
            options = options || {};
            var arr = Object.keys(obj),
                result = [],
                i;

            for (i = 0; i < arr.length; i += 1) {
                if (obj[arr[i]]) {
                    result.push(arr[i] + "=" + encodeURIComponent(obj[arr[i]]));
                } else if (options.setEmptyValue) {
                    result.push(arr[i]);
                }
            }

            return result.join("&");
        }

        return "";
    },
    filterObj: function (raw, condition) {
        "use strict";

        return Object.keys(raw).filter(function (key) {
            return condition(key, raw);
        }).reduce(function (obj, key) {
            obj[key] = raw[key];

            return obj;
        }, {});
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
    video: {
        playlistLink: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUNNsgimJtU1q1LUMVsq44Dg&maxResults=50&key=AIzaSyBt0-e3Ups6i4p8GQs811EarYbpMiPfxg4",
        playlistLocalLink: "/assets/playlistItems.json",
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

            return id ? "<video poster=\"" + obj.image + "\" preload=auto crossorigin playsinline controls controlsList=nodownload>" +
                "    <source src=\"" + obj[this.size] + "\" type=\"video/mp4\">" +
                "</video>" : "";
        },
        youtubeConvert: function () {
            "use strict";

            var iframes = Array.from(ui.d.querySelectorAll(".video iframe")),
                i;

            for (i = 0; i < iframes.length; i += 1) {
                iframes[i].outerHTML = this.template(iframes[i].src.replace(/^.*\/embed\//, "").replace(/\?.*$/, ""));
            }
        },
        applyPlyr: function () {
            "use strict";

            var self = this,
                success;

            if (!self.youtubeSupport) {
                success = function () {
                    self.youtubeConvert();

                    var videos = Array.from(ui.d.querySelectorAll(".video video")),
                        options = {
                            controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "airplay", "fullscreen"],
                            resetOnEnd: true,
                            iconUrl: "/assets/plyr.svg",
                            blankUrl: "/assets/blank.mp4",
                            volume: 10
                        };

                    videos.map(function (video) {
                        return new Plyr(video, options); // eslint-disable-line new-cap
                    });

                    delete ui.video.youtubeSupportProgress;
                };

                if (ui.w.Plyr) {
                    success();
                } else if (!self.youtubeSupportProgress) {
                    self.youtubeSupportProgress = true;

                    ui.asyncScript("/assets/plyr.polyfilled.min.js", success);
                }
            }
        },
        youtubeSupport: function (legacyCallback) {
            "use strict";

            var self = ui.video,
                loadImage = {};

            loadImage.callback = function () {
                self.youtubeSupport = false;

                if (ui.videoLegacy) {
                    sessionStorage["ui.videoLegacy"] = JSON.stringify(ui.videoLegacy);
                } else {
                    try {
                        ui.videoLegacy = JSON.parse(sessionStorage["ui.videoLegacy"]);
                    } catch (e) {
                        ui.videoLegacy = {};
                    }
                }

                self.youtubeConvert();

                if (!ui.w.Plyr && !self.youtubeSupportProgress) {
                    self.applyPlyr();

                    var el = ui.d.createElement("link");

                    el.href = "/assets/plyr.css";
                    el.rel = "stylesheet";

                    ui.d.body.appendChild(el);
                }

                // Don't apply too many FS.setUserVars until FullStory supports UserVars removal
                // if (!self.youtubeSupport && ui.w.FS && FS.setUserVars) {
                //     FS.setUserVars({youTube_bool: false}); // eslint-disable-line
                // }

                return self.youtubeSupport;
            };
            loadImage.legacyCallback = function () {
                if (typeof legacyCallback === "function") {
                    legacyCallback();
                }
            };

            if (sessionStorage["ui.videoLegacy"] && sessionStorage.youtubeSupport === "false") {
                loadImage.legacyCallback();

                return loadImage.callback();
            }

            loadImage.get = function (url, onload, onerror) {
                var image = new Image();

                image.addEventListener("load", onload);
                image.addEventListener("error", onerror);

                image.src = url;
            };
            loadImage.result = function (isLoaded) {
                sessionStorage.youtubeSupport = !!isLoaded;

                if (!isLoaded && self.youtubeSupport) {
                    ui.asyncScript("/assets/ui-videoLegacy.js", this.callback);
                }
            };
            loadImage.error = function (finalCall) {
                // Use here loadImage instead of this
                if (finalCall) {
                    loadImage.legacy(true);
                }

                // console.log(e.target.src);
                loadImage.result(false);
            };
            loadImage.success = function (e) {
                if (e.target.naturalWidth > 1) {
                    this.result(true);

                    self.youtubeSupport = true;
                } else {
                    this.error();
                }
            };
            loadImage.legacy = function (hasStatus) {
                var videos = localStorage.videos;

                try {
                    videos = videos && JSON.parse(videos);
                } catch (err) {}

                if (videos) {
                    if (hasStatus) {
                        this.legacyCallback();
                    } else if (videos.local) {
                        this.error(true);
                    } else {
                        this.result(true);

                        this.legacyCallback();
                    }
                } else {
                    this.call = function (url, isFallback) {
                        fetch(url).then(function (response) {
                            return response.json();
                        }).then(function (response) {
                            response.downloadTime = +new Date;
                            localStorage.videos = JSON.stringify(response);

                            if (typeof legacyCallback === "function") {
                                legacyCallback();
                            }

                            return loadImage.result(!isFallback);
                        }).catch(function () {
                            return /^https?:\/\/.*/.test(url) ? loadImage.call(self.playlistLocalLink, true) : !hasStatus && loadImage.error(true);
                        });
                    };

                    this.call(self.playlistLink);
                }
            };

            loadImage.get("https://www.youtube.com/favicon.ico", function (e) {
                // ISP Etrog <https://www.etrog.net.il> blocker will return 1x1px image
                if (e.target.naturalWidth > 1) {
                    // Software Nativ <https://www.enativ.com> blocks www.googleapis.com API
                    loadImage.legacy();
                } else {
                    loadImage.error();
                }
            }, loadImage.error);

            // TODO: when internet goes off, then remove the sessionStorage

            return "checking";
        }
    },
    legacy: function (callback) {
        "use strict";

        var self = this;

        if (typeof callback === "function") {
            self.awaitCallback.push(callback);
        }
        if (self.legacy.__once) {
            if (!self.legacy.__loading) {
                self.legacy.__runAwaitList();
            }

            return;
        }

        self.legacy.__once = true;
        self.legacy.__loading = true;
        self.legacy.__runAwaitList = function () {
            var arr = self.awaitCallback.slice(),
                i;

            if (self.legacy.__loading) {
                delete self.legacy.__loading;
            }

            for (i = 0; i < arr.length; i += 1) {
                self.awaitCallback.splice(0, 1);

                if (arr[i] && typeof arr[i] === "function") {
                    arr[i]();
                }
            }
        };

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

        if (typeof console === "undefined") {
            this.w.console = {
                log: function () {
                    return arguments;
                }
            };
            this.w.console.warn = this.w.console.log;
            this.w.console.error = this.w.console.log;
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
        if (!Array.from || !Array.prototype.includes || !self.w.fetch || !self.w.Promise || !String.prototype.startsWith) {
            self.asyncScript("/assets/legacy.js", function () {
                self.video.youtubeSupport(self.legacy.__runAwaitList);
            });
        } else {
            self.video.youtubeSupport(self.legacy.__runAwaitList);
        }
    },
    init: function () {
        "use strict";

        var self = this;

        this.legacy(function () {
            self.getUser();
            self.analytics();

            var opt = {
                el: self.d.getElementById("bar-close")
            };

            if (opt.el) {
                opt.event = self.w.PointerEvent ? "pointerdown" : navigator.maxTouchPoints > 0 ||
                    (self.w.matchMedia ? self.w.matchMedia("(pointer: coarse)").matches : "ontouchstart" in self.w) ?
                    "touchstart" : "mousedown";
                opt.options = opt.event !== "mousedown" && (function () {
                    // Resource http://tonsky.me/blog/chrome-intervention/
                    // Spec issue https://github.com/whatwg/dom/issues/491
                    var passiveSupported = false,
                        options;

                    try {
                        options = Object.defineProperty({}, "passive", {
                            get: function () {
                                passiveSupported = true;

                                return passiveSupported;
                            }
                        });

                        addEventListener("test", options, options);
                        removeEventListener("test", options, options);
                    } catch (err) {
                        passiveSupported = false;
                    }

                    return passiveSupported;
                }()) ? {passive: true} : true;

                opt.el.addEventListener(opt.event, opt.el.click, opt.options);
            }
        });
    }
};
ui.cookie = (function () {
    "use strict";

    var res = function (obj /* or key */, expires) {
        // obj => {key: value} or key/s
        // expires => N seconds, default 1 day

        if (typeof obj === "object" && !Array.isArray(obj)) {
            var key,
                val;

            expires = ui.isNumber(expires) ? expires : 86400;
            expires = new Date(new Date() * 1 + expires * 1000).toUTCString();

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    val = typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key];
                    ui.d.cookie = encodeURIComponent(key) + "=" +
                        encodeURIComponent(val) + ";expires=" + expires + ";secure;samesite=strict";
                }
            }
        }

        return ui.hash({
            getCookie: true,
            param: typeof obj === "string" || Array.isArray(obj) ? obj : undefined
        });
    };

    res.remove = function (key) {
        var obj = {};

        if (key) {
            if (Array.isArray(key)) {
                key.forEach(function (pair) {
                    obj[pair] = "";
                });
            } else {
                obj[key] = "";
            }
        } else {
            key = ui.d.cookie.split("; ");

            key.forEach(function (pair) {
                obj[pair.split(/\x3D(.+)/, 1)[0]] = "";
            });
        }

        return ui.cookie(obj, -1);
    };

    return res;
}());

ui.init();
