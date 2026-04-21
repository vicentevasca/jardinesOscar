import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../lib/supabase.js'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (to.query?.edit) return false   // keep scroll position in edit mode
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    { path: '/',           name: 'home',       component: HomeView },
    { path: '/tipos',      name: 'tipos',      component: () => import('../views/TiposView.vue') },
    { path: '/portafolio', name: 'portafolio', component: () => import('../views/PortafolioView.vue') },
    { path: '/servicios',  name: 'servicios',  component: () => import('../views/ServiciosView.vue') },
    { path: '/contacto',   name: 'contacto',   component: () => import('../views/ContactoView.vue') },
    { path: '/login',      name: 'login',      component: () => import('../views/LoginView.vue') },
    {
      path: '/admin',
      component: () => import('../views/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '',             redirect: '/admin/mensajes' },
        { path: 'mensajes',     name: 'admin-mensajes',      component: () => import('../views/admin/MessagesView.vue') },
        { path: 'herramientas', name: 'admin-herramientas',  component: () => import('../views/admin/ToolsView.vue') },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { name: 'login' }
})

export default router
