<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Lead list -->
    <div
      class="flex flex-col border-r border-black/10 overflow-hidden"
      :class="selected ? 'hidden md:flex w-96 shrink-0' : 'flex-1 md:w-96 md:flex-none md:shrink-0'"
    >
      <!-- Header -->
      <div class="px-6 py-5 border-b border-black/10 sticky top-0 bg-white z-10">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="font-display font-normal m-0" style="font-size: 20px; letter-spacing: -0.02em;">Mensajes</h1>
            <p class="text-ink-500 m-0 mt-0.5" style="font-size: 12px;">
              <span v-if="unreadCount > 0" class="text-green-700 font-medium">{{ unreadCount }} sin leer · </span>{{ filteredLeads.length }} de {{ leads.length }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="exportCSV"
              class="text-ink-400 hover:text-ink-900 bg-transparent border border-black/10 cursor-pointer px-3 py-1.5 transition-colors flex items-center gap-1.5"
              title="Exportar CSV"
              style="font-size: 12px;"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              CSV
            </button>
            <button @click="fetchLeads" class="text-ink-400 hover:text-ink-900 bg-transparent border-0 cursor-pointer p-1 transition-colors" title="Actualizar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M23 4v6h-6M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats bar -->
        <div class="grid grid-cols-3 gap-2 mb-4">
          <div class="bg-black/3 px-3 py-2 text-center">
            <p class="m-0 font-semibold text-ink-900" style="font-size: 16px;">{{ statsThisWeek }}</p>
            <p class="m-0 text-ink-400 uppercase tracking-wide" style="font-size: 10px;">esta semana</p>
          </div>
          <div class="bg-black/3 px-3 py-2 text-center">
            <p class="m-0 font-semibold text-ink-900" style="font-size: 16px;">{{ unreadCount }}</p>
            <p class="m-0 text-ink-400 uppercase tracking-wide" style="font-size: 10px;">sin leer</p>
          </div>
          <div class="bg-black/3 px-3 py-2 text-center">
            <p class="m-0 font-semibold text-ink-900 truncate" style="font-size: 13px;">{{ topType }}</p>
            <p class="m-0 text-ink-400 uppercase tracking-wide" style="font-size: 10px;">tipo pedido</p>
          </div>
        </div>

        <!-- Search + filters -->
        <div class="flex flex-col gap-2">
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por nombre, comuna, mensaje..."
            class="w-full border border-black/10 px-3 py-2 text-ink-900 bg-white outline-none focus:border-green-700"
            style="font-size: 13px;"
          />
          <div class="flex gap-2">
            <select
              v-model="filterStatus"
              class="flex-1 border border-black/10 px-2 py-1.5 text-ink-600 bg-white outline-none focus:border-green-700"
              style="font-size: 12px;"
            >
              <option value="">Todos los estados</option>
              <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
            <select
              v-model="filterRead"
              class="flex-1 border border-black/10 px-2 py-1.5 text-ink-600 bg-white outline-none focus:border-green-700"
              style="font-size: 12px;"
            >
              <option value="">Leídos y no leídos</option>
              <option value="unread">Sin leer</option>
              <option value="read">Leídos</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex-1 flex items-center justify-center text-ink-400 text-sm p-6">
        Cargando mensajes...
      </div>

      <!-- Empty -->
      <div v-else-if="!filteredLeads.length" class="flex-1 flex flex-col items-center justify-center text-ink-400 text-sm p-10 text-center gap-3">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.4">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <p class="m-0">{{ leads.length ? 'Sin resultados para este filtro' : 'Aún no hay mensajes' }}</p>
      </div>

      <!-- List -->
      <div v-else class="flex-1 overflow-y-auto divide-y divide-black/6">
        <button
          v-for="lead in filteredLeads"
          :key="lead.id"
          @click="openLead(lead)"
          class="w-full text-left px-5 py-4 transition-colors bg-transparent border-0 cursor-pointer block"
          :style="selected?.id === lead.id ? 'background: #e8f0e9;' : 'background: white;'"
          :class="selected?.id === lead.id ? '' : 'hover:bg-black/3'"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span v-if="!lead.read" class="w-2 h-2 rounded-full shrink-0" style="background: #2d5a3d; margin-top: 2px;" />
              <span v-else class="w-2 h-2 shrink-0" />
              <span class="font-medium text-ink-900 truncate" style="font-size: 14px;">{{ lead.nombre }}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span
                class="px-1.5 py-0.5 text-white uppercase tracking-wide"
                :style="{ background: statusColor(lead.status), fontSize: '9px' }"
              >{{ statusLabel(lead.status) }}</span>
              <span class="text-ink-400" style="font-size: 11px;">{{ formatDate(lead.created_at) }}</span>
            </div>
          </div>
          <p class="m-0 mt-1.5 text-ink-500 truncate pl-4" style="font-size: 12px;">
            {{ lead.comuna }} · {{ lead.tipo_jardin || 'Sin tipo' }}
          </p>
          <p v-if="lead.mensaje" class="m-0 mt-1 text-ink-400 truncate pl-4" style="font-size: 12px; max-width: 260px;">
            {{ lead.mensaje }}
          </p>
        </button>
      </div>
    </div>

    <!-- Detail panel -->
    <div v-if="selected" class="flex-1 flex flex-col overflow-hidden bg-white">
      <!-- Detail header -->
      <div class="px-8 py-5 border-b border-black/10 flex items-center gap-4 sticky top-0 bg-white z-10">
        <button @click="selected = null" class="md:hidden text-ink-500 hover:text-ink-900 bg-transparent border-0 cursor-pointer p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div class="flex-1 min-w-0">
          <h2 class="font-display font-normal m-0" style="font-size: 20px; letter-spacing: -0.02em;">{{ selected.nombre }}</h2>
          <p class="text-ink-500 m-0 mt-0.5" style="font-size: 12px;">{{ formatDateFull(selected.created_at) }}</p>
        </div>
        <!-- Status selector -->
        <select
          :value="selected.status"
          @change="updateStatus($event.target.value)"
          class="border border-black/10 px-3 py-1.5 text-ink-700 bg-white outline-none focus:border-green-700 font-medium"
          style="font-size: 13px;"
        >
          <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
        </select>
        <a
          v-if="waUrl(selected)"
          :href="waUrl(selected)"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 text-white no-underline transition-opacity hover:opacity-80"
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

        <div v-if="selected.mensaje" class="mb-8">
          <p class="uppercase tracking-[0.12em] text-ink-400 m-0 mb-3" style="font-size: 11px;">Mensaje</p>
          <p class="text-ink-700 m-0 leading-relaxed p-5 border border-black/10 bg-black/2" style="font-size: 15px; white-space: pre-wrap;">{{ selected.mensaje }}</p>
        </div>

        <!-- Notes -->
        <div>
          <p class="uppercase tracking-[0.12em] text-ink-400 m-0 mb-2" style="font-size: 11px;">Notas internas</p>
          <textarea
            v-model="noteDraft"
            @blur="saveNote"
            rows="4"
            placeholder="Agregar nota sobre este contacto (solo visible para ti)..."
            class="w-full border border-black/10 px-4 py-3 text-ink-800 bg-white outline-none focus:border-green-700 resize-none leading-relaxed"
            style="font-size: 14px; font-family: inherit;"
          />
          <p v-if="noteSaved" class="text-green-700 m-0 mt-1" style="font-size: 12px;">Nota guardada</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from '../../lib/supabase.js'

const leads    = ref([])
const selected = ref(null)
const loading  = ref(false)
const search      = ref('')
const filterStatus = ref('')
const filterRead   = ref('')
const noteDraft   = ref('')
const noteSaved   = ref(false)

const statuses = [
  { value: 'nuevo',       label: 'Nuevo',       color: '#6b7280' },
  { value: 'contactado',  label: 'Contactado',  color: '#2563eb' },
  { value: 'propuesta',   label: 'Propuesta',   color: '#d97706' },
  { value: 'cerrado',     label: 'Cerrado',     color: '#2d5a3d' },
  { value: 'descartado',  label: 'Descartado',  color: '#dc2626' },
]

function statusColor(val) { return statuses.find(s => s.value === val)?.color ?? '#6b7280' }
function statusLabel(val) { return statuses.find(s => s.value === val)?.label ?? val }

const unreadCount = computed(() => leads.value.filter(l => !l.read).length)

const statsThisWeek = computed(() => {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 7)
  return leads.value.filter(l => new Date(l.created_at) >= cutoff).length
})

