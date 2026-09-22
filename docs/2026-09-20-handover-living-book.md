# ZprintPro 交生活书（Handover Living Book）

> **性质**: **活书** —— 每次会话收尾**追加**一条「§9 变更日志」，并**更新** §2 状态快照。
> 不重写历史，只追加（per §0.34.2）。
> **用途**: 新执行层 / 下一位接手者 / 并发会话**第一份要读的文件**。
> **配套技能**: `zprintpro-self-evolution-hardening`（十九类避坑 + 九类能力）、
> `zprintpro-verification-discipline`（度量工具自身缺陷五类）。
> **创建**: 2026-09-20 · **最后更新**: 2026-09-20 19:36（menus 起印量 + 品牌/语种错配清账）

---

## §0 关联产物（唯一发现入口 — 必读，勿跳过）

> **背景**: 2026-09-20 同日有**并发会话**各自产出了交接文档。本活书虽自称「并发会话第一份要读的文件」，
> 但对方**并未读到**它，因而另建了一份 handoff —— 即**发现机制失效**（第三/第四套产物由此衍生）。
> 故此处显式登记全部同族产物，并把本文件确立为**唯一入口**。

| 关联产物 | 路径 | 内容 | 状态 |
|---|---|---|---|
| **本活书（唯一入口）** | `docs/2026-09-20-handover-living-book.md` | 状态快照 / 规则 SSoT / 未完事项 / 并发协议 | ✅ |
| 并发会话 handoff | `docs/2026-09-20-handoff-12seg-and-b2b3.md` | 12 段骨架 / 门禁加固 / B2-B3 内容批次 | ✅ 已入库 |
| 并发会话探针 | `.hermes/_probe-pb/probe-self-evolution-skill.sh` | 自进化技能自检 | ✅ 已入库 |
| 本活书配套探针 | `scripts/probe-skill-handover.mjs` | 38 断言（技能/活书/SSoT/规则同源/门禁） | ✅ 已入库 |
| 只读取证（menus） | `.hermes/reports/menus-drift-and-locale-mismatch-2026-09-20.md` | menus 11 处 DRIFT + 13 处品牌错配实证清单 | ✅ |
| 并发写锁 | `SESSION_LOCK.md`（仓库根） | 人手会话声明式软锁 + 接管区 | ✅ |

> ⚠️ **因并发隔离，正文暂未合并，以本指针为唯一发现入口。**
> **阶段 2（合并正文: 避坑条并入同一 skill + 两探针互引）留待并发会话静默后的安全窗口执行。**

---

## §1 一句话现状

**标题规则口径已三源同源（代码 / 书面 / 报告元数据），58 边界清零；当前唯一阻塞 = 并发会话正在编辑
`src/`（8 个 `MM` 文件），menus 文案层 7 处 DRIFT 待落。**

---

## §2 状态快照（每次收尾必更新）

| 项 | 值 | 取证方式 |
|---|---|---|
| 工作目录 | `F:\zprintpro-nextjs`（唯一生产目录, 目录铁律 §3） | — |
| 分支 / HEAD | `main` / `43945538`（2026-09-20 20:14，**未 push**） | `git log -1` |
| 远端 | `origin` 与 `origin_ssh` **同一仓库**（`git@github.com:zprintprohk-rgb/zprintpro.git`） | `git remote -v` |
| ⚠️ 分支 upstream | `main` 跟踪的是 **`origin_ssh/main` 而不是 `origin/main`**；只 fetch `origin` 会看到**过期的 origin/main** → 会误判「有积压/无积压」 | `git config branch.main.remote` |
| 积压 | **3 条待推**（`deda45f9` / `a7c13edc` / `43945538`）；`origin` 与 `origin_ssh` **两个 remote 均已 fetch，读数一致 a=3 / b=0**（2026-09-20 20:14） | `git rev-list --left-right --count` ×2 |
| 标题当量 SSoT | `scripts/guards/title-equiv.js` → `TITLE_MIN=50 / TITLE_MAX=57`；`band(57)=OK` / `band(58)=TRIM` | `node -e "..."` 实测 |
| 普查 | `node scripts/sku-title-census.mjs` → byBand：无新增 TRIM（menus 6 SKU 均不在 TRIM 榜） | census 复算 |
| 收尾信号 | `git status --porcelain -- src/` 无 `MM` **且** staged 删除归零 → **2026-09-20 19:36 已满足**（src/ 干净） | 见 §7 |
| 线上 | 未验证本轮改动（`a2f636e6` **未 push**）；线上最后部署为 `dba48bac` | `git log origin/main -1` |

---

## §3 规则 SSoT 索引（唯一权威，冲突时以此链为准）

| 主题 | SSoT | 备注 |
|---|---|---|
| 标题目标区 | `docs/2026-09-13-title-batch-T-freeze.md` **§6-3** | K3 2026-09-19 裁决: **50-57, 58 为硬阻断线**；取代 v4 的 50-54 与 9/13 的 50-58 |
| 当量口径（代码） | `scripts/guards/title-equiv.js` | 全角 CJK ×2 / 其余 ×1；**唯一实现**，其他脚本一律 `require` |
| 书面正文口径 | `AGENTS.md` §5 + §0.34.1 + §0.34.3 + §0.29.2.0/§0.29.2.2 取代声明 | 已同源 |
| 车道 prompt | `.hermes/cron-prompts/zprintpro-*.md`（5 条 live，清单 SSoT = `.hermes/cron-lanes.json`） | 已同源 |
| 错误模式库 | `.hermes/regression-guard/error-patterns.md` | 含 `STALE_REMOTE_REF_FALSE_BACKLOG` / `LOCATE_BEFORE_PATCH` / `TIME_READING_UNVERIFIED` |
| 调度 SSoT | `docs/2026-09-19-scheduler-source-of-truth-and-results-bus.md` + `.hermes/cron-lanes.json` | — |

**优先级**: K3 最新拍板 > AGENTS.md > 入口技能 > 专项技能（§0.34.2）。

---

## §4 工具清单（本轮新增 / 修复）

| 工具 | 用途 | 状态 |
|---|---|---|
| `scripts/audit-sku-locale.cjs` | **结构解析**版 locale/品牌审计（配平花括号→求值→遍历 `seo[locale]`） | ✅ 新增, 已入库 |
| `scripts/sku-title-census.mjs` | 标题普查（byBand / 双方法复算 / 报告元数据已改常量插值） | ✅ 元数据更正 |
| `scripts/apply-title-batch.mjs` | 批次落盘（含 `trim-58` 批次定义；断言「变化行数 == 期望槽数」+ 逐字命中 + 备份） | ✅ |
| `scripts/title-audit-v4.mjs` | 全站标题审计（**已改读 SSoT 常量**，消灭 50/58/65/54 硬编码） | ✅ |
| `scripts/sync-title-rule-50-57.mjs` | 规则文本归一化（取代已删除的 `sync-title-rule-50-58.mjs`） | ✅ |
| `scripts/menus-evidence.cjs` | menus 簇实证片段清单（供候选取词，**只读**） | ✅ 已入库（2026-09-20 去 `_` 前缀正式入库） |
| `scripts/verify-menus.cjs` | menus 真值（`products.ts`）vs 标题现状 DRIFT 核实（**只读**） | ✅ 已入库（同日去 `_` 前缀） |

---

## §5 未完成事项（按优先级，含阻塞原因）

| # | 事项 | 阻塞 | 备注 |
|---|---|---|---|
| 1 | ~~**menus 文案层 DRIFT**~~ | ✅ **2026-09-20 19:36 完成**（`a2f636e6`，10 处标题） | 见 §9 第二段 |
| 2 | ~~**品牌-语种错配 13 处**~~ | ✅ **2026-09-20 19:36 完成**（8 ja description + 5 imageAlt） | 结构解析口径：`node scripts/audit-sku-locale.cjs` 四项全 0 |
| 3 | `I18N_POLLUTION` 扩集 | 🔴 需先取日本常用汉字表 | **必须用「常用汉字表补集」驱动**，禁止手工繁体清单（避坑 13） |
| 4 | 4 条预存跨语言 head | 🟡 需先定对应主词 | `custom-red-packets` zh-hk/ja、`save-the-date-cards` ja、`pvc-menus` ja —— 单变量批次，涉主排名词 |
| 5 | 剩余人工改写 ~35 条 | 🟡 待验证窗 CTR 报告 | 多为 ≤12 imps |
| 6 | 跨 SKU 共享模板句残留（避坑 19） | 🔴 **本轮新增取证** | ① menus 数据层 `description`/`body` 仍写「50 本起 / 100 本起 / 100 張」，与已改标题的「10 張/份/本起」**直接矛盾**（避坑 18：只落一半）；② 5/6 menus SKU 名称写「防水PVC」但 spec 是 200g 銅版紙／啞膠覆膜；③ `disposable-menus` feature 与 finishing 自相矛盾 |
| 7 | `wedding-menu-cards` 币种 | 🟡 | 价写 **NT$**（本站 zh-hk 应为 HK$）；且缺 `unitLabel` |
| 8 | GSIM / RFQ Schema | 🔴 无官方信源 | 维持 `PENDING_VERIFICATION`；**不得据营销来源改 Schema** |
| 9 | **ja `imageAlt` 系统性折行** | 🟡 **🔴 确证 25 处已清 (`deda45f9`)**；余 🟡 4 处需人读 | 量测：`node scripts/audit-ja-imagealt-fold.cjs ja`（旧口径 🟠 上限）→ **改用三级分类** `node scripts/diag-brand-audit-gap-and-alt.cjs`（🔴确证 0 / 🟡需人读 4 / 🟢假阳性 81）。⚠️ 旧工具 🟠 口径过宽，56/81 是含假名的**合法日文**（假阳性） |
| 10 | **`CRED_ISO_9001` 167 处** | 🔴 新发现（取证等级仅门童计数） | pre-commit 门童 `真实计数` 报 167；menus 6 个 SKU 的 description/body 就各写「ISO 9001 certified production」。**须先定「是否存在 ISO 9001 证书」**（§0.23 无来源数字红线），再决定清或补证；本会话**未核实真伪** |
| 11 | **`BRAND_LOCALE_MISMATCH` 188 处（全量真值）** | 🔴 根因已定案，修法待裁 | 门童未截断真值 = **188**（此前只在 staged 里看到 39）。分布：`faqs[].a` **39** · `seo-zh-hk-subfield` 58 · 其他 91 · title 类 **0**。**39 处疑为死数据**（产品页 FAQ 走 `coreProductFAQMap`，全 src 无 `getSkuSeo().faqs` 消费点），且该文件是 CSV 派生（SOP-5 禁手搓）⇒ 候选修法 (a) 回 CSV 源头清 / (b) 确证死数据后**请 K3 拍板**给该族建豁免台账 |
| 12 | **`small-bags` 缺 `nameJa`** | 🟡 新发现 | `products.ts` 该 SKU 无 `nameJa` ⇒ 其 ja 段 imageAlt 折行无法用「真值来源」修（本批 25 条全部有源，故未受此限） |
| 13 | **三语标题合规审计 8 项发现** | 🔴/🟠 见 §9 `2026-09-21 00:03` 段 | 全量 300 槽实测（当量/品牌/长尾 3 筛选/GSC 1164 查询实证/量词/CSV↔TS 分叉 219 槽）；**K3 已裁 6 项，余 2 项待执行**（src 修复批 + 生成器 C 方案） |
| 14 | `企業禮品`/`Comiket/應援` 定性 | 🟡 **K3 未裁** | 3+5 槽，GSC 0 实证：按「长尾词」清出 title 还是按「钩子/语境」豁免——请示中；企業禮品相关年历词 G3 上段，窗内数据可辅助判断 |
| 15 | L1-1 SERP 实查 7 条零点击好位置词 | 🟡 窗内动作，未执行 | `食品包裝印刷/a6 尺寸/small batch sticker printing/小冊子印刷/大信封/small batch stickers/邊度有紙袋買`（GSC 9/18：pos 4.4–10、0 点击）→ 三选一清单（改标题/改落点/不可抢），是窗后第一批标题动作的输入 |
| 16 | **月曆页内 MOQ 自相矛盾 + 全站「50 本起印」旧口径家族** | 🟡 **K3 2026-09-21 00:28 已拍 MOQ 口径**（内容批用），文案改动待内容批 | ① 实证：月曆族 6 SKU minQ=1000（products.ts）+ 线上 hero 一致，但 `products-content.ts:7663/7775`「已服務客戶」段写「50 本起印」→ 页内矛盾 2 处；② 同族残留：buying-guides.ts L733/745/747/749/750「書刊 50 本起印（數碼印刷）」×5、blog-posts.ts:1476「迷你月曆 50 本起印」×1；③ **K3 拍板 SSoT**：「数码一本起，到 200 本可以，批量印刷 300 本起」——内容批按此统一全部 MOQ 文案；④ 待裁挂起：products.ts 数据层 minQuantity 是否跟进该口径（影响报价引擎，未获指令不动） |
| 17 | **P1 · 2小時打稿残留用户可见层**（sku-seo-data.ts） | 🟡 待内容批（K3「1小时为统一值」拍板已覆盖） | e569c4a5 只扫了 body 主文案；残留：**description 4 处**（small-batch-stickers zh-hk「免費 2 小時數碼打稿」/leaflets「免費 2 小時打稿」/a2-posters「即日打稿 2 小時」/食品包裝「免費 2 時打稿」）+ **body FAQ 9 处**（leaflet/poster 族 Q&A「即日打稿 2 小時」）；keywords 数组另有 ~35 处「2小時取件/2小時快印」（P2，meta keywords 非可见但仍应统一）。同族：避坑 18「数据层与文案层只落一半」——e569c4a5 是本坑新实录 |
| 18 | **P1 · small-batch-stickers zh-hk MOQ 页内自相矛盾** | 🟡 待内容批 | title「10 張起」vs description「50 張起印」vs body「10 張起印 / 小批量系列可低至 50 張 / 100 張」——同一页 3 种起印量。GSC 主力页（en 396 展示 pos 17.8），页内矛盾伤转化，随 #17 同批清 |
| 19 | **🟠 · en 页美国定位 vs HK 英文搜索者错配**（SERP 实锤 2026-09-21） | 结构性，待 K3 裁 | gl=hk 下 Google 把 en 页排进「small batch sticker(s) printing」SERP，但 en 页全程美国定位（$0.045、4-day USA delivery、$99 free ship）——HK 搜索者看到无关承诺 = 0 点击结构性原因之一；zh-hk 页已有 HK$ 钩子但吃不到英文词。短期动作 = Offer schema 补价格富媒体（窗内可做）；战略选项（en 页加 geo 提示/hreflang 强化/或建 en-hk 变体）待裁 |
| 20 | **🟡 · paper-bags 品类页被 Google 改写标题**（SERP 实锤） | 低 | SERP 显示「手挽紙袋 智印港」而非 product-seo.ts 的「環保紙袋 香港 定製 | 牛皮紙袋/禮品紙袋燙金 | ZprintPro」→ Google 判现 title 与「邊度有紙袋買」查询意图不匹配，回退用 H1。品类 title 差异化不足的信号；品类 title 非 SKU title（不受 9/30 窗约束），改时一次到位低 churn |
| 21 | **seo.ts 品类层旧格式大改** | 🟡 待批处理窗口 | 实证 wedding-invitations 线上 title「燙金喜帖印刷 · 整套婚慶配套 · 燙金 UV 工艺 · 50 套起印」（无品牌尾 + 简体「工艺/套」+ · 分隔）；calendars 品类已是新格式。全品类扫描后一次批处理（品类 title 不受 9/30 SKU 窗约束） |
| 22 | h1-builder「專家」后缀处置 | 🔴 待 K3 一句话 | PDP H1 已旁路 builder（见 §9 15:5x T4 条），builder 现仅服务面包屑等 display 场景——改生成器 or 保留 display 用途 |
| 23 | T3_KEEP 79 槽 GSC 位置复核 | 🟡 待窗后（~9/30） | 30+ 位 / 零点击槽升级大改，输入 = 9/18 GSC 位置带 |
| 24 | 全站简体 T5 批（keywords 层） | 🟡 排队 | keywords 数组大量「定制貼紙/不干膠」等简体残留（本轮只清了月曆族可见层，keywords 全族未碰） |
| 25 | 5 个空 h1 槽补齐 | 🟡 排队 | corrugated-boxes\|ja、name-tags-badges\|zh-hk、wedding-seating-charts\|zh-hk、wedding-suite-bundle\|zh-hk、white-card-boxes\|zh-hk（T4 切换后这 5 槽回落旧渲染） |
| 26 | custom-calendars en desc 实体错位 | 🟡 下批修 | 「Custom custom calendars from ZprintPro **the US**」——ZprintPro 无美国工厂，事实错误级（另：重复词 Custom custom 同句） |

