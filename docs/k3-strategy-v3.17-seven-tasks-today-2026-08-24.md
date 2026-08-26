# K3 指令 v3.17 — v3.16 七任务今日全清（2026-08-24）

> K3 8/24 11:37 拍板：T41/T42/T44/T45/G2/T39/G1 Vol.2 **全部今天做**，AI 加速。
> 上位 SSoT：k3-strategy-v3.16-full-category-seo-geo-2026-08-22.md（任务定义、验收记分卡不变）
> 数据输入：GSC 8/17-8/23 新鲜数据（527 词，已落 gsc_data.csv，utf-8-sig 修复后首份）

## 一、节奏设计：AI 并行预写 + 5 批串行上线

**原则**：所有任务的改动**并行预写**（AI 一次性读完相关文件、批量起草），但 **push 严格串行**——每批 1 commit 1 push，verify-deploy 绿才开下一批，红灯立即冻结（P1 模式：红灯时唯一允许的 commit 是修复本身）。

| 批次 | 任务 | 内容 | 预估 | 为什么排这里 |
|---|---|---|---|---|
| **B1** | T45 + T42 | envelopes 断点修复（C4/C5 规格+价格最前置）+ zh striking 12 词 snippet 价格前置 + FAQ JSON-LD | 2h | 纯文字层、文件独立、时间最敏感（月曆 9 月旺季军令状 + pos 2.0 点击荒每天纯损失） |
| **B2** | T44 | JA CTR 5 条 snippet 重写（教科書/ステッカー/特急/教材/can badge）+ ジープリント 埋点确认 | 1h | ja 文件独立，与 B1 无交集 |
| **B3** | T41 | EN catalog 集群：catalog-printing PDP 加深（bulk/wholesale 段）+ books 类目内链 + 1 supporting blog + FAQPage；**新增词 bulk catalog printing@60.8 一并纳入集群** | 1.5h | EN 矛头轨，含 blog 新路由需第 6 步 curl 验收 |
| **B4** | G1 Vol.2 | 区域 hreflang + ja 摘要 + Organization schema 增量（sameAs + knowsAbout，8/24 daily 实测缺失项）+ IndexNow 提交 | 1h | schema 层，依赖 B1-B3 页面就位后统一提交 |
| **B5** | T39 | IndexNow 自动化脚本入 cron（新 URL 自动提交） | 45 min | 工具层，放最后承接 B1-B4 全部新 URL |
| **G2**（并行） | 实体 0→1 | M3 今天产出材料包：GBP 资料文案 + HK/JP 目录 10 条提交清单（NAP 模板）+ 1 篇第三方 listicle 投放文案；**真人提交动作 K3 排期** | M3 2 turn | 不碰 src/，无撞车风险，材料就绪即可 |

## 二、新增词入池（GSC 8/17-8/23 新发现，随对应批次注入）

- 可移貼紙@16.2 / 防水貼紙@25.7 → B1 贴纸相关 snippet 顺带对齐
- 禮盒訂做@30.8 / 禮盒訂製@38.5 → B1 包装盒/礼盒 Pillar 词根注入
- **bulk catalog printing@60.8** → B3 T41 集群第 4 词
- small batch sticker printing@14.4 → 小单利润轨 EN 集群（4.1/12.7/14.4/58.4 四词成簇），B3 顺带

## 三、每批验收（6 步，全绿才开下一批）

1. encoding UTF-8 LF no-BOM  2. untracked src/ = 0  3. tsc 0 production error  4. build Compiled  5. verify-deploy = success  6. **新增/修复路由 curl 200**（B3 blog、B4 页面必跑）

## 四、红线（不变）

禁 git add -A / 价格不编造（e-print 事实锚+pricing.ts）/ §11 名片禁词 0 / §13.10 NAP 脱钩 / §13.6 内链 0 404 / T11 301 保留 / 阈值二元化（达标/未达标，无"勉强"）/ 每版本延后任务 ≤2 / 报告 §0.21 格式

## 五、今日目标态（8/24 EOD）

- v3.16 9 任务 = **9/9 DONE**
- 8/28 中检从"拍板启动"变为**纯验收对账**（GSC 8/21-8/27 数据 vs 记分卡 + 008 询盘基线首报）
- G2 材料包落盘 `.hermes/k3-inbox/`，K3 真人提交排期 8/25-8/27 任一 1-2h 窗口

---
*K3 拍板 8/24 11:37 / Mavis 落盘 / 执行：M3，今日 5 批串行 + G2 并行*
