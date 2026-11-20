# -*- coding: utf-8 -*-
"""Post-backport CSV verification: encoding invariants + spot-check batch truths."""
import io

p = r"F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv"
b = open(p, "rb").read()
errs = []
def chk(c, m):
    print(("  OK  " if c else "  FAIL ") + m)
    if not c: errs.append(m)

chk(b[:3] != b"\xef\xbb\xbf", "no BOM")
try:
    b.decode("utf-8"); chk(True, "utf-8 decode OK")
except Exception as e:
    chk(False, "utf-8 decode FAIL: %s" % e)

s = b.decode("utf-8")
lines = [l for l in s.split("\n") if l.strip()]
chk(len(lines) == 84, "row count 84 (header+83) got %d" % len(lines))
colcounts = set(len(l.split("\t")) for l in lines)
chk(colcounts == {31}, "all rows 31 TAB cols, got %s" % colcounts)

# spot-checks: backported truths now in CSV title column
spots = [
    ("same-day-flyers", "HK$0.55"),
    ("a1-posters", "HK$20"),
    ("a2-posters", "HK$16"),
    ("small-batch-stickers", "HK$38/A4"),
]
for slug, want in spots:
    row = next((l for l in lines[1:] if "\t%s\t" % slug in l or l.split("\t")[3] == slug), None)
    chk(row is not None and want in row, "%s title contains %s" % (slug, want))

print("ERRORS: %d" % len(errs))
raise SystemExit(2 if errs else 0)
