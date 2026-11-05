<?php
/**
 * Sección de preguntas frecuentes: intro a la izquierda y acordeón a la derecha.
 * Acordeón con <details>: accesible por teclado y sin JavaScript.
 *
 * @var array $args {
 *   @type array  $faqs     Lista de array('q' => ..., 'a' => ...). Por defecto, clr_faqs().
 *   @type string $eyebrow  Opcional.
 *   @type string $heading_level h2 (por defecto) o p cuando la página ya tiene su H1 de FAQ.
 *   @type bool   $show_all Enlace a la página completa de FAQ.
 *   @type string $class    Clases de fondo de la sección.
 * }
 */

$faqs  = $args['faqs'] ?? clr_faqs();
$tag   = $args['heading_level'] ?? 'h2';
?>
<section class="<?php echo esc_attr($args['class'] ?? 'bg-cream-100'); ?> py-20 lg:py-24">
  <div class="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
    <div>
      <?php if (!empty($args['eyebrow'])) { ?>
        <p class="eyebrow mb-4"><?php echo esc_html($args['eyebrow']); ?></p>
      <?php } ?>
      <<?php echo $tag; ?> class="font-serif text-3xl leading-snug text-ink sm:text-4xl"><?php esc_html_e('There are no basic questions.', 'casa-lumen'); ?></<?php echo $tag; ?>>
      <span class="ruler mt-6 block max-w-xs text-gold-500" aria-hidden="true"></span>
      <p class="mt-6 leading-relaxed text-ink/70"><?php esc_html_e('Don’t see yours? Ask it. Questions don’t expire.', 'casa-lumen'); ?></p>
      <div class="mt-8 flex flex-col items-start gap-4">
        <a href="<?php echo esc_url(clr_url('/contact/')); ?>" class="btn-primary">
          <?php esc_html_e('Ask a Question', 'casa-lumen'); ?>
          <?php echo clr_icon('arrow-right', 'size-4'); ?>
        </a>
        <?php if (!empty($args['show_all'])) { ?>
          <a href="<?php echo esc_url(clr_url('/faq/')); ?>" class="link-arrow">
            <?php esc_html_e('See all questions', 'casa-lumen'); ?>
            <?php echo clr_icon('arrow-right', 'size-4'); ?>
          </a>
        <?php } ?>
      </div>
    </div>

    <div class="border-t border-ink/15">
      <?php foreach ($faqs as $i => $faq) { ?>
        <details class="group border-b border-ink/15" <?php echo $i === 0 ? 'open' : ''; ?>>
          <summary class="flex cursor-pointer list-none items-start gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <span class="pt-1 font-serif text-sm text-gold-600"><?php echo esc_html(sprintf('%02d', $i + 1)); ?></span>
            <span class="flex-1 text-lg font-semibold text-ink"><?php echo esc_html($faq['q']); ?></span>
            <span class="mt-1 text-gold-600 transition-transform group-open:rotate-180"><?php echo clr_icon('chevron-down', 'size-5'); ?></span>
          </summary>
          <p class="pr-10 pb-7 pl-12 leading-relaxed text-ink/75"><?php echo esc_html($faq['a']); ?></p>
        </details>
      <?php } ?>
    </div>
  </div>
</section>
