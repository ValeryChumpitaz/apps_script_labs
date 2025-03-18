# ✉️ Envío de Correos Promocionales con MJML y Google Apps Script  

Este script en **Google Apps Script** permite enviar correos electrónicos promocionales con diseño **HTML responsivo**, utilizando **MJML**, una tecnología que facilita la creación de correos bien estructurados y adaptables a cualquier dispositivo.  

---

## 📌 Requisitos  

Antes de ejecutar el script, asegúrate de contar con lo siguiente:  

✔ **Acceso a Google Apps Script** en tu cuenta de Google.  
✔ Una cuenta en [MJML.io](https://mjml.io/) para obtener credenciales API.  
✔ Permisos habilitados para enviar correos con `MailApp.sendEmail()`.  

---

## 🛠 Instalación y Configuración  

1️⃣ **Abrir Google Apps Script** y crear un nuevo proyecto.  
2️⃣ **Copiar y pegar el código** del archivo `send_promotional_email.js`.  
3️⃣ **Configurar las credenciales** de la API de MJML en el script.  
4️⃣ **Actualizar el destinatario** en la variable `recipient`.  

📌 Para una guía detallada sobre la configuración de MJML en Apps Script, revisa este documento:  

🔗 [🚀 Guía completa](https://docs.google.com/document/d/1L1sOxNP84wEl-3QUprpJ7-gavoQ6kQ9tsK7DpzfoyNE/edit?tab=t.0)  

---

## 📝 Código Fuente  

### 1️⃣ **Función Principal**  

```javascript
function convertMJMLtoHTMLAndSendEmail() {
  var url = "https://api.mjml.io/v1/render";
  var apiId = "TUS_CREDENCIALES_API_ID"; 
  var apiSecret = "TUS_CREDENCIALES_API_SECRET";
```

---

### 2️⃣ **Plantilla MJML**  

```javascript
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
```

---

### 3️⃣ **Conversión de MJML a HTML**  

```javascript
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
```

---

### 4️⃣ **Envío del Correo con `MailApp.sendEmail()`**  

```javascript
  var recipient = "DESTINATARIO@DOMINIO.COM"; // Cambia esto por el destinatario real
  var subject = "🔥 Ofertas Exclusivas en Tecnología 🔥";

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });

  Logger.log("Correo enviado a: " + recipient);
}
```

---

## 🎯 Consideraciones Importantes  

✔ **MJML requiere credenciales API** para su conversión a HTML.  
✔ **Las imágenes deben ser públicas** para mostrarse correctamente.  
✔ Si necesitas **envío masivo de correos**, considera `GmailApp.sendEmail()` en lugar de `MailApp.sendEmail()`.  
✔ Puedes **personalizar el diseño** modificando la plantilla MJML.  

---

## 🚀 Mejoras Futuras  

✅ Agregar múltiples productos en el correo.  
✅ Personalizar el mensaje con nombres dinámicos.  
✅ Implementar `GmailApp.sendEmail()` con manejo de cuotas de Gmail.  

---

## 📢 Licencia  

Este código es de uso libre y puede ser modificado según tus necesidades. ¡Si te fue útil, dale un ⭐ en GitHub!  

---

### 🚀 ¡Ahora estás listo para enviar correos promocionales con Google Apps Script y MJML! 🎉  

---

