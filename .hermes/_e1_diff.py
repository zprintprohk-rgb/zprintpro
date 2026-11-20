import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
bak = open("F:/zprintpro-nextjs/.hermes/_bak-blogdata-en-before-e1-20261027.json", encoding="utf-8").read()
now = open("F:/zprintpro-nextjs/src/data/blog-data/en.json", encoding="utf-8").read()
# 计算唯一差异
import difflib
diffs = list(difflib.unified_diff(bak.split("\n"), now.split("\n"), lineterm="", n=0))
add = [l for l in diffs if l.startswith("+") and not l.startswith("+++")]
rm = [l for l in diffs if l.startswith("-") and not l.startswith("---")]
print("差异行数: 删除", len(rm), "| 新增", len(add))
for l in add:
    if "small-batch-stickers" in l:
        i = l.find("campaigns and")
        print("注入片段:", l[max(0,i):max(0,i)+160])
