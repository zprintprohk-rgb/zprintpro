import json
from collections import defaultdict, Counter

data = json.load(open(r"F:\zprintpro-nextjs\docs\audit-ja-pdp-seo-2026-06-18-data.json", encoding="utf-8"))

# Get category for each product
import re
t = open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8").read()
slug_re = re.compile(r"^\s{4}slug:\s*['\"]([^'\"]+)['\"]", re.MULTILINE)
cat_re = re.compile(r"category_slug:\s*['\"]([^'\"]+)['\"]", re.MULTILINE)

slug_to_cat = {}
slugs = list(slug_re.finditer(t))
cats = list(cat_re.finditer(t))
for i, m in enumerate(slugs):
    slug = m.group(1)
    pos = m.start()
    next_slug = slugs[i+1].start() if i+1 < len(slugs) else len(t)
    # Find first category_slug in this range
    for cm in cats:
        if pos < cm.start() < next_slug:
            slug_to_cat[slug] = cm.group(1)
            break

# Per-category issue aggregation
cat_p0 = defaultdict(int)
cat_p1 = defaultdict(int)
cat_skus = defaultdict(int)
cat_skus_with_p0 = defaultdict(int)
cat_skus_with_p1 = defaultdict(int)

for s in data["per_sku_findings"]:
    slug = s["sku"]
    cat = slug_to_cat.get(slug, "unknown")
    cat_skus[cat] += 1
    has_p0 = False
    has_p1 = False
    for i in s["issues"]:
        if i["severity"] == "P0":
            cat_p0[cat] += 1
            has_p0 = True
        elif i["severity"] == "P1":
            cat_p1[cat] += 1
            has_p1 = True
    if has_p0: cat_skus_with_p0[cat] += 1
    if has_p1: cat_skus_with_p1[cat] += 1

print(f"{'Category':<25} {'#SKUs':>6} {'P0':>5} {'P1':>5} {'SKUs w/P0':>10} {'SKUs w/P1':>10}")
print("-" * 65)
for cat in sorted(cat_skus.keys(), key=lambda c: -cat_p0[c]):
    print(f"{cat:<25} {cat_skus[cat]:>6} {cat_p0[cat]:>5} {cat_p1[cat]:>5} {cat_skus_with_p0[cat]:>10} {cat_skus_with_p1[cat]:>10}")

# Long description per category
ld = data["long_description_ja"]
ld_per_cat = defaultdict(lambda: {"total": 0, "filled": 0, "score_C": 0, "score_B": 0})
for f in ld["findings"]:
    cat = slug_to_cat.get(f["slug"], "unknown")
    ld_per_cat[cat]["total"] += 1
    if f["longJa_filled"]:
        ld_per_cat[cat]["filled"] += 1
    if f["score"] == "C":
        ld_per_cat[cat]["score_C"] += 1
    elif f["score"] == "B":
        ld_per_cat[cat]["score_B"] += 1

print(f"\n{'Category':<25} {'longJa':>8} {'filled':>8} {'absent':>8} {'C':>3} {'B':>3}")
print("-" * 65)
for cat in sorted(ld_per_cat.keys(), key=lambda c: -ld_per_cat[c]["score_C"]):
    d = ld_per_cat[cat]
    absent = d["total"] - d["filled"]
    print(f"{cat:<25} {d['total']:>8} {d['filled']:>8} {absent:>8} {d['score_C']:>3} {d['score_B']:>3}")