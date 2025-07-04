import { createRouter, createWebHistory } from 'vue-router';
import SettingsPage from './page/Settings.vue';
import SharePage from './page/Share/Share.vue';
import RevisitPage from './page/Revisit.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'share',
            component: SharePage,
            meta: {
                title: 'Share - With Bloo'
            }
        }, {
            path: '/revisit',
            name: 'revisit',
            component: RevisitPage,
            meta: {
                title: 'Revisit - With Bloo'
            }
        }, {
            path: '/settings',
            name: 'settings',
            component: SettingsPage,
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
