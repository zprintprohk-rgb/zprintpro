import io, re, sys

FILES = [
    r"src\data\products-content.ts",
    r"src\data\sku-seo-data.ts",
    r"src\data\category-seo-content.ts",
    r"src\data\category-conversion-blocks.ts",
    r"src\app\[locale]\services\catalog-printing-china\page.tsx",
    r"src\app\[locale]\services\business-cards-printing\page.tsx",
    r"src\app\[locale]\product\[slug]\v9\ProductPageV9.tsx",
]

# ordered pairs: (old, new) — most specific first; applied to every file, count printed
PAIRS = [
    # ---- zh: 國際品質認證 -> 品質管理 (list/attribution positions)
    ("FSC 認證紙材、ISO 12647 色彩管理、國際品質認證。", "FSC 認證紙材、ISO 12647 色彩管理、品質管理。"),
    ("ISO 12647 色彩管理、國際品質認證把關。", "ISO 12647 色彩管理、品質管理把關。"),
    # ---- ja: 国際品質認証 -> 品質管理
    ("FSC 認証紙、ISO 12647 カラー管理、国際品質認証。", "FSC 認証紙、ISO 12647 カラー管理、品質管理。"),
    ("FSC 認証紙材、ISO 12647 色彩管理、国際品質認証。", "FSC 認証紙材、ISO 12647 色彩管理、品質管理。"),
    ("<strong>ISO 12647 色彩管理</strong> + <strong>国際品質認証</strong>。",
     "<strong>ISO 12647 色彩管理</strong> + <strong>品質管理</strong>。"),
    ("<li><strong>FSC 認証 + 国際品質認証</strong>：", "<li><strong>FSC 認証 + 品質管理</strong>："),
    # ---- 國際認證體系 -> 自有工廠 / 自有產線 / 自有廠房 (sibling-approved wording c7a1b665)
    ("同樣國際認證體系產線、FSC 認證紙材。", "同樣自有產線、FSC 認證紙材。"),
    ("深圳自有 國際認證體系工廠，", "深圳自有 工廠，"),
    ("所有訂單 國際認證體系、ISO 12647 色彩管理,FSC 認證紙材可選。", "所有訂單 ISO 12647 色彩管理,FSC 認證紙材可選。"),
    ("國際認證體系質檢，旺季提前8週鎖定產能。", "自有工廠質檢，旺季提前8週鎖定產能。"),
    ("國際認證體系 + FSC 認證, 4 色柯式印刷", "自有工廠 + FSC 認證, 4 色柯式印刷"),
    ("國際認證體系 + FSC 認證. 對比歐美印刷廠慳 30-40%.", "FSC 認證. 對比歐美印刷廠慳 30-40%."),
    ("{ title: '國際認證體系', desc: '深圳工廠通過國際質量管理體系認證, 多年印刷經驗' }",
     "{ title: '自有工廠', desc: '深圳工廠通過國際質量管理體系認證, 多年印刷經驗' }"),
    ("深圳工廠多年印刷經驗, 國際認證體系, FSC 紙張認證, 大豆油墨可選.",
     "深圳工廠多年印刷經驗, 自有工廠品檢, FSC 紙張認證, 大豆油墨可選."),
    ("trustBadge1: '國際認證體系',", "trustBadge1: '自有工廠',"),
    ("國際認證體系工廠，FSC 認證紙張可選。", "自有工廠，FSC 認證紙張可選。"),
    ("國際認證體系工廠質檢，FSC 認證紙張與大豆油墨可選", "自有工廠質檢，FSC 認證紙張與大豆油墨可選"),
    ("{ label: '認證', value: '國際認證體系；FSC 紙張可選' }", "{ label: '認證', value: 'FSC 紙張可選' }"),
    ("heading: '國際認證體系廠房',", "heading: '自有廠房',"),
    ("description: '國際認證體系流程，出貨前抽檢色彩與裁切。'", "description: '自有工廠流程，出貨前抽檢色彩與裁切。'"),
    ("設計打稿 4 小時，國際認證體系，港九新界滿 HK$500", "設計打稿 4 小時，港九新界滿 HK$500"),
    ("WhatsApp 30 秒即時報價，國際認證體系。", "WhatsApp 30 秒即時報價。"),
    # ---- en: internationally certified
    ("Production runs on <strong>internationally certified</strong> lines with",
     "Production runs on <strong>quality-managed</strong> lines with"),
    ("internationally certified quality management system", "quality management system"),
    ("internationally certified quality management systems", "quality management systems"),
    ("internationally certified manufacturing standards", "quality-managed manufacturing standards"),
    ("internationally certified manufacturing,", "quality-managed manufacturing,"),
    ("internationally certified production", "quality-managed production"),
    ("internationally certified quality control", "standard quality control"),
    ("internationally certified + FSC-certified", "FSC-certified"),
    ("internationally certified + FSC certified.", "FSC certified."),
    ("and we are internationally certified.", "."),
    ("internationally certified + FSC", "FSC"),
    # ---- en: international quality certification (1)
    ("Our international quality certification and ISO 12647", "Our quality management and ISO 12647"),
]

TARGET = re.compile(r'國際認證體系|國際品質認證|国際品質認証|internationally certified|international quality certification')

total = 0
for path in FILES:
    s = io.open(path, encoding="utf-8", newline="").read()
    before = len(TARGET.findall(s))
    if before == 0:
        print("skip (0 hits):", path); continue
    for old, new in PAIRS:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            total += n
            print("  %-95s x%d" % (old[:95], n))
    after = len(TARGET.findall(s))
    if after == before:
        print("  !! no reduction in", path)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    print("== %s: %d -> %d" % (path, before, after))

print("TOTAL replacements:", total)
# residue report
print("\n=== RESIDUE ===")
for path in FILES:
    s = io.open(path, encoding="utf-8").read()
    for m in TARGET.finditer(s):
        ln = s[:m.start()].count("\n")+1
        print("  %s L%d: %r" % (path, ln, s[max(0,m.start()-60):m.start()+60]))
