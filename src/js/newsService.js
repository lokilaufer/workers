export class NewsService {
    constructor() {

        this.apiUrl = 'https://workers-server.onrender.com/api/news';
        this.cacheName = 'workers-news-v1';
        this.localUrl = 'http://localhost:3000/api/news';
    }

    async fetchNews() {

        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();


            await this.cacheData(data);
            return data;
        } catch (error) {
            console.log('Network error, trying cache...');

            // Если сеть не работает, берем из кэша
            const cached = await this.getCachedData();
            if (cached) {
                return cached;
            }

            throw new Error('No connection and no cache');
        }
    }

    async cacheData(data) {
        if (!caches) return;

        try {
            const cache = await caches.open(this.cacheName);
            await cache.put(this.apiUrl, new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            }));
        } catch (error) {
            console.error('Cache error:', error);
        }
    }

    async getCachedData() {
        if (!caches) return null;

        try {
            const cache = await caches.open(this.cacheName);
            const cached = await cache.match(this.apiUrl);
            if (cached) {
                return cached.json();
            }
        } catch (error) {
            console.error('Cache read error:', error);
        }
        return null;
    }
}