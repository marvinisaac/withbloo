import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'share',
            component: () => import('./page/Share/Share.vue'),
            meta: {
                title: 'Share - With Bloo'
            }
        }, {
            path: '/revisit',
            name: 'revisit',
            component: () => import('./page/Revisit.vue'),
            meta: {
                title: 'Revisit - With Bloo'
            }
        }, {
            path: '/settings',
            name: 'settings',
            component: () => import('./page/Settings.vue'),
            meta: {
                title: 'Settings - With Bloo'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title';
    next();
});

export default router;
