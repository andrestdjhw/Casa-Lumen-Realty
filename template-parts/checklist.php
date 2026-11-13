<?php
/**
 * Lista de verificación: texto a la izquierda y puntos con palomita a la derecha.
 * Contenido educativo general (brief: sin promesas ni cifras).
 *
 * @var array $args {
 *   @type string $eyebrow
 *   @type string $title
 *   @type string $intro
 *   @type array  $items  Lista de array('title' => ..., 'text' => ...).
 *   @type string $note   Opcional: aviso bajo el texto.
 *   @type string $class  Clases de fondo de la sección.
 * }
 */
?>
<section class="<?php echo esc_attr($args['class'] ?? 'bg-cream-100'); ?> py-20 lg:py-24">
  <div class="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
    <div>
      <p class="eyebrow"><?php echo esc_html($args['eyebrow']); ?></p>
      <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php echo esc_html($args['title']); ?></h2>
      <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
      <p class="mt-8 text-[17px] leading-relaxed text-ink/75"><?php echo esc_html($args['intro']); ?></p>
      <?php if (!empty($args['note'])) { ?>
        <p class="mt-6 border-l-2 border-gold-500 pl-4 text-sm leading-relaxed text-ink/65"><?php echo esc_html($args['note']); ?></p>
      <?php } ?>
    </div>

    <ul class="grid gap-px self-start border border-cream-200 bg-cream-200 sm:grid-cols-2">
      <?php foreach ($args['items'] as $item) { ?>
        <li class="flex gap-4 bg-white p-6">
          <?php echo clr_icon('check-circle', 'mt-0.5 size-6 shrink-0 text-gold-500'); ?>
          <div>
            <h3 class="font-semibold text-ink"><?php echo esc_html($item['title']); ?></h3>
            <p class="mt-1.5 text-sm leading-relaxed text-ink/70"><?php echo esc_html($item['text']); ?></p>
          </div>
        </li>
      <?php } ?>
    </ul>
  </div>
</section>
