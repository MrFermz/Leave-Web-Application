const VERSION = '1'
const CACHE_KEY = `cache-v${VERSION}`
const CACHE_DNM = `dinamic-v${VERSION}`
const assets = [
  '/',
  '/index.html',
  '/index.js',
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/favicon.ico'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_KEY)
      .then(cache => cache.addAll(assets))
  )
})

self.addEventListener('activate', event => {
  // const cacheWhitelist = [CACHE_KEY]

  event.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys)
      return Promise.all(keys
        .filter(key => key !== CACHE_KEY)
        .map(key => {
          console.log(key)
          caches.delete(key)
        })
      )
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_DNM).then(cache => {
          cache.put(event.request.url, fetchRes.clone())
          return fetchRes
        })
      })
    })
  )
})
