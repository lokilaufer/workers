// src/js/app.js
import { NewsService } from './newsService';

export class App {
    constructor() {
        console.log('App started');

        this.newsService = new NewsService();
        this.newsList = document.getElementById('newsList');
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.retryBtn = document.getElementById('retryBtn');

        this.init();
    }

    init() {
        // Привязываем события правильно
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', () => {
                console.log('Refresh clicked');
                this.loadNews();
            });
        }

        if (this.retryBtn) {
            this.retryBtn.addEventListener('click', () => {
                console.log('Retry clicked');
                this.loadNews();
            });
        }

        this.loadNews();
    }

    async loadNews() {
        console.log('Loading news...');
        this.showLoading();

        try {
            const news = await this.newsService.fetchNews();
            console.log('News received:', news);
            this.renderNews(news);
            this.showNewsList();
        } catch (error) {
            console.error('Error:', error);
            this.showError();
        }
    }

    showLoading() {
        if (this.loadingState) this.loadingState.style.display = 'block';
        if (this.errorState) this.errorState.style.display = 'none';
        if (this.newsList) this.newsList.style.display = 'none';
    }

    showError() {
        if (this.loadingState) this.loadingState.style.display = 'none';
        if (this.errorState) this.errorState.style.display = 'block';
        if (this.newsList) this.newsList.style.display = 'none';
    }

    showNewsList() {
        if (this.loadingState) this.loadingState.style.display = 'none';
        if (this.errorState) this.errorState.style.display = 'none';
        if (this.newsList) this.newsList.style.display = 'block';
    }

    renderNews(news) {
        if (!this.newsList || !news) return;

        this.newsList.innerHTML = news.map(item => `
            <div class="news-item">
                <div class="news-title">🎬 ${this.escapeHtml(item.title)}</div>
                <div class="news-description">${this.escapeHtml(item.description)}</div>
                <div class="news-meta">
                    <span class="news-source">📰 ${this.escapeHtml(item.source)}</span>
                    <span class="news-date">📅 ${item.date}</span>
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