// 人生重启计划的 Service Worker：让游戏加到主屏幕后断网也能打开。
// 这是模板：打包时 vite.config.ts 会填入下面 BUILD_ID 和 PRECACHE 两个常量的真实内容，输出为 dist/sw.js。
//   BUILD_ID   每次打包的编号，用来区分新旧缓存
//   PRECACHE   这次打包生成的所有文件列表（脚本、样式、字体、图标）
// 游戏数据存在 IndexedDB 里，和这里的缓存无关，清理缓存不会丢存档。

const BUILD_ID = 'mvy0cp69';
const CACHE = `life-reset-rpg-${BUILD_ID}`;
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

// 安装：把这一版的所有文件下载进缓存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

// 启用：删掉旧版本的缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('life-reset-rpg-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 打开页面：先上网拿最新版本；断网时用缓存里的 index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html').then((cached) => cached || Response.error())),
    );
    return;
  }

  // 其他文件：文件名里带有内容编号，同名就一定相同，所以先用缓存，没有再上网
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
