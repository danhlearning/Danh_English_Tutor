"""Verify final reviewed artwork and save the exact prompt provenance set."""
import hashlib
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
work = root / 'artifacts/grade2-pencil'
def read(name):
    return json.loads((work / name).read_text(encoding='utf-8-sig'))
assets = [a for a in read('generation.json')['assets'] if a['topic'] != 'numbers']
results = {(r['topic'], r['id']): r for r in read('results.json')}
review = {r['key']: r for r in read('individual-review.json')['records']}
prompts_by_path = {}
for name in ['repairs.json', 'quantity-repairs.json', 'school-repairs.json', 'verb-context-repairs.json']:
    for row in read(name):
        if row.get('path') and row.get('prompt'):
            prompts_by_path[row['path']] = row['prompt']
prompts = []
for a in assets:
    key = a['topic'] + '/' + a['name']
    record = review[key]
    file = root / record['file']
    assert hashlib.sha256(file.read_bytes()).hexdigest() == record['sha256'], key + ': review is stale'
    with Image.open(file) as image:
        assert image.size == (768, 768), key
    result = results[(a['topic'], a['id'])]
    prompts.append({'topic': a['topic'], 'id': a['id'], 'name': a['name'], 'file': record['file'], 'source': result['path'], 'prompt': result.get('prompt') or prompts_by_path.get(result['path']) or a['prompt']})
assert len(assets) == len(review) == len(prompts) == 253
assert len({a['topic'] for a in assets}) == 16
(work / 'final-prompts.json').write_text(json.dumps({'mode': 'built-in image_gen', 'excluded': ['animals', 'colors', 'numbers'], 'assets': prompts}, ensure_ascii=False, indent=2), encoding='utf-8')
print('PASS: 253 individually reviewed images, current SHA-256, 768x768; 16 topics; final prompt set saved')
