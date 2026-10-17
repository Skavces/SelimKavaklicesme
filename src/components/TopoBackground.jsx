import { useEffect, useRef } from "react";

// Eş yükselti (topografik) arka plan: simplex noise ile üretilen bir arazi
// üzerinde marching squares ile çizgiler çıkarılır. İmleç altında yumuşak
// bir tepe oluşur, kaydırma arazi desenini hafifçe kaydırır. Tüm hareket yaylarla
// (dt tabanlı) yumuşatılır; kare hızı ekranın yenileme hızını izler.

const INK = "24, 24, 27"; // brand-800
const MINOR_ALPHA = 0.09;
const MAJOR_ALPHA = 0.2;
const CURSOR_BOOST = 0.08;
const MAJOR_EVERY = 5;
const LEVEL_SPAN = 10; // noise [-1,1] -> seviye aralığı
const NOISE_SCALE = 0.0018;
const DRIFT_SPEED = 0.03; // noise z ekseninde saniyedeki ilerleme
const SCROLL_PARALLAX = 0.15;
const HILL_HEIGHT = 5; // seviye cinsinden
const HILL_RADIUS = 200;
const CURSOR_OMEGA = 9; // imleç yayı (1/s), yüksek = daha sıkı takip
const HILL_OMEGA = 4; // tepe yüksekliğinin açılıp sönme hızı
const SCROLL_OMEGA = 8;
const INTRO_MS = 1600;
const INTRO_FROM = 0.35; // açılışta arazinin başlangıç yüksekliği
const FRAME_BUDGET_MS = 8;

// --- 3D simplex noise (Stefan Gustavson) ---
const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

function createNoise3D(seed = 7) {
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  const F3 = 1 / 3;
  const G3 = 1 / 6;

  return (xin, yin, zin) => {
    const sk = (xin + yin + zin) * F3;
    const i = Math.floor(xin + sk);
    const j = Math.floor(yin + sk);
    const k = Math.floor(zin + sk);
    const t0 = (i + j + k) * G3;
    const x0 = xin - (i - t0);
    const y0 = yin - (j - t0);
    const z0 = zin - (k - t0);

    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;

    const ii = i & 255, jj = j & 255, kk = k & 255;
    const corner = (x, y, z, gi) => {
      let t = 0.6 - x * x - y * y - z * z;
      if (t < 0) return 0;
      t *= t;
      const g = GRAD3[gi];
      return t * t * (g[0] * x + g[1] * y + g[2] * z);
    };

    return 32 * (
      corner(x0, y0, z0, permMod12[ii + perm[jj + perm[kk]]]) +
      corner(x1, y1, z1, permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]]) +
      corner(x2, y2, z2, permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]]) +
      corner(x3, y3, z3, permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]])
    );
  };
}

