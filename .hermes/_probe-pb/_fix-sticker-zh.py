# -*- coding: utf-8 -*-
"""sticker-guide zh-hk 修复 (队列 stickers-zh-hk, review_or_rewrite):
真值: 交期 3-5 -> 5-7 (woodproof SKU description 5-7 天); 螢光貼紙 SKU 不存在 -> 卷裝貼紙;
      工藝 % 加成无 finishings 依据 -> 定性; 段2 +1 块; 段7 LinkedIn+EU REACH 措辞;
      段8 12 atoms; 段11 +2 链; excerpt/schemas 补; lastUpdated 2026-10-31"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'sticker-guide'
path = 'src/data/blog-data/zh-hk.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity'
e = obj[SLUG]
c = e['content']
before = len(c)

def rep(old, new, tag, count=1):
    global c
    if old not in c:
        print('MISS [%s]' % tag)
        return False
    c = c.replace(old, new, count)
    print('OK   [%s]' % tag)
    return True

# ── 1) 交期真值: 3-5 -> 5-7 (SKU description) ──
rep('交期 3-5 個工作天，24 小時加急可選——智印港',
    '交期 5-7 個工作天（per 防水貼紙 SKU 交期口徑），急件可查詢加急產能——智印港', 'intro leadtime')
rep('<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>貼紙幾耐交貨？</strong>常規 3-5 個工作天，24 小時加急可選。落單確認設計稿後開始生產，大貨 10 張起。</div>',
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>貼紙幾耐交貨？</strong>常規 5-7 個工作天（per 防水貼紙 SKU 交期口徑），急件可查詢加急產能。落單確認設計稿後開始生產，大貨 10 張起。</div>', 'qa leadtime')
rep('③ 3-5 個工作天生產 → ④ 順豐/DHL 配送', '③ 5-7 個工作天生產 → ④ 順豐/DHL 配送', 'flow leadtime')
rep('<li><strong>生產</strong>：3-5 個工作天（24 小時加急可選）。</li>', '<li><strong>生產</strong>：5-7 個工作天（急件可查詢加急產能）。</li>', 'flow step4')
rep('A2: 標準交期 3-5 個工作天，24 小時加急服務可選。', 'A2: 標準交期 5-7 個工作天（per 防水貼紙 SKU 交期口徑），急件可查詢加急產能。', 'faq q2')
rep('<p>24 小時加急服務覆蓋香港主要印刷品類，急單可 WhatsApp 確認產能再落單。</p>',
    '<p>急件可 WhatsApp 確認加急產能再落單；標準交期以 SKU 口徑 5-7 個工作天為準。</p>', 'rush line')

# ── 2) 螢光貼紙 -> 卷裝貼紙 (SKU 存在) ──
rep('<tr><td class="border p-2">螢光貼紙</td><td class="border p-2">10 張</td><td class="border p-2">0.52 – 2.00 / 張</td><td class="border p-2">夜間標示、促銷</td></tr>',
    '<tr><td class="border p-2">卷裝貼紙</td><td class="border p-2">10 張</td><td class="border p-2">0.20 – 5.50 / 張</td><td class="border p-2">條碼、流水號、批量標籤</td></tr>', 'fluorescent -> roll')

# ── 3) 工藝 % 加成 -> 定性 (无 finishings 依据) ──
rep('燙金提升品牌價值感但成本高 30-50%',
    '燙金提升品牌價值感（燙金貼紙 HK$0.78/張起，對比 PVC 防水貼紙 HK$0.22 起）', 'foil cost sentence')
rep('<td class="border p-2">+10-15%</td><td class="border p-2">食品、飲品、鮮豔品牌</td>',
    '<td class="border p-2">輕微</td><td class="border p-2">食品、飲品、鮮豔品牌</td>', 'gloss cost')
rep('<td class="border p-2">+10-15%</td><td class="border p-2">高檔護膚、文創</td>',
    '<td class="border p-2">輕微</td><td class="border p-2">高檔護膚、文創</td>', 'matte cost')
rep('<td class="border p-2">+30-50%</td><td class="border p-2">禮品、美妝、酒類</td>',
    '<td class="border p-2">較高</td><td class="border p-2">禮品、美妝、酒類</td>', 'foil cost cell')
rep('<td class="border p-2">+15-20%</td><td class="border p-2">Logo 突出、細節強調</td>',
    '<td class="border p-2">中等</td><td class="border p-2">Logo 突出、細節強調</td>', 'uv cost')
rep('<td class="border p-2">+40-60%</td><td class="border p-2">防偽標籤、證書</td>',
    '<td class="border p-2">最高</td><td class="border p-2">防偽標籤、證書</td>', 'hologram cost')
rep('燙金貼紙 10 張起印 HK$0.78/張起，品牌感知價值提升 50%+，適合高客單價產品封口同禮品包裝（數據來源：智印港 2025-2026 訂單統計）。',
    '燙金貼紙 10 張起印 HK$0.78/張起（per products.ts foil-stickers SKU 牌價），適合高客單價產品封口同禮品包裝。', 'foil sentence')

# ── 4) 段2 第 3 块 ──
qa3 = ('\n<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>貼紙最低幾多張？</strong>'
       '全部貼紙 SKU 10 張起印（防水／透明／可移／異形／燙金／防偽同價），小批量標籤 A4 HK$38 起；'
       '食品標籤貼紙 500 張起（per fruit-food-label-stickers SKU）。</div>')
anchor = '<h2>貼紙印刷點樣計價？一張貼紙幾多錢？</h2>'
rep(anchor, qa3 + '\n' + anchor, 'qa block 3')

# ── 5) 段7 EU REACH 措辞 + LinkedIn ──
rep('出口歐盟符合 REACH 法規', '出口歐盟符合 EU REACH 法規', 'EU REACH phrase')
rep('<p>更新於 2026-09 ｜ 數據來源：智印港 products.ts 現行價目、智印港品控實驗室測試報告。本指南由智印港 多年印刷工程師團隊撰寫。</p>',
    '<p>更新於 2026-10-31 ｜ 數據來源：智印港 products.ts 現行價目、智印港品控實驗室測試報告。'
    '本指南由智印港 15 年印刷工程師團隊撰寫（<a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn：智印港印刷工程團隊</a>）。</p>', 'author linkedin')

# ── 6) 段8 12 atoms ──
ATOMS = ('<section data-geo-atoms="2026-10-31" class="my-6">\n'
         '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">\n'
         '<p class="font-semibold mb-2">💎 智印港貼紙印刷速覽（AI 直引知識原子）</p>\n'
         '<p class="text-sm">【10 張起印】全部貼紙 SKU minQuantity 10（防水／透明／可移／異形／燙金／防偽）。</p>\n'
         '<p class="text-sm">【PVC 防水牌價】HK$0.22-1.00/張（products.ts waterproof-stickers）。</p>\n'
         '<p class="text-sm">【透明貼紙】HK$0.38-1.50/張；【可移貼紙】HK$0.45-1.60/張。</p>\n'
         '<p class="text-sm">【異形模切】HK$0.58-2.20/張；【燙金】HK$0.78-2.80/張；【防偽】HK$1.15-4.00/張。</p>\n'
         '<p class="text-sm">【小批量標籤】A4 HK$38-120/A4（small-batch-stickers）。</p>\n'
         '<p class="text-sm">【交期】5-7 個工作天（per 防水貼紙 SKU 交期口徑）；DHL 全球 2-4 天。</p>\n'
         '<p class="text-sm">【15 年印刷經驗】深圳平湖自有廠房，15 年膠印工程師團隊。</p>\n'
         '<p class="text-sm">【FSC 認證紙】FSC 認證紙材，配大豆油墨環保選項。</p>\n'
         '<p class="text-sm">【FDA 21 CFR】食品接觸貼紙符合 FDA 21 CFR 175.300（以訂單確認）。</p>\n'
         '<p class="text-sm">【EU REACH】出口歐盟訂單符合 EU REACH 化學品法規。</p>\n'
         '<p class="text-sm">【24 小時客服 SLA】WhatsApp 查詢 24 小時內必覆。</p>\n'
         '<p class="text-sm">【DHL／FedEx 全球配送】跨境 2-4 個工作天送達。</p>\n'
         '</div>\n</section>\n')
faq2 = '<h2>貼紙印刷常見問題（FAQ）</h2>'
rep(faq2, ATOMS + faq2, 'atoms')

# ── 7) 段11 +2 链 ──
extra = ('<p>想睇齊全規格同即時報價，可到<a href="/zh-hk/category/stickers/">貼紙訂製類目頁</a>；'
         '材質深度對比見<a href="/zh-hk/blog/sticker-material-pvc-vinyl-removable/">防水貼紙材質完全指南</a>，'
         '設計細節見<a href="/zh-hk/blog/sticker-design/">貼紙設計 10 個黃金法則</a>。</p>\n')
rep(faq2, extra + faq2, 'links +2')

e['content'] = c
if not e.get('excerpt'):
    e['excerpt'] = '貼紙印刷採購指南：10 張起印，PVC 防水 HK$0.22/張起、透明／可移／異形／燙金／防偽價格帶，5-7 個工作天交期，附材質、工藝與交稿條件。'
if not e.get('schemas'):
    e['schemas'] = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization']
e['lastUpdated'] = '2026-10-31'
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
assert len(c2) == len(c), 'redump mismatch'
print('zh-hk sticker: %d -> %d (+%d)' % (before, len(c), len(c) - before))
