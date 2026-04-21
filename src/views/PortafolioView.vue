<template>
  <div>
    <PageHeader
      :dark="true"
      eyebrow="Portafolio"
      title="Jardines entregados."
      lead="Seis años de proyectos en la Región Metropolitana — cada uno diseñado desde cero para el lugar y las personas que lo habitan."
    />

    <section class="section-pad" style="background-color: #16291F;">
      <div class="container-content">
        <div ref="filterRef" class="flex flex-wrap gap-2.5 mb-12">
          <button
            v-for="f in filters"
            :key="f"
            class="px-4 py-2 rounded-full transition-all duration-200 font-medium cursor-pointer border"
            :class="
              activeFilter === f
                ? 'bg-green-800 text-white border-green-800'
                : 'bg-transparent text-ink-700 border-ink-900/20 hover:border-ink-900/40'
            "
            style="font-size: 13px;"
            @click="activeFilter = f"
          >
            {{ f }}
          </button>
        </div>

        <div ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in filteredPortfolio"
            :key="item.title"
            class="group relative overflow-hidden rounded-sm cursor-pointer"
            style="aspect-ratio: 3/4;"
          >
            <img
              :src="item.photo"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"
            />
            <div class="absolute inset-0 flex flex-col justify-end p-6">
              <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div
                  class="inline-block bg-green-500/30 border border-green-400/40 text-white rounded-sm px-2.5 py-0.5 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;"
                >
                  {{ item.style }} · {{ item.year }}
                </div>
                <h3
                  class="font-display font-normal text-white m-0"
                  style="font-size: clamp(20px, 2.2vw, 26px); line-height: 1.1; letter-spacing: -0.015em;"
                >
                  {{ item.title }}
                </h3>
                <p class="text-green-200 m-0 mt-1" style="font-size: 13px;">
                  {{ item.size }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad bg-beige-100">
      <div class="container-content">
        <div ref="ctaRef" class="flex flex-col items-center text-center gap-6 max-w-[560px] mx-auto">
          <p class="eyebrow m-0">¿Te gustó lo que viste?</p>
          <h2
            class="font-display font-normal text-ink-900 m-0"
            style="font-size: clamp(28px, 3.5vw, 44px); line-height: 1.05; letter-spacing: -0.02em; text-wrap: balance;"
          >
            Cuéntanos tu espacio y diseñamos algo así para ti.
          </h2>
          <div class="flex flex-col sm:flex-row gap-4 mt-2">
            <RouterLink to="/contacto" class="btn btn-primary btn-lg">
              Solicitar evaluación →
            </RouterLink>
            <a
              :href="`https://wa.me/${data.brand.whatsappRaw}`"
              target="_blank"
              rel="noopener"
              class="btn btn-secondary btn-lg"
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
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { useReveal } from '../composables/useReveal.js'

const props = defineProps({ data: Object })

const activeFilter = ref('Todos')

const filters = computed(() => {
  const styles = props.data.portfolio.map((p) => p.style)
  return ['Todos', ...new Set(styles)]
})

const filteredPortfolio = computed(() => {
  if (activeFilter.value === 'Todos') return props.data.portfolio
  return props.data.portfolio.filter((p) => p.style === activeFilter.value)
})

const filterRef = ref(null)
const gridRef = ref(null)
const ctaRef = ref(null)

useReveal(() => filterRef.value, { y: 20 })
useReveal(() => gridRef.value ? [...gridRef.value.children] : [], { stagger: 0.08, y: 28 })
useReveal(() => ctaRef.value, { y: 24 })
</script>