---

## §6 再开工清单（照做即可）

```bash
cd F:\zprintpro-nextjs
# 0. 读状态（禁用未 fetch 的 @{u}）
git fetch origin main && git fetch origin_ssh main
git rev-parse --short HEAD; git rev-list --left-right --count origin/main...HEAD
# 1. 收尾信号（无 MM 且 staged 删除为 0 才可写 src/）
git status --porcelain -- src/          # 期望: 空
git status --porcelain | Select-String '^D ' | Measure-Object | Select -Expand Count   # 期望: 0
# 2. 口径自检
node -e "const m=require('./scripts/guards/title-equiv.js');console.log(m.TITLE_MIN,m.TITLE_MAX,m.band('x'.repeat(58)))"
node scripts/sku-title-census.mjs
node scripts/audit-sku-locale.cjs
# 3. 批次（dry-run 先行）
node scripts/apply-title-batch.mjs --batch=<name>            # dry-run
node scripts/apply-title-batch.mjs --batch=<name> --apply
# 4. 提交（唯一形式: add 与 commit 间无窗口）
git commit -F .hermes/_commit-msg-<batch>.txt -- <path1> <path2>
```

---

## §7 并发会话安全协议（硬约束）

- **收尾信号** = `src/` 无 `MM` **且** staged 删除归零。`MM` = 对方正在编辑。
- **禁止**代为清理对方 staged 删除；**只** `git add` 自己的文件。
- 等待期做**只读并行准备**（证据清单 / 审计工具 / 探针），不空转、不抢文件。
- 历史事故：2026-09-19 lane 与人手同时写 `src/data/blog-data/zh-hk.json` ⇒ 产出 `_broken-zhhk-lane-20260919.json` 坏版（§0.35.5）。

---

## §8 Push 纪律（本轮修正）

1. **先 `git fetch`**，再以 `origin/main...HEAD` 读积压（**禁用 `@{u}`**，见避坑 14）。
2. `origin` 与 `origin_ssh` **同 URL ⇒ 同一仓库**，不存在「推错目标」。
3. Push 前 5 项 verify：① 无中间态（无 `index.lock` / `rebase-merge` / 无半途 staged）
   ② push 目标 ③ 逐条扫描积压并标归属 ④ `src/` 改动范围 ⑤ 备份完整。
4. Push 后三段验证：① CF check-runs 全 success ② 关键 URL 200
   ③ **特征验证必须绕 CF 边缘缓存**（`?_cb=$(date +%s)` + `Cache-Control: no-cache`），
   确认线上返回的是**新**文案（例: `grep -o "10張起"`）。
5. 30 min 间隔硬下限（§0.25）；不足则 **commit 留本地立即结束**，**禁止 `Start-Sleep` 阻塞**。

---

## §9 变更日志（追加式）

### 2026-09-20 · 标题口径归一 + 结构解析 + 交生活书
**已完成**
- `cfa4ea44` 规则口径归一：`AGENTS.md`（§5 / §0.34.1 / §0.34.3 / §0.29.2.0 / §0.29.2.2 / §0.29 v3.1 块 / 规则表）+
  5 条 live prompt + 3 处脚本真阈值分叉（`title-audit-v4.mjs` / `sku-title-census.mjs` / `title-equiv.js` doc block）+
  删除 `sync-title-rule-50-58.mjs`；**更正 AGENTS.md 对 i18n-guard 的两处事实错误**（「中文=1.5」与「上限 65」皆不成立）。
- `cfa4ea44` 门禁缺口修复：`.hermes/cron-prompts/` 补入 `FULL_EXEMPT_PATHS`
  （原只在 `EXEMPT_PATHS` ⇒ `SOP10_CERT_NO` 仍硬拦 ⇒ **5 条 live prompt 长期无法提交**）。
- `15d16aec` 门童 #23 头注更正（「已施加」≠「已生效」）。
- `97869fc5` `trim-58` 批次：8 槽落盘，违规 **28→20**，当量 == 58 **清零**。
- `021d26b9` `school-flyers` `imageAlt.ja` 清除繁体污染（`學校`→`学校` + 去重复）。
- `2638137b` `apply-title-batch.mjs` 增 `trim-58` 批次定义。
- `d45bd4d9` `error-patterns.md` 入档 `STALE_REMOTE_REF_FALSE_BACKLOG`（第 6 种度量陷阱）。
- `a909538f` `scripts/audit-sku-locale.cjs`（结构解析审计，根治 4 次归属类误判）。
- 本活书 + 技能 §五/§六/§七 追加。

**净结果（可复算）**
| 指标 | 值 |
|---|---|
| 标题违规总数 | **28 → 20**（当量 == 58 由 8 → **0**） |
| census byBand | `OK 242→250 / FILL 30 / TRIM 28→20` |
| 行为不变验证 | census 与 title-audit-v4 的 byBand **改前改后一致**（证明仅文本更正） |
| 规则同源 | 代码 / `AGENTS.md` / `docs §6-3` / 5 条 prompt / 报告元数据 **五处同源** |
| 真实品牌-语种错配 | **13 处**（首次用结构解析得出；此前「105」为假阳性） |
| 本会话自身失误 | **4 次同族**（量测口径），**全部当场拦截未上线**；已入档 |

### 2026-09-20 19:36 · menus 起印量口径对齐 + 品牌/语种错配清账（`a2f636e6`）

**起点状态核对（先证伪三条既有结论）**
- 「4 条本地 commit 待推」→ ❌ **已不成立**：并发车道 19:08 已把 4 条推进远端（`origin_ssh`），本侧 `origin/main` 也未 fetch 到 → 一度误判「0 积压」。**真因**：`main` 的 upstream 是 `origin_ssh/main`，只 fetch `origin` 会看到过期 ref（新避坑 20）。
- 「menus 文案层被并发阻塞」→ ❌ **已解除**：`src/` 无 `MM`、staged 删除 0（收尾信号首次满足）。
- 「`scripts/menus-evidence.cjs` 已被清理删除」→ ❌ **不成立**：该文件在库（`9330f96b` 入库，2539 字节），且 `scripts/verify-menus.cjs` 同样在库。

**已完成（`a2f636e6`，1 文件 / 27 行）**

| 组 | 内容 | 当量 |
|---|---|---|
| menus 标题 10 处 | 真值 SSoT = `products.ts`（pvc/laminated/hardcover/drink `minQuantity=10`，disposable=100，wedding=50） | 57/54/57/57/56/55/57/57/53/54 全落 [50,57] |
| ja description 品牌 8 处 | 尾部 `\| 智印港` → `\| ZprintPro` | — |
| imageAlt 语种错配 5 处 | `large-envelopes/ja`（整条纯中文）·`exercise-books/ja`·`textbooks/ja`（`學校`→`学校`）·`thick-greeting-cards-400g/en`·`foil-greeting-cards/en` | — |
| imageAlt 内容错挂 **4 处（本轮新发现）** | `hardcover-menus/ja` 挂 pvc 中文句；`drink-menus/zh-hk`+`ja`、`disposable-menus/ja` 挂别 SKU 中文 FAQ 句 | — |

**可复算净结果**
| 指标 | 改前 → 改后 | 取证 |
|---|---|---|
| ja/en 段「智印港」 | 13（8 desc + 5 alt）→ **0** | `node scripts/audit-sku-locale.cjs` |
| zh-hk 段 ZprintPro / ja 繁体专用字 / en CJK | 0 → 0 | 同上 |
| menus 标题越界 | pvc zh-hk 66(超) · lam/hard zh-hk 37(不足) · 两 en 62(超) · pvc/hard ja 声称 100 与真值 10 矛盾 → **全清** | `node scripts/verify-menus.cjs` |
| tsc | 54 → **54**（持平） | `npx tsc --noEmit` |
| 探针 | 38 PASS / 0 FAIL | `node scripts/probe-skill-handover.mjs` |
| 编码门禁 | 0 | `node scripts/check-encoding.js` |

**本轮新增工具 / 避坑**
- 新增 `scripts/apply-menus-locale-fix.cjs`：**结构定位**落盘器（按 `"slug": {` 段落 + 配平花括号定位 `imageAlt` 块 / `ja.description`；块内旧串必须恰好命中 1 次；新标题当量先断言区间；命中数不符即跳过并报错）。
- **避坑 20（新）**：`origin` 与 `origin_ssh` 同 URL 但 **ref 各自独立**；`main` 的 upstream 是 `origin_ssh/main` → 只 fetch 一个会读到过期积压状态，与避坑 14（禁用未 fetch 的 `@{u}`）同族但**更隐蔽**（fetch 了、还是错）。判据：先 `git config branch.main.remote` 再 fetch 那个 remote，并同时 fetch 另一个。
- **避坑 21（新）**：**dry-run 的价值在于抓「候选本身写错」**，不只是防呆。本轮 dry-run 当场拦下：两处 en 新标题当量 60/62 越界（我按直觉估的删减量不够）、一处 imageAlt 目标串按旧笔记假设的位置**根本不存在**（`pvc-menus/ja` 实际是正常日文，真正的错挂在 `hardcover-menus/ja`）。**「交接文档写的清单」是二手证据，落盘前必须用程序核实命中数**。

**本批未做（不得声称已修）**
1. menus 数据层 `description`/`body` 仍写「50 本起 / 100 本起 / 100 張」+「ISO 9001 certified」→ 与已改标题矛盾（避坑 18「只落一半」正在发生，见 §5 第 6/10 项）。
2. 约 28 处 ja `imageAlt` 疑仍装 zh-hk 中文句（量测 `node scripts/audit-ja-imagealt-fold.cjs ja`：🔴 0 / 🟠 28，🟠 需人读确认后才可动）。
3. `a2f636e6` **未 push**：距上一远端 push（并发车道 19:08）不足 30 min 硬下限，按 §0.25.8 **commit 留本地、不做 `Start-Sleep` 阻塞**。
4. 临时取证脚本（`.hermes/_tmp-dump-alt.cjs` / `_tmp-list-alt.cjs` / `_tmp-dump-locale.cjs` / `_tmp-hkfold.cjs` / `_tmp-commit.ps1`）留在 `.hermes/` 未清理；**有用者已转正** `scripts/audit-ja-imagealt-fold.cjs`（避坑：`_` 前缀会被清理规则命中）。

### 2026-09-20 20:11 · 起印量数字声称对齐 + ja imageAlt 折行清账 + brand-locale 根因定案

