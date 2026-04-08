const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// Задержка для имитации загрузки
app.use(async (ctx, next) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await next();
});

// Данные новостей
const newsData = [
    {
        title: 'Дюна 2 собрала миллиард долларов',
        description: 'Продолжение эпической саги Дени Вильнева стало самым кассовым фильмом года, обогнав "Барби" и "Оппенгеймера"',
        source: 'Variety',
        date: '15 марта 2024'
    },
    {
        title: 'Новый трейлер Оппенгеймера',
        description: 'Кристофер Нолан представляет финальный трейлер своего байопика о создателе атомной бомбы',
        source: 'Hollywood Reporter',
        date: '14 марта 2024'
    },
    {
        title: 'Оскар 2024: полный список победителей',
        description: '"Оппенгеймер" получил 7 статуэток, включая "Лучший фильм"',
        source: 'Deadline',
        date: '12 марта 2024'
    }
];

router.get('/api/news', async (ctx) => {
    ctx.body = newsData;
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});