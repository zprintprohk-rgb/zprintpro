# -*- coding: utf-8 -*-
"""Order 28d fixer: 全文件 国際認証体系 残余 11 处 (9 slugs, ja 主体) 同类清毒 -> 归零.
Per-slug segment application with per-pair count assertions. Double-method counts before/after."""
import io, re

PATH = r"src\data\sku-seo-data.ts"
raw = io.open(PATH, encoding="utf-8", newline="").read()
print("CRLF count:", raw.count("\r\n"))

def seg_str(s, start):
    brace = s.find('{', start); depth = 0; p = brace; ins = False; esc = False
    while p < len(s):
        c = s[p]
        if ins:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': ins = False
        else:
            if c == '"': ins = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: return s[start:p+1]
        p += 1
    return s[start:]

def counts(seg):
    return len(re.findall(r'国際認証体系', seg))

def whole_count():
    return len(re.findall(r'国際認証体系', raw))

# method-2 before: per-slug sum must equal whole-file
targets = ["same-day-flyers","custom-red-packets","catalog-printing","premium-greeting-cards",
           "spot-uv-greeting-cards","matte-greeting-cards","rounded-corner-greeting-cards",
           "foil-wedding-invitations","wedding-thank-you-cards"]
m2_before = sum(counts(seg_str(raw, raw.find('"%s": {' % s))) for s in targets)
m1_before = whole_count()
print("M1 whole-file before:", m1_before, "| M2 per-slug sum:", m2_before)
assert m1_before == m2_before == 11, "DOUBLE METHOD MISMATCH or count != 11"

PAIRS = {
 "same-day-flyers": [
   ("日本全国 DHL 2-4 日配送。国際認証体系品質。30 秒 AI 無料見積もり。", "日本全国 DHL 2-4 日配送。30 秒 AI 無料見積もり。", 1),
 ],
 "custom-red-packets": [
   ("大豆油墨證明、国際認証体系質檢報告，", "大豆油墨證明，", 1),
   ("5-7営業日、国際認証体系品質検査。", "5-7営業日。", 1),
   ("大豆インク証明、国際認証体系品質検査レポートなど、", "大豆インク証明など、", 1),
 ],
 "catalog-printing": [
   ("FSC認証紙と国際認証体系品質管理のもとで四色オフセット印刷し", "FSC認証紙を使用して四色オフセット印刷し", 1),
 ],
 "premium-greeting-cards": [
   ("国際認証体系品質管理体制のもとで生産", "品質管理体制のもとで生産", 1),
 ],
 "spot-uv-greeting-cards": [
   ("国際認証体系品質管理の下で生産", "品質管理の下で生産", 1),
 ],
 "matte-greeting-cards": [
   ("国際認証体系品質管理の体制で行われ", "品質管理の体制で行われ", 1),
 ],
 "rounded-corner-greeting-cards": [
   ("国際認証体系品質管理のもとで生産", "品質管理のもとで生産", 1),
 ],
 "foil-wedding-invitations": [
   ("国際認証体系品質管理の下で生産", "品質管理の下で生産", 1),
 ],
 "wedding-thank-you-cards": [
   ("国際認証体系品質管理の下で生産", "品質管理の下で生産", 1),
 ],
}

new_raw = raw
for slug, pairs in PAIRS.items():
    i = new_raw.find('"%s": {' % slug)
    assert i != -1, slug
    seg = seg_str(new_raw, i)
    seg_new = seg
    for old, new, exp in pairs:
        n = seg_new.count(old)
        assert n == exp, "pair mismatch in %s: '%s...' count=%d exp=%d" % (slug, old[:30], n, exp)
        seg_new = seg_new.replace(old, new)
    new_raw = new_raw[:i] + seg_new + new_raw[i+len(seg):]
    print("OK %s applied %d pairs" % (slug, len(pairs)))

io.open(PATH, "w", encoding="utf-8", newline="\n").write(new_raw)
print("written")

raw2 = io.open(PATH, encoding="utf-8", newline="").read()
m1_after = whole_count()
print("M1 whole-file after:", m1_after)
per = {s: counts(seg_str(raw2, raw2.find('"%s": {' % s))) for s in targets}
print("per-slug after:", per)
assert all(v == 0 for v in per.values()), "RESIDUE LEFT"
assert m1_after == 0, "WHOLE-FILE RESIDUE"
print("VERIFY-OK")
