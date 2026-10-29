<?php
/**
 * Página legal: hero + texto. El contenido vive en template-parts/legal/{doc}-{en|es}.php
 * (textos largos, más fáciles de revisar por documento que en el archivo de traducciones).
 *
 * VALIDAR: borrador de referencia; requiere revisión de un abogado y del broker antes de publicar.
 *
 * @var array $args {
 *   @type string $doc     privacy | terms
 *   @type string $eyebrow
 *   @type string $intro
 * }
 */

$updated = '2026-10-28';
?>
<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow' => $args['eyebrow'],
    'title'   => __(get_post_field('post_title', get_queried_object_id()), 'casa-lumen'),
    'intro'   => $args['intro'],
  )); ?>

  <section class="bg-cream-50 py-16 lg:py-24">
    <article class="mx-auto max-w-3xl px-4 sm:px-6">
      <p class="text-xs font-semibold tracking-[0.18em] text-ink/55 uppercase">
        <?php esc_html_e('Last updated', 'casa-lumen'); ?>:
        <time datetime="<?php echo esc_attr($updated); ?>"><?php echo esc_html(date_i18n(get_option('date_format'), strtotime($updated))); ?></time>
      </p>
      <div class="prose mt-8 max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:mt-12 prose-h2:text-2xl prose-a:text-gold-600">
        <?php get_template_part('template-parts/legal/' . $args['doc'] . '-' . clr_lang()); ?>
      </div>
    </article>
  </section>
</main>
