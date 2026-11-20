#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
V3.10 修复: public/_redirects 334 行 > CF Pages 100 行限制 → build 错
方案: 删 SECTION 7 quote?product=* (78 行) + SECTION 8B {locale}/* (8 行), 移到 CF Dashboard Bulk Redirects
保留 SECTION 1-6 + 8A + 8C + 9 + 10 (核心 < 100 行)
"""
from pathlib import Path

FILE = Path(r"F:\zprintpro-nextjs\public\_redirects")
content = FILE.read_text(encoding='utf-8')

# 删 SECTION 7 全部 (L114-297 = quote?product=* 78 行, 用 CF Dashboard Bulk Redirects 处理)
sec7_start = content.find("# SECTION 7:")
sec8a_start = content.find("# SECTION 8:")
assert sec7_start > 0 and sec8a_start > 0
new_content = content[:sec7_start] + content[sec8a_start:]

# 删 SECTION 8B {locale}/* 8 行 (L309-321, 用 CF Dashboard Bulk Redirects 处理)
sec8b_start = new_content.find("# SECTION 8B:")
sec8c_start = new_content.find("# SECTION 8C:", sec8b_start)
if sec8b_start > 0 and sec8c_start > 0:
    new_content = new_content[:sec8b_start] + new_content[sec8c_start:]

# 头部加说明
header = """# 2026-08-21 K3 v3.10 修复: 简化 _redirects < 100 行 (CF Pages 限制)
# 删 SECTION 7 quote?product=* 78 行 (移到 CF Dashboard Bulk Redirects)
# 删 SECTION 8B {locale}/* 8 行 (同上)
# 保留 SECTION 1-6 + 8A + 8C + 9 + 10 (< 100 行)

"""
new_content = new_content.replace(
    "# ============================================================\n# Cloudflare Pages Redirects\n# 目标：",
    header + "# Cloudflare Pages Redirects\n# 目标：", 1
)

# 写
FILE.write_text(new_content, encoding='utf-8')
new_lines = new_content.split('\n')
print(f"OK: _redirects 简化完成")
print(f"  原 334 行 → 新 {len(new_lines)} 行")
print(f"  CF Pages 限制 100 行: {'PASS' if len(new_lines) <= 100 else 'FAIL'}")
