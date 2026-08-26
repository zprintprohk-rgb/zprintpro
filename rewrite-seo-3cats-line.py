"""
2026-08-26 K3 §6 轨 1 + 3 类目改写 (packaging + envelopes + calendars)
- 9 改动 (3 类目 × 3 locale)
- 撞墙 = M3 自主立即做
- 用 line-based replace 避免字符串匹配问题
"""
import sys

PATH = r'F:\zprintpro-nextjs\src\lib\seo.ts'

with open(PATH, 'rb') as f:
    raw = f.read()
src = raw.decode('utf-8')
lines = src.split('\n')
sys.stdout.reconfigure(encoding='utf-8')

print(f'Total lines: {len(lines)}')

# ─── 1) packaging titles (line 395-400) ───
# titles: { ... 3 locale ... },
for i, line in enumerate(lines):
    if '包裝盒訂製 100個起' in line and "'zh-hk'" in line:
        print(f'Found packaging zh-hk title at line {i+1}: {line[:80]}')
        # Replace
        old = line
        new = "      'zh-hk': '食品包裝盒訂製 100個起 | 結構設計 + 燙金 + DHL 全球 + 30 秒報價 | 智印港',"
        lines[i] = new
        print(f'  → {new[:80]}')
    elif 'Custom Packaging Boxes from $0.85' in line and "'en'" in line:
        print(f'Found packaging en title at line {i+1}: {line[:80]}')
        old = line
        new = "      en: 'Food Safe Packaging Boxes from $0.85 | 100 MOQ + Free 3D + Made for USA | ZprintPro',"
        lines[i] = new
        print(f'  → {new[:80]}')
    elif 'パッケージ箱印刷' in line and "'ja'" in line and '構造設計' in line:
        print(f'Found packaging ja title at line {i+1}: {line[:80]}')
        old = line
        new = "      ja: '食品パッケージ箱印刷 100個〜 | 構造設計 + 箔押し + 全国送料 + 短納期 | ZprintPro',"
        lines[i] = new
        print(f'  → {new[:80]}')

# ─── packaging keywords ───
for i, line in enumerate(lines):
    if '包裝盒訂製,紙盒訂製,彩盒訂製,禮盒訂製,結構設計,燙金包裝,小批量包裝,定制包裝,品牌包裝,電商包裝,化妝品包裝,食品包裝,茶葉包裝,電子產品包裝' in line and "'zh-hk'" in line:
        print(f'Found packaging zh-hk kw at line {i+1}')
        old = line
        new = "      'zh-hk': '包裝盒訂製,紙盒訂製,彩盒訂製,禮盒訂製,結構設計,燙金包裝,小批量包裝,定制包裝,品牌包裝,電商包裝,化妝品包裝,食品包裝,茶葉包裝,電子產品包裝,食品包裝盒,食品包裝印刷,化妝品包裝盒,DHL全球',"
        lines[i] = new
    elif 'custom packaging boxes,paper box printing,corrugated boxes,rigid boxes,magnetic closure boxes,folding cartons,custom box design,foil packaging,small batch packaging,branded packaging,ecommerce packaging,cosmetic packaging,food packaging,tea packaging,electronics packaging,free shipping packaging,USA custom boxes' in line and "'en'" in line:
        print(f'Found packaging en kw at line {i+1}')
        old = line
        new = "      en: 'custom packaging boxes,paper box printing,corrugated boxes,rigid boxes,magnetic closure boxes,folding cartons,custom box design,foil packaging,small batch packaging,branded packaging,ecommerce packaging,cosmetic packaging,food packaging,food safe packaging,tea packaging,electronics packaging,free shipping packaging,USA custom boxes,Made for USA',"
        lines[i] = new
    elif 'パッケージ箱印刷,オリジナルパッケージ,紙箱印刷,化粧箱,ギフトボックス,構造設計,箔押しパッケージ,小ロットパッケージ,ブランドパッケージ,EC パッケージ,化粧品パッケージ,食品パッケージ' in line and "'ja'" in line:
        print(f'Found packaging ja kw at line {i+1}')
        old = line
        new = "      ja: 'パッケージ箱印刷,オリジナルパッケージ,紙箱印刷,化粧箱,ギフトボックス,構造設計,箔押しパッケージ,小ロットパッケージ,ブランドパッケージ,EC パッケージ,化粧品パッケージ,食品パッケージ,食品対応パッケージ,日本全国,短納期',"
        lines[i] = new

