# -*- coding: utf-8 -*-
"""
B1c cluster2 finish v2: cartoon/eco/large red-packets x3 locales (+ embossed alignment).
Fixes vs v1: CSV keywords are comma-separated plain text; cartoon CSV desc/h1 stale ->
whole-cell sync from ts truth + turnaround fix; ja FAQ via anchor-slice; scan zh-only.
Modes: verify (default) | apply (--apply). No write unless ALL assertions pass.
"""
import io, json, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-b1c2c-20261015")

CSV_PATH = os.path.join(ROOT, "zprintpro-sku-seo-data.csv")
TS_PATH = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")
PROD_PATH = os.path.join(ROOT, "src", "data", "products.ts")

errors = []

def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

def equiv(s):
    return sum(2 if ord(c) > 0x2E80 else 1 for c in s)

def load(path):
    with io.open(path, "r", encoding="utf-8", newline="") as f:
        return f.read()

# ================================================================ CSV layer
raw_csv = load(CSV_PATH)
csv_lines = raw_csv.split("\n")
csv_trailing_nl = raw_csv.endswith("\n")
header = csv_lines[0].split("\t")
COL = {name: i for i, name in enumerate(header)}
SLUG_COL = COL["Slug"]

row_idx = {}
for i, ln in enumerate(csv_lines):
    cells = ln.split("\t")
    if len(cells) > SLUG_COL and cells[SLUG_COL] in (
        "foil-red-packets", "embossed-red-packets", "custom-red-packets",
        "cartoon-red-packets", "eco-red-packets", "large-red-packets"):
        row_idx[cells[SLUG_COL]] = i

check(len(row_idx) == 6, "CSV rows found: %d/6" % len(row_idx))

# (slug, column, mode, old, new)  mode: sub=substring-replace, cell=whole-cell
K_OLD_CARTOON_ZH = "卡通利是封,利是封,利是封印刷,春聯,中秋賀卡,聖誕卡,婚禮請柬,嬰兒滿月卡,感謝卡,燙金紅包"
K_OLD_CARTOON_JA = "cartoon red packets,紅包印刷,旧正月,箔押し紅包,オリジナル紅包,キャラクター紅包,中華風招待状,挨拶状,24時間出荷,UV 招待状"
K_OLD_ECO_ZH = "環保利是封,利是封,利是封印刷,利是封訂製,春聯,中秋賀卡,聖誕卡,婚禮請柬,嬰兒滿月卡,感謝卡"
K_OLD_ECO_JA = "eco red packets,紅包印刷,旧正月,箔押し紅包,オリジナル紅包,キャラクター紅包,中華風招待状,挨拶状,24時間出荷,UV 招待状"
K_OLD_LARGE_ZH = "大利是封,利是封,利是封印刷,春聯,中秋賀卡,聖誕卡,婚禮請柬,嬰兒滿月卡,感謝卡,燙金紅包"
K_OLD_LARGE_JA = "large red packets,紅包印刷,旧正月,箔押し紅包,オリジナル紅包,キャラクター紅包,中華風招待状,挨拶状,24時間出荷,UV 招待状"
K_OLD_EMB_ZH = "浮雕利是封,利是封,燙金,浮雕,春聯,中秋賀卡,聖誕卡,婚禮請柬,嬰兒滿月卡,感謝卡"
K_OLD_EMB_JA = "embossed red packets,紅包印刷,旧正月,箔押し紅包,オリジナル紅包,キャラクター紅包,中華風招待状,挨拶状,24時間出荷,UV 招待状"

