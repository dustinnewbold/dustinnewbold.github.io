;(function() {
	self.addEventListener('install', function() {
		event.waitUntil(
			caches.open('v1').then(function(cache) {
				return cache.addAll([
					'/',
					'/assets/css/styles.css'
				]);
			})
		);
	});
	
	self.addEventListener('activate', function() {
		cacheAssets();
	});
	
	self.addEventListener('fetch', function() {
		console.log('fetch');
	});
	
	
	function cacheAssets() {
		console.log('caching');
		var cacheWhitelist = [
			'pages-cache-v1',
			'blog-posts-cache-v1'
		];
	
		event.waitUntil(
			caches.keys().then(function(cacheNames) {
				return Promise.all(
					cacheNames.map(function(cacheName) {
						if (cacheWhitelist.indexOf(cacheName) === -1) {
							return caches.delete(cacheName);
						}
					})
				);
			})
		);
	}
})();