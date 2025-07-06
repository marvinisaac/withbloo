import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia())
app.use(router);
app.mount('#app')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}
