import React from "react"
import Logo from "./Logo"
import Icon from "./Icon"

function OfficeMap({ site, i18n }) {
  return (
    <div className="overflow-hidden rounded-sm border border-cream-200 bg-white shadow-sm">
      <div className="relative h-48 bg-cream-100">
        <iframe title={i18n.mapTitle} src={site.mapsEmbed} className="absolute inset-0 size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
      <div className="p-4 text-sm leading-relaxed text-ink/75">
        {site.address.map(line => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <a href={site.mapsUrl} target="_blank" rel="noopener" className="link-arrow mt-2">
          {i18n.openInMaps}
          <Icon name="arrow-right" className="size-4" />
        </a>
      </div>
    </div>
  )
}

// Bloque de firma de la marca: se muestra en inglés y en español con el mismo peso.
function SignatureBlock({ lang, line }) {
  return (
    <div lang={lang} className="w-72 border-2 border-navy-800 text-navy-800">
      <div className="flex border-b-2 border-navy-800">
        <span className="px-3 py-1.5 font-serif text-[15px] font-bold">Casa Lumen</span>
        <span className="flex items-center border-l-2 border-navy-800 px-3 text-[10px] tracking-[0.18em]">SAN ANTONIO · TX</span>
      </div>
      <p className="px-3 pt-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase">{line}</p>
      <span className="ruler mx-3 mt-1 mb-1.5 block" aria-hidden="true" />
    </div>
  )
}

function Footer({ config }) {
  const { homeUrl, site, nav, socials, legal, i18n } = config
  const year = new Date().getFullYear()

  return (
    <div className="border-t border-cream-200 bg-cream-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.3fr_1.4fr]">
        <div>
          <a href={homeUrl} aria-label={site.name}>
            <Logo />
          </a>
          <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-ink/70">{site.tagline}</p>
          <ul aria-label={i18n.social} className="mt-6 flex gap-4 text-ink/80">
            {socials.map(social => (
              <li key={social.icon}>
                <a href={social.url} target="_blank" rel="noopener" aria-label={social.label} title={social.label} className="block hover:text-gold-600">
                  <Icon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={i18n.explore}>
          <h2 className="text-sm font-semibold text-ink">{i18n.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {nav.flatMap(item => item.children || [item]).map(item => (
              <li key={item.url}>
                <a href={item.url} className="hover:text-gold-600">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">{i18n.contact}</h2>
          <ul className="mt-4 space-y-4 text-sm text-ink/75">
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-gold-600">
                <Icon name="phone" className="size-5 shrink-0 text-ink" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-gold-600">
                <Icon name="mail" className="size-5 shrink-0 text-ink" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="map-pin" className="size-5 shrink-0 text-ink" />
              <address className="not-italic">
                {site.address.map(line => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener" className="flex gap-3 hover:text-gold-600">
                <Icon name="facebook" className="size-5 shrink-0 text-ink" />
                <span>
                  {i18n.facebook}
                  <span className="block text-ink/55">/yolandabarbozarealtor/</span>
                </span>
              </a>
            </li>
            <li>
              <a href={site.googleProfile} target="_blank" rel="noopener" className="flex gap-3 hover:text-gold-600">
                <Icon name="google" className="size-5 shrink-0 text-ink" />
                {i18n.googleProfile}
              </a>
            </li>
          </ul>
        </div>

        {config.footerMap && <OfficeMap site={site} i18n={i18n} />}
      </div>

      <div className="border-t border-cream-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <SignatureBlock lang="en" line="Real estate · Out in the open" />
            <SignatureBlock lang="es" line="Bienes raíces · A plena vista" />
          </div>
          <p className="text-xs text-ink/60">
            {i18n.family} · {i18n.equalHousing}
          </p>
        </div>
      </div>

      <div className="border-t border-cream-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-ink/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {site.name}. {i18n.rights}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {legal.map(item => (
              <li key={item.url}>
                <a href={item.url} className="hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
