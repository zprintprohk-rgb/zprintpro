#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 8/8 01:03 拍板: matrix 加 api_endpoint_health 字段.
- schema 段加: api_endpoint_health: "200" / "500" / "unknown"
- 8_7_8_12_retrofit 段每个 entry 加: api_endpoint_health: "200" (8/7 9ab9ee4 修后, 9ab9ee4 落库 OK)
"""
import json
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE = r"F:\zprintpro-nextjs"
MATRIX = os.path.join(BASE, ".hermes", "industry-keyword-matrix.json")

with open(MATRIX, "r", encoding="utf-8") as f:
    data = json.load(f)

# 1. schema 段加 api_endpoint_health 字段
schema = data.get("conversion_status", {}).get("schema", {})
if "api_endpoint_health" not in schema:
    schema["api_endpoint_health"] = '"200" / "500" / "unknown" (8/7 9ab9ee4 /api/quote 修后默认 200, 部署必 §0.7 production smoke 验证)'
    print("✅ schema.api_endpoint_health 已加")

# 2. 8_7_8_12_retrofit 段每个 entry 加 api_endpoint_health
retrofit = data.get("conversion_status", {}).get("8_7_8_12_retrofit", {})
retrofit_count = 0
for slug, entry in retrofit.items():
    if "api_endpoint_health" not in entry:
        entry["api_endpoint_health"] = "200"  # 9ab9ee4 修后 /api/quote 200
        entry["api_endpoint_health_checked_at"] = "2026-08-07T18:45:38+08:00"  # 9ab9ee4 verify time
        entry["api_endpoint_health_check_sha"] = "9ab9ee4"
        retrofit_count += 1

print(f"✅ retrofit 段 {retrofit_count} entry 加 api_endpoint_health=200 (9ab9ee4 verify)")

# 3. policy 段加 §0.7 提示
policy = data.get("conversion_status", {}).get("policy", {})
if "section_0_7_link" not in policy:
    policy["section_0_7_link"] = "任何 /api/* 涉及 Supabase 写入的 endpoint 部署后必 §0.7 production smoke 3 步 (curl POST 200 + Supabase GET 落库 + 双向 verify). 详见 MEMORY.md §0.7"
    print("✅ policy.section_0_7_link 已加")

# 4. 写回 (UTF-8 + LF)
with open(MATRIX, "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ 写回 {MATRIX}")
print(f"   文件大小: {os.path.getsize(MATRIX)} bytes")
