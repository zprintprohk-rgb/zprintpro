# -*- coding: utf-8 -*-
"""
2026-10-26 daily-content lane: order 28a — boxes 族 8 SKU 同类清毒.
Remove: 国際認証体系 (vague cert) + FDA claims (unsourced) + zh wrong-scenario (flyer copy).
Keep (paper-bags precedent + K3 8/19 approved): FSC 認證紙張 / 大豆油墨 / 多年印刷經驗 / 沖縄配送 / DHL 2-4日.
Truth: products.ts + K3 8/19 12 件拍板; style mirrors de3897ca (paper-bags 10-24).
"""
import io, sys, re

p = r"src\data\sku-seo-data.ts"
backup = r".hermes\_bak-sku-seo-before-boxes-20261026.ts"
s = io.open(p, encoding="utf-8").read()
orig = s

slugs = ["cosmetic-boxes", "food-boxes", "mailer-boxes", "folding-boxes", "rigid-boxes",
         "magnetic-closure-gift-box", "electronics-packaging-box", "kraft-paper-packaging-box"]

def find_bounds(t, slug):
    i = t.find('"%s": {' % slug)
    assert i != -1, slug
    j = t.find('\n  "', i + 1)
    return (i, j if j != -1 else len(t))

def apply(slug, pairs):
    global s
    a, b = find_bounds(s, slug)   # recompute on CURRENT s (robust vs prior edits shifting positions)
    t = s[a:b]
    for old, new, expect in pairs:
        c = t.count(old)
        if c != expect:
            print("FAIL[%s] count=%d expect=%d for %r" % (slug, c, expect, old[:70]))
            sys.exit(1)
        t = t.replace(old, new)
    s = s[:a] + t + s[b:]

ZH_BLOCK_OLD = "国際認証体系工廠，FSC 認證紙張，大豆油墨，FDA 認可（適用於間接食品接觸），多年印刷經驗。"
ZH_BLOCK_NEW = "FSC 認證紙張，大豆油墨，多年印刷經驗。"
ZH_MAT_OLD = "三種材質均通過 FSC 認證紙張，大豆油墨 及 FDA 認可（適用於間接食品接觸） 認證。"
ZH_MAT_NEW = "三種材質均採用 FSC 認證紙張與大豆油墨。"
EN_FSC_OLD = "All three are FSC-certified paper, soy-based ink and FDA-safe for indirect food contact (food-grade options), so you can ship into the US market without compliance friction."
EN_FSC_NEW = "All three are FSC-certified paper with soy-based ink, and food-grade options are available for indirect food-contact packaging."
EN_FAQ_OLD = "Our food-grade box options use FDA-safe adhesive and food-contact-safe inks, certified for indirect food contact (oatmeal, tea, chocolate, snacks)."
EN_FAQ_NEW = "Our food-grade box options use food-contact-safe inks and materials for indirect food-contact packaging (oatmeal, tea, chocolate, snacks)."
JA_BLOCK_OLD = "大豆油性インク、FDA セーフ（間接食品接触対応）。沖縄県・北海道も追加料金なし。国際認証体系の工場、DHL 国際配送で 2-4 日納品、長年の印刷実績。"
JA_BLOCK_NEW = "大豆油性インク。沖縄県・北海道も追加料金なし。DHL 国際配送で 2-4 日納品、長年の印刷実績。"
EN_CERT_OLD = "internationally certified production with full FDA compliance where applicable."
EN_CERT_NEW = ""
EN_CERT_OLD_M = "certified production with full FDA compliance where applicable."
EN_CERT_NEW_M = ""

