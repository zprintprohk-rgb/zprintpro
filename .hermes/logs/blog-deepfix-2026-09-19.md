# blog-deepfix 周六深度重写报告 — 2026-09-19 (v7 执行层 / Blueprint Automation 车道)

**触发**: Blueprint Automation 周六 05:37 (Asia/Shanghai) | **执行**: Kimi Work 车道
**commit**: d193adda (84d65111..d193adda main -> main, push 06:2x +0800)

---

## 0. ⚠️ 撞车上报 (最高优先级, 建议 K3 动作)

**遗留 Windows schtasks `\ZP-blog-deepfix` (周六 05:37) 与本 cron 同时触发**, autoclaw lane 自 05:41 起每 ~20 秒覆写 `src/data/blog-data/zh-hk.json` 重写 food-packaging-printing-guide, 05:49:29 后静默, 留下**坏 JSON (P0 网站级事故)**:

- 损坏形态 1: `ZD_MARK_A` 占位哨兵残留 (char 62,477), 新 HTML 被插到旧 content 字符串引号之外 → `json.load` 全线失败
- 损坏形态 2: 全档 92 条 content 的 `\n` 换行被剥 (序列化器差异), 且 a5-vs-a6-flyer-size 文段「——傳單印得太大」丢失
- 该 lane 改动**未 commit** (仅污染工作树+暂存区), 本车道处置: 坏版备份 `.hermes/_broken-zhhk-lane-20260919.json` → 整档恢复 HEAD → 验证合法 (92 条) → 再落本批重写
- **根因未除**: 昨日 commit (bf20762a/3a92dc63) 交付的遗留任务删除脚本**需管理员权限执行, 疑似未执行**。**建议 K3 以管理员身份跑一次删除脚本, 杀掉遗留 schtasks, 否则下周六 05:37 双 lane 撞车必然重演**
- 本周撞车幸运点: 该 lane 05:49 后自行静默且从未 push; 若它先 push, 线上 blog 数据即全站 500

## 1. 选篇依据 (GSC imps 排序, 数据选页)

**目标篇 = `a5-vs-a6-flyer-size`**, 依据 `.hermes/gsc-2026-09-18/extract.json` (2026-09-18 档, 1 天新, ≤72h 闸门 FRESH):

| 页面 | 28d 展示 | 排名 | 点击 |
|---|---|---|---|
| zh-hk | **697** (combo 510 + hk 184 + us 3) | 7.9 | 0 |
| en | 64 | 7.5 | 0 |
| ja | 26 | 8.3 | 0 |

zh-hk 页 697 imp = **全站 blog imps 第 1**, 三语 pos 7.5-8.3 但 0 点击 = 典型「位置好 0 点击」故事问题页。前序候选排除: poster-printing-guide (549, Pillar 已达标) / food-packaging (496, HEAD 已达标且他 lane 在写) / poster-size-guide (439, 9/3 Pillar 升级过) / saddle-stitch (355, 昨日 38daa553 已升级)。

**GSC 命中词保护清单** (重写后词根全部保留): `a6 尺寸` (97 imp pos 8.9) / `a5 a6 尺寸` (25 pos 10) / `a6尺寸` / `a5 印刷` / `a5 一半` / `a6是a5的一半嗎` / `a5和a6尺寸` / `a5 傳單 印刷` / `a5a6尺寸` / `a5比例` / `a6 大小`。新增 H2 直接命中问句词: 「A6 係咪 A5 嘅一半？」「A6 大小大概係點？」「A5 定 A6 印刷價錢差幾多？」。

## 2. 修复清单 (§0.28 1 cron 1 交付物)

唯一交付物: **a5-vs-a6-flyer-size 三语 12 铁律深度重写** (仅 content 字段, title/description/slug/date/H1 不动)。

| locale | 字符数 | 快速答案块 | 比较表 | 内链(唯一) | wa.me CTA | FAQ | 问句 H2 | 💡 金块 |
|---|---|---|---|---|---|---|---|---|
| zh-hk | 3,381 → **12,824** | 0 → 3 | 1 → 3 | 6 → 18 | 0 → 2 | 4 → 8 | 0/0 → 10/10 | 0 → 6 |
| en | 5,391 → **19,112** | 0 → 3 | 1 → 3 | 6 → 18 | 0 → 2 | 4 → 8 | → 9/10 | 0 → 6 |
| ja | 3,594 → **13,908** | 0 → 3 | 1 → 3 | 6 → 18 | 0 → 2 | 4 → 8 | → 10/10 | 0 → 6 |

结构: 倒金字塔首段直答 → 👉 顶部 CTA → 3 amber 快速答案块 → 10 问句 H2 (尺寸对照/A6=A5一半/A6 vs 明信片/场景/价格/直邮 DL/纸材/入稿/流程交期) → 8 FAQ (page.tsx `extractFaqFromHtml` 唯一可解析格式 `<p><strong>Q：`) → 底部 CTA + 报价 box + 关于品牌 E-E-A-T + 资料来源行 + 作者行 (最後更新 2026-09-19)。

