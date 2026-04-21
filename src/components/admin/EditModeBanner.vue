<template>
  <div
    class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-3 gap-4"
    style="background: #1F3A2E; border-bottom: 1px solid rgba(255,255,255,0.12);"
  >
    <div class="flex items-center gap-3">
      <!-- Dot indicator -->
      <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span class="text-white font-medium" style="font-size: 13px;">Modo edición · Fotos</span>
      <span class="text-white/50" style="font-size: 12px;">— Haz click en cualquier imagen para cambiarla</span>
    </div>

    <div class="flex items-center gap-3">
      <span v-if="pendingCount > 0" class="text-green-300" style="font-size: 12px;">
        {{ pendingCount }} {{ pendingCount === 1 ? 'cambio pendiente' : 'cambios pendientes' }}
      </span>
      <button
        @click="$emit('cancel')"
        class="text-white/70 hover:text-white transition-colors px-3 py-1.5 border border-white/20 hover:border-white/40"
        style="font-size: 12px; background: transparent;"
      >
        Cancelar
      </button>
      <button
        @click="$emit('save')"
        :disabled="saving || pendingCount === 0"
        class="px-4 py-1.5 font-medium transition-all"
        style="font-size: 12px; background: #4a7c5a; color: white; border: 1px solid transparent;"
        :style="(saving || pendingCount === 0) ? 'opacity:0.5;cursor:not-allowed' : 'cursor:pointer'"
      >
        {{ saving ? 'Guardando...' : 'Guardar cambios' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ pendingCount: Number, saving: Boolean })
defineEmits(['save', 'cancel'])
</script>
