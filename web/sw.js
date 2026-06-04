// Tiny offline-first service worker for the PHP tracker.
// Network-first for the HTML shell so deploys roll out fast.
// Cache-first for static assets — bump CACHE to push new JS/CSS/images.
// Google Fonts get their own runtime cache so repeat visits don't hit the network.
const CACHE = "php-tracker-v15";
const FONT_CACHE = "php-tracker-fonts-v1";
const PRECACHE = [
  "./study_tracker.html",
  "./css/style.css",
  "./js/app.js",
  "./js/data.js",
  "./image/php-svgrepo-com.svg",
  "./manifest.webmanifest",
  "./data/day-1.json",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  const keep = new Set([CACHE, FONT_CACHE]);
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => !keep.has(k)).map(k => caches.delete(k))))
         .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: cache-first in a dedicated cache so repeat visits are instant.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(FONT_CACHE).then(c =>
        c.match(req).then(hit => hit || fetch(req).then(resp => {
          if (resp && resp.ok) c.put(req, resp.clone()).catch(() => {});
          return resp;
        }).catch(() => hit))
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  const isHTML = req.mode === "navigate" || req.destination === "document";

  if (isHTML) {
    // Network-first: get the freshest shell when online, fall back to cache offline.
    e.respondWith(
      fetch(req).then(resp => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match("./study_tracker.html", { ignoreSearch: true }))
      )
    );
    return;
  }

  // Lesson JSON: stale-while-revalidate so opens feel instant on repeat visits
  // while the cache stays fresh in the background.
  if (url.pathname.includes("/data/") && url.pathname.endsWith(".json")) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(req).then(cached => {
          const network = fetch(req).then(resp => {
            if (resp && resp.ok) c.put(req, resp.clone()).catch(() => {});
            return resp;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // Static assets: cache-first, no background revalidation.
  // Updates ship via a new CACHE version above + precache addAll on install.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        if (resp && resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
