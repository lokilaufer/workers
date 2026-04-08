import './css/style.css';
import { App } from './js/app';

// Запускаем приложение
document.addEventListener('DOMContentLoaded', () => {
    try {
        new App();
        console.log('Workers app started successfully');
    } catch (error) {
        console.error('Failed to initialize Workers app:', error);
    }
});