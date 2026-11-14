import io

PAIRS = {
    r"src\data\sku-seo-data.ts": [
        ("After you approve a free digital proof within 4 hours, DHL Express delivers in 2-4 days to the US and worldwide, with free shipping on US orders over $99.",
         "After you approve a digital proof (proof and delivery timing confirmed at quote), free shipping applies on US orders over $99."),
        ("You receive a free digital proof within 4 hours, and nothing goes to press until you approve it.",
         "You receive a digital proof for approval (proof timing confirmed at quote); nothing goes to press until you approve it."),
        ("Get a free digital proof within 1 hour \u2014 message +86 198 8085 1334 on WhatsApp or click the \\\"30-second AI quote\\\" button on this page.",
         "Get a free digital proof \u2014 message +86 198 8085 1334 on WhatsApp or click the \\\"30-second AI quote\\\" button on this page."),
    ],
    r"src\data\products.ts": [
        ("\u9999\u6e2f\u756b\u518a/\u644e\u5f71\u96c6/\u7522\u54c1\u578b\u9304\u5370\u5237\u670d\u52d9\uff0c\u8272\u5f69\u9084\u539f\u5ea6\u9054 95%+\u3002",
         "\u9999\u6e2f\u756b\u518a/\u644e\u5f71\u96c6/\u7522\u54c1\u578b\u9304\u5370\u5237\u670d\u52d9\uff0c\u8272\u5f69\u7ba1\u7406\u4ee5 ICC \u6a94\u6848\u8207\u6253\u6a23\u78ba\u8a8d\u628a\u95dc\u3002"),
        ("printing with 95%+ color accuracy.",
         "printing with color managed via ICC profiles and proof approval."),
        ("\u30ab\u30bf\u30ed\u30b0\u30fb\u5beb\u771f\u96c6\u30fb\u4f5c\u54c1\u96c6\u5370\u5237\u30b5\u30fc\u30d3\u30b9\u3001\u8272\u518d\u73fe\u602795%+\u3002",
         "\u30ab\u30bf\u30ed\u30b0\u30fb\u5beb\u771f\u96c6\u30fb\u4f5c\u54c1\u96c6\u5370\u5237\u30b5\u30fc\u30d3\u30b9\u3001\u8272\u7ba1\u7406\u306fICC\u30d7\u30ed\u30d5\u30a1\u30a4\u30eb\u3068\u6821\u6b63\u78ba\u8a8d\u3067\u7ba1\u7406\u3002"),
        ("\u9999\u6e2f\u756b\u518a/\u644e\u5f71\u96c6/\u7522\u54c1\u578b\u9304\u5370\u5237\u670d\u52d9\uff0c\u8272\u5f69\u9084\u539f\u5ea6\u9054 95%+\u3002",
         "\u9999\u6e2f\u756b\u518a/\u644e\u5f71\u96c6/\u7522\u54c1\u578b\u9304\u5370\u5237\u670d\u52d9\uff0c\u8272\u5f69\u7ba1\u7406\u4ee5 ICC \u6a94\u6848\u8207\u6253\u6a23\u78ba\u8a8d\u628a\u95dc\u3002"),
    ],
}
total = 0
for path, pairs in PAIRS.items():
    s = io.open(path, encoding="utf-8", newline="").read()
    for old, new in pairs:
        n = s.count(old)
        assert n == 1, "%s: expected 1, got %d :: %r" % (path, n, old[:50])
        s = s.replace(old, new)
        total += n
        print("  x%d %s" % (n, old[:58]))
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
print("TOTAL:", total)
