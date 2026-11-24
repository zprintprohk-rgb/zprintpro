import io

PAIRS = [
    ("A5/B5 \u6a19\u66f8\u5c3a\u5bf8 + 24h \u7279\u6025\u5bfe\u5fdc",
     "A5/B5 \u6a19\u66f8\u5c3a\u5bf8 + \u7279\u6025\u5bfe\u5fdc\uff08\u6309\u7a3f\u4ef6\u8207\u6392\u671f\u5831\u50f9\u78ba\u8a8d\uff09"),
    ("Comiket \u524d\u6a23\u66f8\u7279\u6025\u5bfe\u5fdc",
     "Comiket \u524d\u6a23\u66f8\u7279\u6025\u5bfe\u5fdc\uff08\u6309\u7a3f\u4ef6\u8207\u6392\u671f\u5831\u50f9\u78ba\u8a8d\uff09"),
    ("\u53ef\u4ee5\u3002\u540c\u4eba\u8a8c 5 \u672c\u7279\u6025 3 \u5929\u51fa\u8ca8\uff0c10 \u672c\u7279\u6025 2 \u5929\u51fa\u8ca8\u3002",
     "\u53ef\u4ee5\u3002\u7279\u6025\u5bfe\u5fdc\u6309\u7a3f\u4ef6\u8207\u6392\u671f\u5831\u50f9\u78ba\u8a8d\u3002"),
    ("A5/B5 standard sizes + 24h rush service.",
     "A5/B5 standard sizes + rush service (quoted per artwork and schedule)."),
    ("Pre-Comiket rush sample support.",
     "Pre-Comiket rush sample support (quoted per schedule)."),
    ("5-book rush in 3 days, 10-book rush in 2 days. Comiket 24h emergency support.",
     "Rush production quoted per artwork and schedule. Pre-Comiket emergency support available."),
    ("Yes. 5-book rush in 3 days, 10-book rush in 2 days.",
     "Yes. Rush production is quoted per artwork and schedule."),
    ("\u30b3\u30df\u30b1\u524d\u7279\u6025\u30b5\u30f3\u30d7\u30eb\u5bfe\u5fdc",
     "\u30b3\u30df\u30b1\u524d\u7279\u6025\u30b5\u30f3\u30d7\u30eb\u5bfe\u5fdc\uff08\u539f\u7a3f\u30fb\u65e5\u7a0b\u306b\u3088\u308a\u304a\u898b\u7a4d\u308a\uff09"),
    ("\u306f\u3044\u3002\u540c\u4eba\u8a8c5\u90e8\u7279\u60253\u65e5\u300110\u90e8\u7279\u60252\u65e5\u51fa\u8377\u3002",
     "\u306f\u3044\u3002\u7279\u6025\u5bfe\u5fdc\u306f\u539f\u7a3f\u30fb\u65e5\u7a0b\u306b\u3088\u308a\u304a\u898b\u7a4d\u308a\u3068\u306a\u308a\u307e\u3059\u3002"),
]
p = r"src\data\category-seo-content.ts"
s = io.open(p, encoding="utf-8", newline="").read()
total = 0
for old, new in PAIRS:
    n = s.count(old)
    assert n == 1, "expected 1, got %d :: %r" % (n, old[:44])
    s = s.replace(old, new)
    total += n
    print("  x%d %s" % (n, old[:50]))
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("TOTAL:", total)
