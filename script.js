/* =====================================================================
   SERTÃO GRILL — CONFIGURAÇÃO (edite só esta parte)
   ===================================================================== */
const CONFIG = {
  nome: "SERTÃO GRILL",
  whatsapp: "5599985583929",      // ← SEU NÚMERO: 55 + DDD + número, só dígitos
  instagram: "brocadoburgers",           // ← seu @ do Instagram, sem o @
  painelUrl: "https://script.google.com/macros/s/AKfycbyQbfDo8D5U0Spcf4xH9Fbf4jJIR-ZqNDQrTTbWHDJucp5xLiycK4UQcntcOOH0WuJZQA/exec",                  // ← link do painel de pedidos (Apps Script). Vazio = só WhatsApp
  pedidoMinimo: 15,                // ← 0 = sem mínimo (subtotal em reais)
  taxaEntrega: 0,                 // ← taxa padrão (usada se não houver bairros)
  // Taxa por bairro. Se a lista estiver vazia, usa taxaEntrega.
  bairros: [
    { nome: "Centro", taxa: 5 },
    { nome: "Trizidela", taxa: 6 },
    { nome: "Mariol", taxa: 7 },
    { nome: "Areal", taxa: 6 },
    { nome: "Bairro Novo", taxa: 7 },
    { nome: "Marajá", taxa: 8 },
    { nome: "R. Eco Marajá", taxa: 9 },
    { nome: "Palmeira torta", taxa: 6 },
    { nome: "R. Dom Reinaldo", taxa: 7 },
    { nome: "Cohab", taxa: 5 },
    { nome: "Mocó", taxa: 7 },
  ],
  // Horário: 0=domingo ... 6=sábado. [abre, fecha] ou null = fechado. Fecha após meia-noite? ex: ["18:00","01:00"]
  horarios: {
    0: ["18:00", "23:00"], 1: null, 2: ["18:00", "23:00"], 3: ["18:00", "23:00"],
    4: ["18:00", "23:00"], 5: ["18:00", "23:59"], 6: ["18:00", "23:59"],
  },
  bloquearQuandoFechado: false,   // true = impede finalizar pedido fora do horário
  pagamentos: ["Pix", "Cartão (na entrega)", "Dinheiro"],
  chavePix: "burgersbrocado@gmail.com",                   // ← opcional: aparece na mensagem se pagamento = Pix
  // Cupons: tipo "percent" (10 = 10%) ou "fixo" (valor em R$)
  cupons: {
    // "SERTAO10": { tipo: "percent", valor: 10 },
  },
};

// Adicionais oferecidos nos itens com adicionais:true
const ADICIONAIS = [
  { id: "molho do chefe",   nome: "molho do chefe",  preco: 0 },
  { id: "queijo",  nome: "Queijo extra", preco: 0 },
  { id: "ovo",     nome: "Ovo",          preco: 0 },
  { id: "burger",  nome: "Carne extra",  preco: 0 },
];

const CATEGORIAS = [
  { id: "hamburgueres",   nome: "🍔 Hambúrgueres" },
  { id: "acompanhamentos", nome: "🍟 Acompanhamentos" },
  { id: "bebidas",        nome: "🥤 Bebidas" },
  { id: "combos",         nome: "🔥 Combos" },
  { id: "especiais",      nome: "⭐ Especiais" },
];

/* PRODUTOS — preço em reais (ex.: 24.9). preco: 0 = ainda não definido.
   foto: caminho da imagem (ex.: "images/x-burger.jpg"). Vazio = ícone.
   adicionais:true = abre a tela de adicionais. emBreve:true = item reservado. */
