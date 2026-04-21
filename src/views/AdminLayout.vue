<template>
  <div class="min-h-screen flex" style="background: #f5f4f1;">

    <!-- Sidebar -->
    <aside class="w-56 shrink-0 flex flex-col" style="background: #0C1912; min-height: 100vh; position: sticky; top: 0; height: 100vh;">
      <!-- Logo -->
      <div class="px-6 py-7 border-b border-white/10">
        <p class="font-display text-white m-0" style="font-size: 20px; font-weight: 400; letter-spacing: -0.02em;">Oscar Palma</p>
        <p class="text-green-200/50 m-0 mt-0.5 uppercase tracking-[0.14em]" style="font-size: 10px;">Admin</p>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-5 flex flex-col gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-3 py-2.5 no-underline transition-colors rounded-sm"
          :class="$route.path.startsWith(link.to)
            ? 'bg-white/10 text-white'
            : 'text-green-200/60 hover:text-white hover:bg-white/6'"
          style="font-size: 13px;"
        >
          <component :is="link.icon" class="w-4 h-4 shrink-0" />
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Footer -->
      <div class="px-5 py-5 border-t border-white/10">
        <button
          @click="signOut"
          class="flex items-center gap-2 text-green-200/50 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0"
          style="font-size: 12px;"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 min-w-0">
      <RouterView />
    </main>

  </div>
</template>

<script setup>
import { h }           from 'vue'
import { useRouter }   from 'vue-router'
import { useAuth }     from '../composables/useAuth.js'

const router = useRouter()
const auth   = useAuth()

async function signOut() {
  await auth.signOut()
  router.push('/login')
}

// Inline SVG icon components
const IconInbox = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8' }, [
  h('polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12' }),
  h('path', { d: 'M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' }),
]) }
const IconWrench = { render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8' }, [
  h('path', { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' }),
]) }

const navLinks = [
  { to: '/admin/mensajes',    label: 'Mensajes',    icon: IconInbox  },
  { to: '/admin/herramientas', label: 'Herramientas', icon: IconWrench },
]
</script>
