const CACHE_NAME = 'pulsex-v1.0.0'
const urlsToCache = [
	'/',
	'/index.html',
	'/download.html',
	'/features.html',
	'/pricing.html',
	'/changelog.html',
	'/support.html',
	'/src/main.js',
	'/src/styles/globals.css',
	'/src/styles/tokens.css',
	'/src/styles/utilities.css',
	'/public/favicon.svg',
	'/public/og-image.svg',
	'/public/vite.svg'
]

// Install event - cache resources
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				console.log('Opened cache')
				return cache.addAll(urlsToCache)
			})
	)
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				// Return cached version or fetch from network
				return response || fetch(event.request)
			})
	)
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheName !== CACHE_NAME) {
						console.log('Deleting old cache:', cacheName)
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})

// Background sync for offline actions
self.addEventListener('sync', event => {
	if (event.tag === 'background-sync') {
		event.waitUntil(doBackgroundSync())
	}
})

function doBackgroundSync() {
	// Handle offline actions when connection is restored
	console.log('Background sync triggered')
}

// Push notifications (if implemented)
self.addEventListener('push', event => {
	const options = {
		body: event.data ? event.data.text() : 'Nova notificação do PulseX',
		icon: '/public/favicon.svg',
		badge: '/public/favicon.svg',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		},
		actions: [
			{
				action: 'explore',
				title: 'Ver mais',
				icon: '/public/favicon.svg'
			},
			{
				action: 'close',
				title: 'Fechar',
				icon: '/public/favicon.svg'
			}
		]
	}

	event.waitUntil(
		self.registration.showNotification('PulseX', options)
	)
})

// Notification click
self.addEventListener('notificationclick', event => {
	event.notification.close()

	if (event.action === 'explore') {
		event.waitUntil(
			clients.openWindow('/')
		)
	}
})
