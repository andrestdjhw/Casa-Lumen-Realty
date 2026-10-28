<?php
/**
 * Formulario de contacto: opciones compartidas con React y endpoint REST
 * POST /wp-json/casa-lumen/v1/contact (brief §11).
 *
 * No se guardan los leads en la base de datos ni en logs; solo se envían por correo.
 */

function clr_contact_options() {
  return array(
    'interest' => array(
      'buying'    => __('Buying', 'casa-lumen'),
      'selling'   => __('Selling', 'casa-lumen'),
      'investing' => __('Investing', 'casa-lumen'),
      'general'   => __('General question', 'casa-lumen'),
    ),
    'language' => array(
      'en' => 'English',
      'es' => 'Español',
    ),
    'timeline' => array(
      '0-3'       => __('Within 3 months', 'casa-lumen'),
      '3-6'       => __('3–6 months', 'casa-lumen'),
      '6-12'      => __('6–12 months', 'casa-lumen'),
      'exploring' => __('Just exploring', 'casa-lumen'),
    ),
    // Brief §04: rango opcional; nunca pedir ingresos ni documentos.
    'budget' => array(
      'under-250' => __('Under $250K', 'casa-lumen'),
      '250-400'   => '$250K–$400K',
      '400-600'   => '$400K–$600K',
      '600-plus'  => __('$600K+', 'casa-lumen'),
      'not-sure'  => __('Not sure yet', 'casa-lumen'),
    ),
    'propertyType' => array(
      'single-family' => __('Single-family home', 'casa-lumen'),
      'townhome'      => __('Townhome or condo', 'casa-lumen'),
      'multi-family'  => __('Multi-family', 'casa-lumen'),
      'land'          => __('Land', 'casa-lumen'),
      'other'         => __('Other', 'casa-lumen'),
    ),
  );
}

/** Configuración del formulario que recibe React (window.casaLumen.form). */
function clr_contact_js_config() {
  $site = clr_site();

  return array(
    'endpoint' => rest_url('casa-lumen/v1/contact'),
    'options'  => clr_contact_options(),
    'i18n'     => array(
      'name'          => __('Full name', 'casa-lumen'),
      'phone'         => __('Phone', 'casa-lumen'),
      'email'         => __('Email', 'casa-lumen'),
      'language'      => __('Preferred language', 'casa-lumen'),
      'interest'      => __('I am interested in', 'casa-lumen'),
      'area'          => __('Preferred area', 'casa-lumen'),
      'timeline'      => __('Timeline', 'casa-lumen'),
      'budget'        => __('Budget range', 'casa-lumen'),
      'zip'           => __('Property ZIP code', 'casa-lumen'),
      'propertyType'  => __('Property type', 'casa-lumen'),
      'invalidZip'    => __('Enter a 5-digit ZIP code.', 'casa-lumen'),
      'message'       => __('Message', 'casa-lumen'),
      'optional'      => __('optional', 'casa-lumen'),
      'select'        => __('Select…', 'casa-lumen'),
      'consent'       => __('I agree to be contacted by Casa Lumen Realty about my inquiry and accept the', 'casa-lumen'),
      'privacy'       => __('Privacy Policy', 'casa-lumen'),
      'privacyUrl'    => home_url('/privacy-policy/'),
      'submit'        => __('Send My Message', 'casa-lumen'),
      'sending'       => __('Sending…', 'casa-lumen'),
      'required'      => __('This field is required.', 'casa-lumen'),
      'invalidEmail'  => __('Enter a valid email address.', 'casa-lumen'),
      'invalidPhone'  => __('Enter a valid phone number.', 'casa-lumen'),
      'consentNeeded' => __('Please accept to continue.', 'casa-lumen'),
      'successTitle'  => __('Thank you.', 'casa-lumen'),
      /* translators: %s: phone number */
      'success'       => sprintf(__('Your message has been received. A team member will review your request. For immediate assistance, call %s.', 'casa-lumen'), $site['phone']),
      /* translators: %s: phone number */
      'error'         => sprintf(__('We couldn’t send your message. Please try again or call %s.', 'casa-lumen'), $site['phone']),
    ),
  );
}

add_action('rest_api_init', function () {
  register_rest_route('casa-lumen/v1', '/contact', array(
    'methods'             => 'POST',
    'callback'            => 'clr_handle_contact',
    'permission_callback' => '__return_true',
  ));
});

