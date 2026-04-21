<template>
  <section id="testimonios" class="section-pad" style="background-color: #1F3A2E;">
    <div class="container-content">
      <div ref="headerRef">
        <p class="eyebrow-light">Testimonios</p>
        <h2
          class="font-display font-normal text-white mt-5 mb-0"
          style="font-size: clamp(32px,3.8vw,54px); line-height: 1.08; letter-spacing: -0.02em; text-wrap: balance; max-width: 680px;"
        >
          Lo que dicen quienes ya viven su jardín.
        </h2>
      </div>

      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <blockquote
          v-for="t in data.testimonials"
          :key="t.name"
          class="m-0 p-8 flex flex-col gap-6"
          style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);"
        >
          <div class="font-display text-green-200 leading-none mt-2" style="font-size: 36px;">"</div>
          <p class="text-white m-0 leading-relaxed" style="font-size: 17px; text-wrap: pretty;">
            {{ t.quote }}
          </p>
          <footer class="mt-auto pt-3 border-t border-white/12 flex gap-3 items-center">
            <div class="shrink-0 flex items-center justify-center rounded-full bg-green-700 text-white font-semibold" style="width: 40px; height: 40px; font-size: 13px;">{{ t.initials }}</div>
            <div>
              <div class="text-white font-medium" style="font-size: 14px;">{{ t.name }}</div>
              <div class="text-green-200 uppercase tracking-[0.12em] mt-0.5" style="font-size: 11px;">{{ t.role }}</div>
            </div>
          </footer>
          <div v-if="t.project" class="text-green-200/60 uppercase tracking-[0.1em]" style="font-size: 10px; margin-top: -8px;">{{ t.project }}</div>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({ data: Object })

const headerRef = ref(null)
const cardsRef  = ref(null)

useReveal(() => headerRef.value, { y: 24 })
useReveal(() => cardsRef.value ? [...cardsRef.value.children] : null, { stagger: 0.1, y: 24, start: 'top 85%' })
</script>
