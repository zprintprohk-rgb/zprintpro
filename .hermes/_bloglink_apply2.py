# -*- coding: utf-8 -*-
"""B-series blog->PDP link pack v2: structured JSON edit (load -> per-post content edit -> dump).
Round-trip guard: dumps(data)+'\\n' must equal raw bytes BEFORE editing (formatting drift gate)."""
import io, json, os, shutil, sys, re

ROOT = r"F:\zprintpro-nextjs"
BD = os.path.join(ROOT, "src", "data", "blog-data")
BAK = os.path.join(ROOT, ".hermes", "_bak-bloglink-20261017")
MODE = "apply" if "--apply" in sys.argv else "verify"

PLAN = {
    "zh-hk.json": {
        "packaging-box-pricing-2026": [
            ("食品包裝線符合 FDA 食品接觸標準。",
             "食品包裝線符合 FDA 食品接觸標準，<a href=\"/zh-hk/product/food-boxes/\">食品包裝訂製</a>可 100 個起印並先免費打稿。")],
        "packaging-box-price-2026": [
            ("零售 SKU、食品包裝、藥品",
             "零售 SKU、<a href=\"/zh-hk/product/food-boxes/\">食品包裝</a>、藥品")],
        "packaging-trends": [
            ("食品級材質，安全衛生",
             "<a href=\"/zh-hk/product/food-boxes/\">食品級材質</a>，安全衛生")],
    },
    "en.json": {
        "packaging-box-pricing-2026": [
            ("required for US/EU export.",
             "required for US/EU export. See our <a href=\"/en/product/food-boxes/\">custom food packaging boxes</a> — 100 MOQ, free 1-hour proof.")],
        "packaging-box-price-2026": [
            ("food packaging, pharma",
             "<a href=\"/en/product/food-boxes/\">food packaging</a>, pharma")],
        "packaging-trends": [
            ("across 6 dimensions.",
             "across 6 dimensions. For food and beverage brands, start from <a href=\"/en/product/food-boxes/\">custom food packaging boxes</a> (FDA food-grade stocks, 100 MOQ).")],
    },
    "ja.json": {
        "packaging-box-pricing-2026": [
            ("href=\"/ja/blog/\" class=\"text-[#2873F5] hover:underline\">食品パッケージ FDA 認証ガイド",
             "href=\"/ja/blog/food-packaging-printing-guide/\" class=\"text-[#2873F5] hover:underline\">食品パッケージ FDA 認証ガイド"),
            (">食品パッケージ FDA 認証ガイド</a>。</li>",
             ">食品パッケージ FDA 認証ガイド</a>。</li><li><a href=\"/ja/product/food-boxes/\">食品パッケージのオーダーメイド</a>（100 個から・1 時間無料校正）。</li>")],
        "packaging-box-price-2026": [
            ("100 個〜、SF Express HK$500 以上無料、DHL 国際 2-4 日。",
             "100 個〜、SF Express HK$500 以上無料、DHL 国際 2-4 日。食品関連は<a href=\"/ja/product/food-boxes/\">食品パッケージのオーダーメイド</a>（100 個から・1 時間無料校正）が定番です。")],
        "packaging-trends": [
            ("食品グレード素材、安全衛生",
             "<a href=\"/ja/product/food-boxes/\">食品グレード素材</a>、安全衛生")],
    },
}

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

newfiles = {}
for fname, posts in PLAN.items():
    p = os.path.join(BD, fname)
    raw = io.open(p, encoding="utf-8", newline="").read()
    check(json.dumps(json.loads(raw), ensure_ascii=False, indent=2) + "\n" == raw, "%s round-trip+newline byte-identical" % fname)
    data = json.loads(raw)
    before_total = sum(len(re.findall(r"/product/food-boxes/", v.get("content", ""))) for v in data.values())
    changed = []
    for slug, edits in posts.items():
        c = data[slug]["content"]
        for k, (old, new) in enumerate(edits):
            n = c.count(old)
            check(n == 1, "%s/%s edit#%d in-post unique (count=%d)" % (fname, slug, k, n))
            if n == 1:
                c = c.replace(old, new, 1)
        data[slug]["content"] = c
        changed.append(slug)
    out = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    # global shape: only planned slugs differ
    orig = json.loads(raw)
    diff_slugs = [s for s in orig if json.dumps(orig[s], ensure_ascii=False) != json.dumps(data[s], ensure_ascii=False)]
    check(sorted(diff_slugs) == sorted(changed), "%s changed slugs exactly %s (got %s)" % (fname, sorted(changed), sorted(diff_slugs)))
    after_total = sum(len(re.findall(r"/product/food-boxes/", v.get("content", ""))) for v in data.values())
    exp = sum(1 for slug, edits in posts.items() for o, nw in edits if "/product/food-boxes/" in nw)
    check(after_total - before_total == exp, "%s food-boxes delta %d (expected %d)" % (fname, after_total - before_total, exp))
    if fname == "ja.json":
        check("/ja/blog/food-packaging-printing-guide/" in out, "%s repoint landed" % fname)
    newfiles[fname] = out

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for fname, out in newfiles.items():
        shutil.copy2(os.path.join(BD, fname), os.path.join(BAK, fname + ".bak"))
        io.open(os.path.join(BD, fname), "w", encoding="utf-8", newline="").write(out)
        check(open(os.path.join(BD, fname), "rb").read(2)[0] != 0xFF, "%s no BOM" % fname)
        json.loads(io.open(os.path.join(BD, fname), encoding="utf-8", newline="").read())
    print("\nWROTE 3 files (structured edit, 10 in-post edits)")
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
