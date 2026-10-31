"""Optimize generated originals and make labeled QA sheets; no semantic image edits."""
from pathlib import Path
import json
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'artifacts/colors-animals-20261031'
SOURCE = ART / 'originals'
DEST = ROOT / 'grade/lop2/assets/images/pencil'
records = []
for source in sorted(SOURCE.glob('*.png')):
    topic, name = source.stem.split('-', 1)
    directory = DEST / topic
    (directory / 'compact').mkdir(parents=True, exist_ok=True)
    filename = f'{name}-pencil-v2.webp'
    with Image.open(source) as im:
        if im.width != im.height:
            raise ValueError(f'Expected square vocabulary art: {source.name} ({im.size})')
        im = im.convert('RGB')
        for edge, target in [(768, directory / filename), (384, directory / 'compact' / filename)]:
            im.resize((edge, edge), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=84, method=6)
    records.append({'topic': topic, 'id': name, 'file': (directory / filename).relative_to(ROOT).as_posix(), 'compact': (directory / 'compact' / filename).relative_to(ROOT).as_posix(), 'bytes': (directory / filename).stat().st_size, 'generatedWith': 'built-in image_gen'})
for topic in ['colors', 'animals']:
    items = [r for r in records if r['topic'] == topic]
    for start in range(0, len(items), 12):
        group = items[start:start+12]
        sheet = Image.new('RGB', (4*256, ((len(group)+3)//4)*284), '#fffaf0')
        draw = ImageDraw.Draw(sheet)
        for i, item in enumerate(group):
            x, y = (i%4)*256, (i//4)*284
            with Image.open(ROOT / item['file']) as im:
                sheet.paste(im.resize((250,250)), (x+3,y))
            draw.text((x+12,y+254), item['id'], fill='#253c30')
        sheet.save(ART / f'{topic}-review-{start//12+1}.jpg', quality=92)
(ART / 'files.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
for topic, count in [('colors', 13), ('animals', 50)]:
    items = [r for r in records if r['topic'] == topic]
    # A partial batch must not replace the production manifest.
    if len(items) == count:
        (ROOT / f'docs/content/{topic}-pencil-manifest.json').write_text(json.dumps(items, indent=2), encoding='utf-8')
print(f'Prepared {len(records)} illustrations; {sum(r["bytes"] for r in records)} bytes for 768px assets.')
