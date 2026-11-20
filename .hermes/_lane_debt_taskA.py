# -*- coding: utf-8 -*-
"""Task A: repay lane SOP-5 debt — mirror ts values for kraft/eco desc/h1/alt x3 locales back into
CSV rows, then regen must produce ZERO byte change (ts == CSV mirror restored)."""
import io, os, re, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
CSV_PATH = os.path.join(ROOT, "zprintpro-sku-seo-data.csv")
TS_PATH = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

ts = io.open(TS_PATH, encoding="utf-8", newline="").read()

def block(slug):
    si = ts.find('"%s": {' % slug)
    ei = ts.find('\n  "', si + 4)
    return ts[si:ei if ei > 0 else len(ts)]

def field(entry, loc, key):
    m = re.search(r'"%s":\s*\{.*?"%s":\s*"((?:[^"\\]|\\.)*)"' % (re.escape(loc), key), entry, re.S)
    return m.group(1) if m else ""

def alt_field(entry, loc):
    """imageAlt is a SIBLING of seo: parse the imageAlt object directly."""
    m = re.search(r'"imageAlt":\s*\{[^}]*?"%s":\s*"((?:[^"\\]|\\.)*)"' % re.escape(loc), entry, re.S)
    return m.group(1) if m else ""

def unesc(t):
    return t.replace('\\n', '\n').replace('\\"', '"')

csv_raw = io.open(CSV_PATH, encoding="utf-8", newline="").read()
csv_lines = csv_raw.split("\n")
trailing_nl = csv_raw.endswith("\n")
header = csv_lines[0].split("\t")
COL = {n: i for i, n in enumerate(header)}

print("=== Task A: ts -> CSV mirror for kraft/eco (desc/h1/alt x3) ===")
edits = 0
for slug in ("kraft-paper-bags", "eco-paper-bags"):
    ent = block(slug)
    row_i = None
    for i, ln in enumerate(csv_lines):
        c = ln.split("\t")
        if len(c) > COL["Slug"] and c[COL["Slug"]] == slug:
            row_i = i
            break
    check(row_i is not None, "CSV row for %s" % slug)
    if row_i is None:
        continue
    cells = csv_lines[row_i].split("\t")
    for loc, colname in (("zh-hk", None), ("en", None), ("ja", None)):
        for key, col_zh, col_en, col_ja in (("description", "SEO描述(ZH)", "SEO描述(EN)", "SEO描述(JA)"),
                                            ("h1", "H1标题(ZH)", "H1标题(EN)", "H1标题(JA)"),
                                            ("imageAlt", "图片Alt标签(ZH)", "图片Alt标签(EN)", "图片Alt标签(JA)")):
            colname = {"zh-hk": col_zh, "en": col_en, "ja": col_ja}[loc]
            ts_val = unesc(field(ent, loc, key)) if key != "imageAlt" else unesc(alt_field(ent, loc))
            ci = COL[colname]
            old = cells[ci]
            if old == ts_val:
                print("  same %-18s %s (len %d)" % (slug, colname, len(old)))
                continue
            check(len(ts_val) >= 8, "%s.%s ts value non-trivial (len %d)" % (slug, colname, len(ts_val)))
            cells[ci] = ts_val
            csv_lines[row_i] = "\t".join(cells)
            edits += 1
            print("  WROTE %-18s %s: %d -> %d chars" % (slug, colname, len(old), len(ts_val)))

print("\ntotal cell writes:", edits)
if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    io.open(CSV_PATH, "w", encoding="utf-8", newline="").write("\n".join(csv_lines) + ("\n" if trailing_nl else ""))
    check(open(CSV_PATH, "rb").read(2)[0] != 0xFF, "no BOM")
    print("CSV written")
else:
    print("VERIFY mode (no write)")
sys.exit(2 if errors else 0)
