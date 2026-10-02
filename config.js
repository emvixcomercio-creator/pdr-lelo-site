// Configurações da loja. Edite aqui sem mexer no resto do código.
window.LOJA = {
  nome: "PDR & LELO",
  razaoSocial: "Embalalelo Descartáveis LTDA",
  cnpj: "",                            // preencher com o CNPJ da empresa
  whatsapp: "5521994627664",           // número que recebe os pedidos (DDI + DDD + número)
  email: "pdr.embalagens@gmail.com",
  telefoneFixo: "(21) 2186-7000",
  telefoneWhats: "(21) 99462-7664",
  endereco: "Rua Guilhermina, 393, Encantado, Rio de Janeiro/RJ, CEP 20756-060",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Guilhermina+393+Encantado+Rio+de+Janeiro",
  instagram: "https://www.instagram.com/pdrelelo.embalagens/",
  horario: "Atendimento das 8h às 18h",
  pedidoMinimoEntrega: 150,            // abaixo disso, só retirada na loja
  freteGratisAcima: 300,               // 0 desliga a barra de frete grátis
  pagamentos: ["Pix", "Dinheiro", "Cartão de débito", "Cartão de crédito", "Boleto (clientes cadastrados)"],

  avaliacao: {
    nota: "4,4",
    total: 7,
    url: "https://www.google.com/maps/search/?api=1&query=PDR%26LELO+Embalalelo+Descart%C3%A1veis",
    destaque: "Entrega rápida, embalagens de qualidade e atendimento excelente!",
  },

  faq: [
    ["Vocês entregam em quais bairros?", "Entregamos em todo o Rio de Janeiro com frota própria. Informe o seu endereço no pedido e confirmamos o prazo pelo WhatsApp."],
    ["Existe pedido mínimo?", "Para entrega, o pedido mínimo é de R$ 150,00. Acima de R$ 300,00 a entrega é grátis. Para retirar na loja, não há mínimo."],
    ["Como faço o pagamento?", "Você escolhe no pedido: Pix, dinheiro ou cartão na entrega. Clientes cadastrados podem pagar por boleto."],
    ["Vocês emitem nota fiscal?", "Sim. Informe o CNPJ ou CPF no pedido para a nota sair no seu nome."],
    ["Não achei o produto que eu preciso.", "Temos muito mais itens na loja do que no site. Chame no WhatsApp e a nossa equipe verifica para você."],
  ],

  // Para o dono editar produtos sem programador: publique uma planilha Google
  // como CSV (Arquivo > Compartilhar > Publicar na Web > CSV) e cole o link aqui.
  // Colunas: id, nome, categoria, segmentos, embalagem, preco, precoDe, destaque, estoque, imagem, ilustracao, descricao
  // Deixe vazio para usar o arquivo produtos.json.
  planilhaCsvUrl: ""
};
