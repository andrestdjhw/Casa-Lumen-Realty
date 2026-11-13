import React, { useRef, useState } from "react"
import Icon from "./Icon"

const inputBase = "w-full rounded-sm border px-3.5 py-2.5 text-sm transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 focus:outline-none"

// Tonos: "light" sobre fondos claros; "dark" sobre el vidrio navy del hero.
const THEMES = {
  light: {
    input: `${inputBase} border-cream-200 bg-white text-ink placeholder:text-ink/35 aria-[invalid=true]:border-red-700`,
    label: "text-ink/80",
    muted: "text-ink/45",
    error: "text-red-700",
    title: "text-ink",
    intro: "text-ink/65",
    pill: "border-cream-200 bg-white text-ink/75 hover:border-gold-500 has-checked:border-navy-900 has-checked:bg-navy-900 has-checked:text-white",
    consent: "text-ink/70",
    link: "hover:text-gold-600",
    checkbox: "accent-navy-900",
    submit: "btn-primary",
    success: "text-ink",
    successText: "text-ink/70"
  },
  dark: {
    input: `${inputBase} border-white/25 bg-white/10 text-white placeholder:text-white/40 aria-[invalid=true]:border-red-300 [&_option]:text-ink`,
    label: "text-white/85",
    muted: "text-white/50",
    error: "text-red-300",
    title: "text-white",
    intro: "text-white/70",
    pill: "border-white/25 bg-white/5 text-white/80 hover:border-gold-300 has-checked:border-white has-checked:bg-white has-checked:text-navy-900",
    consent: "text-white/70",
    link: "hover:text-gold-300",
    checkbox: "accent-gold-300",
    submit: "btn-primary bg-white text-navy-900 hover:bg-cream-100",
    success: "text-white",
    successText: "text-white/75"
  }
}

// Orden en que se enfoca el primer campo con error.
const FIELD_ORDER = ["interest", "name", "email", "phone", "language", "area", "timeline", "message", "consent"]

// Formulario estándar: los mismos campos en todo el sitio, para que cada correo de lead
// llegue completo y coincida con la plantilla de EmailJS.
const EXTRA_FIELDS = ["area", "timeline", "message"]

function Field({ id, label, optional, error, t, theme, children }) {
  return (
    <div>
      <label htmlFor={id} className={`mb-1.5 block text-xs font-semibold ${theme.label}`}>
        {label}
        {optional && <span className={`font-normal ${theme.muted}`}> ({t.optional})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={`mt-1 text-xs ${theme.error}`}>
          {t[error]}
        </p>
      )}
    </div>
  )
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = "required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "invalidEmail"
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "invalidPhone"
  if (!values.interest) errors.interest = "required"
  if (!values.language) errors.language = "required"
  if (!values.consent) errors.consent = "consentNeeded"
  return errors
}

// reCAPTCHA v3: el script se carga solo cuando alguien empieza a llenar un formulario
// (no en cada visita). Una sola carga para todos los formularios de la página.
let recaptchaPromise = null
function loadRecaptcha(siteKey) {
  if (!siteKey) return Promise.resolve(null)
  if (!recaptchaPromise) {
    recaptchaPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
      script.async = true
      script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha))
      script.onerror = () => {
        recaptchaPromise = null
        reject(new Error("reCAPTCHA failed to load"))
      }
      document.head.append(script)
    })
  }
  return recaptchaPromise
}

// Cada token sirve una sola vez: se pide uno por envío.
async function recaptchaToken(siteKey, action) {
  const grecaptcha = await loadRecaptcha(siteKey)
  return grecaptcha ? grecaptcha.execute(siteKey, { action }) : ""
}

