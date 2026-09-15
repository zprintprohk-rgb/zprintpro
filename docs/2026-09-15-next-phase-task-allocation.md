# 下一步任务分配 — 30–90 天战略执行分解（2026-09-15 大脑交付）

> **依据**: `docs/2026-09-09-k3-brain-30-90day-masterplan-v1.md`（K3 9/9 拍板）+ `docs/2026-09-08-k3-masterplan-and-a1a12-mapping.md`（A1-A12）+ `docs/2026-09-01-k3-d8-d14-blog-topic-strategy.md`（D8-D14）
> **当前**: 2026-09-15 = **D7**（Phase 1，9/9 D0 起算）；D8-D14 七篇全部落地 + D14 Gate 2 7/7 验收（21:17 lane 补）
> **性质**: 大脑月度战略交付物，交执行层 5 cron 按包执行；**大脑无 K3 命令不自动执行**（K3 9/9 06:36 铁律）

---

## 0. 当前进度盘点（D7，Phase 1）

| 里程碑 | 状态 | 证据 |
|--------|------|------|
| D8-D14 七篇落地 | ✅ 全部 | food-packaging/calendar/wedding-red-packet/sticker/catalog/kraft/textbook（blog-data 3 locale + blog-posts.ts 注册） |
| D14 Gate 2 验收 | ✅ 7/7 | 21:17 lane 补验收（3 locale + FAQ regex + 内链 ≥7 + title 当量 + pricing 实锚） |
| title v4 合批 | 🟡 推进中 | T 批 3 commits 上线，71 条 ≤58 当量；剩余按 9/17 窗口合批收口 |
| T1 词 12 段深度 | 🟡 仅月曆完成 | 8 锁词中 7 个待 12 段深度升级 |
| GSC 回灌 matrix | ✅ | gsc_feedback_2026_09_15 块（22:43 lane） |
| 008 询盘 baseline | 🔴 待 K3 真人 | 9 月内首报（任何转化数字标「待 008 校准」） |
| GBP 回执 | 🔴 待 K3 真人 | Gate 2 #6 阻塞项 |
| wrapper 链路 | ✅ 修复 | call 前缀 + matrix 分类 + 执行报告总览（今晚） |

---

## 1. 时间轴总览（D7 → D90）

```
9/15(D7) ── 9/16 M1验收 ── 9/17 干净窗 ── 9/30 008/GA4 ── 10/8 D30 Phase1截止
                                        │                       │
                                        ▼                       ▼
                              Phase 2 (D31-D60)          Phase 3 (D61-D90)
                              10/9-11/7 T2扩量            11/8-12/7 Q4旺季卡位
                              AEO/GEO答案位攻坚             年历/贺卡/利是封词
```

---

## 2. 立即执行（9/16-9/17，P0）

### 2.1 明日 9/16 = M1 联合验收（A11，执行层必做）
- **口径**（v4-full-alignment-master-report §M1）：7d clicks ≥25 / 首页词 ≥8 / 询盘 ≥2 周三线对照
- **动作**：拉 GSC 9/10 解析 + 008 表（如有）+ 首页词位实测 → 出 M1 验收报告（含数据来源行）
- **注意**：询盘 ≥2 依赖 008 真人数据——若 K3 未给，标「待 008 校准」并升级

### 2.2 9/17 = 干净对比窗（改版后首个周环比终判，P0）
- **背景**：8/31-9/10 大规模改版 → 9/17 起数据才可比（窗口 9/11-9/17）
- **动作**：
  - GSC 校准日（需 K3/有凭证车道拉新数据，index.json latestFreshData 9/10 已 STALE 5 天）
  - 8 T1 锁词周环比首判（包裝盒/紙盒/包裝盒訂製/貼紙/宣傳單張/即日/書刊/騎馬釘）
  - 智印港品牌词 CTR 复测（9/10 已 87.5% 远超 40% 目标）
  - ジープリント 6 query 复测（当前 0 命中，未达期望 ≥1）

### 2.3 立即修复待办（本会话已排）
- 待 push 6 commits：执行报告功能 + matrix 修复 + call 修复 + GMC 报告（30min 保护后 push，或明 lane 带走）

---

## 3. 本周（9/16-9/21，Phase 1 冲刺）

### 3.1 daily-content 21:17（每日）
- **9/16**：M1 验收报告落地（§2.1）
- **9/17**：T1 锁词 12 段深度第一批——**包裝盒印刷 ⭐重中之重**（G1 头号词，PDP/category 12 段升级，禁新建第 2 篇）
- **9/18**：紙盒印刷 ⭐（同簇差异化）
- **9/19**：包裝盒訂製
- **9/20**：貼紙印刷（G1 簇，D11 small batch sticker 衔接）
- **9/21**：宣傳單張

### 3.2 gsc-feedback 22:43（9/17 校准日后首轮）
- 拉 9/17 新数据 → 8 T1 词周环比写入 matrix → 9/17 干净窗首判
- 智印港/ジープリント 品牌词复测 → 回灌 matrix priority_boost

