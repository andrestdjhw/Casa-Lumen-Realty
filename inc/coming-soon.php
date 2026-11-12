<?php
/**
 * Modo "sitio en construcción" (coming-soon.php).
 *
 * Los visitantes ven solo la página de construcción; quien inicia sesión con permisos
 * de edición ve el sitio completo (para revisar en el dominio live antes del lanzamiento).
 *
 * Se activa en Ajustes > Lectura > "Sitio en construcción", o fijándolo por servidor en
 * wp-config.php, que tiene prioridad sobre el ajuste:
 *   define('CLR_COMING_SOON', true);   // dominio live
 *   define('CLR_COMING_SOON', false);  // link de desarrollo
 *
 * Motivo (nov 2026): el sitio no puede salir al público hasta que TREC autorice el
 * brokerage de Casa Lumen Realty LLC.
 */

function clr_coming_soon_enabled() {
  if (defined('CLR_COMING_SOON')) {
    return (bool) CLR_COMING_SOON;
  }
  return (bool) get_option('clr_coming_soon', false);
}

add_action('template_redirect', function () {
  // ?coming-soon permite a quien tiene sesión ver la página tal como la ve un visitante.
  $preview = isset($_GET['coming-soon']) && current_user_can('edit_posts');
  if (!$preview && (!clr_coming_soon_enabled() || current_user_can('edit_posts') || is_robots() || is_favicon())) {
    return;
  }

  // 200 + noindex: el dominio aún no está indexado y así los enlaces compartidos muestran la vista previa.
  status_header(200);
  nocache_headers();
  header('X-Robots-Tag: noindex, nofollow');
  require get_theme_file_path('coming-soon.php');
  exit;
}, 0);

// Casilla en Ajustes > Lectura.
add_action('admin_init', function () {
  register_setting('reading', 'clr_coming_soon', array(
    'type'              => 'boolean',
    'sanitize_callback' => 'rest_sanitize_boolean',
    'default'           => false,
  ));

  add_settings_field('clr_coming_soon', 'Sitio en construcción', function () {
    if (defined('CLR_COMING_SOON')) {
      echo '<p>' . (CLR_COMING_SOON ? 'Activado' : 'Desactivado') . ' por <code>CLR_COMING_SOON</code> en wp-config.php.</p>';
      return;
    }
    echo '<label><input type="checkbox" name="clr_coming_soon" value="1" ' . checked(get_option('clr_coming_soon'), true, false) . '> Mostrar a los visitantes la página "Coming soon". Los usuarios con sesión iniciada siguen viendo el sitio completo.</label>';
    echo '<p class="description">Para verla con tu sesión iniciada: <a href="' . esc_url(home_url('/?coming-soon')) . '" target="_blank">' . esc_html(home_url('/?coming-soon')) . '</a></p>';
  }, 'reading');
});

// Aviso en la barra de admin para no olvidar que el público no ve el sitio.
add_action('admin_bar_menu', function ($bar) {
  if (clr_coming_soon_enabled()) {
    $bar->add_node(array(
      'id'    => 'clr-coming-soon',
      'title' => 'Sitio en construcción: ACTIVO',
      'href'  => home_url('/?coming-soon'),
      'meta'  => array('title' => 'Ver la página Coming soon como la ven los visitantes'),
    ));
  }
}, 100);
