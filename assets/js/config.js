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
   * `image` é a foto do card em "Comparar" (fundo transparente); sem foto, o card desenha o aparelho.
   * `glow` é a cor da luz da cena atrás do aparelho.
   */
  models: [
    {
      id: "17-pro-max",
      image: "assets/img/modelos/iphone-17-pro-max.webp",
      glow: "#ff6a1a",
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
      image: null, // [PENDENTE] foto: "assets/img/modelos/iphone-17-pro.webp"
      glow: "#c0304f",
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
      image: null, // sem foto: o card desenha o aparelho na cor da linha
      glow: "#a58bff",
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
      id: "16-pro",
      image: null, // [PENDENTE] foto: "assets/img/modelos/iphone-16-pro.webp"
      glow: "#c9c4b8",
      specs: { screen: "6,3″", chip: "A18 Pro", camera: "48 + 48 + 12 MP", note: "Teleobjetiva 5x e gravação em 4K a 120 qps" },
      name: "iPhone 16 Pro",
      tag: "Pro",
      lenses: 3,
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      colors: [
        { name: "Titânio-deserto", hex: "#bfa48a" },
        { name: "Titânio natural", hex: "#b8b3a8" },
        { name: "Titânio branco", hex: "#ecebe6" },
        { name: "Titânio preto", hex: "#3b3b3d" },
      ],
    },
    {
      id: "16",
      image: "assets/img/modelos/iphone-16.webp",
      glow: "#9fb6e8",
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
      id: "15-pro-max",
      image: null, // [PENDENTE] foto: "assets/img/modelos/iphone-15-pro-max.webp"
      glow: "#b9b4a9",
      specs: { screen: "6,7″", chip: "A17 Pro", camera: "48 + 12 + 12 MP", note: "Primeiro Pro Max em titânio, teleobjetiva 5x" },
      name: "iPhone 15 Pro Max",
      tag: "Pro",
      lenses: 3,
      storage: ["256 GB", "512 GB", "1 TB"],
      colors: [
        { name: "Titânio natural", hex: "#b8b3a8" },
        { name: "Titânio azul", hex: "#3f4a5c" },
        { name: "Titânio branco", hex: "#ecebe6" },
        { name: "Titânio preto", hex: "#3b3b3d" },
      ],
    },
    {
      id: "15",
      image: "assets/img/modelos/iphone-15.webp",
      glow: "#4aa3ff",
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

  /**
   * Seção "Em destaque": a cena com palco e luz. Cada item usa uma foto com
   * fundo transparente (veja assets/img/LEIA-ME-IMAGENS.md) e a cor do brilho.
   */
  featured: [
    { model: "17-pro-max", image: "assets/img/modelos/iphone-17-pro-max.webp", color: "Laranja-cósmico", glow: "#ff6a1a" },
    { model: "16", image: "assets/img/destaque/iphone-16-branco.webp", color: "Branco", glow: "#9fb6e8" },
    { model: "15", image: "assets/img/destaque/iphone-15-azul.webp", color: "Azul", glow: "#4aa3ff" },
  ],
};
