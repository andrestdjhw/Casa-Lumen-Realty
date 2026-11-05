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
    'contactUrl'  => clr_url('/contact/'),
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

/**
 * VALIDAR (brief §09): confirmar ciudades atendidas antes de publicar. Se usa en Home y Areas.
 * Cada zona se muestra con un mapa de Google (query + zoom).
 */
function clr_areas() {
  return array(
    array('name' => 'San Antonio', 'query' => 'San Antonio, TX', 'zoom' => 11),
    array('name' => 'Schertz', 'query' => 'Schertz, TX', 'zoom' => 13),
    array('name' => 'Converse', 'query' => 'Converse, TX', 'zoom' => 13),
    array('name' => 'Live Oak', 'query' => 'Live Oak, TX', 'zoom' => 13),
    array('name' => 'Universal City', 'query' => 'Universal City, TX', 'zoom' => 13),
    // Vista amplia del área metropolitana para "and More".
    array('name' => __('and More', 'casa-lumen'), 'query' => 'San Antonio, TX', 'zoom' => 9, 'title' => __('San Antonio metro area', 'casa-lumen')),
  );
}

/** Contenedor de mapa que monta React (MapEmbed); el enlace es el respaldo sin JavaScript. */
function clr_area_map($area, $class) {
  $embed = 'https://www.google.com/maps?q=' . rawurlencode($area['query']) . '&z=' . (int) $area['zoom'] . '&output=embed';
  $url   = 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode($area['query']);
  /* translators: %s: city name */
  $title = sprintf(__('Map of %s', 'casa-lumen'), $area['title'] ?? $area['name']);

  return '<div data-clr-map data-compact="1" data-src="' . esc_url($embed) . '" data-url="' . esc_url($url) . '" data-title="' . esc_attr($title) . '" class="' . esc_attr($class) . '">'
    . '<a href="' . esc_url($url) . '" target="_blank" rel="noopener" class="flex size-full items-center justify-center bg-cream-100 text-xs font-semibold text-gold-600">' . esc_html__('Open in Google Maps', 'casa-lumen') . '</a>'
    . '</div>';
}

/**
 * Preguntas frecuentes (brief §10). Se usan en la página FAQ y, las primeras, en el Home.
 * Sin FAQPage schema: Google solo lo muestra para sitios gubernamentales y de salud.
 * VALIDAR: revisar cada respuesta con Yolanda.
 */
function clr_faqs() {
  return array(
    array(
      'q' => __('How do I start buying a home?', 'casa-lumen'),
      'a' => __('Begin with your priorities, preferred area, timing, and financial considerations. A consultation can help organize the next steps.', 'casa-lumen'),
    ),
    array(
      'q' => __('Do I need a preapproval before viewing homes?', 'casa-lumen'),
      'a' => __('Financing requirements vary. A qualified lender can explain available options and the documents that may be required.', 'casa-lumen'),
    ),
    array(
      'q' => __('How is an asking price determined?', 'casa-lumen'),
      'a' => __('Property characteristics, comparable sales, current competition, and seller objectives all contribute to pricing strategy.', 'casa-lumen'),
    ),
    array(
      'q' => __('Do you help with relocation?', 'casa-lumen'),
      'a' => __('Contact the team to confirm available support in your intended area and timeframe.', 'casa-lumen'),
    ),
    array(
      'q' => __('Can you help me evaluate an investment property?', 'casa-lumen'),
      'a' => __('We can discuss real estate goals and search criteria within our confirmed service scope; independent specialists should address tax, legal, or lending advice.', 'casa-lumen'),
    ),
    array(
      'q' => __('Do you provide property management?', 'casa-lumen'),
      'a' => __('Availability and exact services must be confirmed directly with Casa Lumen before commitment.', 'casa-lumen'),
    ),
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
    array('label' => __('Home', 'casa-lumen'), 'url' => clr_url('/')),
    array(
      'label'    => __('Services', 'casa-lumen'),
      'children' => array(
        array(
          'label'       => __('Buy a Home', 'casa-lumen'),
          'url'         => clr_url('/buy/'),
          'icon'        => 'home',
          'description' => __('Explore the process, understand your priorities, and make informed decisions.', 'casa-lumen'),
        ),
        array(
          'label'       => __('Sell Your Home', 'casa-lumen'),
          'url'         => clr_url('/sell/'),
          'icon'        => 'key',
          'description' => __('Start with a pricing conversation and a plan tailored to your property.', 'casa-lumen'),
        ),
        array(
          'label'       => __('Invest in Real Estate', 'casa-lumen'),
          'url'         => clr_url('/invest/'),
          'icon'        => 'chart',
          'description' => __('Discuss your goals, timelines, and property criteria.', 'casa-lumen'),
        ),
      ),
    ),
    array('label' => __('About', 'casa-lumen'), 'url' => clr_url('/about/')),
    array('label' => __('Areas', 'casa-lumen'), 'url' => clr_url('/areas/')),
    array('label' => __('Resources', 'casa-lumen'), 'url' => clr_url('/faq/')),
    array('label' => __('Contact', 'casa-lumen'), 'url' => clr_url('/contact/')),
  );
}

