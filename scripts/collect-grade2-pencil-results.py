"""Collect completed generations; Numbers remains outside the current release."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'artifacts/grade2-pencil'
def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))

assets = [a for a in read(WORK / 'generation.json')['assets'] if a['topic'] != 'numbers']
results = []
for name in ['curated-results.json', 'remaining-results.json', 'quantity-repairs.json', 'school-repairs.json', 'verb-context-repairs.json']:
    file = WORK / name
    if file.exists():
        results.extend(read(file))
accepted = {}
for row in results:
    if row.get('path') and row['topic'] != 'numbers':
        accepted[(row['topic'], row['id'])] = row
# Reuse the single-banana picture for the same food word.
banana = next((r for r in reversed(results) if r['topic'] == 'fruits' and r['id'] == 'banana' and r.get('path')), None)
if banana:
    accepted[('fooddrinks', 'banana')] = dict(banana, topic='fooddrinks')
final = [accepted[(a['topic'],a['id'])] for a in assets if (a['topic'],a['id']) in accepted]
(WORK / 'results.json').write_text(json.dumps(final, ensure_ascii=False, indent=2), encoding='utf-8')
missing = [a['topic'] + '/' + a['id'] for a in assets if (a['topic'],a['id']) not in accepted]
print(f'Artwork ready: {len(final)}/{len(assets)}; missing: {len(missing)}')
if '--require-complete' in sys.argv and missing:
    raise SystemExit('Missing artwork: ' + ', '.join(missing))
