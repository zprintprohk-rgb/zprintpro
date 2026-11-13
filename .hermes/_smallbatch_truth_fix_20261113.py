import io

PAIRS = {
    r"src\data\sku-seo-data.ts": [
        ("Custom small batch stickers from 10 pcs at $0.55/pc (A4 sheet). No setup fees.",
         "Custom small batch stickers from 10 pcs per design, from US$0.55/pc (final quote confirms price and schedule). No setup fees."),
        ("10 stickers (A4 sheet-based layouts), no setup fees and no plate fees.",
         "10 stickers per design, no setup fees and no plate fees."),
    ],
    r"src\data\products-content.ts": [
        ("Order from 10 stickers (sheet-based A4 layouts) with no setup fees, and we'll cut, print, and ship after artwork approval.",
         "Order from 10 stickers per design with no setup fees, and we'll cut, print, and ship after artwork approval."),
        ("Start at 10 stickers (A4 sheet layouts). No plate fees, no setup surcharges.",
         "Start at 10 stickers per design. No plate fees, no setup surcharges."),
        ("MOQ is 10 stickers (A4 sheet-based layouts) across vinyl, paper, kraft, foil and holographic materials.",
         "MOQ is 10 stickers per design across vinyl, paper, kraft, foil and holographic materials."),
    ],
}
total = 0
for path, pairs in PAIRS.items():
    s = io.open(path, encoding="utf-8", newline="").read()
    ft = 0
    for old, new in pairs:
        n = s.count(old)
        assert n == 1, "%s: expected 1 hit, got %d :: %s" % (path, n, old[:60])
        s = s.replace(old, new)
        ft += n
        print("  x%d %s" % (n, old[:64]))
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    total += ft
    print("== %s replaced=%d" % (path, ft))
print("TOTAL:", total)

# residual check: no "(A4 sheet" / "A4 sheet-based" / "sheet-based A4" in pcs-MOQ clauses of these files (small-batch domain)
import re
for path in PAIRS:
    s = io.open(path, encoding="utf-8").read()
    for pat in ["(A4 sheet", "A4 sheet-based", "sheet-based A4"]:
        hits = [m.start() for m in re.finditer(re.escape(pat), s)]
        print(path, pat, "hits:", len(hits))
