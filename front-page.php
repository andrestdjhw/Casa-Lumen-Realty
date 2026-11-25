<?php
/**
 * Home / Inicio. Diseño del mockup; copy del brief §03.
 */

$site = clr_site();

$services = array(
  array(
    'icon'  => 'home',
    'image' => 'service-buy.jpg',
    'title' => __('Buy a Home', 'casa-lumen'),
    'text'  => __('Explore the process, understand your priorities, and make informed decisions.', 'casa-lumen'),
    'link'  => __('Learn About Buying', 'casa-lumen'),
    'url'   => clr_url('/buy/'),
  ),
  array(
    'icon'  => 'key',
    'image' => 'service-sell.jpg',
    'title' => __('Sell Your Home', 'casa-lumen'),
    'text'  => __('Start with a pricing conversation and a plan tailored to your property.', 'casa-lumen'),
    'link'  => __('Learn About Selling', 'casa-lumen'),
    'url'   => clr_url('/sell/'),
  ),
  array(
    'icon'  => 'chart',
    'image' => 'service-invest.jpg',
    'title' => __('Invest in Real Estate', 'casa-lumen'),
    'text'  => __('Discuss your goals, timelines, and property criteria.', 'casa-lumen'),
    'link'  => __('Learn About Investing', 'casa-lumen'),
    'url'   => clr_url('/invest/'),
  ),
  array(
    'icon'  => 'map-pin',
    'image' => 'service-relocate.jpg',
    'title' => __('Relocate to San Antonio', 'casa-lumen'),
    'text'  => __('Talk through location preferences, commute priorities, lifestyle needs, and your timeline.', 'casa-lumen'),
    'link'  => __('Explore Relocation', 'casa-lumen'),
    'url'   => clr_url('/buy/#relocation'),
  ),
);

$steps = array(
  array('title' => __('Tell us what you want to accomplish.', 'casa-lumen'), 'text' => __('There are no basic questions. Start wherever you are, even if you are years away.', 'casa-lumen')),
  array('title' => __('Review the market, process, and realistic next steps.', 'casa-lumen'), 'text' => __('Costs, roles, and risks, explained before you commit to anything.', 'casa-lumen')),
  array('title' => __('Move forward with a plan that fits your goals.', 'casa-lumen'), 'text' => __('You set the pace. If now isn’t the right time, we’ll tell you.', 'casa-lumen')),
);

$values = clr_values();
$areas  = clr_areas();

// VALIDAR (brief §03): reseñas de ejemplo tomadas del mockup. Reemplazar por reseñas
// reales de Google con permiso de reproducción; no publicar estas.
$testimonials = array(
  array('quote' => 'Yolanda made the entire process simple and stress-free. She was always available to answer our questions.', 'name' => 'Maria G.'),
  array('quote' => 'Professional, knowledgeable, and truly cares about her clients. Highly recommend Casa Lumen Realty.', 'name' => 'Carlos R.'),
  array('quote' => 'Excelente servicio, muy atenta y siempre dispuesta a ayudar. ¡La recomiendo totalmente!', 'name' => 'Ana L.'),
);

get_header(); ?>

