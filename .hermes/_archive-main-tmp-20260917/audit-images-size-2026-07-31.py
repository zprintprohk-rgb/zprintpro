# -*- coding: utf-8 -*-
"""
audit-images-size-2026-07-31.py
Audit public/images 全部图片, 按 size + format 分类
"""
import io
import os
import sys
from collections import Counter, defaultdict
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ROOT = r'F:\zprintpro-nextjs\public\images'
LIMIT_KB = 180

# 全部图
all_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    for fn in filenames:
        if fn.startswith('.') or fn.endswith(('.md', '.json', '.txt')):
            continue
        ext = os.path.splitext(fn)[1].lower()
        if ext in ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'):
            fp = os.path.join(dirpath, fn)
            size = os.path.getsize(fp)
            relpath = os.path.relpath(fp, ROOT)
            all_files.append((relpath, size, ext))

print(f'=== total: {len(all_files)} images ===')
print()

# format 分布
fmt_cnt = Counter([f[2] for f in all_files])
fmt_size = defaultdict(int)
for f in all_files:
    fmt_size[f[2]] += f[1]
print('=== format 分布 ===')
for fmt in sorted(fmt_cnt.keys()):
    total_mb = fmt_size[fmt] / 1024 / 1024
    print(f'  {fmt:8s} {fmt_cnt[fmt]:4d} files  {total_mb:6.2f} MB  平均 {fmt_size[fmt]/fmt_cnt[fmt]/1024:.0f} KB')

# size 分布
print()
print(f'=== size 分布 (limit {LIMIT_KB} KB) ===')
over_limit = [f for f in all_files if f[1] > LIMIT_KB * 1024]
under_limit = [f for f in all_files if f[1] <= LIMIT_KB * 1024]
print(f'  ≤ {LIMIT_KB} KB:  {len(under_limit)} files')
print(f'  > {LIMIT_KB} KB:  {len(over_limit)} files ({len(over_limit)*100/len(all_files):.1f}%)')
print(f'  total size: {sum(f[1] for f in all_files)/1024/1024:.2f} MB')
print(f'  >180KB total: {sum(f[1] for f in over_limit)/1024/1024:.2f} MB')

# top 20 largest
print()
print('=== Top 20 largest images ===')
for rel, size, ext in sorted(all_files, key=lambda x: -x[1])[:20]:
    print(f'  {size/1024:6.1f} KB  {ext:5s}  {rel}')

# non-webp > 180KB (需转换 + 压缩)
print()
print(f'=== non-webp & > {LIMIT_KB} KB (需转换 + 压缩) ===')
non_webp_over = [f for f in all_files if f[2] != '.webp' and f[1] > LIMIT_KB * 1024]
print(f'  count: {len(non_webp_over)}')
for rel, size, ext in sorted(non_webp_over, key=lambda x: -x[1])[:15]:
    print(f'  {size/1024:6.1f} KB  {ext:5s}  {rel}')

# webp > 180KB (需压缩)
print()
print(f'=== webp & > {LIMIT_KB} KB (仅压缩) ===')
webp_over = [f for f in all_files if f[2] == '.webp' and f[1] > LIMIT_KB * 1024]
print(f'  count: {len(webp_over)}')
for rel, size, ext in sorted(webp_over, key=lambda x: -x[1])[:10]:
    print(f'  {size/1024:6.1f} KB  {ext:5s}  {rel}')

# 按文件夹分布
print()
print('=== 按文件夹分布 (top 10 by file count) ===')
folder_cnt = Counter()
folder_size = defaultdict(int)
for rel, size, ext in all_files:
    folder = os.path.dirname(rel)
    folder_cnt[folder] += 1
    folder_size[folder] += size
for folder, cnt in folder_cnt.most_common(15):
    mb = folder_size[folder] / 1024 / 1024
    print(f'  {cnt:4d} files  {mb:5.2f} MB  {folder}/')

# 估算 webp 转换后能省多少
print()
print('=== 估算: jpg/png 转为 webp 后大小 ===')
to_convert = [f for f in all_files if f[2] in ('.jpg', '.jpeg', '.png')]
original_mb = sum(f[1] for f in to_convert) / 1024 / 1024
# webp 通常省 25-35%
estimated_webp_mb = original_mb * 0.65
saved_mb = original_mb - estimated_webp_mb
print(f'  jpg/png 当前: {original_mb:.2f} MB ({len(to_convert)} files)')
print(f'  转换 webp 估算: {estimated_webp_mb:.2f} MB (假设 -35%)')
print(f'  可省: {saved_mb:.2f} MB ({saved_mb/original_mb*100:.0f}%)')
