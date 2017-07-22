# [Lea STYLE](https://lea.laukstein.com)

YAML schema

    layout: default | post | product | video
    type: full | center | medium
    permalink: /url
    redirect_from: /outdated-url
    title: max 70-78 chars
    titleLong: max 70-78 chars (overwrites page.title except in nav)
    description: max 170-200 chars
    date: YYYY-MM-DD HH:MM:SS
    private: true // default `false`, prevent page indexing
    className: className
    video: ID
    image: src
    imageClass: className
    imageWidth: Number
    imageHeight: Number
    imageLabel: "Author: Name <website>"

Differ production and development environment with `SET JEKYLL_ENV=production | development` before `jekyll serve`.

Used APIs: YouTube, Disqus, MailChimp, Mailgun, PayPal, Google Analytics, FullStory, Facebook Pixel, Sentry, and private APIs.

Released under the [CC BY-NC-ND 4.0 License](LICENSE).
