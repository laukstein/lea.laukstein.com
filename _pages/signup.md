---
layout: default
redirect_from: /signup-business
hiddenHeader: true

title: מדריך לארון מדוייק
description: סטיילינג לדתיות - מדריך לארון מדוייק
video: oJqYt6ybTV0
css: |
    main {
        display: table;
        table-layout: fixed;
            width: 100%;
        min-width: 0;
        min-height: 100vh;
        margin: auto;
        border-top: 0;
    }
    .table.scale {
        display: table-cell;
        padding: 0 .8em;
        vertical-align: middle;
    }
    .cel.cel {
        overflow: hidden;
        display: table-cell;
            width: 100%;
        min-width: 23em;
        max-width: 75vh;
        margin: auto;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 .8em 3em -1.7em rgba(0,0,0,.4);
    }
    .cel.content {
        border-radius: 0 7px 7px 0;
    }
    .cel.subscribe {
        padding-top: 5%;
        padding-bottom: 8%;
        margin-bottom: 2.5em;
        vertical-align: middle;
        border-radius: 7px 0 0 7px;
    }
    .cel.subscribe h1 {
        color: #f58e84;
    }
    .cel.subscribe .button {
        width: 100%;
        max-width: 100%;
        border-width: 2px;
        border-radius: 4px;
        outline: 0;
        transition: color .15s,
                    background-color .15s,
                    border-color .15s,
                    box-shadow .15s;
    }
    .cel.subscribe .button {
        width: 100%;
        line-height: 1.11;
        background-color: #00b0a9;
        border-color: rgba(0,0,0,.2);
        border-top-color: rgba(255,255,255,0);
        border-left-color: rgba(255,255,255,0);
        box-shadow: inset -2px -2px 0 -1px rgba(255,255,255,.14), 1px 1px 2px rgba(0,0,0,.15);
    }
    .cel.subscribe .button:before {
        line-height: .35;
    }
    .cel.subscribe .button:not(:active):hover {
        background-color: #09bab4;
    }
    .cel.subscribe .button:focus,
    .cel.subscribe .button:hover:active {
        background-image: linear-gradient(rgba(100,100,100,.23), rgba(100,100,100,.23));
        border-color: transparent;
        box-shadow: none;
    }
    footer {
        padding: 0;
        text-align: center;
        border-top: 0;
    }
    footer .wrapper a {
        color: #aaa;
    }
    @media (max-width: 72em) {
        .cel.cel {
            display: block;
        }
        .cel.content {
            border-radius: 7px 7px 0 0;
        }
        .cel.subscribe {
            padding-right: 1em;
            padding-left: 1em;
            border-radius: 0 0 7px 7px;
        }
    }
    @media (max-width: 56em) {
        main {
            padding-right: 1em;
            padding-left: 1em;
            transition: padding-right .15s,
                        padding-left .15s;
        }
    }
    @media (max-width: 46em) {
        main {
            padding-right: 0;
            padding-left: 0;
        }
        .table.scale {
            padding-bottom: .2em;
        }
        .cel.cel {
            min-width: 16em;
        }
        .cel.subscribe {
            margin-bottom: auto;
        }
        @media (orientation: landscape) {
            .cel.cel {
                min-width: 21em;
            }
        }
    }
jsonld: |
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "מדריך לארון מדוייק",
        "image": "https://i.ytimg.com/vi/$video/0.jpg",
        "description": "מדריך בעל שלושה סרטונים על יסודות הסטיילינג",
        "sku": "accurate-closet-guide",
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "רונית טורוול"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "20989"
        },
        "brand": {
            "@type": "Thing",
            "name": "מדריך לארון מדוייק"
        },
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "ILS",
            "priceValidUntil": "2034-02-13",
            "availability": "https://schema.org/InStock",
            "url": "https://lea.laukstein.com/signup"
        }
    }
---
