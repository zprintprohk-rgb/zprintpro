import io, re

FILES = [
    r"src\data\products-content.ts",
    r"src\data\sku-seo-data.ts",
    r"src\data\category-seo-content.ts",
    r"src\app\[locale]\services\catalog-printing-china\page.tsx",
    r"src\app\[locale]\services\business-cards-printing\page.tsx",
]

PAIRS = [
    # products-content.ts leftover (6 + 2)
    ("ZprintPro is FSC-certified and internationally certified.", "ZprintPro is FSC-certified."),
    ("FSC-certified paper, ISO 12647 color management, internationally certified.</em>",
     "FSC-certified paper, ISO 12647 color management.</em>"),
    # sku-seo-data.ts leftovers
    ("FSC, internationally certified. Same-day file confirmation", "FSC-certified. Same-day file confirmation"),
    ("Production is internationally certified with FSC-conscious materials",
     "Production is quality-managed with FSC-conscious materials"),
    ("Production is internationally certified, and files are confirmed for print",
     "Production is quality-managed, and files are confirmed for print"),
    ("Production is internationally certified, with a free digital proof before",
     "Production is quality-managed, with a free digital proof before"),
    ("internationally certified QC.", "quality-managed QC."),
    ("soy-ink declaration and internationally certified QC reports for procurement audits.",
     "soy-ink declaration and QC reports for procurement audits."),
    ("backed by an internationally certified factory in Asia, over a decade of",
     "backed by a quality-managed factory in Asia, over a decade of"),
    # category-seo-content.ts leftovers
    ("DHL 全球 2-4 天配送 + FSC 認證紙材 + 國際品質認證。", "DHL 全球 2-4 天配送 + FSC 認證紙材。"),
    ("value: 'FSC 認證紙 + 大豆油墨 + 國際認證體系 + 可回收'", "value: 'FSC 認證紙 + 大豆油墨 + 可回收'"),
    ("value: 'FSC-certified + soy ink + internationally certified + recyclable'",
     "value: 'FSC-certified + soy ink + recyclable'"),
    # catalog-printing-china leftovers
    ("desc: 'Shenzhen factory internationally certified, over a decade of printing experience",
     "desc: 'Shenzhen factory quality-managed, over a decade of printing experience"),
    ("Shenzhen factory has over a decade of printing experience, internationally certified, FSC paper certified",
     "Shenzhen factory has over a decade of printing experience, quality-managed, FSC paper certified"),
    # business-cards leftovers
    ("30-second AI quote, internationally certified.'", "30-second AI quote.'"),
]

TARGET = re.compile(r'國際認證體系|國際品質認證|国際品質認証|internationally certified|international quality certification')
total = 0
for path in FILES:
    s = io.open(path, encoding="utf-8", newline="").read()
    before = len(TARGET.findall(s))
    if before == 0:
        print("skip:", path); continue
    for old, new in PAIRS:
        n = s.count(old)
        if n:
            s = s.replace(old, new); total += n
            print("  x%-3d %r" % (n, old[:90]))
    after = len(TARGET.findall(s))
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    print("== %s: %d -> %d" % (path, before, after))
print("TOTAL:", total)
print("\n=== RESIDUE ===")
bad = 0
for path in FILES:
    s = io.open(path, encoding="utf-8").read()
    for m in TARGET.finditer(s):
        bad += 1
        ln = s[:m.start()].count("\n")+1
        print("  %s L%d: %r" % (path, ln, s[max(0,m.start()-60):m.start()+60]))
print("RESIDUE_COUNT =", bad)
