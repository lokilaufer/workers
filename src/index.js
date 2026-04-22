import './css/style.css';
import { App } from './js/app';

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting app...');
    try {
        const app = new App();
        console.log('App started successfully');
    } catch (error) {
        console.error('Failed to start app:', error);
    }
});