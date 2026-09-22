const CACHE_NAME = 'alam-vip-radar-v2';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json'
];

// 1. INSTALLATION: Mobile mein app ka core data save karna
self.addEventListener('install', event => {
  self.skipWaiting(); // Purane update ko turant replace karne ke liye
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. ACTIVATION: Purane kachre (cache) ko delete karna
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. NETWORK ENGINE: W3C Standard 'Network First, Fallback to Cache'
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
