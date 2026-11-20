# -*- coding: utf-8 -*-
"""
.hermes/_b1c8_apply_20261016.py — B1c 簇8: packaging faqSchema ×10 拆模板 + outdoor-posters 余1收口 + outdoor 假MOQ 清除 + mailer 正文事实修正
真值 (products.ts 一手): cosmetic 100/HK$8-65 · mailer 100/HK$3.5-10 · rigid 100/HK$8-42 · magnetic 100/HK$15-80 ·
electronics 200/HK$8-50 · kraft 300 (带内部矛盾 1.5-1000 -> FAQ 不引价) · gang-run/white-card/corrugated/tuck-end 500 (带疑似批量总价混入 -> FAQ 只引 MOQ) ·
outdoor-posters 1/HK$16-55
不动 products.ts 价格字段 (K3 价格 SSoT docket: white-card basePrice 129 vs band 0.50-3.00 等内部矛盾, 见报告)
§12 三件套: 计数断言 + 形状断言 + 备份
"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROD_P = os.path.join(REPO, "src", "data", "products.ts")
CSV_P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
TS_P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c8-20261016")
os.makedirs(BAK, exist_ok=True)

FAQS = {
"cosmetic-boxes": 'MOQ from 100 boxes at HK$8-65 per box depending on size and finish; the 30-second AI quote prices your exact spec.', 
"mailer-boxes": 'MOQ from 100 boxes at HK$3.5-10 per box depending on size and print; the 30-second AI quote prices your exact spec.',
"rigid-boxes": 'MOQ from 100 boxes at HK$8-42 per box depending on greyboard thickness and wrap; the 30-second AI quote prices your exact spec.',
"magnetic-closure-gift-box": 'MOQ from 100 boxes at HK$15-80 per box depending on size, board and lining; the 30-second AI quote prices your exact spec.',
"electronics-packaging-box": 'MOQ from 200 boxes at HK$8-50 per box depending on size and insert; the 30-second AI quote prices your exact spec.',
"kraft-paper-packaging-box": 'MOQ from 300 boxes; kraft pricing scales strongly with volume - the 30-second AI quote prices your exact spec.',
"gang-run-card-boxes": 'MOQ from 500 boxes per gang-run sheet; shared-plate printing removes the die-cut fee and drops unit cost - quote for live pricing.',
"white-card-boxes": 'MOQ from 500 boxes per design; white card-box pricing scales with volume - the 30-second AI quote prices your exact spec.',
"corrugated-boxes": 'MOQ from 500 boxes per design; flute choice and print coverage drive cost - the 30-second AI quote prices your exact spec.',
"tuck-end-boxes": 'MOQ from 500 boxes per design; straight-tuck and reverse-tuck price by size and board - the 30-second AI quote prices your exact spec.',
"outdoor-posters": 'Single-piece MOQ from HK$16 per poster (about US$3.68), scaling with size and stock; the 30-second AI quote prices your exact spec.',
}

def build(slug, q2, a2, q3, a3, q4, a4):
    import json
    arr = [
        {"question": "What is the MOQ for custom packaging boxes?", "answer": FAQS[slug]},
        {"question": q2, "answer": a2},
        {"question": q3, "answer": a3},
        {"question": q4, "answer": a4},
    ]
    return "    faqSchema: " + json.dumps(arr, ensure_ascii=False) + ","

NEW_FAQ = {
"cosmetic-boxes": build("cosmetic-boxes", 
    "Which finishes suit cosmetic packaging?", "Spot UV and soft-touch lamination are the most requested; foil stamps the logo for premium lines.", 
    "Can the box include an insert?", "Yes - moulded pulp, foam or card inserts hold bottles and jars in place.",
    "Is the board food-safe for skincare?", "Cosmetic-grade white card with soy-based inks supports indirect contact; confirm your product type at quoting."),
"mailer-boxes": build("mailer-boxes", 
    "Are mailer boxes self-locking?", "Yes - the mailer style folds without glue, so packs assemble fast for e-commerce shipping.",
    "Which print areas can I brand?", "Outside and inside print are both available - 4C+0 outside is standard, inside print adds an unboxing moment.",
    "Do mailer boxes survive courier networks?", "The rigid white-card stock with reinforced edges is designed for FBA and courier handling; add an insert for fragile items."),
"rigid-boxes": build("rigid-boxes", 
    "What makes a box rigid?", "A thick greyboard core wrapped in printed or specialty paper - the construction does not collapse like folding cartons.",
    "Can rigid boxes include a ribbon or magnet?", "Yes - ribbon pulls, magnetic closures and moulded inserts are common upgrades for gift packaging.",
    "Which industries use rigid boxes?", "Jewellery, skincare, premium tea and corporate gifting - any product where the box is part of the gift experience."),
"magnetic-closure-gift-box": build("magnetic-closure-gift-box", 
    "How does the magnetic closure work?", "Hidden magnets in the flap snap the lid shut for a premium open-and-close feel - no tape or sleeves needed.",
    "Can I add a foam or velvet lining?", "Yes - die-cut foam, EVA or velvet-flock inserts cradle the product inside the box.",
    "Is the box reusable as storage?", "The rigid wrap and strong magnets make it a keepsake box - part of why gift brands choose this style."),
"electronics-packaging-box": build("electronics-packaging-box", 
    "How are electronics protected in the box?", "Die-cut corrugated or pulp inserts cradle the device; custom cut-outs match your accessory layout.",
    "Is the board printable in full colour?", "Yes - four-colour print with spot UV or matte lamination for spec panels and branding.",
    "Do you support instruction-booklet slots?", "Yes - the box structure can include a literature slot or tray for manuals and cables."),
"kraft-paper-packaging-box": build("kraft-paper-packaging-box", 
    "Is kraft board recyclable?", "Kraft stock is widely recyclable and pairs with soy inks for an eco-forward pack.",
    "Does kraft print well in colour?", "Yes - white ink under CMYK keeps colours readable on the brown surface; full-bleed printing is available.",
    "Which products suit kraft boxes?", "Organic food, handmade goods and eco brands - the natural surface is part of the look."),
"gang-run-card-boxes": build("gang-run-card-boxes", 
    "What does gang-run printing mean?", "Your box shares a press sheet with other jobs, so plate and setup costs are split - the reason there is no die-cut fee.",
    "Which box styles can gang-run?", "Standard straight-tuck and reverse-tuck white-card boxes fit the shared sheets best.",
    "Is the colour accuracy lower on gang runs?", "Colours print on shared CMYK plates; brand-critical Pantone colours should use a dedicated run instead."),
"white-card-boxes": build("white-card-boxes", 
    "Why choose white card for boxes?", "High stiffness with a bright, smooth surface - colour prints stay vivid on both sides.",
    "Can white-card boxes hold heavier items?", "Thicker boards carry retail-weight products; corrugated or rigid constructions suit heavier loads.",
    "Which coatings are available?", "Matte or gloss lamination, spot UV and foil are the common choices."),
"corrugated-boxes": build("corrugated-boxes", 
    "Which flute should I choose?", "E-flute for retail-ready print quality, B-flute for stronger shipping walls - F-flute for finer graphics.",
    "Can corrugated print in full colour?", "Yes - direct flexo or litho-laminated four-colour print depending on run size.",
    "Are corrugated boxes mailer-style?", "Yes - self-locking mailer corrugated boxes ship flat and assemble without tape."),
"tuck-end-boxes": build("tuck-end-boxes", 
    "What is the difference between straight and reverse tuck?", "Straight tuck has both panels folding the same way; reverse tuck mirrors them for a cleaner front panel.",
    "Do tuck-end boxes suit auto-assembly?", "Yes - the tuck structure folds on standard packing lines, popular for snacks, cosmetics and pharma.",
    "Can I add a window to a tuck-end box?", "Yes - clear PET windows can be die-cut into the front panel."),
"outdoor-posters": 'Single-piece MOQ from HK$16 per poster (about US$3.68), scaling with size and stock; the 30-second AI quote prices your exact spec.',
}

def faq_line_outdoor(q2, a2, q3, a3, q4, a4):
    import json
    arr = [
        {"question": "Is there a minimum order for outdoor posters?", "answer": FAQS["outdoor-posters"]},
        {"question": q2, "answer": a2},
        {"question": q3, "answer": a3},
        {"question": q4, "answer": a4},
    ]
    return "    faqSchema: " + json.dumps(arr, ensure_ascii=False) + ","

NEW_FAQ["outdoor-posters"] = faq_line_outdoor(
    "Which materials survive outdoor weather?", "PVC banner and weatherproof vinyl stock with UV-resistant inks - colour holds through rain and sun.",
    "How long do outdoor posters last?", "Weatherproof stock keeps posters presentable through a full campaign window; laminated faces last longer in direct sun.",
    "Do you print custom outdoor sizes?", "Yes - cut to order beyond standard A1/A2; a free size check confirms the layout before production.")

def read(p):
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        return fh.read()

def main():
    prod_text = read(PROD_P)
    csv_text = read(CSV_P)
    ts_text = read(TS_P)

    SLUGS = ["cosmetic-boxes", "mailer-boxes", "rigid-boxes", "magnetic-closure-gift-box", "electronics-packaging-box",
             "kraft-paper-packaging-box", "gang-run-card-boxes", "white-card-boxes", "corrugated-boxes", "tuck-end-boxes", "outdoor-posters"]

    # ---------- A) products.ts faqSchema ×11 原位替换 ----------
    prod_lines = prod_text.split("\n")
    slug_idx = {}
    for i, ln in enumerate(prod_lines):
        for s in SLUGS:
            if ln == f"    slug: '{s}',":
                slug_idx[s] = i
    if len(slug_idx) != 11:
        print(f"[b1c8] FAIL slug 锚 {len(slug_idx)}/11"); return 2
    order = sorted(slug_idx.items(), key=lambda kv: kv[1])
    replaced = 0
    for k, (slug, start) in enumerate(order):
        end = len(prod_lines)
        for i in range(start + 1, len(prod_lines)):
            if prod_lines[i].startswith("    slug: '") or prod_lines[i] in ("  ],", "  ]"):
                end = i; break
        hits = [i for i in range(start, end) if prod_lines[i].startswith("    faqSchema: ")]
        if len(hits) != 1:
            print(f"[b1c8] FAIL {slug} 既有 faqSchema {len(hits)} (区间 {start}-{end})"); return 2
        prod_lines[hits[0]] = NEW_FAQ[slug]
        replaced += 1
    prod_new = "\n".join(prod_lines)
    for slug in SLUGS:
        key = FAQS[slug][:50]
        if prod_new.count(key) != 1:
            print(f"[b1c8] FAIL faqSchema {slug} 落位"); return 3

    # ---------- B) CSV row 24 outdoor descEN ----------
    csv_lines = csv_text.split("\n")
    cols = csv_lines[23].split("\t")
    if len(cols) != 31 or cols[3] != "outdoor-posters":
        print("[b1c8] FAIL: CSV row 24 形态"); return 2
    OLD_EN = "Outdoor posters for storefronts and events. PVC banner, vinyl, weatherproof. 50-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ"
    if cols[12] != OLD_EN:
        print(f"[b1c8] FAIL: outdoor descEN 现值不符: {cols[12][:60]}"); return 2
    cols[12] = "Outdoor posters for storefronts and events on PVC banner and weatherproof vinyl, UV-resistant inks, single-piece MOQ from HK$16/pc. Free digital proof, DHL global 2-4 days, 30-second AI quote."
    csv_lines[23] = "\t".join(cols)
    csv_new = "\n".join(csv_lines)

    # ---------- C) ts 块作用域修正 (outdoor + mailer; 全站同串病灶登记簇9, 不盲改) ----------
    ts_lines = ts_text.split("\n")
    pre = {
        "10 張起印，無開版費": ts_text.count("10 張起印，無開版費"),
        "ISO 9001 認證工廠": ts_text.count("ISO 9001 認證工廠"),
        "ISO 9001 認証工場": ts_text.count("ISO 9001 認証工場"),
        "ISO 9001 certified": ts_text.count("ISO 9001 certified"),
        "15+ 年": ts_text.count("15+ 年"),
        "15+ 年の": ts_text.count("15+ 年の"),
        "50-MOQ": ts_text.count("50-MOQ"),
        " | 100 MOQ": ts_text.count(" | 100 MOQ"),
    }
    def replace_in_block(text, slug, pairs, expect=None):
        i = text.find(f'"{slug}": {{')
        if i < 0:
            return None
        j = text.find("\n  },", i)
        blk = text[i:j]
        for old, _ in pairs:
            n = (expect or {}).get(old, 1)
            if blk.count(old) != n:
                print(f"[b1c8] FAIL {slug} 块内 {old[:34]!r} x{blk.count(old)} (期望 {n})"); return None
        for old, new in pairs:
            blk = blk.replace(old, new)
        return text[:i] + blk + text[j:]
    # C1 outdoor 块 (desc/h1/body)
    ts_new = replace_in_block(ts_text, "outdoor-posters", [
        (OLD_EN, cols[12]),
        ('"h1": "Outdoor Posters 50+ | UV Resistant | ZprintPro"', '"h1": "Outdoor Posters from 1 | UV-Resistant Vinyl | ZprintPro"'),
        ("50-MOQ.", "1-piece MOQ."),
        (" | 100 MOQ", ""),
    ])
    if ts_new is None: return 2
    # C2 mailer 块 (zh 事实修正 + 双语 ISO/15年 口径)
    ts_new = replace_in_block(ts_new, "mailer-boxes", [
        ("10 張起印，無開版費", "100 個起印，無開版費"),
        ("ISO 9001 認證工廠", "國際認證體系工廠"),
        ("15+ 年印刷經驗", "多年印刷經驗"),
        ("ISO 9001 certified production with full FDA compliance where applicable", "certified production with full FDA compliance where applicable"),
        ("ISO 9001 認証工場", "国際認証体系の工場"),
        ("15+ 年の印刷実績", "長年の印刷実績"),
    ], {"10 張起印，無開版費": 2, "ISO 9001 認證工廠": 1, "15+ 年印刷經驗": 1, "ISO 9001 certified production with full FDA compliance where applicable": 1, "ISO 9001 認証工場": 1, "15+ 年の印刷実績": 1})
    if ts_new is None: return 2
    # 块后形状断言: outdoor/mailers 块内零残留
    for slug, pats in (("outdoor-posters", ["50-MOQ", " | 100 MOQ", "Outdoor Posters 50+"]), ("mailer-boxes", ["10 張起印", "ISO 9001"])):
        i = ts_new.find(f'"{slug}": {{')
        blk = ts_new[i:ts_new.find("\n  },", i)]
        for p in pats:
            if p in blk:
                print(f"[b1c8] FAIL {slug} 块内残留 {p!r}"); return 3
    # 全站残留计数 (簇9 清扫清单, 预期各 -1)
    post = {
        "10 張起印，無開版費": ts_new.count("10 張起印，無開版費"),
        "ISO 9001 認證工廠": ts_new.count("ISO 9001 認證工廠"),
        "ISO 9001 認証工場": ts_new.count("ISO 9001 認証工場"),
        "ISO 9001 certified": ts_new.count("ISO 9001 certified"),
        "15+ 年": ts_new.count("15+ 年"),
        "15+ 年の": ts_new.count("15+ 年の"),
        "50-MOQ": ts_new.count("50-MOQ"),
        " | 100 MOQ": ts_new.count(" | 100 MOQ"),
    }
    for k in pre:
        if post[k] >= pre[k] and pre[k] > 0:
            print(f"[b1c8] FAIL 全站计数未下降: {k!r} {pre[k]}->{post[k]}"); return 3
    if len(ts_new.split("\n")) != len(ts_lines):
        print("[b1c8] FAIL ts 行数漂移"); return 3

    # ---------- 写盘 ----------
    for p, t in ((PROD_P, prod_new), (CSV_P, csv_new), (TS_P, ts_new)):
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
        with io.open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(t)
    print(f"[b1c8] PASS: faqSchema ×{replaced} + outdoor desc/h1/body + mailer 事实修正 ×3 / 备份 {os.path.relpath(BAK, REPO)}")
    print(f"[b1c8] 簇9 全站清扫清单 (pre→post): " + ", ".join(f"{k}:{pre[k]}→{post[k]}" for k in pre))
    return 0

if __name__ == "__main__":
    sys.exit(main())
