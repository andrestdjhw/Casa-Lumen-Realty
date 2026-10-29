// Inclinación de las tarjetas .card3d según la posición del puntero.
// Solo con mouse/trackpad y si el usuario no pidió reducir el movimiento.
// Usa delegación en document, así también cubre tarjetas que React monta después
// (p. ej. las del mega menú).
const MAX_TILT = 6

function reset(card) {
  if (!card) return
  card.classList.remove("is-tilting")
  card.style.removeProperty("--rx")
  card.style.removeProperty("--ry")
}

export default function initCardTilt() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!canHover || reduceMotion) return

  let current = null

  document.addEventListener(
    "pointermove",
    e => {
      const card = e.target.closest?.(".card3d") || null
      if (card !== current) {
        reset(current)
        current = card
      }
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.classList.add("is-tilting")
      card.style.setProperty("--rx", `${(-y * MAX_TILT).toFixed(2)}deg`)
      card.style.setProperty("--ry", `${(x * MAX_TILT).toFixed(2)}deg`)
    },
    { passive: true }
  )

  // El puntero salió de la ventana.
  document.addEventListener("pointerout", e => {
    if (!e.relatedTarget) {
      reset(current)
      current = null
    }
  })
}
