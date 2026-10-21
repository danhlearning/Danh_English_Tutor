"""Attach hashes to the illustrations already opened and visually reviewed."""
import hashlib
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
work = root / 'artifacts/grade2-pencil'
review_path = work / 'individual-review.json'
review = json.loads(review_path.read_text(encoding='utf-8-sig'))
assets = json.loads((work / 'generation.json').read_text(encoding='utf-8-sig'))['assets']
accepted = set(review['accepted'])
records = []
for asset in assets:
    key = asset['topic'] + '/' + asset['name']
    if key not in accepted:
        continue
    file = root / 'grade/lop2/assets/images/pencil' / asset['topic'] / (asset['slug'] + '-v1.webp')
    with Image.open(file) as image:
        size = image.size
    assert size == (768, 768), str(file)
    records.append({'key': key, 'file': file.relative_to(root).as_posix(), 'sha256': hashlib.sha256(file.read_bytes()).hexdigest(), 'width': size[0], 'height': size[1], 'visualReview': 'accepted: meaning, no word labels, anatomy and quantity where applicable'})
review['records'] = records
review_path.write_text(json.dumps(review, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Individual visual review recorded: {len(records)}/253')
