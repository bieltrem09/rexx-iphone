# Prompts das imagens — linha iPhone 15, 16 e 17

Cinco imagens, **um aparelho por imagem**, todas com o mesmo ângulo, a mesma luz e o mesmo enquadramento,
para formarem uma série. Cada uma tem um fundo saturado diferente, e o fundo do 17 Pro Max é laranja REXX.

| Arquivo | Modelo | Cor do aparelho | Fundo |
|---|---|---|---|
| `iphone-17-pro-max.jpg` | iPhone 17 Pro Max | Laranja-cósmico | Laranja REXX |
| `iphone-17-pro.jpg` | iPhone 17 Pro | Azul-intenso | Azul-cobalto |
| `iphone-17.jpg` | iPhone 17 | Lavanda | Violeta |
| `iphone-16.jpg` | iPhone 16 | Verde-acinzentado | Verde-azulado |
| `iphone-15.jpg` | iPhone 15 | Rosa | Rosa-choque |

## Atalho para o Google Gemini

Abra **`PROMPT-GEMINI.txt`**, copie o arquivo inteiro e cole numa conversa do Gemini. Ele já explica que são
5 imagens, uma por vez, cada uma com o seu prompt. Se o Gemini parar depois da primeira, escreva **próxima**.

## Como usar

1. Copie **o prompt completo** de cada modelo (ele já inclui o estilo da série) no gerador de imagens.
2. Formato: **paisagem 3:2** (ex.: 1536 × 1024 ou maior). O card do site corta em 3:2.
3. Gere 3 a 4 variações e escolha pela checklist no final deste arquivo.
4. Exporte em **JPG, ~1800 px de largura, qualidade 85** e salve com o nome da tabela em
   `assets/img/modelos/`. O site mostra a foto no card da seção **Comparar** sozinho; sem o arquivo, o card fica sem foto.

**Configurações por ferramenta:**
- **Midjourney**: cole o prompt e acrescente no fim `--ar 3:2 --style raw --v 7 --q 2 --s 200`.
  A lista "AVOID" vai em `--no`, separada por vírgulas, **sem** os itens que falam de logo. O `--no` não entende
  "outro logo que não o da Apple" e acabaria apagando a logo também.
- **ChatGPT / GPT Image, Gemini, Firefly, Ideogram**: cole o prompt inteiro e peça formato paisagem 3:2.
  No Firefly, escolha o tipo de conteúdo "Foto".
- **Leonardo / Stable Diffusion**: prompt no campo principal, lista "Evitar" no negative prompt e proporção 3:2.

> Cada prompt descreve a **logo da Apple na traseira**, na posição real de cada modelo: centralizada no
> painel de vidro abaixo da barra de câmera no 17 Pro e no 17 Pro Max, e no centro da traseira no 17, no 16 e no 15.
> Geradores de imagem às vezes deformam logos. Se isso acontecer, use a dica no fim deste arquivo para
> corrigir só a logo, sem gerar a imagem inteira de novo.

---

## 1 · iPhone 17 Pro Max — Laranja-cósmico

