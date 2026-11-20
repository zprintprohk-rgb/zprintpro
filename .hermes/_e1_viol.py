import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
raw = open(r"F:\zprintpro-nextjs\src\data\blog-data\en.json", encoding="utf-8").read()
old = "campaigns and small-batch restocking for cross-border sellers."
new = "campaigns and <a href=\"/en/product/small-batch-stickers/\">small-batch restocking for cross-border sellers</a>."
raw2 = raw.replace(old, new)
# 违规词扫描 (注入段)
i = raw2.find("small-batch restocking")
seg = raw2[i-100:i+100]
for w in ["名片", "智印印港", "Tiffany", "Mohawk", "GSC", "pos 2", "imps"]:
    if w in seg:
        print(f"⚠️ 命中违规词: {w}")
print("注入段违规扫描完成 (无输出=干净)")
print("注入段:", seg.replace("\\n"," ")[:160])
