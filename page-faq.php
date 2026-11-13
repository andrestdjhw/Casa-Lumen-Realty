<?php
/**
 * FAQ / Preguntas frecuentes. Copy del brief §10.
 * Preguntas en clr_faqs() (inc/site-data.php); el acordeón es template-parts/faq-section.php.
 */

get_header(); ?>

<main>
  <?php get_template_part('template-parts/page-hero', null, array(
    'eyebrow' => __('Resources / FAQs', 'casa-lumen'),
    'title'   => __('Good questions lead to better decisions.', 'casa-lumen'),
    'intro'   => __('Here are starting points for common real estate questions. The right answer always depends on your situation and current market conditions.', 'casa-lumen'),
    // Foto del cliente (uploads/2026/11/Resources.jpg), optimizada en assets/images.
    'image'   => 'resources.jpg',
  )); ?>

  <?php get_template_part('template-parts/faq-section', null, array(
    // La página ya tiene su H1; la frase de la izquierda no es un encabezado.
    'heading_level' => 'p',
  )); ?>

  <?php get_template_part('template-parts/role-grid', null, array(
    'eyebrow' => __('Explore by topic', 'casa-lumen'),
    'title'   => __('Guides for each step.', 'casa-lumen'),
    'intro'   => __('Each page explains the process, what to prepare, and the questions worth asking.', 'casa-lumen'),
    'items'   => array(
      array('icon' => 'home', 'title' => __('Buying a home', 'casa-lumen'), 'text' => __('The purchase process, who is involved, and how to prepare.', 'casa-lumen'), 'url' => clr_url('/buy/'), 'link' => __('Learn About Buying', 'casa-lumen')),
      array('icon' => 'key', 'title' => __('Selling a home', 'casa-lumen'), 'text' => __('Pricing, preparation, and what to gather before listing.', 'casa-lumen'), 'url' => clr_url('/sell/'), 'link' => __('Learn About Selling', 'casa-lumen')),
      array('icon' => 'chart', 'title' => __('Investment property', 'casa-lumen'), 'text' => __('Goals, holding costs, and questions for other professionals.', 'casa-lumen'), 'url' => clr_url('/invest/'), 'link' => __('Learn About Investing', 'casa-lumen')),
      array('icon' => 'map-pin', 'title' => __('Areas and relocation', 'casa-lumen'), 'text' => __('What to compare when choosing where to live.', 'casa-lumen'), 'url' => clr_url('/areas/'), 'link' => __('Explore Areas', 'casa-lumen')),
    ),
    'class'   => 'bg-cream-50',
  )); ?>

  <!-- Glosario: términos frecuentes en una compra o venta en Texas (información general). -->
  <section class="bg-cream-200 py-20 lg:py-24">
    <div class="mx-auto max-w-site px-4 sm:px-6">
      <div class="max-w-2xl">
        <p class="eyebrow"><?php esc_html_e('Glossary', 'casa-lumen'); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('Terms you will hear along the way.', 'casa-lumen'); ?></h2>
        <p class="mt-6 text-[17px] leading-relaxed text-ink/75"><?php esc_html_e('Plain-language definitions of common real estate terms. Your contract and your professionals have the final word for your situation.', 'casa-lumen'); ?></p>
      </div>
      <dl class="mt-14 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        <?php
        $terms = array(
          array(__('Earnest money', 'casa-lumen'), __('A deposit the buyer makes after an offer is accepted, usually held by the title company and applied at closing.', 'casa-lumen')),
          array(__('Option period', 'casa-lumen'), __('Days, agreed in the contract, during which a Texas buyer who paid an option fee can end the contract.', 'casa-lumen')),
          array(__('Pre-approval', 'casa-lumen'), __('A lender’s review of your finances that indicates how much you may be able to borrow. It is not a final loan approval.', 'casa-lumen')),
          array(__('Appraisal', 'casa-lumen'), __('An independent opinion of the property’s value, often required by the lender.', 'casa-lumen')),
          array(__('Home inspection', 'casa-lumen'), __('A review of the home’s condition by a licensed inspector, usually done during the option period.', 'casa-lumen')),
          array(__('Title insurance', 'casa-lumen'), __('Coverage that protects against certain problems with ownership records of the property.', 'casa-lumen')),
          array(__('Closing costs', 'casa-lumen'), __('Fees and expenses paid to complete the transaction, such as lender, title, and recording charges.', 'casa-lumen')),
          array(__('Contingency', 'casa-lumen'), __('A condition in the contract that must be met, such as financing or an appraisal, for the sale to move forward.', 'casa-lumen')),
          array(__('Closing', 'casa-lumen'), __('The final step, when documents are signed, funds are transferred, and ownership changes hands.', 'casa-lumen')),
        );
        foreach ($terms as $term) { ?>
          <div class="bg-cream-50 p-7">
            <dt class="font-serif text-xl text-ink"><?php echo esc_html($term[0]); ?></dt>
            <dd class="mt-2 text-sm leading-relaxed text-ink/70"><?php echo esc_html($term[1]); ?></dd>
          </div>
        <?php } ?>
      </dl>
    </div>
  </section>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('Ask a question', 'casa-lumen'),
    'body'    => __('Tell us what you are planning, and our team can follow up about the next step.', 'casa-lumen'),
    'label'   => __('Ask a Question', 'casa-lumen'),
  )); ?>
</main>

<?php get_footer();
