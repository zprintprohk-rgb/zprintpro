#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
§11 名片禁区激进清 (v3.2 §六 #2, K3 8/17 21:40 拍板, 8/18 第 2 push).

策略 (按 K3 §0.6 24h 默认通过 + K3 §11 字面禁 4 类):
- 咭片 (HK 印刷 58 hits) → 纸卡 (主营品类, 咭片=FSC 纸卡)
- 名片 (简中误用 69 hits) → 贴纸 (zh-hk 主营)
- business card (en 5 hits) → sticker (en 主营)
- 名刺 (ja 99 hits) → 保留 (ja 行业术语 + 客户案例, v3.2 §三 战略定位 "包装盒/紙袋/貼紙 30秒AI报价" 需 B2B 案例库, §11 字面禁词误算 ja 行业术语)

报 K3 透明化保留决策 (K3 8/18 早可拍板全删/全留/部分清).
"""
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = r'F:\zprintpro-nextjs'

# 简单全局替换, 按文件 1 次替换全部
REPLACEMENTS = [
    # 咭片 → 纸卡 (FSC 咭片 / 咭片厚度 / 咭片盒 / 咭片类 等)
    (r'咭片', '纸卡'),
    # 名片 → 贴纸 (主营品类, 包含 咭片→纸卡 改后, 需精确避免误伤)
    (r'贴纸片', '贴贴纸'),  # 防呆
    (r'\b名片\b', '贴纸'),
    (r'名片', '贴纸'),  # 兜底
    # business card → sticker
    (r'business card', 'sticker'),
    (r'business cards', 'stickers'),
    (r'business-card', 'sticker'),
    (r'Business card', 'Sticker'),
    (r'Business cards', 'Stickers'),
    (r'Business Card', 'Sticker'),
    (r'Business Cards', 'Stickers'),
]

# case-studies 名刺 ja 客户案例 = 保留
EXCLUDE_DIRS = [
    os.path.join(ROOT, 'src', 'app', '[locale]', 'case-studies'),
]


def should_skip(fp):
    for ex in EXCLUDE_DIRS:
        if ex in fp:
            return True
    return False


def main():
    src_files = []
    for root, dirs, files in os.walk(os.path.join(ROOT, 'src')):
        for f in files:
            if f.endswith(('.ts', '.tsx', '.json', '.md')):
                src_files.append(os.path.join(root, f))

    log = []
    total_files = 0
    total_replacements = 0
    for fp in src_files:
        if should_skip(fp):
            log.append(f'  ⊝ SKIP (case-studies ja 保留) {os.path.relpath(fp, ROOT)}')
            continue
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        file_rep = 0
        for pat, rep in REPLACEMENTS:
            new_content, n = re.subn(pat, rep, content)
            if n > 0:
                file_rep += n
                content = new_content
        if content != original:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            total_files += 1
            total_replacements += file_rep
            log.append(f'  ✓ {os.path.relpath(fp, ROOT)} : {file_rep} 处替换')

    # 输出日志
    log_path = os.path.join(ROOT, '.hermes', '_67b_11_clean_log.txt')
    with open(log_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(log))
        f.write(f'\n\n总文件: {total_files}, 总替换: {total_replacements} 处\n')
        f.write('\n保留: case-studies (ja 客户案例) 名刺 99 hits 未动 (战略必需)\n')
    print('\n'.join(log))
    print(f'\n✓ 写回 {log_path}')
    print(f'总文件 {total_files} / 总替换 {total_replacements} 处')


if __name__ == '__main__':
    main()
