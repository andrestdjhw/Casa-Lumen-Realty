/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cardTilt.js"
/*!*************************!*\
  !*** ./src/cardTilt.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initCardTilt)
/* harmony export */ });
// Inclinación de las tarjetas .card3d según la posición del puntero.
// Solo con mouse/trackpad y si el usuario no pidió reducir el movimiento.
// Usa delegación en document, así también cubre tarjetas que React monta después
// (p. ej. las del mega menú).
const MAX_TILT = 6;
function reset(card) {
  if (!card) return;
  card.classList.remove("is-tilting");
  card.style.removeProperty("--rx");
  card.style.removeProperty("--ry");
}
function initCardTilt() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;
  let current = null;
  document.addEventListener("pointermove", e => {
    const card = e.target.closest?.(".card3d") || null;
    if (card !== current) {
      reset(current);
      current = card;
    }
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.classList.add("is-tilting");
    card.style.setProperty("--rx", `${(-y * MAX_TILT).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * MAX_TILT).toFixed(2)}deg`);
  }, {
    passive: true
  });

  // El puntero salió de la ventana.
  document.addEventListener("pointerout", e => {
    if (!e.relatedTarget) {
      reset(current);
      current = null;
    }
  });
}

/***/ },

/***/ "./src/components/ContactForm.js"
/*!***************************************!*\
  !*** ./src/components/ContactForm.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const inputBase = "w-full rounded-sm border px-3.5 py-2.5 text-sm transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 focus:outline-none";

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
};

// Orden en que se enfoca el primer campo con error.
const FIELD_ORDER = ["interest", "name", "email", "phone", "language", "area", "timeline", "message", "consent"];

// Formulario estándar: los mismos campos en todo el sitio, para que cada correo de lead
// llegue completo y coincida con la plantilla de EmailJS.
const EXTRA_FIELDS = ["area", "timeline", "message"];
function Field({
  id,
  label,
  optional,
  error,
  t,
  theme,
  children
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("label", {
      htmlFor: id,
      className: `mb-1.5 block text-xs font-semibold ${theme.label}`,
      children: [label, optional && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
        className: `font-normal ${theme.muted}`,
        children: [" (", t.optional, ")"]
      })]
    }), children, error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      id: `${id}-error`,
      className: `mt-1 text-xs ${theme.error}`,
      children: t[error]
    })]
  });
}
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "invalidEmail";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "invalidPhone";
  if (!values.interest) errors.interest = "required";
  if (!values.language) errors.language = "required";
  if (!values.consent) errors.consent = "consentNeeded";
  return errors;
}

// reCAPTCHA v3: el script se carga solo cuando alguien empieza a llenar un formulario
// (no en cada visita). Una sola carga para todos los formularios de la página.
let recaptchaPromise = null;
function loadRecaptcha(siteKey) {
  if (!siteKey) return Promise.resolve(null);
  if (!recaptchaPromise) {
    recaptchaPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha));
      script.onerror = () => {
        recaptchaPromise = null;
        reject(new Error("reCAPTCHA failed to load"));
      };
      document.head.append(script);
    });
  }
  return recaptchaPromise;
}

// Cada token sirve una sola vez: se pide uno por envío.
async function recaptchaToken(siteKey, action) {
  const grecaptcha = await loadRecaptcha(siteKey);
  return grecaptcha ? grecaptcha.execute(siteKey, {
    action
  }) : "";
}

// API REST de EmailJS (sin dependencia extra). EmailJS verifica el token si la plantilla
// tiene reCAPTCHA activado con la secret key.
async function sendEmail(emailjs, templateId, params, siteKey) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      service_id: emailjs.serviceId,
      template_id: templateId,
      user_id: emailjs.publicKey,
      template_params: {
        ...params,
        "g-recaptcha-response": await recaptchaToken(siteKey, "contact")
      }
    })
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}

// Aviso de reCAPTCHA con enlaces: "{privacy}" y "{terms}" se reemplazan por <a>.
function RecaptchaNotice({
  t,
  className
}) {
  const links = {
    privacy: ["https://policies.google.com/privacy", t.googlePrivacy],
    terms: ["https://policies.google.com/terms", t.googleTerms]
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
    className: className,
    children: t.recaptcha.split(/\{(privacy|terms)\}/).map((part, i) => links[part] ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
      href: links[part][0],
      target: "_blank",
      rel: "noopener",
      className: "underline underline-offset-2",
      children: links[part][1]
    }, i) : part)
  });
}
function trackLead(interest) {
  // Brief §14: eventos lead_form_submit + buyer_lead / seller_lead / investment_lead.
  const leadEvents = {
    buying: "buyer_lead",
    selling: "seller_lead",
    investing: "investment_lead"
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_form_submit",
    lead_interest: interest
  });
  if (leadEvents[interest]) window.dataLayer.push({
    event: leadEvents[interest]
  });
}
function ContactForm({
  config,
  variant = "full",
  source = "",
  title,
  intro,
  interest = "",
  submit,
  tone = "light",
  dense = false
}) {
  const {
    form,
    lang
  } = config;
  const {
    i18n: t,
    options,
    emailjs,
    recaptcha
  } = form;
  const full = variant === "full";
  const theme = THEMES[tone] || THEMES.light;
  // "dense": versión más compacta (formulario del hero, pedido del cliente).
  const inputClass = dense ? `${theme.input} py-2! text-[13px]!` : theme.input;
  const uid = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(`cf-${source || variant}`).current;
  const startedAt = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(Date.now());
  const formRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
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
  });
  const [errors, setErrors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("idle");
  const set = name => e => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues(v => ({
      ...v,
      [name]: value
    }));
    if (errors[name]) setErrors(({
      [name]: _,
      ...rest
    }) => rest);
  };
  const focusFirstError = errs => {
    const first = FIELD_ORDER.find(f => errs[f]);
    const el = first && formRef.current.querySelector(`[name="${first}"]`);
    if (el) el.focus();
  };
  const onSubmit = async e => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    // Anti-spam: honeypot lleno o envío en menos de 3 s. Se muestra "éxito" sin enviar nada.
    if (values.website || Date.now() - startedAt.current < 3000) {
      setStatus("success");
      return;
    }

    // Variables disponibles en las plantillas de EmailJS: {{name}}, {{email}}, {{phone}}, ...
    const label = (field, value) => value ? options[field]?.[value] || value : "—";
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
    };
    setStatus("sending");
    try {
      await sendEmail(emailjs, emailjs.contactTemplate, params, recaptcha);
    } catch (err) {
      console.error(err);
      setStatus("error");
      return;
    }
    trackLead(values.interest);
    setStatus("success");

    // Auto-respuesta al cliente: si falla, el lead ya llegó; no se muestra error.
    sendEmail(emailjs, emailjs.autoReplyTemplate, params, recaptcha).catch(err => console.error(err));
  };

  // Precarga reCAPTCHA en cuanto alguien entra al formulario.
  const onFocus = () => loadRecaptcha(recaptcha).catch(() => {});
  if (status === "success") {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      role: "status",
      className: "py-8 text-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: "check-circle",
        className: "mx-auto size-12 text-gold-500"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: `mt-4 font-serif text-2xl ${theme.success}`,
        children: t.successTitle
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: `mt-2 text-sm leading-relaxed ${theme.successText}`,
        children: t.success
      })]
    });
  }
  const describedBy = name => errors[name] ? `${uid}-${name}-error` : undefined;

  // Campos opcionales por página: los que tienen opciones son <select>.
  const renderExtra = name => {
    const id = `${uid}-${name}`;
    const common = {
      id,
      name,
      value: values[name],
      onChange: set(name),
      className: inputClass,
      "aria-invalid": !!errors[name],
      "aria-describedby": describedBy(name)
    };
    let control;
    if (name === "message") {
      control = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("textarea", {
        ...common,
        rows: dense ? 2 : 4,
        maxLength: 2000
      });
    } else if (options[name]) {
      control = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("select", {
        ...common,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
          value: "",
          children: t.select
        }), Object.entries(options[name]).map(([value, label]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
          value: value,
          children: label
        }, value))]
      });
    } else {
      control = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        ...common,
        type: "text"
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: name === "message" ? full ? "sm:col-span-2" : "col-span-2" : "",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Field, {
        id: id,
        label: t[name],
        optional: true,
        error: errors[name],
        t: t,
        theme: theme,
        children: control
      })
    }, name);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
    ref: formRef,
    onSubmit: onSubmit,
    onFocus: onFocus,
    noValidate: true,
    children: [title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
      className: `font-serif leading-tight ${dense ? "text-xl" : "text-2xl"} ${theme.title}`,
      children: title
    }), intro && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: `mt-2 leading-relaxed ${dense ? "text-xs" : "text-sm"} ${theme.intro}`,
      children: intro
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: `grid ${dense ? "gap-3" : "gap-4"} ${title || intro ? dense ? "mt-4" : "mt-5" : ""} ${full ? "sm:grid-cols-2" : ""}`,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("fieldset", {
        className: full ? "sm:col-span-2" : "",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("legend", {
          className: `mb-2 block text-xs font-semibold ${theme.label}`,
          children: t.interest
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: `grid gap-2 ${full ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`,
          children: Object.entries(options.interest).map(([value, label]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("label", {
            className: `cursor-pointer rounded-sm border px-3 text-center ${dense ? "py-1.5" : "py-2"} text-xs font-semibold transition-colors has-focus-visible:ring-2 has-focus-visible:ring-gold-500/40 ${theme.pill}`,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
              type: "radio",
              name: "interest",
              value: value,
              checked: values.interest === value,
              onChange: set("interest"),
              className: "sr-only",
              "aria-describedby": describedBy("interest")
            }), label]
          }, value))
        }), errors.interest && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          id: `${uid}-interest-error`,
          className: `mt-1 text-xs ${theme.error}`,
          children: t[errors.interest]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Field, {
        id: `${uid}-name`,
        label: t.name,
        error: errors.name,
        t: t,
        theme: theme,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
          id: `${uid}-name`,
          name: "name",
          type: "text",
          autoComplete: "name",
          value: values.name,
          onChange: set("name"),
          className: inputClass,
          "aria-invalid": !!errors.name,
          "aria-describedby": describedBy("name")
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Field, {
        id: `${uid}-email`,
        label: t.email,
        error: errors.email,
        t: t,
        theme: theme,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
          id: `${uid}-email`,
          name: "email",
          type: "email",
          autoComplete: "email",
          value: values.email,
          onChange: set("email"),
          className: inputClass,
          "aria-invalid": !!errors.email,
          "aria-describedby": describedBy("email")
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: `grid grid-cols-[1.3fr_1fr] gap-3 ${full ? "sm:col-span-2 sm:grid-cols-2 sm:gap-4" : ""}`,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Field, {
          id: `${uid}-phone`,
          label: t.phone,
          error: errors.phone,
          t: t,
          theme: theme,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            id: `${uid}-phone`,
            name: "phone",
            type: "tel",
            autoComplete: "tel",
            value: values.phone,
            onChange: set("phone"),
            className: inputClass,
            "aria-invalid": !!errors.phone,
            "aria-describedby": describedBy("phone")
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Field, {
          id: `${uid}-language`,
          label: t.language,
          error: errors.language,
          t: t,
          theme: theme,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("select", {
            id: `${uid}-language`,
            name: "language",
            value: values.language,
            onChange: set("language"),
            className: inputClass,
            "aria-invalid": !!errors.language,
            "aria-describedby": describedBy("language"),
            children: Object.entries(options.language).map(([value, label]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
              value: value,
              children: label
            }, value))
          })
        })]
      }), full ? EXTRA_FIELDS.map(renderExtra) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "grid grid-cols-2 gap-3",
        children: EXTRA_FIELDS.map(renderExtra)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "absolute left-[-9999px]",
        "aria-hidden": "true",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("label", {
          children: ["Website", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            name: "website",
            tabIndex: -1,
            autoComplete: "off",
            value: values.website,
            onChange: set("website")
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: full ? "sm:col-span-2" : "",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("label", {
          className: `flex items-start gap-2.5 text-xs leading-relaxed ${theme.consent}`,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "checkbox",
            name: "consent",
            checked: values.consent,
            onChange: set("consent"),
            className: `mt-0.5 size-4 shrink-0 ${theme.checkbox}`,
            "aria-invalid": !!errors.consent,
            "aria-describedby": describedBy("consent")
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
            children: [t.consent, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
              href: t.privacyUrl,
              className: `underline underline-offset-2 ${theme.link}`,
              children: t.privacy
            }), "."]
          })]
        }), errors.consent && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          id: `${uid}-consent-error`,
          className: `mt-1 text-xs ${theme.error}`,
          children: t[errors.consent]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: full ? "sm:col-span-2" : "",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
          type: "submit",
          disabled: status === "sending",
          className: `${theme.submit} w-full ${dense ? "py-3!" : ""} disabled:cursor-wait disabled:opacity-70`,
          children: [status === "sending" ? t.sending : submit || t.submit, status !== "sending" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
            name: "arrow-right",
            className: "size-4"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          role: "alert",
          className: `mt-2 text-xs empty:hidden ${theme.error}`,
          children: status === "error" ? t.error : ""
        }), recaptcha && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(RecaptchaNotice, {
          t: t,
          className: `mt-3 text-[11px] leading-relaxed ${theme.muted}`
        })]
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContactForm);

/***/ },

