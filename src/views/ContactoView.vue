<template>
  <div>
    <PageHeader
      eyebrow="Contacto"
      title="Hablemos de tu jardín."
      lead="Evaluación presencial sin costo. Te respondemos en menos de 24 horas hábiles."
    />

    <section class="bg-beige-300 section-pad">
      <div class="container-content grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

        <!-- Left: Info -->
        <div class="lg:sticky lg:top-24 flex flex-col gap-10">

          <!-- Direct contact -->
          <div>
            <p class="eyebrow mb-5">Contacto directo</p>
            <div class="flex flex-col gap-3">
              <a
                :href="`https://wa.me/${data.brand.whatsappRaw}`"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-3 text-green-800 no-underline hover:text-green-700 transition-colors group"
              >
                <span class="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.1 1.1 0 0 0-.795.371c-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg>
                </span>
                <span style="font-size: 15px;">{{ data.brand.whatsapp }}</span>
              </a>
              <a
                :href="`mailto:${data.brand.email}`"
                class="flex items-center gap-3 text-green-800 no-underline hover:text-green-700 transition-colors group"
              >
                <span class="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F6E52" stroke-width="1.75"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <span style="font-size: 15px;">{{ data.brand.email }}</span>
              </a>
            </div>
          </div>

          <div class="border-t border-ink-900/12 pt-8">
            <p class="eyebrow mb-5">Cobertura</p>
            <p class="text-ink-700 m-0 mb-3" style="font-size: 15px; line-height: 1.65;">
              {{ data.brand.coverage }}
            </p>
            <p class="text-ink-500 m-0" style="font-size: 13px;">{{ data.brand.hours }}</p>
          </div>

          <div class="border-t border-ink-900/12 pt-8">
            <p class="eyebrow mb-5">¿Por qué elegirnos?</p>
            <ul class="list-none p-0 m-0 flex flex-col gap-3.5">
              <li
                v-for="item in whyUs"
                :key="item"
                class="flex items-center gap-3 text-ink-700"
                style="font-size: 15px;"
              >
                <span class="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center shrink-0 font-semibold" style="font-size: 11px;">✓</span>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="border-t border-ink-900/12 pt-8">
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="[val, label] in data.trust.metrics.slice(0, 3)"
                :key="label"
                class="border-t-2 border-green-400 pt-4"
              >
                <div class="font-display text-green-800" style="font-size: 32px; font-weight: 400; letter-spacing: -0.02em; line-height: 1;">
                  {{ val }}
                </div>
                <div class="text-ink-500 mt-1.5" style="font-size: 12px; line-height: 1.4;">{{ label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div>
          <div v-if="sent" class="p-12 text-center border border-green-400 bg-green-100">
            <h3 class="font-display font-normal m-0 mb-3" style="font-size: 32px; letter-spacing: -0.02em;">
              Gracias, {{ form.nombre || 'te contactaremos pronto' }}.
            </h3>
            <p class="text-ink-700 m-0 mb-6">
              Te respondemos en menos de 24 horas hábiles. Mientras tanto, puedes escribirnos directamente.
            </p>
            <a :href="`https://wa.me/${data.brand.whatsappRaw}`" class="btn btn-primary">
              Escribir por WhatsApp
            </a>
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
                <input v-model="form.comuna" required class="field-input" placeholder="Vitacura, Las Condes..." />
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

            <div class="flex justify-between items-center flex-wrap gap-4 mt-1">
              <p class="text-ink-500 max-w-[320px] m-0" style="font-size: 12px;">
                Al enviar, aceptas que te contactemos para coordinar una evaluación. No compartimos tus datos.
              </p>
              <button type="submit" class="btn btn-primary btn-lg">
                Enviar y recibir propuesta
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <SiteFooter :data="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'

defineProps({ data: Object })

const whyUs = [
  '12 años en la industria',
  'Evaluación presencial sin costo',
  'Respuesta en menos de 24h hábiles',
  'Propuesta con paleta vegetal y presupuesto',
]

const sent = ref(false)
const form = ref({
  nombre: '', telefono: '', email: '', comuna: '',
  tipoPropiedad: 'Casa', tipoJardin: '', mensaje: '',
  presupuesto: '', tamano: '',
})

function onSubmit() {
  sent.value = true
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