csv_edits = [
    # ---- cartoon: CSV is STALE for desc/h1 (ts hand-edited 10-14, CSV not synced) -> whole-cell sync + fixes
    ("cartoon-red-packets", "SEO描述(ZH)", "cell",
     "卡通利是封/卡通利是封 100 個起。採用 157g 紅金紙/銅版紙 高品質材質，支援 標準/訂製 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計。5-7 個工作天交貨，港九新界免費速遞，順豐速遞上門。專業團隊、價格透明，企業活動、店舖推廣首選。",
     "智印港卡通利是封印刷：以客戶插畫或吉祥物稿件印製，120g 銅版紙或環保紙配四色數碼印刷，可選燙金或局部 UV。100 個起 HK$1.10 起，標準 90×170mm 並支援異形刀模，5-7 個工作天交貨，30 秒 AI 報價。"),
    ("cartoon-red-packets", "SEO描述(EN)", "cell",
     "Custom cartoon red packets from ZprintPro the US. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ",
     "Cartoon red packet printing from your own illustration or mascot artwork, four-colour digital print on 120gsm art or eco paper, with optional gold foil or spot UV. 100 pcs MOQ from US$0.46, standard 90x170mm, free die-cutting, 5-7 business day production and a 30-second AI quote."),
    ("cartoon-red-packets", "SEO描述(JA)", "cell",
     "イラスト年賀状のイラスト年賀状は ZprintPro にお任せ。157g 赤金紙/コート 高品質用紙、標準/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。100個〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。自社工場直結の安心感。",
     "キャラクターポチ袋のオリジナル印刷は100枚から、1枚¥64〜。お客様のイラストやマスコット原稿を120gコート紙またはエコ紙に4色デジタル印刷、箔押し・スポットUVも選択できます。標準90×170mm・型代無料、納期5-7営業日。30秒AI見積り。"),
    ("cartoon-red-packets", "H1标题(ZH)", "cell",
     "可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。智印港提供專業卡通利是封服務，香港本地印刷，品質保證，價格透明。",
     "卡通利是封印刷 — 插畫與吉祥物稿件，100 個起訂製"),
    ("cartoon-red-packets", "H1标题(EN)", "cell",
     "Cartoon Red Packets 100+ | ZprintPro",
     "Cartoon Red Packet Printing: Your Artwork, 100 pcs MOQ"),
    ("cartoon-red-packets", "H1标题(JA)", "cell",
     "高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。",
     "キャラクターポチ袋の印刷 100枚〜：イラスト原稿に4色デジタル印刷・箔押し対応"),
    ("cartoon-red-packets", "SEO关键词(ZH)", "cell", K_OLD_CARTOON_ZH,
     "卡通利是封,卡通利是封印刷,利是封印刷,訂製卡通利是封,兒童利是封,親子品牌利是封,新年利是封"),
    ("cartoon-red-packets", "SEO关键词(JA)", "cell", K_OLD_CARTOON_JA,
     "キャラクターポチ袋,キャラクターポチ袋印刷,ポチ袋印刷,オリジナルポチ袋,お年玉袋,イラストポチ袋,干支ポチ袋"),
    # ---- eco: title/desc/h1 full rewrite + keywords
    ("eco-red-packets", "SEO标题(ZH)", "cell",
     "環保利是封 燙金・覆膜・100起印・HK$1.90起 | 智印港",
     "環保利是封印刷 | FSC再生紙 | 100個起 HK$1.90起 | 智印港"),
    ("eco-red-packets", "SEO标题(EN)", "cell",
     "Eco Red Packets | 100 MOQ $0.74 | Free Ship | ZprintPro",
     "Eco Red Packets | FSC Paper 100 MOQ $0.74 | ZprintPro"),
    ("eco-red-packets", "SEO描述(ZH)", "cell",
     "環保利是封/利是封 100 個起。採用 157g 紅金紙/銅版紙 高品質材質，支援 標準/訂製 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計。5-7 個工作天交貨，港九新界免費速遞，順豐速遞上門。專業團隊、價格透明，企業活動、店舖推廣首選。",
     "智印港環保利是封印刷：FSC 認證再生紙或種子紙配大豆油墨，無覆膜可自然降解，種子紙用後可種植。100 個起 HK$1.90 起，四色數碼或柯式印刷，標準 90×170mm，5-7 個工作天交貨，30 秒 AI 報價。"),
    ("eco-red-packets", "SEO描述(EN)", "cell",
     "Custom eco red packets from ZprintPro the US. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ",
     "Custom eco red packets on FSC-certified recycled or plantable seed paper with soy-based ink, lamination-free and biodegradable. 100 pcs MOQ from HK$1.90, four-colour digital or offset, 90x170mm standard. 5-7 day turnaround, 30-second AI quote."),
    ("eco-red-packets", "SEO描述(JA)", "cell",
     "エコ年賀状のエコ年賀状は ZprintPro にお任せ。157g 赤金紙/コート 高品質用紙、標準/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。100個〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。自社工場直結の安心感。",
     "エコポチ袋のカスタム印刷は100枚から、1枚¥103〜。FSC認証リサイクル紙または種子紙に大豆インク、コーティングなしで自然分解。4色デジタル/オフセット対応、標準90×170mm。納期5-7営業日、30秒AI見積り。"),
    ("eco-red-packets", "H1标题(ZH)", "cell",
     "採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。智印港提供專業環保利是封服務，香港本地印刷，品質保證，價格透明。",
     "環保利是封印刷 — FSC再生紙・種子紙與大豆油墨選材指南"),
    ("eco-red-packets", "H1标题(EN)", "cell",
     "Eco Red Packets 100+ | Gold Foil Print | ZprintPro",
     "Eco Red Packet Printing: FSC & Seed Paper, 100 MOQ"),
    ("eco-red-packets", "H1标题(JA)", "cell",
     "高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。",
     "エコポチ袋 100枚〜：FSC再生紙・種子紙・大豆インク対応"),
    ("eco-red-packets", "SEO关键词(ZH)", "cell", K_OLD_ECO_ZH,
     "環保利是封,環保利是封印刷,利是封印刷,FSC利是封,種子紙利是封,可降解利是封,新年利是封"),
    ("eco-red-packets", "SEO关键词(JA)", "cell", K_OLD_ECO_JA,
     "エコポチ袋,エコポチ袋印刷,ポチ袋印刷,リサイクル紙ポチ袋,種子紙ポチ袋,オリジナル祝儀袋,お年玉袋"),
    # ---- large: title en / desc / h1 / keywords
    ("large-red-packets", "SEO标题(EN)", "cell",
     "Large Red Packets | 100 MOQ $0.92 | Free Ship | ZprintPro",
     "Large Red Packets | 110x200mm 100 MOQ $0.92 | ZprintPro"),
    ("large-red-packets", "SEO描述(ZH)", "cell",
     "大利是封/大利是封 100 個起。採用 157g 紅金紙/銅版紙 高品質材質，支援 標準/訂製 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計。5-7 個工作天交貨，港九新界免費速遞，順豐速遞上門。專業團隊、價格透明，企業活動、店舖推廣首選。",
     "智印港大號利是封印刷：約 110×200mm 較標準大 30%-50%，150g-200g 厚身紅紙配四色印刷，燙金/浮雕/局部 UV 可選，厚禮金與禮品卡不摺角。100 個起 HK$2.20 起，5-7 個工作天交貨，30 秒 AI 報價。"),
    ("large-red-packets", "SEO描述(EN)", "cell",
     "Custom large red packets from ZprintPro the US. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ",
     "Custom large red packets at about 110x200mm — 30-50% bigger than standard — on sturdy 150-200gsm red paper with foil, embossing or spot UV. Fits thick lucky money and gift cards. 100 pcs MOQ from HK$2.20, 5-7 day turnaround, 30-second AI quote."),
    ("large-red-packets", "SEO描述(JA)", "cell",
     "大型年賀状の大型年賀状は ZprintPro にお任せ。157g 赤金紙/コート 高品質用紙、標準/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。100個〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。自社工場直結の安心感。",
     "大判ポチ袋のカスタム印刷は100枚から、1枚¥129〜。約110×200mmで標準より30〜50%大きく、150-200g厚紙。箔押し・エンボス・スポットUV対応、厚札やギフトカードも折らずに収まります。納期5-7営業日、30秒AI見積り。"),
    ("large-red-packets", "H1标题(ZH)", "cell",
     "加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。智印港提供專業大號利是封服務，香港本地印刷，品質保證，價格透明。",
     "大號利是封印刷 — 110×200mm 加大 30%-50% 的厚禮首選"),
    ("large-red-packets", "H1标题(EN)", "cell",
     "Large Red Packets 100+ | ZprintPro",
     "Large Red Packet Printing: 110x200mm, 30-50% Bigger"),
    ("large-red-packets", "H1标题(JA)", "cell",
     "高品質・短納期・グローバル配送。ZprintPro がプロフェッショナル印刷サービスを提供。",
     "大判ポチ袋 100枚〜：標準より30〜50%大きい110×200mm"),
    ("large-red-packets", "SEO关键词(ZH)", "cell", K_OLD_LARGE_ZH,
     "大號利是封,大號利是封印刷,大利是封,利是封印刷,加大利是封,禮品卡利是封,新年利是封"),
    ("large-red-packets", "SEO关键词(JA)", "cell", K_OLD_LARGE_JA,
     "大判ポチ袋,大判ポチ袋印刷,ポチ袋印刷,大きいポチ袋,大判祝儀袋,オリジナル祝儀袋,お年玉袋"),
    # ---- embossed: keywords focus + 交期 3-5 -> 5-7
    ("embossed-red-packets", "SEO关键词(ZH)", "cell", K_OLD_EMB_ZH,
     "浮雕利是封,浮雕利是封印刷,利是封印刷,立體浮雕利是封,燙金浮雕利是封,壓凹利是封,新年利是封"),
    ("embossed-red-packets", "SEO关键词(JA)", "cell", K_OLD_EMB_JA,
     "エンボスポチ袋,エンボスポチ袋印刷,ポチ袋印刷,立体加工ポチ袋,箔押しポチ袋,オリジナル祝儀袋,正月グッズ"),
    ("embossed-red-packets", "SEO描述(ZH)", "sub", "3-5 個工作天交貨", "5-7 個工作天交貨"),
    ("embossed-red-packets", "SEO描述(EN)", "sub", "3-5 business day production", "5-7 business day production"),
    ("embossed-red-packets", "SEO描述(JA)", "sub", "納期3〜5営業日", "納期5-7営業日"),
]

