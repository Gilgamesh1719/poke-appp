import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Оптимизация анимаций
const app = createApp(App);
app.config.performance = true;
app.use(store);
app.mount('#app');