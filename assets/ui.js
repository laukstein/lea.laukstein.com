window.ui = {
    w: window,
    d: document,
    environment: location.hostname === "lea.laukstein.com" ? "prod" : "dev",
    awaitCallback: [],
    has: {
        classList: "classList" in document.documentElement
    },
    log: function (data) {
        "use strict";

        console.log(data);

        if (window.FS) {
            try {
                FS.log(data);
            } catch (err) {
                console.error(err);
                console.trace();
            }
        }
    },
    generateID: function () {
        "use strict";

        return Math.random().toString(16).substr(2, 8).toUpperCase();
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
                    if (Object.prototype.hasOwnProperty.call(params, key)) {
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
                onReadyStateChange = function (e) {
                    if (e.readyState === "complete" || e.readyState === "loaded") {
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
            // Bugsnag https://docs.bugsnag.com/platforms/javascript/
            this.asyncScript("https://d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js", {
                onSuccess: function () {
                    if (window.Bugsnag && typeof Bugsnag.start === "function") {
                        Bugsnag.start({
                            apiKey: "99f662f6b9f9aa6eb92495f72b147a04",
                            autoTrackSessions: false,
                            collectUserIp: false,
                            onError: function (event) {
                                // https://help.fullstory.com/hc/en-us/articles/360020827233
                                // https://docs.bugsnag.com/platforms/javascript/customizing-error-reports/
                                if (event && window.FS && typeof FS.getCurrentSessionURL === "function") {
                                    var urlAtTime = FS.getCurrentSessionURL(true);

                                    if (urlAtTime) {
                                        event.addMetadata("fullstory", {
                                            urlAtTime: urlAtTime
                                        });
                                    }
                                }
                            }
                        });
                        ui.identify.bugsnag();
                    }
                }
            });

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

            window._fs_script = "edge.fullstory.com/s/fs.js";

            this.asyncScript("https://" + window._fs_script, {
                onStart: function () {
                    // https://help.fullstory.com/hc/en-us/articles/360020622514
                    window._fs_run_in_iframe = true;
                    window._fs_debug = false;
                    window._fs_host = "fullstory.com";
                    window._fs_org = "3YG86";
                    window._fs_namespace = "FS";
                    /* eslint-disable id-length */
                    var g = window[window._fs_namespace] = function (a, b, s) {
                        if (g.q) {
                            g.q.push([a, b, s]);
                        } else if (g._api) {
                            g._api(a, b, s);
                        }
                    };

                    g.q = [];
                    g.identify = function (i, v, s) {
                        g("user", {uid: i}, s);

                        if (v) {
                            g("user", v, s);
                        }
                    };
                    g.setUserVars = function (v, s) {
                        g("user", v, s);
                    };
                    g.event = function (i, v, s) {
                        g("event", {
                            n: i,
                            p: v
                        }, s);
                    };
                    g.anonymize = function () {
                        g.identify(false);
                    };
                    g.shutdown = function () {
                        g("rec", false);
                    };
                    g.restart = function () {
                        g("rec", true);
                    };
                    g.log = function (a, b) {
                        g("log", [a, b]);
                    };
                    g.consent = function (a) {
                        g("consent", !arguments.length || a);
                    };
                    g.identifyAccount = function (i, v) {
                        v = v || {};
                        v.acctId = i;

                        g("account", v);
                    };
                    g.clearUserCookie = function () { /**/ };
                    g.setVars = function (n, p) {
                        g("setVars", [n, p]);
                    };
                    g._w = {};
                    g._w.XMLHttpRequest = window.XMLHttpRequest;

                    if (window.fetch) {
                        g._w.fetch = window.fetch;
                        window.fetch = function () {
                            return g._w.fetch.apply(this, arguments);
                        };
                    }
                    /* eslint-enable id-length */
                },
                onSuccess: function () {
                    ui.identify.fs();
                }
            });

            // Facebook Pixel https://www.facebook.com/business/help/952192354843755
            this.asyncScript("https://connect.facebook.net/en_US/fbevents.js", {
                onStart: function () {
                    /* eslint-disable id-length */
                    var n;

                    if (!window.fbq) {
                        n = window.fbq = function () {
                            if (n.callMethod) {
                                n.callMethod.apply(n, arguments);
                            } else {
                                n.queue.push(arguments);
                            }
                        };

                        window._fbq = window._fbq || n;
                        n.push = n;
                        n.loaded = true;
                        n.version = "2.0";
                        n.queue = [];
                    }
                    /* eslint-enable id-length */

                    fbq("init", "1265828396834846");
                    fbq("track", "PageView");
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
        bugsnag: function () {
            "use strict";

            this.track({
                name: "Bugsnag",
                condition: function (self) {
                    return self.user.email && window.Bugsnag && typeof Bugsnag.setUser === "function";
                },
                params: function (self) {
                    var obj = {};

                    obj.email = self.user.email;

                    if (self.user.fullname) {
                        obj.name = self.user.fullname;
                    }

                    return obj;
                },
                callback: function (self) {
                    var params = this.params(self);

                    // https://docs.bugsnag.com/platforms/javascript/customizing-error-reports/#adding-user-data
                    Bugsnag.setUser(params.email, params.email, params.name);
                },
                log: function (self) {
                    console.log("Bugsnag", this.params(self));
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

                    if (self.user.fullname) {
                        obj.displayName = self.user.fullname;
                    }
                    if (self.user.phone) {
                        obj.phone_str = String(self.user.phone);
                    }

                    return obj;
                },
                callback: function (self) {
                    // https://developer.fullstory.com/identify
                    FS.identify(self.user.email, this.params(self));
                },
                log: function (self) {
                    console.log("FullStory", self.user.email, this.params(self));
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
                if (session.name || session.FNAME || session.firstname) {
                    name.push(session.name || session.FNAME || session.firstname);
                    user.firstname = session.name || session.FNAME || session.firstname;
                }
                if (session.lastname) {
                    name.push(session.lastname);
                    user.lastname = session.lastname;
                }
                if (name.length && (!user.fullname || session.lastname)) {
                    user.fullname = name.join(" ");
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

                if (pair[0] && !Object.prototype.hasOwnProperty.call(obj, pair[0])) {
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
            return condition ? condition(key, raw) : raw[key];
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
        playlistLocal: "/assets/ui-videosList.js",
        getData: function (id) {
            "use strict";

            var obj = ui.videosList && ui.videosList[id] || {},
                res = {},
                prop;

            for (prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
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

            return id ? "<video data-id=" + id + " poster=\"" + obj.image + "\" preload=auto crossorigin playsinline controls controlsList=nodownload>" +
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
                            iconUrl: "/assets/plyr/plyr.svg",
                            blankUrl: "/assets/plyr/blank.mp4",
                            volume: 10
                        };

                    videos.map(function (video) {
                        var config = Object.assign({}, options);

                        if (video.getAttribute("data-id") === "oJqYt6ybTV0") {
                            // Signup video preview thumbnails https://github.com/sampotts/plyr#preview-thumbnails
                            config.previewThumbnails = {
                                enabled: true,
                                src: "/assets/plyr/thumbnails.vtt"
                            };
                        }

                        return new Plyr(video, config);
                    });

                    delete ui.video.youtubeSupportInProgress;
                };

                if (ui.w.Plyr) {
                    success();
                } else if (!self.youtubeSupportInProgress) {
                    self.youtubeSupportInProgress = true;

                    ui.asyncScript("/assets/plyr/plyr.polyfilled.min.js", success);
                }
            }
        },
        youtubeSupport: function (legacyCallback) {
            "use strict";

            var self = ui.video,
                loadImage = {};

            loadImage.callback = function () {
                self.youtubeSupport = false;

                if (ui.videosList) {
                    sessionStorage["ui.videosList"] = JSON.stringify(ui.videosList);
                } else {
                    try {
                        ui.videosList = JSON.parse(sessionStorage["ui.videosList"]);
                    } catch (e) {
                        ui.videosList = {};
                    }
                }

                self.youtubeConvert();

                if (!ui.w.Plyr && !self.youtubeSupportInProgress) {
                    self.applyPlyr();

                    var el = ui.d.createElement("link");

                    el.href = "/assets/plyr/plyr.css";
                    el.rel = "stylesheet";

                    ui.d.body.appendChild(el);
                }

                loadImage.legacyCallback();

                return self.youtubeSupport;
            };
            loadImage.legacyCallback = function () {
                if (typeof legacyCallback === "function") {
                    legacyCallback();
                }
            };

            if (sessionStorage["ui.videosList"] && sessionStorage.isYouTubeSupported === "false") {
                return loadImage.callback();
            }

            loadImage.get = function (url, onload, onerror) {
                var image = new Image();

                image.addEventListener("load", onload);
                image.addEventListener("error", onerror);

                image.src = url;
            };
            loadImage.result = function (isLoaded) {
                sessionStorage.isYouTubeSupported = !!isLoaded;

                if (!isLoaded) {
                    console.warn("YouTube blocked");
                }
                if (ui.w.FS && FS.setUserVars) {
                    FS.setUserVars({isYouTubeSupported_bool: !!isLoaded});
                }
                if (!isLoaded && self.youtubeSupport) {
                    ui.asyncScript(self.playlistLocal, this.callback);
                }
            };
            loadImage.error = function (finalCall) {
                // Use here loadImage instead of this
                if (finalCall) {
                    loadImage.legacy(true);
                }

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
                    this.call = function (url) {
                        fetch(url).then(function (response) {
                            return response.json();
                        }).then(function (response) {
                            response.downloadTime = +new Date;
                            localStorage.videos = JSON.stringify(response);

                            if (typeof legacyCallback === "function") {
                                legacyCallback();
                            }

                            return loadImage.result(true);
                        }).catch(function () {
                            return /^https?:\/\/.*/.test(url) ? loadImage.result() : !hasStatus && loadImage.error(true);
                        });
                    };

                    this.call(self.playlistLink);
                }
            };

            loadImage.get("https://www.youtube.com/favicon.ico", function (e) {
                // ISP Etrog <https://www.etrog.net.il> blocker returns 1x1px image
                if (e.target.naturalWidth > 1) {
                    // Software Nativ <https://www.enativ.com> blocks www.googleapis.com API, returning warning HTML
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
            this.w.console.trace = this.w.console.log;
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
    }
};
ui.cookie = (function (self) {
    "use strict";

    var res = function (obj /* or key */, expires) {
        // obj => {key: value} or key/s
        // expires => N seconds, default 1 day

        if (typeof obj === "object" && !Array.isArray(obj)) {
            var key,
                val;

            expires = self.isNumber(expires) ? expires : 86400;
            expires = new Date(new Date() * 1 + expires * 1000).toUTCString();

            for (key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    val = typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key];
                    // Notice: "samesite=strict" doesn't work on iOS Safari 13.3 - will not set the cookie
                    self.d.cookie = encodeURIComponent(key) + "=" +
                        encodeURIComponent(val) + ";expires=" + expires + ";secure;samesite=lax";
                }
            }
        }

        return self.hash({
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
            key = self.d.cookie.split("; ");

            key.forEach(function (pair) {
                obj[decodeURIComponent(pair.split(/\x3D(.+)/, 1)[0])] = "";
            });
        }

        return self.cookie(obj, -1);
    };

    return res;
}(ui));
ui.init = (function (self) {
    "use strict";

    self.legacy(function () {
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
                    options = Object.defineProperty({}, "passive", { // eslint-disable-line accessor-pairs
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
}(ui));