print("=== CSV edits ===")
csv_cell_edits = []
for slug, colname, mode, old, new in csv_edits:
    i = row_idx.get(slug)
    if i is None:
        check(False, "row missing: %s" % slug); continue
    cells = csv_lines[i].split("\t")
    ci = COL[colname]
    cell = cells[ci]
    if mode == "sub":
        n = cell.count(old)
        check(n == 1, "CSV %s.%s sub-unique (hit=%d)" % (slug, colname, n))
        if n != 1:
            continue
        newcell = cell.replace(old, new)
    else:
        check(cell == old, "CSV %s.%s whole-cell exact match (len %d)" % (slug, colname, len(cell)))
        if cell != old:
            print("       actual: %r" % cell[:120]); continue
        newcell = new
    csv_cell_edits.append((i, ci, cell, newcell))
    if colname.startswith("SEO标题"):
        e = equiv(newcell)
        check(50 <= e <= 57, "title equiv %s.%s = %d (50-57)" % (slug, colname, e))
    check(24 <= len(newcell) <= 330, "%s.%s len=%d" % (slug, colname, len(newcell)))
    if colname.startswith("H1标题"):
        eh = equiv(newcell)
        check(eh <= 90, "h1 equiv sanity %s.%s = %d (<=90; title band not applied to H1)" % (slug, colname, eh))
    if "关键词" in colname:
        arr = [w.strip() for w in newcell.split(",") if w.strip()]
        check(5 <= len(arr) <= 10, "kw count %d" % len(arr))
        check(any(("利是封" in w) or ("ポチ袋" in w) or ("祝儀袋" in w) for w in arr), "kw anchor present")

