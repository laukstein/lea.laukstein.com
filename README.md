# [Lea STYLE](https://lea.laukstein.com)

YAML schema

    layout: default | post | product | video
    type:   full | center | medium
    permalink:     /url
    redirect_from: /outdated-url
    title:       max 70-78 chars
    titleLong:   max 70-78 chars (overwrites page.title except in nav)
    description: max 170-200 chars
    date: YYYY-MM-DD HH:MM:SS
    private: true // default `false`, prevent page indexing
    subscribe:
        id: Mailchimp ID
        utm_campaign: optional for Facebook Pixel
        title:  differ form title
        button: differ button text
        autofocus: true   // default `false`
        requiredTel: true // default `false`
    className: className
    css: |
        selector {
            rule: value;
        }
    video: ID
    videoTitle: title of video
    image: src
    imageTitle:  image `alt` attribute value
    imageClass:  className
    imageWidth:  Number
    imageHeight: Number
    imageLabel: "Author: Name <website>"

Differ production and development environment with `SET JEKYLL_ENV=prod | dev` before `jekyll serve`.

Used APIs: YouTube, Disqus, MailChimp, Mailgun, Pelepay, Google Analytics, FullStory, Facebook Pixel, Sentry, and private APIs.

Released under the [CC BY-NC-ND 4.0 License](LICENSE).
