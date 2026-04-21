import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(getTargets, options = {}) {
  const {
    y = 32,
    duration = 0.7,
    stagger = 0.1,
    delay = 0,
    start = 'top 85%',
  } = options

  let ctx

  onMounted(() => {
    ctx = gsap.context(() => {
      const targets = typeof getTargets === 'function' ? getTargets() : getTargets
      if (!targets) return

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: Array.isArray(targets) ? targets[0] : targets,
            start,
            once: true,
          },
        },
      )
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

export function useHeroReveal(containerRef) {
  let ctx

  onMounted(() => {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('[data-hero-title]',   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .fromTo('[data-hero-lead]',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('[data-hero-ctas]',    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('[data-hero-stats]',   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    }, containerRef.value)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
