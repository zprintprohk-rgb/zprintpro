from pathlib import Path
import json
import math
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle

ROOT = Path(r"F:\zprintpro-nextjs")
WORK = ROOT / ".kimi-work" / "packaging-research-20261026"
OUT = ROOT / "docs" / "evidence" / "2026-10-26"
OUT.mkdir(parents=True, exist_ok=True)

# Prefer installed CJK fonts; fall back to the runtime's bundled fonts.
font_candidates = [
    "Microsoft JhengHei", "Microsoft YaHei", "Noto Sans CJK TC",
    "Noto Sans CJK JP", "Yu Gothic", "SimHei", "Arial Unicode MS",
]
available = {f.name for f in font_manager.fontManager.ttflist}
font = next((name for name in font_candidates if name in available), "DejaVu Sans")
plt.rcParams["font.family"] = font
plt.rcParams["axes.unicode_minus"] = False

with (WORK / "packaging-local-evidence.json").open("r", encoding="utf-8") as f:
    data = json.load(f)

order = [
    ("en", "包裝盒/packaging boxes"),
    ("en", "食品包裝/food packaging"),
    ("ja", "包裝盒/packaging boxes"),
    ("zh-hk", "包裝盒/packaging boxes"),
    ("zh-hk", "食品包裝/food packaging"),
]
rows = {(r["locale"], r["cluster"]): r for r in data["clusters"]}
rows = [rows[k] for k in order]
labels = [
    "EN\nPackaging boxes", "EN\nFood packaging", "JA\nPackaging boxes",
    "ZH-HK\nPackaging boxes", "ZH-HK\nFood packaging",
]
prev = [r["imps_prev"] for r in rows]
cur = [r["imps_cur"] for r in rows]

fig, ax = plt.subplots(figsize=(16, 9), dpi=100)
fig.patch.set_facecolor("#F7F8FA")
ax.set_facecolor("#F7F8FA")
x = list(range(len(rows)))
w = 0.34
bars_prev = ax.bar([i - w / 2 for i in x], prev, width=w, color="#A8B0BD", label="前期 28 天（08-31—09-27）")
bars_cur = ax.bar([i + w / 2 for i in x], cur, width=w, color="#176B5B", label="当前 28 天（09-28—10-25）")
ax.set_xticks(x, labels, fontsize=12)
ax.set_ylabel("展示量（query × page × country 口径）", fontsize=12)
ax.set_ylim(0, 465)
ax.grid(axis="y", alpha=0.18, linewidth=0.8)
ax.set_axisbelow(True)
for spine in ax.spines.values():
    spine.set_visible(False)
ax.tick_params(axis="y", length=0, labelsize=11)
ax.tick_params(axis="x", length=0, pad=12)
ax.legend(loc="upper left", frameon=False, fontsize=11, ncol=2, bbox_to_anchor=(0, 1.02))

for i, (b1, b2, r) in enumerate(zip(bars_prev, bars_cur, rows)):
    ax.text(b1.get_x() + b1.get_width() / 2, b1.get_height() + 8, f"{int(r['imps_prev'])}", ha="center", va="bottom", fontsize=11, color="#596270")
    ax.text(b2.get_x() + b2.get_width() / 2, b2.get_height() + 8, f"{int(r['imps_cur'])}", ha="center", va="bottom", fontsize=11, color="#176B5B", fontweight="bold")
    sign = "改善" if r["pos_delta"] < 0 else "回落"
    arrow = "↑" if r["pos_delta"] < 0 else "↓"
    color = "#176B5B" if r["pos_delta"] < 0 else "#A04A36"
    note = f"加权排名 {r['pos_prev']:.1f} → {r['pos_cur']:.1f}\n{sign} {abs(r['pos_delta']):.1f} 位 {arrow}"
    ax.text(i, max(prev[i], cur[i]) + 52, note, ha="center", va="bottom", fontsize=10.5, color=color, linespacing=1.5)

fig.suptitle("包装盒五词簇：前后 28 天 GSC 对比", x=0.07, y=0.955, ha="left", fontsize=24, fontweight="bold", color="#17212B")
fig.text(0.07, 0.895, "展示量下降不等于排名下降：ZH-HK 包装盒簇展示减少 140，但加权排名改善 10.4 位。", fontsize=14, color="#3D4956")
fig.text(0.07, 0.035, "数据来源：ZprintPro GSC 导出；位置按展示量加权。词簇为本次研究定义，不等于全站总流量。", fontsize=10.5, color="#687382")
fig.subplots_adjust(left=0.07, right=0.97, top=0.78, bottom=0.15)
fig.savefig(OUT / "packaging-gsc-28d-comparison.png", facecolor=fig.get_facecolor())
plt.close(fig)