const topType = computed(() => {
  const counts = {}
  leads.value.forEach(l => { if (l.tipo_jardin) counts[l.tipo_jardin] = (counts[l.tipo_jardin] || 0) + 1 })
  if (!Object.keys(counts).length) return '—'
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
})

const filteredLeads = computed(() => {
  return leads.value.filter(l => {
    if (filterStatus.value && l.status !== filterStatus.value) return false
    if (filterRead.value === 'unread' && l.read) return false
    if (filterRead.value === 'read' && !l.read) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      return (
        l.nombre?.toLowerCase().includes(q) ||
        l.comuna?.toLowerCase().includes(q) ||
        l.mensaje?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q)
      )
    }
    return true
  })
})

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
  noteDraft.value = lead.notes || ''
  noteSaved.value = false
  if (!lead.read) {
    await supabase.from('leads').update({ read: true }).eq('id', lead.id)
    lead.read = true
  }
}

async function updateStatus(value) {
  selected.value.status = value
  await supabase.from('leads').update({ status: value }).eq('id', selected.value.id)
  const lead = leads.value.find(l => l.id === selected.value.id)
  if (lead) lead.status = value
}

async function saveNote() {
  const notes = noteDraft.value
  await supabase.from('leads').update({ notes }).eq('id', selected.value.id)
  selected.value.notes = notes
  const lead = leads.value.find(l => l.id === selected.value.id)
  if (lead) lead.notes = notes
  noteSaved.value = true
  setTimeout(() => { noteSaved.value = false }, 2500)
}

function waUrl(lead) {
  const phone = lead?.telefono?.replace(/\D/g, '')
  if (!phone) return null
  return `https://wa.me/${phone}?text=Hola%20${encodeURIComponent(lead.nombre)}%2C%20recibimos%20tu%20consulta.`
}

function exportCSV() {
  const cols = ['id', 'nombre', 'telefono', 'email', 'comuna', 'tipo_propiedad', 'tipo_jardin', 'tamano', 'presupuesto', 'mensaje', 'status', 'notes', 'read', 'created_at']
  const rows = [cols.join(',')]
  leads.value.forEach(l => {
    rows.push(cols.map(c => {
      const v = l[c] ?? ''
      return `"${String(v).replace(/"/g, '""')}"`
    }).join(','))
  })
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mensajes-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
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