**已完成（3 个 commit）**

| commit | 内容 | 规模 |
|---|---|---|
| `b7da6fe5` | menus 起印量「数字声称」全字段对齐 10（zh-hk description / en·ja description / 三语 body / en h1） | 30 行 |
| `98af3752`+`a2f636e6` | 活书第一轮 + menus 标题/品牌错配（前一段已记） | — |
| `deda45f9` | ja `imageAlt` 折行 **25 处**清账 + 4 个只读分诊器入库 | 5 文件 |

**关键净结果**

| 指标 | 值 | 取证 |
|---|---|---|
| menus 数字声称（含 title/description/body/h1） | 6 SKU × 3 locale 全部对齐 `minQuantity`（10/10/10/10/100/50） | `node scripts/verify-menus.cjs` + 逐条 dump |
| ja imageAlt 折行 | 🔴 确证 **25 → 0**；余 🟡4（需人读）/ 🟢81（前工具误报） | `node scripts/diag-brand-audit-gap-and-alt.cjs` |
| `BRAND_LOCALE_MISMATCH` 全量真值 | **188**（此前只见 staged 里 39） | `common.SCAN_STATS` 未截断真值 |
| 其中 `faqs[].a` | **39**，且疑为**死数据**（产品页 FAQ 走 `coreProductFAQMap`，全 src 无消费点） | `page.tsx` L244-248 + 全仓消费点检索 |
| 回归 | `tsc` 54=54 · 探针 38 PASS/0 FAIL · 编码 0 · 结构审计四项 0 | 见各 commit |

**★ 本轮新增避坑 22（量测域不同 ≠ 口径冲突）**
「A 工具报 39、B 工具报 0」时，**第一动作不是判谁错**，而是把**两个工具的字段域并排列出**。
本轮真因：审计工具 `audit-sku-locale.cjs` 只覆盖 `seo[locale].{title,description,h1}` + `imageAlt[locale]`，
**整族漏掉 `faqs[]`**（无 locale 结构的共享数组），而 39 处全在 `faqs[].a` ⇒ 两边其实**合账**（39 = 39）。
⇒ **教训：报「0 命中」的审计工具，必须先声明自己的字段域**；否则 0 无法与任何外部计数对账。
（同族：避坑 2 单一方法必错、避坑 9 行级计数掩盖同行第二匹配、避坑 14/20 stale ref。）

**本批未做（不得声称已修）**
1. `faqs[].a` 39 处中文值：**未动**（疑死数据 + CSV 派生禁手搓）⇒ 候选修法 (a) 回 CSV 源头 / (b) 确证死数据后请 K3 拍板设豁免台账。
2. `BRAND_LOCALE_MISMATCH` 其余 149 处（`seo-zh-hk-subfield` 58 + 其他 91）未动。
3. 🟡 4 条 ja imageAlt（`eco-paper-bags`/`small-bags`/`a1-posters`/`display-posters`）需人读；`small-bags` 在 `products.ts` **缺 `nameJa`**，无法走真值来源修。
4. `CRED_ISO_9001` 167 处真伪未核实。

### 2026-09-20 20:14 · menus 残留 4 处收口 + 自报指标不一致根因（`43945538`）

> **本段由另一并发会话追加**（即 §0 所指的「并发会话」双方之一）。本段**只记事实与取证**，不改写前文（§0.34.2）。

**起点核对（先证伪三条我方旧结论）**

- 「`d45bd4d9`/`a909538f`/`885d03d9` 待推」→ ❌ **已不成立**：`git fetch` 后 `origin/main..HEAD = 0`，
  三条均已推进远端（我方 `9330f96b` 亦被并发方一并推进）。
- 「`src/` 被 8 个 `MM` 阻塞」→ ❌ **已解除**：`git status --porcelain -- src/` = 0，staged 删除 = 0。
- 「`scripts/_menus-evidence.cjs` 被并发清理删掉」→ ❌ **不成立**：`git log --all` 为空 = **从未被跟踪**，
  文件始终在盘。真因 = `git add` 遇不存在 pathspec **整体失败**（详见 `COMMIT_MSG_OVERCLAIMS_TREE`）。

**已完成（`43945538`，3 文件）**

| # | SKU / locale | 改前 → 改后 | 依据 |
|---|---|---|---|
| ① | `drink-menus` / zh-hk | `10本起` → **`10份起`** | 真值 `unitLabel=份`，且**同记录 description/body/FAQ 三方全写「10 份」** → 记录内自相矛盾 |
| ② | `drink-menus` / ja | `10枚〜` → **`10份〜`** | 同 ①（数字已被并发批对齐，**单位字被漏**） |
| ③ | `disposable-menus` / en | `$99+` → **`$100+`**（e 49→**50**） | 同记录 description/body 均写 `over $100` → 兼修长度与数值矛盾 |
| ④ | `disposable-menus` / ja | 补「印刷」(e 46→**51**) | 该 SKU ja keywords 首项；沿用同簇姊妹句式 |

**可复算净结果**

| 指标 | 值 | 取证 |
|---|---|---|
| menus 簇标题落带 | **18/18**（6 SKU × 3 locale，0 超格 0 不足） | `node scripts/verify-menus-equiv.cjs` |
| 品牌-语种错配（4 项） | ja「智印港」**0** / zh-hk「ZprintPro」**0** / ja 繁体专用字 **0** / en CJK **0** | `node scripts/audit-sku-locale.cjs` |
| tsc | **54 = 基线 54**（`sku-seo-data.ts` 0 error） | `npx tsc --noEmit` |
| 编码门禁 | **0**（3/3 UTF-8 LF） | `node scripts/check-encoding.js` |

**新增工具**
- `scripts/verify-menus-equiv.cjs` — **从文件读取**的当量复算器（逐 SKU 切片取 title，输出 equiv/len/带内判定/非 ASCII 码位）。
  存在理由见下条避坑 23：手打字符串会经 shell 改写，不可信。

**★ 本轮新增避坑 23（自报指标与复算不一致 ⇒ 先查输入通道，勿先怀疑工具）**
手打 `"…$99+…"` 经 `node -e "…"`（PowerShell 双引号）传入 `equiv()` 得 **46**，文件实测同行得 **49**，**三个 title 上稳定差 3**。
「稳定偏移」最像工具 bug，极易误判为「当量函数处理 `$`/`+` 有缺陷」。
**真因**：PowerShell 双引号内 **`$99` 被变量展开**，传进去的根本不是文件里的字符串。
⇒ 判据：**稳定偏移 ≠ 必然工具 bug**；更常见的是**输入通道确定性改写**（shell 展开 / heredoc / 引号 / 编码）。
⇒ 修法：**凡复算「文件里的值」必须从文件读**；两法不一致时**先 dump 输入**（len + 码位）而非怀疑量具；
双方法复算必须在**同定义域**（补 `DOUBLE_METHOD_RECOUNT` 的隐含前提）。已入档 error-patterns。

**★ 本轮新增避坑 24（PowerShell 落盘证据 = UTF-16LE + CRLF 双陷阱）**
`node x.cjs | Tee-Object -FilePath out.txt` → git 判为 **`Bin`**，`check-encoding.js` 再报 **CRLF 57 行**。
真因：PowerShell 重定向默认 **UTF-16LE（`FF FE` BOM）**，叠加 `Out-String` 的 `\r\n`。
⇒ 禁 PowerShell 重定向落盘文本；用 `fs.writeFileSync(p,c,'utf8')` + 正规化 `\r\n`；
落盘后自检三件（无 BOM / 不出 `Bin` / encoding exit 0）。已入档 `POWERSHELL_OUTPUT_ENCODING`。

**并发协议实测（本段建立的锁首次运行）**
- 已建 `SESSION_LOCK.md`（仓库根）：声明持有者 / 意图 / 写入范围 / 30 min TTL / 释放条件 + 接管区。
  **不替代** `.hermes/locks/lane.lock`（机器强制，定时车道）；改 `blog-data/*.json` 前仍必须看 lane.lock。
- 实测发现：**并发会话全程未读活书**（它另建 `docs/2026-09-20-handoff-12seg-and-b2b3.md`），
  ⇒ 已修**发现机制**：本活书新增 **§0「关联产物（唯一发现入口）」** 登记全部同族产物，
  并与对方 handoff 建立**双向指针**（正文合并留待安全窗口，见 §0 阶段 2）。
- 实测发现：**并发会话在本轮内仍持续写入**（20:13:47 仍在写 `.hermes/logs/moq-scan-latest.json`），
  且**会 `git reset` 自己的 HEAD**（`reflog` 数次 `reset: moving to HEAD`）→
  **「收尾信号满足」≠「可以写 `src/`」**。判据应加一条：**需叠加「对方 N 分钟无写入」**。

**本批未做（不得声称已修）**
1. `43945538` **未 push**：距远端上次 push（20:09:17）不足 **30 min 硬下限**（窗口 20:39:17 开），
   按 §0.25.8 **commit 留本地、禁止 `Start-Sleep` 阻塞**。
2. `faqs[].a` 中文值、`BRAND_LOCALE_MISMATCH` 其余 149 处、🟡4 条 ja imageAlt、`CRED_ISO_9001` 167 处 —— **均沿用上一段口径，本批未动**。
3. menus **数据层** `description`/`body` 的「50 本起 / 100 本起」措辞：本批只改 title，**正文未逐条复核**（避坑 18 风险仍在）。
4. 仓库 dirty 文件 **619 条**（`??` 占绝大多数）未盘点分类（该入库 / 该 gitignore / 可删）。

### 2026-09-20 20:18 · menus 材质声称对齐 + ja 量词争议（我方记录，供裁定）

**已完成（2 个 commit，本地排队）**

| commit | 内容 | 规模 |
|---|---|---|
| `069a4b2d` | menus **材质声称**与 `specs` 对齐：跨 SKU 共享模板尾巴「防水PVC」→ 覆膜 / 硬殼裝訂 / 即棄（`products.ts` `name`（**og:title 源**）+ gallery `imageAlt.zh-hk` + `sku-seo` `description`） | 12 处 |
| `65198c97` | ja 标题中文量词 `10份〜` → `10枚〜` | 1 处 |

**线上取证**：`curl` 4 个 menus URL 的 `og:title` 实测 = `過膠餐牌 | 餐牌 / 菜單 / 防水PVC | 智印港` ⇒ 误声称**已上线**（每页 4 处），修复有明确客户可见目标。

**⚠️ 与上一段（`43945538`）的分歧 —— ja 量词，未私了，登记待裁**

| 方 | 主张 | 依据 |
|---|---|---|
| 并发会话（上一段 ②） | `10枚〜` → **`10份〜`** | 「真值 `unitLabel=份`，且同记录 description/body/FAQ 三方全写『10 份』」 |
| 本段 | **`10枚〜`**（即上一段 ② 已被本段改回） | 「份」是**中文量词**，日文应用 枚 |

**本段的取证（可复算）**：
- `ja` 段全量扫描含「份」的字段 = **0 处**（`node .hermes/_tmp-ja-counter-evidence.cjs`）；
- 对照：`pvc-menus/ja` 用 `10枚`、`hardcover-menus/ja` 用 `10冊`、`drink-menus/ja` 现为 `10枚`；
- 「同记录三方全写 10 份」的三方 = `description`（zh-hk）/ body / FAQ —— **都是中文段**，不构成日文应写「份」的证据。
⇒ 本段判定：日文里「份」是**孤例 = 中文量词污染**；`unitLabel` 是 **zh-hk 的单位口径**，
   跨语言时须换成本语言量词（枚/冊/部），不能字面搬运。
⇒ **但这是两会话的正面分歧，最终以 K3 裁定为准**（§0.34.2 冲突优先级）；本段不主张单方胜出。

**★ 本轮新增避坑 25（并发车道的「修复」本身会引入新缺陷）**
`43945538` 的 ② 是在**修另一个真问题**（单位字被漏）时引入的新缺陷：把 zh-hk 的 `unitLabel` 字面搬进 ja。
- **根因不是门童失职，是判定维度缺口**：i18n 门童靠**繁体专用字表**判语言错配，而「份」**简繁同形** ⇒ 天然漏检。
- **纪律**：并发车道的 commit **必须逐条人读 diff**（`git show <sha> -- src/`），不能只信其 commit message（写的是「口径收口」）。
- 配套只读工具 `scripts/audit-ja-cn-word-pollution.cjs`：扫 ja 段中文量词/中文语素形态。
  **实测 157 字段命中但绝大多数是日文合法用法**（個〜/本/加工/標準 都是日文词）⇒ 只作提示，**禁止**据此批量改（避坑 13）。

**本批未做（不得声称已修）**
1. `069a4b2d`/`65198c97`/`f7aa63e7` 等 **未 push**：窗口由并发车道登记为 **20:39:17**（per `cdb14b23` 的 SESSION_LOCK 载体），
   且该锁**仍被持有** ⇒ 按 §7 协议**不抢推**，留待窗口 + 锁释放。
2. FSC / 食品接触双轨（FSC=原料可持续；食品接触需 GB 4806.8 / FDA 21 CFR 176.170 / BfR XXXVI / ISEGA）
   —— src/ 现状：FSC 45 文件 / FDA 23 / GB 4806 3 / BfR 3 / SGS 10 / **ISEGA 0**。
   补「FSC + 食品安全合规声明」属对外事实声称，**须先有拍板来源**（§0.23 / SOP-10 第 3 款），本批未动；
   ISO 9001 与食品安全无关，用它暗示食品安全 = 语境误导。
