# GSC 校准报告 · 2026-10-29（对齐 9/10 先例 846edfd4）

> **任务**: K3 全授权指令「读取 GSC 最新执行结果 + 今日执行日志 + 3 份策略文档 → 深度思考 → 按优先级继续下一步最优推荐执行 → 落 docs/2026-10-29-gsc-calibration-report.md（对齐 9/10 先例 846edfd4）」
> **执行层**: deepseek hermes（ZprintPro 首席 SEO/AEO/GEO 数据战略分析师）
> **校准日判定**: 2026-10-29 = 数据缺口闭合后的恢复确认轮（K3 01:16-01:23 补 4 新档全国家口径）+ 校准日三线复核 + matrix 回灌确认 + 下一步优先级推荐
> **报告路径**: docs/2026-10-29-gsc-calibration-report.md（本文件，覆盖 01:21 简化版并补齐 9/10 结构）

```
数据来源:
- GSC数据/2026-10-29 批 4 xlsx（24h/7d/28d/3mo 三站点汇总, 全国家口径, K3 01:16-01:23 导出, 3 天龄）
- .hermes/logs/2026-10-29-ZP-gsc-feedback.md（01:21 车道完整分析, RECOVERY 109.9%）
- .hermes/logs/gsc-daily-anomaly-2026-10-29.json（机器可读清单 28 词零点击/40 词 striking）
- .hermes/logs/2026-10-28-ZP-gsc-feedback.md（上轮基线 582.4/108.3% 三站口径）
- .hermes/industry-keyword-matrix.json（回灌 gsc_feedback_2026_10_29 block + priority_boost 食品包裝+1/china catalog+1）
- .hermes/logs/2026-10-29-evening-k3-action-list.md（19:0x 晚间 K3 决策清单, 队列 WAITING_K3 5 项）
- .hermes/logs/2026-10-29-c6-gsc-index-rebuild-report.md（03:46 A15 已闭环: GSC数据/index.json 重建 + gsc-source-guard 修复）
- 线上探针（19:54 三线复核: 5 Pillar 200 + sitemap.xml 200）
- 策略文档: 2026-10-26-packaging / 2026-10-28-three-strategy / 2026-10-28-data-driven（§7 优先级）
校准状态: 已校准（2026-10-29; 全国家口径 109.9% 双方法一致; A1/A2/A16/A15 全部解除）
```

## 一、SOP-10 5 问门禁段

1. **架构差异**: 本报告仅 data/docs 层（docs 报告补全），**零 src 行为改动**；matrix 回灌键 `gsc_feedback_2026_10_29` 已由 01:21 轮写入（幂等：已存在不重写）
2. **约束适用**: 校准日工作 = data-driven §7 排期内；三市场小批（§7 ③）需 K3 批准（晚间清单 B1/B2）后才落 src，本报告不代跑
3. **数据来源**: 见上（全部实测值来自 10-29 4 新档 xlsx + 解析 JSON + 线上探针；无估算填补）
4. **字段策略**: 报告为 docs-only；不动 src 客户可见内容、不动冻结 title、不动贺卡资产/301 映射
5. **渲染**: 本报告为内部校准文档（docs/），非 user-facing

## 二、校准日三线执行

### 2.1 全站真总量（28d 09-29..10-26, xlsx 真值, 全国家口径）

| 窗口 | clicks | imps | CTR | 加权 pos | 备注 |
|------|--------|------|-----|---------|------|
| 28d | 497 | 20,977 | 2.37% | 13.52 | 10/26 面板 461 跨批方向参考 +7.8% |
| 7d | 140 | 5,498 | 2.55% | 14.17 | 与 28d 档同值（独立文件双方法一致） |
| 24h | 15 | 793 | 1.89% | 13.11 | 滚动窗 10-27T22..10-28T21 |
| 3mo | — | — | — | — | 断崖前基线 714.71/日（n=14） |

**恢复系数**: 785.43（最新 7d 日均）/ 714.71（断崖前日均）= **109.9%**；方法 2（28d 档子窗 732.50）= 107.2%；两法差 2.7pp 归因窗口定义，采用方法 1。最佳单日 10-26（31 clk / 947 imp / 3.27%）；低点 10-24（10 / 594）。

### 2.2 Pillar 收录验证（19:54 线上探针）

| Pillar | 收录状态 | 依据 |
|--------|---------|------|
| 包裝盒 (packaging-box-pricing-2026) | ✅ 在线 | HTTP 200 |
| 防水貼紙 (sticker-material-pvc-vinyl-removable) | ✅ 在线 | HTTP 200 |
| 海報 (poster-printing-guide) | ✅ 在线 | HTTP 200 |
| 校園教育 (campus-education-printing-pillar-guide) | ✅ 在线 | HTTP 200 |
| 燙金 (foil-stamping-3-applications-2026) | ✅ 在线 | HTTP 200 |

### 2.3 抓取状态表补齐

| 检查项 | 状态 |
|--------|------|
| sitemap.xml | ✅ 200 OK（19:54 探针） |
| GSC数据/index.json | ✅ A15 闭环（C6 03:46 重建: latestFreshData 2026-10-29 / FRESH / totalFiles 238） |
| 带钱词 23 词 SSoT | ✅ 10-27 launch pack 沿用，首页 6/23 维持 |
| 盲开词 | 年賀状/2027年賀状/corporate/business holiday cards 双查仍 0（11-04 验证点） |

### 2.4 同口径导出（已闭合）

- 10-29 4 新档 xlsx（全国家口径）+ 词级 JSON（gsc-daily-anomaly）已存；**跨口径禁止混算**（全国家 109.9% vs 三站 108.3% 仅方向参考）。

## 三、matrix 回灌结果（gsc_feedback_2026_10_29）