// Kritik sönümlü yay (implicit entegrasyon, her dt için kararlı).
function stepSpring(s, target, omega, dt) {
  const f = 1 + 2 * dt * omega;
  const hoo = dt * omega * omega;
  const hhoo = dt * hoo;
  const detInv = 1 / (f + hhoo);
  const nx = (f * s.x + dt * s.v + hhoo * target) * detInv;
  const nv = (s.v + hoo * (target - s.x)) * detInv;
  s.x = nx;
  s.v = nv;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function TopoBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const noise = createNoise3D();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cellTiers = coarse ? [20, 24, 28] : [14, 18, 22];

    let tier = 0;
    let cell = cellTiers[tier];
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let raf = 0;
    let resizeTimer = 0;
    let prev = 0;
    let slowFrames = 0;
    let drawMs = 0;

    // Yaylar: imleç konumu, tepe yüksekliği ve scroll paralaksı.
    const px = { x: 0, v: 0 };
    const py = { x: 0, v: 0 };
    const hill = { x: 0, v: 0 };
    const scroll = { x: window.scrollY, v: 0 };
    const pointer = { x: 0, y: 0, inside: false };

    const layoutGrid = () => {
      cell = cellTiers[tier];
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      field = new Float32Array((cols + 1) * (rows + 1));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layoutGrid();
    };

    const sampleField = (time, spanMul, scrollY) => {
      const scrollOffset = scrollY * SCROLL_PARALLAX;
      const z = time * DRIFT_SPEED;
      const amp = HILL_HEIGHT * hill.x;
      const hillActive = amp > 0.002;
      const r2 = HILL_RADIUS * HILL_RADIUS;
      const span = LEVEL_SPAN * spanMul;
      const stride = cols + 1;

      for (let j = 0; j <= rows; j++) {
        const y = j * cell;
        const ny = (y + scrollOffset) * NOISE_SCALE;
        for (let i = 0; i <= cols; i++) {
          const x = i * cell;
          const nx = x * NOISE_SCALE;
          const n =
            (noise(nx, ny, z) + 0.5 * noise(nx * 2.1 + 31.7, ny * 2.1 + 17.3, z * 1.3)) / 1.5;
          let v = n * span;
          if (hillActive) {
            const dx = x - px.x;
            const dy = y - py.x;
            const q = 1 + (dx * dx + dy * dy) / r2;
            v += amp / (q * q);
          }
          field[j * stride + i] = v;
        }
      }
    };

    const draw = (time, spanMul, scrollY) => {
      sampleField(time, spanMul, scrollY);
      ctx.clearRect(0, 0, width, height);

      const minor = new Path2D();
      const major = new Path2D();
      const stride = cols + 1;

      for (let j = 0; j < rows; j++) {
        const y0 = j * cell;
        for (let i = 0; i < cols; i++) {
          const x0 = i * cell;
          const a = field[j * stride + i]; // sol üst
          const b = field[j * stride + i + 1]; // sağ üst
          const c = field[(j + 1) * stride + i + 1]; // sağ alt
          const d = field[(j + 1) * stride + i]; // sol alt

          const lo = Math.min(a, b, c, d);
          const hi = Math.max(a, b, c, d);
          for (let k = Math.floor(lo) + 1; k <= hi; k++) {
            const idx = (a > k ? 8 : 0) | (b > k ? 4 : 0) | (c > k ? 2 : 0) | (d > k ? 1 : 0);
            if (idx === 0 || idx === 15) continue;

            const path = ((k % MAJOR_EVERY) + MAJOR_EVERY) % MAJOR_EVERY === 0 ? major : minor;
            // Kenar kesişimleri (kullanılmayan kenarlar NaN/Infinity olabilir, okunmaz).
            const tx = x0 + (cell * (k - a)) / (b - a);
            const ty = y0;
            const rx = x0 + cell;
            const ry = y0 + (cell * (k - b)) / (c - b);
            const bx = x0 + (cell * (k - d)) / (c - d);
            const by = y0 + cell;
            const lx = x0;
            const ly = y0 + (cell * (k - a)) / (d - a);

            switch (idx) {
              case 1: case 14: path.moveTo(lx, ly); path.lineTo(bx, by); break;
              case 2: case 13: path.moveTo(bx, by); path.lineTo(rx, ry); break;
              case 3: case 12: path.moveTo(lx, ly); path.lineTo(rx, ry); break;
              case 4: case 11: path.moveTo(tx, ty); path.lineTo(rx, ry); break;
              case 5:
                path.moveTo(tx, ty); path.lineTo(rx, ry);
                path.moveTo(lx, ly); path.lineTo(bx, by);
                break;
              case 6: case 9: path.moveTo(tx, ty); path.lineTo(bx, by); break;
              case 7: case 8: path.moveTo(lx, ly); path.lineTo(tx, ty); break;
              case 10:
                path.moveTo(lx, ly); path.lineTo(tx, ty);
                path.moveTo(bx, by); path.lineTo(rx, ry);
                break;
              default: break;
            }
          }
        }
      }

      const styleFor = (alpha) => {
        if (hill.x < 0.001) return `rgba(${INK}, ${alpha})`;
        const g = ctx.createRadialGradient(px.x, py.x, 0, px.x, py.x, HILL_RADIUS * 1.8);
        g.addColorStop(0, `rgba(${INK}, ${alpha + CURSOR_BOOST * Math.min(hill.x, 1)})`);
        g.addColorStop(1, `rgba(${INK}, ${alpha})`);
        return g;
      };

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 1;
      ctx.strokeStyle = styleFor(MINOR_ALPHA);
      ctx.stroke(minor);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = styleFor(MAJOR_ALPHA);
      ctx.stroke(major);
    };

    // Dolu kare süresi bütçeyi aşarsa grid bir kademe seyrekleşir (yalnızca artar).
    const watchBudget = (ms) => {
      drawMs += (ms - drawMs) * 0.1;
      slowFrames = drawMs > FRAME_BUDGET_MS ? slowFrames + 1 : 0;
      if (slowFrames > 30 && tier < cellTiers.length - 1) {
        tier += 1;
        slowFrames = 0;
        drawMs = 0;
        layoutGrid();
      }
    };

    const start = performance.now();

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;

      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      stepSpring(px, pointer.x, CURSOR_OMEGA, dt);
      stepSpring(py, pointer.y, CURSOR_OMEGA, dt);
      stepSpring(hill, pointer.inside ? 1 : 0, HILL_OMEGA, dt);
      stepSpring(scroll, window.scrollY, SCROLL_OMEGA, dt);

      const intro = Math.min((now - start) / INTRO_MS, 1);
      const eased = easeOutCubic(intro);
      if (intro < 1 || canvas.style.opacity !== "1") canvas.style.opacity = String(eased);

      const t0 = performance.now();
      draw((now - start) / 1000, INTRO_FROM + (1 - INTRO_FROM) * eased, scroll.x);
      watchBudget(performance.now() - t0);
    };

    let staticPending = false;
    const drawStatic = () => {
      if (staticPending) return;
      staticPending = true;
      requestAnimationFrame(() => {
        staticPending = false;
        draw(0, 1, window.scrollY);
      });
    };

    const onPointerMove = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!pointer.inside && hill.x < 0.05) {
        // Tepe sönmüşken yeniden girişte konuma oturur, ekran boyunca uçmaz.
        px.x = pointer.x; px.v = 0;
        py.x = pointer.y; py.v = 0;
      }
      pointer.inside = true;
    };
    const onPointerLeave = () => {
      pointer.inside = false;
    };
    const onVisibility = () => {
      prev = performance.now();
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reducedMotion) drawStatic();
      }, 120);
    };

    resize();
    window.addEventListener("resize", onResize);

    if (reducedMotion) {
      canvas.style.opacity = "1";
      drawStatic();
      window.addEventListener("scroll", drawStatic, { passive: true });
    } else {
      prev = performance.now();
      raf = requestAnimationFrame(frame);
      document.addEventListener("visibilitychange", onVisibility);
      if (!coarse) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onPointerLeave);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", drawStatic);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity: 0 }}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
