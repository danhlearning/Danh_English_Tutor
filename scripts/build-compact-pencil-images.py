"""Build smaller display copies; keep reviewed artwork and its full-size source intact."""
import json
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'grade/lop2/assets/js/pencil-images-data.js'
manifest = json.loads(source.read_text(encoding='utf-8').split('=', 1)[1].strip().rstrip(';'))
images = ROOT / 'grade/lop2/assets/images/pencil'
before = after = 0
files = {file for topic in manifest.values() for file in topic.values()}
unit_source = (ROOT / 'grade/lop2/assets/js/unit-pencil-art.js').read_text(encoding='utf-8')
unit_images = json.loads(re.search(r'const images = (\{.*?\});', unit_source, re.S).group(1))
prefix = 'grade/lop2/assets/images/pencil/'
files.update(file[len(prefix):] for file in unit_images.values() if file.startswith(prefix) and file.endswith('.webp'))
files = sorted(files)
for file in files:
    original = images / file
    target = images / 'compact' / file
    with Image.open(original) as image:
        image.thumbnail((480, 480), Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, format='WEBP', quality=80, method=6)
    before += original.stat().st_size
    after += target.stat().st_size
print(json.dumps({'files': len(files), 'originalBytes': before, 'compactBytes': after,
                  'savedPercent': round((1-after/before)*100, 1)}))
