# -*- coding: utf-8 -*-
"""Order 28a pass 2: remaining FDA in boxes FAQ/材质/cross-links."""
import io, sys, re

p = r"src\data\sku-seo-data.ts"
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
    a, b = find_bounds(s, slug)
    t = s[a:b]
    for old, new, expect in pairs:
        c = t.count(old)
        if c != expect:
            print("FAIL[%s] count=%d expect=%d for %r" % (slug, c, expect, old[:60]))
            sys.exit(1)
        t = t.replace(old, new)
    s = s[:a] + t + s[b:]

ZH_FAQ_OLD = "我們的食品級包裝盒使用 FDA 認可膠水及食品接觸安全油墨，認證適用於間接食品接觸（燕麥、茶、巧克力、零食）。"
ZH_FAQ_NEW = "我們的食品級包裝盒使用食品接觸安全油墨及食品級膠水，適用於間接食品接觸（燕麥、茶、巧克力、零食）。"
JA_MAT_OLD = "すべて FSC 認証紙、大豆油性インク および FDA セーフ（間接食品接触対応） 認証取得。"
JA_MAT_NEW = "すべて FSC 認証紙、大豆油性インク を使用。"
JA_FAQ_OLD = "食品グレード箱は FDA セーフ接着剤と食品接触対応インク使用、間接食品接触（オートミール、茶、チョコ、スナック）認証済み。"
JA_FAQ_NEW = "食品グレード箱は食品接触対応インクと食品グレード接着剤を使用、間接食品接触（オートミール、茶、チョコ、スナック）に対応。"

for slug in ["cosmetic-boxes", "mailer-boxes", "rigid-boxes", "magnetic-closure-gift-box",
             "electronics-packaging-box", "kraft-paper-packaging-box"]:
    apply(slug, [(ZH_FAQ_OLD, ZH_FAQ_NEW, 1), (JA_MAT_OLD, JA_MAT_NEW, 1), (JA_FAQ_OLD, JA_FAQ_NEW, 1)])

apply("food-boxes", [
    ("全部材質通過 FSC 認證、採用大豆油墨及 FDA 認可（間接食品接觸）。",
     "全部材質採用 FSC 認證紙張與大豆油墨。", 1),
])

apply("folding-boxes", [
    ("（FDA 食品級 + PE/PLA 防油內層）", "（食品級 + PE/PLA 防油內層）", 1),
    ("（FDA食品グレード+PE/PLA内層）", "（食品グレード+PE/PLA内層）", 1),
])

io.open(p, "w", encoding="utf-8", newline="").write(s)

# ---------- final verification ----------
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
        if re.search(r'国際認証体系', body): bad.append("%s cert left" % label)
        if re.search(r'FDA', body): bad.append("%s FDA left" % label)
    if re.search(r'推廣單張、活動入口的指示牌', zh): bad.append("zh scn left")
    if slug != "folding-boxes":  # folding never had FSC claims
        if "FSC" not in zh and "FSC" not in ja and "FSC" not in en:
            bad.append("FSC all removed (should keep)")
    if bad:
        print("VERIFY-FAIL[%s] %s" % (slug, "; ".join(bad)))
        fails += 1
    else:
        print("VERIFY-OK[%s]" % slug)
print("pass2 done. changed=%s verify_fails=%d" % ("YES" if s != orig else "NO", fails))
sys.exit(1 if fails else 0)
