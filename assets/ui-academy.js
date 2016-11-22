/*eslint
comma-spacing: 2,
dot-notation: [2, {"allowKeywords": true}],
eqeqeq: 2,
indent: 2,
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

ui.academy = {
    data: {
        date: 1480802400000, /* 2016/12/04 */
        interval: 7,
        init: {
            title: "ברוכות הבאות",
            video: [
                {
                    id: "7iRtL9RTX7w",
                    title: "ברוכות הבאות לקורס “הנוסחא לסטיילינג ב5 דקות לאישה הדתית”"
                }
            ]
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
                    "video-4": {
                        type: "video",
                        title: "איך לשלב צבעים",
                        value: "3cA_tnKHbvo"
                    },
                    qa: {
                        type: "qa",
                        title: "לאיזה קטגוריית צבעים את שייכת?",
                        value: [
                            {
                                title: "האם צבע השיער שלך שחור או חום כהה?",
                                success: {
                                    title: "העיניים שלך מבריקות, בולטות, בצבע כחול כהה או ירוק כהה? האם יש קונטראסט בין הלבן בעיניים לבין האישון?",
                                    option: {
                                        title: "כן",
                                        success: {
                                            title: "את בעלת מזל! את צלולה!",
                                            download: "aaaa"
                                        }
                                    }
                                }
                            },
                            {
                                title: "האם צבע השיער שלך בלונד בהיר, אפור בהיר, חום בהיר?"
                            },
                            {
                                title: "האם צבע השיער שלך חום בינוני או עכברי, אפור בינוני, בלונד אפורי, בלונד כהה?"
                            },
                            {
                                title: "האם צבע השיער שלך ג'ינג'י, דבש, ערמוני?"
                            },
                            {
                                title: "האם צבע השיער שלך חום אפרפר (עכברי), בלונדי-אפרורי, כסוף, שיבה אפור?"
                            }
                        ]
                    },
                    "download": {
                        type: "download",
                        title: "מעגל צבעים",
                        value: "https://drive.google.com/file/d/0B3TGizvMXI6lSnktdTdteUtJS0k/view"
                    }
                }
            },
            "body-shape": {
                title: "מבנה גוף",
                video: [
                    {
                        id: "67JOe6ZRV7c",
                        title: "למה חשוב להתלבש לפי מבנה גוף"
                    },
                    {
                        id: "QrPC6lvIAKE",
                        title: "אילו מבנה גוף יש"
                    },
                    {
                        id: "GRyHlrJnV6Q",
                        title: "איך לדעת מה מבנה גוף שלך"
                    }
                ],
                table: {
                    title: "שאלון: תאבחני את מבנה הגוף שלך",
                    video: "איך למלא שאלון" // turtorial
                }
            },
            style: {
                title: "סגנון הלבוש",
                video: [
                    {
                        id: "7AMQxfNDzIM",
                        title: "למה חשוב לדעת מה סגנון הלבוש שלך"
                    },
                    {
                        id: "",
                        title: "אילו סגנונות לבוש יש"
                    },
                    {
                        if: "rs8o-d7gkpo",
                        title: "שיעורי בית"
                    }
                ],
                table: {
                    title: "שאלון: תאבחני את סגנון הלבוש שלך"
                }
            },
            lingerie: {
                title: "הלבשה תחתונה",
                video: [
                    {
                        id: "k1ASomUAM34",
                        title: "כמה חשיבות יש הלבשה תחתונה"
                    },
                    {
                        id: "",
                        title: "גזרה, צבע ובד בהלבשה תחתונה"
                    },
                    {
                        id: "2H9HC-eaRAE",
                        title: "איך לדעת שהלבשה תחתונה מתאימה"
                    },
                    {
                        id: "nYtkrABvBXw",
                        title: "שיעורי בית"
                    }
                ]
            },
            accessories: {
                title: "אקססוריז",
                video: [
                    {
                        id: "lJN1n7ecLmY",
                        title: "למה להשתמש באקססוריז"
                    },
                    {
                        id: "",
                        title: "סוגי אקססוריז"
                    },
                    {
                        id: "dkO7I7yHu0o",
                        title: "איך להתאים אקססוריז למבנה גוף שלך"
                    },
                    {
                        id: "uxNjzX1V6uk",
                        title: "שיעורי בית"
                    }
                ]
            },
            "modular-outfit": {
                title: "מערכת לבוש היעלה ביותר לאישה הדתית",
                video: [
                    {
                        id: "8rn-HCDQzL4",
                        title: "למה חשוב שמערכת לבוש תהיה יעילה"
                    },
                    {
                        id: "",
                        title: "מה כוללת מערכת לבוש יעילה"
                    },
                    {
                        id: "",
                        title: "כמה שילובים חדשים אפשר להוציא מ9 פריטים"
                    },
                    {
                        id: "yzJaU1ZW1QU",
                        title: "שיעורי בית"
                    }
                ],
                "check-list": "צ’ק ליסט למערכת לבוש יעילה"
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
    token: localStorage.token ? JSON.parse(localStorage.token) : {},
    fetch: "https://lab.laukstein.com/academy",
    refresh: function (light) {
        "use strict";

        if (light) {
            location.hash = "";

            if (history.pushState) {
                history.pushState("", ui.d.title, location.pathname);
            }
        } else {
            location = location.pathname;
        }
    },
    login: function (e) {
        "use strict";

        e.preventDefault();
        ui.form.accessibility(false);
        this.button.classList.add("spin");

        fetch(this.fetch + "/login", {
            method: "POST",
            body: JSON.stringify({
                email: this.email.value,
                pass: this.pass.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            localStorage.token = JSON.stringify(data);
            var self = ui.academy;

            ui.form.accessibility(true);
            self.button.classList.remove("spin");

            if (data.email && data.hash) {
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
        this.link.setAttribute("onclick", "ui.academy.refresh()");
    },
    remind: function (e) {
        "use strict";

        e.preventDefault();
        ui.form.accessibility(false);
        this.button.classList.add("spin");

        fetch(this.fetch + "/forgot", {
            method: "POST",
            body: JSON.stringify({
                email: this.email.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            var self = ui.academy;

            ui.form.accessibility(true);
            self.button.classList.remove("spin");

            if (data.success) {
                ui.form.el.innerHTML = "<h2>פרטי גישה נשלחו למייל שלך</h2><a onclick=ui.academy.refresh()>לנסות להתחבר</a>";
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

        delete localStorage.token;
        this.refresh();
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
    isLogged: function () {
        "use strict";

        this.content.innerHTML = "";
        this.content.removeAttribute("id");
        this.details.outerHTML = "<div class=profile>" +
            "<img src=\"https://gravatar.com/avatar/" + this.token.hash + "?s=42&r=g&d=mm\">" +
            "<div class=nowrap dir=auto>לאה ובנימין לאוקשטיין</div>" +
            "<small onclick=ui.academy.logout()>להתנתק</small>" +
            "</div>";
        delete this.details;

        var script = ui.d.createElement("script"),
            obj = this.data.init,
            result = "",
            subProp,
            video,
            table,
            date,
            prop;

        ui.w.disqus_config = function () {
            this.page.identifier = location.hash.replace(/^#/, "");
            this.page.url = location.href;
        };
        script.src = "https://lealaukstein.disqus.com/embed.js";
        script.setAttribute("data-timestamp", +new Date());
        (ui.d.head || ui.d.body).appendChild(script);

        result += "<div class=column id=content></div>" +
            "<div class=\"column nav-container\" id=nav>" +
            "<div class=nav>" +
            "    <a class=active onclick=ui.academy.refresh(true)><label>" + obj.title + "</label></a>" +
            "</div>";
        obj = this.data.session;
        result += "<ol class=nav>";

        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                date = obj[prop].date || this.date();
                result += "    <li><label" + (date.enabled ? "" : " disabled") +
                    "><time>" + date.format + "</time><div>" + obj[prop].title + "</div></label>";
                video = obj[prop].video;
                table = obj[prop].table;

                if (video || table) result += "<ol>";
                if (video) {
                    for (subProp in video) {
                        if (video.hasOwnProperty(subProp)) {
                            result += "    <li><a href=#session=" + prop + "&page=" + subProp + " tabindex=0>" + video[subProp].title + "</a>";
                        }
                    }
                }
                if (table) {
                    result += "    <li><a href=#session=" + prop + "&page=table tabindex=0>" + table.title + "</a>";
                }
                if (video || table) result += "</ol>";
            }
        }

        result += "</ol>" +
            "</div>";

        this.content.innerHTML = result;
        this.content = ui.d.getElementById("content");
        this.nav = ui.d.getElementById("nav");

        this.session();
    },
    video: function (obj, url) {
        "use strict";

        return obj ? "<a href=" + url + "><img src=https://img.youtube.com/vi/" + obj.id + "/1.jpg><h3>" + obj.title + "</h3></a>" : "";
    },
    session: function () {
        "use strict";

        if (this.valid && this.content) {
            this.url = ui.hash("session");
            this.self = this.url ? this.data.session[this.url] :
                (location.href.indexOf("#") === -1 || !location.hash && !history.pushState ? this.data.init : null);

            if (this.self) {
                var result = "",
                    obj = this.self.video,
                    page = ui.hash("page"),
                    prop;
                this.comment = ui.d.getElementById("disqus_thread");

                if (this.comment) {
                    this.comment.remove();
                    delete this.comment;
                }
                if (obj) {
                    if (this.url && page === undefined) {
                        for (prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                result += this.video(obj[prop], "#session=" + this.url + "&page=" + prop);
                            }
                        }
                    }

                    obj = this.url ? obj[ui.hash("page")] : obj[0];

                    if (obj) {
                        result += "<div class=video>" +
                            "    <iframe src=\"https://www.youtube.com/embed/" + obj.id + "?showinfo=0\" sandbox=\"allow-scripts allow-same-origin\" allowfullscreen></iframe>" +
                            "</div>" +
                            "<div class=space><h1>" + obj.title + "</h1></div>";
                    }

                    this.content.innerHTML = result;

                    this.nav.insertAdjacentHTML("afterend", "<div class=comment-container><div class=\"comment table space medium no-padding\" id=disqus_thread></div></div>");

                    if (ui.w.DISQUS) {
                        DISQUS.reset({
                            reload: true,
                            config: function () {
                                this.page.identifier = location.hash.replace(/^#/, "");
                                this.page.url = location.href;
                            }
                        });
                    }
                }
            } else {
                delete this.self;
                this.refresh(true);
            }
        }
    },
    init: function () {
        "use strict";

        this.valid = !!this.token.email && !!this.token.hash;
        this.loading = ui.d.getElementById("loading");
        this.content = ui.d.getElementById("content");
        this.details = ui.d.getElementById("details");

        this.loading.remove();
        this.content.removeAttribute("hidden");

        if (this.valid) {
            this.isLogged();
        } else {
            ui.form.el = ui.d.getElementById("form");
            this.button = ui.d.getElementById("button");
            this.email = ui.d.getElementById("email");
            this.pass = ui.d.getElementById("pass");
            this.link = ui.d.getElementById("link");
            this.details.removeAttribute("hidden");
        }

        ui.w.onhashchange = ui.w.onhashchange || function () {
            ui.academy.session();
        };
    }
};

ui.academy.init();
