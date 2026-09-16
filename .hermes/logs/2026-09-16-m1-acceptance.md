# M1 联合验收报告 (A11) — 2026-09-16

**验收日**: 2026-09-16 (per docs/2026-09-15-next-phase-task-allocation.md §2.1)
**执行层**: deepseek hermes (daily-content-1x7w lane, v9.4 rearm)
**报告路径**: `.hermes/logs/2026-09-16-m1-acceptance.md`
**验收口径 SSoT**: docs/2026-09-08-k3-masterplan-and-a1a12-mapping.md (L12「M1 验收口径 7d clicks 12→≥25、首页词→≥8、询盘≥2/周」+ L74「9/16 M1 联合验收：clicks≥25/首页词≥8/询盘≥2 周三线对照；M2 签发」)

---

## 0. 一页结论

**M1 三线对照：首页词线 ✅ 达标 (8 词)，7d clicks 线 ⏳ 数据缺口待 9/17 校准日，询盘线 ❌ 待 008 真人数据校准。**
**M2 签发条件未完全满足 → 报告如实标注「部分达标 + 2 线待校准」，不虚报 PASS；升级 K3 补 7d 解析 + 008 首报。**

| 线 | 口径 | 实测 (可用真值) | 判定 |
|---|---|---|---|
| 1. 7d clicks | ≥25 | 9/3 校准基线 7d = 12 (锁定); 9/10 7d sheet 未解析入库 (28d all=349 / hk=247 有真值, 28d→7d 不可换算不编造) | ⏳ 待 9/17 校准日 7d 判定 |
| 2. 首页词 | ≥8 | hk 28d (9/10 解析) pos≤10 词 = **8 词** | ✅ 达标 (边界, 泛词为主) |
| 3. 询盘 | ≥2/周 | data/inquiry-counter.json = **0 条** (9/8 起人工台账停用, GA4 G-248QMCT2S3 已接线但无真人回填) | ❌ 待 008 校准 + 升级 K3 |

---

## 1. SOP-10 5 问门禁 (K3 §0.22)

- [x] 1. **架构差异?** 派活前查前序任务实现路径 — M1 = A11 原子指令 (docs/2026-09-08-k3-masterplan-and-a1a12-mapping.md L12/L74), 9/16 由 daily-content lane 承接 (allocation §2.1/§3.1); 前序 9/14 CTR 判定 (ctr-judgement-final.md) + 9/15 gsc-feedback 已提供 8 T1 词/全站/品牌追踪底座, 本报告在其上做三线对照, 未重做已交付数据
- [x] 2. **约束适用范围?** 查 K3 拍板原文 — M1 口径 = v4-full-alignment-master-report §M1 (7d clicks ≥25 / 首页词 ≥8 / 询盘 ≥2 周); 本 lane 写权限仅 .hermes/ + 指定 src 文件, 无 K3 命令不自动执行 (v9.3); 008 真人数据缺 → 标「待 008 校准」并升级 (allocation §2.1 注意), 不替 K3 拍板
- [x] 3. **原数据/拍板来源?** 3 问: ① 7d clicks 基线 = 9/3 校准拍板锁定 (docs/2026-09-03-k3-gsc-calibration-eod.md「校准后 7d clicks = 12 baseline 锁定, 9/16 验收 ≥12 + 增长%」+ masterplan 12→≥25) ② 真数据 = .hermes/hk28d-queries.json + enja28d-queries.json (9/10 xlsx 28d 解析) + GSC数据/index.json (latestFreshData 9/10) + 首页 web_fetch 实测 200 ③ 留/撤 = 留 (有来源, 见数据来源节); 校准日期标注见「数据来源」与「校准状态」节
- [x] 4. **字段值策略?** certNo/validUntil/issuer 全空 — 本报告零 src 字段改动 (SKU 优化仅动 description 尾部 + optimizedAt/optimizationRound, 见 daily 报告 §4); 无证书/联系方式字段
- [x] 5. **Markdown 渲染?** [text](url) 必须 parseInlineLinks — 本报告为 .hermes/ 内部报告, 零 user-facing 文本; 无 [text](url) 语法引入

## 2. 数据来源 (K3 §0.23)

```
数据来源:
- GSC 基线: GSC数据/gsc-fresh-2026-09-03.json (canonical, K3 9/3 15:22 上传, 7d all = 12 clicks / 2,207 imps / 0.54% / pos 29.94; 28d all = 41 / 7,618)
- GSC 真值: .hermes/hk28d-queries.json (9/10 xlsx 28d hk 解析, 窗口 8/14-9/10, 78 词) + .hermes/enja28d-queries.json (28d en/ja)
- 全站 28d 真总量: 9/14 CTR 判定终版 §1.1 (hk 247/10,022/2.46%/26.6 · en 19/3,925/0.48%/43.6 · ja 35/1,791/1.95%/41.2 · all 349/20,323/1.72%/31.3)
- 008 询盘: data/inquiry-counter.json (2026-09-04 更新, 0 条; SOP-008 9/8 起人工台账停用, GA4 G-248QMCT2S3 已接线)
- 首页词位实测: web_fetch https://zprintpro.com/zh-hk/ (2026-09-16, HTTP 200; nav 含 貼紙印刷/傳單印刷/包裝盒印刷/海報印刷/紙袋印刷/即日急件)
- 拍板来源: docs/2026-09-08-k3-masterplan-and-a1a12-mapping.md L12/L74 + docs/2026-09-03-k3-gsc-calibration-eod.md + docs/2026-09-15-next-phase-task-allocation.md §2.1
校准状态: GSC 9/10 数据 ~6d old vs 72h 门限 → STALE per §K.1.3; 9/17 = 改版后首个干净对比窗; 本报告数字全部有来源, 无估算
撤回声明: 无 (本报告不含任何编造/估算转化数字)
```

