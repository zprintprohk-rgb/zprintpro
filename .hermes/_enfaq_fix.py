# -*- coding: utf-8 -*-
"""EN packaging category FAQ truth fix (2 answers): false MOQ 30/50 -> 100 family; '3 days' -> 3-5d digital/5-7d offset.
Same class as A' batch (false MOQ + fake turnaround, §0.23 red line). SGS/ja promo left frozen/docket."""
import io, os, shutil, sys

P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-enfaq-truth-20261024.ts.bak"
MODE = "apply" if "--apply" in sys.argv else "verify"

RULES = [
    ("Wedding favor boxes from 30 units, color boxes from 50 units, standard industrial from 100–200 units. Far below traditional factory minimums of 500–1,000.",
     "From 100 units across all box styles — wedding favor, color and standard industrial boxes alike; custom sizes and shaped die-cuts from 500 units. Far below traditional factory minimums of 500–1,000."),
    ("Standard orders: 3 days. Rush service: 2 days. Prototyping: same day. Large orders (5,000+ units): approximately 5–7 days.",
     "Standard orders: 3-5 business days on digital, 5-7 days on offset. Rush service: 2-3 days. Prototyping: same day."),
]

s = io.open(P, encoding="utf-8", newline="").read()
errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

# scope helper: packaging block only for MOQ assertion (other categories keep their own MOQ regimes)
def pkg_span(txt):
    a = txt.find("packagingContent:")
    b = txt.find("{", a)
    d = 0; k = b; e = None
    while k < len(txt):
        if txt[k] == "{": d += 1
        elif txt[k] == "}":
            d -= 1
            if d == 0: e = k; break
        k += 1
    return txt[a:e]

sgs_before = s.count("SGS")
for old, new in RULES:
    n = s.count(old)
    check(n == 1, "rule unique (count=%d) %s..." % (n, old[:46]))
    if n == 1:
        s = s.replace(old, new, 1)
check(s.count("SGS") == sgs_before, "SGS invariant %d->%d" % (sgs_before, s.count("SGS")))
check("30 units" not in pkg_span(s) and "50 units" not in pkg_span(s), "false EN MOQ removed (packaging scope)")
other_units = s.count("30 units")
print("  info: other-category '30 units' occurrences (docket): %d" % other_units)
check("Standard orders: 3 days" not in s, "fake 3-day removed")

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(s)
    check(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE 2 EN FAQ fixes")
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
