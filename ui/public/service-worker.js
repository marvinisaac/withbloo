const CACHE_NAME = 'withbloo-cache';
const ASSETS = [
  '/',
  '/revisit',
  '/settings',
  '/favicon.ico',
  '/manifest.json'
];

const precache = async () => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(ASSETS);
  return;
}

const tryNetworkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {  
      console.log(`${request.url} from server`);
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log(`${request.url} from cache`);
    const cachedResponse = await caches.match(request);
    return cachedResponse || Response.error();
  }
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate and clean up old cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys.map(k => caches.delete(k))
        )
      )
  );
  event.waitUntil(self.clients.claim());
});

// Try server first, fallback to cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (ASSETS.includes(url.pathname)
    || url.pathname.startsWith('/assets/')
  ) {
    event.respondWith(tryNetworkFirst(event.request));
  } else {
    console.log(`Skip cache attempt: ${url.pathname}`);
  }
});
