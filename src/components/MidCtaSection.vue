<template>
  <section
    ref="sectionRef"
    class="relative section-pad text-center"
    style="background-image: linear-gradient(180deg, rgba(22,41,31,0.68), rgba(22,41,31,0.80)), url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1800&q=80); background-size: cover; background-position: center;"
  >
    <div class="container-content">
      <div class="max-w-[780px] mx-auto">
        <p class="eyebrow-light">Cuéntanos tu idea</p>
        <h2
          class="font-display font-normal text-white mt-5 mb-6"
          style="font-size: clamp(36px,5vw,64px); line-height: 1.05; letter-spacing: -0.025em; text-wrap: balance;"
        >
          Transforma tu espacio exterior en el lugar favorito de tu casa.
        </h2>
        <p class="text-green-200 mx-auto mb-9 max-w-[560px]" style="font-size: 18px; line-height: 1.55;">
          Evaluación presencial sin costo. Te respondemos en menos de 24 horas hábiles.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <button class="btn btn-inverse btn-lg" @click="$emit('cta')">Solicitar evaluación</button>
          <a :href="`https://wa.me/${data.brand.whatsappRaw}`" class="btn btn-ghost btn-lg">
            Escribir por WhatsApp
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
