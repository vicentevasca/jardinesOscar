<template>
  <section ref="sectionRef" class="section-pad text-center" style="background-color: #16291F;">
    <div class="container-content">
      <div class="max-w-[900px] mx-auto">
        <p class="eyebrow-light">Da el primer paso</p>
        <h2
          class="font-display font-normal text-white mt-5 mb-6"
          style="font-size: clamp(40px,5.5vw,78px); line-height: 1.02; letter-spacing: -0.025em; text-wrap: balance;"
        >
          Convierte tu patio en un jardín que dure décadas.
        </h2>
        <p class="text-green-200 mx-auto mb-9 max-w-[620px]" style="font-size: 19px; line-height: 1.55;">
          Solicita tu evaluación gratuita hoy. Diseñamos, construimos y te acompañamos el primer año.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <button class="btn btn-inverse btn-lg" @click="$emit('cta')">Solicitar evaluación</button>
          <a :href="`https://wa.me/${data.brand.whatsappRaw}`" class="btn btn-ghost btn-lg">
            WhatsApp {{ data.brand.whatsapp }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'

defineProps({ data: Object })
defineEmits(['cta'])

const sectionRef = ref(null)
useReveal(() => sectionRef.value?.querySelector('.container-content'), { y: 24 })
</script>
