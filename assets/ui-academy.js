(function () {
    "use strict";

    var outer = {},
        inner = {};

    inner.el = {};
    inner.hashData = {};
    inner.pageSchema = {
        fullPackage: "full",
        sessionInterval: 7,
        package: {
            closet: undefined,
            shopping: undefined,
            full: {
                title: "ברוכה הבאה לקורס סטייל שבא מבפנים",
                shortTitle: "סטייל שבא מבפנים",
                video: "yCsI9dSOvK0",
                session: {
                    colours: {
                        title: "הצבע הזה הוא אני",
                        video: "6fuubXrOQ6c",
                        page: {
                            colorPlates: {
                                title: "לוחות צבעים",
                                video: "_dohRGGGLmQ"
                            },
                            colorSwatch: {
                                title: "ערכת \"צבע מבפנים\"",
                                question: {
                                    option: {
                                        hair: {
                                            question: "באיזה צבע השיער שלך?",
                                            answer: {
                                                black: "שחור",
                                                darkBrown: "חום כהה",
                                                mediumBrown: "חום בינוני",
                                                lightBrown: "חום בהיר",
                                                honey: "דבש",
                                                brightBlond: "בלונד בהיר",
                                                darkBlond: "בלונד כהה",
                                                redhead: "ג'ינג'י",
                                                chestnut: "ערמוני",
                                                blondeGray: "בלונד אפור",
                                                lightGray: "אפור בהיר",
                                                mediumGray: "אפור בינוני",
                                                grayGray: "שיבה אפור",
                                                mousey: "עכברי",
                                                silver: "כסוף"
                                            }
                                        },
                                        eyes: {
                                            question: "באיזה צבע העיניים שלך?",
                                            answer: {
                                                brown: "חום",
                                                darkBrown: "חום כהה",
                                                honeyBrown: "חום דבש",
                                                greenishBrown: "חום ירקרק",
                                                lightGray: "אפור בהיר",
                                                greenish: "ירקרק",
                                                brightGreen: "ירוק בהיר",
                                                oliveGreen: "ירוק זית",
                                                darkGreen: "ירוק כהה",
                                                blue: "כחול",
                                                lightBlue: "כחול בהיר",
                                                blueGreen: "כחול ירוק"
                                            }
                                        },
                                        skin: {
                                            question: "מה גוון העור שלך?",
                                            answer: {
                                                tan: "שזוף",
                                                bright: "בהיר",
                                                dark: "כהה"
                                            }
                                        }
                                    },
                                    address: "כתובת מלאה לשליחת דואר",
                                    error: "תעני על כל השאלות",
                                    button: "אשר הזמנה"
                                }
                            }
                        }
                    },
                    bodyShape: {
                        title: "כמה טוב להיות את",
                        video: "xZMfS-HXqXM",
                        page: {
                            bodyType: {
                                title: "מחשבון מבנה הגוף",
                                value: "1gKI_JUyD20fvq27_B3Kxq9vfJ6f99xLnnd1ht1vibhU",
                                button: "הצג תוצאה",
                                notice: "שימי לב, חישוב ניתן רק לפעם אחת",
                                result: "את בעלת מבנה גוף {0}",
                                download: "להורדת מדריך הגיזרות",
                                error: "שגיאה בחישוב, {0}נא לפנות ללאה{1}",
                                option: {
                                    height: "הגובה (ס\"מ)",
                                    shoulders: "היקף הכתפיים",
                                    bust: "היקף החזה",
                                    waist: "היקף המותניים",
                                    hips: "היקף הירכיים"
                                }
                            }
                        }
                    },
                    style: {
                        title: "על טעם, ריח, ואופי",
                        video: "06Q_GGX5KLQ",
                        page: {
                            dressStyle: {
                                title: "מחשבון סגנון הלבוש",
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
                                            E: "בשילובי צבעים ניטרליים ופשוטים או בצבעי אדמה"
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
                                            E: "חצאית אלגנטית ארוכה ונוחה או מכנסיים בשילוב עם חולצה נוחה וחגיגית או טוניקה"
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
                                            D: "מעודן ומשתלב עם הלבוש שלי",
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
                                    }, {
                                        title: "באיזה סגנון את רואה את עצמך מתלבשת?",
                                        limit: "סמני תשובה אחת",
                                        showImage: true,
                                        condition: function (arr) {
                                            var opt = {
                                                    C: ["C", "F"],
                                                    E: ["E", "G"],
                                                    CD: ["C", "D"]
                                                },
                                                final = ui.academy.schema.final,
                                                el = this.id && ui.d.getElementById(this.id),
                                                res,
                                                i;

                                            arr = opt[JSON.stringify(arr).replace(/[[,\]"]/g, "")];
                                            this.option = {};

                                            if (Array.isArray(arr)) {
                                                for (i = 0; i < arr.length; i += 1) {
                                                    this.option[arr[i]] = final[arr[i]];
                                                }
                                            }

                                            res = !!Object.keys(this.option).length;

                                            if (el && res && this.callback) {
                                                el.innerHTML = this.callback.apply(null, this.params).replace(/^<li\b[^>]*>|<\/li>$/g, "");
                                            }

                                            return res;
                                        }
                                    }
                                ],
                                final: {
                                    C: "רומנטי",
                                    D: "קלאסי",
                                    E: "טבעי",
                                    F: "בוהומייני",
                                    G: "קז'ואל"
                                },
                                downloadButton: "להורדת חוברת הסגנון"
                            }
                        }
                    },
                    modularOutfit: {
                        title: "יש לך מה ללבוש",
                        video: "_VYx-UC-VqU",
                        download: {
                            title: "להורדת חוברת מערכת פריטי הבסיס",
                            link: "https://drive.google.com/uc?export=download&id=1kTlj1ZOXh8YQQyJCRuwBoShIfGKkUpLp"
                        }
                    },
                    accessories: {
                        title: "התוספת שתופסת",
                        video: "fOYZbRKMYAE",
                        page: {
                            coversShoes: {
                                title: "מטפחות ונעליים",
                                video: "JWTBhFri44w",
                                download: {
                                    title: "להורדת חוברת האקססוריז",
                                    link: "https://drive.google.com/uc?export=download&id=1wPOeaV2Y1xKnOsoOR1VevgU-g0L95cGO"
                                }
                            },
                            matchHeadcover: {
                                title: "בונוס התאמה למבני הפנים",
                                video: "XW4S6zGtGic"
                            }
                        }
                    },
                    lingerie: {
                        title: "יסודות למראה חטוב",
                        video: "qk0-_Dnf3Z4",
                        page: {
                            material: {
                                title: "צבע, בד וגזרה בהלבשה תחתונה",
                                shortTitle: "הלבשה תחתונה",
                                video: "IpwM9HEeup4",
                                download: {
                                    title: "להורדת חוברת הלבשה התחתונה",
                                    link: "https://drive.google.com/uc?export=download&id=1E8QTzqkLoWk23ht-BUCHt77QRoYCOuhc"
                                }
                            }
                        }
                    },
                    closet: {
                        title: "מיני קורס ארון מדויק",
                        shortTitle: "ארון מדויק",
                        highlight: function () {
                            if (inner.containsPackage(inner.pageSchema.fullPackage)) {
                                return "בונוס";
                            }
                        },
                        video: "KzC7tJRjxqc",
                        text: function () {
                            if (!inner.containsPackage(inner.pageSchema.fullPackage) &&
                                !inner.containsPackage("shopping")) {
                                return "מיני קורס קניות ממוקדות הוא למעשה תיעוד של סיבוב קניות אמיתי." +
                                    " הקורס מלמד איך מזהים את הבגד שיחמיא לך, עוד לפני שמודדים." +
                                    " בתור משתתפת מיני קורס ארון מדויק מגיע לך הנחה של [20% על קורס קניות](/payment#orderid=66321B17).";
                            }
                        },
                        page: {
                            clearingCloset: {
                                title: "פינוי ארון",
                                video: "FiMXsvqCDZ8"
                            },
                            bodyType: undefined,
                            orderCloset: {
                                title: "סדר תכלס",
                                video: "ZzK_ol7qLPs",
                                download: {
                                    title: "להורדת חוברת ארון הקסמים",
                                    link: "https://drive.google.com/uc?export=download&id=1Ee5Zh92agzw6qkRsKE40t4zpwiw-DQTg"
                                }
                            },
                            clothesSum: {
                                title: "מחשבון כמויות הבגדים",
                                question: {
                                    option: {
                                        shabbat: {
                                            question: "כמה סטים את לובשת בשבת?",
                                            answer: {
                                                1: 1,
                                                2: 2,
                                                3: 3
                                            }
                                        },
                                        dress: {
                                            question: "האם את נוהגת ללבוש שמלות?",
                                            answer: {
                                                yes: "כן תמיד",
                                                no: "בכלל לא",
                                                shabbat: "רק בשבתות",
                                                sometimes: "לפעמים"
                                            }
                                        },
                                        cover: {
                                            question: "האם את נוהגת ללבוש מטפחות או כובעים?",
                                            answer: {
                                                yes: "כן",
                                                no: "לא"
                                            }
                                        }
                                    },
                                    error: "תעני על כל השאלות",
                                    button: {
                                        success: "המשך"
                                    }
                                },
                                activity: {
                                    label: [
                                        "סוג הפעילות",
                                        "כמות הפעילויות בחודש"
                                    ],
                                    option: {
                                        job: "ימי עבודה",
                                        evening: "בילוי ערב",
                                        shabbat: "שבת",
                                        sport: "ספורט",
                                        "": "אחר"
                                    },
                                    error: "תמלאי לפחות שדה אחד",
                                    button: {
                                        back: "חזור",
                                        create: "להוסיף פעילות נוספת",
                                        remove: "הסר",
                                        success: "חישוב"
                                    }
                                },
                                sum: {
                                    label: [
                                        "סוג",
                                        "ס\"כ הבגדים",
                                        "ס\"כ שילובים"
                                    ],
                                    option: {
                                        cover: {
                                            title: "מטפחות",
                                            perc: 22
                                        },
                                        chain: {
                                            title: "שרשראות נוכחות",
                                            perc: 5
                                        },
                                        bag: {
                                            title: "תיקים",
                                            perc: 5
                                        },
                                        shoe: {
                                            title: "נעליים",
                                            perc: 11
                                        }
                                    },
                                    sets: {
                                        dress: "שמלות",
                                        jacket: "ז'קטים",
                                        shirt: "חולצות",
                                        skirt: "חצאיות"
                                    },
                                    button: {
                                        retry: "חישוב מחדש"
                                    }
                                }
                            },
                            winterClothes: {
                                title: "בגדי חורף",
                                video: "2_QEgMc6ieg",
                                pinterest: "https://www.pinterest.com/lealaukstein/סטייל-בחורף/"
                            }
                        }
                    },
                    shopping: {
                        title: "מיני קורס קניות ממוקדות",
                        shortTitle: "קניות ממוקדות",
                        highlight: function () {
                            if (inner.containsPackage(inner.pageSchema.fullPackage)) {
                                return "בונוס";
                            }
                        },
                        video: "ar7Ly0L-LVk",
                        text: function () {
                            if (!inner.containsPackage(inner.pageSchema.fullPackage) &&
                                !inner.containsPackage("closet")) {
                                return "מיני קורס ארון מדויק הוא למעשה תיעוד של סידור ארון אמיתי." +
                                    " הקורס מלמד לבנות ארון בגדים מדויק - לזהות פריטים מדליקים," +
                                    " להוציא פריטים שלא מחמיאים, לסדר שהכל יהיה נגיש," +
                                    " ולבנות רשימת קניות בהתאם לכל סוגי הפעילויות שלך." +
                                    "\nבתור משתתפת מיני קורס קניות ממוקדות מגיע לך הנחה של [20% על הקורס ארון](/payment#orderid=8A572215).";
                            }
                        },
                        page: {
                            shoppingList: {
                                title: "רשימת קניות",
                                video: "H-jZdaa00jE"
                            },
                            internalExternal: {
                                title: "פנימיות וחיצוניות",
                                video: "9ybTp1UqeCU"
                            },
                            colorSwatch: undefined,
                            bodyType: undefined,
                            dressStyle: undefined,
                            doShopping: {
                                title: "תכלס קניות",
                                video: "dA13_gg6bA8"
                            },
                            onlineShopping: {
                                title: "קניות אונליין",
                                video: "9MQ6oTxeKMU"
                            }
                        }
                    } /* ,
                    bonuses: {
                        title: "בונוסים",
                        date: {
                            // Enabled 3w from registration date
                            sessionInterval: 3,
                            format: "..."
                        },
                        generateHTML: function () {
                            function addMonths(isoDate, numberMonths) {
                                // Resource https://stackoverflow.com/questions/5645058/how-to-add-months-to-a-date-in-javascript#13633692
                                var dateObject = new Date(isoDate),
                                    day = dateObject.getDate();

                                // avoid date calculation errors
                                dateObject.setHours(20);

                                // add months and set date to last day of the correct month
                                dateObject.setMonth(dateObject.getMonth() + numberMonths + 1, 0);

                                // set day number to min of either the original one or last day of month
                                dateObject.setDate(Math.min(day, dateObject.getDate()));

                                return inner.addLeadingZeros(dateObject.getDate()) +
                                    "/" + inner.addLeadingZeros(dateObject.getMonth() + 1) +
                                    "/" + dateObject.getFullYear();
                            }

                            return "<div class=\"form bonuses\">" +
                                "    <h1><a href=/shopping target=_blank>סיבוב קניות - הנחה 50% בתוקף עד " + addMonths(inner.pageSchema.startDate, 5) + "</a></h1>" +
                                "</div>";
                        }
                    } */
                }
            }
        }
    };
    inner.endpoint = (function () {
        var parts = (location.hostname || location.host).split("."); // eslint-disable-line compat/compat

        while (parts.length > 2) {
            parts.shift();
        }

        return "https://lab." + parts.join(".") + "/webhook";
    }());
    inner.sessionData = (function () {
        function getData(sessionName, callback) {
            var result = {};

            try {
                result = JSON.parse(localStorage[sessionName]);
            } catch (e) {
                delete localStorage[sessionName];
            }

            if (!result.task) {
                result.task = {};
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
    }());
    inner.sessionLogedin = function () {
        ui.d.documentElement.classList.remove("stretch");
        ui.d.documentElement.classList.add("logedin");
        inner.el.details.remove();

        inner.el.account = ui.d.getElementById("account");
        inner.el.account.outerHTML = "<div class=profile>" +
            "    <img src=\"https://gravatar.com/avatar/" + inner.sessionData.avatar + "?s=42&r=g&d=mm\">" +
            "    <div class=\"table center\">" +
            "        <div class=cel>" +
            (inner.sessionData.firstname ? "<div class=nowrap dir=auto>" + inner.sessionData.firstname + "</div>" : "") +
            "            <small onclick=ui.academy.sessionLogout()>התנתקי</small>" +
            "        </div>" +
            "    </div>" +
            "</div>";

        delete inner.el.details;
        delete inner.el.account;

        var currentSession = inner.hashData.session,
            packages = inner.pageSchema.package,
            fn = {};

        fn.generateEvents = function (sessionValue, pageValue) {
            return " onclick=ui.academy.navClick(this)" +
                " onkeydown=ui.academy.navKeydown(event)" +
                (sessionValue ? " data-session=" + sessionValue : "") +
                (pageValue ? " data-page=" + pageValue : "") +
                " tabindex=" + (pageValue ? -1 : 0);
        };
        fn.generateDateObject = function (opt) {
            // opt => startDate, sessionInterval, firstSession
            opt = opt || {};

            var date = new Date(opt.startDate.setDate(opt.startDate.getDate() +
                    (opt.sessionInterval ? opt.sessionInterval * inner.pageSchema.sessionInterval :
                        (opt.firstSession ? 0 : inner.pageSchema.sessionInterval))) +
                    (opt.sessionInterval ? 0 : 10000000));

            date.setHours(0, 0, 0, 0);

            return {
                enabled: +date <= +new Date,
                format: opt.format ||
                    inner.addLeadingZeros(date.getDate()) +
                    "/" + inner.addLeadingZeros(date.getMonth() + 1)
            };
        };
        fn.packageStartDate = function (packageName) {
            var startDate = inner.sessionData.startDate || inner.sessionData.package[packageName] || inner.sessionData.created;

            return new Date(+new Date(startDate * 1000).setHours(0, 0, 0, 0));
        };
        fn.generatePage = function (schema, sessionValue, dateObject) {
            var pages = schema.page,
                html = "",
                link,
                page;

            if (pages && (!dateObject || dateObject.enabled)) {
                html += "<ol>";

                for (page in pages) {
                    if (Object.prototype.hasOwnProperty.call(pages, page)) {
                        if (schema.page[page].download && typeof schema.page[page].download.link === "string") {
                            link = schema.page[page].download.link;
                        } else if (inner.sessionData.task[page] && inner.sessionData.task[page].link) {
                            link = inner.sessionData.task[page].link;
                        } else {
                            link = undefined;
                        }

                        html += "<li>" +
                            "<a class=unselectable" + fn.generateEvents(sessionValue, page) + ">" +
                            "<div>" + (pages[page].shortTitle || pages[page].title) + "</div>" +
                            "</a>" +
                            inner.generateDownloadIcon(link) +
                            "</li>";
                    }
                }

                html += "</ol>";
            }

            return html;
        };
        fn.generateSession = function (session, packageName) {
            var dateParams = {},
                highlight = "",
                html = "",
                sessionValue,
                dateObject,
                link;

            dateParams.startDate = fn.packageStartDate(packageName);

            html += "<ol class=\"sidenav counter\" dir=rtl>";

            for (sessionValue in session) {
                if (Object.prototype.hasOwnProperty.call(session, sessionValue)) {
                    dateParams.sessionInterval = session[sessionValue].date && session[sessionValue].date.sessionInterval;
                    dateParams.firstSession = !Object.prototype.hasOwnProperty.call(dateParams, "firstSession");
                    dateObject = fn.generateDateObject(dateParams);

                    if (session[sessionValue].highlight) {
                        highlight = typeof session[sessionValue].highlight === "function" ?
                            session[sessionValue].highlight() : session[sessionValue].highlight;
                        highlight = highlight ? " data-highlight=\"" + highlight + "\"" : "";
                    }
                    if (session[sessionValue].download && typeof session[sessionValue].download.link === "string") {
                        link = session[sessionValue].download.link;
                    } else {
                        link = undefined;
                    }

                    html += "<li>" +
                        "<label" + (sessionValue === currentSession ? " class=expand" : "") +
                            (dateObject.enabled ? fn.generateEvents(sessionValue) : " disabled") + ">" +
                        "<time>" + dateObject.format + "</time>" +
                        "<div" + highlight + ">" + (session[sessionValue].shortTitle || session[sessionValue].title) + "</div>" +
                        inner.generateDownloadIcon(link) +
                        "</label>" +
                        fn.generatePage(session[sessionValue], sessionValue, dateObject) +
                        "</li>";
                }
            }

            html += "</ol>";

            return html;
        };
        fn.generatePackage = function (packageName) {
            var schema = packages[packageName],
                html = "";

            if (schema.session) {
                html += "<div class=sidenav dir=rtl>" +
                    "<a class=active" + fn.generateEvents() + ">" +
                    "<label>" + (schema.shortTitle || schema.title) + "</label>" +
                    "</a>" +
                    "</div>" +
                    fn.generateSession(schema.session, packageName);
            } else {
                html += "<ol class=sidenav dir=rtl>" +
                    "<li>" +
                    "<label class=\"expand selected active\"" + fn.generateEvents(packageName) + ">" +
                    (schema.shortTitle || schema.title) +
                    "</label>" +
                    fn.generatePage(schema, packageName) +
                    "</li>" +
                    "</ol>";
            }

            return html;
        };

        inner.el.content.outerHTML = "<div class=container>" +
            "    <div class=\"column nav-container\" id=sidenav role=navigation dir=ltr>" +
            Object.keys(packages).map(fn.generatePackage).join("\n") +
            "    </div>" +
            "    <div class=\"column content\" id=content></div>" +
            "</div>";

        inner.el.content = ui.d.getElementById("content");
        inner.el.sidenav = ui.d.getElementById("sidenav");

        inner.toggleNav(true);
    };
    outer.sessionRefresh = function (stripHash) {
        if (stripHash) {
            ui.w.location = location.pathname;
        } else {
            location.reload();
        }
    };
    inner.sessionLogin = function (e) {
        e.preventDefault();
        ui.form.accessibility(false, e.target, true);

        fetch(inner.endpoint + "/login", {
            method: "POST",
            // Prevent insecure redirects https://developer.mozilla.org/en-US/docs/Web/API/Response/redirected
            redirect: "error",
            body: JSON.stringify({
                email: inner.el.email.value.toLowerCase(),
                pass: inner.el.pass.value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            inner.sessionUpdate(json);
            inner.workerUpdate({status: "login"});
            ui.setUser(json);
            ui.form.accessibility(true, e.target, true);

            if (json.email && json.token) {
                outer.sessionRefresh();
            } else if (inner.el.button) {
                inner.el.button.classList.add("error");
                inner.el.button.innerHTML = "הפרטים שגויים, נסי שוב";
            }
        }).catch(function (error) {
            // Unable to login due to server error
            ui.log("Unable to login");
            ui.log(error);

            ui.form.accessibility(true, e.target, true);

            if (inner.el.button) {
                inner.el.button.classList.add("error");
                inner.el.button.innerHTML = "טעות במערכת, נסי שוב מאוחר יותר";
            }
        });
    };
    outer.sessionLogout = function (preventPushSW) {
        delete localStorage.session;

        if (!preventPushSW) {
            inner.workerUpdate({status: "logout"});
        }

        outer.sessionRefresh(true);
    };
    inner.containsPackage = function (packageName) {
        if (Array.isArray(outer.package)) {
            return outer.package.includes(packageName);
        }

        return outer.package === packageName;
    };
    inner.getUserCurrentPackage = function (userData) {
        if (userData && userData.package) {
            if (Object.keys(userData.package).includes(inner.pageSchema.fullPackage)) {
                return inner.pageSchema.fullPackage;
            }

            var packages = Object.keys(inner.pageSchema.package),
                packageNames = Object.keys(userData.package).filter(function (packageName) {
                    return packages.includes(packageName);
                });

            if (packageNames.length > 1) {
                return packageNames;
            }

            return packageNames[0];
        }

        return "";
    };
    inner.getUserDefaultPackage = function (userData) {
        var packageName = inner.getUserCurrentPackage(userData);

        if (Array.isArray(packageName)) {
            if (inner.hashData.session && packageName.includes(inner.hashData.session)) {
                // Current session based on URL
                return inner.hashData.session;
            }

            return packageName.reduce(function (a, b) {
                return userData.package[a] > userData.package[b] ? a : b;
            });
        }

        return packageName;
    };
    inner.sessionUpdate = function (data, preventPushSW) {
        if (typeof data === "object") {
            if (!preventPushSW) {
                inner.workerUpdate({
                    status: "update",
                    data: data
                });
            }

            inner.sessionData = data;

            if (!inner.sessionData.task) {
                inner.sessionData.task = {};
            }

            localStorage.session = JSON.stringify(data);
        }
    };
    inner.sessionVerify = function (onSuccess) {
        var type = "verify",
            data = {
                email: inner.sessionData.email,
                token: inner.sessionData.token
            };

        fetch(inner.endpoint + "/" + type, {
            method: "POST",
            redirect: "error",
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            var userDefaultPackage = inner.getUserDefaultPackage(json);

            if (json.error || !userDefaultPackage) {
                return Promise.reject(json);
            }

            inner.sessionUpdate(json);

            if (typeof onSuccess === "function") {
                onSuccess(userDefaultPackage);
            }

            return Promise.resolve(json);
        }).catch(function (err) {
            console.error(err);
            inner.sessionErrorReport(type, data);
        });
    };
    inner.sessionForgot = function () {
        inner.el.form.removeEventListener("submit", inner.sessionLogin);
        inner.el.form.addEventListener("submit", inner.sessionRemind);
        inner.el.email.focus();
        inner.el.pass.parentNode.remove();
        inner.el.button.innerHTML = "שלח לי סיסמא";
        inner.el.button.classList.remove("error");
        inner.el.link.innerHTML = "לנסות להתחבר מחדש";
        inner.el.link.removeEventListener("click", inner.sessionForgot);
        inner.el.link.addEventListener("click", outer.sessionRefresh);
    };
    inner.sessionRemind = function (e) {
        e.preventDefault();
        ui.form.accessibility(false, e.target, true);

        fetch(inner.endpoint + "/forgot", {
            method: "POST",
            redirect: "error",
            body: JSON.stringify({
                email: inner.el.email.value.toLowerCase()
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            ui.form.accessibility(true, e.target, true);

            if (data.success) {
                inner.el.form.innerHTML = "<h2>פרטי גישה נשלחו למייל שלך</h2><a onclick=ui.academy.sessionRefresh(true)>לנסות להתחבר</a>";
            } else {
                inner.el.button.classList.add("error");
                inner.el.button.innerHTML = "מייל לא רשום, נסי שוב";
            }
        }).catch(function () {
            ui.form.accessibility(true, e.target, true);

            if (inner.el.button) {
                inner.el.button.classList.add("error");
                inner.el.button.innerHTML = "טעות במערכת, נסי שוב מאוחר יותר";
            }
        });
    };
    inner.sessionError = function () {
        if (sessionStorage.sessionError) {
            var el = ui.d.getElementById("session-error");

            if (el) {
                el.hidden = false;
                el.innerHTML = sessionStorage.sessionError;
                delete sessionStorage.sessionError;
            }
        }
    };
    inner.sessionErrorReport = function (type, data) {
        if (ui.environment === "prod") {
            if ("sendBeacon" in navigator) {
                navigator.sendBeacon(inner.endpoint + "/error", JSON.stringify({
                    schema: type,
                    email: inner.sessionData.email,
                    log: JSON.stringify(data, null, 2)
                }));
            }
        } else {
            console.error(type, data);

            if (console.trace) {
                console.trace();
            }
        }

        // Your session has expired, please login again
        sessionStorage.sessionError = "זהינו שלא פעלת בחשבונך בדקות האחורנות. אנה התחברי שוב.";

        delete localStorage.session;
        outer.sessionRefresh();
    };
    inner.sessionPage = function () {
        if (!inner.valid || !inner.el.content) {
            return;
        }

        var schema = inner.getCurrentSchema(),
            result = "";

        delete outer.schema;
        delete outer.fn;

        if (schema && schema.page && inner.hashData.page && !schema.page[inner.hashData.page]) {
            // Trying to open invalid page
            delete inner.hashData.page;
            location.hash = ui.serialize(inner.hashData);
        } else if (schema && (!inner.hashData.session || !inner.el.sidenav ||
            inner.el.sidenav.querySelector("[data-session=\"" + inner.hashData.session + "\"]:not([data-page])"))) {
            if (inner.el.bar && inner.el.bar.checked) {
                inner.el.bar.checked = false;
            }
            if (!inner.hashData.session || inner.hashData.session && !inner.hashData.page) {
                outer.schema = schema;

                result += inner.pageUI.generateHTML(schema);

                if (typeof schema.generateHTML === "function") {
                    result += schema.generateHTML();
                }

                /* generateVideoList = function (obj, schema, page) {
                    var url = "";

                    if (obj.value) {
                        switch (obj.type) {
                            case "video":
                                url = ui.video.youtubeSupport ? "https://i.ytimg.com/vi/" + obj.value + "/maxresdefault.jpg" : ui.video.getData(obj.value).image;
                                break;
                            case "document":
                            case "bodyType":
                                // Params https://pgenom.com/community/threads/гуглодиск-как-хостинг-картинок-файловый-хостинг.1236/
                                url = "https://drive.google.com/thumbnail?authuser=0&sz=w640&id=" + obj.value;
                                break;
                            case "dressStyle":
                            case "colorSwatch":
                                url = "/assets/" + obj.value;
                                break;
                            default:
                                url = "";
                        }
                    }

                    // YouTube image sizes http://stackoverflow.com/questions/2068344
                    return obj ? "<a class=\"absolute cover\"" + fn.generateEvents(schema, page) +
                        " style=\"background-image:url(" + url + ")\"><h3 class=nowrap dir=auto>" +
                        obj.title.replace(/\n/g, " ") + "</h3></a>" : "";
                };

                result += "<ol class=items dir=ltr>";

                for (prop in schema) {
                    if (schema.hasOwnProperty(prop)) {
                        result += "    <li>" + generateVideoList(schema[prop], inner.hashData.session, prop) + "</li>";
                    }
                }

                result += "</ol>"; */
            } else {
                if (inner.hashData.session) {
                    schema = schema.page && schema.page[inner.hashData.page];
                }
                if (schema) {
                    outer.schema = schema;

                    if (typeof inner.pageUI[inner.hashData.page] === "function") {
                        // // "document":
                        // // Usage example
                        // //     "check-list": {
                        // //         type: "document",
                        // //         title: "צ'ק ליסט למערכת לבוש יעילה",
                        // //         value: "1eSQaxVn2AKrwwrNafS0JnKTwjJzs50-7edCKn8kwkVs",
                        // //         download: "https://docs.google.com/document/d/{0}/export?format=pdf"
                        // //     }
                        // // width="640" height="480"
                        // // http://blog.appsevents.com/2014/04/how-to-bypass-google-drive-viewer-and.html
                        // result += "<div class=video>" +
                        //     "    <iframe src=\"https://drive.google.com/file/d/" + schema.value + "/preview\"" +
                        //         " allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>" +
                        //     "</div>" +
                        //     "<div class=space>" +
                        //     "    <h1>" + schema.title + "</h1>" +
                        //     "    <a class=button href=\"" + (schema.download ? schema.download.format(schema.value) :
                        //         inner.getDownloadLink(schema.value)) +
                        //         "\" rel=noopener target=_blank tabindex=0><b>להורדת " + schema.title + "</a>" +
                        //     "</div>";
                        result += inner.pageUI[inner.hashData.page](schema);

                        if (inner.pageUI[inner.hashData.page].fn) {
                            outer.fn = inner.pageUI[inner.hashData.page].fn;
                        }
                    } else {
                        result += inner.pageUI.generateHTML(schema);
                    }
                    if (schema.pinterest) {
                        result += "<div class=pinterest><a data-pin-do=embedBoard data-pin-board-width=900 data-pin-scale-height=631" +
                            " data-pin-scale-width=115 href=\"" + inner.htmlSafe(schema.pinterest) + "\"><span class=spin> " + schema.pinterest + "</span></a></div>";
                    }
                }
            }

            inner.el.content.innerHTML = result;

            if (schema.pinterest) {
                // Pinterest widget https://developers.pinterest.com/tools/widget-builder/
                if (ui.w.PinUtils) {
                    PinUtils.build();
                } else {
                    ui.asyncScript("https://assets.pinterest.com/js/pinit.js");
                }
            }
            if (schema) {
                if (schema.video) {
                    ui.video.applyPlyr();
                }
                if (ui.comment) {
                    ui.comment.load(inner.el.content);
                }
            } else if (ui.comment) {
                ui.comment.remove();
            }
        } else {
            outer.sessionRefresh(true);
        }
    };
    inner.pageUI = {};
    inner.pageUI.markdown = function (text) {
        if (!text) {
            return text;
        }

        var format = {
            newline: function (str) {
                return "<p dir=auto>" + str + "</p>";
            },
            bold: {
                // Markdown https://stackoverflow.com/questions/10168285/markdown-to-convert-double-asterisks-to-bold-text-in-javascript
                regex: /\*(\S(.*?\S)?)\*/gm,
                pattern: "<b>$1</b>"
            },
            strikethrough: {
                regex: /~(\S(.*?\S)?)~/gm,
                pattern: "<s>$1</s>"
            },
            link: {
                // Testcase https://regex101.com/r/apPfwx/4
                // https://davidwells.io/snippets/regex-match-markdown-links
                regex: /\[([\s\d\w\u0590-\u05FF%-_]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)|(https?:\/\/[^\s:@.,]+\.+[a-z])[^<\s\\!,]{0,}[^<\s\\!|^.,?$]{1,}|[^\s:,/@\-0=]{1,}[a-z0-9\-.]\.com?\/*[^<\s\\!]{1,}[^<\s\\!|^.,$]/ig,
                pattern: function () {
                    var a = ui.d.createElement("a");

                    a.href = arguments[2] || arguments[3];
                    a.rel = "noopener";
                    a.target = "_blank";
                    a.dir = "auto";
                    a.textContent = arguments[1] || a.href;

                    return a.outerHTML;
                }
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

        return text.split("\n").map(format.newline).join("\n")
            .replace(format.bold.regex, format.bold.pattern)
            .replace(format.strikethrough.regex, format.strikethrough.pattern)
            .replace(format.link.regex, format.link.pattern)
            .replace(format.email.regex, format.email.pattern)
            .replace(format.phone.regex, format.phone.pattern);
    };
    inner.pageUI.getDownloadLink = function (schema) {
        if (schema && schema.download) {
            return inner.generateDownloadLink(schema.download, schema.download.title);
        }

        return "";
    };
    inner.pageUI.generateHTML = function (schema) {
        var html = "",
            prop;

        if (schema.video) {
            html += "<div class=video>";

            if (ui.video.youtubeSupport) {
                html += "<iframe src=\"https://www.youtube.com/embed/" + schema.video + "\"" +
                    " allow=\"autoplay; encrypted-media; picture-in-picture; fullscreen\" allowfullscreen></iframe>";
            } else {
                html += ui.video.template(schema.video);
            }

            html += "</div>";
        }
        if (typeof schema.text === "function") {
            schema.text = schema.text();
        }
        if (schema.video || schema.text || schema.download) {
            html += "<div class=space>" +
                "<h1>" + schema.title + "</h1>";

            if (schema.text) {
                html += inner.pageUI.markdown(schema.text);
            }
            if (schema.page) {
                for (prop in schema.page) {
                    if (Object.prototype.hasOwnProperty.call(schema.page, prop)) {
                        html += "<a class=button href=\"#session=" + inner.hashData.session +
                            "&page=" + prop + "\" tabindex=0>" + schema.page[prop].title + "</a> ";
                    }
                }
            }

            html += inner.pageUI.getDownloadLink(schema);
            html += "</div>";
        }

        return html;
    };
    inner.pageUI.generateDate = function (sessionValue, text) {
        var date = "";

        if (sessionValue && sessionValue.date) {
            date = new Date(sessionValue.date * 1000);
            date = inner.addLeadingZeros(date.getDate()) +
                "/" + inner.addLeadingZeros(date.getMonth() + 1) +
                "/" + date.getFullYear();

            if (typeof text === "string") {
                date = text.format(date);
            }
        }

        return date;
    };
    inner.pageUI.colorSwatch = function (schema) {
        var self = inner.pageUI.colorSwatch,
            sessionValue = inner.sessionData.task.colorSwatch,
            question = schema.question,
            fn = {};

        self.fn = {};
        self.value = {};

        fn.question = function (field) {
            var obj = question.option[field],
                option = function (value) {
                    return "<option value=" + value + ">" + obj.answer[value] + "</option>";
                };

            return "<li class=\"row qa\">" +
                "    <div class=label hidden>" + obj.question + "</div>" +
                "    <select class=unselected name=" + field +
                " onchange=ui.academy.fn.edit(event) data-question data-required required>" +
                "        <option>" + obj.question + "</option>" +
                Object.keys(obj.answer).map(option).join("\n") +
                "    </select>" +
                "</li>";
        };
        self.fn.edit = function (e) {
            var el = e.target,
                handler = el.closest("[data-handler]"),
                error = handler.querySelector("[data-error]:not([hidden])"),
                currentValue,
                label;

            switch (el.tagName) {
                case "SELECT":
                    currentValue = el.options[el.selectedIndex].getAttribute("value");
                    label = el.parentNode.querySelector(".label");

                    if (currentValue) {
                        label.hidden = false;
                        self.value[el.name] = currentValue;
                        el.classList.remove("unselected");

                        if (error) {
                            error.hidden = true;
                        }
                    } else {
                        label.hidden = true;
                        delete self.value[el.name];
                        el.classList.add("unselected");
                    }

                    break;
                case "TEXTAREA":
                    currentValue = el.value.trim();

                    if (currentValue.length > 5) {
                        self.value[el.name] = currentValue;

                        if (error) {
                            error.hidden = true;
                        }
                    } else {
                        delete self.value[el.name];
                    }

                    break;
            }

            el.parentNode.classList.remove("error");

            // Sort object by key
            self.value = Object.keys(self.value).sort().reduce(function (result, key) {
                result[key] = self.value[key];

                return result;
            }, {});
        };
        self.fn.submit = function (e) {
            var el = e.target,
                keyMandatory = Object.keys(question.option),
                keyValue = Object.keys(self.value),
                error = el.parentNode.querySelector("[data-error][hidden]");

            keyMandatory.push("address");

            if (error && keyMandatory.filter(function (key) {
                return !keyValue.includes(key);
            }).length) {
                error.hidden = false;
            }
        };
        fn.form = function () {
            return "<div class=\"form sum\">" +
                "<h1>" + schema.title + "</h1>" +
                "<form name=colorSwatch onsubmit=ui.academy.formSubmit(event) autocomplete=off method=post novalidate>" +
                "<ul class=\"sheet swipe-pages full\">" +
                "    <li class=page data-handler>" +
                "        <ul class=\"table content\">" +
                Object.keys(question.option).map(fn.question).join("\n") +
                "            <li class=\"row qa\">" +
                "                <textarea name=address oninput=ui.academy.fn.edit(event) placeholder=\"" +
                question.address + "\" autocomplete=\"shipping street-address\" rows=3 dir=rtl data-required></textarea>" +
                "            </li>" +
                "            <li class=\"row qa\">" +
                "                        <p class=error data-error hidden>" + inner.generateIcon("error") + question.error + "</p>" +
                "                <button onclick=ui.academy.fn.submit(event)>" + question.button + "</button>" +
                "            </li>" +
                "            <li class=\"row qa\">" +
                "                <p>לא בטוחה לאלו צבעים את שייכת? שלחי לי תמונת פנים ברורה שצולמה באור היום לוואטסאפ" +
                " <a href=\"https://wa.me/972585800020\" target=_blank dir=auto>0585800020</a> או למייל" +
                " <a href=\"mailto:lea@laukstein.com\" target=_blank dir=auto>lea@laukstein.com</a></p>" +
                "            </li>" +
                "        </ul>" +
                "    </li>" +
                "</ul>" +
                "</form>" +
                "</div>";
        };
        fn.final = function () {
            return "<div class=form>" +
                "<h3>" + schema.title + "</h3>" +
                "<h1>" + sessionValue.title + "</h1>" +
                "<p>" +
                (sessionValue.description || "").replace(/\n/g, "<br>") +
                inner.pageUI.generateDate(sessionValue, " ההזמנה בוצעה ב {0}.") + "</p>" +
                inner.generateDownloadLink(sessionValue, "להורדת סרגל הצבעים") +
                "</div>";
        };

        return sessionValue ? fn.final() : fn.form();
    };
    inner.pageUI.bodyType = function (schema) {
        var sessionValue = inner.sessionData.task.bodyType,
            result = "",
            size = {
                height: {
                    min: 145,
                    max: 280
                },
                default: {
                    min: 50,
                    max: 320
                }
            };

        if (sessionValue) {
            // Google docs links http://blog.appsevents.com/2014/04/how-to-bypass-google-drive-viewer-and.html
            result = "<div class=\"dialog final\">" +
                "   <div class=table>" +
                "   <div class=cel>" +
                "       <h1>" + schema.result.format(sessionValue.title) + "</h1>" +
                "       <ol>" +
                "           <li>" + sessionValue.text.join("</li>\n<li>") + "</li>" +
                "       </ol>" +
                "       <div>" + inner.generateDownloadLink(sessionValue, schema.download) + "</div>" +
                inner.pageUI.generateDate(sessionValue, "<time>בקשה נקלטה ב {0}.</time>") +
                "   </div>" +
                "   </div>" +
                "</div>";
        } else {
            Object.keys(schema.option).forEach(function (option, index) {
                result += "<li class=row>" +
                    "    <label class=\"column label\" for=" + option + ">" + schema.option[option] + "</label>" +
                    "    <div class=column><input id=" + option + " name=" + option +
                    " type=number inputmode=numeric min=" + (size[option] || size.default).min +
                    " max=" + (size[option] || size.default).max + " maxlength=3 dir=ltr data-required" + (index ? "" : " autofocus") + "></div>" +
                    "</li>";
            });

            result = "<form onsubmit=ui.academy.formSubmit(event) method=post novalidate>" +
                "    <ul class=sheet>" + result + "</ul>" +
                "    <div data-status><small><i>" + schema.notice + "</i></small></div>" +
                "    <button>" + schema.button + "</button>" +
                "</form>";
        }

        return "<div class=\"form calculator\">" +
            "    <h1>" + schema.title + "</h1>" + result +
            "</div>";
    };
    inner.pageUI.clothesSum = function (schema) {
        var self = inner.pageUI.clothesSum,
            sessionValue = inner.sessionData.task.clothesSum,
            fn = {};

        self.value = JSON.parse(JSON.stringify(sessionValue || {}));

        if (!self.value.activity) {
            self.value.activity = {};
        }
        if (!self.value.question) {
            self.value.question = {};
        }

        self.fn = {};
        fn.activityField = function (currentValue, index) {
            var id = ui.generateID(),
                option = schema.activity.option,
                values = self.value.activity,
                field = "",
                placeholder,
                seleced,
                val;

            if (currentValue && option[currentValue]) {
                Object.keys(option).forEach(function (key) {
                    seleced = key === currentValue || values[key] && Object.keys(values).indexOf(key) === index ? " selected" : "";
                    val = key ? " value=" + key : "";
                    field += "\n<option" + val + seleced + ">" + option[key] + "</option>";
                });

                field = "<select onchange=ui.academy.fn.edit(event)>" + field + "</select>";
            } else {
                placeholder = option[currentValue || ""];
                field += "<input list=\"" + id + "\" oninput=ui.academy.fn.edit(event)" +
                    (placeholder ? " placeholder=\"" + placeholder + "\"" : " value=\"" + inner.htmlSafe(currentValue) + "\"") + " dir=rtl>" +
                    "<datalist id=\"" + id + "\">" +
                    "    <option>" + Object.values(option).join("</option>\n<option>") + "</option>" +
                    "</datalist>";
            }

            return field;
        };
        fn.number = function (val) {
            return val && String(Number(val)) === val ? Number(val) : val;
        };
        self.fn.sum = function () {
            var handler = ui.d.getElementById("clothesSum"),
                fields = ui.form.list("input[type=number]", handler);

            fn.getName = function (el) {
                if (!el) {
                    return;
                }

                switch (el.tagName) {
                    case "SELECT":
                        return el.options[el.selectedIndex].getAttribute("value");
                    case "INPUT":
                        return el.value.trim();
                }
            };

            self.value.activity = {};

            fields.forEach(function (el) {
                var li = el.closest("li"),
                    nameField = li.querySelector("select, input"),
                    name = fn.getName(nameField),
                    currentValue = fn.number(el.value.trim());

                if (name && currentValue && currentValue === Number(currentValue)) {
                    if (self.value.activity[name]) {
                        // Sum multiple fields with same name
                        currentValue += self.value.activity[name];
                    }

                    self.value.activity[name] = currentValue;
                }
            });
        };
        fn.html = {
            error: function (type) {
                return "<p class=error data-error hidden>" + inner.generateIcon("error") + schema[type].error + "</p>";
            },
            question: function (type) {
                var values = self.value[type],
                    keys = Object.keys(schema[type].option);

                fn[type] = function (key) {
                    var optSchema = schema[type].option[key],
                        currentValue = values[key],
                        answer = optSchema.answer,
                        option = function (val) {
                            return "<option value=" + val +
                                (currentValue === fn.number(val) ? " selected" : "") +
                                ">" + answer[val] + "</option>";
                        };

                    return "<li class=\"row qa\">" +
                        "    <div class=label" + (currentValue ? "" : " hidden") + ">" + optSchema[type] + "</div>" +
                        "    <select" + (currentValue ? "" : " class=unselected") + " name=" + key +
                        " onchange=ui.academy.fn.edit(event) data-question data-required required>" +
                        "        <option>" + optSchema[type] + "</option>" +
                        Object.keys(answer).map(option).join("\n") +
                        "     </select>" +
                        "</li>";
                };

                return "<ul class=\"table content\">" +
                    keys.map(fn[type]).join("\n") +
                    "    <li class=\"row qa\">" +
                    fn.html.error(type) +
                    "        <button class=next onclick=\"ui.academy.fn.submit(event, '" + type + "')\">" + schema[type].button.success + "</button>" +
                    "    </li>" +
                    "</ul>";
            },
            activity: function (type) {
                var values = self.value[type],
                    fields = Object.keys(values).concat(Object.keys(schema[type].option));

                fields = fields.filter(function (item, pos) {
                    return fields.indexOf(item) === pos;
                });

                fn[type] = function (currentValue) {
                    return "<li class=row>" +
                        "    <div class=column>" +
                        fn.activityField(currentValue) +
                        "    </div>" +
                        "    <div class=column>" +
                        "        <a class=\"button remove\" onclick=ui.academy.fn.removeActivity(event)>" + schema[type].button.remove + "</a>" +
                        "        <div class=field-wrap><input type=number" +
                        (values[currentValue] ? " value=" + values[currentValue] : "") +
                        " placeholder=0 inputmode=numeric oninput=ui.academy.fn.sum()></div>" +
                        "    </div>" +
                        "</li>";
                };
                fn.label = function (label) {
                    return "<div class=\"column label\">" + label + "</div>";
                };
                self.fn.addActivity = function (table) {
                    (table || ui.d.getElementById("clothesSum")).insertAdjacentHTML("beforeend", fn[type]());
                };
                self.fn.removeActivity = function (e) {
                    var li = e.target.parentNode.parentNode,
                        table = li.parentNode;

                    li.remove();
                    self.fn.sum();

                    if (table.childElementCount < 2) {
                        self.fn.addActivity(table);
                    }
                };

                return "<div class=content>" +
                    "    <ul class=\"table sheet-fixed\" id=clothesSum>" +
                    "        <li class=row>" +
                    schema[type].label.map(fn.label).join("\n") +
                    "        </li>" +
                    fields.map(fn[type]).join("\n") +
                    "    </ul>" +
                    "    <p><a onclick=ui.academy.fn.addActivity()>" + schema[type].button.create + "</a></p>" +
                    fn.html.error(type) +
                    "    <button class=next onclick=\"ui.academy.fn.submit(event, '" + type + "')\">" + schema[type].button.success + "</button>" +
                    "    <span class=\"back unselectable\" onclick=ui.academy.fn.slide()>" + schema[type].button.back + "</span>" +
                    "</div>";
            },
            sum: function (type, data) {
                var html = "";

                if (data) {
                    fn.label = function (label, index) {
                        return "<div class=\"column nowrap" + (index ? "" : " name") + "\">" + label + "</div>";
                    };
                    fn.locale = function (key) {
                        return schema.activity.option[key] ||
                            schema[type].option[key] && schema[type].option[key].title ||
                            inner.htmlSafe(key);
                    };
                    fn.sets = function (obj) {
                        var hasDress = fn.hasDress(),
                            arr = [],
                            key;

                        if (obj.set1) {
                            key = hasDress ? "jacket" : "skirt";
                            arr.push("<span class=nowrap>" + obj.set1 + " " + schema[type].sets[key] + "</span>");
                        }
                        if (obj.set2) {
                            key = hasDress ? "dress" : "shirt";
                            arr.push("<span class=nowrap>" + obj.set2 + " " + schema[type].sets[key] + "</span>");
                        }

                        return arr.join("<br>");
                    };
                    fn.line = function (obj) {
                        var label = fn.locale(obj.name);

                        return "<li class=row>" +
                            "    <div class=\"column nowrap name\" title=\"" + label + "\">" + label + "</div>" +
                            "    <div class=\"column nowrap\">" + obj.sets + "</div>" +
                            "    <div class=\"column nowrap\">" + fn.sets(obj) + "</div>" +
                            "</li>";
                    };
                    fn.group = function (arr) {
                        return arr.map(fn.line).join("\n");
                    };

                    html += "<div class=content>" +
                        "    <ul class=\"table sheet sheet-fixed sheet-zebra result\">" +
                        "        <li class=\"row labels\">" + schema[type].label.map(fn.label).join("\n") + "</li>" +
                        data.map(fn.group).join("\n") +
                        "    </ul>" +
                        inner.pageUI.generateDate(sessionValue, "<time>בקשה נקלטה ב {0}.</time>") +
                        "    <a class=footer-link onclick=ui.academy.fn.slide()>" + schema[type].button.retry + "</a>" +
                        "</div>";
                }

                return html;
            },
            page: function (type, data) {
                return "<li class=page id=" + type + " data-handler>" + fn.html[type](type, data) + "</li>";
            },
            loading: function () {
                return "<div class=\"content sheet center\">" + inner.loadingHTML + "</div>";
            },
            all: function () {
                return fn.html.page("question") +
                    fn.html.page("activity") +
                    fn.html.page("sum", fn.result());
            }
        };
        fn.isValid = {
            question: function (type) {
                // return ui.form.valid(ui.form.list("[data-required]", ui.d.getElementById(type)));
                return Object.keys(schema[type].option).length === Object.keys(self.value[type]).length;
            },
            activity: function (type) {
                return !!Object.keys(self.value[type]).length;
            },
            all: function () {
                return fn.isValid.question("question") && fn.isValid.activity("activity");
            }
        };
        fn.result = function () {
            if (!fn.isValid.all()) {
                return;
            }

            var hasDress = fn.hasDress();

            fn.sumCloth = function (x) {
                /* 1 = 1,1    2 = 1,2    3 = 1,3     4 = 2,2     5 = 2,3    6 = 2,3
                   7 = 2,4    8 = 2,4    9 = 3,3    10 = 2,5    11 = 3,4   12 = 3,4 */
                x = x || 1;

                var big = Math.max(1, Math.floor(x / 2)),
                    small = 1,
                    normalize = function () {
                        if (small > big) {
                            var temp = small;

                            small = big;
                            big = temp;
                        }
                    };

                if (big === 1) {
                    big = x;
                } else {
                    while (big) {
                        small = Math.max(1, Math.floor(x / big));

                        if (big - 1 < small) {
                            if (small * big + 1 === x) {
                                normalize();

                                big += 1;

                                if (small * big > x + 1) {
                                    small = Math.max(1, Math.floor(x / big));
                                }
                            }
                            if (big < x * small) {
                                big = Math.max(1, Math.floor((x + 1) / small));
                            }

                            break;
                        }

                        big -= 1;
                    }
                }

                normalize();

                return {
                    set1: small,
                    set2: big
                };

                // if (hasDress) {
                //     return {
                //         dress: big,
                //         jacket: small
                //     };
                // }
                //
                // return {
                //     skirt: small,
                //     shirt: big
                // };
            };
            fn.result = function () {
                var option = schema.sum.option,
                    val = {
                        activity: [],
                        adds: []
                    },
                    summary;

                Object.keys(self.value.activity).forEach(function (key) {
                    var multiply = key === "shabbat" ? self.value.question.shabbat : 1,
                        add = hasDress ? 2 : 0,
                        sets = (self.value.activity[key] * multiply) + add;

                    val.activity.push(Object.assign({
                        name: key,
                        sets: sets
                    }, fn.sumCloth(sets)));
                });

                summary = val.activity.reduce(function (res, obj) {
                    return res + obj.sets;
                }, 0);

                Object.keys(option).forEach(function (key) {
                    if (key !== "cover" || self.value.question.cover === "yes") {
                        val.adds.push({
                            name: key,
                            sets: Math.max(1, Math.round((summary * option[key].perc) / 100))
                        });
                    }
                });

                return Object.values(val);
            };

            return fn.result();
        };
        self.fn.slide = function (page) {
            ui.d.getElementById("slide").style[inner.getStyleProperty("transform")] = "translateX(" + (100 * (page || 0)) + "%)";
        };
        self.fn.slideStyle = function (inline) {
            var index = 0,
                style = "";

            if (fn.isValid.question("question")) {
                index += 1;

                if (fn.isValid.activity("activity")) {
                    index += 1;
                }
            }

            style = "translateX(" + (100 * (index || 0)) + "%)";

            if (inline) {
                return inner.getStyleProperty("transform") + ":" + style + ";";
            }

            return style;
        };
        fn.hasDress = function () {
            return self.value.question.dress === "shabbat" || self.value.question.dress === "yes";
        };
        self.fn.edit = function (e) {
            var option = schema.activity.option,
                el = e.target,
                handler = el.closest("[data-handler]"),
                error = handler.querySelector("[data-error]:not([hidden])"),
                currentValue,
                label;

            switch (el.tagName) {
                case "SELECT":
                    currentValue = fn.number(el.options[el.selectedIndex].getAttribute("value"));

                    if (el.hasAttribute("data-question")) {
                        label = el.parentNode.querySelector(".label");

                        if (currentValue) {
                            label.hidden = false;
                            self.value.question[el.name] = currentValue;
                            el.classList.remove("unselected");

                            if (error) {
                                error.hidden = true;
                            }
                        } else {
                            label.hidden = true;
                            delete self.value.question[el.name];
                            el.classList.add("unselected");
                        }

                        el.parentNode.classList.remove("error");
                    } else {
                        if (!currentValue) {
                            el.parentNode.innerHTML = fn.activityField(currentValue);
                        }

                        self.fn.sum();

                        if (error && Object.keys(self.value.activity).length) {
                            error.hidden = true;
                        }
                    }

                    break;
                case "INPUT":
                    currentValue = fn.number(el.value.trim());

                    Object.keys(option).forEach(function (key) {
                        if (option[key] === currentValue) {
                            currentValue = key;

                            if (currentValue) {
                                el.parentNode.innerHTML = fn.activityField(currentValue);
                            }
                        }

                        self.fn.sum();
                    });

                    break;
            }
        };
        self.fn.submit = function (e, type) {
            var el = {};

            el.handler = ui.d.getElementById(type);
            el.error = el.handler.querySelector("[data-error]");

            fn.toggleError = function (hasError) {
                el.error.hidden = !hasError;
            };

            if (type === "question") {
                e.preventDefault();

                if (fn.isValid[type](type)) {
                    fn.toggleError(false);
                    self.fn.slide(1);

                    return true;
                }

                fn.toggleError(true);
            }
            if (type === "activity") {
                if (fn.isValid[type](type)) {
                    if (JSON.stringify(self.value) === JSON.stringify(inner.sessionData.task.clothesSum || {})) {
                        // Value hasn't been changed
                        e.preventDefault();
                    } else {
                        el.handler = ui.d.getElementById("sum");
                        el.handler.innerHTML = fn.html.loading();

                        // fn.timer = setTimeout(function () {
                        //     el.handler.innerHTML = fn.html.sum("sum", fn.result());
                        // }, 2000);
                    }

                    fn.toggleError(false);
                    self.fn.slide(2);

                    return true;
                }

                e.preventDefault();
                fn.toggleError(true);
            }

            return false;
        };

        if (fn.timer) {
            clearTimeout(fn.timer);
            delete fn.timer;
        }

        return "<div class=\"form sum\">" +
            "    <h1>" + schema.title + "</h1>" +
            "    <form name=clothesSum onsubmit=ui.academy.formSubmit(event) autocomplete=off method=post novalidate>" +
            "        <ul class=\"sheet swipe-pages full\" id=slide style=\"" + self.fn.slideStyle(true) + "\">" + fn.html.all() + "</ul>" +
            "    </form>" +
            "</div>";
    };
    inner.pageUI.dressStyle = function (schema) {
        var self = inner.pageUI.dressStyle,
            sessionValue = inner.sessionData.task.dressStyle,
            result = "",
            index = 0,
            sum = [],
            fn = {};

        if (sessionValue) {
            result = "<div class=\"dialog final\">" +
                "   <div class=table>" +
                "   <div class=cel>" +
                "       <h1>" + sessionValue.title + "</h1>" +
                "       <div>" + inner.generateDownloadLink(sessionValue, schema.downloadButton) + "</div>" +
                inner.pageUI.generateDate(sessionValue, "<time>בקשה נקלטה ב {0}.</time>") +
                "   </div>" +
                "   </div>" +
                "</div>";
        } else {
            self.fn = {};
            self.fn.navigate = function (el) {
                if (el) {
                    var wrapper = ui.d.getElementById("slide"),
                        goNext = el.hasAttribute("data-next"),
                        optSchema = ui.academy.schema.option;

                    if (goNext) {
                        if (index < optSchema.length - 1) {
                            index += 1;
                        }
                    } else {
                        if (sum[index] && !Array.isArray(sum[index])) {
                            sum.splice(index, 1);
                        }

                        index -= 1;
                    }

                    optSchema = optSchema[Math.abs(index)];

                    if (optSchema && typeof optSchema.condition !== "function" || optSchema.condition(fn.calc(sum))) {
                        if (wrapper) {
                            wrapper.style[inner.getStyleProperty("transform")] = "translateX(" + (100 * index) + "%)";
                        }
                    } else {
                        index -= 1;
                        self.fn.done(el);
                    }
                }
            };
            self.fn.check = function (el) {
                var handler = el.closest("[data-handler]"),
                    button = handler.querySelector("[data-next]"),
                    maxCount = inner.getDataAttribute(handler, "max"),
                    data = ui.form.deserialize(handler),
                    keys = Object.keys(data),
                    count = keys.length,
                    toggleAttribute,
                    i;

                maxCount = maxCount ? Number(maxCount) - 1 : 1;
                toggleAttribute = function (arr) {
                    for (i = 0; i < arr.length; i += 1) {
                        if (count > maxCount) {
                            arr[i].setAttribute("disabled", "");
                        } else {
                            arr[i].removeAttribute("disabled");
                        }
                    }
                };

                if (keys.length) {
                    sum[index] = maxCount === 0 ? {final: keys[0]} : keys;
                } else if (sum[index] && !Array.isArray(sum[index])) {
                    sum.splice(index, 1);
                }
                if (count) {
                    button.removeAttribute("disabled");
                } else {
                    button.setAttribute("disabled", "");
                }

                toggleAttribute(ui.form.list("input:not(:checked)", handler));
                toggleAttribute(ui.form.list("input:not(:checked) ~ label", handler));
            };
            self.fn.done = function (el) {
                outer.formSubmit(el.closest("[data-handler]"), sum);
            };
            fn.calc = function (arr) {
                // http://www.jstips.co/en/javascript/flattening-multidimensional-arrays-in-javascript/
                var flattenArray = [].concat.apply([], arr),
                    // http://stackoverflow.com/questions/840781/#24968449
                    sumObject = flattenArray.map(function (item) {
                        if (typeof item === "object" && item.final) {
                            return {
                                // Largest count, is the final result
                                count: arr.length + 1,
                                name: item.final
                            };
                        }

                        return {
                            count: 1,
                            name: item
                        };
                    }).reduce(function (a, b) {
                        a[b.name] = (a[b.name] || 0) + b.count;

                        return a;
                    }, {}),
                    keys = Object.keys(sumObject),
                    largest = Math.max.apply(null, keys.map(function (x) {
                        return sumObject[x];
                    })),
                    res = keys.reduce(function (val, key) {
                        if (sumObject[key] === largest) {
                            val.push(key);
                        }

                        return val;
                    }, []);

                if (res.length > 2) {
                    return ["A"];
                } else if (res.length === 2) {
                    // Compare Arrays https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript#42186143
                    switch (JSON.stringify(res).replace(/[[,\]]/g, "")) {
                        case "AB":
                        case "AC":
                        case "AD":
                        case "AE":
                            return ["A"];
                        case "BC":
                        case "BD":
                        case "BE":
                            return ["B"];
                        case "CE":
                            return ["F"];
                        case "DE":
                            return ["G"];
                    }
                }

                return res;
            };
            fn.option = function (key, name, showImage) {
                var id = ui.generateID();

                name = typeof name === "object" ? name.title : name;

                return "<li" + (showImage ? " class=box" : "") + ">" +
                    "    <input name=" + key + " id=" + id + " onclick=ui.academy.fn.check(this) type=checkbox>" +
                    (showImage ? "<figure><img class=absolute src=/assets/academy-style-" + key.toLowerCase() + ".jpg alt=\"" + name + "\"></figure>" : "") +
                    "    <label class=\"column label wrap\" for=" + id + ">" + inner.generateIcon("check") + name + "</label>" +
                    "</li>";
            };
            fn.group = function (data, n, len) {
                var arr = Object.keys(data.option || {}),
                    res = "",
                    id = "",
                    i;

                for (i = 0; i < arr.length; i += 1) {
                    res += fn.option(arr[i], data.option[arr[i]], data.showImage);
                }

                if (!Object.prototype.hasOwnProperty.call(data, "option")) {
                    data.callback = fn.group;
                    data.params = arguments;
                    data.id = ui.generateID();
                    id = " id=" + data.id + " data-max=1";
                }

                return "<li class=\"qa page\"" + id + " data-handler>" +
                    "    <h4 class=wrap>" + n + ". " + data.title + "</h4>" +
                    "    <small class=wrap><i>" + (data.limit || schema.limit) + "</i></small>" +
                    "    <ol" + (data.showImage ? " class=grid" : "") + ">" + res + "</ol>" +
                    (n === len ?
                        "    <button class=next onclick=ui.academy.fn.done(this) data-next disabled>" + schema.button + "</button>" :
                        "    <button class=next onclick=ui.academy.fn.navigate(this) data-next disabled>" + schema.next + "</button>") +
                    (n > 1 ? "    <span class=\"back unselectable\" onclick=ui.academy.fn.navigate(this) data-back>" + schema.back + "</span>" : "") +
                    "</li>";
            };
            fn.form = function (data) {
                var arr = data.option,
                    res = "",
                    i;

                for (i = 0; i < arr.length; i += 1) {
                    res += fn.group(arr[i], i + 1, arr.length);
                }

                return res;
            };

            result = "<form onsubmit=event.preventDefault() method=post novalidate>" +
                "    <ul class=\"sheet swipe-pages\" id=slide>" + fn.form(schema) + "</ul>" +
                "</form>";
        }

        return "<div class=\"form sat\">" +
            "    <h1>" + schema.title + "</h1>" + result +
            "</div>";
    };
    inner.workerRegister = function () {
        if (location.protocol === "https:" && "serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(function () {
                navigator.serviceWorker.addEventListener("message", function (e) {
                    if (e.data) {
                        inner.workerUpdate(e.data, true);
                    }
                });
            });
        }
    };
    inner.workerUpdate = function (data, fromOtherTab) {
        if (typeof data === "object" && navigator.serviceWorker && navigator.serviceWorker.controller) {
            if (ui.environment === "dev") {
                console.log("ServiceWorker", data);
            }
            if (fromOtherTab) {
                switch (data.status) {
                    case "login":
                        return location.reload();
                    case "logout":
                        return outer.sessionLogout(true);
                    case "update":
                        return inner.sessionUpdate(data.data, true);
                }
            } else {
                navigator.serviceWorker.controller.postMessage(data);
            }
        }
    };
    inner.generateIcon = function (name) {
        return "<svg class=icon-" + name + "><use xlink:href=#" + name + " /></svg>";
    };
    inner.generateDownloadLink = function (obj, text) {
        /* Download PDF
        PDF file as is https://drive.google.com/uc?export=download&id={ id }
        From Slides https://docs.google.com/presentation/d/{ id }/export/pdf */
        if (!obj || !text || !obj.link) {
            return "";
        }
        if (Array.isArray(obj.link)) {
            // Multiple links
            return obj.link.map(function (link) {
                return inner.generateDownloadLink({link: link}, text);
            }).join("");
        }

        return "<a class=button href=\"" + obj.link + "\" rel=noopener target=_blank tabindex=0>" +
            inner.generateIcon("download") + text + "</a>";
    };
    inner.generateDownloadIcon = function (link) {
        if (Array.isArray(link)) {
            return link.map(inner.generateDownloadIcon).filter(Boolean).join("");
        }
        if (!link || typeof link !== "string") {
            return "";
        }

        return "<a class=link-download href=\"" + link + "\" rel=noopener target=_blank tabindex=-1>" +
            inner.generateIcon("download") + "</a>";
    };
    inner.getDataAttribute = function (el, prop) {
        if (el && el.nodeType === 1) {
            return el.dataset ? el.dataset[prop] : el.getAttribute("data-" + prop);
        }
    };
    inner.getStyleProperty = function (prop) {
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
    inner.addLeadingZeros = function (num) {
        // https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
        return ("0" + String(num)).slice(-2);
    };
    inner.htmlSafe = function (str) {
        if (!str) {
            return "";
        }

        // HTML safe attributes value <input value=""> (DEV-3056)
        return str.replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            // preserveCR https://stackoverflow.com/questions/7753448/how-do-i-escape-quotes-in-html-attribute-values
            .replace(/\r\n/g, "&#13;")
            .replace(/[\r\n]/g, "&#13;");
    };
    inner.getCurrentSchema = function () {
        var userDefaultPackage = inner.getUserDefaultPackage(inner.sessionData),
            currentPackage = inner.pageSchema.package[userDefaultPackage],
            session;

        if (inner.hashData.session) {
            session = currentPackage.session;

            return session && session[inner.hashData.session] || currentPackage;
        }
        if (location.href.indexOf("#") === -1 || !location.hash && !history.replaceState) {
            return currentPackage;
        }

        return null;
    };
    inner.toggleNav = function (initLoad) {
        var obj,
            arr;

        inner.hashData = ui.hash();

        if (inner.el.sidenav) {
            obj = inner.getCurrentSchema();

            if (obj) {
                inner.toggleNav.applyClass(inner.el.sidenav.querySelector(location.hash ?
                    "[data-session=\"" + inner.hashData.session + "\"]:not([data-page])" : "a"));

                if (obj.page && obj.page[inner.hashData.page]) {
                    inner.toggleNav.applyClass(inner.el.sidenav.querySelector("[data-session=\"" +
                        inner.hashData.session + "\"][data-page=\"" + inner.hashData.page + "\"]"));
                }
            }
            if (initLoad === true && !location.hash) {
                arr = inner.el.sidenav.querySelectorAll("[data-session]:not([data-page])");

                inner.toggleNav.applyClass(arr[arr.length - 1]);
            }
        }

        inner.sessionPage();
    };
    inner.toggleNav.applyClass = function (el) {
        var resetElement = {},
            applyClass,
            diff;

        if (inner.el.sidenav) {
            resetElement.session = inner.el.sidenav.querySelector(".expand");
            resetElement.active = inner.el.sidenav.querySelector(".active");
            resetElement.page = inner.el.sidenav.querySelector(".selected");
        }

        inner.hashData.previous = {
            session: inner.getDataAttribute(resetElement.session, "session"),
            page: inner.getDataAttribute(resetElement.page || resetElement.active, "page")
        };

        applyClass = function (key, className, forceApplyClass) {
            if (forceApplyClass || inner.hashData.previous[key] !== inner.hashData[key]) {
                if (resetElement[key]) {
                    resetElement[key].classList.remove(className);

                    if (resetElement[key].nextElementSibling && resetElement[key].nextElementSibling.tagName === "OL") {
                        ui.form.list("a", resetElement[key].nextElementSibling).forEach(function (a) {
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
                        ui.form.list("a", el.nextElementSibling).forEach(function (a) {
                            a.tabIndex = 0;
                        });
                    }
                }
            }
        };

        applyClass("session", "expand");
        applyClass("page", "selected", !!diff);
        applyClass("active", "active", !!diff);
    };
    outer.navClick = function (el, avoidRedirect) {
        if (!el) {
            return;
        }

        var elementHash = {
            session: inner.getDataAttribute(el, "session"),
            page: inner.getDataAttribute(el, "page")
        };

        if ((inner.hashData.session === elementHash.session) &&
            (inner.hashData.page === elementHash.page)) {
            el.classList.add("expand");
        } else {
            elementHash = ui.serialize(elementHash);

            if (!avoidRedirect && elementHash) {
                location.hash = elementHash;
                ui.d.body.scrollTop = 0;
            } else if (!elementHash && location.hash || !inner.pageSchema.session[inner.hashData.session]) {
                location.hash = "";

                if (history.replaceState) {
                    history.replaceState("", ui.d.title, location.pathname);
                }
            }
        }
    };
    outer.navKeydown = function (e) {
        if (e && e.target && (e.keyCode || e.which) === 13) {
            e.preventDefault();
            e.target.click();
        }
    };
    outer.formSubmit = function (o, post) {
        var e = o instanceof Event && o,
            el = o && o.target || o,
            type,
            data,
            page;

        if (e) {
            e.preventDefault();
        }
        if (ui.form.valid(ui.form.list("[data-required]", el))) {
            page = inner.hashData.page;
            data = {
                email: inner.sessionData.email,
                token: inner.sessionData.token,
                data: {}
            };

            ui.form.accessibility(false, el, true, page === "dressStyle" && "label");

            switch (page) {
                case "bodyType":
                    data.data[page] = Object.assign({
                        date: Math.floor(+new Date / 1000)
                    }, ui.form.deserialize(el));
                    break;
                case "clothesSum":
                    data.data[page] = Object.assign({
                        date: Math.floor(+new Date / 1000)
                    }, inner.pageUI[page].value);
                    break;
                case "colorSwatch":
                    data.data[page] = Object.assign({
                        date: Math.floor(+new Date / 1000)
                    }, inner.pageUI[page].value);
                    break;
                case "dressStyle":
                    data.data[page] = {
                        date: Math.floor(+new Date / 1000),
                        value: post
                    };

                    el.closest("[data-handler]")
                        .querySelector("[data-back]")
                        .remove();

                    break;
            }

            if (data.data[page]) {
                type = "update";

                fetch(inner.endpoint + "/" + type, {
                    method: "POST",
                    redirect: "error",
                    body: JSON.stringify(data)
                }).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    return json.error ? Promise.reject(json) : json;
                }).then(function (json) {
                    inner.sessionUpdate(json);
                    outer.sessionRefresh();
                }).catch(function () {
                    inner.sessionErrorReport(type, data);
                });
            } else {
                console.error(page, data.data[page]);
            }
        }
    };
    inner.pageSchemaSetup = function (userDefaultPackage) {
        var userPackages = Object.keys(inner.sessionData.package),
            hasFullPackage = userDefaultPackage === inner.pageSchema.fullPackage;

        // Page schema mapping
        inner.pageSchema.package.full.session.closet.page.bodyType = inner.pageSchema.package.full.session.bodyShape.page.bodyType;
        inner.pageSchema.package.full.session.shopping.page.bodyType = inner.pageSchema.package.full.session.bodyShape.page.bodyType;
        inner.pageSchema.package.full.session.shopping.page.colorSwatch = inner.pageSchema.package.full.session.colours.page.colorSwatch;
        inner.pageSchema.package.full.session.shopping.page.dressStyle = inner.pageSchema.package.full.session.style.page.dressStyle;
        inner.pageSchema.package.closet = inner.pageSchema.package.full.session.closet;
        inner.pageSchema.package.shopping = inner.pageSchema.package.full.session.shopping;

        Object.keys(inner.pageSchema.package).forEach(function (key) {
            if (!userPackages.includes(key) ||
                // For full package keep only package "full"
                hasFullPackage && inner.pageSchema.fullPackage !== key) {
                delete inner.pageSchema.package[key];
            }
        });

        // inner.pageSchema.intro = ...
        // inner.pageSchema.session = ...
        // inner.pageSchema.bonus = ...

        outer.package = inner.getUserCurrentPackage(inner.sessionData);
    };
    inner.init = function () {
        ui.legacy(function () {
            inner.el.form = ui.d.getElementById("form");
            inner.el.form.addEventListener("submit", inner.sessionLogin);
            inner.el.bar = ui.d.getElementById("bar");
            inner.el.button = ui.d.getElementById("button");
            inner.el.content = ui.d.getElementById("content");
            inner.el.details = ui.d.getElementById("details");
            inner.el.email = ui.d.getElementById("email");
            inner.el.link = ui.d.getElementById("link");
            inner.el.link.addEventListener("click", inner.sessionForgot);
            inner.el.pass = ui.d.getElementById("pass");
            inner.valid = !!inner.sessionData.email && !!inner.sessionData.token;

            inner.workerRegister();

            var removeLoader = function () {
                var loading = ui.d.getElementById("loading");

                if (loading) {
                    inner.loadingHTML = loading.innerHTML;
                    loading.remove();
                }

                inner.el.content.removeAttribute("hidden");
                inner.el.details.removeAttribute("hidden");
            };

            if (inner.valid) {
                inner.sessionVerify(function (userDefaultPackage) {
                    removeLoader();
                    inner.pageSchemaSetup(userDefaultPackage);
                    inner.sessionLogedin();
                    ui.identify.all();
                });
            } else if (inner.sessionData.email) {
                removeLoader();

                inner.el.email.value = inner.sessionData.email;

                // setTimeout to avoid autofocus property
                setTimeout(function () {
                    inner.el.pass.focus();
                }, 0);
            } else {
                removeLoader();
            }

            ui.w.addEventListener("hashchange", inner.toggleNav);
            inner.sessionError();
        });

        return outer;
    };

    ui.academy = inner.init();
}());
