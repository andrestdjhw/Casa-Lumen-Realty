<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <!-- React (Navbar) reemplaza este contenido; el fallback deja los enlaces en el HTML para SEO y sin JS -->
    <!-- pointer-events-none: al ocultarse la TopBar, el espacio vacío del header no debe bloquear clics -->
    <header id="clr-navbar" class="pointer-events-none sticky top-0 z-50">
      <div class="h-10 bg-navy-900"></div>
      <div class="pointer-events-auto bg-cream-50">
        <nav class="mx-auto flex h-20 max-w-site items-center justify-between gap-6 px-4 sm:px-6" aria-label="Primary">
          <a href="<?php echo esc_url(clr_url('/')); ?>" class="font-serif text-xl">Casa Lumen Realty</a>
          <ul class="hidden gap-5 text-[15.6px] font-medium xl:gap-7 text-ink/80 lg:flex">
            <?php foreach (clr_nav() as $item) {
              foreach ($item['children'] ?? array($item) as $link) { ?>
                <li><a href="<?php echo esc_url($link['url']); ?>"><?php echo esc_html($link['label']); ?></a></li>
              <?php }
            } ?>
          </ul>
        </nav>
      </div>
    </header>
