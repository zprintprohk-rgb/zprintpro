# -*- coding: utf-8 -*-
import io, os, re, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)

# 1) 贴纸 ja snippet 去掉内部 KPI 尾巴
tail = " 9/4 ja CTR ≥2% 目標: ステッカー印刷/オリジナル/作成/キャラクター/防水/屋外/両面 7 詞 cluster snippet."
c = t.count(tail)
assert c == 1, "tail match " + str(c)
t = t.replace(tail, "")

# 2) educational snippet 双句号修正
old = "ジープリント 工場直送価格.."
c2 = t.count(old)
if c2:
    t = t.replace(old, "ジープリント 工場直送価格.")

# 3) 断言：客户可见字段无 KPI 黑话（排除 // 注释行）
lines = t.split("\n")
bad = [i + 1 for i, ln in enumerate(lines) if not ln.strip().startswith("//") and re.search(r"CTR\s*≥|\bpos\s?\d|imps\b", ln)]
print("visible KPI lines:", bad)
assert not bad

bp = os.path.join(REPO, ".hermes", "_bak-cluster8-20261022", "category-seo-content.ts.kpi")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t)
print("[OK]", n0, "->", len(t))
