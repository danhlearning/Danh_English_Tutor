"""Tạo bảng duyệt tài nguyên và ảnh chụp; không sửa hình học liệu."""
from pathlib import Path
import json, re
from PIL import Image, ImageOps, ImageDraw, ImageFont
root = Path(__file__).resolve().parents[1]
out = root / 'artifacts/secondary-grades'
out.mkdir(parents=True, exist_ok=True)
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 16)
assets = {}
for grade in (8, 9):
    text = (root / f'grade/lop{grade}/assets/js/units-data.js').read_text(encoding='utf-8')
    units = json.loads(text[text.index('['):text.rindex(']')+1])
    for unit in units:
        for word in unit['words']:
            if word['image']:
                file = (root / f'grade/lop{grade}' / word['image']).resolve()
                assets.setdefault(file, []).append(f"G{grade} U{unit['number']}: {word['term']}")
items = list(assets.items())
for start in range(0, len(items), 12):
    batch = items[start:start+12]
    sheet = Image.new('RGB', (1200, ((len(batch)+3)//4)*350), '#eef7f4')
    draw = ImageDraw.Draw(sheet)
    for i, (file, labels) in enumerate(batch):
        x, y = (i%4)*300, (i//4)*350
        im = Image.open(file).convert('RGB')
        sheet.paste(ImageOps.contain(im, (280,280)), (x+10,y+5))
        for j, label in enumerate(labels):
            draw.text((x+8,y+290+j*20), label, font=font, fill='#17364c')
    sheet.save(out/f'images-contact-{start//12+1}.jpg')
print(f'{len(items)} unique images, {sum(len(x) for x in assets.values())} placements')
for grade in (8,9):
    sheets = Image.new('RGB', (1200, 1800), '#edf7f4')
    draw = ImageDraw.Draw(sheets)
    for unit in range(1,13):
        file = out/f'grade{grade}-unit{unit}-mobile.png'
        if not file.exists(): continue
        image = Image.open(file).convert('RGB')
        x, y = ((unit-1)%4)*300, ((unit-1)//4)*600
        thumb = ImageOps.contain(image, (290,570))
        sheets.paste(thumb,(x+(300-thumb.width)//2,y+25))
        draw.text((x+12,y+4),f'Grade {grade} Unit {unit}',font=font,fill='#17364c')
    sheets.save(out/f'grade{grade}-all-units.jpg')
