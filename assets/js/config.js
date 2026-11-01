/**
 * REXX Limeira — configuração central do site.
 *
 * TUDO que for dado comercial fica aqui. Os campos marcados com `null`
 * ainda NÃO foram confirmados pela loja e aparecem no site como
 * "A confirmar". Preencha antes de publicar.
 */
window.REXX_CONFIG = {
  brand: {
    name: "REXX",
    city: "Limeira — SP",
  },

  contact: {
    // [EDITAR] WhatsApp com DDI + DDD, só números. Ex.: "5519999999999"
    whatsapp: null,
    // Número exibido na tela. Ex.: "(19) 99999-9999"
    whatsappLabel: null,
    instagram: "https://www.instagram.com/rexxlimeira/",
    instagramHandle: "@rexxlimeira",
    email: null,
  },

  store: {
    // [EDITAR] Endereço completo da loja
    address: null,
    // [EDITAR] Link do Google Maps (deixe null para gerar uma busca automática)
    mapsUrl: null,
    // [EDITAR] Horários reais de atendimento
    hours: null, // Ex.: ["Seg a Sex · 9h às 18h", "Sáb · 9h às 13h"]
    // [EDITAR] Razão social e CNPJ (rodapé)
    legalName: null,
    cnpj: null,
    // [EDITAR] Foto real da fachada/interior da loja. Coloque o arquivo em
    // assets/img/loja/ e informe o caminho, ex.: "assets/img/loja/fachada.jpg".
    // Enquanto for null, a foto simplesmente não aparece.
    photo: null,
  },

  /**
   * [EDITAR] Linha de aparelhos exibida no configurador.
   * Nomes de cores e capacidades seguem as versões oficiais de cada modelo,
   * mas a disponibilidade é da loja: ajuste conforme o estoque real.
   * `lenses: 3` desenha o módulo de câmera tripla (linha Pro).
   * `specs` alimenta a seção "Comparar" (dados divulgados pela Apple).
   * `image` é a foto do card em "Comparar"; se o arquivo não existir, o card fica sem foto.
   */
  models: [
    {
      id: "17-pro-max",
      image: "assets/img/modelos/iphone-17-pro-max.jpg", // gere com PROMPTS-IMAGENS.md
      specs: { screen: "6,9″", chip: "A19 Pro", camera: "3 × 48 MP", note: "Maior tela e maior bateria da linha" },
      name: "iPhone 17 Pro Max",
      tag: "Pro",
      lenses: 3,
      storage: ["256 GB", "512 GB", "1 TB", "2 TB"],
      colors: [
        { name: "Laranja-cósmico", hex: "#d9773a" },
        { name: "Azul-intenso", hex: "#2f3b55" },
        { name: "Prateado", hex: "#dcdcdc" },
      ],
    },
    {
      id: "17-pro",
      image: "assets/img/modelos/iphone-17-pro.jpg", // gere com PROMPTS-IMAGENS.md
      specs: { screen: "6,3″", chip: "A19 Pro", camera: "3 × 48 MP", note: "Câmera Pro em tamanho compacto" },
      name: "iPhone 17 Pro",
      tag: "Pro",
      lenses: 3,
      storage: ["256 GB", "512 GB", "1 TB"],
      colors: [
        { name: "Laranja-cósmico", hex: "#d9773a" },
        { name: "Azul-intenso", hex: "#2f3b55" },
        { name: "Prateado", hex: "#dcdcdc" },
      ],
    },
    {
      id: "17",
      image: "assets/img/modelos/iphone-17.jpg", // gere com PROMPTS-IMAGENS.md
      specs: { screen: "6,3″", chip: "A19", camera: "2 × 48 MP", note: "Tela de 120 Hz no modelo de entrada" },
      name: "iPhone 17",
      tag: "Essencial",
      lenses: 2,
      storage: ["256 GB", "512 GB"],
      colors: [
        { name: "Preto", hex: "#2b2b2d" },
        { name: "Branco", hex: "#f1f0ec" },
        { name: "Azul-névoa", hex: "#a9bfd6" },
        { name: "Sálvia", hex: "#b7c2a4" },
        { name: "Lavanda", hex: "#cfc2e0" },
      ],
    },
    {
      id: "16",
      image: "assets/img/modelos/iphone-16.jpg", // gere com PROMPTS-IMAGENS.md
      specs: { screen: "6,1″", chip: "A18", camera: "48 + 12 MP", note: "Botão Controle da Câmera" },
      name: "iPhone 16",
      tag: "Essencial",
      lenses: 2,
      storage: ["128 GB", "256 GB", "512 GB"],
      colors: [
        { name: "Preto", hex: "#2e2f31" },
        { name: "Branco", hex: "#f2f1ee" },
        { name: "Rosa", hex: "#f0b9cd" },
        { name: "Verde-acinzentado", hex: "#a8c3b5" },
        { name: "Ultramarino", hex: "#6a7fdc" },
      ],
    },
    {
      id: "15",
      image: "assets/img/modelos/iphone-15.jpg", // gere com PROMPTS-IMAGENS.md
      specs: { screen: "6,1″", chip: "A16 Bionic", camera: "48 + 12 MP", note: "Dynamic Island e USB-C" },
      name: "iPhone 15",
      tag: "Essencial",
      lenses: 2,
      storage: ["128 GB", "256 GB", "512 GB"],
      colors: [
        { name: "Preto", hex: "#34363a" },
        { name: "Azul", hex: "#cfdbe3" },
        { name: "Verde", hex: "#d4e0cd" },
        { name: "Amarelo", hex: "#f2e7b6" },
        { name: "Rosa", hex: "#f1cfd3" },
      ],
    },
  ],
};
