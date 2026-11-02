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
   * `photos` são as fotos por cor: aparecem na cena "Veja de perto" e no configurador.
   *   O nome em `color` precisa ser igual ao de `colors`. `glow` é a cor da luz da cena.
   *   Fotos ficam em assets/img/aparelhos/ (fundo transparente).
   */
  models: [
    {
      id: "17-pro-max",
      image: "assets/img/aparelhos/iphone-17-pro-max-laranja.webp",
      photos: [
        { color: "Laranja-cósmico", image: "assets/img/aparelhos/iphone-17-pro-max-laranja.webp", glow: "#ff6a1a" },
        { color: "Azul-intenso", image: "assets/img/aparelhos/iphone-17-pro-max-azul.webp", glow: "#3d5bff" },
        { color: "Prateado", image: "assets/img/aparelhos/iphone-17-pro-max-prateado.webp", glow: "#c9d2e6" },
      ],
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
      image: "assets/img/aparelhos/iphone-17-pro-azul.webp",
      photos: [
        { color: "Azul-intenso", image: "assets/img/aparelhos/iphone-17-pro-azul.webp", glow: "#3d5bff" },
        { color: "Laranja-cósmico", image: "assets/img/aparelhos/iphone-17-pro-laranja.webp", glow: "#ff6a1a" },
        { color: "Prateado", image: "assets/img/aparelhos/iphone-17-pro-prateado.webp", glow: "#c9d2e6" },
      ],
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
      image: "assets/img/aparelhos/iphone-17-lavanda.webp",
      photos: [
        { color: "Lavanda", image: "assets/img/aparelhos/iphone-17-lavanda.webp", glow: "#a58bff" },
        { color: "Azul-névoa", image: "assets/img/aparelhos/iphone-17-azul-nevoa.webp", glow: "#5a9bff" },
        { color: "Branco", image: "assets/img/aparelhos/iphone-17-branco.webp", glow: "#cfd8ea" },
      ],
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
      image: "assets/img/aparelhos/iphone-16-pro-titanio-deserto.webp",
      photos: [
        { color: "Titânio-deserto", image: "assets/img/aparelhos/iphone-16-pro-titanio-deserto.webp", glow: "#e0a36e" },
        { color: "Titânio branco", image: "assets/img/aparelhos/iphone-16-pro-titanio-branco.webp", glow: "#cfd8ea" },
        { color: "Titânio preto", image: "assets/img/aparelhos/iphone-16-pro-titanio-preto.webp", glow: "#6f7a99" },
      ],
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
      image: "assets/img/aparelhos/iphone-16-ultramarino.webp",
      photos: [
        { color: "Ultramarino", image: "assets/img/aparelhos/iphone-16-ultramarino.webp", glow: "#4f5bff" },
        { color: "Verde-acinzentado", image: "assets/img/aparelhos/iphone-16-verde.webp", glow: "#2fd1b8" },
        { color: "Branco", image: "assets/img/aparelhos/iphone-16-branco.webp", glow: "#cfd8ea" },
        { color: "Preto", image: "assets/img/aparelhos/iphone-16-preto.webp", glow: "#6f7a99" },
      ],
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
      image: "assets/img/aparelhos/iphone-15-pro-max-titanio-natural.webp",
      photos: [
        { color: "Titânio natural", image: "assets/img/aparelhos/iphone-15-pro-max-titanio-natural.webp", glow: "#d6c7a8" },
        { color: "Titânio preto", image: "assets/img/aparelhos/iphone-15-pro-max-titanio-preto.webp", glow: "#6f7a99" },
      ],
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
      image: "assets/img/aparelhos/iphone-15-azul.webp",
      photos: [
        { color: "Azul", image: "assets/img/aparelhos/iphone-15-azul-perfil.webp", glow: "#4aa3ff" },
        { color: "Verde", image: "assets/img/aparelhos/iphone-15-verde.webp", glow: "#7fe0a0" },
      ],
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
   * [EDITAR] Depoimentos REAIS de clientes (com autorização). Enquanto a lista
   * estiver vazia, a seção "Quem já comprou" não aparece no site.
   * Ex.: { text: "Fui muito bem atendido...", name: "Ana", detail: "Comprou um iPhone 16" }
   */
  testimonials: [],

  /**
   * [EDITAR] Serviços que a loja REALMENTE oferece, além da venda.
   * Enquanto estiver vazia, a seção "Além do aparelho" não aparece.
   * Ex.: { title: "Película e capa", text: "Aplicamos na hora da compra." }
   */
  services: [],
};
