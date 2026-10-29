<?php
/**
 * Terms & Conditions / Términos y condiciones.
 */

get_header();

get_template_part('template-parts/legal-page', null, array(
  'doc'     => 'terms',
  'eyebrow' => __('Legal', 'casa-lumen'),
  'intro'   => __('The terms that apply when you use this website. Please read them before you share information with us.', 'casa-lumen'),
));

get_footer();
