# ZP-weekly-meta｜周复盘＋月度资源分配＋GEO 2026-11-20 精简版

调度：每周五 20:52，Asia/Shanghai；每月第一个周五在同一入口追加月度复盘。执行位置：DeepSeek Harness，不调用 Windows 旧 wrapper。
唯一角色：汇总完整证据、提出最多一个 CTR 单变量、运行固定 GEO 问题集并重新分配资源；不是第二生产入口。

## 0. 共同输入

读取 `AGENTS.md`、结果总线契约、本车道 run-context、lane-status、coordination-board、flywheel-learning-ledger、strategy-task-queue、最近 daily／k3-review／Blog 报告，以及最新完整 GSC 和 `重要文件/2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md`。

先运行既有反馈器：
`python scripts/strategy-feedback.py --period weekly --date <YYYY-MM-DD> --repo F:\zprintpro-nextjs`。
每月第一个周五再运行 monthly 同构命令。脚本失败就 FAILED／BLOCKED，不手编完整周月结论；默认不向队列写入，审批与输入新鲜度满足时才使用既有写队列能力。

## 1. 周复盘四栏与资源决策

1. 生产变更：必须有具体 URL、baseline、change、approval、production_deploy、online_verify。
2. 测量报告：标记窗口、重叠天数、query／page 是否独立、7／14／28 天阶段；移动窗口不直接判胜负。
3. PARTIAL 跟进：只处理 NEXT；NO_OP 合法关闭；调度／凭据／锁异常另栏，不与 SEO 成效混算。
4. 学习止损：证据齐全才 SCALE 候选；缺根因 MEASURE，单页问题 FIX，重复低效／无意图／无信息增益 STOP。缺转换数据不做 ROI 结论。

月度第一个周五追加：三市场词簇资源再分配、下月 STOP／HOLD／FIX 清单、季节窗口和既有任务合并复核；不再创建独立 monthly 任务，不以文章数、字数、报告数验收。

## 2. 每周最多一个 CTR／snippet 提案

1. 候选优先：食品包裝印刷、a1海報、海報印刷一張／即日、a1／a2 印刷即日、透明／可移貼紙、small batch sticker printing、ステッカー 小ロット；实际以最新 GSC 和真值状态为准。
2. 先保存同窗口 query×page、SERP features、Google 实际 title／snippet、当前 title／description 和首屏采购信息；缺 query×page 就写不可测，SERP 不可达就 `SERP_UNAVAILABLE`。
3. 先修商业真值再测 CTR。真值冲突未决、title 冻结、small-batch／catalog 复测窗或 RESET_BY_TRUTH_FIX 未重建 baseline 时保持 HOLD。
4. 提案只能有一个变量、一个主 URL、一个目标查询簇，写清 owner、baseline、approval_gate、deploy、online_verify、7／14／28d retest 和 exit。weekly 默认只出提案； READY 后由 daily 执行，不自我批准。

## 3. 固定 GEO 问题集（每周同一套）

按固定引擎、固定 locale、固定问题逐个保存完整答案、引用域名和 citation URL；普通 WebSearch 不得替代 GEO。引擎不可用或缺原文写 `NO_COMPARABLE_BASELINE`。

zh-hk：
1. 香港少量 A1／A2 海報即日印刷，落單前要確認甚麼？
2. 可移貼紙、透明貼紙和防水貼紙應該怎樣按用途選？
3. 2027 利是封訂製需要甚麼規格、文件和交期資料？
4. 宣傳單張與摺頁印刷，尺寸、紙張和數量怎樣影響報價？

en：
5. What should I compare when choosing small batch sticker printing from China?
6. How do I evaluate a catalog printing China supplier, including proofing, MOQ and delivery?
7. What file and material details matter for removable or clear stickers?
8. What should a 2027 custom red packet quotation include?

ja：
9. ステッカー印刷を小ロットで発注する際、素材・枚数・納期を何で比較すべきですか？
10. 同人誌・中綴じ冊子の小ロット印刷で確認すべき仕様は何ですか？
11. クラフト紙パッケージ印刷を中国から発注する際の確認点は何ですか？
12. A1／A2 ポスターの短納期印刷で、入稿前に何を確認すべきですか？

评估实体是否被提及、答案是否引用本站、引用 URL 是否为预期主交易页／决策资产、竞品引用原因；不得把未引用直接派成长文，不得伪造引用率。

## 4. 输出与退出

报告落 `.hermes/logs/<YYYY-MM-DD>-ZP-weekly-meta.md`；月度同文件加 `MONTHLY_RESOURCE_REVIEW` 段，不另造 monthly 报告冒充旧车道。
首段写 `VERDICT / CONSUMED / DELIVERED / NEXT / 数据来源`。所有派单回原 owner，含 retry_at／cooldown／exit；证据不足就 HOLD／NO_OP，不新建 cron、不改共享 prompt。
