# -*- coding: utf-8 -*-
"""sticker: GSC 保护 (before/after 短语计数) + 8-gram 相似度"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'sticker-guide'

def norm(s):
    return re.sub(r'[^0-9a-zA-Z\u3040-\u30ff\u4e00-\u9fff]+', '', re.sub(r'<[^>]+>', '', s).lower())

def sh(s, n=8):
    return set(s[i:i + n] for i in range(len(s) - n + 1))

def jac(a, b):
    A, B = sh(a), sh(b)
    return len(A & B) / len(A | B) if A and B else 0.0

wt = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))[SLUG]['content']
out = subprocess.run(['git', 'show', 'HEAD:src/data/blog-data/zh-hk.json'], capture_output=True, encoding='utf-8')
old = json.loads(out.stdout)[SLUG]['content']

PHR = ['貼紙印刷', '貼紙訂製', '防水貼紙', '透明貼紙', '可移貼紙', '異形', '燙金', '防偽', '10 張',
       'HK$0.22', 'HK$0.38', '5-7 個工作天', 'PVC', 'FDA', 'EU REACH', 'DHL', '順豐', '小批量']
print('=== GSC 保护 ===')
ok = True
for p in PHR:
    b, a = old.count(p), wt.count(p)
    if a < b:
        ok = False
    print('  %-14s before=%d after=%d %s' % (p, b, a, 'OK' if a >= b else '!!DELETED'))
print('保护判定:', 'PASS (0 删)' if ok else 'FAIL')

# 新增文本近似 = 本次新增块: 新 QA 块/atoms/author/lead-time 句
new_parts = []
for pat in [r'<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>貼紙最低幾多張？</strong>[\s\S]*?</div>',
            r'<section data-geo-atoms="2026-10-31"[\s\S]*?</section>',
            r'<p>想睇齊全規格同即時報價[\s\S]*?</p>']:
    m = re.search(pat, wt)
    if m:
        new_parts.append(m.group(0))
nt = norm(' '.join(new_parts))
print('\n=== 相似度 (新增 %d shingles) ===' % len(sh(nt)))
SAMPLE = ['flyer-printing-guide', 'sticker-material-pvc-vinyl-removable', 'roll-up-banner-printing-guide',
          'school-exercise-book-printing-guide', 'campus-education-printing-pillar-guide', 'poster-printing-guide']
ok2 = True
for s in SAMPLE:
    try:
        oc = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))[s]['content']
    except KeyError:
        continue
    j = jac(nt, norm(oc))
    if j > 0.60:
        ok2 = False
    print('  vs %-42s %.1f%% %s' % (s, j * 100, '!!BLOCK' if j > 0.60 else 'OK'))
print('自身旧版 %.1f%%' % (jac(nt, norm(old)) * 100))
print('相似度闸门:', 'PASS' if ok2 else 'BLOCKED')
