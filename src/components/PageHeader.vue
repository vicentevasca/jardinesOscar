<template>
  <section
    class="section-pad pt-36 pb-16 lg:pt-44 lg:pb-20"
    :class="dark ? 'bg-green-900 text-white' : 'bg-beige-100'"
  >
    <div class="container-content">
      <div ref="headerRef" class="max-w-[820px]">
        <p class="eyebrow" :class="dark ? 'eyebrow-light' : 'eyebrow'">{{ eyebrow }}</p>
        <h1
          class="font-display font-normal mt-5 mb-0"
          :class="dark ? 'text-white' : 'text-ink-900'"
          style="font-size: clamp(40px,5.5vw,80px); line-height: 1.02; letter-spacing: -0.025em; text-wrap: balance;"
        >
          {{ title }}
        </h1>
        <p
          v-if="lead"
          class="mt-6 max-w-[620px]"
          :class="dark ? 'text-green-200' : 'text-ink-700'"
          style="font-size: 19px; line-height: 1.55; text-wrap: pretty;"
        >
          {{ lead }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({
  eyebrow: String,
  title:   String,
  lead:    String,
  dark:    { type: Boolean, default: false },
})

const headerRef = ref(null)
useReveal(() => headerRef.value, { y: 28, delay: 0.1 })
</script>
