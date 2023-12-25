import { createRouter, createWebHistory } from 'vue-router';
// import App from '../App.vue'; // Import your home component
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue'; // Adjust the path as necessary

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage // The component to render for the root path
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;