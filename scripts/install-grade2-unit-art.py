"""Install the Grade 2 Unit pencil art and use it in lessons and mixed review."""
import hashlib
import json
import re
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'artifacts/grade2-image-audit'
TARGET = ROOT / 'grade/lop2/assets/images/pencil/units'
VERSION = 'unit-pencil-20261025'
TARGET.mkdir(parents=True, exist_ok=True)
generation = json.loads((WORK / 'unit-art-prompts.json').read_text(encoding='utf-8'))
images = {}
for asset in generation['assets']:
    target = TARGET / (asset['id'] + '-v1.webp')
    with Image.open(asset['source']) as source:
        image = ImageOps.pad(source.convert('RGB'), (768, 768), color='white', method=Image.Resampling.LANCZOS)
        image.save(target, quality=88, method=6)
    images[asset['id']] = {'src': target.relative_to(ROOT).as_posix(), 'source': 'built-in image_gen'}

reused = {
    'pizza': 'fooddrinks/pizza-v1.webp', 'kite': 'toys/kite-v1.webp',
    'bike': 'transport/bike-v1.webp', 'square': 'shapes/square-v1.webp',
    'juice': 'fooddrinks/juice-v1.webp', 'ride': 'verbs/ride-v1.webp',
    'cake': 'fooddrinks/cake-v1.webp',
    'table': 'householditems/table-v1.webp', 'brother': 'familyfriends/brother-v1.webp',
    'sister': 'familyfriends/sister-v1.webp', 'grandmother': 'familyfriends/grandmother-v1.webp',
    'shoes': 'clothes/shoes-v1.webp', 'shorts': 'clothes/shorts-v1.webp',
}
for word, file in reused.items():
    images[word] = {'src': 'grade/lop2/assets/images/pencil/' + file, 'source': 'existing-pencil'}
images['jam'] = {'src': 'grade/lop4/assets/images/pencil/jam-v1.webp', 'source': 'existing-pencil'}
assert len(images) == 44
for word, entry in images.items():
    file = ROOT / entry['src']
    assert file.is_file(), word
    entry['sha256'] = hashlib.sha256(file.read_bytes()).hexdigest()

manifest = {'grade': 2, 'style': 'colored-pencil', 'preservedNumbers': ['eleven', 'thirteen', 'fourteen', 'fifteen'], 'images': images}
(TARGET / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

runtime = '''/* One Unit artwork source for vocabulary, games and mixed review. */
(() => {
  'use strict';
  const images = __IMAGES__;
  const root = new URL('../../../../', document.currentScript.src);
  for (const unit of Object.values(window.grade2Units || {})) {
    for (const word of unit.words) {
      const file = images[word.id];
      if (!file) continue; // Keep the original, legible number diagrams in Unit 13.
      const href = new URL(file, root).href;
      word.image = href;
      word.visual = '<svg class="danh-vocabulary-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" aria-hidden="true"><image href="' + href + '" width="360" height="360" preserveAspectRatio="xMidYMid meet"/></svg>';
    }
  }
})();
'''.replace('__IMAGES__', json.dumps({word: entry['src'] for word, entry in images.items()}, ensure_ascii=False, indent=2))
(ROOT / 'grade/lop2/assets/js/unit-pencil-art.js').write_text(runtime, encoding='utf-8')

for page in [*(ROOT / 'grade/lop2').glob('gsunit*.html'), ROOT / 'grade/lop2/review.html']:
    html = page.read_text(encoding='utf-8')
    html = re.sub(r'\s*<script src="(?:../../shared/vocabulary-3d\.js|./assets/js/unit-pencil-art\.js)[^"]*"></script>', '', html)
    data = './assets/data/gs-unit1-data.js' if page.name == 'gsunit1.html' else './assets/data/gs-units-data.js'
    html, count = re.subn(r'(<script src="' + re.escape(data) + r'[^"]*"></script>)', r'\1\n  <script src="./assets/js/unit-pencil-art.js?v=' + VERSION + r'"></script>', html)
    assert count == 1, page
    page.write_text(html, encoding='utf-8')

# Contact sheets include every new and reused picture for a complete visual check.
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 19)
items = list(images.items())
for start in range(0, len(items), 12):
    group = items[start:start + 12]
    sheet = Image.new('RGB', (1200, 960), '#e9e6df')
    draw = ImageDraw.Draw(sheet)
    for i, (word, entry) in enumerate(group):
        x, y = (i % 4) * 300, (i // 4) * 320
        with Image.open(ROOT / entry['src']) as image:
            sheet.paste(ImageOps.contain(image.convert('RGB'), (288, 280)), (x + 6, y + 6))
        draw.text((x + 10, y + 291), word, fill='#24364a', font=font)
    sheet.save(WORK / f'unit-review-{start:02}.jpg', quality=94)
print(f'Installed {len(generation["assets"])} new pictures + {len(reused) + 1} reused pictures; 4 number diagrams preserved; 17 pages wired.')
