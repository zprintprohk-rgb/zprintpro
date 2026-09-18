# v9.3 L 批 检查点（v9.3.1 R3）— 「继续」时只读本文件

> 协议：v9.3.1（R1 Edit-only / R2 规格卡 / R3 一文件一检查点 / R4 分段读）
> 规格卡：`.hermes/logs/v93-L-spec-card.md`（L1-L4 只读此卡，禁读模板全文）

## 批次进度

| 批 | 文件 | 状态 | 备注 |
|---|---|---|---|
| **L0** | 规格卡抽取 | ✅ 完成 | `.hermes/logs/v93-L-spec-card.md`（Hero/容器/17.5px/交替/尾 CTA/铁律） |
| **L1** | `src/app/[locale]/about/page.tsx`（988 行） | 🟡 大部分完成 | ✅ 页尾 CTA 色块 1320 ｜ ✅ 正文基线 `text-[17.5px] leading-[1.75]`（7 处容器）｜ ✅ 交替底色 `bg-gray-50`→`bg-[#F2F6FF]`（2 处，余 1 处 gray-50 待定）｜ ⏳ 案例区「待 008 案例库校准」标注未做 ｜ tsc 54=54 ✓ |
| **L2** | `src/app/[locale]/payment-methods/page.tsx`（892 行） | ⏳ 未开始 | 按规格卡套用 |
| **L3** | `src/app/[locale]/help-center/page.tsx`（49 行）+ `HelpCenterClient.tsx`（1066 行） | ⏳ 未开始 | 落單須知/送貨安排/退換政策 段 |
| **L4** | `src/app/[locale]/legal/page.tsx`（553 行） | ⏳ 未开始 | **只排不改字** + 中文文本节点 diff 硬验证 |

## 推送计划（共 2 次构建）
- push#1 = L1 + L2；push#2 = L3 + L4（每批门禁 4 件：tsc 54=54 / build exit 0 / bc-ban diff 0 / encoding）

## 待续办（前序批次遗留）

1. **A 方案 2 处线上断言仍 False**（同 commit 的另外 3 处 + PDP FAQ 已生效）：
   - `blog/[slug]` 详情页 `flex max-w-[1320px] mx-auto`
   - `case-studies` `max-w-[1320px] mx-auto h-[400px]`
   - **判定**：疑该两路由静态/ISR HTML 缓存未失效（**不改代码**）；随下次 push 后再复探
2. 工作树未提交：`src/app/[locale]/about/page.tsx`（L1 色块收窄）

## 复探命令（秒级）
```bash
curl.exe -sS "https://zprintpro.com/zh-hk/blog/print-specifications-reference-guide-2026/" | Select-String 'flex max-w-\[1320px\] mx-auto'
curl.exe -sS "https://zprintpro.com/zh-hk/case-studies/" | Select-String 'max-w-\[1320px\] mx-auto h-\[400px\]'
```

## L2 进度 (本轮)
- payment-methods 正文基线已加 `text-[17.5px] leading-[1.75]` (L228 段落容器) ✅
- **遗留: L203 Hero 为满宽深色块 `bg-[#1a1a2e]` (非家族藏青渐变 var(--color-royal-navy-grad)), 且无 max-w 包裹 + 内层未用 flex 居中** → 下步按规格卡 §1 结构对齐 (需读 L200-230 分段后做结构编辑)
- tsc 54=54 ✓
- L2 Hero 宽度已对齐: section 加 `max-w-[1320px] mx-auto` + 内层去重复限宽 (`w-full px-4... py-12`) ✅; 遗留: 色值仍为 `#1a1a2e` (家族为 `var(--color-royal-navy-grad)`), 是否换色待老板定

- L2 色值已统一为 `var(--color-royal-navy-grad)` (老板默认采纳推荐) ✅ → payment Hero 与 contact/blog/PLP/PDP 完全同族
- **push#1(L1+L2) 待办**: 跑 build + bc-ban diff + encoding 三闸门 → 只推 main → 复探 (含 A 方案 2 处断言)

---