function clr_legal_links() {
  // TODO (brief §15): TREC exige en el footer los enlaces a "Information About Brokerage
  // Services" (IABS, llenado por el broker) y al "Consumer Protection Notice".
  // Agregarlos aquí cuando Yolanda entregue el IABS y se confirme la licencia.
  return array(
    array('label' => __('Privacy Policy', 'casa-lumen'), 'url' => clr_url('/privacy-policy/')),
    array('label' => __('Terms & Conditions', 'casa-lumen'), 'url' => clr_url('/terms-and-conditions/')),
  );
}

/** Configuración que reciben Navbar y Footer. */
function clr_js_config() {
  return array(
    'homeUrl' => clr_url('/'),
    'brand'   => array(
      'logo'           => clr_brand_url('logo-horizontal'),
      'logoLight'      => clr_brand_url('logo-principal', true),
      'logoSize'       => clr_brand_sizes()['logo-horizontal'],
      'logoLightSize'  => clr_brand_sizes()['logo-principal'],
    ),
    'lang'    => clr_lang(),
    'site'    => clr_site(),
    'form'    => clr_contact_js_config(),
    'nav'     => clr_nav(),
    'socials' => clr_socials(),
    // La página de contacto ya tiene su mapa grande.
    'footerMap' => !is_page('contact'),
    'legal'   => clr_legal_links(),
    // Switch EN | ES: la misma página en el otro idioma (inc/i18n.php).
    'languages' => array(
      array('code' => 'EN', 'label' => 'English', 'lang' => 'en', 'url' => clr_lang_urls()['en'], 'current' => clr_lang() === 'en'),
      array('code' => 'ES', 'label' => 'Español', 'lang' => 'es', 'url' => clr_lang_urls()['es'], 'current' => clr_lang() === 'es'),
    ),
    'i18n' => array(
      'cta'          => __('Schedule a Consultation', 'casa-lumen'),
      'call'         => __('Call', 'casa-lumen'),
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
      'mapConsent'   => __('The map is provided by Google and uses cookies. It loads only if you accept them.', 'casa-lumen'),
      'mapAccept'    => __('Accept cookies and show map', 'casa-lumen'),
      'mapShow'      => __('Show map', 'casa-lumen'),
      'mapConsentShort' => __('Uses Google cookies', 'casa-lumen'),
      'mapOpen'      => __('Google Maps', 'casa-lumen'),
      'cookieTitle'  => __('Your choice, in plain view.', 'casa-lumen'),
      'cookieText'   => __('We use cookies to understand how the site is used and to show Google Maps. Nothing loads until you decide.', 'casa-lumen'),
      'cookieAccept' => __('Accept', 'casa-lumen'),
      'cookieReject' => __('Reject', 'casa-lumen'),
      'cookieSettings' => __('Cookie settings', 'casa-lumen'),
      'privacyLink'  => __('Privacy Policy', 'casa-lumen'),
      'privacyUrl'   => clr_url('/privacy-policy/'),
      'openInMaps'   => __('Open in Google Maps', 'casa-lumen'),
      'social'       => __('Social media', 'casa-lumen'),
      'rights'       => __('All rights reserved.', 'casa-lumen'),
      // Crédito de la agencia: texto fijo, igual en ambos idiomas.
      'credit'       => 'Crafted by 828 Marketing Solutions',
      'creditUrl'    => 'https://828marketingsolutions.com',
      // Arquitectura de marca: respaldo discreto, solo texto.
      'family'       => __('Part of the Lumen family', 'casa-lumen'),
      'equalHousing' => __('Equal Housing Opportunity', 'casa-lumen'),
    ),
  );
}
