const CACHE_NAME = 'Yelt';
const STATIC_RESOURCES = [
  '/',
  '/html/index.html',
  '/html/menu.html',
  '/css/styles.css',
  '/js/script.js',
  '/img/logo.png',
  
  '/img/end.png',
  '/img/enemy.png',
  '/img/enemy_close.png',
  '/img/enemy_open.png',
  '/img/j.png',
  '/img/logdo.png',
  '/img/play.png',
  '/img/stone.png',
  '/img/playr.png',
  '/img/playr_white.png',
  '/img/copy.png',
  '/img/exit.png'

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
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        // Проверяем наличие обновленных ресурсов
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Клонируем полученный ответ, чтобы использовать его как ответ в сети и сохранить в кэше
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
