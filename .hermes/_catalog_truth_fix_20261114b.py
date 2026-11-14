import io

PAIRS = [
    ("\u9999\u6e2f\u756b\u518a/\u651d\u5f71\u96c6/\u7522\u54c1\u578b\u9304\u5370\u5237\u670d\u52d9\uff0c\u8272\u5f69\u9084\u539f\u5ea6\u9054 95%+\u3002",
     "\u9999\u6e2f\u756b\u518a/\u651d\u5f71\u96c6/\u7522\u54c1\u578b\u9304\u5370\u5237\u670d\u52d9\uff0c\u8272\u5f69\u7ba1\u7406\u4ee5 ICC \u6a94\u6848\u8207\u6253\u6a23\u78ba\u8a8d\u628a\u95dc\u3002"),
    ("printing with 95%+ color accuracy.",
     "printing with color managed via ICC profiles and proof approval."),
    ("\u30ab\u30bf\u30ed\u30b0\u30fb\u5beb\u771f\u96c6\u30fb\u4f5c\u54c1\u96c6\u5370\u5237\u30b5\u30fc\u30d3\u30b9\u3001\u8272\u518d\u73fe\u602795%+\u3002",
     "\u30ab\u30bf\u30ed\u30b0\u30fb\u5beb\u771f\u96c6\u30fb\u4f5c\u54c1\u96c6\u5370\u5237\u30b5\u30fc\u30d3\u30b9\u3001\u8272\u7ba1\u7406\u306fICC\u30d7\u30ed\u30d5\u30a1\u30a4\u30eb\u3068\u6821\u6b63\u78ba\u8a8d\u3067\u7ba1\u7406\u3002"),
]
p = r"src\data\products.ts"
s = io.open(p, encoding="utf-8", newline="").read()
total = 0
for old, new in PAIRS:
    n = s.count(old)
    assert n >= 1, "expected >=1, got %d :: %r" % (n, old[:40])
    s = s.replace(old, new)
    total += n
    print("  x%d %s" % (n, old[:48]))
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print("TOTAL:", total)
