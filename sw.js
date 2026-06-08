const CACHE_NAME = "elerningtjkt-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./admin.html",
  "./siswa.html",
  "./datasiswa.html",
  "./datamapel.html",
  "./soal-ujian.html",
  "./LOGO YSL TERBARU.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
