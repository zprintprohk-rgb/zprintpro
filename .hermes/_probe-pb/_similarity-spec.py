# -*- coding: utf-8 -*-
"""晚场: print-spec 相似度闸门 (新标题 vs 同 locale 篇目) + GSC 命中词保护 (0 删)"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'print-specifications-reference-guide-2026'
SAMPLE = ['roll-up-banner-printing-guide', 'hong-kong-printing-cost-baseline-2026',
          'folded-leaflet-printing-guide', 'cmyk-guide', 'design-file-specs',
          'a5-vs-a6-flyer-size', 'poster-printing-guide', 'campus-education-printing-pillar-guide']

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
    out = subprocess.run(['git', 'show', 'd9cfce55:src/data/blog-data/%s.json' % loc],
                         capture_output=True, encoding='utf-8')
    return json.loads(out.stdout)[SLUG]['content']

def heads(c):
    return ' '.join(re.sub(r'<[^>]+>', '', m.group(2)) for m in re.finditer(r'<(h2|h3)[^>]*>([\s\S]*?)</\1>', c))

ok = True
for loc in ['en', 'zh-hk', 'ja']:
    nh = norm(heads(wt(loc)))
    print('=== %s 新标题 shingles=%d ===' % (loc, len(sh(nh))))
    for s in SAMPLE:
        try:
            oc = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[s]['content']
        except KeyError:
            continue
        j = jac(nh, norm(oc))
        if j > 0.60:
            ok = False
        print('  vs %-40s %.1f%% %s' % (s, j * 100, '!!BLOCK' if j > 0.60 else 'OK'))
    print('  vs 自身旧标题 %.1f%%' % (jac(nh, norm(heads(old(loc)))) * 100))

print()
print('相似度闸门: %s' % ('PASS' if ok else 'BLOCKED'))

# GSC 命中词保护
PHR = {
    'en': ['A1-A6', 'CMYK', 'Pantone', 'PDF/X-1a', '300 DPI', 'FDA 21 CFR', 'EU REACH', 'FSC', 'print mode',
           'saddle stitch', 'bleed', 'offset', 'digital', 'menu', 'flyer', '18%'],
    'zh-hk': ['A1-A6', 'CMYK', 'Pantone', 'PDF/X-1a', '300 DPI', 'FDA 21 CFR', 'EU REACH', 'FSC', '印刷模式',
              '出血', '柯式', '數碼', '菜單', '摺頁', '18%', '退貨率'],
    'ja': ['A1-A6', 'CMYK', 'Pantone', 'PDF/X-1a', '300 DPI', 'FDA 21 CFR', 'EU REACH', 'FSC', '印刷モード',
           '塗り足し', 'オフセット', 'デジタル', 'メニュー', 'フライヤー', '18%', '返品率'],
}
allok = True
for loc, ps in PHR.items():
    b, a = old(loc), wt(loc)
    print('=== %s GSC 保护 ===' % loc)
    for p in ps:
        nb, na = b.count(p), a.count(p)
        if na < nb:
            allok = False
        print('  %-12s before=%d after=%d %s' % (p, nb, na, 'OK' if na >= nb else '!!DELETED'))
print('保护判定: %s' % ('全部 >= 修复前 (0 删)' if allok else '存在删除'))
