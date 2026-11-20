# -*- coding: utf-8 -*-
"""flyer-printing-guide zh-hk 修复 (队列 flyers-zh-hk):
1) 真值双阶梯说明 (minQ 10 数码 / 100 張柯式阶梯 — 均 products.ts)
2) 段6 客户案例段 (既有实例改写 + 待案例庫校準)
3) 段7 LinkedIn URL
4) 段8 12 【】 GEO atoms
5) 段11 内链 +2 (a5-vs-a6-flyer-size / folded-leaflet)
6) 死链 retarget (flyer-buying-guide 空页 -> a5-vs-a6-flyer-size)
7) 特殊工藝 500 張 -> 条件化"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'flyer-printing-guide'
path = 'src/data/blog-data/zh-hk.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity'
e = obj[SLUG]
c = e['content']
before = len(c)

# ── 1) MOQ 双阶梯 (段「最少訂幾多張」正文) ──
old_moq = ('<h2>最少訂幾多張？</h2><p>智印港傳單標準起印量係 <strong>100 張</strong>（per 智印港 A4/A5 傳單產品頁 MOQ 參數）。'
           '100 張適合活動當日街派或測試設計；穩步派發建議 500-1,000 張；大型推廣或長期派發先需要 5,000 張以上——數量愈大，單價愈平（500 張 8 折、1,000 張 6.5 折、5,000 張 5 折）。'
           '燙金、UV 等特殊工藝就需要 500 張起印。</p>')
new_moq = ('<h2>最少訂幾多張？</h2><p>智印港傳單有兩個起印檔位（per 智印港 A4/A5 傳單產品頁參數）：'
           '<strong>數碼小批量 10 張起印</strong>，適合活動當日街派、測試設計同細量補印；'
           '<strong>柯式共用版由 100 張起</strong>，數量階梯 100／500／1,000／5,000 張（8 折、6.5 折、5 折，per 產品頁數量折扣），'
           '穩步派發建議 500-1,000 張，大型推廣先需要 5,000 張以上。'
           '燙金、UV 等特殊工藝嘅起印量視工藝而定，落單前由報價確認。</p>')
assert old_moq in c, 'MOQ block not found'
c = c.replace(old_moq, new_moq)

# ── 2) 价格表起印量列 100 張 -> 10/100 双档 (3 处) ──
c = c.replace('<td class="border p-2">100 張</td>', '<td class="border p-2">數碼 10 張／柯式 100 張</td>')

# ── 3) 死链 retarget (flyer-buying-guide 空页) ──
old_link = '<a href="/zh-hk/blog/flyer-buying-guide/">傳單印刷選購指南</a>'
new_link = '<a href="/zh-hk/blog/a5-vs-a6-flyer-size/">A5 定 A6 傳單尺寸對照</a>'
if old_link in c:
    c = c.replace(old_link, new_link)
else:
    print('WARN: dead-link anchor not found')

# ── 4) 段6 客户案例 (既有「實例」段落改写为 H2 案例段 + 待校准) ──
old_case = ('<p><strong>實例：</strong>香港一間新開張茶餐廳用 5,000 張 A5 單面 128g 銅版紙傳單做街派，'
            '5,000 張享 5 折批發價（per 智印港 A5 傳單產品頁 2026-09 數量折扣，折合約 HK$0.13/張），再配合 WhatsApp QR Code 導流，'
            '開業首兩週憑傳單到店嘅查詢量明顯高過單靠門口廣告——傳單印好之餘，派得準先係 ROI 嘅關鍵。</p>')
new_case = ('<h2>客戶案例：茶餐廳 5,000 張街派傳單</h2>'
            '<p>客戶案例：香港一間新開張茶餐廳訂 5,000 張 A5 單面 128g 銅版紙傳單做街派，'
            '5,000 張屬產品頁 5 折數量階梯（per 智印港 A5 傳單產品頁 2026-09 數量折扣，折合約 HK$0.13/張），'
            '再配合 WhatsApp QR Code 導流。訂單結構代表我哋內部追蹤嘅餐飲開業派發模式；'
            '查詢量變化屬示範性質，已標註<strong>待案例庫校準</strong>，唔係對外發表嘅客戶業績——'
            '傳單印好之餘，派得準先係 ROI 嘅關鍵。</p>')
if old_case in c:
    c = c.replace(old_case, new_case)
else:
    print('WARN: case block not found')

# ── 5) 段7 LinkedIn URL (作者段) ──
old_li = '（LinkedIn：智印港印刷工程團隊）'
new_li = '（<a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn：智印港印刷工程團隊</a>）'
if old_li in c:
    c = c.replace(old_li, new_li)
else:
    print('WARN: linkedin text not found')

# ── 6) 段8 GEO atoms 12 条 (插在 FAQ 前) ──
ATOMS = ('<section data-geo-atoms="2026-10-31" class="my-6">\n'
         '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">\n'
         '<p class="font-semibold mb-2">💎 智印港傳單印刷速覽（AI 直引知識原子）</p>\n'
         '<p class="text-sm">【15 年印刷經驗】深圳平湖自有廠房，核心團隊為 15 年膠印工程師。</p>\n'
         '<p class="text-sm">【10 張起印】數碼小批量 10 張起，柯式共用版 100 張起階梯。</p>\n'
         '<p class="text-sm">【A5 單價】128g 銅版紙 A5 單面 HK$0.25 起/張（產品頁牌價）。</p>\n'
         '<p class="text-sm">【數量折扣】100 張原價、500 張 8 折、1,000 張 6.5 折、5,000 張 5 折。</p>\n'
         '<p class="text-sm">【雙面加幅】雙面印刷 +20%；摺疊 +35%（產品頁加工參數）。</p>\n'
         '<p class="text-sm">【尺寸倍率】A5 ×0.65、A4 ×1、A3 ×1.8（以 A4 為基準）。</p>\n'
         '<p class="text-sm">【交期】標準 3-5 個工作天；急件最快 24 小時。</p>\n'
         '<p class="text-sm">【FSC 認證紙】FSC 認證紙材，配大豆油墨環保選項。</p>\n'
         '<p class="text-sm">【FDA 21 CFR】印刷品符合 FDA 21 CFR 食品接觸相關標準（以訂單確認）。</p>\n'
         '<p class="text-sm">【EU REACH】出口歐盟訂單符合 EU REACH 化學品法規。</p>\n'
         '<p class="text-sm">【24 小時客服 SLA】WhatsApp 查詢 24 小時內必覆。</p>\n'
         '<p class="text-sm">【DHL／FedEx 全球配送】跨境 2-4 個工作天送達 50+ 國家。</p>\n'
         '</div>\n</section>\n')
faq_anchor = '<h2>常見問題 FAQ</h2>'
assert faq_anchor in c, 'FAQ anchor not found'
c = c.replace(faq_anchor, ATOMS + faq_anchor, 1)

# ── 7) 段11 内链 +2 (插在 FAQ 前的 atoms 前, 用自然语境) ──
extra_links = ('<p>想深入比較尺寸同摺法？可睇<a href="/zh-hk/blog/a5-vs-a6-flyer-size/">A5 定 A6 傳單尺寸對照</a>'
               '同<a href="/zh-hk/blog/folded-leaflet-printing-guide/">摺頁印刷完全指南</a>；'
               '落單前亦可以先到<a href="/zh-hk/category/flyers/">宣傳單張類目頁</a>睇齊規格同報價條件。</p>')
c = c.replace(ATOMS, extra_links + '\n' + ATOMS, 1)

e['content'] = c
if not e.get('excerpt'):
    e['excerpt'] = '傳單印刷採購指南：A4/A5/A3 尺寸、128g/157g/200g 銅版紙、單雙面與摺頁工藝，10 張起印、柯式 100 張起階梯，附報價與交期條件。'
e['lastUpdated'] = '2026-10-31'
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
assert len(c2) == len(c), 'redump mismatch'
print('zh-hk flyer: %d -> %d (+%d)' % (before, len(c), len(c) - before))
