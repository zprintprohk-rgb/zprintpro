# -*- coding: utf-8 -*-
"""Nengajo 2027 launch (fallback path per approved plan): flip gate + register sitemaps x4.
Truths on page stay marked 確認後更新 (K3 calibration pending — flagged)."""
import io, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
BAK = os.path.join(ROOT, ".hermes", "_bak-nengajo-launch-20261022")
MODE = "apply" if "--apply" in sys.argv else "verify"
DAY = "2026-10-22"

PAGE = os.path.join(ROOT, "src", "app", "[locale]", "nengajo-2027", "page.tsx")

def block(loc, alt):
    return ("<url>\n"
            "    <loc>https://zprintpro.com/%s/nengajo-2027/</loc>\n"
            "    <lastmod>%s</lastmod>\n"
            "    <changefreq>weekly</changefreq>\n"
            "    <priority>0.8</priority>\n"
            "    <xhtml:link rel=\"alternate\" hreflang=\"zh-Hant-HK\" href=\"https://zprintpro.com/zh-hk/nengajo-2027/\" />\n"
            "    <xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"https://zprintpro.com/en/nengajo-2027/\" />\n"
            "    <xhtml:link rel=\"alternate\" hreflang=\"ja-JP\" href=\"https://zprintpro.com/ja/nengajo-2027/\" />\n"
            "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"https://zprintpro.com/zh-hk/nengajo-2027/\" />\n"
            "  </url>\n" % (loc, DAY)) if alt else None

SIMPLE = {"sitemap-zh-hk.xml": "zh-hk", "sitemap-en.xml": "en", "sitemap-ja.xml": "ja", "sitemap.xml": "ALL"}

errors = []
def check(msg, cond):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

# 1) gate flip
ps = io.open(PAGE, encoding="utf-8", newline="").read()
n_gate = ps.count("const NENGAJO_LIVE = false;")
check("gate false occurrences = 1 (got %d)" % n_gate, n_gate == 1)

# 2) sitemaps: each must NOT already have nengajo, and end with </urlset>
newsitemaps = {}
for fname, loc in SIMPLE.items():
    p = os.path.join(ROOT, "public", fname)
    s = io.open(p, encoding="utf-8", newline="").read()
    check(fname + " no nengajo yet", "nengajo" not in s)
    check(fname + " has urlset close", "</urlset>" in s)
    if loc == "ALL":
        # master contains per-locale url blocks; insert three blocks (zh/en/ja) before close
        ins = "".join(block(l, True) for l in ["zh-hk", "en", "ja"])
    else:
        ins = block(loc, True)
    s2 = s.replace("</urlset>", ins + "</urlset>", 1)
    check(fname + " +nengajo blocks", s2.count("nengajo-2027") >= 3)
    newsitemaps[fname] = s2

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    ps2 = ps.replace("const NENGAJO_LIVE = false;", "const NENGAJO_LIVE = true;", 1)
    shutil.copy2(PAGE, os.path.join(BAK, "page.tsx.bak"))
    io.open(PAGE, "w", encoding="utf-8", newline="").write(ps2)
    check("gate flipped", "const NENGAJO_LIVE = true;" in io.open(PAGE, encoding="utf-8", newline="").read())
    for fname, s2 in newsitemaps.items():
        p = os.path.join(ROOT, "public", fname)
        shutil.copy2(p, os.path.join(BAK, fname + ".bak"))
        io.open(p, "w", encoding="utf-8", newline="").write(s2)
        check(fname + " no BOM", open(p, "rb").read(2)[0] != 0xFF)
    print("WROTE: gate=true + 4 sitemaps")
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