/***/ "./src/components/CookieConsent.js"
/*!*****************************************!*\
  !*** ./src/components/CookieConsent.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _consent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consent */ "./src/consent.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



// Aviso de cookies. No bloquea la página ni roba el foco; Aceptar y Rechazar
// tienen el mismo peso visual. Se reabre desde "Cookie settings" en el footer.

function CookieConsent({
  config
}) {
  const t = config.i18n;
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => (0,_consent__WEBPACK_IMPORTED_MODULE_1__.getConsent)() === null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("clr:open-cookie-settings", reopen);
    return () => window.removeEventListener("clr:open-cookie-settings", reopen);
  }, []);

  // En móvil el aviso ocupa el borde inferior: el botón flotante de llamada se oculta mientras tanto.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.documentElement.classList.toggle("clr-cookie-open", open);
  }, [open]);
  if (!open) return null;
  const choose = value => {
    (0,_consent__WEBPACK_IMPORTED_MODULE_1__.setConsent)(value);
    setOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    role: "dialog",
    "aria-modal": "false",
    "aria-labelledby": "clr-cookie-title",
    "aria-describedby": "clr-cookie-text",
    className: "plane fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "border border-cream-200 bg-white p-6",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        id: "clr-cookie-title",
        className: "font-serif text-xl text-ink",
        children: t.cookieTitle
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
        id: "clr-cookie-text",
        className: "mt-2 text-sm leading-relaxed text-ink/70",
        children: [t.cookieText, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          href: t.privacyUrl,
          className: "underline underline-offset-2 hover:text-gold-600",
          children: t.privacyLink
        }), "."]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "mt-5 grid grid-cols-2 gap-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
          type: "button",
          onClick: () => choose("rejected"),
          className: "btn-outline px-4 py-3",
          children: t.cookieReject
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
          type: "button",
          onClick: () => choose("accepted"),
          className: "btn-primary px-4 py-3",
          children: t.cookieAccept
        })]
      })]
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CookieConsent);

