"use strict";

addEventListener("install", () => skipWaiting());
addEventListener("message", event => {
    clients.matchAll().then(clients => {
        // No need to update the tab that sent the data
        clients.forEach(client => client.id !== event.source.id && client.postMessage(event.data));
    });
});

