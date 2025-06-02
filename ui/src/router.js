import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'check-in',
            component: () => import('./page/CheckIn.vue'),
            meta: {
                title: 'Check In - With Bloo'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title';
    next();
});

export default router;