```
Ultra-premium commercial product photograph of ONE single flagship smartphone, seen from the back, in a professional photo studio.

PRODUCT: a large 6.9-inch smartphone with a forged aluminum unibody in a vivid, saturated cosmic-orange anodized finish. The back has a full-width raised camera plateau that spans the entire top of the back, edge to edge, in the same orange aluminum. On the left side of the plateau are three large circular camera lenses arranged in a triangle, with dark glass and thin polished rings. On the right side of the plateau are a small round flash and a tiny dark sensor. Below the plateau, the lower part of the back has a flush matte frosted-glass panel in a slightly lighter orange tone. Flat sides, softly rounded corners, precise machined edges. Centered on the lower glass panel, below the camera plateau, is a single Apple logo (the apple silhouette with a bite taken out of its right side and a single leaf on top), about 12% of the phone width, in a glossy mirror-polished finish of the same color as the phone, perfectly symmetrical, crisp-edged and undistorted.

POSE AND COMPOSITION: three-quarter rear view, the phone standing upright and rotated about 20 degrees to the left, tilted back slightly, floating just above the floor with a soft contact shadow beneath it. The phone is centered and fills about 65% of the frame height, with generous empty space on every side.

BACKGROUND: seamless studio infinity sweep in saturated burnt orange, a smooth gradient from bright tangerine (#FF5A00) in the center to deep rust (#9A2E00) at the edges, with a soft circular glow behind the phone and a gentle vignette.

LIGHTING: large softbox key light from the upper left, a strong rim light from behind on the right that traces the metal edges with a clean bright line, and a long specular highlight running down the aluminum side.

STYLE: hyper-realistic advertising photography, shot on a medium-format camera with a 100mm lens at f/8, razor-sharp across the whole device, 8K detail, rich and vivid colors, high saturation, deep contrast, clean highlights, physically accurate reflections, premium tech-campaign look. True-to-life product proportions and thickness, exact lens count and placement, fine anodized-aluminum micro-texture on the frame, realistic glass reflections, accurate logo shape and position.

AVOID: text, letters, numbers, words, any logo other than the single Apple logo, deformed or melted Apple logo, logo off-center, two logos, logo on the camera plateau, brand names, watermark, screen visible, front of the phone, hands, people, a second phone, extra or missing lenses, warped or melted geometry, cartoon, illustration, plastic CGI look, motion blur, dust, fingerprints, scratches, cluttered background, props.
```

## 2 · iPhone 17 Pro — Azul-intenso

```
Ultra-premium commercial product photograph of ONE single flagship smartphone, seen from the back, in a professional photo studio.

PRODUCT: a 6.3-inch smartphone with a forged aluminum unibody in a deep, rich navy "deep blue" anodized finish. The back has a full-width raised camera plateau that spans the entire top of the back, edge to edge, in the same deep-blue aluminum. On the left side of the plateau are three large circular camera lenses arranged in a triangle, with dark glass and thin polished rings. On the right side of the plateau are a small round flash and a tiny dark sensor. Below the plateau, the lower part of the back has a flush matte frosted-glass panel in a slightly lighter blue tone. Flat sides, softly rounded corners, precise machined edges. Centered on the lower glass panel, below the camera plateau, is a single Apple logo (the apple silhouette with a bite taken out of its right side and a single leaf on top), about 12% of the phone width, in a glossy mirror-polished finish of the same color as the phone, perfectly symmetrical, crisp-edged and undistorted.

POSE AND COMPOSITION: three-quarter rear view, the phone standing upright and rotated about 20 degrees to the left, tilted back slightly, floating just above the floor with a soft contact shadow beneath it. The phone is centered and fills about 65% of the frame height, with generous empty space on every side.

BACKGROUND: seamless studio infinity sweep in saturated cobalt blue, a smooth gradient from electric cobalt (#1F5BFF) in the center to deep midnight navy (#071338) at the edges, with a soft circular glow behind the phone and a gentle vignette.

LIGHTING: large softbox key light from the upper left, a strong rim light from behind on the right that traces the metal edges with a clean bright line, and a long specular highlight running down the aluminum side.

STYLE: hyper-realistic advertising photography, shot on a medium-format camera with a 100mm lens at f/8, razor-sharp across the whole device, 8K detail, rich and vivid colors, high saturation, deep contrast, clean highlights, physically accurate reflections, premium tech-campaign look. True-to-life product proportions and thickness, exact lens count and placement, fine anodized-aluminum micro-texture on the frame, realistic glass reflections, accurate logo shape and position.

AVOID: text, letters, numbers, words, any logo other than the single Apple logo, deformed or melted Apple logo, logo off-center, two logos, logo on the camera plateau, brand names, watermark, screen visible, front of the phone, hands, people, a second phone, extra or missing lenses, warped or melted geometry, cartoon, illustration, plastic CGI look, motion blur, dust, fingerprints, scratches, cluttered background, props.
```

## 3 · iPhone 17 — Lavanda