const PRODUTOS = [
  { id: 1,  cat: "hamburgueres", nome: "X-Burger",  desc: "Blend Bovino,queijo, alface, tomate e maionese da casa.",       preco: 14, foto: "", adicionais: true },
  { id: 2,  cat: "hamburgueres", nome: "X-Egg",  desc: "Blend Bovino, queijo, ovo, cebola caramelizada, milho, batata palha e maionese da casa",       preco: 16, foto: "", adicionais: true },
  { id: 3,  cat: "hamburgueres", nome: "X-Calabresa",   desc: "Blend bovino 100g, muçarela, calabresa de frango, cebola, maionese da casa.",            preco: 17, foto: "", adicionais: true },
  { id: 4,  cat: "hamburgueres", nome: "X-Tudo",    desc: "Blend Bovino, muçarela, milho, ervilha, salada, cebola caramelizada, maionese da casa, barbecue,", preco: 19, foto: "", adicionais: true },
  { id: 5,  cat: "hamburgueres", nome: "Sertão", desc: "blend bovino, muçarela, abacaxi grelhado, cebola roxa dourada, maionese da casa e barbecue",                 preco: 28, foto: "", adicionais: true },

  // COMBOS — edite nome, descrição e preço
  { id: 40, cat: "combos", nome: "Combo X-Burger", desc: "X-Burger + Batata M + refrigerante.", preco: 0, foto: "" },
  { id: 41, cat: "combos", nome: "Combo X-Bacon",  desc: "X-Bacon + Batata M + refrigerante.",  preco: 0, foto: "" },
  { id: 42, cat: "combos", nome: "Combo Sertão",  desc: "Sertão + Batata G + refrigerante.", preco: 0, foto: "" },

  { id: 10, cat: "especiais", nome: "Especial 1", desc: "Em breve.", preco: 0, foto: "", emBreve: true },
  { id: 11, cat: "especiais", nome: "Especial 2", desc: "Em breve.", preco: 0, foto: "", emBreve: true },

  { id: 20, cat: "acompanhamentos", nome: "Batata P", desc: "Porção pequena.", preco: 0, foto: "" },
  { id: 21, cat: "acompanhamentos", nome: "Batata M", desc: "Porção média.",   preco: 0, foto: "" },
  { id: 22, cat: "acompanhamentos", nome: "Batata G", desc: "Porção grande.",  preco: 0, foto: "" },

  { id: 30, cat: "bebidas", nome: "Coca-Cola", desc: "Lata 350 ml.", preco: 0, foto: "" },
  { id: 31, cat: "bebidas", nome: "Guaraná",   desc: "Lata 350 ml.", preco: 0, foto: "" },
  { id: 32, cat: "bebidas", nome: "Água",      desc: "500 ml.",      preco: 0, foto: "" },
];

/* =====================================================================
   CÓDIGO (não precisa mexer daqui pra baixo)
   ===================================================================== */
const $ = (s) => document.querySelector(s);
const brl = (v) => "R$ " + v.toFixed(2).replace(".", ",");
const precoTxt = (v) => (v > 0 ? brl(v) : "Consultar");
const ICONES = { hamburgueres: "🍔", acompanhamentos: "🍟", bebidas: "🥤", especiais: "⭐", combos: "🔥" };
const CORES = { hamburgueres: "#1b2fa3", acompanhamentos: "#ff4d2e", bebidas: "#12206f", especiais: "#141726", combos: "#ff4d2e" };
// Imagens de demonstração em estilo xilogravura (aparecem enquanto não houver foto real em "foto")
const XILO = (kind, semFundo) => {
  const t = "stroke='#15110d' stroke-linecap='round' stroke-linejoin='round'";
  const arte = {
    hamb: `<g ${t} stroke-width='6' fill='#f1e6c4'><path d='M30 92Q30 34 100 34Q170 34 170 92Z'/><path d='M28 104l12 12 12-12 12 12 12-12 12 12 12-12 12 12 12-12 12 12 12-12 12 12 12-12' fill='none'/><rect x='30' y='124' width='140' height='24' rx='12' fill='#15110d'/><path d='M30 156H170Q170 178 150 178H50Q30 178 30 156Z'/><path d='M56 82L70 52M80 82L92 48M106 82L116 48M130 82L142 54' stroke-width='4' fill='none'/><path d='M76 42l5 4M118 40l5 4M100 62l5 4M146 66l5 4M58 66l5 4' stroke-width='5'/></g>`,
    fries: `<g ${t} stroke-width='6' fill='#f1e6c4'><path d='M60 56L64 110M84 40L86 110M108 34L108 110M132 42L130 110M152 58L146 110' fill='none' stroke-width='9'/><path d='M46 104H154L142 178H58Z'/><path d='M70 124L76 160M100 124V160M130 124L124 160' stroke-width='4' fill='none'/></g>`,
    cup: `<g ${t} stroke-width='6' fill='#f1e6c4'><path d='M112 20L120 66' fill='none' stroke-width='8'/><path d='M50 62H150L138 180H62Z'/><rect x='42' y='50' width='116' height='16' rx='4' fill='#15110d'/><path d='M62 108H138M66 140H134' stroke-width='4' fill='none'/></g>`,
  }[kind];
  const fundo = semFundo ? "" : "<rect width='200' height='200' fill='#f0a13a'/>";
  return "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>${fundo}${arte}</svg>`);
};
const TIPO_IMG = { hamburgueres: "hamb", combos: "hamb", especiais: "hamb", acompanhamentos: "fries", bebidas: "cup" };
const demo = (cat) => XILO(TIPO_IMG[cat]);

