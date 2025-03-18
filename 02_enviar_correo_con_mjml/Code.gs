function convertMJMLtoHTMLAndSendEmail() {
  var url = "https://api.mjml.io/v1/render";
  var apiId = "fb9d6944-92da-4a13-baa8-09121f01768f";
  var apiSecret = "73f0b85e-ba49-4679-b428-b1ec31f40598"; 

  var mjmlTemplate = `
<mjml>
  <mj-head>
    <mj-preview>🔥 Ofertas Exclusivas en Tecnología 🔥</mj-preview>
    <mj-style inline="inline">
      .button { background-color: #ff6600; color: white; padding: 10px; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold; display: block; margin: 10px auto; width: 80%; }
      .product-img { border-radius: 5px; max-width: 100%; height: auto; }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ff6600">
      <mj-column>
        <mj-text font-size="22px" color="white" font-weight="bold">📢 Ofertas Exclusivas en Tecnología 📢</mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="white" border-radius="10px" padding="20px">
      <mj-column width="100%">
        <mj-image width="100%" src="https://i.postimg.cc/Jz5YnTD8/descarga.jpg" class="product-img"></mj-image>
        <mj-text align="center"><b>Laptop ASUS VivoBook 15</b></mj-text>
        <mj-text align="center">Intel Core i5, 12GB RAM, SSD 512GB.</mj-text>
        <mj-button href="https://www.amazon.com/dp/B09F8YZZNL" class="button">Ver más</mj-button>
      </mj-column>
    </mj-section>

    <mj-section>
      <mj-column>
        <mj-text align="center" font-size="14px" color="#666">Síguenos en redes sociales:</mj-text>
        <mj-text align="center">
          <a href="https://facebook.com" style="color: #ff6600; text-decoration: none; font-weight: bold;">Facebook</a> |
          <a href="https://instagram.com" style="color: #ff6600; text-decoration: none; font-weight: bold;">Instagram</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;

  var options = {
    method: "post",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(apiId + ":" + apiSecret),
      "Content-Type": "application/json"
    },
    payload: JSON.stringify({ mjml: mjmlTemplate })
  };

  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());
  var htmlBody = json.html; // HTML generado

  // Enviar el correo con la imagen en línea
  var recipient = "jcanales@vallegrande.edu.pe"; // Cambia esto por el destinatario real
  var subject = "🔥 Ofertas Exclusivas en Tecnología 🔥";

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });

  Logger.log("Correo enviado a: " + recipient);
}
