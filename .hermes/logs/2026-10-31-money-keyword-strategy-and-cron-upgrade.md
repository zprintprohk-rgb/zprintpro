# 带钱大词战略与深层 Blog 车道升级交付报告

日期：2026-10-31  
范围：三站点 SEO／AEO／GEO 战略、zh-hk 带钱词诊断、`ZP-blog-deepfix` 提示词与机器队列  
执行边界：未修改 `src/`，未 commit／push，未手动触发生产 wrapper

## 数据来源

- `GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx`，窗口 2026-09-30 至 2026-10-27，全国家口径。
- `.hermes/logs/money-keyword-query-evidence-2026-10-31.json`：17 个有当前精确匹配的带钱查询。
- `.hermes/logs/zh-hk-money-blog-inventory-2026-10-31.json`：26 个相关 zh-hk Blog 条目。
- `src/data/category-seo-content.ts`、`src/data/products.ts`、`src/data/blog-data/zh-hk.json` 与线上五个主 category 页面。
- Google Search Central 官方规则及香港、美国、日本竞品公开采购页面；详见战略报告逐项引用。

## 一、战略结论

1. **需要调整定时任务，但根因不是 Blog 不够长。** 贴纸、海报、包装已有 8,000–18,000 字长文，主词仍停在 29–41 名；继续增加泛文不会自动解决交易页承接与商业口径问题。
2. **交易主词由 category／PDP 承接。** Blog 只补采购决策、规格证据、限制条件和主题权威，不另建同义交易页。
3. **首轮只有宣传单张存在明确新文缺口。** 贴纸复用 `sticker-guide`，书刊复用 `textbook-printing-guide`，包装复用价格／盒型指南，海报复用现有 guide 家族。
4. **当前不能宣称已证实内耗。** GSC 查询、网页、国家是独立表；主 URL 展示份额必须等待 query × page × country 联接。禁止据此直接 301、canonical 或砍页。
5. **商业真值门禁保持。** 海报、包装批 1、en sticker、en catalog、ja C109 仍为 WAITING_K3；本轮未借战略或队列自动执行商业变更。

## 二、已交付文件

- `docs/2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md`：大词矩阵、事实／假设／待验证分层、三市场竞品、五大 zh-hk 主线、en／ja 分工、12 周路线、停止规则和 KPI。
- `docs/assets/2026-10-31-money-keyword-positioning.png`：17 个真实查询的展示、点击与排名分层图；`教科書印刷` 因本档无匹配未绘制。
- `.hermes/cron-prompts/blog-money-keyword-queue.json`：8 个词簇；1 个 `queued`、2 个 `review_or_rewrite`、5 个 `blocked_waiting_k3`。
- `.hermes/cron-prompts/zprintpro-blog-deepfix.md`：由 1,997 行历史叠加提示词收敛为当前结果总线＋带钱词决策资产规范。
- `scripts/analyze-money-keywords-20261031.py`、`scripts/render-money-keyword-chart-20261031.py`：可复核的数据提取与图表生成脚本。

## 三、现有任务如何获得学习能力

没有新增第八条 cron，也没有修改触发时间。保留 `ZP-blog-deepfix`，通过以下闭环实现受约束学习：

1. 开工读取 run-context、lane-status、结果总线、最新 GSC 和队列。
2. 相同 cluster＋slug＋信息缺口已交付且未到复测日，跳过；每轮最多 1 篇。
3. 成功交付后回写 `remeasure`、`last_delivered` 和 7 天复测日期，再进入 14／28 天复测。
4. 失败模式写入当前词簇的 `learning.last_failure_mode` 与 `next_run_constraints`，防止下轮重犯。
5. 商业真值不足转 `blocked_waiting_k3`；无信息增益允许 NO_OP；不得硬写泛文。
6. 周／月汇总沿用既有 `ZP-k3-review`、`ZP-monthly-matrix`，本车道不自行创建新调度实体。

## 四、验证结果

- 队列 JSON 解析通过：8 项、必填字段完整、仅 1 项可新建队列、5 项保持商业阻断。
- 新 slug `flyer-printing-buying-guide` 在 `src/` 未发现冲突。
- 旧恢复模式、历史大脑注入、过期名片禁令、每轮 2 篇及旧 FAQ 组数等残留扫描为 0 命中。
- `node scripts/guards/rule-translation-guard.js --verbose` 初次仅报告本提示词两处 producer hash 漂移；12 段 SSoT 与 guard 脚本 hash 未变。核对绑定后执行 `--stamp`，复验 **3 条绑定全部一致、0 漂移**。
- `.hermes/cron-lanes.json` 保持 `WEEKLY / SAT / 23:47 / timeoutSeconds 3600`。
- `schtasks` 与 `Get-ScheduledTask` 双方法确认：State=Ready，DaysOfWeek=SAT，NextRunTime=2026-10-31 23:47。
- wrapper 仍读取 `.hermes/cron-prompts/zprintpro-blog-deepfix.md`，无需重新注册任务。
- 调度器历史 `LastTaskResult=2147946720 (0x800710E0)` 仍在，LastRunTime=2026-10-25 11:22:59；这是上次运行结果，不能被本轮静态配置验证覆盖或解释为已恢复。

## 五、未做事项与下一判定点

- 未修改 `src/`，未 commit／push，未增加 Cloudflare build。
- 未运行生产 wrapper，未声称自然调度已跑通。
- 下一次自然点火后才可验收：是否读取新队列、是否最多交付 1 篇、是否写当日报告、是否正确回写学习与复测状态。
- 下一轮 GSC 应补 query × page × country 导出；没有该联接时，主 URL 展示份额和 cannibalization 仍属待验证。
