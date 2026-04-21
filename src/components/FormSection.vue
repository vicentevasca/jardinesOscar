<template>
  <section id="form" class="bg-beige-300 section-pad">
    <div class="container-content grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">

      <div class="lg:sticky lg:top-24">
        <p class="eyebrow">Cotización</p>
        <h2
          class="font-display font-normal text-ink-900 mt-5 mb-5"
          style="font-size: clamp(36px,4vw,56px); line-height: 1.05; letter-spacing: -0.02em; text-wrap: balance;"
        >
          Solicita tu evaluación gratuita del terreno.
        </h2>
        <p class="text-ink-700" style="font-size: 18px; line-height: 1.55;">
          Completa el formulario y te contactamos para coordinar una visita técnica. Sin costo, sin compromiso — solo conversamos el proyecto.
        </p>

        <ul class="list-none p-0 mt-8 flex flex-col gap-3.5">
          <li
            v-for="item in perks"
            :key="item"
            class="flex items-center gap-3.5 text-ink-700"
            style="font-size: 15px;"
          >
            <span class="w-5.5 h-5.5 rounded-full bg-green-200 text-green-800 flex items-center justify-center shrink-0 font-semibold" style="font-size: 12px; width: 22px; height: 22px;">✓</span>
            {{ item }}
          </li>
        </ul>

        <div class="mt-10 pt-6 border-t border-ink-900/14">
          <div class="uppercase tracking-[0.14em] text-ink-500 mb-2.5" style="font-size: 12px;">O directamente</div>
          <div class="flex flex-col gap-1.5" style="font-size: 15px;">
            <a :href="data.brand.whatsappUrl" class="text-green-800 no-underline hover:underline">
              WhatsApp · {{ data.brand.whatsapp }}
            </a>
            <a :href="`mailto:${data.brand.email}`" class="text-green-800 no-underline hover:underline">
              {{ data.brand.email }}
            </a>
          </div>
        </div>
      </div>

      <div v-if="sent" class="p-12 text-center border border-green-400 bg-green-100">
        <h3 class="font-display font-normal m-0" style="font-size: 32px; letter-spacing: -0.02em;">
          Gracias, {{ form.nombre || 'te contactaremos pronto' }}.
        </h3>
        <p class="text-ink-700 mt-3">
          Te respondemos en menos de 24 horas hábiles. Mientras tanto, puedes escribirnos por WhatsApp.
        </p>
        <div class="mt-6">
          <a :href="data.brand.whatsappUrl" class="btn btn-primary">
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      <form
        v-else
        class="bg-white p-10 flex flex-col gap-5 border border-ink-900/10 shadow-elev-1"
        @submit.prevent="onSubmit"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Nombre</label>
            <input v-model="form.nombre" required class="field-input" placeholder="Cómo te llamas" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Teléfono</label>
            <input v-model="form.telefono" required class="field-input" placeholder="+56 9 ..." />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Correo</label>
            <input v-model="form.email" required type="email" class="field-input" placeholder="tu@correo.cl" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Comuna</label>
            <input v-model="form.comuna" required class="field-input" placeholder="Vitacura, Las Condes, Ñuñoa..." />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Tipo de propiedad</label>
            <select v-model="form.tipoPropiedad" class="field-input">
              <option>Casa</option>
              <option>Departamento</option>
              <option>Parcela</option>
              <option>Oficina / Comercial</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Tipo de jardín</label>
            <select v-model="form.tipoJardin" class="field-input">
              <option value="">Elige un estilo</option>
              <option v-for="t in data.types" :key="t.key" :value="t.key">{{ t.name }}</option>
              <option value="asesoria">Asesoría / no estoy seguro</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Tamaño aprox. (m²)</label>
            <input v-model="form.tamano" class="field-input" placeholder="Opcional" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="field-label">Presupuesto estimado</label>
            <select v-model="form.presupuesto" class="field-input">
              <option value="">Opcional</option>
              <option>Menos de $3M</option>
              <option>$3M – $8M</option>
              <option>$8M – $20M</option>
              <option>Más de $20M</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="field-label">Cuéntanos sobre tu espacio</label>
          <textarea
            v-model="form.mensaje"
            rows="4"
            class="field-input resize-y"
            placeholder="Orientación, sol, uso que le das, qué te gustaría lograr..."
          />
        </div>

        <div v-if="error" class="text-red-600 text-sm p-3 border border-red-200 bg-red-50">{{ error }}</div>

        <div class="flex justify-between items-center flex-wrap gap-4 mt-1">
          <p class="text-ink-500 max-w-[340px] m-0" style="font-size: 12px;">
            Al enviar, aceptas que te contactemos para coordinar una evaluación. No compartimos tus datos.
          </p>
          <button type="submit" :disabled="loading" class="btn btn-primary btn-lg" :style="loading ? 'opacity:0.65;cursor:not-allowed' : ''">
            {{ loading ? 'Enviando...' : 'Quiero mi evaluación gratuita' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../lib/supabase.js'

const props = defineProps({ data: Object, initialType: String })

const perks = [
  'Respuesta en menos de 24h hábiles',
  'Evaluación presencial sin costo',
  'Propuesta con paleta vegetal y presupuesto',
]

const sent    = ref(false)
const loading = ref(false)
const error   = ref('')

const form = ref({
  nombre: '', telefono: '', email: '', comuna: '',
  tipoPropiedad: 'Casa', tipoJardin: '', mensaje: '',
  presupuesto: '', tamano: '',
})

watch(() => props.initialType, (val) => {
  if (val) form.value.tipoJardin = val
}, { immediate: true })

async function onSubmit() {
  loading.value = true
  error.value = ''
  const { error: err } = await supabase.from('leads').insert({
    nombre:         form.value.nombre,
    telefono:       form.value.telefono,
    email:          form.value.email,
    comuna:         form.value.comuna,
    tipo_propiedad: form.value.tipoPropiedad,
    tipo_jardin:    form.value.tipoJardin,
    tamano:         form.value.tamano,
    presupuesto:    form.value.presupuesto,
    mensaje:        form.value.mensaje,
  })
  loading.value = false
  if (err) {
    error.value = 'Hubo un problema al enviar. Por favor escríbenos directamente por WhatsApp.'
  } else {
    sent.value = true
  }
}
</script>

<style scoped>
.field-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4F6E52;
}

.field-input {
  font-family: inherit;
  font-size: 15px;
  padding: 12px 14px;
  border: 1px solid rgba(28, 26, 23, 0.18);
  border-radius: 2px;
  background: #fff;
  color: #1C1A17;
  width: 100%;
  outline: none;
  transition: border-color 200ms;
}

.field-input:focus {
  border-color: #8AA68B;
  box-shadow: 0 0 0 3px rgba(138, 166, 139, 0.35);
}
</style>
