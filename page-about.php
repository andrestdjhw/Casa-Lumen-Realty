<?php
/**
 * About / Nosotros. Copy del brief §08.
 *
 * VALIDAR (brief §08): biografía aprobada por Yolanda, cargo, experiencia exacta,
 * credenciales vigentes (16 años, GRI/SRS/PSA) y licencia. No se publican hasta confirmarlas.
 */

$values = clr_values();

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow'   => __('About Casa Lumen Realty', 'casa-lumen'),
    'title'     => __('Local knowledge. Thoughtful guidance.', 'casa-lumen'),
    'intro'     => __('Casa Lumen Realty is built around the belief that real estate decisions deserve time, clarity, and honest conversations. Our focus is helping clients understand the process and make decisions that fit their goals.', 'casa-lumen'),
    'image'     => 'about-interior.jpg',
    'cta_label' => __('Connect With Casa Lumen', 'casa-lumen'),
    'cta_href'  => clr_url('/contact/'),
  )); ?>

  <section class="bg-cream-100 py-20 lg:py-24">
    <div class="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div class="plane">
        <div class="relative aspect-[4/5] bg-white">
          <?php echo clr_image('yolanda-office.jpg', __('Yolanda H. Barboza', 'casa-lumen'), 'absolute inset-0 size-full object-cover', false, '(min-width: 1024px) 50vw, 100vw'); ?>
        </div>
      </div>
      <div>
        <p class="eyebrow"><?php esc_html_e('Meet Yolanda', 'casa-lumen'); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('A personal approach to an important decision.', 'casa-lumen'); ?></h2>
        <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
        <!--
          Biografía estándar redactada con el brief (§01, §08) y el cuestionario. A propósito no
          menciona años de experiencia, credenciales (GRI/SRS/PSA), número de licencia ni NMLS:
          el brief pide publicarlos solo cuando Yolanda y TREC los confirmen.
        -->
        <div class="mt-8 space-y-4 text-[17px] leading-relaxed text-ink/75">
          <p><?php esc_html_e('Yolanda H. Barboza leads Casa Lumen Realty, bringing a background in real estate together with experience informed by financial and banking work.', 'casa-lumen'); ?></p>
          <p><?php esc_html_e('That experience shapes the way she works. She knows the system from the inside, and she puts each step in plain view: what you need, what it costs, and what comes next. Before any decision, the numbers, the documents, and the timeline are on the table.', 'casa-lumen'); ?></p>
          <p><?php esc_html_e('She works with first-time buyers and families who want to understand the process without pressure, homeowners preparing to sell, families relocating to the San Antonio area, and clients exploring investment property. Every conversation can happen in English or in Spanish, and no question is too basic.', 'casa-lumen'); ?></p>
          <p><?php esc_html_e('For Yolanda, the relationship does not end at closing. Clients are welcome to come back with questions about their property, their next move, or the professionals they may need along the way.', 'casa-lumen'); ?></p>
        </div>

        <ul class="mt-8 grid gap-4 border-y border-ink/10 py-6 text-[15px] font-medium text-ink sm:grid-cols-3">
          <li class="flex items-center gap-3"><?php echo clr_icon('users', 'size-5 shrink-0 text-gold-500'); ?><?php esc_html_e('English & Spanish', 'casa-lumen'); ?></li>
          <li class="flex items-center gap-3"><?php echo clr_icon('chart', 'size-5 shrink-0 text-gold-500'); ?><?php esc_html_e('Financial perspective', 'casa-lumen'); ?></li>
          <li class="flex items-center gap-3"><?php echo clr_icon('map-pin', 'size-5 shrink-0 text-gold-500'); ?><?php esc_html_e('San Antonio, TX', 'casa-lumen'); ?></li>
        </ul>

        <div class="mt-10 flex items-center gap-6">
          <?php echo clr_seal('size-32 shrink-0', __('Casa Lumen Realty seal: See what you own', 'casa-lumen')); ?>
          <p class="font-serif text-2xl leading-snug text-ink"><?php esc_html_e('See it all. Then decide.', 'casa-lumen'); ?></p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-cream-50 py-20 lg:py-24">
    <div class="mx-auto max-w-site px-4 sm:px-6">
      <div class="max-w-2xl">
        <p class="eyebrow"><?php esc_html_e('Our values', 'casa-lumen'); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('How we work, before, during, and after the sale.', 'casa-lumen'); ?></h2>
      </div>
      <ul class="mt-14 grid gap-10 md:grid-cols-3">
        <?php
        // Brief §08: Clarity / Respect / Commitment, alineados con la personalidad de marca.
        $about_values = array(
          array('icon' => $values[0]['icon'], 'title' => $values[0]['title'], 'text' => __('Clear explanations, realistic expectations, and informed decisions.', 'casa-lumen')),
          array('icon' => $values[1]['icon'], 'title' => $values[1]['title'], 'text' => __('A bilingual experience that welcomes questions.', 'casa-lumen')),
          array('icon' => $values[2]['icon'], 'title' => $values[2]['title'], 'text' => __('Attention to the details that matter throughout the process.', 'casa-lumen')),
        );
        foreach ($about_values as $value) { ?>
          <li class="border-t border-ink/15 pt-8">
            <?php echo clr_icon($value['icon'], 'size-9 text-gold-500'); ?>
            <h3 class="mt-5 font-serif text-2xl text-ink"><?php echo esc_html($value['title']); ?></h3>
            <p class="mt-3 leading-relaxed text-ink/70"><?php echo esc_html($value['text']); ?></p>
          </li>
        <?php } ?>
      </ul>
    </div>
  </section>

  <?php get_template_part('template-parts/role-grid', null, array(
    'eyebrow' => __('Who we work with', 'casa-lumen'),
    'title'   => __('Different moves, the same clear guidance.', 'casa-lumen'),
    'intro'   => __('Whether it is your first home or your next property, the approach is the same: understand the process, see the costs, and decide at your pace.', 'casa-lumen'),
    'items'   => array(
      array('icon' => 'home', 'title' => __('First-time buyers', 'casa-lumen'), 'text' => __('For those who want to understand each step before committing.', 'casa-lumen'), 'url' => clr_url('/buy/'), 'link' => __('Learn About Buying', 'casa-lumen')),
      array('icon' => 'key', 'title' => __('Homeowners selling', 'casa-lumen'), 'text' => __('For those who want a plan before the listing goes live.', 'casa-lumen'), 'url' => clr_url('/sell/'), 'link' => __('Learn About Selling', 'casa-lumen')),
      array('icon' => 'map-pin', 'title' => __('Families relocating', 'casa-lumen'), 'text' => __('For those moving to the San Antonio area and comparing communities.', 'casa-lumen'), 'url' => clr_url('/areas/'), 'link' => __('Explore Areas', 'casa-lumen')),
      array('icon' => 'chart', 'title' => __('Property investors', 'casa-lumen'), 'text' => __('For those weighing goals, timelines, and holding costs.', 'casa-lumen'), 'url' => clr_url('/invest/'), 'link' => __('Learn About Investing', 'casa-lumen')),
    ),
    'class'   => 'bg-cream-100',
  )); ?>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Connect with Casa Lumen', 'casa-lumen'),
    'body'    => __('Whether you have a timeline or are still exploring, reach out to discuss your next move.', 'casa-lumen'),
    'label'   => __('Connect With Casa Lumen', 'casa-lumen'),
  )); ?>
</main>

<?php get_footer();
