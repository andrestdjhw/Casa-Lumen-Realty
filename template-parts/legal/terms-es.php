<?php $site = clr_site(); ?>
<p>Estos Términos y condiciones aplican al uso de este sitio web, operado por Casa Lumen Realty (“Casa Lumen”, “nosotros”). Al usar el sitio, aceptas estos términos. Si no estás de acuerdo, por favor no uses el sitio.</p>

<h2>Solo información general</h2>
<p>El contenido de este sitio se ofrece como información general. No es asesoría legal, fiscal, financiera, crediticia ni de inversión, y no sustituye la orientación de un profesional calificado. Las decisiones inmobiliarias dependen de tu situación y de las condiciones actuales del mercado.</p>

<h2>Sin garantías ni promesas</h2>
<p>Procuramos que la información de este sitio sea correcta y esté actualizada, pero no garantizamos que sea completa o exacta. Nada en este sitio es una promesa de precio de venta, plazo, valor de una propiedad, aprobación de financiamiento o resultado de inversión.</p>

<h2>Información de propiedades y del mercado</h2>
<p>Cualquier información sobre propiedades, zonas o el mercado en este sitio es aproximada, puede cambiar sin aviso y debe verificarse de forma independiente. Las imágenes pueden ser ilustrativas y no mostrar propiedades representadas por Casa Lumen.</p>

<h2>Sin relación de representación</h2>
<p>Usar este sitio o enviar un formulario de contacto no crea una relación de corretaje, representación ni de cliente. Esa relación comienza solo mediante un acuerdo por escrito. La ley de Texas exige que todos los titulares de licencias inmobiliarias entreguen a los posibles clientes el formulario Information About Brokerage Services (Información sobre servicios de corretaje).</p>
<!-- TODO (brief §15): enlazar aquí el IABS y el Consumer Protection Notice de TREC cuando se entreguen. -->

<h2>Tus comunicaciones</h2>
<p>Cuando nos contactas, aceptas proporcionar información correcta y que te contactemos sobre tu consulta. Por favor no envíes información financiera delicada por nuestros formularios. Nuestra <a href="<?php echo esc_url(clr_url('/privacy-policy/')); ?>">Política de privacidad</a> explica cómo manejamos tu información.</p>

<h2>Uso aceptable</h2>
<p>Te comprometes a no usar el sitio con fines ilegales, a no enviar spam ni código dañino y a no interferir con su funcionamiento o seguridad.</p>

<h2>Propiedad intelectual</h2>
<p>El nombre y el logotipo de Casa Lumen, así como los textos, gráficos y el diseño de este sitio, pertenecen a Casa Lumen Realty o a sus licenciantes. No puedes copiarlos ni reutilizarlos sin nuestro permiso por escrito.</p>

<h2>Enlaces a otros sitios</h2>
<p>El sitio puede enlazar a sitios de terceros, como redes sociales o servicios de mapas. No controlamos ni somos responsables de su contenido o sus prácticas.</p>

<h2>Limitación de responsabilidad</h2>
<p>En la medida en que lo permita la ley, Casa Lumen no es responsable de daños derivados del uso, o de la imposibilidad de uso, de este sitio o de su información. El sitio se ofrece “tal cual” y “según disponibilidad”.</p>

<h2>Vivienda justa</h2>
<p>Casa Lumen Realty está comprometida con la Ley de Vivienda Justa (Fair Housing Act) y con la igualdad de oportunidades en la vivienda. No discriminamos por raza, color, religión, sexo, discapacidad, situación familiar, origen nacional ni ninguna otra categoría protegida por la ley.</p>

<h2>Ley aplicable</h2>
<p>Estos términos se rigen por las leyes del Estado de Texas. Cualquier controversia relacionada con el sitio se atenderá en los tribunales del condado de Bexar, Texas.</p>

<h2>Cambios a estos términos</h2>
<p>Podemos actualizar estos Términos y condiciones de vez en cuando. La fecha al inicio de esta página indica cuándo se modificaron por última vez. Si sigues usando el sitio, aceptas los términos actualizados.</p>

<h2>Contacto</h2>
<p>
  <?php echo esc_html($site['name']); ?><br>
  <?php echo esc_html(implode(', ', $site['address'])); ?><br>
  <a href="<?php echo esc_attr($site['phoneHref']); ?>"><?php echo esc_html($site['phone']); ?></a> · <a href="mailto:<?php echo esc_attr($site['email']); ?>"><?php echo esc_html($site['email']); ?></a>
</p>
