<?php
/**
 * Rejilla de tarjetas con ícono: encabezado arriba (título a la izquierda, intro a la
 * derecha) y tarjetas planas. Si la tarjeta tiene url, toda la tarjeta es clickeable.
 *
 * @var array $args {
 *   @type string $eyebrow
 *   @type string $title
 *   @type string $intro  Opcional.
 *   @type array  $items  Lista de array('icon', 'title', 'text', 'url' opcional, 'link' opcional).
 *   @type string $note   Opcional: texto pequeño bajo la rejilla.
 *   @type string $class  Clases de fondo de la sección.
 * }
 */

$items = $args['items'];
$cols  = count($items) === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';
?>
<section class="<?php echo esc_attr($args['class'] ?? 'bg-cream-50'); ?> py-20 lg:py-24">
  <div class="mx-auto max-w-site px-4 sm:px-6">
    <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
      <div>
        <p class="eyebrow"><?php echo esc_html($args['eyebrow']); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php echo esc_html($args['title']); ?></h2>
      </div>
      <?php if (!empty($args['intro'])) { ?>
        <p class="text-[17px] leading-relaxed text-ink/75"><?php echo esc_html($args['intro']); ?></p>
      <?php } ?>
    </div>

    <ul class="mt-14 grid gap-8 <?php echo $cols; ?>">
      <?php foreach ($items as $item) { ?>
        <li class="plane card3d <?php echo !empty($item['url']) ? 'cursor-pointer' : ''; ?>">
          <div class="flex h-full flex-col bg-white p-7">
            <span class="flex size-12 items-center justify-center text-gold-500 ring-1 ring-cream-200"><?php echo clr_icon($item['icon'], 'size-6'); ?></span>
            <h3 class="mt-6 font-serif text-xl leading-snug text-ink"><?php echo esc_html($item['title']); ?></h3>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-ink/70"><?php echo esc_html($item['text']); ?></p>
            <?php if (!empty($item['url'])) { ?>
              <!-- El ::after cubre la tarjeta: clic en cualquier parte. -->
              <a href="<?php echo esc_url($item['url']); ?>" class="link-arrow mt-6 after:absolute after:inset-0 after:content-['']">
                <?php echo esc_html($item['link']); ?>
                <?php echo clr_icon('arrow-right', 'size-4'); ?>
              </a>
            <?php } ?>
          </div>
        </li>
      <?php } ?>
    </ul>

    <?php if (!empty($args['note'])) { ?>
      <p class="mt-8 text-xs leading-relaxed text-ink/55"><?php echo esc_html($args['note']); ?></p>
    <?php } ?>
  </div>
</section>
