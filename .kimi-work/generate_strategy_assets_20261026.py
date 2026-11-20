from pathlib import Path
import json
import math
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

ROOT = Path(r"F:\zprintpro-nextjs")
OUT = ROOT / "docs" / "evidence" / "2026-10-26"
OUT.mkdir(parents=True, exist_ok=True)
data = json.loads((ROOT / ".hermes/logs/gsc-deep-analysis-2026-10-26.json").read_text(encoding="utf-8"))

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.sans-serif": ["Microsoft YaHei", "Noto Sans CJK SC", "SimHei", "DejaVu Sans"],
    "axes.unicode_minus": False,
    "figure.facecolor": "#F7F8FA",
    "axes.facecolor": "#FFFFFF",
    "axes.edgecolor": "#D9DEE7",
    "axes.titleweight": "bold",
    "font.size": 10,
})
NAVY = "#17233C"
BLUE = "#356AE6"
TEAL = "#119C8B"
ORANGE = "#ED8B33"
RED = "#D94B4B"
GRAY = "#738096"
PREV = "#B9C3D3"

# Figure 1: full-property, date × page scope only.
locales = ["zh-hk", "en", "ja"]
rows = {r["locale"]: r for r in data["full_locale"]}
fig, axes = plt.subplots(1, 2, figsize=(12.6, 5.5))
fig.suptitle("三语言站近 28 天：曝光与点击并未同向变化", fontsize=17, fontweight="bold", color=NAVY, y=0.98)
fig.text(0.5, 0.915, "2026-09-28～10-25 对比 2026-08-31～09-27｜GSC date × page 口径", ha="center", color=GRAY)
for ax, metric, title in zip(axes, ["imps", "clicks"], ["展示量", "点击量"]):
    x = list(range(len(locales)))
    prev = [rows[l][f"{metric}_prev"] for l in locales]
    cur = [rows[l][f"{metric}_cur"] for l in locales]
    width = 0.34
    b1 = ax.bar([i-width/2 for i in x], prev, width, label="前 28 天", color=PREV)
    b2 = ax.bar([i+width/2 for i in x], cur, width, label="当前 28 天", color=BLUE)
    ax.set_xticks(x, ["香港站 zh-hk", "英文站 en", "日文站 ja"])
    ax.set_title(title, color=NAVY, pad=12)
    ax.grid(axis="y", alpha=0.16)
    ax.set_axisbelow(True)
    ax.spines[["top", "right"]].set_visible(False)
    ax.bar_label(b1, padding=3, color=GRAY, fontsize=9)
    ax.bar_label(b2, padding=3, color=NAVY, fontsize=9, fontweight="bold")
    ax.set_ylim(0, max(prev+cur)*1.34)
    for i, l in enumerate(locales):
        r = rows[l]
        delta = (r[f"{metric}_cur"] / r[f"{metric}_prev"] - 1) * 100
        ax.text(i, max(r[f"{metric}_cur"], r[f"{metric}_prev"])*1.22,
                f"{delta:+.1f}%", ha="center", color=TEAL if delta >= 0 else RED, fontweight="bold")
axes[0].legend(frameon=False, loc="upper right")
ctr_note = "CTR：" + "｜".join(f"{l} {rows[l]['ctr_prev']*100:.2f}% → {rows[l]['ctr_cur']*100:.2f}%" for l in locales)
fig.text(0.5, 0.025, ctr_note, ha="center", color=NAVY, fontsize=10)
fig.tight_layout(rect=[0.02, 0.07, 0.98, 0.89])
fig.savefig(OUT / "gsc-locale-28d-comparison.png", dpi=180, bbox_inches="tight")
plt.close(fig)

# Figure 2: selected commercial opportunities, query × country scope.
wanted = {
    "small batch sticker printing", "small batch stickers", "doujinshi printing",
    "saddle stitch booklet printing", "china catalog printing", "large envelopes",
    "コミケ 印刷", "卒アル販売", "教材 印刷製本"
}
points = [r for r in data["locale_opportunities"] if r["query"] in wanted]
fig, ax = plt.subplots(figsize=(12.8, 7.2))
ax.axhspan(0, 10, color="#E7F5EF", alpha=0.9, zorder=0)
ax.axhline(10, color=TEAL, linestyle="--", linewidth=1.2)
ax.text(176, 9.1, "首页线（平均排名 10）", ha="right", color=TEAL, fontweight="bold")
for locale, color in [("en", BLUE), ("ja", ORANGE)]:
    subset = [r for r in points if r["locale"] == locale]
    ax.scatter([r["imps_cur"] for r in subset], [r["pos_cur"] for r in subset],
               s=[55 + r["imps_cur"]*1.3 for r in subset], color=color, alpha=0.78,
               edgecolor="white", linewidth=1.2, label="英文站" if locale == "en" else "日文站", zorder=3)
