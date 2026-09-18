#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Append D-9/6-1/2/3 entries to decision-register.md
Per §0.23 数据诚信红线 + §J.1 决策登记簿 SSoT SOP
"""
import sys
from pathlib import Path

REGISTER = Path(r"F:\zprintpro-nextjs\.hermes\decision-register.md")

NEW_ENTRIES = """
---

## 16. D-9/6-1 · W6 v34 others 三语 308 堵漏 (next.config.js, 43 词/519 展示/5 点击, per K3 9/6 W7 战略 §A.1 P0)

**任务**: K3 9/6 W7 战略《SEO+AEO+GEO 180 天作战路线图》§A P0 硬伤 = others 三语 404 堵漏 URL 层 (M3 可自走); 9/6 9:00-9:30 一次性完成

**拍板来源**:
- K3 9/6 W7 战略 addendum: `.hermes/cron-prompts/w7-strategy-addendum-2026-09-06.md` §A.1 事实 + §A.2 第一层 URL 层处置
- W7 战略 HTML: `DELIVERY/w7-strategy-180day-20260906.html` §A
- 数据来源 (per §0.23 + §0.33): GSC数据/gsc-fresh-2026-09-03.json 28d 窗口 266 词审计 (zh-hk 13/267/5, ja 25/230, en 5/22)

**改动文件 1 个**:
- `next.config.js` L319-353 范围 W6 v34 块 (W5 块后 /product/{oldSlug} 块前):
  - 4 形态 (裸 others + category/others + 各自 trailing slash) × 3 locale = **12 rules**, 全部 `permanent: true` (产出 308)
  - destination: `/{locale}/category/flyers/` (per §A.2 词层分流表 flyers 是 43 词最大去向 7 词/130 展示)
  - 行为: 5 点击带点击词 (車身廣告 60 展示/1 点击 / 賀卡印刷 4/1 / 精裝盒 2/1 / a4 印刷 2/1 / 彩色印刷 1/1) 落地到 flyers 减少 404 跳出

**预 curl 验证** (per §0.4):
- `/{zh-hk,en,ja}/category/flyers/` → 200 ✅ (9/6 9:05 主线探针)
- `/{zh-hk,en,ja}/category/others/` → 404 (9/6 9:05 确认, 修后预期 308 + Location 200)

**站内 grep 验证**:
- `src/`、`public/`、`*.tsx`、`*.json`、`*.md` 内 "category/others" + "/others" 引用 = 0 命中 (除 w7-strategy-addendum-2026-09-06.md 自身 1 处)

**next.config.js 语法验证** (scripts/_check-nextconfig.js 临时):
- 51 rules.push calls (W6 增量 12)
- W6 others block 1259 chars, 与 W4 catalogs / W5 booklets/rush-printing 同构可独立回滚

**校准日期**: 2026-09-06 09:15
**校准状态**: 🟡 IN_PROGRESS (本地编辑完, 待 commit + push + 5 步真验收)

---

## 17. D-9/6-2 · W7 §B 真实缺口 #1+2: posters en + posters ja 转化区块 (per K3 9/6 W7 战略 §B.2 priority 1+2, 163 展示缺口)

**任务**: K3 9/6 W7 战略 addendum §B 真实缺口 (按 28d 展示排序重算) priority 1+2 = posters en (9 词/103 展示) + posters ja (12 词/60 展示) = **172 展示 + 9+12 词覆盖**

**拍板来源**:
- K3 9/6 W7 战略 addendum §B.1 (停用 money-keyword-map-20260905.md §三 旧 7 格账) + §B.2 (23 键实测真缺口)
- 配套: `src/data/category-conversion-blocks.ts` 注册表实测 23 键 (9/6 9:05 主线) — posters 仅 zh-hk (line 1473-1607) ✓
- 数据来源 (per §0.23 + §0.33): gsc-fresh-2026-09-03.json 28d 266 词 + category-conversion-blocks.ts 23 键口径

