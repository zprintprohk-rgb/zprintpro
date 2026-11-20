# -*- coding: utf-8 -*-
"""首段直答补价: "N X起印" -> "N X起印（HK$A-B/X，按…）" 仅当 price_range 单位匹配"""
import io, os, re, json, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P_SEO = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
P_PROD = os.path.join(REPO, "src", "data", "products.ts")

seo = io.open(P_SEO, encoding="utf-8", newline="").read()
prod = io.open(P_PROD, encoding="utf-8", newline="").read()

# 真值: slug -> price_range
pm = [(m.group(1), m.start()) for m in re.finditer(r"^\s{4}slug: '([a-z0-9-]+)',$", prod, re.M)]
truth = {}
for i, (slug, off) in enumerate(pm):
    seg = prod[off:pm[i + 1][1] if i + 1 < len(pm) else len(prod)]
    pr = re.search(r"price_range: '([^']+)'", seg)
    if pr:
        truth[slug] = pr.group(1)

marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', seo, re.M)]
changed = []
skipped = []
for i, (slug, off) in enumerate(marks):
    end = marks[i + 1][1] if i + 1 < len(marks) else len(seo)
    blk = seo[off:end]
    rng = truth.get(slug)
    if not rng:
        skipped.append((slug, "no range")); continue
    m = re.match(r"(HK\$[\d.]+-[\d.,]+)/(個|張|本|枚|冊)$", rng)
    if not m:
        skipped.append((slug, "range not per-unit: " + rng)); continue
    unit = m.group(2)
    # 已有价格在首段?
    bm = re.search(r'"body":\s*"((?:[^"\\]|\\.)*)"', blk)
    if not bm:
        skipped.append((slug, "no body")); continue
    body = bm.group(1)
    first = body.split("\\n\\n")[0]
    if "HK$" in first:
        skipped.append((slug, "already priced")); continue
    pat = re.compile(r"(\d{1,5}\s*" + unit + r"\s*起(?:印)?)")
    if not pat.search(first):
        skipped.append((slug, "no moq in first para")); continue
    new_first = pat.sub(lambda mm: mm.group(1) + "（" + rng + "）", first, count=1)
    if new_first == first:
        skipped.append((slug, "no change")); continue
    new_body = new_first + body[len(first):]
    # 写回该块 body 值
    start_in_blk = bm.start(1) - 0
    new_blk = blk[:bm.start(1)] + new_body + blk[bm.end(1):]
    seo = seo[:off] + new_blk + seo[end:]
    # 重新计算 marks (长度变化) -> 简化: 重新解析
    marks = [(m2.group(1), m2.start()) for m2 in re.finditer(r'^  "([a-z0-9-]+)": \{', seo, re.M)]
    changed.append((slug, rng))

print(f"changed={len(changed)} skipped={len(skipped)}")
for s, r in changed[:25]:
    print(f"  + {s}: {r}")
print("--- skipped sample ---")
for s, r in skipped[:8]:
    print(f"  - {s}: {r}")

if changed:
    bp = os.path.join(REPO, ".hermes", "_bak-directans-20261021", "sku-seo-data.ts.before")
    os.makedirs(os.path.dirname(bp), exist_ok=True)
    if not os.path.exists(bp):
        shutil.copy2(P_SEO, bp)
    io.open(P_SEO, "w", encoding="utf-8", newline="").write(seo)
    print("[written]")
