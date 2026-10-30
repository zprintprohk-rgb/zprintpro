from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib import font_manager

OUT = Path(__file__).with_name("2026-10-30-gsc-window-snapshots.png")
labels = ["28 天窗口\n(日均)", "7 天窗口\n(日均)", "24 小时滚动\n(非趋势)"]
impressions = [20977 / 28, 5498 / 7, 793]
clicks = [497 / 28, 140 / 7, 15]
ctr = [2.37, 2.55, 1.89]

for name in ("Microsoft YaHei", "Noto Sans CJK SC", "SimHei"):
    if any(name.lower() in font.name.lower() for font in font_manager.fontManager.ttflist):
        plt.rcParams["font.sans-serif"] = [name]
        break
plt.rcParams["axes.unicode_minus"] = False

fig, axes = plt.subplots(1, 3, figsize=(13, 4.6), dpi=160)
fig.patch.set_facecolor("#F7F9FC")
color = "#176B87"
series = [
    (impressions, "展示量 / 天", "{:,.0f}"),
    (clicks, "点击量 / 天", "{:,.2f}"),
    (ctr, "CTR（%）", "{:.2f}%"),
]
for ax, (values, title, fmt) in zip(axes, series):
    ax.set_facecolor("white")
    bars = ax.bar(labels, values, color=color, width=0.58)
    ax.set_title(title, fontsize=13, fontweight="bold", pad=12)
    ax.grid(axis="y", alpha=0.18)
    ax.set_axisbelow(True)
    ax.spines[["top", "right"]].set_visible(False)
    ax.tick_params(axis="x", labelsize=9)
    top = max(values)
    ax.set_ylim(0, top * 1.23)
    for bar, value in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + top * 0.035,
                fmt.format(value), ha="center", va="bottom", fontsize=10, fontweight="bold")
fig.suptitle("GSC 不同窗口快照：曝光恢复不等于点击同步增长", fontsize=16, fontweight="bold", y=1.02)
fig.text(0.5, -0.02,
         "来源：gsc-daily-anomaly-2026-10-29.json。28 天截至 10-26；7 天为 10-20～10-26；24 小时为滚动窗口，不作趋势证据。",
         ha="center", fontsize=9, color="#475569")
fig.tight_layout()
fig.savefig(OUT, bbox_inches="tight", facecolor=fig.get_facecolor())
print(OUT)
