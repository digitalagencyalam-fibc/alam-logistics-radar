// ==========================================
// 🚀 VIP UNIFIED SERVICE WORKER (PWA Cache + FCM Background Push)
// ==========================================

// 1. Firebase Background Messaging ke liye official scripts import karna
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// 2. Firebase Live Database Initialization
firebase.initializeApp({
  apiKey: "AIzaSyCsJ4F0cnb_6qLjxqAq0zxqrAOYkdSIp6Q",
  authDomain: "alam-enterprise-engine.firebaseapp.com",
  projectId: "alam-enterprise-engine",
  storageBucket: "alam-enterprise-engine.appspot.com",
  messagingSenderId: "627072782594",
  appId: "1:627072782594:web:bb6b14e4010051d55d321b"
});

const messaging = firebase.messaging();

// 3. FCM BACKGROUND PUSH NOTIFICATION LISTENER (Jab app band ya background me ho)
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Background Message received: ', payload);
 
  const notificationTitle = payload.notification.title || "🚨 VIP EMERGENCY ALERT!";
  const notificationOptions = {
    body: payload.notification.body || "Driver ne SOS emergency dabai hai! Turant command center check karein.",
    icon: 'https://cdn-icons-png.flaticon.com/512/565/565422.png',
    vibrate: [300, 100, 300, 100, 300],
    tag: 'sos-emergency-alert',
    requireInteraction: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// ==========================================
// 📦 PWA CACHING & NETWORK ENGINE (Your Original Verified Code)
// ==========================================

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

 
