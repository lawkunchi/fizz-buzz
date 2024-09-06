import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toast from './components/Toast.vue';

const app = createApp(App);
app.component('Toast', Toast)
app.mount('#app');
