// Tiny offline-first service worker for the PHP tracker.
// Cache-first for own static assets, network-first for everything else.
const CACHE = "php-tracker-v8";
const PRECACHE = [
  "./study_tracker.html",
  "./css/style.css",
  "./js/app.js",
  "./js/data.js",
  "./image/php-svgrepo-com.svg",
  "./manifest.webmanifest",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
         .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;
  // Ignore the ?v= cache-buster when matching so the same asset doesn't pile
  // up under multiple cache keys, and old versions still serve offline.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) {
        // Refresh in the background — only cache successful responses
        fetch(req).then(fresh => {
          if (fresh && fresh.ok) caches.open(CACHE).then(c => c.put(req, fresh.clone()));
        }).catch(() => {});
        return cached;
      }
      return fetch(req).then(resp => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => caches.match("./study_tracker.html", { ignoreSearch: true }));
    })
  );
});
