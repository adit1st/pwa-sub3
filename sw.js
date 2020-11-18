importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/standing.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/bootstrap.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/bootstrap.min.js", revision: "1" },
  { url: "/js/db.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/js/jquery.min.js", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/push.js", revision: "1" },
  { url: "/js/save.js", revision: "1" },
  { url: "/js/register_sw.js", revision: "1" },
  { url: "/js/sub_push.js", revision: "1" },
  { url: "/pages/premierleague.html", revision: "1" },
  { url: "/pages/laliga.html", revision: "1" },
  { url: "/pages/seriea.html", revision: "1" },
  { url: "/pages/bundesliga.html", revision: "1" },
  { url: "/pages/favorit.html", revision: "1" },
  { url: "/images/logofootball.png", revision: "1" },
  { url: "/images/logofootball128.png", revision: "1" },
  { url: "/images/logofootball192.png", revision: "1" },
  { url: "/images/logofootball256.png", revision: "1" },
  { url: "/images/logofootball512.png", revision: "1" },
  { url: "/images/pl.png", revision: "1" },
  { url: "/images/logofootball128.png", revision: "1" },
  { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1" },
  { url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: "1" },
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'data-api-football',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('^/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);;

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets"
  })
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/logofootball.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});