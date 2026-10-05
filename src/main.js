import { createApp } from 'vue';
import App from './App.vue';
import * as bootstrap from 'bootstrap';
import './assets/css/styles.css'; // Import Bootstrap CSS
import router from './router';

window.bootstrap = bootstrap;

const app = createApp(App);
app.use(router);
app.mount('#app');
