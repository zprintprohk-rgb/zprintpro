# -*- coding: utf-8 -*-
"""
.hermes/_b1c7_apply_20261016.py — B1c 簇7 calendars 六 SKU 综合执行 (v2 方案 §3 10/16 档)
价格口径逐 SKU 核对 (方案要求): 全家 6 SKU products.ts 一手真值 = price_range 'HK$3-8/本' / basePrice 3 / basePrice_en 0.40 / basePrice_ja 50 / minQuantity 1
ts body 六块前会话已差异化 (13頁/三角座架/完全客製/85×55mm/硬紙板相架/軟磁片) — 本批不触碰 body (最小 churn), 仅扫描登记
范围: CSV desc×18 + h1×18 + altZH×4 + altEN×6 + altJA×6 + kwZH×6 + kwJA×6 + kwEN×1 = 65 格; products.ts faqSchema ×6 插入 (块内原无)
§12 三件套: 计数断言 + 形状断言 + 备份
"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS_P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
PROD_P = os.path.join(REPO, "src", "data", "products.ts")
CSV_P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c7-20261016")
os.makedirs(BAK, exist_ok=True)

ROWS = {39: "wall-calendars", 40: "desk-calendars", 41: "custom-calendars",
        42: "mini-calendars", 43: "photo-frame-calendars", 44: "magnetic-calendars"}

# col: 8 kwZH, 9 kwEN, 10 kwJA, 11 descZH, 12 descEN, 13 descJA, 14 h1ZH, 15 h1EN, 16 h1JA, 27 altZH, 28 altEN, 29 altJA
CELLS = {
"wall-calendars": {
 11: "智印港掛牆年曆印刷：標準 A3/A2 大版面 13 頁設計（封面+12 個月），1 本起印，300g 銅版紙或啞粉紙，金屬圈或騎馬釘裝訂，每月背面可印企業資訊。企業送禮、門店與辦公室牆面首選，免費排版與節慶標註，港九新界免費速遞，30 秒 AI 報價。",
 12: "Wall calendars in standard A3/A2 with a 13-page design (cover + 12 months), single-copy MOQ on 300g coated or matte stock, wire-o or saddle-stitch binding; the back of each month carries your company info. Free layout and holiday marking, DHL global 2-4 days, 30-second AI quote.",
 13: "壁掛けカレンダーは標準A3/A2の13ページ設計（表紙+12ヶ月）、1部から。300gコート紙またはマット紙、金属リングまたは中綴じ製本、毎月裏面に会社情報を印刷可能。企業ギフト・店舗・オフィスの壁面に最適。無料レイアウトと祝日マーク付き、30秒AI見積り。",
 14: "掛牆年曆印刷 — A3/A2 十三頁 金屬圈裝訂，1 本起印",
 15: "Wall Calendars from 1 | A3/A2 13-Page | ZprintPro",
 16: "壁掛けカレンダー 1部〜：A3/A2 13ページ・リング綴じ",
 29: "壁掛けカレンダー / 企業ギフト | 壁掛けカレンダー印刷 A3/A2 13ページ リング綴じ | ZprintPro",
 8: "掛牆年曆,掛牆月曆,掛曆印刷,年曆訂製,A3年曆,A2年曆,企業年曆,牆上月曆,2027年曆,年曆印刷",
 10: "壁掛けカレンダー,壁掛けカレンダー 印刷,カレンダー印刷,企業カレンダー,2027年カレンダー,A3カレンダー,A2カレンダー,リング綴じ,ギフトカレンダー,wall calendars",
},
"desk-calendars": {
 11: "智印港座檯年曆印刷：三角座架穩固企立，A5/A4 桌面尺寸，1 本起印，200-250g 銅版紙或卡紙配 1-2mm 灰板底座，騎馬釘或膠裝。收銀位、接待處與辦公桌日常廣告位首選，免費排版與節慶標註，港九新界免費速遞，30 秒 AI 報價。",
 12: "Desk calendars on a sturdy triangular easel base, A5/A4 footprints with 1-2mm greyboard, single-copy MOQ on 200-250g coated or card stock, saddle-stitch or perfect bound. The steady everyday ad slot for counters, receptions and desks. Free layout, DHL global 2-4 days, 30-second AI quote.",
 13: "卓上カレンダーは三角スタンドで安定設置、A5/A4サイズ、1部から。200-250gコート紙またはカートン+1-2mm灰板台座、中綴じまたは無線綴じ。レジ横・受付・オフィスデスクの定番広告枠。無料レイアウトと祝日マーク付き、30秒AI見積り。",
 14: "座檯年曆印刷 — 三角座架 灰板底座，1 本起印",
 15: "Desk Calendars from 1 | Triangular Easel | ZprintPro",
 16: "卓上カレンダー 1部〜：三角スタンド・灰板台座",
 29: "卓上カレンダー / 企業ギフト | 卓上カレンダー印刷 三角スタンド A5・A4 | ZprintPro",
 8: "座檯年曆,桌曆印刷,座檯月曆,三角座架年曆,辦公室年曆,收銀位月曆,企業年曆,2027年曆,年曆訂製,桌曆訂造",
 10: "卓上カレンダー,卓上カレンダー 印刷,デスクカレンダー,カレンダー印刷,三角スタンド,企業カレンダー,2027年カレンダー,レジ周り販促,デスク販促,desk calendars",
},
"custom-calendars": {
 11: "智印港訂製年曆：十二個月十二個版面，產品圖、優惠日程與品牌故事逐月刊出，1 本起印，250-300g 藝術紙或銅版紙，燙金、局部 UV 與金屬圈後加工可選，支援可變數據（每頁不同分店或員工資訊）。企業禮品深度定制首選，免費排版，港九新界免費速遞，30 秒 AI 報價。",
 12: "Fully custom calendars: twelve months, twelve layouts - product shots, promo dates and brand story page by page, single-copy MOQ on 250-300g art or coated stock with optional foil, spot UV and wire-o; variable data prints different branch or staff info per page. Free layout, DHL global 2-4 days, 30-second AI quote.",
 13: "オリジナルカレンダーは12ヶ月12レイアウト: 製品写真、キャンペーン日程、ブランドストーリーを月ごとに掲載、1部から。250-300gアート紙またはコート紙に箔押し・局部UV・リング綴じも選択可。可変データで支店・従業員情報をページ別に印刷可能。無料レイアウト、30秒AI見積り。",
 14: "訂製年曆印刷 — 十二版面 企業LOGO 燙金可選，1 本起印",
 15: "Custom Calendars from 1 | 12 Branded Layouts | ZprintPro",
 16: "オリジナルカレンダー 1部〜：月別ブランドレイアウト・箔押し対応",
 27: "訂製年曆 / 企業禮品 | 香港訂製年曆印刷 十二版面 企業LOGO 燙金可選 | 智印港",
 28: "Custom calendars / corporate gifting | 12 branded layouts, foil optional | ZprintPro",
 29: "オリジナルカレンダー / 企業ギフト | オリジナルカレンダー印刷 12レイアウト 箔押し対応 | ZprintPro",
 8: "訂製年曆,訂造年曆,企業年曆訂製,LOGO年曆,公司年曆,禮品年曆,2027年曆,品牌月曆,燙金年曆,年曆設計",
 9: "custom calendars,personalised calendars,custom calendar printing,logo calendars,company calendars,corporate gift calendars,branded calendars 2027,calendar design,bulk custom calendars,custom calendars printing online",
 10: "オリジナルカレンダー,オリジナルカレンダー 印刷,カレンダー オーダーメイド,企業カレンダー,2027年カレンダー,ロゴ入りカレンダー,ノベルティカレンダー,箔押しカレンダー,カレンダー製作,custom calendars",
},
"mini-calendars": {
 11: "智印港迷你年曆印刷：信用卡大小的 85×55mm 口袋尺寸，1 本起印，150-200g 銅版紙或卡紙，四色數碼輕印，騎馬釘或單張裁切，放錢包衫袋隨手可查。大量派發、夾寄與活動手信首選，免費排版，港九新界免費速遞，30 秒 AI 報價。",
 12: "Mini calendars at credit-card size (85x55mm), single-copy MOQ on 150-200g coated or card stock, full-colour digital with saddle-stitch or flat cut - slips into wallets and pockets for date checks anywhere. Built for mass handouts, mail inserts and event giveaways. Free layout, 30-second AI quote.",
 13: "ミニカレンダーはクレジットカードサイズ 85×55mm、1部から。150-200gコート紙またはカートン、デジタル4色印刷、中綴じまたはカット仕上げ。財布やポケットに収まり、どこでも日付確認。大量配布・DM同封・イベント配布に最適。無料レイアウト、30秒AI見積り。",
 14: "迷你年曆印刷 — 85×55mm 口袋尺寸 大量派發，1 本起印",
 15: "Mini Calendars from 1 | Credit-Card Size | ZprintPro",
 16: "ミニカレンダー 1部〜：カードサイズ・大量配布向け",
 27: "迷你年曆 / 大量派發 | 香港迷你年曆印刷 85×55mm 口袋尺寸 數碼輕印 | 智印港",
 28: "Mini calendars / mass handouts | credit-card size 85x55mm digital | ZprintPro",
 29: "ミニカレンダー / 大量配布 | ミニカレンダー印刷 カードサイズ 85×55mm | ZprintPro",
 8: "迷你年曆,口袋年曆,迷你月曆,信用卡年曆卡,年曆卡印刷,大量派發年曆,年曆卡訂製,2027年曆,迷你曆,隨身年曆",
 10: "ミニカレンダー,ミニカレンダー 印刷,カードサイズカレンダー,ミニ月めくり,カレンダー印刷,2027年カレンダー,大量配布,DM同封,ノベルティ,mini calendars",
},
"photo-frame-calendars": {
 11: "智印港相框年曆印刷：相框與年曆二合一，硬紙板相架直立擺放，1 本起印，250-300g 銅版紙或相紙，A5/A4 擺書櫃電視櫃床頭，照片可隨時替換。家品禮品與溫馨手信首選，免費排版與節慶標註，港九新界免費速遞，30 秒 AI 報價。",
 12: "Photo-frame calendars combine a swap-in photo frame with the yearly grid: hardboard easel stands upright on shelves and bedside tables, single-copy MOQ on 250-300g coated or photo stock, A5/A4. A homeware gift line that keeps family photos and dates in one glance. Free layout, DHL global 2-4 days, 30-second AI quote.",
 13: "フォトフレームカレンダーは写真立てとカレンダーの二合一: 硬紙板スタンドで棚や枕元に直立、1部から。250-300gコート紙または写真用紙、A5/A4。写真は差し替え可能で、家族の写真と日付を一枚で。ギフト・ホーム装飾に最適。無料レイアウト、30秒AI見積り。",
 14: "相框年曆印刷 — 硬紙板相架 可換照片，1 本起印",
 15: "Photo Frame Calendars from 1 | Swappable Photos | ZprintPro",
 16: "フォトフレームカレンダー 1部〜：写真差替式・硬紙板スタンド",
 27: "相框年曆 / 家居禮品 | 香港相框年曆印刷 硬紙板相架 可換照片 | 智印港",
 28: "Photo frame calendars / home gifts | swappable photos, hardboard easel | ZprintPro",
 29: "フォトフレームカレンダー / ギフト | フォトフレームカレンダー印刷 写真差替式 卓上スタンド | ZprintPro",
 8: "相框年曆,相架年曆,照片年曆,相框月曆,家居年曆,禮品年曆,2027年曆,可換相年曆,桌面年曆,年曆相框",
 10: "フォトフレームカレンダー,フォトフレームカレンダー 印刷,写真カレンダー,フォトカレンダー,カレンダー印刷,2027年カレンダー,ギフトカレンダー,写真立て,卓上フォト,photo frame calendars",
},
"magnetic-calendars": {
 11: "智印港磁石年曆印刷：背面貼合 0.5/1mm 軟磁片，直貼雪櫃、鐵櫃與白板，1 本起印，200-250g 銅版紙或合成紙，四色數碼，圓角裁切不刮手。廚房與辦公金屬面的高頻曝光位首選，社區派發與家電品牌聯乘常用，免費排版，港九新界免費速遞，30 秒 AI 報價。",
 12: "Magnetic calendars back a 0.5/1mm flexible magnet sheet: straight onto fridges, steel cabinets and whiteboards, single-copy MOQ on 200-250g coated or synthetic stock, full-colour digital with rounded corners. The highest-frequency impression spot in kitchen or office - a staple for community drops and appliance-brand co-packs. Free layout, 30-second AI quote.",
 13: "マグネットカレンダーは裏面に0.5/1mmソフト磁石シート: 冷蔵庫・スチール棚・ホワイトボードに直接貼付、1部から。200-250gコート紙または合成紙、デジタル4色、丸角カットで安全。キッチン・オフィスの金属面で最も接点回数の多い広告枠、地域配布や家電ブランドのコラボにも定番。無料レイアウト、30秒AI見積り。",
 14: "磁石年曆印刷 — 軟磁片 雪櫃高頻曝光，1 本起印",
 15: "Magnetic Calendars from 1 | Fridge-Ready | ZprintPro",
 16: "マグネットカレンダー 1部〜：ソフト磁石・冷蔵庫対応",
 27: "磁石年曆 / 高頻曝光 | 香港磁石年曆印刷 軟磁片 雪櫃白板直貼 | 智印港",
 28: "Magnetic calendars / fridge visibility | 0.5-1mm magnet sheet, rounded corners | ZprintPro",
 29: "マグネットカレンダー / 冷蔵庫 | マグネットカレンダー印刷 ソフト磁石 丸角カット | ZprintPro",
 8: "磁石年曆,磁吸年曆,雪櫃年曆,磁石月曆,冰箱貼年曆,磁體年曆卡,2027年曆,高頻曝光月曆,軟磁年曆,白板年曆",
 10: "マグネットカレンダー,マグネットカレンダー 印刷,冷蔵庫カレンダー,マグネットシート,カレンダー印刷,2027年カレンダー,丸角カット,家電販促,地域配布,magnetic calendars",
},
}

FAQS = {
"wall-calendars": '[{"question": "Which wall calendar sizes do you print?", "answer": "Standard A3 and A2 with a 13-page design (cover + 12 months); other sizes are cut to order after a free size check."}, {"question": "What is the minimum order for wall calendars?", "answer": "Single-copy MOQ from HK$3 per copy; offset becomes economical from around 300 copies upward."}, {"question": "Which binding suits wall calendars?", "answer": "Metal wire-o flips smoothly and hangs flat; saddle stitch keeps it slim and light for mailing."}, {"question": "When should corporate calendar orders be placed?", "answer": "Q4 is peak season - artwork confirmed by late October secures production and delivery ahead of the gifting window."}]',
"desk-calendars": '[{"question": "What sizes do desk calendars come in?", "answer": "A5 and A4 footprints on a triangular easel with a 1-2mm greyboard base; custom sizes available."}, {"question": "What is the minimum order for desk calendars?", "answer": "Single-copy MOQ from HK$3 per copy, with volume pricing on larger runs."}, {"question": "Desk or wall calendar - which suits the office?", "answer": "Desks suit counters, receptions and personal workstations; walls cover meeting rooms and shared spaces - many clients order both."}, {"question": "Can each month carry different company info?", "answer": "Yes - variable data printing lets each page feature a different branch, product or staff message."}]',
"custom-calendars": '[{"question": "How custom can a calendar be?", "answer": "Every page is yours: product shots, promo dates and brand story, with foil, spot UV and wire-o finishing optional."}, {"question": "What is the MOQ for custom calendars?", "answer": "Single-copy MOQ from HK$3, with volume pricing on larger gifting runs."}, {"question": "Can each page show a different branch or staff member?", "answer": "Yes - variable data printing supports per-page personalisation with no plate cost."}, {"question": "Which paper suits a premium gift calendar?", "answer": "250-300g art or coated stock; add foil or spot UV for a gift-grade finish."}]',
"mini-calendars": '[{"question": "What size are mini calendars?", "answer": "About 85x55mm - credit-card size for wallets and pockets; other mini formats are cut to order."}, {"question": "What is the MOQ for mini calendars?", "answer": "Single-copy MOQ; their light weight keeps large handout runs economical."}, {"question": "Which printing method suits mini calendars?", "answer": "Full-colour digital: sharp at small sizes, no plate cost, and fast for handout deadlines."}, {"question": "Can mini calendars go in the mail?", "answer": "Yes - saddle-stitch or flat-cut versions slip into envelopes and DM inserts."}]',
"photo-frame-calendars": '[{"question": "How does a photo-frame calendar work?", "answer": "A hardboard easel holds the calendar grid while the photo panel swaps out whenever you like."}, {"question": "What is the MOQ for photo-frame calendars?", "answer": "Single-copy MOQ from HK$3; family and staff-gift runs scale with volume pricing."}, {"question": "Which stock gives the best photo colour?", "answer": "250-300g coated, or photo paper for gallery-level tone; both run four-colour digital or offset."}, {"question": "Do they stand safely on shelves?", "answer": "The hardboard easel base keeps A5/A4 sizes upright on bookcases, TV units and bedside tables."}]',
"magnetic-calendars": '[{"question": "What magnet thickness do magnetic calendars use?", "answer": "A 0.5mm or 1mm flexible magnet sheet bonded to the back - holds firmly on fridges and whiteboards."}, {"question": "What is the MOQ for magnetic calendars?", "answer": "Single-copy MOQ; light weight and flat packing keep large community drops affordable."}, {"question": "Will the corners scratch fridge surfaces?", "answer": "No - rounded-corner cutting is standard, so edges stay safe on appliance finishes."}, {"question": "Can magnetic calendars be full colour?", "answer": "Yes - four-colour digital on 200-250g coated or synthetic stock keeps photos and brand colours vivid."}]',
}

FAQ_COLS = {  # CSV zh FAQ 列 (惰性数据但属源头病灶, SOP-5 清毒): col21 MOQ / col22 Q 定制→訂製 / col23 答 / col25 交期
  21: "1 本起訂（數碼印刷），300 本起上印刷機批量更經濟。",
  22: "可以訂製年曆的內頁設計嗎？",
  23: "可以。封面與內頁都支援完全訂製設計。",
  25: "數碼 3-5 個工作天，柯式 5-7 天；建議 10 月底前確認，確保新年檔期及時到貨。",
}

def read(p):
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        return fh.read()

def main():
    csv_text = read(CSV_P)
    prod_text = read(PROD_P)

    # ---------- A) CSV 65 格 ----------
    csv_lines = csv_text.split("\n")
    total_cells = 0
    for rn, slug in ROWS.items():
        cols = csv_lines[rn - 1].split("\t")
        if len(cols) != 31 or cols[3] != slug:
            print(f"[b1c7] FAIL: row {rn} 形态异常"); return 2
        plan = dict(CELLS[slug])
        plan.update(FAQ_COLS)
        for col, val in plan.items():
            cols[col] = val
        csv_lines[rn - 1] = "\t".join(cols)
        total_cells += len(plan)
    csv_new = "\n".join(csv_lines)
    if len(csv_lines) != len(csv_text.split("\n")):
        print("[b1c7] FAIL: CSV 行数漂移"); return 3
    # 形状断言 (rows 39-44 范围)
    scope = "\n".join(csv_lines[38:44])
    must_absent = ["50 本起。", "50冊〜", "100-MOQ", "100 MOQ", "7-10 個工作天", "7-10営業日",
                   "一般為50本起訂", "Custom custom", "custom custom calendars", "翌日配送",
                   "相框年曆,年曆", "Wire-Bound Spiral", "250g 銅版紙/啞面",
                   "7-10個工作日", "定制年曆的內頁", "50本起訂，大批量"]
    for s in must_absent:
        if s in scope:
            print(f"[b1c7] FAIL: rows 39-44 旧病灶仍在 -> {s!r}"); return 3
    for slug in ROWS.values():
        if CELLS[slug][15] not in scope:
            print(f"[b1c7] FAIL: {slug} 新 EN h1 缺失"); return 3
        if CELLS[slug][11][:20] not in scope:
            print(f"[b1c7] FAIL: {slug} 新 zh desc 缺失"); return 3

    # ---------- B) products.ts faqSchema ×6 插入 ----------
    prod_lines = prod_text.split("\n")
    slug_idx = {}
    for i, ln in enumerate(prod_lines):
        for s in ROWS.values():
            if ln == f"    slug: '{s}',":
                slug_idx[s] = i
    if len(slug_idx) != 6:
        print(f"[b1c7] FAIL: slug 锚 {len(slug_idx)}/6"); return 2
    order = sorted(slug_idx.items(), key=lambda kv: kv[1])
    replaced = 0
    for k, (slug, start) in enumerate(order):
        end = len(prod_lines)
        for i in range(start + 1, len(prod_lines)):
            if prod_lines[i].startswith("    slug: '") or prod_lines[i] in ("  ],", "  ]"):
                end = i; break
        hits = [i for i in range(start, end) if prod_lines[i].startswith("    faqSchema: ")]
        if len(hits) != 1:
            print(f"[b1c7] FAIL: {slug} 既有 faqSchema 行 {len(hits)} (区间 {start}-{end})"); return 2
        prod_lines[hits[0]] = "    faqSchema: " + FAQS[slug] + ","
        replaced += 1
    prod_new = "\n".join(prod_lines)
    for slug in ROWS.values():
        if prod_new.count(FAQS[slug][:60]) != 1:
            print(f"[b1c7] FAIL: faqSchema {slug} 落位"); return 3

    # ---------- ts body 病灶扫描 (只登记, 不触碰) ----------
    ts_text = read(TS_P)
    body_scan = {}
    for s in ROWS.values():
        i = ts_text.find(f'"{s}": {{')
        seg = ts_text[i:ts_text.find("\n  },", i)]
        body_scan[s] = {p: (p in seg) for p in ["50 本", "100 MOQ", "ISO 9001", "15+ 年", "7-10 個工作天", "軍令"]}
    diseased = {s: d for s, d in body_scan.items() if any(d.values())}

    # ---------- 写盘 ----------
    for p, txt in ((CSV_P, csv_new), (PROD_P, prod_new)):
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
        with io.open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(txt)
    print(f"[b1c7] PASS: CSV {total_cells} 格 + faqSchema ×{replaced} 原位替换 / 备份 {os.path.relpath(BAK, REPO)}")
    print("ts body 病灶扫描:", "CLEAN" if not diseased else diseased)
    return 0

if __name__ == "__main__":
    sys.exit(main())
