import { useEffect, useState } from "react"

// Consentimiento de cookies: "accepted" | "rejected" | null (sin decidir).
// Se guarda en localStorage y se comunica a GTM/GA4 con Consent Mode
// (el valor por defecto "denied" lo fija inc/consent.php antes de cargar nada).
const KEY = "clr_cookie_consent"

export function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(KEY))?.value || null
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }))
  } catch {}

  window.dataLayer = window.dataLayer || []
  // GTM solo procesa los comandos de consentimiento con la forma de gtag() (objeto arguments).
  function gtag() {
    window.dataLayer.push(arguments)
  }
  gtag("consent", "update", { analytics_storage: value === "accepted" ? "granted" : "denied" })
  window.dataLayer.push({ event: "cookie_consent", consent: value })
  window.dispatchEvent(new CustomEvent("clr:consent", { detail: value }))
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("clr:open-cookie-settings"))
}

export function useConsent() {
  const [consent, setState] = useState(getConsent)

  useEffect(() => {
    const onChange = e => setState(e.detail)
    window.addEventListener("clr:consent", onChange)
    return () => window.removeEventListener("clr:consent", onChange)
  }, [])

  return consent
}
