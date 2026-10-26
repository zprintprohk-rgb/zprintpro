from pathlib import Path
import json
import math
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from matplotlib import font_manager

ROOT = Path(r"F:\zprintpro-nextjs")
WORK = ROOT / ".kimi-work" / "seven-clusters-20261026"
OUT = ROOT / "docs" / "evidence" / "2026-10-26"
OUT.mkdir(parents=True, exist_ok=True)
data = json.loads((WORK / "seven-cluster-local-evidence.json").read_text(encoding="utf-8"))
rows = {(r["locale"], r["cluster"]): r for r in data["summary"]}

font_candidates = [
    r"C:\Windows\Fonts\msyh.ttc",
    r"C:\Windows\Fonts\simhei.ttf",
    r"C:\Windows\Fonts\NotoSansCJK-Regular.ttc",
]
for fp in font_candidates:
    if Path(fp).exists():
        font_manager.fontManager.addfont(fp)
        plt.rcParams["font.family"] = font_manager.FontProperties(fname=fp).get_name()
        break
plt.rcParams["axes.unicode_minus"] = False
NAVY = "#16324F"
BLUE = "#2F6BFF"
TEAL = "#0E9384"
ORANGE = "#E77C32"
RED = "#C44536"
GRAY = "#64748B"
LIGHT = "#E8EEF5"
BG = "#F7F9FC"

# Chart 1: comparable 28-day exposure and current position/click context.
selected = [
    ("zh-hk", "poster_flyer_rush", "zh 海报/传单/即日"),
    ("zh-hk", "stickers", "zh 贴纸"),
    ("zh-hk", "paperbags_eco", "zh 纸袋/环保"),
    ("zh-hk", "books_school", "zh 书刊/学校"),
    ("en", "stickers", "en 贴纸"),
    ("en", "poster_flyer_rush", "en 海报/传单"),
    ("en", "catalog", "en 目录"),
    ("en", "books_school", "en 书刊/学校"),
    ("ja", "doujin_comiket", "ja 同人/Comiket"),
    ("ja", "books_school", "ja 书刊/学校"),
    ("ja", "poster_flyer_rush", "ja 海报/传单"),
    ("en", "doujin_comiket", "en 同人/Comiket"),
    ("ja", "seasonal" if False else "nengajo_yearbook", "ja 年贺状/卒アル"),
]
fig = plt.figure(figsize=(16, 9), dpi=100, facecolor=BG)
gs = fig.add_gridspec(2, 2, width_ratios=[1.5, 1], height_ratios=[1, 1], wspace=0.26, hspace=0.30,
                      left=0.12, right=0.97, top=0.86, bottom=0.12)
ax = fig.add_subplot(gs[:, 0], facecolor=BG)
labels = [x[2] for x in selected]
cur = [rows[(x[0], x[1])]["impressions_cur"] for x in selected]
prev = [rows[(x[0], x[1])]["impressions_prev"] for x in selected]
y = list(range(len(selected)))
h = 0.34
ax.barh([v + h/2 for v in y], prev, height=h, color="#A9B7C6", label="前期 28 天")
ax.barh([v - h/2 for v in y], cur, height=h, color=BLUE, label="当前 28 天")
ax.set_yticks(y, labels, fontsize=10)
ax.invert_yaxis()
ax.set_xscale("symlog", linthresh=10)
ax.set_xlim(0, 2600)
ax.set_xticks([0, 10, 50, 100, 500, 1000, 2000])
ax.get_xaxis().set_major_formatter(plt.ScalarFormatter())
ax.set_xlabel("展示量（symlog 轴；仅为本站词簇曝光，不是市场搜索量）", color=GRAY)
ax.grid(axis="x", color=LIGHT, linewidth=0.8)
ax.set_axisbelow(True)
for i, (c, p) in enumerate(zip(cur, prev)):
    ax.text(max(c, 1) * 1.08 + 1, i - h/2, f"{int(c)}", va="center", fontsize=9, color=NAVY, fontweight="bold")
ax.legend(loc="lower right", frameon=False)
ax.set_title("① 七簇重点战场：当前 vs 前期展示", loc="left", fontsize=14, color=NAVY, fontweight="bold", pad=14)
for s in ax.spines.values(): s.set_visible(False)

pos_items = selected[:10]
ax2 = fig.add_subplot(gs[0, 1], facecolor=BG)
y2 = list(range(len(pos_items)))
curp = [rows[(x[0], x[1])]["position_cur"] for x in pos_items]
prevp = [rows[(x[0], x[1])]["position_prev"] for x in pos_items]
for i, (c, p) in enumerate(zip(curp, prevp)):
    ax2.plot([p, c], [i, i], color="#CBD5E1", lw=2, zorder=1)
    ax2.scatter(p, i, color="#A9B7C6", s=36, zorder=2)
    ax2.scatter(c, i, color=TEAL if c < p else ORANGE, s=48, zorder=3)
ax2.set_yticks(y2, [x[2] for x in pos_items], fontsize=9)
ax2.invert_yaxis()
ax2.invert_xaxis()
ax2.set_xlim(65, 0)
ax2.set_xlabel("展示加权平均位置（越靠右越接近首页）", color=GRAY)
ax2.grid(axis="x", color=LIGHT)
ax2.set_title("② 位置变化：绿=改善，橙=回落", loc="left", fontsize=13, color=NAVY, fontweight="bold", pad=12)
for s in ax2.spines.values(): s.set_visible(False)

