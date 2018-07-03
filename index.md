---
layout: default
redirect_from: /recommendations
description: סטיילינג לדתיות - זה לא רק הבגד - זה החיבור שלך לעצמך
video: lFkh-kMy-6Y
pageName: landing
subscribe:
    id: 70a2d0d976
    autofocus: true
headlines: true
css: |
    main {
        min-width: 16.6em;
        max-width: 88.78em;
        padding-right: 2em;
        padding-left: 2em;
    }
    .table.scale {
        display: block;
        padding: 2em 0;
        margin: auto;
        box-sizing: border-box;
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
    .cel.subscribe input,
    .cel.subscribe button {
        max-width: 100%;
    }
    .cel.subscribe input {
        background-color: #f4ffff;
        border-color: #00b0a9;
        box-shadow: 1px 1px .1em #b8c7c7;
    }
    .cel.subscribe button {
        line-height: 1.11;
        background-color: #00b0a9;
        border-width: 2px;
        border-color: rgba(0,0,0,.2);
        border-top-color: rgba(255,255,255,0);
        border-left-color: rgba(255,255,255,0);
        border-radius: 4px;
        outline: 0;
        box-shadow: inset -2px -2px 0 -1px rgba(255,255,255,.14), 1px 1px 2px rgba(0,0,0,.15);
    }
    .cel.subscribe button:before {
        line-height: .35;
    }
    .cel.subscribe button:not(:active):hover {
        background-color: #09bab4;
    }
    .cel.subscribe button:hover:active {
        background-image: linear-gradient(rgba(100,100,100,.23), rgba(100,100,100,.23));
        border-color: transparent;
        box-shadow: none;
    }
    .cel.subscribe .confirm {
        text-align: center;
        text-indent: calc(-13em / 2);
    }
    .headlines {
        display: block;
        margin-top: 2em;
    }
    @supports (display: grid) {
        .headlines .grid {
            grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
        }
        .headlines .footer {
            width: 10em;
            grid-column: 1;
        }
    }
    @media (max-width: 72em) {
        .cel.cel {
            display: block;
        }
        .cel.content {
            border-radius: 7px 7px 0 0;
        }
        .cel.subscribe {
            border-radius: 0 0 7px 7px;
        }
        .headlines {
            max-width: 43em;
            margin-right: auto;
            margin-left: auto;
        }
        footer {
            padding: 0;
            text-align: center;
        }
    }
    @media (max-width: 54em) {
        main {
            padding-right: 1em;
            padding-left: 1em;
        }
    }
    @media (max-width: 46em) {
        .cel.cel {
            min-width: 16em;
        }
        .cel.subscribe {
            margin-bottom: 1.5em;
        }
        .cel.subscribe .confirm {
            text-indent: inherit;
        }
        @media (orientation: landscape) {
            .cel.cel {
                min-width: 21em;
            }
        }
    }
jsonld: |
    {
        "@context": "http://schema.org/",
        "@type": "Product",
        "name": "מדריך לארון מדוייק",
        "image": "https://img.youtube.com/vi/$video/0.jpg",
        "description": "מדריך בעל שלושה סרטונים על יסודות הסטיילינג",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "ILS"
        }
    }
---
