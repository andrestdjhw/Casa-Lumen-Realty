<?php
/**
 * Hero de subpágina: breadcrumb, eyebrow, H1, regla de cotas, intro, CTAs e imagen opcional.
 *
 * @var array $args {
 *   @type string $eyebrow
 *   @type string $title
 *   @type string $intro
 *   @type string $image     Archivo de assets/images (opcional).
 *   @type string $cta_label Opcional; ancla a la sección del formulario (#lead).
 *   @type string $cta_href  Opcional, por defecto #lead.
 * }
 */

$site  = clr_site();
$image = $args['image'] ?? '';
?>
<section class="relative overflow-hidden bg-cream-200">
  <div class="mx-auto grid max-w-7xl <?php echo $image ? 'lg:grid-cols-[1fr_0.9fr]' : ''; ?>">
    <div class="px-4 pt-10 pb-16 sm:px-6 lg:pt-14 lg:pb-24 <?php echo $image ? 'lg:pr-12' : 'max-w-4xl'; ?>">
      <nav aria-label="<?php esc_attr_e('Breadcrumb', 'casa-lumen'); ?>" class="text-xs text-ink/55">
        <ol class="flex items-center gap-2">
          <li><a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-gold-600"><?php esc_html_e('Home', 'casa-lumen'); ?></a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" class="text-ink/80"><?php echo esc_html(get_the_title()); ?></li>
        </ol>
      </nav>

      <p class="eyebrow mt-10"><?php echo esc_html($args['eyebrow']); ?></p>
      <h1 class="mt-5 font-serif text-[2.4rem] leading-[1.15] text-ink sm:text-5xl xl:text-[3.4rem]"><?php echo esc_html($args['title']); ?></h1>
      <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
      <p class="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/75"><?php echo esc_html($args['intro']); ?></p>

      <?php if (!empty($args['cta_label'])) { ?>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="<?php echo esc_url($args['cta_href'] ?? '#lead'); ?>" class="btn-primary">
            <?php echo esc_html($args['cta_label']); ?>
            <?php echo clr_icon('arrow-right', 'size-4'); ?>
          </a>
          <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="btn-outline">
            <?php echo clr_icon('phone', 'size-4 text-gold-600'); ?>
            <?php echo esc_html($site['phone']); ?>
          </a>
        </div>
      <?php } ?>
    </div>

    <?php if ($image) { ?>
      <div class="relative h-80 sm:h-[26rem] lg:h-auto">
        <div class="absolute inset-0 lg:right-[min(0px,calc((80rem-100vw)/2))]">
          <?php echo clr_image($image, '', 'size-full object-cover', true); ?>
        </div>
      </div>
    <?php } ?>
  </div>
</section>