<main>

  <!-- Hero -->
  <section class="relative overflow-hidden bg-cream-200">
    <!-- Escritorio: la foto ocupa todo el ancho, sin difuminado (pedido del cliente). Un tono navy
         parejo sobre toda la imagen da contraste al texto claro. -->
    <div class="absolute inset-0 hidden lg:block" aria-hidden="true">
      <?php echo clr_image('hero-yolanda.jpg', '', 'kenburns size-full object-cover object-center', true); ?>
      <div class="absolute inset-0 bg-navy-900/55"></div>
    </div>

    <div class="relative mx-auto grid max-w-site lg:grid-cols-[1fr_1.05fr]">
      <div class="intro-stagger relative z-10 px-4 pt-10 pb-32 sm:px-6 sm:pt-14 sm:pb-40 lg:py-16 lg:pr-10">
        <!-- Móvil y tablet: la foto es el fondo del texto. Velo crema fuerte arriba (legibilidad)
             que se aclara hacia abajo para dejar ver la casa detrás de los beneficios y el formulario. -->
        <div class="absolute inset-0 -z-10 overflow-hidden lg:hidden" aria-hidden="true">
          <?php echo clr_image('hero-yolanda.jpg', '', 'size-full object-cover object-[center_60%]', true); ?>
          <div class="absolute inset-0 bg-linear-to-b from-cream-200/95 from-30% via-cream-200/75 via-60% to-cream-200/60 to-85%"></div>
        </div>
        <!-- Pedido del cliente: el logo es lo primero que se ve al entrar. -->
        <!-- Móvil: logo azul sobre el velo crema. Escritorio: logo crema sobre la foto. -->
        <?php echo clr_brand_img('logo-principal', 'Casa Lumen Realty', 'h-24 w-auto sm:h-28 lg:hidden'); ?>
        <?php echo clr_brand_img('logo-principal', 'Casa Lumen Realty', 'hidden h-28 w-auto lg:block xl:h-32', true); ?>
        <h1 class="mt-8 font-serif text-[2.4rem] leading-[1.12] text-ink sm:text-[3.2rem] lg:text-white xl:text-[3.5rem]">
          <?php esc_html_e('See the whole deal.', 'casa-lumen'); ?>
          <span class="block text-gold-500 lg:text-gold-300"><?php esc_html_e('Then decide.', 'casa-lumen'); ?></span>
        </h1>
        <p class="mt-7 max-w-lg text-[17px] leading-relaxed text-ink/75 lg:text-white/85">
          <?php esc_html_e('Buying, selling, or investing in San Antonio? Casa Lumen Realty explains every step, cost, and role before you commit, in English and in Spanish. You set the pace.', 'casa-lumen'); ?>
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#consultation" class="btn-primary lg:bg-white lg:text-navy-900 lg:hover:bg-cream-100">
            <?php esc_html_e('Schedule a Consultation', 'casa-lumen'); ?>
            <?php echo clr_icon('arrow-right', 'size-4'); ?>
          </a>
          <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="btn-outline lg:border-white/50 lg:bg-transparent lg:text-white lg:hover:bg-white/10">
            <?php echo clr_icon('phone', 'size-4 text-gold-600 lg:text-gold-300'); ?>
            <?php echo esc_html($site['phone']); ?>
          </a>
        </div>
        <ul class="mt-10 grid max-w-lg grid-cols-3 gap-4 text-xs leading-snug text-ink/75 lg:text-white/85">
          <li class="flex items-center gap-2.5"><?php echo clr_icon('home', 'size-7 shrink-0 text-gold-500 lg:text-gold-300'); ?><?php esc_html_e('Every step explained', 'casa-lumen'); ?></li>
          <li class="flex items-center gap-2.5"><?php echo clr_icon('users', 'size-7 shrink-0 text-gold-500 lg:text-gold-300'); ?>English · Español</li>
          <li class="flex items-center gap-2.5"><?php echo clr_icon('map-pin', 'size-7 shrink-0 text-gold-500 lg:text-gold-300'); ?><?php esc_html_e('San Antonio & surrounding areas', 'casa-lumen'); ?></li>
        </ul>
      </div>

      <div class="relative lg:min-h-[760px]">
        <!-- Formulario translúcido (sin la sombra rayada: se vería a través del vidrio). -->
        <div id="consultation" class="relative z-10 mx-4 -mt-20 mb-14 scroll-mt-28 sm:mx-auto sm:max-w-lg lg:absolute lg:top-1/2 lg:right-8 lg:m-0 lg:w-[420px] lg:-translate-y-1/2">
          <div
            data-magic-hat
            class="levitate border border-white/20 bg-navy-900 p-6 lg:bg-navy-900/55 lg:p-5 lg:backdrop-blur-md"
            data-clr-contact-form
            data-tone="dark"
            data-dense="1"
            data-variant="compact"
            data-source="home-hero"
            data-title="<?php esc_attr_e('Let’s talk about your next move.', 'casa-lumen'); ?>"
            data-intro="<?php esc_attr_e('There are no basic questions. Tell us what you’re planning and we’ll follow up with a next step.', 'casa-lumen'); ?>"
          >
            <!-- Fallback sin JavaScript -->
            <p class="font-serif text-2xl text-white"><?php esc_html_e('Let’s talk about your next move.', 'casa-lumen'); ?></p>
            <a href="<?php echo esc_attr($site['phoneHref']); ?>" class="btn-primary mt-5 w-full"><?php echo esc_html(sprintf(__('Call %s', 'casa-lumen'), $site['phone'])); ?></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Servicios -->
  <section class="bg-cream-100 py-20 lg:py-24">
    <div class="mx-auto max-w-site px-4 sm:px-6">
      <div class="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p class="eyebrow"><?php esc_html_e('Our Services', 'casa-lumen'); ?></p>
          <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('Real Estate Guidance for Every Next Step.', 'casa-lumen'); ?></h2>
        </div>
        <p class="max-w-md border-gold-300 leading-relaxed text-ink/70 lg:border-l lg:pl-8">
          <?php esc_html_e('Buy, sell, invest, or relocate with the whole picture in front of you: what it takes, what it costs, and what comes next.', 'casa-lumen'); ?>
        </p>
      </div>

      <div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <?php foreach ($services as $i => $service) { ?>
          <article class="plane card3d cursor-pointer">
            <!-- Desfase negativo: cada tarjeta arranca en otro punto de la ola. -->
            <div class="float flex h-full flex-col bg-white" style="--float-delay: <?php echo esc_attr(-1.5 * $i); ?>s">
              <?php echo clr_image($service['image'], '', 'h-52 w-full object-cover', false, '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'); ?>
              <!-- Sin "relative" aquí: el enlace debe tomar como referencia la tarjeta entera. -->
              <div class="flex flex-1 flex-col px-6 pb-7">
                <span class="pointer-events-none relative -mt-8 mb-4 flex size-16 items-center justify-center bg-white text-gold-500 ring-1 ring-cream-200">
                  <?php echo clr_icon($service['icon'], 'size-8'); ?>
                </span>
                <h3 class="font-serif text-xl text-ink"><?php echo esc_html($service['title']); ?></h3>
                <p class="mt-3 flex-1 text-sm leading-relaxed text-ink/70"><?php echo esc_html($service['text']); ?></p>
                <!-- El ::after del enlace cubre toda la tarjeta: clic en cualquier parte lleva a la subpágina. -->
                <a href="<?php echo esc_url($service['url']); ?>" class="link-arrow mt-6 after:absolute after:inset-0 after:content-['']">
                  <?php echo esc_html($service['link']); ?>
                  <?php echo clr_icon('arrow-right', 'size-4'); ?>
                </a>
              </div>
            </div>
          </article>
        <?php } ?>
      </div>
    </div>
  </section>

  <?php get_template_part('template-parts/steps', null, array(
    'eyebrow' => __('How it works', 'casa-lumen'),
    'title'   => __('Every step, in plain view.', 'casa-lumen'),
    'steps'   => $steps,
  )); ?>

  <!-- Frase de marca bilingüe (como en la propuesta de branding): no se traduce, va en ambos idiomas. -->
  <section class="tex tex-white overflow-hidden bg-cream-100 py-20 lg:py-28">
    <div class="mx-auto grid max-w-site items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <p class="eyebrow"><?php esc_html_e('Your timeline, your decision', 'casa-lumen'); ?></p>
        <h2 class="mt-6 font-serif text-5xl leading-[1.08] text-navy-900 sm:text-6xl xl:text-7xl">
          <span lang="en" class="block">You set the pace.</span>
          <span lang="es" class="block text-gold-500">Tú pones el ritmo.</span>
        </h2>
        <span class="ruler mt-10 block max-w-md text-navy-900/30" aria-hidden="true"></span>
        <p class="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/75"><?php esc_html_e('Start years before you are ready, or start today. You set the pace.', 'casa-lumen'); ?></p>
      </div>
      <!-- Numeral grande de la propuesta de marca ("01"): el primer paso es una conversación. -->
      <span class="hidden font-serif text-[16rem] leading-none text-navy-900/[0.07] select-none lg:block" aria-hidden="true" data-reveal>01</span>
    </div>
  </section>

  <!-- Nosotros -->
  <section class="grid lg:grid-cols-2">
    <div class="reveal-wipe relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
      <?php echo clr_image('yolanda-plans.jpg', __('Yolanda H. Barboza reviewing plans with clients', 'casa-lumen'), 'absolute inset-0 size-full object-cover object-[center_20%]', false, '(min-width: 1024px) 50vw, 100vw'); ?>
      <!-- Recuadro compacto en la esquina para no tapar a las personas de la foto. -->
      <div class="absolute bottom-0 left-0 flex max-w-[22rem] items-center gap-5 bg-navy-900 p-5 text-white sm:p-6">
        <?php echo clr_seal('size-16 shrink-0 sm:size-20', __('Casa Lumen Realty seal: See what you own', 'casa-lumen'), true); ?>
        <div>
          <p class="font-serif text-xl leading-snug sm:text-2xl">
            <?php esc_html_e('Real estate, out in the open.', 'casa-lumen'); ?>
          </p>
          <span class="ruler mt-3 block text-gold-300/70" aria-hidden="true"></span>
        </div>
      </div>
    </div>

    <div class="tex tex-plaster bg-cream-200 px-4 py-16 sm:px-12 lg:px-16 lg:py-20">
      <p class="eyebrow"><?php esc_html_e('About Casa Lumen Realty', 'casa-lumen'); ?></p>
      <h2 class="mt-4 font-serif text-4xl leading-tight text-ink"><?php esc_html_e('Real estate guidance built around clarity.', 'casa-lumen'); ?></h2>
      <p class="mt-5 max-w-xl leading-relaxed text-ink/75">
        <?php esc_html_e('A property decision involves more than a listing. We focus on your priorities, the information behind the decision, and communication that helps you know what comes next.', 'casa-lumen'); ?>
      </p>
      <p class="mt-4 max-w-xl leading-relaxed text-ink/75">
        <?php esc_html_e('Yolanda H. Barboza knows the system from the inside, with a background in banking and accounting before real estate. Today she puts each step in plain view, in English and in Spanish.', 'casa-lumen'); ?>
      </p>

      <ul class="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gold-300/60">
        <?php foreach ($values as $value) { ?>
          <li class="text-center sm:px-4">
            <?php echo clr_icon($value['icon'], 'mx-auto size-10 text-gold-500'); ?>
            <h3 class="mt-3 text-sm font-semibold text-ink"><?php echo esc_html($value['title']); ?></h3>
            <p class="mt-1.5 text-xs leading-relaxed text-ink/65"><?php echo esc_html($value['text']); ?></p>
          </li>
        <?php } ?>
      </ul>

      <a href="<?php echo esc_url(clr_url('/about/')); ?>" class="btn-primary mt-10">
        <?php esc_html_e('Meet Yolanda', 'casa-lumen'); ?>
        <?php echo clr_icon('arrow-right', 'size-4'); ?>
      </a>
    </div>
  </section>

  <!-- Áreas: el skyline de San Antonio se mueve más lento que la página (parallax). -->
  <section class="relative overflow-hidden bg-bronze-800 py-16 text-white lg:py-20">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div data-parallax="0.35" class="absolute inset-0">
        <?php echo clr_image('san-antonio-skyline.jpg', '', 'size-full object-cover opacity-35 mix-blend-luminosity', false); ?>
      </div>
      <div class="absolute inset-0 bg-linear-to-b from-bronze-800/60 via-bronze-800/85 to-bronze-800"></div>
    </div>
    <div class="relative mx-auto max-w-site px-4 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow text-gold-300"><?php esc_html_e('San Antonio & Surrounding Areas', 'casa-lumen'); ?></p>
        <h2 class="mt-4 font-serif text-4xl leading-tight"><?php esc_html_e('Rooted in San Antonio. Focused on your next chapter.', 'casa-lumen'); ?></h2>
        <p class="mt-4 leading-relaxed text-white/80">
          <?php esc_html_e('Serving clients in San Antonio and surrounding communities, subject to property and service-area availability.', 'casa-lumen'); ?>
        </p>
      </div>

      <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <?php foreach ($areas as $area) { ?>
          <!-- Sin card3d: un mapa interactivo no debe inclinarse mientras se arrastra. -->
          <li class="plane plane-light">
            <div class="bg-bronze-700">
              <?php echo clr_area_map($area, 'h-[246px] w-full'); ?>
              <a href="<?php echo esc_url(clr_url('/areas/')); ?>" class="group flex items-center gap-2 px-5 py-4 text-base font-semibold">
                <?php echo esc_html($area['name']); ?>
                <?php echo clr_icon('arrow-right', 'size-4 transition-transform group-hover:translate-x-1'); ?>
              </a>
            </div>
          </li>
        <?php } ?>
      </ul>
    </div>
  </section>

  <!-- Piezas de la marca en movimiento continuo (se pausa al pasar el cursor). -->
  <?php get_template_part('template-parts/brand-marquee'); ?>

  <!-- Testimonios -->
  <section class="grid bg-cream-50 lg:grid-cols-[2fr_minmax(0,1fr)]">
    <div class="reveal-wipe relative hidden min-h-[380px] overflow-hidden lg:order-last lg:block">
      <?php echo clr_image('yolanda-tour.jpg', __('Yolanda H. Barboza touring a home with clients', 'casa-lumen'), 'absolute inset-0 size-full object-cover', false, '33vw'); ?>
    </div>
    <div class="px-4 py-16 sm:px-10 lg:py-14">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow"><?php esc_html_e('Client Experiences', 'casa-lumen'); ?></p>
          <h2 class="mt-3 font-serif text-4xl text-ink"><?php esc_html_e('Trusted by Our Clients.', 'casa-lumen'); ?></h2>
          <p class="mt-2 text-sm text-ink/65"><?php esc_html_e('Real stories from people who have worked with Casa Lumen Realty.', 'casa-lumen'); ?></p>
        </div>
        <a href="<?php echo esc_url($site['googleProfile']); ?>" target="_blank" rel="noopener" class="btn-outline shrink-0 py-2.5 text-xs">
          <?php esc_html_e('View More Reviews', 'casa-lumen'); ?>
          <?php echo clr_icon('arrow-right', 'size-4'); ?>
        </a>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <?php foreach ($testimonials as $testimonial) { ?>
          <div class="plane card3d">
            <figure class="flex h-full flex-col border border-cream-200 bg-white p-6">
              <div class="flex gap-1 text-gold-500" role="img" aria-label="<?php esc_attr_e('5 out of 5 stars', 'casa-lumen'); ?>">
                <?php for ($i = 0; $i < 5; $i++) { echo clr_icon('star', 'size-4', true); } ?>
              </div>
              <blockquote class="mt-4 flex-1 text-sm leading-relaxed text-ink/80">“<?php echo esc_html($testimonial['quote']); ?>”</blockquote>
              <figcaption class="mt-5">
                <span class="block text-sm font-semibold text-ink"><?php echo esc_html($testimonial['name']); ?></span>
                <span class="text-xs text-ink/55"><?php esc_html_e('Google Review', 'casa-lumen'); ?></span>
              </figcaption>
            </figure>
          </div>
        <?php } ?>
      </div>
    </div>
  </section>

  <!-- Preguntas frecuentes: las primeras 4; la lista completa vive en /faq/. -->
  <?php get_template_part('template-parts/faq-section', null, array(
    'eyebrow'  => __('Common questions', 'casa-lumen'),
    'faqs'     => array_slice(clr_faqs(), 0, 4),
    'show_all' => true,
  )); ?>

  <?php get_template_part('template-parts/cta-band', null, array(
    'eyebrow' => __('A conversation is the first step', 'casa-lumen'),
    'body'    => __('Whether you have a timeline or are still exploring, reach out to discuss your next move.', 'casa-lumen'),
    'label'   => __('Schedule a Real Estate Consultation', 'casa-lumen'),
  )); ?>

</main>

<?php get_footer();
