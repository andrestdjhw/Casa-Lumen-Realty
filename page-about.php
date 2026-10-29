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
          <?php echo clr_image('yolanda-office.jpg', __('Yolanda H. Barboza', 'casa-lumen'), 'absolute inset-0 size-full object-cover'); ?>
        </div>
      </div>
      <div>
        <p class="eyebrow"><?php esc_html_e('Meet Yolanda', 'casa-lumen'); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('A personal approach to an important decision.', 'casa-lumen'); ?></h2>
        <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
        <p class="mt-8 text-[17px] leading-relaxed text-ink/75">
          <?php esc_html_e('Yolanda H. Barboza brings a background in real estate and experience informed by financial and banking work.', 'casa-lumen'); ?>
        </p>
        <p class="mt-4 text-[17px] leading-relaxed text-ink/75">
          <?php esc_html_e('She knows the system from the inside, and she puts each step in plain view: what you need, what it costs, and what comes next, in English and in Spanish.', 'casa-lumen'); ?>
        </p>
        <!-- TODO: biografía completa, licencia y credenciales cuando Yolanda las apruebe. -->
        <div class="mt-10 flex items-center gap-6">
          <?php echo clr_seal('size-32 shrink-0 text-navy-800', __('Casa Lumen Realty seal: See what you own', 'casa-lumen')); ?>
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

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Connect with Casa Lumen', 'casa-lumen'),
    'body'    => __('Whether you have a timeline or are still exploring, reach out to discuss your next move.', 'casa-lumen'),
    'label'   => __('Connect With Casa Lumen', 'casa-lumen'),
  )); ?>
</main>

<?php get_footer();
