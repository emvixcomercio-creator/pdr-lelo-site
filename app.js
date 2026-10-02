(() => {
  const L = window.LOJA, ILU = window.ILU, ICONE = window.ICONE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const wa = (msg) => `https://wa.me/${L.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  const svgIlu = (k) => `<svg class="ilu-svg" viewBox="0 0 200 160" aria-hidden="true">${ILU[k] || ILU.caixa}</svg>`;
  const ICO_CARRINHO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6"/></svg>`;

  const SEGMENTOS = [
    { id: "marmitaria", nome: "Marmitaria" },
    { id: "lanchonete", nome: "Lanchonete" },
    { id: "pizzaria", nome: "Pizzaria" },
    { id: "acai", nome: "Açaí e sorvete" },
    { id: "restaurante", nome: "Restaurante" },
    { id: "festas", nome: "Festas e eventos" },
  ];

  let produtos = [];
  let filtro = { categoria: null, segmento: null, busca: "", soEstoque: false };
  let carrinho = {};
  try { carrinho = JSON.parse(localStorage.getItem("pdr-carrinho") || "{}"); } catch {}
  const salvar = () => { try { localStorage.setItem("pdr-carrinho", JSON.stringify(carrinho)); } catch {} };

  // ---------- dados ----------
  async function carregar() {
    if (L.planilhaCsvUrl) {
      try { return csvParaProdutos(await (await fetch(L.planilhaCsvUrl)).text()); }
      catch (e) { console.warn("Planilha indisponível, usando produtos.json", e); }
    }
    return (await fetch("produtos.json")).json();
  }

  function csvParaProdutos(txt) {
    const linhas = []; let campo = "", linha = [], aspas = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (aspas) {
        if (c === '"' && txt[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') aspas = false; else campo += c;
      } else if (c === '"') aspas = true;
      else if (c === ",") { linha.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && txt[i + 1] === "\n") i++;
        linha.push(campo); linhas.push(linha); linha = []; campo = "";
      } else campo += c;
    }
    if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
    const cab = linhas.shift().map((h) => h.trim());
    const num = (v) => { v = String(v).replace(/[R$\s]/g, ""); if (!v) return null; if (v.includes(",")) v = v.replace(/\./g, "").replace(",", "."); const n = parseFloat(v); return isNaN(n) ? null : n; };
    return linhas.filter((l) => l.some((x) => x.trim())).map((l) => {
      const o = {}; cab.forEach((h, i) => (o[h] = (l[i] ?? "").trim()));
      return { ...o,
        id: o.id || norm(o.nome).replace(/\W+/g, "-"),
        preco: num(o.preco), precoDe: num(o.precoDe),
        segmentos: (o.segmentos || "").split(/[;,|]/).map((s) => norm(s.trim())).filter(Boolean),
        estoque: !/^(n|nao|não|false|0|esgotado)$/i.test(o.estoque || "sim"),
      };
    });
  }

  // ---------- auxiliares de produto ----------
  const midia = (p) => p.imagem ? `<img src="${esc(p.imagem)}" alt="${esc(p.nome)}" loading="lazy">` : svgIlu(p.ilustracao);
  function unidades(p) {
    const m = String(p.embalagem || "").match(/(\d[\d.]*)\s*(un|sach|kit|garraf|folha)/i);
    return m ? parseInt(m[1].replace(/\./g, "")) : 0;
  }
  function precoUn(p) {
    const n = unidades(p);
    if (!n || p.preco == null || n < 2) return "";
    const v = p.preco / n;
    return `${v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: v < 0.1 ? 3 : 2 })} por unidade`;
  }
  const selo = (p) => !p.estoque ? `<span class="selo esgotado">Esgotado</span>`
    : p.precoDe ? `<span class="selo oferta">Oferta</span>`
    : p.destaque === "mais-vendido" ? `<span class="selo mais-vendido">Mais vendido</span>`
    : p.destaque === "novidade" ? `<span class="selo novidade">Novidade</span>` : "";
  const precoHTML = (p) => p.preco == null ? `<span class="cons">Preço sob consulta</span>`
    : `${p.precoDe ? `<span class="de">${brl(p.precoDe)}</span>` : ""}<b>${brl(p.preco)}</b><span class="un">${precoUn(p) || "&nbsp;"}</span>`;
  const acaoHTML = (p) => p.preco == null
    ? `<a class="add orc" href="${wa(`Olá! Quero um orçamento de: ${p.nome}${p.codigo ? ` (${p.codigo})` : ""}`)}" target="_blank" rel="noopener">Pedir orçamento</a>`
    : `<div class="qtd"><button type="button" data-menos aria-label="Diminuir">−</button><input type="number" min="1" value="1" aria-label="Quantidade"><button type="button" data-mais aria-label="Aumentar">+</button></div>
       <button type="button" class="add" data-add ${p.estoque ? "" : "disabled"}>${p.estoque ? `${ICO_CARRINHO} Adicionar` : "Indisponível"}</button>`;

  function cardHTML(p) {
    return `<article class="card" data-id="${esc(p.id)}">
      <div class="card-img" data-ver>${midia(p)}${selo(p)}<span class="ver-rapido">Ver detalhes</span></div>
      <div class="card-corpo">
        <div class="card-meta"><span class="card-cat">${esc(p.categoria)}</span>${p.codigo ? `<span class="card-cod">Cód. ${esc(p.codigo)}</span>` : ""}</div>
        <h3 data-ver>${esc(p.nome)}</h3>
        ${p.embalagem ? `<span class="card-emb">${esc(p.embalagem)}</span>` : ""}
        <div class="card-preco">${precoHTML(p)}</div>
        <div class="card-acao">${acaoHTML(p)}</div>
      </div>
    </article>`;
  }

  // ---------- render ----------
  const categorias = () => [...new Set(produtos.map((p) => p.categoria))];
  const conta = (f) => produtos.filter(f).length;

  function renderEstrutura() {
    const cats = categorias();
    $("#nav-cats").innerHTML = `<button data-cat="">Todos os produtos</button>` +
      cats.map((c) => `<button data-cat="${esc(c)}">${ICONE[c] || ""}${esc(c)}</button>`).join("");
    $("#segmentos").innerHTML = SEGMENTOS.map((s) =>
      `<div class="seg" role="button" tabindex="0" data-seg="${s.id}"><span class="seg-ic">${ICONE[s.id]}</span><b>${s.nome}</b><small>${conta((p) => (p.segmentos || []).includes(s.id))} produtos</small></div>`).join("");
    $("#filtro-cats").innerHTML = `<li><button data-cat="">Todas <small>${produtos.length}</small></button></li>` +
      cats.map((c) => `<li><button data-cat="${esc(c)}">${esc(c)} <small>${conta((p) => p.categoria === c)}</small></button></li>`).join("");
    $("#filtro-segs").innerHTML = SEGMENTOS.map((s) =>
      `<li><button data-seg="${s.id}">${s.nome} <small>${conta((p) => (p.segmentos || []).includes(s.id))}</small></button></li>`).join("");
    $("#chips").innerHTML = `<button data-cat="">Todos</button>` + cats.map((c) => `<button data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    $("#rod-cats").innerHTML = cats.slice(0, 7).map((c) => `<li><button data-cat="${esc(c)}">${esc(c)}</button></li>`).join("");
    $("#num-linhas").textContent = cats.length;
  }

  function filtrados() {
    const termos = norm(filtro.busca.trim()).split(/\s+/).filter(Boolean);
    return produtos.filter((p) =>
      (!filtro.categoria || p.categoria === filtro.categoria) &&
      (!filtro.segmento || (p.segmentos || []).includes(filtro.segmento)) &&
      (!filtro.soEstoque || p.estoque) &&
      (!termos.length || termos.every((t) => norm(`${p.nome} ${p.categoria} ${p.codigo || ""} ${p.marca || ""} ${p.descricao || ""} ${p.embalagem || ""}`).includes(t))));
  }

  function renderGrade() {
    const lista = filtrados();
    const ordem = $("#ordem").value;
    if (ordem === "menor") lista.sort((a, b) => (a.preco ?? 1e9) - (b.preco ?? 1e9));
    if (ordem === "maior") lista.sort((a, b) => (b.preco ?? -1) - (a.preco ?? -1));
    if (ordem === "az") lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (ordem === "relevancia") lista.sort((a, b) => (b.estoque - a.estoque) || ((b.destaque === "mais-vendido") - (a.destaque === "mais-vendido")));

    $("#grade").innerHTML = lista.map(cardHTML).join("");
    $("#vazio").hidden = lista.length > 0;
    const seg = SEGMENTOS.find((s) => s.id === filtro.segmento);
    $("#catalogo-titulo").textContent = filtro.busca ? `Resultados para "${filtro.busca}"`
      : [filtro.categoria, seg && `para ${seg.nome.toLowerCase()}`].filter(Boolean).join(" ") || "Todos os produtos";
    $("#catalogo-info").textContent = `${lista.length} ${lista.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
    $("#limpar-filtro").hidden = !(filtro.categoria || filtro.segmento || filtro.busca || filtro.soEstoque);
    $$("[data-cat]").forEach((el) => el.classList.toggle("ativo", (el.dataset.cat || null) === filtro.categoria));
    $$("[data-seg]").forEach((el) => el.classList.toggle("ativo", el.dataset.seg === filtro.segmento));
  }

  function renderMaisVendidos() {
    const mv = produtos.filter((p) => p.destaque === "mais-vendido" && p.estoque && p.preco != null).slice(0, 4);
    if (mv.length) $("#mais-vendidos").innerHTML = mv.map(cardHTML).join("");
    else $("#mais-vendidos-sec").remove();
  }

  function aplicar(novo, rolar = true) {
    filtro = { ...filtro, ...novo };
    renderGrade();
    if (rolar) $("#catalogo").scrollIntoView({ behavior: "smooth" });
  }

  // ---------- busca com sugestões ----------
  let sugSel = -1;
  function renderSugestoes() {
    const q = $("#busca").value.trim();
    const box = $("#sugestoes");
    if (q.length < 2) { box.hidden = true; return; }
    const termos = norm(q).split(/\s+/);
    const res = produtos.filter((p) => termos.every((t) => norm(`${p.nome} ${p.categoria} ${p.codigo || ""} ${p.marca || ""}`).includes(t))).slice(0, 6);
    sugSel = -1;
    box.innerHTML = res.length
      ? res.map((p) => `<div class="sug" data-sug="${esc(p.id)}"><div class="sug-ilu">${midia(p)}</div><div><b>${esc(p.nome)}</b><small>${esc(p.embalagem || p.categoria)}</small></div><span class="sug-preco">${p.preco == null ? "Consultar" : brl(p.preco)}</span></div>`).join("") +
        `<button class="sug-todos" data-sug-todos>Ver todos os resultados para "${esc(q)}"</button>`
      : `<button class="sug-todos" data-sug-todos>Nenhum produto com "${esc(q)}". Perguntar no WhatsApp →</button>`;
    box.dataset.vazio = res.length ? "" : "1";
    box.hidden = false;
  }

  // ---------- modal ----------
  function abrirModal(id) {
    const p = porId(id); if (!p) return;
    const m = $("#modal");
    m.dataset.id = p.id;
    $("#md-img").innerHTML = midia(p) + selo(p);
    $("#md-cat").textContent = [p.categoria, p.codigo && `Cód. ${p.codigo}`, p.marca].filter(Boolean).join(" · ");
    $("#md-nome").textContent = p.nome;
    $("#md-emb").textContent = p.embalagem || "";
    $("#md-emb").hidden = !p.embalagem;
    $("#md-desc").textContent = p.descricao || "";
    $("#md-preco").innerHTML = precoHTML(p);
    $("#md-acao").innerHTML = acaoHTML(p);
    $("#md-duvida").href = wa(`Olá! Tenho uma dúvida sobre: ${p.nome}${p.codigo ? ` (${p.codigo})` : ""}`);
    m.hidden = false; document.body.classList.add("travado");
    $(".modal-fechar").focus();
  }
  function fecharModal() { $("#modal").hidden = true; if (!$("#gaveta").classList.contains("aberta")) document.body.classList.remove("travado"); }

  // ---------- carrinho ----------
  const porId = (id) => produtos.find((p) => p.id === id);
  const itensCarrinho = () => Object.entries(carrinho).map(([id, q]) => ({ p: porId(id), q })).filter((i) => i.p && i.p.preco != null);
  const total = () => itensCarrinho().reduce((s, i) => s + i.p.preco * i.q, 0);

  function adicionar(id, q, botao) {
    carrinho[id] = (carrinho[id] || 0) + q;
    salvar(); renderCarrinho();
    const b = $("#carrinho-qtd"); b.classList.remove("pulo"); void b.offsetWidth; b.classList.add("pulo");
    toast(`<span>✓ ${esc(porId(id).nome)} no pedido</span><a href="#" data-abrir>Ver pedido</a>`);
    if (botao) {
      botao.classList.add("ok"); botao.innerHTML = "✓ Adicionado";
      setTimeout(() => { botao.classList.remove("ok"); botao.innerHTML = `${ICO_CARRINHO} Adicionar`; }, 1400);
    }
  }

  function renderCarrinho() {
    const itens = itensCarrinho();
    const qtd = itens.reduce((s, i) => s + i.q, 0);
    const t = total();
    $("#carrinho-qtd").textContent = qtd; $("#carrinho-qtd").classList.toggle("zero", !qtd);
    $("#carrinho-total-h").textContent = brl(t);
    $("#carrinho-vazio").hidden = itens.length > 0;
    $("#itens").innerHTML = itens.map(({ p, q }) => `
      <li class="item" data-id="${esc(p.id)}">
        <div class="item-ilu">${midia(p)}</div>
        <div><b>${esc(p.nome)}</b><small>${esc(p.embalagem || "")}<br>${brl(p.preco)} cada</small></div>
        <div class="item-dir">
          <span class="item-sub">${brl(p.preco * q)}</span>
          <div class="qtd"><button type="button" data-menos aria-label="Diminuir">−</button><input type="number" min="1" value="${q}" aria-label="Quantidade"><button type="button" data-mais aria-label="Aumentar">+</button></div>
          <button type="button" class="remover" data-remover>Remover</button>
        </div>
      </li>`).join("");
    $("#subtotal").textContent = brl(t);
    $("#total").textContent = brl(t);
    $("#avancar").disabled = !itens.length;
    $("#gaveta-rodape").querySelector(".resumo").hidden = !itens.length;
    document.body.classList.toggle("tem-itens", itens.length > 0);
    $("#bm-qtd").textContent = `${qtd} ${qtd === 1 ? "item" : "itens"} no pedido`;
    $("#bm-total").textContent = brl(t);

    const fb = $("#frete-barra");
    const gratis = L.freteGratisAcima > 0 && t >= L.freteGratisAcima;
    if (L.freteGratisAcima > 0 && itens.length) {
      fb.hidden = false;
      fb.classList.toggle("ok", gratis);
      $("#frete-txt").innerHTML = gratis ? `🎉 Parabéns! Você ganhou <b>entrega grátis</b>.` : `Faltam <b>${brl(L.freteGratisAcima - t)}</b> para ganhar <b>entrega grátis</b>`;
      $("#frete-prog").style.width = Math.min(100, (t / L.freteGratisAcima) * 100) + "%";
    } else fb.hidden = true;
    $("#entrega-txt").textContent = gratis ? "Grátis" : "A combinar";
    checarMinimo();
  }

  function checarMinimo() {
    const entrega = $('input[name="recebimento"]:checked')?.value === "Entrega";
    const abaixo = entrega && L.pedidoMinimoEntrega > 0 && total() < L.pedidoMinimoEntrega;
    $("#aviso-minimo").hidden = !abaixo;
    $("#aviso-minimo").textContent = `Para entrega, o pedido mínimo é de ${brl(L.pedidoMinimoEntrega)}. Faltam ${brl(Math.max(0, L.pedidoMinimoEntrega - total()))}. Você também pode retirar na loja.`;
    $("#enviar").disabled = abaixo;
    $("#campos-entrega").hidden = !entrega;
    $$("#campos-entrega input[name=endereco], #campos-entrega input[name=bairro]").forEach((i) => (i.required = entrega));
  }

  function irPara(e) {
    $("#etapa-itens").hidden = e !== "itens";
    $("#etapa-dados").hidden = e !== "dados";
    $("#avancar").hidden = e !== "itens";
    $("#enviar").hidden = e !== "dados";
    $("#voltar").hidden = e !== "dados";
    $("#etapa2").classList.toggle("on", e === "dados");
    $("#gaveta-tit").textContent = e === "itens" ? "Seu pedido" : "Dados para entrega";
    if (e === "dados") {
      try {
        const d = JSON.parse(localStorage.getItem("pdr-cliente") || "{}");
        for (const [k, v] of Object.entries(d)) {
          const el = $("#etapa-dados").elements[k];
          if (!el) continue;
          if (el instanceof RadioNodeList) el.value = v; else if (!el.value) el.value = v;
        }
      } catch {}
      checarMinimo();
    }
  }

  function abrir() {
    fecharModal(); $("#toast").classList.remove("on");
    $("#gaveta").classList.add("aberta"); $("#gaveta").setAttribute("aria-hidden", "false");
    $("#sombra").hidden = false; document.body.classList.add("travado"); irPara("itens");
  }
  function fechar() {
    $("#gaveta").classList.remove("aberta"); $("#gaveta").setAttribute("aria-hidden", "true");
    $("#sombra").hidden = true; document.body.classList.remove("travado");
  }

  function mascaraTel(v) {
    v = v.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    return v;
  }

  function enviar() {
    if (!itensCarrinho().length) return;
    const f = $("#etapa-dados");
    let ok = true;
    $$("input[required], select[required]", f).forEach((el) => {
      const ruim = !el.value.trim() || (el.name === "telefone" && el.value.replace(/\D/g, "").length < 10);
      el.classList.toggle("erro", ruim);
      if (ruim && ok) { el.focus(); ok = false; }
    });
    if (!ok) { toast("Preencha os campos destacados para continuar."); return; }
    const d = Object.fromEntries(new FormData(f));
    try { const { obs, ...guardar } = d; localStorage.setItem("pdr-cliente", JSON.stringify(guardar)); } catch {}
    const t = total();
    const gratis = L.freteGratisAcima > 0 && t >= L.freteGratisAcima;
    const linhas = itensCarrinho().map(({ p, q }) => `• ${q}x ${p.nome}${p.codigo ? ` [${p.codigo}]` : ""}\n   ${p.embalagem} · ${brl(p.preco * q)}`);
    const msg = [
      `*NOVO PEDIDO PELO SITE*`, ``,
      ...linhas, ``,
      `*Total estimado: ${brl(t)}*`,
      d.recebimento === "Entrega" ? (gratis ? `Entrega: grátis` : `Entrega: a combinar`) : null, ``,
      `*Cliente:* ${d.nome}${d.empresa ? ` (${d.empresa})` : ""}`,
      `*WhatsApp:* ${d.telefone}`,
      d.doc ? `*CNPJ/CPF:* ${d.doc}` : null,
      `*Recebimento:* ${d.recebimento}`,
      d.recebimento === "Entrega" ? `*Endereço:* ${d.endereco}${d.complemento ? `, ${d.complemento}` : ""}, ${d.bairro}` : null,
      `*Pagamento:* ${d.pagamento}`,
      d.obs ? `*Obs.:* ${d.obs}` : null,
      ``, `Aguardo a confirmação. Obrigado!`,
    ].filter((x) => x !== null).join("\n");
    window.open(wa(msg), "_blank");
    carrinho = {}; salvar(); renderCarrinho(); fechar();
    toast("Pedido enviado! Finalize a conversa no WhatsApp.");
  }

  let tt;
  function toast(html) { const t = $("#toast"); t.innerHTML = html; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 3400); }

  // ---------- eventos ----------
  function ligarEventos() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const card = t.closest(".card"), item = t.closest(".item"), modal = t.closest(".modal-caixa");
      const box = t.closest(".qtd");
      if (box && (t.closest("[data-menos]") || t.closest("[data-mais]"))) {
        const inp = $("input", box), mais = !!t.closest("[data-mais]");
        const atual = parseInt(inp.value) || 1;
        if (item && !mais && atual <= 1) { delete carrinho[item.dataset.id]; salvar(); renderCarrinho(); return; }
        inp.value = Math.max(1, atual + (mais ? 1 : -1));
        if (item) { carrinho[item.dataset.id] = +inp.value; salvar(); renderCarrinho(); }
        return;
      }
      const add = t.closest("[data-add]");
      if (add) {
        const raiz = card || modal;
        const id = card ? card.dataset.id : $("#modal").dataset.id;
        const inp = $(".qtd input", raiz);
        adicionar(id, Math.max(1, parseInt(inp.value) || 1), add);
        setTimeout(() => (inp.value = 1), 1400);
        return;
      }
      if (t.closest("[data-ver]") && card) { abrirModal(card.dataset.id); return; }
      if (t.closest("[data-remover]") && item) { delete carrinho[item.dataset.id]; salvar(); renderCarrinho(); return; }
      if (t.closest("[data-abrir]")) { e.preventDefault(); abrir(); return; }
      if (t.closest("[data-fechar]")) { fechar(); return; }
      if (t.closest("[data-fechar-modal]") || t.matches(".modal")) { fecharModal(); return; }
      const sug = t.closest("[data-sug]");
      if (sug) { $("#sugestoes").hidden = true; abrirModal(sug.dataset.sug); return; }
      if (t.closest("[data-sug-todos]")) {
        $("#sugestoes").hidden = true;
        if ($("#sugestoes").dataset.vazio) window.open(wa(`Olá! Vocês têm ${$("#busca").value.trim()}?`), "_blank");
        else aplicar({ busca: $("#busca").value, categoria: null, segmento: null });
        return;
      }
      if (!t.closest(".busca-box")) $("#sugestoes").hidden = true;
      const cat = t.closest("[data-cat]");
      if (cat) { $("#busca").value = ""; aplicar({ categoria: cat.dataset.cat || null, busca: "" }); return; }
      const seg = t.closest("[data-seg]");
      if (seg) { $("#busca").value = ""; aplicar({ segmento: filtro.segmento === seg.dataset.seg ? null : seg.dataset.seg, busca: "" }); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { if (!$("#modal").hidden) fecharModal(); else fechar(); $("#sugestoes").hidden = true; }
      if (e.key === "Enter" && e.target.matches(".seg")) e.target.click();
    });
    document.addEventListener("change", (e) => {
      const item = e.target.closest(".item");
      if (item && e.target.matches(".qtd input")) { carrinho[item.dataset.id] = Math.max(1, parseInt(e.target.value) || 1); salvar(); renderCarrinho(); }
      if (e.target.name === "recebimento") checarMinimo();
    });
    document.addEventListener("input", (e) => {
      if (e.target.name === "telefone") e.target.value = mascaraTel(e.target.value);
      if (e.target.classList.contains("erro") && e.target.value.trim()) e.target.classList.remove("erro");
    });

    const busca = $("#busca");
    busca.addEventListener("input", renderSugestoes);
    busca.addEventListener("focus", renderSugestoes);
    busca.addEventListener("keydown", (e) => {
      const itens = $$(".sug");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        sugSel = (sugSel + (e.key === "ArrowDown" ? 1 : -1) + itens.length) % itens.length;
        itens.forEach((el, i) => el.classList.toggle("sel", i === sugSel));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        $("#sugestoes").hidden = true;
        if (sugSel >= 0 && itens[sugSel]) abrirModal(itens[sugSel].dataset.sug);
        else aplicar({ busca: busca.value, categoria: null, segmento: null });
        busca.blur();
      }
    });

    $("#ordem").addEventListener("change", () => renderGrade());
    $("#so-estoque").addEventListener("change", (e) => aplicar({ soEstoque: e.target.checked }, false));
    $("#limpar-filtro").addEventListener("click", () => { $("#busca").value = ""; $("#so-estoque").checked = false; aplicar({ categoria: null, segmento: null, busca: "", soEstoque: false }, false); });
    $("#abrir-carrinho").addEventListener("click", abrir);
    $("#barra-movel").addEventListener("click", abrir);
    $("#fechar-carrinho").addEventListener("click", fechar);
    $("#sombra").addEventListener("click", fechar);
    $("#avancar").addEventListener("click", () => irPara("dados"));
    $("#voltar").addEventListener("click", () => irPara("itens"));
    $("#enviar").addEventListener("click", enviar);
    $("#etapa-dados").addEventListener("submit", (e) => { e.preventDefault(); enviar(); });
    addEventListener("scroll", () => $("#header").classList.toggle("rolou", scrollY > 10), { passive: true });
  }

  function preencherLoja() {
    const zap = wa("Olá! Vim pelo site e gostaria de fazer um pedido.");
    ["#header-whats", "#hero-whats", "#whats-flut"].forEach((s) => ($(s).href = zap));
    $("#vazio-whats").href = wa("Olá! Não encontrei um produto no site. Vocês têm...");
    $("#pers-whats").href = wa("Olá! Quero um orçamento de garrafas personalizadas com a minha marca.");
    $("#volume-whats").href = wa("Olá! Tenho uma empresa e quero uma proposta para compra em volume. Segue a minha lista:");
    $("#header-tel").textContent = L.telefoneWhats;
    $("#topbar-hor").textContent = L.horario;
    $("#topbar-tel").textContent = L.telefoneFixo;
    $("#topbar-tel").href = `tel:${L.telefoneFixo.replace(/\D/g, "")}`;

    const msgs = ["Entrega expressa em todo o Rio de Janeiro",
      L.freteGratisAcima ? `Entrega grátis em pedidos acima de ${brl(L.freteGratisAcima)}` : null,
      "Faça o pedido pelo site e confirme no WhatsApp"].filter(Boolean);
    let mi = 0;
    setInterval(() => {
      const el = $("#topbar-msg"); el.style.opacity = 0;
      setTimeout(() => { mi = (mi + 1) % msgs.length; el.textContent = msgs[mi]; el.style.opacity = 1; }, 300);
    }, 4500);

    const av = L.avaliacao;
    $("#nota-google").href = av.url;
    $("#nota-google").innerHTML = `<span class="g">G</span><b>${av.nota}</b><span class="est">★★★★<i>★</i></span><span>avaliação no Google</span>`;
    $("#depo-nota").textContent = av.nota;
    $("#depo-total").textContent = `Nota média de ${av.total} avaliações no Google`;
    $("#depo-txt").textContent = av.destaque;
    $("#depo-link").href = av.url;
    $("#faq").innerHTML = L.faq.map(([q, r], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join("");

    $("#loja-end").textContent = L.endereco;
    $("#loja-hor").textContent = L.horario;
    $("#loja-tel").innerHTML = `${esc(L.telefoneFixo)}<br>WhatsApp ${esc(L.telefoneWhats)}<br>${esc(L.email)}`;
    $("#loja-pag").textContent = L.pagamentos.join(", ");
    $("#loja-rota").href = L.mapsUrl;
    $("#loja-insta").href = L.instagram;
    $("#sel-pagamento").innerHTML = L.pagamentos.map((p) => `<option>${esc(p)}</option>`).join("");

    $("#rod-atend").innerHTML = [
      `<li><a href="${zap}" target="_blank" rel="noopener">WhatsApp ${esc(L.telefoneWhats)}</a></li>`,
      `<li><a href="tel:${L.telefoneFixo.replace(/\D/g, "")}">${esc(L.telefoneFixo)}</a></li>`,
      `<li><a href="mailto:${esc(L.email)}">${esc(L.email)}</a></li>`,
      `<li><a href="${L.instagram}" target="_blank" rel="noopener">Instagram</a></li>`,
      `<li><a href="#loja">${esc(L.horario)}</a></li>`].join("");
    $("#rod-pag").innerHTML = L.pagamentos.map((p) => `<li>${esc(p.replace(/ \(.*\)/, ""))}</li>`).join("");
    $("#rod-empresa").textContent = `© ${new Date().getFullYear()} ${L.razaoSocial}${L.cnpj ? `, CNPJ ${L.cnpj}` : ""}. ${L.endereco}.`;

    $$("[data-ilu]").forEach((el) => (el.innerHTML = svgIlu(el.dataset.ilu)));
    $$("[data-ico]").forEach((el) => (el.innerHTML = ICONE[el.dataset.ico] || ""));
    $("#barra-movel").hidden = false;
  }

  // ---------- início ----------
  preencherLoja();
  ligarEventos();
  carregar().then((lista) => {
    produtos = lista;
    renderEstrutura(); renderMaisVendidos(); renderGrade(); renderCarrinho();
  }).catch((e) => {
    console.error(e);
    $("#grade").innerHTML = `<div class="vazio"><b>Não foi possível carregar os produtos.</b><p><a href="${wa()}">Chame a gente no WhatsApp</a>.</p></div>`;
  });
})();
