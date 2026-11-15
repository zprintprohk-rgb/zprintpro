import io

PAIRS = {
    r"src\data\category-seo-content.ts": [
        ("heading: '2. \u5c0f\u6279\u91cf\u53cb\u597d\uff1a1 \u672c\u8d77\u8a02\uff0c\u6578\u78bc\u5370\u5237\u6309\u9700\u751f\u7522'",
         "heading: '2. \u5c0f\u6279\u91cf\u53cb\u597d\uff1a10 \u672c\u8d77\u8a02\uff0c\u6578\u78bc\u5370\u5237\u6309\u9700\u751f\u7522'"),
        ("1 \u672c\u8d77\u8a02\uff08\u6578\u78bc\u5370\u5237\uff09\uff0c\u9069\u5408\u81ea\u8cbb\u51fa\u7248",
         "10 \u672c\u8d77\u8a02\uff08\u6578\u78bc\u5370\u5237\uff09\uff0c\u9069\u5408\u81ea\u8cbb\u51fa\u7248"),
        ("1 \u672c\u8d77\u8a02\uff08\u6578\u78bc\u5370\u5237\uff09\uff0c100 \u672c\u4ee5\u4e0a\u67ef\u5f0f\u5370\u5237\u66f4\u7d93\u6fdf",
         "10 \u672c\u8d77\u8a02\uff08\u6578\u78bc\u5370\u5237\uff09\uff0c100 \u672c\u4ee5\u4e0a\u67ef\u5f0f\u5370\u5237\u66f4\u7d93\u6fdf"),
        ("1 \u672c\u8d77\u8a02\uff08\u6578\u78bc\u5370\u5237\uff09\u3002100 \u672c\u4ee5\u4e0a\u67ef\u5f0f\u5370\u5237\u66f4\u7d93\u6fdf\uff0c\u8272\u5f69\u66f4",
         "10 \u672c\u8d77\u8a02\uff08\u6578\u78bc\u5370\u5237\uff09\u3002100 \u672c\u4ee5\u4e0a\u67ef\u5f0f\u5370\u5237\u66f4\u7d93\u6fdf\uff0c\u8272\u5f69\u66f4"),
    ],
    r"src\data\products.ts": [
        ("10 \u5f35\u8d77\u5370\uff0cHK$0.18\u8d77/\u5f35\u3002",
         "10 \u5f35\u8d77\u5370\uff0cHK$0.25 \u8d77/\u5f35\u3002"),
    ],
    r"src\data\category-conversion-blocks.ts": [
        ("A2 128g\u9285\u7248\u7d19 HK$6-9/\u5f35\u3001A1 HK$10-16/\u5f35",
         "A2 128g\u9285\u7248\u7d19 \u7531 HK$16/\u5f35 \u8d77\u3001A1 \u7531 HK$20/\u5f35 \u8d77"),
    ],
}
total = 0
for path, pairs in PAIRS.items():
    s = io.open(path, encoding="utf-8", newline="").read()
    for old, new in pairs:
        n = s.count(old)
        assert n == 1, "%s: expected 1, got %d :: %r" % (path, n, old[:40])
        s = s.replace(old, new)
        total += n
        print("  x%d %s" % (n, old[:56]))
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
print("TOTAL:", total)
