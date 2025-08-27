// bubbles-bg.js — performant, 30fps capped, fără gradient, culori random per bulă
(() => {
  // =========================
  // 🔧 CONFIG — EDITEZI AICI
  // =========================
  const CONFIG = {
    // Mărimi & densitate
    sizeMin: 6, // un pic mai mari
    sizeMax: 14,
    count: 18, // mai dese decât înainte

    // Mișcare (px/s)
    speedMin: 3, // tot lent, dar vizibil
    speedMax: 8,

    // Schimbarea direcției
    turnMin: 0.02,
    turnMax: 0.08,

    // Aspect
    blur: 0, // margini clare
    opacity: 0.5, // mai vizibile, dar nu agresive

    // Culori pastel mai saturate (albăstrui și turcoaz)
    paletteMode: "perBubble",
    paletteGroups: [
      ["#ffffff", "#add9faff"], // alb + bleu
      ["#92e0f8ff", "#87c5ffff"], // turcoaz deschis + bleu saturat
    ],

    // Scalare globală
    scaleAll: 1.1, // ușor mai mari în general

    // Performanță
    dpiScale: 1,
    fps: 30,
    autoThrottle: true,
  };

  // =========================

  // --- utilitare culori
  const toColor = (c, aDefault = CONFIG.opacity) => {
    if (typeof c === "string") {
      const hex = c.replace("#", "");
      const full =
        hex.length === 3
          ? hex
              .split("")
              .map((x) => x + x)
              .join("")
          : hex.slice(0, 6);
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${aDefault})`;
    } else if (typeof c === "object" && c) {
      const { h = 200, s = 70, l = 80, a = aDefault } = c;
      return `hsla(${h} ${s}% ${l}% / ${a})`;
    }
    return `rgba(191,228,255,${aDefault})`;
  };
  const pickPaletteGroup = (groups) => {
    const g = groups[Math.floor(Math.random() * groups.length)];
    return g.map(toColor);
  };

  // --- helpers
  const rand = (min, max) => Math.random() * (max - min) + min;
  const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function initBubbleBackground(section, cfg = CONFIG) {
    if (!(section instanceof Element)) return;
    if (section.querySelector(":scope > .bubble-canvas")) return;

    const paletteSection = pickPaletteGroup(cfg.paletteGroups);
    const flatColors = cfg.paletteGroups.flatMap((g) => g.map(toColor));
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // canvas sub conținut
    const canvas = document.createElement("canvas");
    canvas.className = "bubble-canvas";
    section.prepend(canvas);
    const ctx = canvas.getContext("2d", { alpha: true });

    const state = { bubbles: [], w: 0, h: 0, running: false, inView: false };

    function resize() {
      const r = section.getBoundingClientRect();
      state.w = Math.max(1, Math.floor(r.width));
      state.h = Math.max(1, Math.floor(r.height));
      canvas.width = Math.floor(state.w * cfg.dpiScale);
      canvas.height = Math.floor(state.h * cfg.dpiScale);
      canvas.style.width = state.w + "px";
      canvas.style.height = state.h + "px";
      ctx.setTransform(cfg.dpiScale, 0, 0, cfg.dpiScale, 0, 0);
      if (state.bubbles.length === 0) spawnBubbles();
    }

    function spawnBubbles() {
      const target = cfg.count;
      const min = Math.min(cfg.sizeMin, cfg.sizeMax);
      const max = Math.max(cfg.sizeMin, cfg.sizeMax);

      for (let i = 0; i < target; i++) {
        let size = min === max ? min : rand(min, max);
        size = Math.min(max, Math.max(min, size)) * cfg.scaleAll;

        let color;
        if (cfg.paletteMode === "perBubble") {
          color = choice(pickPaletteGroup(cfg.paletteGroups));
        } else if (cfg.paletteMode === "perBubbleAll") {
          color = choice(flatColors);
        } else {
          color = choice(paletteSection);
        }

        const ang = rand(0, Math.PI * 2);
        const spd = rand(cfg.speedMin, cfg.speedMax);

        state.bubbles.push({
          x: rand(0, state.w),
          y: rand(0, state.h),
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          speed: spd,
          size,
          color,
          turn: rand(cfg.turnMin, cfg.turnMax) * (Math.random() < 0.5 ? -1 : 1),
          jitter: rand(0.1, 0.5),
        });
      }
    }

    function drawBubble(b) {
      const r = b.size / 2;
      if (cfg.blur > 0) ctx.filter = `blur(${cfg.blur}px)`;
      ctx.fillStyle = b.color; // culoare plată (fără gradient)
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
      if (cfg.blur > 0) ctx.filter = "none";
    }

    // ---- loop cu FPS limitat + auto-throttle
    const baseInterval = 1000 / cfg.fps; // ~33.33ms la 30fps
    let lastTime = performance.now();
    let acc = 0;
    let dynamicInterval = baseInterval;

    function animate(now) {
      if (!state.running) return;

      const elapsed = now - lastTime;
      lastTime = now;
      acc += elapsed;

      if (acc < dynamicInterval) {
        requestAnimationFrame(animate);
        return;
      }

      const dt = acc / 1000; // secunde cumulate
      acc = 0;

      const t0 = performance.now();

      ctx.clearRect(0, 0, state.w, state.h);

      if (!prefersReduced && state.inView) {
        for (const b of state.bubbles) {
          const ang = Math.atan2(b.vy, b.vx) + b.turn * dt + (Math.random() - 0.5) * 0.04 * b.jitter;
          b.vx = Math.cos(ang) * b.speed;
          b.vy = Math.sin(ang) * b.speed;
          b.x += b.vx * dt;
          b.y += b.vy * dt;

          const s = b.size;
          if (b.x < -s) b.x = state.w + s;
          if (b.x > state.w + s) b.x = -s;
          if (b.y < -s) b.y = state.h + s;
          if (b.y > state.h + s) b.y = -s;
        }
      }

      for (const b of state.bubbles) drawBubble(b);

      const drawCost = performance.now() - t0;

      if (cfg.autoThrottle) {
        // dacă desenul e „scump”, creștem intervalul (scădem fps), dar nu sub ~20fps
        if (drawCost > 12 && dynamicInterval < 1000 / 20) {
          dynamicInterval *= 1.15;
        } else if (drawCost < 6 && dynamicInterval > baseInterval) {
          dynamicInterval = Math.max(baseInterval, dynamicInterval * 0.9);
        }
      }

      requestAnimationFrame(animate);
    }

    // start
    resize();
    state.running = true;

    // rulează doar când secțiunea e vizibilă
    state.inView = true;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.target === section) state.inView = e.isIntersecting;
          });
        },
        { threshold: 0.01 }
      );
      io.observe(section);
    }

    requestAnimationFrame((t) => {
      lastTime = t;
      requestAnimationFrame(animate);
    });

    // observers
    if ("ResizeObserver" in window) {
      new ResizeObserver(resize).observe(section);
    } else {
      window.addEventListener("resize", resize);
    }
    document.addEventListener("visibilitychange", () => {
      state.running = !document.hidden;
      if (state.running) {
        lastTime = performance.now();
        requestAnimationFrame(animate);
      }
    });
  }

  // Auto-init: toate elementele cu data-bubbles
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-bubbles]").forEach((el) => initBubbleBackground(el, CONFIG));
  });

  // opțional: expune pentru inițializări manuale
  window.initBubbleBackground = initBubbleBackground;
})();
