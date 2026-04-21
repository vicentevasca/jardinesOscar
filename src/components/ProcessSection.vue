<template>
  <section id="proceso" class="bg-beige-300 section-pad">
    <div class="container-content">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <div ref="stickyRef" class="lg:sticky lg:top-24 mb-10 lg:mb-0">
          <p class="eyebrow">Proceso</p>
          <h2
            class="font-display font-normal text-ink-900 mt-5 mb-4"
            style="font-size: clamp(32px,3.8vw,54px); line-height: 1.08; letter-spacing: -0.02em; text-wrap: balance;"
          >
            Cuatro pasos. Cero sorpresas.
          </h2>
          <p class="text-ink-700" style="font-size: 19px; line-height: 1.55; max-width: 480px;">
            Una metodología clara para que sepas exactamente qué esperar, desde la primera visita hasta un año después.
          </p>
        </div>

        <ol ref="stepsRef" class="list-none p-0 m-0 flex flex-col">
          <li
            v-for="(step, i) in data.process"
            :key="step.n"
            class="grid gap-6 py-8"
            style="grid-template-columns: 80px 1fr;"
            :class="[
              i === 0 ? 'border-t border-ink-900/18' : 'border-t border-ink-900/10',
              i === data.process.length - 1 ? 'border-b border-ink-900/18' : ''
            ]"
          >
            <div class="font-display text-green-500" style="font-size: 40px; font-weight: 400; letter-spacing: -0.02em; line-height: 1;">
              {{ step.n }}
            </div>
            <div>
              <h3 class="font-display font-normal text-ink-900 m-0" style="font-size: 30px; letter-spacing: -0.02em;">
                {{ step.title }}
              </h3>
              <p class="text-ink-700 mt-2.5 mb-0 max-w-[560px]" style="font-size: 16px; line-height: 1.55;">
                {{ step.desc }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({ data: Object })

const stickyRef = ref(null)
const stepsRef  = ref(null)

useReveal(() => stickyRef.value, { y: 24 })
useReveal(() => stepsRef.value ? [...stepsRef.value.children] : null, { stagger: 0.1, y: 20, start: 'top 85%' })
</script>
