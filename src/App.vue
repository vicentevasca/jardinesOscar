<template>
  <div :style="editor.state.active ? 'padding-top: 46px' : ''">
    <!-- Edit mode banner -->
    <EditModeBanner
      v-if="editor.state.active"
      :pending-count="pendingCount"
      :saving="editor.state.saving"
      @save="handleSave"
      @cancel="handleCancel"
    />

    <!-- Hide public nav on admin and login routes -->
    <SiteNav v-if="showPublicNav" :data="data" />
    <RouterView :data="data" />
    <WhatsAppFab v-if="showPublicNav && !editor.state.active" :data="data" />

    <!-- Image picker modal -->
    <ImagePickerModal
      v-if="editor.state.picking"
      :image-key="editor.state.picking"
      @confirm="onImageConfirm"
      @close="editor.stopPicking()"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import rawData from './data.js'
import SiteNav          from './components/SiteNav.vue'
import WhatsAppFab      from './components/WhatsAppFab.vue'
import EditModeBanner   from './components/admin/EditModeBanner.vue'
import ImagePickerModal from './components/admin/ImagePickerModal.vue'
import { usePhotoEditor, loadSiteImages } from './composables/usePhotoEditor.js'
import { contentOverrides, loadSiteContent } from './composables/useSiteContent.js'
import { supabase } from './lib/supabase.js'

const editor = usePhotoEditor()
const route  = useRoute()
const router = useRouter()

const isAdminRoute  = computed(() => route.path.startsWith('/admin') || route.path === '/login')
const showPublicNav = computed(() => !isAdminRoute.value)
const pendingCount  = computed(() => Object.keys(editor.state.pending).length)

// Merge site_content overrides into data (reactive)
const data = computed(() => {
  if (!Object.keys(contentOverrides).length) return rawData
  const d = JSON.parse(JSON.stringify(rawData))
  for (const [key, value] of Object.entries(contentOverrides)) {
    const parts = key.split('.')
    let obj = d
    for (let i = 0; i < parts.length - 1; i++) obj = obj?.[parts[i]]
    if (obj && parts.at(-1) in obj) obj[parts.at(-1)] = value
  }
  return d
})

function onImageConfirm(url) {
  editor.setPending(editor.state.picking, url)
  editor.stopPicking()
}

async function handleSave() {
  await editor.save()
  router.replace('/')
}

function handleCancel() {
  editor.deactivate()
  router.replace('/')
}

watch(() => route.query.edit, async (val) => {
  if (val === 'photos') {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) editor.activate()
  }
}, { immediate: true })

onMounted(() => { loadSiteImages(); loadSiteContent() })
</script>
