<?php
/**
 * Sell / Vender. Copy del brief §05.
 *
 * Brief §05: botón "Request a Consultation", nunca "Instant Appraisal". Sin galería de
 * propiedades vendidas hasta tener autorizaciones. No prometer plazos ni valores.
 */

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow'   => __('Sell your home in San Antonio', 'casa-lumen'),
    'title'     => __('Selling well starts before the listing goes live.', 'casa-lumen'),
    'intro'     => __('A successful sale requires more than choosing an asking price. We begin by understanding the property, local market conditions, your timing, and what matters most to you.', 'casa-lumen'),
    'image'     => 'service-sell.jpg',
    'cta_label' => __('Request a Property Strategy Consultation', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/steps', null, array(
    'eyebrow' => __('A practical selling strategy', 'casa-lumen'),
    'title'   => __('From first review to closing, step by step.', 'casa-lumen'),
    'class'   => 'bg-cream-100',
    'steps'   => array(
      array('title' => __('Property and goal review', 'casa-lumen'), 'text' => __('Discuss condition, objectives, timing, and next steps.', 'casa-lumen')),
      array('title' => __('Market-informed pricing', 'casa-lumen'), 'text' => __('Review comparable market information and positioning.', 'casa-lumen')),
      array('title' => __('Presentation and marketing', 'casa-lumen'), 'text' => __('Discuss the materials and channels appropriate for the property.', 'casa-lumen')),
      array('title' => __('Offers through closing', 'casa-lumen'), 'text' => __('Understand major decisions and transaction milestones.', 'casa-lumen')),
    ),
  )); ?>

  <section class="bg-cream-50 py-20 lg:py-24">
    <div class="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div>
        <p class="eyebrow"><?php esc_html_e('Seller education', 'casa-lumen'); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('What could affect your sale?', 'casa-lumen'); ?></h2>
        <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
        <p class="mt-8 text-[17px] leading-relaxed text-ink/75">
          <?php esc_html_e('Price, condition, location, competition, financing conditions, and timing can all shape buyer interest. A useful plan starts with facts rather than promises.', 'casa-lumen'); ?>
        </p>
      </div>
      <ul class="grid grid-cols-2 gap-px bg-cream-200 sm:grid-cols-3">
        <?php
        $factors = array(
          array('icon' => 'chart', 'label' => __('Price', 'casa-lumen')),
          array('icon' => 'home', 'label' => __('Condition', 'casa-lumen')),
          array('icon' => 'map-pin', 'label' => __('Location', 'casa-lumen')),
          array('icon' => 'users', 'label' => __('Competition', 'casa-lumen')),
          array('icon' => 'key', 'label' => __('Financing conditions', 'casa-lumen')),
          array('icon' => 'gem', 'label' => __('Timing', 'casa-lumen')),
        );
        foreach ($factors as $factor) { ?>
          <li class="flex flex-col items-start gap-4 bg-white p-6">
            <?php echo clr_icon($factor['icon'], 'size-7 text-gold-500'); ?>
            <span class="text-sm font-semibold text-ink"><?php echo esc_html($factor['label']); ?></span>
          </li>
        <?php } ?>
      </ul>
    </div>
  </section>

  <?php get_template_part('template-parts/lead', null, array(
    'eyebrow'  => __('Request a consultation', 'casa-lumen'),
    'title'    => __('Tell us about the property.', 'casa-lumen'),
    'intro'    => __('Share the ZIP code, the type of property, and your timing. We start with a conversation about your goals, not with a number.', 'casa-lumen'),
    'source'   => 'sell-page',
    'interest' => 'selling',
    'fields'   => 'zip,propertyType,timeline,message',
    'submit'   => __('Request a Consultation', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Not ready to list yet?', 'casa-lumen'),
    'body'    => __('A conversation now can help you plan repairs, timing, and next steps before you decide.', 'casa-lumen'),
    'label'   => __('Read Common Questions', 'casa-lumen'),
    'href'    => clr_url('/faq/'),
  )); ?>
</main>

<?php get_footer();
