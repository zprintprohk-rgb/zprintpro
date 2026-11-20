# -*- coding: utf-8 -*-
"""W3.2 Comiket: doujinshi-printing x3 body rewrite (kill gram8=1.000 tri-clone).
zh = keep good source text + append C107 block/FAQ/links; en/ja = native rewrites.
Truth: A5 148x210 / B5 182x257 / A4 optional / cover 90g coated / text 90g dailin FSC / cover colour + text mono (all-colour opt) / 10 copies MOQ / saddle-stitch-glue-fold 3-way / standard 5 days rush 2-3 (hub techSpecs) / DHL 2-4 days JP / C107 = 2026-12-30~31 Tokyo Big Sight (public event fact, strategy-recorded)."""
import io, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-w32-20261015")
TS_PATH = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

EN_BODY = ('"body": "Doujinshi printing for Comiket cycles: ZprintPro prints your circle\'s book with a colour cover and monochrome text pages as the standard build — upgradeable to full colour throughout when the artwork deserves it. Orders start at 10 copies, so first-run circles can test reader response before committing to a reprint. Submit your file and a free digital proof confirms imposition and colour before anything goes to press.'
'\\n\\nFormats cover the two doujinshi standards — A5 (148x210mm) and B5 (182x257mm) — with A4 optional for art books and portfolio pieces. Text pages run on FSC-certified 90g dailin stock that reads clean in monochrome; covers use 90g coated stock that takes foil, spot UV or matte lamination when the cover art calls for it. Binding is a three-way choice: saddle stitch for slim zines, perfect binding for thicker issues, and folded formats for announcement pieces.'
'\\n\\nThe Comiket rhythm is the deadline math: C107 runs December 30-31, 2026 at Tokyo Big Sight, which means finished books need to be in your hands before load-in — not printing that week. Ordering 3-4 weeks ahead of the event keeps proofing, production and DHL shipping (2-4 days to Japan) comfortably inside the window, and the same schedule applies to sale events and one-day circuits through the year. Our [Comiket printing prep guide](/en/blog/comiket-printing-prep-guide/) walks through the file checklist, and the [doujin circle printing guide](/en/blog/doujin-circle-printing-guide/) covers spec choices for first books. The full peripheral line-up — stickers, acrylic, posters — lives at [doujin goods printing](/en/category/japan-doujin/).'
'\\n\\n**FAQ**'
'\\n\\n**Q1: What is the minimum order for doujinshi?**'
'\\n10 copies — enough for a first print run and market testing before a second edition.'
'\\n\\n**Q2: Can I do full colour inside?**'
'\\nYes — the standard build is colour cover with monochrome text; full-colour interiors are an upgrade for illustration-heavy books.'
'\\n\\n**Q3: How early should I order for C107?**'
'\\n3-4 weeks before the December 30-31 event is the safe window — it covers proofing, production and DHL 2-4 day shipping to Japan.'
'\\n\\n**Q4: Can I combine doujinshi with other peripherals?**'
'\\nYes — stickers, acrylic stands and posters can ride the same order and shipment, one proof cycle for the whole set.'
'\\n\\nSend your files for a free digital proof — WhatsApp +86 198 8085 1334 or the 30-second AI quote button.",')

JA_BODY = ('"body": "コミケに向けた同人誌印刷は、表紙カラー＋本文モノクロを標準構成に、作品に合わせて全ページカラーへもグレードアップできる ZprintPro の同人誌印刷で。部数は10部からなので、初版サークルも反応を見てから増刷を決められます。入稿いただいたデータは印刷前に無料デジタル校正で面付けと色味を確認します。'
'\\n\\nサイズは同人誌の二大規格——A5（148×210mm）とB5（182×257mm）——に加え、画集やポートフォリオにはA4も選択可能。本文はFSC認証の道林紙90gでモノクロの読み心地がよく、表紙は90gコート紙に箔押し・スポットUV・マットラミネートで表紙絵を立てられます。製本はぺらぺらめくりやすい無線綴じ（中綴じ）、分厚い号には胶装、告知紙には折り加工の3方式から。'
'\\n\\nコミケの時間割は逆算がすべて：C107は2026年12月30日〜31日に東京ビッグサイトで開催。搬入日に手元に本がある状態がゴールで、印刷がその週では間に合いません。イベントの3〜4週間前までに発注すれば、校正・生産・日本へのDHL配送（2〜4日）に十分な余裕を持てます。即売会や一日イベントの通年スケジュールも同様です。入稿チェックリストは [コミケ印刷準備ガイド](/ja/blog/comiket-printing-prep-guide/)、初めての頒布物の仕様選びは [サークル印刷ガイド](/ja/blog/doujin-circle-printing-guide/) が詳しい。ステッカー・アクリル・ポスターまで周辺一式は [同人グッズ印刷](/ja/category/japan-doujin/) をご覧ください。'
'\\n\\n**よくある質問**'
'\\n\\n**Q1: 同人誌の最小部数は？**'
'\\n10部から。初版で反応を確かめてから増刷の判断ができます。'
'\\n\\n**Q2: 本文をフルカラーにできますか？**'
'\\n可能です。標準は表紙カラー＋本文モノクロ、イラスト主体の本は全ページカラーへアップグレードできます。'
'\\n\\n**Q3: C107に間に合わせる発注はいつ？**'
'\\n12月30日〜31日の開催から逆算して3〜4週間前まで。校正・生産・DHL2〜4日の配送まで含めた安全圏です。'
'\\n\\n**Q4: 同人誌と他グッズを一緒に発注できますか？**'
'\\n可能です。ステッカー・アクリルスタンド・ポスターを同時発注・同便出荷でき、校正も一括で回せます。'
'\\n\\nデータをお送りいただければ無料デジタル校正でお応えします——WhatsApp +86 198 8085 1334 または「30秒AI見積り」ボタンから。",')

