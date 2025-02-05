function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = new Date();
    var pedido = e.parameter.pedido;
    var total = e.parameter.total;
    var pagamento = e.parameter.pagamento;
    var comentarios = e.parameter.comentarios;

    sheet.appendRow([pedido, total, pagamento, comentarios, data]);

    return ContentService.createTextOutput(JSON.stringify({ status: "Sucesso" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log(error);
    return ContentService.createTextOutput(JSON.stringify({ status: "Erro", mensagem: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}