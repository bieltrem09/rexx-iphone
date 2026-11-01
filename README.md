# REXX Limeira — site

Site da REXX Limeira (iPhones e tecnologia, Limeira — SP).
HTML, CSS e JavaScript puros, sem build e sem dependências: funciona direto no GitHub Pages, Netlify, Vercel ou qualquer hospedagem estática.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000.

## Estrutura

```
index.html              Página única (hero, detalhe, configurador, como comprar, loja)
assets/css/style.css    Design system (tokens no topo) + componentes + responsivo
assets/js/config.js     ← TODOS os dados da loja ficam aqui
assets/js/main.js       Interações (nav, reveal, scroll, configurador, WhatsApp)
assets/img/             Imagens (webp + jpg de fallback) e favicon
robots.txt, sitemap.xml SEO técnico
```

## Antes de publicar — confirmar com a loja

Nada abaixo foi inventado; enquanto estiver `null` em `assets/js/config.js`, o site mostra **"A confirmar"**.

- [ ] **WhatsApp** (`contact.whatsapp`, só números com 55 + DDD). Sem ele, os botões rolam até a seção "Loja" em vez de abrir o WhatsApp.
- [ ] **Endereço** e link do Google Maps (`store.address`, `store.mapsUrl`)
- [ ] **Horário de atendimento** (`store.hours`)
- [ ] **Razão social e CNPJ** (`store.legalName`, `store.cnpj`) — aparecem no rodapé
- [ ] **Modelos, cores e capacidades** do configurador (`models`) conforme o estoque real
- [ ] **Cores oficiais da marca**: a paleta atual (preto grafite, off-white quente e o vermelho `#c8102e`) é uma proposta. Para trocar, edite só os tokens `--rexx-*` no topo de `style.css`
- [ ] **Logo oficial**: hoje o logo é tipográfico (`REXX` + quadrado vermelho). Substitua o `.wordmark` no `index.html` por um SVG quando houver arquivo
- [ ] **Fotos**: as imagens atuais são renders de referência em baixa resolução (736 px). Troque por fotos próprias da loja/produtos em alta (≥ 1600 px), mantendo os mesmos nomes de arquivo
- [ ] **Domínio**: atualizar `canonical` no `index.html`, `robots.txt` e `sitemap.xml`

O site **não** diz que a REXX é revendedora autorizada Apple. Só inclua essa informação se houver comprovação.

## Notas de design

- Duas superfícies (claro → escuro) com um único acento de cor, usado apenas em CTAs, marcadores e progresso.
- Tipografia: Inter Tight (títulos, tracking negativo), Inter (texto), Geist Mono (rótulos técnicos).
- Movimento: o hero entra com máscara, a seção "Detalhe" fica fixa e avança com o scroll, e o aparelho do configurador muda de cor com transição. Tudo respeita `prefers-reduced-motion`.
- Configurador: monta a mensagem do WhatsApp com modelo, cor e capacidade. Não há preços no site.
