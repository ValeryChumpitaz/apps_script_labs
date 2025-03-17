function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Enviar Correo con Imagen');
}

function enviarCorreo(asunto, mensaje, imagenBase64, imagenNombre, destinatarios) {
  try {
    var destinatariosArray = destinatarios.split(",").map(email => email.trim());

    var adjunto = Utilities.newBlob(
      Utilities.base64Decode(imagenBase64),
      MimeType.JPEG,
      imagenNombre
    );

    MailApp.sendEmail({
      to: destinatariosArray.join(","), 
      subject: asunto,
      body: mensaje,
      attachments: [adjunto]
    });

    // Guardar en Google Sheets
    var resultado = guardarEnSheet(asunto, mensaje, imagenNombre, destinatariosArray.join(", "));

    return "Correo enviado correctamente a: " + destinatariosArray.join(", ") + ". " + resultado;
  } catch (error) {
    Logger.log("Error al enviar correo: " + error.message);
    return "Error al enviar el correo: " + error.message;
  }
}

function guardarEnSheet(asunto, mensaje, imagenNombre, destinatarios) {
  try {
    var sheetId = "1w4e-FrMR8ByNk8uwAL_rcNvRol_eymmCPOJcBjb5Iho"; // ID de tu hoja de cálculo
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName("Registros");

    if (!sheet) {
      sheet = ss.insertSheet("Registros");
      sheet.appendRow(["Fecha", "Asunto", "Mensaje", "Imagen", "Destinatarios"]);
    }

    var fechaActual = new Date();
    sheet.appendRow([fechaActual, asunto, mensaje, imagenNombre, destinatarios]);

    Logger.log("Datos guardados en Sheets correctamente.");
    return "Datos guardados en Sheets.";
  } catch (error) {
    Logger.log("Error al guardar en Sheets: " + error.message);
    return "Error al guardar en Sheets: " + error.message;
  }
}
