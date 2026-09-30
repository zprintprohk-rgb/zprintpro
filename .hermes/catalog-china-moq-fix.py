# -*- coding: utf-8 -*-
"""catalog-printing-china page: 50 MOQ -> 10 MOQ truth (products.ts catalog-printing minQuantity=10)
价格档 50 本/50 pcs/50部 保留(真实价格档), 仅改 MOQ 声明。packaging 卡 50->100 (真值)。
"""
import io

P = r'F:\zprintpro-nextjs\src\app\[locale]\services\catalog-printing-china\page.tsx'
s = io.open(P, encoding='utf-8').read()

pairs = [
    ('| 50 MOQ + Shenzhen Factory + DHL 2-4 Days |', '| 10 MOQ + Shenzhen Factory + DHL 2-4 Days |', 2),
    ('Shenzhen factory, 50 MOQ, free file check', 'Shenzhen factory, 10 MOQ, free file check', 2),
    ('50部から・深セン工場', '10部から・深セン工場', 1),
    ('50部から対応、無料ファイルチェック', '10部から対応、無料ファイルチェック', 1),
    ('カタログ印刷 50部,', 'カタログ印刷 10部,', 1),
    ('Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days', 'Shenzhen Factory Direct, 10 MOQ, DHL 2-4 Days', 2),
    ('50 本起印, 30 秒 AI 即時報價', '10 本起印, 30 秒 AI 即時報價', 1),
    ('MOQ 50 / DHL 2-4 天', 'MOQ 10 / DHL 2-4 天', 1),
    ('錘 2 · MOQ 50 + 免費打樣', '錘 2 · MOQ 10 + 免費打樣', 1),
    ('我方 MOQ 50 + 免費 file check', '我方 MOQ 10 + 免費 file check', 1),
    ('MOQ 50 本 (vs 100 本)', 'MOQ 10 本 (vs 100 本)', 1),
    ("{ feature: '最低起印量 (MOQ)', us: '50 本', qin: '500-1000 本', usBetter: true }", "{ feature: '最低起印量 (MOQ)', us: '10 本', qin: '500-1000 本', usBetter: true }", 1),
    ("{ q: 'MOQ 真係 50 本？', a: '係, 50 本起印", "{ q: 'MOQ 真係 10 本？', a: '係, 10 本起印", 1),
    ('Shenzhen factory, 50 MOQ, 30-second AI quote', 'Shenzhen factory, 10 MOQ, 30-second AI quote', 1),
    ('30s AI Quote / 50 MOQ / DHL 2-4 Days', '30s AI Quote / 10 MOQ / DHL 2-4 Days', 1),
    ('Hammer 2 · 50 MOQ + Free File Check', 'Hammer 2 · 10 MOQ + Free File Check', 1),
    ('We offer 50 MOQ + free file check', 'We offer 10 MOQ + free file check', 1),
    ("'50 pcs MOQ (vs 100 pcs)'", "'10 pcs MOQ (vs 100 pcs)'", 1),
    ("{ feature: 'Minimum Order (MOQ)', us: '50 pcs', qin: '500-1000 pcs', usBetter: true }", "{ feature: 'Minimum Order (MOQ)', us: '10 pcs', qin: '500-1000 pcs', usBetter: true }", 1),
    ("{ q: 'Is the MOQ really 50 pcs?', a: 'Yes, 50 pcs MOQ", "{ q: 'Is the MOQ really 10 pcs?', a: 'Yes, 10 pcs MOQ", 1),
    ('深セン工場直送・50部から・DHL', '深セン工場直送・10部から・DHL', 1),
    ('50部から対応, 30秒AI無料見積もり', '10部から対応, 30秒AI無料見積もり', 1),
    ('30秒AI見積もり・50部から・DHL 2-4日', '30秒AI見積もり・10部から・DHL 2-4日', 1),
    ('強み2・50部から+無料ファイルチェック', '強み2・10部から+無料ファイルチェック', 1),
    ('当社 50部から+無料ファイルチェック', '当社 10部から+無料ファイルチェック', 1),
    ("'50部から（vs 100部）'", "'10部から（vs 100部）'", 1),
    ("{ feature: '最低発注量 (MOQ)', us: '50部', qin: '500-1000部', usBetter: true }", "{ feature: '最低発注量 (MOQ)', us: '10部', qin: '500-1000部', usBetter: true }", 1),
    ("{ q: '本当にMOQ 50部からですか？', a: 'はい, 50部から対応", "{ q: '本当にMOQ 10部からですか？', a: 'はい, 10部から対応", 1),
    ("'Saddle stitch / perfect bound / wire-O / hardcover — 50 MOQ'", "'Saddle stitch / perfect bound / wire-O / hardcover — 10 MOQ'", 1),
    ("'中綴じ・無線綴じ・Wire-O・上製本 — 50部から'", "'中綴じ・無線綴じ・Wire-O・上製本 — 10部から'", 1),
    ("'騎馬釘 / 膠裝 / Wire-O / 精裝 — 50 本起'", "'騎馬釘 / 膠裝 / Wire-O / 精裝 — 10 本起'", 1),
    ("'Custom mailer boxes + gift boxes — 50 MOQ'", "'Custom mailer boxes + gift boxes — 100 MOQ'", 1),
    ("'カスタムメーラーボックス+ギフトボックス — 50部から'", "'カスタムメーラーボックス+ギフトボックス — 100個から'", 1),
    ("'訂製郵寄盒 + 禮品盒 — 50 個起'", "'訂製郵寄盒 + 禮品盒 — 100 個起'", 1),
]

fails = []
for old, new, want in pairs:
    got = s.count(old)
    if got != want:
        fails.append((old[:60], want, got))
    else:
        s = s.replace(old, new)

if fails:
    print('FAIL:')
    for f in fails:
        print(' ', f)
else:
    io.open(P, 'w', encoding='utf-8', newline='\n').write(s)
    print('ALL %d pairs applied OK' % len(pairs))
    # verify no stale MOQ-50 declarations remain (price tiers 50本/50pcs/50部 excluded)
    import re
    stale = [l for l in s.split('\n') if re.search(r"MOQ[^\n]*50|50[^\n]*MOQ|最低起印量[^\n]*50|最低発注量[^\n]*50", l) and 'vs' not in l]
    print('residual MOQ-50 lines: %d' % len(stale))
    for l in stale[:6]:
        print('  ', l.strip()[:110])
