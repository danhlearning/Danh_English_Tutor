"""Optimize generated illustrations and build contact sheets for visual review."""
import json
import argparse
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'artifacts/grade2-pencil'
parser = argparse.ArgumentParser()
parser.add_argument('--topics', help='Only prepare these comma-separated topics')
topic_filter = set(parser.parse_args().topics.split(',')) if '--topics' in __import__('sys').argv else None
generation = json.loads((WORK / 'generation.json').read_text(encoding='utf-8-sig'))
results = json.loads((WORK / 'results.json').read_text(encoding='utf-8-sig'))
assets = {(a['topic'], a['id']): a for a in generation['assets']}
accepted = {}
for result in results:
    if result.get('path'):
        accepted[(result['topic'], result['id'])] = result
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 17)
for topic in dict.fromkeys(a['topic'] for a in generation['assets']):
    if topic_filter and topic not in topic_filter:
        continue
    rows = []
    for key, asset in assets.items():
        if key[0] != topic or key not in accepted:
            continue
        source = Path(accepted[key]['path'])
        target = ROOT / 'grade/lop2/assets/images/pencil' / topic / (asset['slug'] + '-v1.webp')
        target.parent.mkdir(parents=True, exist_ok=True)
        image = Image.open(source).convert('RGB')
        image = ImageOps.pad(image, (768, 768), color='white', method=Image.Resampling.LANCZOS)
        image.save(target, quality=88, method=6)
        rows.append((asset, image))
    for start in range(0, len(rows), 20):
        group = rows[start:start + 20]
        sheet = Image.new('RGB', (1200, ((len(group)+4)//5)*270), '#e5e9ee')
        draw = ImageDraw.Draw(sheet)
        for i, (asset, image) in enumerate(group):
            x, y = (i % 5)*240, (i//5)*270
            sheet.paste(ImageOps.contain(image, (228, 228)), (x+6, y+6))
            draw.text((x+8, y+238), asset['name'], fill='#102030', font=font)
        sheet.save(WORK / f'review-{topic}-{start:03}.jpg', quality=94)
count = sum(1 for topic, _ in accepted if not topic_filter or topic in topic_filter)
print(f'Prepared {count} illustrations at 768x768; contact sheets saved in {WORK}')
