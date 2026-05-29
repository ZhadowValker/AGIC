// AGIC Women's Conference 2026 — Service Worker
const CACHE_NAME = 'agic-wc26-v1';
const ASSETS = [
  './',
  './AGIC-WC-2026.html',
  './assets/women-conf-logo.png',
  './assets/favicon.png',
  './assets/pastor-elizabeth.jpg',
  './assets/pastor-tommie.jpg',
  './assets/pastor-janet.jpg',
  './assets/sis-ammajan.jpg',
  './assets/dr-swapna-1.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
