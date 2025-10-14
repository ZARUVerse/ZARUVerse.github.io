// service-worker.js
const CACHE = "zaru-cache-v1";
const PRECACHE = [
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "https://zaruverse.github.io/lion-logo.png",
  "https://zaruverse.github.io/zaru-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
