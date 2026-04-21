<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="solid ? 'bg-beige-100/96 backdrop-blur-md' : 'bg-transparent'"
    :style="{ transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)', boxShadow: solid ? '0 1px 0 rgba(28,26,23,0.06)' : 'none' }"
  >
    <div class="flex items-center justify-between px-6 md:px-10"
      :class="solid ? 'py-4' : 'py-5'"
    >
      <RouterLink
        to="/"
        class="font-display font-normal text-[28px] tracking-[-0.09em] no-underline"
        :class="solid ? 'text-green-600' : 'text-white'"
      >
        Oscar Palma
      </RouterLink>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm no-underline transition-opacity duration-200 hover:text-green-200"
          :class="solid ? 'text-green-600' : 'text-white'"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-3">
        <RouterLink
          to="/contacto"
          class="btn btn-sm hidden md:inline-flex"
          :class="solid ? 'btn-primary' : 'btn-inverse'"
        >
          Cotizar
        </RouterLink>

        <!-- Hamburger (mobile only) -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-1.5"
          :class="solid ? 'text-ink-900' : 'text-white'"
          aria-label="Menú"
          @click="menuOpen = !menuOpen"
        >
          <span
            class="block w-6 h-px bg-current transition-all duration-300 origin-center"
            :class="menuOpen ? 'rotate-45 translate-y-[7px]' : ''"
          />
          <span
            class="block w-6 h-px bg-current transition-all duration-300"
            :class="menuOpen ? 'opacity-0' : ''"
          />
          <span
            class="block w-6 h-px bg-current transition-all duration-300 origin-center"
            :class="menuOpen ? '-rotate-45 -translate-y-[7px]' : ''"
          />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 bg-beige-100 border-t border-ink-900/10"
      :style="menuOpen ? 'max-height: 320px; opacity: 1' : 'max-height: 0; opacity: 0'"
      style="transition-timing-function: cubic-bezier(0.22,0.61,0.36,1)"
    >
      <div class="flex flex-col px-6 py-4 gap-1">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-ink-900 text-[15px] no-underline py-3 border-b border-ink-900/10 hover:text-green-800 transition-colors"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          to="/contacto"
          class="btn btn-primary mt-4 justify-center"
          @click="menuOpen = false"
        >
          Cotizar mi jardín
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps({ data: Object })

const route    = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const isHome = computed(() => route.name === 'home')
const solid  = computed(() => !isHome.value || scrolled.value)

const links = [
  { to: '/',           label: 'Inicio' },
  { to: '/tipos',      label: 'Tipos de jardín' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/servicios',  label: 'Servicios' },
  { to: '/contacto',   label: 'Contacto' },
]

const onScroll = () => { scrolled.value = window.scrollY > 20 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(() => route.path, () => {
  menuOpen.value = false
})
</script>
