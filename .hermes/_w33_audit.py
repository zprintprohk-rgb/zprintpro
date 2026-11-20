# -*- coding: utf-8 -*-
"""W3.3 audits (read-only): nengajo peer SSoT summary + calendars/en-greeting content four-piece state."""
import io, re

ROOT = r"F:\zprintpro-nextjs"

# --- peer nengajo SSoT: key facts only ---
try:
    n = io.open(ROOT + r"\docs\2026-10-15-nengajo-2027-earlybird-page-skeleton.md", encoding="utf-8").read()
    print("=== nengajo SSoT (%d chars) key lines ===" % len(n))
    for ln in n.split("\n"):
        if re.search(r"(NENGAJO_LIVE|K3 三真值|runbook|blog|sitemap|早鳥|早鸟|待)", ln) and len(ln.strip()) > 8:
            print(" ", ln.strip()[:150])
except Exception as ex:
    print("nengajo SSoT read err:", ex)

# --- calendarsContent / greetingCardsContent audits ---
cat = io.open(ROOT + r"\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
for key in ("calendarsContent", "greetingCardsContent"):
    i = cat.find(key + ":")
    print("\n=== %s present: %s ===" % (key, i >= 0))
    if i < 0:
        continue
    seg = cat[i:i + 60000]
    # next content key boundary
    m = re.search(r"\n\w+Content: Record", seg[10:])
    end = 10 + m.start() if m else len(seg)
    seg = seg[:end]
    for loc in ("zh-hk", "en", "ja"):
        li = seg.find("'" + loc + "'")
        lseg = seg[li:li + 12000] if li >= 0 else ""
        if not lseg:
            print(" %s: NOT FOUND" % loc)
            continue
        print(" %s: len~%d | 2027:%d | 聖誕/Christmas/christmas:%d | クリスマス:%d | 年賀状:%d | nengajo:%d" % (
            loc, len(lseg),
            lseg.count("2027"), lseg.count("聖誕") + lseg.count("Christmas") + lseg.count("christmas"),
            lseg.count("クリスマス"), lseg.count("年賀状"), lseg.lower().count("nengajo")))
        print("   faq_n:", lseg.count("question:"), "| featuredSnippet:", "featuredSnippet" in lseg,
              "| blog links:", len(re.findall(r"\]\(/[^)]+/blog/", lseg)))
        print("   blog targets:", sorted(set(re.findall(r"\]\(/[a-z-]+/blog/([a-z0-9-]+)/?\)", lseg)))[:6])
