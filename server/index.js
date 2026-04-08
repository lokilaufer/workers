const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// Middleware для эмуляции задержки (2-5 секунд)
app.use(async (ctx, next) => {
    if (ctx.url === '/api/news') {
        const delay = 2000 + Math.random() * 3000;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    await next();
});

// Данные новостей
const newsData = [
    {
        id: 1,
        title: 'Дюна 2 собрала миллиард долларов',
        description: 'Продолжение эпической саги Дени Вильнева стало самым кассовым фильмом года, обогнав Барби и Оппенгеймера',
        source: 'Variety',
        date: '2024-03-15'
    },
    {
        id: 2,
        title: 'Новый трейлер Оппенгеймера',
        description: 'Кристофер Нолан представляет финальный трейлер своего байопика о создателе атомной бомбы',
        source: 'Hollywood Reporter',
        date: '2024-03-14'
    },
    {
        id: 3,
        title: 'Оскар 2024: полный список победителей',
        description: 'Оппенгеймер получил 7 статуэток, включая лучший фильм. Барби - лучшую песню',
        source: 'Deadline',
        date: '2024-03-12'
    },
    {
        id: 4,
        title: 'Дэдпул 3: первые отзывы',
        description: 'Критики в восторге от возвращения Райана Рейнольдса и дебюта Хью Джекмана в роли Росомахи',
        source: 'IGN',
        date: '2024-03-10'
    },
    {
        id: 5,
        title: 'Веном 3: дата выхода',
        description: 'Финальная часть трилогии с Томом Харди выйдет в ноябре 2024 года',
        source: 'Marvel',
        date: '2024-03-08'
    }
];

// CORS для работы с GitHub Pages
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
});

router.get('/api/news', async (ctx) => {
    // Рандомная ошибка для теста (10% вероятность)
    if (Math.random() < 0.1) {
        ctx.status = 500;
        ctx.body = { error: 'Server error' };
        return;
    }

    ctx.body = newsData;
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Workers server running on http://localhost:${PORT}`);
    console.log(`📰 News API: http://localhost:${PORT}/api/news`);
});