/***/ },

/***/ "./src/components/FloatingCall.js"
/*!****************************************!*\
  !*** ./src/components/FloatingCall.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom/client");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




// Botón flotante de llamada. Se monta en <body> con un portal porque el header
// usa transform, y un position:fixed dentro de él no quedaría fijo a la ventana.
// Se oculta al llegar a la franja legal del footer para no tapar sus enlaces.

function FloatingCall({
  site,
  i18n,
  visible: wanted
}) {
  const [atBottom, setAtBottom] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let observer;
    // El footer lo monta otro root de React; se espera a que exista.
    const frame = requestAnimationFrame(() => {
      const legal = document.getElementById("clr-footer-legal");
      if (!legal) return;
      observer = new IntersectionObserver(([entry]) => setAtBottom(entry.isIntersecting));
      observer.observe(legal);
    });
    return () => {
      cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
    };
  }, []);
  const visible = wanted && !atBottom;
  const onClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "click_call",
      call_location: "floating_button"
    });
  };
  return (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
    href: site.phoneHref,
    onClick: onClick,
    "aria-label": `${i18n.call} ${site.phone}`,
    "aria-hidden": !visible,
    tabIndex: visible ? undefined : -1,
    className: `clr-floating-call plane fixed right-4 bottom-4 z-40 transition-all duration-300 ease-out motion-reduce:transition-none sm:right-6 sm:bottom-6 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
      className: "flex items-center gap-3 bg-navy-900 p-4 text-white transition-colors hover:bg-navy-700 sm:px-5 sm:py-3.5",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: "phone",
        className: "size-5 text-gold-300"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "hidden text-sm font-semibold sm:inline",
        children: site.phone
      })]
    })
  }), document.body);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingCall);

/***/ },