### 3.1 零点击高展示词（28d imp≥50 & clk=0, 28 词, top 6）
海報印刷 287@14.9 · コミケ 印刷 177@18.9 · 貼紙印刷 118@40.5 · 食品包裝印刷 112@8.7 · 月曆印刷 109@23.1 · 宣傳單張 108@28.3

### 3.2 Striking distance（pos 5-20 & imp≥20, 40 词, top 6）
海報印刷 287@14.9 · コミケ 印刷 177@18.9 · 印海報 126@12.8(clk=1) · 食品包裝印刷 112@8.7 · poster 印刷 77@11.4 · china catalog 76@15.9

### 3.3 CTR 异常（pos≤10 & imp≥10 & clk=0）
zh 食品包裝印刷 112@8.7（首屏零点击）· en small batch sticker printing 56@5.5（首页零点击，页面级实验优先）· zh 即日印刷 28@7.1（clk=1 已破零）

### 3.4 priority_boost 变更
**+2 词**（证据驱动）：食品包裝 +1 / china catalog +1（达标升）。維持观察：貼紙/月曆/教科書（恶化 churn）；即日印刷 clk=1 观察。

## 四、下轮预排

1. **今晚 20:13 gsc-feedback**：幂等键 0453ab66a64d9edd 已用 → 复核跳过重分析（1 cron 1 交付物）
2. **11-01 monthly-matrix 12:13**：教科書印刷 churn 47.1 诊断 + 28d 同口径复测（fetch_gsc_data.py --days 90 新窗口）
3. **11-03 C4/C6 验证点 + AI 面探针 S1**（kit 已备，固定问题集 3 语）
4. **11-04 复测点**：年賀状盲开词 + 貼紙 40.49 锁词 + 急件清理批复测

## 五、边界与验收

- **边界**: 本次零 src 改动（docs-only 补全）；不代跑待 K3 的三市场小批（§7 ③ 在 B1/B2 批准后执行）
- **验收**: 报告 markdown 落盘；5 Pillar 线上探针 200；sitemap 200；index.json FRESH（C6 已验）
- **撞增升级候选（K3 拍板，来自晚间清单 B 段）**: ① ZH-POSTER 价格裁决（score 98.45）② 包装批 1 批准（379faa3f 执行包就绪 + K3-1/2/3/4/6/7）③ 名片域 (a)/(b)/(c) ④ 年賀状 5 问（10-31 截止）⑤ 调度器 4 命令（weekly/blog/monthly 0x800710E0）

## 六、下一步最优推荐（data-driven §7 优先级 × 今日证据）

1. **K3 拍板（唯一瓶颈，队列 WAITING_K3=5）**: B1 ZH-POSTER 按 basePrice 16/20 裁决 + B2 包装批 1 批准（推荐值执行）→ 解锁 §7 ③ 三市场页面级小批（zh 海报/食品包装、en small-batch 续、ja C109），执行包全部就绪，K3 批后即跑
2. **今晚 21:17 daily-content**：若 K3 20:00 前批任一项即执行，否则 NO_OP（队列 0 READY）
3. **明天 10-30 20:52 weekly-meta 复盘**：需管理员修复调度器凭据（scripts/repair-dsh-scheduler-credential.ps1 -Apply -SmokeTest 或 register-cron-tasks.ps1），否则复盘 lane BLOCKED（GSC 全国家 28d KPI + 带钱词 6/23 + 锚点表已由 9ff9a55e 回灌备好）
4. **11-01/11-03/11-04 三个验证点**按预排执行（见四）
5. **§2.2 剩余清毒**：批 B products-content ~145 生成器不可寻（b81463a6 一次性搬移）需 K3 裁决 SOP-5 直改例外；批 C/catalog/sku 为 peer 域避让

## 七、10-30 早间复核（K3 指令二轮：2 天执行日志 + 新数据）

1. **A17 口径混算闭环（C8，昨晚 44633c9a/c567bf7e/3cf86bc0）**：gsc-feedback 车道 RECOVERY 口径改读 `recovery_ratio_vs_mean28_dynamic`（全国家单序列分母）；cliff detector 已消费 10-29 三站点汇总批（`gsc-cliff-2026-10-30.json` 07:00：hk/jp/us 均全国家 28d 档 4d 龄，cliff_ratio 1.247 / depression 1.019 / **recovery_vs_mean28 = 1.058**）。本报告 109.9%（方法 1 断崖前 714.71 vs 最新 7d 785.43）与 1.058（detector 实时口径）为**不同算法，方向一致均 >100%**，不混算。
2. **weekly 复盘（periodic-review-weekly-2026-10-30 07:01）**：5 个 WAITING_K3 任务（ZH-POSTER/ZH-PACKAGING/EN-STICKER/EN-CATALOG/JA-C109）全部 HOLD（approval gate 未满足，执行层不得自我批准）；ZP-blog-deepfix + ZP-monthly-matrix BLOCKED_INFRA（需 K3/管理员修调度器）；无新 FIX、0 learning candidates。
3. **11-01 批次前置就绪（10-30 07:02 验证）**：Python312 + googleapiclient ✓ / PYTHONIOENCODING=utf-8 ✓ / 凭据 .env + gsc-key.json ✓ / 代理 7892 ✓ / fetch dry-run 2858 行 ✓ / k3-kpi-panel.mjs ✓。数据 10-31 完整后拉新窗口（e36d64fa 提醒已设）。
4. **优先级判定（保持）**：K3 B1（ZH-POSTER 16/20）+ B2（包装批 1）批准 = 唯一瓶颈；10-30 20:52 weekly-meta lane 需调度器修复（0x800710E0），否则复盘 lane BLOCKED；11-01 monthly-matrix 配合教科書 churn 47.1 诊断。
