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
  const waLink = (msg) => (waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}` : "#loja");
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
  $$(".split, .wipe, .loja__title .line, .step").forEach((el) => io.observe(el));

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
  const band = $(".band__track");
  let ticking = false;

  /* Comparar: fixa a seção e converte rolagem vertical em horizontal (desktop) */
  const pinMq = window.matchMedia("(min-width: 861px)");
  let overflow = 0;
  function layoutCompare() {
    if (!compare || !track) return;
    const pin = pinMq.matches && !reduced();
    compare.classList.toggle("is-pinned", pin);
    track.style.setProperty("--tx", "0px");
    if (!pin) { compare.style.height = ""; overflow = 0; return; }
    overflow = Math.max(0, track.scrollWidth - window.innerWidth);
    compare.style.height = `${window.innerHeight + overflow}px`;
  }

  function frame() {
    ticking = false;
    updateNav();
    const sy = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.setProperty("--sp", max > 0 ? (sy / max).toFixed(4) : 0);
    if (reduced()) return;

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

    const fr = footer.getBoundingClientRect();
    if (fr.top < vh) footer.style.setProperty("--fp", clamp((vh - fr.top) / (fr.height * 0.9), 0, 1).toFixed(3));
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { layoutCompare(); onScroll(); });

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

  /* =============== Configurador =============== */
  const models = cfg.models || [];
  const form = $(".config__panel");
  if (models.length && form) {
    const stage = $(".config__stage");
    const device = $(".device");
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
        device.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 24}deg`);
        device.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 18}deg`);
      });
      stage.addEventListener("pointerleave", () => { device.style.removeProperty("--rx"); device.style.removeProperty("--ry"); });
    }

    renderModels(); renderOptions(); paint(false);

    /* Comparar: cards gerados a partir da mesma configuração */
    if (track) {
      track.innerHTML = models.map((m, i) => {
        const sp = m.specs || {};
        const n = String(i + 1).padStart(2, "0");
        return `<li class="card" style="--i:${i}">
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
        </li>`;
      }).join("");
      new IntersectionObserver(([e], o) => { if (e.isIntersecting) { compare.classList.add("is-in"); o.disconnect(); } }, { threshold: 0.15 }).observe(compare);
      track.addEventListener("click", (e) => {
        const a = e.target.closest("[data-pick]");
        if (!a) return;
        const input = $(`#model-${a.dataset.pick.replace(/\W+/g, "-")}`);
        if (input && !input.checked) { input.checked = true; input.dispatchEvent(new Event("change", { bubbles: true })); }
      });
    }
  }

  /* =============== Guia de armazenamento =============== */
  const guide = [
    { num: "128", unit: "GB", meter: "25%", label: "ou 256 GB para ter folga", text: "Mensagens, redes sociais, banco, alguns apps e fotos do dia a dia — com backup no iCloud ligado." },
    { num: "256", unit: "GB", meter: "55%", label: "o ponto ideal para a maioria", text: "Muitas fotos, vídeos em 4K de vez em quando, jogos e aplicativos pesados, sem precisar apagar nada a cada mês." },
    { num: "512", unit: "GB+", meter: "92%", label: "ou 1 TB para gravar em ProRes", text: "Vídeos longos em 4K, edição no próprio celular e arquivos de trabalho. Na linha Pro, gravação em ProRes ocupa muito espaço." },
  ];
  const tabs = $$(".guide__tabs [role=tab]");
  const panel = $(".guide__panel");
  if (tabs.length && panel) {
    const g = (k) => $(`[data-guide="${k}"]`, panel);
    const select = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute("aria-selected", String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      if (focus) tabs[i].focus();
      $(".guide__tabs").style.setProperty("--gi", i);
      panel.setAttribute("aria-labelledby", tabs[i].id);
      panel.style.setProperty("--gm", guide[i].meter);
      g("unit").textContent = guide[i].unit;
      g("label").textContent = guide[i].label;
      g("text").textContent = guide[i].text;
      countTo(g("num"), Number(guide[i].num));
      panel.classList.remove("is-swap"); void panel.offsetWidth; panel.classList.add("is-swap");
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") select((i + 1) % tabs.length, true);
        if (e.key === "ArrowLeft") select((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    panel.style.setProperty("--gm", "0%");
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { select(0); o.disconnect(); } }, { threshold: 0.4 }).observe(panel);
  }
  function countTo(el, to) {
    const from = Number(el.textContent) || 0;
    if (reduced() || from === to) { el.textContent = to; return; }
    const t0 = performance.now(), d = 700;
    const step = (t) => {
      const k = clamp((t - t0) / d, 0, 1);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* FAQ: fecha os outros ao abrir um */
  $$(".qa").forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) $$(".qa").forEach((o) => { if (o !== d) o.open = false; });
  }));

  layoutCompare();
  frame();
})();
