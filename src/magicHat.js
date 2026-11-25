// Entrada "sombrero de mago" para el formulario del hero (inspirada en silvercrestus.com):
// la tarjeta sale de abajo aplastada, girada y borrosa, se estira con un rebote elástico,
// suelta una nube de humo y chispas doradas, y al final entra su contenido escalonado.
//
// Web Animations API (sin GSAP). Se activa con [data-magic-hat] y solo con html.js-motion
// (sin "reducir movimiento"). Antes de animar, la tarjeta está oculta por CSS.

const SPARK_COLORS = ["var(--color-gold-300)", "var(--color-gold-500)", "var(--color-cream-50)", "#ffffff"]
const POWER3_OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)"

// Rebote elástico (amplitud 1, periodo 0.55) muestreado para la función CSS linear().
function elasticEasing() {
  const period = 0.55
  const shift = period / 4
  const points = Array.from({ length: 49 }, (_, i) => {
    const t = i / 48
    return (Math.pow(2, -10 * t) * Math.sin(((t - shift) * 2 * Math.PI) / period) + 1).toFixed(3)
  })
  points[0] = "0"
  points[48] = "1"
  const easing = `linear(${points.join(", ")})`
  return CSS.supports("animation-timing-function", easing) ? easing : "cubic-bezier(0.34, 1.56, 0.64, 1)"
}

const random = (min, max) => min + Math.random() * (max - min)

function play(card) {
  const host = card.parentElement

  // Humo y chispas: capa vacía centrada en la base de la tarjeta.
  const fx = document.createElement("div")
  fx.className = "magic-fx"
  fx.setAttribute("aria-hidden", "true")
  const poof = document.createElement("span")
  poof.className = "magic-poof"
  fx.append(poof)
  const sparks = Array.from({ length: 18 }, (_, i) => {
    const spark = document.createElement("span")
    spark.className = "magic-spark"
    spark.style.background = SPARK_COLORS[i % SPARK_COLORS.length]
    fx.append(spark)
    return spark
  })
  host.append(fx)

  card.classList.add("is-visible")
  card.style.transformOrigin = "50% 100%"

  // 1) Sale del sombrero (0.55 s) y 2) se acomoda con rebote elástico (1 s).
  const total = 1550
  const entrance = card.animate(
    [
      { opacity: 0, transform: "translateY(180px) scale(0.08, 0.25) rotate(-8deg)", filter: "blur(8px)", easing: POWER3_OUT },
      { opacity: 1, transform: "translateY(-14px) scale(0.32, 1.08) rotate(3deg)", filter: "blur(2px)", offset: 550 / total, easing: elasticEasing() },
      { opacity: 1, transform: "none", filter: "blur(0px)" }
    ],
    { duration: total, fill: "backwards" }
  )

  // Nube de humo.
  poof.animate(
    [
      { transform: "scale(0)", opacity: 0.75 },
      { transform: "scale(1.8)", opacity: 0 }
    ],
    { duration: 900, delay: 50, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fill: "both" }
  )

  // Chispas en direcciones al azar, hacia arriba.
  sparks.forEach((spark, i) => {
    spark.animate(
      [
        { transform: "translate(0, 0) scale(0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${random(-240, 240)}px, ${random(-300, -60)}px) scale(${random(0.6, 1.5)}) rotate(${random(-180, 180)}deg)`, opacity: 0 }
      ],
      { duration: random(900, 1400), delay: 500 + i * 15, easing: POWER3_OUT, fill: "both" }
    )
  })

  // 3) El contenido (título, texto y campos) entra escalonado.
  card.querySelectorAll(":scope form > h2, :scope form > p, :scope form > div > *").forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "none" }
      ],
      { duration: 600, delay: 950 + i * 50, easing: POWER3_OUT, fill: "backwards" }
    )
  })

  entrance.finished.then(() => {
    card.style.removeProperty("transform-origin")
    setTimeout(() => fx.remove(), 1200)
  })
}

export default function initMagicHat() {
  if (!document.documentElement.classList.contains("js-motion")) return
  document.querySelectorAll("[data-magic-hat]").forEach(card => {
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          io.disconnect()
          // Pequeña pausa para que React termine de montar el formulario.
          setTimeout(() => play(card), 350)
        }
      },
      { rootMargin: "0px 0px -5% 0px" }
    )
    io.observe(card.parentElement)
  })
}
