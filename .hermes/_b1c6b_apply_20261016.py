# -*- coding: utf-8 -*-
"""
.hermes/_b1c6b_apply_20261016.py — B1c 簇6b (display/art/adhesive posters) 综合执行
K3 指令链: 2026-10-16 战略方案 2.1 (差异化锚已备) + b1c-queue-progress 簇6a residual「下一棒首务」
真值 (products.ts 一手): display HK$32-100/套 basePrice32/$7.36/¥960 minQ1 · art HK$26-85/張 26/$5.98/¥780 minQ1 · adhesive HK$13-42/張 13/$2.99/¥390 minQ1
§12 三件套: 计数断言 + 形状断言 + 备份 (断言未过不得写盘)
锚 (战略方案 2.1 表): display=展架裝置頁 60×160/80×180cm 150-100dpi · art=Giclée 260g無酸紙 12色 100年 · adhesive=導氣槽 6-12個月戶外 異形模切 當日可取
"""
import io, os, re, shutil, sys, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS_P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
PROD_P = os.path.join(REPO, "src", "data", "products.ts")
CSV_P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c6b-20261016")
os.makedirs(BAK, exist_ok=True)

SLUGS = ["display-posters", "art-posters", "adhesive-posters"]

BODIES = {
"display-posters": {
"zh-hk": "展架海報 專為需要「印好即可上架」的香港團隊設計：X 展架、易拉寶、門型展架的常規裝置尺寸（60×160、80×180cm）直接對版輸出，1 套起印。材質以 PP 合成紙與高光相紙為主，遠距離觀看 100-150dpi 已足夠清晰，近距離細節可按 200dpi 輸出。展會布展、路演快閃、門店季節裝置收到設計檔後即排產，免費數碼打稿確認顏色才上機；可按展架型號免費核對尺寸，避免到場裝不上。港九新界滿 HK$500 免費順豐速遞，DHL 全球 2-4 天配送，30 秒 AI 報價鎖定紙價與交期。",
"en": "Display posters built for the stand, not just the print: standard X-banner and roll-up formats at 60x160 / 80x180cm come off the press matched to your frame, single-set MOQ. PP synthetic paper and glossy photo stock both laminate well for multi-day shows, and 100-150dpi artwork already reads sharp at viewing distance - submit 200dpi for close-up detail. Every order gets a free digital proof before output and a free size check against your stand model, so nothing arrives that will not fit. Trade shows, roadshows and retail installations ship worldwide via DHL in 2-4 days; lock the paper price and lead time with a 30-second AI quote.",
"ja": "展示用ポスターは「受け取ってすぐ設置できる」ことを目的に: Xバナー・ロールアップ・門型スタンドの標準サイズ（60×160 / 80×180cm）にそのまま対版出力、1セットから。素材はPP合成紙と光沢写真紙が主体で、長日展示にもラミネート対応。視認距離では100-150dpiで十分鮮明、至近ディテールは200dpiで対応。すべての注文に無料デジタル校正をつけ、色確認後に生産へ。スタンド型号とのサイズ照合も無料で実施します。展示会・街頭プロモ・店舗演出はDHL国際配送2-4日、30秒AI見積りで紙価と納期を確定。"
},
"art-posters": {
"zh-hk": "藝術海報 以 Giclée 級 12 色顏料微噴為核心：260g 無酸美術紙，中性 pH 基底令色彩在長年陳列下保持穩定，收藏級輸出可傳百年。1 張起印，攝影師作品集、畫廊展覽、藝術複製與限量編號版畫都適用；版畫常見的 10-50 張小版數用數碼微噴即可，免開版。可按需要留白邊方便裱裝，或局部上光油強化畫面層次。免費數碼打稿先行校色，確認後才輸出大檔；畫廊級色彩可另約實物校樣。港九新界免費速遞，DHL 全球 2-4 天，30 秒 AI 報價。",
"en": "Art posters reproduced the Giclée way: 12-colour pigment output on 260gsm acid-free fine-art paper, with a neutral-pH base that keeps colour stable through years on the wall - archival ratings of roughly 100 years. Single-piece MOQ, so a photographer's portfolio, a gallery run or a numbered limited edition can start from one copy; typical editions of 10-50 run digitally with no plate cost. Leave a white border for framing or add spot varnish for depth. A free digital proof comes standard, and physical proof sheets can be arranged for gallery-critical colour. DHL global delivery in 2-4 days, 30-second AI quote.",
"ja": "アートポスターはジクレー級の12色顔料出力が核: 260g無酸美術紙に中性pHベースで、長期陳列でも色が安定。約100年の保存性をもつコレクション級出力です。1枚から対応しており、写真家のポートフォリオ、ギャラリー展示、限定ナンバリングの版画複製も小部数から開始可能。一般的な10-50部の版数はデジタル微噴で版代不要。額装用の余白残しや部分ニスによる階調強化も選択できます。無料デジタル校正で色を確認後に本出力、ギャラリー級の色合わせは実物校正も手配可能。DHL国際配送2-4日、30秒AI見積り。"
},
"adhesive-posters": {
"zh-hk": "背膠海報 主打「少而快」的數碼自粘輸出：1 張起印，導氣槽背膠令氣泡可以邊貼邊推出，單人作業都能貼得平整；鑄造級 PVC 面材戶外耐候 6-12 個月，室內櫥窗壽命更長。異形模切沿輪廓出圖，櫥窗貼、牆面裝飾、車身短打都合用；數碼短單最快當日可取，急件不必等柯式排期。免費數碼打稿校色，貼面材質（玻璃/油漆牆/車漆）可先寄小樣測試。港九新界免費速遞，DHL 全球 2-4 天，30 秒 AI 報價。",
"en": "Adhesive posters made for small, fast runs: single-piece MOQ on digital output, with air-egress adhesive channels that let bubbles escape as you apply - one person can hang a poster flat without a squeegee crew. Cast vinyl faces take 6-12 months outdoors and even longer on indoor windows; contour die-cutting follows your vector outline for window, wall and vehicle shapes. Digital short runs are ready in as fast as the same day, so rush campaigns skip the offset queue entirely. Free digital proof before output, optional material samples for glass, painted walls or vehicle panels, DHL global 2-4 days, 30-second AI quote.",
"ja": "粘着ポスターは「少部数・短納期」のデジタル出力が主体: 1枚から対応、エア経路（導気槽）付き粘着で気泡を貼りながら押し出せるので、一人でも平らに貼れます。キャストビニール面材は屋外耐候6-12ヶ月、屋内ウィンドウならさらに長持ち。輪郭カット（異形カット）でウィンドウ・壁面・車体の形状に沿って加工可能。デジタル短納期は最短当日受取で、急ぎのキャンペーンもオフセットの順番待ち不要。無料デジタル校正つき、ガラス・塗装壁・車体向けの材質サンプル送付も可能。DHL国際配送2-4日、30秒AI見積り。"
}
}

