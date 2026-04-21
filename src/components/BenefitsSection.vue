<template>
  <section class="bg-beige-100 section-pad">
    <div class="container-content">
      <div ref="headerRef" class="max-w-[900px]">
        <p class="eyebrow">Beneficios</p>
        <h2
          class="font-display font-normal text-ink-900 mt-5 mb-4"
          style="font-size: clamp(32px,3.8vw,54px); line-height: 1.08; letter-spacing: -0.02em; text-wrap: balance;"
        >
          Un jardín bien pensado paga solo.
        </h2>
        <p class="text-ink-700" style="font-size: 19px; line-height: 1.55;">
          Lo que obtienes cuando el diseño parte del lugar y no del catálogo.
        </p>
      </div>

      <div ref="gridRef" class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-900/10">
        <div
          v-for="benefit in data.benefits"
          :key="benefit.title"
          class="bg-beige-100 p-9 flex flex-col gap-4 min-h-[220px]"
        >
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F6E52" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
              <path :d="iconPaths[benefit.icon]" />
            </svg>
          </div>
          <h3 class="font-display font-normal text-ink-900 m-0" style="font-size: 24px; letter-spacing: -0.01em;">
            {{ benefit.title }}
          </h3>
          <p class="text-ink-700 m-0 leading-relaxed" style="font-size: 15px;">{{ benefit.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({ data: Object })

const iconPaths = {
  droplet:   'M12 3s6 7.5 6 12a6 6 0 1 1-12 0c0-4.5 6-12 6-12z',
  leaf:      'M20 4c0 10-6 16-16 16 0-10 6-16 16-16zM4 20l10-10',
  house:     'M3 11l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z',
  sparkle:   'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z',
  ruler:     'M3 17L17 3l4 4L7 21l-4-4zM7 13l2 2M11 9l2 2M15 5l2 2',
  handshake: 'M6 11l3-3 3 3 3-3 3 3M3 13l4-4 5 5 5-5 4 4M7 17l5 5 5-5',
}

const headerRef = ref(null)
const gridRef   = ref(null)

useReveal(() => headerRef.value, { y: 24 })
useReveal(() => gridRef.value ? [...gridRef.value.children] : null, { stagger: 0.08, y: 24, start: 'top 85%' })
</script>
