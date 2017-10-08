ui.videos = (function () {
    "use strict";

    // Restrict API access in https://console.cloud.google.com/apis/credentials/key/13?project=lea-style
    var container = ui.d.getElementById("content"),
        pageTitle = ui.d.title,
        now = new Date(),
        requestCountMax = 3,
        requestCount = 0,
        cacheDays = 1;

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
            if (change.isIntersecting) {
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
                    return new Date(obj.publishedAt).toLocaleDateString("he", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });
                } catch (e) {}
            }())
        });
    };
    generateHTML.links = function (str) {
        // Regex https://regex101.com/r/apPfwx/2
        var regex = /(https?:\/\/[^\s:@.,]+\.+[a-z])[^<\s\\!,]{0,}[^<\s\\!|^.,?$]{1,}|[^\s:,/@\-0=]{1,}[a-z0-9\-.]\.com?\/*[^<\s\\!]{1,}[^<\s\\!|^.,$]/ig,
            pattern = "<a href=\"$&\" rel=noopener target=_blank dir=auto>$&</a>";

        return str && str.replace(regex, pattern);
    };
    generateHTML.image = function (obj) {
        obj.image = ui.video.youtubeSupport ? obj.image : ui.video.getData(obj.id).image;

        return "<li class=box>" +
            "    <figure class=play><img " + (ui.w.IntersectionObserver ? "data-" : "") + "src=\"" + obj.image + "\" alt=\"" + obj.title + "\"></figure>" +
            "    <a class=absolute href=\"#" + obj.id + "\" tabindex=0></a>" +
            "    <h2 class=wrapline>" + obj.title + "</h2>" +
            (obj.description ? "    <p>" + this.links(obj.description) + "</p>" : "") +
            (obj.date ? "    <div><time>" + obj.date + "</time></div>" : "") +
            "</li>";
    };
    generateHTML.video = function (obj) {
        ui.d.title = obj.title;

        return "<article class=\"box card\" dir=ltr>" +
            "    <div class=video>" +
                (ui.video.youtubeSupport ? "<iframe src=\"https://www.youtube.com/embed/" + obj.id + "?showinfo=0&autoplay=1\" gesture=media allowfullscreen></iframe>" : ui.video.template(obj.id)) +
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
            "    <h1>" + ui.d.title + "</h1>" +
            "    <p>סרטונים ביוטיוב</p>" +
            "    <div id=g-ytsubscribe class=g-ytsubscribe data-channelid=UCNNsgimJtU1q1LUMVsq44Dg data-layout=default data-count=hidden></div>" +
            "</div>" +
            "<ul class=list>" + html + "</ul>";
    };
    function paintUI(response) {
        var url = location.hash,
            result;

        url = url && url.substring(1);
        response = ui.videos || response;

        if (response && Array.isArray(response.items)) {
            result = generateHTML(response.items, url);

            if (result) {
                if (url) {
                    response.scrollTop = ui.d.body.scrollTop;
                } else {
                    ui.d.title = pageTitle;
                }
                if (!ui.isLoaded) {
                    container.classList.remove("center");
                    container.classList.add("table", "scale", "space", "medium", "no-padding");
                }

                container.innerHTML = url ? result : generateHTML.list(result);
                ui.d.body.scrollTop = url ? 0 : response.scrollTop || 0;

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
    }
    function request() {
        ui.legacy(function () {
            if (localStorage.videos) {
                request.getData(localStorage.videos);
            } else {
                request.error();
            }
        });

        return {};
    }
    request.success = function (response) {
        response = response || {};

        if (response.error) {
            return this.error(response);
        }

        response.downloadTime = +now;
        localStorage.videos = JSON.stringify(response);

        if (ui.videos) {
            ui.videos = response;
        }

        paintUI(response);

        if (ui.videos) {
            ui.videos = response;
        }

        ui.w.onhashchange = paintUI;

        return response;
    };
    request.error = function (response) {
        delete localStorage.videos;

        response = response || {};
        container = container && container.querySelector("strong");

        if (container) {
            container.innerHTML = "שגיאת שרת, <a href>נסה שוב</a> או מאוחר יותר.";
        }
        if (ui.videos) {
            ui.videos = response;
        }

        return response;
    };
    request.getData = function (response) {
        requestCount += 1;

        if (requestCount > requestCountMax) {
            return this.error();
        } else if (response) {
            if (cacheAge(response) < cacheDays) {
                try {
                    return this.success(JSON.parse(response));
                } catch (e) {
                    return this();
                }
            } else {
                delete localStorage.videos;
            }
        }

        return this();
    };

    if (!container) {
        console.error("Missing container element");
    }
    if (localStorage.videosDate) {
        // No need for "videosDate" since 2017/10/08
        delete localStorage.videosDate;
    }

    return container && request.getData(localStorage.videos);
}());
