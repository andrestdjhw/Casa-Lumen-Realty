<?php
/**
 * Helpers de plantilla: íconos SVG e imágenes del tema.
 */

function clr_icon($name, $class = 'size-5', $filled = false) {
  static $icons = null;
  if ($icons === null) {
    $icons = json_decode(file_get_contents(get_theme_file_path('assets/icons.json')), true);
  }
  if (!isset($icons[$name])) {
    return '';
  }
  $fill = $filled ? 'currentColor' : 'none';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' . $fill . '" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" class="' . esc_attr($class) . '" aria-hidden="true">' . $icons[$name] . '</svg>';
}

/**
 * Imagen de assets/images/. Mientras llega la carpeta de fotos del cliente,
 * muestra un bloque neutro con el nombre del archivo esperado.
 */
function clr_image($file, $alt, $class = '', $eager = false) {
  $path = get_theme_file_path('assets/images/' . $file);

  if (!file_exists($path)) {
    return '<div class="' . esc_attr($class) . ' flex items-center justify-center bg-gradient-to-br from-cream-200 to-[#d9cdb8] text-xs tracking-wide text-ink/40" role="img" aria-label="' . esc_attr($alt) . '"><span>' . esc_html($file) . '</span></div>';
  }

  return '<img src="' . esc_url(get_theme_file_uri('assets/images/' . $file)) . '" alt="' . esc_attr($alt) . '" class="' . esc_attr($class) . '" loading="' . ($eager ? 'eager' : 'lazy') . '" decoding="async">';
}
