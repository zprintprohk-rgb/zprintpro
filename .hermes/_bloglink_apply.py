# -*- coding: utf-8 -*-
"""B-series blog->PDP link pack: 10 edits across 3 locale files.
Truths: food-boxes PDP 100 MOQ / 1-hour free proof / FDA food-grade. v5 links (no inline class).
Verify mode = assertions only; apply mode = backup + sequential replace + post-shape + JSON round-trip."""
import io, json, re, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
BD = os.path.join(ROOT, "src", "data", "blog-data")
BAK = os.path.join(ROOT, ".hermes", "_bak-bloglink-20261017")
MODE = "apply" if "--apply" in sys.argv else "verify"

EDITS = {
    "zh-hk.json": [
        ("食品包裝線符合 FDA 食品接觸標準。",
         "食品包裝線符合 FDA 食品接觸標準，<a href=\"/zh-hk/product/food-boxes/\">食品包裝訂製</a>可 100 個起印並先免費打稿。"),
        ("零售 SKU、食品包裝、藥品",
         "零售 SKU、<a href=\"/zh-hk/product/food-boxes/\">食品包裝</a>、藥品"),
        ("食品級材質，安全衛生",
         "<a href=\"/zh-hk/product/food-boxes/\">食品級材質</a>，安全衛生"),
    ],
    "en.json": [
        ("required for US/EU export.",
         "required for US/EU export. See our <a href=\"/en/product/food-boxes/\">custom food packaging boxes</a> — 100 MOQ, free 1-hour proof."),
        ("food packaging, pharma",
         "<a href=\"/en/product/food-boxes/\">food packaging</a>, pharma"),
        ("across 6 dimensions.",
         "across 6 dimensions. For food and beverage brands, start from <a href=\"/en/product/food-boxes/\">custom food packaging boxes</a> (FDA food-grade stocks, 100 MOQ)."),
    ],
    "ja.json": [
        ("href=\"/ja/blog/\" class=\"text-[#2873F5] hover:underline\">食品パッケージ FDA 認証ガイド",
         "href=\"/ja/blog/food-packaging-printing-guide/\" class=\"text-[#2873F5] hover:underline\">食品パッケージ FDA 認証ガイド"),
        (">食品パッケージ FDA 認証ガイド</a>。</li>",
         ">食品パッケージ FDA 認証ガイド</a>。</li><li><a href=\"/ja/product/food-boxes/\">食品パッケージのオーダーメイド</a>（100 個から・1 時間無料校正）。</li>"),
        ("100 個〜、SF Express HK$500 以上無料、DHL 国際 2-4 日。",
         "100 個〜、SF Express HK$500 以上無料、DHL 国際 2-4 日。食品関連は<a href=\"/ja/product/food-boxes/\">食品パッケージのオーダーメイド</a>（100 個から・1 時間無料校正）が定番です。"),
        ("食品グレード素材、安全衛生",
         "<a href=\"/ja/product/food-boxes/\">食品グレード素材</a>、安全衛生"),
    ],
}

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

newstate = {}
for fname, edits in EDITS.items():
    p = os.path.join(BD, fname)
    s = io.open(p, encoding="utf-8", newline="").read()
    before_links = len(re.findall(r"/product/food-boxes/", s))
    for k, (old, new) in enumerate(edits):
        n = s.count(old)
        check(n == 1, "%s edit#%d oldText unique (count=%d)" % (fname, k, n))
        if n == 1:
            s = s.replace(old, new, 1)
    after_links = len(re.findall(r"/product/food-boxes/", s))
    expected_delta = sum(1 for o, nw in edits if "/product/food-boxes/" in nw)
    check(after_links - before_links == expected_delta, "%s food-boxes link delta %d (expected %d)" % (fname, after_links - before_links, expected_delta))
    try:
        json.loads(s)
        check(True, "%s JSON round-trip valid" % fname)
    except Exception as e:
        check(False, "%s JSON BROKEN: %s" % (fname, e))
    newstate[fname] = s

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for fname, s in newstate.items():
        shutil.copy2(os.path.join(BD, fname), os.path.join(BAK, fname + ".bak"))
        io.open(os.path.join(BD, fname), "w", encoding="utf-8", newline="").write(s)
        b = open(os.path.join(BD, fname), "rb").read(2)
        check(b[0] != 0xFF, "%s no BOM" % fname)
    print("\nWROTE 3 files, 10 edits")
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
