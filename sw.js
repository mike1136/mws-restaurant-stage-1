var currentCache = 'restaurants-offline-v3';
var urlsToCache = [
    '/',
    '/restaurant.html',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/data/restaurants.json',
];

self.addEventListener('install', function (event) {//Start the cache
    event.waitUntil(
        caches.open(currentCache)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('activate', function (event) {//Deletes old Cache
    caches.keys().then(function (cacheNames) {
        cacheNames.filter(function (cacheName) {
            return cacheName.startsWith('restaurants-offline-') && cacheName != currentCache;
        })
    })
})

self.addEventListener('fetch', function (event) {//What check if the conection is ok
    event.respondWith(
        caches.match(event.request,{ignoreSearch:true}).then(function (response) {
            return response || fetch(event.request);
        })
    );
});