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
index.html              Página única: intro, hero, faixa, detalhe, veja de perto, configurador,
                        comparar, guia rápido, sobre, como comprar, dicas, dúvidas,
                        [depoimentos], [serviços], Instagram, fale com a REXX, loja
assets/css/style.css    Design system (tokens no topo) + componentes + responsivo
assets/js/config.js     ← TODOS os dados da loja ficam aqui
assets/js/main.js       Interações (nav, reveal, scroll, configurador, WhatsApp)
assets/img/             Imagens (webp + jpg de fallback) e favicon
robots.txt, sitemap.xml SEO técnico
```

## Antes de publicar — confirmar com a loja

Nada abaixo foi inventado; enquanto estiver `null` em `assets/js/config.js`, o site mostra **"A confirmar"**.

- [ ] **Confirmar dados públicos** usados no site (fonte: cadastro do CNPJ e página da loja no Facebook): WhatsApp (19) 98239-5464, endereço Av. Marechal Arthur da Costa e Silva, 1430 — Loja 8, Jardim Glória, Limeira — SP, 13487-230, razão social Rexx Telefonia Ltda e CNPJ 37.469.757/0001-39
- [ ] **Horário de atendimento** (`store.hours`)
- [ ] **Razão social e CNPJ** (`store.legalName`, `store.cnpj`) — aparecem no rodapé
- [ ] **Modelos, cores e capacidades** do configurador (`models`) conforme o estoque real
- [ ] **Tom exato do laranja REXX**: hoje `#ff5a00`. Para ajustar, edite só os tokens `--orange*` no topo de `style.css`
- [ ] **Logo oficial**: hoje o logo é tipográfico (`REXX` + bola laranja). Substitua o `.wordmark` no `index.html` por um SVG quando houver arquivo
- [ ] **Fotos reais**: as imagens atuais são renders de referência em baixa resolução (736 px). Veja `assets/img/loja/LEIA-ME.md` — a foto da loja entra em `store.photo` e aparece automaticamente na seção Loja
- [ ] **Especificações** da seção Comparar (`models[].specs`) conforme os modelos em estoque
- [x] **Fotos dos aparelhos**: 22 fotos tratadas (fundo removido, saturação e nitidez) em `assets/img/aparelhos/`, ligadas por cor em `models[].photos`. Os originais enviados ficam em `img/`
- [ ] **Depoimentos reais** (`testimonials`) e **serviços** além da venda (`services`) em `config.js`: as seções só aparecem quando preenchidas
- [ ] **Domínio**: atualizar `canonical` no `index.html`, `robots.txt` e `sitemap.xml`

O site **não** diz que a REXX é revendedora autorizada Apple. Só inclua essa informação se houver comprovação.

## Notas de design

- Duas superfícies (claro → escuro) com o laranja REXX como acento: botões, marcadores, a "bola" do logo, a faixa e a seção do Instagram.
- Tipografia: Inter Tight (títulos, tracking negativo), Inter (texto), Geist Mono (rótulos técnicos).
- Movimento: intro com o logo, títulos que sobem palavra por palavra, imagens reveladas por cortina, faixa laranja que acelera e inclina com a velocidade do scroll, seção "Detalhe" fixa, comparação com rolagem horizontal (ou arrastar, em telas baixas), cards do guia empilhados que vão para trás com o scroll, aparelho 3D que segue o mouse e botões magnéticos. Tudo respeita `prefers-reduced-motion`.
- Configurador: monta a mensagem do WhatsApp com modelo, cor e capacidade. Não há preços no site.
