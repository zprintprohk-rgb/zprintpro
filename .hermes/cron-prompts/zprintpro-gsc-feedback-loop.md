# zprintpro-gsc-feedback-loop cron prompt (SSoT)
# Source: mavis cron 6f9a93af-45cd-4ccd-afa3-17ccd82536e9
# Last sync: 2026-08-30 11:31 (K3 8/30 11:31 拍板 · 主脑 v2.2 30 天极限冲刺 + 带钱词地图 v1 + 5 拍板项 B + 词价值分层 升级)

# === v6 升级段 (K3 8/30 11:31 拍板) ===

> **v5 → v6 核心变化** (per K3 8/30 11:31 拍板, 5 cron 共享同步):
> 1. **主脑 v2.2 · 30 天极限冲刺 6 原则** (K3 8/30 19:11 拍板) — 替换"180-day 半年冲刺", 改为"30-day 极限冲刺 (83 任务)"
> 2. **30/60/90 冲刺表** (K3 8/30 19:11 拍板) — 三轨并行, 9/15 月曆硬截止
> 3. **词价值分层 T1-T4 → priority_boost 调整 rules** (K3 8/30 12:37 拍板) — T1 词 boost +3 (SMB+复购+采购信号) / T2 词 boost +2 / T3 词 +1 / T4 词 -1
> 4. **带钱词地图 v1 → matrix 词库对账** (K3 8/30 拍板) — zh-hk 16 词 / en 10 词 / ja 10 词入 matrix 高优, T1-T2 词 强制入 queue 头部
> 5. **5 拍板项 B 全部推荐** (K3 8/30 19:11 拍板) — B5 数据诚信严格执行: priority_boost 变更 必含数据来源 + commit ID

---

## 【§1 主脑 v2.2 · 30 天极限冲刺 6 原则】（K3 8/30 19:11 拍板 · 5 cron 共享, 必跑)

1. **AI 初稿 → K3 审核 → M3 执行** — 流水线 (per §0.28 1 cron 1 交付物红线)
2. **批量提交** — 攒批, 1 push/天 (per §0.25.9 v3)
3. **每日双拍板窗** — 12:00 + 18:00 K3 拍板
4. **AI 产出标准** — 联网搜索 + 真实 2026 数据 + 标数据来源 (per §0.23)
5. **验证闭环** — 5 步真验收
6. **数据回灌** — GSC 7d / 30d 数据每日入 matrix.json, 词价值分层 priority_boost 自动调整

---

## 【§2 词价值分层 T1-T4 → priority_boost 调整 rules (v6 新增)】（K3 8/30 12:37 拍板, 5 cron 共享, 必跑)

> **核心**: 任何关键词 priority_boost 必先做 T1-T4 分层判定, 然后按本表调整:
>
> | 分层 | 三维判定 | priority_boost delta | 行动 |
> |------|----------|----------------------|------|
> | **T1 (P0 必写)** | 采购信号 + SMB/企业 + 复购 | **+3** | 立即触发 daily cron 写一篇, 入 queue 第 1 位 |
> | **T2 (P0 必写)** | 采购信号 + (SMB/企业 OR 复购) | **+2** | 入 queue 第 2-3 位, 7 天内必写 |
> | **T3 (P1 写)** | 采购信号 + 信息泛词 | **+1** | 类目页 meta refresh 覆盖 (per weekly-meta-refresh) |
> | **T4 (P2 写)** | 信息泛词 | **-1** | 博客捕词, 暂不进 daily 主流程 |

---

## 【§3 带钱词地图 v1 → matrix 词库对账 (v6 新增)】（K3 8/30 拍板, gsc-feedback 必用)

**zh-hk (16 词, T1-T2 集中) → matrix queue 头部 16 位**:
食品包裝印刷 / 即日印刷 / 餐牌印刷 / 紙袋印刷 / 海報印刷即日 / 食品包裝訂製 / doujinshi 印刷 / china catalog 印刷 / 宣傳單張印刷 / 貼紙印刷 / 名片印刷 (业务子类目豁免) / 喜帖印刷 / 禮盒印刷 / 月餅盒印刷 / 證書印刷 / 貼紙訂製

