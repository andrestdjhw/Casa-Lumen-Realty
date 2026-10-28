<?php $site = clr_site(); ?>
<!-- React (Footer) reemplaza este contenido; el fallback mantiene el NAP en el HTML para SEO local -->
<footer id="clr-footer">
  <div class="border-t border-cream-200 bg-cream-50">
    <div class="mx-auto max-w-7xl px-4 py-14 text-sm text-ink/75 sm:px-6">
      <p class="font-serif text-xl text-ink"><?php echo esc_html($site['name']); ?></p>
      <p class="mt-3"><a href="<?php echo esc_attr($site['phoneHref']); ?>"><?php echo esc_html($site['phone']); ?></a></p>
      <address class="not-italic"><?php echo esc_html(implode(', ', $site['address'])); ?></address>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