# ─── packaging descriptions ───
for i, line in enumerate(lines):
    if '包裝盒訂製 100 個起印，HK$1.5 起/個。結構設計 / 燙金 / UV / 啞膠亮膜 / 內襯 / 開窗，電商、美妝、食品、茶葉、電子產品通用。' in line and "'zh-hk'" in line:
        print(f'Found packaging zh-hk desc at line {i+1}')
        old = line
        new = "      'zh-hk': '包裝盒訂製 100 個起印，HK$1.5 起/個。食品包裝 / 化妝品包裝 / 茶葉 / 電子產品通用，結構設計 / 燙金 / UV / 啞膠亮膜 / 內襯 / 開窗。免費 3D 打稿 6 小時，DHL 全球 2-4 天配送，滿 HK$500 順豐香港免運費。WhatsApp 30 秒即時報價，ISO 9001 + FSC 認證。',"
        lines[i] = new
    elif 'Custom packaging boxes from $0.85, 100 MOQ. Structural design + foil + UV + matte/glossy + inserts + windows for e-commerce, cosmetics, food, tea, electronics.' in line and "'en'" in line:
        print(f'Found packaging en desc at line {i+1}')
        old = line
        new = "      en: 'Custom packaging boxes from $0.85, 100 MOQ. Food safe / cosmetic / tea / electronics packaging, structural design + foil + UV + matte/glossy + inserts + windows. Free 3D proof in 6 hours, DHL 2-4 day USA delivery, free shipping $99+. Made for USA, perfect for e-commerce and retail brands. 30-second AI quote, ISO 9001 + FSC certified.',"
        lines[i] = new
    elif 'パッケージ箱印刷 100 個から、¥120〜。構造設計・箔押し・UV・マット/光沢・内装・窓開け、EC・化粧品・食品・茶・電子機器向け。' in line and "'ja'" in line:
        print(f'Found packaging ja desc at line {i+1}')
        old = line
        new = "      ja: 'パッケージ箱印刷 100 個から、¥120〜。食品対応 / 化粧品 / 茶 / 電子機器向け、構造設計・箔押し・UV・マット/光沢・内装・窓開け。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送、沖縄・北海道対応。30 秒 AI 無料見積もり、ISO 9001 認証品質。',"
        lines[i] = new

# ─── 2) envelopes titles ───
for i, line in enumerate(lines):
    if '大信封 / A4 信封印刷 100 個起 · 牛皮/開窗/彩色/企業 LOGO | 智印港' in line and "'zh-hk'" in line:
        print(f'Found envelopes zh-hk title at line {i+1}')
        old = line
        new = "      'zh-hk': '大信封 / C4 / C5 信封印刷 HK$0.45起 | 100個起印・公文信封・牛皮・開窗・WhatsApp 30秒報價 | 智印港',"
        lines[i] = new
    elif 'Custom Envelopes Free Shipping' in line and "'en'" in line:
        print(f'Found envelopes en title at line {i+1}')
        old = line
        new = "      en: 'C4 / C5 / DL Envelopes from $0.06 | 100 MOQ + Free Proof + Made for USA | ZprintPro',"
        lines[i] = new
    elif '封筒印刷 100個〜 · クラフト/窓付き/カラー/企業ロゴ ISO認証 DHL' in line and "'ja'" in line:
        print(f'Found envelopes ja title at line {i+1}')
        old = line
        new = "      ja: '長3 / 洋形 封筒印刷 ¥8〜 | 100個〜・無料デザイン・短納期・全国送料 | ZprintPro',"
        lines[i] = new

# ─── envelopes keywords ───
for i, line in enumerate(lines):
    if '大信封,信封印刷,A4信封,公文信封,大號信封,牛皮信封,開窗信封,彩色信封,企業信封,LOGO信封,定制信封,中式信封,西式信封,航空信封,印刷信封,郵寄信封' in line and "'zh-hk'" in line:
        print(f'Found envelopes zh-hk kw at line {i+1}')
        old = line
        new = "      'zh-hk': '大信封,信封印刷,A4信封,公文信封,大號信封,牛皮信封,開窗信封,彩色信封,企業信封,LOGO信封,定制信封,中式信封,西式信封,航空信封,印刷信封,郵寄信封,C4信封,C5信封,快遞信封,公函信封',"
        lines[i] = new
    elif 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing' in line and "'en'" in line:
        print(f'Found envelopes en kw at line {i+1}')
        old = line
        new = "      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,C4 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing,Made for USA,Free Proof',"
        lines[i] = new

