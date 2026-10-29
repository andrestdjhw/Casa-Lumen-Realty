import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Icon from "./Icon"

// Botón flotante de llamada. Se monta en <body> con un portal porque el header
// usa transform, y un position:fixed dentro de él no quedaría fijo a la ventana.
// Se oculta al llegar a la franja legal del footer para no tapar sus enlaces.
function FloatingCall({ site, i18n, visible: wanted }) {
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    let observer
    // El footer lo monta otro root de React; se espera a que exista.
    const frame = requestAnimationFrame(() => {
      const legal = document.getElementById("clr-footer-legal")
      if (!legal) return
      observer = new IntersectionObserver(([entry]) => setAtBottom(entry.isIntersecting))
      observer.observe(legal)
    })
    return () => {
      cancelAnimationFrame(frame)
      if (observer) observer.disconnect()
    }
  }, [])

  const visible = wanted && !atBottom
  const onClick = () => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: "click_call", call_location: "floating_button" })
  }

  return createPortal(
    <a
      href={site.phoneHref}
      onClick={onClick}
      aria-label={`${i18n.call} ${site.phone}`}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`plane fixed right-4 bottom-4 z-40 transition-all duration-300 ease-out motion-reduce:transition-none sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="flex items-center gap-3 bg-navy-900 p-4 text-white transition-colors hover:bg-navy-700 sm:px-5 sm:py-3.5">
        <Icon name="phone" className="size-5 text-gold-300" />
        <span className="hidden text-sm font-semibold sm:inline">{site.phone}</span>
      </span>
    </a>,
    document.body
  )
}

export default FloatingCall
