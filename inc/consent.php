<?php
/**
 * Consent Mode de Google: todo "denied" por defecto, antes de que cargue GTM/GA4.
 * Si el visitante ya aceptó en una visita anterior, se concede la analítica de inmediato.
 * El aviso y los cambios de elección viven en src/components/CookieConsent.js.
 */

add_action('wp_head', function () {
  ?>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
try { if ((JSON.parse(localStorage.getItem('clr_cookie_consent')) || {}).value === 'accepted') gtag('consent', 'update', {analytics_storage: 'granted'}); } catch (e) {}
</script>
  <?php
}, 1);