# ================================================================ ts layer
raw_ts = load(TS_PATH)
ts_text = raw_ts
ts_lines = raw_ts.split("\n")
SLUGS = ["foil-red-packets", "embossed-red-packets", "custom-red-packets",
         "cartoon-red-packets", "eco-red-packets", "large-red-packets"]
starts = {}
for m in re.finditer(r'\s*"(foil-red-packets|embossed-red-packets|custom-red-packets|cartoon-red-packets|eco-red-packets|large-red-packets)": \{', raw_ts):
    starts[m.group(1)] = m.start()
order = sorted(starts.items(), key=lambda kv: kv[1])
blocks = {}
for j, (s, st) in enumerate(order):
    end = order[j + 1][1] if j + 1 < len(order) else len(raw_ts)
    blocks[s] = (st, end)

print("=== ts edits ===")
ts_ops = []  # (span_start, span_end, new_text) absolute offsets
for slug, old_sub, new_sub in [
    # cartoon zh
    ("cartoon-red-packets",
     "卡通利是封採用 120g 銅版紙或環保紙，標準尺寸約 90×170mm，以四色數碼印刷呈現色彩鮮明的卡通角色與插畫，可按設計選配燙金或局部 UV，提升質感之餘亦保持親和力。學校、補習社、兒童用品店與親子活動主辦方進行利是封印刷時，卡通風格往往比傳統款式更易引起共鳴，亦適合用於品牌聯乘與節日推廣。",
     "學校、補習社、兒童用品店與親子活動主辦方進行利是封印刷時，卡通風格往往比傳統款式更易引起共鳴：壓歲利是、問候心意、親子工作坊禮物以至畢業紀念都合用，亦適合品牌聯乘與節日推廣。配合免費刀模，吉祥物頭形、動物輪廓等異形設計可以直接落地，令利是封本身成為值得收藏的小紀念品。"),
    ("cartoon-red-packets",
     "正常交期約 3-5 個工作天，港九新界免費速遞。",
     "標準交期 5-7 個工作天，港九新界免費速遞。"),
    ("cartoon-red-packets",
     "批量訂購可向智印港查詢更優惠的報價。",
     "批量訂購可向智印港查詢更優惠的報價。\\n\\n設計稿件與工藝搭配可先看 [利是封印刷總覽](/zh-hk/category/red-packets/)；想加金屬質感可疊加 [燙金利是封](/zh-hk/product/foil-red-packets/)；企業批量訂製見 [企業利是封定制](/zh-hk/product/custom-red-packets/)。\\n\\n**常見問題**\\n\\n**Q1: 卡通利是封可以用自己畫的插畫嗎？**\\n可以。四色數碼印刷直接還原插畫稿件，免費刀模支援異形設計；使用角色版權前請先確認授權範圍。\\n\\n**Q2: 卡通利是封最小訂幾多個？**\\n100 個起印，500 及 1,000 個有階梯數量價，適合學校與親子品牌分批派發。\\n\\n**Q3: 異形刀模要額外收費嗎？**\\n標準與異形刀模均免費；豪華加大款（120×220mm）按尺寸倍率計價。\\n\\n**Q4: 幾時落單先趕得切新年？**\\n農曆新年前 3 週是高峰期，建議 11 月底前落單，連同 5-7 個工作天交期一併計算。"),
    # cartoon ja body rush sentence
    ("cartoon-red-packets",
     "標準納期は3〜5営業日、急ぎの場合は24〜48時間以内にも対応し、DHL・FedExで日本全国へ2〜4日でお届けします。",
     "標準納期は5-7営業日、DHL・FedExで日本全国へ2〜4日でお届けします。"),
    # eco zh
    ("eco-red-packets",
     "落單前交出設計檔案，廠方免費 AI 預檢並與您確認打樣；約 3-5 個工作天完成生產，港九新界免運費直送。",
     "落單前交出設計檔案，廠方免費 AI 預檢並與您確認打樣；標準 5-7 個工作天完成生產，港九新界免運費直送。"),
    ("eco-red-packets",
     "批量訂購可向智印港查詢專屬報價。",
     "批量訂購可向智印港查詢專屬報價。\\n\\nESG 採購與企業批量見 [企業利是封定制](/zh-hk/product/custom-red-packets/)；環保包裝配套可參考 [紙袋印刷](/zh-hk/category/paper-bags/)；規格與工藝總覽見 [利是封印刷總覽](/zh-hk/category/red-packets/)。\\n\\n**常見問題**\\n\\n**Q1: 種子紙利是封真係種到出植物？**\\n可以。種子紙內嵌草花或香草種子，用後埋入泥土保持濕潤即可發芽；再生紙版本則可自然降解。\\n\\n**Q2: 環保利是封可以印幾多色？**\\n四色數碼或柯式印刷皆可，大豆油墨呈色自然；紙面不覆膜，設計上建議避免大面積深色實色，天然紙紋更出效果。\\n\\n**Q3: 可以索取 FSC 證明文件嗎？**\\n可以。FSC 認證與大豆油墨證明隨訂單提供，滿足 ESG 採購審計要求。\\n\\n**Q4: 起訂量同價錢？**\\n100 個起印，HK$1.90-5.20/個，紙材與印刷方式會影響最終報價。"),
    # eco ja body rush
    ("eco-red-packets",
     "標準納期は3〜5営業日、急ぎは24〜48時間以内に対応し、DHL・FedExで日本全国へ2〜4日でお届けします。",
     "標準納期は5-7営業日、DHL・FedExで日本全国へ2〜4日でお届けします。"),
    # large zh
    ("large-red-packets",
     "設計稿提交後廠方提供免費 AI 預檢與打樣確認，隨即排期生產；標準交期 3-5 個工作天，港九新界免費速遞送抵。",
     "設計稿提交後廠方提供免費 AI 預檢與打樣確認，隨即排期生產；標準交期 5-7 個工作天，港九新界免費速遞送抵。"),
    ("large-red-packets",
     "批量訂購可向智印港查詢更優惠的報價。",
     "批量訂購可向智印港查詢更優惠的報價。\\n\\n規格與工藝總覽見 [利是封印刷總覽](/zh-hk/category/red-packets/)；想再升級立體質感可參考 [浮雕利是封](/zh-hk/product/embossed-red-packets/)；企業批量訂製見 [企業利是封定制](/zh-hk/product/custom-red-packets/)。\\n\\n**常見問題**\\n\\n**Q1: 大號利是封實際有幾大？**\\n約 110×200mm，較標準 90×170mm 大約 30%-50%，厚疊現鈔與禮品卡都放得下。\\n\\n**Q2: 加大咁會唔會軟身？**\\n唔會。大號款用 150g-200g 紅色紙張，比標準更挺括，加大尺寸仍保持紙身硬淨。\\n\\n**Q3: 可以加燙金或浮雕嗎？**\\n可以。燙金、浮雕、局部 UV 都可選；大畫面配燙金 Logo 最有氣派，細節位可用局部 UV 點綴。\\n\\n**Q4: 起訂量同交期？**\\n100 個起印，標準 5-7 個工作天；農曆新年前 3 週是高峰期，建議早少少落單。"),
    # large ja body rush
    ("large-red-packets",
     "標準納期は3〜5営業日、急ぎは24〜48時間以内に対応し、DHL・FedExで日本全国へ2〜4日でお届けします。",
     "標準納期は5-7営業日、DHL・FedExで日本全国へ2〜4日でお届けします。"),
    # embossed ts
    ("embossed-red-packets",
     "標準訂單約 3-5 個工作天完成，港九新界免費送貨上門。",
     "標準訂單約 5-7 個工作天完成，港九新界免費送貨上門。"),
    ("embossed-red-packets",
     "標準納期は3〜5営業日、急ぎは24〜48時間以内に対応し、DHL・FedExで日本全国へ2〜4日でお届けします。",
     "標準納期は5-7営業日、DHL・FedExで日本全国へ2〜4日でお届けします。"),
    ("embossed-red-packets",
     "**Q1: 最小注文数はいくつですか？**\\nZprintProのほとんどの商品は50〜100個/部/枚からの注文です。当商品は100個から承ります。即日少量の急ぎは10枚から、大量注文は段階割引で対応しています。",
     "**Q1: 最小注文数はいくつですか？**\\n100個から承ります。500個・1000個の段階割引にも対応しています。"),
    ("embossed-red-packets",
     "**Q2: 印刷と納品の期間は？**\\n標準納期は3〜5営業日、お急ぎの場合は24〜48時間以内に対応します。DHL・FedExで日本全国へ2〜4日でお届けします。",
     "**Q2: 印刷と納品の期間は？**\\n標準納期は5-7営業日です。DHL・FedExで日本全国へ2〜4日でお届けします。"),
]:
    st, en = blocks[slug]
    seg = ts_text[st:en]
    n = seg.count(old_sub)
    check(n == 1, "ts %s unique (hit=%d): %s..." % (slug, n, old_sub[:36]))
    if n == 1:
        pos = st + seg.find(old_sub)
        ts_ops.append((pos, pos + len(old_sub), new_sub, slug, old_sub))

