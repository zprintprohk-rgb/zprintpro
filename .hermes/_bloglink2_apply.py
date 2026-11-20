# -*- coding: utf-8 -*-
"""Blog link pack batch 2: zh eco-printing bridge sentence + zh restaurant-menu cross-sell. 2 insertions."""
import io, json, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
BD = os.path.join(ROOT, "src", "data", "blog-data")
BAK = os.path.join(ROOT, ".hermes", "_bak-bloglink2-20261018")
MODE = "apply" if "--apply" in sys.argv else "verify"

PLAN = {
    "zh-hk.json": {
        "eco-printing": [(
            "</tbody></table>\n<h3>三、ESG 報告中的印刷策略</h3>",
            "</tbody></table>\n<p>食品相關採購可搭配 <a href=\"/zh-hk/product/food-boxes/\">食品包裝訂製</a>（食品級紙材、100 個起印、免費打稿），與上表的植物油墨及 PLA 淋膜組合使用。</p>\n<h3>三、ESG 報告中的印刷策略</h3>",
        )],
        "restaurant-menu-printing-guide": [(
            "選擇關鍵 = 餐廳定位 + 更新頻率 + 預算 3 維度,不是單純比單價。",
            "選擇關鍵 = 餐廳定位 + 更新頻率 + 預算 3 維度,不是單純比單價。配套的餐飲包裝可同步安排——外賣與食品盒看 <a href=\"/zh-hk/product/food-boxes/\">食品包裝訂製</a>（食品級紙材、100 個起印）。",
        )],
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
    check(json.dumps(json.loads(raw), ensure_ascii=False, indent=2) + "\n" == raw, fname + " round-trip byte-identical")
    data = json.loads(raw)
    changed = []
    for slug, edits in posts.items():
        c = data[slug]["content"]
        for old, new in edits:
            n = c.count(old)
            check(n == 1, "%s/%s anchor unique (count=%d)" % (fname, slug, n))
            if n == 1: c = c.replace(old, new, 1)
        data[slug]["content"] = c
        changed.append(slug)
    out = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    orig = json.loads(raw)
    diff = [s for s in orig if json.dumps(orig[s], ensure_ascii=False) != json.dumps(data[s], ensure_ascii=False)]
    check(sorted(diff) == sorted(changed), fname + " changed slugs exactly " + str(sorted(changed)))
    newfiles[fname] = out

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for fname, out in newfiles.items():
        shutil.copy2(os.path.join(BD, fname), os.path.join(BAK, fname + ".bak"))
        io.open(os.path.join(BD, fname), "w", encoding="utf-8", newline="").write(out)
        check(open(os.path.join(BD, fname), "rb").read(2)[0] != 0xFF, fname + " no BOM")
        json.loads(io.open(os.path.join(BD, fname), encoding="utf-8", newline="").read())
    print("\nWROTE 1 file, 2 insertions")
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
