// Inclinación de las tarjetas .card3d según la posición del puntero.
// Solo con mouse/trackpad y si el usuario no pidió reducir el movimiento.
const MAX_TILT = 6

export default function initCardTilt() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!canHover || reduceMotion) return

  document.querySelectorAll(".card3d").forEach(card => {
    card.addEventListener("pointermove", e => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.classList.add("is-tilting")
      card.style.setProperty("--rx", `${(-y * MAX_TILT).toFixed(2)}deg`)
      card.style.setProperty("--ry", `${(x * MAX_TILT).toFixed(2)}deg`)
    })

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting")
      card.style.removeProperty("--rx")
      card.style.removeProperty("--ry")
    })
  })
}
