# 风险登记册 · 2026-09-08（K3 v4.0 执行期）

> 原则：异常路径有预案、监控信号有阈值、回滚有具体命令；触发即执行，不重新发明。

## R1 · SEO 排名异常

| 信号（阈值） | 可能原因 | 处置/回滚 |
|--------------|----------|-----------|
| 重点词 pos 周降幅 >10 位且持续 2 周 | title 改动负面 / 竞品挤压 / 算法波动 | ① 对照 Search Engine Journal 算法确认（联网）② 若在 title 2-4 周冻结窗内：窗满后 v2 回滚方案（保留旧 title 备份在 git 历史）③ 簇内互踩排查（同词双页） |
| 收录丟失（site: 页面数骤降 / URL Inspection 报 Excluded） | 大改动后重爬抖动 | IndexNow 补推 + GSC 请求编入索引；连续 2 周不恢复→升级排查 canonical/hreflang |
| CTR 判定窗后仍 0 点击 | title 钩子无效 | 按 A8 流程进 title v2 清单（9/13 K3 放行后改）；禁止窗外抢改 |

## R2 · 生产部署异常（CF Pages）

| 信号 | 可能原因 | 处置/回滚 |
|------|----------|-----------|
| push 后 20 分钟线上无新部署 | 构建失败 | 查 CF Pages build log；本地复跑 `npm run build`；修复后重推（新 commit，禁 force-push） |
| 线上 FAQ 未更新/旧缓存 | CDN 缓存 | 确认部署探针（next.config 独有路径如 /products/ 复数）而非 _redirects 路径；等待或 CF 面板 purge |
| 部署后页面 500/白屏 | 数据层运行时错误 | **回滚**：CF Pages → Deployments → 上一个成功版本 Rollback；本地 `git revert <hash>`；复验 5 步真验收 |
| _redirects 与 next.config 冲突致错误落点 | 规则次序 | 用 next.config 独有路径探针判定部署版本；redirect 回归用 6 条 greeting 目标规则表核对 |

## R3 · 数据/转化链路

| 信号 | 可能原因 | 处置 |
|------|----------|------|
| 008 计数器 0 读写 | 零询盘 vs 链路未通 | 先探针实测 /quote 提交 + WA 点击是否入库；链路断→修 burial 埋点；真零询盘→CRO 检查（见 R4） |
| GA4 G-XXXX 迟迟不给 | 北极星黑盒延续 | 按 v4.0 P0 #3 撞墙升级口径，9/16 M1 验收 L4 层标 [数据缺口] 验收降级 |
| 询盘台账与 GA4/GSC 数字对不上 | 归因窗口差异 | 按 weekly-template §三对账规则出书面说明；禁止改数凑平 |

## R4 · CRO 假设失效

| 信号 | 处置 |
|------|------|
| 品类 FAQ 上线 2 周后信封/月曆页点击/询盘无起色 | 复盘 FAQ 是否被 SERP 收录（Rich Results 抽检）；检查 PDP 首屏 CTA 与 FAQ 位置冲突；进 A/B（zp_ab_bucket）候选 |
| A/B 样本不足误判 | 每桶 ≥100 会话前不下结论；记录预注册假设防事后归因 |

## R5 · 内容治理（红线级）

| 风险 | 闸门 |
|------|------|
| 名片词回流（最高规则） | push 前扫描 `名片|咭片|business-card|Business Card|名刺|name card`，范围 src/+public/+根配置，命中>0 阻断；豁免 redirect 源行/.bak/docs 历史快照 |
| en/ja title 繁中污染 | 批量 title 改动前后跑污染校验（P0 bug 级） |
| CSV regen 覆盖手改 | 改 SKU 层先改 zprintpro-sku-seo-data.csv 再 `node scripts/csv-to-sku-seo.mjs`（四层同改：数据层+生成层+展示层+规则层） |
| 无来源数字/编造 | 每数字标来源（GSC JSON/commit/文件行号）；推演标「推演」 |

## R6 · 多车道并发（AutoClaw 环境特有）

| 信号 | 处置 |
|------|------|
| commit 前暂存区有非本次文件 | `git diff --cached --name-only` 核对；污染则 `git reset --mixed HEAD~1` 退回重提 |
| push 间隔 <30 分钟 | 攒批纪律：≥3 非 docs 文件/≥1 src 修复/≥1 战略交付物才推；30 分钟硬下限 |
| dev server 与 build 并行 | build 前确认 3000-3002 端口空闲（本轮已检，端口全空） |
| tsc 基线漂移 | stash 对照法：改动前后错误集必须一致（本轮 54=54 PASS） |

## 回滚命令速查

```powershell
# 代码回滚（未 push）
git checkout -- src/data/product-faqs.ts
# 代码回滚（已 commit 未 push）
git revert <commit-hash>
# 已 push：CF Pages Deployments → Rollback 上个成功版本
# FAQ 数据单文件回滚
copy F:\zprintpro-nextjs\.hermes\backups\product-faqs.ts.20260908-k3-faq-upgrade.bak F:\zprintpro-nextjs\src\data\product-faqs.ts
```
