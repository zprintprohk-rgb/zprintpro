"""
2026-08-26 K3 §6 轨 1 + 3 类目改写 (packaging + envelopes + calendars)
- 9 改动 (3 类目 × 3 locale)
- 撞墙 = M3 自主立即做
"""
import re

PATH = r'F:\zprintpro-nextjs\src\lib\seo.ts'

with open(PATH, 'r', encoding='utf-8') as f:
    src = f.read()

# ─── 1) packaging 改写 ───
old_pkg_titles = '''    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 包裝盒訂製/包裝盒印刷 前置
      'zh-hk': '包裝盒訂製 100個起 | 結構設計 + 燙金 + 小批量 | 智印港',
      en: 'Custom Packaging Boxes from $0.85 | 100 MOQ + Free 3D | ZprintPro',
      ja: 'パッケージ箱印刷｜100個〜・構造設計・箔押し｜ZprintPro',
    },'''

new_pkg_titles = '''    titles: {
      // 2026-08-26 K3 §6 轨 1 + 食品包裝印刷 pos 15.61 撞墙 = 修复 + 智印港 40% CTR 公式
      'zh-hk': '食品包裝盒訂製 100個起 | 結構設計 + 燙金 + DHL 全球 + 30 秒報價 | 智印港',
      en: 'Food Safe Packaging Boxes from $0.85 | 100 MOQ + Free 3D + Made for USA | ZprintPro',
      ja: '食品パッケージ箱印刷 100個〜 | 構造設計 + 箔押し + 全国送料 + 短納期 | ZprintPro',
    },'''

if old_pkg_titles not in src:
    print('ERROR: packaging titles not found')
    raise SystemExit(1)
src = src.replace(old_pkg_titles, new_pkg_titles, 1)
print('packaging titles OK')

old_pkg_kw = '''    keywords: {
      'zh-hk': '包裝盒訂製,紙盒訂製,彩盒訂製,禮盒訂製,結構設計,燙金包裝,小批量包裝,定制包裝,品牌包裝,電商包裝,化妝品包裝,食品包裝,茶葉包裝,電子產品包裝',
      // 加 free shipping / free mockup / no minimum / small business / eco friendly / kraft / mailer box
      en: 'custom packaging boxes,paper box printing,corrugated boxes,rigid boxes,magnetic closure boxes,folding cartons,custom box design,foil packaging,small batch packaging,branded packaging,ecommerce packaging,cosmetic packaging,food packaging,tea packaging,electronics packaging,free shipping packaging,USA custom boxes',
      ja: 'パッケージ箱印刷,オリジナルパッケージ,紙箱印刷,化粧箱,ギフトボックス,構造設計,箔押しパッケージ,小ロットパッケージ,ブランドパッケージ,EC パッケージ,化粧品パッケージ,食品パッケージ',
    },'''

new_pkg_kw = '''    keywords: {
      'zh-hk': '包裝盒訂製,紙盒訂製,彩盒訂製,禮盒訂製,結構設計,燙金包裝,小批量包裝,定制包裝,品牌包裝,電商包裝,化妝品包裝,食品包裝,茶葉包裝,電子產品包裝,食品包裝盒,食品包裝印刷,化妝品包裝盒,DHL全球',
      // 加 free shipping / free mockup / no minimum / small business / eco friendly / kraft / mailer box
      en: 'custom packaging boxes,paper box printing,corrugated boxes,rigid boxes,magnetic closure boxes,folding cartons,custom box design,foil packaging,small batch packaging,branded packaging,ecommerce packaging,cosmetic packaging,food packaging,food safe packaging,tea packaging,electronics packaging,free shipping packaging,USA custom boxes,Made for USA',
      ja: 'パッケージ箱印刷,オリジナルパッケージ,紙箱印刷,化粧箱,ギフトボックス,構造設計,箔押しパッケージ,小ロットパッケージ,ブランドパッケージ,EC パッケージ,化粧品パッケージ,食品パッケージ,食品対応パッケージ,日本全国,短納期',
    },'''

