#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""V20.6 升级: enhance_rules.json COMMON 段加 2 张候选指令 + 水印规避.
K3 8/17 04:55 拍板: 候选数 3 -> 2 (重要更新), 水印规避强化.
"""
import json
import os

path = r'zprintpro\.cluster\m3-exec-20260811\enhance_rules.json'
with open(path, 'r', encoding='utf-8') as f:
    rules = json.load(f)

# V20.6 升级段
v206_clause = (
    " V20.6 TWO-CANDIDATES-PER-VIEW (K3 8/17 04:55 directive, 重要更新 from 3 to 2): "
    "every view generates exactly 2 candidate images (cand1 + cand2), not 3, to "
    "save 33% compute cost; the 2 candidates are then visually scored and the "
    "best (>= 9.0) is selected as the final; if both candidates score < 9.0, "
    "report to K3 for next-step decision. V20.6 ANTI-WATERMARK NEGATIVES (K3 8/17 "
    "04:55 拍板, 重要更新): no AutoClaw AI watermark, no autoClaw text, no AutoGLM "
    "text, no AI-generated watermark, no text overlay, no right-bottom-corner "
    "watermark, no brand name in any corner; if watermark is unavoidable in "
    "current channel (AutoGLM fallback), it must be located in the right-bottom "
    "corner area only (start coord 660,780 pixel in 1200x1200) so PS post-processing "
    "can do Content-Aware Fill without touching the main product. V20.6 FULL-NO-CROP "
    "(K3 8/17 04:55 reaffirmed): absolutely NO cropping during finalization - the "
    "webp output keeps the full 1200x1200 image as generated; any cropping would "
    "secondary-enlarge the main product and break the 60-70% frame occupancy."
)

# Append to COMMON
rules['COMMON'] = rules['COMMON'] + v206_clause

# Update version
rules['version'] = rules.get('version', '') + ' + V20.6-2cand-wm (2026-08-17 04:55)'

# Write
with open(path, 'w', encoding='utf-8') as f:
    json.dump(rules, f, ensure_ascii=False, indent=2)

print('New file size:', os.path.getsize(path), 'bytes')
print(f'COMMON new length: {len(rules["COMMON"])} chars')
print(f'Version: {rules["version"]}')
print()
print('--- Last 800 chars of COMMON (V20.6 marker area) ---')
print(rules['COMMON'][-800:])
