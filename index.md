---
layout: default
redirect_from: /recommendations
description: סטיילינג לדתיות - זה לא רק הבגד - זה החיבור שלך לעצמך
video: fkS2Go4_H7E
pageName: landing
subscribe: 70a2d0d976
subscribe-success: המדריך כבר בדרך אליך
subscribe-autofocus: true
headlines: true
css: |
    .headlines {
        display: table-row;
        margin-top: 1.2em;
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