ax3 = fig.add_subplot(gs[1, 1], facecolor=BG)
click_items = selected[:10]
cc = [rows[(x[0], x[1])]["clicks_cur"] for x in click_items]
cp = [rows[(x[0], x[1])]["clicks_prev"] for x in click_items]
y3 = list(range(len(click_items)))
ax3.barh([v + h/2 for v in y3], cp, height=h, color="#A9B7C6")
ax3.barh([v - h/2 for v in y3], cc, height=h, color=TEAL)
ax3.set_yticks(y3, [x[2] for x in click_items], fontsize=9)
ax3.invert_yaxis()
ax3.set_xlabel("点击（灰色前期 / 绿色当前）", color=GRAY)
ax3.set_xticks([0, 2, 4, 6, 8, 10, 12, 14, 16])
ax3.grid(axis="x", color=LIGHT)
ax3.set_title("③ 点击：zh 海报仍最大，但 16→10", loc="left", fontsize=13, color=NAVY, fontweight="bold", pad=12)
for i, c in enumerate(cc):
    ax3.text(c + 0.2, i - h/2, str(int(c)), va="center", fontsize=9, color=NAVY)
for s in ax3.spines.values(): s.set_visible(False)

fig.suptitle("ZprintPro 七大词簇 GSC 对比｜资源不能按单一赛道趋势分配", x=0.06, y=0.955,
             ha="left", fontsize=21, color=NAVY, fontweight="bold")
fig.text(0.06, 0.905, "当前 2026-09-28—10-25｜前期 2026-08-31—09-27｜统一 query×page×country 口径",
         ha="left", fontsize=11, color=GRAY)
fig.text(0.06, 0.035, "读法：展示、位置、点击必须一起看；低样本 CTR 不作根因断言。数据源：seven-cluster-local-evidence.json。",
         ha="left", fontsize=10, color=GRAY)
fig.savefig(OUT / "seven-cluster-gsc-comparison.png", facecolor=BG)
plt.close(fig)

# Chart 2: shared evidence flywheel and decision gates.
fig, ax = plt.subplots(figsize=(16, 9), dpi=100, facecolor=BG)
ax.set_xlim(0, 16); ax.set_ylim(0, 9); ax.axis("off")
ax.text(0.7, 8.35, "七簇共用一个证据飞轮，而不是七套关键词流水线", fontsize=23, color=NAVY, fontweight="bold")
ax.text(0.7, 7.86, "SEO 负责可发现与主 URL｜AEO 负责可提取采购答案｜GEO 负责可核验事实与引用基础", fontsize=12, color=GRAY)
steps = [
    ("1 真值门", "MOQ／价格／规格\n交期／认证／服务边界", RED),
    ("2 主 URL", "PDP 接交易\nCategory 接比较\nGuide 接问题", BLUE),
    ("3 采购答案", "BLUF＋规格表\n限制条件＋真实 FAQ", TEAL),
    ("4 独特证据", "模板／清单／实物\n打样／质检／官方便历", ORANGE),
    ("5 意图内链", "信息→比较→报价\n不造近义页\n不机械堆精确锚", BLUE),
    ("6 同口径复核", "7d 看方向／28d 裁决\n主 URL 份额＋点击\n询盘待 GA4/008 校准", NAVY),
]
xs = [0.65, 3.22, 5.79, 8.36, 10.93, 13.50]
for i, ((title, body, color), x) in enumerate(zip(steps, xs)):
    box = FancyBboxPatch((x, 4.45), 1.85, 2.15, boxstyle="round,pad=0.06,rounding_size=0.12",
                         facecolor="white", edgecolor=color, linewidth=2)
    ax.add_patch(box)
    ax.text(x+0.925, 6.15, title, ha="center", va="center", fontsize=13, color=color, fontweight="bold")
    ax.text(x+0.925, 5.25, body, ha="center", va="center", fontsize=10.2, color=NAVY, linespacing=1.55)
    if i < len(steps)-1:
        ax.add_patch(FancyArrowPatch((x+1.9, 5.52), (xs[i+1]-0.08, 5.52), arrowstyle="-|>",
                                     mutation_scale=16, color="#94A3B8", lw=1.8))
# feedback loop
ax.add_patch(FancyArrowPatch((14.4, 4.28), (1.55, 4.28), connectionstyle="arc3,rad=-0.13",
                             arrowstyle="-|>", mutation_scale=18, color="#94A3B8", lw=1.6))
ax.text(8.0, 2.86, "失败不自动扩写：返回真值／索引／意图／证据诊断；两轮无改善则 STOP 或重分配", ha="center", fontsize=11, color=GRAY)
# three lanes
lanes = [
    ("P0 阻断", "robots 404、跨语币种、MOQ/H1、价格单位、内部 SEO 目标泄露、年贺状三真值", RED),
    ("P1 主攻", "zh 纸袋＋海报｜en 同人＋小批量贴纸＋书刊恢复｜ja C109", BLUE),
    ("P2/P3 条件推进", "目录与教材中程培育｜卒アル小样本守位｜年贺状先过产品门｜en eco 先诊断", TEAL),
]
for j, (name, body, color) in enumerate(lanes):
    y = 1.75 - j*0.63
    ax.add_patch(FancyBboxPatch((0.75, y), 2.05, 0.46, boxstyle="round,pad=0.03,rounding_size=0.08",
                                facecolor=color, edgecolor=color))
    ax.text(1.775, y+0.23, name, ha="center", va="center", color="white", fontsize=11, fontweight="bold")
    ax.text(3.08, y+0.23, body, va="center", fontsize=10.5, color=NAVY)
ax.text(0.75, 0.12, "原则：P0 治理不占增长内容配额；资源百分比只是排程，不是流量或收入预测。", fontsize=10, color=GRAY)
fig.savefig(OUT / "seven-cluster-priority-flywheel.png", facecolor=BG)
plt.close(fig)

for p in [OUT / "seven-cluster-gsc-comparison.png", OUT / "seven-cluster-priority-flywheel.png"]:
    print(p, p.stat().st_size)
