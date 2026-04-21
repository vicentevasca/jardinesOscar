<template>
  <div>
    <SiteNav :data="data" />
    <RouterView :data="data" />
    <WhatsAppFab :data="data" />
  </div>
</template>

<script setup>
import data from './data.js'
import SiteNav    from './components/SiteNav.vue'
import WhatsAppFab from './components/WhatsAppFab.vue'
</script>