# Conceptual flywheel: strategy sequence, not a measured causal model.
fig, ax = plt.subplots(figsize=(16, 9), dpi=100)
fig.patch.set_facecolor("#F7F8FA")
ax.set_facecolor("#F7F8FA")
ax.set_xlim(0, 16)
ax.set_ylim(0, 9)
ax.axis("off")
ax.text(0.8, 8.25, "包装盒词簇：证据驱动的 SEO／AEO／GEO 飞轮", fontsize=24, fontweight="bold", color="#17212B")
ax.text(0.8, 7.72, "先统一真值与主 URL，再扩写；以 GSC 与合格询盘决定是否进入下一轮。", fontsize=14, color="#3D4956")

nodes = [
    ("01  真值与资产修复", "MOQ／价格／交期／认证\n清理冲突与无来源宣称", "#E9F2EF", "#176B5B"),
    ("02  唯一主 URL 承接", "类目接选型与通用词\nPDP 接采购词，Blog 接问题", "#EAF0F7", "#315D85"),
    ("03  采购答案完整化", "BLUF＋规格／盒型／价格条件\n刀模／打样／限制边界", "#F3EFE6", "#8A6728"),
    ("04  可核验证据建设", "实物照片／展开图／检查记录\n认证范围与案例证据", "#F2EBF3", "#73517B"),
    ("05  GSC／询盘反馈", "主 URL 展示份额／排名／CTR\n合格询盘与下单，28 天复核", "#E9F2EF", "#176B5B"),
]
centers = [(8, 6.25), (12.25, 4.65), (10.65, 1.75), (5.35, 1.75), (3.75, 4.65)]
box_w, box_h = 3.55, 1.18
for (title, body, fill, edge), (cx, cy) in zip(nodes, centers):
    box = FancyBboxPatch((cx - box_w / 2, cy - box_h / 2), box_w, box_h,
                         boxstyle="round,pad=0.12,rounding_size=0.18",
                         facecolor=fill, edgecolor=edge, linewidth=1.6)
    ax.add_patch(box)
    ax.text(cx, cy + 0.22, title, ha="center", va="center", fontsize=13.5, fontweight="bold", color=edge)
    ax.text(cx, cy - 0.23, body, ha="center", va="center", fontsize=10.5, color="#38434E", linespacing=1.45)

for i in range(len(centers)):
    x1, y1 = centers[i]
    x2, y2 = centers[(i + 1) % len(centers)]
    dx, dy = x2 - x1, y2 - y1
    dist = math.hypot(dx, dy)
    # Trim arrow ends to the approximate box boundary.
    trim = 1.65 if abs(dx) > abs(dy) else 0.72
    sx, sy = x1 + dx / dist * trim, y1 + dy / dist * trim
    ex, ey = x2 - dx / dist * trim, y2 - dy / dist * trim
    arrow = FancyArrowPatch((sx, sy), (ex, ey), arrowstyle="-|>", mutation_scale=18,
                            linewidth=1.8, color="#7A8793", connectionstyle="arc3,rad=-0.08")
    ax.add_patch(arrow)

center = Circle((8, 4.0), 1.05, facecolor="#17212B", edgecolor="none")
ax.add_patch(center)
ax.text(8, 4.18, "修复现有资产", ha="center", va="center", fontsize=15, fontweight="bold", color="white")
ax.text(8, 3.75, "不是批量造页", ha="center", va="center", fontsize=12.5, color="#DDE6E3")
ax.text(0.8, 0.45, "停止规则：真值冲突立即停发；两轮 28 天仍无展示集中或排名改善，则停止扩写并复查意图、索引、竞品与证据。", fontsize=11, color="#A04A36")
fig.subplots_adjust(left=0, right=1, top=1, bottom=0)
fig.savefig(OUT / "packaging-evidence-flywheel.png", facecolor=fig.get_facecolor())
plt.close(fig)

for p in [OUT / "packaging-gsc-28d-comparison.png", OUT / "packaging-evidence-flywheel.png"]:
    print(f"{p}: {p.stat().st_size} bytes; font={font}")
