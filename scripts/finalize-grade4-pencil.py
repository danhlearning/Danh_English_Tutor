"""Package reviewed image outputs for the website; do not alter their depicted content."""
import hashlib
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'artifacts/grade4-pencil'
read = lambda p: json.loads(p.read_text(encoding='utf-8-sig'))
plan = read(WORK / 'plan.json')
results = {r['id']: r for r in read(WORK / 'results.json')}
reused = {r['key']: r for r in read(WORK / 'reused-review.json')}
manifest = {}
missing = []
for asset in plan['assets']:
    target = ROOT / asset['file']
    if asset['source'] == 'generated':
        result = results.get(asset['id'])
        if not result or not result.get('reviewed'):
            missing.append(asset['id'])
            continue
        source = Path(result['path'])
        if not source.is_file():
            raise ValueError(f'Missing generated file: {source}')
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as image:
            if image.width != image.height:
                raise ValueError(f'Expected square image: {asset["id"]}')
            image.convert('RGB').resize((768, 768), Image.Resampling.LANCZOS).save(target, quality=88, method=6)
    else:
        review = reused.get(asset['key'])
        if not review or not review.get('reviewed') or review['file'] != asset['file']:
            missing.append(asset['id'])
            continue
    if not target.is_file():
        raise ValueError(f'Missing asset: {target}')
    manifest[asset['key']] = {
        'src': asset['file'], 'source': asset['source'], 'reviewed': True,
        'sha256': hashlib.sha256(target.read_bytes()).hexdigest()
    }

if missing:
    print(f'Packaged approved files. Still awaiting {len(set(missing))} unique images: {", ".join(dict.fromkeys(missing))}')
else:
    output = ROOT / 'grade/lop4/assets/images/pencil/manifest.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({'grade': 4, 'style': 'colored-pencil', 'wordCount': plan['wordCount'], 'images': manifest}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'PASS: all {len(manifest)} unique images reviewed and packaged for {plan["wordCount"]} vocabulary entries.')