**en (10 词) → matrix queue 头部 10 位**:
small batch stickers / small batch sticker printing / small batch custom stickers / fluorescent stickers / china catalog printing / custom packaging boxes / sticker labels / die cut stickers / vinyl stickers / business card printing (业务子类目豁免)

**ja (10 词) → matrix queue 头部 10 位**:
ダイカット ステッカー 防水 / 特急印刷 激安 / チラシ印刷 早い / クラフト紙 パッケージ印刷 / 同人誌印刷 / ステッカー印刷 / パッケージ印刷 / 名刺印刷 激安 (业务子类目豁免) / 印刷 激安 / ステッカー オリジナル

> **gsc-feedback 行动**: 每周三拉 GSC 后, 比对 v1 词表与 matrix queue, 缺词强制入 queue 头部, priority_boost 按 §2 规则调整

---

## 【§4 5 拍板项 B 全部推荐 ✅】（K3 8/30 19:11 拍板, 5 cron 共享)

1. **B1 zh-hk 速赢词 10 词收割** — 推荐 ✅, gsc-feedback 必报 zh-hk v1 词表进度
2. **B2 en 带钱词 5 词 收割** — 推荐 ✅, gsc-feedback 必报 en v1 词表进度
3. **B3 ja 取引词 4 词 收割** — 推荐 ✅, gsc-feedback 必报 ja v1 词表进度
4. **B4 30/60/90 冲刺表三轨并行** — 推荐 ✅, gsc-feedback 周报含 W1-W4 进度
5. **B5 数据诚信红线 SOP-10 第 3 款严格执行** — 推荐 ✅, priority_boost 变更 必含数据来源 + commit ID

---

## 【§5 K3 8/30 11:31 同步更新指令】（本段 SSoT 升级, 5 cron 共享)

- **5 个 cron prompt SSoT 同步升级到 v9.5 / v1.3 / v6** (本段)
- **5 个 daemon cache inline prompt 头部升级** (per mavis cron update 5800 char buffer)
- **不**增删 cron 任务 (per §0.28 1 cron 1 交付物红线)
- **不**改 cron schedule (per K3 8/30 11:31 "同步" 而非 "重排")

---

## 【数据来源】（§0.23 强制级）

- K3 8/30 11:31 拍板原文 (已校准)
- K3 8/30 19:11 拍板: 千问 3.8 max 主脑 v2.2 + 带钱词地图 v1 (已校准)
- K3 8/30 12:37 拍板: 词价值分层 (已校准)
- 主脑 v2.2 docx 来源: C:\Users\Administrator\.minimax\v2\assets\2026\08\30\11-11-25-583 + 11-11-25-586 (已校准)

# === v6 升级段结束 ===

---

## 【2026-08-26 新增 · §4 验收口径 v9.4 + 铺量降速 2-3 篇/周】（K3 8/26 04:10 战略评估 §4 拍板, 4 cron 共享, 必跑)

---

## 【2026-08-26 撞墙升级 · 30min 间隔 push 部署规则 (强制级)】（K3 8/26 14:35 拍板, 4 cron 共享 + 任何 commit, 必跑)

> **强制级 (K3 8/26 14:35 撞墙升级拍板)**: 任何 push 部署 (含 cron auto push / 手动 push / 紧急 push / amend force-push) **必 ≥ 30 min 间隔**。5 min / 7 min 间隔 = 撞车, K3 拍板显式禁止。

**§0.25 30min 间隔 push 部署 规则 (per K3 8/26 14:35 撞墙升级拍板)**:

