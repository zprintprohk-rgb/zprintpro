# zprintpro-daily-content-1x7w-ja-formula (SSoT)
# Source: mavis cron (待 K3 9:00 拍板后 mavis cron create 实际 ID)
# Last sync: 2026-08-08 04:55 (K3 8/8 04:35 战略级 + v8.9 升级同步)
# 触发: 每天 10:15 Asia/Shanghai (跟主 cron 同步)
# 预算: 90 min (ja 复制公式任务)
# 任务: ja 日本 = 复制公式 (ジープリント + 30 目录 + knowsAbout + 移动端优先)

【v1 升级 (2026-08-08 04:55 K3 8/8 04:35 战略级 3 市场分层 - ja 复制公式)】

## 一、核心战略 (per K3 8/8 04:35)

**ja 日本 = 复制公式 (核心: 把香港已验证的"智印港公式"复制到日本, 加速 §6.5 AI 可见性破 0)**

**智印港公式 (4 因子可量化)**:
| 因子 | 智印港做对了什么 | 对 GEO/排名作用 |
|------|----------------|----------------|
| 本地实体信号 | "港"字 + 香港本地词 | Knowledge Graph / AI 把它当"真实本地商家" |
| 品牌记忆度 | 3 字、口语化、谐音"智能印刷" | 命中语音搜索 + 长尾自然查询 |
| 口语=搜索词 | 粤语/普通话都说得顺 | 命中口语搜索 + 长尾 |
| 实体一致性 | 站名=社媒=目录=schema 4 处统一 | NAP/实体消歧清晰, AI 引用不混 |

**ジープリント (J-Print) 公式 (K3 8/8 02:52 拍板)**:
- **primary brand ja**: ZprintPro (维持 §13.13 鐵律, 不破现状)
- **alternate brand ja**: ジープリント (音译 Z→J + Print→プリント, 3 假名简洁)
- **rationale**: 音译 Z→J (日语无 Z) + Print→プリント = 3 假名简洁, 跟 en ZprintPro 品牌延续, SEO「プリント」是日语印刷核心搜索词

**ja 当前状态** (per GSC v2 分析):
- 3 月 imps 1638 / 17 clicks / 1.04% CTR / pos 37.01 (中游, 跟 EN 差不多)
- 7 天 移动端 2.36% CTR (桌面 0.70% 3.4 倍) - 移动端优先
- 商家信息 2/4 50% CTR pos 8 - JA KP 强信号
- 2 黑洞王: cmyk 系列 197 imps pos 80-99 + 教科書 印刷 80 imps pos 38.92

## 二、5 SKU JA 抓强信号 (8/8 10:15 amend push 整合)

5 SKU JA P0 (per v2 报告 §5):
1. **a2-posters** (32 imps 黑洞 pos 16-90) - title_ja 加 "A2ポスター" + "防水"
2. **outdoor-posters** (32 imps 防水 屋外) - title_ja 加 "屋外防水" + "耐候"
3. **fluorescent-stickers** (50 imps 50% CTR 长尾 + 8 imps 維持) - title_ja 加 "蛍光" + "1枚〜"
4. **kraft-paper-bags** (17+3 imps クラフト紙) - title_ja 加 "クラフト紙袋" + "100-200枚"
5. **textbooks** (227 imps 黑洞王) - title_ja 加 "教科書・教材 印刷製本"

**P0 第 1 优先** (per K3 8/8 04:35 战略级资源重排): **学校/教科書类** 投入产出比高, ja 教材需求强

## 三、§0.10 KPI 校准值 (per K3 校准)

| 指标 | M3 初始 | K3 校准 | 校准公式 |
|------|---------|---------|---------|
| JA CTR 7d | 1.5%+ | 1.2-1.4% | snippet 改后 1-2 周 |
| JA pos 7d | 35 | 38 | 排名响应 2-6 周 |
| ジープリント branded imps | 10+ | 5-7 | schema 重抓打 5 折 |
| JA KP imps | 30+ | 10-15 | KP 渐进 |
| 教科書 印刷 pos | 25 | 30-32 | 4 天外链不够 |

**复盘 SOP**: 任一 KPI 超校准值 = 优秀, 介于 = 合格, 低于 = 需分析

## 四、任务分配 (每天 10:15, 90 min)

