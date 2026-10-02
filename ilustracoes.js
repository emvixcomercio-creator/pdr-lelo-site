// Ilustrações dos produtos (SVG, viewBox 0 0 200 160). Usadas enquanto não há foto real.
(() => {
  const O = "#2b2b2b";
  const S = `stroke="${O}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;
  const s2 = `stroke="${O}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const sombra = (rx = 62, cx = 100) => `<ellipse cx="${cx}" cy="136" rx="${rx}" ry="6" fill="#000" opacity=".09"/>`;

  const marmita = (dx = 0, dy = 0) => `<g transform="translate(${dx} ${dy})">
    <path d="M40 92 H160 L152 126 Q151 131 146 131 H54 Q49 131 48 126Z" fill="#fff" ${S}/>
    <path d="M36 92 Q36 62 62 60 H138 Q164 62 164 92Z" fill="#fff" ${S}/>
    <path d="M32 92 H168" ${S}/>
    <path d="M60 71 Q100 65 140 71" stroke="#e6e0d3" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M56 108 H144 M60 118 H140" stroke="#efe9de" stroke-width="2"/>
    <rect x="91" y="92" width="18" height="9" rx="2" fill="#fff" ${s2}/></g>`;

  const sache = (cor, txt, tx = 0, rot = 0, txtCor = "#fff") => `<g transform="translate(${tx} 0) rotate(${rot} 100 90)">
    <path d="M62 44 H138 V136 H62Z" fill="${cor}" ${S}/>
    <path d="M62 44 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4" fill="none" ${s2}/>
    <path d="M62 136 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4" fill="none" ${s2}/>
    <rect x="70" y="76" width="60" height="28" rx="5" fill="#fff" opacity=".95"/>
    <text x="100" y="94" font-family="Inter,Arial" font-size="10" font-weight="800" fill="${txtCor}" text-anchor="middle">${txt}</text>
    <path d="M70 56 H112" stroke="#fff" stroke-width="4" opacity=".35" stroke-linecap="round"/></g>`;

  const garrafa = (liq, rotulo = "") => `
    <rect x="88" y="22" width="24" height="12" rx="3" fill="${O}"/>
    <path d="M90 34 H110 V46 Q128 56 128 76 V128 Q128 134 122 134 H78 Q72 134 72 128 V76 Q72 56 90 46Z" fill="#eaf3f7" ${S}/>
    ${liq ? `<path d="M74 72 H126 V128 Q126 132 122 132 H78 Q74 132 74 128Z" fill="${liq}" opacity=".9"/>` : ""}
    ${rotulo}
    <path d="M80 70 V120" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/>`;

  window.ILU = {
    marmitex: `${sombra()}${marmita(0, 0)}`,
    "marmitex-g": `${sombra(70)}<g opacity=".55">${marmita(14, -14)}</g>${marmita(-6, 4)}`,
    "marmitex-3d": `${sombra(70)}
      <rect x="30" y="34" width="140" height="98" rx="12" fill="#fff" ${S}/>
      <rect x="38" y="42" width="66" height="82" rx="6" fill="#fffaf0" ${s2}/>
      <rect x="110" y="42" width="52" height="38" rx="6" fill="#6b3b2a" ${s2}/>
      <rect x="110" y="86" width="52" height="38" rx="6" fill="#b5562f" ${s2}/>
      <g fill="#efe4c9"><circle cx="55" cy="60" r="2.2"/><circle cx="70" cy="72" r="2.2"/><circle cx="86" cy="58" r="2.2"/><circle cx="60" cy="96" r="2.2"/><circle cx="82" cy="104" r="2.2"/><circle cx="74" cy="88" r="2.2"/></g>
      <g fill="#8a5240"><circle cx="124" cy="56" r="3"/><circle cx="142" cy="66" r="3"/><circle cx="150" cy="54" r="3"/></g>
      <path d="M118 104 q10 -8 20 0 t20 0" stroke="#7a3518" stroke-width="2.5" fill="none"/>`,
    aluminio: `${sombra()}
      <path d="M38 78 H162 L152 126 Q151 131 146 131 H54 Q49 131 48 126Z" fill="#d9dde2" ${S}/>
      <path d="M60 86 L64 124 M80 86 L82 124 M100 86 V124 M120 86 L118 124 M140 86 L136 124" stroke="#b9bec5" stroke-width="2"/>
      <rect x="30" y="56" width="140" height="22" rx="4" fill="#f4ecd8" ${S}/>
      <rect x="70" y="62" width="60" height="10" rx="2" fill="#c9a24a"/>`,
    "pote-ret": `${sombra()}
      <path d="M42 92 H158 L152 126 Q151 131 146 131 H54 Q49 131 48 126Z" fill="#222" ${S}/>
      <path d="M38 92 V80 Q38 68 50 68 H150 Q162 68 162 80 V92Z" fill="#dcebf2" ${S}/>
      <path d="M52 76 H112" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 92 H166" ${S}/>`,
    "pote-red": `${sombra(46)}
      <path d="M58 74 H142 L134 126 Q133 131 128 131 H72 Q67 131 66 126Z" fill="#eef5f8" ${S}/>
      <path d="M61 94 H139 L134 126 Q133 129 128 129 H72 Q67 129 66 126Z" fill="#5b2a4e"/>
      <path d="M58 74 H142 L134 126 Q133 131 128 131 H72 Q67 131 66 126Z" fill="none" ${S}/>
      <rect x="50" y="60" width="100" height="14" rx="5" fill="#fff" ${S}/>
      <path d="M72 82 V118" stroke="#fff" stroke-width="5" opacity=".6" stroke-linecap="round"/>`,
    potinho: `${sombra(64)}
      ${[[44, "#d64532"], [100, "#f2c230"], [156, "#efe6cf"]].map(([x, c]) => `
      <path d="M${x - 24} 96 H${x + 24} L${x + 19} 128 Q${x + 18} 131 ${x + 14} 131 H${x - 14} Q${x - 18} 131 ${x - 19} 128Z" fill="${c}" ${S}/>
      <rect x="${x - 28}" y="86" width="56" height="10" rx="4" fill="#fff" ${S}/>`).join("")}`,
    copo: `${sombra(56)}
      <path d="M52 30 H98 L92 132 H58Z" fill="#fff" ${S}/>
      ${[40, 50, 60, 70, 80, 90, 100, 110, 120].map((y) => `<path d="M${53 + (y - 30) * .06} ${y} H${97 - (y - 30) * .06}" stroke="#e7e1d5" stroke-width="2"/>`).join("")}
      <rect x="54" y="72" width="42" height="22" fill="#d64532" opacity=".92"/>
      <path d="M48 30 H102" ${S} stroke-width="4"/>
      <path d="M118 62 H156 L150 132 H124Z" fill="#fff" ${S}/>
      <path d="M114 62 H160" ${S} stroke-width="4"/>
      <path d="M126 72 L130 122" stroke="#efe9de" stroke-width="4" stroke-linecap="round"/>`,
    "copo-cafe": `${sombra(60)}
      ${[60, 100, 140].map((x, i) => `<path d="M${x - 16} ${92 - i * 6} H${x + 16} L${x + 12} 132 H${x - 12}Z" fill="#fff" ${S}/><path d="M${x - 19} ${92 - i * 6} H${x + 19}" ${S} stroke-width="3.5"/>`).join("")}
      <path d="M138 70 q-6 -8 0 -16 M146 72 q-6 -8 0 -16" stroke="#c9a24a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    "copo-isopor": `${sombra(44)}
      <path d="M68 36 H132 L122 132 H78Z" fill="#fbf9f4" ${S}/>
      <g fill="#ece6da">${Array.from({ length: 22 }, (_, i) => `<circle cx="${80 + (i * 37) % 40}" cy="${46 + (i * 23) % 80}" r="1.6"/>`).join("")}</g>
      <path d="M62 36 H138" ${S} stroke-width="4.5"/>`,
    "sache-ketchup": `${sombra(64)}${sache("#d64532", "KETCHUP", -26, -10, "#d64532")}${sache("#c63a28", "KETCHUP", 26, 8, "#c63a28")}`,
    "sache-mostarda": `${sombra(64)}${sache("#f2c230", "MOSTARDA", -26, -10, "#b98a00")}${sache("#e9b81f", "MOSTARDA", 26, 8, "#b98a00")}`,
    "sache-maionese": `${sombra(64)}${sache("#f3ead0", "MAIONESE", -26, -10, "#8a7a4a")}${sache("#efe3c2", "MAIONESE", 26, 8, "#8a7a4a")}`,
    "kit-talher": `${sombra(56)}
      <rect x="62" y="22" width="76" height="112" rx="8" fill="#eef5f8" ${S}/>
      <rect x="72" y="36" width="56" height="84" rx="3" fill="#fff" ${s2}/>
      <path d="M86 44 V112 M80 44 V60 Q80 66 86 66 Q92 66 92 60 V44" fill="none" ${s2}/>
      <path d="M112 44 Q122 56 116 80 H112 V112" fill="none" ${s2}/>
      <path d="M66 30 H134" stroke="#fff" stroke-width="4" opacity=".8" stroke-linecap="round"/>`,
    garfo: `${sombra(52)}
      ${[-16, 0, 16].map((r) => `<g transform="rotate(${r} 100 130)"><path d="M100 128 V72 M90 40 V62 Q90 72 100 72 Q110 72 110 62 V40 M96.5 40 V60 M103.5 40 V60" fill="none" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/><path d="M96 74 H104 V126 Q100 130 96 126Z" fill="#fff" ${s2}/></g>`).join("")}`,
    guardanapo: `${sombra(60)}
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${44 + i * 2}" y="${112 - i * 12}" width="108" height="14" rx="2" fill="#fff" ${s2}/>`).join("")}
      <path d="M52 64 L100 40 L148 64" fill="#fff" ${s2}/>
      <path d="M52 64 H148" ${s2}/>`,
    sacola: `${sombra(56)}
      <path d="M58 52 V34 Q58 24 68 24 H76 Q84 24 84 34 V52 M116 52 V34 Q116 24 124 24 H132 Q142 24 142 34 V52" fill="none" ${S}/>
      <path d="M50 52 H150 L144 132 H56Z" fill="#fff" ${S}/>
      <path d="M84 52 Q100 66 116 52" fill="none" ${s2}/>
      <circle cx="100" cy="96" r="15" fill="none" stroke="#c9a24a" stroke-width="3"/>
      <path d="M93 96 L98 101 L108 90" fill="none" stroke="#c9a24a" stroke-width="3" stroke-linecap="round"/>`,
    "caixa-burger": `${sombra(64)}
      <path d="M42 86 H158 V126 Q158 131 153 131 H47 Q42 131 42 126Z" fill="#c99a62" ${S}/>
      <path d="M42 86 Q42 48 70 46 H130 Q158 48 158 86Z" fill="#d6aa72" ${S}/>
      <path d="M38 86 H162" ${S}/>
      <path d="M86 86 h28 v10 h-28z" fill="#b0824c" ${s2}/>
      <circle cx="100" cy="66" r="10" fill="none" stroke="#7d5a2e" stroke-width="2.5"/>`,
    "caixa-pizza": `${sombra(72)}
      <path d="M30 98 L100 120 L170 98 V112 L100 134 L30 112Z" fill="#c99a62" ${S}/>
      <path d="M30 98 L100 76 L170 98 L100 120Z" fill="#dcb47d" ${S}/>
      <ellipse cx="100" cy="98" rx="30" ry="10" fill="none" stroke="#8a6234" stroke-width="2.5"/>
      <text x="100" y="101" font-family="Inter,Arial" font-size="8" font-weight="800" fill="#8a6234" text-anchor="middle">PIZZA</text>`,
    lacre: `${sombra(60)}
      <circle cx="74" cy="92" r="38" fill="#fff" ${S}/>
      <circle cx="74" cy="92" r="16" fill="#f3efe6" ${S}/>
      <path d="M74 54 H156 V80 H96" fill="#fff" ${S}/>
      <rect x="104" y="58" width="44" height="18" rx="3" fill="#c9a24a"/>
      <text x="126" y="70.5" font-family="Inter,Arial" font-size="8" font-weight="800" fill="#111" text-anchor="middle">LACRADO</text>
      <path d="M44 92 A30 30 0 0 1 74 62" stroke="#c9a24a" stroke-width="5" fill="none"/>`,
    suco: `${sombra(40)}${garrafa("#f6a623", `<rect x="72" y="86" width="56" height="26" fill="#1b1b1b"/><text x="100" y="103" font-family="Georgia" font-size="10" font-weight="700" fill="#c9a24a" text-anchor="middle">LARANJA</text>`)}`,
    garrafa: `${sombra(40)}${garrafa("")}`,
    "garrafa-pers": `${sombra(40)}${garrafa("#f4d77a", `<rect x="72" y="84" width="56" height="30" fill="#111"/><text x="100" y="97" font-family="Georgia" font-size="8.5" font-weight="700" fill="#c9a24a" text-anchor="middle">SUA</text><text x="100" y="108" font-family="Georgia" font-size="8.5" font-weight="700" fill="#c9a24a" text-anchor="middle">MARCA</text>`)}`,
    galao: `${sombra(52)}
      <path d="M64 50 H124 Q140 50 140 66 V126 Q140 132 134 132 H66 Q60 132 60 126 V54Z" fill="#7cc4e4" ${S}/>
      <path d="M108 50 V36 H128 Q140 36 140 48 V66" fill="none" ${S}/>
      <rect x="70" y="30" width="22" height="20" rx="3" fill="#1e6f9a" ${S}/>
      <rect x="70" y="80" width="60" height="34" rx="4" fill="#fff" ${s2}/>
      <path d="M78 92 H122 M78 102 H108" stroke="#7cc4e4" stroke-width="3" stroke-linecap="round"/>`,
    "saco-lixo": `${sombra(56)}
      <path d="M86 40 Q100 30 114 40 L108 52 Q100 48 92 52Z" fill="#2f2f2f" ${S}/>
      <path d="M92 52 Q50 64 52 112 Q54 132 76 132 H124 Q146 132 148 112 Q150 64 108 52Z" fill="#2f2f2f" ${S}/>
      <path d="M72 80 Q66 100 74 120" stroke="#5a5a5a" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    luva: `${sombra(46)}
      <path d="M78 132 V94 L64 74 Q60 66 68 64 Q74 63 78 70 L84 80 V40 Q84 34 90 34 Q96 34 96 40 V72 V32 Q96 26 102 26 Q108 26 108 32 V72 V38 Q108 32 114 32 Q120 32 120 38 V76 V50 Q120 44 126 44 Q132 44 132 50 V100 Q132 118 122 132Z" fill="#eef5f8" ${S}/>
      <path d="M90 50 V70" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`,
    touca: `${sombra(62)}
      <path d="M44 104 Q44 48 100 46 Q156 48 156 104Z" fill="#f0f7fb" ${S}/>
      <path d="M40 104 q5 -6 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" ${S}/>
      <path d="M66 70 Q100 56 134 70" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    articulada: `${sombra()}
      <path d="M42 94 H158 L150 126 Q149 131 144 131 H56 Q51 131 50 126Z" fill="#fff" ${S}/>
      <path d="M38 94 L46 58 Q48 52 54 52 H146 Q152 52 154 58 L162 94Z" fill="#fff" ${S}/>
      <path d="M56 62 H144 M54 72 H146 M52 82 H148" stroke="#ece6da" stroke-width="2.5"/>
      <path d="M34 94 H166" ${S}/>
      <path d="M92 94 h16 v12 h-16z" fill="#fff" ${s2}/>`,
    torta: `${sombra(64)}
      <path d="M44 112 Q44 102 54 102 H146 Q156 102 156 112 V124 Q156 130 150 130 H50 Q44 130 44 124Z" fill="#1d1d1d" ${S}/>
      <path d="M52 104 V62 Q52 40 74 40 H126 Q148 40 148 62 V104" fill="#dcebf2" fill-opacity=".75" ${S}/>
      <path d="M62 100 V82 Q62 76 68 76 H132 Q138 76 138 82 V100Z" fill="#f3d9b1" ${s2}/>
      <path d="M62 84 H138" stroke="#e8b3c0" stroke-width="5"/>
      <path d="M64 50 V92" stroke="#fff" stroke-width="5" opacity=".75" stroke-linecap="round"/>`,
    "torta-baixa": `${sombra(68)}
      <ellipse cx="100" cy="116" rx="66" ry="16" fill="#1d1d1d" ${S}/>
      <path d="M44 112 V92 Q44 74 100 72 Q156 74 156 92 V112" fill="#dcebf2" fill-opacity=".75" ${S}/>
      <ellipse cx="100" cy="100" rx="44" ry="10" fill="#e9c27a" ${s2}/>
      <path d="M58 84 Q80 78 100 78" stroke="#fff" stroke-width="5" opacity=".8" fill="none" stroke-linecap="round"/>`,
    prato: `${sombra(70)}
      <ellipse cx="100" cy="100" rx="72" ry="28" fill="#fff" ${S}/>
      <ellipse cx="100" cy="98" rx="50" ry="17" fill="#f6f3ec" ${s2}/>
      <ellipse cx="100" cy="74" rx="66" ry="24" fill="#fff" ${S} opacity=".55"/>`,
    "saco-papel": `${sombra(46)}
      <path d="M66 46 H134 L138 132 H62Z" fill="#c99a62" ${S}/>
      <path d="M66 46 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5" fill="#c99a62" ${s2}/>
      <path d="M76 56 V126 M124 56 V126" stroke="#b2844f" stroke-width="2"/>
      <circle cx="100" cy="90" r="13" fill="none" stroke="#7d5a2e" stroke-width="2.5"/>`,
    caixa: `${sombra()}<path d="M40 70 L100 50 L160 70 V122 L100 138 L40 122Z" fill="#d6aa72" ${S}/><path d="M40 70 L100 88 L160 70 M100 88 V138" fill="none" ${S}/>`,
  };

  // Ícones de linha (24x24) para categorias e segmentos
  const i = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  window.ICONE = {
    "Marmitex": i(`<path d="M4 12h16l-1.5 7a1.5 1.5 0 0 1-1.5 1H7a1.5 1.5 0 0 1-1.5-1z"/><path d="M3 12a9 6 0 0 1 18 0"/>`),
    "Potes": i(`<rect x="4" y="8" width="16" height="4" rx="1.5"/><path d="M5.5 12l1 7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1l1-7"/>`),
    "Copos": i(`<path d="M6 4h12l-1.6 16H7.6z"/><path d="M6.5 9h11"/>`),
    "Sachês e molhos": i(`<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M9 10h6M9 13h4"/>`),
    "Talheres e guardanapos": i(`<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M16 21V3c2.5 1.5 3 5 2.5 9H16"/>`),
    "Delivery": i(`<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>`),
    "Bebidas": i(`<path d="M10 2h4v3l2 3v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-3z"/><path d="M8 12h8"/>`),
    "Garrafas": i(`<path d="M10 2h4v4c2 1 3 2.5 3 5v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9c0-2.5 1-4 3-5z"/><path d="M7 13h10"/>`),
    "Confeitaria": i(`<path d="M4 14h16v6H4z"/><path d="M6 14v-3a6 4 0 0 1 12 0v3"/><path d="M12 4v3"/>`),
    "Pratos e bandejas": i(`<ellipse cx="12" cy="13" rx="9" ry="5"/><ellipse cx="12" cy="12.5" rx="5" ry="2.5"/>`),
    "Limpeza": i(`<path d="M9 3h5v3l-1 1v2h3a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9a2 2 0 0 1 2-2h1V7L9 6z"/><path d="M14 4h3"/>`),
    marmitaria: i(`<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4"/>`),
    lanchonete: i(`<path d="M4 10a8 6 0 0 1 16 0z"/><path d="M3 13h18M4 16h16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/>`),
    pizzaria: i(`<path d="M12 21 3 6a15 15 0 0 1 18 0z"/><path d="M4.5 8.5a13 13 0 0 1 15 0"/><circle cx="11" cy="11" r="1"/><circle cx="14" cy="14" r="1"/>`),
    acai: i(`<path d="M5 10h14l-2 10H7z"/><path d="M5 10a7 5 0 0 1 14 0"/><path d="M14 3l-2 7"/>`),
    restaurante: i(`<path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6M10 6h4"/><path d="M3 20h18"/>`),
    festas: i(`<path d="M4 21 8 9l7 7z"/><path d="M14 4v2M19 9h2M17 6l1.5-1.5M12 9c1-1 1-3 3-3M15 12c1-1 3-1 3 1"/>`),
    caminhao: i(`<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>`),
    nota: i(`<path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h7M9 16h7"/>`),
    cartao: i(`<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>`),
    chat: i(`<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.8A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>`),
    estoque: i(`<path d="M3 8 12 3l9 5v9l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/>`),
    relogio: i(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
    pin: i(`<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>`),
    fone: i(`<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>`),
  };
})();
