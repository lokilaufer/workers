import { NewsService } from './newsService';

export class App {
    constructor() {
        this.newsService = new NewsService();
        this.newsList = document.getElementById('newsList');
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.retryBtn = document.getElementById('retryBtn');

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadNews();
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => this.loadNews());
        this.retryBtn.addEventListener('click', () => this.loadNews());
    }

    async loadNews() {
        this.showLoading();

        try {
            const news = await this.newsService.fetchNews();
            this.renderNews(news);
            this.showNewsList();
        } catch (error) {
            console.error('Failed to load news:', error);
            this.showError();
        }
    }

    showLoading() {
        this.loadingState.style.display = 'block';
        this.errorState.style.display = 'none';
        this.newsList.style.display = 'none';
    }

    showError() {
        this.loadingState.style.display = 'none';
        this.errorState.style.display = 'block';
        this.newsList.style.display = 'none';
    }

    showNewsList() {
        this.loadingState.style.display = 'none';
        this.errorState.style.display = 'none';
        this.newsList.style.display = 'block';
    }

    renderNews(news) {
        if (!news || news.length === 0) {
            this.newsList.innerHTML = '<div class="no-news">📭 Новостей пока нет</div>';
            return;
        }

        this.newsList.innerHTML = news.map(item => `
            <div class="news-item">
                <div class="news-title">${this.escapeHtml(item.title)}</div>
                <div class="news-description">${this.escapeHtml(item.description)}</div>
                <div class="news-meta">
                    <span class="news-source">${this.escapeHtml(item.source)}</span>
                    <span class="news-date">${new Date(item.date).toLocaleDateString('ru-RU')}</span>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}