// API REST de EmailJS (sin dependencia extra). EmailJS verifica el token si la plantilla
// tiene reCAPTCHA activado con la secret key.
async function sendEmail(emailjs, templateId, params, siteKey) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjs.serviceId,
      template_id: templateId,
      user_id: emailjs.publicKey,
      template_params: { ...params, "g-recaptcha-response": await recaptchaToken(siteKey, "contact") }
    })
  })
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`)
}

// Aviso de reCAPTCHA con enlaces: "{privacy}" y "{terms}" se reemplazan por <a>.
function RecaptchaNotice({ t, className }) {
  const links = {
    privacy: ["https://policies.google.com/privacy", t.googlePrivacy],
    terms: ["https://policies.google.com/terms", t.googleTerms]
  }
  return (
    <p className={className}>
      {t.recaptcha.split(/\{(privacy|terms)\}/).map((part, i) =>
        links[part] ? (
          <a key={i} href={links[part][0]} target="_blank" rel="noopener" className="underline underline-offset-2">
            {links[part][1]}
          </a>
        ) : (
          part
        )
      )}
    </p>
  )
}

function trackLead(interest) {
  // Brief §14: eventos lead_form_submit + buyer_lead / seller_lead / investment_lead.
  const leadEvents = { buying: "buyer_lead", selling: "seller_lead", investing: "investment_lead" }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "lead_form_submit", lead_interest: interest })
  if (leadEvents[interest]) window.dataLayer.push({ event: leadEvents[interest] })
}

function ContactForm({ config, variant = "full", source = "", title, intro, interest = "", submit, tone = "light", dense = false }) {
  const { form, lang } = config
  const { i18n: t, options, emailjs, recaptcha } = form
  const full = variant === "full"
  const theme = THEMES[tone] || THEMES.light
  // "dense": versión más compacta (formulario del hero, pedido del cliente).
  const inputClass = dense ? `${theme.input} py-2! text-[13px]!` : theme.input
  const uid = useRef(`cf-${source || variant}`).current
  const startedAt = useRef(Date.now())
  const formRef = useRef(null)

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    language: lang,
    interest,
    area: "",
    timeline: "",
    message: "",
    consent: false,
    website: ""
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")

  const set = name => e => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setValues(v => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest)
  }

  const focusFirstError = errs => {
    const first = FIELD_ORDER.find(f => errs[f])
    const el = first && formRef.current.querySelector(`[name="${first}"]`)
    if (el) el.focus()
  }

  const onSubmit = async e => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      focusFirstError(errs)
      return
    }

    // Anti-spam: honeypot lleno o envío en menos de 3 s. Se muestra "éxito" sin enviar nada.
    if (values.website || Date.now() - startedAt.current < 3000) {
      setStatus("success")
      return
    }

    // Variables disponibles en las plantillas de EmailJS: {{name}}, {{email}}, {{phone}}, ...
    const label = (field, value) => (value ? options[field]?.[value] || value : "—")
    const params = {
      name: values.name.trim(),
      email: values.email.trim(),
      reply_to: values.email.trim(),
      phone: values.phone.trim(),
      interest: label("interest", values.interest),
      title: label("interest", values.interest),
      language: label("language", values.language),
      area: values.area.trim() || "—",
      timeline: label("timeline", values.timeline),
      message: values.message.trim() || "—",
      form: source || variant,
      page: window.location.href,
      site_language: lang
    }

    setStatus("sending")
    try {
      await sendEmail(emailjs, emailjs.contactTemplate, params, recaptcha)
    } catch (err) {
      console.error(err)
      setStatus("error")
      return
    }

    trackLead(values.interest)
    setStatus("success")

    // Auto-respuesta al cliente: si falla, el lead ya llegó; no se muestra error.
    sendEmail(emailjs, emailjs.autoReplyTemplate, params, recaptcha).catch(err => console.error(err))
  }

  // Precarga reCAPTCHA en cuanto alguien entra al formulario.
  const onFocus = () => loadRecaptcha(recaptcha).catch(() => {})

  if (status === "success") {
    return (
      <div role="status" className="py-8 text-center">
        <Icon name="check-circle" className="mx-auto size-12 text-gold-500" />
        <p className={`mt-4 font-serif text-2xl ${theme.success}`}>{t.successTitle}</p>
        <p className={`mt-2 text-sm leading-relaxed ${theme.successText}`}>{t.success}</p>
      </div>
    )
  }

  const describedBy = name => (errors[name] ? `${uid}-${name}-error` : undefined)

  // Campos opcionales por página: los que tienen opciones son <select>.
  const renderExtra = name => {
    const id = `${uid}-${name}`
    const common = {
      id,
      name,
      value: values[name],
      onChange: set(name),
      className: inputClass,
      "aria-invalid": !!errors[name],
      "aria-describedby": describedBy(name)
    }

    let control
    if (name === "message") {
      control = <textarea {...common} rows={dense ? 2 : 4} maxLength={2000} />
    } else if (options[name]) {
      control = (
        <select {...common}>
          <option value="">{t.select}</option>
          {Object.entries(options[name]).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )
    } else {
      control = <input {...common} type="text" />
    }

    return (
      <div key={name} className={name === "message" ? (full ? "sm:col-span-2" : "col-span-2") : ""}>
        <Field id={id} label={t[name]} optional error={errors[name]} t={t} theme={theme}>
          {control}
        </Field>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onFocus} noValidate>
      {title && <h2 className={`font-serif leading-tight ${dense ? "text-xl" : "text-2xl"} ${theme.title}`}>{title}</h2>}
      {intro && <p className={`mt-2 leading-relaxed ${dense ? "text-xs" : "text-sm"} ${theme.intro}`}>{intro}</p>}

      <div className={`grid ${dense ? "gap-3" : "gap-4"} ${title || intro ? (dense ? "mt-4" : "mt-5") : ""} ${full ? "sm:grid-cols-2" : ""}`}>
        <fieldset className={full ? "sm:col-span-2" : ""}>
          <legend className={`mb-2 block text-xs font-semibold ${theme.label}`}>{t.interest}</legend>
          <div className={`grid gap-2 ${full ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
            {Object.entries(options.interest).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-sm border px-3 text-center ${dense ? "py-1.5" : "py-2"} text-xs font-semibold transition-colors has-focus-visible:ring-2 has-focus-visible:ring-gold-500/40 ${theme.pill}`}
              >
                <input type="radio" name="interest" value={value} checked={values.interest === value} onChange={set("interest")} className="sr-only" aria-describedby={describedBy("interest")} />
                {label}
              </label>
            ))}
          </div>
          {errors.interest && (
            <p id={`${uid}-interest-error`} className={`mt-1 text-xs ${theme.error}`}>
              {t[errors.interest]}
            </p>
          )}
        </fieldset>

        <Field id={`${uid}-name`} label={t.name} error={errors.name} t={t} theme={theme}>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" value={values.name} onChange={set("name")} className={inputClass} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
        </Field>

        <Field id={`${uid}-email`} label={t.email} error={errors.email} t={t} theme={theme}>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
        </Field>

        <div className={`grid grid-cols-[1.3fr_1fr] gap-3 ${full ? "sm:col-span-2 sm:grid-cols-2 sm:gap-4" : ""}`}>
          <Field id={`${uid}-phone`} label={t.phone} error={errors.phone} t={t} theme={theme}>
            <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} className={inputClass} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
          </Field>

          <Field id={`${uid}-language`} label={t.language} error={errors.language} t={t} theme={theme}>
            <select id={`${uid}-language`} name="language" value={values.language} onChange={set("language")} className={inputClass} aria-invalid={!!errors.language} aria-describedby={describedBy("language")}>
              {Object.entries(options.language).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* En el formulario compacto, zona y plazo van lado a lado para no alargarlo. */}
        {full ? EXTRA_FIELDS.map(renderExtra) : <div className="grid grid-cols-2 gap-3">{EXTRA_FIELDS.map(renderExtra)}</div>}

        {/* Honeypot: invisible para personas, los bots suelen llenarlo. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
          </label>
        </div>

        <div className={full ? "sm:col-span-2" : ""}>
          <label className={`flex items-start gap-2.5 text-xs leading-relaxed ${theme.consent}`}>
            <input type="checkbox" name="consent" checked={values.consent} onChange={set("consent")} className={`mt-0.5 size-4 shrink-0 ${theme.checkbox}`} aria-invalid={!!errors.consent} aria-describedby={describedBy("consent")} />
            <span>
              {t.consent}{" "}
              <a href={t.privacyUrl} className={`underline underline-offset-2 ${theme.link}`}>
                {t.privacy}
              </a>
              .
            </span>
          </label>
          {errors.consent && (
            <p id={`${uid}-consent-error`} className={`mt-1 text-xs ${theme.error}`}>
              {t[errors.consent]}
            </p>
          )}
        </div>

        <div className={full ? "sm:col-span-2" : ""}>
          <button type="submit" disabled={status === "sending"} className={`${theme.submit} w-full ${dense ? "py-3!" : ""} disabled:cursor-wait disabled:opacity-70`}>
            {status === "sending" ? t.sending : submit || t.submit}
            {status !== "sending" && <Icon name="arrow-right" className="size-4" />}
          </button>
          <p role="alert" className={`mt-2 text-xs empty:hidden ${theme.error}`}>
            {status === "error" ? t.error : ""}
          </p>
          {recaptcha && <RecaptchaNotice t={t} className={`mt-3 text-[11px] leading-relaxed ${theme.muted}`} />}
        </div>
      </div>
    </form>
  )
}

export default ContactForm
