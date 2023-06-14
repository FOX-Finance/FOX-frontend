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
        {
            path: '/buyback',
            name: 'buyback',
            component: () => import('../views/BuybackView.vue')
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: () => import('../views/CouponView.vue')
        }
    ]
})

export default router
