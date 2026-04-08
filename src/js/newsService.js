// src/js/newsService.js
export class NewsService {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/news';
        this.cacheName = 'workers-news-v1';
    }

    async fetchNews() {
        try {
            // Пробуем загрузить с сервера
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();

            // Сохраняем в кэш
            await this.saveToCache(data);
            return data;
        } catch (error) {
            console.log('Network error, trying cache...');

            // Пробуем взять из кэша
            const cached = await this.loadFromCache();
            if (cached) {
                return cached;
            }

            // Если кэша нет - возвращаем тестовые данные
            return this.getMockData();
        }
    }

    async saveToCache(data) {
        if (!caches) return;
        try {
            const cache = await caches.open(this.cacheName);
            await cache.put(this.apiUrl, new Response(JSON.stringify(data)));
        } catch (e) {
            console.error('Cache save error:', e);
        }
    }

    async loadFromCache() {
        if (!caches) return null;
        try {
            const cache = await caches.open(this.cacheName);
            const response = await cache.match(this.apiUrl);
            if (response) {
                return response.json();
            }
        } catch (e) {
            console.error('Cache load error:', e);
        }
        return null;
    }

    getMockData() {
        return [
            {
                title: 'Дюна 2 собрала миллиард долларов',
                description: 'Продолжение эпической саги Дени Вильнева стало самым кассовым фильмом года, обогнав "Барби" и "Оппенгеймера"',
                source: 'Variety',
                date: '15 марта 2024'
            },
            {
                title: 'Новый трейлер Оппенгеймера',
                description: 'Кристофер Нолан представляет финальный трейлер своего байопика о создателе атомной бомбы. Премьера уже скоро.',
                source: 'Hollywood Reporter',
                date: '14 марта 2024'
            },
            {
                title: 'Оскар 2024: полный список победителей',
                description: '"Оппенгеймер" получил 7 статуэток, включая "Лучший фильм". "Барби" - "Лучшую песню". "Бедные-несчастные" - "Лучшую женскую роль".',
                source: 'Deadline',
                date: '12 марта 2024'
            },
            {
                title: 'Дэдпул 3: первые отзывы',
                description: 'Критики в восторге от возвращения Райана Рейнольдса и дебюта Хью Джекмана в роли Росомахи. Фильм выходит в июле.',
                source: 'IGN',
                date: '10 марта 2024'
            },
            {
                title: 'Веном 3: дата выхода',
                description: 'Финальная часть трилогии с Томом Харди выйдет в ноябре 2024 года. Съемки уже завершены.',
                source: 'Marvel',
                date: '8 марта 2024'
            }
        ];
    }
}