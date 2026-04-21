<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.72);"
      @click.self="close"
    >
      <div class="bg-white w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden" style="box-shadow: 0 24px 60px rgba(0,0,0,0.4);">

        <!-- Header -->
        <div class="flex items-center justify-between px-7 py-5 border-b border-black/10">
          <h2 class="font-display font-normal m-0" style="font-size: 22px; letter-spacing: -0.02em;">Cambiar imagen</h2>
          <button @click="close" class="text-ink-500 hover:text-ink-900 transition-colors bg-transparent border-0 cursor-pointer p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-black/10">
          <button
            v-for="t in tabs"
            :key="t.id"
            @click="activeTab = t.id"
            class="px-6 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px bg-transparent border-x-0 border-t-0 cursor-pointer"
            :style="activeTab === t.id
              ? 'border-color: #2d5a3d; color: #2d5a3d;'
              : 'border-color: transparent; color: #6b7280;'"
          >
            {{ t.label }}
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto p-7">

          <!-- Upload tab -->
          <div v-if="activeTab === 'upload'">
            <label
              class="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-black/20 p-12 cursor-pointer hover:border-green-600 transition-colors"
              :class="dragOver ? 'border-green-600 bg-green-50' : ''"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="onDrop"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span class="text-ink-700" style="font-size: 15px;">Arrastra una foto o haz click para seleccionar</span>
              <span class="text-ink-400" style="font-size: 12px;">JPG, PNG, WebP — máx. 8 MB</span>
              <input type="file" accept="image/*" class="hidden" @change="onFileInput" />
            </label>

            <div v-if="uploadError" class="mt-4 text-red-600 text-sm p-3 border border-red-200 bg-red-50">
              {{ uploadError }}
            </div>
            <div v-if="uploading" class="mt-4 flex items-center gap-2 text-ink-600 text-sm">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
              </svg>
              Subiendo imagen...
            </div>
          </div>

          <!-- Gallery tab -->
          <div v-if="activeTab === 'gallery'">
            <div v-if="loadingGallery" class="flex items-center gap-2 text-ink-500 text-sm py-4">
              Cargando galería...
            </div>
            <div v-else-if="!galleryFiles.length" class="text-ink-500 text-sm py-4">
              No hay imágenes en la galería todavía. Sube una desde la pestaña "Subir foto".
            </div>
            <div v-else class="grid grid-cols-3 gap-3">
              <button
                v-for="file in galleryFiles"
                :key="file.url"
                @click="selectUrl(file.url)"
                class="relative overflow-hidden border-2 transition-all cursor-pointer bg-transparent p-0"
                style="aspect-ratio: 4/3;"
                :style="previewUrl === file.url ? 'border-color: #2d5a3d;' : 'border-color: transparent;'"
              >
                <img :src="file.url" class="w-full h-full object-cover" :alt="file.name" />
                <div
                  v-if="previewUrl === file.url"
                  class="absolute inset-0 flex items-center justify-center"
                  style="background: rgba(45,90,61,0.35);"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

        </div>

        <!-- Preview + confirm footer -->
        <div v-if="previewUrl" class="border-t border-black/10 p-5 flex items-center gap-4">
          <img :src="previewUrl" class="w-20 h-14 object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-ink-700 m-0 text-sm truncate">{{ previewName || previewUrl }}</p>
            <p class="text-green-700 m-0 text-xs mt-0.5">Lista para usar</p>
          </div>
          <button
            @click="confirm"
            class="px-5 py-2.5 text-white font-medium text-sm transition-colors shrink-0"
            style="background: #2d5a3d; border: none; cursor: pointer;"
          >
            Usar esta foto
          </button>
        </div>
        <div v-else class="border-t border-black/10 p-5 flex justify-end">
          <button @click="close" class="px-5 py-2.5 text-sm text-ink-700 border border-black/20 bg-transparent cursor-pointer hover:bg-black/5 transition-colors">
            Cancelar
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../../lib/supabase.js'

const props  = defineProps({ imageKey: String })
const emit   = defineEmits(['confirm', 'close'])

const BUCKET = 'site-images'

const tabs = [
  { id: 'upload',  label: 'Subir foto' },
  { id: 'gallery', label: 'Galería' },
]

const activeTab    = ref('upload')
const previewUrl   = ref('')
const previewName  = ref('')
const dragOver     = ref(false)
const uploading    = ref(false)
const uploadError  = ref('')
const loadingGallery = ref(false)
const galleryFiles   = ref([])

watch(activeTab, (tab) => {
  if (tab === 'gallery' && !galleryFiles.value.length) loadGallery()
})

async function loadGallery() {
  loadingGallery.value = true
  const { data } = await supabase.storage.from(BUCKET).list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
  if (data) {
    galleryFiles.value = data
      .filter(f => f.name !== '.emptyFolderPlaceholder')
      .map(f => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      }))
  }
  loadingGallery.value = false
}

function onDrop(e) {
  dragOver.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) uploadFile(file)
}

function onFileInput(e) {
  const file = e.target.files?.[0]
  if (file) uploadFile(file)
}

async function uploadFile(file) {
  if (file.size > 8 * 1024 * 1024) {
    uploadError.value = 'El archivo supera los 8 MB.'
    return
  }
  uploading.value   = true
  uploadError.value = ''
  const ext  = file.name.split('.').pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
  if (error) {
    uploadError.value = 'Error al subir: ' + error.message
    uploading.value = false
    return
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  previewUrl.value  = data.publicUrl
  previewName.value = file.name
  uploading.value   = false
  // Refresh gallery list
  if (activeTab.value === 'gallery') loadGallery()
}

function selectUrl(url) {
  previewUrl.value  = url
  previewName.value = ''
}

function confirm() {
  if (previewUrl.value) emit('confirm', previewUrl.value)
}

function close() {
  emit('close')
}
</script>
