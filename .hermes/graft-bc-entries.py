#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""从 202e7698 版 sku-seo-data.ts 中定向接回 2 个名片 SKU 的条目块 (只改这 2 块)。

背景 (2026-09-13):
  202e7698 (我的 CSV 重生成) 造成回归: 100 条 -> 75 条 + 69 处双品牌 + 抹掉 A3 成果
  58356a34 已回滚该文件到回归前版本 -> 24 SKU 回归修复, 但连带把 2 个名片 SKU
  (thick-greeting-cards-400g / foil-greeting-cards) 的 SKU 级标题退回「賀卡」语义。
  本脚本只把这 2 个条目块从 202e7698 版换回来, 其余条目一字不动。

安全: 备份 -> 只替换 2 个块 -> 断言 (key 数不变 / 其余 slug 不变 / 这 2 个 slug 出现「名片」)
用法: python .hermes/graft-bc-entries.py           # 干跑
      python .hermes/graft-bc-entries.py --apply
"""
import json
import re
import shutil
import subprocess
import sys
import time

APPLY = '--apply' in sys.argv
P = r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts'
SLUGS = ['thick-greeting-cards-400g', 'foil-greeting-cards']


def load_regressed():
    return subprocess.run(
        ['git', 'show', '202e7698:src/data/sku-seo-data.ts'],
        cwd=r'F:\zprintpro-nextjs', capture_output=True, text=True, encoding='utf-8'
    ).stdout


def extract_block(text, slug):
    """抽取 "slug": { ... } 整块 (花括号配平)"""
    key = '"%s": {' % slug
    i = text.find(key)
    if i < 0:
        return None
    start = text.find('{', i)
    depth = 0
    for j in range(start, len(text)):
        c = text[j]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                end = j + 1
                # 吞掉尾随逗号
                while end < len(text) and text[end] in ',\r\n ':
                    if text[end] == ',':
                        end += 1
                        break
                    if text[end] == '\n':
                        break
                    end += 1
                return text[i:end], i, end
    return None


cur = open(P, encoding='utf-8').read()
reg = load_regressed()
if not reg:
    print('FAIL: 取不到 202e7698 版本')
    sys.exit(1)

jobs = []
for s in SLUGS:
    b_new = extract_block(reg, s)
    b_old = extract_block(cur, s)
    if not b_new or not b_old:
        print('FAIL: 定位不到块', s, bool(b_new), bool(b_old))
        sys.exit(1)
    has_bc = '名片' in b_new[0]
    print('  %-28s 回归版块 %d 字符, 含名片=%s | 当前块 %d 字符' % (s, len(b_new[0]), has_bc, len(b_old[0])))
    if not has_bc:
        print('FAIL: 回归版该块不含「名片」, 中止 (避免接错)')
        sys.exit(1)
    jobs.append((s, b_old, b_new))

cur_keys = len(re.findall(r'": \{', cur))
print('  当前 key 数:', cur_keys)

if not APPLY:
    print('\n[DRY-RUN] 将替换 %d 个块, 其余不动' % len(jobs))
    sys.exit(0)

stamp = time.strftime('%Y%m%d-%H%M%S')
shutil.copy2(P, P + '.bak-bc-graft-' + stamp)
out = cur
for s, b_old, b_new in jobs:
    out = out.replace(b_old[0], b_new[0], 1)

new_keys = len(re.findall(r'": \{', out))
assert new_keys == cur_keys, 'key 数变化 %d -> %d' % (cur_keys, new_keys)
for s in SLUGS:
    assert '"%s": {' % s in out, 'slug 丢失 ' + s
open(P, 'w', encoding='utf-8', newline='\n').write(out)
print('\n[OK] 已写入; key 数不变 (%d); 备份 .bak-bc-graft-%s' % (new_keys, stamp))
