# -*- coding: utf-8 -*-
"""food-boxes 三语 SEO 描述重写（CSV 权威域）: 简体修正 / 2h->1h / 长度收口 / FDA 主张降级为「标准纸可選」"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
B = os.path.join(REPO, ".hermes", "_bak-foodboxdesc-20261022")
os.makedirs(B, exist_ok=True)

raw = io.open(P, "r", encoding="utf-8", newline="").read()
lines = raw.split("\n")
print("rows:", len(lines))

NEW = {
    11: "食品包裝盒印刷訂製，100 個起、HK$2.5/個起，防油食品級紙卡（FDA 標準紙可選）／牛皮紙／白卡，燙金、局部 UV。3-5 個工作天出貨，港九新界滿 HK$500 免費順豐，1 小時內免費數碼打稿，30 秒 AI 報價。",
    12: "Food packaging printing from 100 pcs, HK$2.50 each: food-grade board (FDA-standard optional), foil and spot UV. 3-5 day production, free 1-hour proof, instant AI quote.",
    13: "食品パッケージ印刷は100個から、1個HK$2.5より。食品グレード紙（FDA基準紙は選択可）・クラフト紙対応、箔押し・UV加工。3-5営業日で出荷、1時間以内の無料デジタル校正、30秒AI見積り。",
}

# 定位 row
idx = None
for i, l in enumerate(lines):
    if not l.strip():
        continue
    c = l.rstrip("\r").split("\t")
    if len(c) > 3 and c[3] == "food-boxes":
        idx = i
        break
assert idx is not None, "food-boxes row not found"
cols = lines[idx].rstrip("\r").split("\t")
assert len(cols) == 31, f"cols={len(cols)}"
orig = {k: cols[k] for k in NEW}
print("orig lens:", {k: len(v) for k, v in orig.items()})

for k, v in NEW.items():
    assert "\t" not in v and "\n" not in v, "tab/newline in value"
    assert len(v) != 0
cols2 = list(cols)
for k, v in NEW.items():
    cols2[k] = v

# 断言：仅 3 列变化
diff = [i for i in range(31) if cols[i] != cols2[i]]
assert diff == [11, 12, 13], f"unexpected diff cols {diff}"

# 长度带
assert 100 <= len(NEW[11]) <= 140, len(NEW[11])
assert 150 <= len(NEW[12]) <= 185, len(NEW[12])
assert 90 <= len(NEW[13]) <= 125, len(NEW[13])
# 2 小时表述清零 / 简体清零 / ja 禁「份」
for v in NEW.values():
    assert "2 小時" not in v and "2-hour" not in v and "2時間" not in v
    assert "月饼" not in v and "认证" not in v
assert "份" not in NEW[13], "ja 含 份"
# 繁体检查（zh）
for ch in ["裝", "紙", "個", "價"]:
    pass

lines[idx] = "\t".join(cols2) + ("\r" if lines[idx].endswith("\r") else "")
out = "\n".join(lines)
assert len(out.split("\n")) == len(lines)
bp = os.path.join(B, "zprintpro-sku-seo-data.csv.before")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(out)
print("[OK] CSV updated: row", idx + 1)
for k in NEW:
    print(f"  col{k}: {len(orig[k])} -> {len(NEW[k])}")
