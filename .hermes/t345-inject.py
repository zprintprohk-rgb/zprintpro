# -*- coding: utf-8 -*-
"""T3 catalog blog links + T5b A6 quickAnswer x3 + T4 ja doujin links x2"""
import io, json

def load(p):
    return json.load(io.open(p, encoding='utf-8'))

def save(p, d):
    io.open(p, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))

log = []

# --- T3: en catalog blogs -> /en/services/catalog-printing-china/ ---
pe = r'F:\zprintpro-nextjs\src\data\blog-data\en.json'
d = load(pe)
ins1 = '<p>Need factory-direct pricing? Our <a href="/en/services/catalog-printing-china/" class="text-[#1A56DB] underline">China catalog printing</a> service starts at 10 MOQ with DHL 2-4 day global delivery — 30-40% cheaper than Western printers.</p>'
c = d['catalog-printing-guide']['content']
assert 'catalog-printing-china' not in c
i = c.find('</p>')
d['catalog-printing-guide']['content'] = c[:i+4] + '\n' + ins1 + c[i+4:]
log.append('T3 catalog-printing-guide linked')

ins2 = '<p>Ready to print? Get a <a href="/en/services/catalog-printing-china/" class="text-[#1A56DB] underline">China catalog printing quote</a> in 30 seconds — Shenzhen factory, 10 MOQ, free file check, DHL 2-4 days worldwide.</p>'
c = d['catalog-printing-china-supplier-guide']['content']
assert 'catalog-printing-china' not in c
i = c.find('</p>')
d['catalog-printing-china-supplier-guide']['content'] = c[:i+4] + '\n' + ins2 + c[i+4:]
log.append('T3 supplier-guide linked')
save(pe, d)

# --- T5b: poster-size-guide A6 quickAnswer x3 locale ---
a6 = {
    'zh-hk': '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 尺寸速查</p><p><strong>A6 = 105×148mm</strong>（A5 的一半），最常用的小型宣傳單張 / 邀請卡 / 明信片尺寸，1 張起印，3-5 個工作天交期。</p></div>\n',
    'en': '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ Quick Answer</p><p><strong>A6 = 105×148mm</strong> (half of A5) — the standard small flyer / invitation / postcard size. Prints from a single piece with 3-5 day turnaround.</p></div>\n',
    'ja': '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ サイズ早見表</p><p><strong>A6 = 105×148mm</strong>（A5 の半分）— 小型チラシ・招待状・葉書の標準サイズ。1枚から、3-5営業日納期。</p></div>\n',
}
for loc in ['zh-hk', 'en', 'ja']:
    p = r'F:\zprintpro-nextjs\src\data\blog-data\%s.json' % loc
    d = load(p)
    c = d['poster-size-guide']['content']
    assert 'A6 = 105×148' not in c, loc + ' A6 already present'
    i = c.find('<h2')
    assert i > 0, loc + ' no h2'
    d['poster-size-guide']['content'] = c[:i] + a6[loc] + c[i:]
    save(p, d)
    log.append('T5b A6 quickAnswer: ' + loc)

# --- T4: ja doujin blogs -> /ja/category/japan-doujin/ anchor コミケ 印刷 ---
pj = r'F:\zprintpro-nextjs\src\data\blog-data\ja.json'
d = load(pj)
c = d['doujin-circle-printing-guide']['content']
assert '/ja/category/japan-doujin/' not in c
d['doujin-circle-printing-guide']['content'] = c + '\n<p>■ まとめ: コミケ出展の印刷品は<a href="/ja/category/japan-doujin/" class="text-[#1A56DB] underline">コミケ 印刷カテゴリ</a>で一括発注できます。</p>'
log.append('T4 doujin-circle linked (end)')

c = d['comiket-printing-prep-guide']['content']
assert '/ja/category/japan-doujin/' not in c
ins3 = '<p>コミケ向け一括発注は<a href="/ja/category/japan-doujin/" class="text-[#1A56DB] underline">コミケ 印刷カテゴリ</a>でどうぞ。</p>\n'
i = c.find('<h2')
d['comiket-printing-prep-guide']['content'] = c[:i] + ins3 + c[i:]
log.append('T4 comiket-prep linked (top)')
save(pj, d)

for l in log:
    print('OK', l)