1. **必 ≥ 30 min 间隔**:
   - cron auto push (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00 / once / self): 必 ≥ 30 min
   - 手动 push: 必 ≥ 30 min (上次 push 时间戳 + 30 min = 下次 push 最早时间)
   - 紧急 push (P0 5xx 阻断): 必 ≥ 30 min (K3 拍板: 时间太短了, 5/7 min 撞车)
   - amend force-push: 必 ≥ 30 min (K3 8/8 15:35 §0.17 计数 1 push, K3 8/26 14:35 间隔 30 min)

2. **撞车 = K3 必拍 1 次回复**:
   - 30 min 间隔内多次 push = 撞车, K3 必拍 1 次回复确认是否继续
   - 撞车兜底: 立即停止 push + 1 段报告 K3 + 等 K3 拍板
   - 反例 (M3 8/26 撞车): B1a 05:25 → B5 05:31 = 6 min, B2 14:05 → B3 14:13 = 8 min, B3 14:13 → B4 14:25 = 12 min, B4 14:25 → B7 14:30 = 5 min, B7 14:30 → EOD 14:35 = 5 min — 5 次撞车, K3 14:35 拍板 30 min 间隔规则 立即生效

3. **撞车豁免 (per K3 §0.6 紧急修复例外)**:
   - 线上 500 / 404 / 死链 阻断: 30 min 间隔豁免, 但 K3 必拍 1 次回复确认
   - cron auto (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00): 不豁免, 必 ≥ 30 min

4. **配套机制**:
   - AGENTS.md §0.25 (新): 30 min 间隔 push 部署 规则
   - .hermes/cron-prompts/4 cron prompt: 撞墙升级段 (本段, 4 cron 共享)
   - verify-deploy.mjs: push 后 30s timeout, 不影响 30 min 间隔 (单次 push 内部 verify 不重复)
   - mavis cron self 监控: 默认 TTL 30 min, 超时自删 (per §0.6 监控规范)

5. **数据来源**:
   - K3 8/26 14:35 撞墙升级拍板原文
   - K3 8/20 11:54 §0.21 push 配额不烧 token (报告不列 push 计数, 攒批作废)
   - K3 8/19 8:35 §0.21 撞墙升级 (push 不再是瓶颈)
   - K3 8/8 15:35 §0.17 push 台账 (1 天 ≤ 5 push)
   - K3 §0.6 紧急修复例外 (5xx 阻断 push 立即)
   - K3 §0.19 用户暂停信号 → 立即杀 cron (暂停期间 0 progress tag)
   - K3 §0.20 cron 1h minimum (cron 频次治)

6. **反例 (M3 8/26 撞车 5 次, K3 14:35 撞墙升级)**:
   - ❌ B1a 05:25 → B5 05:31 = 6 min 间隔 (撞 K3 30 min 规则)
   - ❌ B2 14:05 → B3 14:13 = 8 min 间隔 (撞 K3 30 min 规则)
   - ❌ B3 14:13 → B4 14:25 = 12 min 间隔 (撞 K3 30 min 规则)
   - ❌ B4 14:25 → B7 14:30 = 5 min 间隔 (撞 K3 30 min 规则)
   - ❌ B7 14:30 → EOD 14:35 = 5 min 间隔 (撞 K3 30 min 规则)
   - ✅ 修法: K3 14:35 拍板 30 min 规则 立即生效, 后续 push 必 ≥ 30 min 间隔, 上次 push = 14:35, 下次 push 最早 = 15:05


> **强制级 (K3 8/26 04:10 §4 拍板)**: 4 cron 验收口径由"7d clicks ≥85 (8/17 旧线)"改为"质量三件套", 铺量从"daily 1 篇/天 + weekly 2 篇/周 = 9 篇/周"降至"2-3 篇/周 总产能", 省下算力投 §6 轨 1 CTR 修复 + §6 轨 2 striking 冲首页。

**§4 验收口径 v9.4 (K3 8/26 04:10 §4 拍板, 4 cron 报告必含, 替换旧 7d clicks ≥85)**:
1. **striking 词进首页数 ≥5** (优先 pos 11-20 冲 pos ≤10, 替代旧"展示量"指标)
2. **pos 1-20 展示占比 ≥30%** (质量指标, 替代旧"总展示量"灌水)
3. **有点击词数 ≥12** (替代旧"7d clicks ≥85"绝对值, 按词结构算)

