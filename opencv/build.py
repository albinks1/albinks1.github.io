import yaml, html
e = html.escape
blocs = yaml.safe_load(open('blocs.yaml', encoding='utf-8'))
tags = sorted({t for b in blocs for t in b['tags']})
out = []
for b in blocs:
    f = ''.join(f"<li><code>{e(x['sig'])}</code> : {e(x['desc'])}</li>" for x in b['fonctions'])
    out.append(f"""<section data-tags="{' '.join(b['tags'])}">
<h2>{e(b['titre'])}</h2>
<p class="tags">{' '.join(e(t) for t in b['tags'])}</p>
<p>{e(b['consigne'])}</p>
<details><summary>Solution</summary><pre><code>{e(b['code'].rstrip())}</code></pre></details>
<details><summary>Fonctions</summary><ul>{f}</ul></details>
</section>""")
btn = ''.join(f'<button data-t="{t}">{t}</button>' for t in tags)
page = f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>OpenCV : blocs usuels</title>
<style>
body{{font:16px/1.5 system-ui,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;color:#222}}
h1{{font-size:1.5rem}}h2{{font-size:1.15rem;margin:0}}
section{{border-top:1px solid #ddd;padding:1rem 0}}
.tags{{margin:.2rem 0;color:#777;font-size:.85rem}}
input{{width:100%;padding:.5rem;font-size:1rem;box-sizing:border-box}}
button{{margin:.5rem .3rem 0 0;padding:.25rem .7rem;border:1px solid #bbb;background:#fff;cursor:pointer}}
button.on{{background:#222;color:#fff}}
summary{{cursor:pointer;margin:.4rem 0}}
pre{{background:#f5f5f5;padding:.8rem;overflow-x:auto}}
code{{font-family:ui-monospace,monospace;font-size:.9rem}}
@media(prefers-color-scheme:dark){{body{{background:#161616;color:#ddd}}section{{border-color:#333}}pre{{background:#222}}input,button{{background:#222;color:#ddd;border-color:#444}}button.on{{background:#ddd;color:#161616}}}}
</style></head><body>
<h1>OpenCV : blocs usuels</h1>
<input id="q" placeholder="Rechercher (consigne, fonction, tag)">
<div id="tags">{btn}</div>
{''.join(out)}
<script>
const S=[...document.querySelectorAll('section')];let tag='';
function f(){{const q=document.getElementById('q').value.toLowerCase();
S.forEach(s=>s.hidden=!(s.textContent.toLowerCase().includes(q)&&(!tag||s.dataset.tags.split(' ').includes(tag))))}}
document.getElementById('q').oninput=f;
document.querySelectorAll('#tags button').forEach(b=>b.onclick=()=>{{tag=tag===b.dataset.t?'':b.dataset.t;
document.querySelectorAll('#tags button').forEach(x=>x.classList.toggle('on',x.dataset.t===tag));f()}});
</script></body></html>"""
open('index.html', 'w', encoding='utf-8').write(page)
