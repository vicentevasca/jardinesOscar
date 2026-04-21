<template>
  <section id="tipos" class="bg-beige-300 section-pad">
    <div class="container-content">
      <div ref="headerRef" class="max-w-[900px]">
        <p class="eyebrow">Tipos de jardín</p>
        <h2
          class="font-display font-normal text-ink-900 mt-5 mb-4"
          style="font-size: clamp(32px,3.8vw,54px); line-height: 1.08; letter-spacing: -0.02em; text-wrap: balance;"
        >
          Ocho formas de pensar tu jardín.
        </h2>
        <p class="text-ink-700 max-w-[680px]" style="font-size: 19px; line-height: 1.55;">
          Cada espacio pide un enfoque distinto. Estos son los estilos que más diseñamos —y podemos combinarlos según tu lugar, clima y forma de vivirlo.
        </p>
      </div>

      <div ref="cardsRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <article
          v-for="type in data.types"
          :key="type.key"
          class="bg-beige-100 flex flex-col cursor-pointer transition-all duration-500"
          style="transition-timing-function: cubic-bezier(0.22,0.61,0.36,1)"
          :class="hoveredKey === type.key ? 'shadow-elev-2 -translate-y-1' : 'shadow-elev-1 translate-y-0'"
          @mouseenter="hoveredKey = type.key"
          @mouseleave="hoveredKey = null"
        >
          <div class="relative overflow-hidden group/card" style="aspect-ratio: 4/3;">
            <div
              class="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style="transition-timing-function: cubic-bezier(0.22,0.61,0.36,1)"
              :style="{
                backgroundImage: `url(${editor.getImage('type_' + type.key, type.photo)})`,
                transform: hoveredKey === type.key ? 'scale(1.06)' : 'scale(1)'
              }"
            />
            <div class="absolute top-3.5 left-3.5 bg-beige-100/92 text-green-800 uppercase tracking-[0.12em] px-2.5 py-1.5" style="font-size: 11px;">
              {{ type.tag }}
            </div>
            <!-- Edit overlay -->
            <button
              v-if="editor.state.active"
              @click.stop="editor.startPicking('type_' + type.key)"
              class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity w-full border-0 cursor-pointer"
              style="background: rgba(0,0,0,0.5);"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span class="text-white font-medium" style="font-size: 12px;">Cambiar foto</span>
            </button>
          </div>

          <div class="p-6 flex flex-col gap-3 flex-1">
            <h3 class="font-display font-normal text-ink-900 m-0" style="font-size: 24px; letter-spacing: -0.01em;">
              {{ type.name }}
            </h3>
            <p class="text-ink-700 m-0 leading-relaxed" style="font-size: 14px;">{{ type.desc }}</p>
            <ul class="list-none p-0 m-0 mt-1 flex flex-col gap-1">
              <li
                v-for="b in type.bullets"
                :key="b"
                class="flex items-center gap-2 text-ink-700"
                style="font-size: 13px;"
              >
                <span class="w-1 h-1 rounded-full bg-green-500 shrink-0" />
                {{ b }}
              </li>
            </ul>
            <div class="mt-auto pt-4">
              <button
                class="text-green-800 font-medium border-b border-green-400 pb-0.5 cursor-pointer bg-transparent border-x-0 border-t-0"
                style="font-size: 13px;"
                @click="$emit('quote', type.key)"
              >
                Cotizar este estilo →
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import { usePhotoEditor } from '../composables/usePhotoEditor.js'

defineProps({ data: Object })
defineEmits(['quote'])

const hoveredKey = ref(null)
const headerRef  = ref(null)
const cardsRef   = ref(null)
const editor     = usePhotoEditor()

useReveal(() => headerRef.value, { y: 24 })
useReveal(() => cardsRef.value ? [...cardsRef.value.children] : null, { stagger: 0.07, y: 28, start: 'top 85%' })
</script>
