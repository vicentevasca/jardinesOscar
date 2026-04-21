<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background: rgba(0,0,0,0.6);"
    @click.self="$emit('close')"
  >
    <div class="bg-white w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
      <!-- Header -->
      <div class="px-7 py-5 border-b border-black/10 flex items-center justify-between">
        <div>
          <h2 class="font-display font-normal m-0" style="font-size: 20px; letter-spacing: -0.02em;">Vista previa de imágenes actuales</h2>
          <p class="text-ink-400 m-0 mt-0.5" style="font-size: 12px;">Imágenes personalizadas activas en el sitio</p>
        </div>
        <button @click="$emit('close')" class="text-ink-400 hover:text-ink-900 bg-transparent border-0 cursor-pointer p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-7">
        <div v-if="loading" class="text-ink-400 text-sm text-center py-10">Cargando imágenes...</div>
        <div v-else-if="!images.length" class="text-ink-400 text-sm text-center py-10">
          <p class="m-0">No hay imágenes personalizadas — se usan las imágenes por defecto del sitio.</p>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="img in images" :key="img.key" class="flex flex-col gap-2">
            <div class="aspect-video overflow-hidden bg-black/5 relative">
              <img :src="img.url" :alt="img.label" class="w-full h-full object-cover" />
            </div>
            <div>
              <p class="m-0 font-medium text-ink-900" style="font-size: 13px;">{{ img.label }}</p>
              <p class="m-0 text-ink-400" style="font-size: 11px;">{{ formatRelative(img.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-7 py-4 border-t border-black/10 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-5 py-2 border border-black/15 text-ink-700 bg-transparent cursor-pointer hover:bg-black/4 transition-colors" style="font-size: 14px;">
          Cerrar
        </button>
        <button @click="$emit('activate')" class="px-5 py-2 text-white font-medium cursor-pointer transition-opacity hover:opacity-80" style="background: #2d5a3d; border: none; font-size: 14px;">
          Activar modo edición
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase.js'

defineEmits(['close', 'activate'])

const images  = ref([])
const loading = ref(true)

const labelMap = {
  hero: 'Hero principal',
  type_lowwater:   'Jardín: Bajo consumo',
  type_ornamental: 'Jardín: Ornamental',
  type_zen:        'Jardín: Zen / Asiático',
  type_seasonal:   'Jardín: Por estación',
  type_allseason:  'Jardín: Todo el año',
  type_sustainable:'Jardín: Sustentable',
  type_lowmaint:   'Jardín: Bajo mantención',
  type_mixed:      'Jardín: Mixto',
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

onMounted(async () => {
  const { data } = await supabase.from('site_images').select('key, url, updated_at').order('updated_at', { ascending: false })
  images.value = (data || []).map(r => ({ ...r, label: getLabel(r.key) }))
  loading.value = false
})
</script>
