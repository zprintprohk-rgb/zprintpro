#!/usr/bin/env python3
"""2026-08-24 F1-batch-6: F2 修复清单分级分析"""
import json
import re
import io

with io.open(r'F:\zprintpro-nextjs\.hermes\logs\content-guard-2026-08-24-rule5.json', 'r', encoding='utf-8') as f:
    r = json.load(f)

hits = r['hits']
yellow = [h for h in hits if h['severity'] == 'yellow']
orange = [h for h in hits if h['severity'] == 'orange']
white = [h for h in hits if h['severity'] == 'white']

# YELLOW 分组
y_var = 0
y_comment = 0
y_user = 0
for h in yellow:
    ctx = h['context']
    ctx_strip = ctx.strip()
    if ctx_strip.startswith('//') or ctx_strip.startswith('/*') or ctx_strip.startswith('*'):
        y_comment += 1
    elif re.match(r'^(const|let|var)\s+[a-zA-Z]', ctx) or re.search(r'\bcluster\b', ctx) and not re.search(r"['\"\u201c\u201d].*cluster.*['\"\u201c\u201d]", ctx):
        y_var += 1
    else:
        y_user += 1
        if y_user <= 8:
            print(f'  YELLOW user-facing: {h["file"]}:{h["line"]} | {h["match"]} | {ctx[:100]}')

# ORANGE 按 match 分组
o_by_pat = {}
for h in orange:
    o_by_pat[h['match']] = o_by_pat.get(h['match'], 0) + 1

# WHITE 分组
w_react = 0
w_user = 0
for h in white:
    ctx = h['context']
    if re.search(r'placeholder\s*[=:]', ctx) or 'Placeholder' in ctx:
        w_react += 1
    else:
        w_user += 1
        if w_user <= 5:
            print(f'  WHITE user-facing: {h["file"]}:{h["line"]} | {h["match"]} | {ctx[:100]}')

print('=' * 60)
print('=== F2 修复清单分级 (K3 8/24 20:15 P1 #5) ===')
print('=' * 60)
print(f'RED 0     | Rule 5 RAW_MARKDOWN_LINK     | 0 命中 (F1-batch-4 修复彻底)')
print(f'ORANGE 236 | UNVERIFIED_CLAIM             | 12 件事属实不动 + 12 大行业 + 国际顶级 (K3 8/24 18:35 拍板)')
print(f'YELLOW 25  | STRATEGY_JARGON              | 25 命中, 误报: 变量名/函数名/注释')
print(f'  - 变量名/函数名 (cluster): {y_var}')
print(f'  - 注释行 (SOP-10): {y_comment}')
print(f'  - 真正 user-facing: {y_user}')
print(f'WHITE 167  | PLACEHOLDER                  | 167 命中, 误报: React form placeholder 属性')
print(f'  - React placeholder 属性: {w_react}')
print(f'  - 真正 user-facing: {w_user}')
print()
print('ORANGE 按 match 分布:')
for pat, n in sorted(o_by_pat.items(), key=lambda x: -x[1]):
    print(f'  {n:>4}  {pat}')