3. `seo-zh-hk-subfield` 58 的逐文件拆分已出（products.ts 26 / pillar-content 18 / buying-guides 7 / product-seo 5 /
   blog-posts 1 / category-seo-content 1）；⚠️ 我方行内分诊器对「3 键挤一行」的块与门童归属口径**不一致**，
   逐条归属**以门童为准**，分诊器只用于排序与取样。

### 2026-09-20 20:22 · 孤儿 SKU 审计 + 量具四级返工（★ 本条最重要：先证明量具）

**起因**：修 🟡4 条 ja imageAlt 时我写下「`small-bags` 在 `products.ts` 缺 `nameJa`」——**误诊**。
真相：`small-bags` 的 **SKU 记录根本不在 `products.ts`**（它只在 `sku-seo-data.ts` 与 `buying-guides.ts` 的
`relatedProducts` 里，`middleware.ts` 另有 308 把 `/product/small-bags/` 迁走）。

**定稿结论（`scripts/audit-sku-orphans.cjs` v4，两数据源各 99/100，结构自检通过）**

| 项 | 值 | 取证 |
|---|---|---|
| `products.ts` 记录 | **99**（行级 slug 锚；`id: 'XX-000'` 记录 92，同量级） | 工具自检输出 |
| `sku-seo-data` 顶层键 | **100**（0–2 空格锚；任意缩进命中 540 ⇒ 证明该锚是顶层判别式） | 同上 |
| 孤儿 SEO 条目 | **1 = `small-bags`** | 差集 |
| 缺 SEO 数据的产品 | **0** | 差集 |

**★★ 本轮最有价值的产出不是结论，而是「量具四级返工」的实测记录**（同一个根因：**锚点假设未先证实**）

| 版本 | 量具写法 | 实测结果 | 后果 |
|---|---|---|---|
| v1 | `^ {4}slug:` | products.ts 有 **4 空格(94)+6 空格(5)** 两种缩进 | 漏 5 个 ⇒ **4 个「假孤儿」**（同人誌/亞克力/襟章/明信片 被算到 `fruit-food-label-stickers` 头上） |
| v1' | `^ {2}"slug": {` | `fruit-food-label-stickers` 的键**顶格(0 空格)**、是全文件唯一例外 | ⇒ **假「缺 SEO 数据」**（它线上 200 且标题正来自该文件） |
| v2 | `new Function` 结构求值 | products.ts 含 TS 断言/函数 ⇒ **求值失败** | 记录数 = 0 ⇒ **静默全量假阳性（最危险的一种失败）** |
| v3 | 双正则交叉 | products 值级锚把 **`categories[]` 的 16 个分类 slug** 也数进来 | ⇒ 工具**拒绝出结论**（exit 2）—— 这是本轮唯一正确的失败方式 |
| **v4** | 锚点经实测确证 + 双自检（记录数同量级 / 顶层 vs 任意缩进对比） | 99 vs 100 | ✅ 出结论 |

**固化纪律（新增避坑 26）**：
1. **先证明量具，再用量具出结论**；「数集合」类审计必须打印 ① 两个独立口径的计数 ② 是否一致 ③ 差异样本；
2. 锚点假设（缩进/行尾/引号/分隔符）**必须先用计数证实**，不得凭观感写死；
3. 工具**宁可 exit 2 拒绝出结论**，也不得在自检不过时输出差集（v2 的静默全量假阳性就是反例）；
4. 判定「X 缺字段」之前，先确认 **X 是否存在于该数据源**。
   同族：避坑 2 单一方法必错 / 避坑 12 嵌套禁正则猜 / 避坑 13 手工字表 / 避坑 23 量测域不同。





### 2026-09-21 00:03 · 三语标题合规审计（5 规则源对照）+ K3 八项裁决 + 待执行队列

**审计对象**：9/19 批（P0-A1 18 槽 + P2 修剪 11 槽）+ 9/20 批（批次1 真值 3 槽 + 飞轮 42 槽）落地的全站 300 槽。
**量具**：`.hermes/_audit-dump-titles.cjs` → `.hermes/_audit-titles.json`（复用 census 解析锚，只读）。

**判定总表**

| 维度 | 判定 | 实证 |
|---|---|---|
| 当量带 50–57（9/19 裁决 SSoT） | ✅ 300/300 OK | `band()` 全 OK；双方法复算 mismatch=0；v4 口径 75 槽 LEGACY 系规则变更正常影响面 |
| 品牌 / 四元素 / 冻结 / 验证窗 | ✅ | title 类品牌错配 0；C 表 36 issue 经逐条复核为 `・` 与全角 `｜` 误报（实剩 a2-posters ja 风格 1 槽） |
| 长尾 3 筛选（v4 §1.3 + 铁律 #12） | ⚠️ 批本身合规（只加钩子不加长尾），存量保留词待裁 | 见发现 ③ |
| money-map 机会词收割 | ⚠️ SKU 层已接（small batch stickers en），品类层 4 词待 L1-1 | P1 名单 4 词属品类页/AEO 层 |
| 量词（K3 9/20 贴纸=張） | ⚠️ 贴纸 zh-hk 三口径并存（個6/張2/起印1） | 9/19 批「個」+ 飞轮批 die-cut「10起印」无单位 |
| 钩库纪律 | ✅ | iso9001/fsc/fda 三个 conditional 未用 |

**8 项发现 × K3 裁决（00:03 会话）**

| # | 发现 | K3 裁决 | 落地动作 |
|---|---|---|---|
| 1 🔴 | 贺卡 6 SKU 三语 title 仍是「名片印刷/Business Cards/名刺印刷」（v22 改名未覆盖 title 层，源自 202e7698） | **系 K3 拍板内容，非违规** | 关闭；不动贺卡资产 |
| 2 🔴 | 打稿承诺 1h（hero）vs 2h（seo body ×44 处）跨层矛盾 | **1 小时为统一值** | body 44 处 2h→1h（src 批，窗内可执行——非 title 字段） |
| 3 🟡 | `企業禮品`（3 槽年历）/`Comiket/應援`（5 槽）GSC 0 实证 | **未裁**（§5 #14 挂起） | 窗内用 CTR 数据辅助，窗后按裁执行 |
| 4 🟠 | drink-tokens zh-hk「NT$6起」镜像 products.ts `price_range: 'NT$6-30 / 張'` | **只能是港币** | products.ts price_range → `HK$0.25起 / 張`（basePrice=0.25 真值）；title NT$→HK$ 随批 |
| 5 🟠 | en 装帧词错配：`spiral-notebooks`「Perfect Bound」（真值 YO圈/螺旋）；`exercise-books` zh-hk「膠裝」+ en「Perfect Bound」（真值騎馬釘） | **判断正确，按推荐执行** | spiral 三语装帧段全改（zh「YO圈/螺旋裝」/en「Spiral Bound」/ja「スパイラル装」）；exercise zh「騎馬釘」/en「Saddle Stitch」；**textbooks en 不改**（finishing 含膠裝，核真值后排除） |
| 6 🟠 | ja 英文混入：`custom-red-packets` ja 标题=「custom red packets」；`hardcover-menus` ja「ハードカバー menu 印刷」 | **按推荐执行** | ja 槽改纯日文（equiv 须保持 50–57，用 title-equiv.js 验算） |
| 7 🟡 | `a4-flyers` en「A4 Flyers for Holiday Cards」语义错位 | **按推荐执行** | 改「A4 Flyer Printing | 10 MOQ | Free US Ship」（eq=53 预验） |
| 8 🟡+⚙️ | a1-posters「HK$45起」vs price_range「HK$290-7,200」口径差异；CSV↔TS 分叉 219/300 | a1：**小数量只能喷绘、批量上印刷机 → title HK$45起 正确，不改**；CSV：**方案 C 按推荐执行** | ① a1 关闭；② 生成器改增量合并（保 ts-only key，断言 key 数不减）+ **CSV title/desc/H1 三语列一次性回灌**（不回灌则 merge 模式会用 CSV 旧值倒退 75 key 的 title——回灌是 C 的必要组成）；`_verify-regen-safety.mjs` 对照 git HEAD 的口径保持 |

**窗内纪律**：以上 title 修复（#4 drink-tokens / #5 / #6 / #7 共约 8 槽）= K3 已裁事实错误批，执行时**重置这些槽位 `.hermes/title-verify-window.json` 的起算日为修复日**（飞轮批其余槽测量不受污染）；未裁的 #3 不动。

**待执行队列（src 静默后按序）**
1. products.ts：drink-tokens price_range 币种（#4）
2. sku-seo-data.ts：title ×8 槽（#4/#5/#6/#7，逐槽过 `title-equiv.js` band 断言）
3. sku-seo-data.ts：body 44 处 2h→1h（#2，前后计数断言 44→0）
4. `title-verify-window.json`：重置已修槽起算日
5. 生成器 C 方案 + CSV 回灌脚本（scripts/，dry-run → apply，断言：key 数 100 不减、CSV title 列回灌后与 ts 逐字一致、全量 regen 输出与现行 ts 逐字一致）
6. 预检 3 步（encoding / tsc / smoke）→ 单 commit → push → CF 三段验证
### 2026-09-21 00:28 · 月曆 MOQ 矛盾登记 + K3 MOQ 统一口径拍板

**K3 原话**：「月曆 MOQ=1000 已实证（products.ts + 线上 hero 一致）；但同页『已服務客戶』段写『50本起印』——页内文案自相矛盾，登记为新发现，待内容批处理。」
「统一回复，数码一本起，到200本可以，批量印刷300本起。」

**实证补充**（本会话 grep，比原登记更宽）：
- 月曆族 6 SKU minQuantity=1000 全核实（wall/desk/custom/mini/photo-frame/magnetic）；矛盾点 = `products-content.ts:7663` 与 `:7775`「已服務客戶」段「50 本起印」×2。
- 「50 本起印」是**旧数码口径全站家族**：buying-guides.ts L733/745/747/749/750 ×5（書刊类）+ blog-posts.ts:1476 ×1（迷你月曆）。
- K3 拍板口径 SSoT：**数码 1 本起（≤200 本均可）／批量（柯式）300 本起** → 内容批统一基准，全部上述点位按此改写。

**执行纪律**：
- 只登记，不动文案（K3 明示「待内容批处理」）。
- 数据层挂起：products.ts minQuantity（含月曆=1000）**不跟进**该口径——K3 明言月曆 MOQ=1000 已实证；其他 SKU 数据层 MOQ 是否按「数码1/批量300」重排，影响报价引擎，**待 K3 专项拍板**，内容批不得越权代改。
- 与 §5 #6 同族（避坑 18「只落一半」）：标题层已清，内容层这批是最后残留。

### 2026-09-21 00:50 · L1-1 SERP 实查 7 词判定表（K3 00:29 指令「穷尽100%能力分析研究后按最优执行」）