function clr_handle_contact(WP_REST_Request $request) {
  $data = $request->get_json_params();
  if (!is_array($data)) {
    return new WP_Error('clr_bad_request', 'Invalid request.', array('status' => 400));
  }

  // Anti-spam: honeypot y envíos demasiado rápidos. Se responde "ok" para no dar pistas al bot.
  if (!empty($data['website']) || (int) ($data['elapsed'] ?? 0) < 3000) {
    return array('ok' => true);
  }

  // Límite: 5 envíos por IP por hora.
  $ip_key = 'clr_contact_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
  $count  = (int) get_transient($ip_key);
  if ($count >= 5) {
    return new WP_Error('clr_rate_limited', 'Too many requests.', array('status' => 429));
  }

  $options = clr_contact_options();
  $lead    = array(
    'name'     => sanitize_text_field($data['name'] ?? ''),
    'phone'    => sanitize_text_field($data['phone'] ?? ''),
    'email'    => sanitize_email($data['email'] ?? ''),
    'language' => sanitize_key($data['language'] ?? ''),
    'interest' => sanitize_key($data['interest'] ?? ''),
    'area'     => sanitize_text_field($data['area'] ?? ''),
    'timeline' => sanitize_key($data['timeline'] ?? ''),
    'budget'   => sanitize_key($data['budget'] ?? ''),
    'zip'      => sanitize_text_field($data['zip'] ?? ''),
    'propertyType' => sanitize_key($data['propertyType'] ?? ''),
    'message'  => mb_substr(sanitize_textarea_field($data['message'] ?? ''), 0, 2000),
    'source'   => sanitize_text_field($data['source'] ?? ''),
    'page'     => esc_url_raw($data['page'] ?? ''),
  );

  $errors = array();
  if ($lead['name'] === '') $errors['name'] = 'required';
  if (!is_email($lead['email'])) $errors['email'] = 'invalidEmail';
  if (strlen(preg_replace('/\D/', '', $lead['phone'])) < 10) $errors['phone'] = 'invalidPhone';
  if (!isset($options['interest'][$lead['interest']])) $errors['interest'] = 'required';
  if (!isset($options['language'][$lead['language']])) $errors['language'] = 'required';
  if ($lead['timeline'] !== '' && !isset($options['timeline'][$lead['timeline']])) $errors['timeline'] = 'required';
  if ($lead['budget'] !== '' && !isset($options['budget'][$lead['budget']])) $errors['budget'] = 'required';
  if ($lead['propertyType'] !== '' && !isset($options['propertyType'][$lead['propertyType']])) $errors['propertyType'] = 'required';
  if ($lead['zip'] !== '' && !preg_match('/^\d{5}$/', $lead['zip'])) $errors['zip'] = 'invalidZip';
  if (empty($data['consent'])) $errors['consent'] = 'consentNeeded';

  if ($errors) {
    return new WP_Error('clr_invalid', 'Invalid fields.', array('status' => 422, 'fields' => $errors));
  }

  $interest = $options['interest'][$lead['interest']];
  $lines    = array(
    'Name: ' . $lead['name'],
    'Phone: ' . $lead['phone'],
    'Email: ' . $lead['email'],
    'Interested in: ' . $interest,
    'Preferred language: ' . $options['language'][$lead['language']],
    'Preferred area: ' . ($lead['area'] ?: '—'),
    'Timeline: ' . ($lead['timeline'] ? $options['timeline'][$lead['timeline']] : '—'),
    'Budget range: ' . ($lead['budget'] ? $options['budget'][$lead['budget']] : '—'),
    'Property ZIP: ' . ($lead['zip'] ?: '—'),
    'Property type: ' . ($lead['propertyType'] ? $options['propertyType'][$lead['propertyType']] : '—'),
    '',
    'Message:',
    $lead['message'] ?: '—',
    '',
    'Form: ' . $lead['source'],
    'Page: ' . $lead['page'],
    'Privacy consent: yes',
  );

  // TODO (brief §11): confirmar el correo oficial de leads con Yolanda y configurar SMTP + SPF/DKIM/DMARC.
  $to   = apply_filters('clr_lead_email', get_option('admin_email'));
  $sent = wp_mail(
    $to,
    sprintf('[Casa Lumen] New %s lead — %s', strtolower($interest), $lead['name']),
    implode("\n", $lines),
    array('Reply-To: ' . $lead['name'] . ' <' . $lead['email'] . '>')
  );

  if (!$sent) {
    return new WP_Error('clr_mail_failed', 'Mail could not be sent.', array('status' => 500));
  }

  set_transient($ip_key, $count + 1, HOUR_IN_SECONDS);
  return array('ok' => true);
}