### Task 1: ジープリント 实体建设 (30 min) - 每天跑
- NAP 段落强化 (日语版 4 段):
  1. 品牌 NAP: 「ZprintPro / ジープリント — 日本市場向け / アジア工場直送」
  2. 学園祭 NAP: 「学園祭印刷 専門 卒業記念アルバム / ステッカー」
  3. 联系 NAP: 「LINE 公式アカウント 見積もり / zprintpro@outlook.com」
  4. 物流 NAP: 「DHL 日本配送 2-4日 / JP Post 7-10日」
- 5 SKU JA 改字时 4 NAP 段一并加

### Task 2: knowsAbout + areaServed schema 注入 (15 min) - 8/9 Org sameAs 改后立即生效
- src/lib/seo.ts `generateOrganizationSchema` (L1633) 加 knowsAbout 8 项: [学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷, cmyk printing, waterproof stickers, small batch stickers]
- areaServed 加 'JP' (已有, 维持)
- 8/9 Org sameAs 改后 期望 JA KP imps 4 → 30+ (7.5x), 期望 JA KP CTR 50% → 65%+

### Task 3: 5 SKU JA 抓强信号验证 (15 min) - 每天跑
- 5 SKU JA PDP 改字后 4 天/72h 验 CTR (per §0.11 P0 抓强信号闭环)
- 输出每日 5 SKU JA CTR 报告 (3m vs 7d vs 24h)
- 不升 CTR 升级 K3 拍板 (回滚 / 加 5 FAQ / 等等)

### Task 4: 30 目录填表 (P1 任务) (15 min) - 8/10 起 AutoGLM 启动
- 8/10 K3 9:00 起来跑 AutoGLM 跑 .hermes/auto-glm/auto-glm-fill.js
- 每天 10 条 目录填表, K3 9:00 起来点最终提交 + 邮箱验证
- 30 目录目标: 印刷/POD 7 + 本地/创业 7 + 行业 5 + SaaS 3 = 22 起步 + 8 备选
- 首周目标: 20-30 条合规目录 = 日本实体存在感基线 (per §0.9 + matrix ja_brand.directory_targets_30)
- 跟 GSC 抓强监控 sub-cron 同步避免抢任务

### Task 5: JA 移动端专项 (8/15 跑) (10 min)
- JA 移动端 2.36% CTR 是桌面 3.4 倍 - title_ja 前 30 字移动端截断优化
- 5 SKU JA title 前 30 字加 "短納期" + "モバイル" 关键词
- 5 SKU JA descriptionJa 前 100 字加 "モバイル対応" USP

### Task 6: 教科書/教材 title 二批 (8/18 跑) (5 min)
- Week 1 验证后, 8/18 二次改 textbooks + exercise-books + graduation-yearbook
- 80 imps pos 38.92 → 期望 30-32 pos (per §0.10 校准)

### Task 7: 询盘转化 funnel (10 min) - 每天跑
- 跟 zh-hk 收割子 cron 同步, 监控 Supabase quotes 表
- JA locale 询盘数 (期望 0 → ≥1, per §0.12 转化侧指标)
- LINE 询盘响应时长监控 (期望 ≤ 2h, 超过升级 K3)

## 五、8/9 Org sameAs 改 (per v2 报告 §六 + 8/9 amend push 合并)

**src/lib/seo.ts 6 处改字** (per v2 diff 草稿):
1. L102 zh-hk alternateName 加 'ZprintPro JP'
2. L128 ja alternateName 改 'ジープリント' + 'ZprintPro JP', 删 '深セン印刷'
3. L141 ja sameAs 填 X + LinkedIn + 30 JP 目录 + Startup Base
4. L169 en sameAs 填 X + LinkedIn + Startup Base
5. L1643 generateOrganizationSchema 加 alternateName + sameAs + knowsAbout
6. SiteNAP interface knowsAbout?: string[]

**预期影响** (per §0.10 校准):
- JA KP imps 4 → 10-15 (3-4x, 校准后)
- EN KP imps 9 → 15-20 (2-2.2x, 校准后)
- branded search 6 query 0 → ≥1 (智印港已赢, ジープリント 期望命中)

## 六、5 渲染源 cross-check (per MEMORY.md §9, 改字前必查)

