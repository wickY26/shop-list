if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg))$/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'images-cache'
      })
    );

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
