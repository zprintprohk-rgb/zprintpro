#!/usr/bin/env python3
"""
v2: 5 SKU description 适配行业强化 (line-walker 方式)
避开单引号内单引号问题
"""
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
F = ROOT / "src/data/products.ts"

content = F.read_text(encoding='utf-8')
lines = content.split('\n')
orig_lines = len(lines)

# 5 SKU 适配行业补强
enhancements = {
    "kraft-paper-bags": " 2026 旺季: ESG 環保品牌、有機食品品牌、文創市集限定、減塑徵費合規。",
    "mailer-boxes": " 2026 旺季重點: D2C 美妝配送、茶飲/手搖外送、訂閱盒盲盒、Kickstarter 集資送貨。",
    "white-card-boxes": " 2026 升級方案: 拼版彩盒試水反應好 → 升級白卡彩盒 50-10,000 件,單件 +HK$1-2。",
    "food-boxes": " 2026 旺季: 春節年糕禮盒、端午粽、夏日冰品配送、中秋月餅聖誕禮籃。",
    "folding-boxes": " 2026 旺季: 環保品牌限定、ESG 碳審計合規、月餅糕點禮盒、聖誕節日禮盒。",
}

# 找每个 slug 行,从该行往前 30 行内找 description 字段
# 策略: 找 slug 行 → 向前扫描 30 行找 description 字段 → 追加适配行业
for slug, append_text in enhancements.items():
    found = False
    for i, line in enumerate(lines):
        if f"slug: '{slug}'" in line:
            # 向前扫描 30 行找 description: 字段
            for j in range(max(0, i-30), i):
                # 找以 'description:' 开头且包含逗号 (单值字段)
                if lines[j].lstrip().startswith('description:') and lines[j].rstrip().endswith(','):
                    # 提取原值
                    val_match = re.match(r"(\s*)description:\s*'(.*)',\s*$", lines[j])
                    if val_match:
                        indent = val_match.group(1)
                        old_val = val_match.group(2)
                        # 检查是否已有"适配行业" 标记 (避免重复)
                        if '适配行业' in old_val or 'Best for' in old_val or '適用業界' in old_val:
                            # 已有适配行业标记,只追加
                            new_val = old_val + append_text
                        else:
                            # 没适配行业,追加
                            new_val = old_val + append_text
                        new_line = f"{indent}description: '{new_val}',"
                        lines[j] = new_line
                        print(f"  ✓ {slug} L{j+1}: description enhanced ({len(old_val)}→{len(new_val)} chars)")
                        found = True
                        break
            break
    if not found:
        print(f"  ❌ description field not found for {slug}")

# 写回
new_content = '\n'.join(lines)
F.write_text(new_content, encoding='utf-8')
print(f"\n  📊 Lines: {orig_lines} → {len(lines)}")
