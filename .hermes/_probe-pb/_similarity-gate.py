# -*- coding: utf-8 -*-
"""恢复模式相似度闸门: 新插入文本 vs 同 locale 现存 blog + 自身旧版 的 8-gram Jaccard (>60% 停手)"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'hong-kong-printing-cost-baseline-2026'
SAMPLE = ['calendar-printing-guide', '2027-monthly-calendar-printing-timetable',
          'hong-kong-printing-guide', 'folded-leaflet-printing-guide',
          'roll-up-banner-printing-guide', 'poster-printing-guide',
          'packaging-box-pricing-2026', 'print-specifications-reference-guide-2026']

def norm(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'[^0-9a-zA-Z\u3040-\u30ff\u4e00-\u9fff]+', '', s.lower())
    return s

def shingles(s, n=8):
    return set(s[i:i + n] for i in range(len(s) - n + 1))

def jaccard(a, b):
    sa, sb = shingles(a), shingles(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)

def content(loc, slug, commit=None):
    if commit:
        out = subprocess.run(['git', 'show', '%s:src/data/blog-data/%s.json' % (commit, loc)],
                             capture_output=True, encoding='utf-8')
        return json.loads(out.stdout)[slug]['content']
    return json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[slug]['content']

def new_text(loc):
    """本次新增 = 新 H2 段 + QA 块 + (en) 前置段"""
    c = content(loc, SLUG)
    old = content(loc, SLUG, 'e2ece10a^')
    # 近似: 新增 = 当前内容中不在旧版中的部分 (按 H2 段切分, 取新 H2 段 + 新 QA div)
    parts = []
    for m in re.finditer(r'<h2[^>]*>(.*?)</h2>', c, re.S):
        t = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        if any(k in t for k in ['wholesale buyer', 'compliance applies', 'calendar printing prices',
                                '批發買家', '合規要求', '月曆印刷價格', '卸売バイヤー', 'コンプライアンス', 'カレンダー印刷の価格']):
            start = m.start()
            end = c.find('<h2', m.end()) if c.find('<h2', m.end()) > 0 else len(c)
            parts.append(c[start:end])
    # QA divs
    for m in re.finditer(r'<div class="bg-[^"]*">([\s\S]*?)</div>', c):
        parts.append(m.group(0))
    if loc == 'en':
        fm = re.search(r'<p[^>]*>([\s\S]*?)</p>', c)
        parts.append(fm.group(0))
    return ' '.join(parts)

ok = True
for loc in ['en', 'zh-hk', 'ja']:
    nt = norm(new_text(loc))
    print('=== %s 新增文本 shingles=%d ===' % (loc, len(shingles(nt))))
    for other in SAMPLE:
        try:
            oc = content(loc, other)
        except KeyError:
            continue
        j = jaccard(nt, norm(oc))
        flag = '!!>60% BLOCK' if j > 0.60 else 'OK'
        if j > 0.60:
            ok = False
        print('  vs %-42s %.1f%% %s' % (other, j * 100, flag))
    # 自身旧版 (排除重复)
    jself = jaccard(nt, norm(content(loc, SLUG, 'e2ece10a^')))
    print('  vs 自身旧版 %.1f%% %s' % (jself * 100, 'OK' if jself <= 0.60 else '!!>60% BLOCK'))
    if jself > 0.60:
        ok = False

print()
print('相似度闸门: %s' % ('PASS (全部 <=60%%)' if ok else 'BLOCKED (有 >60%% 相似对, 须停手)'))
