const CACHE_NAME = 'withbloo-cache';
const ASSETS = [
  '/',
  '/revisit',
  '/settings',
  '/favicon.ico',
  '/manifest.json'
];

const clearOlderVersion = async (url) => {
  const cache = await caches.open(CACHE_NAME);
  const match = url.pathname.match(/^\/assets\/(.+?)-[^/]+(\.[a-zA-Z0-9]+)$/);
  if (match) {
    const [ fullName, baseName, ext ] = match;
    const keys = await cache.keys();
    keys.forEach(key => {
      const keyUrl = new URL(key.url);
      const keyMatch = keyUrl.pathname.match(/^\/assets\/(.+?)-[^/]+(\.[a-zA-Z0-9]+)$/);
      if (keyMatch
        && keyUrl.pathname !== url.pathname
        && keyMatch[1] === baseName
        && keyMatch[2] === ext
      ) {
        // console.log('Possible match found');
        // console.log(keyMatch);
        console.log(`Deleting ${fullName} from cache`);
        cache.delete(key);
        return;
      }
    });
  }
  return;
}

const tryNetworkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      const url = new URL(request.url);
      if (url.pathname.startsWith('/assets/')) {
        clearOlderVersion(url);
      }
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log(`${request.url} from cache`);
    console.error(error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || null;
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