DESCS = {
"display-posters": {
11: "智印港展架海報訂製：X 展架／易拉寶常規裝置尺寸 60×160、80×180cm 直接對版輸出，1 套起印，PP 合成紙或高光相紙，遠觀 100-150dpi 已足清晰。展會、路演、門店裝置首選，免費數碼打稿與尺寸核對，港九新界免費速遞，30 秒 AI 報價。",
12: "Display posters cut to X-banner and roll-up stand formats (60x160 / 80x180cm), single-set MOQ on PP synthetic or glossy photo stock - 100-150dpi reads sharp at viewing distance. Free digital proof and stand-size check, DHL global 2-4 days, 30-second AI quote.",
13: "展示用ポスターはXバナー・ロールアップ規格 60×160 / 80×180cm にそのまま対版、1セットから。PP合成紙または光沢写真紙、視認距離は100-150dpiで鮮明。無料デジタル校正とサイズ照合つき、展示会・街頭プロモ・店舗演出に最適、30秒AI見積り。"
},
"art-posters": {
11: "智印港藝術海報印刷：Giclée 級 12 色顏料微噴，1 張起印，260g 無酸美術紙，約百年保存性。畫廊展覽、攝影師作品集、限量編號複製首選，免費數碼打稿可另約實物校樣，港九新界免費速遞，30 秒 AI 報價。",
12: "Giclée art posters on 260gsm acid-free fine-art paper, 12-colour pigment output with roughly 100-year archival life, single-piece MOQ. For galleries, photographer portfolios and numbered editions; free digital proof, physical proofs on request, DHL global 2-4 days.",
13: "アートポスター印刷はジクレー級12色顔料出力、1枚から。260g無酸美術紙で約100年の保存性。ギャラリー展示、写真ポートフォリオ、限定ナンバリング複製に最適。無料デジタル校正、実物校正も手配可、30秒AI見積り。"
},
"adhesive-posters": {
11: "智印港背膠海報印刷：導氣槽自粘短打，1 張起印，鑄造級 PVC／背膠 PP，戶外耐候 6-12 個月，異形模切沿輪廓出圖，數碼短單最快當日可取。櫥窗、牆面、車身推廣首選，免費數碼打稿，港九新界免費速遞，30 秒 AI 報價。",
12: "Short-run peel-and-stick posters from a single piece: air-egress adhesive for bubble-free application, cast vinyl or self-adhesive PP rated 6-12 months outdoors, contour die-cutting for windows, walls and vehicles, same-day digital pickup on rush runs. Free digital proof, 30-second AI quote.",
13: "粘着ポスター印刷は導気槽付き自粘の短納期出力、1枚から。キャストビニール／粘着PPで屋外耐候6-12ヶ月、異形カットでウィンドウ・壁面・車体に対応、最短当日受取。無料デジタル校正つき、30秒AI見積り。"
}
}

