import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    { path: '/',           name: 'home',       component: HomeView },
    { path: '/tipos',      name: 'tipos',      component: () => import('../views/TiposView.vue') },
    { path: '/portafolio', name: 'portafolio', component: () => import('../views/PortafolioView.vue') },
    { path: '/servicios',  name: 'servicios',  component: () => import('../views/ServiciosView.vue') },
    { path: '/contacto',   name: 'contacto',   component: () => import('../views/ContactoView.vue') },
  ],
})