ZH_APPEND = ('\\n\\nC107 直答：C107（コミケ107）將於 2026 年 12 月 30 日至 31 日在東京國際展示場舉行。以完工日倒推，建議活動前 3-4 週落單——預留打樣、生產（常規 5 天、加急 2-3 天）與 DHL 日本 2-4 天配送的完整窗口；樣書可走 24 小時特急確認紙質與色彩。入稿清單見 [コミケ印刷準備ガイド](/ja/blog/comiket-printing-prep-guide/)，規格選型見 [同人誌印刷指南](/zh-hk/blog/doujin-circle-printing-guide/)，貼紙/亞克力/海報一條龍見 [同人周邊印刷類目](/zh-hk/category/japan-doujin/)。'
'\\n\\n**常見問題**'
'\\n\\n**Q1: 同人誌最少印幾多本？**'
'\\n10 本起印，先印小量測試市場反應，完售後再補印。'
'\\n\\n**Q2: 內頁可以全彩嗎？**'
'\\n可以，標準配置是封面彩色＋內頁單色，插畫比重高的本子可升級全彩內頁。'
'\\n\\n**Q3: C107 幾時落單先穩陣？**'
'\\n以 12 月 30-31 日活動日倒推 3-4 週，連同打樣、生產同 DHL 2-4 天配送一齊計算。'
'\\n\\n**Q4: 可以同貼紙亞克力一齊落單嗎？**'
'\\n可以，同批打樣同便出貨，省一次往運。'
'\\n\\n準備好就落單——免費數碼打稿 + 30 秒 AI 報價，WhatsApp +86 198 8085 1334。')

raw_ts = io.open(TS_PATH, encoding="utf-8", newline="").read()
ts_lines = raw_ts.split("\n")

JOBS = [
    ("doujinshi-printing", "zh-hk", None),          # append
    ("doujinshi-printing", "en", EN_BODY),           # full replace
    ("doujinshi-printing", "ja", JA_BODY),           # full replace
]
print("=== W3.2 body edits ===")
ts_line_edits = []
si = raw_ts.find('"doujinshi-printing": {')
ei = raw_ts.find('\n  "', si + 4)
seg_start = raw_ts[:si].count("\n")
seg_end = raw_ts[:ei].count("\n") if ei > 0 else len(ts_lines)
for slug, loc, new_line in JOBS:
    loc_line = None
    for k in range(seg_start, seg_end + 1):
        if ts_lines[k].strip().startswith('"%s": {' % loc):
            loc_line = k
            break
    loc_end = seg_end
    if loc_line is not None:
        for k in range(loc_line + 1, seg_end + 1):
            s2 = ts_lines[k].strip()
            if s2.startswith('"zh-hk": {') or s2.startswith('"en": {') or s2.startswith('"ja": {'):
                loc_end = k - 1
                break
    hits = [k for k in range(loc_line, loc_end + 1) if ts_lines[k].strip().startswith('"body": "')] if loc_line is not None else []
    check(len(hits) == 1, "%s.%s body line unique (hit=%d)" % (slug, loc, len(hits)))
    if len(hits) == 1:
        k = hits[0]
        old = ts_lines[k]
        if new_line is None:
            # append to existing zh body: handle both '"' and '",' line endings
            r = old.rstrip()
            if r.endswith('",'):
                new_line = r[:-2] + ZH_APPEND + '",'
            elif r.endswith('"'):
                new_line = r[:-1] + ZH_APPEND + '"'
            else:
                check(False, 'zh body line shape unexpected: ...%r' % r[-30:])
                continue
        ts_line_edits.append((k, old, new_line))
        for u in re.findall(r"\]\((/[^)]+)\)", new_line):
            check(u.startswith("/en/") or u.startswith("/ja/") or u.startswith("/zh-hk/"), "link prefix %s" % u)
        check("C107" in new_line, "%s.%s carries C107 anchor" % (slug, loc))
        if loc == "zh-hk":
            bad = [c for c in ZH_APPEND if c in "们后发这说时实现对开页买张东丝乐针让贝见车转换运远设图风络"]
            check(not bad, "zh append no simplified (found %s)" % "".join(sorted(set(bad))))
        if loc == "ja":
            bad = [c for c in new_line if c in "裝內"]
            check(not bad, "ja body no traditional-only (found %s)" % "".join(sorted(set(bad))))

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    shutil.copy2(TS_PATH, os.path.join(BAK, "sku-seo-data.ts.bak"))
    for k, oldl, newl in ts_line_edits:
        assert ts_lines[k] == oldl; ts_lines[k] = newl
    io.open(TS_PATH, "w", encoding="utf-8", newline="").write("\n".join(ts_lines))
    check(open(TS_PATH, "rb").read(2)[0] != 0xFF, "no BOM")
    print("\nWROTE %d body lines" % len(ts_line_edits))
else:
    print("\nVERIFY: %d body lines pending" % len(ts_line_edits))
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
