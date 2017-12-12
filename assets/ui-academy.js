/* eslint
no-alert: 0 */

ui.academy = {
    data: {
        startDate: 1513461600000, /* 2017/12/17 */
        interval: 7,
        init: {
            title: "ברוכה הבאה לקורס סטייל שבא מבפנים",
            shortTitle: "ברוכה הבאה",
            video: "yCsI9dSOvK0"
        },
        session: {
            colours: {
                title: "הצבע הזה הוא אני",
                video: "-GfNNMbAwI4",
                pages: {
                    qa: {
                        type: "qa",
                        title: "שאלון:\nלאיזה קטגוריית צבעים את שייכת?",
                        value: "academy-colours.jpg",
                        option: [
                            {
                                title: "האם צבע השיער שלך שחור או חום כהה?",
                                option: [
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
                                option: [
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
                                option: [
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
                                value: "1RBWFZEoSG2IBhZWX74-bFerykqF1sJns"
                            },
                            deep: {
                                title: "את עמוקה",
                                value: "1dB3YO4ph2X6G-5ljir0RLUUQn3l7tkTZ"
                            },
                            bright: {
                                title: "את בהירה",
                                value: "1F1juuLT-pHxU4FVlLEFXamQKesNd3AzO"
                            },
                            mixed: {
                                title: "את מעורבת",
                                value: "1bmSwDG6GGggZTUuNjDHxZNMSlwYa8SuW"
                            },
                            warm: {
                                title: "את חמה",
                                value: "1lml4F6bRh9yiz47x-t7Xs5sWjlo1mE9i"
                            },
                            cold: {
                                title: "את קרה",
                                value: "1OOitln7OtHB7qvUqvhvkHI7XnmLLwPUR"
                            }
                        }
                    }
                }
            },
            "body-shape": {
                title: "כמה טוב להיות את!",
                video: "xZMfS-HXqXM",
                pages: {
                    calculator: {
                        type: "calculator",
                        title: "מחשבון:\nתאבחני את מבנה הגוף שלך",
                        value: "1gKI_JUyD20fvq27_B3Kxq9vfJ6f99xLnnd1ht1vibhU",
                        button: "הצג תוצאה",
                        notice: "שימי לב, חישוב ניתן רק לפעם אחת",
                        result: "את בעלת מבנה גוף {0}",
                        download: "להוריד מדריך הגיזרות",
                        error: "שגיאה בחישוב, {0}נא לפנות ללאה{1}",
                        option: {
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
                title: "על טעם, ריח, ואופי",
                video: "YjHQvrvnC9Y",
                pages: {
                    sat: {
                        type: "sat",
                        title: "שאלון:\nמצאי את סגנון הלבוש שלך",
                        next: "המשך",
                        back: "חזור",
                        button: "הצג תוצאה",
                        limit: "סמני מקסימום שתי תשובות",
                        value: "academy-style.jpg",
                        option: [
                            {
                                title: "כיצד את בוחרת את צבעי הבגדים שלך?",
                                option: {
                                    A: "בהתאם למצב רוח שלי באותו יום",
                                    B: "צבעים חזקים וקונטרסטים",
                                    C: "צבעי פסטל",
                                    D: "פריטי לבוש המתאימים מבחינת הצבעים, הבדים או הדוגמאות",
                                    E: "בשילובי צבעים בסיסיים ופשוטים ובצבעים חלקים, צבעי אדמה"
                                }
                            }, {
                                title: "כיצד תגדירי את סגנון הקניות שלך?",
                                option: {
                                    A: "אוהבת לקנות בשווקים, יד שניה ובמבצעים",
                                    B: "קונה בלי לחשוב פעמיים כל דבר שמוצא חן בעיני",
                                    C: "הקניות עושות אותי שמחה ואני נהנת, אני יוצאת לקניות כשאני רוצה לשפר מצב רוח שלי",
                                    D: "הקניות שלי מתוכננות ונעשות על פי רשימה מוכנה מראש, משקיעה בפריטים איכותיים וקלאסיים שתמיד באופנה",
                                    E: "קונה בהתאם לצורך או לקראת אירועים מיוחדים. לא מוכנה לוותר על נוחות, במקרה הצורך אלך לתופרת"
                                }
                            }, {
                                title: "כיצד היית מגדירה את הופעתך באופן כללי?",
                                option: {
                                    A: "בעלת סגנון ייחודי המשלב פריטים שונים ויוצאי דופן",
                                    B: "בעלת אמירה אופנתית ופריטים המושכים תשומת לב",
                                    C: "אוהבת בגדים עם קישוטים עדינים הגורמים לי להרגיש נשית",
                                    D: "נקי ואלגנטי",
                                    E: "אוהבת בגדים נוחים"
                                }
                            }, {
                                title: "איזה מהפריטים בארון שלך משמשים אותך לעבודה?",
                                option: {
                                    A: "פריטי לבוש אקראיים שאני מערבבת ביניהם לפי טעמי האישי",
                                    B: "פריטים יוצאי דופן שתופסים את העין",
                                    C: "חולצות יפות ועליוניות שאני משלבת עם חצאיות",
                                    D: "פריטים בסיסיים הניתנים לשדרוג עם אביזרים, פריטים מחויטים",
                                    E: "פריטי לבוש יום יומיים, כמו מכנסי ג'ינס וחולצה פשוטים"
                                }
                            }, {
                                title: "איזה מהפריטים בארון שלך משמשים אותך לשעות הפנאי?",
                                option: {
                                    A: "אוסף פריטי לבוש בסגנון רטרו או וינטאג'",
                                    B: "הפריטים האופנתיים שנרכשו לאחרונה",
                                    C: "פריטים יפים ונשיים, עם תחרות",
                                    D: "פריטים בעלי סגנון פשוט שלהם אני מוספיה אביזרים",
                                    E: "בגדים נוחים ואיכותיים, מכותנה או פשתן, טוניקות"
                                }
                            }, {
                                title: "איזה מהפריטים בארון שלך שמורים לאירועים מיוחדים?",
                                option: {
                                    A: "שילבו בדים מיוחדים או גזרות מעניינות",
                                    B: "פריטים מיוחדים וגרנדיוזיים המושכים תשומת הלב",
                                    C: "שמלות נשיות וקלילות ומקושטות ועשויים מבדים קלילים",
                                    D: "חליפה אלגנטית ומחויטת או שמלה קלאסית וסולידית בשילוב תכשיטים אופנתיים",
                                    E: "חצאית אלגנטית ערוכה ונוחה או מכנסיים בשילוב עם חולצה נוחה וחגיגית או טוניקה"
                                }
                            }, {
                                title: "כיצד תתארי את הנעליים שלך?",
                                option: {
                                    A: "לאו דווקא מתאימות ללבוש שלי אבל מיוחדות",
                                    B: "לרוב בעלות עקבים",
                                    C: "יפות עם סרטים או קישוטים",
                                    D: "קלאסיות, מתאימות להרבה בגדים",
                                    E: "נוחות ושטוחות"
                                }
                            }, {
                                title: "איזה סוג תכשיטים את אוהבת?",
                                option: {
                                    A: "לא שגרתיים, ממש פריטי אספנות",
                                    B: "גדולים ובעלי אמירה אישית",
                                    C: "מורכבים ועשירים מאוד בפריטים, עם סלסולים ופרחים",
                                    D: "בעלי קו מעודן וקלאסי, עשויים מזהב או כסף",
                                    E: "עשויים בדרך כלל מחומרים טבעים"
                                }
                            }, {
                                title: "מהו יחסך לנושא האיפור?",
                                option: {
                                    A: "אוהבת להתנסות בדברים חדשים ומתחדשים כל הזמן",
                                    B: "אוהבת אותו מודגש וקצת מוגזם",
                                    C: "אוהבת ומשקיעה בו זמן רב",
                                    D: "לא מחדשת, דבקה בהרגלים שלי, אבל חשוב ומשלים את ההופעה שלי",
                                    E: "מינימליסטי, אם בכלל"
                                }
                            }, {
                                title: "מהו סגנון כיסוי ראש / שיער שלך?",
                                option: {
                                    A: "משתנה בהתאם למצב הרוח שלי",
                                    B: "משתנה בקביעות, משתנה בצבעוניות",
                                    C: "אוהבת להוציא שיער בצדדים. שיער ארוך",
                                    D: "מעודן ומשתלב עם הלבוש שלך",
                                    E: "דורש תחזוקה מינימלית"
                                }
                            }, {
                                title: "כשאת בוחרת חולצה מודפסת היא תהיה____?",
                                option: {
                                    A: "הדפס בסגנון חדש, שאין לי בארון",
                                    B: "הדפס דומיננטי",
                                    C: "עדין עם נקודות או פרחים קטנים",
                                    D: "בדרך כלל קונה פריטים ללא הדפס",
                                    E: "אוהבת חלק וגם אוהבת הדפס אתני"
                                }
                            }
                        ],
                        success: {
                            title: "הסגנון שלך הוא {0}",
                            link: "https://www.pinterest.com/lea0156/",
                            value: "{0}סגנון-{1}/",
                            result: "תמונות סגנון {0}",
                            all: "תמונות לכל הסגנונות ב-{0}"
                        },
                        final: {
                            A: "יצירתי",
                            B: "דרמטי",
                            C: "רומנטי",
                            D: "קלאסי",
                            E: "טבעי"
                        }
                    }
                }
            },
            "magic-closet": {
                title: "ארון הקסמים",
                video: "dMe80qKYnX8"
            },
            "modular-outfit": {
                title: "יש לך מה ללבוש",
                video: "_VYx-UC-VqU",
                pages: {
                    "check-list": {
                        type: "document",
                        title: "צ'ק ליסט למערכת לבוש יעילה",
                        value: "1eSQaxVn2AKrwwrNafS0JnKTwjJzs50-7edCKn8kwkVs",
                        download: "https://docs.google.com/document/d/{0}/export?format=pdf"
                    }
                }
            },
            accessories: {
                title: "התוספת שתופסת",
                video: "fOYZbRKMYAE"
            },
            lingerie: {
                title: "יסודות למראה חטוב",
                video: "qk0-_Dnf3Z4"
            },
            bonuses: {
                title: "בונוסים",
                date: {
                    // Enabled 3w from registration date
                    interval: 3,
                    format: "..."
                },
                pages: {}
            }
        }
    },
    hash: {},
    iconCheck: "<svg class=icon-check><use xlink:href=#check /></svg>",
    iconClose: "<svg class=icon-close><use xlink:href=#close /></svg>",
    session: (function () {
        "use strict";

        function getData(sessionName, callback) {
            var result = {};

            try {
                result = JSON.parse(localStorage[sessionName]);
            } catch (e) {
                delete localStorage[sessionName];
            }

            if (typeof callback === "function") {
                return callback(result);
            }

            return result;
        }

        // localStorage renaming backwards compatibility, 2017/04/30
        return getData("session", function (session) {
            if (session.email && session.token) {
                return session;
            }

            return getData("user", function (user) {
                if (user.email && user.token) {
                    localStorage.session = localStorage.user;

                    delete localStorage.user;
                    ui.setUser(user);
                }

                return user;
            });
        });
    }()),
    fetch: (function () {
        "use strict";

        var parts = location.host.split(".");

        while (parts.length > 2) {
            parts.shift();
        }

        return location.protocol + "//lab." + parts.join(".") + "/academy";
    }()),
    dataset: function (el, prop) {
        "use strict";

        if (el && el.nodeType === 1) {
            return el.dataset ? el.dataset[prop] : el.getAttribute("data-" + prop);
        }
    },
    select: function (el, avoidRedirect) {
        "use strict";

        if (el) {
            var hash = {
                session: this.dataset(el, "session"),
                page: this.dataset(el, "page")
            };

            if ((this.hash.session === hash.session) &&
                (this.hash.page === hash.page)) {
                el.classList.add("expand");
            } else {
                hash = ui.serialize(hash);

                if (!avoidRedirect && hash) {
                    location.hash = hash;
                    ui.d.body.scrollTop = 0;
                } else if (!hash && location.hash || !this.data.session[ui.hash("session")]) {
                    location.hash = "";

                    if (history.replaceState) {
                        history.replaceState("", ui.d.title, location.pathname);
                    }
                }
            }
        }
    },
    refresh: function (stripHash) {
        "use strict";

        if (stripHash) {
            ui.w.location = location.pathname;
        } else {
            location.reload();
        }
    },
    login: function (e) {
        "use strict";

        e.preventDefault();
        ui.form.accessibility(false, null, true);

        var self = this;

        fetch(self.fetch + "/login", {
            method: "POST",
            // Prevent insecure redirects https://developer.mozilla.org/en-US/docs/Web/API/Response/redirected
            redirect: "error",
            body: JSON.stringify({
                email: self.email.value,
                pass: self.pass.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            localStorage.session = JSON.stringify(data);

            ui.setUser(data);
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

        var self = this;

        fetch(self.fetch + "/forgot", {
            method: "POST",
            redirect: "error",
            body: JSON.stringify({
                email: self.email.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
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

        delete localStorage.session;
        this.refresh(true);
    },
    date: function (options) {
        "use strict";

        options = options || {};

        if (!this.currentTime) {
            this.firstSession = true;
        } else if (this.firstSession) {
            delete this.firstSession;
        }

        this.currentTime = !options.interval && this.currentTime || new Date(Math.max(this.data.startDate || 0, this.data.date));
        var date = new Date(this.currentTime.setDate(this.currentTime.getDate() +
                (options.interval ? options.interval * this.data.interval :
                    (this.firstSession ? 0 : this.data.interval))) +
                (options.interval ? 0 : 10000000));

        return {
            enabled: +date <= +new Date,
            format: options.format || date.getUTCDate() + "/" + (date.getUTCMonth() + 1)
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
            (session ? " data-session=" + session : "") + (page ? " data-page=" + page : "") +
            " tabindex=" + (page ? -1 : 0);
    },
    isLogged: function () {
        "use strict";

        // IMPORTANT
        this.data.date = this.session.created * 1000;

        ui.d.documentElement.classList.remove("stretch");
        ui.d.documentElement.classList.add("logedin");
        this.details.remove();

        this.account = ui.d.getElementById("account");
        this.account.outerHTML = "<div class=profile>" +
            "    <img src=\"https://gravatar.com/avatar/" + this.session.avatar + "?s=42&r=g&d=mm\">" +
            "    <div class=\"table center\">" +
            "        <div class=cel>" +
            (this.session.firstName ? "            <div class=nowrap dir=auto>" + this.session.firstName + "</div>" : "") +
            "            <small onclick=ui.academy.logout()>התנתקי</small>" +
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

        result += "<div class=\"column nav-container\" id=sidenav role=navigation dir=ltr>" +
            "<div class=sidenav dir=rtl>" +
            "    <a class=active" + this.events() + "><label>" + (obj.shortTitle || obj.title) + "</label></a>" +
            "</div>";

        obj = this.data.session;

        result += "<ol class=sidenav dir=rtl>";

        for (session in obj) {
            if (obj.hasOwnProperty(session)) {
                date = this.date(obj[session].date);
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
        this.sidenav = ui.d.getElementById("sidenav");

        this.toggleNav(true);
    },
    /* list: function (obj, session, page) {
        "use strict";

        var url = "";

        if (obj.value) {
            switch (obj.type) {
                case "video":
                    url = ui.video.youtubeSupport ? "https://img.youtube.com/vi/" + obj.value + "/maxresdefault.jpg" : ui.video.getData(obj.value).image;
                    break;
                case "document":
                case "calculator":
                    // Params https://pgenom.com/community/threads/гуглодиск-как-хостинг-картинок-файловый-хостинг.1236/
                    url = "https://drive.google.com/thumbnail?authuser=0&sz=w640&id=" + obj.value;
                    break;
                case "sat":
                case "qa":
                    url = "/assets/" + obj.value;
                    break;
                default:
                    url = "";
            }
        }

        // YouTube image sizes http://stackoverflow.com/questions/2068344
        return obj ? "<a class=\"absolute cover\"" + this.events(session, page) +
            " style=\"background-image:url(" + url + ")\"><h3 class=nowrap dir=auto>" +
            obj.title.replace(/\n/g, " ") + "</h3></a>" : "";
    }, */
    report: function (/* type, data */) {
        "use strict";

        // TBD: report error
    },
    uniqueID: function () {
        "use strict";

        return Math.random().toString(16).substr(2, 8);
    },
    qa: function (obj) {
        "use strict";

        var self = this;

        function label(data, index, sameLoop) {
            var skipLoop = index !== false,
                result = "",
                final,
                key,
                id;

            index = index || 0;

            if (skipLoop && !sameLoop) {
                index += 1;
            }
            if (data) {
                if (skipLoop) {
                    final = !data.option;
                    id = !final && self.uniqueID();
                    result += (sameLoop ? "" : "<ol>") +
                        "<li><input type=radio name=" + index + (id ? " id=" + id : "") + ">" +
                        "<label onclick=" + (data.final ?
                            "\"ui.academy.qa.dialog(event, " + index + ", '" + data.final + "')\"" :
                            "ui.academy.qa.click(event) for=" + id) + ">" + ui.academy.iconCheck + data.title + "</label>";
                }
                if (Array.isArray(data.option)) {
                    index += 1;
                    result += "<ol>";

                    for (key in data.option) {
                        if (data.option.hasOwnProperty(key)) {
                            result += label(data.option[key], index, true);
                        }
                    }

                    result += "</ol>";
                } else if (data.option) {
                    result += label(data.option, index);
                }
                if (skipLoop) {
                    result += "</li>" +
                        (sameLoop ? "" : "</ol>");
                }
            }

            return result;
        }

        this.qa.click = function (e) {
            var el = e.target.tagName === "LABEL" ? e.target : e.target.closest("label"),
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
                    (finalEl ? "" : "       <div class=close onclick=ui.academy.qa.reset(this) tabindex=0>" + ui.academy.iconClose +"</div>") +
                    "       <h1 class=nowrap>" + data.title + "</h1>" +
                    (finalEl ? "" : "       <p>שימי לב, אחרי הורדה לא ניתן לשנות קטגוריה</p>") +
                    "       <div><a class=button" + (finalEl ? " href=\"https://drive.google.com/uc?export=download&id=" + data.value + "\" rel=noopener target=_blank" :
                        " onclick=\"ui.academy.qa.final(this, '" + type + "')\"") + " tabindex=0>" + (finalEl ? "להוריד סרגל צבעים" : "לקבל סרגל צבעים") + "</a></div>" +
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
                    email: ui.academy.session.email,
                    token: ui.academy.session.token,
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
                ui.academy.session = json;
                localStorage.session = JSON.stringify(json);

                ui.academy.refresh();
            }).catch(function () {
                ui.academy.session.reportDate = new Date;
                ui.academy.session.reportData = data;

                if (el) {
                    el.remove();
                }

                delete localStorage.session;

                alert("טעות במערכת, נסי שוב מאוחר יותר");
                ui.academy.report("update", ui.academy.session);
                ui.academy.refresh();
            });
        };

        return "<div class=\"form qa\">" +
            "    <h1>" + obj.title.replace(/\n/g, "<br>") + "</h1>" +
            (this.session.task && this.session.task.qa ? this.qa.dialog(null, 0, this.session.task.qa, true) : label(obj, false)) +
            "</div>";
    },
    submit: function (o, post) {
        "use strict";

        var e = o instanceof Event && o,
            el = o && o.target || o,
            self = this,
            data,
            page;

        if (e) {
            e.preventDefault();
        }
        if (ui.form.valid(ui.form.list("[data-required]", el))) {
            page = ui.hash("page");
            data = {
                email: ui.academy.session.email,
                token: ui.academy.session.token,
                data: {}
            };

            ui.form.accessibility(false, el, true, page === "sat" && "label");

            switch (page) {
                case "calculator":
                    data.data[page] = (function () {
                        post = ui.form.deserialize(el);
                        var A = post.A,
                            B = post.B,
                            C = post.C,
                            D = post.D,
                            tolerance = 8,
                            comp = function (a, b) {
                                // Compare with tolerance
                                return a === false ? false : Math.abs((a || 0) - (b || 0)) <= (tolerance || 0);
                            },
                            button,
                            status;

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

                        // C > D
                        ui.form.accessibility(true, el, true);

                        button = el.querySelector("button");
                        status = el.querySelector("[data-status]");

                        if (status) {
                            status.innerHTML = "<b>" + self.data.session["body-shape"].pages[page].error.format("<a href=\"/contact#diy\" target=_blank>", "</a>") + "</b>";
                            status.classList.add("error");
                        }
                        if (button) {
                            button.classList.add("error");
                        }
                    }());
                    break;
                case "sat":
                    data.data[page] = post;
                    el.closest("[data-handler]")
                        .querySelector("[data-back]")
                        .remove();
            }

            if (data.data[page]) {
                fetch(ui.academy.fetch + "/update", {
                    method: "POST",
                    redirect: "error",
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    return !json.error && json;
                }).then(function (json) {
                    ui.academy.session = json;
                    localStorage.session = JSON.stringify(json);

                    ui.academy.refresh();
                }).catch(function () {
                    ui.academy.session.reportDate = new Date;
                    ui.academy.session.reportData = data;

                    delete localStorage.session;

                    alert("טעות במערכת, נסי שוב מאוחר יותר");
                    ui.academy.report("update", ui.academy.session);
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

        if (this.session.task && this.session.task.calculator && obj.final[this.session.task.calculator]) {
            // Google docs links http://blog.appsevents.com/2014/04/how-to-bypass-google-drive-viewer-and.html
            result = "<div class=\"dialog final\">" +
                "   <div class=table>" +
                "   <div class=cel>" +
                "       <h1>" + obj.result.format(obj.final[this.session.task.calculator].title) + "</h1>" +
                "       <div><a class=button href=\"https://docs.google.com/presentation/d/" + obj.final[this.session.task.calculator].value + "/export/pdf\" rel=noopener target=_blank tabindex=0>" + obj.download + "</a></div>" +
                "   </div>" +
                "   </div>" +
                "</div>";
        } else {
            arr = Object.keys(obj.option);

            for (i = 0; i < arr.length; i += 1) {
                result += "<li class=row>" +
                    "    <label class=\"column label\" for=" + arr[i] + ">" + obj.option[arr[i]] + "</label>" +
                    "    <div class=column><input id=" + arr[i] + " name=" + arr[i] + " type=number min=50 max=200 maxlength=3 data-required" + (i ? "" : " autofocus") + "></div>" +
                    "</li>";
            }

            result = "<form onsubmit=ui.academy.submit(event) method=post novalidate>" +
                "    <ul class=sheet>" + result + "</ul>" +
                "    <div data-status><small><i>" + obj.notice + "</i></small></div>" +
                "    <button>" + obj.button + "</button>" +
                "</form>";
        }

        return "<div class=\"form calculator\">" +
            "    <h1>" + obj.title.replace(/\n/g, "<br>") + "</h1>" + result +
            "</div>";
    },
    sat: {
        ui: function (obj) {
            "use strict";

            var self = ui.academy,
                result = "",
                index = 0,
                sum = [],
                calculate,
                prefixer,
                option,
                group,
                title,
                links,
                form;

            if (self.session.task && self.session.task.sat && self.session.task.sat.length) {
                calculate = (function () {
                    // http://www.jstips.co/en/javascript/flattening-multidimensional-arrays-in-javascript/
                    var flattenArray = [].concat.apply([], self.session.task.sat),
                        // http://stackoverflow.com/questions/840781/#24968449
                        sumObject = flattenArray.map(function (name) {
                            return {
                                count: 1,
                                name: name
                            };
                        }).reduce(function (a, b) {
                            a[b.name] = (a[b.name] || 0) + b.count;

                            return a;
                        }, {}),
                        keys = Object.keys(sumObject),
                        largest = Math.max.apply(null, keys.map(function (x) {
                            return sumObject[x];
                        })),
                        res = keys.reduce(function (arr, key) {
                            if (sumObject[key] === largest) {
                                arr.push(key);
                            }

                            return arr;
                        }, []);

                    return res.length > 2 ? ["A"] : res;
                }());
                title = obj.success.title.format(calculate.map(function (x) {
                    return obj.final[x];
                }).join(" "));
                links = calculate.map(function (x) {
                    return "<a class=button href=\"" + obj.success.value.format(obj.success.link, obj.final[x]) + "\" rel=noopener target=_blank tabindex=0>" + obj.success.result.format(obj.final[x]) + "</a>";
                }).join("");

                result = "<div class=\"dialog final\">" +
                    "   <div class=table>" +
                    "   <div class=cel>" +
                    "       <h1>" + title + "</h1>" +
                    "       <div>" + links + "</div>" +
                    "       <p>" + obj.success.all.format("<a href=\"" + obj.success.link + "\" rel=noopener target=_blank>Pinterest</a>") + "</p>" +
                    "   </div>" +
                    "   </div>" +
                    "</div>";
            } else {
                prefixer = function (prop) {
                    var prefixes = ["Webkit", "Moz", "ms"],
                        style = ui.d.documentElement.style,
                        vendorProp,
                        i;

                    if (prop) {
                        prop = prop.toLowerCase().replace(/-([a-z])/g, function (a, b) {
                            return b.toUpperCase();
                        });

                        if (prop in style) {
                            return prop;
                        }

                        prop = prop.charAt(0).toUpperCase() + prop.substr(1);

                        for (i = 0; i < prefixes.length; i += 1) {
                            vendorProp = prefixes[i] + prop;

                            if (vendorProp in style) {
                                return vendorProp;
                            }
                        }
                    }

                    return null;
                };
                this.navigate = function (goNext) {
                    var el = ui.d.getElementById("slide");

                    if (el) {
                        if (goNext) {
                            index += 1;
                        } else {
                            index -= 1;
                        }

                        el.style[prefixer("transform")] = "translateX(" + (100 * index) + "%)";
                    }
                };
                this.check = function (el) {
                    var handler = el.closest("[data-handler]"),
                        button = handler.querySelector("[data-next]"),
                        uncheckedChecboxes = handler.querySelectorAll("input:not(:checked) ~ label"),
                        data = ui.form.deserialize(handler),
                        keys = Object.keys(data),
                        count = keys.length,
                        i;

                    sum[index] = keys;

                    if (count) {
                        button.removeAttribute("disabled");
                    } else {
                        button.setAttribute("disabled", "");
                    }

                    for (i = 0; i < uncheckedChecboxes.length; i += 1) {
                        if (count > 1) {
                            uncheckedChecboxes[i].setAttribute("disabled", "");
                        } else {
                            uncheckedChecboxes[i].removeAttribute("disabled");
                        }
                    }
                };
                this.done = function (el) {
                    self.submit(el.closest("[data-handler]"), sum);
                };
                option = function (key, value) {
                    var id = self.uniqueID();

                    return "<li>" +
                        "    <input name=" + key + " id=" + id + " onclick=ui.academy.sat.check(this) type=checkbox>" +
                        "    <label class=\"column label wrap\" for=" + id + ">" + ui.academy.iconCheck + value + "</label>" +
                        "</li>";
                };
                group = function (data, n, len) {
                    var arr = Object.keys(data.option),
                        res = "",
                        i;

                    for (i = 0; i < arr.length; i += 1) {
                        res += option(arr[i], data.option[arr[i]]);
                    }

                    return "<li class=qa data-handler>" +
                        "    <h4 class=wrap>" + n + ". " + data.title + "</h4>" +
                        "    <small class=wrap><i>" + obj.limit + "</i></small>" +
                        "    <ol>" + res + "</ol>" +
                        (n === len ?
                            "    <button class=next onclick=ui.academy.sat.done(this) data-next disabled>" + obj.button + "</button>" :
                            "    <button class=next onclick=ui.academy.sat.navigate(true) data-next disabled>" + obj.next + "</button>") +
                        (n > 1 ? "    <span class=back onclick=ui.academy.sat.navigate() data-back>" + obj.back + "</span>" : "") +
                        "</li>";
                };
                form = function (data) {
                    var arr = data.option,
                        res = "",
                        i;

                    for (i = 0; i < arr.length; i += 1) {
                        res += group(arr[i], i + 1, arr.length);
                    }

                    return res;
                };

                result = "<form onsubmit=event.preventDefault() method=post novalidate>" +
                    "    <ul class=\"sheet wrapper\" id=slide>" + form(obj) + "</ul>" +
                    "</form>";
            }

            return "<div class=\"form sat\">" +
                "    <h1>" + obj.title.replace(/\n/g, "<br>") + "</h1>" + result +
                "</div>";
        }
    },
    videoTemplate: function (id, title, pages) {
        "use strict";

        var buttons = "",
            prop;

        if (pages) {
            for (prop in pages) {
                if (pages.hasOwnProperty(prop)) {
                    buttons += "<a class=button href=\"#session=" + ui.hash("session") + "&page=" + prop + "\">" + pages[prop].title + "</a>";
                }
            }
        }

        return "<div class=video>" +
            (ui.video.youtubeSupport ?
                "<iframe src=\"https://www.youtube.com/embed/" + id + "?showinfo=0\" allowfullscreen></iframe>" :
                ui.video.template(id)) +
            "</div>" +
            "<div class=space><h1>" + title + "</h1>" + buttons + "</div>";
    },
    pageSession: function () {
        "use strict";

        var hash = ui.hash(),
            result = "",
            // prop,
            obj;

        if (this.valid && this.content) {
            this.self = hash.session ? this.data.session[hash.session] :
                (location.href.indexOf("#") === -1 || !location.hash && !history.replaceState ? this.data.init : null);

            if (this.self && (!hash.session || !this.sidenav ||
                this.sidenav.querySelector("[data-session=\"" + hash.session + "\"]:not([data-page])"))) {
                obj = this.self;

                if (this.bar && this.bar.checked) {
                    this.bar.checked = false;
                }
                if (obj) {
                    if (!hash.session || hash.session && !hash.page) {
                        if (obj.video) {
                            result += this.videoTemplate(obj.video, obj.title, obj.pages);
                        }

                        // result += "<ol class=items dir=ltr>";

                        // for (prop in obj) {
                        //     if (obj.hasOwnProperty(prop)) {
                        //         result += "    <li>" + this.list(obj[prop], hash.session, prop) + "</li>";
                        //     }
                        // }

                        // result += "</ol>";
                    } else {
                        obj = hash.session ? obj && obj.pages && obj.pages[hash.page] : obj;

                        if (obj && obj.type) {
                            switch (obj.type) {
                                case "video":
                                    result += this.videoTemplate(obj.value, obj.title);
                                    break;
                                case "document":
                                    // width="640" height="480"
                                    // http://blog.appsevents.com/2014/04/how-to-bypass-google-drive-viewer-and.html
                                    result += "<div class=video>" +
                                        "    <iframe src=\"https://drive.google.com/file/d/" +
                                            obj.value + "/preview\" allowfullscreen></iframe>" +
                                        "</div>" +
                                        "<div class=space>" +
                                        "    <h1>" + obj.title + "</h1>" +
                                        "    <a class=button href=\"" + (obj.download ? obj.download.format(obj.value) :
                                            "https://drive.google.com/uc?export=download&id=" + obj.value) +
                                            "\" rel=noopener target=_blank download=\"" +
                                            obj.title + ".pdf\" tabindex=0><b>להוריד " + obj.title + "</a>" +
                                        "</div>";
                                    break;
                                case "calculator":
                                case "sat":
                                case "qa":
                                    result += this[obj.type].ui ? this[obj.type].ui(obj) : this[obj.type](obj);
                                    break;
                            }

                            this.self = obj;
                        }
                    }

                    this.content.innerHTML = result;

                    if (obj) {
                        if (obj.video || obj.type === "video") {
                            ui.video.applyPlyr();
                        }
                        if (ui.comment) {
                            ui.comment.load(this.content);
                        }
                    } else if (ui.comment) {
                        ui.comment.remove();
                    }
                }
            } else {
                delete this.self;
                this.refresh(true);
            }
        }
    },
    toggleNavClassName: function (el) {
        "use strict";

        var hash = ui.hash(),
            resetElement = {
                session: this.sidenav && this.sidenav.querySelector(".expand"),
                active: this.sidenav && this.sidenav.querySelector(".active"),
                page: this.sidenav && this.sidenav.querySelector(".selected")
            },
            applyClass,
            diff;

        hash.previous = {
            session: this.dataset(resetElement.session, "session"),
            page: this.dataset(resetElement.page || resetElement.active, "page")
        };
        applyClass = function (key, className, forceApplyClass) {
            if (forceApplyClass || hash.previous[key] !== hash[key]) {
                if (resetElement[key]) {
                    resetElement[key].classList.remove(className);

                    if (resetElement[key].nextElementSibling && resetElement[key].nextElementSibling.tagName === "OL") {
                        resetElement[key].nextElementSibling.querySelectorAll("a").forEach(function (a) {
                            a.tabIndex = -1;
                        });
                    }

                    if (ui.d.activeElement === resetElement[key]) {
                        resetElement[key].blur();
                    }
                }
                if (!diff) {
                    diff = true;
                }
                if (el) {
                    el.classList.add(className);

                    if (el.nextElementSibling && el.nextElementSibling.tagName === "OL") {
                        el.nextElementSibling.querySelectorAll("a").forEach(function (a) {
                            a.tabIndex = 0;
                        });
                    }
                }
            }
        };

        applyClass("session", "expand");
        applyClass("page", "selected", !!diff);
        applyClass("active", "active", !!diff);
    },
    toggleNav: function (initLoad) {
        "use strict";

        this.hash = ui.hash();

        var session = this.hash.session,
            page = this.hash.page,
            obj = location.hash ? this.data.session[session] : this.data.init,
            arr;

        if (this.sidenav) {
            if (obj) {
                this.toggleNavClassName(this.sidenav.querySelector(location.hash ?
                    "[data-session=\"" + session + "\"]:not([data-page])" : "a"));

                if (obj.pages && obj.pages[page]) {
                    this.toggleNavClassName(this.sidenav.querySelector("[data-session=\"" +
                        session + "\"][data-page=\"" + page + "\"]"));
                }
            }
            if (initLoad && !location.hash) {
                arr = this.sidenav.querySelectorAll("[data-session]:not([data-page])");

                this.toggleNavClassName(arr[arr.length - 1]);
            }
        }

        this.pageSession();
    },
    init: function () {
        "use strict";

        var self = this;

        ui.legacy(function () {
            var loading = ui.d.getElementById("loading");

            self.valid = !!self.session.email && !!self.session.token;
            self.content = ui.d.getElementById("content");
            self.details = ui.d.getElementById("details");
            self.bar = ui.d.getElementById("bar");

            if (loading) {
                loading.remove();
            }

            self.content.removeAttribute("hidden");

            if (self.valid) {
                self.isLogged();
                ui.identify.all();
            } else {
                ui.form.el = ui.d.getElementById("form");
                self.button = ui.d.getElementById("button");
                self.email = ui.d.getElementById("email");
                self.pass = ui.d.getElementById("pass");
                self.link = ui.d.getElementById("link");
                self.details.removeAttribute("hidden");
            }

            ui.w.onhashchange = ui.w.onhashchange || function () {
                self.toggleNav();
            };
        });
    }
};

ui.academy.init();
