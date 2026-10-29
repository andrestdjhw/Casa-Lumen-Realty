import React from "react"
import Icon from "./Icon"

// Barra superior: contacto, dirección (enlaza a Google Maps) y redes sociales.
// Su altura (h-10) es la que Navbar desplaza al ocultarla.
function TopBar({ site, socials, i18n }) {
  return (
    <div className="bg-navy-900 text-xs text-white/80">
      <div className="mx-auto flex h-10 max-w-site items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-5 lg:flex-1">
          <a href={site.phoneHref} className="flex items-center gap-2 transition-colors hover:text-white">
            <Icon name="phone" className="size-3.5 text-gold-300" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-2 transition-colors hover:text-white sm:flex">
            <Icon name="mail" className="size-3.5 text-gold-300" />
            {site.email}
          </a>
        </div>

        <a href={site.mapsUrl} target="_blank" rel="noopener" className="hidden items-center gap-2 transition-colors hover:text-white lg:flex">
          <Icon name="map-pin" className="size-3.5 text-gold-300" />
          {site.address.join(", ")}
        </a>

        <ul aria-label={i18n.social} className="-mr-1.5 flex items-center justify-end gap-1 lg:flex-1">
          {socials.map(social => (
            <li key={social.icon}>
              <a href={social.url} target="_blank" rel="noopener" aria-label={social.label} title={social.label} className="block p-1.5 transition-colors hover:text-gold-300">
                <Icon name={social.icon} className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TopBar