## 3. 三线对照明细

### 线 1: 7d clicks ≥25

| 项 | 值 | 来源 | 状态 |
|---|---|---|---|
| 9/3 校准基线 (7d) | 12 clicks / 2,207 imps / 0.54% / pos 29.94 | gsc-fresh-2026-09-03.json | 已锁定 (9/3 校准拍板) |
| 9/10 全站 28d | 349 clicks / 20,323 imps / 1.72% / pos 31.3 | hk28d/enja28d + 9/14 CTR 报告 §1.1 | 真值 (28d 窗口) |
| 9/10 全站 7d | **未解析** (9/10 xlsx 含 7d sheet, 但仅 28d 已解析入库; 本 lane pwsh 被禁无法解析 xlsx) | GSC数据/index.json notes | ⏳ 待 9/17 校准日拉取 |

**判定**: 方向参照 — 28d all = 349 (vs 9/3 基线 41, +751%) 显示强增长, 但 **28d→7d 不可换算**, 按 §0.23 不编造 7d 数; 7d ≥25 精确判定**待 9/17 干净窗** (8 T1 词周环比 + 全站 7d 首判)。**不虚报 PASS。**

### 线 2: 首页词 ≥8

hk 28d (9/10 解析) pos≤10 词清单 (**8 词, 达标边界**):

| 词 | pos | imp |
|---|---|---|
| 珠光紙 | 1.0 | 18 |
| 大信封 | 3.7 | 44 |
| pvc貼紙 | 6.8 | 23 |
| 邊度有紙袋買 | 8.3 | 23 |
| pvc 貼紙 | 8.3 | 16 |
| a6 尺寸 | 8.7 | 88 |
| 即日印刷 | 9.1 | 42 |
| a5 a6 尺寸 | 9.8 | 25 |

**判定**: 首页词 = **8** ≥ 8 ✅ (边界达标)。注意: 8 词中以尺寸/材质/泛词为主 (a6 尺寸 / pvc貼紙 / 珠光紙), T1 锁词中仅 **即日印刷** (pos 9.1) 在首页; 采购意图首页词密度仍低 — 与 8/29 战略报告「56/100 首页词为泛词」结构一致。首页词位实测: 站点首页 live (HTTP 200), nav/hero 含 貼紙印刷/傳單印刷/包裝盒印刷/海報印刷/紙袋印刷/即日急件 6 个 T1 词入口。

### 线 3: 询盘 ≥2/周

| 项 | 值 | 来源 |
|---|---|---|
| data/inquiry-counter.json | **0 条** (updatedAt 2026-09-04) | 008 台账 (历史档案) |
| SOP-008 状态 | 9/8 K3 拍板人工台账停用; GA4 G-248QMCT2S3 已接线 (8/12 埋点 4286c0c) | AGENTS.md §0.0 附近 + 008 SOP |
| GA4 询盘数 | **未接入真实回填** (GA4 衡量 ID G-XXXX 待 K3 提供, allocation §7 #1) | 9/15 allocation §7 |

**判定**: 询盘 ≥2/周 依赖 008 真人数据 — **K3 未提供** → 按 allocation §2.1 注意标「**待 008 校准**」并**升级 K3** (GA4 ID + 008 首报 9 月内, 北极星 = 月询盘数)。

## 4. 8 T1 锁词 28d 真值 (9/10 解析, STALE, 9/17 首个干净对比窗)

| 词 | imp | pos |
|---|---|---|
| 貼紙印刷 | 153 | 31.2 |
| 宣傳單張 | 130 | 36.4 |
| 宣傳單張印刷 | 129 | 30.4 |
| 包裝盒印刷 | 69 | 36.6 |
| 騎馬釘 | 68 | 27.3 |
| 包裝盒訂製 | 64 | 30.6 |
| 騎馬釘印刷 | 63 | 23.2 |
| 騎馬釘書刊 | 63 | 35.5 |
| 紙盒印刷 | 63 | 37.5 |
| 即日印刷 | 42 | 9.1 |
| 書刊印刷 | 16 | 39.7 |

全部 0 clicks (9/10 解析); 即日印刷 pos 9.1 = 唯一 T1 首页词 (速赢带)。

## 5. 验收结论与升级

**M1 判定**: 首页词线 ✅ (8/8); 7d clicks 线 ⏳ 待 9/17 校准日 (数据缺口); 询盘线 ❌ 待 008 校准 (K3 真人数据缺)。
→ **M1 = 部分达标, M2 签发待 9/17 干净窗 + 008 首报确认**, 不虚报 PASS。

**升级 K3 (PENDING_K3, 不替拍板)**:
1. **GSC 7d 解析**: 9/10 xlsx 7d sheet 未入库, 9/17 校准日需拉 7d 全站真值 (有凭证车道) → 7d clicks ≥25 终判
2. **008 真人数据**: GA4 G-XXXX 衡量 ID (allocation §7 #1) + 9 月内首份询盘 baseline → 询盘 ≥2/周 终判
3. **9/17 干净窗复核**: 8 T1 词周环比 + 智印港 40%+ 复核 + ジープリント 6 query 复测

**验收边界**: 本报告为数据验收 (含数据来源行), 未改任何 src/ (SKU 优化为同 lane 独立任务, 见 daily 报告); GSC 9/10 数据 STALE (~6d), 数字全部有来源, 无估算/编造。

---
Generated by deepseek hermes · 2026-09-16 · zprintpro-main-tmp
