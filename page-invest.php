<?php
/**
 * Invest / Invertir. Copy del brief §06.
 *
 * Brief §06: incluir disclaimer, CTA de consulta (nunca "earn X% return") y no atribuir
 * servicios de administración sin validar. VALIDAR: oferta formal al inversionista.
 */

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow'   => __('Investment property in San Antonio', 'casa-lumen'),
    'title'     => __('Make property decisions with your long-term goals in mind.', 'casa-lumen'),
    'intro'     => __('Real estate investments involve more than a purchase price. Think about property type, location, operating considerations, and your time horizon before you make a decision.', 'casa-lumen'),
    'image'     => 'service-invest.jpg',
    'cta_label' => __('Discuss Investment Property Goals', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/steps', null, array(
    'eyebrow' => __('Questions worth asking', 'casa-lumen'),
    'title'   => __('See the whole picture before you buy.', 'casa-lumen'),
    'class'   => 'bg-cream-100',
    'steps'   => array(
      array('title' => __('What is the primary goal?', 'casa-lumen'), 'text' => __('Long-term ownership, rental use, or future resale.', 'casa-lumen')),
      array('title' => __('What will it cost to hold?', 'casa-lumen'), 'text' => __('Recurring costs, upkeep, and possible vacancies should be considered.', 'casa-lumen')),
      array('title' => __('Who else should review it?', 'casa-lumen'), 'text' => __('Some questions belong with a lender, attorney, tax advisor, or inspector.', 'casa-lumen')),
    ),
  )); ?>

  <section class="bg-cream-50 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <?php echo clr_isotype('mx-auto h-14 w-16 text-navy-800'); ?>
      <p class="eyebrow mt-8"><?php esc_html_e('Next step', 'casa-lumen'); ?></p>
      <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('Start with the property strategy, not a promise.', 'casa-lumen'); ?></h2>
      <p class="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/75">
        <?php esc_html_e('Share your preferences and goals so we can discuss a suitable real estate search and next steps within our scope.', 'casa-lumen'); ?>
      </p>
    </div>
  </section>

  <?php get_template_part('template-parts/lead', null, array(
    'eyebrow'  => __('Discuss your goals', 'casa-lumen'),
    'title'    => __('Tell us what you are looking for.', 'casa-lumen'),
    'intro'    => __('Share the areas you are considering, your timeline, and what you want the property to do for you.', 'casa-lumen'),
    'source'   => 'invest-page',
    'interest' => 'investing',
    'fields'   => 'area,timeline,message',
    'submit'   => __('Discuss Investment Property Goals', 'casa-lumen'),
    'note'     => __('This page offers general information only. It is not tax, legal, or investment advice. Past or projected results do not guarantee future performance.', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Have more questions?', 'casa-lumen'),
    'body'    => __('Start with the answers to common questions, then reach out when you are ready.', 'casa-lumen'),
    'label'   => __('Read Common Questions', 'casa-lumen'),
    'href'    => clr_url('/faq/'),
    'image'   => 'area-converse.jpg',
  )); ?>
</main>

<?php get_footer();
