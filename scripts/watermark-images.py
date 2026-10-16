# -*- coding: utf-8 -*-
"""watermark-images.py — 产品/内容图批量反爬水印 (K3 2026-10-16 拍板「全权执行」)

在被抄风险最高的目录原位叠加半透明对角水印 "zprintpro.com"：
  - 抄图 = 免费替本站打广告；不抄 = 对方需自建图库，拉高复制成本。
  - 水印文字用域名（品牌中性），不触碰「智印港/ZprintPro 双品牌不并现」铁律。

范围（原位覆盖，git 可回滚）：
  public/images/{products,products-localized,factory,samples,categories,japan,articles,v26,blog,blog-m3}
跳过：hero / hero-v21（首页主视觉）、payment、products-backup、根目录 logo/icon、svg、宽度<320px 小图。
幂等：文件名含种子指纹？否——靠像素检测成本高，改为标记文件 .hermes/logs/watermark-done.json（记录 sha1+mtime），
      重复运行时跳过已处理且未变更的文件。

用法: python scripts/watermark-images.py          # dry-run 统计
      python scripts/watermark-images.py --apply  # 执行
"""
import hashlib
import io
import json
import os
import sys
import time

from PIL import Image, ImageDraw, ImageFont

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = 'public/images'
DIRS = ['products', 'products-localized', 'factory', 'samples', 'categories',
        'japan', 'articles', 'v26', 'blog', 'blog-m3']
EXT = {'.jpg', '.jpeg', '.png', '.webp'}
MIN_W = 320
MARKER = '.hermes/logs/watermark-done.json'
TEXT = 'zprintpro.com'
APPLY = '--apply' in sys.argv


def load_font(size):
    for cand in ['C:/Windows/Fonts/arialbd.ttf', 'C:/Windows/Fonts/arial.ttf',
                 '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(cand):
            return ImageFont.truetype(cand, size)
    return ImageFont.load_default()


def sig(path):
    st = os.stat(path)
    return f'{st.st_mtime_ns}:{st.st_size}'


def watermark(path):
    im = Image.open(path)
    im.load()
    if im.width < MIN_W:
        return 'skip-small'
    fmt = (im.format or '').upper()
    base = im.convert('RGBA')
    overlay = Image.new('RGBA', base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    size = max(14, base.width // 28)
    font = load_font(size)
    bbox = d.textbbox((0, 0), TEXT, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tile = Image.new('RGBA', (tw + size * 2, th + size * 2), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    td.text((size, size), TEXT, font=font, fill=(0, 0, 0, 60),
            stroke_width=max(1, size // 12), stroke_fill=(0, 0, 0, 60))
    td.text((size, size), TEXT, font=font, fill=(255, 255, 255, 78),
            stroke_width=max(1, size // 12), stroke_fill=(0, 0, 0, 42))
    tile = tile.rotate(30, expand=True, resample=Image.BICUBIC)
    for y in range(0, base.height + tile.height, tile.height):
        for x in range(0, base.width + tile.width, tile.width):
            overlay.paste(tile, (x, y), tile)
    out = Image.alpha_composite(base, overlay)
    if fmt in ('JPEG',) or path.lower().endswith(('.jpg', '.jpeg')):
        out.convert('RGB').save(path, 'JPEG', quality=88)
    elif path.lower().endswith('.webp'):
        out.convert('RGB').save(path, 'WEBP', quality=88)
    else:
        out.save(path, 'PNG', optimize=True)
    return 'ok'


def main():
    done = {}
    if os.path.exists(MARKER):
        done = json.load(open(MARKER, encoding='utf-8'))
    stats = {'ok': 0, 'skip-done': 0, 'skip-small': 0, 'fail': 0}
    t0 = time.time()
    pending = 0

    def flush():
        if APPLY:
            os.makedirs(os.path.dirname(MARKER), exist_ok=True)
            json.dump(done, open(MARKER, 'w', encoding='utf-8'))
    for d in DIRS:
        for dirpath, _, files in os.walk(os.path.join(ROOT, d)):
            for f in files:
                if os.path.splitext(f)[1].lower() not in EXT:
                    continue
                p = os.path.join(dirpath, f)
                rel = os.path.relpath(p).replace('\\', '/')
                if done.get(rel) == sig(p):
                    stats['skip-done'] += 1
                    continue
                if not APPLY:
                    stats['ok'] += 1
                    continue
                try:
                    r = watermark(p)
                    stats['ok' if r == 'ok' else 'skip-small'] += 1
                    if r == 'ok':
                        done[rel] = sig(p)
                        pending += 1
                        if pending >= 50:
                            flush()
                            pending = 0
                except Exception as e:
                    stats['fail'] += 1
                    print(f'[FAIL] {rel}: {e}')
    if APPLY:
        flush()
    print(f"{'APPLY' if APPLY else 'DRY-RUN'} stats={stats} elapsed={time.time()-t0:.1f}s")


if __name__ == '__main__':
    main()
