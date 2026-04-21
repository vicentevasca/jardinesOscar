<template>
  <section class="bg-beige-100 section-pad">
    <div class="container-content">
      <p ref="eyebrowRef" class="eyebrow">{{ data.trust.eyebrow }}</p>
      <h2
        ref="titleRef"
        class="font-display font-normal text-ink-900 mt-5 mb-0"
        style="font-size: clamp(32px,3.8vw,54px); line-height: 1.08; letter-spacing: -0.02em; text-wrap: balance; max-width: 900px;"
      >
        {{ data.trust.title }}
      </h2>

      <div ref="metricsRef" class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
        <div
          v-for="[val, label] in data.trust.metrics"
          :key="label"
          class="border-t border-ink-900/14 pt-5"
        >
          <div class="font-display text-green-800" style="font-size: 52px; font-weight: 400; letter-spacing: -0.02em; line-height: 1;">
            {{ val }}
          </div>
          <div class="text-ink-700 mt-2.5 max-w-[180px]" style="font-size: 13px;">
            {{ label }}
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-ink-900/10 flex justify-between items-center flex-wrap gap-5">
        <div class="uppercase tracking-[0.16em] text-ink-500" style="font-size: 11px;">Nos han confiado</div>
        <div ref="logosRef" class="flex gap-8 flex-wrap">
          <div
            v-for="logo in data.trust.logos"
            :key="logo.name"
            class="flex flex-col gap-1"
          >
            <span class="font-body font-semibold uppercase tracking-[0.14em] text-ink-700" style="font-size: 13px; opacity: 0.55;">{{ logo.name }}</span>
            <span class="text-ink-400 tracking-[0.04em]" style="font-size: 11px;">{{ logo.context }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({ data: Object })

const eyebrowRef = ref(null)
const titleRef   = ref(null)
const metricsRef = ref(null)
const logosRef   = ref(null)

useReveal(() => [eyebrowRef.value, titleRef.value], { stagger: 0.12 })
useReveal(() => metricsRef.value?.querySelectorAll('div > div:first-child')?.length
  ? [...metricsRef.value.children] : null,
  { stagger: 0.08, start: 'top 88%' })
useReveal(() => logosRef.value ? [...logosRef.value.children] : null, { stagger: 0.06, y: 16 })
</script>
