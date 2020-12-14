---
layout: default
redirect_from: /signup-business
hiddenHeader: true

title: מדריך לארון מדוייק
description: סטיילינג לדתיות - מדריך לארון מדוייק
video: oJqYt6ybTV0
subscribe:
    id: 70a2d0d976
    autofocus: true
    requiredTel: false
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
    .cel.subscribe input,
    .cel.subscribe button {
        max-width: 100%;
        border-width: 2px;
        border-radius: 4px;
        outline: 0;
        transition: color .15s,
                    background-color .15s,
                    border-color .15s,
                    box-shadow .15s;
    }
    .cel.subscribe input {
        background-color: #f4ffff;
        border-color: #00b0a9;
        box-shadow: none;
    }
    .cel.subscribe input:focus {
        background-color: #fbffff;
        border-color: #0f8fc4;
        outline: 1px solid #1e90ff;
        box-shadow: inset -1px -1px 0 1px #fff,
                    2px 2px .3em rgba(101,79,72,.1),
                    1px 1px 1.8em -.4em rgba(101,79,72,.4);
    }
    .cel.subscribe .error input {
        background-color: #fffbfb;
        border-color: #c00;
    }
    .cel.subscribe button {
        line-height: 1.11;
        background-color: #00b0a9;
        border-color: rgba(0,0,0,.2);
        border-top-color: rgba(255,255,255,0);
        border-left-color: rgba(255,255,255,0);
        box-shadow: inset -2px -2px 0 -1px rgba(255,255,255,.14), 1px 1px 2px rgba(0,0,0,.15);
    }
    .cel.subscribe button:before {
        line-height: .35;
    }
    .cel.subscribe button:not(:active):not([disabled]):hover {
        background-color: #09bab4;
    }
    .cel.subscribe button:focus,
    .cel.subscribe button:hover:active {
        background-image: linear-gradient(rgba(100,100,100,.23), rgba(100,100,100,.23));
        border-color: transparent;
        box-shadow: none;
    }
    .cel.subscribe .confirm {
        text-align: center;
        text-indent: calc(-10.6em / 2);
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
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "מדריך לארון מדוייק",
        "image": "https://i.ytimg.com/vi/$video/0.jpg",
        "description": "מדריך בעל שלושה סרטונים על יסודות הסטיילינג",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "ILS"
        }
    }
---
