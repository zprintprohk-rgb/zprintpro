# -*- coding: utf-8 -*-
"""Packaging speed-win pack: food-boxes x3 body direct-answer appends (食品包裝訂製 phrase + 裡印 honest block)
+ packaging zh hub buyingGuide link to food-boxes with exact anchor (verify-then-add)."""
import io, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-foodx-20261017")
TS_PATH = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")
CAT_PATH = os.path.join(ROOT, "src", "data", "category-seo-content.ts")

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

ZH_INS = ("\\n\\n食品包裝訂製直答：食品包裝訂製 100 個起（標準現貨尺寸起），350g 食品級白卡或 400g 灰底白板，PE/PLA 防油內層可選，四色柯式或數碼輸出，標準 3-5 個工作天生產，滿 HK$500 港九新界順豐免運。"
          "\\n\\n關於內側印刷（裡印）：如需與食品直接接觸面的裡印工藝，可安排食品級油墨並以 PE 淋膜保護印刷面，落單時註明即可；外印＋內層淋膜的組合同樣符合間接接觸要求，兩種方案可在免費打稿時一併確認。")

EN_INS = ("\\n\\nOrdering direct answer: custom food packaging starts at 100 pieces on 350g food-grade white card or 400g grey-back board, with optional PE/PLA greaseproof inner linings, four-colour offset or digital output, and standard 3-5 business days production — free SF shipping over HK$500 across Hong Kong. "
          "For inner-side (reverse) printing on the food-contact face, food-grade ink arrangements can be noted at ordering and confirmed together on the free digital proof; the outer-print plus inner-lamination build already meets indirect-contact requirements.")

JA_INS = ("\\n\\n食品パッケージのオーダーメイド直答：食品パッケージのカスタムは100個から、350gフードグレード白カードまたは400gグレーボード、PE/PLA防油内層を選択でき、4色オフセットまたはデジタル出力、標準3-5営業日で生産します——HK$500以上で香港本地SF Express無料。"
          "食品接触面の内側印刷（裏刷り）は、発注時に食品グレードインクの手配をご指示いただければ無料デジタル校正で確認できます。外印刷＋内層ラミネートの構成も間接接触基準を満たします。")

raw_ts = io.open(TS_PATH, encoding="utf-8", newline="").read()
ts_lines = raw_ts.split("\n")

JOBS = [
    ("food-boxes", "zh-hk", "準備落單？1 小時免費打稿", ZH_INS),
    ("food-boxes", "en", "Ready when you are", EN_INS),
    ("food-boxes", "ja", "ご入稿から1時間で無料デジタル校正", JA_INS),
]
print("=== food-boxes body inserts ===")
ts_line_edits = []
si = raw_ts.find('"food-boxes": {')
ei = raw_ts.find('\n  "', si + 4)
seg_start = raw_ts[:si].count("\n")
seg_end = raw_ts[:ei].count("\n") if ei > 0 else len(ts_lines)
for slug, loc, anchor, ins in JOBS:
    loc_line = next(k for k in range(seg_start, seg_end + 1) if ts_lines[k].strip().startswith('"%s": {' % loc))
    loc_end = next((k for k in range(loc_line + 1, seg_end + 1) if re.match(r'\s*"(zh-hk|en|ja)": \{', ts_lines[k])), seg_end)
    cta = [k for k in range(loc_line, loc_end + 1) if anchor in ts_lines[k]]
    check(len(cta) == 1, "%s.%s CTA anchor unique (hit=%d)" % (slug, loc, len(cta)))
    if len(cta) != 1:
        continue
    k = cta[0]
    old_line = ts_lines[k]
    new_line = old_line.replace(anchor, ins + anchor, 1)
    check(new_line != old_line, "%s.%s insert applied at CTA" % (slug, loc))
    ts_line_edits.append((k, old_line, new_line))
    if loc == "zh-hk":
        bad = [c for c in ins if c in "们后发这说时实现对开页买张东丝乐针让贝见车转换运远设图风络"]
        check(not bad, "zh insert no simplified (found %s)" % "".join(sorted(set(bad))))
    if loc == "ja":
        bad = [c for c in ins if c in "裝內"]
        check(not bad, "ja insert no traditional-only (found %s)" % "".join(sorted(set(bad))))
    check("食品包裝訂製" in ins or "custom food packaging" in ins or "オーダーメイド" in ins, "target phrase present")

# ---------------- packaging zh hub: buyingGuide link to food-boxes ----------------
raw_cat = io.open(CAT_PATH, encoding="utf-8", newline="").read()
ci = raw_cat.find("packagingContent:")
# confine to the packaging zh-hk block
zi = raw_cat.find("'zh-hk'", ci)
block_zone = raw_cat[ci:ci + 60000]
food_link_present = "/zh-hk/product/food-boxes/" in block_zone
print("=== packaging zh hub link check ===")
print("  hub already links food-boxes:", food_link_present)
if not food_link_present:
    # find the buyingGuide links array in the zh block (pattern: { label: '...', href: '/zh-hk/...' })
    m = re.search(r"(buyingGuide: \{[\s\S]{0,4000}?links: \[)([\s\S]{0,2500}?\])", block_zone)
    check(m is not None, "packaging zh buyingGuide.links array located")
    if m:
        arr = m.group(2)
        new_item = "\n        { label: '食品包裝訂製 — FDA 食品級紙盒', href: '/zh-hk/product/food-boxes/' },"
        new_arr_head = m.group(1)
        # insert at head of array
        zone_new = block_zone[:m.start(2)] + new_item + "\n        " + arr.lstrip() + block_zone[m.end(2):]
        # rebuild absolute replacement
        cat_new = raw_cat[:ci] + zone_new + raw_cat[ci + 60000:]
        cat_edited = True
        print("  link insertion prepared (buyingGuide.links head)")
else:
    cat_edited = False
    cat_new = raw_cat

# ---------------- write ----------------
if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    shutil.copy2(TS_PATH, os.path.join(BAK, "sku-seo-data.ts.bak"))
    if cat_edited:
        shutil.copy2(CAT_PATH, os.path.join(BAK, "category-seo-content.ts.bak"))
    for k, oldl, newl in ts_line_edits:
        assert ts_lines[k] == oldl; ts_lines[k] = newl
    io.open(TS_PATH, "w", encoding="utf-8", newline="").write("\n".join(ts_lines))
    if cat_edited:
        io.open(CAT_PATH, "w", encoding="utf-8", newline="").write(cat_new)
    for p in (TS_PATH, CAT_PATH):
        check(open(p, "rb").read(2)[0] != 0xFF, "no BOM %s" % os.path.basename(p))
    print("\nWROTE: ts %d body inserts%s" % (len(ts_line_edits), " + hub link 1" if cat_edited else ""))
else:
    print("\nVERIFY: %d body inserts%s pending" % (len(ts_line_edits), " + hub link" if cat_edited else ""))
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
