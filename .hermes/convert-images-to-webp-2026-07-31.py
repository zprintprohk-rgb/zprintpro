# -*- coding: utf-8 -*-
"""
convert-factory-to-webp-2026-07-31.py
K3 11:40 全局规范: 全部网站图片转 webp, ≤180KB
factory/ 文件夹 14 张图 (jpg/webp 混合), 一次性全转 webp
- jpg → webp (省 25-35%)
- 已 webp 的重新压缩到 ≤180KB
- 保持文件名 (-factory-banner.jpg → -factory-banner.webp)
- K3 拍图时新文件也用 webp 命名
"""
import io
import os
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from PIL import Image

ROOT = r'F:\zprintpro-nextjs\public\images\factory'
LIMIT_KB = 180

# quality 阶梯: 95 → 85 → 75 → 65
QUALITY_TIERS = [95, 85, 75, 65]

def convert_to_webp(src_path: str, dst_path: str, quality: int = 85) -> int:
    with Image.open(src_path) as img:
        # 转 RGB (webp 不支持 RGBA 模式直接)
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        img.save(dst_path, 'WEBP', quality=quality, method=6, optimize=True)
    return os.path.getsize(dst_path)

def main():
    files = [f for f in os.listdir(ROOT) if os.path.isfile(os.path.join(ROOT, f))]
    print(f'=== factory/ 共 {len(files)} 张图 ===\n')

    results = []
    for fn in sorted(files):
        src = os.path.join(ROOT, fn)
        ext = os.path.splitext(fn)[1].lower()
        if ext == '.webp':
            # 已 webp, 重新压缩
            stem = os.path.splitext(fn)[0]
            dst = os.path.join(ROOT, fn)
            tmp = os.path.join(ROOT, f'{stem}.tmp.webp')
            orig_size = os.path.getsize(src)
            # 已 webp 不必再转, 检查 size
            if orig_size <= LIMIT_KB * 1024:
                results.append((fn, orig_size, orig_size, 'webp-already-ok'))
                print(f'  ✓ {fn:50s} {orig_size/1024:6.1f} KB (already OK)')
                continue
            # 压缩: 95 → 85 → 75
            best_size = orig_size
            best_q = 95
            with Image.open(src) as img:
                for q in QUALITY_TIERS:
                    img.save(tmp, 'WEBP', quality=q, method=6, optimize=True)
                    new_size = os.path.getsize(tmp)
                    if new_size < best_size:
                        best_size = new_size
                        best_q = q
            os.replace(tmp, dst)
            results.append((fn, orig_size, best_size, f'webp-recompress-q{best_q}'))
            saved_pct = (orig_size - best_size) / orig_size * 100
            print(f'  ↻ {fn:50s} {orig_size/1024:6.1f} → {best_size/1024:6.1f} KB (q={best_q}, - {saved_pct:.0f}%)')
            continue

        if ext not in ('.jpg', '.jpeg', '.png'):
            continue

        # jpg/png → webp
        stem = os.path.splitext(fn)[0]
        dst = os.path.join(ROOT, f'{stem}.webp')
        orig_size = os.path.getsize(src)

        # 阶梯试 quality
        best_size = None
        best_q = None
        for q in QUALITY_TIERS:
            try:
                new_size = convert_to_webp(src, dst, q)
                if new_size <= LIMIT_KB * 1024:
                    best_size = new_size
                    best_q = q
                    break
                if best_size is None or new_size < best_size:
                    best_size = new_size
                    best_q = q
            except Exception as e:
                print(f'  ✗ {fn} q={q} FAIL: {e}')
                continue

        if best_size is None:
            print(f'  ✗ {fn} FAIL all tiers')
            results.append((fn, orig_size, orig_size, 'FAIL'))
            continue

        # 删原 jpg
        os.remove(src)
        saved_pct = (orig_size - best_size) / orig_size * 100
        results.append((fn, orig_size, best_size, f'jpg→webp-q{best_q}'))
        if best_size > LIMIT_KB * 1024:
            print(f'  ⚠ {fn:50s} {orig_size/1024:6.1f} → {best_size/1024:6.1f} KB (q={best_q}, - {saved_pct:.0f}%) > {LIMIT_KB}KB')
        else:
            print(f'  ✓ {fn:50s} {orig_size/1024:6.1f} → {best_size/1024:6.1f} KB (q={best_q}, - {saved_pct:.0f}%)')

    # 总结
    print(f'\n=== 总结 ===')
    total_orig = sum(r[1] for r in results if r[3] != 'FAIL')
    total_new = sum(r[2] for r in results if r[3] != 'FAIL')
    saved = total_orig - total_new
    print(f'  original: {total_orig/1024/1024:.2f} MB')
    print(f'  webp:     {total_new/1024/1024:.2f} MB')
    print(f'  saved:    {saved/1024/1024:.2f} MB ({saved/total_orig*100:.0f}%)')
    over_limit = [r for r in results if r[2] > LIMIT_KB * 1024 and r[3] != 'FAIL']
    print(f'  > {LIMIT_KB} KB: {len(over_limit)} files (need special handling)')

if __name__ == '__main__':
    main()
