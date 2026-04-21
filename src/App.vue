<template>
  <div :style="editor.state.active ? 'padding-top: 46px' : ''">
    <!-- Edit mode banner -->
    <EditModeBanner
      v-if="editor.state.active"
      :pending-count="pendingCount"
      :saving="editor.state.saving"
      @save="editor.save()"
      @cancel="editor.deactivate()"
    />

    <SiteNav :data="data" />
    <RouterView :data="data" />
    <WhatsAppFab v-if="!editor.state.active" :data="data" />

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
import { useRoute } from 'vue-router'
import data from './data.js'
import SiteNav       from './components/SiteNav.vue'
import WhatsAppFab   from './components/WhatsAppFab.vue'
import EditModeBanner  from './components/admin/EditModeBanner.vue'
import ImagePickerModal from './components/admin/ImagePickerModal.vue'
import { usePhotoEditor, loadSiteImages } from './composables/usePhotoEditor.js'
import { useAuth } from './composables/useAuth.js'
import { supabase } from './lib/supabase.js'

const editor = usePhotoEditor()
const auth   = useAuth()
const route  = useRoute()

const pendingCount = computed(() => Object.keys(editor.state.pending).length)

function onImageConfirm(url) {
  editor.setPending(editor.state.picking, url)
  editor.stopPicking()
}

// Enter edit mode when navigating to /?edit=photos (requires auth)
watch(() => route.query.edit, async (val) => {
  if (val === 'photos') {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) editor.activate()
  }
}, { immediate: true })

onMounted(loadSiteImages)
</script>