H1S = {
"display-posters": {14: "展架海報印刷 — 60×160 / 80×180cm 展架裝置，1 套起印",
                    15: "Display Posters from 1 | X-Banner & Roll-Up | ZprintPro",
                    16: "展示用ポスター 1セット〜：60×160/80×180cm 展示スタンド対応"},
"art-posters":     {14: "藝術海報印刷 — Giclée 12 色 260g 無酸紙，1 張起印",
                    15: "Art Posters from 1 | Giclée 12-Colour | ZprintPro",
                    16: "アートポスター印刷 1枚〜：ジクレー12色・260g無酸紙"},
"adhesive-posters":{14: "背膠海報印刷 — 導氣槽自粘 6-12 個月戶外，1 張起印",
                    15: "Adhesive Posters from 1 | Air-Egress Vinyl | ZprintPro",
                    16: "粘着ポスター 1枚〜：導気槽粘着・屋外6-12ヶ月"}
}

ALTS = {  # 仅 display 需要 (zh/ja 均为 FAQ 串优病灶); art/adhesive alt 已 GEO 化不动
"display-posters": {
27: "展架海報 / 裝置展示 | 香港展架海報印刷 X展架 易拉寶 60×160-80×180cm | 智印港",
29: "展示用ポスター / 展示スタンド | 展示用ポスター印刷 Xバナー ロールアップ 60×160cm | ZprintPro"
}
}