let cart = JSON.parse(localStorage.getItem("brocado_cart") || "[]");
let catAtual = "todas", busca = "", cupomAtivo = null, pendente = null;

/* ---------- links e status ---------- */
const waBase = "https://wa.me/" + CONFIG.whatsapp;
$("#btnWa").href = $("#waFloat").href = waBase;
$("#btnInsta").href = "https://instagram.com/" + CONFIG.instagram;

function aberto() {
  const agora = new Date(), min = (t) => { const [h, m] = t.split(":"); return +h * 60 + +m; };
  const atual = agora.getHours() * 60 + agora.getMinutes();
  const hoje = CONFIG.horarios[agora.getDay()], ontem = CONFIG.horarios[(agora.getDay() + 6) % 7];
  if (hoje) { const a = min(hoje[0]), f = min(hoje[1]); if (f > a ? atual >= a && atual < f : atual >= a) return true; }
  if (ontem) { const a = min(ontem[0]), f = min(ontem[1]); if (f < a && atual < f) return true; }
  return false;
}
function atualizaStatus() {
  const s = $("#status"), on = aberto();
  s.textContent = on ? "Aberto" : "Fechado";
  s.className = "status " + (on ? "on" : "off");
  const h = CONFIG.horarios[new Date().getDay()];
  s.title = h ? `Hoje: ${h[0]} às ${h[1]}` : "Fechado hoje";
}
// Horários no rodapé
const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
$("#horarios").innerHTML = DIAS.map((d, i) => `<span>${d}: ${CONFIG.horarios[i] ? CONFIG.horarios[i][0] + "–" + CONFIG.horarios[i][1] : "fechado"}</span>`).join("");
atualizaStatus(); setInterval(atualizaStatus, 60000);

/* ---------- cardápio ---------- */
function renderCats() {
  const lista = [{ id: "todas", nome: "Todos" }, ...CATEGORIAS];
  $("#cats").innerHTML = lista.map((c) => `<button class="chip ${c.id === catAtual ? "on" : ""}" data-cat="${c.id}">${c.nome}</button>`).join("");
}
function renderLista() {
  const q = busca.trim().toLowerCase();
  let html = "";
  CATEGORIAS.forEach((c) => {
    if (catAtual !== "todas" && catAtual !== c.id) return;
    const ps = PRODUTOS.filter((p) => p.cat === c.id && (!q || (p.nome + " " + p.desc).toLowerCase().includes(q)));
    if (!ps.length) return;
    html += `<section class="sec" id="cat-${c.id}"><h2>${c.nome}</h2><div class="grid">` + ps.map(cardHtml).join("") + `</div></section>`;
  });
  $("#lista").innerHTML = html || `<p class="vazio">Nada encontrado. Tente outra busca.</p>`;
}
function cardHtml(p) {
  const foto = `<img class="ft" src="${p.foto || demo(p.cat)}" alt="${p.nome}" loading="lazy" width="118" height="118" onerror="this.onerror=null;this.src=demo('${p.cat}')">`;
  return `<article class="card ${p.emBreve ? "em-breve" : ""}">
    <div><h3>${p.nome}</h3><p>${p.desc}</p><span class="preco">${precoTxt(p.preco)}</span></div>${foto}
    ${p.emBreve ? "" : `<button class="add" data-add="${p.id}">Adicionar</button>`}</article>`;
}
$("#cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (!b) return; catAtual = b.dataset.cat; renderCats(); renderLista(); });
$("#busca").addEventListener("input", (e) => { busca = e.target.value; renderLista(); });
$("#lista").addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]"); if (!b) return;
  const p = PRODUTOS.find((x) => x.id == b.dataset.add);
  p.adicionais && ADICIONAIS.length ? abrirExtras(p) : addCarrinho(p, []);
});

/* ---------- adicionais ---------- */
function abrirExtras(p) {
  pendente = p;
  $("#extraTitulo").textContent = "Adicionais — " + p.nome;
  $("#extraLista").innerHTML = ADICIONAIS.map((a) => `<label class="extra"><input type="checkbox" value="${a.id}"><span>${a.nome}</span><span>+ ${a.preco > 0 ? brl(a.preco) : "consultar"}</span></label>`).join("");
  $("#extraWrap").hidden = false;
}
$("#extraOk").addEventListener("click", () => {
  const ids = [...document.querySelectorAll("#extraLista input:checked")].map((i) => i.value);
  addCarrinho(pendente, ADICIONAIS.filter((a) => ids.includes(a.id)));
  $("#extraWrap").hidden = true;
});

