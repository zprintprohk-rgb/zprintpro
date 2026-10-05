# -*- coding: utf-8 -*-
"""A6: K3 bigword batch — 3 category FAQ + 3 blog anchor injections"""
import io, json

P = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
lines = io.open(P, encoding='utf-8').read().split('\n')

INS = {
    2355: [  # educational zh faq
        "      { q: '校簿印刷係咪即係練習簿？幾多本起印？', a: '係，校簿即學校練習簿（作業簿）。10 本起印，封面可燙金校名同校徽，內頁 80-100gsm 書紙，學校同補習社批量訂購有折扣。免費打稿，3-5 個工作天交貨。' },",
    ],
    3080: [  # flyers zh faq
        "      { q: '摺頁傳單有咩摺法？', a: '常見三種：對摺（A4→A5）、三摺（A4→DL 99×210mm 免信封入郵筒）、風琴摺（多頁產品目錄）。三摺 DL 係直郵標準尺寸。10 張起印，免費打稿。' },",
    ],
    3398: [  # banners zh faq
        "      { q: '易拉架印刷幾錢？幾時交貨？', a: '標準 850×2000mm 套價 HK$85-300（視布料同後加工），10 套起印，5-7 個工作天交貨，1 小時免費數碼打稿。最大 1200×3000mm，布料三選：防水帆布／網孔布／旗幟布。' },",
    ],
}
for ln in sorted(INS.keys(), reverse=True):
    assert lines[ln - 1].strip() == 'faq: [', 'L%d: %s' % (ln, lines[ln - 1].strip()[:40])
    for entry in reversed(INS[ln]):
        lines.insert(ln, entry)
io.open(P, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))
print('category FAQ x3 OK')

# --- blog anchors ---
PZ = r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json'
d = json.load(io.open(PZ, encoding='utf-8'))

c = d['poster-printing-guide']['content']
assert '/zh-hk/category/posters/' not in c
i = c.find('</p>')
d['poster-printing-guide']['content'] = c[:i+4] + '\n<p>落單前想睇實價同交期，直接到<a href="/zh-hk/category/posters/" class="text-[#1A56DB] underline">海報印刷</a>類目頁，30 秒 AI 報價即時計數。</p>' + c[i+4:]
print('poster-printing-guide linked')

c = d['real-estate-floor-plan-poster-printing-guide']['content']
assert '/zh-hk/category/posters/' not in c
i = c.find('</p>')
d['real-estate-floor-plan-poster-printing-guide']['content'] = c[:i+4] + '\n<p>平面圖放售樓書前，可先喺<a href="/zh-hk/category/posters/" class="text-[#1A56DB] underline">海報印刷</a>類目頁攞批量報價（A2/A1 大尺寸 1 張起印）。</p>' + c[i+4:]
print('floor-plan-poster linked')

c = d['sticker-guide']['content']
assert '貼紙訂製' not in c.split('</p>')[0]
i = c.find('</p>')
d['sticker-guide']['content'] = c[:i+4] + '\n<p>想直接落單？<a href="/zh-hk/category/stickers/" class="text-[#1A56DB] underline">貼紙訂製</a>10 張起印，防水／可移／透明材質全線對應。</p>' + c[i+4:]
print('sticker-guide variant anchor added')

io.open(PZ, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
print('blog-data written')