FAQS = {
"display-posters": '[{"question": "Which stand sizes do display posters fit?", "answer": "Standard 60x160cm and 80x180cm formats match common X-banner and roll-up stands; send your stand model and we run a free size check before output."}, {"question": "What resolution should display poster artwork be?", "answer": "100-150dpi is sufficient at typical viewing distance; submit 200dpi for close-up detail. Every file gets a free preflight before printing."}, {"question": "What is the minimum order for display posters?", "answer": "Single-set MOQ from US$7.36 per set, with volume tiers from 10 sets upward. No plate or setup fees on digital output."}, {"question": "Which stock works best for exhibitions?", "answer": "PP synthetic paper handles repeated installs and transport; glossy photo stock suits colour-critical booths. Both take lamination for multi-day shows."}]',
"art-posters": '[{"question": "What makes a Giclée art print archival?", "answer": "12-colour pigment inks on 260gsm acid-free fine-art paper are rated for roughly 100 years of display under normal indoor conditions."}, {"question": "Can I print limited editions with numbering?", "answer": "Yes - variable data lets each copy carry its own edition number; send the numbering layout with your artwork and we preflight it free."}, {"question": "What is the minimum order for art posters?", "answer": "Single-piece MOQ from US$5.98; typical gallery editions of 10-50 copies run digitally with no plate cost."}, {"question": "Do you provide colour proofs before output?", "answer": "A free digital proof is standard; physical proof sheets can be arranged for gallery-critical colour matching."}]',
"adhesive-posters": '[{"question": "How long do adhesive posters last outdoors?", "answer": "Cast vinyl faces are rated 6-12 months outdoors; indoor window displays last considerably longer away from direct weather."}, {"question": "Will the sticker leave bubbles or residue?", "answer": "Air-egress adhesive channels let bubbles escape during application; within the rated window the material removes cleanly without tearing."}, {"question": "Can adhesive posters be die-cut to shape?", "answer": "Yes - contour cutting follows your vector outline for window, wall and vehicle shapes at no design charge."}, {"question": "How fast can a short run be ready?", "answer": "Digital short runs are ready in as fast as the same day; a free digital proof confirms colour before output."}]'
}

def read(p):
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        return fh.read()

