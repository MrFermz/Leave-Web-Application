const static = 'leave system'
const assets = [
    '/',
    '/index.html',
    '/assets/images/icons/icon-512x512.png'
]

self.addEventListener('install', async installEvent => {
    installEvent.waiUtil(
        await caches.open(static).then(cache => {
            cache.addAll(assets)
        })
    )
})