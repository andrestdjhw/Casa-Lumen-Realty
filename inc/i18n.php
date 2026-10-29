<?php
/**
 * Sitio bilingüe (brief §14): URLs independientes con prefijo /es/, hreflang recíproco
 * y textos traducidos en languages/es_US.l10n.php. Las páginas en español usan las
 * mismas plantillas; el idioma se decide por la URL.
 */

const CLR_REWRITE_VERSION = '1';
const CLR_ES_LOCALE       = 'es_US';

/** Ruta de la petición relativa al home, p. ej. "/es/buy/". */
function clr_request_path() {
  $path = wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
  $base = wp_parse_url(home_url('/'), PHP_URL_PATH) ?: '/';
  if ($base !== '/' && strpos($path, $base) === 0) {
    $path = '/' . substr($path, strlen($base));
  }
  return $path;
}

/** 'es' o 'en'. Se calcula desde la URL, antes de que WordPress cargue traducciones. */
function clr_lang() {
  static $lang = null;
  if ($lang === null) {
    $lang = (!is_admin() && preg_match('#^/es(/|$)#', clr_request_path())) ? 'es' : 'en';
  }
  return $lang;
}

/** URL interna en el idioma actual: clr_url('/buy/') → /es/buy/ en español. */
function clr_url($path = '/', $lang = null) {
  $lang = $lang ?: clr_lang();
  return home_url(($lang === 'es' ? '/es' : '') . $path);
}

/** URL de la página actual en cada idioma, para el switch y el hreflang. */
function clr_lang_urls() {
  $path = preg_replace('#^/es(?=/|$)#', '', clr_request_path()) ?: '/';
  return array(
    'en' => home_url($path),
    'es' => home_url('/es' . ($path === '/' ? '/' : $path)),
  );
}

add_filter('locale', function ($locale) {
  return clr_lang() === 'es' ? CLR_ES_LOCALE : $locale;
});

add_filter('query_vars', function ($vars) {
  $vars[] = 'clr_lang';
  return $vars;
});

add_action('init', function () {
  add_rewrite_rule('^es/?$', 'index.php?clr_lang=es', 'top');
  add_rewrite_rule('^es/(.+?)/?$', 'index.php?pagename=$matches[1]&clr_lang=es', 'top');

  if (get_option('clr_rewrite_version') !== CLR_REWRITE_VERSION) {
    flush_rewrite_rules(false);
    update_option('clr_rewrite_version', CLR_REWRITE_VERSION);
  }
});

// WordPress redirigiría /es/buy/ a /buy/ porque el permalink de la página es /buy/.
add_filter('redirect_canonical', function ($redirect) {
  return clr_lang() === 'es' ? false : $redirect;
});

// Canonical propio por idioma, para que /es/ no se marque como duplicado.
add_filter('get_canonical_url', function ($url) {
  return clr_lang() === 'es' ? clr_lang_urls()['es'] : $url;
});

add_action('wp_head', function () {
  if (is_404()) {
    return;
  }
  $urls = clr_lang_urls();
  if (is_front_page() && clr_lang() === 'es') {
    echo '<link rel="canonical" href="' . esc_url($urls['es']) . '">' . "\n";
  }
  echo '<link rel="alternate" hreflang="en-US" href="' . esc_url($urls['en']) . '">' . "\n";
  echo '<link rel="alternate" hreflang="es-US" href="' . esc_url($urls['es']) . '">' . "\n";
  echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($urls['en']) . '">' . "\n";
}, 2);