# ---- ja FAQ blocks: anchor-slice (FAQ header .. CTA marker)
JA_FAQ = {
    "cartoon-red-packets": {
        "cta": "かわいいキャラクターポチ袋で",
        "links": "デザインの幅は [祝儀袋印刷一覧](/ja/category/red-packets/)、箔の質感を足すなら [箔押しポチ袋](/ja/product/foil-red-packets/)、企業向けは [企業向けカスタマイズ](/ja/product/custom-red-packets/)。",
        "faq": "**Q1: キャラクターポチ袋の最小注文数は？**\\n100個から。500個・1000個の段階割引もあります。学校や親子ブランドの分割発注に便利です。\\n\\n**Q2: 自社のイラストやマスコットは使えますか？**\\n使えます。4色デジタル印刷で原稿を忠実に再現し、無料刃型で変形デザインにも対応します。キャラクターのご使用範囲は校正前にご確認ください。\\n\\n**Q3: 納期はどのくらいかかりますか？**\\n標準5-7営業日です。旧正月の3週間前は繁忙期のため、11月末までのご注文が安心です。",
    },
    "eco-red-packets": {
        "cta": "エコポチ袋で、環境に",
        "links": "企業向けの大量発注は [企業向けカスタマイズ](/ja/product/custom-red-packets/)、エコ包装の組み合わせは [紙袋印刷](/ja/category/paper-bags/)、全体像は [祝儀袋印刷一覧](/ja/category/red-packets/)。",
        "faq": "**Q1: 本物の植物が育つのは種子紙だけ？**\\nはい。種子紙には草花やハーブの種が封入され、使用後に土に埋めて水を続けると発芽します。リサイクル紙版は自然分解します。\\n\\n**Q2: FSC認証の証明書は発行できますか？**\\nできます。FSC認証と大豆インクの証明書を受注時に発行し、ESG調達の監査対応にご利用いただけます。\\n\\n**Q3: 納期と最小注文数は？**\\n100枚から、標準5-7営業日。旧正月の3週間前は繁忙期のため、11月末までのご注文が安心です。",
    },
    "large-red-packets": {
        "cta": "大きめのお年玉も",
        "links": "立体の質感を足すなら [エンボスポチ袋](/ja/product/embossed-red-packets/)、企業向けは [企業向けカスタマイズ](/ja/product/custom-red-packets/)、全体像は [祝儀袋印刷一覧](/ja/category/red-packets/)。",
        "faq": "**Q1: 通常サイズよりどれくらい大きい？**\\n約110×200mmで、標準90×170mmより30〜50%大きく、厚札やギフトカードも折り曲げずに収まります。\\n\\n**Q2: 加工オプションは何がありますか？**\\n箔押し・エンボス・スポットUVに対応します。大判デザインに箔押しロゴを合わせる構成が定番です。\\n\\n**Q3: 納期と最小注文数は？**\\n100枚から、標準5-7営業日。旧正月の3週間前は繁忙期のため、早めのご注文をおすすめします。",
    },
}
FAQ_MARK = "\\n\\n**FAQ**\\n\\n"
print("=== ts ja FAQ slices ===")
claimed = [(a, b) for a, b, _, _, _ in ts_ops]
for slug, cfg in JA_FAQ.items():
    st, en = blocks[slug]
    ja_i = ts_text.find('"ja": {', st, en)
    check(ja_i > 0, "%s ja section located" % slug)
    if ja_i < 0:
        continue
    faq_i = ts_text.find(FAQ_MARK, ja_i, en)
    cta_i = ts_text.find(cfg["cta"], faq_i, en)
    check(faq_i > 0 and cta_i > faq_i, "%s FAQ span anchors (faq@%d cta@%d)" % (slug, faq_i, cta_i))
    if faq_i > 0 and cta_i > faq_i:
        old_span = ts_text[faq_i:cta_i]
        check("10枚から" in old_span, "%s old FAQ carries MOQ-10 contradiction" % slug)
        check("入稿" in old_span and old_span.count("**Q") == 3, "%s old FAQ shape (3 Q)" % slug)
        overlap = any(not (b <= faq_i or a >= cta_i) for a, b in claimed)
        check(not overlap, "%s FAQ span does not overlap other edits" % slug)
        if not overlap:
            new_span = FAQ_MARK.rstrip("\\n").replace("**FAQ**", "")  # placeholder, replaced below
            new_span = "\\n\\n" + cfg["links"] + "\\n\\n**FAQ**\\n\\n" + cfg["faq"]
            ts_ops.append((faq_i, cta_i, new_span, slug, old_span))
            claimed.append((faq_i, cta_i))

