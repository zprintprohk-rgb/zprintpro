# -*- coding: utf-8 -*-
"""ja 指南收口: 3 处 12 業界 + MOQ 50->100"""
import io, os, json, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(REPO, "src", "data", "blog-data", "ja.json")
with io.open(p, "r", encoding="utf-8", newline="") as f:
    j = json.loads(f.read())
c = j["food-packaging-printing-guide"]["content"]
n0 = len(c)

pairs = [
    ("50 個から印刷可能、HK$0.45/個〜", "100 個から印刷可能、HK$0.45/個〜"),
    ("12 業界 多年件超の実証", "多業界での実証"),
    ("PLA 環境トレンドと 12 業界実積", "PLA 環境トレンドと多業界の実績"),
    ("12 業界</strong> で 多年件超の食品包装発注実績を保有", "多業界</strong> での食品包装発注実績を保有"),
]
for old, new in pairs:
    assert c.count(old) == 1, "match %d: %s" % (c.count(old), old)
    c = c.replace(old, new)
assert "12 業界" not in c

j["food-packaging-printing-guide"]["content"] = c
bp = os.path.join(REPO, ".hermes", "_bak-foodguide-20261020", "ja.json.before2")
if not os.path.exists(bp):
    shutil.copy2(p, bp)
with io.open(p, "w", encoding="utf-8", newline="") as f:
    f.write(json.dumps(j, ensure_ascii=False, indent=2) + "\n")
print("[OK] ja guide %d -> %d, 12 業界=0, 50個から=0" % (n0, len(c)))
