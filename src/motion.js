import initMagicHat from "./magicHat"

// Animaciones de scroll del sitio (branding "a plena luz": las cosas aparecen, no saltan).
//
// - Revelado: títulos, reglas, tarjetas y bloques entran con un fundido hacia arriba,
//   escalonados entre hermanos. Se aplica solo a secciones después del hero.
// - [data-parallax="0.15"]: el elemento se desplaza más lento que la página.
//
// Sin JavaScript o con "reducir movimiento", todo se ve normal: la clase js-motion
// del <html> es la que activa los estados iniciales en CSS.

const REVEAL = [
  "h2",
  ".eyebrow",
  ".ruler",
  ".plane",
  ".reveal-wipe",
  "ol > li",
  "details",
  "dl > div",
  "blockquote",
  ".btn-primary",
  "[data-reveal]"
].join(",")

function initReveal() {
  const sections = document.querySelectorAll("main > section:not(:first-child), main > * + section")
  const targets = []
  sections.forEach(section => {
    section.querySelectorAll(REVEAL).forEach(el => {
      // Un solo nivel: si un ancestro ya se revela, el hijo viaja con él.
      if (el.parentElement.closest(".reveal") || el.closest(".marquee, form, [data-clr-map]")) return
      el.classList.add("reveal")
      targets.push(el)
    })
  })

  // Escalonado entre hermanos revelados (máx. 6 pasos).
  targets.forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains("reveal"))
    const i = Math.min(siblings.indexOf(el), 6)
    if (i > 0) el.style.setProperty("--reveal-delay", `${i * 90}ms`)
  })

  // La regla empieza recortada (área 0) y el observador no la detectaría: se vigila su
  // contenedor y, al entrar, se revelan todos los elementos asociados a él.
  const groups = new Map()
  targets.forEach(el => {
    const watched = el.classList.contains("ruler") ? el.parentElement : el
    if (!groups.has(watched)) groups.set(watched, [])
    groups.get(watched).push(el)
  })

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          groups.get(entry.target).forEach(el => el.classList.add("is-visible"))
          io.unobserve(entry.target)
        }
      })
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  )
  groups.forEach((_, watched) => io.observe(watched))
}

function initParallax() {
  const items = [...document.querySelectorAll("[data-parallax]")]
  if (!items.length) return
  let ticking = false
  const update = () => {
    const vh = window.innerHeight
    items.forEach(el => {
      const rect = el.parentElement.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > vh) return
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      el.style.transform = `translate3d(0, ${(progress * parseFloat(el.dataset.parallax) * 100).toFixed(2)}px, 0) scale(1.15)`
    })
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
  update()
}

export default function initMotion() {
  window.clrMotionReady = true
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    document.documentElement.classList.remove("js-motion")
    return
  }
  document.documentElement.classList.add("js-motion")
  const start = () => {
    initReveal()
    initParallax()
    initMagicHat()
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start)
  else start()
}
