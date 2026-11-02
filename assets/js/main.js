/* REXX Limeira — interações. Sem dependências. */
(() => {
  "use strict";

  const cfg = window.REXX_CONFIG || {};
  const doc = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => reducedMq.matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  doc.classList.add("js");

  /* =============== Dados da loja / WhatsApp =============== */
  const contact = cfg.contact || {};
  const store = cfg.store || {};
  const waNumber = contact.whatsapp;
  const waLink = (msg) => (waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}` : "#contato");
  const wireWa = (a, msg) => {
    a.href = waLink(msg);
    if (waNumber) { a.target = "_blank"; a.rel = "noopener"; }
  };
  $$("[data-wa]").forEach((a) => wireWa(a, a.dataset.wa));

  const pending = '<span class="pending">A confirmar</span>';
  const mapsUrl = store.mapsUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(store.address ? `REXX ${store.address}` : "REXX Limeira SP")}`;
  const fills = {
    address: store.address ? esc(store.address) : pending,
    hours: store.hours && store.hours.length ? store.hours.map(esc).join("<br>") : pending,
    whatsapp: waNumber
      ? `<a href="${waLink("Olá, REXX! Vim pelo site.")}" target="_blank" rel="noopener">${esc(contact.whatsappLabel || waNumber)}</a>`
      : pending,
    instagram: contact.instagram
      ? `<a href="${esc(contact.instagram)}" target="_blank" rel="noopener">${esc(contact.instagramHandle || "Instagram")}</a>`
      : pending,
    legal: [store.legalName, store.cnpj && `CNPJ ${store.cnpj}`].filter(Boolean).map(esc).join(" · "),
  };
  $$("[data-fill]").forEach((el) => {
    const v = fills[el.dataset.fill];
    if (v) el.innerHTML = v; else el.remove();
  });
  $$('[data-fill-href="maps"]').forEach((a) => (a.href = mapsUrl));
  if (contact.instagram) $$('[data-fill-href="instagram"]').forEach((a) => (a.href = contact.instagram));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  const photo = $("[data-fill-photo]");
  if (photo && store.photo) { $("img", photo).src = store.photo; photo.hidden = false; }

  /* =============== Intro =============== */
  const intro = $(".intro");
  const hero = $(".hero");
  let seen = false;
  try { seen = sessionStorage.getItem("rexx-intro") === "1"; sessionStorage.setItem("rexx-intro", "1"); } catch (e) {}
  // letras do REXX gigante entram uma a uma
  $$(".hero__letters").forEach((w) => {
    w.innerHTML = [...w.textContent].map((c, i) => `<span class="hl" style="--li:${i}">${esc(c)}</span>`).join("");
  });
  const startHero = () => {
    hero.classList.add("is-loaded");
    $$(".hero__title .line").forEach((l) => l.classList.add("is-in"));
  };
  if (!intro || seen || reduced()) {
    if (intro) intro.classList.add("is-gone");
    requestAnimationFrame(startHero);
  } else {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      intro.classList.add("is-out");
      document.body.style.overflow = "";
      setTimeout(startHero, 250);
      setTimeout(() => intro.classList.add("is-gone"), 1100);
    }, 1350);
  }

  /* =============== Hero: leque de iPhones segue o ponteiro =============== */
  if (finePointer) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const ease = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      hero.style.setProperty("--hx", cx.toFixed(4)); hero.style.setProperty("--hy", cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(ease) : 0;
    };
    hero.addEventListener("pointermove", (e) => {
      if (reduced()) return;
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(ease);
    });
    hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(ease); });
  }
  // Clicar num iPhone do hero abre o modelo em "Veja de perto"
  $$("[data-hero-model]").forEach((a) => a.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("rexx:show-model", { detail: a.dataset.heroModel }));
  }));

  /* =============== Split de palavras nos títulos =============== */
  $$(".split").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "w";
            w.innerHTML = `<span style="--i:${i++}">${esc(part)}</span>`;
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    el.setAttribute("aria-label", el.textContent.trim());
    walk(el);
    $$(".w", el).forEach((w) => w.setAttribute("aria-hidden", "true"));
  });

  /* =============== Menu mobile =============== */
  const nav = $(".nav");
  const toggle = $(".nav__toggle");
  const menu = $("#menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { nav.dataset.theme = "dark"; nav.classList.remove("is-hidden"); } else updateNav();
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); } });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* =============== Nav: tema, auto-hide e link ativo =============== */
  const themed = $$("main [data-theme], footer[data-theme], .band");
  const navLinks = $$(".nav__links a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));
  let lastY = window.scrollY;
  function updateNav() {
    if (!menu.hidden) return;
    const y = nav.offsetHeight / 2;
    for (const s of themed) {
      const r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { nav.dataset.theme = s.dataset.theme || "orange"; break; }
    }
    const sy = window.scrollY;
    if (Math.abs(sy - lastY) > 6) {
      nav.classList.toggle("is-hidden", sy > lastY && sy > window.innerHeight * 0.8);
      lastY = sy;
    }
    const mid = window.innerHeight * 0.4;
    navLinks.forEach((a, i) => {
      const s = sections[i];
      if (!s) return;
      const r = s.getBoundingClientRect();
      a.classList.toggle("is-active", r.top <= mid && r.bottom > mid);
    });
  }

  /* =============== Reveal on scroll =============== */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }),
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  $$(".reveal").forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 5) * 0.08}s`);
    io.observe(el);
  });
  $$(".split, .wipe, .loja__title .line, .insta__title .line, .step").forEach((el) => io.observe(el));

  /* =============== Botões magnéticos =============== */
  if (finePointer) {
    $$("[data-magnetic]").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        if (reduced()) return;
        const r = b.getBoundingClientRect();
        b.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * 14}px`);
        b.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
      });
      b.addEventListener("pointerleave", () => { b.style.removeProperty("--mx"); b.style.removeProperty("--my"); });
    });
  }


  /* =============== Seções que só aparecem com dados reais =============== */
  const tList = cfg.testimonials || [];
  if (tList.length) {
    $('[data-list="testimonials"]').innerHTML = tList.map((t) =>
      `<figure class="review reveal"><blockquote>${esc(t.text)}</blockquote><figcaption><b>${esc(t.name || "")}</b>${t.detail ? ` · ${esc(t.detail)}` : ""}</figcaption></figure>`).join("");
    $('[data-config-section="testimonials"]').hidden = false;
    $$('[data-list="testimonials"] .reveal').forEach((el) => io.observe(el));
  }
  const sList = cfg.services || [];
  if (sList.length) {
    $('[data-list="services"]').innerHTML = sList.map((x, i) =>
      `<li class="service reveal"><span>${String(i + 1).padStart(2, "0")}</span><h3>${esc(x.title)}</h3><p>${esc(x.text || "")}</p></li>`).join("");
    $('[data-config-section="services"]').hidden = false;
    $$('[data-list="services"] .reveal').forEach((el) => io.observe(el));
  }
  // Numeração das seções segue a ordem real da página (pula as escondidas)
  {
    let n = 1;
    $$("main > section:not([hidden])").forEach((sec) => {
      if (sec.classList.contains("hero")) return;
      const num = $(".spec > span:first-child", sec);
      if (num) num.textContent = String(++n).padStart(2, "0");
    });
  }

  /* =============== Mapa otimizado: capa leve, iframe só quando chega perto =============== */
  const mapQ = encodeURIComponent(store.mapsQuery || store.address || "REXX Limeira SP");
  const routes = {
    google: `https://www.google.com/maps/dir/?api=1&destination=${mapQ}`,
    waze: `https://waze.com/ul?q=${mapQ}&navigate=yes`,
    apple: `https://maps.apple.com/?daddr=${mapQ}`,
  };
  $$("[data-route]").forEach((a) => (a.href = routes[a.dataset.route]));
  $$('[data-fill-href="maps"]').forEach((a) => (a.href = routes.google));
  const mapEl = $("[data-map]");
  if (mapEl) {
    const frame = $("iframe", mapEl);
    frame.addEventListener("load", () => { if (frame.src) mapEl.classList.add("is-ready"); });
    new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return;
      mapEl.classList.add("is-seen");
      frame.src = `https://www.google.com/maps?q=${mapQ}&z=16&hl=pt-BR&output=embed`;
      o.disconnect();
    }, { rootMargin: "300px 0px" }).observe(mapEl);
  }
  const copyBtn = $("[data-copy-address]");
  if (copyBtn) {
    if (!store.address) copyBtn.remove();
    else copyBtn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(store.address); copyBtn.textContent = "Endereço copiado ✓"; copyBtn.classList.add("is-done"); }
      catch (x) { copyBtn.textContent = store.address; }
      setTimeout(() => { copyBtn.textContent = "Copiar endereço"; copyBtn.classList.remove("is-done"); }, 2500);
    });
  }
  $$("[data-fill-text]").forEach((el) => { const v = contact[el.dataset.fillText]; if (v) el.textContent = v; });

  /* =============== Instagram real dentro do celular (widget oficial de incorporação) =============== */
  const igPhone = $("[data-ig-phone]");
  if (igPhone && contact.instagram) {
    const user = (contact.instagram.match(/instagram\.com\/([^/?#]+)/) || [])[1];
    const igFrame = $(".ig-embed", igPhone);
    const note = $("[data-ig-note]");
    if (user) {
      let ok = false;
      igFrame.addEventListener("load", () => {
        if (!igFrame.src) return;
        ok = true; igPhone.classList.add("has-embed");
        if (note) note.textContent = "Perfil real do Instagram · role dentro do celular";
      });
      new IntersectionObserver(([e], o) => {
        if (!e.isIntersecting) return;
        o.disconnect();
        igFrame.src = `https://www.instagram.com/${user}/embed/`;
        setTimeout(() => { if (!ok && note) note.textContent = "Não deu para carregar o perfil agora — toque em “Seguir no Instagram”"; }, 9000);
      }, { rootMargin: "400px 0px" }).observe(igPhone);
    }
  }

  /* =============== Mascote: o dino neon da REXX =============== */
  // [EDITAR] Para usar a arte oficial, troque este SVG pelo arquivo do mascote.
  let dinoN = 0;
  const dinoSVG = () => {
    const id = `dg${++dinoN}`;
    const f = `pathLength="1" filter="url(#${id})"`;
    const g = `class="dn dl" ${f}`, v = `class="dv dl" ${f}`, p = `class="dp dl" ${f}`;
    const w = `class="dw dl" pathLength="1"`;
    // Releitura do letreiro neon da loja: T-rex de boca aberta, olhos grandes,
    // língua rosa e camiseta roxa com "REXX".
    return `<svg viewBox="0 0 440 440" aria-hidden="true" focusable="false">
      <defs><filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <g class="dino__all">
        <g class="dino__body">
          <g class="dino__head">
            <path ${g} d="M112 170 C 104 150, 116 126, 146 116 C 172 106, 196 72, 240 58 C 290 42, 338 62, 350 104 C 360 140, 352 176, 338 204"/>
            <path ${g} d="M112 170 Q 200 184 296 204"/>
            <path ${w} d="M128 173 l 8 13 l 8 -11 l 8 13 l 8 -11 l 8 13 l 8 -10 l 8 13 l 8 -10 l 8 13 l 8 -9 l 8 13 l 8 -9 l 8 12 l 8 -8 l 8 12 l 8 -7 l 8 11 l 8 -6"/>
            <path ${g} d="M138 132 q 8 -6 16 0 M164 124 q 6 -5 12 0"/>
            <circle ${g} cx="232" cy="96" r="24"/><circle class="dino__pupil" data-ex="232" data-ey="96" data-er="10" cx="238" cy="94" r="9"/>
            <circle ${g} cx="300" cy="90" r="16"/><circle class="dino__pupil" data-ex="300" data-ey="90" data-er="7" cx="304" cy="88" r="6"/>
            <path ${g} d="M206 64 q 26 -16 52 -4 M282 64 q 18 -8 34 2"/>
            <g class="dino__jaw">
              <path ${g} d="M296 204 Q 214 214 140 236 C 128 240, 126 252, 138 256 C 196 274, 262 268, 310 238"/>
              <path ${w} d="M150 236 l 7 -12 l 8 10 l 7 -12 l 8 10 l 7 -12 l 8 10 l 7 -12 l 8 9 l 7 -11 l 8 9 l 7 -10 l 8 8 l 7 -9 l 8 7"/>
              <path ${p} d="M250 232 C 214 244, 170 252, 112 248 C 98 247, 96 236, 108 234 C 140 230, 176 230, 208 230"/>
            </g>
          </g>
          <path ${g} d="M338 204 C 336 236, 330 262, 322 286 M310 238 C 300 256, 280 272, 262 286"/>
          <path ${v} d="M246 286 Q 292 304 338 286 L 384 304 L 404 352 L 368 362 L 362 342 L 360 424 L 222 424 L 220 342 L 212 362 L 176 352 L 198 304 Z"/>
          <path ${v} d="M246 286 Q 292 316 338 286"/>
          <text class="dino__shirt" x="291" y="392" text-anchor="middle" filter="url(#${id})">REXX</text>
          <g class="dino__arm dino__arm--l"><path ${g} d="M190 356 C 180 380, 186 404, 212 410 M212 410 l 10 -6 M212 410 l 8 8 M212 410 l -2 12"/></g>
          <g class="dino__arm dino__arm--r"><path ${g} d="M390 356 C 402 382, 394 404, 368 410 M368 410 l -10 -6 M368 410 l -8 8 M368 410 l 2 12"/></g>
        </g>
      </g>
    </svg>`;
  };
  const dinos = $$("[data-dino]");
  dinos.forEach((el) => {
    el.innerHTML = dinoSVG();
    el.classList.add("dino");
    // traços acendem em sequência
    $$(".dl", el).forEach((pth, i) => pth.style.setProperty("--d", `${(i * 0.07).toFixed(2)}s`));
  });
  // acende quando aparece na tela
  const dinoIO = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-on"); dinoIO.unobserve(e.target); }
  }), { threshold: 0.35 });
  dinos.forEach((d) => dinoIO.observe(d));
  // olho segue o ponteiro
  if (finePointer && dinos.length) {
    window.addEventListener("pointermove", (e) => {
      if (reduced()) return;
      dinos.forEach((d) => {
        const r = d.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        $$(".dino__pupil", d).forEach((pupil) => {
          const ex0 = +pupil.dataset.ex, ey0 = +pupil.dataset.ey, er = +pupil.dataset.er;
          const ex = r.left + r.width * (ex0 / 440), ey = r.top + r.height * (ey0 / 440);
          const a = Math.atan2(e.clientY - ey, e.clientX - ex);
          pupil.setAttribute("cx", (ex0 + Math.cos(a) * er).toFixed(1));
          pupil.setAttribute("cy", (ey0 + Math.sin(a) * er).toFixed(1));
        });
      });
    }, { passive: true });
  }
  // clique: o dino ruge
  const roar = (wall) => {
    if (!wall || wall.classList.contains("is-roar")) return;
    wall.classList.add("is-roar");
    setTimeout(() => wall.classList.remove("is-roar"), 1600);
  };
  $$("[data-dino-wall]").forEach((wall) => {
    const sign = $("[data-dino]", wall);
    sign.addEventListener("click", () => roar(wall));
    sign.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); roar(wall); } });
  });

  /* =============== Sobre: frase que acende palavra por palavra com o scroll =============== */
  const statement = $("[data-scrub]");
  let swords = [];
  if (statement) {
    const hl = /^(conversa|explica|escolha|Limeira)/i;
    statement.setAttribute("aria-label", statement.textContent.trim());
    statement.innerHTML = statement.textContent.trim().split(/\s+/).map((w) =>
      `<span class="sw${hl.test(w) ? " is-hl" : ""}" aria-hidden="true">${esc(w)}</span>`).join(" ");
    swords = $$(".sw", statement);
  }
  function scrubStatement(vh) {
    if (!swords.length) return;
    const r = statement.getBoundingClientRect();
    if (r.top > vh || r.bottom < 0) return;
    const k = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
    const on = Math.round(k * swords.length);
    swords.forEach((w, i) => w.classList.toggle("is-on", i < on));
  }

  /* =============== Dicas: luz laranja segue o ponteiro no card =============== */
  if (finePointer) {
    $$(".tip").forEach((t) => t.addEventListener("pointermove", (e) => {
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));
  }

  /* =============== Fale com a REXX: formulário que monta a mensagem =============== */
  const cform = $(".cform");
  if (cform) {
    const sel = $('[data-list="contact-models"]', cform);
    (cfg.models || []).forEach((m) => sel.insertAdjacentHTML("beforeend", `<option>${esc(m.name)}</option>`));
    const preview = $('[data-out="cform-preview"]');
    const err = $(".cform__error", cform);
    const nome = cform.elements.nome;
    const compose = () => {
      const f = cform.elements;
      const parts = [`Olá, REXX! Meu nome é ${f.nome.value.trim() || "…"}.`, `${f.assunto.value}${f.modelo.value ? ` — ${f.modelo.value}` : ""}.`];
      if (f.mensagem.value.trim()) parts.push(f.mensagem.value.trim());
      parts.push(`Prefiro resposta no período da ${f.horario.value}.`);
      return parts.join("\n");
    };
    const update = () => { preview.textContent = compose(); };
    cform.addEventListener("input", update);
    cform.addEventListener("change", update);
    update();
    cform.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!nome.value.trim()) { err.hidden = false; nome.classList.add("is-invalid"); nome.focus(); return; }
      err.hidden = true; nome.classList.remove("is-invalid");
      const msg = compose();
      if (waNumber) { window.open(waLink(msg), "_blank", "noopener"); return; }
      // Sem WhatsApp configurado: copia a mensagem e abre o Instagram da loja
      let copied = false;
      try { await navigator.clipboard.writeText(msg); copied = true; } catch (x) {}
      let note = $(".cform__note", cform);
      if (!note) { note = document.createElement("p"); note.className = "cform__note"; cform.appendChild(note); }
      note.textContent = copied
        ? "Mensagem copiada! O WhatsApp da loja ainda vai ser publicado aqui — por enquanto, cole a mensagem no Direct do Instagram."
        : "O WhatsApp da loja ainda vai ser publicado aqui — por enquanto, envie a mensagem pelo Direct do Instagram.";
      if (contact.instagram) window.open(contact.instagram, "_blank", "noopener");
    });
  }

  /* =============== Botão flutuante: aparece depois do hero, some perto do contato =============== */
  const waFloat = $(".wa-float");
  const quietZones = $$("#contato, #loja, .footer");
  function updateFloat(vh) {
    if (!waFloat) return;
    const past = window.scrollY > vh * 0.9;
    const quiet = quietZones.some((z) => { const r = z.getBoundingClientRect(); return r.top < vh * 0.8 && r.bottom > 0; });
    waFloat.classList.toggle("is-shown", past && !quiet && menu.hidden);
  }

  /* =============== Movimento ligado ao scroll (um único rAF) =============== */
  const plate = $("[data-parallax]");
  const progress = $(".progress");
  const cine = $(".cine");
  const words = $$(".cine__word");
  if (words.length) words[words.length - 1].classList.add("is-last");
  const compare = $(".compare");
  const track = $(".compare__track");
  const hint = $(".compare__hint");
  const footer = $(".footer");
  const lojaSec = $(".loja");
  const instaSec = $(".insta");
  const band = $(".band__track");
  let ticking = false;

  /* Comparar: fixa a seção e converte rolagem vertical em horizontal (desktop) */
  const pinMq = window.matchMedia("(min-width: 861px)");
  let overflow = 0;
  function layoutCompare() {
    if (!compare || !track) return;
    let pin = pinMq.matches && !reduced();
    compare.classList.toggle("is-pinned", pin);
    track.style.setProperty("--tx", "0px");
    // Só fixa se título + cards + dica couberem na altura da tela; senão os cards
    // cobririam o texto. Nesse caso cai para a rolagem horizontal nativa.
    if (pin) {
      const pinEl = $(".compare__pin");
      const cs = getComputedStyle(pinEl);
      const head = $(".compare__head");
      const vp = $(".compare__viewport");
      const need = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + head.offsetHeight +
        parseFloat(getComputedStyle(vp).marginTop) + track.offsetHeight + hint.offsetHeight + 24;
      if (need > window.innerHeight) { pin = false; compare.classList.remove("is-pinned"); }
    }
    compare.classList.toggle("is-native", !pin);
    if (hint) hint.lastChild.textContent = pin ? "Role para comparar" : (finePointer ? "Arraste para comparar" : "Deslize para comparar");
    if (!pin) { compare.style.height = ""; overflow = 0; return; }
    overflow = Math.max(0, track.scrollWidth - window.innerWidth);
    compare.style.height = `${window.innerHeight + overflow}px`;
  }

  /* Guia: cards empilhados — cada card entra por baixo e empurra o anterior para trás */
  const guideSec = $(".guide");
  const scards = $$(".scard");
  const gdots = $$(".guide__dots li");
  let guidePinned = false;
  function layoutGuide() {
    if (!guideSec || !scards.length) return;
    guidePinned = !reduced();
    guideSec.classList.toggle("is-pinned", guidePinned);
    if (guidePinned) {
      const grid = $(".guide__grid");
      const cs = getComputedStyle($(".guide__pin"));
      const need = grid.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      if (need > window.innerHeight) { guidePinned = false; guideSec.classList.remove("is-pinned"); }
    }
    guideSec.style.height = guidePinned ? `${window.innerHeight * (1 + (scards.length - 1) * 0.9 + 0.3)}px` : "";
    if (!guidePinned) scards.forEach((c) => { c.style.removeProperty("--e"); c.style.removeProperty("--b"); });
  }
  const easeOut = (k) => 1 - Math.pow(1 - k, 3);

  function frame() {
    ticking = false;
    updateNav();
    const sy = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.setProperty("--sp", max > 0 ? (sy / max).toFixed(4) : 0);
    updateFloat(vh);
    if (reduced()) return;
    scrubStatement(vh);

    const hr = hero.getBoundingClientRect();
    if (hr.bottom > 0) {
      hero.style.setProperty("--p", clamp(-hr.top / hr.height, 0, 1).toFixed(4));
    }

    const cr = cine.getBoundingClientRect();
    if (cr.top < vh && cr.bottom > 0) {
      const total = cr.height - vh;
      const cp = total > 0 ? clamp(-cr.top / total, 0, 1) : 1;
      cine.style.setProperty("--cp", cp.toFixed(4));
      const step = Math.floor(cp * (words.length + 1) - 0.15);
      words.forEach((w, i) => w.classList.toggle("is-on", i <= step));
      cine.classList.toggle("is-done", cp > 0.78);
    }

    if (overflow > 0) {
      const r = compare.getBoundingClientRect();
      const p = clamp(-r.top / overflow, 0, 1);
      track.style.setProperty("--tx", `${(-p * overflow).toFixed(1)}px`);
      hint.style.setProperty("--hp", p.toFixed(3));
    }

    if (guidePinned) {
      const r = guideSec.getBoundingClientRect();
      const total = r.height - vh;
      const n = scards.length;
      // termina um pouco antes do fim para o último card "assentar"
      const t = clamp((-r.top / total) / 0.85, 0, 1) * (n - 1);
      scards.forEach((c, i) => {
        const e = i === 0 ? 1 : easeOut(clamp(t - (i - 1), 0, 1));
        const b = i === n - 1 ? 0 : clamp(t - i, 0, 1);
        c.style.setProperty("--e", e.toFixed(4));
        c.style.setProperty("--b", b.toFixed(4));
      });
      const active = Math.round(t);
      gdots.forEach((d, i) => d.classList.toggle("is-active", i === active));
    }

    // Loja: círculo que se abre ao entrar na seção
    if (lojaSec) {
      const r = lojaSec.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) lojaSec.style.setProperty("--rv", clamp((vh - r.top) / (vh * 0.85), 0.06, 1).toFixed(4));
    }
    // Instagram: celular endireita e texto vazado desliza com o scroll
    if (instaSec) {
      const r = instaSec.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) instaSec.style.setProperty("--ip", clamp((vh - r.top) / (vh * 0.95), 0, 1.4).toFixed(4));
    }

    const fr = footer.getBoundingClientRect();
    if (fr.top < vh) footer.style.setProperty("--fp", clamp((vh - fr.top) / (fr.height * 0.9), 0, 1).toFixed(3));
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { layoutCompare(); layoutGuide(); onScroll(); });

  /* Faixa laranja: deriva contínua + aceleração e inclinação pela velocidade do scroll */
  if (band) {
    let x = 0, v = 0, prevY = window.scrollY, visible = true, half = 0;
    const measure = () => (half = band.scrollWidth / 2);
    measure();
    window.addEventListener("resize", measure);
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(band);
    const loop = () => {
      const y = window.scrollY;
      const dy = y - prevY; prevY = y;
      v += (dy * 0.25 - v) * 0.12;
      if (visible && !reduced()) {
        x -= 0.6 + Math.abs(v);
        if (half && -x >= half) x += half;
        band.style.setProperty("--bx", `${x.toFixed(1)}px`);
        band.style.setProperty("--bs", `${clamp(-v * 0.6, -10, 10).toFixed(2)}deg`);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* Aparelho desenhado em CSS (usado quando não há foto) */
  function miniDevice(m) {
    return `<div class="device" data-lenses="${m.lenses || 2}" style="--c:${m.colors[0].hex}" aria-hidden="true"><div class="device__body"><div class="device__plateau"><i class="lens lens--a"></i><i class="lens lens--b"></i><i class="lens lens--c"></i><i class="flash"></i></div><div class="device__sheen"></div></div></div>`;
  }

  /* =============== Configurador =============== */
  const models = cfg.models || [];
  const form = $(".config__panel");
  if (models.length && form) {
    const stage = $(".config__stage");
    const device = $(".device");
    const cphoto = document.createElement("img");
    cphoto.className = "config__photo"; cphoto.decoding = "async";
    stage.appendChild(cphoto);
    const lists = { models: $('[data-list="models"]', form), colors: $('[data-list="colors"]', form), storage: $('[data-list="storage"]', form) };
    const out = (k) => $$(`[data-out="${k}"]`);
    const cta = $("[data-config-cta]");
    const state = { model: models[0], color: models[0].colors[0], storage: models[0].storage[0] };

    const radio = (name, value, checked, label, attrs = "") => {
      const id = `${name}-${value}`.replace(/\W+/g, "-");
      return `<div class="opt"><input type="radio" name="${name}" id="${id}" value="${esc(value)}"${checked ? " checked" : ""}><label for="${id}" ${attrs}>${label}</label></div>`;
    };
    const renderModels = () => {
      lists.models.innerHTML = models.map((m) => radio("model", m.id, m === state.model,
        `<span class="model__name">${esc(m.name)}</span><span class="model__tag">${esc(m.tag || "")}</span>`, 'class="model"')).join("");
    };
    const renderOptions = () => {
      const m = state.model;
      lists.colors.innerHTML = m.colors.map((c, i) => radio("color", `${m.id}-${i}`, c === state.color,
        `<span class="sr">${esc(c.name)}</span>`, `class="swatch" style="--sw:${c.hex}" title="${esc(c.name)}"`)).join("");
      lists.storage.innerHTML = m.storage.map((s) => radio("storage", `${m.id}-${s}`, s === state.storage, esc(s), 'class="chip"')).join("");
    };
    const paint = (animate) => {
      const { model: m, color: c, storage: s } = state;
      stage.style.setProperty("--c", c.hex);
      device.style.setProperty("--c", c.hex);
      // foto real da cor escolhida, se houver; senão o aparelho desenhado
      const ph = (m.photos || []).find((p) => p.color === c.name);
      if (ph) {
        if (cphoto.getAttribute("src") !== ph.image) {
          cphoto.classList.remove("is-in");
          cphoto.onload = () => cphoto.classList.add("is-in");
          cphoto.src = ph.image; cphoto.alt = `${m.name} ${c.name}`;
          if (cphoto.complete) cphoto.classList.add("is-in");
        }
      }
      stage.classList.toggle("has-photo", !!ph);
      device.dataset.lenses = String(m.lenses || 2);
      out("model").forEach((el) => (el.textContent = m.name));
      out("color").forEach((el) => (el.textContent = c.name));
      out("color-legend").forEach((el) => (el.textContent = c.name));
      out("sentence").forEach((el) => (el.innerHTML = `<b>${esc(m.name)}</b>, ${esc(s)}, na cor <b>${esc(c.name)}</b>.`));
      wireWa(cta, `Olá, REXX! Vim pelo site e gostaria de consultar a disponibilidade do ${m.name}, ${s}, na cor ${c.name}.`);
      if (animate && !reduced()) {
        device.classList.remove("is-swap"); void device.offsetWidth; device.classList.add("is-swap");
        clearTimeout(paint.t); paint.t = setTimeout(() => device.classList.remove("is-swap"), 900);
      }
    };

    form.addEventListener("change", (e) => {
      const t = e.target;
      if (t.name === "model") {
        const m = models.find((x) => x.id === t.value);
        state.color = m.colors.find((c) => c.name === state.color.name) || m.colors[0];
        state.storage = m.storage.includes(state.storage) ? state.storage : m.storage[0];
        state.model = m;
        renderOptions();
      } else if (t.name === "color") {
        state.color = state.model.colors[Number(t.value.split("-").pop())];
      } else if (t.name === "storage") {
        state.storage = state.model.storage.find((s) => `${state.model.id}-${s}` === t.value);
      }
      paint(true);
    });
    form.addEventListener("submit", (e) => e.preventDefault());

    // Inclinação 3D do aparelho seguindo o ponteiro
    if (finePointer) {
      stage.addEventListener("pointermove", (e) => {
        if (reduced()) return;
        const r = stage.getBoundingClientRect();
        stage.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 24}deg`);
        stage.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 18}deg`);
      });
      stage.addEventListener("pointerleave", () => { stage.style.removeProperty("--rx"); stage.style.removeProperty("--ry"); });
    }

    renderModels(); renderOptions(); paint(false);

    /* Comparar: cards gerados a partir da mesma configuração */
    if (track) {
      track.innerHTML = models.map((m, i) => {
        const sp = m.specs || {};
        const n = String(i + 1).padStart(2, "0");
        const glow = m.glow || m.colors[0].hex;
        return `<li class="card" style="--i:${i};--glow:${glow}">
          <div class="card__stage" data-model="${esc(m.id)}">
            ${m.image ? `<img class="card__phone" src="${esc(m.image)}" alt="${esc(m.name)}" decoding="async">` : miniDevice(m)}
            <i class="card__floor" aria-hidden="true"></i>
          </div>
          <div class="card__body">
            <div class="card__top"><span>${n}</span><b>${esc(m.tag || "")}</b></div>
            <h3>${esc(m.name)}</h3>
            ${sp.screen ? `<p class="card__screen">${esc(sp.screen)}<small>Tela</small></p>` : ""}
            <dl>
              ${sp.chip ? `<div><dt>Chip</dt><dd>${esc(sp.chip)}</dd></div>` : ""}
              ${sp.camera ? `<div><dt>Câmeras</dt><dd>${esc(sp.camera)}</dd></div>` : ""}
              <div><dt>Capacidade</dt><dd>${esc(m.storage[0])} – ${esc(m.storage[m.storage.length - 1])}</dd></div>
            </dl>
            ${sp.note ? `<p class="card__note">${esc(sp.note)}</p>` : ""}
            <div class="card__dots" aria-label="${m.colors.length} cores">${m.colors.map((c) => `<i style="background:${c.hex}" title="${esc(c.name)}"></i>`).join("")}</div>
            <a class="card__link" data-pick="${esc(m.id)}" href="#linha">Escolher este</a>
          </div>
        </li>`;
      }).join("");
      // Sem o arquivo da foto, o palco desenha o aparelho na cor da linha
      $$(".card__phone", track).forEach((img) => {
        img.addEventListener("error", () => {
          const m = models.find((x) => x.id === img.closest(".card__stage").dataset.model);
          img.outerHTML = miniDevice(m);
        }, { once: true });
      });
      new IntersectionObserver(([e], o) => { if (e.isIntersecting) { compare.classList.add("is-in"); o.disconnect(); } }, { threshold: 0.15 }).observe(compare);
      // Modo nativo: arrastar com o mouse e barra de dica acompanhando
      track.addEventListener("scroll", () => {
        const m = track.scrollWidth - track.clientWidth;
        if (compare.classList.contains("is-native")) hint.style.setProperty("--hp", m > 0 ? (track.scrollLeft / m).toFixed(3) : 0);
      }, { passive: true });
      if (finePointer) {
        let down = null;
        track.addEventListener("pointerdown", (e) => {
          if (!compare.classList.contains("is-native") || e.button !== 0) return;
          down = { x: e.clientX, left: track.scrollLeft, moved: false };
        });
        window.addEventListener("pointermove", (e) => {
          if (!down) return;
          const dx = e.clientX - down.x;
          if (Math.abs(dx) > 4) { down.moved = true; track.classList.add("is-drag"); }
          if (down.moved) track.scrollLeft = down.left - dx;
        });
        window.addEventListener("pointerup", () => {
          if (down && down.moved) setTimeout(() => track.classList.remove("is-drag"), 0);
          down = null;
        });
      }
      track.addEventListener("click", (e) => {
        const a = e.target.closest("[data-pick]");
        if (!a) return;
        const input = $(`#model-${a.dataset.pick.replace(/\W+/g, "-")}`);
        if (input && !input.checked) { input.checked = true; input.dispatchEvent(new Event("change", { bubbles: true })); }
      });
    }
  }

  /* =============== Veja de perto: cena com palco, luz, modelos e cores =============== */
  const scene = $("[data-scene]");
  const showcase = (cfg.models || []).filter((m) => m.photos && m.photos.length);
  if (scene && showcase.length) {
    const tabsEl = $('[data-list="feature-tabs"]');
    const colorsEl = $('[data-list="feature-colors"]');
    const phonesEl = $('[data-list="feature-phones"]');
    const info = $(".feature__info");
    const fx = (k) => $(`[data-feature="${k}"]`);
    const fcta = $("[data-feature-cta]");
    const hexOf = (m, color) => (m.colors.find((c) => c.name === color) || {}).hex || "#888";

    tabsEl.innerHTML = showcase.map((m, i) =>
      `<button class="ftab" role="tab" id="ftab-${i}" aria-selected="false" aria-controls="feature-stage" tabindex="-1">${esc(m.name)}<i aria-hidden="true"></i></button>`).join("");
    phonesEl.id = "feature-stage";
    phonesEl.setAttribute("role", "tabpanel");
    // todas as fotos ficam no palco; só a ativa aparece
    phonesEl.innerHTML = showcase.map((m, i) => m.photos.map((ph, j) =>
      `<div class="scene__phone" data-m="${i}" data-p="${j}"><img src="${esc(ph.image)}" alt="${esc(m.name)} ${esc(ph.color)}" decoding="async" loading="${i === 0 ? "eager" : "lazy"}"></div>`).join("")).join("");
    const tabs = $$(".ftab", tabsEl);
    const phoneEl = (i, j) => $(`.scene__phone[data-m="${i}"][data-p="${j}"]`, phonesEl);
    let curM = -1, curP = -1, lit = false, userPicked = false, hovering = false, visible = false, t0 = 0;
    const AUTO = 5500;

    const show = (i, j = 0, focus) => {
      if (i === curM && j === curP) return;
      const m = showcase[i], ph = m.photos[j], sp = m.specs || {};
      if (curM >= 0) {
        const prev = phoneEl(curM, curP);
        prev.classList.remove("is-active"); prev.classList.add("is-leaving");
        setTimeout(() => prev.classList.remove("is-leaving"), 900);
      }
      phoneEl(i, j).classList.add("is-active");
      if (i !== curM) {
        tabs.forEach((t, k) => { t.setAttribute("aria-selected", String(i === k)); t.tabIndex = i === k ? 0 : -1; t.style.setProperty("--ap", 0); });
        if (focus) tabs[i].focus();
        phonesEl.setAttribute("aria-labelledby", tabs[i].id);
        colorsEl.innerHTML = m.photos.map((p, k) =>
          `<button class="fcolor" style="--sw:${hexOf(m, p.color)}" aria-pressed="false" data-p="${k}" title="${esc(p.color)}"><span class="sr">${esc(p.color)}</span></button>`).join("");
        fx("name").textContent = m.name;
        fx("meta").textContent = [sp.chip, sp.screen && `Tela ${sp.screen}`, sp.camera].filter(Boolean).join(" · ");
        fx("index").textContent = String(i + 1).padStart(2, "0");
        info.classList.remove("is-swap"); void info.offsetWidth; info.classList.add("is-swap");
      }
      $$(".fcolor", colorsEl).forEach((b, k) => b.setAttribute("aria-pressed", String(k === j)));
      scene.style.setProperty("--glow", ph.glow || m.glow || "#ff6a1a");
      fx("color").textContent = ph.color;
      wireWa(fcta, `Olá, REXX! Vim pelo site e gostaria de consultar o ${m.name} na cor ${ph.color}.`);
      curM = i; curP = j; t0 = performance.now();
    };

    tabs.forEach((t, i) => {
      t.addEventListener("click", () => { userPicked = true; show(i, 0); });
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { userPicked = true; show((curM + 1) % tabs.length, 0, true); }
        if (e.key === "ArrowLeft") { userPicked = true; show((curM - 1 + tabs.length) % tabs.length, 0, true); }
      });
    });
    colorsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".fcolor");
      if (b) { userPicked = true; show(curM, Number(b.dataset.p)); }
    });

    // Vindo de um clique no hero: abre direto o modelo escolhido
    let pending = 0;
    document.addEventListener("rexx:show-model", (e) => {
      const i = showcase.findIndex((m) => m.id === e.detail);
      if (i < 0) return;
      userPicked = true;
      if (lit) show(i, 0); else pending = i;
    });

    // Luz acende quando a cena entra na tela
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !lit) {
        lit = true; scene.classList.add("is-lit");
        setTimeout(() => show(pending, 0), reduced() ? 0 : 450);
      }
      t0 = performance.now();
    }, { threshold: 0.35 }).observe(scene);

    // Troca automática de modelo, com barrinha de progresso na aba ativa
    const tick = (now) => {
      if (lit && visible && !userPicked && !hovering && !reduced() && curM >= 0) {
        const k = (now - t0) / AUTO;
        tabs[curM].style.setProperty("--ap", Math.min(k, 1).toFixed(3));
        if (k >= 1) show((curM + 1) % showcase.length, 0);
      } else if (curM >= 0) {
        t0 = now - (parseFloat(tabs[curM].style.getPropertyValue("--ap")) || 0) * AUTO;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Luz e aparelho seguem o ponteiro
    scene.addEventListener("pointerenter", () => (hovering = true));
    scene.addEventListener("pointermove", (e) => {
      if (reduced()) return;
      const r = scene.getBoundingClientRect();
      scene.style.setProperty("--sx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      scene.style.setProperty("--sy", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    scene.addEventListener("pointerleave", () => { hovering = false; scene.style.setProperty("--sx", 0); scene.style.setProperty("--sy", 0); });
  }

  /* FAQ: fecha os outros ao abrir um */
  $$(".qa").forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) $$(".qa").forEach((o) => { if (o !== d) o.open = false; });
  }));

  layoutCompare();
  layoutGuide();
  frame();
  // fontes mudam as alturas medidas
  if (document.fonts) document.fonts.ready.then(() => { layoutCompare(); layoutGuide(); onScroll(); });
})();
