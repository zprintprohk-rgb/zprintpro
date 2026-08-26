#!/usr/bin/env python3
"""
修 3 个 products.ts duplicate optimizedAt 错误:
- mailer-boxes L9313-9314 (我加 R2) + L9314-9315 (旧 R1) → 删 R2 升级 R1 → R2 + 改日期 7/23
- white-card-boxes L18032-18033 (我加 R2) + L18033-18034 (旧 R1) → 删 R2 升级 R1 → R2 + 改日期 7/23
- kraft-paper-bags L4317-4318 (我加 R1) + L4612-4613 (旧 R2) → 删 R1 升级 R2 → R3 + 改日期 7/23
"""
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
F = ROOT / "src/data/products.ts"

content = F.read_text(encoding='utf-8')

# Fix 1: mailer-boxes - 删 R2 (L9313-9314) 升级 R1 → R2 + 7/23 (L9314-9315)
# 实际看: L9313-9314 跟 L9314-9315 是同一行 (我脚本插入 + 旧字段 inline)
# pattern: optimizedAt: '2026-07-23',\n    optimizationRound: 2,    optimizedAt: '2026-07-21',\n    optimizationRound: 1,
old1 = "    optimizedAt: '2026-07-23',\n    optimizationRound: 2,    optimizedAt: '2026-07-21',\n    optimizationRound: 1,"
new1 = "    optimizedAt: '2026-07-23',\n    optimizationRound: 2,"
if old1 in content:
    content = content.replace(old1, new1, 1)
    print("  ✓ mailer-boxes: 删 R1, 保留 R2 (7/23)")
else:
    print("  ⚠ mailer-boxes pattern not found")

# Fix 2: white-card-boxes - 同样修
old2 = "    optimizedAt: '2026-07-23',\n    optimizationRound: 2,    optimizedAt: '2026-07-21',\n    optimizationRound: 1,"
new2 = "    optimizedAt: '2026-07-23',\n    optimizationRound: 2,"
if old2 in content:
    content = content.replace(old2, new2, 1)
    print("  ✓ white-card-boxes: 删 R1, 保留 R2 (7/23)")
else:
    print("  ⚠ white-card-boxes pattern not found")

# Fix 3: kraft-paper-bags - 我加的 R1 (L4317) + 旧 R2 (L4612) → 改 R1 → R3 + 7/23, 删 R2
# 实际: 我加的 L4317 R1 (7/23) + L4612 R2 (7/22) 是不同位置, 需要分别修
# 改 L4317 R1 → R3 + 7/23
old3a = "    optimizedAt: '2026-07-23',\n    optimizationRound: 1,    category: 'paper-bags',"
new3a = "    optimizedAt: '2026-07-23',\n    optimizationRound: 3,    category: 'paper-bags',"
if old3a in content:
    content = content.replace(old3a, new3a, 1)
    print("  ✓ kraft-paper-bags: R1 → R3 + 7/23")
else:
    print("  ⚠ kraft-paper-bags R1 pattern not found")

# 删 kraft-paper-bags 旧 R2 (L4612-4613)
old3b = "  },\n    optimizedAt: '2026-07-22',\n    optimizationRound: 2,\n  seoImages: {"
new3b = "  },\n  seoImages: {"
if old3b in content:
    content = content.replace(old3b, new3b, 1)
    print("  ✓ kraft-paper-bags: 删旧 R2 (7/22)")
else:
    print("  ⚠ kraft-paper-bags R2 pattern not found")

# 写回
F.write_text(content, encoding='utf-8')
print(f"\n  📊 products.ts duplicate fixed, ready for commit")
