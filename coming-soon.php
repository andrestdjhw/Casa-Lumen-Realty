<?php
/**
 * Página "sitio en construcción". La sirve inc/coming-soon.php.
 *
 * Página independiente (sin wp_head): no carga React, analítica ni el aviso de cookies.
 * Bilingüe en una sola vista. A propósito no anuncia servicios, teléfono ni licencia:
 * el brokerage aún no está autorizado por TREC.
 */
$css = get_theme_file_path('build/index.css');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Casa Lumen Realty · Coming soon</title>
    <meta name="description" content="Casa Lumen Realty, San Antonio, TX. Our website is coming soon.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Albert+Sans:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="<?php echo esc_url(get_theme_file_uri('build/index.css') . '?ver=' . filemtime($css)); ?>">
    <?php clr_favicon(); ?>
  </head>
  <body class="bg-cream-200 text-ink">
    <main class="flex min-h-svh items-center justify-center px-4 py-16 sm:px-6">
      <div class="plane w-full max-w-3xl">
        <div class="border border-navy-900/15 bg-cream-50 px-6 py-14 text-center sm:px-14 sm:py-20">
          <?php echo clr_brand_img('logo-principal', 'Casa Lumen Realty', 'mx-auto h-28 w-auto sm:h-36'); ?>

          <p class="eyebrow mt-10">Coming soon <span class="text-gold-600/50" aria-hidden="true">·</span> <span lang="es">Muy pronto</span></p>

          <h1 class="mt-6 grid gap-x-10 gap-y-3 font-serif text-[1.7rem] leading-snug text-navy-900 sm:grid-cols-2 sm:text-[2rem]">
            <span>Our new website is on its way.</span>
            <span lang="es" class="sm:border-l sm:border-navy-900/15 sm:pl-10">Nuestro nuevo sitio está en camino.</span>
          </h1>

          <span class="ruler mx-auto mt-10 block max-w-xs text-navy-900/25" aria-hidden="true"></span>

          <p class="mt-8 text-sm tracking-wide text-ink/60">San Antonio, Texas</p>
        </div>
      </div>
    </main>
  </body>
</html>
