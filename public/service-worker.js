const CACHE_NAME = 'primal-nexus-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Note: For ESM modules loaded directly in HTML, the browser handles their caching.
  // We list them here for explicitness if a more aggressive caching strategy is desired,
  // but they might also be implicitly cached by caching '/' and '/index.html'.
  // Actual JS/TSX files (if not bundled)
  '/index.tsx',
  '/App.tsx',
  '/components/BubbleLink.tsx',
  '/components/CountdownTimer.tsx',
  '/components/GlitchText.tsx',
  '/components/Icon.tsx',
  '/components/StarfieldBackground.tsx',
  '/constants.tsx',
  '/types.ts',
  // CDN resources (optional, browser might handle these well with standard caching headers)
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react-dom@^19.1.0/',
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react@^19.1.0/',
  // Background image (REMOVED)
  // 'https://images.unsplash.com/photo-1531685250784-55bc9ce07d82?auto=format&fit=crop&w=1920&q=80',
  // Icons (ensure these paths match your actual icon files)
  '/icon-192x192.png',
  '/icon-512x512.png',
  '../favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll with a filter for valid requests to avoid errors with potential undefined URLs
        const validUrlsToCache = urlsToCache.filter(url => url && typeof url === 'string' && (url.startsWith('/') || url.startsWith('http')));
        return cache.addAll(validUrlsToCache.map(url => new Request(url, { mode: 'no-cors' }))) // Use no-cors for opaque responses from CDNs if needed
          .catch(err => {
            console.error('Failed to cache some resources during install:', err);
            // Log individual failed URLs
            validUrlsToCache.forEach(url => {
              cache.add(new Request(url, { mode: 'no-cors' })).catch(e => console.error(`Failed to cache ${url}:`, e));
            });
          });
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 && response.status !== 0 || response.type === 'error' ) { // response.status === 0 for opaque responses
              if (response && response.type === 'error') console.error('Fetch error (type error):', event.request.url);
              return response;
            }

            // Clone the response because it's a stream and can only be consumed once.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch failed; returning offline page or error for:', event.request.url, error);
            // Optionally, return a generic offline page if the request is for navigation
            // if (event.request.mode === 'navigate') {
            //   return caches.match('/offline.html'); // You would need to create and cache an offline.html
            // }
            // For other assets, just let the browser handle the error
          });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});