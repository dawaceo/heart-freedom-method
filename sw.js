/* Heart Freedom Method — offline cache */
const CACHE = "hfm-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./audio/narr-0.m4a","./audio/narr-1.m4a","./audio/narr-2.m4a","./audio/narr-3.m4a",
  "./audio/narr-4.m4a","./audio/narr-5.m4a","./audio/narr-6.m4a","./audio/narr-7.m4a",
  "./audio/narr-8.m4a","./audio/narr-9.m4a","./audio/narr-10.m4a",
  "./audio/m/narr-0.m4a","./audio/m/narr-1.m4a","./audio/m/narr-2.m4a","./audio/m/narr-3.m4a",
  "./audio/m/narr-4.m4a","./audio/m/narr-5.m4a","./audio/m/narr-6.m4a","./audio/m/narr-7.m4a",
  "./audio/m/narr-8.m4a","./audio/m/narr-9.m4a","./audio/m/narr-10.m4a"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const req = e.request;
  const isPage = req.mode === "navigate" || req.destination === "document";
  if (isPage) {
    // network-first so deployed updates reach users; fall back to cache offline
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
  } else {
    // cache-first for static assets (icons, manifest)
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }))
    );
  }
});
