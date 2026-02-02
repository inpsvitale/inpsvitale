const CACHE = "inps-pwa-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "/inpsvitale/",
        "/inpsvitale/players.html",
        "/inpsvitale/ranking.html",
        "/inpsvitale/matches.html",
        "/inpsvitale/css/style.css"
      ])
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
