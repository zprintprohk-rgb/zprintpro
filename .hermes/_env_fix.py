# -*- coding: utf-8 -*-
"""Envelope block truth fix: featuredSnippet/h2 say 100 個起 (matches products.ts minQuantity=100)
but coreAdvantages + techSpecs + FAQ say 500 個起訂 -> align all to 100. Asserts + backup."""
import io, os, re, shutil, sys

P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-envelope-20261024.ts.bak"
APPLY = "--apply" in sys.argv

RULES = [
    ("'500 個起訂（數碼印刷），適合中小企業和初創公司'",
     "'100 個起訂（數碼印刷），適合中小企業和初創公司'"),
    ("{ label: '起訂量', value: '500 個起訂（數碼印刷），5,000 個以上柯式印刷更經濟' }",
     "{ label: '起訂量', value: '100 個起訂（數碼印刷），5,000 個以上柯式印刷更經濟' }"),
    ("{ q: '信封印刷最低多少個起？', a: '500 個起訂（數碼印刷）。",
     "{ q: '信封印刷最低多少個起？', a: '100 個起訂（數碼印刷）。"),
    ("'即日交貨（數碼，500–2,000 個），緊急商務函件不耽誤'",
     "'即日交貨（數碼，100–2,000 個），緊急商務函件不耽誤'"),
    ("{ label: '交期', value: '即日交貨（數碼，500–2,000 個）；標準 2–3 天（柯式）；打樣當日' }",
     "{ label: '交期', value: '即日交貨（數碼，100–2,000 個）；標準 2–3 天（柯式）；打樣當日' }"),
]

s = io.open(P, encoding="utf-8", newline="").read()
errs = []
def chk(c, m):
    print(("  OK  " if c else "  FAIL ") + m)
    if not c: errs.append(m)

def block(txt, key):
    a = txt.find(key)
    if a < 0: return "", a, a
    b = txt.find("{", a); d = 0; k = b; e = None
    while k < len(txt):
        if txt[k] == "{": d += 1
        elif txt[k] == "}":
            d -= 1
            if d == 0: e = k; break
        k += 1
    return txt[a:e], a, e

for old, new in RULES:
    n = s.count(old)
    chk(n == 1, "rule unique (%d): %s" % (n, old[:46]))
    if n == 1: s = s.replace(old, new, 1)

# envelope block residual check (zh segment inside envelopesContent)
env, a, e = block(s, "envelopesContent:")
chk("500 個起訂" not in env, "envelope zh block: '500 個起訂' = 0")
chk(bool(env), "envelope block located (%d chars)" % len(env))

if APPLY:
    if errs:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(s)
    chk(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE envelope truth fix (%d rules)" % len(RULES))
print("ERRORS: %d" % len(errs))
sys.exit(2 if errs else 0)