if old_pkg_kw not in src:
    print('ERROR: packaging keywords not found')
    raise SystemExit(1)
src = src.replace(old_pkg_kw, new_pkg_kw, 1)
print('packaging keywords OK')

old_pkg_desc = '''    descriptions: {
      'zh-hk': '包裝盒訂製 100 個起印，HK$1.5 起/個。結構設計 / 燙金 / UV / 啞膠亮膜 / 內襯 / 開窗，電商、美妝、食品、茶葉、電子產品通用。免費 3D 打稿 6 小時，DHL 全球 2-4 天配送。WhatsApp 30 秒即時報價，ISO 9001 + FSC 認證。',
      en: 'Custom packaging boxes from $0.85, 100 MOQ. Structural design + foil + UV + matte/glossy + inserts + windows for e-commerce, cosmetics, food, tea, electronics. Free 3D proof in 6 hours, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote. ISO 9001 + FSC certified.',
      ja: 'パッケージ箱印刷 100 個から、¥120〜。構造設計・箔押し・UV・マット/光沢・内装・窓開け、EC・化粧品・食品・茶・電子機器向け。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送。30 秒 AI 無料見積もり。',
    },
  },'''

new_pkg_desc = '''    descriptions: {
      // 2026-08-26 K3 §6 轨 1: 食品包裝印刷 pos 15.61 + 食品包裝訂製 pos 19.54 衝首页机会词前置
      'zh-hk': '包裝盒訂製 100 個起印，HK$1.5 起/個。食品包裝 / 化妝品包裝 / 茶葉 / 電子產品通用，結構設計 / 燙金 / UV / 啞膠亮膜 / 內襯 / 開窗。免費 3D 打稿 6 小時，DHL 全球 2-4 天配送，滿 HK$500 順豐香港免運費。WhatsApp 30 秒即時報價，ISO 9001 + FSC 認證。',
      en: 'Custom packaging boxes from $0.85, 100 MOQ. Food safe / cosmetic / tea / electronics packaging, structural design + foil + UV + matte/glossy + inserts + windows. Free 3D proof in 6 hours, DHL 2-4 day USA delivery, free shipping $99+. Made for USA, perfect for e-commerce and retail brands. 30-second AI quote, ISO 9001 + FSC certified.',
      ja: 'パッケージ箱印刷 100 個から、¥120〜。食品対応 / 化粧品 / 茶 / 電子機器向け、構造設計・箔押し・UV・マット/光沢・内装・窓開け。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送、沖縄・北海道対応。30 秒 AI 無料見積もり、ISO 9001 認証品質。',
    },
  },'''

if old_pkg_desc not in src:
    print('ERROR: packaging descriptions not found')
    raise SystemExit(1)
src = src.replace(old_pkg_desc, new_pkg_desc, 1)
print('packaging descriptions OK')

# ─── 2) envelopes 改写 ───
old_env_titles = '''    // 2026-08-19 R2 #2: 大信封 1 行 meta 修 (rank 3.37/19 imps/0 click → 注入「大信封」「公文」「A4」核心词)
    titles: {
      'zh-hk': '大信封 / A4 信封印刷 100 個起 · 牛皮/開窗/彩色/企業 LOGO | 智印港',
      en: 'Custom Envelopes Free Shipping · 100 MOQ Kraft/Window/Corporate Logo | ZprintPro',
      ja: '封筒印刷 100個〜 · クラフト/窓付き/カラー/企業ロゴ ISO認証 DHL | ZprintPro',
    },'''

