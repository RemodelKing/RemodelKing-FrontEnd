import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from "../views/login.vue";
import App from "../App.vue";
import clientPortfolio from "../views/client-portfolio.vue";
import client from "../views/client.vue";
import base from "../views/base.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/CompanyProgress',
        name: 'CompanyProgress',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CompanyProgressView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/client-portfolio',
        component: clientPortfolio,
        name: 'client-portfolio'
    },
    {
        path: '/client-portfolio/client/:id',
        component: client,
        name: 'client'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router