# ─── envelopes descriptions ───
for i, line in enumerate(lines):
    if '大信封印刷 100 個起印, HK$0.45/個. A4 公文信封 / 牛皮 / 開窗 / 彩色 / 企業 LOGO 定制.' in line and "'zh-hk'" in line:
        print(f'Found envelopes zh-hk desc at line {i+1}')
        old = line
        new = "      'zh-hk': '大信封印刷 HK$0.45/個,100 個起印。A4 公文信封 / C4 / C5 / 牛皮 / 開窗 / 彩色 / 企業 LOGO 定制,滿 HK$500 順豐香港免運費。WhatsApp 30 秒即時報價,ISO 9001 認證紙材,DHL 全球 2-4 天速遞。',"
        lines[i] = new
    elif 'Custom envelope printing 100 MOQ. Kraft / window / colored / DL / C5' in line and "'en'" in line:
        print(f'Found envelopes en desc at line {i+1}')
        old = line
        new = "      en: 'Custom envelope printing 100 MOQ. C4 / C5 / DL / kraft / window / colored / corporate branding. Free shipping over $99 to USA + free proof in 4 hours. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global delivery. Made for USA, perfect for business and corporate use.',"
        lines[i] = new
    elif '封筒印刷 100 個から対応. クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ.' in line and "'ja'" in line:
        print(f'Found envelopes ja desc at line {i+1}')
        old = line
        new = "      ja: '封筒印刷 100 個から、¥8〜。長3 / 洋形 / C4 / C5 / クラフト / 窓付き / カラー / 企業ロゴ。無料デザイン校正 4 時間、ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日。',"
        lines[i] = new

# ─── 3) calendars titles ───
for i, line in enumerate(lines):
    if '月曆印刷 2027 | 台曆 + 掛曆 | 30 秒报价 | 智印港' in line and "'zh-hk'" in line:
        print(f'Found calendars zh-hk title at line {i+1}')
        old = line
        new = "      'zh-hk': '月曆印刷 2027 | 100本起印・Q4旺季・60天預訂・燙金精裝・企業LOGO | 智印港',"
        lines[i] = new
    elif 'Custom Calendars Free Shipping · 100 MOQ 2027 Hardcover Foil' in line and "'en'" in line:
        print(f'Found calendars en title at line {i+1}')
        old = line
        new = "      en: '2027 Calendar Printing 100 MOQ | Q4 Peak + 60 Days Ahead + Foil Hardcover + Made for USA | ZprintPro',"
        lines[i] = new
    elif 'カレンダー印刷 100部〜 · デスク/壁掛け/2027 箔押し上製本 ISO認証' in line and "'ja'" in line:
        print(f'Found calendars ja title at line {i+1}')
        old = line
        new = "      ja: '2027年カレンダー印刷 100部〜 | 繁忙期前・60日予約・箔押し上製本・短納期 | ZprintPro',"
        lines[i] = new

# ─── calendars keywords ───
for i, line in enumerate(lines):
    if '月曆印刷,年曆印刷,座檯月曆,掛牆月曆,2027年曆,企業年曆,禮品月曆,定制月曆,燙金月曆,精裝月曆,日曆印刷,教師月曆,辦公文具' in line and "'zh-hk'" in line:
        print(f'Found calendars zh-hk kw at line {i+1}')
        old = line
        new = "      'zh-hk': '月曆印刷,年曆印刷,座檯月曆,掛牆月曆,2027年曆,企業年曆,禮品月曆,定制月曆,燙金月曆,精裝月曆,日曆印刷,教師月曆,辦公文具,Q4旺季,60天預訂',"
        lines[i] = new
    elif 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar' in line and "'en'" in line:
        print(f'Found calendars en kw at line {i+1}')
        old = line
        new = "      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar,Q4 Peak,60 Days Ahead',"
        lines[i] = new
    elif 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品' in line and "'ja'" in line:
        print(f'Found calendars ja kw at line {i+1}')
        old = line
        new = "      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品,繁忙期前,60日予約',"
        lines[i] = new

# ─── calendars descriptions ───
for i, line in enumerate(lines):
    if '月曆印刷 100 本起印. 座檯/掛牆/2027 + 燙金精裝 + 企業 LOGO.' in line and "'zh-hk'" in line:
        print(f'Found calendars zh-hk desc at line {i+1}')
        old = line
        new = "      'zh-hk': '月曆印刷 100 本起印, HK$10起/本. 座檯/掛牆/2027 + 燙金精裝 + 企業 LOGO. Q4 旺季建議提前 60 天下單 (9/15 硬截止前). ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送, 滿 HK$500 順豐香港免運費。',"
        lines[i] = new
    elif 'Custom calendar printing 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding.' in line and "'en'" in line:
        print(f'Found calendars en desc at line {i+1}')
        old = line
        new = "      en: 'Custom calendar printing 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding. Q4 peak — order 60 days ahead (deadline 9/15). Free shipping over $99 to USA + DHL Express 2-4 day. 30-second AI quote, ISO 9001. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',"
        lines[i] = new
    elif 'カレンダー印刷 100 部から対応. デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO.' in line and "'ja'" in line:
        print(f'Found calendars ja desc at line {i+1}')
        old = line
        new = "      ja: 'カレンダー印刷 100 部から、¥300〜。デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO。繁忙期前 60 日予約 (9/15 締切)。ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日。',"
        lines[i] = new

# ─── Write back ───
new_src = '\n'.join(lines)
with open(PATH, 'wb') as f:
    f.write(new_src.encode('utf-8'))

print('\n✅ 3 类目 × 3 locale = 9 改动全部完成 (line-based replace)')