# ---- shape assertions on inserted fragments
def frag_of(new_text):
    return new_text
joined_new = "".join(frag_of(n) for _, _, n, _, _ in ts_ops if isinstance(n, str)) + \
             "".join(n for _, _, _, n in csv_cell_edits)
zh_frags = [n for _, _, n, _, _ in ts_ops if "常見問題" in n] + \
           [n for _, _, _, n in csv_cell_edits if any("\uff18" == c for c in "")]
SIM_ONLY = set("们后发这说时实现对开页买张东丝乐针让贝见车转换运远设计图风网络")
zh_text_all = "".join(n for _, _, n, _, _ in ts_ops if "常見問題" in n or "批量訂購" in n or "智印港" in n)
bad = [c for c in zh_text_all if c in SIM_ONLY]
check(not bad, "no simplified-only chars in new zh text (found: %s)" % "".join(sorted(set(bad))))
for _, _, n, slug, _o in ts_ops:
    for url in re.findall(r"\]\((/[^)]+)\)", n):
        check(url.startswith(("/zh-hk/", "/en/", "/ja/")), "%s link locale-prefixed: %s" % (slug, url))

# ================================================================ products.ts faqSchema
raw_prod = load(PROD_PATH)
prod_lines = raw_prod.split("\n")
prod_starts = {}
for i, ln in enumerate(prod_lines):
    for s in ("cartoon-red-packets", "eco-red-packets", "large-red-packets"):
        if ("slug: '%s'" % s) in ln:
            prod_starts[s] = i