new_env_titles = '''    // 2026-08-26 K3 §6 轨 1 + T45 §A 15 提前启动 + 大信封 pos 2.0 16 imps 0 click 撞墙 = 修复
    // 8/19 R2 #2 1 行 meta 修未生效, 撞墙 = 修复升 P0 第 1 优先
    titles: {
      'zh-hk': '大信封 / C4 / C5 信封印刷 HK$0.45起 | 100個起印・公文信封・牛皮・開窗・WhatsApp 30秒報價 | 智印港',
      en: 'C4 / C5 / DL Envelopes from $0.06 | 100 MOQ + Free Proof + Made for USA | ZprintPro',
      ja: '長3 / 洋形 封筒印刷 ¥8〜 | 100個〜・無料デザイン・短納期・全国送料 | ZprintPro',
    },'''

if old_env_titles not in src:
    print('ERROR: envelopes titles not found')
    raise SystemExit(1)
src = src.replace(old_env_titles, new_env_titles, 1)
print('envelopes titles OK')

old_env_kw = '''    keywords: {
      'zh-hk': '大信封,信封印刷,A4信封,公文信封,大號信封,牛皮信封,開窗信封,彩色信封,企業信封,LOGO信封,定制信封,中式信封,西式信封,航空信封,印刷信封,郵寄信封',
      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing','''

new_env_kw = '''    keywords: {
      'zh-hk': '大信封,信封印刷,A4信封,公文信封,大號信封,牛皮信封,開窗信封,彩色信封,企業信封,LOGO信封,定制信封,中式信封,西式信封,航空信封,印刷信封,郵寄信封,C4信封,C5信封,快遞信封,公函信封',
      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,C4 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing,Made for USA,Free Proof','''

if old_env_kw not in src:
    print('ERROR: envelopes keywords not found')
    raise SystemExit(1)
src = src.replace(old_env_kw, new_env_kw, 1)
print('envelopes keywords OK')

old_env_desc = '''    descriptions: {
      'zh-hk': '大信封印刷 100 個起印, HK$0.45/個. A4 公文信封 / 牛皮 / 開窗 / 彩色 / 企業 LOGO 定制. ISO 9001 認證紙材 + 30 秒 AI 即時報價 + DHL 全球 2-4 天速遞, 滿 HK$500 順豐香港免運費.',
      en: 'Custom envelope printing 100 MOQ. Kraft / window / colored / DL / C5 + corporate branding. Free shipping over $99 to USA. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: '封筒印刷 100 個から対応. クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',
    },
  },'''

new_env_desc = '''    descriptions: {
      // 2026-08-26 K3 §6 轨 1 + T45 §A 15 提前启动 撞墙 = 修复: 大信封 pos 2.0 16 imps 0 click
      'zh-hk': '大信封印刷 HK$0.45/個,100 個起印。A4 公文信封 / C4 / C5 / 牛皮 / 開窗 / 彩色 / 企業 LOGO 定制,滿 HK$500 順豐香港免運費。WhatsApp 30 秒即時報價,ISO 9001 認證紙材,DHL 全球 2-4 天速遞。',
      en: 'Custom envelope printing 100 MOQ. C4 / C5 / DL / kraft / window / colored / corporate branding. Free shipping over $99 to USA + free proof in 4 hours. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global delivery. Made for USA, perfect for business and corporate use.',
      ja: '封筒印刷 100 個から、¥8〜。長3 / 洋形 / C4 / C5 / クラフト / 窓付き / カラー / 企業ロゴ。無料デザイン校正 4 時間、ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日。',
    },
  },'''

if old_env_desc not in src:
    print('ERROR: envelopes descriptions not found')
    raise SystemExit(1)
src = src.replace(old_env_desc, new_env_desc, 1)
print('envelopes descriptions OK')

# ─── 3) calendars 改写 (R5 月曆印刷 pos 23.61 → 9 月中前 ≤15) ───
old_cal_titles = '''  'calendars': {
    titles: {
      'zh-hk': '月曆印刷 2027 | 台曆 + 掛曆 | 30 秒报价 | 智印港',
      en: 'Custom Calendars Free Shipping · 100 MOQ 2027 Hardcover Foil | ZprintPro',
      ja: 'カレンダー印刷 100部〜 · デスク/壁掛け/2027 箔押し上製本 ISO認証 | ZprintPro',
    },'''

