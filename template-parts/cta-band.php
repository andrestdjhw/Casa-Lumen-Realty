<?php
/**
 * Banda final: plano navy con marco de plano junto a una imagen.
 * Sin título, usa la frase de la familia Lumen en columnas paralelas EN / ES.
 *
 * @var array $args {
 *   @type string $eyebrow
 *   @type string $title  Opcional.
 *   @type string $body
 *   @type string $label  Texto del botón.
 *   @type string $href   Por defecto, la página de contacto.
 *   @type string $image  Por defecto cta-home.jpg.
 * }
 */

$site = clr_site();
?>
<section class="grid bg-navy-900 text-white lg:grid-cols-2">
  <div class="relative min-h-[280px]">
    <?php echo clr_image($args['image'] ?? 'cta-home.jpg', '', 'absolute inset-0 size-full object-cover'); ?>
  </div>
  <div class="relative px-4 py-16 sm:px-12 lg:py-20">
    <!-- Marco de plano (gráfico de apoyo de la marca) -->
    <div class="pointer-events-none absolute inset-3 border border-white/15 sm:inset-5" aria-hidden="true"></div>

    <div class="relative">
      <p class="eyebrow text-gold-300"><?php echo esc_html($args['eyebrow']); ?></p>
      <?php if (!empty($args['title'])) { ?>
        <h2 class="mt-5 font-serif text-3xl leading-snug lg:text-[2.1rem]"><?php echo esc_html($args['title']); ?></h2>
      <?php } else { ?>
        <!-- Frase de familia Lumen: siempre bilingüe, mismo peso (no se traduce). -->
        <h2 class="mt-5 grid gap-x-8 gap-y-2 font-serif text-3xl leading-snug sm:grid-cols-2 lg:text-[2.1rem]">
          <span lang="en">Questions don’t expire.</span>
          <span lang="es" class="sm:border-l sm:border-white/20 sm:pl-8">Las preguntas no caducan.</span>
        </h2>
      <?php } ?>
      <span class="ruler mt-8 block text-white/30" aria-hidden="true"></span>
      <p class="mt-8 max-w-md leading-relaxed text-white/75"><?php echo esc_html($args['body']); ?></p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="<?php echo esc_url($args['href'] ?? $site['contactUrl']); ?>" class="btn-primary bg-white text-navy-900 hover:bg-cream-100">
          <?php echo esc_html($args['label']); ?>
          <?php echo clr_icon('arrow-right', 'size-4'); ?>
        </a>
        <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="btn-outline border-white/40 bg-transparent text-white hover:bg-white/10">
          <?php echo clr_icon('phone', 'size-4 text-gold-300'); ?>
          <?php echo esc_html($site['phone']); ?>
        </a>
      </div>
    </div>
  </div>
</section>
