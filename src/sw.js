import { registerRoute } from 'workbox-routing'
import { precacheAndRoute } from 'workbox-precaching'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  /\.(?:js|css)$/,
  new CacheFirst({
    cacheName: 'main-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 3 * 24 * 60 * 60, // 3 days
      }),
    ],
  }),
)

registerRoute(
  /^(?!\/?api).+$/,
  new CacheFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
      }),
    ],
  }),
)

registerRoute(
  /\.(woff|woff2|eot|ttf|otf)$/,
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
  }),
)