FAQ_NEW = {
 "cartoon-red-packets": '[{"question": "Can I print my own cartoon characters or mascot on red packets?", "answer": "Yes. Four-color digital printing reproduces your illustration faithfully, and the free die template supports shaped designs. Confirm character licensing before proofing."}, {"question": "What is the MOQ for cartoon red packets?", "answer": "100 pieces, with tiered pricing at 500 and 1,000 pieces — convenient for schools and family brands to order in batches."}, {"question": "Are shaped die-cuts extra?", "answer": "No. Both standard and shaped die templates are free; the premium size (120x220mm) is priced at a higher multiplier."}, {"question": "When should I order cartoon red packets for CNY?", "answer": "The three weeks before Lunar New Year are the peak window; ordering by end of November secures capacity on top of the 5-7 day production time."}]',
 "eco-red-packets": '[{"question": "Can seed paper red packets really grow into plants?", "answer": "Yes. Seed paper embeds flower or herb seeds — plant it after use, keep it moist and it sprouts. Recycled-paper versions biodegrade naturally."}, {"question": "What makes the eco red packets eco-friendly?", "answer": "FSC-certified recycled or seed paper printed with soy-based ink, deliberately lamination-free so the whole packet stays biodegradable."}, {"question": "Can I get FSC documentation for ESG procurement?", "answer": "Yes. FSC certification and soy-ink declarations are issued with your order to support ESG procurement audits."}, {"question": "What is the MOQ for eco red packets?", "answer": "100 pieces from HK$1.90; paper choice and print method (digital or offset) affect the final quote."}]',
 "large-red-packets": '[{"question": "How much bigger is a large red packet?", "answer": "About 110x200mm — roughly 30-50% larger than the standard 90x170mm — with room for thick lucky money and gift cards."}, {"question": "Will the larger size still hold its shape?", "answer": "Yes. Large red packets use 150-200gsm red paper, stiffer than the standard stock, so the bigger format stays sturdy."}, {"question": "Can large red packets carry foil or embossing?", "answer": "Yes — gold foil, embossing and spot UV are all available; a foil logo over the larger canvas is the most popular build."}, {"question": "What is the MOQ and turnaround?", "answer": "100 pieces with a standard 5-7 day production time; the three weeks before Lunar New Year are the peak window, so order early."}]',
}
print("=== products.ts faqSchema ===")
prod_line_edits = []
for slug, newfaq in FAQ_NEW.items():
    st = prod_starts[slug]
    hit = next((i for i in range(st, st + 95) if "faqSchema:" in prod_lines[i]), None)
    check(hit is not None, "faqSchema line for %s" % slug)
    if hit is None:
        continue
    old_line = prod_lines[hit]
    check("MOQ 500" in old_line and "traditional Chinese red packet design" in old_line, "%s shared template confirmed" % slug)
    try:
        check(len(json.loads(newfaq)) == 4, "%s new faqSchema 4 QA" % slug)
    except Exception as ex:
        check(False, "%s faqSchema JSON: %s" % (slug, ex))
    prod_line_edits.append((hit, old_line, "    faqSchema: " + newfaq + ","))