/***/ "./src/components/Footer.js"
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logo */ "./src/components/Logo.js");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var _MapEmbed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MapEmbed */ "./src/components/MapEmbed.js");
/* harmony import */ var _consent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../consent */ "./src/consent.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function OfficeMap({
  site,
  i18n
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "overflow-hidden border border-white/10 bg-white",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "relative h-48 bg-cream-100",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_MapEmbed__WEBPACK_IMPORTED_MODULE_3__["default"], {
        site: site,
        i18n: i18n,
        className: "absolute inset-0 size-full"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "p-4 text-sm leading-relaxed text-ink/75",
      children: [site.address.map(line => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "block",
        children: line
      }, line)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
        href: site.mapsUrl,
        target: "_blank",
        rel: "noopener",
        className: "link-arrow mt-2",
        children: [i18n.openInMaps, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
          name: "arrow-right",
          className: "size-4"
        })]
      })]
    })]
  });
}

// Bloque de firma de la marca: se muestra en inglés y en español con el mismo peso.
function SignatureBlock({
  lang,
  line
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    lang: lang,
    className: "w-72 border-2 border-cream-50/80 text-cream-50",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "flex border-b-2 border-cream-50/80",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "px-3 py-1.5 font-serif text-[15px] font-bold",
        children: "Casa Lumen"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "flex items-center border-l-2 border-cream-50/80 px-3 text-[10px] tracking-[0.18em]",
        children: "SAN ANTONIO \xB7 TX"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "px-3 pt-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase",
      children: line
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
      className: "ruler mx-3 mt-1 mb-1.5 block",
      "aria-hidden": "true"
    })]
  });
}
function Footer({
  config
}) {
  const {
    homeUrl,
    site,
    nav,
    socials,
    legal,
    i18n
  } = config;
  const year = new Date().getFullYear();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "bg-navy-800 text-white",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.3fr_1.4fr]",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: homeUrl,
          "aria-label": site.name,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
            brand: config.brand,
            light: true
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          className: "mt-6 max-w-[16rem] text-sm leading-relaxed text-white/70",
          children: site.tagline
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
          "aria-label": i18n.social,
          className: "mt-6 flex gap-4 text-white/80",
          children: socials.map(social => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: social.url,
              target: "_blank",
              rel: "noopener",
              "aria-label": social.label,
              title: social.label,
              className: "block hover:text-gold-300",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: social.icon
              })
            })
          }, social.icon))
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("nav", {
        "aria-label": i18n.explore,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
          className: "text-sm font-semibold text-white",
          children: i18n.explore
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
          className: "mt-4 space-y-2 text-sm text-white/70",
          children: nav.flatMap(item => item.children || [item]).map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: item.url,
              className: "hover:text-gold-300",
              children: item.label
            })
          }, item.url))
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h2", {
          className: "text-sm font-semibold text-white",
          children: i18n.contact
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("ul", {
          className: "mt-4 space-y-4 text-sm text-white/75",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: site.phoneHref,
              className: "flex gap-3 hover:text-gold-300",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "phone",
                className: "size-5 shrink-0 text-gold-300"
              }), site.phone]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: `mailto:${site.email}`,
              className: "flex gap-3 hover:text-gold-300",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "mail",
                className: "size-5 shrink-0 text-gold-300"
              }), site.email]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
            className: "flex gap-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
              name: "map-pin",
              className: "size-5 shrink-0 text-gold-300"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("address", {
              className: "not-italic",
              children: site.address.map(line => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "block",
                children: line
              }, line))
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: site.facebook,
              target: "_blank",
              rel: "noopener",
              className: "flex gap-3 hover:text-gold-300",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "facebook",
                className: "size-5 shrink-0 text-gold-300"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
                children: [i18n.facebook, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  className: "block text-white/50",
                  children: "/yolandabarbozarealtor/"
                })]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: site.googleProfile,
              target: "_blank",
              rel: "noopener",
              className: "flex gap-3 hover:text-gold-300",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "google",
                className: "size-5 shrink-0 text-gold-300"
              }), i18n.googleProfile]
            })
          })]
        })]
      }), config.footerMap && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OfficeMap, {
        site: site,
        i18n: i18n
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "border-t border-white/10",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "mx-auto flex max-w-site flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "flex flex-col gap-4 sm:flex-row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SignatureBlock, {
            lang: "en",
            line: "Real estate \xB7 Out in the open"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SignatureBlock, {
            lang: "es",
            line: "Bienes ra\xEDces \xB7 A plena vista"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          className: "text-xs text-white/60",
          children: [i18n.family, " \xB7 ", i18n.equalHousing]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      id: "clr-footer-legal",
      className: "border-t border-white/10",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "mx-auto flex max-w-site flex-col gap-3 px-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          children: ["\xA9 ", year, " ", site.name, ". ", i18n.rights]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("ul", {
          className: "flex flex-wrap gap-x-4 gap-y-1",
          children: [legal.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: item.url,
              className: "hover:text-white",
              children: item.label
            })
          }, item.url)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
              type: "button",
              onClick: _consent__WEBPACK_IMPORTED_MODULE_4__.openCookieSettings,
              className: "hover:text-white",
              children: i18n.cookieSettings
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: i18n.creditUrl,
              target: "_blank",
              rel: "noopener",
              lang: "en",
              className: "font-semibold text-white/80 hover:text-white",
              children: i18n.credit
            })
          })]
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ },

/***/ "./src/components/Icon.js"
/*!********************************!*\
  !*** ./src/components/Icon.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_icons_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/icons.json */ "./assets/icons.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



// Mismo set de íconos que usa clr_icon() en PHP.

