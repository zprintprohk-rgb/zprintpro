import io, re

# A) verify the 3 orphaned (old-task) dirty files have no residual stale claims
DIRTY = [r"src\data\category-conversion-blocks.ts", r"src\data\category-seo-content.ts", r"src\data\product-faqs.ts"]
resid_pat = re.compile(r'早鳥9折|早鳥預訂|early-bird|early bird|10% off|10月底|10月末|end of October|by late October|lock your order|早鳥訂|早鳥優惠')
cal = re.compile(r'calend|月曆|月历|カレンダー|年曆|年历|Q4', re.I)
print("=== A: dirty-file residual check ===")
bad = 0
for p in DIRTY:
    s = io.open(p, encoding="utf-8").read()
    for m in resid_pat.finditer(s):
        ctx = s[max(0,m.start()-80):m.start()+50]
        if not cal.search(ctx): continue
        ln = s[:m.start()].count("\n")+1
        print("  RESID %s L%d: %r" % (p, ln, ctx.replace("\n","|"))); bad += 1
print("dirty residual:", bad)

# B) new fixes: sku-seo CTAs + blog layer
PAIRS = {
    r"src\data\sku-seo-data.ts": [
        ("and lock early-bird pricing before the Q4 peak.", "and secure your production slot early for the Q4 peak."),
        ("to lock early-bird pricing before the Q4 rush.", "to secure your production slot early for the Q4 rush."),
        ("and secure early-bird pricing before the Q4 rush.", "and secure your production slot early for the Q4 rush."),
    ],
    r"src\data\blog-data\en.json": [
        ("<strong>Q4 is peak season — confirm artwork by late October</strong> to lock production slots.",
         "<strong>Q4 is peak season — confirm artwork as early as possible</strong> to lock production slots."),
        ("Finalize designs in August-September, <strong>confirm by late October</strong> to lock production ahead of the November-",
         "Finalize designs in August-September, <strong>confirm as early as possible</strong> to lock production ahead of the November-"),
        ("Q4 is peak season. Finalize designs in August-September and <strong>confirm by late October</strong> so production and delivery land before",
         "Q4 is peak season. Confirm your designs as early as possible so production and delivery land before"),
    ],
    r"src\data\blog-data\ja.json": [
        ("遅くとも10月末までにご確認ください。", "早めにご確認ください（11月以降の製造枠はお見積り時にご案内します）。"),
        ("可能であれば10月末までのご確認をおすすめします", "可能であれば早めのご確認をおすすめします"),
        ("Q4繁忙期は10月末までに確定", "Q4繁忙期は早めに確定"),
        ("Q4 は10月底までに確認、", "Q4 は早めに確認（11月以降はお見積り時）、"),
        ("<strong>10月底までにデザイン確定</strong>がおすすめ", "<strong>早めにデザイン確定</strong>がおすすめ"),
        ("<strong>10月底までに発注確定</strong>でギフトシーズンに間に合わせましょう",
         "<strong>早めに発注確定</strong>（11月以降はお見積り時）でギフトシーズンに間に合わせましょう"),
    ],
    r"src\data\blog-data\zh-hk.json": [
        ("建議 10 月底前確認訂單", "建議盡早確認訂單（11 月起以報價回覆為準）"),
        ("Q4 高峰 10 月底前確認", "Q4 高峰盡早確認"),
        ("Q4 旺季 10 月底前確認檔期", "Q4 旺季建議盡早確認檔期"),
        ("建議 10 月底前確認設計", "建議盡早確認設計"),
        ("早鳥預訂連免費設計", "預訂連免費設計"),
        ("想 12 月中前收貨，建議 10 月底前確認", "想 12 月中前收貨，建議盡早確認"),
        ("<strong>10 月底前確認</strong>，生產同配送先趕得切送禮檔期",
         "<strong>盡早確認</strong>，生產同配送先趕得切送禮檔期"),
    ],
    r"src\data\blog-posts.ts": [
        ("Q4 旺季 10 月底前確認，附 6 條 FAQ", "Q4 旺季建議盡早確認，附 6 條 FAQ"),
    ],
}
total = 0
for path, pairs in PAIRS.items():
    s = io.open(path, encoding="utf-8", newline="").read()
    ft = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new); ft += n
            print("  x%-2d %s" % (n, old[:70]))
        else:
            print("  !! MISS %s" % old[:70])
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    total += ft
    print("== %s replaced=%d" % (path, ft))
print("TOTAL:", total)

# C) residual rescan across all touched files
print("\n=== C: final rescan (touched files) ===")
allfiles = DIRTY + list(PAIRS.keys())
resid = 0
for p in allfiles:
    s = io.open(p, encoding="utf-8").read()
    for m in resid_pat.finditer(s):
        ctx = s[max(0,m.start()-70):m.start()+40]
        if not cal.search(ctx): continue
        ln = s[:m.start()].count("\n")+1
        print("  LEFT %s L%d: %r" % (p, ln, ctx.replace("\n","|"))); resid += 1
print("final residual:", resid)
