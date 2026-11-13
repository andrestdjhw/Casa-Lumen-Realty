<?php
/**
 * Formulario de contacto (brief §11): opciones y textos que recibe React.
 *
 * El envío lo hace el navegador con EmailJS (src/components/ContactForm.js): una plantilla
 * con el lead para Casa Lumen y otra de auto-respuesta para el cliente. Protegido con
 * reCAPTCHA v3, honeypot y tiempo mínimo de llenado. No se guardan leads en WordPress.
 *
 * Las llaves de abajo son públicas por diseño (EmailJS public key y reCAPTCHA site key).
 * La secret key de reCAPTCHA va en EmailJS, nunca en el tema.
 */

function clr_emailjs_config() {
  return array(
    'serviceId'         => 'service_dah18vj',
    'contactTemplate'   => 'template_y3tp397',
    'autoReplyTemplate' => 'template_jslnicu',
    'publicKey'         => 'jb6ZcNZQ7pT0I9Gxn',
  );
}

function clr_recaptcha_site_key() {
  return '6LcMxh4uAAAAAIu6Qg2TRSDP3cbqvSNdAR5BPsrJ';
}

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
  );
}

/** Configuración del formulario que recibe React (window.casaLumen.form). */
function clr_contact_js_config() {
  $site = clr_site();

  return array(
    'emailjs'   => clr_emailjs_config(),
    'recaptcha' => clr_recaptcha_site_key(),
    'options'   => clr_contact_options(),
    'i18n'     => array(
      'name'          => __('Full name', 'casa-lumen'),
      'phone'         => __('Phone', 'casa-lumen'),
      'email'         => __('Email', 'casa-lumen'),
      'language'      => __('Preferred language', 'casa-lumen'),
      'interest'      => __('I am interested in', 'casa-lumen'),
      'area'          => __('Preferred area', 'casa-lumen'),
      'timeline'      => __('Timeline', 'casa-lumen'),
      'message'       => __('Message', 'casa-lumen'),
      'optional'      => __('optional', 'casa-lumen'),
      'select'        => __('Select…', 'casa-lumen'),
      'consent'       => __('I agree to be contacted by Casa Lumen Realty about my inquiry and accept the', 'casa-lumen'),
      'privacy'       => __('Privacy Policy', 'casa-lumen'),
      'privacyUrl'    => clr_url('/privacy-policy/'),
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
      // {privacy} y {terms} se convierten en enlaces (aviso obligatorio al ocultar la insignia de reCAPTCHA).
      'recaptcha'     => __('This site is protected by reCAPTCHA. The Google {privacy} and {terms} apply.', 'casa-lumen'),
      'googlePrivacy' => __('Privacy Policy', 'casa-lumen'),
      'googleTerms'   => __('Terms of Service', 'casa-lumen'),
      'error'         => sprintf(__('We couldn’t send your message. Please try again or call %s.', 'casa-lumen'), $site['phone']),
    ),
  );
}
