#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修 4 个英文 zh-hk H1 + 1 个空 H1
策略: 直接找 "h1": "原值", 替换为 "h1": "新值"
"""
from pathlib import Path
SEO_FILE = Path("F:/zprintpro-nextjs/src/data/sku-seo-data.ts")
src = SEO_FILE.read_text(encoding="utf-8")

# 4 个英文 H1 + 1 个空 H1
# 注意: 必须用 zh-hk 块内的 H1, 但 zh-hk 块的 H1 值唯一, 可直接 replace
# 风险: en/ja 块可能有相同 h1 值, 所以先验证
H1_FIXES = [
    ("foil stamped business cards", "燙金咭片 | 金屬光澤 香港本地印刷"),
    ("spot UV business cards", "局部UV咭片 | 立體光澤視覺衝擊"),
    (" safe edge cards", "圓角咭片 | 柔和邊緣 創意行業首選"),
    ("waterproof stickers", "防水貼紙 | PVC/PP合成紙 異形切割"),
    ('"h1": ""', '"h1": "即日名片 | 4小時取件 急件首選"'),
]

new_src = src
fixed = 0
for old_h1, new_h1 in H1_FIXES:
    # 计算出现次数
    if old_h1.startswith('"h1":'):
        # 处理空 H1 特殊情况
        count = new_src.count(old_h1)
        if count == 0:
            print(f"  [skip] {old_h1}: 未找到")
            continue
        new_src = new_src.replace(old_h1, new_h1, 1)
        fixed += 1
        print(f"  [OK]   {old_h1} -> {new_h1}")
    else:
        # 处理 h1 字符串值
        old_str = f'"h1": "{old_h1}"'
        new_str = f'"h1": "{new_h1}"'
        if old_str not in new_src:
            print(f"  [skip] {old_str}: 未找到")
            continue
        # 看出现次数 (en/ja 块可能有重复)
        count = new_src.count(old_str)
        if count > 1:
            print(f"  [warn] {old_str} 出现 {count} 次, 只替换第 1 个")
        new_src = new_src.replace(old_str, new_str, 1)
        fixed += 1
        print(f"  [OK]   {old_str} -> {new_str}")

SEO_FILE.write_text(new_src, encoding="utf-8")
print()
print(f"修复 H1: {fixed}/5")
print(f"字节: {len(src):,} -> {len(new_src):,}")
