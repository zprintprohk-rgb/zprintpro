# -*- coding: utf-8 -*-
# 退场词 title 修复 (SSoT 支撑: red-packets ja 64 / saddle ja 258 / yearbook zh 45)
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
base = r'F:\zprintpro-nextjs\src\data\blog-data'

def load(loc):
    return json.load(open(base + '\\' + loc + '.json', encoding='utf-8'))
def save(loc, data):
    json.dump(data, open(base + '\\' + loc + '.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

REPL = [
    # 燙金利是封 ja: HK$1.1 币种 → ¥64 (red-packets ja SSoT)
    ('ja', 'cny-2027-red-packet-printing-guide',
     '2027年 ポチ袋印刷：箔押し 100 枚から HK$1.1 起 | ZprintPro',
     '2027年 ポチ袋印刷：箔押し 100枚から ¥64 起 | ZprintPro'),
    # 中綴じ冊子激安 ja: title 加价格钩子 ¥258 (saddle ja SSoT), 原 69 当量超阻断线
    ('ja', 'saddle-stitch-booklet-printing-guide',
     '中綴じ冊子印刷完全ガイド：ページ数・用紙・価格・低 MOQ | 10冊から対応',
     '中綴じ冊子印刷 10冊から ¥258/冊〜 低MOQ ZprintPro'),
    # 畢業紀念冊 zh: title 加 HK$45 起 (yearbook zh SSoT)
    ('zh-hk', 'graduation-yearbook-printing-guide',
     '畢業紀念冊印刷指南 · 香港中學大學院校定制方案 | 智印港',
     '畢業紀念冊印刷 HK$45起 · 香港中學大學院校定制方案 智印港'),
]
data = {}
for loc in ['ja', 'zh-hk']:
    data[loc] = load(loc)
ok = 0
for loc, slug, old, new in REPL:
    e = data[loc].get(slug)
    if not e:
        print(f'MISSING {loc}/{slug}'); continue
    cur = e.get('title', '')
    n = cur.count(old)
    if n != 1:
        print(f'FAIL count={n} {loc}/{slug}: old={old[:40]} | cur={cur[:60]}')
        continue
    e['title'] = cur.replace(old, new)
    print(f'OK {loc}/{slug}: {old[:36]} -> {new[:40]}')
    ok += 1
for loc in ['ja', 'zh-hk']:
    save(loc, data[loc])
print(f'done {ok}/3')