function Icon({
  name,
  className = "size-5",
  filled = false
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "square",
    strokeLinejoin: "miter",
    className: className,
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: _assets_icons_json__WEBPACK_IMPORTED_MODULE_1__[name]
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ },

/***/ "./src/components/Logo.js"
/*!********************************!*\
  !*** ./src/components/Logo.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


// Logotipo oficial (assets/brand/). Horizontal azul en el navbar; principal (apilado)
// en crema para fondos oscuros como el footer. El enlace que lo envuelve lleva el nombre.

function Logo({
  brand,
  light = false,
  className = ""
}) {
  const src = light ? brand.logoLight : brand.logo;
  const [width, height] = light ? brand.logoLightSize : brand.logoSize;
  const size = light ? "h-20 w-auto" : "h-9 w-auto sm:h-11 lg:h-9 xl:h-11";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
    src: src,
    alt: "",
    width: width,
    height: height,
    className: `${size} ${className}`,
    decoding: "async"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ },

/***/ "./src/components/MapEmbed.js"
/*!************************************!*\
  !*** ./src/components/MapEmbed.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var _consent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consent */ "./src/consent.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




// Mapa de Google: solo se inserta si el visitante aceptó cookies (brief §11).
// Por defecto muestra la oficina; src/url/title permiten otros lugares (p. ej. zonas).
// "compact" es el respaldo breve para mosaicos pequeños.

function MapEmbed({
  site,
  i18n,
  className = "",
  src,
  url,
  title,
  compact = false
}) {
  const consent = (0,_consent__WEBPACK_IMPORTED_MODULE_2__.useConsent)();
  const embedSrc = src || site.mapsEmbed;
  const mapsUrl = url || site.mapsUrl;
  if (consent === "accepted") {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("iframe", {
      title: title || i18n.mapTitle,
      src: embedSrc,
      className: `border-0 ${className}`,
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade",
      allowFullScreen: true
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: `flex flex-col items-center justify-center gap-3 bg-cream-100 text-center ${compact ? "p-3" : "p-6"} ${className}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
      name: "map-pin",
      className: `${compact ? "size-5" : "size-7"} text-gold-600`
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
      className: `leading-relaxed text-ink/65 ${compact ? "text-[11px]" : "max-w-xs text-xs"}`,
      children: compact ? i18n.mapConsentShort : i18n.mapConsent
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: `flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-semibold ${compact ? "text-xs" : "text-sm"}`,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
        type: "button",
        onClick: () => (0,_consent__WEBPACK_IMPORTED_MODULE_2__.setConsent)("accepted"),
        className: "text-navy-900 underline underline-offset-4 hover:text-gold-600",
        children: compact ? i18n.mapShow : i18n.mapAccept
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener",
        className: "text-gold-600 hover:text-navy-900",
        children: compact ? i18n.mapOpen : i18n.openInMaps
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapEmbed);

/***/ },

/***/ "./src/components/Navbar.js"
/*!**********************************!*\
  !*** ./src/components/Navbar.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logo */ "./src/components/Logo.js");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var _TopBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TopBar */ "./src/components/TopBar.js");
/* harmony import */ var _FloatingCall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FloatingCall */ "./src/components/FloatingCall.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function isActive(item) {
  if (item.children) return item.children.some(isActive);
  const path = new URL(item.url, window.location.origin).pathname;
  const current = window.location.pathname;
  // El inicio ("/" o "/es/") solo está activo en sí mismo, no en sus subpáginas.
  const isHome = /^\/(es\/?)?$/.test(path);
  return isHome ? current.replace(/\/$/, "") === path.replace(/\/$/, "") : current.startsWith(path);
}

// Panel desplegable de escritorio: se abre con hover o clic y se cierra con Escape,
// clic fuera o al salir el foco.
function MegaMenu({
  item,
  site,
  i18n
}) {
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const closeTimer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const active = isActive(item);
  const panelId = `clr-mega-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current.querySelector("button").focus();
      }
    };
    const onClick = e => !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => clearTimeout(closeTimer.current), []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
    ref: ref,
    onMouseEnter: show,
    onMouseLeave: hide,
    onBlur: e => !ref.current.contains(e.relatedTarget) && setOpen(false),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
      type: "button",
      "aria-expanded": open,
      "aria-controls": panelId,
      onClick: () => setOpen(o => !o),
      className: `relative flex items-center gap-1 py-2 transition-colors hover:text-ink ${active || open ? "text-ink" : ""} ${active ? "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold-500" : ""}`,
      children: [item.label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: "chevron-down",
        className: `size-3.5 transition-transform ${open ? "rotate-180" : ""}`
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      id: panelId,
      hidden: !open,
      className: "absolute inset-x-0 top-full border-t border-cream-200 bg-cream-50 shadow-[0_24px_40px_-24px_rgba(22,33,58,0.35)]",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "mx-auto grid max-w-site gap-8 px-6 py-8 lg:grid-cols-[1fr_1fr_1fr_1.15fr]",
        children: [item.children.map(child => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: child.url,
          "aria-current": isActive(child) ? "page" : undefined
          // Mismo plano 3D que las tarjetas de servicios (clases plane + card3d).
          ,
          className: "group plane card3d block",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
            className: "block h-full bg-white p-6",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "flex size-12 items-center justify-center text-gold-500 ring-1 ring-cream-200 group-hover:ring-gold-300",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: child.icon,
                className: "size-6"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "mt-4 block font-serif text-xl text-ink",
              children: child.label
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "mt-2 block text-sm leading-relaxed font-normal text-ink/65",
              children: child.description
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
              name: "arrow-right",
              className: "mt-4 size-4 text-gold-600 transition-transform group-hover:translate-x-1"
            })]
          })
        }, child.url)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "bg-navy-900 p-6 text-white",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            className: "text-[11px] font-semibold tracking-[0.2em] text-gold-300 uppercase",
            children: i18n.megaEyebrow
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            className: "mt-3 font-serif text-2xl leading-snug",
            children: i18n.megaTitle
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
            className: "mt-2 text-sm leading-relaxed font-normal text-white/70",
            children: i18n.megaText
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "mt-5 flex flex-col gap-2 text-sm",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: site.contactUrl,
              className: "inline-flex items-center gap-2 font-semibold text-gold-300 hover:text-white",
              children: [i18n.cta, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "arrow-right",
                className: "size-4"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
              href: site.phoneHref,
              className: "inline-flex items-center gap-2 font-semibold text-white/85 hover:text-white",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                name: "phone",
                className: "size-4"
              }), site.phone]
            })]
          })]
        })]
      })
    })]
  });
}
function MobileGroup({
  item
}) {
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isActive(item));
  const panelId = `clr-mobile-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
    className: "border-b border-cream-200",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
      type: "button",
      "aria-expanded": open,
      "aria-controls": panelId,
      onClick: () => setOpen(o => !o),
      className: "flex w-full items-center justify-between py-3 font-medium text-ink/85",
      children: [item.label, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: "chevron-down",
        className: `size-4 transition-transform ${open ? "rotate-180" : ""}`
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
      id: panelId,
      hidden: !open,
      className: "pb-3",
      children: item.children.map(child => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
          href: child.url,
          "aria-current": isActive(child) ? "page" : undefined,
          className: "flex items-center gap-3 py-2.5 pl-1 text-sm font-medium text-ink/80 aria-[current=page]:text-gold-600",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
            name: child.icon,
            className: "size-5 text-gold-500"
          }), child.label]
        })
      }, child.url))
    })]
  });
}
function Navbar({
  config
}) {
  const {
    homeUrl,
    site,
    nav,
    socials,
    languages,
    i18n
  } = config;
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [scrolled, setScrolled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [topBarHidden, setTopBarHidden] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // La TopBar se oculta al bajar y reaparece al subir. Se ignoran
  // movimientos pequeños para que no parpadee con el scroll del trackpad.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 120) {
        setTopBarHidden(false);
      } else if (Math.abs(y - lastY) > 6) {
        setTopBarHidden(y > lastY);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: `pointer-events-auto transition-transform duration-300 ease-out motion-reduce:transition-none ${topBarHidden && !open ? "-translate-y-10" : ""}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_TopBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
      site: site,
      socials: socials,
      i18n: i18n
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_FloatingCall__WEBPACK_IMPORTED_MODULE_4__["default"], {
      site: site,
      i18n: i18n,
      visible: topBarHidden && !open
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: `relative bg-cream-50/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.12)]" : ""}`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "mx-auto flex h-20 max-w-site items-center justify-between gap-6 px-4 sm:px-6",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: homeUrl,
          "aria-label": site.name,
          className: "shrink-0",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
            brand: config.brand
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("nav", {
          "aria-label": "Primary",
          className: "hidden lg:block",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
            className: "flex items-center gap-5 text-[15.6px] font-medium xl:gap-7 text-ink/80",
            children: nav.map(item => {
              if (item.children) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(MegaMenu, {
                item: item,
                site: site,
                i18n: i18n
              }, item.label);
              const active = isActive(item);
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
                  href: item.url,
                  "aria-current": active ? "page" : undefined,
                  className: `relative py-2 transition-colors hover:text-ink ${active ? "text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold-500" : ""}`,
                  children: item.label
                })
              }, item.url);
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "flex items-center gap-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "hidden items-center gap-1.5 text-xs font-semibold sm:flex",
            children: languages.map((lang, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: [i > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                className: "text-ink/30",
                children: "|"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
                href: lang.url,
                hrefLang: lang.lang,
                lang: lang.lang,
                "aria-label": lang.label,
                "aria-current": lang.current ? "true" : undefined,
                className: lang.current ? "text-ink" : "text-ink/45 hover:text-ink",
                children: lang.code
              })]
            }, lang.code))
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
            href: site.contactUrl,
            className: "btn-primary hidden py-3.5! whitespace-nowrap md:inline-flex",
            children: [i18n.cta, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
              name: "arrow-right",
              className: "size-4"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
            type: "button",
            className: "-mr-2 p-2 text-ink lg:hidden",
            "aria-expanded": open,
            "aria-controls": "clr-mobile-menu",
            "aria-label": open ? i18n.close : i18n.menu,
            onClick: () => setOpen(o => !o),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
              name: open ? "x" : "menu",
              className: "size-6"
            })
          })]
        })]
      })
    }), open && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("nav", {
      id: "clr-mobile-menu",
      "aria-label": "Mobile",
      className: "max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-t border-cream-200 bg-cream-50 lg:hidden",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
        className: "mx-auto max-w-site px-4 py-4 sm:px-6",
        children: nav.map(item => item.children ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(MobileGroup, {
          item: item
        }, item.label) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
            href: item.url,
            "aria-current": isActive(item) ? "page" : undefined,
            className: "block border-b border-cream-200 py-3 font-medium text-ink/85 aria-[current=page]:text-gold-600",
            children: item.label
          })
        }, item.url))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "mx-auto flex max-w-site flex-col gap-3 px-4 pb-6 sm:px-6",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
          href: site.contactUrl,
          className: "btn-primary",
          children: [i18n.cta, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
            name: "arrow-right",
            className: "size-4"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
          href: site.phoneHref,
          className: "btn-outline",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
            name: "phone",
            className: "size-4 text-gold-600"
          }), site.phone]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "flex justify-center gap-3 pt-2 text-sm font-semibold sm:hidden",
          children: languages.map(lang => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
            href: lang.url,
            hrefLang: lang.lang,
            lang: lang.lang,
            "aria-current": lang.current ? "true" : undefined,
            className: lang.current ? "text-ink" : "text-ink/45",
            children: lang.label
          }, lang.code))
        })]
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ },

/***/ "./src/components/TopBar.js"
/*!**********************************!*\
  !*** ./src/components/TopBar.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon */ "./src/components/Icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



// Barra superior: contacto, dirección (enlaza a Google Maps) y redes sociales.
// Su altura (h-10) es la que Navbar desplaza al ocultarla.

function TopBar({
  site,
  socials,
  i18n
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "bg-navy-900 text-xs text-white/80",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "mx-auto flex h-10 max-w-site items-center justify-between gap-4 px-4 sm:px-6",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "flex items-center gap-5 lg:flex-1",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
          href: site.phoneHref,
          className: "flex items-center gap-2 transition-colors hover:text-white",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
            name: "phone",
            className: "size-3.5 text-gold-300"
          }), site.phone]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
          href: `mailto:${site.email}`,
          className: "hidden items-center gap-2 transition-colors hover:text-white sm:flex",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
            name: "mail",
            className: "size-3.5 text-gold-300"
          }), site.email]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
        href: site.mapsUrl,
        target: "_blank",
        rel: "noopener",
        className: "hidden items-center gap-2 transition-colors hover:text-white lg:flex",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
          name: "map-pin",
          className: "size-3.5 text-gold-300"
        }), site.address.join(", ")]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
        "aria-label": i18n.social,
        className: "-mr-1.5 flex items-center justify-end gap-1 lg:flex-1",
        children: socials.map(social => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
            href: social.url,
            target: "_blank",
            rel: "noopener",
            "aria-label": social.label,
            title: social.label,
            className: "block p-1.5 transition-colors hover:text-gold-300",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
              name: social.icon,
              className: "size-3.5"
            })
          })
        }, social.icon))
      })]
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TopBar);