offsets = {
    "small batch sticker printing": (5, 10), "small batch stickers": (5, -18),
    "doujinshi printing": (7, 8), "saddle stitch booklet printing": (7, -18),
    "china catalog printing": (7, 8), "large envelopes": (7, -16),
    "コミケ 印刷": (-70, 10), "卒アル販売": (7, 10), "教材 印刷製本": (7, 8),
}
for r in points:
    ax.annotate(f"{r['query']}\n{r['imps_cur']:.0f} 展示 / {r['pos_cur']:.1f} 位 / {r['clicks_cur']:.0f} 点击",
                (r["imps_cur"], r["pos_cur"]), xytext=offsets.get(r["query"], (7, 8)),
                textcoords="offset points", fontsize=9, color=NAVY)
ax.set_xlim(0, 185)
ax.set_ylim(25.5, 1.5)
ax.set_xlabel("当前 28 天展示量（本站该词获得展示，不等于市场搜索量）", color=NAVY)
ax.set_ylabel("平均排名（越靠上越好）", color=NAVY)
ax.set_title("en / ja 带钱词机会图：先修复近首页与曝光退场，再攻深水大词", fontsize=16, color=NAVY, pad=16)
ax.grid(alpha=0.14)
ax.spines[["top", "right"]].set_visible(False)
ax.legend(frameon=False, loc="lower right")
fig.text(0.5, 0.015, "GSC query × country，2026-09-28～10-25；低样本词的排名波动需谨慎解读", ha="center", color=GRAY)
fig.tight_layout(rect=[0.02, 0.05, 0.98, 0.98])
fig.savefig(OUT / "en-ja-commercial-opportunities.png", dpi=180, bbox_inches="tight")
plt.close(fig)

# Figure 3: operating model, using current scheduler SSoT rather than stale attachment times.
fig, ax = plt.subplots(figsize=(13.5, 7.5))
ax.set_xlim(0, 13.5)
ax.set_ylim(0, 8)
ax.axis("off")

def box(x, y, w, h, title, body, color):
    p = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.025,rounding_size=0.12",
                       linewidth=1.4, edgecolor=color, facecolor="white")
    ax.add_patch(p)
    ax.text(x+w/2, y+h-0.38, title, ha="center", va="center", fontsize=13, fontweight="bold", color=color)
    ax.text(x+w/2, y+h/2-0.25, body, ha="center", va="center", fontsize=10, color=NAVY, linespacing=1.55)
    return p

def arrow(x1, y1, x2, y2, color=GRAY, style="-|>"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style, mutation_scale=15,
                                 linewidth=1.4, color=color, connectionstyle="arc3,rad=0"))

ax.text(6.75, 7.63, "双引擎不是双头写稿，而是「判定权」与「执行权」分离", ha="center", fontsize=17, fontweight="bold", color=NAVY)
box(4.45, 6.1, 4.6, 1.05, "K3｜唯一业务真值拍板层", "规格 / 价格 / MOQ / 交期 / 认证 / 高风险承诺", RED)
box(0.55, 3.85, 5.25, 1.55, "Kimi｜战略审计层", "统一 GSC 口径 · 词页诊断 · 优先级\n冻结/解冻判定 · KPI 验收 · 下周指令", BLUE)
box(7.7, 3.85, 5.25, 1.55, "DeepSeek｜原子执行层", "读取指令 · 小批修改 · 门童验证\n失败即停 · 当日报告 · 不自行改战略", ORANGE)
box(3.55, 1.38, 6.4, 1.45, ".hermes｜文件契约与结果总线", "weekly-directives → 执行 → lane-runs / lane-status\n同一数据源、同一任务 ID、同一验收阈值", TEAL)
box(0.55, 0.1, 2.35, 0.85, "GSC + 线上探针", "证据输入，不看自报成功", NAVY)
box(10.6, 0.1, 2.35, 0.85, "K3 决策包", "只提交真正需拍板项", RED)
arrow(6.75, 6.1, 3.2, 5.42, RED)
arrow(6.75, 6.1, 10.3, 5.42, RED)
arrow(3.2, 3.85, 6.0, 2.83, BLUE)
arrow(10.3, 3.85, 7.5, 2.83, ORANGE)
arrow(5.55, 3.85, 8.1, 3.15, BLUE)
ax.text(6.75, 3.35, "仅下发已拍板、可验收任务", ha="center", fontsize=9, color=GRAY)
arrow(2.9, 0.95, 4.4, 1.65, NAVY)
arrow(1.75, 0.95, 1.75, 3.85, NAVY)
arrow(9.95, 1.65, 11.65, 0.95, RED)
ax.text(6.75, 0.55, "现行执行时刻以 .hermes/cron-lanes.json 为准：GSC 20:13｜内容 21:17｜周五 20:52｜周六 23:47｜月度 1 日 12:13",
        ha="center", fontsize=9.4, color=NAVY)
fig.tight_layout()
fig.savefig(OUT / "dual-engine-operating-model.png", dpi=180, bbox_inches="tight")
plt.close(fig)

for p in sorted(OUT.glob("*.png")):
    print(f"{p.name}\t{p.stat().st_size} bytes")