**价格口径修正 (对齐产品页 SSoT)**: 撤旧文「50 張起印」, 改产品页真实口径「100 張起印、A5 HK$0.18 起/張 (zh-hk) / US$0.25 起 (en/ja)、48 小時特快」; 撤 en 旧文「Free Shipping over $99 USA」(撞 i18n-guard 裸 Free Shipping 规则 + 无来源), 改「SF Express / DHL 2-4 天」中性表述。

## 3. 搜索 query 列表 (本轮联网核查)

ISO 216 A5/A6 尺寸与比例 / papersizes.org 面积换算 / DL 尺寸与 ISO 269 信封 / 300dpi 像素换算 / US 4×6 in 明信片 USPS 规格 / ANA·DMA 2025 直邮响应率 / Lob 2025 State of Direct Mail / USPS 直邮留存与个性化统计 / Canada Post 神经营销研究 / Grand View Research 商业印刷市场 2025-2033。

## 4. 内容摘要 + 原创数字标源 (18 处)

ISO 216: A5=148×210mm / A6=105×148mm / 比例 1:√2 / A6=A5 一半=A4 四分一; papersizes.org 面积 623.7/310.8/155.4 cm²; ISO 269: DL=99×210, DL 信封 110×220; 300dpi 像素 A6=1240×1748 / A5=1748×2480; USPS 4×6in=101.6×152.4mm; ANA/DMA 2025: 直邮响应 4.4% vs email 0.12% (37×), house list ROI 161% vs 44%/21%; Lob 2025: 84% 营销人认直邮 ROI 最高; USPS: 96% 经手 / 留存 17 日 / 个性化 +135%; Canada Post: 认知负荷 -21% / 动机响应 +20%; Grand View Research: 5,103.3 亿美元 (2025) → 6,750.8 亿 (2033) CAGR 3.8%; products.ts 2026 价目: A5 HK$0.18/US$0.25 起、A4 HK$0.3/US$0.35 起、摺頁 HK$0.45/US$0.70 起、100 張起印、48h 特快。文末附「資料來源」行全列。

## 5. verify 证据

- `blog-quality-12-rules-guard`: **0 命中** (5 Pillar × 3 locale 全过)
- `blog-standard-guard` / `internal-links-cta-guard`: 仅 campus-education-printing-pillar-guide 存量红 (title 当量 73-75 / 内链 8<10), **本批未触及该篇, 属 HEAD 既有**, 留待该篇轮值重写时清
- `gsc-leak-guard` (#16): **0 命中**; 正文零 GSC 后台黑话 (§0.23.1 守)
- `blog-data-integrity-guard`: 3 JSON 严格校验全过 (JSON.parse + 控制字符 + mojibake + 键数 92/92/92)
- `check-brand-baseline`: PASS (431→311 递减, 未新增双品牌); 品牌: zh-hk=智印港 / en/ja=ZprintPro / 智印印港 0 / 名片词 0 (§0.0 展示层守)
- `check-regression-guard --commit`: 🔴0 🟠0 🟡0; pre-commit 全过
- `check-bc-ban.mjs` (报告式): 本批内容 0 命中
- `tsc --noEmit`: **54 = 54 基线持平** (全部 quote-engine 测试存量, 与 JSON 数据无关)
- i18n 禁词: en Made in USA 系 0 / ja 激安·業界最安·最安値·No.1 系 0 (i18n-guard #4 口径)
- push 纪律: 上次 push 02:39:51 → 本次 06:2x, 间隔 3.8h ≥ 30min 硬下限 ✓ (§0.25.9); 未用任何阻塞等待 (§0.25.8)

## 6. 达标率更新

- v3.3 基线 (2026-09-08 主报告 B-1): 85 篇实测 **2 篇达标** (2.4%)
- 自 v3.3 累计深度升级约 20 篇 (5 Pillar 三语 + saddle-stitch 等历次), 本次 **+1 篇 (a5-vs-a6 三语)** → 约 21 篇
- ⚠️ 精确达标率**待 weekly-meta (周五 23:07) 统一口径机械测量校准**; 本轮不自造全站口径 (§0.23)

## 数据来源

- GSC: `.hermes/gsc-2026-09-18/extract.json` (2026-09-18 档, combo/hk/us/jp × 28d/7d/24h)
- 站内价格: `src/data/products.ts` a5-flyers / a4-flyers / folded-leaflets 条目 (2026 价目)
- 外部数据: ISO 216 / ISO 269 / papersizes.org / USPS / ANA·DMA 2025 / Lob 2025 / Canada Post / Grand View Research (本轮 10 条 query 联网核查)
- 撞车证据: `.hermes/_broken-zhhk-lane-20260919.json` (坏版备份), zh-hk.json mtime 05:49:29 静默记录
- commit: d193adda (2026-09-19 06:2x +0800 push)
