<template>
  <div>
    <PageHeader
      eyebrow="Servicios"
      title="Lo que hacemos."
      lead="Desde el diseño hasta la mantención. Cada servicio está pensado para que el jardín funcione bien — y siga funcionando solo."
    />

    <section class="section-pad bg-beige-300">
      <div class="container-content">
        <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="service in data.services"
            :key="service.key"
            class="bg-beige-100 p-8 flex flex-col gap-5"
          >
            <div
              class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-green-500"
              >
                <path :d="iconPaths[service.icon]" />
              </svg>
            </div>

            <div>
              <h2
                class="font-display font-normal text-ink-900 m-0 mb-1"
                style="font-size: 28px; line-height: 1.1; letter-spacing: -0.015em;"
              >
                {{ service.name }}
              </h2>
              <p
                class="font-medium text-green-500 uppercase tracking-wide m-0"
                style="font-size: 11px; letter-spacing: 0.12em;"
              >
                {{ service.tagline }}
              </p>
            </div>

            <p class="text-ink-700 m-0" style="font-size: 16px; line-height: 1.6;">
              {{ service.desc }}
            </p>

            <ul class="list-none p-0 m-0 flex flex-col gap-2 flex-1">
              <li
                v-for="bullet in service.bullets"
                :key="bullet"
                class="flex items-start gap-2.5 text-ink-700"
                style="font-size: 14px; line-height: 1.5;"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-2" />
                {{ bullet }}
              </li>
            </ul>

            <div class="pt-3 border-t border-ink-900/8">
              <RouterLink
                to="/contacto"
                class="text-green-800 font-medium border-b border-green-400 pb-0.5 no-underline hover:text-green-700 transition-colors"
                style="font-size: 14px;"
              >
                Consultar →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-beige-300 px-6 py-12 md:px-10 lg:px-16 border-t border-b border-ink-900/8">
      <div class="container-content">
        <div ref="processRef" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
          <div
            v-for="(step, index) in data.process"
            :key="step.n"
            class="flex flex-col md:flex-row items-start gap-5"
          >
            <div class="flex flex-col flex-1">
              <span
                class="font-display text-green-500 m-0 mb-2"
                style="font-size: 13px; letter-spacing: 0.08em;"
              >
                {{ step.n }}
              </span>
              <h3
                class="font-display font-normal text-ink-900 m-0 mb-1.5"
                style="font-size: 18px; line-height: 1.2; letter-spacing: -0.01em;"
              >
                {{ step.title }}
              </h3>
              <p class="text-ink-700 m-0" style="font-size: 14px; line-height: 1.55;">
                {{ step.desc }}
              </p>
            </div>
            <div
              v-if="index < data.process.length - 1"
              class="hidden md:block w-px h-full bg-ink-900/10 mx-6 self-stretch"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-green-900">
      <div class="container-content">
        <p class="eyebrow-light mb-10">Clientes</p>
        <div ref="testimonialsRef" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="t in data.testimonials"
            :key="t.name"
            class="bg-green-800/40 border border-white/8 p-8 flex flex-col gap-5"
          >
            <p
              class="text-green-100 m-0 flex-1"
              style="font-size: 17px; line-height: 1.65; font-style: italic;"
            >
              "{{ t.quote }}"
            </p>
            <div class="pt-4 border-t border-white/10">
              <p class="text-white font-medium m-0" style="font-size: 15px;">{{ t.name }}</p>
              <p class="text-green-300 m-0" style="font-size: 13px;">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-green-900 border-t border-white/8">
      <div class="container-content">
        <div ref="finalCtaRef" class="flex flex-col items-center text-center gap-6 max-w-[540px] mx-auto">
          <p class="eyebrow-light m-0">Conversemos</p>
          <h2
            class="font-display font-normal text-white m-0"
            style="font-size: clamp(28px, 3.5vw, 44px); line-height: 1.05; letter-spacing: -0.02em; text-wrap: balance;"
          >
            Cuéntanos qué necesitas.
          </h2>
          <p class="text-green-200 m-0" style="font-size: 17px; line-height: 1.55;">
            Te respondemos en menos de 24 horas hábiles con una propuesta inicial.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-2">
            <RouterLink to="/contacto" class="btn btn-inverse btn-lg">
              Solicitar evaluación →
            </RouterLink>
            <a
              :href="`https://wa.me/${data.brand.whatsappRaw}`"
              target="_blank"
              rel="noopener"
              class="btn btn-ghost btn-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter :data="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({ data: Object })

const iconPaths = {
  droplet:   'M12 3s6 7.5 6 12a6 6 0 1 1-12 0c0-4.5 6-12 6-12z',
  leaf:      'M20 4c0 10-6 16-16 16 0-10 6-16 16-16zM4 20l10-10',
  house:     'M3 11l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V11z',
  sparkle:   'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z',
  ruler:     'M3 17L17 3l4 4L7 21l-4-4zM7 13l2 2M11 9l2 2M15 5l2 2',
  handshake: 'M6 11l3-3 3 3 3-3 3 3M3 13l4-4 5 5 5-5 4 4M7 17l5 5 5-5',
  shovel:    'M3 21l6-6m0 0l8-8M9 15l8-8m0 0l2-2a2 2 0 0 0-3-3l-2 2M5 19H3v-2l2-2',
}

const cardsRef = ref(null)
const processRef = ref(null)
const testimonialsRef = ref(null)
const finalCtaRef = ref(null)

useReveal(() => cardsRef.value ? [...cardsRef.value.children] : [], { stagger: 0.08, y: 28 })
useReveal(() => processRef.value ? [...processRef.value.children] : [], { stagger: 0.1, y: 20 })
useReveal(() => testimonialsRef.value ? [...testimonialsRef.value.children] : [], { stagger: 0.1, y: 24 })
useReveal(() => finalCtaRef.value, { y: 24 })
</script>
