<?php
/**
 * Crea las páginas del sitio (brief §02) si todavía no existen. Cada una usa su
 * plantilla page-{slug}.php. Se ejecuta una sola vez por versión.
 *
 * /property-management/ no se crea: es condicional (brief §07).
 */

const CLR_PAGES_VERSION = '1';

function clr_ensure_pages() {
  if (get_option('clr_pages_version') === CLR_PAGES_VERSION) {
    return;
  }

  $pages = array(
    'buy'     => 'Buy a Home',
    'sell'    => 'Sell Your Home',
    'invest'  => 'Invest in Real Estate',
    'about'   => 'About',
    'areas'   => 'Areas',
    'faq'     => 'FAQ',
    'contact' => 'Contact',
  );

  foreach ($pages as $slug => $title) {
    if (!get_page_by_path($slug)) {
      wp_insert_post(array(
        'post_type'   => 'page',
        'post_status' => 'publish',
        'post_title'  => $title,
        'post_name'   => $slug,
      ));
    }
  }

  update_option('clr_pages_version', CLR_PAGES_VERSION);
}

add_action('init', 'clr_ensure_pages');
