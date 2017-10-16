---
layout: default
redirect_from: /recommendations
description: סטיילינג לדתיות - זה לא רק הבגד - זה החיבור שלך לעצמך
video: fkS2Go4_H7E
pageName: landing
subscribe: 70a2d0d976
headlines: true
news: |
    <div class="box news">
        <h2>מה חדש?</h2>
        <ul>
            <li><b>15-19/10</b> פעילות פייסבוק <a href=https://www.facebook.com/groups/304148679918860/ rel=nofollow target=_blank>"מסדרות ארון ביחד"</a></li>
            <li><span class=tag>חינם</span> סדנת תאמת צבעים במטפחות, לפרטים <a href=tel:0585800020 target=_blank>058-5800020</a></li>
            <li><b>23/10</b> רחובות, חנות הלן קובעי לימון</li>
            <li>סדנת סטיילינג על בגדי חורף, לפרטים <a href=tel:0585800020 target=_blank>058-5800020</a>
                <ul>
                    <li><b>21/10</b> (מוצאי שבת) ירושלים</li>
                    <li><b>25/10</b> לוד</li>
                    <li><b>31/10</b> בית שמש</li>
                </ul>
            </li>
            <li>סדרת וידאו חדשה "שאלי את לאה" - מוזמנות לשלוח שאלות שלכן ל-<a href=mailto:lea@laukstein.com target=_blank>lea@laukstein.com</a></li>
        </ul>
    </div>
css: |
    .news h2 {
        margin: 0 0 .3em;
    }
    .news ul {
        margin: .2em 0;
        list-style: none;
    }
    .news > ul {
        padding: 0;
        margin: 0 -2.1em -1.1em;
        list-style: none;
    }
    .news > ul > li {
        padding: .2em 2.2em;
        border-top: 1px solid #eee;
    }
    .news > ul > li:first-child {
        border-top: 0;
    }
    .news .tag {
        display: inline;
    }
    .headlines {
        display: table-row;
    }
    .headlines a.absolute {
        z-index: 1;
    }
    .headlines .box {
        padding-bottom: 3.2em;
    }
    .headlines .box:before,
    .headlines .box:after {
        display: none;
    }
    .headlines blockquote + blockquote {
        margin-top: 0;
    }
    .headlines blockquote time {
        margin-top: .4em;
    }
    .headlines blockquote:first-child {
        margin-top: 1em;
    }
    .headlines blockquote:last-child {
        margin-bottom: 3em;
    }
    .headlines .box .footer {
        position: absolute;
        right: 2.1em;
        left: 2.1em;
        bottom: 1.5em;
        white-space: nowrap;
    }
    .headlines a:not([href]) {
        white-space: nowrap;
    }
    @supports (display: grid) {
        .headlines .grid .box {
            margin-top: 0;
        }
        .headlines .grid p {
            /* Wrap text max 2 lines */
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        @media (min-width: 54.001em) {
            .landing .table.scale {
                display: grid;
                grid-template-areas: "sidebar content" "sidebar headlines";
            }
            .landing .content {
                grid-area: content;
                grid-column: 1;
            }
            .landing form.subscribe {
                grid-area: sidebar;
                grid-column: 2;
                margin: 2.3em 0;
            }
        }
    }
jsonld: |
    {
        "@context": "http://schema.org/",
        "@type": "Product",
        "name": "סדרת סטיילינג לדתיות",
        "image": "https://img.youtube.com/vi/$video/0.jpg",
        "description": "מדריך בעל שלושה סרטונים על יסודות הסטיילינג",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "ILS"
        }
    }
---
