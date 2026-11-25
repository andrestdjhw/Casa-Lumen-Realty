<?php
/**
 * Galería continua con piezas de la propuesta de marca (look and feel) y fotos de llaves.
 * Las imágenes se repiten dos veces para que la animación (translateX -50%) sea un ciclo
 * sin cortes; la segunda copia va oculta para lectores de pantalla.
 *
 * Se excluyen a propósito los mockups del letrero "For Sale/Se Vende" y las tarjetas de
 * presentación: muestran un teléfono de ejemplo (555) y el cargo "Broker" aún sin aprobar.
 */

$pieces = array(
  array('brand-billboard.jpg', __('Casa Lumen Realty billboard: See the whole deal.', 'casa-lumen')),
  array('brand-keychain.jpg', __('Casa Lumen Realty keychain on a set of documents', 'casa-lumen')),
  array('yolanda-review.jpg', __('Yolanda H. Barboza reviewing details with a client', 'casa-lumen')),
  array('brand-subway.jpg', __('Casa Lumen Realty poster in a station', 'casa-lumen')),
  array('brand-folder.jpg', __('Casa Lumen Realty client folder', 'casa-lumen')),
  array('brand-pace.jpg', __('Casa Lumen Realty wall graphic: You set the pace.', 'casa-lumen')),
  array('yolanda-walkthrough.jpg', __('Yolanda H. Barboza on a home walkthrough', 'casa-lumen')),
  array('brand-sign.jpg', __('Casa Lumen Realty building sign', 'casa-lumen')),
  array('brand-badge.jpg', __('Casa Lumen Realty name badge', 'casa-lumen')),
  array('brand-quote.jpg', __('Casa Lumen Realty framed quote', 'casa-lumen')),
  array('keys-door.jpg', __('House keys with the Casa Lumen Realty keychain', 'casa-lumen')),
);
?>
<section class="tex tex-stone overflow-hidden bg-cream-200 py-20 lg:py-24">
  <div class="mx-auto grid max-w-site gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-end">
    <div>
      <p class="eyebrow"><?php esc_html_e('Casa Lumen Realty', 'casa-lumen'); ?></p>
      <h2 class="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl"><?php esc_html_e('Clear from the first look.', 'casa-lumen'); ?></h2>
    </div>
    <p class="text-[17px] leading-relaxed text-ink/75"><?php esc_html_e('From the first conversation to the keys in your hand, every piece of Casa Lumen carries the same promise: see the whole deal, then decide.', 'casa-lumen'); ?></p>
  </div>

  <div class="marquee mt-14" tabindex="0" aria-label="<?php esc_attr_e('Casa Lumen Realty gallery', 'casa-lumen'); ?>">
    <ul class="marquee-track flex w-max gap-6 px-3">
      <?php foreach (array(false, true) as $copy) {
        foreach ($pieces as $i => $piece) { ?>
          <li class="plane shrink-0" <?php echo $copy ? 'aria-hidden="true"' : ''; ?>>
            <!-- La proporción reserva el ancho antes de que cargue la imagen (carga diferida). -->
            <div class="h-64 overflow-hidden bg-white sm:h-80" style="aspect-ratio: <?php echo esc_attr(clr_image_ratio($piece[0])); ?>">
              <?php echo clr_image($piece[0], $copy ? '' : $piece[1], 'size-full object-cover transition-transform duration-700 hover:scale-105', false, '(min-width: 640px) 480px, 360px'); ?>
            </div>
          </li>
        <?php }
      } ?>
    </ul>
  </div>
</section>