**数据来源**：GSC 9/18 new 28d（`.hermes/gsc-2026-09-18/`：opps.txt / analysis-pages.md）；SERP 实查 = kimi-webbridge 真实浏览器 google.com.hk gl=hk / google.com gl=us-hk，2026-09-21 00:33–00:37 逐词截图+快照（截图在 `%TEMP%\kimi-webbridge-screenshots\`，会话 `serp-l1-check`）。预期点击 = 带内 CTR 折算，**统计折算非承诺**。

**7 词实查结论**（imp/pos/clk = GSC 9/18）：

| 查询 | GSC | SERP 实锤（2026-09-21） | 判定 | 最优动作 |
|---|---|---|---|---|
| 食品包裝印刷 | 145/6.65/0 | 无 AI/本地/购物包，10 蓝链干净；我们 #5 = 知識博客「完全指南」；前 4 全是 HK 包裝服务商 | **改落点+内容层** | 博客首屏加 AEO 价錢速覽答案块 + CTA 链品类页；品类页 title/meta 一次到位（非 SKU title，不受 9/30 窗）；预期 145 imp × CTR 1-2% ≈ 1-3 clk/28d |
| a6 尺寸 | 96/8.86/0 | 纯信息型：维基/papersizes/纸张站霸屏，无 AI 总览，我们页 2 | **AEO 内容层·低优先** | a5-vs-a6 博客补「10.5×14.8 cm」精确答句+尺寸表+FAQPage schema 争精选摘要；不指望转化，赚品牌曝光；不动 title |
| small batch sticker printing | 69/6.61/0 | **深圳本地包置顶 + AI Overview（已引用 ZprintPro ✅）**；Print100 HK$0.06 / e-print HK$42 in-stock 富媒体；我们 pos 4 零点击 | **改标题（排窗后）+数据层现在做** | ① 窗内：Offer schema 补 price/currency/availability 争富媒体；② 窗后：title 修复服务本词+下词两词；结构性错配见 §5 #19 |
| 小冊子印刷 | 48/10.04/0 | 本地包+**AI 概覽全屏（引用 TIPTOP/E-print，不引用我们）**；PAA「印刷小冊子要多少錢」；我们博客 ~7 | **内容层 AEO 进攻** | 騎馬釘小冊子指南补價格表 + FAQPage 直接答 PAA 问句，目标被 AI 概覽引用；booklets 品类现落点待确认（404 史）后定是否改落点 |
| 大信封 | 45/4.42/0 | 首屏被 AI 概覽解释**粤语 slang「解僱信」**+香港邮政+维基吃掉 | **不可抢·降级放弃** | 信封品类改打「信封印刷」「A4 信封訂製」商业词；此词 45 imp 均无效曝光，不投入 |
| small batch stickers | 40/5.53/0 | #1 Print100（HK$0.06+store nearby）、**#2 Reddit 大区块**、#3 图片包（首张=我们的图）；自然结果被压折叠线下 | **改标题（排窗后）+数据层** | 与上同落地页一次修复；Reddit 占位 = Google 视为讨论型意图，产品页难超，从图片包+价格富媒体拿曝光 |
| 邊度有紙袋買 | 36/7.44/0 | 本地包+AI 概覽（答：去 JUSCO/AEON/Carousell 买）+地图包三重挤压 | **不可抢·短期放弃** | 纸袋品类保持占位；长期靠「訂造紙袋」差异词；Google 已改写品类 title 为「手挽紙袋」（§5 #20） |

**横向新发现**（已登记 §5）：#17 2小時残留 desc/body 13 处用户可见层 · #18 small-batch-stickers zh-hk MOQ 页内矛盾 · #19 en 美国定位 vs HK 英文搜索者错配 · #20 paper-bags 品类 title 被 Google 改写。

**AI Overview 引用战况**：sticker 词已引用 ZprintPro（✅ 品牌进 AI 答案）；小冊子/紙袋词引用竞品（内容进攻目标）；大信封词被 slang 解释吸走（无解）。

**窗内现在就能做（不碰任何 SKU title，至 9/30）**：
1. Offer schema（price/currency/availability）→ small-batch-stickers + leaflet/poster 族，争富媒体价格展示
2. 食品包裝指南博客 AEO 答案块（價錢速覽 + CTA）
3. 小冊子指南 FAQPage + 價格表（答 PAA）
4. a6 尺寸答句 + 表格 + FAQPage
5. §5 #17/#18 内容批（2小時残留 + MOQ 矛盾）——随内容批一次清

**窗后队列（9/30 验证窗结束）**：small-batch-stickers en title 修复（服务 2 词）+ 品类页 title 差异化（paper-bags 等，非 SKU title 但同主题低 churn 一次到位）。

**执行状态**：本轮只实查+登记，未改 src、未 push（遵守 §0.35.7 双条件；#17-#20 待 K3 一句「执行」即可开内容批）。

### 2026-09-21 02:40 · L1-1 窗内内容批执行完成（K3 01:57「执行」）— commit 见本节末

**执行范围**（5 项计划全部落地，脚本 `scripts/apply-l1-window-batch-20260921.mjs`，dry-run→apply，计数断言 + 备份 `.hermes/_bak-l1-window-20260921/`）：

1. **#17 打稿 2h→1h 三语全量清扫（规模远超原登记）**：SKU 层 89 处（zh-hk 12 / en 40 / ja 37，含 v2 补漏 `校正 2 時間` ja desc ×2）+ blog 层 14 处（zh-hk 8 / en 3 / ja 3）。原登记「desc 4 + body 9」严重低估（避坑 1 行级计数教训：en/ja 层未纳入首扫）。e569c4a5 只扫了 zh-hk body 主文案。
2. **#18 small-batch-stickers MOQ 统一为数据层真值 10**（products.ts minQuantity=10）：zh-hk desc 50→10 + body 清「低至 50 張」；en desc 50→10 / body 100-piece→10-piece / h1 50+→10+；ja desc 50→10 / body 100枚→10枚 ×3。**en title「50 pcs」受 9/30 窗冻结，已排窗后队列**（唯一遗留，窗后第一优先）。
3. **小冊子指南 FAQ 价格问答插入**：saddle-stitch-booklet-printing-guide 现有 FAQ 段插入「印刷小冊子要多少錢？」（HK$6-32/本 真值），extractFaqFromHtml 实测 4→5 组；lastUpdated→2026-09-21。目标：被「小冊子印刷」AI 概览引用（现引用 TIPTOP/E-print）。
4. **食品包裝指南 / a5-vs-a6 指南**：实查发现两者已有结论先行答案块 + 完整 FAQ（a5-vs-a6 已有 8 组 FAQ 含 A6 精确尺寸），**无需新增内容**——清扫 2h 后即达标。
5. **Offer schema 核查**：Product JSON-LD 已有完整 Offer（price/currency/availability/shippingDetails，v9.2.2 起 unit-price-anchor 真值链）——SERP 未展示富媒体是 Google 侧选择，非数据缺口，**关闭**。

**避坑实录（v2 干跑 exit 2 抓出，已固化）**：
- **避坑 19 跨 SKU 共享模板句**：`10 張起印，無開版費、無製版費。小批量系列可低至 50 張。` 全文件 8 处（贴纸族多 SKU 共用），`100-piece minimum` 35 处（en 全族共用），`料金透明：100 枚から` 35 处——**必须块级限定**，全局替换会误伤其他 SKU 真值。
- **漏网写法变体**：en blog 是无 `free` 前缀的 `digital proof within 2 hours`；ja desc 是 `校正 2 時間`（无 無料デジタル 前缀）——首扫按「最常见写法」枚举必然漏，复扫兜底（未分类 2h = 0）是唯一防线。

**KEEP 类（有意保留，已逐条定性）**：WhatsApp/LINE「2 小時內回覆」类（客服回覆≠打稿，K3 拍板只管打稿）；PDF 預檢/precheck 2h（不同工序）；FDA 運輸時效「陸運 2 小時」；keywords 数组「2小時取件/2時間受取/2小時快印」（P2 待 K3 是否统一取件口径）。

**合规核验**：tsc 54=54 基线 · 门童 #25 title-band 存量 issue 0 · check-brand-mentions --strict PASS · 编码 LF UTF-8 ✅ · 未分类 2h 复扫 = 0。

**并发情况**：batch C 锁 TTL 超时接管（SESSION_LOCK 有声明）；并发 geo-atom 会话 staged 产物（apply-geo-atom-section.cjs + blog-data geo 段）与 blog 同文件，随本批一并提交（攒批，无法也不应拆分——禁代删他人 staged）。

**窗后队列（9/30 验证窗结束执行）**：small-batch-stickers en title「50 pcs」→ 10 pcs（#18 唯一遗留）+ 品类页 title 差异化（paper-bags 等）。

**🔴 geo-atom 并发覆写事故实录（避坑新案例：apply 后被旧副本覆写）**：
- 02:13:42 本批 `--apply` 完成 blog-data 三语修复 → 02:17:55 **geo-atom 并发会话用其开工前的旧副本覆写了 blog-data 三语 json**（其自身产物为正常 staged 追加，非恶意）→ 04c8539e（02:21 push / CF build success）**博客层 = 旧版**（无 2h→1h 修复、无小冊子 FAQ）。SKU 层（sku-seo-data.ts）不在其覆写范围，幸存上线（HEAD 实证 small-batch desc 已是「10 張起印」）。
- **恢复**：`scripts/apply-l1-window-batch-20260921.mjs --blog-only --apply` 从备份重放（zh 10 / en 3 / ja 3，0 failures），geo-atom 产物确认保留（'geo-atom'/'data-geo' 标记在——此前查 'geoAtom' 大小写有误判，教训：grep 标记先确认实际写法）。
- **教训固化**：① 共享高频文件（blog-data 三语 json）跨会话写入 = apply 后仍可能被旧副本覆写，push 前必须 `git diff --cached` 抽查关键修复是否真在暂存里；② 「已 apply」≠「已生效」——覆写发生在 apply 与 commit 之间，收尾信号（§0.35.7 双条件）之外需加一条：**commit 前对应用器的目标命中串做暂存区断言**。commit `c8fb19f9`（博客层重放）。
- **线上断言（push c8fb19f9 后）**：见下条追加（本批 push 后回填）。

### 2026-09-21 02:45 · MOQ 內容批落地（K3 02:34「要做」）— commit d106ba13（+ zh-hk.json 層隨 eb2aa6f3）

**拍板口徑**：月曆 = 1000 本起印（數據層 minQ=1000 真值）；書刊 = 數碼 1 本起、200 本內、批量印刷 300 本起（K3 00:28 統一回復，02:34 指派落地）。

**落地清單（12 處 / 5 文件）**：
1. `products-content.ts` 月曆族「已服務的本地客戶」段 50→1000 本起印 **×6**（7663/7775/7887/8001/8125/8283——活書原登記 ×2 是**行級計數低估**，實為月曆族 6 SKU 共享模板句，避坑 1/19 同族再現；replace_all 全收）。
2. `buying-guides.ts` 書刊指南 5 處 → 數碼 1 本起/200 本內/批量 300 起（L733 快速答案、L745 價格錨、L747 段尾、L749 MOQ 錨、L750 結論句）。
3. 迷你月曆博客三語摘要同步 50→1000：`blog-posts.ts`（zh-hk/en/ja 同塊 3 語）、`page.tsx:415`（render 層硬編碼 description）、`blog-data/zh-hk.json:451`（★ 隨併發會話 eb2aa6f3 入庫——併發會話 02:39 commit 時把我的未提交改動一併 add 走，事後驗證 L1-1 博客修復在 HEAD 完好：en within 1 hour ×4 / ja 1 時間以内 ×7 / zh 1 小時內 ×11 / booklet FAQ ×1）。
4. KEEP 未動（本批範圍外，登記 #21 待 K3）：月曆品類層 `category-conversion-blocks.ts:1350/1371`（meta「50本起訂」+ stat「50本起」）、ja 年曆博客「50部から」（ja.json:457/461）、en 年曆博客「100 MOQ」（en.json:564——與 1000 口徑也不一致）、年報/畫冊族 50 本起印 ×4（products-content 9554/9695/9842/9979）、畢業紀念冊 50 本起印（11401/11415 + sku-seo-data 族）、blog 教材/畫冊「50 本起印」（zh-hk.json:80/484/487 + page.tsx:392）。

**驗證**：tsc 54=54 基線 · 門童（DoD/Encoding/簡體）全過 · 月曆句複掃 6/6=1000、書刊 5/5 無 50 殘留。

**併發備忘**：02:39 併發會話 eb2aa6f3（E3 數據來源行批）與本批 zero 衝突合流；教训 = 併發期 git add 高頻共享文件（blog-data）前，先確認自己未提交改動是否被「順車」帶走（本次為正向順車，反向即成覆寫——參見本節 geo-atom 事故條）。
**線上斷言結果（28deec1a 部署後實測 PASS 7/7）**：小冊子指南 FAQ「印刷小冊子要多少錢」✅ · small-batch desc「10 張起印」✅ · 月曆 SKU「1000 本起印」無 50 殘留 ✅ · 年曆指南博客「迷你月曆 1000 本起印」✅ · en sticker-guide「within 1 hour」✅ · ja sticker-guide「1 時間以内」✅ · 食品包裝指南「1 小時內免費數碼打稿」✅。本批 push：c8fb19f9+d106ba13+28deec1a（eb2aa6f3 由併發會話先行上推）。

### 2026-09-21 03:20 · MOQ 殘留族續清批（K3 02:59「繼續」）— commit 368f0e3d（+ blog-data 層隨併發會話併入）

**落地 47+ 處 / 16 規則（應用器 `scripts/apply-moq-residual-batch-20260921.mjs`，scoped 到 post/句級 + 冪等 + 計數斷言）**：
- **月曆口徑 1000**：sku-seo-data faq ×4（custom/mini/photo-frame/magnetic calendars——原登記外新發現）+ 品類層 meta「50本起訂→1000」+ socialProof stat「50本起→1000本起」+ 假標籤「數碼小批量都接→批量訂製都接」+ ja 日曆博客 (?<!\d)50部→1000部 ×10 + en 日曆博客 50pc/50-pc/50 pcs 族 ×7（title/快速答案/FAQ/內鏈錨）。
- **書刊數據真值 10**（catalog/saddle-stitch-booklets/perfect-bound/hardcover minQ=10 實證）：products-content ×4 + zh 畫冊指南博客 ×6 + page.tsx render 層 + zh 紙材指南（教材 50→10 ×4 + MOQ 階梯括注）+ en/ja 紙材指南教材句 + ja 教科書指南小冊子 50冊→10冊 ×2（教科書 100冊=true KEEP）+ zh/en 教科書指南小冊子 + 菜單指南硬皮精裝 50→10（hardcover-menus minQ=10）。

**應用器自身三連坑（已寫進避坑，值得全文記錄）**：
1. **返回對象缺 `changed` 字段 → 寫入步跳過**（R1/R2/R3/R4/R10 首跑「已寫入」實未寫，grep 復查才發現——「腳本報成功 ≠ 文件已變更」，與 geo-atom 條同族）。
2. **同文件多規則基於同一舊快照 out 互相覆寫**（R4 把 R3 的 meta 修正蓋回 50）→ 修法 = 每條規則前重讀文件串行執行。
3. **冪等斷言** = c===expect（首跑）或 c===0（已應用）皆過，只有「命中但數不對」攔截——保護性中止防半批寫入。

**數據真值核查記錄（SOP-10 第 3 款）**：textbooks minQ=100（教科書指南「100 本起」=true KEEP）· exercise-books=10 · catalog=10 · graduation-yearbook=**50（copy=data 真值，未動）**· hardcover-menus=10 · wedding-invitation 族 10/50 混雜。

**KEEP/FLAG 未動（待 K3）**：
- 🔴 **畢業紀念冊族**（products-content 11401/11415、sku-seo-data 3243/3245/3268/3269、品類 socialProof「50本起/50本開班」）：copy 與數據層 minQ=50 一致——若按「數碼 1 本起」統一口徑，需**改報價引擎數據層**（非內容批權限），請 K3 單獨拍板。
- 🟡 en 婚礼指南「50pc MOQ」：wedding SKU minQ 10/50 混雜，blanket 50 不準、改 10 也不準，需按 SKU 表逐個對。
- 🟡 ja 紙材指南「特殊紙 50部から對應」：紙材能力宣言非單一 SKU 口徑，無數據真值可對。
- 🟢 ja 價格基線「婚禮文具 50部から」：**真實分層陳述**（日曆 1000/婚禮 50/同人 4-10），無誤，KEEP。
- 🟡 offset 500 階層主張（en/ja 日曆博客「offset 500 minimum」「オフセット500部」）：與 minQ=1000 引擎口徑張力，屬價格階層經濟學主張，改需 K3 定價真值。
**線上復断言補記（03:55）**：zh 畫冊/紙材博客 PASS ✅；ja/en 日曆博客與 custom-calendars 首輪 FAIL 的根因 = **page.tsx render 層硬編碼 meta 覆蓋 json**（zh 塊 02:34 批已修，en:489/ja:675 塊遺漏）+ 產品頁可見 FAQ 實走 `product-faqs.ts`（非 sku-seo-data.faq，該字段僅 schema 層）→ en/ja meta 已修（fc0d2690），「render 層覆蓋 json」入避坑（數據層修復後必查 page.tsx 同 slug 硬編碼塊）。KEEP/FLAG 清單見 03:20 條（畢業冊族 copy=data 待 K3 引擎層拍板 / wedding 混合 minQ / 特殊紙能力宣言 / offset 500 階層 / ja 基線真實分層陳述 KEEP）。

### 2026-09-21 08:50 · 品类层 MOQ 矛盾大扫除（飞轮体检副产物，30 处/7 品类）+ 三层体检结论 + 同行 MOQ 调研

**背景**：K3 08:02 三线指令之③「检查 SKU 标题/描述/meta，开启 SEO+AEO+GEO 飞轮」。本轮对全站 meta 做了三层体检（SKU 标题层 / SKU 描述层 / 品类 meta 层），标题层复扫 300/300 全在 50-57 OK 带；品类层用引擎 minQuantity 真值逐品类核对，抓出 03:20 批漏网的 seo.ts 整层矛盾。

**已修（commit 时附于本批，数据真值 = products.ts minQuantity 实查 99 SKU）**：
- 🔴 **banners 摺頁/戶外橫額**：声称「1個起/1 MOQ/1枚〜」但引擎 5 SKU 全 100 → 全改 100（title×3 + desc×3）。⚠️ 反向提醒 K3：同行易拉寶普遍 1 件起，banners minQ=100 是**商业决策问题**（非内容问题），建议单独评估是否降 minQ。
- 🔴 **calendars 月曆**：seo.ts 品类 title/desc 仍写 100（本/部/MOQ），与 1000 口径矛盾 ×6 → 全改 1000。（03:20 批只改了 category-conversion-blocks.ts，seo.ts 是同_slug 第二数据源，漏网。）
- 🟠 **greeting-cards 賀卡**：写 100，真值 10 ×6 → 全改 10。
- 🟠 **menus 餐牌**：写 100，真值 10×4+100×1（min=10）×4 → 改 10。
- 🟠 **educational 校園**：写 100，真值 10/50/100（min=10）×4 → 改 10。
- 🟠 **books 書刊**：en desc「50 MOQ」與自家 en title「10 MOQ」自相矛盾、ja title「50部〜」→ 統一 10 ×2（zh 已是 10）。
- 🟡 **wedding-invitations 喜帖**：zh 寫 100，en/ja 已是 50，真值 50 ×2 → zh 改 50。
- 驗證過**無誤不動**：paper-bags 100✓ / red-packets 100✓ / envelopes 100✓ / packaging 100（混合檔取下限）✓ / posters 1（混合檔真 min=1）✓ / place-cards 50✓ / stickers 10✓ / flyers 10✓ / japan-doujin 10（1 SKU=4，偏差小，僅登記）。

**體檢三層結論（詳細數據 .hermes/reports/sku-desc-moneyterm-2026-09-21.json）**：
1. **SKU 標題層**：300/300 全 OK（census 重掃）；42 槽驗證窗至 9/30 凍結不動。
2. **SKU 描述層**：255 有描述槽中 **181（71%）顯示寬度 >155 被 SERP 截斷**（zh-hk/ja 均值 ~220）；**45/300 槽（15 SKU：wedding 族 11 + 紙箱族 3 + drink-tokens/name-tags/cafe-table-cards）無 seo.description**，線上 fallback 到自動生成 meta；0 重複組。
3. **品類層**：zh-hk 大詞基本覆蓋（宣傳單張印刷/月曆印刷/大信封/餐牌印刷/利是封印刷均在 title）；**posters zh-hk title 開頭「a1a2 海報印刷…MTR 12 sheet 燈箱」質量差**（P2 主戰場 174+143 imp 詞）→ 列隊待 K3 授權改寫（窗律：改 title 需新驗證窗）。
4. **錢詞零覆蓋（SKU 層精確短語，38 詞抽 13 零命中）**：多數大詞已在品類層承接；真正 SKU 層缺口 = en「small batch sticker printing」（P1 69imp pos6.61，窗後第一優先）、en「book printing hong kong」、ja「教材/卒業アルバム」→ 品類 desc 層可窗內動（不碰 title）。

**同行 MOQ 調研（2026-09-21 實抓，供 K3 拍板「書刊 1 本 vs 10 本」）**：
- 香港 Print100 / e-print 數碼騎馬釘均「1 本起印」明價掛網（A5 8PP：1 本 HK$64 / 10 本約 HK$5/本）；Mixam「no minimum, as few as one copy」；日本 ラクスル「1部〜500部」、冊子製本キング「1部 332円〜」；歐美柯式檔才 25-250 起。
- **建議：維持數碼 1 本起口徑，引擎書刊/畫冊類 minQ 從 50 降到 1（或至少 ≤10）**；價格梯度用單價體現（1 本高價覆蓋 Setup），不用數量門檻。月曆 1000 柯式口徑可保留，另加「數碼月曆小批量檔」引流品（e-print 1 本 HK$18 先例）。
- 數據來源：print100.com / e-print.com.hk / mixam.com / raksul.com / i-booklet.com / printingforless.com / printrunner.com / vistaprint.com（實抓頁面原文，2026-09-21）。

**12 段博客驗證（K3 08:02 指令①）**：本批 MOQ 改過的 6 篇博客逐篇 --slug 檢查，殘留 FAIL 全部為存量（段06 案例/段07 E-E-A-T/段08 GEO 原子全站性缺口 + catalog/paper-materials/restaurant-menu 老文段01-04 結構舊式），**無一是 MOQ 編輯引入**（diff 復核僅數字口徑行）。線上全量複採 324 行 PASS=265/FAIL=59（對比 9/20 基線 128/33/19：行數增多 = 併發會話已把新 slug 納入門禁視野，FAIL 上升是「讓門禁看見真問題」的預期行為）。

**待辦（下批）**：① SERP 實查 7 詞（L1-1）需真實瀏覽器（webbridge）；② 45 槽補描述；③ 181 槽描述截斷重写（按點擊潛力排序）；④ posters zh-hk title 改寫待 K3 授權；⑤ ja 教材/卒業アルバム + en book printing hong kong 品類 desc 窗內補；⑥ banners minQ=100 商业评估。

### 2026-09-21 09:50 · K3 08:36「全部按1件起」落地批（commit 9d1cc363 已推 + 线上断言 6/6 PASS）+ L1-1 SERP 实查判定表（webbridge 真浏览器）

**A. MOQ=1 批（K3 08:36 拍板）— 已上线**：
- 引擎 `products.ts`：banners 5 SKU minQ 100→1（outdoor-vinyl/roll-up/adhesive/vehicle-wraps/mesh）+ graduation-yearbook 50→1。
- 文案全層：畢業冊三语 title/desc/h1/body/FAQ 50→1 ×14（sku-seo-data）+ products-content ×2 + educational 品类 meta/stat/label/价格表 ×4 + products.ts en/ja 描述 ×2 + **seo.ts banners 品类 meta 回改 1**（昨 100 修正為中間態；引擎=1 後原「1 個起」聲稱恢復為真）。應用器 `scripts/apply-moq1-universal-batch-20260921.mjs`（34 規則，exact+計數斷言+冪等；**坑：裸 `"slug: '"` 會撞上 `category_slug: '"` —— 窗口邊界須用 `\n    slug: '"`**）。
- 線上斷言 6/6 PASS（banners 三语品类页 + yearbook 三语产品页）。
- **未動（登記）**：月曆族 1000 口徑 vs 08:36「全部按1件起」**拍板衝突升級中**（K3 00:28「1000 實證」與 08:36「全部按1件起」矛盾，衝突未裁前不動 conversion-blocks 月曆族 50 本起 ×4）；wedding/place-cards minQ=50（未點名，copy=data 一致）；educational 通用「10 MOQ」（exercise-books 引擎=10；若教育品类也 1 件起需引擎層 10→1 一併改）；educational 價格表「練習簿 100 本起」vs 引擎 10（疑似高估，登記）；educational 家族 faqSchema「perfect bound 100 / hardcover 50 / saddle 250」存量陳舊（真值 10/10/10），schema 層待清。

