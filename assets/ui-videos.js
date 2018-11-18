ui.videos = (function () {
    "use strict";

    // Restrict API access in https://console.cloud.google.com/apis/credentials/key/13?project=lea-style
    var container = ui.d.getElementById("content"),
        pageTitle = ui.d.title,
        now = new Date,
        requestCountMax = 3,
        requestCount = 0,
        cacheDays = 1,
        request = {};

    function lazyload() {
        if (ui.w.IntersectionObserver && !lazyload.error) {
            // Resource
            // https://corydowdy.com/blog/lazy-loading-images-with-intersection-observer
            // https://jeremenichelli.github.io/2016/04/quick-introduction-to-the-intersection-observer-api/
            try {
                !lazyload.initDefined && ui.w.IntersectionObserver && ui.w.IntersectionObserverEntry &&
                "intersectionRatio" in ui.w.IntersectionObserverEntry.prototype &&
                !("isIntersecting" in IntersectionObserverEntry.prototype) &&
                Object.defineProperty(ui.w.IntersectionObserverEntry.prototype, "isIntersecting", {
                    get: function () {
                        return this.intersectionRatio > 0;
                    }
                });

                var arr = ui.d.querySelectorAll("img[data-src]");

                arr = arr.length ? Array.from && Array.from(arr) || [].slice.call(arr) : [];
                lazyload.initDefined = true;

                arr.forEach(function (img) {
                    lazyload.observer.observe(img);
                });
            } catch (e) {
                lazyload.error = e;
            }
        }
    }
    lazyload.observer = ui.w.IntersectionObserver && new IntersectionObserver(function (changes) {
        changes.forEach(function (change) {
            if (change.isIntersecting && change.target.dataset.src) {
                change.target.src = change.target.dataset.src;
                change.target.removeAttribute("data-src");
                lazyload.observer.unobserve(change.target);
            }
        });
    }, {
        rootMargin: "200px 0px",
        threshold: 0.01
    });

    function cacheAge(response) {
        var start,
            end;

        try {
            response = JSON.parse(response);
        } catch (e) {}
        try {
            start = response && response.downloadTime && new Date(Number(response.downloadTime)) || now;
        } catch (e) {
            return 0;
        }

        start = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        end = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

        return Math.abs(Math.floor((end - start) / 8.64e+7));
    }
    function generateHTML(arr, url) {
        var result = "",
            isStopLoop,
            obj,
            i;

        for (i = 0; !isStopLoop && i < arr.length; i += 1) {
            obj = arr[i].snippet;

            if (obj) {
                if (url) {
                    if (obj.resourceId && obj.resourceId.videoId === url) {
                        result += generateHTML.loop(obj, "video");
                        isStopLoop = true;
                    }
                } else {
                    result += generateHTML.loop(obj, "image");
                }
            }
        }

        return result;
    }
    generateHTML.safe = function (str) {
        return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    generateHTML.loop = function (obj, type) {
        return this[type || "image"]({
            id: obj.resourceId && encodeURIComponent(obj.resourceId.videoId),
            image: obj.thumbnails && (
                obj.thumbnails.maxres && encodeURI(obj.thumbnails.maxres.url) ||
                obj.thumbnails.standard && encodeURI(obj.thumbnails.standard.url) ||
                obj.thumbnails.high && encodeURI(obj.thumbnails.high.url)),
            title: this.safe(obj.title),
            description: this.safe(obj.description).replace(/\n/g, "<br>"),
            date: (function () {
                try {
                    return obj.publishedAt && new Date(obj.publishedAt).toLocaleDateString("he", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });
                } catch (e) {}
            }())
        });
    };
    generateHTML.links = function (str) {
        var opt = {
            link: {
                // Testcase https://regex101.com/r/apPfwx/2
                regex: /(https?:\/\/[^\s:@.,]+\.+[a-z])[^<\s\\!,]{0,}[^<\s\\!|^.,?$]{1,}|[^\s:,/@\-0=]{1,}[a-z0-9\-.]\.com?\/*[^<\s\\!]{1,}[^<\s\\!|^.,$]/ig,
                pattern: "<a href=\"$&\" rel=noopener target=_blank dir=auto>$&</a>"
            },
            email: {
                // Testcase http://regexr.com/3hn9l
                regex: /([\w.\-+_]+)?\w+@[\w-_]+(\.\w+){1,}/gm,
                pattern: "<a href=\"mailto:$&\" rel=noopener target=_blank dir=ltr>$&</a>"
            },
            phone: {
                // Testcase https://regexr.com/3hnad
                regex: /05\d{8}/gm,
                pattern: "<a href=\"tel:$&\" rel=noopener target=_blank dir=ltr>$&</a>"
            }
        };

        return str && str
            .replace(opt.link.regex, opt.link.pattern)
            .replace(opt.email.regex, opt.email.pattern)
            .replace(opt.phone.regex, opt.phone.pattern);
    };
    generateHTML.image = function (obj) {
        obj.image = ui.video.youtubeSupport ? obj.image : ui.video.getData(obj.id).image;

        return obj.image ? "<li class=box>" +
            "    <figure class=play><img " + (ui.w.IntersectionObserver ? "data-" : "") + "src=\"" + obj.image + "\" alt=\"" + obj.title + "\"></figure>" +
            "    <a class=absolute href=\"#" + obj.id + "\" aria-label=\"" + obj.title + "\" tabindex=0></a>" +
            "    <h2 class=wrapline>" + obj.title + "</h2>" +
            (obj.description ? "    <p>" + this.links(obj.description) + "</p>" : "") +
            (obj.date ? "    <div><time>" + obj.date + "</time></div>" : "") +
            "</li>" : "";
    };
    generateHTML.video = function (obj) {
        ui.d.title = obj.title;

        return "<article class=\"box card\" dir=ltr>" +
            "    <div class=video>" +
                (ui.video.youtubeSupport ? "<iframe src=\"https://www.youtube.com/embed/" + obj.id + "?autoplay=1\" allow=\"autoplay; encrypted-media; fullscreen\" allowfullscreen></iframe>" : ui.video.template(obj.id)) +
            "    </div>" +
            "    <div class=content dir=rtl>" +
            "        <h1>" + obj.title + "</h1>" +
            (obj.description ? "        <p>" + this.links(obj.description) + "</p>" : "") +
            (obj.date ? "        <div><time>" + obj.date + "</time></div>" : "") +
            "    </div>" +
            "</article>";
    };
    generateHTML.list = function (html) {
        return "<div class=space>" +
            "    <p>סרטונים ביוטיוב</p>" +
            "    <div id=g-ytsubscribe class=g-ytsubscribe data-channelid=UCNNsgimJtU1q1LUMVsq44Dg data-layout=full data-count=hidden></div>" +
            "</div>" +
            "<ul class=list>" + html + "</ul>";
    };
    generateHTML.paintUI = function (response) {
        var url = location.hash,
            result;

        url = url && url.substring(1);
        response = ui.videos || response;

        if (response && Array.isArray(response.items)) {
            result = generateHTML(response.items, url);

            if (url && !result) {
                result = generateHTML(request.private, url);
            }
            if (result) {
                if (url) {
                    response.scrollTop = ui.d.documentElement.scrollTop;
                } else {
                    ui.d.title = pageTitle;
                }
                if (!ui.isLoaded) {
                    container.classList.remove("center");
                    container.classList.add("table", "scale", "space", "medium", "no-padding");
                }

                container.innerHTML = url ? result : generateHTML.list(result);

                setTimeout(function () {
                    url = location.hash && location.hash.substring(1);
                    ui.d.documentElement.scrollTop = url ? 0 : response.scrollTop || 0;
                }, 10);

                if (!ui.isLoaded) {
                    if (ui.video.youtubeSupport) {
                        ui.asyncScript("https://apis.google.com/js/platform.js", {remove: true});
                    }

                    ui.isLoaded = true;
                }
                if (ui.comment) {
                    if (url) {
                        ui.comment.load(container);
                    } else {
                        ui.comment.remove();

                        if (ui.w.gapi) {
                            gapi.ytsubscribe.go();
                        }
                    }
                }
                if (url) {
                    lazyload.observer && lazyload.observer.disconnect();

                    ui.video.applyPlyr();
                } else {
                    lazyload();
                }
            } else {
                if (url) {
                    location.hash = "";
                }
                if (history.replaceState) {
                    setTimeout(function () {
                        history.replaceState({}, ui.d.title, location.pathname);
                    }, 0);
                }
            }
        }
    };
    request.call = function (url) {
        delete localStorage.videos;

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (response) {
            return request.getData(response, true);
        }).catch(function () {
            return /^https?:\/\/.*/.test(url) ? request.call(ui.video.playlistLocalLink) : request.error();
        });
    };
    request.private = (function () {
        var data = {
                MJkf4wLvmd4: {
                    image: "https://i.ytimg.com/vi/MJkf4wLvmd4/maxresdefault.jpg",
                    title: "איך להכניס יותר צבע בלבוש שלך?",
                    description: "רוצה לדעת אילו צבעים מתאימים לך - https://lea.laukstein.com/color-swatch?campaign=youtube",
                    date: "2018-11-03T21:58:00.000Z"
                }
            },
            generatedData = [];

        Object.keys(data).forEach(function (key) {
            generatedData.push({
                snippet: {
                    resourceId: {
                        videoId: key
                    },
                    thumbnails: {
                        maxres: {
                            url: data[key].image
                        }
                    },
                    title: data[key].title,
                    description: data[key].description,
                    publishedAt: data[key].date
                }
            });
        });

        return generatedData;
    }());
    request.success = function (response) {
        response = response || {};

        if (response.error) {
            return this.error(response);
        }

        response.downloadTime = +now;
        localStorage.videos = JSON.stringify(response);

        ui.videos = response;

        generateHTML.paintUI(response);

        ui.videos = response;

        ui.w.addEventListener("hashchange", generateHTML.paintUI);

        if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
        }

        return response;
    };
    request.error = function (response) {
        delete localStorage.videos;

        response = response || {};
        container = container && container.querySelector("strong");

        if (container) {
            container.innerHTML = "שגיאת שרת, <a href>נסה שוב</a> או מאוחר יותר.";
        }

        ui.videos = response;

        return response;
    };
    request.getData = function (response, isJSON) {
        requestCount += 1;

        if (requestCount > requestCountMax) {
            return this.error();
        } else if (response) {
            if (cacheAge(response) < cacheDays) {
                if (isJSON) {
                    return this.success(response);
                }

                try {
                    return this.success(JSON.parse(response));
                } catch (e) {
                    return this.call(ui.video.playlistLink);
                }
            }
        }

        return this.call(ui.video.playlistLink);
    };

    if (container) {
        ui.legacy(function () {
            if (localStorage.videos) {
                request.getData(localStorage.videos);
            } else {
                request.error();
            }
        });
    } else {
        console.error("Missing container element");
    }
    if (localStorage.videosDate) {
        // No need for "videosDate" since 2017/10/08
        delete localStorage.videosDate;
    }

    return ui.videos || {};
}());
