<?php
/**
 * Meta titles y descriptions del brief por página. Si después se instala un plugin
 * de SEO (Yoast, Rank Math), quitar este archivo para no duplicar etiquetas.
 */

function clr_seo_meta() {
  return array(
    'home'    => array(__('Casa Lumen Realty | San Antonio Real Estate Guidance', 'casa-lumen'), __('Bilingual real estate guidance for home buyers, sellers and investors in San Antonio, TX.', 'casa-lumen')),
    'buy'     => array(__('Buy a Home in San Antonio, TX | Casa Lumen Realty', 'casa-lumen'), __('Find a home with a plan, not just a search. Bilingual guidance for first-time buyers and families relocating to San Antonio.', 'casa-lumen')),
    'sell'    => array(__('Sell Your Home in San Antonio | Casa Lumen Realty', 'casa-lumen'), __('Selling well starts before the listing goes live. Request a property strategy consultation in San Antonio, TX.', 'casa-lumen')),
    'invest'  => array(__('Investment Properties in San Antonio | Casa Lumen Realty', 'casa-lumen'), __('Make property decisions with your long-term goals in mind. Discuss investment property goals in San Antonio, TX.', 'casa-lumen')),
    'about'   => array(__('About Casa Lumen Realty | Yolanda H. Barboza | San Antonio TX', 'casa-lumen'), __('Local knowledge. Thoughtful guidance. Meet Yolanda H. Barboza and the Casa Lumen Realty approach, in English and Spanish.', 'casa-lumen')),
    'areas'   => array(__('San Antonio Real Estate & Nearby Communities | Casa Lumen Realty', 'casa-lumen'), __('Real estate guidance in San Antonio and nearby communities, with local context for your search.', 'casa-lumen')),
    'faq'     => array(__('Real Estate FAQs | Casa Lumen Realty San Antonio', 'casa-lumen'), __('Answers to common questions about buying, selling and investing in San Antonio real estate.', 'casa-lumen')),
    'privacy-policy'       => array(__('Privacy Policy | Casa Lumen Realty', 'casa-lumen'), __('How Casa Lumen Realty collects, uses, and protects the information you share through this website.', 'casa-lumen')),
    'terms-and-conditions' => array(__('Terms & Conditions | Casa Lumen Realty', 'casa-lumen'), __('The terms that apply when you use the Casa Lumen Realty website.', 'casa-lumen')),
    'contact' => array(__('Contact Casa Lumen Realty | San Antonio TX | (210) 724-1955', 'casa-lumen'), __('Tell us what you are planning or call (210) 724-1955. Casa Lumen Realty, 13327 Nacogdoches Rd, Unit 1, San Antonio, TX 78217.', 'casa-lumen')),
  );
}

function clr_current_seo_key() {
  if (is_front_page()) {
    return 'home';
  }
  if (is_page()) {
    return get_post_field('post_name', get_queried_object_id());
  }
  return null;
}

add_filter('pre_get_document_title', function ($title) {
  $meta = clr_seo_meta();
  $key  = clr_current_seo_key();
  return isset($meta[$key]) ? $meta[$key][0] : $title;
});

add_action('wp_head', function () {
  $meta = clr_seo_meta();
  $key  = clr_current_seo_key();
  if (isset($meta[$key])) {
    echo '<meta name="description" content="' . esc_attr($meta[$key][1]) . '">' . "\n";
  }
}, 1);
