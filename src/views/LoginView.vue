<template>
  <div class="min-h-screen flex items-center justify-center p-6" style="background: #0C1912;">
    <div class="w-full max-w-sm">

      <!-- Brand -->
      <div class="text-center mb-10">
        <p class="font-display text-white m-0" style="font-size: 28px; font-weight: 400; letter-spacing: -0.02em;">Oscar Palma</p>
        <p class="text-green-200/60 mt-1 m-0 uppercase tracking-[0.16em]" style="font-size: 11px;">Panel de administración</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-green-200/70 uppercase tracking-[0.12em]" style="font-size: 11px;">Correo</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="admin@oscarpalma.cl"
            class="px-4 py-3 text-white placeholder-white/30 outline-none border border-white/12 focus:border-green-400 transition-colors"
            style="background: rgba(255,255,255,0.06); font-size: 15px;"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-green-200/70 uppercase tracking-[0.12em]" style="font-size: 11px;">Contraseña</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="px-4 py-3 text-white placeholder-white/30 outline-none border border-white/12 focus:border-green-400 transition-colors"
            style="background: rgba(255,255,255,0.06); font-size: 15px;"
          />
        </div>

        <div v-if="errorMsg" class="text-red-400 text-sm p-3 border border-red-400/30" style="background: rgba(248,113,113,0.08);">
          {{ errorMsg }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-2 py-3.5 text-white font-medium transition-all"
          style="background: #2d5a3d; border: none; font-size: 15px; cursor: pointer; letter-spacing: 0.02em;"
          :style="loading ? 'opacity:0.6;cursor:not-allowed' : ''"
        >
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>

      <p class="text-center text-green-200/30 mt-8" style="font-size: 12px;">
        Acceso restringido
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router  = useRouter()
const auth    = useAuth()
const email   = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  loading.value  = true
  errorMsg.value = ''
  const { error } = await auth.signIn(email.value, password.value)
  loading.value = false
  if (error) {
    errorMsg.value = 'Correo o contraseña incorrectos.'
  } else {
    router.push('/admin')
  }
}
</script>
