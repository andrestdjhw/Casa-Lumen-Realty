<?php $site = clr_site(); ?>
<!-- React (Footer) reemplaza este contenido; el fallback mantiene el NAP en el HTML para SEO local -->
<footer id="clr-footer">
  <div class="bg-navy-800">
    <div class="mx-auto max-w-site px-4 py-14 text-sm text-white/75 sm:px-6">
      <?php echo clr_brand_img('logo-principal', $site['name'], 'h-20 w-auto', true); ?>
      <p class="mt-3"><a href="<?php echo esc_attr($site['phoneHref']); ?>"><?php echo esc_html($site['phone']); ?></a></p>
      <address class="not-italic"><?php echo esc_html(implode(', ', $site['address'])); ?></address>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
