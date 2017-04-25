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

ui.identify.ga = function () {
    "use strict";

    if (window.ga && ui.academy.user.email) {
        // Reosurce https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#user_id
        ga("set", "userId", ui.academy.user.email);

        delete this.ga;
    }
};
ui.identify.FS = function () {
    "use strict";

    if (window.FS) {
        var name = [],
            user = {};

        if (ui.academy.user.firstName) {
            name.push(ui.academy.user.firstName);
        }
        if (ui.academy.user.lastName) {
            name.push(ui.academy.user.lastName);
        }
        if (name.length) {
            user.displayName = name.join(" ");
        }

        user.email = ui.academy.user.email;

        if (user.email) {
            // Resource http://help.fullstory.com/develop-js/identify
            FS.identify(user.email, user);

            delete this.FS;
        }
    }
};
ui.identify.all = function () {
    "use strict";

    if (ui.identify.ga) {
        ui.identify.ga();
    }
    if (ui.identify.FS) {
        ui.identify.FS();
    }
};

ui.academy = {
    data: {
        interval: 7,
        init: {
            title: "ברוכות הבאות",
            page: {
                type: "video",
                title: "ברוכות הבאות לקורס \"הנוסחא לסטיילינג ב5 דקות לאישה הדתית\"",
                value: "7iRtL9RTX7w"
            }
        },
        session: {
            colours: {
                title: "צבעים ושילובים",
                pages: {
                    "video-1": {
                        type: "video",
                        title: "איך צבע נכון ולא נכון משפיע על הפנים",
                        value: "Ws126uyiS9g"
                    },
                    "video-2": {
                        type: "video",
                        title: "שש קטגורייות אנשים",
                        value: "fyLTeiOpItU"
                    },
                    "video-3": {
                        type: "video",
                        title: "שיעורי בית",
                        value: "1LcyCHR5D-Q"
                    },
                    qa: {
                        type: "qa",
                        title: "שאלון:\nלאיזה קטגוריית צבעים את שייכת?",
                        value: "academy-colours.jpg",
                        question: [
                            {
                                title: "האם צבע השיער שלך שחור או חום כהה?",
                                question: [
                                    {
                                        title: "העיניים שלך מבריקות, בולטות, בצבע כחול כהה או ירוק כהה? האם יש קונטראסט בין הלבן בעיניים לבין האישון?",
                                        final: "clear"
                                    },
                                    {
                                        title: "העיניים שלך כהות?",
                                        final: "deep"
                                    },
                                    {
                                        title: "העיניים שלך בהירות, כחול בהיר או אפור בהיר?",
                                        final: "bright"
                                    }
                                ]
                            },
                            {
                                title: "האם צבע השיער שלך בלונד בהיר, אפור בהיר, חום בהיר?",
                                question: [
                                    {
                                        title: "העיניים שלך בהירות בצבעים כחול בהיר, אפור או ירוק בהיר?",
                                        final: "bright"
                                    },
                                    {
                                        title: "העיניים שלך חום בהיר, מתמזג עם צבע השיער?",
                                        final: "mixed"
                                    }
                                ]
                            },
                            {
                                title: "האם צבע השיער שלך חום בינוני או עכברי, אפור בינוני, בלונד אפורי, בלונד כהה?",
                                question: [
                                    {
                                        title: "העיניים שלך בהירות בצבעים כחול בהיר, אפור או ירוק בהיר?",
                                        final: "bright"
                                    },
                                    {
                                        title: "העיניים שלך חום בהיר, מתמזג עם צבע השיער?",
                                        final: "mixed"
                                    }
                                ]
                            },
                            {
                                title: "האם צבע השיער שלך ג'ינג'י, דבש, ערמוני, והעיניים שלך ירוק חם כהה, חום ירקרק, חום דבש, כחול ירוק?",
                                final: "warm"
                            },
                            {
                                title: "האם צבע השיער שלך חום אפרפר (עכברי), בלונדי-אפרורי, כסוף, שיבה אפור, והצבע העיניים שלך כחול או חום או ירקרק?",
                                final: "cold"
                            }
                        ],
                        final: {
                            clear: {
                                title: "את צלולה",
                                value: "0B3TGizvMXI6lZGZTckc0VElhVnc"
                            },
                            deep: {
                                title: "את עמוקה",
                                value: "0B3TGizvMXI6lSXNCYTNpLUh3LUU"
                            },
                            bright: {
                                title: "את בהירה",
                                value: "0B3TGizvMXI6lbUJ0S1RCbkpiU28"
                            },
                            mixed: {
                                title: "את מעורבת",
                                value: "0B3TGizvMXI6lbWhDNW1SNHZWVU0"
                            },
                            warm: {
                                title: "את חמה",
                                value: "0B3TGizvMXI6lNHhrTzdzb3ByaU0"
                            },
                            cold: {
                                title: "את קרה",
                                value: "0B3TGizvMXI6lNzRjamg5a1ZreVE"
                            }
                        }
                    },
                    "video-4": {
                        type: "video",
                        title: "איך לשלב צבעים",
                        value: "3cA_tnKHbvo"
                    },
                    "document": {
                        type: "document",
                        title: "מעגל צבעים",
                        value: "0B3TGizvMXI6lSnktdTdteUtJS0k"
                    }
                }
            },
            "body-shape": {
                title: "מבנה גוף",
                pages: {
                    "video-1": {
                        type: "video",
                        title: "למה חשוב להתלבש לפי מבנה גוף",
                        value: "67JOe6ZRV7c"
                    },
                    "video-2": {
                        type: "video",
                        title: "אילו מבנה גוף יש",
                        value: "QrPC6lvIAKE"
                    },
                    "video-3": {
                        type: "video",
                        title: "איך לדעת מה מבנה גוף שלך",
                        value: "GRyHlrJnV6Q"
                    },
                    calculator: {
                        type: "calculator",
                        title: "מחשבון:\nתאבחני את מבנה הגוף שלך",
                        value: "1gKI_JUyD20fvq27_B3Kxq9vfJ6f99xLnnd1ht1vibhU",
                        button: "הצג תוצאה",
                        notice: "שימי לב, חישוב ניתן רק לפעם אחת",
                        result: "את בעלת מבנה גוף {0}",
                        download: "להוריד מדריך הגיזרות",
                        form: {
                            A: "היקף הכתפיים",
                            B: "היקף היריכיים",
                            C: "היקף המותן",
                            D: "היקף החזה"
                        },
                        final: {
                            hourglass: {
                                title: "שעון חול",
                                value: "1bcn85H0V-BfhQ_K8WoBfnuJYGoyicdKbx1BUtk-3-0o"
                            },
                            invertedTriangle: {
                                title: "משולש הפוך",
                                value: "1D9zt-uqJyT9YNCZHm6VBjJmbRovTJWad_wlP77Z23EI"
                            },
                            triangle: {
                                title: "משולש",
                                value: "11ERkWQ_5EdOu67T_glBwUYgmBvtwmP-U3xpxaF6QK-w"
                            },
                            rounded: {
                                title: "מעוגל",
                                value: "1Dq2xJwSz9noiMjOC24esefAnvQn260zxA2YLrjqnrZ8"
                            },
                            square: {
                                title: "מרובע",
                                value: "1gKI_JUyD20fvq27_B3Kxq9vfJ6f99xLnnd1ht1vibhU"
                            }
                        }
                    }
                }
            },
            style: {
                title: "סגנון הלבוש",
                pages: {
                    "video-1": {
                        type: "video",
                        title: "למה חשוב לדעת מה סגנון הלבוש שלך",
                        value: "7AMQxfNDzIM"
                    },
                    "video-2": {
                        type: "video",
                        title: "אילו סגנונות לבוש יש",
                        value: ""
                    },
                    "video-3": {
                        type: "video",
                        title: "שיעורי בית",
                        value: "rs8o-d7gkpo"
                    },
                    table: {
                        title: "שאלון: תאבחני את סגנון הלבוש שלך"
                    }
                }
            },
            lingerie: {
                title: "הלבשה תחתונה",
                pages: {
                    "video-1": {
                        type: "video",
                        title: "כמה חשיבות יש הלבשה תחתונה",
                        value: "k1ASomUAM34"
                    },
                    "video-2": {
                        type: "video",
                        title: "גזרה, צבע ובד בהלבשה תחתונה",
                        value: ""
                    },
                    "video-3": {
                        type: "video",
                        title: "איך לדעת שהלבשה תחתונה מתאימה",
                        value: "2H9HC-eaRAE"
                    },
                    "video-4": {
                        type: "video",
                        title: "שיעורי בית",
                        value: "nYtkrABvBXw"
                    }
                }
            },
            accessories: {
                title: "אקססוריז",
                pages: {
                    "video-1": {
                        type: "video",
                        title: "למה להשתמש באקססוריז",
                        value: "lJN1n7ecLmY"
                    },
                    "video-2": {
                        type: "video",
                        title: "סוגי אקססוריז",
                        value: ""
                    },
                    "video-3": {
                        type: "video",
                        title: "איך להתאים אקססוריז למבנה גוף שלך",
                        value: "dkO7I7yHu0o"
                    },
                    "video-4": {
                        type: "video",
                        title: "שיעורי בית",
                        value: "uxNjzX1V6uk"
                    }
                }
            },
            "modular-outfit": {
                title: "מערכת לבוש היעלה ביותר לאישה הדתית",
                pages: {
                    "video-1": {
                        type: "video",
                        title: "למה חשוב שמערכת לבוש תהיה יעילה",
                        value: "8rn-HCDQzL4"
                    },
                    "video-2": {
                        type: "video",
                        title: "מה כוללת מערכת לבוש יעילה",
                        value: ""
                    },
                    "video-3": {
                        type: "video",
                        title: "כמה שילובים חדשים אפשר להוציא מ9 פריטים",
                        value: ""
                    },
                    "video-4": {
                        type: "video",
                        title: "שיעורי בית",
                        value: "yzJaU1ZW1QU"
                    },
                    "check-list": {
                        title: "צ’ק ליסט למערכת לבוש יעילה"
                    }
                }
            },
            bonuses: {
                title: "בונוסים",
                date: {
                    enabled: false,
                    format: "..."
                },
                pages: {
                    pregnency: {},
                    face: {}
                }
            }
        }
    },
    user: (function () {
        "use strict";

        try {
            return JSON.parse(localStorage.user);
        } catch(e) {
            delete localStorage.user;
            return {};
        }
    }()),
    fetch: "https://lab.laukstein.com/academy",
    dataset: function (el, prop) {
        "use strict";

        if (el && el.nodeType === 1) {
            return el.dataset ? el.dataset[prop] : el.getAttribute("data-" + prop);
        }
    },
    serialize: function (obj) {
        "use strict";

        if (obj) {
            var arr = Object.keys(obj),
                result = [],
                i;

            for (i = 0; i < arr.length; i += 1) {
                if (obj[arr[i]]) {
                    result.push(arr[i] + "=" + encodeURIComponent(obj[arr[i]]));
                }
            }

            return result.join("&");
        } else {
            return "";
        }
    },
    select: function (el, avoidRedirect) {
        "use strict";

        if (el) {
            var hash = this.serialize({
                session: this.dataset(el, "session"),
                page: this.dataset(el, "page")
            });

            if (!avoidRedirect && hash) {
                location.hash = hash;
                ui.d.body.scrollTop = 0;
            } else if (!hash && location.hash || !this.data.session[ui.hash("session")]) {
                location.hash = "";

                if (history.pushState) {
                    history.pushState("", ui.d.title, location.pathname);
                }
            }
        }
    },
    refresh: function (stripHash) {
        "use strict";

        if (stripHash) {
            location = location.pathname;
        } else {
            location.reload();
        }
    },
    login: function (e) {
        "use strict";

        e.preventDefault();
        ui.form.accessibility(false, null, true);

        fetch(this.fetch + "/login", {
            method: "POST",
            // Prevent insecure redirects https://developer.mozilla.org/en-US/docs/Web/API/Response/redirected
            redirect: "error",
            body: JSON.stringify({
                email: this.email.value,
                pass: this.pass.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            localStorage.user = JSON.stringify(data);
            var self = ui.academy;

            ui.form.accessibility(true, null, true);

            if (data.email && data.token) {
                ui.academy.refresh();
            } else if (self.button) {
                self.button.classList.add("error");
                self.button.innerHTML = "הפרטים שגויים, נסי שוב";
            }
        }).catch(function () {
            alert("טעות במערכת, נסי שוב מאוחר יותר");
        });
    },
    forgot: function () {
        "use strict";

        ui.form.el.setAttribute("onsubmit", "ui.academy.remind(event)");
        this.email.focus();
        this.pass.parentNode.remove();
        this.button.innerHTML = "שלח לי סיסמא";
        this.button.classList.remove("error");
        this.link.innerHTML = "לנסות להתחבר מחדש";
        this.link.setAttribute("onclick", "ui.academy.refresh(true)");
    },
    remind: function (e) {
        "use strict";

        e.preventDefault();
        ui.form.accessibility(false, null, true);

        fetch(this.fetch + "/forgot", {
            method: "POST",
            redirect: "error",
            body: JSON.stringify({
                email: this.email.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            var self = ui.academy;

            ui.form.accessibility(true, null, true);

            if (data.success) {
                ui.form.el.innerHTML = "<h2>פרטי גישה נשלחו למייל שלך</h2><a onclick=ui.academy.refresh(true)>לנסות להתחבר</a>";
            } else {
                self.button.classList.add("error");
                self.button.innerHTML = "מייל לא רשום, נסי שוב";
            }
        }).catch(function () {
            alert("טעות במערכת, נסי שוב מאוחר יותר");
        });
    },
    logout: function () {
        "use strict";

        delete localStorage.user;
        this.refresh(true);
    },
    date: function () {
        "use strict";

        if (!this.currentTime) {
            this.firstSession = true;
        } else if (this.firstSession) {
            delete this.firstSession;
        }

        this.currentTime = this.currentTime || new Date(this.data.date);
        var date = new Date(this.currentTime.setDate(this.currentTime.getDate() +
            (this.firstSession ? 0 : this.data.interval)) + 10000000);

        return {
            enabled: +date <= +new Date(),
            format: date.getUTCDate() + "/" + (date.getUTCMonth() + 1)
        };
    },
    key: function (e) {
        "use strict";

        if (e && e.target && (e.keyCode || e.which) === 13) {
            e.preventDefault();
            e.target.click();
        }
    },
    events: function (session, page) {
        "use strict";

        return " onclick=ui.academy.select(this) onkeydown=ui.academy.key(event)" +
            (session ? " data-session=" + session : "") + (page ? " data-page=" + page : "") + " tabindex=0";
    },
    isLogged: function () {
        "use strict";

        // IMPORTANT
        this.data.date = this.user.created * 1000;

        ui.d.documentElement.classList.remove("stretch");
        ui.d.documentElement.classList.add("logedin");
        this.details.remove();

        this.account = ui.d.getElementById("account");

        this.account.outerHTML = "<div class=profile>" +
            "    <img src=\"https://gravatar.com/avatar/" + this.user.avatar + "?s=42&r=g&d=mm\">" +
            "    <div class=\"table center\">" +
            "        <div class=cel>" +
            (this.user.firstName ? "            <div class=nowrap dir=auto>" + this.user.firstName + "</div>" : "") +
            "            <small onclick=ui.academy.logout()>התנתק</small>" +
            "        </div>" +
            "    </div>" +
            "</div>";

        delete this.details;
        delete this.account;

        var obj = this.data.init,
            current = ui.hash("session"),
            result = "",
            session,
            pages,
            page,
            date;

        result += "<div class=\"column nav-container\" id=nav dir=ltr>" +
            "<div class=nav dir=rtl>" +
            "    <a class=active" + this.events() + "><label>" + obj.title + "</label></a>" +
            "</div>";

        obj = this.data.session;

        result += "<ol class=nav dir=rtl>";

        for (session in obj) {
            if (obj.hasOwnProperty(session)) {
                date = obj[session].date || this.date();
                result += "    <li" + (session === current ? " class=expand" : "") + ">" +
                    "<label" + (date.enabled ? this.events(session) : " disabled") + ">" +
                    "<time>" + date.format + "</time><div>" + obj[session].title + "</div>" +
                    "</label>";
                pages = obj[session].pages;

                if (pages && date.enabled) {
                    result += "<ol>";

                    for (page in pages) {
                        if (pages.hasOwnProperty(page)) {
                            result += "    <li><a" + this.events(session, page) + ">" + pages[page].title.replace(/\n/g, " ") + "</a>";
                        }
                    }

                    result += "</ol>";
                }
            }
        }

        result += "</ol>" +
            "</div>" +
            "<div class=\"column content\" id=content></div>";

        this.content.outerHTML = "<div class=container>" + result + "</div>";
        this.content = ui.d.getElementById("content");
        this.nav = ui.d.getElementById("nav");

        this.toggleNav(true);
    },
    list: function (obj, session, page) {
        "use strict";

        var url = "";

        if (obj.value) {
            switch (obj.type) {
                case "video":
                    url = "https://img.youtube.com/vi/" + obj.value + "/maxresdefault.jpg";
                    break;
                case "document":
                case "calculator":
                    // Link params details https://pgenom.com/community/threads/гуглодиск-как-хостинг-картинок-файловый-хостинг.1236/
                    url = "https://drive.google.com/thumbnail?authuser=0&sz=w640&id=" + obj.value;
                    break;
                case "qa":
                    url = "/assets/" + obj.value;
                    break;
                default:
                    url = "";
            }
        }

        // YouTube image sizes http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
        return obj ? "<a class=\"absolute cover\"" + this.events(session, page) +
            " style=\"background-image:url(" + url + ")\"><h3 class=nowrap dir=auto>" + obj.title.replace(/\n/g, " ") + "</h3></a>" : "";
    },
    report: function (/*type, data*/) {
        "use strict";

        // TBD: report error
    },
    qa: function (obj) {
        "use strict";

        function label(data, index, sameLoop) {
            var skipLoop = index !== false,
                result = "",
                version,
                final,
                prop;
            index = index || 0;

            if (skipLoop && !sameLoop) {
                index += 1;
            }
            if (data) {
                if (skipLoop) {
                    final = !data.question;
                    version = !final && Math.random().toString(16).substr(2, 8);
                    result += (sameLoop ? "" : "<ol>") +
                        "<li><input type=radio name=" + index + " id=" + version + ">" +
                        "<label onclick=" + (data.final ? "\"ui.academy.qa.dialog(event, " + index + ", '" + data.final + "')\"" : "ui.academy.qa.click(event) for=" + version) + ">" + data.title + "</label>";
                }
                if (Array.isArray(data.question)) {
                    index += 1;
                    result += "<ol>";

                    for (prop in data.question) {
                        result += label(data.question[prop], index, true);
                    }

                    result += "</ol>";
                } else if (data.question) {
                    result += label(data.question, index);
                }
                if (skipLoop) {
                    result += "</li>" +
                        (sameLoop ? "" : "</ol>");
                }
            }

            return result;
        }

        this.qa.click = function (e) {
            var el = e.target,
                active = el.getAttribute("data-active") === "true",
                arrB,
                arr,
                i,
                o;

            if (active) {
                e.preventDefault();

                arr = el.parentNode.querySelectorAll("[data-active]");

                for (i = 0; i < arr.length; i += 1) {
                    arr[i].removeAttribute("data-active");
                }

                arr = el.parentNode.querySelectorAll("input:checked");

                for (i = 0; i < arr.length; i += 1) {
                    arr[i].checked = false;
                }
            } else {
                el.setAttribute("data-active", "true");
            }

            arr = el.parentNode.parentNode.children;

            for (i = 0; i < arr.length; i += 1) {
                if (!active && arr[i] === el.parentNode) {
                    el.removeAttribute("disabled");
                } else {
                    arrB = arr[i].querySelectorAll("label");

                    for (o = 0; o < arrB.length; o += 1) {
                        if (active) {
                            arrB[o].removeAttribute("disabled");
                        } else {
                            arrB[o].setAttribute("disabled", "");
                        }
                    }
                }
            }
        };
        this.qa.dialog = function (e, index, type, finalEl) {
            var el = finalEl || e.target,
                data = obj.final[type],
                result = "";

            if (!finalEl && e) {
                this.click(e);
            }
            if (el && data) {
                result += "<div class=\"dialog" + (finalEl ? " final" : "") + "\">" +
                    "   <div class=table>" +
                    "   <div class=cel>" +
                    (finalEl ? "" : "       <div class=close onclick=ui.academy.qa.reset(this) tabindex=0></div>") +
                    "       <h1 class=nowrap>" + data.title + "</h1>" +
                    (finalEl ? "" : "       <p>שימי לב, אחרי הורדה לא ניתן לשנות קטגוריה</p>") +
                    "       <div><a class=button" + (finalEl ? " href=\"https://drive.google.com/uc?export=download&id=" + data.value + "\" target=_blank" :
                        " onclick=\"ui.academy.qa.final(this, '" + type + "')\" tabindex=0") + ">" + (finalEl ? "להוריד סרגל צבעים" : "לקבל סרגל צבעים") + "</a></div>" +
                    "   </div>" +
                    "   </div>" +
                    "</div>";

                if (!finalEl) {
                    el = index === 1 ? el.parentNode : el.parentNode.parentNode.parentNode;
                    el.insertAdjacentHTML("afterbegin", result);
                }
            }

            return result;
        };
        this.qa.reset = function (el) {
            if (el) {
                el.parentNode.parentNode.parentNode.remove();
            }

            var arr = ui.d.querySelectorAll(".qa [disabled]"),
                i;

            for (i = 0; i < arr.length; i += 1) {
                arr[i].removeAttribute("disabled");
            }

            arr = ui.d.querySelectorAll(".qa input:checked");

            for (i = 0; i < arr.length; i += 1) {
                arr[i].checked = false;
            }

            arr = ui.d.querySelectorAll(".qa [data-active]");

            for (i = 0; i < arr.length; i += 1) {
                arr[i].removeAttribute("data-active");
            }
        };
        this.qa.final = function (el, value) {
            var data = {
                    email: ui.academy.user.email,
                    token: ui.academy.user.token,
                    data: {qa: value}
                },
                close = ui.d.querySelector(".qa .close");

            if (close) {
                close.remove();
            }

            ui.form.accessibility(false, ui.d.querySelector(".qa"), true);

            fetch(ui.academy.fetch + "/update", {
                method: "POST",
                redirect: "error",
                body: JSON.stringify(data)
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                return !json.error && json;
            }).then(function (json) {
                ui.academy.user = json;
                localStorage.user = JSON.stringify(json);

                ui.academy.refresh();
            }).catch(function () {
                ui.academy.user.reportDate = new Date();
                ui.academy.user.reportData = data;

                if (el) {
                    el.remove();
                }

                delete localStorage.user;

                alert("טעות במערכת, נסי שוב מאוחר יותר");
                ui.academy.report("update", ui.academy.user);
                ui.academy.refresh();
            });
        };

        return "<div class=\"form qa\">" +
            "    <h1>" + obj.title.replace(/\n/g, "<br>") + "</h1>" +
            (this.user.task && this.user.task.qa ? this.qa.dialog(null, 0, this.user.task.qa, true) : label(obj, false)) +
            "</div>";
    },
    submit: function (e) {
        "use strict";

        if (e) {
            e.preventDefault();

            if (ui.form.valid(ui.form.list("[data-required]", e.target))) {
                ui.form.accessibility(false, e.target, true);

                var page = ui.hash("page"),
                    data = {
                        email: ui.academy.user.email,
                        token: ui.academy.user.token,
                        data: {}
                    };

                switch (page) {
                    case "calculator":
                        data.data.calculator = (function () {
                            var post = ui.form.deserialize(e.target),
                                A = post.A,
                                B = post.B,
                                C = post.C,
                                D = post.D,
                                tolerance = 8,
                                comp = function (a, b) {
                                    // Compare with tolerance
                                    return a === false ? false : Math.abs((a || 0) - (b || 0)) <= (tolerance || 0);
                                };

                            if (comp(A, B) && comp(A, C) && comp(A, D) && comp(B, C) && comp(B, D) && comp(C, D)) {
                                return "square";
                            } else if (comp(A, B) && (A > C && !comp(A, C) || B > C && !comp(B, C))) {
                                return "hourglass";
                            } else if ((A > B && !comp(A, B)) || (D > B && !comp(D, B))) {
                                return "invertedTriangle";
                            } else if (A < B && !comp(A, B)) {
                                return "triangle";
                            } else if (comp(A, B) && (A < C && !comp(A, C) || B < C && !comp(B, C))) {
                                return "rounded";
                            }

                            return "";
                        }());
                        break;
                }

                fetch(ui.academy.fetch + "/update", {
                    method: "POST",
                    redirect: "error",
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    return !json.error && json;
                }).then(function (json) {
                    ui.academy.user = json;
                    localStorage.user = JSON.stringify(json);

                    ui.academy.refresh();
                }).catch(function () {
                    ui.academy.user.reportDate = new Date();
                    ui.academy.user.reportData = data;

                    delete localStorage.user;

                    alert("טעות במערכת, נסי שוב מאוחר יותר");
                    ui.academy.report("update", ui.academy.user);
                    ui.academy.refresh();
                });
            }
        }
    },
    calculator: function (obj) {
        "use strict";

        var result = "",
            arr,
            i;

        if (this.user.task.calculator && obj.final[this.user.task.calculator]) {
            // Google docs links http://blog.appsevents.com/2014/04/how-to-bypass-google-drive-viewer-and.html
            result = "<div class=\"dialog final\">" +
                "   <div class=table>" +
                "   <div class=cel>" +
                "       <h1>" + obj.result.format(obj.final[this.user.task.calculator].title) + "</h1>" +
                "       <div><a class=button href=\"https://docs.google.com/presentation/d/" + obj.final[this.user.task.calculator].value + "/export/pdf\" target=_blank tabindex=0>" + obj.download + "</a></div>" +
                "   </div>" +
                "   </div>" +
                "</div>";
        } else {
            arr = Object.keys(obj.form);

            for (i = 0; i < arr.length; i += 1) {
                result += "<li class=row>" +
                    "    <label class=\"column label\" for=" + arr[i] + ">" + obj.form[arr[i]] + "</label>" +
                    "    <div class=column><input id=" + arr[i] + " name=" + arr[i] + " type=number min=50 max=200 maxlength=3 data-required" + (!i ? " autofocus" : "") + "></div>" +
                    "</li>";
            }

            result = "<form onsubmit=ui.academy.submit(event) method=post novalidate>" +
                "    <ul class=sheet>" + result + "</ul>" +
                "    <button>" + obj.button + "</button>" +
                "    <p>" + obj.notice + "</p>" +
                "</form>";
        }

        return "<div class=\"form calculator\">" +
            "    <h1>" + obj.title.replace(/\n/g, "<br>") + "</h1>" + result +
            "</div>";
    },
    session: function () {
        "use strict";

        if (this.valid && this.content) {
            var session = ui.hash("session"),
                result = "",
                page,
                prop,
                obj;
            this.self = session ? this.data.session[session] : (location.href.indexOf("#") === -1 || !location.hash && !history.pushState ? this.data.init : null);

            if (this.self && (!session || !this.nav || this.nav.querySelector("[data-session=\"" + session + "\"]:not([data-page])"))) {
                page = ui.hash("page");
                obj = this.self.page || this.self.pages;

                if (this.bar && this.bar.checked) {
                    this.bar.checked = false;
                }
                if (obj) {
                    if (session && !page) {
                        result += "<ol class=items dir=ltr>";

                        for (prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                result += "    <li>" + this.list(obj[prop], session, prop) + "</li>";
                            }
                        }

                        result += "</ol>";

                        this.content.innerHTML = result;

                        if (ui.comment) {
                            ui.comment.remove();
                        }
                    } else {
                        obj = session ? obj && obj[page] : obj;

                        if (obj) {
                            switch (obj.type) {
                                case "video":
                                    result += "<div class=video>" +
                                        "    <iframe src=\"https://www.youtube.com/embed/" + obj.value + "?showinfo=0\" allowfullscreen></iframe>" +
                                        "</div>" +
                                        "<div class=space><h1>" + obj.title + "</h1></div>";
                                    break;
                                case "document":
                                    // width="640" height="480"
                                    // http://blog.appsevents.com/2014/04/how-to-bypass-google-drive-viewer-and.html
                                    result += "<div class=video>" +
                                        "    <iframe src=\"https://drive.google.com/file/d/" + obj.value + "/preview\" allowfullscreen></iframe>" +
                                        "</div>" +
                                        "<div class=space>" +
                                        "    <h1>" + obj.title + "</h1>" +
                                        "    <a class=button href=\"https://drive.google.com/uc?export=download&id=" + obj.value + "\" target=_blank download=\"" + obj.title + ".pdf\"><b>להוריד " + obj.title + "</a>" +
                                        "</div>";
                                    break;
                                case "calculator":
                                    result += this.calculator(obj);
                                    break;
                                case "qa":
                                    result += this.qa(obj);
                                    break;
                            }

                            this.content.innerHTML = result;
                            this.self = obj;

                            if (ui.comment) {
                                ui.comment.load(this.content);
                            }
                        }
                    }
                }
            } else {
                delete this.self;
                this.refresh(true);
            }
        }
    },
    toggleNavClassName: function (el, avoidRedirect) {
        "use strict";

        if (el) {
            var hash = {
                    session: this.dataset(el, "session"),
                    page: this.dataset(el, "page")
                },
                name = hash.page || !hash.session ? "active" : "expand",
                reset = this.nav && this.nav.querySelector("." + name),
                selected = this.nav && this.nav.querySelector(".selected");
            hash = this.serialize(hash);

            if (!avoidRedirect && selected) {
                selected.classList.remove("selected");
            }
            if (reset) {
                reset.classList.remove(name);
            }
            if (!hash.page) {
                reset = this.nav && this.nav.querySelector(".active");

                if (reset) {
                    reset.classList.remove("active");
                }
            }
            if (el) {
                if (!avoidRedirect && !hash.page) {
                    el.classList.add("selected");
                }

                el.classList.add(name);
            }
        }
    },
    toggleNav: function (initLoad) {
        "use strict";

        var session = ui.hash("session"),
            page = ui.hash("page"),
            obj = location.hash ? this.data.session[session] : this.data.init,
            arr;

        if (this.nav) {
            if (obj) {
                this.toggleNavClassName(this.nav.querySelector(location.hash ? "[data-session=\"" + session + "\"]:not([data-page])" : "a"));

                if (obj.pages && obj.pages[page]) {
                    this.toggleNavClassName(this.nav.querySelector("[data-session=\"" + session + "\"][data-page=\"" + page + "\"]"));
                }
            }
            if (initLoad && !location.hash) {
                arr = this.nav.querySelectorAll("[data-session]:not([data-page])");

                this.toggleNavClassName(arr[arr.length - 1], true);
            }
        }

        this.session();
    },
    legacy: function () {
        "use strict";

        if (!ui.w.Promise && ui.asyncScript) {
            ui.asyncScript("https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch");
        }
    },
    init: function () {
        "use strict";

        this.legacy();

        this.valid = !!this.user.email && !!this.user.token;
        this.content = ui.d.getElementById("content");
        this.details = ui.d.getElementById("details");
        this.bar = ui.d.getElementById("bar");

        ui.d.getElementById("loading").remove();
        this.content.removeAttribute("hidden");

        if (this.valid) {
            this.isLogged();
            ui.identify.all();
        } else {
            ui.form.el = ui.d.getElementById("form");
            this.button = ui.d.getElementById("button");
            this.email = ui.d.getElementById("email");
            this.pass = ui.d.getElementById("pass");
            this.link = ui.d.getElementById("link");
            this.details.removeAttribute("hidden");
        }

        ui.w.onhashchange = ui.w.onhashchange || function () {
            ui.academy.toggleNav();
        };
    }
};

ui.academy.init();
