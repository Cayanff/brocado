/* BROCADO — Painel de pedidos (Google Apps Script). Cole este código em Extensões > Apps Script da sua planilha. */
const SENHA = "troque-esta-senha";   // ← senha do seu painel (admin.html)
const EMAIL = "";                    // ← opcional: e-mail para receber aviso de cada pedido
const ABA = "Pedidos";

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(ABA);
  if (!s) { s = ss.insertSheet(ABA); s.appendRow(["Nº","Data/Hora","Cliente","Telefone","Tipo","Endereço","Itens","Subtotal","Desconto","Entrega","Total","Pagamento","Observação","Status"]); s.setFrozenRows(1); }
  return s;
}
const json_ = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

// Recebe o pedido do site
function doPost(e) {
  const l = LockService.getScriptLock(); l.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents), s = aba_(), n = s.getLastRow();
    s.appendRow([n, new Date(), d.nome, String(d.telefone), d.tipo, d.endereco, d.itens, d.subtotal, d.desconto, d.entrega, d.total, d.pagamento, d.obs, "Novo"]);
    if (EMAIL) MailApp.sendEmail(EMAIL, "Novo pedido #" + n + " — BROCADO", d.nome + " — R$ " + d.total + "\n\n" + d.itens);
    return json_({ ok: true, numero: n });
  } catch (err) { return json_({ ok: false, erro: String(err) }); }
  finally { l.releaseLock(); }
}

// Painel: listar pedidos e mudar status
function doGet(e) {
  const p = e.parameter;
  if (p.key !== SENHA) return json_({ ok: false, erro: "senha" });
  const s = aba_(), v = s.getDataRange().getValues();
  if (p.acao === "status") {
    for (let i = 1; i < v.length; i++) if (String(v[i][0]) === p.id) { s.getRange(i + 1, 14).setValue(p.status); return json_({ ok: true }); }
    return json_({ ok: false });
  }
  const pedidos = v.slice(1).reverse().slice(0, 80).map((r) => ({ n: r[0], data: r[1], nome: r[2], tel: String(r[3]), tipo: r[4], end: r[5], itens: r[6], sub: r[7], desc: r[8], ent: r[9], total: r[10], pag: r[11], obs: r[12], status: r[13] }));
  return json_({ ok: true, pedidos });
}
