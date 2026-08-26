#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""合并 3 locale blog content 段到 blog-data/{zh-hk,en,ja}.json"""
import json
import os
import sys

DATA_DIR = r'F:\zprintpro-nextjs\src\data\blog-data'
TMP_DIR = r'F:\zprintpro-nextjs\src\data\blog-data'

# 3 locale tmp files
TMP_FILES = {
    'en': os.path.join(TMP_DIR, 'en-catalog-printing-china-supplier-guide.tmp.json'),
    'zh-hk': os.path.join(TMP_DIR, 'zh-hk-catalog-printing-china-supplier-guide.tmp.json'),
    'ja': os.path.join(TMP_DIR, 'ja-catalog-printing-china-supplier-guide.tmp.json'),
}

# 3 locale target files
TARGET_FILES = {
    'en': os.path.join(DATA_DIR, 'en.json'),
    'zh-hk': os.path.join(DATA_DIR, 'zh-hk.json'),
    'ja': os.path.join(DATA_DIR, 'ja.json'),
}

SLUG = 'catalog-printing-china-supplier-guide'

for locale in ['en', 'zh-hk', 'ja']:
    print(f'\n=== {locale} ===')
    
    # 1. 读现有 target file
    target_path = TARGET_FILES[locale]
    with open(target_path, 'r', encoding='utf-8') as f:
        target = json.load(f)
    
    # 2. 读 tmp file
    tmp_path = TMP_FILES[locale]
    with open(tmp_path, 'r', encoding='utf-8') as f:
        new_entry = json.load(f)
    
    # 3. 检查 slug 不存在 (防止重复)
    if SLUG in target:
        print(f'  [WARN] slug "{SLUG}" exists, will overwrite')
    else:
        print(f'  [OK] slug "{SLUG}" new')
    
    # 4. 合并 (slug = key)
    target[SLUG] = new_entry
    
    # 5. 写回
    with open(target_path, 'w', encoding='utf-8', newline='') as f:
        json.dump(target, f, ensure_ascii=False, indent=2)
    
    print(f'  [OK] wrote {target_path} (total slugs: {len(target)})')

# 6. 清理 tmp files
print('\n=== 清理 tmp files ===')
for locale, tmp_path in TMP_FILES.items():
    if os.path.exists(tmp_path):
        os.remove(tmp_path)
        print(f'  [OK] removed {tmp_path}')

print('\n[OK] 3 locale merge complete')
