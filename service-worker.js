const CACHE_NAME = 'Yelt';
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/html/menu.html',
  '/css/style.css',
  '/js/script.js',
  '/img/logo.png'
  // Добавьте другие статические ресурсы, которые вы хотите кэшировать
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Загрузка всех статических ресурсов в кэш
      return cache.addAll(STATIC_RESOURCES);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Возвращаем кэшированный ресурс, если он доступен
      // В противном случае выполняем сетевой запрос
      return response || fetch(event.request);
    })
  );
});