new_cal_titles = '''  'calendars': {
    titles: {
      // 2026-08-26 K3 §6 维持不变 R5 + 月曆印刷 pos 23.61 → 9 月中前 ≤15 (9/15 硬截止 季节军令状)
      // 9 月中前是 Q4 订 calendar 旺季前置期, 月曆印刷必须 9/15 前冲首页
      'zh-hk': '月曆印刷 2027 | 100本起印・Q4旺季・60天預訂・燙金精裝・企業LOGO | 智印港',
      en: '2027 Calendar Printing 100 MOQ | Q4 Peak + 60 Days Ahead + Foil Hardcover + Made for USA | ZprintPro',
      ja: '2027年カレンダー印刷 100部〜 | 繁忙期前・60日予約・箔押し上製本・短納期 | ZprintPro',
    },'''

if old_cal_titles not in src:
    print('ERROR: calendars titles not found')
    raise SystemExit(1)
src = src.replace(old_cal_titles, new_cal_titles, 1)
print('calendars titles OK')

old_cal_kw = '''    keywords: {
      'zh-hk': '月曆印刷,年曆印刷,座檯月曆,掛牆月曆,2027年曆,企業年曆,禮品月曆,定制月曆,燙金月曆,精裝月曆,日曆印刷,教師月曆,辦公文具',
      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar',
      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品',
    },'''

new_cal_kw = '''    keywords: {
      'zh-hk': '月曆印刷,年曆印刷,座檯月曆,掛牆月曆,2027年曆,企業年曆,禮品月曆,定制月曆,燙金月曆,精裝月曆,日曆印刷,教師月曆,辦公文具,Q4旺季,60天預訂',
      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar,Q4 Peak,60 Days Ahead',
      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品,繁忙期前,60日予約',
    },'''

if old_cal_kw not in src:
    print('ERROR: calendars keywords not found')
    raise SystemExit(1)
src = src.replace(old_cal_kw, new_cal_kw, 1)
print('calendars keywords OK')

old_cal_desc = '''    descriptions: {
      'zh-hk': '月曆印刷 100 本起印. 座檯/掛牆/2027 + 燙金精裝 + 企業 LOGO. ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送. Q4 旺季建議提前 60 天下單.',
      en: 'Custom calendar printing 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding. Free shipping over $99 to USA. DHL Express 2-4 day. 30-second AI quote, ISO 9001. Order 60 days before Q4 peak. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: 'カレンダー印刷 100 部から対応. デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日. 繁忙期の 60 日前までのご注文を推奨.',
    },
  },'''

new_cal_desc = '''    descriptions: {
      // 2026-08-26 K3 §6 R5: 月曆印刷 pos 23.61 → 9 月中前 pos ≤15, 9/15 硬截止
      'zh-hk': '月曆印刷 100 本起印, HK$10起/本. 座檯/掛牆/2027 + 燙金精裝 + 企業 LOGO. Q4 旺季建議提前 60 天下單 (9/15 硬截止前). ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送, 滿 HK$500 順豐香港免運費。',
      en: 'Custom calendar printing 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding. Q4 peak — order 60 days ahead (deadline 9/15). Free shipping over $99 to USA + DHL Express 2-4 day. 30-second AI quote, ISO 9001. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: 'カレンダー印刷 100 部から、¥300〜。デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO。繁忙期前 60 日予約 (9/15 締切)。ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日。',
    },
  },'''

if old_cal_desc not in src:
    print('ERROR: calendars descriptions not found')
    raise SystemExit(1)
src = src.replace(old_cal_desc, new_cal_desc, 1)
print('calendars descriptions OK')

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(src)

print('\n✅ 3 类目 × 3 locale = 9 改动全部完成, src/lib/seo.ts 写回')
print('✅ paper-bags 已改 (1 次 edit), 3 类目再改 9 改动, 总 12 改动')