5 SKU JA 改字必查 5 渲染源:
1. src/data/products.ts (title_ja / descriptionJa 字段)
2. src/data/sku-seo-data.ts (PDP meta title / description, 优先)
3. src/data/blog-data/ja.json (blog 引用此 SKU)
4. src/components/pdp/orderform.tsx (PDP 提交后 fallback 文案)
5. src/components/pdp/referencepriceblock.tsx (PDP 价格表兜底)
6. public/llms-ja.txt (AI 注入, L11 + L222 副文件)

grep SOP: `grep -rn "蛍光ステッカー" src/ public/` / `grep -rn "A2ポスター" src/ public/` / `grep -rn "教科書" src/ public/` / `grep -rn "屋外防水" src/ public/` / `grep -rn "クラフト紙袋" src/ public/`
- 0 残留旧词 + 0 简体字 (ja 必须 0 简体, per §13.16.1)

## 七、Week 2 8/13-8/21 ja 复制公式推进 (K3 8/8 04:35 拍板)

- 8/13: 跟 zh-hk 抓强二批同步, ja 暂不批量改字 (等 Week 1 验证)
- 8/15: JA 移动端专项 (5 SKU title_ja 加 短納期 + モバイル)
- 8/18: JA 教科書/教材 title 二批 (3 SKU)
- 8/19: cmyk-guide 二次 retrofit (视 pos 进展, JA 197 imps 期望 70-75 校准)
- 8/21: 双周复盘 0 push, ja 5 SKU + 30 目录复盘

## 八、§0.13 K3 战略拍板 4 字+①②③ 模式 (per MEMORY.md §0.13)

**4 字**: X URL / LinkedIn URL / 5 SKU JA 改字 K3 审字 / 8/9 Org sameAs 改 K3 审 diff
**①②③**: 8/12 复盘改用校准值 / §0.10-0.12 三条入记忆 (✓ 已写) / Week 2 排期 OK
**M3 自主范围**: 5 SKU JA 选择 + 改字 USP 模板 + 30 目录目标 + knowsAbout 8 项 + matrix v2 ja_brand 段
**K3 9:00 必跑 4 件**: 3 设备 / Supabase dashboard / formsubmit 激活 / 提供 key + 8/10 起来点 AutoGLM 目录提交

## 九、报告落盘 (每天 22:00 跑)

- ja 复制公式日报: `.hermes/reports/ja-formula-YYYY-MM-DD.md` (5 SKU CTR + NAP 强化 + knowsAbout + 30 目录进度 + JA KP imps)
- ja 抓强清单: `.hermes/k3-inbox/ja-strong-signal-YYYY-MM-DD.md` (5 SKU 强信号 + cmyk-guide 进度 + 教科書 印刷 pos)
- ja 8/12 复盘: `.hermes/k3-inbox/2026-08-12-ja-review.md` (用 §0.10 校准值, 不按 M3 乐观值)
- ja 8/21 双周复盘: `.hermes/k3-inbox/2026-08-21-ja-biweekly-review.md`

## 十、§0.7 §0.8 §0.9 引用 (per K3 8/8 拍板)

- §0.7 关键漏斗 endpoint production smoke 3 步 (8/9 Org sameAs 改后必跑, 不跑不算 PASS)
- §0.8 Self-Reminder 防抖 (8/8 09:55 cron once 7e2cc0ba 一次性触发, 不空转)
- §0.9 外链注册自动化边界 (8/10 起 AutoGLM 30 目录填表, K3 点提交)
  - ✅ 可批量: 行业目录/本地商会/创业名录 → AutoGLM 填表
  - ⛔ 禁止: 论坛签名档/评论留链/Web2.0/PBN/自动换链
  - 守住一条: agent 填表, 最终提交按钮和邮箱验证由 K3 点 (ToS 合规)

## 十一、启动必读 (4 个 SSoT)

1. F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md (主 cron v8.9)
2. F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w-ja-formula.md (本文件)
3. F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json (matrix ja_brand 段)
4. F:\zprintpro-nextjs\AGENTS.md (项目宪法 §0 / §1 / §11 / §13.10 / §13.13 / §13.16.1)

## 十二、报告落盘 (本任务卡 v1 升级)

- 本文件: `.hermes/cron-prompts/zprintpro-daily-content-1x7w-ja-formula.md` (本文件, ~10K chars)
- 整合进主 cron v8.9 §七 3 sub-cron 路径
- K3 status 报告: `.hermes/k3-inbox/2026-08-08-0450-m3-v89-sync.md` (待写)
