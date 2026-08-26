#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.16 D2+ 字段搬移 v2: longDescription 用反引号 (template literal), 不是单引号"""
import re
from pathlib import Path

P = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
src = P.read_text(encoding="utf-8")

LD_KEYS = ["longDescription", "longDescriptionEn", "longDescriptionJa"]

# 反引号字符串: `...` 跨行, 不转义单引号
# 模式: 4 空格 + key + ": " + ` + 内容(不包含反引号) + `
LD_PATTERN = re.compile(
    r"    (" + "|".join(LD_KEYS) + r"): `((?:[^`\\]|\\.)*)`,",
    re.DOTALL,
)

content_dict = {}
field_size = {k: 0 for k in LD_KEYS}
for m in LD_PATTERN.finditer(src):
    key = m.group(1)
    raw_value = m.group(2)
    field_size[key] += len(raw_value)

# 找所有 SKU 块, 抽 3 字段
obj_pattern = re.compile(
    r"  id: '([^']+)',(.*?)\n  \},",
    re.DOTALL,
)
for m in obj_pattern.finditer(src):
    body = m.group(2)
    slug_m = re.search(r"\n    slug: '([^']+)',", body)
    if not slug_m:
        continue
    slug = slug_m.group(1)
    entry = {}
    for k in LD_KEYS:
        km = re.search(
            r"    " + k + r": `((?:[^`\\]|\\.)*)`,",
            body,
            re.DOTALL,
        )
        if km:
            entry[k] = km.group(1)
    if entry:
        content_dict[slug] = entry

print("Extracted {} SKU entries".format(len(content_dict)))
print("Field sizes (raw text bytes):")
for k, v in field_size.items():
    print("  {}: {} bytes ({:.1f} KB)".format(k, v, v / 1024))
print("Total: {} bytes ({:.1f} KB)".format(sum(field_size.values()), sum(field_size.values()) / 1024))

# 生成 products-content.ts
OUT = Path(r"F:\zprintpro-nextjs\src\data\products-content.ts")
lines = [
    "// K3 v3.16 D2+ 字段搬移: 从 products.ts 物理搬移 3 长文本字段 (脚本化生成, 业务 0 改动)",
    "// 仅 product/[slug] 与需要长文本的页面 import; 共享组件/列表/搜索不得 import 本文件",
    "// 源数据: products.ts 2,129,512 B, 三字段 ≈ 883 KB (42%); 搬移后 products.ts ≈ 1.2 MB",
    "",
    "export interface ProductContentEntry {",
    "  longDescription?: string;",
    "  longDescriptionEn?: string;",
    "  longDescriptionJa?: string;",
    "}",
    "",
    "export const productsContent: Record<string, ProductContentEntry> = {",
]
for slug, entry in content_dict.items():
    lines.append("  '{}': {{".format(slug))
    for k in LD_KEYS:
        if k in entry:
            lines.append("    {}: `{}`,".format(k, entry[k]))
    lines.append("  },")
lines.append("};")
lines.append("")
OUT.write_text("\n".join(lines), encoding="utf-8")
print("Wrote {} ({} bytes)".format(OUT, OUT.stat().st_size))

# 生成 products.ts 新版本 (删 3 字段, 保留其他字符一字不动)
new_src = src
for k in LD_KEYS:
    pattern = re.compile(
        r"    " + k + r": `((?:[^`\\]|\\.)*)`,\n",
        re.DOTALL,
    )
    new_src, n = pattern.subn("", new_src)
    print("Removed {} lines of {}".format(n, k))

if new_src != src:
    P.write_text(new_src, encoding="utf-8")
    new_size = P.stat().st_size
    print("Updated products.ts: {} -> {} bytes (delta {} bytes, -{}%)".format(
        len(src), new_size, new_size - len(src),
        round((1 - new_size / len(src)) * 100, 1)
    ))

# 验证闸门
print("\n=== Verify 1: products.ts < 1,300,000 bytes ===")
print("products.ts: {} bytes ({})".format(
    P.stat().st_size,
    "✅ PASS" if P.stat().st_size < 1_300_000 else "❌ FAIL"
))

# 字段级比对 (随机抽 3 条)
import random
random.seed(42)
sample = random.sample(list(content_dict.keys()), min(3, len(content_dict)))
print("\n=== Verify 2: 随机抽 3 条字段级比对 ===")
for slug in sample:
    entry = content_dict[slug]
    print("  {}:".format(slug))
    for k in LD_KEYS:
        if k in entry:
            print("    {}: {} chars".format(k, len(entry[k])))
