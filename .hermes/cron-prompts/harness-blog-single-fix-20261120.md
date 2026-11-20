# ZP-blog-deepfix｜Blog 单篇补缺（恢复生产）2026-11-20 精简版

调度：每周六 19:08，Asia/Shanghai。执行位置：DeepSeek Harness 模型入口，不调用 Windows 旧 wrapper。
唯一角色：每轮最多复写或新写一篇确有信息增益的文章；不再把“只读验收”当本入口默认职责，也不为凑产量硬写。

## 0. 开工与生产门

1. 读取 `AGENTS.md`、结果总线契约、`run-context-ZP-blog-deepfix.json`、lane-status、coordination-board、flywheel-learning-ledger、strategy-task-queue、Blog 队列、最近 GSC 和两周主报告。
2. 写 `src/data/blog-data/*.json` 前再次检查 `.hermes/locks/lane.lock` 与 `SESSION_LOCK.md`；锁不可判定或冲突就不写 src。
3. 只选一个 `owner_lane=ZP-blog-deepfix`、READY、证据和 write_scope 完整的 bounded task。DONE 跳过，PARTIAL 只做 remaining，WAITING_K3 不自批。
4. 先查既有文章、主交易页、git log 和上轮报告。已有内容能覆盖采购问题就 NO_OP；深位词、零点击或 AI 未引用本身都不是写文理由。

## 1. 信息增益判定

只有“现有交易页＋既有文章仍缺少可验证的采购决策信息”才生产，且至少新增一种独特资产：

- 尺寸／数量／材质／工艺／装订选择表，明确适用与不适用条件；
- 文件、出血、色彩、白墨、刀线、拼版、打样等可执行检查表；
- 成本构成与报价输入清单，不使用未批准价格；
- 生产、国际运输与交付的边界说明，避免把即日生产写成即日海外送达；
- 主交易页无法容纳但有真实搜索需求的对比、风险或采购流程。

优先复写既有 `poster-printing-guide`、`sticker-buying-guide`、`catalog-printing-china-supplier-guide` 或队列指定文章；不新建同义 slug。海报一張／小量、透明／可移貼紙、en catalog 采购、ja 小ロット与装订只在证据和商业真值齐全时选题。季节主题先核活动日期，C109 等过期意图不得机械追热点。

## 2. 每轮最多一篇，交易页分工不变

- category／PDP 承接“印刷／訂製／printing”交易主词；Blog 提供采购决策与证据，不抢主交易 URL。
- 默认只处理队列指定 locale，不自动三语翻译。zh-hk 用繁体；en 强化跨境采购风险与规格；ja 用自然日语并清除中文残留和模板变量。
- MOQ、价格、交期、认证、产能、案例、折扣、活动日期只能来自 products.ts、price-tables 或可定位拍板；冲突即阻断，不能从旧 Blog 复制。
- 不做 canonical／301／noindex／砍页，不碰名片展示层、贺卡资产、冻结 title 或其他车道文件。SKU SEO 派生文件守 SOP-5。

## 3. 实际写深度文章时的质量门

1. 遵循 `docs/2026-09-08-title-rules-and-deep-blog-standard.md` 的现行 12 段标准；首段直接回答，包含真实比较表、采购流程、限制、FAQ 和自然内链。信息增益优先于篇幅和关键词密度。
2. FAQ 使用生产解析器可识别的格式，首句直答、可独立引用、与可见正文一致；确认页面已有生成区 FAQPage 后才可处理内嵌 JSON-LD，禁止重复 schema。
3. 运行 FAQ 预检、`blog-quality-12-rules-guard`、近重复检查、JSON／slug／内链断言、encoding、tsc、`check-brand-mentions.mjs --strict` 及仓库规定检查。只有实际写深度文章时才以 12 段门禁作为该文交付门；纯审计或 NO_OP 不伪造文章验收。
4. 保存 baseline／change／approval／production_deploy／online_verify／7·14·28d retest／exit。push 不是部署证明，线上未核验就交 k3-review，不进入学习或 SCALE。

## 4. 报告与合法退出

报告落 `.hermes/logs/<YYYY-MM-DD>-ZP-blog-deepfix.md`，首段写：
`VERDICT / CONSUMED / DELIVERED / NEXT / 数据来源`。

DELIVERED 必须区分“实质新写／复写一篇”“结构维护”“仅复测／审计”“NONE”。没有信息增益、真值未决或队列无 READY 时写 NO_OP／BLOCKED；不得把只读验收伪装成长文停产原因已解决，也不得为每周一篇制造近重复内容。