**改动文件 1 个**:
- `src/data/category-conversion-blocks.ts` L1609-1745 (posters:en) + L1747-1883 (posters:ja) — 与现有 posters:zh-hk L1473-1607 镜像同构, 2 个新 block 281 行

**结构 (8 字段镜像 posters:zh-hk)**:
- title / metaDescription (en SEO 字符 ≤160 / ja ≤80)
- quickAnswers 3 (en: How much / size+material / fastest / ja: 単価 / サイズ+素材 / 最短納期)
- socialProof 4 (4,820+ / 1 piece / 2-3 years / 95%+)
- comparisonTable 4 行 (Art paper 128g / PP synthetic 200g / PVC 440g / Canvas-fabric)
- orderFlow 6 步 (WhatsApp Inquiry / Get Quote / Upload Artwork / Pre-Press Check / Production & Payment / Ship & Deliver)
- whatsappTemplates 3 (Get a Quote / Outdoor Poster Rush / Lightbox Board Mounting)
- newFaqs 4 (1 piece 印刷 / 屋外耐久材質 / size 標準 / 12-sheet 納期)

**§0.22 SOP-10 5 问门禁 (硬规则)**:
- en 禁词 (Made in USA / US-based / American-made / 100% Domestic / 裸 Free Shipping / 100% USA / All-American Made): 0 命中 ✅
- en 替代: "Factory-direct from Shenzhen" + "DHL 2-4 day worldwide delivery" ✅
- en 货币: USD (US$) ✅
- ja 禁词 (激安 / 業界最安 / 業界最高 / 最安値 / No.1 / 日本一 / 裸 Free Shipping): 0 命中 ✅
- ja 替代: コスパ / 工場直販 / お得な価格 / 人気 ✅
- ja 货币: JPY (円) ✅
- ja Raksul 3 要素 (無料サンプル / 見積もり即時 / 価格表ロット別): 全含 ✅ (note 字段 + whatsappTemplates + 6 步流程)
- §0.32 zh-hk 5 禁词: N/A (本任务仅 en/ja, 不涉及 zh-hk)
- §13.16 双品牌宪法 (en+ja = ZprintPro 单品牌): 0 写"智印港" ✅
- §I.5.2 战略级分层 (en 暂保留实体注册, ja 允许): 0 写深圳实体注册信息 ✅

**§M 12 条铁律 (Pillar 标准, blog 必跑; 本任务非 Pillar, 仅参考 §0.34)**:
- 适用: posters 转化区块 (category 页) = 页面级元数据, 非 blog 内容, 12 条铁律 Scriptable 检查不适用
- 守门: regression-guard SOP10_4_PLUS_NUMBER yellow SHADOW 命中 (4,820 socialProof + 1,000 pcs 价格) — 跟现有 posters:zh-hk 一致, 9/15 FP 复盘前不升硬拦

**校准日期**: 2026-09-06 09:15
**校准状态**: 🟡 IN_PROGRESS (本地编辑完, 语法验证 OK, 待 commit + push + 5 步真验收)

**posters 转化区块 23 键汇总** (本任务完成后):
- posters:zh-hk (line 1473) + posters:en (line 1609, 本次新增) + posters:ja (line 1747, 本次新增) = **3/3 完整**
- §B 真实缺口 #1+2 落地后, 23 键转 25 键 (新增 2); 剩余真缺口 #3-#5 (menus en / greeting-cards en / greeting-cards ja) M2/M3 排期

---

## 18. D-9/6-3 · 5 cron SSoT + AGENTS.md 同步 W7 战略 addendum 头部 (per K3 9/6 §J.6 5 cron SSoT 头部嵌入 SOP)

**任务**: K3 9/6 W7 战略 addendum 落地 (per addendum 头部 "挂载范围: 全部 5 cron SSoT" + SSoT 文件 L1 已嵌的 W7 addendum header); 同步 5 cron SSoT + AGENTS.md 5 处头部引用 + 决策登记簿 18 项新 D-ID (本 commit D-9/6-1/2/3)

