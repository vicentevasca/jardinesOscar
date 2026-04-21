<template>
  <div>
    <HeroSection
      :data="data"
      @cta="scrollTo('form')"
      @secondary="scrollTo('portafolio')"
    />
    <TrustSection      :data="data" />
    <TypesSection      :data="data" @quote="onQuote" />
    <PortfolioSection  :data="data" />
    <BenefitsSection   :data="data" />
    <ProcessSection    :data="data" />
    <TestimonialsSection :data="data" />
    <MidCtaSection     :data="data" @cta="scrollTo('form')" />
    <FormSection       :data="data" :initial-type="initialType" />
    <FinalCtaSection   :data="data" @cta="scrollTo('form')" />
    <SiteFooter        :data="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import HeroSection        from '../components/HeroSection.vue'
import TrustSection       from '../components/TrustSection.vue'
import TypesSection       from '../components/TypesSection.vue'
import PortfolioSection   from '../components/PortfolioSection.vue'
import BenefitsSection    from '../components/BenefitsSection.vue'
import ProcessSection     from '../components/ProcessSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import MidCtaSection      from '../components/MidCtaSection.vue'
import FormSection        from '../components/FormSection.vue'
import FinalCtaSection    from '../components/FinalCtaSection.vue'
import SiteFooter         from '../components/SiteFooter.vue'

defineProps({ data: Object })

const initialType = ref('')

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function onQuote(typeKey) {
  initialType.value = typeKey
  setTimeout(() => scrollTo('form'), 50)
}
</script>
