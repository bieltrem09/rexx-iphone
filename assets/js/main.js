/* REXX Limeira — interações. Sem dependências. */
(() => {
  "use strict";

  const cfg = window.REXX_CONFIG || {};
  const doc = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  doc.classList.add("js");

  /* ---------------- WhatsApp ---------------- */
  const waNumber = cfg.contact && cfg.contact.whatsapp;
  const waLink = (msg) =>
    waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}` : "#loja";

  const wireWa = (a, msg) => {
    a.href = waLink(msg);
    if (waNumber) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  };
  $$("[data-wa]").forEach((a) => wireWa(a, a.dataset.wa));

  /* ---------------- Store facts ---------------- */
  const pending = '<span class="pending">A confirmar</span>';
  const store = cfg.store || {};
  const contact = cfg.contact || {};
  const mapsUrl =
    store.mapsUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(
      store.address ? `REXX ${store.address}` : "REXX Limeira SP"
    )}`;

  const fills = {
    address: store.address ? escapeHtml(store.address) : pending,
    hours: store.hours && store.hours.length ? store.hours.map(escapeHtml).join("<br>") : pending,
    whatsapp: waNumber
      ? `<a href="${waLink("Olá, REXX! Vim pelo site.")}" target="_blank" rel="noopener">${escapeHtml(
          contact.whatsappLabel || waNumber
        )}</a>`
      : pending,
    instagram: contact.instagram
      ? `<a href="${contact.instagram}" target="_blank" rel="noopener">${escapeHtml(
          contact.instagramHandle || "Instagram"
        )}</a>`
      : pending,
    legal: [store.legalName, store.cnpj && `CNPJ ${store.cnpj}`].filter(Boolean).map(escapeHtml).join(" · "),
  };
  $$("[data-fill]").forEach((el) => {
    const v = fills[el.dataset.fill];
    if (v) el.innerHTML = v;
    else el.remove();
  });
  $$('[data-fill-href="maps"]').forEach((a) => (a.href = mapsUrl));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------------- Mobile menu ---------------- */
  const toggle = $(".nav__toggle");
  const menu = $("#menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) nav.dataset.theme = "dark";
    else updateNavTheme();
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------------- Nav theme follows the section under it ---------------- */
  const nav = $(".nav");
  const themed = $$("main [data-theme], footer[data-theme]");
  function updateNavTheme() {
    if (!menu.hidden) return;
    const y = nav.offsetHeight / 2;
    for (const s of themed) {
      const r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { nav.dataset.theme = s.dataset.theme; return; }
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  // Small stagger for siblings revealed together
  $$(".reveal").forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 4) * 0.07}s`);
    io.observe(el);
  });
  requestAnimationFrame(() => $(".hero").classList.add("is-loaded"));

  /* ---------------- Scroll-linked motion (one rAF loop) ---------------- */
  const hero = $(".hero");
  const plate = $("[data-parallax]");
  const marquee = $(".marquee__track");
  const cine = $(".cine");
  const words = $$(".cine__word");
  let ticking = false;

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  function frame() {
    ticking = false;
    updateNavTheme();
    if (reduced.matches) return;

    const vh = window.innerHeight;

    // Hero: plate drift + scroll-driven marquee
    const hr = hero.getBoundingClientRect();
    if (hr.bottom > 0) {
      const p = clamp(-hr.top / hr.height, 0, 1);
      plate.style.setProperty("--p", p.toFixed(4));
      marquee.style.setProperty("--m", (window.scrollY * 0.35).toFixed(1));
    }

    // Cinematic: progress through the pinned section
    const cr = cine.getBoundingClientRect();
    if (cr.top < vh && cr.bottom > 0) {
      const total = cr.height - vh;
      const cp = total > 0 ? clamp(-cr.top / total, 0, 1) : 1;
      cine.style.setProperty("--cp", cp.toFixed(4));
      const step = Math.floor(cp * (words.length + 1) - 0.15);
      words.forEach((w, i) => w.classList.toggle("is-on", i <= step));
      cine.classList.toggle("is-done", cp > 0.78);
    }
  }

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  frame();

  /* ---------------- Configurador ---------------- */
  const models = cfg.models || [];
  const form = $(".config__panel");
  if (!models.length || !form) return;

  const stage = $(".config__stage");
  const device = $(".device");
  const lists = {
    models: $('[data-list="models"]', form),
    colors: $('[data-list="colors"]', form),
    storage: $('[data-list="storage"]', form),
  };
  const out = (k) => $$(`[data-out="${k}"]`);
  const cta = $("[data-config-cta]");
  const state = { model: models[0], color: models[0].colors[0], storage: models[0].storage[0] };

  function radio(name, value, checked, label, extraAttrs = "") {
    const id = `${name}-${value}`.replace(/\W+/g, "-");
    return `<div class="opt"><input type="radio" name="${name}" id="${id}" value="${escapeHtml(value)}"${checked ? " checked" : ""}>` +
      `<label for="${id}" ${extraAttrs}>${label}</label></div>`;
  }

  function renderModels() {
    lists.models.innerHTML = models
      .map((m) => radio("model", m.id, m === state.model,
        `<span class="model__name">${escapeHtml(m.name)}</span><span class="model__tag">${escapeHtml(m.tag || "")}</span>`,
        'class="model"'))
      .join("");
  }

  function renderOptions() {
    const m = state.model;
    lists.colors.innerHTML = m.colors
      .map((c, i) => radio("color", `${m.id}-${i}`, c === state.color,
        `<span class="sr">${escapeHtml(c.name)}</span>`,
        `class="swatch" style="--sw:${c.hex}" title="${escapeHtml(c.name)}" aria-label="${escapeHtml(c.name)}"`))
      .join("");
    lists.storage.innerHTML = m.storage
      .map((s) => radio("storage", `${m.id}-${s}`, s === state.storage, escapeHtml(s), 'class="chip"'))
      .join("");
  }

  function paint(animate) {
    const { model: m, color: c, storage: s } = state;
    stage.style.setProperty("--c", c.hex);
    device.style.setProperty("--c", c.hex);
    device.dataset.lenses = String(m.lenses || 2);
    out("model").forEach((el) => (el.textContent = m.name));
    out("color").forEach((el) => (el.textContent = c.name));
    out("color-legend").forEach((el) => (el.textContent = c.name));
    out("sentence").forEach((el) =>
      (el.innerHTML = `<b>${escapeHtml(m.name)}</b>, ${escapeHtml(s)}, na cor <b>${escapeHtml(c.name)}</b>.`));
    wireWa(cta, `Olá, REXX! Vim pelo site e gostaria de consultar a disponibilidade do ${m.name}, ${s}, na cor ${c.name}.`);

    if (animate && !reduced.matches) {
      device.classList.remove("is-swap");
      void device.offsetWidth; // restart
      device.classList.add("is-swap");
      clearTimeout(paint.t);
      paint.t = setTimeout(() => device.classList.remove("is-swap"), 700);
    }
  }

  form.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "model") {
      const m = models.find((x) => x.id === t.value);
      // Keep the same color/storage name when the new model offers it
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

  renderModels();
  renderOptions();
  paint(false);
})();
