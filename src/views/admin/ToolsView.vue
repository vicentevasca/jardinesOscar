<template>
  <div class="p-8 max-w-3xl">
    <h1 class="font-display font-normal m-0 mb-1" style="font-size: 28px; letter-spacing: -0.02em;">Herramientas</h1>
    <p class="text-ink-500 m-0 mb-10" style="font-size: 14px;">Edita el contenido visual del sitio directamente.</p>

    <div class="grid gap-4">
      <!-- Edit photos card -->
      <div class="bg-white border border-black/10 p-7 flex items-start gap-6">
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style="background: #e8f0e9;"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" stroke-width="1.8">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="font-display font-normal m-0 mb-1" style="font-size: 18px; letter-spacing: -0.01em;">Editar fotos</h2>
          <p class="text-ink-600 m-0 mb-5 leading-relaxed" style="font-size: 14px;">
            Abre el sitio en modo edición. Haz click en cualquier imagen — hero, tipos de jardín o portafolio — para reemplazarla con una foto de tu galería.
          </p>
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="area in ['Hero principal', 'Tipos de jardín (8)', 'Portafolio (6)']"
              :key="area"
              class="text-green-800 uppercase tracking-[0.1em] px-2.5 py-1 border border-green-200"
              style="font-size: 11px; background: #f0f7f1;"
            >
              {{ area }}
            </span>
          </div>
          <button
            @click="openEditMode"
            :disabled="activating"
            class="flex items-center gap-2 px-5 py-2.5 text-white font-medium transition-all"
            style="background: #2d5a3d; border: none; font-size: 14px; cursor: pointer;"
            :style="activating ? 'opacity:0.7;cursor:not-allowed' : 'cursor:pointer'"
          >
            <svg v-if="activating" class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            {{ activating ? 'Abriendo sitio...' : 'Activar modo edición' }}
          </button>
        </div>
      </div>

      <!-- Placeholder future tools -->
      <div class="bg-white border border-black/6 p-7 flex items-start gap-6 opacity-50" title="Próximamente disponible">
        <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background: #f5f4f1;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.8">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
        <div>
          <h2 class="font-display font-normal m-0 mb-1" style="font-size: 18px; letter-spacing: -0.01em; color: #9ca3af;">Editar textos</h2>
          <p class="m-0" style="font-size: 13px; color: #9ca3af;">Próximamente — editar títulos, descripciones y CTAs directamente.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoEditor } from '../../composables/usePhotoEditor.js'

const router    = useRouter()
const editor    = usePhotoEditor()
const activating = ref(false)

async function openEditMode() {
  activating.value = true
  editor.activate()
  await new Promise(r => setTimeout(r, 400))
  router.push('/?edit=photos')
}
</script>
