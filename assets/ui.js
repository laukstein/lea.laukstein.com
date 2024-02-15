"use strict";

window.ui = {
    w: window,
    d: document,
    environment: location.hostname === "lea.laukstein.com" ? "prod" : "dev",
    endpoint: "https://lab.laukstein.com/webhook",
    awaitCallback: [],
    has: {
        classList: "classList" in document.documentElement
    },
    log: function (data) {
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
        return Math.random().toString(16).substr(2, 8).toUpperCase();
    },
    asyncScript: function (src/* , success, options |, options */) {
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

            this.asyncScript("https://www.googletagmanager.com/gtag/js?id=G-PFVPM1DDTP", {
                onStart: function () {
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = function () {
                        dataLayer.push(arguments);
                    };
                    gtag("js", new Date());
                    gtag("config", "G-PFVPM1DDTP", {page_path: location.href});
                },
                onSuccess: function () {
                    ui.identify.gtag();
                }
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
        fs: function () {
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
        gtag: function () {
            this.track({
                name: "Google Analytics",
                condition: function (self) {
                    return window.gtag && ui.sha256 && self.user.email;
                },
                callback: async function (self) {
                    const email = await ui.sha256(self.user.email);

                    gtag("set", {user_data: {email_address: email}});
                },
                log: function (self) {
                    console.log("Google Analytics", self.user.email);
                }
            });
        },
        user: {}
    },
    setUser: function (session) {
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

                user.date = Number(new Date);
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
        // Is a number
        return !isNaN(parseFloat(str)) && isFinite(str) &&
            // Isn't a phone number that begins with "0"
            (String(str).length === String(Number(str)).length || str.indexOf(".") > 0);
    },
    isObj: function (str) {
        try {
            var obj = JSON.parse(str);

            return typeof obj === "object";
        } catch (e) {
            return false;
        }
    },
    hash: function (opt /* param */) {
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
        return Object.keys(raw).filter(function (key) {
            return condition ? condition(key, raw) : raw[key];
        }).reduce(function (obj, key) {
            obj[key] = raw[key];

            return obj;
        }, {});
    },
    video: {
        playlistLink: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUNNsgimJtU1q1LUMVsq44Dg&maxResults=50&key=AIzaSyBt0-e3Ups6i4p8GQs811EarYbpMiPfxg4",
        playlistLocal: "/assets/ui-videosList.js",
        getData: function (id) {
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
            var obj = this.getData(id);

            return id ? "<video data-id=" + id + " poster=\"" + obj.image + "\" preload=auto crossorigin playsinline controls controlsList=nodownload>" +
                "    <source src=\"" + obj[this.size] + "\" type=\"video/mp4\">" +
                "</video>" : "";
        },
        youtubeConvert: function () {
            var iframes = Array.from(ui.d.querySelectorAll(".video iframe")),
                i;

            for (i = 0; i < iframes.length; i += 1) {
                iframes[i].outerHTML = this.template(iframes[i].src.replace(/^.*\/embed\//, "").replace(/\?.*$/, ""));
            }
        },
        applyPlyr: function () {
            if (!this.youtubeSupport) {
                this.youtubeConvert();

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
            }
        },
        youtubeSupport: function (legacyCallback) {
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
                self.applyPlyr();
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

                return image;
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
                        var onError = function () {
                            return /^https?:\/\/.*/.test(url) ? loadImage.result() : !hasStatus && loadImage.error(true);
                        };

                        fetch(url).then(function (response) {
                            return response.json();
                        }).then(function (response) {
                            if (!(response && Array.isArray(response.items))) {
                                return Promise.reject(response);
                            }

                            try {
                                return loadImage.get(response.items[0].snippet.thumbnails.default.url, function (event) {
                                    if (event.target.naturalWidth > 1) {
                                        response.downloadTime = Number(new Date);
                                        localStorage.videos = JSON.stringify(response);

                                        if (typeof legacyCallback === "function") {
                                            legacyCallback();
                                        }

                                        loadImage.result(true);
                                    } else {
                                        onError();
                                    }
                                }, onError);
                            } catch (error) {
                                return Promise.reject();
                            }
                        }).catch(onError);
                    };

                    this.call(self.playlistLink);
                }
            };

            loadImage.get("https://www.youtube.com/favicon.ico", function (event) {
                // ISP Etrog <https://www.etrog.net.il> blocker returns 1x1px image
                if (event.target.naturalWidth > 1) {
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
    var res = function (obj /* or key */, expires) {
        // obj => {key: value} or key/s
        // expires => N seconds, default 1 day

        if (typeof obj === "object" && !Array.isArray(obj)) {
            var key,
                val;

            expires = self.isNumber(expires) ? expires : 86400;
            expires = new Date(Number(new Date) + expires * 1000).toUTCString();

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

ui.sha256 = async function (message) {
    const msgBuffer = new TextEncoder().encode(message),
        hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer),
        hashArray = Array.from(new Uint8Array(hashBuffer)),
        hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
};
