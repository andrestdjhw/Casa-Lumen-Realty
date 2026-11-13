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

  <?php get_template_part('template-parts/checklist', null, array(
    'eyebrow' => __('Costs beyond the purchase price', 'casa-lumen'),
    'title'   => __('What it takes to hold a property.', 'casa-lumen'),
    'intro'   => __('The purchase price is only the beginning. Before you decide, look at what the property will cost to own, month after month.', 'casa-lumen'),
    'items'   => array(
      array('title' => __('Property taxes', 'casa-lumen'), 'text' => __('In Texas they can be a significant part of the yearly cost and vary by location.', 'casa-lumen')),
      array('title' => __('Insurance', 'casa-lumen'), 'text' => __('Coverage needs and premiums depend on the property, its use, and its location.', 'casa-lumen')),
      array('title' => __('HOA dues and rules', 'casa-lumen'), 'text' => __('Some associations limit rentals or add requirements for owners.', 'casa-lumen')),
      array('title' => __('Maintenance and repairs', 'casa-lumen'), 'text' => __('Older systems, roofs, and appliances need a reserve for upkeep and replacement.', 'casa-lumen')),
      array('title' => __('Vacancy and turnover', 'casa-lumen'), 'text' => __('Time between tenants and the cost of preparing the property again.', 'casa-lumen')),
      array('title' => __('Financing costs', 'casa-lumen'), 'text' => __('Loan terms for investment property can differ. A licensed lender can explain them.', 'casa-lumen')),
    ),
    'note'    => __('This page offers general information only. It is not tax, legal, or investment advice.', 'casa-lumen'),
    'class'   => 'bg-cream-100',
  )); ?>

  <section class="bg-cream-50 py-20 lg:py-24">
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <?php echo clr_isotype('mx-auto h-16 w-auto'); ?>
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
    'submit'   => __('Discuss Investment Property Goals', 'casa-lumen'),
    'note'     => __('This page offers general information only. It is not tax, legal, or investment advice. Past or projected results do not guarantee future performance.', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/faq-section', null, array(
    'eyebrow'  => __('Investor questions', 'casa-lumen'),
    'faqs'     => clr_pick_faqs(array(4, 5, 7)),
    'show_all' => true,
    'class'    => 'bg-cream-50',
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
