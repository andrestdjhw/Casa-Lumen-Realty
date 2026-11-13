<?php
/**
 * Areas / San Antonio & Surroundings. Copy del brief §09.
 *
 * Brief §09: sin categorizar zonas por demografía ni crear "doorway pages". Las páginas
 * por ciudad (/areas/san-antonio/, Schertz, etc.) solo con cobertura real y contenido propio.
 */

$areas = clr_areas();

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow'   => __('San Antonio & surrounding areas', 'casa-lumen'),
    'title'     => __('Real estate guidance in San Antonio and nearby communities.', 'casa-lumen'),
    'intro'     => __('Explore real estate decisions with local context. Neighborhood priorities, property types, commute patterns, and market conditions can vary from one community to another.', 'casa-lumen'),
    'image'     => 'area-san-antonio.jpg',
    'cta_label' => __('Discuss Your Preferred Area', 'casa-lumen'),
  )); ?>

  <section class="bg-bronze-800 py-20 text-white lg:py-24">
    <div class="mx-auto max-w-site px-4 sm:px-6">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p class="eyebrow text-gold-300"><?php esc_html_e('Local starting points', 'casa-lumen'); ?></p>
          <h2 class="mt-4 font-serif text-4xl leading-tight sm:text-5xl"><?php esc_html_e('Start with what matters to you.', 'casa-lumen'); ?></h2>
        </div>
        <p class="leading-relaxed text-white/80">
          <?php esc_html_e('Tell us which areas you are considering and what matters most: schools, commuting, property type, or neighborhood features. We can discuss your search criteria without making assumptions about any community or its residents.', 'casa-lumen'); ?>
        </p>
      </div>

      <ul class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <?php foreach ($areas as $area) { ?>
          <li class="plane plane-light">
            <div class="bg-bronze-700">
              <?php echo clr_area_map($area, 'h-64 w-full'); ?>
              <p class="px-5 py-4 font-serif text-lg"><?php echo esc_html($area['name']); ?></p>
            </div>
          </li>
        <?php } ?>
      </ul>
      <p class="mt-6 text-xs text-white/60"><?php esc_html_e('Service subject to property and service-area availability.', 'casa-lumen'); ?></p>
    </div>
  </section>

  <?php get_template_part('template-parts/role-grid', null, array(
    'eyebrow' => __('Comparing areas', 'casa-lumen'),
    'title'   => __('What to weigh before choosing where to live.', 'casa-lumen'),
    'intro'   => __('Every community has its own mix of homes, routes, and rules. These are useful questions to research for any area on your list.', 'casa-lumen'),
    'items'   => array(
      array('icon' => 'car', 'title' => __('Commute and daily routes', 'casa-lumen'), 'text' => __('Drive the route at the hours you would actually travel: work, school, and errands.', 'casa-lumen')),
      array('icon' => 'school', 'title' => __('Schools', 'casa-lumen'), 'text' => __('Confirm school assignments and programs directly with the school district for each address.', 'casa-lumen')),
      array('icon' => 'home', 'title' => __('Type and age of homes', 'casa-lumen'), 'text' => __('Newer construction, established neighborhoods, and lot sizes vary from one area to another.', 'casa-lumen')),
      array('icon' => 'building', 'title' => __('HOA and local rules', 'casa-lumen'), 'text' => __('Review association dues, restrictions, and city requirements before you commit.', 'casa-lumen')),
      array('icon' => 'droplet', 'title' => __('Flood zones and insurance', 'casa-lumen'), 'text' => __('Check FEMA flood maps for the address and ask for insurance quotes early.', 'casa-lumen')),
      array('icon' => 'dollar', 'title' => __('Property taxes', 'casa-lumen'), 'text' => __('Tax rates differ by city, county, and district, and can change the monthly cost.', 'casa-lumen')),
    ),
    'class'   => 'bg-cream-50',
  )); ?>

  <?php get_template_part('template-parts/lead', null, array(
    'eyebrow'  => __('Discuss your preferred area', 'casa-lumen'),
    'title'    => __('Tell us where you are looking.', 'casa-lumen'),
    'intro'    => __('Share the communities you have in mind and what you want nearby. We will follow up with a conversation, not a sales pitch.', 'casa-lumen'),
    'source'   => 'areas-page',
    'submit'   => __('Discuss Your Preferred Area', 'casa-lumen'),
  )); ?>
  <?php get_template_part('template-parts/faq-section', null, array(
    'eyebrow'  => __('Relocation questions', 'casa-lumen'),
    'faqs'     => clr_pick_faqs(array(3, 10, 0)),
    'show_all' => true,
    'class'    => 'bg-cream-50',
  )); ?>
</main>

<?php get_footer();
