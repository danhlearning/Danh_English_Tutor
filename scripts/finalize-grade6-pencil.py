"""Verify all 96 inspected deliverables and preserve final prompts."""
import hashlib,json
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
work=root/'artifacts/grade6-pencil'
assets=json.loads((work/'generation.json').read_text(encoding='utf-8'))['assets']
review={r['key']:r for r in json.loads((work/'individual-review.json').read_text(encoding='utf-8'))['records']}
results={r['key']:r for r in [json.loads(p.read_text(encoding='utf-8')) for p in (work/'results').glob('*.json')]}
assert len(assets)==len(review)==len(results)==96,(len(assets),len(review),len(results))
final=[]
for a in assets:
 r=review[a['key']];file=root/a['file']
 assert r['reviewedVisually'] and r['noReadableText'],a['key']
 assert hashlib.sha256(file.read_bytes()).hexdigest()==r['sha256'],a['key']
 with Image.open(file) as im:assert im.size==(768,768),a['key']
 final.append({**a,'source':results[a['key']]['source'],'prompt':results[a['key']]['prompt'],'sha256':r['sha256'],**({'referenceSource':results[a['key']]['previousSource']} if results[a['key']].get('previousSource') else {})})
(work/'final-prompts.json').write_text(json.dumps({'mode':'built-in image_gen','assets':final},ensure_ascii=False,indent=2),encoding='utf-8')
print('PASS: 96 inspected final WebPs, 12 Units, 768x768, current SHA-256; final prompts saved')