**拍板来源**:
- K3 9/6 W7 战略 addendum: `.hermes/cron-prompts/w7-strategy-addendum-2026-09-06.md` L7 挂载范围
- §J.6 5 cron SSoT 头部 §J 段嵌入 SOP (per K3 9/2 09:14 派活包)
- K3 9/4 01:02 派活包 §M.7 第 1 条 "≥1 战略交付物 (skill + cron SSoT) 或 ≥3 非 docs 文件改动才推"

**改动文件 6 个** (W7 addendum 头部 + 1 行每文件, 已修改未 commit):
- `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` L1 (本次 daily cron 主文件, 头部 +2 行 W7 摘要)
- `.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md` L1 (+2 行 W7 摘要)
- `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md` L1 (+2 行 W7 摘要)
- `.hermes/cron-prompts/zprintpro-monthly-matrix-audit.md` L1 (+2 行 W7 摘要)
- `.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md` L1 (+2 行 W7 摘要)
- `AGENTS.md` (+10 行, 推断含 W7 addendum 引用与 M1 阶段说明)

**5 cron SSoT 头部 W7 摘要内容 (一致 6 项)** (per addendum §A/§B/§C/§D/§E/§F):
1. others 三语 404 堵漏 (43 词/519 展示/5 点击, M1 第一优先, URL 层 308 M3 可自走)
2. 转化区块以注册表实测 23 键为准 (旧 7 格缺口 TOP10 停用, 真缺口 posters en/ja 等 5 格)
3. CTR 基线 0.59% 与头部 7 词攻坚队列
4. WA/GA4 埋点触及组件层 = M3 停手等 K3 拍板
5. AEO 尺寸对照表资产 + GEO 三份数据资产 + AI 引用月测
6. 180 天六冲刺排期
- 冲突时以 addendum §A/§B/§D 为准; 生效 2026-09-06

**§0.25 30 min 间隔 push** (per K3 8/26 14:35 拍板): 上次 push 4bf2c124 9/6 06:32 → 本次 commit 预计 9:30 = 间隔 3h+ ✅ 不撞车
**§0.25.9 攒批**: 8 非 docs 文件改 (next.config.js + category-conversion-blocks.ts + 5 cron SSoT + AGENTS.md) ≥ 3 阈值 ✅

**校准日期**: 2026-09-06 09:15
**校准状态**: 🟡 IN_PROGRESS (本地编辑完, 待 commit + push + 5 步真验收)

**W7 6 段落 vs 5 cron SSoT 头部分发 (per addendum 头部挂载范围 = 全部 5 cron)**:
- daily-content-1x7w: §A (others 堵漏) + §B (posters en/ja 区块) + §C (CTR 攻坚) + §E (尺寸对照表 FAQ 资产) — 本任务主要负责
- weekly-meta-refresh: §C (7 词 + 紙袋訂製 title/meta 改写) — 下次 weekly cron 触发
- gsc-feedback-loop: §E (AI 引用月测) + §K (GSC 数据强制源) — gsc cron 触发
- monthly-matrix-audit: §E (AI 引用监测基线 5 问) + §B (23 键口径) — monthly cron 触发
- monthly-content-authority-audit: §B (23 键) + §D (转化区块) — monthly cron 触发

---

EOF · 2026-09-06 09:15 · M3 自决 (per K3 §0.28.7 8/28 11:52 派活包 M3 自主决定)
"""

# Read the file with UTF-8 (and handle if it's already appended)
content = REGISTER.read_text(encoding='utf-8')

# Check if already appended
if 'D-9/6-1' in content:
    print('Already has D-9/6-1, skipping')
    sys.exit(0)

# Append
content_with_new = content.rstrip() + '\n' + NEW_ENTRIES
REGISTER.write_text(content_with_new, encoding='utf-8')
print(f'OK: appended {len(NEW_ENTRIES)} chars')
print(f'New total lines: {content_with_new.count(chr(10)) + 1}')
