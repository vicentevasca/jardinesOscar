import { reactive } from 'vue'
import { supabase } from '../lib/supabase.js'

const state = reactive({
  loaded:  {},     // persisted from DB
  pending: {},     // unsaved in-session changes
  active:  false,
  picking: null,   // image key currently open in picker
  saving:  false,
})

export async function loadSiteImages() {
  const { data } = await supabase.from('site_images').select('key, url')
  if (data) data.forEach(({ key, url }) => { state.loaded[key] = url })
}

export function usePhotoEditor() {
  return {
    state,

    getImage(key, fallback) {
      return state.pending[key] ?? state.loaded[key] ?? fallback
    },

    activate()           { state.active = true },
    deactivate()         { state.active = false; state.pending = {}; state.picking = null },
    startPicking(key)    { state.picking = key },
    stopPicking()        { state.picking = null },
    setPending(key, url) { state.pending = { ...state.pending, [key]: url } },

    async save() {
      state.saving = true
      const rows = Object.entries(state.pending).map(([key, url]) => ({ key, url }))
      if (rows.length) {
        await supabase.from('site_images').upsert(rows, { onConflict: 'key' })
        rows.forEach(({ key, url }) => { state.loaded[key] = url })
      }
      state.pending = {}
      state.active  = false
      state.picking = null
      state.saving  = false
    },
  }
}
