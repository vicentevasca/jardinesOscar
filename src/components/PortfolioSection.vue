<template>
  <section id="portafolio" class="section-pad" style="background-color: #16291F;">
    <div class="container-content">
      <div ref="headerRef" class="flex justify-between items-end gap-10 flex-wrap mb-14">
        <div class="max-w-[680px]">
          <p class="eyebrow-light">Portafolio</p>
          <h2
            class="font-display font-normal text-white mt-5 mb-4"
            style="font-size: clamp(32px,3.8vw,54px); line-height: 1.08; letter-spacing: -0.02em;"
          >
            Jardines entregados.
          </h2>
          <p class="text-green-200" style="font-size: 19px; line-height: 1.55;">
            Una muestra de proyectos recientes en la Región Metropolitana.
          </p>
        </div>
        <RouterLink to="/portafolio" class="btn btn-inverse btn-sm shrink-0">
          Ver todos los proyectos
        </RouterLink>
      </div>

      <!-- Desktop masonry -->
      <div ref="gridRef" class="hidden md:grid gap-4" style="grid-template-columns: repeat(6,1fr); grid-auto-rows: 220px;">
        <figure
          v-for="(project, i) in data.portfolio"
          :key="project.title"
          class="relative m-0 overflow-hidden cursor-pointer group"
          :style="{
            gridColumn: spans[i]?.col,
            gridRow: spans[i]?.row,
            backgroundImage: `url(${editor.getImage('portfolio_' + i, project.photo)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <div
            class="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
            style="background: linear-gradient(180deg, rgba(22,41,31,0) 40%, rgba(22,41,31,0.82) 100%); opacity: 0.7;"
          />
          <figcaption class="absolute inset-0 flex flex-col justify-end p-5 text-white" :style="editor.state.active ? 'z-20' : ''">
            <div class="uppercase tracking-[0.12em] text-green-200" style="font-size: 11px;">
              {{ project.style }} · {{ project.year }}
            </div>
            <div class="font-display mt-1" style="font-size: 22px; font-weight: 400; letter-spacing: -0.01em;">
              {{ project.title }}
            </div>
            <div class="text-white/80 mt-0.5" style="font-size: 12px;">{{ project.size }}</div>
          </figcaption>
          <!-- Edit overlay -->
          <button
            v-if="editor.state.active"
            @click.stop="editor.startPicking('portfolio_' + i)"
            class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity w-full border-0 cursor-pointer"
            style="background: rgba(0,0,0,0.5);"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span class="text-white font-medium bg-black/40 px-3 py-1" style="font-size: 13px;">Cambiar foto</span>
          </button>
        </figure>
      </div>

      <!-- Mobile 2-col grid -->
      <div class="md:hidden grid grid-cols-2 gap-3">
        <figure
          v-for="(project, i) in data.portfolio"
          :key="project.title + '-m'"
          class="relative m-0 overflow-hidden cursor-pointer group"
          style="aspect-ratio: 3/4;"
          :style="{ backgroundImage: `url(${editor.getImage('portfolio_' + i, project.photo)})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <div
            class="absolute inset-0"
            style="background: linear-gradient(180deg, rgba(22,41,31,0) 40%, rgba(22,41,31,0.85) 100%);"
          />
          <figcaption class="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <div class="uppercase tracking-[0.1em] text-green-200" style="font-size: 10px;">{{ project.year }}</div>
            <div class="font-display mt-1 leading-tight" style="font-size: 16px; font-weight: 400;">{{ project.title }}</div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import { usePhotoEditor } from '../composables/usePhotoEditor.js'

defineProps({ data: Object })

const editor = usePhotoEditor()

const spans = [
  { col: 'span 3', row: 'span 2' },
  { col: 'span 3', row: 'span 1' },
  { col: 'span 3', row: 'span 1' },
  { col: 'span 2', row: 'span 2' },
  { col: 'span 2', row: 'span 2' },
  { col: 'span 2', row: 'span 2' },
]

const headerRef = ref(null)
const gridRef   = ref(null)

useReveal(() => headerRef.value, { y: 24 })
useReveal(() => gridRef.value ? [...gridRef.value.children] : null, { stagger: 0.06, y: 20, start: 'top 88%' })
</script>
