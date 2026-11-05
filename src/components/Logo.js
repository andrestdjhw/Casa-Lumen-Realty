import React from "react"

// Logotipo oficial (assets/brand/). Horizontal azul en el navbar; principal (apilado)
// en crema para fondos oscuros como el footer. El enlace que lo envuelve lleva el nombre.
function Logo({ brand, light = false, className = "" }) {
  const src = light ? brand.logoLight : brand.logo
  const [width, height] = light ? brand.logoLightSize : brand.logoSize
  const size = light ? "h-20 w-auto" : "h-9 w-auto sm:h-11 lg:h-9 xl:h-11"

  return <img src={src} alt="" width={width} height={height} className={`${size} ${className}`} decoding="async" />
}

export default Logo
