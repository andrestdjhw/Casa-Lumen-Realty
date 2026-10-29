<?php
/**
 * Contact / Contacto. Copy del brief §11.
 *
 * VALIDAR (brief §11): horario, correo oficial de leads, agenda/calendario real y
 * política de tiempo de respuesta.
 */

$site = clr_site();

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow' => __('Contact', 'casa-lumen'),
    'title'   => __('Let’s talk about your next move.', 'casa-lumen'),
    'intro'   => __('Tell us what you are planning, and our team can follow up about the next step. You are also welcome to call us directly.', 'casa-lumen'),
  )); ?>

  <section id="lead" class="scroll-mt-28 bg-cream-100 py-20 lg:py-24">
    <div class="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <h2 class="font-serif text-3xl text-ink"><?php esc_html_e('Contact information', 'casa-lumen'); ?></h2>
        <span class="ruler mt-6 block max-w-xs text-gold-500" aria-hidden="true"></span>

        <ul class="mt-8 space-y-6">
          <li>
            <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="flex gap-4 hover:text-gold-600">
              <?php echo clr_icon('phone', 'size-6 shrink-0 text-gold-600'); ?>
              <span>
                <span class="block text-xs font-semibold tracking-[0.18em] text-ink/55 uppercase"><?php esc_html_e('Phone', 'casa-lumen'); ?></span>
                <span class="text-lg font-semibold text-ink"><?php echo esc_html(sprintf(__('Call %s', 'casa-lumen'), $site['phone'])); ?></span>
              </span>
            </a>
          </li>
          <li>
            <a href="mailto:<?php echo esc_attr($site['email']); ?>" class="flex gap-4 hover:text-gold-600">
              <?php echo clr_icon('mail', 'size-6 shrink-0 text-gold-600'); ?>
              <span>
                <span class="block text-xs font-semibold tracking-[0.18em] text-ink/55 uppercase"><?php esc_html_e('Email', 'casa-lumen'); ?></span>
                <span class="text-ink"><?php echo esc_html($site['email']); ?></span>
              </span>
            </a>
          </li>
          <li class="flex gap-4">
            <?php echo clr_icon('map-pin', 'size-6 shrink-0 text-gold-600'); ?>
            <span>
              <span class="block text-xs font-semibold tracking-[0.18em] text-ink/55 uppercase"><?php esc_html_e('Office', 'casa-lumen'); ?></span>
              <address class="text-ink not-italic"><?php echo esc_html(implode(', ', $site['address'])); ?></address>
              <a href="<?php echo esc_url($site['mapsUrl']); ?>" target="_blank" rel="noopener" class="link-arrow mt-1"><?php esc_html_e('Open in Google Maps', 'casa-lumen'); ?><?php echo clr_icon('arrow-right', 'size-4'); ?></a>
            </span>
          </li>
          <li>
            <a href="<?php echo esc_url($site['facebook']); ?>" target="_blank" rel="noopener" class="flex gap-4 hover:text-gold-600">
              <?php echo clr_icon('facebook', 'size-6 shrink-0 text-gold-600'); ?>
              <span>
                <span class="block text-xs font-semibold tracking-[0.18em] text-ink/55 uppercase">Facebook</span>
                <span class="text-ink">facebook.com/yolandabarbozarealtor/</span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div class="plane">
        <div
          class="bg-white p-6 sm:p-10"
          data-clr-contact-form
          data-variant="full"
          data-source="contact-page"
          data-title="<?php esc_attr_e('Send us a message', 'casa-lumen'); ?>"
          data-intro="<?php esc_attr_e('There are no basic questions. We will review your request and follow up.', 'casa-lumen'); ?>"
        >
          <!-- Fallback sin JavaScript -->
          <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="btn-primary w-full"><?php echo esc_html(sprintf(__('Call %s', 'casa-lumen'), $site['phone'])); ?></a>
        </div>
      </div>
    </div>
  </section>

  <section aria-label="<?php esc_attr_e('Office location', 'casa-lumen'); ?>" class="h-[420px] bg-cream-200">
    <iframe title="<?php esc_attr_e('Map of the Casa Lumen Realty office', 'casa-lumen'); ?>" src="<?php echo esc_url($site['mapsEmbed']); ?>" class="size-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  </section>
</main>

<?php get_footer();
