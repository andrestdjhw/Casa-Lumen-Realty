<?php
/**
 * Sección de conversión con formulario segmentado (brief §02: evitar un formulario
 * único indiscriminado). El formulario lo monta React (ContactForm).
 *
 * @var array $args {
 *   @type string $eyebrow
 *   @type string $title
 *   @type string $intro
 *   @type string $source   Identificador del formulario para el correo y la analítica.
 *   @type string $interest Interés preseleccionado (buying, selling, investing, general).
 *   @type string $fields   Campos extra separados por coma (area, zip, budget, propertyType, timeline, message).
 *   @type string $submit   Texto del botón (CTA del brief).
 *   @type string $note     Opcional: aviso bajo el texto (p. ej. financiamiento).
 * }
 */

$site = clr_site();
?>
<section id="lead" class="scroll-mt-28 bg-cream-200 py-20 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
    <div>
      <p class="eyebrow"><?php echo esc_html($args['eyebrow']); ?></p>
      <h2 class="mt-4 font-serif text-4xl leading-tight text-ink"><?php echo esc_html($args['title']); ?></h2>
      <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
      <p class="mt-8 leading-relaxed text-ink/75"><?php echo esc_html($args['intro']); ?></p>

      <ul class="mt-8 space-y-3 text-sm text-ink/80">
        <li>
          <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="flex items-center gap-3 font-semibold hover:text-gold-600">
            <?php echo clr_icon('phone', 'size-5 text-gold-600'); ?>
            <?php echo esc_html($site['phone']); ?>
          </a>
        </li>
        <li>
          <a href="mailto:<?php echo esc_attr($site['email']); ?>" class="flex items-center gap-3 hover:text-gold-600">
            <?php echo clr_icon('mail', 'size-5 text-gold-600'); ?>
            <?php echo esc_html($site['email']); ?>
          </a>
        </li>
      </ul>

      <?php if (!empty($args['note'])) { ?>
        <p class="mt-8 border-l-2 border-gold-500 pl-4 text-sm leading-relaxed text-ink/65"><?php echo esc_html($args['note']); ?></p>
      <?php } ?>
    </div>

    <div class="plane">
      <div
        class="bg-white p-6 sm:p-10"
        data-clr-contact-form
        data-variant="full"
        data-source="<?php echo esc_attr($args['source']); ?>"
        data-interest="<?php echo esc_attr($args['interest'] ?? ''); ?>"
        data-fields="<?php echo esc_attr($args['fields'] ?? 'area,timeline,message'); ?>"
        data-submit="<?php echo esc_attr($args['submit'] ?? ''); ?>"
      >
        <!-- Fallback sin JavaScript -->
        <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="btn-primary w-full"><?php echo esc_html(sprintf(__('Call %s', 'casa-lumen'), $site['phone'])); ?></a>
      </div>
    </div>
  </div>
</section>