/* ---------- carrinho ---------- */
function salva() { localStorage.setItem("brocado_cart", JSON.stringify(cart)); }
function addCarrinho(p, extras) {
  const key = p.id + "|" + extras.map((e) => e.id).sort().join(",");
  const unit = p.preco + extras.reduce((s, e) => s + e.preco, 0);
  const it = cart.find((i) => i.key === key);
  it ? it.qtd++ : cart.push({ key, nome: p.nome, unit, qtd: 1, extras: extras.map((e) => e.nome) });
  salva(); atualizaBarra(); toast(`✓ ${p.nome} adicionado`);
  const b = $("#cartBar"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
}
const subtotal = () => cart.reduce((s, i) => s + i.unit * i.qtd, 0);
function atualizaBarra() {
  const n = cart.reduce((s, i) => s + i.qtd, 0);
  $("#cartBar").hidden = n === 0;
  $("#cartQtd").textContent = n;
  $("#cartTotalBar").textContent = brl(subtotal());
}
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1600); }

$("#cartBar").addEventListener("click", () => { renderCarrinho(); $("#cartWrap").hidden = false; });
document.addEventListener("click", (e) => { if (e.target.matches("[data-close]") || e.target.classList.contains("sheet-wrap")) e.target.closest(".sheet-wrap").hidden = true; });

function tipo() { return document.querySelector("input[name=tipo]:checked").value; }
function taxa() {
  if (tipo() === "retirada") return 0;
  if (CONFIG.bairros.length) return CONFIG.bairros[+$("#bairro").value]?.taxa || 0;
  return CONFIG.taxaEntrega;
}
function desconto() {
  if (!cupomAtivo) return 0;
  const s = subtotal();
  return Math.min(s, cupomAtivo.tipo === "percent" ? s * cupomAtivo.valor / 100 : cupomAtivo.valor);
}
function renderCarrinho() {
  $("#itens").innerHTML = cart.length ? cart.map((i, idx) => `<div class="linha"><div class="n"><b>${i.nome}</b>${i.extras.length ? `<small>+ ${i.extras.join(", ")}</small>` : ""}<small>${precoTxt(i.unit)}</small></div>
    <div class="qtd"><button data-q="${idx}" data-d="-1" aria-label="Diminuir">−</button><span>${i.qtd}</span><button data-q="${idx}" data-d="1" aria-label="Aumentar">+</button></div></div>`).join("")
    : `<p class="vazio">Seu carrinho está vazio.</p>`;
  $("#blocoEntrega").hidden = tipo() === "retirada";
  const s = subtotal(), d = desconto(), t = taxa();
  $("#rSub").textContent = brl(s);
  $("#rDescL").hidden = d <= 0; $("#rDesc").textContent = "− " + brl(d);
  $("#rEnt").textContent = tipo() === "retirada" ? "Retirada" : (t > 0 ? brl(t) : "Grátis");
  $("#rTot").textContent = brl(s - d + t);
  $("#blocoTroco").hidden = $("#pagto").value !== "Dinheiro";
}
$("#itens").addEventListener("click", (e) => {
  const b = e.target.closest("[data-q]"); if (!b) return;
  const i = cart[+b.dataset.q]; i.qtd += +b.dataset.d;
  if (i.qtd <= 0) cart.splice(+b.dataset.q, 1);
  salva(); atualizaBarra(); renderCarrinho();
  if (!cart.length) $("#cartWrap").hidden = true;
});
$("#bairro").innerHTML = CONFIG.bairros.map((b, i) => `<option value="${i}">${b.nome}${b.taxa > 0 ? " — " + brl(b.taxa) : ""}</option>`).join("");
if (!CONFIG.bairros.length) $("#bairro").parentElement.hidden = true;
$("#pagto").innerHTML += CONFIG.pagamentos.map((p) => `<option>${p}</option>`).join("");
["#bairro", "#pagto"].forEach((s) => $(s).addEventListener("change", renderCarrinho));
document.querySelectorAll("input[name=tipo]").forEach((r) => r.addEventListener("change", renderCarrinho));
$("#cupomBtn").addEventListener("click", () => {
  const c = CONFIG.cupons[$("#cupom").value.trim().toUpperCase()];
  cupomAtivo = c || null; toast(c ? "Cupom aplicado" : "Cupom inválido"); renderCarrinho();
});