### 3.3 weekly-meta 周五 23:07（9/18）
- title v4 合批收口：8/30 批 + 9/4 批冻结窗已过（9/13 判定）→ 按 50-54 当量合批
- 8 T1 锁词 title 写满核查（攻坚①）

### 3.4 大脑周复盘（9/20 周日上午，单次 ≤30min）
- 读过去 7 天 logs → 出 1 份周指令（有调整才写）

---

## 4. Phase 1 收尾（9/22-10/8，D14-D30）

### 4.1 T1 锁词 12 段深度（daily-content，主力）
- 8 锁词全部 12 段深度达标（9/22-10/4 逐词排期）
- 验收：12 铁律清单 + 门童六命令 + 三闸门

### 4.2 008 询盘 baseline + GA4 接线（P0，依赖 K3）
- **9 月内出首份真实询盘 baseline**（已拍板 98e793d7）
- GA4 G-XXXX 衡量 ID 接入（K3 提供 ID）
- 北极星 = 月询盘数（008 表真实值），SEO 指标均为过程指标

### 4.3 title v4 合批完成（weekly-meta）
- 全站 title 50-54 当量合批收口 → D30 验收口径「title v4 合批完成率」

### 4.4 GBP 回执（K3 真人动作，Gate 2 #6）
- K3 提交 GBP 后回执给执行层 → Gate 2 7/7 全通

### 4.5 D30 里程碑验收（10/8）
- T1 词 12 段覆盖率 / title v4 合批完成率 / 008 首月询盘数（真实值回填）
- 达标 → K3 拍板放行 Phase 2；未达标 → 大脑出纠偏指令

---

## 5. Phase 2 预备（10/9-11/7，D31-D60）

### 5.1 T2 扩量（daily-content）
- T2 词（次强采购意图）内容铺开，按 keyword-map v4.2 排期

### 5.2 AEO/GEO 答案位攻坚（daily-content + gsc-feedback）
- FAQ/HowTo schema + 答案式段落强化 → 冲 AEO 推荐位与 GEO 引用
- AEO 尺寸对照表资产 + GEO 三份数据资产复用（W7 addendum）

### 5.3 转化组件补强（PM+UX 视角）
- 报价 CTA / WhatsApp / 起订量公示按品类页补强（M2 转化区块 26→31）

### 5.4 竞品 R1 差距修复
- 差距修复执行率 ≥80%（e-print/Vistaprint/MOO/Raksul/グラフィック/PrintNet 对标）

---

## 6. Phase 3 预备（11/8-12/7，D61-D90）

### 6.1 Q4 旺季卡位（提前 60 天）
- 年历/贺卡/利是封/企业订制词 11 月上旬前全部进入首页竞争位
- 月曆簇（G5 死线已过 9/15）→ 转旺季收割

### 6.2 季度大盘点
- GSC 90d 对比 9/3 baseline → 12 月路线图校准

---

## 7. K3 待拍板清单（执行层无法自走）

| # | 项 | 影响 | 截止 |
|---|----|------|------|
| 1 | **GA4 G-XXXX 衡量 ID** | 008 接线（Phase 1 里程碑） | 9/30 |
| 2 | **GBP 提交回执** | Gate 2 #6 阻塞 | 9/16 |
| 3 | **名片展示层 (a)/(b)/(c)** | 解禁块裁决（§0.0） | 未定 |
| 4 | **PK-003 价格口径**（basePrice 2.5 vs title HK$4 起） | 数据一致性 | 未定 |
| 5 | **SKU faqs 架构方向**（product-faqs.ts vs 补渲染链） | top10 FAQ 填充落点 | 未定 |
| 6 | **008 现状数据**（零询盘 vs 链路未通） | 北极星 baseline | 9 月内 |
| 7 | **en china/factory-direct 预算**（9/30 截止） | G3 内容线 | 9/30 |
| 8 | **观塘 MTR 交收点表述** | 本地化 | 未定 |

---

## 8. 数据来源（§0.23 强制）

```
数据来源:
- K3 拍板: docs/2026-09-09-k3-brain-30-90day-masterplan-v1.md (9/9) / docs/2026-09-08-k3-masterplan-and-a1a12-mapping.md (A1-A12)
- D8-D14: docs/2026-09-01-k3-d8-d14-blog-topic-strategy.md (K3 9/1 09:46) + 9/14 CTR 判定终版 (.hermes/logs/2026-09-14-ctr-judgement-final.md)
- GSC: GSC数据/index.json (lastBuild 9/11T03:20, latestFreshData 9/10) + hk28d/enja28d-queries.json (9/10 解析)
- 执行证据: .hermes/logs/2026-09-15-gsc-feedback.md (22:43 lane) + 2026-09-14-daily-content.md (21:17 lane) + blog-posts.ts 94 slugs 实测
- git: 今日修复 commit (call 前缀 / matrix 分类 / 执行报告总览)
校准状态: GSC 9/10 STALE (待 9/17 校准日); 询盘 baseline 待 008 首报; 本计划不含任何估算转化数字
```