/***/ },

/***/ "./src/consent.js"
/*!************************!*\
  !*** ./src/consent.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getConsent: () => (/* binding */ getConsent),
/* harmony export */   openCookieSettings: () => (/* binding */ openCookieSettings),
/* harmony export */   setConsent: () => (/* binding */ setConsent),
/* harmony export */   useConsent: () => (/* binding */ useConsent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Consentimiento de cookies: "accepted" | "rejected" | null (sin decidir).
// Se guarda en localStorage y se comunica a GTM/GA4 con Consent Mode
// (el valor por defecto "denied" lo fija inc/consent.php antes de cargar nada).
const KEY = "clr_cookie_consent";
function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(KEY))?.value || null;
  } catch {
    return null;
  }
}
function setConsent(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      value,
      date: new Date().toISOString()
    }));
  } catch {}
  window.dataLayer = window.dataLayer || [];
  // GTM solo procesa los comandos de consentimiento con la forma de gtag() (objeto arguments).
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("consent", "update", {
    analytics_storage: value === "accepted" ? "granted" : "denied"
  });
  window.dataLayer.push({
    event: "cookie_consent",
    consent: value
  });
  window.dispatchEvent(new CustomEvent("clr:consent", {
    detail: value
  }));
}
function openCookieSettings() {
  window.dispatchEvent(new Event("clr:open-cookie-settings"));
}
function useConsent() {
  const [consent, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getConsent);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onChange = e => setState(e.detail);
    window.addEventListener("clr:consent", onChange);
    return () => window.removeEventListener("clr:consent", onChange);
  }, []);
  return consent;
}

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react-dom/client"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "./assets/icons.json"
/*!***************************!*\
  !*** ./assets/icons.json ***!
  \***************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"arrow-right":"<path d=\\"M5 12h14\\"/><path d=\\"m12 5 7 7-7 7\\"/>","phone":"<path d=\\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\\"/>","home":"<path d=\\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\\"/><path d=\\"M9 22V12h6v10\\"/>","key":"<circle cx=\\"7.5\\" cy=\\"15.5\\" r=\\"5.5\\"/><path d=\\"m21 2-9.6 9.6\\"/><path d=\\"m15.5 7.5 3 3L22 7l-3-3\\"/>","chart":"<path d=\\"M3 3v16a2 2 0 0 0 2 2h16\\"/><path d=\\"M18 17V9\\"/><path d=\\"M13 17V5\\"/><path d=\\"M8 17v-3\\"/>","map-pin":"<path d=\\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\\"/><circle cx=\\"12\\" cy=\\"10\\" r=\\"3\\"/>","users":"<path d=\\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\\"/><circle cx=\\"9\\" cy=\\"7\\" r=\\"4\\"/><path d=\\"M22 21v-2a4 4 0 0 0-3-3.87\\"/><path d=\\"M16 3.13a4 4 0 0 1 0 7.75\\"/>","gem":"<path d=\\"M6 3h12l4 6-10 13L2 9Z\\"/><path d=\\"M11 3 8 9l4 13 4-13-3-6\\"/><path d=\\"M2 9h20\\"/>","heart":"<path d=\\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\\"/>","star":"<path d=\\"m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z\\"/>","menu":"<path d=\\"M4 6h16\\"/><path d=\\"M4 12h16\\"/><path d=\\"M4 18h16\\"/>","x":"<path d=\\"M18 6 6 18\\"/><path d=\\"m6 6 12 12\\"/>","facebook":"<path d=\\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\\"/>","google":"<path d=\\"M20.5 12H12\\"/><path d=\\"M19.6 8A8.5 8.5 0 1 0 20.5 12\\"/>","check-circle":"<path d=\\"M22 11.08V12a10 10 0 1 1-5.93-9.14\\"/><path d=\\"m9 11 3 3L22 4\\"/>","chevron-down":"<path d=\\"m6 9 6 6 6-6\\"/>","mail":"<rect width=\\"20\\" height=\\"16\\" x=\\"2\\" y=\\"4\\" rx=\\"2\\"/><path d=\\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\\"/>","instagram":"<rect width=\\"20\\" height=\\"20\\" x=\\"2\\" y=\\"2\\" rx=\\"5\\" ry=\\"5\\"/><path d=\\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\\"/><path d=\\"M17.5 6.5h.01\\"/>","tiktok":"<path d=\\"M9 12a4 4 0 1 0 4 4V3c.5 2.5 2.5 4.5 5 5\\"/>","bbb":"<path d=\\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\\"/><path d=\\"m9 12 2 2 4-4\\"/>","clipboard":"<rect width=\\"8\\" height=\\"4\\" x=\\"8\\" y=\\"2\\" rx=\\"1\\"/><path d=\\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\\"/><path d=\\"m9 14 2 2 4-4\\"/>","shield":"<path d=\\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\\"/>","calendar":"<rect width=\\"18\\" height=\\"18\\" x=\\"3\\" y=\\"4\\" rx=\\"2\\"/><path d=\\"M16 2v4\\"/><path d=\\"M8 2v4\\"/><path d=\\"M3 10h18\\"/>","car":"<path d=\\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\\"/><circle cx=\\"7\\" cy=\\"17\\" r=\\"2\\"/><path d=\\"M9 17h6\\"/><circle cx=\\"17\\" cy=\\"17\\" r=\\"2\\"/>","school":"<path d=\\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\\"/><path d=\\"M22 10v6\\"/><path d=\\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\\"/>","droplet":"<path d=\\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\\"/>","dollar":"<path d=\\"M12 2v20\\"/><path d=\\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\\"/>","file":"<path d=\\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\\"/><path d=\\"M14 2v4a2 2 0 0 0 2 2h4\\"/><path d=\\"M16 13H8\\"/><path d=\\"M16 17H8\\"/><path d=\\"M10 9H8\\"/>","search":"<circle cx=\\"11\\" cy=\\"11\\" r=\\"8\\"/><path d=\\"m21 21-4.3-4.3\\"/>","book":"<path d=\\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20\\"/>","message":"<path d=\\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\\"/>","wrench":"<path d=\\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\\"/>","building":"<rect width=\\"16\\" height=\\"20\\" x=\\"4\\" y=\\"2\\" rx=\\"2\\"/><path d=\\"M9 22v-4h6v4\\"/><path d=\\"M8 6h.01\\"/><path d=\\"M16 6h.01\\"/><path d=\\"M12 6h.01\\"/><path d=\\"M12 10h.01\\"/><path d=\\"M12 14h.01\\"/><path d=\\"M16 10h.01\\"/><path d=\\"M16 14h.01\\"/><path d=\\"M8 10h.01\\"/><path d=\\"M8 14h.01\\"/>"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "react-dom/client");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Navbar */ "./src/components/Navbar.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Footer */ "./src/components/Footer.js");
