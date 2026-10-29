<?php
/**
 * Privacy Policy / Política de privacidad.
 */

get_header();

get_template_part('template-parts/legal-page', null, array(
  'doc'     => 'privacy',
  'eyebrow' => __('Legal', 'casa-lumen'),
  'intro'   => __('How we collect, use, and protect the information you share with us through this website.', 'casa-lumen'),
));

get_footer();
