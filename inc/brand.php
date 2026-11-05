<?php
/**
 * Archivos de marca oficiales (assets/brand/). Cada pieza tiene versión azul de marca
 * para fondos claros y versión "-light" (crema) para fondos oscuros.
 * Originales en la biblioteca de medios: uploads/2026/10/CasaLumen_*.png
 */

/** Tamaño intrínseco de cada archivo, para evitar saltos de layout. */
function clr_brand_sizes() {
  return array(
    'logo-horizontal' => array(720, 141),
    'logo-principal'  => array(600, 248),
    'isotipo'         => array(320, 263),
    'sello'           => array(400, 400),
  );
}

function clr_brand_url($name, $light = false) {
  return get_theme_file_uri('assets/brand/' . $name . ($light ? '-light' : '') . '.png');
}

function clr_brand_img($name, $alt, $class = '', $light = false) {
  list($w, $h) = clr_brand_sizes()[$name];
  return '<img src="' . esc_url(clr_brand_url($name, $light)) . '" alt="' . esc_attr($alt) . '" width="' . $w . '" height="' . $h . '" class="' . esc_attr($class) . '" decoding="async">';
}

/** Isotipo: un plano que se apoya y su sombra nítida. */
function clr_isotype($class = 'h-14 w-auto', $light = false) {
  return clr_brand_img('isotipo', '', $class, $light);
}

/** Sello "See what you own": la marca de revisado del trato completo. */
function clr_seal($class = 'size-32', $label = '', $light = false) {
  return clr_brand_img('sello', $label, $class, $light);
}

/** Favicon con el isotipo, mientras no se configure un Site Icon en WordPress. */
function clr_favicon() {
  if (!has_site_icon()) {
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . esc_url(get_theme_file_uri('assets/brand/favicon-32.png')) . '">' . "\n";
    echo '<link rel="icon" type="image/png" sizes="512x512" href="' . esc_url(get_theme_file_uri('assets/brand/icon-512.png')) . '">' . "\n";
    echo '<link rel="apple-touch-icon" href="' . esc_url(get_theme_file_uri('assets/brand/apple-touch-icon.png')) . '">' . "\n";
  }
}

add_action('wp_head', 'clr_favicon');
