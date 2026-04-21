import { reactive } from 'vue'
import { supabase } from '../lib/supabase.js'

// Module-level singleton: { 'hero.titleA': 'Valor personalizado', ... }
export const contentOverrides = reactive({})

export async function loadSiteContent() {
  const { data } = await supabase.from('site_content').select('key, value')
  if (data) data.forEach(({ key, value }) => { contentOverrides[key] = value })
}

export function useSiteContent() {
  return {
    overrides: contentOverrides,
    getContent(key, fallback) {
      return contentOverrides[key] ?? fallback
    },
    async saveContent(key, value) {
      contentOverrides[key] = value
      await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })
    },
    async saveMany(entries) {
      const rows = Object.entries(entries).map(([key, value]) => ({ key, value }))
      rows.forEach(({ key, value }) => { contentOverrides[key] = value })
      await supabase.from('site_content').upsert(rows, { onConflict: 'key' })
    },
    async resetContent(key) {
      delete contentOverrides[key]
      await supabase.from('site_content').delete().eq('key', key)
    },
  }
}
