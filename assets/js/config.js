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
  },

  /**
   * [EDITAR] Linha de aparelhos exibida no configurador.
   * Nomes de cores e capacidades seguem as versões oficiais de cada modelo,
   * mas a disponibilidade é da loja: ajuste conforme o estoque real.
   * `lenses: 3` desenha o módulo de câmera tripla (linha Pro).
   */
  models: [
    {
      id: "17-pro-max",
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
