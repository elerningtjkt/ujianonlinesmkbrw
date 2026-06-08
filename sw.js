const CACHE_NAME = "cbt-smks-barunawati-v1";

// Base path GitHub Pages
const BASE_PATH = "/ujianonlinesmkbrw/";

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "admin.html",
  BASE_PATH + "siswa.html",
  BASE_PATH + "datasiswa.html",
  BASE_PATH + "datamapel.html",
  BASE_PATH + "soal-ujian.html",
  BASE_PATH + "LOGO YSL TERBARU.jpg",
  BASE_PATH + "manifest.json"
];

// INSTALL SERVICE WORKER
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH (OFFLINE SUPPORT)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // fallback ke index kalau offline
        return caches.match(BASE_PATH + "index.html");
      });
    })
  );
});
