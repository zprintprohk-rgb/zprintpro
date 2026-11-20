from __future__ import annotations

import json
from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

ROOT = Path(r"F:\zprintpro-nextjs")
OUT = ROOT / "docs" / "assets" / "2026-11-20"
DATA = json.loads((OUT / "gsc-small-order-term-comparison.json").read_text(encoding="utf-8"))

plt.rcParams["font.family"] = ["Microsoft YaHei", "Noto Sans CJK SC", "SimHei", "DejaVu Sans"]
plt.rcParams["axes.unicode_minus"] = False
NAVY = "#16324F"
BLUE = "#2F6BFF"
TEAL = "#16A394"
ORANGE = "#F59E0B"
RED = "#D95555"
LIGHT = "#F3F6FA"
GRAY = "#64748B"

clusters = [r for r in DATA["clusters"] if r["cluster"] in {"poster", "sticker", "rush_same_day"}]
labels = ["海报词簇", "贴纸词簇", "即日／急件词簇"]
sep_imps = [r["2026-09-29"]["impressions"] for r in clusters]
nov_imps = [r["2026-11-19"]["impressions"] for r in clusters]
sep_clicks = [r["2026-09-29"]["clicks"] for r in clusters]
nov_clicks = [r["2026-11-19"]["clicks"] for r in clusters]

fig, axes = plt.subplots(1, 2, figsize=(12, 5.4), gridspec_kw={"width_ratios": [1.55, 1]})
fig.patch.set_facecolor("white")
x = np.arange(len(labels))
w = 0.34
bars1 = axes[0].bar(x - w/2, sep_imps, w, label="9 月 29 日导出 · 28 天窗", color="#A8BDD5")
bars2 = axes[0].bar(x + w/2, nov_imps, w, label="11 月 19 日导出 · 28 天窗", color=BLUE)
axes[0].set_title("小单相关词簇：展示没有整体消失", fontsize=15, fontweight="bold", color=NAVY, pad=16)
axes[0].set_ylabel("展示次数（查询表内匹配词簇合计）", color=GRAY)
axes[0].set_xticks(x, labels)
axes[0].legend(frameon=False, loc="upper left", fontsize=9)
axes[0].grid(axis="y", alpha=0.18)
axes[0].set_axisbelow(True)
for bars in [bars1, bars2]:
    axes[0].bar_label(bars, padding=3, fontsize=10, color=NAVY)
axes[0].set_ylim(0, max(nov_imps) * 1.22)

bars3 = axes[1].bar(x - w/2, sep_clicks, w, label="9 月 29 日", color="#A8BDD5")
bars4 = axes[1].bar(x + w/2, nov_clicks, w, label="11 月 19 日", color=TEAL)
axes[1].set_title("但点击仍然很薄", fontsize=15, fontweight="bold", color=NAVY, pad=16)
axes[1].set_ylabel("点击次数", color=GRAY)
axes[1].set_xticks(x, ["海报", "贴纸", "即日／急件"])
axes[1].legend(frameon=False, loc="upper right", fontsize=9)
axes[1].grid(axis="y", alpha=0.18)
axes[1].set_axisbelow(True)
for bars in [bars3, bars4]:
    axes[1].bar_label(bars, padding=3, fontsize=10, color=NAVY)
axes[1].set_ylim(0, 9)
for ax in axes:
    for side in ["top", "right", "left"]:
        ax.spines[side].set_visible(False)
    ax.spines["bottom"].set_color("#D9E1EA")
    ax.tick_params(axis="y", length=0, colors=GRAY)
    ax.tick_params(axis="x", length=0, colors=NAVY)
fig.text(0.01, 0.01, "口径：两个 28 天 GSC 导出档的查询表正则匹配词簇；不是全站总量，也不能推断订单变化。", fontsize=9, color=GRAY)
fig.tight_layout(rect=(0, 0.055, 1, 1))
fig.savefig(OUT / "gsc-small-order-cluster-comparison.png", dpi=180, bbox_inches="tight", facecolor="white")
plt.close(fig)

# Team-based flywheel: one shared evidence spine, bounded production, independent verification.
fig, ax = plt.subplots(figsize=(13, 7.2))
fig.patch.set_facecolor("white")
ax.set_xlim(0, 13)
ax.set_ylim(0, 8)
ax.axis("off")

boxes = [
    (0.4, 5.4, 2.6, 1.35, "GSC＋协同板＋学习账本", "同一证据底座\n缺数据就标记，不造数", NAVY),
    (3.65, 5.4, 2.6, 1.35, "每日增长总控 18:17", "合并 GSC＋交易页\n每轮最多一个 READY 小批", BLUE),
    (6.9, 5.4, 2.6, 1.35, "周六 Blog 19:08", "只补真实信息缺口\n最多一篇，可 NO_OP", TEAL),
    (10.15, 5.4, 2.45, 1.35, "独立验收 07:10", "部署＋线上 URL＋真值\n不替生产者自验", ORANGE),
    (4.95, 2.25, 3.1, 1.35, "周五复盘 20:52", "CTR 单变量＋固定 GEO\n月度资源分配并入", "#7158C8"),
    (0.4, 0.45, 2.6, 1.1, "Watchdog 06:43", "确定性 Python\n只监测，不写内容", GRAY),
]
for x0, y0, width, height, title, body, color in boxes:
    patch = FancyBboxPatch((x0, y0), width, height, boxstyle="round,pad=0.04,rounding_size=0.12", linewidth=1.5, edgecolor=color, facecolor=LIGHT)
    ax.add_patch(patch)
    ax.text(x0 + width/2, y0 + height*0.68, title, ha="center", va="center", fontsize=11.5, color=color, fontweight="bold")
    ax.text(x0 + width/2, y0 + height*0.30, body, ha="center", va="center", fontsize=9.5, color=NAVY, linespacing=1.45)

arrows = [
    ((3.0, 6.08), (3.65, 6.08)),
    ((6.25, 6.08), (6.9, 6.08)),
    ((9.5, 6.08), (10.15, 6.08)),
    ((11.38, 5.35), (7.15, 3.65)),
    ((5.0, 3.55), (2.2, 5.35)),
    ((6.5, 3.65), (6.5, 5.35)),
    ((3.0, 1.0), (11.0, 5.35)),
]
for start, end in arrows:
    ax.add_patch(FancyArrowPatch(start, end, arrowstyle="-|>", mutation_scale=14, linewidth=1.4, color="#8CA0B5", connectionstyle="arc3,rad=0.05"))

ax.text(6.5, 7.55, "ZprintPro 三语 SEO／AEO／GEO 协同飞轮", ha="center", fontsize=19, fontweight="bold", color=NAVY)
ax.text(6.5, 4.25, "生产与验收分离 · 商业真值先于增产 · 7／14／28 天复测后再学习", ha="center", fontsize=11, color=GRAY)
ax.text(7.1, 1.1, "SCALE 只接受完整证据链\nWAITING_K3／HOLD／NO_OP 都是合法停止", ha="center", va="center", fontsize=11, color=RED, fontweight="bold", linespacing=1.5)
fig.tight_layout()
fig.savefig(OUT / "two-week-coordinated-flywheel.png", dpi=180, bbox_inches="tight", facecolor="white")
plt.close(fig)

print("Generated:")
print(OUT / "gsc-small-order-cluster-comparison.png")
print(OUT / "two-week-coordinated-flywheel.png")