/* harmony import */ var _components_ContactForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ContactForm */ "./src/components/ContactForm.js");
/* harmony import */ var _components_CookieConsent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/CookieConsent */ "./src/components/CookieConsent.js");
/* harmony import */ var _components_MapEmbed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/MapEmbed */ "./src/components/MapEmbed.js");
/* harmony import */ var _cardTilt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cardTilt */ "./src/cardTilt.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









(0,_cardTilt__WEBPACK_IMPORTED_MODULE_7__["default"])();

// window.casaLumen lo inyecta functions.php (clr_js_config()).
const config = window.casaLumen;
const mounts = [["#clr-navbar", _components_Navbar__WEBPACK_IMPORTED_MODULE_2__["default"]], ["#clr-footer", _components_Footer__WEBPACK_IMPORTED_MODULE_3__["default"]]];
mounts.forEach(([selector, Component]) => {
  const el = document.querySelector(selector);
  if (el && config) {
    react_dom_client__WEBPACK_IMPORTED_MODULE_1___default().createRoot(el).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(Component, {
      config: config
    }));
  }
});

// Puede haber varios formularios por página; cada uno se configura con data-*.
document.querySelectorAll("[data-clr-contact-form]").forEach(el => {
  if (!config) return;
  const {
    variant,
    source,
    title,
    intro,
    interest,
    submit,
    tone,
    dense
  } = el.dataset;
  react_dom_client__WEBPACK_IMPORTED_MODULE_1___default().createRoot(el).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_ContactForm__WEBPACK_IMPORTED_MODULE_4__["default"], {
    config: config,
    variant: variant,
    source: source,
    title: title,
    intro: intro,
    interest: interest,
    submit: submit,
    tone: tone,
    dense: !!dense
  }));
});

// Mapas de Google insertados en plantillas PHP (p. ej. Contact).
document.querySelectorAll("[data-clr-map]").forEach(el => {
  if (!config) return;
  const {
    src,
    url,
    title,
    compact
  } = el.dataset;
  react_dom_client__WEBPACK_IMPORTED_MODULE_1___default().createRoot(el).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_MapEmbed__WEBPACK_IMPORTED_MODULE_6__["default"], {
    site: config.site,
    i18n: config.i18n,
    className: "size-full",
    src: src,
    url: url,
    title: title,
    compact: !!compact
  }));
});

// Aviso de cookies: su propio contenedor al final del <body>.
if (config) {
  const cookieRoot = document.createElement("div");
  document.body.append(cookieRoot);
  react_dom_client__WEBPACK_IMPORTED_MODULE_1___default().createRoot(cookieRoot).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_CookieConsent__WEBPACK_IMPORTED_MODULE_5__["default"], {
    config: config
  }));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map