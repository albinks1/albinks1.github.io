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
const start = fn => { users.add(fn); if (!timer) timer = setInterval(tick, 1000 / 26); };
const stop = fn => { users.delete(fn); if (!users.size) { clearInterval(timer); timer = null; } };
const tint = (c, color) => { const x = c.getContext('2d'); x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, W, H); x.drawImage(src, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, W, H); };
const green = getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#1d5c45';

// 1. On insiste en bas de page : la roue traverse l'écran de droite à gauche
let rolling = false;
function roll() {
  if (rolling || reduce) return; rolling = true;
  const c = document.createElement('canvas'); c.width = W; c.height = H; c.className = 'egg-roll';
  const draw = () => tint(c, green);
  start(draw); document.body.append(c);
  c.addEventListener('animationend', () => { stop(draw); c.remove(); rolling = false; });
}
const atBottom = () => innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
let acc = 0, last = 0;
addEventListener('wheel', e => {
  if (e.deltaY <= 0 || !atBottom()) { acc = 0; return; }
  const now = performance.now(); if (now - last > 600) acc = 0; last = now;
  acc += e.deltaY; if (acc > 1400) { acc = 0; roll(); }
}, { passive: true });
let ty = null, tacc = 0;
addEventListener('touchstart', e => { ty = e.touches[0].clientY; tacc = 0; }, { passive: true });
addEventListener('touchmove', e => {
  if (ty === null || !atBottom()) return;
  const y = e.touches[0].clientY; tacc += ty - y; ty = y;
  if (tacc > 260) { tacc = -1e9; roll(); }
}, { passive: true });

// 2. Cinq clics rapides sur la photo : le logo tourne sur lui-même en 3D
const photo = document.querySelector('.hero .photo'); let clicks = [], open = false;
photo && photo.addEventListener('click', () => {
  const now = performance.now(); clicks = clicks.filter(t => now - t < 1500); clicks.push(now);
  if (!reduce) photo.animate([{ transform: 'scale(.94)' }, { transform: 'scale(1)' }], { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' });
  if (clicks.length >= 5) { clicks = []; spin(); }
});
function spin() {
  if (open) return; open = true;
  const ov = document.createElement('div'); ov.className = 'egg-spin';
  ov.innerHTML = '<div class="egg-wrap"><div class="egg-rot"></div></div><p>SIGMA Clermont</p>';
  const rot = ov.querySelector('.egg-rot');
  // dix calques décalés en profondeur : faces vert sapin, tranche plus claire
  const layers = [...Array(10)].map((_, k) => {
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    c.style.transform = 'translateZ(' + (k - 4.5) * 1.6 + 'px)';
    c.couleur = k === 0 || k === 9 ? green : '#8fb3a2';
    rot.append(c); return c;
  });
  const draw = () => layers.forEach(c => tint(c, c.couleur));
  start(draw); document.body.append(ov); requestAnimationFrame(() => ov.classList.add('on'));
  const close = () => { ov.classList.remove('on'); removeEventListener('keydown', esc); setTimeout(() => { stop(draw); ov.remove(); open = false; }, 400); };
  const esc = e => { if (e.key === 'Escape') close(); };
  ov.addEventListener('click', close); addEventListener('keydown', esc);
}
})();
