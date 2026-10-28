<?php
/**
 * Pasos numerados con regla de cotas (branding: "Mostrar el proceso").
 *
 * @var array $args {
 *   @type string $eyebrow
 *   @type string $title
 *   @type array  $steps  Lista de array('title' => ..., 'text' => ...).
 *   @type string $class  Clases de fondo de la sección.
 * }
 */

$steps = $args['steps'];
$cols  = count($steps) === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3';
?>
<section class="<?php echo esc_attr($args['class'] ?? 'bg-cream-50'); ?> py-20 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="max-w-2xl">
      <p class="eyebrow"><?php echo esc_html($args['eyebrow']); ?></p>
      <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php echo esc_html($args['title']); ?></h2>
    </div>

    <ol class="mt-14 grid gap-12 md:gap-10 <?php echo $cols; ?>">
      <?php foreach ($steps as $i => $step) { ?>
        <li>
          <span class="font-serif text-5xl text-gold-500"><?php echo esc_html(sprintf('%02d', $i + 1)); ?></span>
          <span class="ruler mt-5 block text-ink/25" aria-hidden="true"></span>
          <h3 class="mt-6 text-lg font-semibold text-ink"><?php echo esc_html($step['title']); ?></h3>
          <p class="mt-2 leading-relaxed text-ink/70"><?php echo esc_html($step['text']); ?></p>
        </li>
      <?php } ?>
    </ol>
  </div>
</section>
