const CACHE = "inps-v0";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        "./players.html",
        "./ranking.html",
        "./matches.html",
        "./css/style.css"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
