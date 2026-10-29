import React, { useEffect, useRef, useState } from "react"
import Logo from "./Logo"
import Icon from "./Icon"
import TopBar from "./TopBar"
import FloatingCall from "./FloatingCall"

function isActive(item) {
  if (item.children) return item.children.some(isActive)
  const path = new URL(item.url, window.location.origin).pathname
  const current = window.location.pathname
  // El inicio ("/" o "/es/") solo está activo en sí mismo, no en sus subpáginas.
  const isHome = /^\/(es\/?)?$/.test(path)
  return isHome ? current.replace(/\/$/, "") === path.replace(/\/$/, "") : current.startsWith(path)
}

// Panel desplegable de escritorio: se abre con hover o clic y se cierra con Escape,
// clic fuera o al salir el foco.
function MegaMenu({ item, site, i18n }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const closeTimer = useRef(null)
  const active = isActive(item)
  const panelId = `clr-mega-${item.label.toLowerCase().replace(/\W+/g, "-")}`

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === "Escape") {
        setOpen(false)
        ref.current.querySelector("button").focus()
      }
    }
    const onClick = e => !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("click", onClick)
    }
  }, [open])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <li ref={ref} onMouseEnter={show} onMouseLeave={hide} onBlur={e => !ref.current.contains(e.relatedTarget) && setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(o => !o)}
        className={`relative flex items-center gap-1 py-2 transition-colors hover:text-ink ${active || open ? "text-ink" : ""} ${active ? "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold-500" : ""}`}
      >
        {item.label}
        <Icon name="chevron-down" className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full border-t border-cream-200 bg-cream-50 shadow-[0_24px_40px_-24px_rgba(22,33,58,0.35)]">
        <div className="mx-auto grid max-w-site gap-8 px-6 py-8 lg:grid-cols-[1fr_1fr_1fr_1.15fr]">
          {item.children.map(child => (
            <a
              key={child.url}
              href={child.url}
              aria-current={isActive(child) ? "page" : undefined}
              // Mismo plano 3D que las tarjetas de servicios (clases plane + card3d).
              className="group plane card3d block"
            >
              <span className="block h-full bg-white p-6">
                <span className="flex size-12 items-center justify-center text-gold-500 ring-1 ring-cream-200 group-hover:ring-gold-300">
                  <Icon name={child.icon} className="size-6" />
                </span>
                <span className="mt-4 block font-serif text-xl text-ink">{child.label}</span>
                <span className="mt-2 block text-sm leading-relaxed font-normal text-ink/65">{child.description}</span>
                <Icon name="arrow-right" className="mt-4 size-4 text-gold-600 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}

          <div className="bg-navy-900 p-6 text-white">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gold-300 uppercase">{i18n.megaEyebrow}</p>
            <p className="mt-3 font-serif text-2xl leading-snug">{i18n.megaTitle}</p>
            <p className="mt-2 text-sm leading-relaxed font-normal text-white/70">{i18n.megaText}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a href={site.contactUrl} className="inline-flex items-center gap-2 font-semibold text-gold-300 hover:text-white">
                {i18n.cta}
                <Icon name="arrow-right" className="size-4" />
              </a>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold text-white/85 hover:text-white">
                <Icon name="phone" className="size-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function MobileGroup({ item }) {
  const [open, setOpen] = useState(isActive(item))
  const panelId = `clr-mobile-${item.label.toLowerCase().replace(/\W+/g, "-")}`

  return (
    <li className="border-b border-cream-200">
      <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between py-3 font-medium text-ink/85">
        {item.label}
        <Icon name="chevron-down" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <ul id={panelId} hidden={!open} className="pb-3">
        {item.children.map(child => (
          <li key={child.url}>
            <a href={child.url} aria-current={isActive(child) ? "page" : undefined} className="flex items-center gap-3 py-2.5 pl-1 text-sm font-medium text-ink/80 aria-[current=page]:text-gold-600">
              <Icon name={child.icon} className="size-5 text-gold-500" />
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

function Navbar({ config }) {
  const { homeUrl, site, nav, socials, languages, i18n } = config
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [topBarHidden, setTopBarHidden] = useState(false)

  // La TopBar se oculta al bajar y reaparece al subir. Se ignoran
  // movimientos pequeños para que no parpadee con el scroll del trackpad.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (y < 120) {
        setTopBarHidden(false)
      } else if (Math.abs(y - lastY) > 6) {
        setTopBarHidden(y > lastY)
      }
      lastY = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className={`pointer-events-auto transition-transform duration-300 ease-out motion-reduce:transition-none ${topBarHidden && !open ? "-translate-y-10" : ""}`}>
      <TopBar site={site} socials={socials} i18n={i18n} />
      {/* El teléfono vive en la TopBar; cuando esta se oculta, aparece el botón flotante. */}
      <FloatingCall site={site} i18n={i18n} visible={topBarHidden && !open} />

      <div className={`relative bg-cream-50/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.12)]" : ""}`}>
      <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-6 px-4 sm:px-6">
        <a href={homeUrl} aria-label={site.name} className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-[15.6px] font-medium xl:gap-7 text-ink/80">
            {nav.map(item => {
              if (item.children) return <MegaMenu key={item.label} item={item} site={site} i18n={i18n} />

              const active = isActive(item)
              return (
                <li key={item.url}>
                  <a
                    href={item.url}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 transition-colors hover:text-ink ${active ? "text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold-500" : ""}`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-1.5 text-xs font-semibold sm:flex">
            {languages.map((lang, i) => (
              <React.Fragment key={lang.code}>
                {i > 0 && <span className="text-ink/30">|</span>}
                <a
                  href={lang.url}
                  hrefLang={lang.lang}
                  lang={lang.lang}
                  aria-label={lang.label}
                  aria-current={lang.current ? "true" : undefined}
                  className={lang.current ? "text-ink" : "text-ink/45 hover:text-ink"}
                >
                  {lang.code}
                </a>
              </React.Fragment>
            ))}
          </div>

          <a href={site.contactUrl} className="btn-primary hidden py-3.5! md:inline-flex">
            {i18n.cta}
            <Icon name="arrow-right" className="size-4" />
          </a>

          <button
            type="button"
            className="-mr-2 p-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="clr-mobile-menu"
            aria-label={open ? i18n.close : i18n.menu}
            onClick={() => setOpen(o => !o)}
          >
            <Icon name={open ? "x" : "menu"} className="size-6" />
          </button>
        </div>
      </div>
      </div>

      {open && (
        <nav id="clr-mobile-menu" aria-label="Mobile" className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-t border-cream-200 bg-cream-50 lg:hidden">
          <ul className="mx-auto max-w-site px-4 py-4 sm:px-6">
            {nav.map(item =>
              item.children ? (
                <MobileGroup key={item.label} item={item} />
              ) : (
                <li key={item.url}>
                  <a
                    href={item.url}
                    aria-current={isActive(item) ? "page" : undefined}
                    className="block border-b border-cream-200 py-3 font-medium text-ink/85 aria-[current=page]:text-gold-600"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
          <div className="mx-auto flex max-w-site flex-col gap-3 px-4 pb-6 sm:px-6">
            <a href={site.contactUrl} className="btn-primary">
              {i18n.cta}
              <Icon name="arrow-right" className="size-4" />
            </a>
            <a href={site.phoneHref} className="btn-outline">
              <Icon name="phone" className="size-4 text-gold-600" />
              {site.phone}
            </a>
            <div className="flex justify-center gap-3 pt-2 text-sm font-semibold sm:hidden">
              {languages.map(lang => (
                <a
                  key={lang.code}
                  href={lang.url}
                  hrefLang={lang.lang}
                  lang={lang.lang}
                  aria-current={lang.current ? "true" : undefined}
                  className={lang.current ? "text-ink" : "text-ink/45"}
                >
                  {lang.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  )
}

export default Navbar