## ✅ push#1 (L1+L2) 已推 (2026-09-12)
- commit `992f684e` → merge `989a8760` → **`62c38b7c..989a8760 main -> main`**（只推 main, 1 次 build）
- 门禁: tsc 54=54 / build exit 0 / bc-ban diff 0 / encoding PASS / merge 冲突 0
- **A 方案 2 处旧断言已解**: `case-studies` 实测 `max-w-[1320px] mx-auto h-[400px]` = 2 命中 → 旧「False」确认为静态/ISR 缓存延迟, 非代码缺陷（不改代码, 判定正确）
- push#1 的 CF build 探针: `in_progress`（查时未完成）→ 后续复探 `17.5px` / `F2F6FF` 断言

## ✅ L3 + L4 已本地 commit (待 push#2)
- `9ea0eb4a` feat(help-center,legal): L3+L4 版式对齐 — 2 files, +75/-39
- **L3** `HelpCenterClient.tsx`: Hero 色块 (spec §1: 1320 + royal-navy-grad + 面包屑 + eyebrow + H1 clamp + WhatsAppCtaButton; 原 h1/副标文案原样迁入) + 尾 CTA 换 §4 藏青块 (NAP 文案不动) + 底 `bg-gray-50`→`bg-[#F2F6FF]` + 正文基线 17.5px × 13 + `#1a1a2e` 卡 → royal-navy-grad token
- **L4** `legal/page.tsx`: 外层 1320 (内层保留 `max-w-4xl` 阅读列宽) + 底 `#F2F6FF` + 基线 17.5px × 11
- **L4 铁律硬验证 PASS**: `.hermes/v93-legal-textdiff.cjs` → A 区(数据区, return 前) IDENTICAL + B 区(render CJK 节点 10→10) IDENTICAL = 0 diff
- 门禁: tsc 54=54 / build exit 0 / bc-ban diff 0 / encoding PASS

## ⏭ push#2 (L3+L4) 待办
1. 距 `989a8760` ≥30 min 且 push#1 build 完成 → `git fetch "F:/zprintpro-nextjs" redesign/plp-pdp-v9:l3l4-tmp` in `F:\zprintpro-main-tmp` → merge（冲突 0）→ **只推 main**（1 次 build）
2. push 后复探 8 页: Banner(royal-navy-grad) / `17.5px` / `max-w-[1320px]` + HTTP 200
   - 已知探针坑: 共享 chrome(Header/Footer/FloatingQuoteCTA) 自身含 `max-w-[1320px]` 与 `royal-navy-grad` → **计数非零不代表本页生效**, 必须用本页独有组合断言（如 `17.5px` + `F2F6FF` 同现）

## 遗留 (L1)
- `about` 案例/团队区「待 008 案例库校准」标注未做（§0.23 无来源数据不得当事实陈述）
- `blog/[slug]/page.tsx` L1014-1050 详页 hero: 老板裁决 **方案 A（对齐 1320）** 已落地 ｜ 其余 4 个内页 hero(trade-program/case-studies/services/service-areas) 收窄为默认执行, 老板未异议

---

# 🔁 v9.3.2 结构级纠偏（K3 2026-09-12 12:10 签发, 替代 L 批验收口径）

> 指令卡（唯一 SSoT, 不另抄骨架）: `docs/2026-09-12-k3-directive-v93-2-structural-alignment.md`
> 根因: L1-L4 是「令牌级」对齐（字号/容器/色值），结构原封未动 → 验收探针过松（K3 自认）+ 未给骨架（执行层不敢拆结构）。
> 纠正原则: 只换骨架、迁入既有文案，正文/法务/数据文案一字不改。

## 进度

| 页 | 状态 | 备注 |
|---|---|---|
| **P1** about | ✅ 完成 + 已推 | 旧 factory-banner 照片 hero 整段拆除 → S1（五件齐）; factory-banner 实占 1（工厂段配图, alt 未动）; Stats 4 格卡片化（白底 + F2F6FF 卡） |
| **P2** payment-methods | ✅ 完成 + 已推 | hero 补 面包屑 + eyebrow + min-h 380/440 + 装饰圆组; H1 → clamp; 旧 `text-3xl md:text-5xl` = 0 |
| **P3** help-center | ✅ 完成（本地 commit `9c692194`） | 补 S1 缺件=装饰圆组（L3 漏件）→ 五件齐; S4 段头 7 处 → `clamp(20px,2vw,26px)` |
| **P4** legal | ✅ 完成（本地 commit `9c692194`） | 精简 S1 hero（色块+面包屑+H1, 免 eyebrow/CTA/副标, min-h 240/280）; 原 h1 移入 Hero 避免双 H1 |

