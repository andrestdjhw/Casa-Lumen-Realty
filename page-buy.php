<?php
/**
 * Buy / Comprar. Copy del brief §04.
 *
 * VALIDAR (brief §04): jurisdicciones, proceso real e integración MLS/IDX. No se muestran
 * listings hasta tener feed autorizado (brief §12, opción A).
 */

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow'   => __('Buy a home in San Antonio', 'casa-lumen'),
    'title'     => __('Find a home with a plan, not just a search.', 'casa-lumen'),
    'intro'     => __('The right home starts with understanding your needs, budget considerations, timeline, and the steps ahead. We help you approach the purchase process with clearer expectations.', 'casa-lumen'),
    'image'     => 'service-buy.jpg',
    'cta_label' => __('Talk About Buying a Home', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/steps', null, array(
    'eyebrow' => __('What to expect', 'casa-lumen'),
    'title'   => __('Every step of the purchase, in plain view.', 'casa-lumen'),
    'class'   => 'bg-cream-100',
    'steps'   => array(
      array('title' => __('Initial conversation', 'casa-lumen'), 'text' => __('Share your ideal location, property needs, and goals.', 'casa-lumen')),
      array('title' => __('Property search', 'casa-lumen'), 'text' => __('Evaluate available options against your priorities.', 'casa-lumen')),
      array('title' => __('Offer and transaction', 'casa-lumen'), 'text' => __('Understand key milestones, documents, and decisions.', 'casa-lumen')),
      array('title' => __('Closing preparation', 'casa-lumen'), 'text' => __('Know what to expect as your transaction moves forward.', 'casa-lumen')),
    ),
  )); ?>

  <?php get_template_part('template-parts/info-cards', null, array(
    'class' => 'bg-cream-50',
    'items' => array(
      array(
        'id'      => 'first-time-buyers',
        'icon'    => 'home',
        'eyebrow' => __('First-time buyers', 'casa-lumen'),
        'title'   => __('Your questions belong in the conversation.', 'casa-lumen'),
        'body'    => __('Not sure where to begin? We can discuss the homebuying journey and the professionals who may be involved, without making promises about lending eligibility.', 'casa-lumen'),
      ),
      array(
        'id'      => 'relocation',
        'icon'    => 'map-pin',
        'eyebrow' => __('Relocation', 'casa-lumen'),
        'title'   => __('Moving to the San Antonio area?', 'casa-lumen'),
        'body'    => __('Talk through location preferences, commute priorities, lifestyle needs, and your timeline before narrowing your search.', 'casa-lumen'),
      ),
    ),
  )); ?>

  <?php get_template_part('template-parts/lead', null, array(
    'eyebrow'  => __('Talk about buying', 'casa-lumen'),
    'title'    => __('Start with what you need, not with listings.', 'casa-lumen'),
    'intro'    => __('Tell us about the area, the type of home, and your timeline. A budget range is optional, and we never ask for financial documents through this form.', 'casa-lumen'),
    'source'   => 'buy-page',
    'interest' => 'buying',
    'fields'   => 'budget,area,timeline,message',
    'submit'   => __('Talk About Buying a Home', 'casa-lumen'),
    // Brief §13: copy educativo seguro; sin ofrecer préstamos ni preaprobaciones.
    'note'     => __('Questions about financing? A licensed mortgage professional can explain eligibility and loan options.', 'casa-lumen'),
  )); ?>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Still exploring?', 'casa-lumen'),
    'body'    => __('Start years before you are ready, or start today. You set the pace.', 'casa-lumen'),
    'label'   => __('Read Common Questions', 'casa-lumen'),
    'href'    => clr_url('/faq/'),
    'image'   => 'service-relocate.jpg',
  )); ?>
</main>

<?php get_footer();
