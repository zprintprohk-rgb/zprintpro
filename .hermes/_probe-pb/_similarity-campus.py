# -*- coding: utf-8 -*-
"""campus: 8-gram 相似度闸门 + GSC 保护 + 今日 cliff 检测"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'campus-education-printing-pillar-guide'
SAMPLE = ['school-exercise-book-printing-guide', 'textbook-printing-guide',
          'roll-up-banner-printing-guide', 'print-specifications-reference-guide-2026',
          'hong-kong-printing-cost-baseline-2026', 'poster-printing-guide']

def norm(s):
    return re.sub(r'[^0-9a-zA-Z\u3040-\u30ff\u4e00-\u9fff]+', '', re.sub(r'<[^>]+>', '', s).lower())

def sh(s, n=8):
    return set(s[i:i + n] for i in range(len(s) - n + 1))

def jac(a, b):
    A, B = sh(a), sh(b)
    return len(A & B) / len(A | B) if A and B else 0.0

def wt(loc):
    return json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[SLUG]['content']

def old(loc):
    out = subprocess.run(['git', 'show', 'HEAD:src/data/blog-data/%s.json' % loc],
                         capture_output=True, encoding='utf-8')
    return json.loads(out.stdout)[SLUG]['content']

def new_text(loc):
    c = wt(loc)
    parts = []
    for m in re.finditer(r'<h2[^>]*>([\s\S]*?)</h2>', c):
        t = re.sub(r'<[^>]+>', '', m.group(1))
        if 'Customer Case' in t or '客戶案例' in t or '顧客事例' in t or 'Certification Numbers' in t or '國際認證編號' in t or '国際認証番号' in t:
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
print('相似度闸门: %s' % ('PASS' if ok else 'BLOCKED'))

PHR = {
    'en': ['Campus', 'MOQ 100', 'HK$8-300', '5-7 working', 'campus journal', 'saddle stitch', 'FSC', 'FDA', 'EU REACH', 'roll-up', 'name sticker', 'ISO 9001', 'September'],
    'zh-hk': ['校園', '100 份', 'HK$8-300', '5-7 個工作天', '校刊', '騎馬釘', 'FSC', 'FDA', 'EU REACH', '易拉架', '姓名貼', 'ISO 9001', '9 月'],
    'ja': ['キャンパス', '100 部', 'HK$8-300', '5-7 営業日', '校刊', '中綴じ', 'FSC', 'FDA', 'EU REACH', 'ロールアップ', 'ネームステッカー', 'ISO 9001', '9 月'],
}
allok = True
for loc, ps in PHR.items():
    b, a = old(loc), wt(loc)
    for p in ps:
        nb, na = b.count(p), a.count(p)
        if na < nb:
            allok = False
            print('  !!DELETED %s %s before=%d after=%d' % (loc, p, nb, na))
print('GSC 保护: %s' % ('全部 >= 修复前 (0 删)' if allok else '存在删除'))
