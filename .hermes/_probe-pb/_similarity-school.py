# -*- coding: utf-8 -*-
"""school-exercise: 8-gram 相似度闸门 (重点同簇 campus/textbook) + GSC 命中词保护"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'school-exercise-book-printing-guide'
SAMPLE = ['campus-education-printing-pillar-guide', 'textbook-printing-guide',
          'roll-up-banner-printing-guide', 'hong-kong-printing-cost-baseline-2026',
          'print-specifications-reference-guide-2026', 'folded-leaflet-printing-guide',
          'poster-printing-guide']

def norm(s):
    s = re.sub(r'<[^>]+>', '', s)
    return re.sub(r'[^0-9a-zA-Z\u3040-\u30ff\u4e00-\u9fff]+', '', s.lower())

def sh(s, n=8):
    return set(s[i:i + n] for i in range(len(s) - n + 1))

def jac(a, b):
    A, B = sh(a), sh(b)
    return len(A & B) / len(A | B) if A and B else 0.0

def wt(loc):
    return json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[SLUG]['content']

def old(loc):
    out = subprocess.run(['git', 'show', 'e4c3dcdd:src/data/blog-data/%s.json' % loc],
                         capture_output=True, encoding='utf-8')
    return json.loads(out.stdout)[SLUG]['content']

def new_text(loc):
    """本次新增 = 当前内容 - 旧内容 的近似: 取新 H2/H3 段 + QA divs + 表格 + 首段"""
    c = wt(loc)
    parts = []
    # QA divs
    for m in re.finditer(r'<div class="bg-[^"]*">[\s\S]*?</div>', c):
        parts.append(m.group(0))
    # 表格
    for m in re.finditer(r'<table[\s\S]*?</table>', c):
        parts.append(m.group(0))
    # 新段 (EEAT/文件规格/Q4/流程/成本/罫線/配送) — 按关键词
    kws = ['file specs', 'compliance applies', 'Q4 order', '発注フロー', 'コスト最適化', '罫線はどう選ぶ', '配送とアフター',
           '檔案規格', '合規認證', '幾時落單', '規格？', '什么规格']
    for m in re.finditer(r'<h2[^>]*>([\s\S]*?)</h2>', c):
        t = re.sub(r'<[^>]+>', '', m.group(1))
        if any(k in t for k in kws):
            start = m.start()
            nxt = c.find('<h2', m.end())
            parts.append(c[start:nxt if nxt > 0 else len(c)])
    return ' '.join(parts)

ok = True
for loc in ['en', 'zh-hk', 'ja']:
    nt = norm(new_text(loc))
    print('=== %s 新增 shingles=%d ===' % (loc, len(sh(nt))))
    for s in SAMPLE:
        try:
            oc = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[s]['content']
        except KeyError:
            continue
        j = jac(nt, norm(oc))
        if j > 0.60:
            ok = False
        print('  vs %-42s %.1f%% %s' % (s, j * 100, '!!BLOCK' if j > 0.60 else 'OK'))
    print('  vs 自身旧版 %.1f%%' % (jac(nt, norm(old(loc))) * 100))

print()
print('相似度闸门: %s' % ('PASS' if ok else 'BLOCKED'))

PHR = {
    'en': ['100 MOQ', '5,000+', '60gsm', '80gsm', 'wood-free', 'saddle stitch', 'PUR', 'wire-O', 'A4', 'B5', 'A5', '16K',
           'HK$3.5', 'FSC', 'FDA', 'EU REACH', 'DHL', 'SF Express', 'back-to-school', '10,000'],
    'zh-hk': ['100 本', '5,000 本', '60gsm', '80gsm', '道林紙', '騎馬釘', 'PUR', '線圈', 'A4', 'B5', 'A5', '16K',
              'HK$3.5', 'FSC', 'FDA', 'EU REACH', 'DHL', '順豐', '開學季', '10,000'],
    'ja': ['100 冊', '5,000', '60gsm', '80gsm', '上質紙', '中綴じ', 'PUR', 'ワイヤー', 'A4', 'B5', 'A5', '16K',
           'HK$3.5', 'FSC', 'FDA', 'EU REACH', 'DHL', '順豊', '新学期', '10,000'],
}
allok = True
for loc, ps in PHR.items():
    b, a = old(loc), wt(loc)
    print('=== %s GSC 保护 ===' % loc)
    for p in ps:
        nb, na = b.count(p), a.count(p)
        if na < nb:
            allok = False
        print('  %-14s before=%d after=%d %s' % (p, nb, na, 'OK' if na >= nb else '!!DELETED'))
print('保护判定: %s' % ('全部 >= 修复前 (0 删)' if allok else '存在删除'))