for slug in ["cosmetic-boxes", "rigid-boxes", "magnetic-closure-gift-box",
             "electronics-packaging-box", "kraft-paper-packaging-box"]:
    name = {
        "cosmetic-boxes": "化妝品包裝盒", "rigid-boxes": "精裝盒",
        "magnetic-closure-gift-box": "磁吸翻蓋禮盒印刷",
        "electronics-packaging-box": "電子產品包裝盒定製",
        "kraft-paper-packaging-box": "牛皮紙盒印刷定製",
    }[slug]
    apply(slug, [
        (ZH_BLOCK_OLD, ZH_BLOCK_NEW, 1),
        ("無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，%s 都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。" % name,
         "無論是本地品牌還是跨境電商，%s 都能提供快速、靈活、符合成本預期的印刷方案。" % name, 1),
        (ZH_MAT_OLD, ZH_MAT_NEW, 1),
        (EN_CERT_OLD, EN_CERT_NEW, 1),
        (EN_FSC_OLD, EN_FSC_NEW, 1),
        (EN_FAQ_OLD, EN_FAQ_NEW, 1),
        (JA_BLOCK_OLD, JA_BLOCK_NEW, 1),
    ])

# mailer-boxes: same minus "internationally " prefix
apply("mailer-boxes", [
    (ZH_BLOCK_OLD, ZH_BLOCK_NEW, 1),
    ("無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，快遞盒/飛機盒 都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。",
     "無論是本地品牌還是跨境電商，快遞盒/飛機盒 都能提供快速、靈活、符合成本預期的印刷方案。", 1),
    (ZH_MAT_OLD, ZH_MAT_NEW, 1),
    (EN_CERT_OLD_M, EN_CERT_NEW_M, 1),
    (EN_FSC_OLD, EN_FSC_NEW, 1),
    (EN_FAQ_OLD, EN_FAQ_NEW, 1),
    (JA_BLOCK_OLD, JA_BLOCK_NEW, 1),
])

# food-boxes: cert block + 2 en + 2 ja (no wrong-scn/material/FAQ/CERT-frag)
apply("food-boxes", [
    (ZH_BLOCK_OLD, ZH_BLOCK_NEW, 1),
    ("moisture-resistant linings and FDA-safe indirect food contact as standard",
     "moisture-resistant linings as standard", 1),
    ("clears with food-grade card, FDA-safe adhesives and food-contact-safe inks.",
     "clears with food-grade card and food-contact-safe inks.", 1),
    ("間接食品接触対応のFDAセーフ仕様。", "間接食品接触対応仕様。", 1),
    ("フードグレード紙・FDAセーフ接着剤・食品接触対応インクで対応。",
     "フードグレード紙・食品接触対応インクで対応。", 1),
])

# folding-boxes: single en FDA in cross-link
apply("folding-boxes", [
    ("FDA food-grade with PE/PLA linings", "food-grade with PE/PLA linings", 1),
])

shutil_backup = backup
import shutil
shutil.copy(p, shutil_backup)
io.open(p, "w", encoding="utf-8", newline="").write(s)

# ---------- verification (independent recount) ----------
def get_body(slug, loc):
    a, b = find_bounds(s, slug)
    t = s[a:b]
    k = t.find('"%s": {' % loc)
    k2 = t.find('"body": "', k)
    if k2 == -1: return ""
    q = k2 + len('"body": "')
    buf = []
    while q < len(t):
        ch = t[q]
        if ch == '\\':
            buf.append(t[q:q+2]); q += 2; continue
        if ch == '"': break
        buf.append(ch); q += 1
    return ''.join(buf)

fails = 0
for slug in slugs:
    zh = get_body(slug, "zh-hk"); en = get_body(slug, "en"); ja = get_body(slug, "ja")
    bad = []
    for label, body in [("zh", zh), ("en", en), ("ja", ja)]:
        if re.search(r'国際認証体系', body): bad.append("%s 国際認証体系 left" % label)
        if re.search(r'FDA', body): bad.append("%s FDA left" % label)
        if label == "zh" and re.search(r'推廣單張、活動入口的指示牌', body): bad.append("zh 错场景 left")
    # FSC must be kept (precedent)
    if "FSC" not in zh and "FSC" not in ja and "FSC" not in en:
        bad.append("FSC claims all removed (should keep)")
    if bad:
        print("VERIFY-FAIL[%s] %s" % (slug, "; ".join(bad)))
        fails += 1
    else:
        print("VERIFY-OK[%s] cert/FDA/错场景 cleared, FSC kept" % slug)
print("done. changed=%s verify_fails=%d backup=%s" % ("YES" if s != orig else "NO", fails, shutil_backup))
sys.exit(1 if fails else 0)
