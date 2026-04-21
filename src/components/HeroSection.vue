<template>
  <section
    ref="heroRef"
    id="top"
    class="relative min-h-[92vh] flex items-center px-6 md:px-10 lg:px-16"
    style="padding-top: 120px; padding-bottom: 80px; background-image: linear-gradient(180deg, rgba(22,41,31,0.55) 0%, rgba(22,41,31,0.72) 65%, rgba(22,41,31,0.88) 100%), var(--hero-img); background-size: cover; background-position: center;"
    :style="{ '--hero-img': `url(${data.hero.photo})` }"
  >
    <div class="container-content">
      <div class="max-w-[820px]">
        <p data-hero-eyebrow class="eyebrow-light mb-6">{{ data.hero.eyebrow }}</p>

        <h1
          data-hero-title
          class="font-display font-normal text-white m-0"
          style="font-size: clamp(48px,6.2vw,104px); line-height: 1.02; letter-spacing: -0.025em; text-wrap: balance;"
        >
          {{ data.hero.titleA }}<br />
          <span class="text-green-200">{{ data.hero.titleB }}</span>
        </h1>

        <p
          data-hero-lead
          class="mt-7 mb-10 text-white max-w-[560px]"
          style="font-size: 19px; line-height: 1.55; text-wrap: pretty;"
        >
          {{ data.hero.lead }}
        </p>

        <div data-hero-ctas class="flex gap-4 flex-wrap">
          <button class="btn btn-inverse btn-lg" @click="$emit('cta')">
            {{ data.hero.primaryCta }}
          </button>
          <button class="btn btn-ghost btn-lg" @click="$emit('secondary')">
            {{ data.hero.secondaryCta }}
          </button>
        </div>

        <p style="font-size: 13px; margin-top: 14px; color: rgba(255,255,255,0.55); letter-spacing: 0.02em;">
          Evaluación presencial sin costo · Respuesta en menos de 24h hábiles
        </p>

        <div class="flex flex-wrap gap-7 mt-5 pt-5 border-t border-white/20">
          <div v-for="[val, label] in [['30%','menos consumo hídrico'],['Flora nativa','chilena disponible'],['12 meses','acompañamiento incluido'],['Diseño','completamente a medida']]" :key="label">
            <div class="text-white font-display" style="font-size: 20px; font-weight: 400; letter-spacing: -0.02em; line-height: 1;">{{ val }}</div>
            <div class="mt-1 text-white/60 uppercase tracking-[0.1em]" style="font-size: 11px;">{{ label }}</div>
          </div>
        </div>

        <div
          data-hero-stats
          class="flex gap-10 mt-10 pt-7 border-t border-white/22 flex-wrap"
        >
          <div v-for="[val, label] in data.hero.stats" :key="label">
            <div class="font-display text-white" style="font-size: 34px; font-weight: 400; letter-spacing: -0.02em; line-height: 1;">
              {{ val }}
            </div>
            <div class="mt-2 text-white/80 uppercase tracking-[0.12em]" style="font-size: 12px;">
              {{ label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-white/70 uppercase tracking-[0.2em]" style="font-size: 11px;">
      <span class="w-px h-8 bg-current opacity-60" />
      scroll
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useHeroReveal } from '../composables/useReveal.js'

const props = defineProps({ data: Object })
defineEmits(['cta', 'secondary'])

const heroRef = ref(null)
useHeroReveal(heroRef)
</script>
