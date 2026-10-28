<?php
/**
 * Datos del negocio y navegación. Única fuente para las plantillas PHP
 * y para los componentes de React (se exponen en window.casaLumen).
 */

function clr_site() {
  return array(
    'name'        => 'Casa Lumen Realty',
    'tagline'     => __('Clear guidance for your next move in San Antonio real estate.', 'casa-lumen'),
    'phone'       => '(210) 724-1955',
    'phoneHref'   => 'tel:+12107241955',
    'email'       => 'info@casalumenrealty.com',
    'address'     => array('13327 Nacogdoches Rd, Unit 1', 'San Antonio, TX 78217'),
    'mapsUrl'     => 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode('13327 Nacogdoches Rd, Unit 1, San Antonio, TX 78217'),
    'mapsEmbed'   => 'https://www.google.com/maps?q=' . rawurlencode('13327 Nacogdoches Rd, Unit 1, San Antonio, TX 78217') . '&output=embed',
    'facebook'    => 'https://www.facebook.com/yolandabarbozarealtor/',
    'googleProfile' => 'https://share.google/ydGao7QE3CUY2N1P5',
    'contactUrl'  => home_url('/contact/'),
  );
}

/** Personalidad de marca: lúcida, digna, constante. Se usa en Home y About. */
function clr_values() {
  return array(
    array('icon' => 'gem', 'title' => __('Clarity', 'casa-lumen'), 'text' => __('The why behind every step, without jargon.', 'casa-lumen')),
    array('icon' => 'users', 'title' => __('Dignity', 'casa-lumen'), 'text' => __('Every question is welcome, in English or Spanish.', 'casa-lumen')),
    array('icon' => 'heart', 'title' => __('Continuity', 'casa-lumen'), 'text' => __('Before, during, and after closing.', 'casa-lumen')),
  );
}

/** VALIDAR (brief §09): confirmar ciudades atendidas antes de publicar. Se usa en Home y Areas. */
function clr_areas() {
  return array(
    array('name' => 'San Antonio', 'image' => 'area-san-antonio.jpg'),
    array('name' => 'Schertz', 'image' => 'area-schertz.jpg'),
    array('name' => 'Converse', 'image' => 'area-converse.jpg'),
    array('name' => 'Live Oak', 'image' => 'area-live-oak.jpg'),
    array('name' => 'Universal City', 'image' => 'area-universal-city.jpg'),
    array('name' => __('and More', 'casa-lumen'), 'image' => 'area-more.jpg'),
  );
}

function clr_socials() {
  $site = clr_site();

  // TODO: el cliente no ha enviado los enlaces de Instagram, TikTok ni BBB.
  return array(
    array('icon' => 'facebook', 'label' => 'Facebook', 'url' => $site['facebook']),
    array('icon' => 'instagram', 'label' => 'Instagram', 'url' => '#'),
    array('icon' => 'tiktok', 'label' => 'TikTok', 'url' => '#'),
    array('icon' => 'google', 'label' => __('Google Business Profile', 'casa-lumen'), 'url' => $site['googleProfile']),
    array('icon' => 'bbb', 'label' => __('Better Business Bureau', 'casa-lumen'), 'url' => '#'),
  );
}

function clr_nav() {
  return array(
    array('label' => __('Home', 'casa-lumen'), 'url' => home_url('/')),
    array(
      'label'    => __('Services', 'casa-lumen'),
      'children' => array(
        array(
          'label'       => __('Buy a Home', 'casa-lumen'),
          'url'         => home_url('/buy/'),
          'icon'        => 'home',
          'description' => __('Explore the process, understand your priorities, and make informed decisions.', 'casa-lumen'),
        ),
        array(
          'label'       => __('Sell Your Home', 'casa-lumen'),
          'url'         => home_url('/sell/'),
          'icon'        => 'key',
          'description' => __('Start with a pricing conversation and a plan tailored to your property.', 'casa-lumen'),
        ),
        array(
          'label'       => __('Invest in Real Estate', 'casa-lumen'),
          'url'         => home_url('/invest/'),
          'icon'        => 'chart',
          'description' => __('Discuss your goals, timelines, and property criteria.', 'casa-lumen'),
        ),
      ),
    ),
    array('label' => __('About', 'casa-lumen'), 'url' => home_url('/about/')),
    array('label' => __('Areas', 'casa-lumen'), 'url' => home_url('/areas/')),
    array('label' => __('Resources', 'casa-lumen'), 'url' => home_url('/faq/')),
    array('label' => __('Contact', 'casa-lumen'), 'url' => home_url('/contact/')),
  );
}

function clr_legal_links() {
  // TODO (brief §15): TREC exige en el footer los enlaces a "Information About Brokerage
  // Services" (IABS, llenado por el broker) y al "Consumer Protection Notice".
  // Agregarlos aquí cuando Yolanda entregue el IABS y se confirme la licencia.
  return array(
    array('label' => __('Privacy Policy', 'casa-lumen'), 'url' => home_url('/privacy-policy/')),
    array('label' => __('Terms of Use', 'casa-lumen'), 'url' => home_url('/terms/')),
    array('label' => __('Accessibility', 'casa-lumen'), 'url' => home_url('/accessibility/')),
  );
}

/** Configuración que reciben Navbar y Footer. */
function clr_js_config() {
  return array(
    'homeUrl' => home_url('/'),
    'lang'    => strpos(determine_locale(), 'es') === 0 ? 'es' : 'en',
    'site'    => clr_site(),
    'form'    => clr_contact_js_config(),
    'nav'     => clr_nav(),
    'socials' => clr_socials(),
    // La página de contacto ya tiene su mapa grande.
    'footerMap' => !is_page('contact'),
    'legal'   => clr_legal_links(),
    // TODO: conectar con el plugin de idiomas (Polylang/WPML) cuando se defina.
    'languages' => array(
      array('code' => 'EN', 'url' => home_url('/'), 'current' => true),
      array('code' => 'ES', 'url' => home_url('/es/'), 'current' => false),
    ),
    'i18n' => array(
      'cta'          => __('Schedule a Consultation', 'casa-lumen'),
      'menu'         => __('Menu', 'casa-lumen'),
      'close'        => __('Close menu', 'casa-lumen'),
      'megaEyebrow'  => __('Not sure where to start?', 'casa-lumen'),
      'megaTitle'    => __('A conversation is the first step.', 'casa-lumen'),
      'megaText'     => __('Tell us what you want to accomplish and review the process and realistic next steps together.', 'casa-lumen'),
      'explore'      => __('Explore', 'casa-lumen'),
      'contact'      => __('Contact', 'casa-lumen'),
      'facebook'     => __('Facebook', 'casa-lumen'),
      'googleProfile' => __('Google Business Profile', 'casa-lumen'),
      'mapTitle'     => __('Map of the Casa Lumen Realty office', 'casa-lumen'),
      'openInMaps'   => __('Open in Google Maps', 'casa-lumen'),
      'social'       => __('Social media', 'casa-lumen'),
      'rights'       => __('All rights reserved.', 'casa-lumen'),
      // Arquitectura de marca: respaldo discreto, solo texto.
      'family'       => __('Part of the Lumen family', 'casa-lumen'),
      'equalHousing' => __('Equal Housing Opportunity', 'casa-lumen'),
    ),
  );
}
