/* eslint-disable @typescript-eslint/no-unused-vars */

// ✅ Install Event
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

// ✅ Activate Event
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

// ✅ Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
