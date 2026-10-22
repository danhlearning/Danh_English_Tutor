"""Convert generated sources, or record explicitly inspected final WebPs."""
import argparse, hashlib, json
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
work = root / 'artifacts/grade6-pencil'
parser = argparse.ArgumentParser()
parser.add_argument('--approve', help='Comma-separated keys of final WebPs just viewed manually')
args = parser.parse_args()
assets = json.loads((work/'generation.json').read_text(encoding='utf-8'))['assets']
by_key = {a['key']: a for a in assets}
review_file = work/'individual-review.json'
review = json.loads(review_file.read_text(encoding='utf-8')) if review_file.exists() else {'method':'Direct visual inspection of every final WebP; hashes identify the inspected version','records':[]}
if args.approve:
    for key in args.approve.split(','):
        a = by_key[key]
        file = root/a['file']
        with Image.open(file) as im:
            assert im.size == (768,768), key
        review['records'] = [r for r in review['records'] if r['key'] != key]
        review['records'].append({'key':key,'file':a['file'],'size':[768,768], 'sha256':hashlib.sha256(file.read_bytes()).hexdigest(), 'reviewedVisually':True,'noReadableText':True})
    review_file.write_text(json.dumps(review,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f"Recorded {len(args.approve.split(','))} explicitly inspected images; total {len(review['records'])}/96")
else:
    prior_file=work/'prepared.json'
    prepared=json.loads(prior_file.read_text(encoding='utf-8')) if prior_file.exists() else {}
    records=[json.loads(p.read_text(encoding='utf-8')) for p in sorted((work/'results').glob('*.json'))]
    changed=[]
    for record in records:
        a=by_key[record['key']];source=Path(record['source']);target=root/a['file']
        source_hash=hashlib.sha256(source.read_bytes()).hexdigest()
        if prepared.get(a['key'],{}).get('sourceHash')==source_hash and target.exists():continue
        target.parent.mkdir(parents=True,exist_ok=True)
        with Image.open(source) as im:
            image=ImageOps.pad(im.convert('RGB'),(768,768),method=Image.Resampling.LANCZOS,color='#fffdf8')
            image.save(target,quality=90,method=6)
        prepared[a['key']]={'source':str(source),'sourceHash':source_hash,'file':a['file']}
        changed.append(a['key'])
    prior_file.write_text(json.dumps(prepared,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'prepared':len(prepared),'changed':changed}))