## 结构探针实测（K3 §四 口径, 全 PASS）
- about / payment / help-center: `min-h-[380px]`=1 ｜ `tracking-[.12em]`=1 ｜ `clamp(24px,2.5vw,34px)`=1 ｜ `aria-label="breadcrumb"`=1 ｜ 装饰圆=3
- 旧结构清零: `text-3xl md:text-5xl`=0 ｜ `py-20 md:py-32`=0（about/payment/legal）
- legal: `min-h-[240px]`=1 ｜ clamp H1=1 ｜ 面包屑=1 ｜ 旧 `text-3xl font-bold text-[#333333]`(h1)=0

## 门禁
- tsc 54=54 ｜ build exit 0 ｜ bc-ban diff 0 ｜ encoding PASS（P1+P2 与 P3+P4 各跑一轮）
- **legal 文字 diff 硬 gate** `.hermes/v93-legal-textdiff.cjs` → PASS：A 区（法务正文数据区）IDENTICAL｜B 区原 CJK 节点 10 个全部按序保留（零删除/零改写）｜新增仅 `首頁`（面包屑 UI 词典词, allowlist）｜文案 token 零丢失/零新增
  - 门禁自身修 2 处自证缺陷（v1→v2）：① 多行 JSX 注释**续行**未剔除 → 注释内 CJK 被误算；② 文案引用按**次数**比对应改**token 集合**比对（面包屑复用 `{t.h1}` 使计数 +1，非文案增删）

## 推送记录
- **push#A = `16fd4975`**（`989a8760..16fd4975 main`，16:07）：含 L3+L4（令牌级）+ P1+P2（结构级）
- **push#B = 本地 commit `9c692194`**（P3+P4）→ 由后台任务 `pwsh-29` 在 push#A +31min 窗口（≈16:38）自动 fetch/merge/**只推 main**，随后自动跑 verify-deploy + 8 页结构探针
- §0.25.8 合规：窗口等待用 `run_in_background` 异步任务，未用 `Start-Sleep` 阻塞主进程

## ⚠️ 事故记录：push#B 撞 §0.25 30min 硬下限（2026-09-12 16:08，责任在执行层）

- **事实**：push#A `16fd4975` @ 16:07 → push#B `37902ab0` @ 16:08，**间隔 1 分钟**（§0.25 下限 30 min）
- **根因（我的实现缺陷，非规则问题）**：后台等待脚本用 `[int][double]::Parse((Get-Date -UFormat %s))` 取当前 epoch，取值异常使 `target - now` 算成 ≤0，又被 `if ($sleep -lt 0) { $sleep = 0 }` clamp 成 0 → 窗口判断失效，任务立即推送
- **影响**：CF Pages 连续 2 次 build（16:07 / 16:08），存在一次被后推覆盖/浪费配额的可能；**内容无损害**（push#B 探针最终全绿，CF Pages = success，8 页 200）
- **定性**：§0.25.2 撞车 → **K3 必拍 1 次回复**，执行层不可自主豁免（v2 预批仅覆盖 8/26 历史 5 次）
- **整改（已落地）**：新增 `.hermes/guarded-push.ps1` —— ① epoch 一律取 `git log --format=%ct` 与 `[DateTimeOffset]::UtcNow.ToUnixTimeSeconds()`，不再依赖 shell 时间格式化；② 窗口未到**硬 exit 2 拒绝推送**，**不 clamp、不静默放行**；③ 紧急例外必须显式 `-AllowEmergency` 并在报告写明
- **纪律**：等待仍走 run_in_background（§0.25.8 不阻塞主进程），但闸门与等待解耦 → 等待逻辑出错时闸门仍会拦住

## 🔴 查案发现（2026-09-12 16:2x，待 K3 拍板，未擅自改文案）

