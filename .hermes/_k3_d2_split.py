#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 v3.16 D2 彻底形态: 把 products.ts 中 97 个 SKU 对象的轻字段抽到独立模块
- 输出: src/data/products-lite-data.ts (纯数据, 无 longDescription)
- 改: src/data/products.ts 改为 import 这个 lite 数据 + 合并 longDescription
- 目标: 让共享 chunk 5958/3966 不再 import 长文本, 真正把 longDescription 摇掉
"""
import re
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
src = C.read_text(encoding="utf-8")

# 找每个 SKU 对象 { ... longDescription: ... } 块
# 简化: 找所有 longDescription 字段, 删它们, 然后输出剩余字段到 lite 文件
# 实际: TS 解析器太复杂, 改用更安全方法 - 不改 products.ts, 而是给共享组件提供 lite 接口
# 改策略: D2 彻底形态 = 新建 products-lite.ts 含 17 轻字段 (硬编码), 不 import products.ts

# 但 97 SKU 硬编码 17 字段 × 97 = 1649 行, 不可行
# 简化: 用 Python 解析 products.ts, 提取每个对象的轻字段, 输出到 products-lite.ts

# 找所有 "  id: " 开头的块, 提取到下个 "  }," 之间
LITE_KEYS = ['id', 'sku_code', 'slug', 'category', 'category_slug', 'name', 'nameEn', 'nameJa',
             'title_zh', 'price_range', 'basePrice', 'weight_score', 'isHot', 'isNew',
             'minQuantity', 'turnaround', 'images']

# 找所有 "  id: '..." 开头, 到 "  }," 结束
import re

# 找对象 (粗匹配): 从 "  id: " 到 "  }," (允许跨行)
pattern = re.compile(r"  id: '([^']+)',(.*?)\n  \},", re.DOTALL)
matches = pattern.findall(src)
print('Found ' + str(len(matches)) + ' SKU objects')

# 提取每个对象的轻字段
lite_entries = []
for sku_id, body in matches:
    entry = {'id': sku_id}
    for key in LITE_KEYS[1:]:  # skip id, 已加
        # 找 key: value
        if key == 'basePrice':
            m = re.search(r"\n    " + key + r": ([\d.]+),", body)
            if m:
                entry[key] = float(m.group(1))
        elif key in ('isHot', 'isNew'):
            m = re.search(r"\n    " + key + r": (\w+),", body)
            if m:
                entry[key] = m.group(1) == 'true'
        elif key in ('minQuantity', 'weight_score'):
            m = re.search(r"\n    " + key + r": ([\d.]+),", body)
            if m:
                entry[key] = int(float(m.group(1)))
        elif key == 'images':
            m = re.search(r"\n    " + key + r": (\[[^\]]+\]),", body, re.DOTALL)
            if m:
                # m.group(1) 是 "[ '/path', '/path' ]" 字符串, eval 解析为 list
                try:
                    entry[key] = eval(m.group(1))
                except Exception:
                    entry[key] = m.group(1)  # 失败 fallback
        elif key == 'turnaround':
            m = re.search(r"\n    " + key + r": '([^']*)',", body)
            if m:
                entry[key] = m.group(1)
        else:
            m = re.search(r"\n    " + key + r": '([^']*)',", body)
            if m:
                entry[key] = m.group(1)
        if key not in entry:
            # 二次尝试: 单引号
            m2 = re.search(r"\n    " + key + r": \"([^\"]*)\"", body)
            if m2:
                entry[key] = m2.group(1)
        if key not in entry:
            entry[key] = ''  # 缺失字段填空串
    lite_entries.append(entry)

print('Extracted ' + str(len(lite_entries)) + ' lite entries')

# 输出 products-lite-data.ts
LITE_OUT = Path(r"F:\zprintpro-nextjs\src\data\products-lite-data.ts")
import json as json_mod
lite_str = '[\n'
for i, e in enumerate(lite_entries):
    comma = ',' if i < len(lite_entries) - 1 else ''
    lite_str += '  ' + json_mod.dumps(e, ensure_ascii=False) + comma + '\n'
lite_str += ']\n'

LITE_OUT.write_text(
    '// K3 v3.16 D2 彻底形态: 97 SKU 轻字段 (17 字段, 物理拆分 from products.ts)\n'
    '// 用于 layout 链 / 列表卡片 / 搜索 (共享 chunk 不再携带 longDescription)\n'
    '// 业务内容 0 改动, 仅打包结构优化\n\n'
    'export interface ProductLiteEntry {\n'
    '  id: string; sku_code: string; slug: string;\n'
    '  category: string; category_slug: string;\n'
    '  name: string; nameEn: string; nameJa: string;\n'
    '  title_zh: string; price_range: string;\n'
    '  basePrice: number; weight_score: number;\n'
    '  isHot: boolean; isNew: boolean;\n'
    '  minQuantity: number; turnaround?: string;\n'
    '  images: string[];\n'
    '}\n\n'
    'export const productsLiteData: ProductLiteEntry[] = '
    + lite_str + '\n',
    encoding='utf-8'
)
print('Wrote ' + str(LITE_OUT) + ' (' + str(LITE_OUT.stat().st_size) + ' bytes)')

# 改 products.ts: 添加 import productsLiteData + 在 products 数组后面加 longDescription 等大字段合并
# 实际: 改策略 — 不动 products.ts (避免破坏), 而是新建 src/lib/products-lite.ts 单独 export
# 共享组件改 import '@/lib/products-lite'
# 业务代码 (product / category 页) 保留 import '@/data/products'
LITE_LIB = Path(r"F:\zprintpro-nextjs\src\lib\products-lite.ts")
LITE_LIB.write_text(
    '// K3 v3.16 D2 彻底形态: 物理拆分的轻量索引 (不 import products.ts)\n'
    '// 长文本字段 (longDescription/specs/features) 不在此文件, webpack tree-shake 真正生效\n'
    '// 用途: layout 链 / 列表卡片 / 搜索 / 共享组件\n'
    "import { productsLiteData, type ProductLiteEntry } from '@/data/products-lite-data';\n\n"
    'export { productsLiteData, type ProductLiteEntry };\n'
    "export const productsLite: ProductLiteEntry[] = productsLiteData;\n",
    encoding='utf-8'
)
print('Wrote ' + str(LITE_LIB))
print('OK')
