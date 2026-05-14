/**
 * ZprintPro Service Worker
 * Cache-First strategy for static assets
 * Versioned cache to ensure updates on each build
 */

const CACHE_VERSION = 'zprintpro-v1';
const STATIC_CACHE = CACHE_VERSION + '-static';
const IMAGE_CACHE = CACHE_VERSION + '-images';
const FONT_CACHE = CACHE_VERSION + '-fonts';

const STATIC_ASSETS = [
  '/',
  '/zh-hk/',
  '/en/',
  '/ja/',
  '/manifest.json',
];

// Install: pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('zprintpro-') && name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== FONT_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for images/fonts, network-first for HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (except fonts from fonts.gstatic.com)
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  // Images: cache-first with 7-day expiration
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            // Check if cache is older than 7 days
            const dateHeader = response.headers.get('sw-cached-date');
            if (dateHeader) {
              const age = Date.now() - parseInt(dateHeader, 10);
              if (age < 7 * 24 * 60 * 60 * 1000) {
                return response;
              }
            } else {
              return response;
            }
          }
          return fetch(request).then((fetchResponse) => {
            const cloned = fetchResponse.clone();
            const headers = new Headers(cloned.headers);
            headers.set('sw-cached-date', Date.now().toString());
            const cachedResponse = new Response(cloned.body, {
              status: cloned.status,
              statusText: cloned.statusText,
              headers: headers,
            });
            cache.put(request, cachedResponse);
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Fonts: cache-first
  if (request.destination === 'font') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) return response;
          return fetch(request).then((fetchResponse) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // HTML pages: network-first with offline fallback
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, cloned);
          });
          return response;
        })
        .catch(() => {
          return caches.open(STATIC_CACHE).then((cache) => {
            return cache.match(request).then((response) => {
              if (response) return response;
              // Fallback to homepage
              const localePath = url.pathname.startsWith('/en/') ? '/en/' : url.pathname.startsWith('/ja/') ? '/ja/' : '/zh-hk/';
              return cache.match(localePath);
            });
          });
        })
    );
    return;
  }

  // Other static assets (JS, CSS): stale-while-revalidate
  event.respondWith(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.match(request).then((response) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