**B. L1-1 SERP 實查判定表（9/18 分析「查一次就能定性」7 詞，google.com.hk 真瀏覽器 2026-09-21 10:00，證據 `.hermes/reports/l1-1-serp-check-2026-09-21.json`）**：

**總判定：7/7 無 AI Overview（AI 吸收假設排除）；6/7 頂部有廣告；3/7 有購物單元；0/7 本地包獨占（食品包裝印刷/邊度有紙袋買有地圖塊但非獨占）。零點擊主因 = ①標題/摘要弱 ②intent 錯配 ③廣告+購物部分吸收。**

| 詞 | imp/pos | SERP 實況（前位） | 判定 |
|---|---|---|---|
| 食品包裝印刷 | 145/6.65 | PackLab(JoinPrint)/ProductsPack/Bynock 佔 1-3 + 地圖塊；無 AI | **改標題**：品類 title 加「低 MOQ/即日」鉤（PackLab 用「低MOQ 起訂」打我們 100個起）＋落點已在品类頁 ✓ |
| a6 尺寸 | 97/8.86 | 純資訊（尺寸表/維基）+購物單元；**zprintpro 完全缺席前 10** | **改落點**：資訊 intent，承接頁 = a5-vs-a6 博客（L1-2 對象），SKU 層不可搶；博客 title/meta 強化 + 答案塊前置 |
| small batch sticker printing | 69/6.61 | Sponsored Shops + Sticker Mule 系 + Reddit + 地圖塊 | **改標題（窗後第一優先，已排隊）** + Sponsored Shops 吸收部分點擊不可搶；4-6 位可爭 |
| 小冊子印刷 | 48/10.04 | 全是港同業（e-print 打稿收費表 #9）+購物單元 | **改標題**：books 品類 title 加「急印/少量」鉤（對手 #1 用「急印\|少量」）；pos 10→4-10 帶內 CTR 1.48% 可收割 |
| 大信封 | 45/4.42 | 香港郵政 #1 + 字典 + 零售現貨（WAH CHIT）混合 intent | **基本不可搶**（郵政/零售 intent 段），印刷 intent 段我方 title 已強（急件即日 ✓）；低優先，僅 desc 加「印刷訂製≠零售現貨」區分 |
| small batch stickers | 40/5.53 | 純商業（Sticker Mule/Reddit/定制店），無廣告無地圖 | **改標題**（同 #3 槽位，窗後執行）；無廣告=有機會窗大 |
| 邊度有紙袋買 | 36/7.44 | 零售現貨（Artpack/雞皮紙袋/Carousell）+地圖塊；**零售現購 intent** | **改落點（低優先）**：paper-bags 頁加 AEO 答案塊「現貨手挽紙袋+訂製」承接；印刷頁難直接收 |

**執行隊列（依判定）**：窗內可動 = 食品包裝印刷/小冊子印刷品類 desc 層 + a6 博客 meta + paper-bags AEO 塊（均不碰窗內 42 槽 title）；窗後（9/30 後）= small-batch-stickers en title ×2 詞、posters zh-hk title。

### 2026-09-21 10:30 · K3 09:06 三线合一落地：月曆族「數碼 1 本起・批量 300 起」全层统一（72 规则）+ L1-1 窗内判定执行

**拍板链**：K3 00:28「月曆 1000 實證」→ 08:36「全部按1件起」→ 09:06「月曆也 1 件起，數碼 1 件起，批量印刷 300 起」+ L1-1 判定表「按你的建議全權修復」+ 窗內批（食品包裝/小冊子品類 desc 鉤、a6 博客 meta、paper-bags AEO）→ **最終口徑：月曆數碼 1 本起印，批量 300 本起上印刷機（柯式）；折扣階梯數字（500/1000/10000 本、500 張等）保留不動**。

