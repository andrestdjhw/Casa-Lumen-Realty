import React from "react"

// Aproximación tipográfica del logotipo horizontal de la propuesta de branding.
// Reemplazar por el SVG oficial (la «L» de Lumen es dibujada a medida).
function Logo({ className = "", light = false }) {
  const color = light ? "text-cream-50" : "text-navy-800"

  return (
    <span className={`inline-flex flex-col items-end leading-none ${color} ${className}`}>
      <span className="flex items-baseline gap-1.5">
        <span className="font-serif text-[15px] font-bold tracking-wide">CASA</span>
        <span className="font-serif text-[30px] font-bold tracking-tight">lumen</span>
      </span>
      <span className="mt-1 mr-[-0.5em] text-[10px] font-semibold tracking-[0.5em]">REALTY</span>
    </span>
  )
}

export default Logo
