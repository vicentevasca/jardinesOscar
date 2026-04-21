<template>
  <div class="p-8 max-w-2xl">
    <div class="flex items-center gap-3 mb-1">
      <RouterLink to="/admin/herramientas" class="text-ink-400 hover:text-ink-900 no-underline flex items-center gap-1" style="font-size: 13px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Herramientas
      </RouterLink>
    </div>
    <h1 class="font-display font-normal m-0 mb-1" style="font-size: 28px; letter-spacing: -0.02em;">Editar textos</h1>
    <p class="text-ink-500 m-0 mb-10" style="font-size: 14px;">Los cambios se guardan en Supabase y se aplican al sitio de inmediato sin redesplegar.</p>

    <div v-if="loading" class="text-ink-400 text-sm py-10 text-center">Cargando contenido...</div>

    <div v-else class="flex flex-col gap-10">

      <!-- Hero section -->
      <section>
        <p class="uppercase tracking-[0.14em] text-ink-400 m-0 mb-5 font-medium" style="font-size: 11px;">Sección Hero</p>
        <div class="flex flex-col gap-5">
          <div v-for="field in heroFields" :key="field.key">
            <label class="block text-ink-700 font-medium mb-1.5" style="font-size: 13px;">{{ field.label }}</label>
            <p v-if="field.hint" class="text-ink-400 m-0 mb-2" style="font-size: 12px;">{{ field.hint }}</p>
            <component
              :is="field.multiline ? 'textarea' : 'input'"
              :value="drafts[field.key]"
              @input="drafts[field.key] = $event.target.value"
              :rows="field.multiline ? 3 : undefined"
              :placeholder="field.placeholder"
              class="w-full border border-black/10 px-4 py-2.5 text-ink-900 bg-white outline-none focus:border-green-700 transition-colors"
              :class="field.multiline ? 'resize-none' : ''"
              style="font-size: 14px; font-family: inherit;"
            />
          </div>
        </div>
      </section>

      <!-- Trust section -->
      <section>
        <p class="uppercase tracking-[0.14em] text-ink-400 m-0 mb-5 font-medium" style="font-size: 11px;">Sección Confianza</p>
        <div class="flex flex-col gap-5">
          <div v-for="field in trustFields" :key="field.key">
            <label class="block text-ink-700 font-medium mb-1.5" style="font-size: 13px;">{{ field.label }}</label>
            <input
              :value="drafts[field.key]"
              @input="drafts[field.key] = $event.target.value"
              :placeholder="field.placeholder"
              class="w-full border border-black/10 px-4 py-2.5 text-ink-900 bg-white outline-none focus:border-green-700 transition-colors"
              style="font-size: 14px; font-family: inherit;"
            />
          </div>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex items-center gap-4 pb-4">
        <button
          @click="saveAll"
          :disabled="saving"
          class="flex items-center gap-2 px-6 py-2.5 text-white font-medium transition-all"
          style="background: #2d5a3d; border: none; font-size: 14px;"
          :style="saving ? 'opacity:0.7;cursor:not-allowed' : 'cursor:pointer'"
        >
          <svg v-if="saving" class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
          </svg>
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </button>
        <button
          @click="resetAll"
          :disabled="saving"
          class="px-5 py-2.5 border border-black/15 text-ink-700 bg-transparent cursor-pointer hover:bg-black/4 transition-colors"
          style="font-size: 14px;"
        >
          Restaurar originales
        </button>
        <span v-if="saved" class="text-green-700" style="font-size: 13px;">Guardado correctamente</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent.js'
import rawData from '../../data.js'

const { overrides, saveMany, resetContent } = useSiteContent()

const loading = ref(true)
const saving  = ref(false)
const saved   = ref(false)
const drafts  = reactive({})

const heroFields = [
  { key: 'hero.eyebrow',      label: 'Eyebrow (tag línea sobre el título)', placeholder: rawData.hero.eyebrow },
  { key: 'hero.titleA',       label: 'Título — línea 1', placeholder: rawData.hero.titleA },
  { key: 'hero.titleB',       label: 'Título — línea 2', placeholder: rawData.hero.titleB },
  { key: 'hero.lead',         label: 'Bajada / descripción', placeholder: rawData.hero.lead, multiline: true,
    hint: 'Texto debajo del título principal. Describe el servicio en 2-3 líneas.' },
  { key: 'hero.primaryCta',   label: 'Botón principal (CTA)', placeholder: rawData.hero.primaryCta },
  { key: 'hero.secondaryCta', label: 'Botón secundario', placeholder: rawData.hero.secondaryCta },
]

const trustFields = [
  { key: 'trust.eyebrow', label: 'Eyebrow de la sección', placeholder: rawData.trust.eyebrow },
  { key: 'trust.title',   label: 'Título de la sección',  placeholder: rawData.trust.title },
]

const allFields = [...heroFields, ...trustFields]

function loadDrafts() {
  allFields.forEach(f => {
    drafts[f.key] = overrides[f.key] ?? rawData[f.key.split('.')[0]]?.[f.key.split('.')[1]] ?? ''
  })
}

async function saveAll() {
  saving.value = true
  const entries = {}
  allFields.forEach(f => {
    const raw = rawData[f.key.split('.')[0]]?.[f.key.split('.')[1]]
    if (drafts[f.key] !== raw) entries[f.key] = drafts[f.key]
  })
  await saveMany(entries)
  saving.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}

async function resetAll() {
  if (!confirm('¿Restaurar todos los textos a los valores originales?')) return
  saving.value = true
  for (const f of allFields) await resetContent(f.key)
  loadDrafts()
  saving.value = false
}

onMounted(() => {
  loadDrafts()
  loading.value = false
})
</script>
