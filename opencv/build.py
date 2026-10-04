import yaml, html, re, unicodedata
e = html.escape
def slug(s): return re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode()).strip('-')
blocs = yaml.safe_load(open('blocs.yaml', encoding='utf-8'))
tags = sorted({t for b in blocs for t in b['tags']})
out = []
for b in blocs:
    i = b.get('id') or slug(b['titre'])
    f = ''.join(f"<li><code>{e(x['sig'])}</code> : {e(x['desc'])}</li>" for x in b['fonctions'])
    out.append(f"""<section id="{i}" data-tags="{' '.join(b['tags'])}">
<h2>{e(b['titre'])}</h2>
<p class="tags">{' '.join(e(t) for t in b['tags'])}</p>
<div class="st"></div>
<p>{e(b['consigne'])}</p>
<details><summary>Solution</summary><pre><code>{e(b['code'].rstrip())}</code></pre></details>
<details><summary>Fonctions</summary><ul>{f}</ul></details>
<div class="btns">Je savais le refaire : <button data-r="0">Non</button><button data-r="1">Avec hésitation</button><button data-r="2">Oui</button></div>
</section>""")
btn = ''.join(f'<button data-t="{t}">{t}</button>' for t in tags)
T = r"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>OpenCV : blocs usuels</title>
<style>
body{font:16px/1.5 system-ui,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;color:#222}
h1{font-size:1.5rem}h2{font-size:1.15rem;margin:0}
section{border-top:1px solid #ddd;padding:1rem 0}
.tags{margin:.2rem 0;color:#777;font-size:.85rem}
input[type=text]{width:100%;padding:.5rem;font-size:1rem;box-sizing:border-box}
button,label.b{margin:.5rem .3rem 0 0;padding:.25rem .7rem;border:1px solid #bbb;background:#fff;color:inherit;cursor:pointer;font-size:.9rem;display:inline-block}
button.on{background:#222;color:#fff}
summary{cursor:pointer;margin:.4rem 0}
pre{background:#f5f5f5;padding:.8rem;overflow-x:auto}
code{font-family:ui-monospace,monospace;font-size:.9rem}
.st{font-size:.85rem;color:#555;margin:.2rem 0 .6rem}
.sq i{display:inline-block;width:.7rem;height:.7rem;border:1px solid #888;margin-right:2px}
.sq i.on{background:#2a7;border-color:#2a7}
#stats{margin:1rem 0 .5rem;font-size:.9rem}
.bar{height:6px;background:#ddd;margin-top:.4rem}.bar div{height:100%;background:#2a7}
.btns{font-size:.9rem;margin-top:.6rem}
@media(prefers-color-scheme:dark){body{background:#161616;color:#ddd}section{border-color:#333}pre{background:#222}.st{color:#aaa}.bar{background:#333}input[type=text],button,label.b{background:#222;color:#ddd;border-color:#444}button.on{background:#ddd;color:#161616}}
</style></head><body>
<h1>OpenCV : blocs usuels</h1>
<div id="stats"></div>
<input id="q" type="text" placeholder="Rechercher (consigne, fonction, tag)">
<div id="tags">%%TAGS%%</div>
<div id="tools"><button id="dueb">À revoir</button><button id="exp">Exporter</button><button id="rst">Réinitialiser</button><label class="b">Importer<input id="imp" type="file" accept=".json" hidden></label></div>
%%BLOCS%%
<script>
const K='opencv-progress',IV=[0,1,3,7,14,30],D=864e5;
let P={};try{P=JSON.parse(localStorage.getItem(K))||{}}catch(x){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(P))}catch(x){}};
const S=[...document.querySelectorAll('section')];
let tag='',dueOnly=false;
const lvl=s=>(P[s.id]||{}).l||0;
const due=s=>{const p=P[s.id];return !p||Date.now()>=p.t+IV[p.l]*D};
const ago=t=>{const d=Math.floor((Date.now()-t)/D);return d<1?"aujourd'hui":d==1?'hier':'il y a '+d+' j'};
function draw(s){const p=P[s.id],l=lvl(s);
s.querySelector('.st').innerHTML='<span class="sq">'+[1,2,3,4,5].map(i=>'<i class="'+(i<=l?'on':'')+'"></i>').join('')+'</span> '+(p?'revu '+ago(p.t)+', '+p.n+' fois':'jamais revu')+(due(s)?' · <b>à revoir</b>':'')}
function stats(){const n=S.length,m=S.filter(s=>lvl(s)>=4).length,d=S.filter(due).length,t=S.reduce((a,s)=>a+lvl(s),0);
document.getElementById('stats').innerHTML=m+' / '+n+' maîtrisés (niveau 4 et plus) · '+d+' à revoir<div class="bar"><div style="width:'+100*t/(5*n)+'%"></div></div>'}
function f(){const q=document.getElementById('q').value.toLowerCase();
S.forEach(s=>s.hidden=!(s.textContent.toLowerCase().includes(q)&&(!tag||s.dataset.tags.split(' ').includes(tag))&&(!dueOnly||due(s))))}
S.forEach(s=>s.querySelector('.btns').onclick=ev=>{const r=ev.target.dataset.r;if(r===undefined)return;
const p=P[s.id]||{l:0,n:0};p.l=r=='0'?0:r=='1'?p.l:Math.min(5,p.l+1);p.n++;p.t=Date.now();P[s.id]=p;save();draw(s);stats();f()});
document.getElementById('q').oninput=f;
document.querySelectorAll('#tags button').forEach(b=>b.onclick=()=>{tag=tag===b.dataset.t?'':b.dataset.t;
document.querySelectorAll('#tags button').forEach(x=>x.classList.toggle('on',x.dataset.t===tag));f()});
document.getElementById('dueb').onclick=ev=>{dueOnly=!dueOnly;ev.target.classList.toggle('on',dueOnly);f()};
document.getElementById('exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(P)],{type:'application/json'}));a.download='opencv-progress.json';a.click()};
document.getElementById('imp').onchange=ev=>{const r=new FileReader();r.onload=()=>{try{P=JSON.parse(r.result);save();S.forEach(draw);stats();f()}catch(x){alert('Fichier invalide')}};r.readAsText(ev.target.files[0])};
document.getElementById('rst').onclick=()=>{if(confirm('Effacer toute la progression ?')){P={};save();S.forEach(draw);stats();f()}};
S.forEach(draw);stats();
</script></body></html>"""
open('index.html', 'w', encoding='utf-8').write(T.replace('%%TAGS%%', btn).replace('%%BLOCS%%', ''.join(out)))
