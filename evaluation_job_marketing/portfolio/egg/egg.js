// Easter eggs : logo animé de SIGMA Clermont
(() => {
const frames = window.SIGMA_FRAMES; if (!frames) return;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const W = 150, H = 240;
const imgs = frames.map(s => { const i = new Image(); i.src = 'data:image/svg+xml,' + encodeURIComponent(s); return i; });

// Une seule animation source (26 images par seconde), recopiée là où il faut
const src = document.createElement('canvas'); src.width = W; src.height = H;
const sctx = src.getContext('2d');
const users = new Set(); let f = 0, timer = null;
const tick = () => {
  const img = imgs[f];
  if (img.complete) { sctx.clearRect(0, 0, W, H); sctx.drawImage(img, 0, H - img.height); } // calée sur le bas
  f = (f + 1) % imgs.length;
  users.forEach(fn => fn());
};
const start = fn => { if (users.has(fn)) return; users.add(fn); if (!timer) timer = setInterval(tick, 1000 / 26); };
const stop = fn => { users.delete(fn); if (!users.size) { clearInterval(timer); timer = null; } };
const tint = (c, color) => { const x = c.getContext('2d'); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); x.drawImage(src, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, W, H); };
const green = getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#2f7258';
const tween = (from, to, ms, ease, step, done) => {
  const t0 = performance.now();
  const go = t => { const k = Math.min(1, (t - t0) / ms), v = from + (to - from) * ease(k); step(v); if (k < 1) requestAnimationFrame(go); else done && done(); };
  requestAnimationFrame(go);
};
const easeOut = k => 1 - Math.pow(1 - k, 3);
const easeInOut = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const spring = k => 1 - Math.cos(k * Math.PI * 2.5) * Math.exp(-5 * k);

// ── 1. Cinq clics rapides sur la photo : elle se retourne et laisse place au logo animé en 3D
const photo = document.querySelector('.hero .photo');
if (photo) {
  const back = photo.querySelector('.face.back');
  back.innerHTML = '<div class="egg-wrap"><div class="egg-rot"></div></div>';
  const rot = back.querySelector('.egg-rot');
  const layers = [...Array(10)].map((_, k) => {
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    c.style.transform = 'translateZ(' + (k - 4.5) * 1.2 + 'px)';
    c.couleur = k === 0 || k === 9 ? green : '#8fb3a2';
    rot.append(c); return c;
  });
  const draw = () => layers.forEach(c => tint(c, c.couleur));
  let clicks = [], on = false, back_t = null;
  const flip = v => {
    on = v; clearTimeout(back_t);
    photo.classList.toggle('egg', v);
    photo.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' });
    if (v) { start(draw); back_t = setTimeout(() => flip(false), 2000); }
    else setTimeout(() => { if (!on) stop(draw); }, 900);
  };
  let lockUntil = 0;
  photo.addEventListener('click', () => {
    if (performance.now() < lockUntil) return;
    if (on) return flip(false);
    const now = performance.now(); clicks = clicks.filter(t => now - t < 1500); clicks.push(now);
    if (!reduce) photo.animate([{ transform: 'scale(.93)' }, { transform: 'scale(1)' }], { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' });
    if (clicks.length >= 5) { clicks = []; lockUntil = performance.now() + 2000; flip(true); }
  });
}

// ── 2. On insiste en bas de page : la page se soulève comme un « tirer pour rafraîchir »,
//       un espace s'ouvre sous le pied de page, la roue le traverse, puis la page se repose.
if (reduce) return;
const pull = document.createElement('div'); pull.className = 'egg-pull'; pull.setAttribute('aria-hidden', 'true');
pull.innerHTML = '<canvas width="' + W + '" height="' + H + '"></canvas>';
document.body.append(pull);
const wheel = pull.querySelector('canvas');
const drawWheel = () => tint(wheel, green);
const MAX = 170, TRIG = 720, STEP = 60;
let notBottomAt = 0;
let h = 0, acc = 0, phase = 'idle', idle = null;
const bottomGap = () => document.documentElement.scrollHeight - innerHeight - scrollY;
const atBottom = () => bottomGap() <= 2 + h;
const setH = v => { h = v; pull.style.height = v + 'px'; scrollTo(0, document.documentElement.scrollHeight); };
const rubber = a => MAX * 0.75 * (1 - Math.exp(-a / 500));          // résistance croissante
function release() {
  if (phase !== 'pulling') return;
  phase = 'settling';
  tween(h, 0, 450, easeOut, setH, () => { phase = 'idle'; acc = 0; wheel.style.transform = ''; stop(drawWheel); });
}
function launch() {
  phase = 'rolling'; clearTimeout(idle); start(drawWheel);
  tween(h, MAX, 380, spring, setH, () => {
    wheel.classList.add('go');
    wheel.addEventListener('animationend', () => {
      wheel.classList.remove('go'); wheel.style.transform = '';
      tween(h, 0, 900, easeInOut, setH, () => { phase = 'idle'; acc = 0; stop(drawWheel); });
    }, { once: true });
  });
}
function pullBy(d) {
  if (phase === 'rolling' || phase === 'settling') return;
  if (phase === 'idle' && (d <= 0 || !atBottom())) return;
  phase = 'pulling'; start(drawWheel);
  acc = Math.max(0, acc + d);
  setH(rubber(acc));
  wheel.style.transform = 'translateX(' + (-Math.min(1, acc / TRIG) * 70) + 'px)';  // la roue pointe le bout du nez
  if (acc >= TRIG) return launch();
  if (acc === 0) return release();
  clearTimeout(idle); idle = setTimeout(release, 450);
}
addEventListener('wheel', e => {
    if (phase === 'idle' && !atBottom()) return;
  pullBy(Math.max(-STEP, Math.min(STEP, e.deltaY)));
}, { passive: true });
let ty = null;
addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
addEventListener('touchmove', e => { if (ty === null) return; const y = e.touches[0].clientY; pullBy(Math.max(-STEP, Math.min(STEP, (ty - y) * 1.2))); ty = y; }, { passive: true });
addEventListener('touchend', () => { ty = null; if (phase === 'pulling') release(); }, { passive: true });
})();
