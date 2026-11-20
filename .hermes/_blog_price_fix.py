# -*- coding: utf-8 -*-
# blog price-truth patch: poster-printing-guide / poster-size-guide / paper-bag-printing-guide (3 locales)
# anchors: A2 157g HK$9起/張(10張起印), A2 250g HK$17起/張, A1 PP HK$45起/張(1張起印), A1 相紙 HK$56起/張, A0 HK$144起/張(×3.2)
# en: 2.30/4.60/14.70 | ja: 300/600/1,920 ; A3/A4/B2/200g/油畫布 -> 報價另詢 (no SSoT)
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
B = r'F:\zprintpro-nextjs\src\data\blog-data'

def load(loc):
    return json.load(open(rf'{B}\{loc}.json', encoding='utf-8'))

def save(loc, d):
    json.dump(d, open(rf'{B}\{loc}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# replacement lists: (slug, [(old, new, min_expected, max_expected), ...])
plans = {}

# ============ zh-hk poster-printing-guide ============
zh_pg = [
    ('poster-printing-guide', [
        ('1 張起印 HK$8-120', 'A2 10 張起印 HK$9 起/張、A1 1 張起印 HK$45 起/張', 3, 3),
        ('單價 (157g 銅版紙)', '單價 (參考起價)', 1, 1),
        ('<td class="border p-2">HK$8-15</td>', '<td class="border p-2">報價另詢</td>', 1, 1),
        ('<td class="border p-2">HK$15-30</td>', '<td class="border p-2">HK$9 起/張</td>', 1, 1),
        ('<td class="border p-2">HK$30-60</td>', '<td class="border p-2">HK$45 起/張</td>', 1, 1),
        ('<td class="border p-2">HK$60-120</td>', '<td class="border p-2">HK$144 起/張</td>', 1, 1),
        ('<td class="border p-2">HK$20-40</td>', '<td class="border p-2">報價另詢</td>', 1, 1),
        ('5 種紙質揀邊個?室內短期用 157g 銅版紙 (HK$0.30/張, 68% 客戶首選), 室內長期用 250g 銅版紙 (HK$0.80/張), 戶外 / 防水用 PP 膠片 (HK$1.20/張), 藝術展用油畫布 (HK$3.50/張), 寫真用防水相紙 (HK$2.00/張)。',
         '5 種紙質揀邊個?室內短期用 157g 銅版紙 (HK$9 起/張 A2, 68% 客戶首選), 室內長期用 250g 銅版紙 (HK$17 起/張 A2), 戶外 / 防水用 PP 膠片 (HK$45 起/張 A1), 藝術展用油畫布 (報價另詢), 寫真用防水相紙 (HK$56 起/張 A1)。', 1, 1),
        ('<td class="border p-2">HK$0.30/張</td>', '<td class="border p-2">HK$9 起/張</td>', 1, 1),
        ('<td class="border p-2">HK$0.50/張</td>', '<td class="border p-2">報價另詢</td>', 1, 1),
        ('<td class="border p-2">HK$0.80/張</td>', '<td class="border p-2">HK$17 起/張</td>', 1, 1),
        ('<td class="border p-2">HK$1.20/張</td>', '<td class="border p-2">HK$45 起/張</td>', 1, 1),
        ('<td class="border p-2">HK$3.50/張</td>', '<td class="border p-2">報價另詢</td>', 1, 1),
        ('<td class="border p-2">HK$2.00/張</td>', '<td class="border p-2">HK$56 起/張</td>', 1, 1),
        ('<td class="border p-2">+15%</td>', '<td class="border p-2">低</td>', 2, 2),
        ('<td class="border p-2">+25%</td>', '<td class="border p-2">中</td>', 1, 1),
        ('<td class="border p-2"><strong>燙金 / 燙銀</strong></td>\n<td class="border p-2">金屬光澤</td>\n<td class="border p-2">+50%</td>',
         '<td class="border p-2"><strong>燙金 / 燙銀</strong></td>\n<td class="border p-2">金屬光澤</td>\n<td class="border p-2">高</td>', 1, 1),
        ('<td class="border p-2"><strong>擊凸 / 壓凹</strong></td>\n<td class="border p-2">立體觸感</td>\n<td class="border p-2">+30%</td>',
         '<td class="border p-2"><strong>擊凸 / 壓凹</strong></td>\n<td class="border p-2">立體觸感</td>\n<td class="border p-2">中</td>', 1, 1),
        ('<td class="border p-2"><strong>打孔 + 掛繩</strong></td>\n<td class="border p-2">實用配件</td>\n<td class="border p-2">+8%</td>',
         '<td class="border p-2"><strong>打孔 + 掛繩</strong></td>\n<td class="border p-2">實用配件</td>\n<td class="border p-2">低</td>', 1, 1),
        ('<td class="border p-2"><strong>標準</strong></td>\n<td class="border p-2">3-5 個工作天</td>\n<td class="border p-2">0%</td>',
         '<td class="border p-2"><strong>標準</strong></td>\n<td class="border p-2">3-5 個工作天</td>\n<td class="border p-2">無附加</td>', 1, 1),
        ('<td class="border p-2"><strong>特快</strong></td>\n<td class="border p-2">1-2 個工作天</td>\n<td class="border p-2">+30%</td>',
         '<td class="border p-2"><strong>特快</strong></td>\n<td class="border p-2">1-2 個工作天</td>\n<td class="border p-2">另計</td>', 1, 1),
        ('<td class="border p-2"><strong>急件 24 小時</strong></td>\n<td class="border p-2">24 小時</td>\n<td class="border p-2">+50%</td>',
         '<td class="border p-2"><strong>急件 24 小時</strong></td>\n<td class="border p-2">24 小時</td>\n<td class="border p-2">另計</td>', 1, 1),
        ('<td class="border p-2"><strong>特急 12 小時</strong></td>\n<td class="border p-2">12 小時</td>\n<td class="border p-2">+80%</td>',
         '<td class="border p-2"><strong>特急 12 小時</strong></td>\n<td class="border p-2">12 小時</td>\n<td class="border p-2">另計</td>', 1, 1),
        ('<li><strong>A3 / A4 海報數碼印刷 1 張起印</strong>:HK$8-15/張, 24 小時交收。適合打樣、活動單張、限量促銷。</li>',
         '<li><strong>A3 / A4 海報數碼印刷 1 張起印</strong>:按尺寸報價, 24 小時交收。適合打樣、活動單張、限量促銷。</li>', 1, 1),
        ('<li><strong>A1 / A2 / A0 柯式印刷 500 張起印</strong>:HK$15-120/張, 3-5 個工作天。500 張以上先至平, 100 張以下唔建議柯式。</li>',
         '<li><strong>A1 / A2 / A0 柯式印刷 500 張起印</strong>:批量報價另詢, 3-5 個工作天。500 張以上先至平, 100 張以下唔建議柯式。</li>', 1, 1),
        ('<li><strong>A1 數碼急件 1 張可印</strong>:加 80% 附加費, 24-48 小時交收。智印港 A1 急件服務 HK$108-216/張。</li>',
         '<li><strong>A1 數碼急件 1 張可印</strong>:急件附加費另計, 24-48 小時交收。WhatsApp 30 秒即時報價。</li>', 1, 1),
        ('零售促銷組合</strong> — A2 + 157g 銅版紙 + 光膠,常見落單 100-500 張,HK$15-30/張,3-5 個工作天',
         '零售促銷組合</strong> — A2 + 157g 銅版紙 + 光膠,常見落單 100-500 張,HK$9 起/張,3-5 個工作天', 1, 1),
        ('餐飲菜牌組合</strong> — A3 + 250g 銅版紙 + 啞膠,100 張起 HK$8-15/張,啱季度轉菜',
         '餐飲菜牌組合</strong> — A3 + 250g 銅版紙 + 啞膠,100 張起按尺寸報價,啱季度轉菜', 1, 1),
        ('活動急件組合</strong> — A3/A4 銅版紙 24 小時急件,+50% 附加費,11:00 前確認稿',
         '活動急件組合</strong> — A3/A4 銅版紙 24 小時急件,急件附加費另計,11:00 前確認稿', 1, 1),
        ('<li><strong>零售店內促銷</strong>:A2 / A1 + 157g 銅版紙 + 光膠, HK$15-60/張</li>',
         '<li><strong>零售店內促銷</strong>:A2 / A1 + 157g 銅版紙 + 光膠, HK$9 起/張</li>', 1, 1),
        ('<li><strong>餐廳菜牌 / 桌牌</strong>:A3 + 250g 銅版紙 + 啞膠, HK$8-15/張</li>',
         '<li><strong>餐廳菜牌 / 桌牌</strong>:A3 + 250g 銅版紙 + 啞膠, 按尺寸報價</li>', 1, 1),
        ('<li><strong>商場櫥窗</strong>:A2 + PP 膠片 + UV 局部, HK$30-50/張</li>',
         '<li><strong>商場櫥窗</strong>:A2 + PP 膠片 + UV 局部, HK$9 起/張</li>', 1, 1),
        ('<li><strong>地鐵站廣告</strong>:A1 + 200g 銅版紙 + 啞膠, HK$30-60/張</li>',
         '<li><strong>地鐵站廣告</strong>:A1 + 200g 銅版紙 + 啞膠, HK$45 起/張</li>', 1, 1),
        ('<li><strong>展覽會場</strong>:A0 / A1 + 250g 銅版紙 + 燙金 logo, HK$60-120/張</li>',
         '<li><strong>展覽會場</strong>:A0 / A1 + 250g 銅版紙 + 燙金 logo, HK$144 起/張</li>', 1, 1),
        ('<li><strong>活動背板</strong>:A0 + PP 膠片 + 打孔掛繩, HK$80-150/張</li>',
         '<li><strong>活動背板</strong>:A0 + PP 膠片 + 打孔掛繩, HK$144 起/張</li>', 1, 1),
        ('<li><strong>婚禮 / 宴會</strong>:A2 + 250g 銅版紙 + 燙金 + 擊凸, HK$40-80/張</li>',
         '<li><strong>婚禮 / 宴會</strong>:A2 + 250g 銅版紙 + 燙金 + 擊凸, HK$17 起/張</li>', 1, 1),
        ('<li><strong>地產新盤</strong>:A1 + 200g 銅版紙 + 啞膠 + 防水, HK$30-50/張</li>',
         '<li><strong>地產新盤</strong>:A1 + 200g 銅版紙 + 啞膠 + 防水, HK$45 起/張</li>', 1, 1),
        ('<li><strong>學校 / 校園</strong>:A2 + 157g 銅版紙 + 光膠, HK$15-30/張</li>',
         '<li><strong>學校 / 校園</strong>:A2 + 157g 銅版紙 + 光膠, HK$9 起/張</li>', 1, 1),
        ('<li><strong>宗教 / 寺廟</strong>:A2 + 250g 銅版紙 + 燙金, HK$30-60/張</li>',
         '<li><strong>宗教 / 寺廟</strong>:A2 + 250g 銅版紙 + 燙金, HK$17 起/張</li>', 1, 1),
        ('<li><strong>政治 / 選舉</strong>:A1 + PP 膠片 + UV 局部, HK$50-100/張</li>',
         '<li><strong>政治 / 選舉</strong>:A1 + PP 膠片 + UV 局部, HK$45 起/張</li>', 1, 1),
        ('<li><strong>公益 / 慈善</strong>:A2 + 157g 銅版紙 + 啞膠, HK$15-30/張</li>',
         '<li><strong>公益 / 慈善</strong>:A2 + 157g 銅版紙 + 啞膠, HK$9 起/張</li>', 1, 1),
        ('所以 A1 零售價約 A2 嘅 2-2.4 倍 (HK$60-120 vs HK$15-30)。',
         '所以 A1 單價高於 A2 (A2 HK$9 起/張 vs A1 HK$45 起/張)。', 1, 1),
        ('A: 室內短期展示建議用 157g 銅版紙 + 光膠 (HK$0.45/張), 室內長期用 250g 銅版紙 + 啞膠 (HK$0.95/張), 戶外 / 長期用 PP 膠片 (HK$1.20/張), 藝術展用油畫布 (HK$3.50/張)。',
         'A: 室內短期展示建議用 157g 銅版紙 + 光膠 (HK$9 起/張 A2), 室內長期用 250g 銅版紙 + 啞膠 (HK$17 起/張 A2), 戶外 / 長期用 PP 膠片 (HK$45 起/張 A1), 藝術展用油畫布 (報價另詢)。', 1, 1),
        ('單價 HK$60-120; A2 = 420×594mm (16.5×23.4 吋,約 0.25 m²), 適合櫥窗、電梯廣告、活動宣傳, 單價 HK$15-30。A1 面積係 A2 嘅 2 倍, 單價約 2-2.4 倍。',
         '單價 HK$45 起/張 (A1 PP); A2 = 420×594mm (16.5×23.4 吋,約 0.25 m²), 適合櫥窗、電梯廣告、活動宣傳, 單價 HK$9 起/張 (A2 157g)。A1 面積係 A2 嘅 2 倍, 單價按尺寸與紙質計。', 1, 1),
        ('A: 上午 11 點前確認稿件, A4 / A3 銅版紙海報可 24 小時內交收 (+50% 急件費); A2 / A1 大尺寸需 1-2 個工作天 (+30% 特快費); 特殊工藝 (燙金 / UV / 摺口) 需 3 個工作天。',
         'A: 上午 11 點前確認稿件, A4 / A3 銅版紙海報可 24 小時內交收 (急件附加費另計); A2 / A1 大尺寸需 1-2 個工作天 (特快附加費另計); 特殊工藝 (燙金 / UV / 摺口) 需 3 個工作天。', 1, 1),
    ]),
    # ============ zh-hk poster-size-guide ============
    ('poster-size-guide', [
        ('智印港 A1 海報 10 張起印，可以同一週出貨；A2 數碼印 US$0.18/張起，1,000 張柯式印 US$0.11/張起。',
         '智印港 A1 海報 1 張起印，可以同一週出貨；A2 數碼印 US$2.30 起/張（10 張起印），1,000 張柯式印另詢批量報價。', 1, 1),
        ('A1 海報 SKU</a> — 1 張起印 HK$60-120, 防水 +50%',
         'A1 海報 SKU</a> — 1 張起印 HK$45 起/張（PP 合成紙）', 1, 1),
        ('A2 海報 SKU</a> — 1 張起印 HK$30-60, 急件翌日',
         'A2 海報 SKU</a> — 10 張起印 HK$9 起/張（157g 銅版紙）', 1, 1),
        ('A3 海報 SKU</a> — 1 張起印 HK$15-30',
         'A3 海報 SKU</a> — 按尺寸報價', 1, 1),
        ('A1 1 張起印 HK$60-120, A2 HK$30-60, 防水過膠 +50%, 急件 +30%, 5-7 個工作天',
         'A1 1 張起印 HK$45 起/張、A2 10 張起印 HK$9 起/張，急件附加費另計，5-7 個工作天', 1, 1),
    ]),
    # ============ zh-hk paper-bag-printing-guide ============
    ('paper-bag-printing-guide', [
        ('1,000 張含 4 色 CMYK 印 Logo 嘅標準價 <strong>US$0.19/張</strong>',
         '1,000 張含 4 色 CMYK 印 Logo 嘅標準價 <strong>US$1.84 起/張</strong>', 1, 1),
    ]),
]
plans['zh-hk'] = zh_pg

# ============ en ============
en_pg = [
    ('poster-printing-guide', [
        ('From HK$8-120/pc, 3-5 working days, rush 24h.',
         'From HK$9 (A2 157g) / HK$45 (A1 PP) per poster, 3-5 working days, rush 24h.', 1, 1),
        ('Standard 3-5 working days for 500 or fewer (HK$15-120/pc); rush 24-hour available. 1-piece minimum from HK$8-120. Free HK delivery over HK$500; FDA + EU REACH + FSC-certified.',
         'Standard 3-5 working days. A2 157g from HK$9/pc (10-pc MOQ); A1 PP from HK$45/pc (1-pc MOQ). Free HK delivery over HK$500; FDA + EU REACH + FSC-certified.', 1, 1),
        ('<td class="border p-2">8-15</td>', '<td class="border p-2">Quote</td>', 1, 1),
        ('<td class="border p-2">15-30</td>', '<td class="border p-2">9</td>', 1, 1),
        ('<td class="border p-2">30-70</td>', '<td class="border p-2">45</td>', 1, 1),
        ('<td class="border p-2">70-120</td>', '<td class="border p-2">144</td>', 1, 1),
        ('<td class="border p-2">US$8-15</td>', '<td class="border p-2">Quote</td>', 1, 1),
        ('<td class="border p-2">US$15-30</td>', '<td class="border p-2">US$2.30</td>', 1, 1),
        ('<td class="border p-2">US$30-60</td>', '<td class="border p-2">US$4.60</td>', 1, 1),
        ('<td class="border p-2">US$60-120</td>', '<td class="border p-2">US$14.70</td>', 1, 1),
        ('<td class="border p-2">US$20-40</td>', '<td class="border p-2">Quote</td>', 1, 1),
    ]),
    ('poster-size-guide', [
        ('A1 prints start at 10-piece MOQ with same-week shipping; A2 from US$0.18/pc digital and US$0.11/pc at 1,000 pieces offset.',
         'A1 prints start at 1-piece MOQ with same-week shipping; A2 from US$2.30/pc (10-pc MOQ), offset bulk pricing quoted separately.', 1, 1),
        ('A1 Poster SKU</a> — 1 pc MOQ HK$60-120, waterproof +50%',
         'A1 Poster SKU</a> — 1 pc MOQ from HK$45 (PP synthetic)', 1, 1),
        ('A2 Poster SKU</a> — 1 pc MOQ HK$30-60, rush next-day',
         'A2 Poster SKU</a> — 10 pc MOQ from HK$9 (157g)', 1, 1),
        ('A3 Poster SKU</a> — 1 pc MOQ HK$15-30',
         'A3 Poster SKU</a> — quote by size', 1, 1),
        ('A1 1 pc MOQ HK$60-120, A2 HK$30-60, waterproof lamination +50%, rush +30%, 5-7 business',
         'A1 1 pc MOQ from HK$45, A2 10 pc MOQ from HK$9, rush surcharge quoted separately, 5-7 business', 1, 1),
    ]),
    ('paper-bag-printing-guide', [
        ('bulk () tiered pricing brings per-unit cost to $3-5',
         'bulk orders unlock tiered pricing that lowers the per-unit cost', 1, 1),
        ('Kraft Paper Bags</a> — Eco-friendly, from US$0.19/pc',
         'Kraft Paper Bags</a> — Eco-friendly, from US$1.84/pc', 1, 1),
        ('lands at <strong>US$0.19/pc at 1,000 pieces</strong> including 4-color CMYK logo',
         'lands at <strong>US$1.84/pc at 100-piece MOQ</strong> including 4-color CMYK logo; higher volumes unlock tiered discounts', 1, 1),
    ]),
]
plans['en'] = en_pg

# ============ ja ============
ja_pg = [
    ('poster-printing-guide', [
        ('1枚〜 HK$8-120、3〜5営業日、特急24時間。',
         'A2 10枚〜 ¥300〜、A1 1枚〜 ¥600〜、3〜5営業日、特急24時間。', 1, 1),
        ('500枚以下は標準3〜5営業日（HK$15-120/枚）、特急24時間対応。1枚〜 HK$8-120。HK$500以上で香港国内送料無料。FDA・EU REACH・FSC 認証。',
         '標準3〜5営業日。A2 157g ¥300〜/枚（10枚〜MOQ）；A1 PP ¥600〜/枚（1枚〜MOQ）。HK$500以上で香港国内送料無料。FDA・EU REACH・FSC 認証。', 1, 1),
        ('価格目安(HK$/枚)', '価格目安(¥/枚)', 1, 1),
        ('<td class="border p-2">8-15</td>', '<td class="border p-2">要見積</td>', 1, 1),
        ('<td class="border p-2">15-30</td>', '<td class="border p-2">¥300〜</td>', 1, 1),
        ('<td class="border p-2">30-70</td>', '<td class="border p-2">¥600〜</td>', 1, 1),
        ('<td class="border p-2">70-120</td>', '<td class="border p-2">¥1,920〜</td>', 1, 1),
        ('<td class="border p-2">¥200-300</td>', '<td class="border p-2">要見積</td>', 1, 1),
        ('<td class="border p-2">¥300-600</td>', '<td class="border p-2">¥300〜</td>', 1, 1),
        ('<td class="border p-2">¥600-1,200</td>', '<td class="border p-2">¥600〜</td>', 1, 1),
        ('<td class="border p-2">¥1,200-2,300</td>', '<td class="border p-2">¥1,920〜</td>', 1, 1),
        ('<td class="border p-2">¥400-800</td>', '<td class="border p-2">要見積</td>', 1, 1),
    ]),
    ('poster-size-guide', [
        ('A1 印刷は 10 枚から MOQ 対応、同週発送可能。A2 デジタル印刷 US$0.18/枚から、1,000 枚オフセット US$0.11/枚から。',
         'A1 印刷は 1 枚から MOQ 対応、同週発送可能。A2 デジタル印刷 US$2.30/枚から（10 枚〜MOQ）、1,000 枚オフセットは別途見積り。', 1, 1),
        ('A1 ポスター SKU</a> — 1 枚から HK$60-120, 防水 +50%',
         'A1 ポスター SKU</a> — 1 枚から HK$45（PP 合成紙）', 1, 1),
        ('A2 ポスター SKU</a> — 1 枚から HK$30-60, 急行翌日',
         'A2 ポスター SKU</a> — 10 枚から HK$9（157g）', 1, 1),
        ('A3 ポスター SKU</a> — 1 枚から HK$15-30',
         'A3 ポスター SKU</a> — サイズ別見積り', 1, 1),
        ('A1 1 枚から HK$60-120, A2 HK$30-60, 防水ラミネート +50%, 急行 +30%, 5-7 営業日',
         'A1 1 枚から HK$45、A2 10 枚から HK$9、急行追加料金は別途見積り、5-7 営業日', 1, 1),
    ]),
    ('paper-bag-printing-guide', [
        ('1個 ¥22 から', '1個 ¥240 から', 1, 1),
        ('標準価格 <strong>US$0.19/枚</strong>', '標準価格 <strong>US$1.84 起/枚</strong>', 1, 1),
    ]),
]
plans['ja'] = ja_pg

# apply with verification
total = 0
for loc, items in plans.items():
    d = load(loc)
    for slug, repls in items:
        content = d[slug]['content']
        for old, new, lo, hi in repls:
            n = content.count(old)
            if not (lo <= n <= hi):
                print(f'FAIL {loc}/{slug} count={n} (want {lo}..{hi}): {old[:60]!r}')
                sys.exit(1)
        for old, new, lo, hi in repls:
            content = content.replace(old, new)
            total += 1
        d[slug]['content'] = content
    save(loc, d)
print(f'OK: {total} replacements applied')