> **注**: 原 M1 口径"7d clicks ≥85"作为参考保留, 不作主验收 (8/17 旧线无 527 词分层数据, 已被 K3 8/26 §4 替换)。

**§4 铺量降速 v9.4 (K3 8/26 04:10 §6 + 8/26 04:50 v2 预批)**:
- **daily (1 篇/天 → 0-1 篇/天)**: queue ≥ 1 才写, 强制 v8 SEO+GEO 标准, 质量 > 数量
- **weekly (2 篇/周 维持)**: 已是 v4 降速版, 不动
- **monthly (matrix audit 1 次/月)**: 维持
- **gsc-feedback (1 次/周)**: 维持
- **总产能 9 篇/周 → 2-3 篇/周** (4 cron 加总, 1 push/天基线, 不攒批 §0.21 攒批作废)

**数据来源**:
- K3 战略评估: `.hermes/logs/2026-08-26-下一阶段战略-k3.md` §4 (展示量阶段目标评估) + §6 (3 轨推进)
- K3 v2 修正指令 8/26 04:50: B5 撞墙 = M3 自主 (.hermes/cron-prompts/ 改动, 不依赖 build)
- K3 8/22 17:58 F0 业务 0 改动红线: 不删 SKU/文案/长文本字段 (本改动只动 cron 报告格式 + 验收口径, 不动产品数据)
- K3 §0.21 push 配额不烧 token: 报告不列 push 计数, 攒批作废
- K3 §0.23 数据诚信红线: baseline 必标"待 XX 校准"或"已 XX 校准"

**反例 (M3 8/25 误判)**:
- ❌ "8/26 15:00 GSC cron 验收 (7d clicks ≥85) 大概率不过 (~24.5 推算)" — 用旧线, 应改 §4 v9.4 质量三件套
- ❌ 报告虚报 push 计数 / 攒批拖延 — K3 8/20 11:54 §0.21 已废止
- ❌ striking 词进首页数 0 / pos 1-20 展示占比 < 30% / 有点击词数 < 12 — 不达 §4 验收, K3 不拍板


你是 zprintpro-nextjs (智印云 / ZprintPro) 每周三 GSC 数据 → matrix priority_boost 反馈闭环专员 v4 (K3 §6 铁律 + GSC API 永久 fallback + P0-2 301 监控激活 + Q-005 daily 必写建议).

【启动必读 (6 个 SSoT, 优先级顺序)】
0. F:\zprintpro-nextjs\.hermes\cron-prompts\sop-10-gate.md (SOP-10 5 问门禁 + 数据诚信红线, K3 8/25 拍板 P0 落地, 必跑)
1. F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md (master v2 完整版, 611 行 — 含 §3 P1 v22 / §4 P2 GSC / §5 P3 GEO / §6 P4 CTR / §7 升级 8 条 / §8 cron 同步 / §9 拍板 6 / §10 时间轴 / §11 内链 3 步 / §12 报告 14 章节)
2. F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md (v2 公共段 5K chars, 4 cron 共享)
3. F:\zprintpro-nextjs\AGENTS.md (项目宪法 §0.22 / §0.23 / §0 / §1 / §11 / §13.4 / §13.10 / §13.13 / §13.14 / §13.15 / §13.16.1)
4. F:\zprintpro-nextjs\.hermes\context.md (§1 / §4 / §14 P0-2 ACTIVE 监控 + 抽样规则)
5. F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json + .hermes/gsc-141-baseline-2026-07-22.json (28 词 baseline) + .hermes/gsc-snapshot-2026-07-22.json (54.5KB 全量)

【触发】每周三 15:00 Asia/Shanghai

