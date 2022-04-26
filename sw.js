"use strict";

addEventListener("install", () => skipWaiting());
// addEventListener("activate", () => waitUntil(self.clients.claim());
addEventListener("message", event => {
    clients.matchAll().then(clients => {
        // No need to update the tab that sent the data
        clients.forEach(client => client.id !== event.source.id && client.postMessage(event.data));
    });
});

/* // Secure headers https://scotthelme.co.uk/security-headers-cloudflare-worker/
// https://github.com/securityheaders/security-headers-cloudflare-worker
const securityHeaders = {
        "Content-Security-Policy": "upgrade-insecure-requests",
        "Strict-Transport-Security": "max-age=1000",
        "X-Frame-Options": "DENY",
        // "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    sanitiseHeaders = {
        Server: ""
    },
    removeHeaders = [
        "Public-Key-Pins",
        "X-Powered-By",
        "X-AspNet-Version",
        "etag"
    ];

async function addHeaders(req) {
    console.log(req.url);

    const url = new URL(req.url),
        response = await fetch(req),
        newHeaders = new Headers(response.headers);
    var setHeaders = Object.assign({}, sanitiseHeaders);

    if (url.origin === location.origin) {
        if (newHeaders.has("Content-Type") && newHeaders.get("Content-Type").includes("text/html")) {
            setHeaders = Object.assign({}, securityHeaders, sanitiseHeaders);
        }

        Object.keys(setHeaders).forEach(name => newHeaders.set(name, setHeaders[name]));
        removeHeaders.forEach(name => newHeaders.delete(name));
    }

    return new Response(response.body, {
        // undefined fixes "Uncaught RangeError" https://github.com/sorodrigo/redux-offline/issues/44#issuecomment-340031669
        status: response.status || undefined,
        statusText: response.statusText,
        headers: newHeaders
    });
}

addEventListener("fetch", event => event.respondWith(addHeaders(event.request))); */
