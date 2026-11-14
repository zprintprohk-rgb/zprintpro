from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle
import numpy as np

OUT = Path(__file__).with_name("social-seo-geo-ai-flywheel-2026-11-14.png")
plt.rcParams["font.family"] = ["Microsoft YaHei", "SimHei", "DejaVu Sans"]
plt.rcParams["axes.unicode_minus"] = False

fig, ax = plt.subplots(figsize=(14, 9), dpi=180)
fig.patch.set_facecolor("#F7F8FA")
ax.set_facecolor("#F7F8FA")
ax.set_xlim(-7.4, 7.4)
ax.set_ylim(-5.1, 5.0)
ax.axis("off")

labels = [
    ("① 事实注册表", "产品规格｜真实案例｜价格与交期证据"),
    ("② 搜索需求资产", "带钱词落地页｜指南｜FAQ｜原创影像"),
    ("③ 平台原生分发", "短视频｜轮播｜文档｜Pin｜LINE／X"),
    ("④ 对话与询价", "UTM 进站｜WhatsApp 预填规格｜人工接管"),
    ("⑤ 订单与问题回流", "真实采购疑义｜文件问题｜成交与未成交原因"),
    ("⑥ 内容与页面迭代", "补证据｜改答案｜更新内链｜淘汰低效主题"),
]
colors = ["#173F35", "#235F50", "#2E7D6B", "#B07B2D", "#8C5B35", "#4A5D78"]
angles = np.linspace(np.pi / 2, np.pi / 2 - 2 * np.pi, len(labels), endpoint=False)
positions = [(5.1 * np.cos(a), 3.45 * np.sin(a)) for a in angles]
box_w, box_h = 3.8, 1.2

for i, ((title, subtitle), (x, y), color) in enumerate(zip(labels, positions, colors)):
    shadow = FancyBboxPatch((x - box_w / 2 + 0.05, y - box_h / 2 - 0.06), box_w, box_h,
                            boxstyle="round,pad=0.08,rounding_size=0.16",
                            linewidth=0, facecolor="#D9DDE2", alpha=0.55, zorder=1)
    box = FancyBboxPatch((x - box_w / 2, y - box_h / 2), box_w, box_h,
                         boxstyle="round,pad=0.08,rounding_size=0.16",
                         linewidth=1.0, edgecolor=color, facecolor="white", zorder=2)
    ax.add_patch(shadow)
    ax.add_patch(box)
    ax.text(x, y + 0.20, title, ha="center", va="center", fontsize=13,
            fontweight="bold", color=color, zorder=3)
    ax.text(x, y - 0.23, subtitle, ha="center", va="center", fontsize=9.3,
            color="#4B5563", zorder=3)

for i in range(len(positions)):
    x1, y1 = positions[i]
    x2, y2 = positions[(i + 1) % len(positions)]
    v = np.array([x2 - x1, y2 - y1], dtype=float)
    unit = v / np.linalg.norm(v)
    start = np.array([x1, y1]) + unit * 1.7
    end = np.array([x2, y2]) - unit * 1.7
    arrow = FancyArrowPatch(start, end, arrowstyle="-|>", mutation_scale=18,
                            linewidth=1.7, color="#8B98A5",
                            connectionstyle="arc3,rad=-0.10", zorder=0)
    ax.add_patch(arrow)

center = Circle((0, 0), 1.65, facecolor="#173F35", edgecolor="white", linewidth=2, zorder=4)
ax.add_patch(center)
ax.text(0, 0.45, "可归因增长飞轮", ha="center", va="center", color="white",
        fontsize=17, fontweight="bold", zorder=5)
ax.text(0, -0.05, "AI 起草 · 人审发布", ha="center", va="center", color="#E8F0ED",
        fontsize=12, zorder=5)
ax.text(0, -0.48, "GSC｜GA4｜社媒｜询盘｜订单", ha="center", va="center",
        color="#E8F0ED", fontsize=10.5, zorder=5)

ax.text(0, 4.65, "ZprintPro 三市场内容增长系统", ha="center", va="center",
        fontsize=21, fontweight="bold", color="#17232D")
ax.text(0, -4.62, "硬闸门：事实不一致不发布｜无授权不发布｜无回执不视为成功｜效果由真实数据决定",
        ha="center", va="center", fontsize=11.5, color="#8A3B34")

fig.savefig(OUT, bbox_inches="tight", facecolor=fig.get_facecolor())
print(OUT)
