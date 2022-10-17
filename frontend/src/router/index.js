import { createRouter, createWebHistory } from 'vue-router'
import MintView from '../views/MintView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'mint',
            component: MintView
        },
        /*
        {
            path: '/explore',
            name: 'explore',
            component: () => import('../views/ExploreView.vue')
        }
        */
    ]
})

export default router
