"""Chuẩn hóa kích thước và định dạng sau khi tạo/duyệt bằng imagegen; không xóa chữ bằng xử lý ảnh."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json, hashlib
root = Path(__file__).resolve().parents[1]
source = root/'artifacts/grade6-7-image-audit'
folder = root/'grade/lop7/assets/images'
recreated = set('balanced-diet celebration community-service creativity documentary donate driverless entrance-examination gripping ingredient landmark native-speaker non-renewable-energy performance renewable-energy sunburn'.split())
names = sorted(p.stem for p in folder.glob('*.webp') if not p.stem.endswith('-v2'))
assert len(names) == 19
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18)
manifest = []
for name in names:
    original = source/f'{name}.png' if name in recreated else folder/f'{name}.webp'
    if not original.exists():
        raise SystemExit(f'Chưa có ảnh tạo lại: {name}')
    image = Image.open(original).convert('RGB')
    assert image.width == image.height, f'Ảnh cần duyệt lại tỉ lệ: {name}'
    image = image.resize((768,768),Image.Resampling.LANCZOS)
    target = folder/f'{name}-v2.webp'
    image.save(target,quality=88,method=6)
    manifest.append({'name':name,'path':target.relative_to(root).as_posix(),'size':[768,768],'action':'regenerated' if name in recreated else 'retained-and-standardized','sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
for start in range(0,len(names),12):
    batch=names[start:start+12]
    sheet=Image.new('RGB',(1200,((len(batch)+3)//4)*320),'#edf7f4')
    for i,name in enumerate(batch):
        x,y=(i%4)*300,(i//4)*320
        sheet.paste(ImageOps.contain(Image.open(folder/f'{name}-v2.webp').convert('RGB'),(280,280)),(x+10,y+5))
        ImageDraw.Draw(sheet).text((x+8,y+288),name,font=font,fill='black')
    sheet.save(source/f'after-{start//12+1}.jpg')
(source/'normalized-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(manifest)} WebP images, 768 x 768; 16 regenerated/cleaned, 3 standardized.')
