#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
V3.10 修复 #2: 进一步简化 _redirects 140 行 → < 100 行
- SECTION 1 12 行 → 1 行 /* /zh-hk/:splat/ 301 通配符
- 删 SECTION 1B /product/* (合并到通配符)
- 删冗余注释
"""
from pathlib import Path

FILE = Path(r"F:\zprintpro-nextjs\public\_redirects")
content = FILE.read_text(encoding='utf-8')

# 删 SECTION 1 12 行 + 注释
sec1_marker = "SECTION 1: 缺失 locale 前缀"
sec1b_marker = "SECTION 1B:"
sec2_marker = "SECTION 2:"

i1 = content.find(sec1_marker)
i1b = content.find(sec1b_marker)
i2 = content.find(sec2_marker)
assert i1 > 0 and i1b > 0 and i2 > 0

# 替换 SECTION 1 + 1B (从 i1 到 i2 之间) 为 1 行通配符
wildcard_replacement = """/\* /zh-hk/:splat/ 301

"""
new_content = content[:i1] + wildcard_replacement + content[i2:]

# 删 SECTION 4 重复 locale 注释 (5 行)
sec4_marker = "SECTION 4: 重复"
sec5_marker = "SECTION 5:"
i4 = new_content.find(sec4_marker)
i5 = new_content.find(sec5_marker)
if i4 > 0 and i5 > 0:
    # 删注释行 (从 i4 到 i5 前)
    new_content = new_content[:i4] + new_content[i5:]

# 删 SECTION 6 注释 (3 行)
sec6_marker = "SECTION 6: Services"
sec7_marker = "SECTION 7:"
i6 = new_content.find(sec6_marker)
i7 = new_content.find(sec7_marker)
if i6 > 0 and i7 > 0:
    new_content = new_content[:i6] + new_content[i7:]

# 删 SECTION 8A 注释 (3 行)
sec8a_marker = "SECTION 8A: 日文"
sec8c_marker = "SECTION 8C:"
i8a = new_content.find(sec8a_marker)
i8c = new_content.find(sec8c_marker)
if i8a > 0 and i8c > 0:
    new_content = new_content[:i8a] + new_content[i8c:]

# 写
FILE.write_text(new_content, encoding='utf-8')
new_lines = new_content.split('\n')
print(f"OK: _redirects 简化 #2")
print(f"  原 140 行 → 新 {len(new_lines)} 行")
print(f"  CF Pages 限制 100 行: {'PASS' if len(new_lines) <= 100 else 'FAIL'}")
