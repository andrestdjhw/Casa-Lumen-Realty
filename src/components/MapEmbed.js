import React from "react"
import Icon from "./Icon"
import { setConsent, useConsent } from "../consent"

// Mapa de Google: solo se inserta si el visitante aceptó cookies (brief §11).
// Por defecto muestra la oficina; src/url/title permiten otros lugares (p. ej. zonas).
// "compact" es el respaldo breve para mosaicos pequeños.
function MapEmbed({ site, i18n, className = "", src, url, title, compact = false }) {
  const consent = useConsent()
  const embedSrc = src || site.mapsEmbed
  const mapsUrl = url || site.mapsUrl

  if (consent === "accepted") {
    return <iframe title={title || i18n.mapTitle} src={embedSrc} className={`border-0 ${className}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 bg-cream-100 text-center ${compact ? "p-3" : "p-6"} ${className}`}>
      <Icon name="map-pin" className={`${compact ? "size-5" : "size-7"} text-gold-600`} />
      <p className={`leading-relaxed text-ink/65 ${compact ? "text-[11px]" : "max-w-xs text-xs"}`}>{compact ? i18n.mapConsentShort : i18n.mapConsent}</p>
      <div className={`flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-semibold ${compact ? "text-xs" : "text-sm"}`}>
        <button type="button" onClick={() => setConsent("accepted")} className="text-navy-900 underline underline-offset-4 hover:text-gold-600">
          {compact ? i18n.mapShow : i18n.mapAccept}
        </button>
        <a href={mapsUrl} target="_blank" rel="noopener" className="text-gold-600 hover:text-navy-900">
          {compact ? i18n.mapOpen : i18n.openInMaps}
        </a>
      </div>
    </div>
  )
}

export default MapEmbed
