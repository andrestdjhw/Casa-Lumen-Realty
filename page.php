<?php
/**
 * Páginas genéricas editables desde WordPress (p. ej. Privacy Policy, Terms, Accessibility).
 */

get_header(); ?>

<main class="bg-cream-50">
  <?php while (have_posts()) {
    the_post(); ?>
    <article class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 class="font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php the_title(); ?></h1>
      <span class="ruler mt-8 block max-w-xs text-gold-500" aria-hidden="true"></span>
      <div class="prose mt-10 max-w-none prose-headings:font-serif prose-a:text-gold-600">
        <?php the_content(); ?>
      </div>
    </article>
  <?php } ?>
</main>

<?php get_footer();
