<template>
  <div>
    <PageHeader
      eyebrow="Tipos de jardín"
      title="Ocho formas de pensar tu jardín."
      lead="Cada espacio pide un enfoque distinto. Elegimos el estilo según tu lugar, clima y forma de vivirlo —o combinamos varios."
    />

    <section class="section-pad bg-beige-300">
      <div class="container-content">
        <div ref="rowsRef">
          <div
            v-for="(type, index) in data.types"
            :key="type.key"
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 border-b border-ink-900/8 last:border-b-0"
            :class="index % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-last'"
          >
            <div class="relative overflow-hidden rounded-sm shadow-lg">
              <img
                :src="type.photo"
                :alt="type.name"
                class="w-full object-cover"
                style="aspect-ratio: 4/3;"
                loading="lazy"
              />
            </div>

            <div class="flex flex-col gap-5">
              <div>
                <span
                  class="inline-block bg-green-100 text-green-800 rounded-sm px-3 py-1 font-medium"
                  style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;"
                >
                  {{ type.tag }}
                </span>
              </div>

              <h2
                class="font-display font-normal text-ink-900 m-0"
                style="font-size: clamp(28px, 3.5vw, 44px); line-height: 1.08; letter-spacing: -0.02em;"
              >
                {{ type.name }}
              </h2>

              <p class="text-ink-700 m-0" style="font-size: 18px; line-height: 1.55;">
                {{ type.desc }}
              </p>

              <p class="text-ink-700 m-0" style="font-size: 16px; line-height: 1.65;">
                {{ type.detail }}
              </p>

              <ul class="list-none p-0 m-0 flex flex-col gap-2">
                <li
                  v-for="bullet in type.bullets"
                  :key="bullet"
                  class="flex items-center gap-2.5 text-ink-700"
                  style="font-size: 15px;"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"
                  />
                  {{ bullet }}
                </li>
              </ul>

              <p class="text-ink-500 m-0 pt-1" style="font-size: 14px;">
                <span class="font-medium text-ink-700">Ideal para:</span> {{ type.for }}
              </p>

              <div class="pt-2">
                <RouterLink to="/contacto" class="btn btn-primary">
                  Cotizar este estilo →
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-green-800">
      <div class="container-content">
        <div ref="ctaBannerRef" class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p class="eyebrow-light m-0 mb-3">¿Dudas?</p>
            <h2
              class="font-display font-normal text-white m-0"
              style="font-size: clamp(28px, 3.5vw, 48px); line-height: 1.05; letter-spacing: -0.02em;"
            >
              ¿No sabes cuál elegir?<br />Te ayudamos.
            </h2>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 shrink-0">
            <RouterLink to="/contacto" class="btn btn-inverse btn-lg">
              Solicitar asesoría
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

const rowsRef = ref(null)
const ctaBannerRef = ref(null)

useReveal(() => rowsRef.value ? [...rowsRef.value.children] : [], { stagger: 0.1, y: 28 })
useReveal(() => ctaBannerRef.value, { y: 24 })
</script>
