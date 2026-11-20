# -*- coding: utf-8 -*-
# P0-1 补漏: paper-bag zh/ja + poster-size zh/ja 币种串 (上轮改价未改币种)
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
base = r'F:\zprintpro-nextjs\src\data\blog-data'

def load(loc):
    return json.load(open(base + '\\' + loc + '.json', encoding='utf-8'))

def save(loc, data):
    # 保序 + 缩进一致 (indent=2), 由 check-encoding --fix 收尾
    json.dump(data, open(base + '\\' + loc + '.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# 精确替换表: (locale, slug, 旧串, 新串)
REPL = [
    # paper-bag zh: US$1.84 -> HK$8 (zh kraft SSoT basePrice 8), 语境=1000张含logo标准价
    ('zh-hk', 'paper-bag-printing-guide', '標準價 US$1.84 起/張', '標準價 HK$8 起/個'),
    # paper-bag ja: US$1.84 -> ¥240 (ja kraft SSoT 240)
    ('ja', 'paper-bag-printing-guide', '標準価格 US$1.84 起/枚', '標準価格 ¥240 から/枚'),
    # poster-size zh: US$2.30 -> HK$9 (a2 zh SSoT 9起)
    ('zh-hk', 'poster-size-guide', 'A2 數碼印 US$2.30 起/張（10 張起印）', 'A2 數碼印 HK$9 起/張（10 張起印）'),
    # poster-size ja: US$2.30 -> ¥300 (a2 ja SSoT 300)
    ('ja', 'poster-size-guide', 'A2 デジタル印刷 US$2.30/枚から（10 枚〜MOQ）', 'A2 デジタル印刷 ¥300/枚から（10 枚〜MOQ）'),
]
data = {}
for loc in ['zh-hk', 'ja']:
    data[loc] = load(loc)
for loc, slug, old, new in REPL:
    entry = data[loc].get(slug)
    if not entry:
        print(f'MISSING {loc}/{slug}'); continue
    c = entry.get('content', '')
    n = c.count(old)
    if n == 0:
        print(f'NOT FOUND {loc}/{slug}: {old[:40]}')
    elif n > 1:
        print(f'AMBIGUOUS {loc}/{slug}: {n}x {old[:40]}')
    else:
        entry['content'] = c.replace(old, new)
        print(f'OK {loc}/{slug}: {old[:34]} -> {new[:34]}')
for loc in ['zh-hk', 'ja']:
    save(loc, data[loc])
print('done')