/* ---------- finalização ---------- */
$("#finalizar").addEventListener("click", async () => {
  const erro = (m) => { $("#erro").textContent = m; return false; };
  const s = subtotal(), d = desconto(), t = taxa(), total = s - d + t, entrega = tipo() === "entrega";
  if (!cart.length) return erro("Adicione ao menos um item.");
  if (CONFIG.bloquearQuandoFechado && !aberto()) return erro("Estamos fechados no momento.");
  if (s < CONFIG.pedidoMinimo) return erro(`Pedido mínimo: ${brl(CONFIG.pedidoMinimo)}.`);
  if (!$("#nome").value.trim()) return erro("Informe seu nome.");
  if ($("#tel").value.replace(/\D/g, "").length < 10) return erro("Informe seu WhatsApp com DDD.");
  if (entrega && $("#endereco").value.trim().length < 6) return erro("Informe o endereço de entrega.");
  if (!$("#pagto").value) return erro("Escolha a forma de pagamento.");
  $("#erro").textContent = "";

  const pg = $("#pagto").value;
  const linhas = cart.map((i) => `${i.qtd}x ${i.nome}${i.extras.length ? " (+ " + i.extras.join(", ") + ")" : ""} — ${brl(i.unit * i.qtd)}`);
  // Registra no painel (se configurado) e recebe o número do pedido
  const btn = $("#finalizar"); btn.disabled = true; btn.textContent = "ENVIANDO…";
  let num = "";
  if (CONFIG.painelUrl) {
    try {
      const r = await fetch(CONFIG.painelUrl, { method: "POST", headers: { "Content-Type": "text/plain" }, signal: AbortSignal.timeout(7000),
        body: JSON.stringify({ nome: $("#nome").value.trim(), telefone: $("#tel").value.trim(), tipo: entrega ? "Entrega" : "Retirada",
          endereco: entrega ? `${CONFIG.bairros[+$("#bairro").value]?.nome || ""} — ${$("#endereco").value.trim()}` : "", itens: linhas.join("\n"),
          subtotal: s, desconto: d, entrega: t, total, pagamento: pg, obs: $("#obs").value.trim() }) });
      const j = await r.json(); if (j.ok) num = j.numero;
    } catch (e) { /* segue só pelo WhatsApp */ }
  }
  let msg = `🍔 NOVO PEDIDO${num ? " #" + num : ""} — ${CONFIG.nome}\n\nCliente: ${$("#nome").value.trim()}\nWhatsApp: ${$("#tel").value.trim()}\n\nItens:\n${linhas.join("\n")}\n\nSubtotal: ${brl(s)}\n`;
  if (d > 0) msg += `Desconto: − ${brl(d)}\n`;
  msg += entrega ? `Entrega: ${brl(t)}\n` : `Retirada no local\n`;
  msg += `Total: ${brl(total)}\n\nPagamento: ${pg}`;
  if (pg === "Dinheiro" && $("#troco").value.trim()) msg += ` (troco para ${$("#troco").value.trim()})`;
  if (pg === "Pix" && CONFIG.chavePix) msg += `\nChave Pix: ${CONFIG.chavePix}`;
  if (entrega) msg += `\nBairro: ${CONFIG.bairros[+$("#bairro").value]?.nome || "-"}\nEndereço: ${$("#endereco").value.trim()}`;
  if ($("#obs").value.trim()) msg += `\nObservação: ${$("#obs").value.trim()}`;

  localStorage.setItem("brocado_cli", JSON.stringify({ nome: $("#nome").value, tel: $("#tel").value, endereco: $("#endereco").value, bairro: $("#bairro").value }));
  setTimeout(() => { btn.disabled = false; btn.textContent = "FINALIZAR PEDIDO"; }, 2500);
  location.href = `${waBase}?text=${encodeURIComponent(msg)}`;
});

try { const c = JSON.parse(localStorage.getItem("brocado_cli") || "{}"); $("#nome").value = c.nome || ""; $("#tel").value = c.tel || ""; $("#endereco").value = c.endereco || ""; if (c.bairro) $("#bairro").value = c.bairro; } catch (e) {}
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
renderCats(); renderLista(); atualizaBarra();

// Garante a arte de demonstração no banner caso a foto ainda não exista
(() => { const h = document.querySelector("img.hero-img"); if (h && h.complete && h.naturalWidth === 0) { h.src = XILO("hamb", 1); h.style.objectFit = "contain"; } })();
