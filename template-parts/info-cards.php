<?php
/**
 * Tarjetas de contenido como planos con sombra rayada.
 *
 * @var array $args {
 *   @type string $eyebrow Opcional.
 *   @type string $title   Opcional.
 *   @type array  $items   Lista de array('id', 'icon', 'eyebrow', 'title', 'body').
 *   @type string $class   Clases de fondo de la sección.
 * }
 */

$items = $args['items'];
?>
<section class="<?php echo esc_attr($args['class'] ?? 'bg-cream-100'); ?> py-20 lg:py-24">
  <div class="mx-auto max-w-site px-4 sm:px-6">
    <?php if (!empty($args['title'])) { ?>
      <div class="mb-14 max-w-2xl">
        <p class="eyebrow"><?php echo esc_html($args['eyebrow']); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php echo esc_html($args['title']); ?></h2>
      </div>
    <?php } ?>

    <div class="grid gap-10 <?php echo count($items) === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'; ?>">
      <?php foreach ($items as $item) { ?>
        <article <?php echo !empty($item['id']) ? 'id="' . esc_attr($item['id']) . '"' : ''; ?> class="plane card3d scroll-mt-32">
          <div class="h-full bg-white p-8 sm:p-10">
            <?php if (!empty($item['icon'])) { ?>
              <span class="flex size-14 items-center justify-center text-gold-500 ring-1 ring-cream-200"><?php echo clr_icon($item['icon'], 'size-7'); ?></span>
            <?php } ?>
            <?php if (!empty($item['eyebrow'])) { ?>
              <p class="eyebrow mt-6"><?php echo esc_html($item['eyebrow']); ?></p>
            <?php } ?>
            <h3 class="mt-3 font-serif text-2xl leading-snug text-ink"><?php echo esc_html($item['title']); ?></h3>
            <p class="mt-4 leading-relaxed text-ink/70"><?php echo esc_html($item['body']); ?></p>
          </div>
        </article>
      <?php } ?>
    </div>
  </div>
</section>
