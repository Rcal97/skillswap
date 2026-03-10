//Nome della cache
var CACHE_NAME = 'skillswap-version1';

//File da salvare in cache per funzionare offline
var FILE_DA_CACHARE = [
	'/', '/static/css/style.css', '/static/js/main.js'
];

//Installazione e salvataggio dei file in cache
self.addEventListener('install', function(event)
{
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(FILE_DA_CACHARE);
		})
	);
});

//Intercetta le richieste e serve dalla cache se è offline
self.addEventListener('fetch', function(event)
{
	event.respondWith(
		caches.match(event.request).then(function(risposta) {
			if(risposta)
			{
				return risposta;
			}
			return fetch(event.request);
		})
	);
});