# ================================================================ write
if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for src in (CSV_PATH, TS_PATH, PROD_PATH):
        shutil.copy2(src, os.path.join(BAK, os.path.basename(src) + ".bak"))
    for i, ci, oldc, newc in csv_cell_edits:
        cells = csv_lines[i].split("\t")
        assert cells[ci] == oldc
        cells[ci] = newc
        csv_lines[i] = "\t".join(cells)
    new_csv = "\n".join(csv_lines) + ("\n" if csv_trailing_nl else "")
    # ts: apply ops in reverse offset order
    ts_ops_sorted = sorted(ts_ops, key=lambda t: t[0], reverse=True)
    new_ts = ts_text
    for a, b, ntxt, slug, _o in ts_ops_sorted:
        assert new_ts[a:b] == _o
        new_ts = new_ts[:a] + ntxt + new_ts[b:]
    for i, oldl, newl in prod_line_edits:
        assert prod_lines[i] == oldl
        prod_lines[i] = newl
    new_prod = "\n".join(prod_lines)
    for path, content in ((CSV_PATH, new_csv), (TS_PATH, new_ts), (PROD_PATH, new_prod)):
        with io.open(path, "w", encoding="utf-8", newline="") as f:
            f.write(content)
    for path in (CSV_PATH, TS_PATH, PROD_PATH):
        b = open(path, "rb").read(4)
        check(b[0] != 0xFF, "no BOM: %s" % os.path.basename(path))
    print("\nWROTE: CSV %d cells / ts %d ops / products.ts %d lines" %
          (len(csv_cell_edits), len(ts_ops), len(prod_line_edits)))
else:
    print("\nVERIFY: %d csv cells, %d ts ops, %d prod lines pending." %
          (len(csv_cell_edits), len(ts_ops), len(prod_line_edits)))

print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
