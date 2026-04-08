// src/index.js
import './css/style.css';
import { App } from './js/app';

console.log('Index.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    try {
        new App();
    } catch (error) {
        console.error('Error:', error);
    }
});