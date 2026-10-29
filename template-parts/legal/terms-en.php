<?php $site = clr_site(); ?>
<p>These Terms &amp; Conditions apply to your use of this website, operated by Casa Lumen Realty (“Casa Lumen,” “we,” “us”). By using the website, you agree to these terms. If you do not agree, please do not use the website.</p>

<h2>General information only</h2>
<p>The content on this website is provided for general information. It is not legal, tax, financial, lending, or investment advice, and it does not replace advice from a qualified professional. Real estate decisions depend on your situation and on current market conditions.</p>

<h2>No guarantees or promises</h2>
<p>We work to keep the information on this website accurate and up to date, but we do not guarantee its completeness or accuracy. Nothing on this website is a promise of a sale price, timeline, property value, financing approval, or investment result.</p>

<h2>Property and market information</h2>
<p>Any property, area, or market information on this website is approximate, may change without notice, and should be independently verified. Images may be illustrative and may not show properties represented by Casa Lumen.</p>

<h2>No agency relationship</h2>
<p>Using this website or submitting a contact form does not create a brokerage, agency, or client relationship. That relationship begins only through a written agreement. Texas law requires all real estate license holders to give prospective clients the Information About Brokerage Services form.</p>
<!-- TODO (brief §15): enlazar aquí el IABS y el Consumer Protection Notice de TREC cuando se entreguen. -->

<h2>Your communications</h2>
<p>When you contact us, you agree to provide accurate information and to be contacted about your inquiry. Please do not send sensitive financial information through our forms. Our <a href="<?php echo esc_url(clr_url('/privacy-policy/')); ?>">Privacy Policy</a> explains how we handle your information.</p>

<h2>Acceptable use</h2>
<p>You agree not to use the website for any unlawful purpose, to send spam or harmful code, or to interfere with its operation or security.</p>

<h2>Intellectual property</h2>
<p>The Casa Lumen name, logo, text, graphics, and design of this website belong to Casa Lumen Realty or its licensors. You may not copy or reuse them without our written permission.</p>

<h2>Links to other websites</h2>
<p>The website may link to third-party websites, such as social media or map services. We do not control and are not responsible for their content or practices.</p>

<h2>Limitation of liability</h2>
<p>To the extent permitted by law, Casa Lumen is not liable for any damages arising from your use of, or inability to use, this website or the information on it. The website is provided “as is” and “as available.”</p>

<h2>Fair housing</h2>
<p>Casa Lumen Realty is committed to the Fair Housing Act and to equal housing opportunity. We do not discriminate on the basis of race, color, religion, sex, disability, familial status, national origin, or any other class protected by law.</p>

<h2>Governing law</h2>
<p>These terms are governed by the laws of the State of Texas. Any dispute related to the website will be handled in the courts of Bexar County, Texas.</p>

<h2>Changes to these terms</h2>
<p>We may update these Terms &amp; Conditions from time to time. The date at the top of this page shows when they were last changed. Continued use of the website means you accept the updated terms.</p>

<h2>Contact us</h2>
<p>
  <?php echo esc_html($site['name']); ?><br>
  <?php echo esc_html(implode(', ', $site['address'])); ?><br>
  <a href="<?php echo esc_attr($site['phoneHref']); ?>"><?php echo esc_html($site['phone']); ?></a> · <a href="mailto:<?php echo esc_attr($site['email']); ?>"><?php echo esc_html($site['email']); ?></a>
</p>
