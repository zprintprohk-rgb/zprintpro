import json
from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib import font_manager

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / ".hermes/logs/money-keyword-query-evidence-2026-10-31.json"
OUTPUT = ROOT / "docs/assets/2026-10-31-money-keyword-positioning.png"

payload = json.loads(SOURCE.read_text(encoding="utf-8"))
rows = []
for query, matches in payload["matches"].items():
    row = matches[0]["row"]
    position = float(row["排名"])
    if position <= 10:
        group = "首页已验证"
        color = "#157A6E"
    elif position <= 22:
        group = "首页冲刺（11–22）"
        color = "#D58B24"
    else:
        group = "交易页攻坚（23+）"
        color = "#B84A4A"
    rows.append({
        "query": query,
        "impressions": int(row["展示"]),
        "position": position,
        "group": group,
        "color": color,
    })

rows.sort(key=lambda item: item["position"], reverse=True)

font_candidates = [
    "Microsoft YaHei",
    "Noto Sans CJK SC",
    "Noto Sans CJK JP",
    "SimHei",
    "Arial Unicode MS",
]
available = {font.name for font in font_manager.fontManager.ttflist}
for candidate in font_candidates:
    if candidate in available:
        plt.rcParams["font.family"] = candidate
        break
plt.rcParams["axes.unicode_minus"] = False

fig, ax = plt.subplots(figsize=(13, 10), dpi=180)
fig.patch.set_facecolor("#FAFAF7")
ax.set_facecolor("#FAFAF7")
labels = [row["query"] for row in rows]
positions = [row["position"] for row in rows]
colors = [row["color"] for row in rows]
bars = ax.barh(labels, positions, color=colors, height=0.66)

for bar, row in zip(bars, rows):
    ax.text(
        bar.get_width() + 0.65,
        bar.get_y() + bar.get_height() / 2,
        f"{row['position']:.2f} 位 · {row['impressions']} 展示",
        va="center",
        fontsize=9,
        color="#30343B",
    )

ax.axvline(10, color="#157A6E", linestyle="--", linewidth=1.2, alpha=0.8)
ax.text(10.25, len(rows) - 0.25, "首页边界", color="#157A6E", fontsize=9, va="top")
ax.set_xlim(0, 49)
ax.set_xlabel("GSC 平均排名（越靠左越好）", fontsize=11, color="#30343B")
ax.set_title(
    "ZprintPro 带钱词：不是全在 30–40 名，必须分两层攻坚",
    fontsize=17,
    fontweight="bold",
    loc="left",
    pad=22,
    color="#17242B",
)
ax.text(
    0,
    1.015,
    "2026-09-30—2026-10-27 · 全国家口径 · 查询与网页未联接",
    transform=ax.transAxes,
    fontsize=10,
    color="#68727A",
)
ax.grid(axis="x", color="#D9DDD8", linewidth=0.7, alpha=0.75)
ax.set_axisbelow(True)
for spine in ["top", "right", "left"]:
    ax.spines[spine].set_visible(False)
ax.spines["bottom"].set_color("#C7CDC8")
ax.tick_params(axis="y", length=0, labelsize=10)
ax.tick_params(axis="x", colors="#68727A")

handles = [
    plt.Rectangle((0, 0), 1, 1, color="#157A6E"),
    plt.Rectangle((0, 0), 1, 1, color="#D58B24"),
    plt.Rectangle((0, 0), 1, 1, color="#B84A4A"),
]
ax.legend(
    handles,
    ["首页已验证（≤10）", "首页冲刺（11–22）", "交易页攻坚（23+）"],
    loc="lower right",
    frameon=False,
    fontsize=10,
)

fig.text(
    0.01,
    0.012,
    "数据来源：GSC 28 天导出；平均排名为加权均值，不等于每日固定名次。教科書印刷因本档无匹配未绘制。",
    fontsize=8.5,
    color="#68727A",
)
fig.tight_layout(rect=[0, 0.04, 1, 1])
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(OUTPUT, bbox_inches="tight", facecolor=fig.get_facecolor())
print(OUTPUT)
print(f"keywords={len(rows)} bytes={OUTPUT.stat().st_size}")
