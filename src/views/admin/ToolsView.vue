<template>
  <div class="p-8 max-w-3xl">
    <h1 class="font-display font-normal m-0 mb-1" style="font-size: 28px; letter-spacing: -0.02em;">Herramientas</h1>
    <p class="text-ink-500 m-0 mb-10" style="font-size: 14px;">Edita el contenido visual y textual del sitio directamente.</p>

    <div class="grid gap-4">

      <!-- Edit photos card -->
      <div class="bg-white border border-black/10 p-7 flex items-start gap-6">
        <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background: #e8f0e9;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" stroke-width="1.8">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="font-display font-normal m-0 mb-1" style="font-size: 18px; letter-spacing: -0.01em;">Editar fotos</h2>
          <p class="text-ink-600 m-0 mb-5 leading-relaxed" style="font-size: 14px;">
            Abre el sitio en modo edición. Haz click en cualquier imagen para reemplazarla.
          </p>
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="area in ['Hero principal', 'Tipos de jardín (8)', 'Portafolio (6)']"
              :key="area"
              class="text-green-800 uppercase tracking-[0.1em] px-2.5 py-1 border border-green-200"
              style="font-size: 11px; background: #f0f7f1;"
            >{{ area }}</span>
          </div>
          <div class="flex gap-3">
            <button
              @click="showPreview = true"
              class="flex items-center gap-2 px-4 py-2 border border-black/15 text-ink-700 bg-transparent cursor-pointer hover:bg-black/4 transition-colors"
              style="font-size: 13px;"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Ver imágenes actuales
            </button>
            <button
              @click="openEditMode"
              :disabled="activating"
              class="flex items-center gap-2 px-5 py-2.5 text-white font-medium transition-all"
              style="background: #2d5a3d; border: none; font-size: 14px;"
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
      </div>

      <!-- Edit texts card -->
      <RouterLink
        to="/admin/textos"
        class="bg-white border border-black/10 p-7 flex items-start gap-6 no-underline hover:border-green-700 transition-colors group"
      >
        <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background: #e8f0e9;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" stroke-width="1.8">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="font-display font-normal m-0 mb-1 text-ink-900 group-hover:text-green-800 transition-colors" style="font-size: 18px; letter-spacing: -0.01em;">Editar textos</h2>
          <p class="text-ink-600 m-0 leading-relaxed" style="font-size: 14px;">
            Modifica títulos, subtítulos, CTAs y textos del hero desde el panel. Los cambios se guardan en Supabase y se aplican al sitio sin redesplegar.
          </p>
        </div>
        <svg class="shrink-0 text-ink-300 group-hover:text-green-700 transition-colors mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </RouterLink>

      <!-- Image inventory -->
      <div class="bg-white border border-black/10 p-7">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="font-display font-normal m-0 mb-0.5" style="font-size: 18px; letter-spacing: -0.01em;">Inventario de imágenes</h2>
            <p class="text-ink-400 m-0" style="font-size: 13px;">Imágenes personalizadas activas en el sitio</p>
          </div>
          <button @click="loadImages" class="text-ink-400 hover:text-ink-900 bg-transparent border-0 cursor-pointer p-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </button>
        </div>

        <div v-if="inventoryLoading" class="text-ink-400 text-sm text-center py-6">Cargando...</div>
        <div v-else-if="!inventory.length" class="text-ink-400 text-sm py-4 text-center border border-dashed border-black/10">
          No hay imágenes personalizadas. Se usan las imágenes por defecto del sitio.
        </div>
        <div v-else class="divide-y divide-black/6">
          <div v-for="img in inventory" :key="img.key" class="flex items-center gap-4 py-4">
            <div class="w-16 h-12 overflow-hidden shrink-0 bg-black/5">
              <img :src="img.url" :alt="img.label" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="m-0 font-medium text-ink-900 truncate" style="font-size: 14px;">{{ img.label }}</p>
              <p class="m-0 text-ink-400" style="font-size: 12px;">Actualizada {{ formatRelative(img.updated_at) }}</p>
            </div>
            <button
              @click="restoreImage(img.key)"
              :disabled="restoring === img.key"
              class="px-3 py-1.5 border border-black/10 text-ink-600 bg-transparent cursor-pointer hover:border-red-300 hover:text-red-600 transition-colors shrink-0"
              style="font-size: 12px;"
            >
              {{ restoring === img.key ? 'Restaurando...' : 'Restaurar original' }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Preview modal -->
    <PreviewModal
      v-if="showPreview"
      @close="showPreview = false"
      @activate="showPreview = false; openEditMode()"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePhotoEditor } from '../../composables/usePhotoEditor.js'
import { supabase } from '../../lib/supabase.js'
import PreviewModal from '../../components/admin/PreviewModal.vue'

const router    = useRouter()
const editor    = usePhotoEditor()
const activating = ref(false)
const showPreview = ref(false)

const inventory       = ref([])
const inventoryLoading = ref(false)
const restoring        = ref(null)

const labelMap = {
  hero: 'Hero principal',
  type_lowwater:    'Jardín: Bajo consumo',
  type_ornamental:  'Jardín: Ornamental',
  type_zen:         'Jardín: Zen / Asiático',
  type_seasonal:    'Jardín: Por estación',
  type_allseason:   'Jardín: Todo el año',
  type_sustainable: 'Jardín: Sustentable',
  type_lowmaint:    'Jardín: Bajo mantención',
  type_mixed:       'Jardín: Mixto',
}

function getLabel(key) {
  if (labelMap[key]) return labelMap[key]
  if (key.startsWith('portfolio_')) return `Portafolio #${parseInt(key.split('_')[1]) + 1}`
  return key
}

function formatRelative(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000
  if (diff < 3600)  return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`
  return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
}

async function loadImages() {
  inventoryLoading.value = true
  const { data } = await supabase.from('site_images').select('key, url, updated_at').order('updated_at', { ascending: false })
  inventory.value = (data || []).map(r => ({ ...r, label: getLabel(r.key) }))
  inventoryLoading.value = false
}

async function restoreImage(key) {
  if (!confirm(`¿Restaurar "${getLabel(key)}" a la imagen original del sitio?`)) return
  restoring.value = key
  await supabase.from('site_images').delete().eq('key', key)
  delete editor.state.loaded[key]
  delete editor.state.pending[key]
  inventory.value = inventory.value.filter(i => i.key !== key)
  restoring.value = null
}

async function openEditMode() {
  activating.value = true
  editor.activate()
  await new Promise(r => setTimeout(r, 400))
  router.push('/?edit=photos')
}

onMounted(loadImages)
</script>
