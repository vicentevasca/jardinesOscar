<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Lead list -->
    <div
      class="flex flex-col border-r border-black/10 overflow-y-auto"
      :class="selected ? 'hidden md:flex w-80 shrink-0' : 'flex-1 md:w-80 md:flex-none md:shrink-0'"
    >
      <!-- Header -->
      <div class="px-6 py-5 border-b border-black/10 flex items-center justify-between sticky top-0 bg-white z-10">
        <div>
          <h1 class="font-display font-normal m-0" style="font-size: 20px; letter-spacing: -0.02em;">Mensajes</h1>
          <p class="text-ink-500 m-0 mt-0.5" style="font-size: 12px;">{{ leads.length }} contactos recibidos</p>
        </div>
        <button @click="fetchLeads" class="text-ink-400 hover:text-ink-900 bg-transparent border-0 cursor-pointer p-1 transition-colors" title="Actualizar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex-1 flex items-center justify-center text-ink-400 text-sm p-6">
        Cargando mensajes...
      </div>

      <!-- Empty -->
      <div v-else-if="!leads.length" class="flex-1 flex flex-col items-center justify-center text-ink-400 text-sm p-10 text-center gap-3">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.4">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <p class="m-0">Aún no hay mensajes</p>
      </div>

      <!-- List -->
      <div v-else class="flex-1 overflow-y-auto divide-y divide-black/6">
        <button
          v-for="lead in leads"
          :key="lead.id"
          @click="openLead(lead)"
          class="w-full text-left px-5 py-4 transition-colors bg-transparent border-0 cursor-pointer block"
          :style="selected?.id === lead.id ? 'background: #e8f0e9;' : 'background: white;'"
          :class="selected?.id === lead.id ? '' : 'hover:bg-black/3'"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span
                v-if="!lead.read"
                class="w-2 h-2 rounded-full shrink-0"
                style="background: #2d5a3d; margin-top: 2px;"
              />
              <span
                v-else
                class="w-2 h-2 shrink-0"
              />
              <span class="font-medium text-ink-900 truncate" style="font-size: 14px;">{{ lead.nombre }}</span>
            </div>
            <span class="text-ink-400 shrink-0" style="font-size: 11px;">{{ formatDate(lead.created_at) }}</span>
          </div>
          <p class="m-0 mt-1.5 text-ink-500 truncate pl-4" style="font-size: 12px;">
            {{ lead.comuna }} · {{ lead.tipo_jardin || 'Sin tipo' }}
          </p>
          <p v-if="lead.mensaje" class="m-0 mt-1 text-ink-400 truncate pl-4" style="font-size: 12px; max-width: 200px;">
            {{ lead.mensaje }}
          </p>
        </button>
      </div>
    </div>

    <!-- Detail panel -->
    <div
      v-if="selected"
      class="flex-1 flex flex-col overflow-hidden bg-white"
    >
      <!-- Detail header -->
      <div class="px-8 py-5 border-b border-black/10 flex items-center gap-4 sticky top-0 bg-white z-10">
        <button @click="selected = null" class="md:hidden text-ink-500 hover:text-ink-900 bg-transparent border-0 cursor-pointer p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <h2 class="font-display font-normal m-0" style="font-size: 20px; letter-spacing: -0.02em;">{{ selected.nombre }}</h2>
          <p class="text-ink-500 m-0 mt-0.5" style="font-size: 12px;">{{ formatDateFull(selected.created_at) }}</p>
        </div>
        <a
          :href="`https://wa.me/${selected.telefono.replace(/\D/g,'')}?text=Hola%20${encodeURIComponent(selected.nombre)}%2C%20recibimos%20tu%20consulta.`"
          target="_blank"
          class="ml-auto flex items-center gap-2 px-4 py-2 text-white no-underline transition-opacity hover:opacity-80"
          style="background: #25D366; font-size: 13px; font-weight: 500;"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.1 1.1 0 0 0-.795.371c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
          </svg>
          Responder
        </a>
      </div>

      <!-- Detail content -->
      <div class="flex-1 overflow-y-auto px-8 py-7">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div v-for="field in detailFields" :key="field.label">
            <p class="uppercase tracking-[0.12em] text-ink-400 m-0 mb-1" style="font-size: 11px;">{{ field.label }}</p>
            <p class="text-ink-900 m-0 font-medium" style="font-size: 14px;">{{ field.value || '—' }}</p>
          </div>
        </div>

        <div v-if="selected.mensaje">
          <p class="uppercase tracking-[0.12em] text-ink-400 m-0 mb-3" style="font-size: 11px;">Mensaje</p>
          <p class="text-ink-700 m-0 leading-relaxed p-5 border border-black/10 bg-black/2" style="font-size: 15px; white-space: pre-wrap;">{{ selected.mensaje }}</p>
        </div>
      </div>
    </div>

    <!-- No selection placeholder (desktop) -->
    <div v-else class="hidden md:flex flex-1 items-center justify-center text-ink-400 text-sm flex-col gap-3">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
      <p class="m-0">Selecciona un mensaje</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../../lib/supabase.js'

const leads   = ref([])
const selected = ref(null)
const loading  = ref(false)

async function fetchLeads() {
  loading.value = true
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  leads.value = data || []
  loading.value = false
}

async function openLead(lead) {
  selected.value = lead
  if (!lead.read) {
    await supabase.from('leads').update({ read: true }).eq('id', lead.id)
    lead.read = true
  }
}

const detailFields = computed(() => selected.value ? [
  { label: 'Teléfono',     value: selected.value.telefono },
  { label: 'Correo',       value: selected.value.email },
  { label: 'Comuna',       value: selected.value.comuna },
  { label: 'Propiedad',    value: selected.value.tipo_propiedad },
  { label: 'Tipo jardín',  value: selected.value.tipo_jardin },
  { label: 'Tamaño',       value: selected.value.tamano },
  { label: 'Presupuesto',  value: selected.value.presupuesto },
] : [])

function formatDate(iso) {
  const d = new Date(iso)
  const now = new Date()
  const diff = (now - d) / 1000
  if (diff < 3600)  return `hace ${Math.floor(diff / 60)}m`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`
  return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
}

function formatDateFull(iso) {
  return new Date(iso).toLocaleString('es-CL', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

onMounted(fetchLeads)
</script>
