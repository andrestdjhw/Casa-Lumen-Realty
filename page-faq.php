<?php
/**
 * FAQ / Preguntas frecuentes. Copy del brief §10.
 * Preguntas en clr_faqs() (inc/site-data.php); el acordeón es template-parts/faq-section.php.
 */

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow' => __('Resources / FAQs', 'casa-lumen'),
    'title'   => __('Good questions lead to better decisions.', 'casa-lumen'),
    'intro'   => __('Here are starting points for common real estate questions. The right answer always depends on your situation and current market conditions.', 'casa-lumen'),
    // Foto del cliente (uploads/2026/11/Resources.jpg), optimizada en assets/images.
    'image'   => 'resources.jpg',
  )); ?>

  <?php get_template_part('template-parts/faq-section', null, array(
    // La página ya tiene su H1; la frase de la izquierda no es un encabezado.
    'heading_level' => 'p',
  )); ?>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Ask a question', 'casa-lumen'),
    'body'    => __('Tell us what you are planning, and our team can follow up about the next step.', 'casa-lumen'),
    'label'   => __('Ask a Question', 'casa-lumen'),
  )); ?>
</main>

<?php get_footer();
