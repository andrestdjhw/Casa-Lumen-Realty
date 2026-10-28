<?php

require get_theme_file_path('inc/site-data.php');
require get_theme_file_path('inc/helpers.php');
require get_theme_file_path('inc/brand.php');
require get_theme_file_path('inc/contact.php');
require get_theme_file_path('inc/seo.php');
require get_theme_file_path('inc/setup.php');

function casa_lumen_load_assets() {
  $asset = include get_theme_file_path('build/index.asset.php');

  wp_enqueue_style('casa-lumen-fonts', 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Albert+Sans:wght@400;500;600;700&display=swap', array(), null);
  wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'), array(), filemtime(get_theme_file_path('build/index.css')));

  wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), $asset['dependencies'], $asset['version'], true);
  wp_add_inline_script('ourmainjs', 'window.casaLumen = ' . wp_json_encode(clr_js_config()) . ';', 'before');
}

add_action('wp_enqueue_scripts', 'casa_lumen_load_assets');

function casa_lumen_preconnect_fonts($urls, $relation_type) {
  if ($relation_type === 'preconnect') {
    $urls[] = 'https://fonts.googleapis.com';
    $urls[] = array('href' => 'https://fonts.gstatic.com', 'crossorigin');
  }
  return $urls;
}

add_filter('wp_resource_hints', 'casa_lumen_preconnect_fonts', 10, 2);

function casa_lumen_add_support() {
  load_theme_textdomain('casa-lumen', get_template_directory() . '/languages');
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'casa_lumen_add_support');
