// src/main.js
import { createApp } from 'vue'; // Import createApp from Vue 3
import App from './App.vue'; // Assuming you have an App.vue
import Router from './router/index'; // Assuming your router configuration file is router.js in the src folder

const app = createApp(App);

app.use(Router); // Use the router instance

app.mount('#app');