def main():
    ts_text = read(TS_P)
    prod_text = read(PROD_P)
    csv_text = read(CSV_P)

    # ---------- A) ts body 替换 ----------
    ts_lines = ts_text.split("\n")
    body_edits = []  # (line_idx, new_line)
    for slug in SLUGS:
        start = None
        for i, ln in enumerate(ts_lines):
            if ln.startswith(f'  "{slug}": ' + "{"):
                start = i
                break
        if start is None:
            print(f"[b1c6b] FAIL: ts 块 {slug} 未找到"); return 2
        # 块结束: 下一个 '  },' 行 (indent 2)
        end = None
        for i in range(start + 1, len(ts_lines)):
            if ts_lines[i] == "  },":
                end = i; break
        if end is None:
            print(f"[b1c6b] FAIL: ts 块 {slug} 结束未找到"); return 2
        seg = ts_lines[start:end]
        # 三个 locale 子块内各 1 条 body
        locs = {}
        cur = None
        for j, ln in enumerate(seg):
            m = re.match(r'^      "(zh-hk|en|ja)": \{', ln)
            if m: cur = m.group(1)
            if ln.startswith('        "body": "'):
                if cur is None or cur in locs:
                    print(f"[b1c6b] FAIL: {slug} body 行定位异常 (cur={cur})"); return 2
                locs[cur] = j
        if set(locs.keys()) != {"zh-hk", "en", "ja"}:
            print(f"[b1c6b] FAIL: {slug} body 子块不全: {list(locs.keys())}"); return 2
        for loc, j in locs.items():
            old_line = seg[j]
            if old_line.count('"body": "') != 1:
                print(f"[b1c6b] FAIL: {slug}/{loc} body 行形态异常"); return 2
            prefix = old_line[:48]
            if ts_text.count(prefix) != 1:
                print(f"[b1c6b] FAIL: {slug}/{loc} body 前缀非唯一"); return 2
            new_body = BODIES[slug][loc]
            assert "\\n" not in new_body, "new body 不得含字面反斜杠n"
            new_line = '        "body": "' + new_body.replace("\n", "\\n") + '",'
            body_edits.append((start + j, new_line))
    for idx, nl in sorted(body_edits, key=lambda x: -x[0]):
        ts_lines[idx] = nl
    ts_new = "\n".join(ts_lines)
    if len(ts_lines) != len(ts_text.split("\n")):
        print("[b1c6b] FAIL: ts 行数漂移"); return 3

    # ---------- B) products.ts faqSchema 插入 ----------
    prod_lines = prod_text.split("\n")
    inserts = []  # (line_idx_after, faq_line)
    for slug in SLUGS:
        anchor = f"    slug: '{slug}',"
        hits = [i for i, ln in enumerate(prod_lines) if ln == anchor]
        if len(hits) != 1:
            print(f"[b1c6b] FAIL: products anchor {slug} 命中 {len(hits)}"); return 2
        i = hits[0]
        # 确认块内当前无 faqSchema
        end = None
        for k in range(i + 1, len(prod_lines)):
            if prod_lines[k] == "  },":
                end = k; break
        seg = "\n".join(prod_lines[i:end])
        if "faqSchema" in seg:
            print(f"[b1c6b] FAIL: {slug} 块内已有 faqSchema (预期无)"); return 2
        inserts.append((i, "    faqSchema: " + FAQS[slug] + ","))
    for idx, fl in sorted(inserts, key=lambda x: -x[0]):
        prod_lines.insert(idx + 1, fl)
    prod_new = "\n".join(prod_lines)
    for slug in SLUGS:
        if prod_new.count(FAQS[slug][:60]) != 1:
            print(f"[b1c6b] FAIL: faqSchema {slug} 插入校验失败"); return 3

    # ---------- C) CSV 单元格 ----------
    csv_lines = csv_text.split("\n")
    cell_plan = {}  # row_idx -> {col: new}
    for rn, slug in ((25, "display-posters"), (26, "art-posters"), (27, "adhesive-posters")):
        cols = csv_lines[rn - 1].split("\t")
        if len(cols) != 31 or cols[3] != slug:
            print(f"[b1c6b] FAIL: CSV row {rn} 形态异常 ({len(cols)} cols, slug={cols[3] if len(cols)>3 else '?'})"); return 2
        plan = {}
        for col, val in DESCS[slug].items():
            plan[col] = val
        for col, val in H1S[slug].items():
            plan[col] = val
        for col, val in ALTS.get(slug, {}).items():
            plan[col] = val
        cell_plan[rn - 1] = (slug, plan)
    csv_new_lines = list(csv_lines)
    for ridx, (slug, plan) in cell_plan.items():
        cols = csv_new_lines[ridx].split("\t")
        for col, val in plan.items():
            cols[col] = val
        csv_new_lines[ridx] = "\t".join(cols)
    csv_new = "\n".join(csv_new_lines)
    if len(csv_new_lines) != len(csv_lines):
        print("[b1c6b] FAIL: CSV 行数漂移"); return 3
    # 形状断言 (仅本批 rows 25-27; 其他行同病灶归残留登记)
    scope = "\n".join(csv_new_lines[24:27])
    must_absent = ["50-MOQ", "100 MOQ", "50 MOQ", "10枚〜、翌日", "HK$15起/張", "10 張起。採用",
                   "Display Posters 50+", "Art Posters 25+", "Adhesive Posters 50+"]
    for s in must_absent:
        if s in scope:
            print(f"[b1c6b] FAIL: 本批 CSV 旧病灶仍在 -> {s!r}"); return 3
    # alt 病灶只看 alt 列 (同串可能合法存在于 FAQ 答案列)
    for ridx, (slug, plan) in cell_plan.items():
        cols = csv_new_lines[ridx].split("\t")
        for ci in (27, 28, 29):
            for s in ("我們支持最大A0尺寸", "我們提供戶外防水防曬材質"):
                if s in cols[ci]:
                    print(f"[b1c6b] FAIL: row {ridx+1} alt列 {ci} 病灶仍在"); return 3
    for slug in SLUGS:
        for col, val in H1S[slug].items():
            pass
    if csv_new.count("from 1 | X-Banner") != 1 or csv_new.count("Giclée 12-Colour") != 1 or csv_new.count("Air-Egress Vinyl") != 1:
        print("[b1c6b] FAIL: 新 H1 落位校验失败"); return 3

    # ---------- 写盘 ----------
    for p, txt in ((TS_P, ts_new), (PROD_P, prod_new), (CSV_P, csv_new)):
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
        with io.open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(txt)
    print(f"[b1c6b] PASS: ts body ×{len(body_edits)} + faqSchema ×{len(inserts)} + CSV 格 ×{sum(len(p[1]) for p in cell_plan.values())} / 备份 {os.path.relpath(BAK, REPO)}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