```
Ultra-premium commercial product photograph of ONE single smartphone, seen from the back, in a professional photo studio.

PRODUCT: a 6.3-inch smartphone with a flat aluminum frame in soft lavender and a matte frosted-glass back in the same lavender color. In the top-left corner of the back is a vertical pill-shaped raised camera bump, glass with a lavender tint, holding two circular camera lenses stacked vertically, with dark glass and thin polished rings. A small round flash sits beside the pill, to its right. Clean flat back, softly rounded corners. Exactly in the center of the back is a single Apple logo (the apple silhouette with a bite taken out of its right side and a single leaf on top), about 14% of the phone width, in a glossy mirror-polished finish that contrasts subtly with the matte glass, perfectly symmetrical, crisp-edged and undistorted.

POSE AND COMPOSITION: three-quarter rear view, the phone standing upright and rotated about 20 degrees to the left, tilted back slightly, floating just above the floor with a soft contact shadow beneath it. The phone is centered and fills about 65% of the frame height, with generous empty space on every side.

BACKGROUND: seamless studio infinity sweep in saturated violet, a smooth gradient from vivid lilac (#9B6BFF) in the center to deep royal purple (#2E0F7A) at the edges, with a soft circular glow behind the phone and a gentle vignette.

LIGHTING: large softbox key light from the upper left, a strong rim light from behind on the right that traces the aluminum frame with a clean bright line, and a soft gradient reflection across the frosted glass.

STYLE: hyper-realistic advertising photography, shot on a medium-format camera with a 100mm lens at f/8, razor-sharp across the whole device, 8K detail, rich and vivid colors, high saturation, deep contrast, clean highlights, physically accurate reflections, premium tech-campaign look. True-to-life product proportions and thickness, exact lens count and placement, fine anodized-aluminum micro-texture on the frame, realistic glass reflections, accurate logo shape and position.

AVOID: text, letters, numbers, words, any logo other than the single Apple logo, deformed or melted Apple logo, logo off-center, two logos, logo on the camera plateau, brand names, watermark, screen visible, front of the phone, hands, people, a second phone, three lenses, square camera bump, full-width camera bar, warped or melted geometry, cartoon, illustration, plastic CGI look, motion blur, dust, fingerprints, cluttered background, props.
```

## 4 · iPhone 16 — Verde-acinzentado

```
Ultra-premium commercial product photograph of ONE single smartphone, seen from the back, in a professional photo studio.

PRODUCT: a 6.1-inch smartphone with a color-infused matte glass back in a rich teal green and a flat aluminum frame in matching teal. In the top-left corner of the back is a vertical pill-shaped raised camera bump holding two circular camera lenses stacked vertically, with dark glass and thin polished rings. A small round flash sits outside the pill, to its right. On the right side of the frame, a small flush sapphire-glass button is visible. Softly rounded corners, clean flat back. Exactly in the center of the back is a single Apple logo (the apple silhouette with a bite taken out of its right side and a single leaf on top), about 14% of the phone width, in a glossy mirror-polished finish that contrasts subtly with the matte glass, perfectly symmetrical, crisp-edged and undistorted.

POSE AND COMPOSITION: three-quarter rear view, the phone standing upright and rotated about 20 degrees to the left, tilted back slightly, so the right side of the frame and its button are visible. The phone floats just above the floor with a soft contact shadow beneath it. It is centered and fills about 65% of the frame height, with generous empty space on every side.

BACKGROUND: seamless studio infinity sweep in saturated teal, a smooth gradient from bright aqua-teal (#00C2B8) in the center to deep petrol green (#003B3E) at the edges, with a soft circular glow behind the phone and a gentle vignette.

LIGHTING: large softbox key light from the upper left, a strong rim light from behind on the right that traces the aluminum frame with a clean bright line, and a soft gradient reflection across the matte glass.

STYLE: hyper-realistic advertising photography, shot on a medium-format camera with a 100mm lens at f/8, razor-sharp across the whole device, 8K detail, rich and vivid colors, high saturation, deep contrast, clean highlights, physically accurate reflections, premium tech-campaign look. True-to-life product proportions and thickness, exact lens count and placement, fine anodized-aluminum micro-texture on the frame, realistic glass reflections, accurate logo shape and position.

AVOID: text, letters, numbers, words, any logo other than the single Apple logo, deformed or melted Apple logo, logo off-center, two logos, logo on the camera plateau, brand names, watermark, screen visible, front of the phone, hands, people, a second phone, three lenses, square camera bump, full-width camera bar, warped or melted geometry, cartoon, illustration, plastic CGI look, motion blur, dust, fingerprints, cluttered background, props.
```

## 5 · iPhone 15 — Rosa

