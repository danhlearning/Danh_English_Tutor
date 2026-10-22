"""Chuyển ảnh imagegen đã lưu sang WebP, giữ nguyên bản gốc trong artifacts."""
from pathlib import Path
from PIL import Image, ImageDraw
import shutil, json

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / 'shared/assets/primary-vocabulary'
ORIGINALS = ROOT / 'artifacts/primary-template/originals'
ORIGINALS.mkdir(parents=True, exist_ok=True)
count = 0
for source in FOLDER.glob('*-v1.png'):
    image = Image.open(source).convert('RGB')
    image.thumbnail((480, 480), Image.Resampling.LANCZOS)
    image.save(source.with_suffix('.webp'), 'WEBP', quality=88)
    shutil.copy2(source, ORIGINALS / source.name)
    source.unlink()
    count += 1
print(f'Optimized {count}; {len(list(FOLDER.glob("*.webp")))} WebP images available.')

# Chỉ ghép bản xem để kiểm tra, không tạo hay sửa nội dung ảnh.
files = sorted(FOLDER.glob('*.webp'))
for start in range(0, len(files), 36):
    chunk = files[start:start + 36]
    sheet = Image.new('RGB', (1200, ((len(chunk) + 5) // 6) * 220), 'white')
    draw = ImageDraw.Draw(sheet)
    for index, source in enumerate(chunk):
        image = Image.open(source); image.thumbnail((190, 190))
        x, y = index % 6 * 200, index // 6 * 220
        sheet.paste(image, (x, y)); draw.text((x+4, y+194), source.stem.removesuffix('-v1')[:27], fill='black')
    sheet.save(ROOT / f'artifacts/primary-template/qa-{start//36+1:02}.jpg')
