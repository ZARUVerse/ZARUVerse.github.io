self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("zaru-cache").then(cache => {
      return cache.addAll([
        "/index.html",
        "/style.css",
        "/script.js",
        "/manifest.json",
        "https://zaruverse.github.io/zaru-512.png",
        "https://zaruverse.github.io/lion-logo.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