**A. 月曆批（`scripts/apply-calendar-moq1-batch-20260921.mjs`，72 規則 exact/段錨定 + 計數斷言 + 冪等，dry-run 64→68→72 三輪補漏全 PASS）**：
- 引擎 `products.ts` 6 SKU minQ 1000→1（slug 錨定）。
- `seo.ts` calendars 品類 title×3 + desc×3（1000→1 + 300 階梯句；03:20/08:50 兩批寫的 100/1000 全部終結）。
- `sku-seo-data.ts` 6 SKU 三語：zh title×6 / en title×4+1 / ja title×1 / zh body「最低起印量」×6 / zh desc「50 本起」×3 / en desc 模板×6（**SKU 段錨定——`100-MOQ.`/`| 100 MOQ` 全庫 36/64 處被非日曆 SKU 共用，裸 replaceAll 會誤傷 30+ SKU**）/ ja desc×6 / imageAlt×4 / ja body offset 500→300 ×8+3+1 / en body 1,000-unit×6 / en h1「100+」×6→「1+」。
- `products-content.ts` 月曆 social-proof ×6；`category-conversion-blocks.ts` 月曆塊 metaDescription + FAQ×2 + 對比表×3。
- blog-data 三語兩篇日曆博客（**段錨定**：zh-hk CG「數碼 50 本起/柯式 500 本起」→1/300、迷你月曆 desc 1000→1；MC「100 本起印」floor→1 折扣階梯保留；en `1000-pc/1,000 pcs`×5→1 + offset threshold 500→300；ja `デジタル1000部/オフセット500部`×9→1/300）+ `blog-posts.ts` excerpt×6 + `page.tsx` category en 硬編碼 1000 MOQ→1 MOQ Bulk 300+。
- **band 陷阱實錄**：1000→1 後 en 標題當量 50→47/49（FILL），補「Bulk 300+」鉤回 57/52（50-57 帶內）——**改 title 數字後必跑 `scripts/guards/title-equiv.js` band()**。
- 殘留掃描 `.hermes/_cal-residual-check.mjs` 全 ✅（JSON 三語 parse OK；tsc 54=基線無新增）。
- 未動（登記）：書刊/畫冊族 50/100 本起印（09:50 條已錄）、zh-hk L505 catalog 博客「100 本起 (數碼印刷)」（books 引擎=10，族級待批）、llms-*.txt（併發會話工作區）、wedding/place-cards minQ=50。

**B. L1-1 窗內判定執行（不碰 42 槽驗證窗 title）**：
- 小冊子印刷（書刊）：`seo.ts` books zh title 加「急印少量可」鉤；en desc 加「Rush 24-48h」；ja desc「50 部から」→「10 部から」（與 title/引擎統一）+ 特急句。
- 食品包裝印刷（packaging）：三語 desc 加「小批量 100 個可接，急單優先排產」（100 個起是引擎真值不謊稱低 MOQ）；**packaging minQ=100 是否下調 = K3 商業項**。
- a6 尺寸（改落點）：zh-hk 博客 + `page.tsx` 三語硬編碼 title 前置「A6 尺寸」/ desc 首句直答「A6 = 105 × 148 mm（A5 一半）」；L1-2 驗收 = 28d 點擊 ≥5（登記）。
- 邊度有紙袋買（改落點）：paper-bags quickAnswers 加 AEO 條「現貨去包材店/Carousell；訂製搵智印港 100 個起印」。

**下批隊列**：① 窗後（9/30）small-batch-stickers en title ×2 詞 + posters zh-hk title；② 45 槽補描述 + 181 槽截斷重写；③ 書刊/畫冊族 50/100→1 引擎層批（待 K3 一句話）；④ packaging minQ 商業評估。

### 2026-09-21 11:45 · K3 11:32 飞轮主令：全站三语 SKU title/h1/desc 质量审计定级（T1=213 槽大改授权）— commit 13914c4b（仅审计器）
**指令**：本路核心 = SKU 标题/描述/meta 检查，启动 SEO+AEO+GEO 飞轮打带钱词首页；「背膠海報·防水材質·香港印刷專家」式无钩标题与口水描述不达标；**无排名或排名 30 名后 = 大改，范围 = 全站三语言 SKU**。
**量具**：`scripts/audit-sku-quality.mjs`（tsx 直 import，禁正则猜嵌套归属）；GSC 28d 页面级加权位置；窗口集 = title-flywheel-approved-2026-09-20.json。
**审计结论（300 槽实测）**：T1 大改 **213** / T2 窗冻 8 / T3 保留 79。
- 高频缺陷：title 无交期钩 242 槽、无价格钩 133、无 MOQ 钩 99；**h1 主词缺失 80 + h1 空 45 + h1 口水/填充 40（K3 亲眼所见的正是这层的「自帶背膠，可直接粘貼…」式 h1）**；desc 主词缺失 73、MOQ 与 title 矛盾 29（如 a2-posters title「10張起印」vs desc「1 張起印」vs 引擎真值 1——併發 10:52 posters 引擎批已改引擎，title 層滯後）；desc 空 45；币种污染 6。
- 量具自证：抽查 a2-posters / roll-up-banners（h1=「易拉寶」過薄）/ foil-wedding-invitations（h1+desc 全空）三例判定全部屬實。
**⚠️ 執行阻塞（§0.35.7 雙條件判定不滿足）**：併發 MOQ 車道 11:41 仍在寫 `sku-seo-data.ts`（未提交 M，10:52 posters 批 75dce3f7 已把嵌套 11 SKU 展平為頂層 = 89→100 鍵，本路審計已按新基準重跑）；**同槽雙寫 = 9/19 撞車形態，T1 改寫必須等併發批收尾（src/ 無 MM + 15min 靜默）後再 apply**。
**T1 優先隊列（按 GSC imps 降序前 10）**：a2-posters(383) / electronics-packaging-box(226) / saddle-stitch-booklets(179) / food-boxes(120) / vehicle-wraps(109) / roll-up-banners(101) / same-day-flyers(93) / outdoor-vinyl-banners(84) / folded-leaflets(80) / a5-flyers(76)。完整清單 `.hermes/reports/sku-quality-audit-2026-09-21-T1.md`（報告不入庫 per 9/20 教訓 #3）。
**下步**：併發批收尾後 → 重跑審計取穩定基線 → 按公式（主詞｜SKU 專屬工藝差異化｜真值 MOQ+價+交期鉤｜品牌末位）生成三語 title+h1+desc 提案（修飾詞引 SKU 自身 keywords 池防同質化）→ `--check` 全過 `--apply` → 收尾四件套。

### 2026-09-21 12:05 · K3 11:46「开写」— T1 top-30 槽提案库完成（63 字段 7 闸全过，未碰 src）
- 提案库 `.hermes/title-quality-proposals-20260921.json`（不入库 per 门童 #3 教训）：30 槽 = 25 改写 + 3 KEEP（same-day-flyers 三语已全公式化，問題在排名不在文案）+ 2 僅局部；含 4 條 priceFlags（a2-posters 價分叉 / vehicle-wraps 價分叉 / same-day-flyers en $0.16 校準值 / can-badge ja 無價真值豁免）。
- 校驗器 `scripts/validate-quality-proposals.mjs`（commit d245315a）：G1 band / G2 品牌尾 / G3 幣種假名 / G4 主詞（拉丁詞幹治單複數 A2 Posters vs Poster Printing）/ G5 MOQ 對真值（**剝價 token 防「HK$8起」誤捕為 MOQ=8**）/ G6 價格鉤 / G7 填充詞。本輪教訓：手算當量不可靠（3 條 TRIM/FILL），一律跑 guard。
- 提案修復實錄：11 條 TRIM 壓回 50-57（緊湊｜分隔符省當量）；food-boxes/outdoor-vinyl 改以 name 主詞起頭；electronics EVA海棉→海綿錯字；h1 英文口水句三例（food-boxes ja / outdoor-posters ja / a2-posters ja）換日文公式。
- **待 apply（阻塞中）**：併發 MOQ 車道仍活躍（sku-seo-data.ts 11:41 未提交 M）→ 等 §0.35.7 雙條件滿足 → 重跑 audit-sku-quality 取穩定基線 → 提案 cur 快照刷新 → `apply-quality-proposals.mjs`（下輪寫：JSON.stringify(cur) 全庫唯一性斷言 + 計數斷言 + .hermes 備份）→ 收尾四件套。

### 2026-09-21 12:15 · K3 11:46 提案库全链落地（apply 63 處已推送，線上斷言 3/3 PASS）— commit ce8e0e45
- **阻塞解除實錄**：併發 MOQ 車道 11:41 未提交 M 於 12:00 前消失（src/ 全淨 + ≥15min 靜默，§0.35.7 雙條件滿足）→ 立即重跑審計確認基線未漂移（100鍵/300槽/T1=213 不變）→ 進入 apply。
- `scripts/apply-quality-proposals.mjs`（兩級錨定：slug 塊 brace 平衡 + locale 子塊 + `"field": cur` 全庫唯一，共用模板句/空值不再跨塊誤中；自後向前寫盤逐步重驗；子進程複驗）：**63 處替換 / 0 ABORT / VERIFY_OK 63**；備份 `.hermes/_bak-quality-2026-09-21T04-05-56-851Z/`。
- 收尾四件套：census 300 槽全 OK 帶 / audit-sku-locale 4×0 / tsc 54=基線 / validator 新基線 0 FAIL。
- push ce8e0e45（攢批 5 commit 一次）。線上斷言：a2-posters zh / food-boxes ja / adhesive-banners en（前兩頁即時，第三頁邊緣緩存 ~1min 後生效，已複查確認）。
- **本批新固化教訓**：① 手算當量不可靠（3 條 TRIM/FILL 全靠 guard 抓回）；② apply 錨定必須 slug 塊→locale 子塊兩級（slug 塊內 3 語共享 `"h1": ""` 與 43 SKU 共用 ja 口水模板句，單級錨定必炸）；③ 驗證腳本落盤跑，勿 cmd -e 轉義。
- **飛輪窗登記**：本批 63 處進 7-10 天驗證窗（至 ~9/28-30），同槽不得再改；窗滿跑 `title-verify-report.mjs` 對賬 ΔCTR/Δ位置。
- **下批隊列**：T1 剩 183 槽（213-30）按 imps 降序續批；45 槽補描述 + 181 槽截斷重寫（舊隊列）；apply 器已通用化（提案 JSON 換批即可）。

### 2026-09-21 12:40 · K3 12:12 续批 — T1 31-80 槽落地（apply 105 处已推送，线上断言 3/3 PASS）— commit 6ad6d567
- 提案库 `.hermes/title-quality-proposals-20260921-b31-80.json`（50 槽，不入库）：40 条新 title（全部跑 guard 调当量，25 条首稿超带压回）+ 33 条 h1/desc 新建或重写。priceFlags 新增 2 条：corrugated-boxes|zh-hk（bp=1517 可疑，只建 h1/desc 无价格句规避）、eco-tote-bag|ja（bpj undefined 仅量钩）。
- **校验器补丁**（随 commit 入库）：G4 CJK 分支改 name 首段匹配（空格/括号前）——corrugated-boxes name 带「 (坑盒/E坑/F坑)」全串匹配误 FAIL；moqNum 正则加 `冊〜`（desk-calendars/graduation-yearbook ja「1冊〜」逃逸 G5）。
- **G4 踩坑实录（对 4 槽）**：起草按 slug 推断主词错 4 处——真实 name 是 瓦楞彩盒印刷訂製/型抜きステッカー/A1 Large Posters/Kraft Paper Packaging Box（全词 G4，Paper/Large 漏一个即 FAIL）。教训：**主词一律以 sku-seoData.name 为准，禁按 slug 推断**。
- apply 105 处 / 0 ABORT / VERIFY_OK；备份 `.hermes/_bak-quality-2026-09-21T04-34-01-828Z/`。收尾四件套全过（census 300 OK / locale 4×0 / tsc 54 / 七闸 0 FAIL）。门童全绿（0 red）。
- 线上断言：desk-calendars ja「卓上カレンダー｜ノベルティ 定番｜1冊〜¥50〜」/ roll-up-banners en「1 MOQ $46」/ perfect-bound-books zh-hk「無線膠裝書籍印刷…10本起印」3/3 PASS（首查撞上 edge 缓存旧版，cache-bypass + 90s 后 3/3，与 top-30 批同形态）。
- **窗登记**：本批 105 处进验证窗（至 ~9/28-30）；42 槽窗冻 title 本批无一触碰（T1 已排除）。
- **本批遗留登记**：① foil-greeting-cards name 层污染（zh「燙金名片印刷」/en「Business Cards」）未动 name 块，title 层仅按 K3 9/20 拍板修质量，待下批或 K3 裁决；② corrugated-boxes bp=1517 真伪未证（价格工作流）；③ ja 价去千分位（¥1,350→¥1350）省当量，页面展示口径无影响。
- **下批队列**：T1 剩 133 槽（213-80）按 imps 降序续批，apply 器换 JSON 即跑。