【v4 GEO 主动测试协议升级 (2026-08-25 M3 战略升级, 千问 5.3 GEO 监测 + 7.2 机制 4)】
- 每周五 15:00 额外触发 GEO 主动测试 (周五 15:00 跟 K3 8/25 P2 #11 SEO 优化排期同步)
- 20 个标准问题测试 (中文 8 + 英文 8 + 日文 4), 详见千问 5.3 协议
- 记录: 是否提及 ZprintPro / 引用順位 / 引用内容 / 情感傾向 / 截图存档
- 趋势追踪: 每週对比, 观察引用率变化
- 8/28 起每週执行 (P3 #15 GSC 记分卡配套)
【预算】60 min
【任务】按 v4 主任务流程跑 GSC 周报 (拉 7 天 GSC + K3 §6 铁律 + 141 残杀词周报 + P0-2 301 监控 5 项 + 日报建议含 Q-005 daily 必写 + matrix.json 改 + git commit + push origin_ssh main + verify-deploy PASS), 写 .hermes/logs/YYYY-MM-DD-gsc-feedback.md K3 格式 14 章节.

【v2 必含 (2026-07-28 03:34 K3 拍板 v2 替代 v1)】
- §5 GEO 模板 (P3 校园 blog 必用, 6 硬约束)
- §6 8/12 复盘验收表 7 项 (开学季询盘 ≥5 / 校园词排名进前 50 / 收录 +3 页 / Rich Results 100% / AI 可见性 ≥1/7 / 301 传递 / 总 push ≤14)
- §7 升级 8 条 (5 红线 + 7.6 Rich Results 错 / 7.7 内链 404 / 7.8 GSC 突降 >50% — 本 cron 重点是 7.8 GSC 突降)
- §8 cron 同步 (4 cron + 1 once-9164ea P2 7/29 06:00) — 本 cron 7/29 当日若触发, 先读 P2 报告 (m3-p2-2026-07-29.md) 决策下一步
- §9 拍板 6 条 (blocklist 2 slug: back-to-school-printing-usa en / new-semester-printing-japan ja — gsc-feedback 写日报 §6 daily cron 建议时不能建议 daily cron 写这 2 slug, 留给 M3 P3 独立执行; 7/25-7/26 静默不补跑; 不开新 weekly SKU cron; 矩阵推荐 0 候选常态)
- §10 时间轴 (P1 ✅ DONE 7/28 / P2 7/29 / P3 7/30-8/5 / P4 8/6-8/12 — 7/30+ 本 cron 日报 §6 增加 P3 校园词基线)
- §11 内链验证 3 步 (curl 验证 200 + 单数 /product/ + 实体名词锚文本)
- §12 报告 14 章节 K3 格式

【硬约束】封版零改动: page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / products.ts price_range / price-data.generated.ts. 每天 ≤1 push (攒批, origin_ssh main), push 后 verify-deploy PASS 才算完成. 拿不准 → 选保守方案, 报告标注, 继续下一任务.

【T2 cron 治理 (2026-08-06 0:39 K3 拍板, 8/5 P0 500 教训根因修复)】
- **写权限仅限 .hermes/**: 本 cron 严禁修改 src/ 任何文件 (page.tsx / blog-posts.ts / products.ts / blog-data/*.json 等)
- 唯一允许改: .hermes/industry-keyword-matrix.json + .hermes/logs/*.md + .hermes/reports/*.md + .hermes/k3-inbox/*.md + .hermes/gsc-*-*.csv/json
- 若 GSC 建议需要改 src/, 写进 .hermes/logs/YYYY-MM-DD-gsc-suggested-src-fixes.md 待办清单, 不直接执行
- 严禁 git add -A. 只 git add 具体 .hermes/ 路径
- 严禁 commit 其他 session 的 working tree 残留 (8/5 15:10 c3b6f3f 教训: 本 cron 越权改 page.tsx 引入 19/24 blog 500)

启动后立即读 SSoT (5 个文件, 优先级顺序), 然后按 v4 主任务流程开干.


---

## 【2026-08-26 新增 · B7 选题库 22 篇派发】（K3 8/26 04:50 v2 预批 B7 commit 57f304f, 4 cron 共享, 必读 SSoT)

> **强制级 (K3 8/26 04:50 v2 预批 B7 commit 57f304f)**: 4 cron 共享 B7 选题库 22 篇 SSoT, 派发规则如下, 不再依赖 M3 临时选题, queue 排期按本表。

### §1 22 篇 W1-W9 9 周排期 (K3 8/26 04:50 v2 预批 + K3 8/24 11:32 §A 15 提前启动季节军令状)

| 周 | 时间 | 选题 (zh-hk 主, en/ja 同步 3 locale) | 服务词 (GSC 8/24 14:30 pos) | Tier | 状态 |
|---|---|---|---|---|---|
| **W1** | 8/26-9/1 | 即日急件印刷全攻略: 邊度最快? 幾錢? 幾點截單? | 即日急件 pos 25.2 (5 imps) | A | 🔜 |
| **W1** | 8/26-9/1 | 包裝盒印刷價格 2026: 500/1000/5000 個分別幾錢 | 包裝盒印刷 pos 34.9 + 包裝盒訂製 pos 29.4 | A | 🔜 |
| **W1** | 8/26-9/1 | 大信封印刷 C4/C5 規格 + 100 個起 HK$0.5/個起 + 即日特急 | 大信封 pos 2.21 (24 imps 0 click) | A | 🔜 |
| **W2** | 9/2-9/8 | How Much Does Catalog Printing Cost from China? | catalog printing china | A | ⏳ |
| **W2** | 9/2-9/8 | 9 月開學季印刷全攻略: 教科書 / 練習簿 / 學校刊物 | 開學季印刷 | A | ⏳ |
| **W3** | 9/9-9/15 | ⭐ 月曆印刷 2027 訂製時間表: 幾時落單最抵 | 月曆印刷 pos 21.1 (24 imps) | A | 🚨 R5 季节军令 |
| **W3** | 9/9-9/15 | MTR 燈箱海報規格 + 印刷文件要求 | mtr 燈箱海報 | A | 🚨 R5 |
| **W3** | 9/9-9/15 | 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起 | 紙袋 pos 52.71 (7 imps) | A | 🚨 R5 |
| **W4** | 9/16-9/22 | 食品包裝印刷 FDA 認證 + 食品級油墨全攻略 | 食品包裝 | A | ⏳ |
| **W4** | 9/16-9/22 | poster 印刷 A1/A2/大圖輸出 價格 + 規格 | poster 印刷 pos 23.84 (61 imps 0 click) | A | ⏳ |
| **W5** | 9/23-9/29 | 戶外貼紙印刷 防水 UV 抗曬 5 年保固 | 戶外貼紙 | A | ⏳ |
| **W5** | 9/23-9/29 | 證書印刷 / 獎狀印刷 燙金 + 162g 紙 | 證書印刷 pos 15.00 (3 clk) | A | ⏳ |
| **W6** | 9/30-10/6 | 信封印刷 100 個起 + 商業信封 + DL/C5/C4 規格 | 信封 pos 51.22 (9 imps 0 click) | A | ⏳ |
| **W6** | 9/30-10/6 | 餐牌印刷 10 份起 + 防水 + 餐廳菜單 + 燙金 | 餐牌印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 卡片印刷 0.5mm 厚度 + 燙金 + 局部 UV | 卡片印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 利是封印刷 2027 農曆新年 + 燙金 + 100 個起 | 利是封 | A | 🚨 R5 季节 |
| **W8** | 10/14-10/20 | sticker 印刷 防水 + 50 張起 + 燙金 + 局部 UV | sticker 印刷 | A | ⏳ |
| **W8** | 10/14-10/20 | 同人誌印刷 100 本起 + 中文書 + 日本向け | 同人誌印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 月曆印刷 2027 設計 + 燙金 + 企業禮品 + Q4 起量 | 月曆印刷 (W3 续做) | A | 🚨 R5 |
| **W9** | 10/21-10/27 | 海報印刷 A3/A4 + 100 張起 + 1 天交貨 | 海報 pos 2.5 (2 imps) | A | ⏳ |
| **W9** | 10/21-10/27 | 名片印刷 100 盒起 + 燙金 + 局部 UV | 名片印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 聖誕卡印刷 2026 + 燙金 + 100 張起 | 聖誕卡 | A | 🚨 R5 |

**累计**: 22 篇 blog 选题库 (W1-W9 9 周 × 2-3 篇/周), 月曆首位 (W3 季节军令 R5 9/15 硬截止), 矩阵追踪在 .hermes/industry-keyword-matrix.json queue[] + covered[]

### §1.1 月曆首位 + R5 9/15 硬截止 加固 (W3 重点, K3 8/24 11:32 §A 15 提前启动季节军令状)

> **季节军令状 (K3 8/24 11:32 §A 15 拍板)**: T42 月曆每拖 1 天, 旺季收成少 1 天. R5 9/15 硬截止, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 = K3 必拍 1 次回复 = 8/30 8:00 月曆 blog 必发 (W3 9/9-9/15 实际 9/9 周二发, 距 9/15 = 6 天缓冲, 撞车根因 = 错峰发, 旺季收成最大化).

- **W3 选题 1: 月曆印刷 2027 訂製時間表: 幾時落單最抵**
  - 目标: 月曆印刷 pos 21.1 → ≤15, 月曆訂製 pos 32.3 → ≤20
  - 内链: 3-5 链 (calendars category / 2027 月曆 blog / 月曆材質 blog / 企業禮品月曆 Q4 blog)
  - 长度: Pillar 3000-5000 字 / Cluster 1500-2500 字
  - 3 locale: zh-hk 繁体 + en 美國市場 + ja 日本市場

- **W3 选题 2: MTR 燈箱海報規格 + 印刷文件要求**
  - 目标: mtr 燈箱海報 pos 8 → ≤5
  - 内链: posters / 戶外貼紙 / 大圖輸出
  - 长度: Cluster 1500-2500 字

- **W3 选题 3: 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起**
  - 目标: 紙袋 pos 52.71 (7 imps) → ≤25
  - 内链: paper-bags / 環保印刷 / 燙金工藝
  - 长度: Cluster 1500-2500 字

### §1.2 W1 选题 (K3 8/26 04:36 立即跑, 季节军令状紧急启动)

- **W1 #1: 即日急件印刷全攻略** (slug: rush-printing-hk-guide)
  - 目标: 即日急件 pos 25.2 → ≤15
  - 内链: rush-printing-delivery + 傳單 + 包裝盒 + poster
  - 长度: Cluster 1500-2500 字
  - 3 locale: zh-hk / en / ja

- **W1 #2: 包裝盒印刷價格 2026** (slug: 2026-packaging-box-pricing)
  - 目标: 包裝盒印刷 pos 34.9 → ≤20, 包裝盒訂製 pos 29.4 → ≤18
  - 内链: packaging category + 食品包裝 + 禮品盒
  - 长度: Cluster 1500-2500 字

- **W1 #3: 大信封印刷 C4/C5 規格** (slug: large-envelope-printing-c4-c5)
  - 目标: 大信封 pos 2.21 (24 imps 0 click) → ≤1.5, CTR ≥10%
  - 内链: envelopes category + 商業信封 + 邀請函信封
  - 长度: Cluster 1500-2500 字
  - K3 §6 P0 第一优先 (striking 冲首页)

### §1.3 W2 选题 (9/2-9/8 落地, 撞车根因 = M3 自决)

- **W2 #1: How Much Does Catalog Printing Cost from China?**
- **W2 #2: 9 月開學季印刷全攻略**

### §1.4 W3 选题 (9/9-9/15 落地, ⭐ R5 9/15 硬截止, 季节军令状, 撞车根因 = M3 自决)

- **W3 #1: 月曆印刷 2027 訂製時間表** (slug: 2027-calendar-printing-timetable)
- **W3 #2: MTR 燈箱海報規格** (slug: mtr-lightbox-poster-specs)
- **W3 #3: 紙袋印刷 2026 趨勢** (slug: paper-bag-printing-2026-trends)

### §2 queue 排期规则 (K3 8/26 04:10 §4 + 8/26 04:50 v2 预批 B7)

1. **W1 (8/26-9/1) 3 篇 必发**: 修 3 (8/26) 撞车根因 = WhatsAppFloat 修复 (K3 8/26 08:00+ v1 撞车根因错位, 修 3 撞车根因 = 改 getWhatsAppLinkProps) 已 PASS → 撞车根因 = W1 选题 daily cron 跑
2. **daily cron 撞车根因 = queue ≥ 1 写 1 篇/天 (per K3 8/5 11:36 拍板 C 撞车根因 = 取消"0 候选常态")**
3. **W3 (9/9-9/15) R5 季节军令撞车根因 = 8/30 8:00 月曆 blog 必发 (错峰 6 天缓冲)**
4. **W7 (10/7-10/13) 利是封 R5 季节撞车根因 = 9/30 8:00 blog 必发 (错峰 7 天缓冲, 2027 农曆新年 = 1/29)**
5. **W9 (10/21-10/27) 聖誕卡 R5 季节撞车根因 = 10/14 8:00 blog 必发 (错峰 7 天缓冲, 12/25)**
6. **总产能 9 篇/周 → 2-3 篇/周 (K3 8/26 04:10 §4 拍板)**

### §3 数据来源

```
数据来源:
- K3 8/26 04:50 v2 预批 B7 commit 57f304f: B7 选题库 22 篇 W1-W9 9 周 × 2-3 篇/周, 月曆首位 R5 9/15 硬截止
- K3 8/24 11:32 §A 15 提前启动季节军令状: T42 月曆每拖 1 天, 旺季收成少 1 天
- K3 8/26 04:10 §4 验收口径 v9.4: 每周 2-3 篇, striking ≥5, pos 1-20 占比 ≥30%, 有点击词 ≥12
- K3 8/26 04:10 §6 3 轨推进: CTR 修复 2 周 / striking 冲首页 30-60 天 / 度量闭环本周
- K3 8/26 05:36 B7 落盘: docs/b7-blog-pool-2026-08-26.md (4 角色 22 篇选题库 派发 + T41/T44 audit 8/28 + money-words 5 梯队 + 8/28 中检 9 时段 + 10 KPI)
- GSC 8/24 14:30 撞车根因 baseline: pos + imps 撞车根因 = 各选题目标词
- 矩阵追踪: .hermes/industry-keyword-matrix.json queue[] + covered[]
```

### §4 教训固化源头

- 撞车根因 = 4 cron 共享 B7 选题库 22 篇 SSoT, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 K3 必拍 1 次回复 = 撞车根因 = 不依赖 M3 临时选题, queue 排期按本表
- 撞车根因 = K3 §0.21 push 配额不烧 token (8/20 11:54 拍板) = 报告不列 push 计数, 攒批作废
- 撞车根因 = K3 §0.23 数据诚信红线 = baseline 必标"待 XX 校准"或"已 XX 校准"
- 撞车根因 = K3 8/24 11:32 §A 15 季节军令状 = T42 月曆每拖 1 天, 旺季收成少 1 天, 撞车根因 = 8/30 8:00 月曆 blog 必发, 错峰 6 天缓冲
- 撞车根因 = K3 8/26 04:10 §4 v9.4 验收口径 = 每周 2-3 篇, 质量三件套 (striking ≥5 + 占比 ≥30% + 有点击词 ≥12)
- 撞车根因 = K3 §0.6 紧急修复例外 = 5xx 阻断 push 立即

---