```
Ultra-premium commercial product photograph of ONE single smartphone, seen from the back, in a professional photo studio.

PRODUCT: a 6.1-inch smartphone with a color-infused frosted-glass back in soft pastel pink and contoured aluminum edges in matching pink. In the top-left corner of the back is a square raised camera bump with rounded corners, in pink glass, holding two circular camera lenses arranged diagonally (one top-left, one bottom-right), with dark glass and thin polished pink rings. A small round flash sits in the top-right corner of the square bump. Gently curved edges, softly rounded corners. Exactly in the center of the back is a single Apple logo (the apple silhouette with a bite taken out of its right side and a single leaf on top), about 14% of the phone width, in a glossy mirror-polished finish that contrasts subtly with the matte glass, perfectly symmetrical, crisp-edged and undistorted.

POSE AND COMPOSITION: three-quarter rear view, the phone standing upright and rotated about 20 degrees to the left, tilted back slightly, floating just above the floor with a soft contact shadow beneath it. The phone is centered and fills about 65% of the frame height, with generous empty space on every side.

BACKGROUND: seamless studio infinity sweep in saturated pink, a smooth gradient from hot pink (#FF4FA0) in the center to deep magenta (#8C0A4B) at the edges, with a soft circular glow behind the phone and a gentle vignette. The phone stays a soft pastel pink, clearly lighter than the background.

LIGHTING: large softbox key light from the upper left, a strong rim light from behind on the right that traces the curved aluminum edge with a clean bright line, and a soft gradient reflection across the frosted glass.

STYLE: hyper-realistic advertising photography, shot on a medium-format camera with a 100mm lens at f/8, razor-sharp across the whole device, 8K detail, rich and vivid colors, high saturation, deep contrast, clean highlights, physically accurate reflections, premium tech-campaign look. True-to-life product proportions and thickness, exact lens count and placement, fine anodized-aluminum micro-texture on the frame, realistic glass reflections, accurate logo shape and position.

AVOID: text, letters, numbers, words, any logo other than the single Apple logo, deformed or melted Apple logo, logo off-center, two logos, logo on the camera plateau, brand names, watermark, screen visible, front of the phone, hands, people, a second phone, three lenses, lenses stacked vertically, pill-shaped camera bump, full-width camera bar, warped or melted geometry, cartoon, illustration, plastic CGI look, motion blur, dust, fingerprints, cluttered background, props.
```

---

## Checklist para escolher cada imagem

- [ ] Só **um** aparelho, visto de trás, sem tela aparecendo
- [ ] Câmera certa: **17 Pro / Pro Max** = barra de câmera na largura toda + 3 lentes em triângulo ·
      **17 e 16** = cápsula vertical + 2 lentes empilhadas · **15** = quadrado + 2 lentes na diagonal
- [ ] **Logo da Apple**: uma só, nítida e sem deformação (mordida do lado direito, folha em cima). Fica no centro
      da traseira no 17, no 16 e no 15, e no painel de vidro abaixo da barra de câmera no 17 Pro e no 17 Pro Max
- [ ] Nenhum texto, nome, número ou marca d'água
- [ ] A cor do aparelho é a da tabela e se destaca do fundo
- [ ] Mesmo ângulo (≈ 20° para a esquerda) e mesmo tamanho nas cinco, para formar uma série
- [ ] Bordas e lentes nítidas, sem partes "derretidas"
- [ ] Sobra espaço em volta do aparelho, para o corte 3:2 do card não pegar o celular

Se uma imagem sair quase boa, gere de novo e acrescente ao fim do prompt o defeito a corrigir, por exemplo:
`Make sure there are exactly two camera lenses stacked vertically.`

## Se a logo sair deformada

Não gere a imagem inteira de novo. Corrija só a logo:

- **Midjourney**: *Vary (Region)*, selecione só a logo e use o prompt
  `a single crisp Apple logo, apple silhouette with a bite on the right side and a leaf on top, glossy mirror finish, perfectly symmetrical`.
- **Photoshop / Firefly**: *Preenchimento generativo* na área da logo, com o mesmo texto acima.
- **ChatGPT / Gemini**: envie a imagem e peça
  `Keep everything identical, only fix the Apple logo on the back: one crisp, symmetrical Apple logo with the bite on the right and the leaf on top, glossy finish, same color as the phone.`

