# -*- coding: utf-8 -*-
"""poster/packaging: 相似度闸门 (新增文本 vs 同 locale) + GSC 保护"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def norm(s):
    return re.sub(r'[^0-9a-zA-Z\u3040-\u30ff\u4e00-\u9fff]+', '', re.sub(r'<[^>]+>', '', s).lower())
def sh(s, n=8):
    return set(s[i:i + n] for i in range(len(s) - n + 1))
def jac(a, b):
    A, B = sh(a), sh(b)
    return len(A & B) / len(A | B) if A and B else 0.0
def wt(loc, slug):
    return json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[slug]['content']
def old(loc, slug):
    out = subprocess.run(['git', 'show', 'HEAD:src/data/blog-data/%s.json' % loc], capture_output=True, encoding='utf-8')
    return json.loads(out.stdout)[slug]['content']

SAMPLES = ['poster-printing-guide', 'packaging-box-pricing-2026', 'school-exercise-book-printing-guide',
           'campus-education-printing-pillar-guide', 'print-specifications-reference-guide-2026',
           'roll-up-banner-printing-guide', 'sticker-material-pvc-vinyl-removable']

ok = True
for loc in ['en', 'zh-hk', 'ja']:
    cur = wt(loc, 'poster-printing-guide')
    ov = old(loc, 'poster-printing-guide')
    # 新增 = 当前 - 旧版 (按 H2 段)
    new_parts = []
    for m in re.finditer(r'<h2[^>]*>([\s\S]*?)</h2>', cur):
        t = re.sub(r'<[^>]+>', '', m.group(1))
        if 'Customer Case' in t or '顧客事例' in t:
            start = m.start(); nxt = cur.find('<h3', m.end())
            new_parts.append(cur[start:nxt if nxt > 0 else len(cur)])
    nt = norm(' '.join(new_parts))
    if not nt:
        print('=== %s: poster 无新增段(zh) ===' % loc); continue
    print('=== %s poster 新增 shingles=%d ===' % (loc, len(sh(nt))))
    for s in SAMPLES:
        try:
            oc = wt(loc, s)
        except KeyError:
            continue
        j = jac(nt, norm(oc))
        if j > 0.60: ok = False
        print('  vs %-40s %.1f%% %s' % (s, j * 100, '!!BLOCK' if j > 0.60 else 'OK'))
    print('  vs 自身旧版 %.1f%%' % (jac(nt, norm(ov)) * 100))
print('相似度闸门: %s' % ('PASS' if ok else 'BLOCKED'))

# GSC 保护
PHR = {
    'en': ['poster', 'A3', 'A2', 'A1', 'A0', 'HK$9', 'HK$45', '157gsm', '3-5 working', 'FDA', 'EU REACH', 'FSC'],
    'zh-hk': ['海報', 'A3', 'A2', 'A1', 'A0', 'HK$9', '157g', '3-5 個工作天', 'FDA', 'EU REACH', 'FSC'],
    'ja': ['ポスター', 'A3', 'A2', 'A1', 'A0', 'HK$9', '157', '3〜5 営業日', 'FDA', 'EU REACH', 'FSC'],
}
allok = True
for loc, ps in PHR.items():
    b = old(loc, 'poster-printing-guide'); a = wt(loc, 'poster-printing-guide')
    for p in ps:
        nb, na = b.count(p), a.count(p)
        if na < nb:
            allok = False
            print('  !!DELETED poster %s %s %d->%d' % (loc, p, nb, na))
    bp = old(loc, 'packaging-box-pricing-2026'); ap = wt(loc, 'packaging-box-pricing-2026')
    for p in ['BOX', 'FDA', 'EU REACH', 'QUV', '素材', '材質', '加工']:
        nb, na = bp.count(p), ap.count(p)
        if na < nb:
            allok = False
            print('  !!DELETED packaging %s %s %d->%d' % (loc, p, nb, na))
print('GSC 保护: %s' % ('全部 >= 修复前 (0 删)' if allok else '存在删除'))
