<template>
  <footer class="px-6 pt-20 pb-10 md:px-10 lg:px-16 border-t border-white/12" style="background-color: #16291F;">
    <div class="container-content">
      <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
        <div>
          <img src="/assets/wordmark-inverse.svg" alt="Oscar Palma" class="w-64 mb-5" />
          <p class="text-green-200 max-w-[360px] m-0" style="font-size: 15px; line-height: 1.6;">
            Estudio de paisajismo y jardinería en la Región Metropolitana. Diseñamos jardines que envejecen bien — y paisajismo que suma valor a tu propiedad.
          </p>
        </div>

        <div>
          <div class="uppercase tracking-[0.14em] text-green-200 mb-4" style="font-size: 11px;">Navegación</div>
          <ul class="text-green-200 list-none p-0 m-0 flex flex-col gap-2.5">
            <li v-for="link in navLinks" :key="link.label">
              <a :href="link.href" class="text-white/88 no-underline hover:text-white transition-colors" style="font-size: 14px;">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div class="uppercase tracking-[0.14em] text-green-200 mb-4" style="font-size: 11px;">Tipos</div>
          <ul class="text-green-200 list-none p-0 m-0 flex flex-col gap-2.5">
            <li v-for="type in data.types.slice(0, 5)" :key="type.key">
              <a href="#tipos" class="text-white/88 no-underline hover:text-white transition-colors" style="font-size: 14px;">
                {{ type.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div class="uppercase tracking-[0.14em] text-green-200 mb-4" style="font-size: 11px;">Contacto</div>
          <ul class="text-green-200 list-none p-0 m-0 flex flex-col gap-2.5">
            <li>
              <a :href="data.brand.whatsappUrl" class="text-white/88 no-underline hover:text-white transition-colors" style="font-size: 14px;">
                WhatsApp · {{ data.brand.whatsapp }}
              </a>
            </li>
            <li>
              <a :href="`mailto:${data.brand.email}`" class="text-white/88 no-underline hover:text-white transition-colors" style="font-size: 14px;">
                {{ data.brand.email }}
              </a>
            </li>
            <li>
              <span class="text-white/88" style="font-size: 14px;">{{ data.brand.location }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 mb-6 text-green-200/60" style="font-size: 12px; line-height: 1.6;">
        Atendemos en: {{ data.brand.coverage }}
      </div>
      <div class="pt-7 border-t border-white/14 flex justify-between items-center flex-wrap gap-4 text-green-200 tracking-[0.06em]" style="font-size: 12px;">
        <span>© {{ year }} OSCAR PALMA · LANDSCAPE & GARDEN STUDIO</span>
        <div class="flex items-center gap-4">
          <span>SANTIAGO · CHILE</span>
          <!-- Discrete admin access — only visible on hover -->
          <RouterLink
            to="/login"
            title="Administración"
            class="transition-opacity no-underline"
            style="opacity: 0.18; color: inherit;"
            @mouseenter="e => e.currentTarget.style.opacity = '0.55'"
            @mouseleave="e => e.currentTarget.style.opacity = '0.18'"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({ data: Object })

const year = new Date().getFullYear()

const navLinks = [
  { label: 'Inicio', href: '#top' },
  { label: 'Tipos de jardín', href: '#tipos' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#form' },
]
</script>