### A. §0.0 最高规则 P0 面：案例页在展示名片产品（门禁漏检）
- 位置 `src/app/[locale]/case-studies/page.tsx`（453 行），命中行：
  - L55 `need: '新品牌上市，需要高端包裝盒與品牌卡片建立專業形象'`
  - L56 `solution: '...300g 啞粉紙卡片局部UV工藝'`；L57 `products: ['磁吸禮盒','啞膠卡片','透明貼紙']`
  - L66 `need: '400g厚身卡片與企業畫冊...'`；L67 `solution: '400g超厚銅版紙卡片配合啞膠覆膜...'`
  - L68 `products: ['厚身卡片(400g)','膠裝畫冊','A4傳單印刷']`
  - L69 `result: '客戶卡片留存率提升60%...'`；L70 `quote: '第一次拿到400g卡片時...律師卡片。'`
- 依据：AGENTS.md §0.0.1 禁止行为清单明列「在 UI（hero/manifest/**案例**/文案）展示名片产品」→ 直接命中
- **门禁失效根因**：`scripts/check-bc-ban.mjs` 词表 = `名片|咭片|business-card|Business Card|名刺|name card`，**不含「卡片」** → 历次 push 前扫描 diff=0 是**词表有洞**，不等于无违规
- 全站实测 `卡片` 命中（含 .bak 历史豁免）：250；**活文件**分布 = `blog-data/zh-hk.json` 19 / `products-content.ts` 11 / `sku-seo-data.ts` 10 / `case-studies/page.tsx` 8 / 其余若干
- ⚠️ 不能把「卡片」整列为禁词：会误伤**贺卡**（名片 SKU 已全站改名贺卡）与**白卡紙/紙卡**（§11.9 明确「纸卡」是物理材质、允许）→ 必须**语义上下文**判定（律師/品牌/企業 + 卡片；300-400g 厚卡 + 局部UV/燙金；名片尺寸 90×54mm；「客戶卡片留存率」类句式）

### B. §0.23 面：案例量化成果零来源
- `case-studies/page.tsx`：`client:` 24 条 / `result:` 24 条 / 含「提升|延長|縮短|%|倍」的 result = **24/24** / `source:|008|校准` 标注 = **0**
- L36 subtitle 写「真實客戶，真實成果」→ 若无来源支撑，属 §0.23 红线 + 虚假宣传风险（比缺标注更重）
- 处置：逐条二分（有来源→代码内 `{/* source: ... */}`；无来源→撤数字改定性）。按 §0.23 执行层**不得推断**哪些有真实成交支撑，需 K3/008 给口径

### C. 口径不一致（低风险，待一句确认）
- about `stats.satisfaction: '98%'` 无来源
- about `stats.products: '79'` vs 实测 `src/data/products.ts`：`id:` = 100、`slug:` = 101
- en 副标 `shipping ... from Hong Kong since 2012` vs 全站「15+ 年 / 15年」（2026 年口径应为 14 年）

### D. 008 判定（本轮结论）
- **about 不标 008**：① 性质不符（008 对象是「客户名+成果」型案例叙事，about 的「50+ 品牌案例」是樣品櫃統計 caption，且与 §0.22 SOP-10 第 3 款保护的 K3 8/19 拍板数字同类，误标＝§0.22 反例 #3 复发）② 位置不对（内部治理标注不应出现在客户可见页面）③ 无对象（about 无案例卡，24 条案例都在 case-studies）
- **008 的真实场景 = `case-studies/page.tsx`**（见 B）；且该页另有 §0.0 P0（见 A），优先级高于 008

## 残留待办

- `about` 案例/团队「待 008 案例库校准」标注：**复核后判定不做** —— about 内该处为 K3 8/19 拍板真实数据（4 格统计 + 「50+ 品牌案例」樣品櫃 caption），受 §0.22 SOP-10 第 3 款保护，误标 008 反而违规；about 无「具体客户名/成果」型案例卡，故无 008 场景
- Task J（8 个 T1 带钱词锁）骑马 weekly-meta cron 窗口
- cron 避峰改时间（daily 21:17→02:17 / gsc 22:43→03:43 / weekly Fri 23:07→Sat 01:07）**未执行，待老板确认**（仅改 3 个 expr，先备份 `jobs.json`）


