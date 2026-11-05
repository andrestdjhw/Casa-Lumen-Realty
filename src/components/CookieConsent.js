import React, { useEffect, useState } from "react"
import { getConsent, setConsent } from "../consent"

// Aviso de cookies. No bloquea la página ni roba el foco; Aceptar y Rechazar
// tienen el mismo peso visual. Se reabre desde "Cookie settings" en el footer.
function CookieConsent({ config }) {
  const t = config.i18n
  const [open, setOpen] = useState(() => getConsent() === null)

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener("clr:open-cookie-settings", reopen)
    return () => window.removeEventListener("clr:open-cookie-settings", reopen)
  }, [])

  // En móvil el aviso ocupa el borde inferior: el botón flotante de llamada se oculta mientras tanto.
  useEffect(() => {
    document.documentElement.classList.toggle("clr-cookie-open", open)
  }, [open])

  if (!open) return null

  const choose = value => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="clr-cookie-title"
      aria-describedby="clr-cookie-text"
      className="plane fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
    >
      <div className="border border-cream-200 bg-white p-6">
        <p id="clr-cookie-title" className="font-serif text-xl text-ink">
          {t.cookieTitle}
        </p>
        <p id="clr-cookie-text" className="mt-2 text-sm leading-relaxed text-ink/70">
          {t.cookieText}{" "}
          <a href={t.privacyUrl} className="underline underline-offset-2 hover:text-gold-600">
            {t.privacyLink}
          </a>
          .
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => choose("rejected")} className="btn-outline px-4 py-3">
            {t.cookieReject}
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn-primary px-4 py-3">
            {t.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
