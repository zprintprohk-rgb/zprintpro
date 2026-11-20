"""GSC zh-hk 28 天 类目相关 search 按 imps 排序 + 全 locale search distribution."""
import csv
import re
from collections import defaultdict

CSV_PATH = r"F:\zprintpro-nextjs\.hermes\gsc-snapshot-2026-07-29.csv"

# 读 CSV (处理前 2 行可能是 metadata)
with open(CSV_PATH, "r", encoding="utf-8") as f:
    content = f.read()
# 找表头
lines = content.split("\n")
header_idx = None
for i, line in enumerate(lines):
    if "热门查询" in line or "查询" in line:
        header_idx = i
        break
if header_idx is None:
    print("Header not found")
    exit(1)

# 用 csv DictReader
import io
csv_data = "\n".join(lines[header_idx:])
reader = csv.DictReader(io.StringIO(csv_data))

# 类目相关关键词
CATEGORY_KEYWORDS = {
    "纸袋": "紙袋印刷",
    "月曆": "月曆",
    "年曆": "年曆",
    "海報": "海報",
    "貼紙": "貼紙",
    "傳單": "傳單",
    "包装": "包裝",
    "書籍": "書籍",
    "画冊": "畫冊",
    "catalog": "catalog",
    "poster": "poster",
    "sticker": "sticker",
    "flyer": "flyer",
    "calendar": "calendar",
    "bag": "bag",
    "book": "book",
    "label": "label",
}

# 按类目聚合 imps
category_imps = defaultdict(lambda: {"imps": 0, "clicks": 0, "queries": []})

for row in reader:
    if not row.get("热门查询"):
        continue
    query = row["热门查询"]
    try:
        clicks = int(row.get("点击次数", "0") or 0)
        imps = int(row.get("展示", "0") or 0)
        pos = float(row.get("排名", "0") or 0)
    except (ValueError, TypeError):
        continue
    if imps == 0:
        continue
    # 类目匹配
    matched = False
    for kw_key, kw_label in CATEGORY_KEYWORDS.items():
        if kw_key.lower() in query.lower():
            category_imps[kw_label]["imps"] += imps
            category_imps[kw_label]["clicks"] += clicks
            if imps >= 2:  # 收录有意义的
                category_imps[kw_label]["queries"].append((query, imps, pos))
            matched = True
            break

# 按 imps 排序
sorted_cats = sorted(category_imps.items(), key=lambda x: x[1]["imps"], reverse=True)
print("=" * 80)
print(f"GSC 28 天 类目相关搜索词 imps 排序 (K3 截图 8/11 10:33 zh-hk 7/29 24h 数据 + 全 locale)")
print("=" * 80)
for cat_label, data in sorted_cats[:20]:
    print(f"\n【{cat_label}】 总 imps={data['imps']}, clicks={data['clicks']}, queries={len(data['queries'])}")
    for q, imps, pos in sorted(data["queries"], key=lambda x: x[1], reverse=True)[:5]:
        print(f"  - {q} | imps={imps} | pos={pos:.1f}")

# 输出: 月曆 关键词详细 (K3 重点关注)
print()
print("=" * 80)
print("月曆 关键词详细 (K3 截图重点)")
print("=" * 80)
if "月曆" in category_imps:
    for q, imps, pos in sorted(category_imps["月曆"]["queries"], key=lambda x: x[1], reverse=True):
        print(f"  - {q} | imps={imps} | pos={pos:.1f}")