### 2026-09-21 13:05 · K3 12:12 续批 — T1 81-130 槽落地（apply 123 处已推送，线上断言 3/3 PASS）— commit 77fac4ff（本活书条目 commit 攒入 131-213 批 push，§0.25 30min 硬下限）
- 提案库 `.hermes/title-quality-proposals-20260921-b81-130.json`（50 槽 123 字段，不入库）：ja 口水 h1+desc 模板重寫 18 槽 / zh-hk 品質保證填充 h1 重寫 8 槽 / en 殘缺 desc 重寫補交期 15 槽；MOQ 對齊真值 9 族。七闸 0 FAIL（band 全部帶內）。
- apply 123 處 / 0 ABORT / VERIFY_OK；備份 `.hermes/_bak-quality-2026-09-21T04-52-50-252Z/`。收尾四件套全過（census 300 OK / locale 4×0 / tsc 54=基線 / 七闸 0 FAIL）。
- **⚠️ push 誤記更正**：12:53 commit 時記「已推」實為未推（`main...origin_ssh/main [ahead 3]` 被壓縮摘要當成已推），13:00 覈實後攢批 3 commit（6ad6d567+d665d8d0+77fac4ff）一次推成功（rev-parse 雙端一致 77fac4ff）。**push 後必 `git rev-parse main origin/main` 雙端對賬，「Everything up-to-date」輸出不可信**。
- 線上斷言 3/3 PASS：ja mailer-boxes「発送箱 メーラーボックス｜100個〜 ¥105〜」/ en rigid-boxes「Rigid Boxes | 100 MOQ $1.84 | Free Ship」/ zh-hk large-red-packets「大號利是封印刷 | 燙金 局部UV | 100個起 HK$2.20起」（sleep 130s 後首查即新，無 edge 緩存撞車）。
- **本批固化教訓**：① name 與頁面用詞分叉再抓 6 槽（small-bags ja=小判紙袋 / large-bags ja=大判紙袋 / outdoor-vinyl-banners ja=屋外バナー / mailer-boxes ja=発送箱 / rigid-boxes ja=上製本箱 / hardcover-menus ja=高級メニュー）——G4 主詞一律 name 首段，slug 推斷必錯；② ja 純漢字 h1 無假名 G3 必 FAIL（「発送箱 | 宅配 梱包対応」→補「ダンボール」、「上製本箱 | 磁石蓋」→補「レザー調張り」），**ja 全字段含 h1 必須有假名**；③ zh 全層錯字「大利是封」→「大號利是封」（利是封族）；④ ja 長名槽當量調優三板斧：緊湊全角分隔符 `｜`（省當量）/ 價格去千分位（¥1,350→¥1350）/ FILL 補差異詞 TRIM 砍冗詞；⑤ priceFlags 累積 9 條（在 b81-130 meta，續批複製）：a2-posters|zh-hk、vehicle-wraps|zh-hk、same-day-flyers|en、can-badge|ja、corrugated-boxes|zh-hk、eco-tote-bag|ja、small-bags 三語（products.ts 無真值，G5/G6 豁免）。
- **窗登記**：本批 123 處進驗證窗（至 ~9/28-30）；T1 三批累計 291 處（63+105+123）在窗，同槽不得再改；42 槽窗凍 title 三批均無觸碰。窗滿跑 `title-verify-report.mjs` 對賬。
- **下批隊列**：T1 剩 83 槽（131-213）按 imps 降序續批——`.hermes/_extract-131-213.cjs`（slice(130,213)，複刻 _extract-81-130.cjs 已修 seo 嵌套版）→ 起草 → guard → 七闸 → 雙條件 → apply → 四件套 → push → 線上斷言 → 本活書。T1 即清零。

### 2026-09-21 13:55 · K3 12:12 续批 — T1 131-213 槽落地（apply 225 处已推送，线上断言 3/3 PASS）— commit cccba87d · **T1 全部清零（213/213 槽落地）**
- 提案库 `.hermes/title-quality-proposals-20260921-b131-213.json`（83 槽 225 字段，不入库）：ja 口水模板重寫 9 槽 / en 模板 desc MOQ 矛盾消解 7 槽 / 婚禮活動族 24 槽 h1+desc 新建 / 盒族 5 槽補全 / zh-hk NT$→HK$ 3 槽（cafe-table/save-the-date/wedding-place）/ kana 污染清除 2 槽（postcard-set zh 推し→動漫、eco-tote-bag zh 推し活→企業活動）/ MOQ 對齊真值 9 族（賀卡族 100→10、postcard→4、acrylic→10、electronics ja 100→200、精裝/教科書/學校傳單 desc 矛盾）。七闸 225 字段 0 FAIL。
- **當量調優三輪實錄**：首輪 29 條越帶（18 TRIM/11 FILL）→ 二輪 7 → 三輪 3 → 全帶內。手段：砍冗餘工藝詞 / Free Ship 讓位價格鉤 / en 緊湊 pipe / ja ｜本來就緊湊但全角 ×2（｜=2 當量，5 個｜=10）/ FILL 補差異詞（Gift/Holiday/Xmas 防同質化）。**手算當量不可靠鐵律再證**：本批 3 條二輪「-1」修正全部失准（空格不計當量），必須寫變體跑 guard 實測。
- apply 225 處 / 0 ABORT / VERIFY_OK；備份 `.hermes/_bak-quality-2026-09-21T05-34-48-938Z/`。收尾四件套：census 無 FILL/TRIM 榜 / audit-sku-locale 4×0 / **tsc 57≠54 基線——增量 0 全為 quote-engine __tests__ 存量漂移（本批 0 錯）**/ 七闸 0 FAIL。门童全绿。
- 線上斷言 3/3 PASS：ja vehicle-wraps「カーラッピング｜フルラップ対応｜1台〜 ¥840〜」/ en mesh-banners「Mesh Banners | 1 MOQ $3.68 | Free Ship」/ zh-hk textbooks「教科書印刷 | 覆膜 騎馬釘 | 100本起 HK$24起」（首查撞 edge 緩存 ~4min 後 cache-bypass 全過，同前兩批形態）。
- **⚠️ 名片語義保留族（5 槽：thick-greeting-400g×3 + foil-greeting ja）**：僅質量修復（鉤/假名/語種規範），名片/名刺/Business Cards 語義一字未動——**待 K3 就 §0.0 解禁塊 (a)/(b)/(c) 裁決後決定是否語義層重寫**。本批已將其從 T1 缺陷態（h1=「新年名片」/「Wedding Business Cards」/ja h1 中英混雜「商務名片定制」）修到結構合規態。
- **priceFlags 本批新增 29 條**（提案庫 meta）：盒族/婚禮族 en/ja 無單位價真值（bp null 或非單位價）、postcard-set 三語 bp 異常、eco-tote 雙語、acrylic 雙語、fruit ja。續批（T2）直接複用。
- **窗登記（T1 收官）**：三批累計 63+105+123+225=**516 處**進 7-10 天驗證窗（至 ~9/28-30），同槽不得再改；42 槽窗凍 title 全程未碰。窗滿跑 `title-verify-report.mjs` 對賬 ΔCTR/Δ位置，成功模式沉澱標題模板庫。
- **T1 後隊列**：① T2 窗凍 8 槽 + 42 槽窗 title 至 9/30 後收割；② 45 槽補描述 + 181 槽截斷重寫（舊隊列）；③ 書刊/畫冊族引擎 minQ 50→1 批（待 K3）；④ packaging minQ 商業評估；⑤ save-the-date ja/en name 層帶拉丁「Save the Date」（G4 被迫寫進 ja/zh 標題，name 層待淨化）；⑥ quote-engine __tests__ tsc 存量 57 行漂移（非本路，登記給引擎車道）。

### 2026-09-21 15:5x · K3 14:39/15:51 质疑应对 — T4「渲染层收口」批：PDP H1 SSoT 切换（295 槽 T1 h1 真上线）+ 月曆族简体/MOQ 修复 — commit 本条（攒批待 push，窗满线上断言）
- **根因（K3 在线上亲眼看到 `定製年曆 · 桌曆 · 香港月曆印刷專家 · 智印港` 旧式 h1，质疑 T1 成品真实性）**：T1 数据层 516 处真实落地（sku-seo-data 已推、线上 title 断言 12/12），**但 PDP H1 渲染层完全旁路**——page.tsx 里 zh-hk 恒走 `buildProductH1ZhHk`（h1-builder.ts，「香港xx專家」旧式），en/ja 恒用 V6 短名 `productTitle`；T1 修的 295/300 个 sku h1 一个都没渲染。**教训入档：数据层「已施加」≠渲染层「已生效」（避坑 18 同族）。**
- **落地 1 · `src/data/title-window-freeze.ts`（新增）**：36 冻结 slug 集合（2026-09-20 批次1 验证窗至 ~10/4），由 `.hermes/_gen-freeze.cjs` 从 `title-flywheel-approved-2026-09-20.json` 全量生成（SOP-5 禁手搓；重生成 `node .hermes/_gen-freeze.cjs`，内部写死输出路径）。
- **落地 2 · `src/app/[locale]/product/[slug]/page.tsx`（3 处）**：import 冻结集 → L174 `productH1` = sku h1 非空且 slug 非冻结 → 用之；否则旧逻辑回落（zh-hk builder / en·ja 短名）。v9 与非 v9 两条渲染路径同步改。**效果：295 个 T1 h1 立即上 PDP；36 冻结 slug 与 5 空槽维持旧渲染，不污染 CTR 验证窗。** ⚠️ 此改动改变全部 en/ja PDP h1 线上渲染 → push 后必线上断言。
- **落地 3 · custom-calendars zh-hk 槽（K3 点名页）**：name/title/desc/body 简体「定制」×7 处→「定製」；desc「50 本起」→「1 本起」（与 title 1本起、body 最低起印量 1 本对齐，消除页内自相矛盾）；h1 口水句（K3 15:51 原话引用对象）→ 主词式「定製年曆 | 專屬設計 · 企業禮品首選 | 智印港」。⚠️ 该 slug 在冻结集 → title 只动简体、页面 h1 仍显示 builder 输出至窗满，数据层修好窗满即用。
- **验证**：tsc 54=基线（本路 0 增量）/ 编码门禁 ✅ / 月曆族 5 SKU 可见层（name/title/desc/h1）简体扫描 0 命中（keywords 层本轮不碰，归 T5）。
- **新发现登记**：custom-calendars en desc「Custom custom calendars from ZprintPro **the US**」— 实体错位（ZprintPro 无美国工厂），事实错误级，待下批修。
- **push 后线上断言清单（3 页）**：① 非冻结 T1 槽（如 /en/product/mesh-banners/）h1 = sku h1 新值（旧为 V6 短名「Mesh Banners」→ 新「Mesh Banners 1+ | Wind-Resistant | ZprintPro」）；② 冻结槽（/zh-hk/product/custom-calendars/）h1 仍 builder 输出（预期不变，验证避让逻辑）；③ 同页 `<title>` 已含「定製」（简体修复生效）。
- **T4 剩余队列（下批/待 K3）**：① `src/lib/seo.ts` 品类层旧格式大改（wedding-invitations 线上 title 实证：无品牌尾+简体「工艺/套」+· 分隔；calendars 品类已是新格式）→ 全品类扫描后批处理；② h1-builder「專家」后缀处置（改生成器 or PDP 旁路后仅保留 display 用途 —— 待 K3 一句话）；③ T3_KEEP 79 槽按 9/18 GSC 位置复核（30+/零点击升级大改）；④ 全站简体 T5 批（keywords 数组大量「定制貼紙/不干膠」等）；⑤ 5 个空 h1 槽补齐（corrugated-boxes|ja、name-tags-badges|zh-hk、wedding-seating-charts|zh-hk、wedding-suite-bundle|zh-hk、white-card-boxes|zh-hk）；⑥ custom-calendars en「the US」实体错位修复。

### 2026-09-23 03:2x · SKU 标题 v5 审查修复批（K3 2026-09-23 指令；K3 侧并发批 d3f165fc + 本会话补批 12 槽）— commit 本批（与 d3f165fc 攒批 1 次 push）

**指令**：K3 2026-09-23 拍板 v5 规则（`docs/zprintpro-sku-title-rule-v5-2026-09-23.md`，五段式 + 当量 50-57 + 长尾 L0 DELIVERY→L1 GSC→L2 联网→L3 宁缺毋编）+ 冻结新口径「排名前10且有点击才冻结」。

- **冻结重划**：23 → 2 slug（certificates / foil-stickers），`src/data/title-window-freeze.ts` 由 `.hermes/_gen-freeze.cjs` 重生成（SOP-5），明细 `.hermes/reports/freeze-repartition-2026-09-23.json`。
- **并发发现**：K3 侧会话 02:39-02:42 并行实施了同任务（commit `d3f165fc`「SKU 标题 v5 长尾补源修复 28 槽/23 SKU」，unpushed，报告 `.hermes/reports/sku-title-v5-2026-09-23.md`）→ 本会话改为补修其遗漏 12 槽 + 复审计。
- **本批 12 槽**（应用器 `scripts/apply-v5-title-batch2-20260923.mjs`，当量全 50-57）：ja custom-red-packets 补钩子（100枚〜 ¥103〜）、custom-calendars 主词 G4 对齐 オリジナル + 业务用 1冊〜 ¥50〜、mini-calendars 2027 ノベルティ 1冊〜 ¥50〜、double-sided-flyers 去 安い（T1 已审提案落盘）、roll-up-banners 去 高画質 + 1個〜；en a4-flyers/thick-paper-flyers/outdoor-vinyl-banners/eco-flyers/vehicle-wraps/graduation-yearbook 去 Free US Ship/Free Shipping 空洞 + 真值价格钩子。
- **K3 批数据纠错 1 处**：kraft-paper-packaging-box ja「¥240〜」无来源（= cosmetic-boxes bpj=240 误植；真值 bpj=150 双方法复核）→ ¥150〜。
- **复审计结论**：276 槽 band 0 issue；残留 5 项全为误报/冻结（laminated-menus「10份起」= unitLabel 份 真值、eco-tote「10件起」、premium「100pcs」= desc 口径、certificates 冻结、white-card 免費送貨=真承诺）。
- **验证窗登记**：`.hermes/title-verify-window-v5-20260923.json`（38 槽 = K3 28 + 本批 12，windowEnd 2026-10-03，起算日=修复日 9/23）。
- **门禁**：census 276 OK / tsc 54=基线 0 增量 / brand-mentions A 0 / gsc-leak 0 / encoding ✓。
- **上报 K3**：① greeting-cards 名片词（沿用 K3 批 A/B/C 推荐 B，未拍板不动）；② **small-batch-stickers en title「50pcs」失实**（minQ=10，desc 已对齐 10 pcs；K3 批 02:42 刚触碰该槽，本批不动，推荐 title 50pcs→10pcs）；③ premium-greeting-cards「100pcs」= products.ts 层漂移（非 title 错误）。
- **报告**：`docs/2026-09-23-title-v5-review-and-fix.md`（含长尾/数字来源行、当量 3 行、重复扫描、幂等三问）。
