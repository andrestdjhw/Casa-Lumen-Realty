import React from "react"
import ReactDOM from "react-dom/client"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ContactForm from "./components/ContactForm"
import initCardTilt from "./cardTilt"

initCardTilt()

// window.casaLumen lo inyecta functions.php (clr_js_config()).
const config = window.casaLumen

const mounts = [
  ["#clr-navbar", Navbar],
  ["#clr-footer", Footer]
]

mounts.forEach(([selector, Component]) => {
  const el = document.querySelector(selector)
  if (el && config) {
    ReactDOM.createRoot(el).render(<Component config={config} />)
  }
})

// Puede haber varios formularios por página; cada uno se configura con data-*.
document.querySelectorAll("[data-clr-contact-form]").forEach(el => {
  if (!config) return
  const { variant, source, title, intro, interest, fields, submit } = el.dataset
  ReactDOM.createRoot(el).render(
    <ContactForm config={config} variant={variant} source={source} title={title} intro={intro} interest={interest} fields={fields} submit={submit} />
  )
})
