<?php
/**
 * Gráficos de marca (propuesta de branding "A plena luz"), dibujados en SVG para
 * heredar el color con currentColor. Reemplazar por los archivos vectoriales
 * oficiales cuando se entregue el manual de marca.
 */

/** Rayado del isotipo. Cada SVG necesita su propio id de patrón. */
function clr_hatch_pattern(&$id) {
  static $n = 0;
  $id = 'clr-hatch-' . (++$n);
  return '<pattern id="' . $id . '" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" stroke-width="1.6"/></pattern>';
}

/** Isotipo: un plano que se apoya y su sombra nítida. */
function clr_isotype_paths($pattern_id, $stroke = 3) {
  return '<g fill="none" stroke="currentColor" stroke-width="' . $stroke . '" stroke-linejoin="miter">'
    . '<path d="M3 79V30L49 5v49"/>'
    . '<path d="M3 79h42l52-25H49z" fill="url(#' . $pattern_id . ')"/>'
    . '</g>';
}

function clr_isotype($class = 'size-10') {
  $pattern = clr_hatch_pattern($id);
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 82" class="' . esc_attr($class) . '" aria-hidden="true"><defs>' . $pattern . '</defs>' . clr_isotype_paths($id) . '</svg>';
}

/** Sello "See what you own": la marca de revisado del trato completo. */
function clr_seal($class = 'size-32', $label = '') {
  $pattern = clr_hatch_pattern($id);
  $top     = $id . '-top';
  $bottom  = $id . '-bottom';
  $a11y    = $label ? 'role="img" aria-label="' . esc_attr($label) . '"' : 'aria-hidden="true"';

  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="' . esc_attr($class) . '" ' . $a11y . '>'
    . '<defs>' . $pattern
    . '<path id="' . $top . '" d="M34 100a66 66 0 0 1 132 0"/>'
    . '<path id="' . $bottom . '" d="M20 100a80 80 0 0 0 160 0"/>'
    . '</defs>'
    . '<g fill="none" stroke="currentColor">'
    . '<circle cx="100" cy="100" r="96" stroke-width="3"/>'
    . '<circle cx="100" cy="100" r="90" stroke-width="1.2"/>'
    . '<circle cx="100" cy="100" r="54" stroke-width="2"/>'
    . '<path d="M10 97h36M10 103h36M154 97h36M154 103h36" stroke-width="1.2"/>'
    . '</g>'
    . '<g fill="currentColor" font-family="Albert Sans, sans-serif" font-weight="600" font-size="15" letter-spacing="3" text-anchor="middle">'
    . '<text><textPath href="#' . $top . '" startOffset="50%">CASA LUMEN REALTY</textPath></text>'
    . '<text><textPath href="#' . $bottom . '" startOffset="50%">SEE WHAT YOU OWN</textPath></text>'
    . '</g>'
    . '<g transform="translate(64 70) scale(.72)">' . clr_isotype_paths($id, 3.4) . '</g>'
    . '</svg>';
}

/** Favicon con el isotipo, mientras no se configure un Site Icon en WordPress. */
function clr_favicon() {
  if (!has_site_icon()) {
    echo '<link rel="icon" type="image/svg+xml" href="' . esc_url(get_theme_file_uri('assets/brand/isotipo.svg')) . '">' . "\n";
  }
}

add_action('wp_head', 'clr_favicon');
