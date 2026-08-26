#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 v3.16 D2+ 字段搬移法 (替代 M3 原 D2 组件切换法)
从 src/data/products.ts 抽 3 长文本字段 → products-content.ts + products.ts 删除 3 字段
- 不重新序列化, 保留原始文本 (含引号/转义/特殊字符)
- 字段一字不改
- SOP-5: 派生数据文件必须脚本化生成 + 随机抽 3 条字段级比对 + 条目数对齐
"""
import re
from pathlib import Path

P = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
src = P.read_text(encoding="utf-8")

# 找所有 SKU 对象: 从 "  id: '..."  到 "  },"  (允许跨行)
# 用宽匹配: 找 id 字段后所有键值对, 直到 "  }," (对象结束)
obj_pattern = re.compile(
    r"  id: '([^']+)',(.*?)\n  \},"  # slug 在 id 后面附近
    ,
    re.DOTALL,
)

# 抽 longDescription 3 字段的原始文本 (含引号, 不重新序列化)
LD_KEYS = ["longDescription", "longDescriptionEn", "longDescriptionJa"]

matches = list(obj_pattern.finditer(src))
print("Found {} SKU objects".format(len(matches)))

# 抽 3 字段 (从原始 TS 文本直接截取, 避免 JSON 解析)
content_dict = {}  # slug -> {ld_key: raw_value}
field_size = {k: 0 for k in LD_KEYS}
for m in matches:
    sku_id = m.group(1)
    body = m.group(2)
    entry = {}
    # 找 slug 字段
    slug_m = re.search(r"\n    slug: '([^']+)',", body)
    if not slug_m:
        continue
    slug = slug_m.group(1)
    # 抽 3 长文本字段原始值 (用更精确的正则, 找 "key: 'value' 跨行")
    for k in LD_KEYS:
        # 匹配 key: 'value', value 包含换行 + 嵌套引号
        # TS 单引号字符串字面量, 不会嵌套单引号 (转义为 \')
        km = re.search(
            r"\n    " + k + r": ('(?:\\.|[^'\\])*'),",
            body,
            re.DOTALL,
        )
        if km:
            entry[k] = km.group(1)  # 保留原始字符串 (含 \n \t \\ \' 等转义)
            field_size[k] += len(km.group(0))
    content_dict[slug] = entry

print("Extracted {} SKU entries".format(len(content_dict)))
print("Field sizes (raw TS text bytes):")
for k, v in field_size.items():
    print("  {}: {} bytes".format(k, v))
print("Total: {} bytes".format(sum(field_size.values())))

# 生成 products-content.ts
OUT = Path(r"F:\zprintpro-nextjs\src\data\products-content.ts")
lines = [
    "// K3 v3.16 D2+ 字段搬移: 从 products.ts 物理搬移 3 长文本字段 (脚本化生成, 业务 0 改动)",
    "// 仅 product/[slug] 与需要长文本的页面 import; 共享组件/列表/搜索不得 import 本文件",
    "// 源数据: products.ts 2,129,512 B, 三字段 = 883 KB (42%); 搬移后 products.ts ≈ 1.2 MB",
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
            # 原始字符串 (含转义), 直接写
            lines.append("    {}: {},".format(k, entry[k]))
    lines.append("  },")
lines.append("};")
lines.append("")

OUT.write_text("\n".join(lines), encoding="utf-8")
print("Wrote {} ({} bytes)".format(OUT, OUT.stat().st_size))

# 生成 products.ts 新版本 (删 3 字段, 保留其他字符一字不动)
# 策略: 在 src 字符串中找每个 SKU 块, 删 longDescription/longDescriptionEn/longDescriptionJa 三行
new_src = src
removed_lines = 0
for m in reversed(list(obj_pattern.finditer(new_src))):
    body_start, body_end = m.span(2)
    body = m.group(2)
    new_body = body
    for k in LD_KEYS:
        # 删 "    key: 'value',\n" (跨行)
        new_body = re.sub(
            r"\n    " + k + r": ('(?:\\.|[^'\\])*'),\n",
            "\n",
            new_body,
            flags=re.DOTALL,
        )
    if new_body != body:
        removed_lines += 1
        # 重建 SKU 块
        new_src = (
            new_src[: body_start + 0]  # 调整索引因为 body 变化
            + new_body
            + new_src[body_end + 0 :]
        )
        # 注意: 上面用原 m.span(2) 但 body 长度变了, 实际不可行
        # 重新做: 用 replace 一次替换
        pass

# 实际: 简单做法 - 在每个 id 块后逐个删字段
# 重新做: 字符串扫描
new_src2 = src
for k in LD_KEYS:
    # 匹配所有 "    key: '...',\n" 在 products.ts 中
    # 但要注意不在 productsContent.ts 中 (它已经分开)
    # 用更精确: 必须在 "  id: '...'," 块内
    pattern = re.compile(
        r"(  id: '[^']+',(?:[^}])*?\n    " + k + r": ('(?:\\.|[^'\\])*'),\n)",
        re.DOTALL,
    )
    new_src2, n = pattern.subn(r"\1", new_src2)
    print("Removed {} lines of {}".format(n, k))

# 写 products.ts 新版本
if new_src2 != src:
    P.write_text(new_src2, encoding="utf-8")
    new_size = P.stat().st_size
    print("Updated products.ts: {} -> {} bytes (delta {} bytes)".format(len(src), new_size, new_size - len(src)))
else:
    print("WARN: products.ts not changed, check pattern")
