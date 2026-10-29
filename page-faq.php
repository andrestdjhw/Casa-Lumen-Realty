<?php
/**
 * FAQ / Preguntas frecuentes. Copy del brief §10.
 *
 * Acordeón con <details>: accesible por teclado y sin JavaScript. Sin FAQPage schema:
 * Google solo lo muestra para sitios gubernamentales y de salud (brief: "sin expectativa
 * de rich result"). VALIDAR: revisar cada respuesta con Yolanda.
 */

$faqs = array(
  array(
    'q' => __('How do I start buying a home?', 'casa-lumen'),
    'a' => __('Begin with your priorities, preferred area, timing, and financial considerations. A consultation can help organize the next steps.', 'casa-lumen'),
  ),
  array(
    'q' => __('Do I need a preapproval before viewing homes?', 'casa-lumen'),
    'a' => __('Financing requirements vary. A qualified lender can explain available options and the documents that may be required.', 'casa-lumen'),
  ),
  array(
    'q' => __('How is an asking price determined?', 'casa-lumen'),
    'a' => __('Property characteristics, comparable sales, current competition, and seller objectives all contribute to pricing strategy.', 'casa-lumen'),
  ),
  array(
    'q' => __('Do you help with relocation?', 'casa-lumen'),
    'a' => __('Contact the team to confirm available support in your intended area and timeframe.', 'casa-lumen'),
  ),
  array(
    'q' => __('Can you help me evaluate an investment property?', 'casa-lumen'),
    'a' => __('We can discuss real estate goals and search criteria within our confirmed service scope; independent specialists should address tax, legal, or lending advice.', 'casa-lumen'),
  ),
  array(
    'q' => __('Do you provide property management?', 'casa-lumen'),
    'a' => __('Availability and exact services must be confirmed directly with Casa Lumen before commitment.', 'casa-lumen'),
  ),
);

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow' => __('Resources / FAQs', 'casa-lumen'),
    'title'   => __('Good questions lead to better decisions.', 'casa-lumen'),
    'intro'   => __('Here are starting points for common real estate questions. The right answer always depends on your situation and current market conditions.', 'casa-lumen'),
  )); ?>

  <section class="bg-cream-100 py-20 lg:py-24">
    <div class="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
      <div>
        <p class="font-serif text-3xl leading-snug text-ink"><?php esc_html_e('There are no basic questions.', 'casa-lumen'); ?></p>
        <span class="ruler mt-6 block max-w-xs text-gold-500" aria-hidden="true"></span>
        <p class="mt-6 leading-relaxed text-ink/70"><?php esc_html_e('Don’t see yours? Ask it. Questions don’t expire.', 'casa-lumen'); ?></p>
        <a href="<?php echo esc_url(clr_url('/contact/')); ?>" class="btn-primary mt-8">
          <?php esc_html_e('Ask a Question', 'casa-lumen'); ?>
          <?php echo clr_icon('arrow-right', 'size-4'); ?>
        </a>
      </div>

      <div class="border-t border-ink/15">
        <?php foreach ($faqs as $i => $faq) { ?>
          <details class="group border-b border-ink/15" <?php echo $i === 0 ? 'open' : ''; ?>>
            <summary class="flex cursor-pointer list-none items-start gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
              <span class="pt-1 font-serif text-sm text-gold-600"><?php echo esc_html(sprintf('%02d', $i + 1)); ?></span>
              <span class="flex-1 text-lg font-semibold text-ink"><?php echo esc_html($faq['q']); ?></span>
              <span class="mt-1 text-gold-600 transition-transform group-open:rotate-180"><?php echo clr_icon('chevron-down', 'size-5'); ?></span>
            </summary>
            <p class="pr-10 pb-7 pl-12 leading-relaxed text-ink/75"><?php echo esc_html($faq['a']); ?></p>
          </details>
        <?php } ?>
      </div>
    </div>
  </section>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Ask a question', 'casa-lumen'),
    'body'    => __('Tell us what you are planning, and our team can follow up about the next step.', 'casa-lumen'),
    'label'   => __('Ask a Question', 'casa-lumen'),
  )); ?>
</main>

<?php get_footer();
