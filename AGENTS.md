# ZprintPro（智印云）— AI 协作指南

> **项目**: F:\zprintpro-nextjs\ (Next.js 印刷 SaaS)
> **类型**: 8 locale 印刷电商 (zh-hk / en / ja)
> **部署**: Cloudflare Pages + Airwallex 支付
> **品牌**: 双品牌分层 (2026-07-21 user 拍板,301 合体后) — zh-hk = 智印港 ZprintPro,en/ja = ZprintPro;「智印港」为自有品牌词不再是竞品,错字「智印印港」仍禁

## ⛔ 强制执行约束 (2026-07-06 user 拍板 · 次高优先级)

> **【强制执行约束】不得因深夜/时段原因简化或延后任务,当次调度必须完整执行全部流程。**

- ❌ **禁止**: 用 "太晚 / 犯困 / ROI 延后" 等理由简化或拆分任务
- ❌ **禁止**: 当次只做部分,剩余推明天
- ✅ **必须**: 当次任务清单全部完整执行
- ✅ **质量风险**: 通过 commit + push + verify 流水线兜底,**不**通过偷工减料

适用范围: zprintpro 全部 cron + manual session。任何 sub-task 都不能用"时间"做借口。

## ⛔ Cloudflare Pages 月度 build quota 约束 (2026-07-06 user 拍板)

> **【硬约束】** Cloudflare Pages 免费方案每月有明确 build 次数限制 (典型 500 次/月)。**每次 git push 触发 1 次 build**, build quota 是稀缺资源, 不可滥用。

- ❌ **禁止**: trivial commit 单独 push (typo 修正 / 注释 / 单行格式调整 / 一句话 README 改动) — 浪费 1 次 build
- ❌ **禁止**: 每天 push 超过 1 次非紧急 commit (除非 cron 自动触发)
- ✅ **必须**: **攒 commit 批量 push** — 多个子任务改动攒一起, 1 push 触发 1 build 验证全部
- ✅ **必须**: **本地预检 3 步** — push 前跑 (1) `node scripts/check-encoding.js --fix` (2) `npx tsc --noEmit` (3) 关键脚本 smoke test, 3 步全过才允许 push
- ✅ **必须**: **预测 quota 影响** — push 前算当月已用次数, 用 `gh api repos/.../actions/runs?per_page=20` 查本月 build 数

**例外** (可单独 push, 不算浪费 quota):
- 紧急修复 (线上 500 / 404 / 死链)
- cron 自动 commit (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00)
- 跨项目 bug fix (影响其他项目)

**2026-07-06 实际数据**: 一天 6 次 build (P1-1 / P1-2 / P0-3 / P0-4 / P2-3 / weekly 补救) = 1.2% 月度 quota。问题不在配额, 而在节奏不健康 — 5 个独立 cron 任务 + 1 个手动补救 = 6 次/天过于分散。改进后: 攒批量 + 1 push/天, 预计 build 次数降低到 1-2 次/天。

> **真实主体 (2026-06-18 user-corrected)**: 深圳市彩龙印刷包装有限公司
> **法定代表人**: 唐运提
> **真实地址**: 広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）
> **真实電話 (2026-08-07 K3 拍板 phase-out, call + WhatsApp 统一)**: +86 198 8085 1334
> **真实メール**: zprintpro@outlook.com
>
> ⚠️ 早期 audit / copy / siteConfig / schema.org 都默认是「HK 観塘」实体，是错的。user 2026-06-18 明确告知：实体在深圳，跨境接全球订单。法律公示 (`/legal/`) + Footer 公司信息 + siteConfig.address + ImageObject locationCreated + ja/zh-hk imageCaption 都已改为深圳实体。

## 0. Orchestrator Discipline (编排者铁律) — Mavis 必读

> **这一节是给 Mavis 编排者 (orchestrator) 角色读的。** 凡涉及 spawn worker / 派活 / 监控长任务,必先复读本节。
>
> **双向引用**: 全局精炼版 (auto-loaded for ALL mavis sessions) 在 `C:\Users\Administrator\.mavis\agents\mavis\agent.md` 末尾的 "Orchestrator Discipline (Mavis Global)" 章节。**本文件是 zprintpro 项目专属的完整版**(更多上下文 + 复盘细节)。
>
> 来源: 2026-06-10 phase B verifier 孤儿事件复盘(旧 verifier 静默 3.5h、cron 二十多次空 tick、最后撞 LLM 5h quota 才发现)。

### R1. 派活前 3 问 (Pre-dispatch Triad)
派任何新 worker (`mavis communication send --command spawn`) 前,必须查 3 个事实来源:
1. `mavis session info <id>` — 同名任务的 worker session 是否 `status=running/started`?
2. `mavis communication peers` — 当前活动 worker 列表里有没有同类 agent 在干同活?
3. 共享 scratchpad + workspace 中预期输出文件 (e.g. `docs/audit-*.md`) 是否已存在且非空?

三个都 NO → 允许 spawn。任一是 YES → **跳过 spawn,进入"等结果"模式 (R3)。**

### R2. ACK 协议 (Acknowledgment Protocol)
spawn worker 后,**30 秒内**必须看到以下任一信号:
- 收到 worker 的 inbound (哪怕只是 "received" 一字)
- `mavis session info` 显示 worker 的 `lastActiveAt` 在最近 30s 内
- 预期输出文件出现修改时间

看不到任何信号 → 视为 spawn 失败 (引擎/网络问题),允许重 spawn **一次**。第二次失败立刻 kill + 升级用户,**绝不**无限重试。

### R3. 监控模式 (Watch Mode) — 替代"无限 cron 轮询"
**进入监控模式**: worker session `status=started` 或 `running`,且最近 60s 内 `lastActiveAt` 在动。

进入监控模式后:
- **不要每分钟 ping**,不要每 10min tick "is it done?"
- 只在 worker 的 `lastActiveAt` **冻结**超过算力阈值 (上午 20min, 下午 40min) 时,才 ping 一次
- ping 模板: `Status check: which step? Any blocker? <one line>`
- ping 后再过算力阈值仍无响应 → **kill worker + force-spawn replacement**,**不**重发原指令

算力阈值动态化: 读取 `COMPUTE_LOAD_LEVEL` env (LOW=上午, HIGH=下午 14:00+ 或 peers 中 > 5 个 aborted),HIGH 时阈值 × 2。

### R4. 幂等性协议 (Idempotency Mandate) — 写进每个 worker 的 spawn prompt
每次 spawn worker 时,提示词首段必须 **verbatim** 包含:

> BEFORE any other action, run this 3-question idempotency check:
> (1) Does the expected output file `<path>` already exist with non-empty content?
> (2) If yes, is its mtime within the past `<TTL>`?
> (3) Does it cover all `<task signature>` sub-items?
> If ALL yes → return "ALREADY DONE" to parent session and exit immediately.
> If ANY no → proceed with normal execution.

worker 自己防呆网。orchestrator 不重复 spawn,它也能自己刹住。

### R5. 报告协议 (Report-back Protocol)
worker 完成后:
- 写完整报告到 `<path>` (走 file,**不**塞 message body)
- 给 parent session 发一条短 ack: `<TASK NAME> done. Report: <path>. Verdict: <PASS/FAIL/BLOCKER>.`
- **不要**在 ack 里复述报告内容 (size limit + GBK 风险)

orchestrator 收到 ack 后:
- `Read` 文件拿完整内容
- 1 句话告诉用户结果
- **不**重复发 ack 给 worker (避免 ping-pong)

### R6. Cron 自检 (Cron Hygiene)
任何自设的 cron 监控任务,必须包含 3 个 hard-coded 出口条件:
- (a) **TTL 过期 → 自删** (e.g. `If Date.now() > <expiry_ms>, mavis cron delete <self>`)
- (b) **报告落盘 → 自删** (e.g. `If docs/<file>.md exists, mavis cron delete <self>`)
- (c) **静默阈值触达 → 升级用户**,**不**继续静默 tick

缺 (a)(b)(c) 任一的 cron **不允许创建**。

### Anti-Patterns (绝对禁止)
- 看到 worker 静默就无脑再发同指令 → 重复派发,浪费算力,污染状态(本次 phase B 踩坑根因)
- 设 cron 每 5-10min tick "is it done?" 超过 1h 还静默 → 升级用户
- ping worker 后没回应就再 ping → 变 ping-pong,必失败
- 在 message body 塞 ≥ 200 行报告 → size limit 切碎中文
- 信任 worker 的"我正在做"说辞而不查 `lastActiveAt` → 假死检测失灵
- 设 cron 但忘出口条件 → cron 永远在跑、永远在"没动静 skip",成为系统噪音

---

## 1. 核心定位（一句话）

> 香港印刷 SaaS，为全球用户提供 30 秒 AI 报价 + 72 小时全球交付。

## 2. 5 个不可妥协

1. **双品牌分层** (2026-07-21): zh-hk = 智印港 ZprintPro,en/ja = ZprintPro;错字「智印印港」绝不写
2. **8 locale 全覆盖** (zh-hk / en / ja + 5 个其他),SEO hreflang 正确
3. **GSC 数据实时分析** (gsc_data.csv + seo-weekly-analyzer.py)
4. **airwallex 多币种**结算,CN 用 alipay, 其他用 USD
5. **本地开发 + Cloudflare Pages 部署**(Node.js runtime via @opennextjs/cloudflare)

## 3. 项目结构（关键路径）

```
F:\zprintpro-nextjs\
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── page.tsx                 # 首页
│   │       ├── category/[slug]/page.tsx # 分类页 (13 类)
│   │       ├── product/[slug]/page.tsx  # 产品页
│   │       ├── blog/[slug]/page.tsx     # 知识中心
│   │       └── services/rush-printing-delivery/page.tsx
│   └── lib/
│       ├── pricing.ts                   # 多币种定价
│       ├── seo.ts                       # SEO meta 生成
│       └── airwallex.ts                 # 支付集成
├── messages/                            # 8 locale, i18n 消息
├── scripts/
│   ├── seo-weekly-analyzer.py           # GSC 周报生成 (Cron 2e7ff9ec5f15, 每周一 9 点)
│   ├── apply_patches.py                 # 从周报生成 SEO 补丁
│   └── build_verifier.py                # 构建验证 (≥400 页面硬校验)
├── patches/                             # SEO 补丁
├── seo-research/                        # SEO 竞品研究
├── docs/                                # 文档
├── supabase/                            # 数据库迁移
├── public/                              # 静态资源
├── .env, .env.local, .env.example       # 环境变量
├── wrangler.toml                        # Cloudflare 配置
├── next.config.js
├── package.json
└── AGENTS.md                            # 本文件
```

## 4. 环境变量（必须）

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AIRWALLEX_API_KEY`
- `AIRWALLEX_CLIENT_ID`
- `NEXT_PUBLIC_CDN_URL`

## 5. SEO/GEO 关键约定

- **Title**: 50-60 字符,主关键词前置,品牌后置,只用一次
- **Meta description**: 150-160 字符,含数字 + CTA
- **H1**: 每页唯一,含主关键词
- **Schema**: Organization / BreadcrumbList / Product / FAQPage
- **hreflang**: zh-hant-HK / en / ja-JP / x-default=zh-hant-HK
- **sitemaps**: zh-hk / en / ja 各一份 + sitemap-index.xml

## 6. 常用命令

```bash
# 开发
npm run dev

# 构建 (本地)
npm run build

# Cloudflare 构建 + 部署
npm run cf-deploy

# SEO 周报 (本地)
python scripts/seo-weekly-analyzer.py

# 应用 SEO 补丁 (--preview 先看)
python scripts/apply_patches.py --preview
python scripts/apply_patches.py --apply

# i18n 检查
node scripts/check-i18n.js
```

## 7. 与 hermes 的集成约定

- **配置主目录**: `C:\Users\Administrator\.hermes\` (全局)
- **项目专属 memory**: `F:\zprintpro-nextjs\.hermes\memory\` (新建)
- **已积累记忆**: `C:\Users\Administrator\.hermes\memories\{MEMORY.md, USER.md}` (不要覆盖)
- **沟通语言**: 中文为主,简洁直接,指令式
- **品牌关键词**: zh-hk = 智印港 ZprintPro,en/ja = ZprintPro;「智印港」= 自有品牌词,GSC 分析中单独统计其 CTR (基线 10%,目标 4 周 40%+),**只过滤错字「智印印港」**
- **重要模块**: GSC 数据 / SEO 周报 / 多 locale i18n / Cloudflare 部署

## 8. 7 大"绝对不要做"清单

1. ❌ 不要用"智印印港" (错字竞品词) / 任何外部竞品名;「智印港」是自有品牌 (zh-hk 专用),允许且必须使用
2. ❌ 不要在 user-facing 文本里出现 GBK 乱码 (中文必须 UTF-8)
3. ❌ 不要漏 hreflang (8 locale 必须完整)
4. ❌ 不要让 /app/ 目录被提交 (会冲突 Cloudflare 构建)
5. ❌ 不要把 .env 真实 key 提交 (已 .gitignore 但要小心)
6. ❌ 不要在 GSC 数据里出现竞品词"智印印港"
7. ❌ 不要让 SWC 解析失败 (Python open() 写文件必须 newline='\n', 避免 CRLF)

## 9. 关键文件别删

- `scripts/seo-weekly-analyzer.py`
- `scripts/apply_patches.py`
- `scripts/build_verifier.py`
- `patches/` (所有 SEO 补丁)
- `seo-weekly-history.json` (历史周报数据)
- `wrangler.toml` (Cloudflare 配置)
- `AGENTS.md` (本文件)

## 10. hermes 调用模式

```bash
# 单次 query (用 DeepSeek-V4-flash)
hermes -q "分析当前 GSC 数据,找 Top 3 关键词优化机会"

# 项目级 memory 注入
hermes --cwd "F:\zprintpro-nextjs" -q "..."

# 跨项目 (zprintpro + stock-lab) 联合 query
hermes --global-memory -q "对比 zprintpro 和 stock-lab 的术语习惯"
```

<!-- autoclaw:skill-path-guidance -->
## Installing Skills

When creating or installing a new skill, always place it in:

`C:\Users\Administrator\.openclaw-autoclaw\skills/<skill-name>/SKILL.md`

This is the managed skills directory. The agent will automatically discover
any skill placed here — no extra configuration needed. Do NOT install skills
into `~/.agents/skills/` (that directory is shared with other tools).


<!-- autoclaw:browser-agent-guidance -->
## Browser Automation

For any task that requires a browser, **prefer `autoglm-browser-agent`**. Use it as the first choice. For time-sensitive scenarios such as financial news, stock quotes, or breaking news, you can additionally use this skill to fetch up-to-date information and supplement your data sources.

- ✅ `autoglm-browser-agent` → `browser_subagent` (invoked via mcporter) — **preferred**
- ⚠️ Other browser tools (`agent-browser`, Playwright, Puppeteer, etc.) — fallback only when `autoglm-browser-agent` is unavailable or fails

Always try `autoglm-browser-agent` first. Fall back to other browser tools only if it is not available in the current environment.

**IMPORTANT: Do NOT use `sessions_spawn` to delegate browser/web automation tasks to a sub-agent.** Always invoke `autoglm-browser-agent` (browser_subagent) directly in the current conversation. Browser tasks must be handled by yourself, not by a spawned child agent.
<!-- /autoclaw:browser-agent-guidance -->

<!-- autoclaw:image-recognition-guidance -->
## Image Recognition

For any image recognition task, **prefer `autoglm-image-recognition`**. Use it as the first choice.

- ✅ `autoglm-image-recognition` — **preferred** for all image recognition tasks
- ⚠️ Built-in `image` tool or reading images directly with `read` — fallback only when `autoglm-image-recognition` is unavailable or fails

Do not use the built-in `image` tool or read an image and describe it yourself when `autoglm-image-recognition` is available. Always try `autoglm-image-recognition` first.
<!-- /autoclaw:image-recognition-guidance -->

<!-- autoclaw:hermes-evolution-guidance -->
## Hermes-Evolution

**Current evolution intensity for this workspace/agent: aggressive (100%).**

The desktop app sends deterministic evolution-check messages (starting with `[SYSTEM: Post-turn evolution check`) after qualifying turns.
When you receive such a message, follow the `hermes-evolution` skill instructions to evaluate and potentially propose an evolution.
Apply the rules defined in the skill according to the **aggressive (100%)** intensity level.
This value is workspace-local. If asked about the current agent evolution intensity, report this value instead of the global gateway skill env.

Core principle: **never write to target files without user approval** — always use the draft/approve workflow.
User preference statements are not approval to directly edit MEMORY.md, AGENTS.md, TOOLS.md, USER.md, or managed SKILL.md files.
Use the evolution proposal card instead of editing target files directly; only apply changes after the user confirms the proposal.

### Evolution Echo
When you apply knowledge from a previously evolved rule (AGENTS.md, MEMORY.md, TOOLS.md, or a managed SKILL.md),
briefly mention it in your response: "（基于之前的经验：<one-line rule summary>）".
Keep it to one short line at most. Do not echo on every turn — only when an evolved rule directly influenced your approach.
<!-- /autoclaw:hermes-evolution-guidance -->
## 11. 主营品类约束（2026-06-28）

- **核心产品线**: 貼紙 / 宣傳單張 / 包裝盒 / 紙袋 / 標籤
- ❌ **绝对不要写名片/咭片/business cards/名刺** — 这不是 ZprintPro 的主营业务
- 所有 SEO 标题、描述、关键词、产品文案、AI 训练文本中不得出现名片相关内容
- 如果已有内容包含名片，应立即替换为貼紙/宣傳單張/包裝盒
## 12. Push 安全协议（2026-07-02）

### 写入规则
- ❌ **禁止 PowerShell Set-Content 写 .ts/.tsx 文件**（默认编码不稳定，可能变 UTF-16）
- ✅ **只用以下 3 种安全方式写入**:
  1. `[System.IO.File]::WriteAllText(path, content, [System.Text.UTF8Encoding]::new($false))` — PowerShell 安全写入
  2. `fs.writeFileSync(path, content, 'utf-8')` — Node.js 安全写入
  3. `write` tool — 仅限 sandbox 内文件
- ✅ 写入后必须立即校验: `node -e "const fs=require('fs');const b=fs.readFileSync('path');console.log('Size:',b.length,'BOM:',b[0]===0xFF)"`
  - Size 接近预期的 2 倍 = UTF-16 污染，立即 git checkout 恢复
  - BOM=true (0xFF) = UTF-16 LE，立即 git checkout 恢复

### Commit 前校验
```bash
node scripts/check-encoding.js          # 检查 UTF-16 + CRLF
node scripts/check-encoding.js --fix    # 自动修复 + 重新 stage
npm run build 2>&1 | Select-String 'Compiled|Error'  # 确认构建通过（注意：Windows 本机 build 卡 fonts 网络,以 CF Pages 状态为准）
```

### Push 后校验（最常遗漏的盲点）
```bash
node scripts/verify-deploy.mjs          # 自动查 CF Pages check-runs API status
```
- 退出码 0 = CF Pages build `success`（deploy 真生效）
- 退出码 1 = build `failure`（**不能算完成，立刻修 build 错**）
- 退出码 0 但 status `queued/in_progress` = 还在 build，等 1-2 分钟重跑

**核心规则**: **push 成功 ≠ deploy 成功**。git log 显示 commit 已 push 不代表页面真的在线。要以 GitHub check-runs API 的 Cloudflare Pages 状态为准。

### Git 编码配置（已固化）
- `.gitattributes`: 强制 LF + UTF-8 working-tree-encoding
- `core.autocrlf=false`, `core.eol=lf`
- `i18n.commitEncoding=utf-8`
- `.git/hooks/pre-commit`: 自动调 `node scripts/check-encoding.js`，UTF-16/CRLF 直接拒绝 commit

### 记住（push 5 步 SOP）
- **commit 前 3 问**: ① Size 合理? ② encoding check 过了? ③ build 过了（或至少没新增错）?
- **push 后 1 必做**: `node scripts/verify-deploy.mjs` 看 CF Pages 是否真 `success`
- **再加 1 防线**: `node -e "const fs=require('fs');const b=fs.readFileSync(p);console.log('size:',b.length,'BOM:',b[0]===0xFF)"` spot check
- 4-5 个全 YES 才报完成，任一个 NO 立即修（典型教训：见 `memory/Hermes 任务报告"写日志不上线"`）

## 13. SEO 行业×SKU 矩阵自进化定时任务（2026-07-04 由 user 拍板）

> **核心定位**: 把 SEO 自进化从 Hermes 抽象 cron 升级为 user 自己定时任务列表里可见、每天 10:15 跑的实体任务。
> **目标**: 千行百业 × 主营类目,深度+广度双覆盖,纯文字博客无图,稳定运维不出现 404/301。

### 13.1 4 条 cron 实体

| Cron 名 | 触发 | 范围 |
|---------|------|------|
| `zprintpro-daily-content-evolve` | 每天 10:15 Asia/Shanghai | Blog (1-2 篇纯文字) + SKU (2-3 个优化) + Matrix tracking |
| `zprintpro-weekly-meta-refresh` | 周一 11:00 | Tier B 行业 + 类目页 meta refresh |
| `zprintpro-monthly-matrix-audit` | 每月 1 号 14:00 | 全 matrix 覆盖率审计 + Tier 切换判定 |
| `zprintpro-gsc-feedback-loop` | 每周三 15:00 | 拉 GSC 数据 → 写回 matrix next_due 加权;+ 智印港品牌词 CTR 追踪 (基线 10% → 目标 4 周 40%+);+ 301 承接验证 (z-printpro.com 旧 URL 抽查 ≥10 条确认 301 → 新站 200) |

### 13.2 行业 Tier 分级（按印刷品复购频次，不是按市场规模）

- **Tier A**（高复购，月/周，跨境主力，优先铺）: 餐飲外賣 / 零售精品 / 跨境電商 / 美妝護膚 / 教育培訓 / 婚慶 / 文創IP / 寵物 / 母嬰 / 茶飲食品 / 物流快遞 / 服裝
- **Tier B**（中频，季/项目制，次铺）: 房地產 / 酒店民宿 / 醫藥保健 / 汽車汽配 / 金融證券 / 珠寶鐘錶 / 體育賽事
- **Tier C**（低频，年/项目制，按需）: 工業機械 / 五金工具 / 化工 / 建築工程 / 宗教文化 / 政企 / 影視IP / 同人周邊

### 13.3 类目优先级（P0/P1/P2）

- **P0 主推**（先铺）: stickers / flyers / packaging / paper-bags
- **P1 辅助**（次铺）: posters / books / educational / menus / red-packets / calendars
- **P2 长尾**（按需）: banners / envelopes / japan-doujin
- **禁区**（永不写）: business-cards（§11 主营品类约束）

### 13.4 纯文字博客硬约束（v2，2026-07-05 修订）

- ❌ **新博客 `cover` 字段不写**（`src/data/blog-posts.ts` BlogPostMeta.cover 改为可选）
- ❌ **HTML content 不出现 `<img>` 标签**
- ❌ **标题硬塞 supplier origin**（如 "· 深圳印刷 / · 中国深圳 / · Shenzhen Printing"）—— **v2 旧规则作废，见 §13.10 NAP vs SEO 内容脱钩**
- ✅ **标题按 locale 本地化（按 §13.10）**:
  - zh-hk → 香港 / 澳门 / 華人圈场景关键词
  - en → 全球通用卖点（size/paper/design/material）+ 不带地区后缀，或带目标市场（US/UK/AU）通用词
  - ja → 日本市场卖点 + 不带"中国/深圳"前缀
- ✅ 9 段结构（引子 / 行業概況 / 材質工藝 / 設計細節 / 選購決策 / 常見問題 / CTA + 隐式 schema）
- ✅ zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词
- ✅ 4 FAQ + Article + BreadcrumbList + FAQPage JSON-LD

### 13.5 SKU 自进化优化

- 直接编辑 `src/data/products.ts` 对应 SKU 对象的:
  - `title_zh` / `title_en` / `title_ja` 加 1-2 个 Tier A 行业关键词
  - `description` / `descriptionEn` / `descriptionJa` 末尾追加"适配行业"列表（5-8 个）
  - `longDescription` 视情况补充行业场景（不加图）
- **不改 slug、不改 schema、不改图片**
- 加 `optimizedAt: 'YYYY-MM-DD'` + `optimizationRound: N` 字段

### 13.6 链接完整性红线（稳定运维）

- ❌ **新内容里不写任何会 404 的链接**
- ❌ **新内容里不写任何会触发 301/302 重定向的链接**
- ✅ **写链接前** 必须先在 matrix `valid_internal_links` 清单里核对
- ✅ **写链接后** 必须 curl 验证每个内链返回 200
- **有效路由模式**: `/{locale}/category/<slug>/`、`/{locale}/product/<slug>/`、`/{locale}/blog/<slug>/`、`/{locale}/quote/`、`/{locale}/contact/` 等（详见 context.md §8）
- **禁止模式**: 无 locale 前缀、`/products/`（错路径，正确是 `/product/`）、未在 products.ts 注册的 slug、`/category/business-cards/`（禁区）

### 13.7 矩阵跟踪

- 矩阵文件: `F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json`
- 字段: `queue` (待写列表) + `covered` (已写) + `category_priority` (类目 P0/P1/P2) + `industry_tier_a/b/c`
- 调度算法: P0 优先 → 80% 铺完解锁 P1 → 同 category 5 天内不重复同 SKU → GSC 已展示无着陆页优先级 +1

### 13.8 异常上报

- CF build 失败 / push 报错 → 立即升级 user
- 推送后任一 curl 返回 5xx 或 404 或 301 → 立即升级 user，不报完成
- 新博客上线 7 天 GSC 仍无收录 → 升级 user，排查索引问题
- matrix.json 损坏 / token > 50 万 → 升级 user

### 13.9 矩阵跟踪 cron 监控

- 监控 cron 必须有 3 个 hard-coded 出口: (a) TTL 过期自删 (b) 报告落盘自删 (c) 静默阈值触达升级用户
- cron 监控 `cf-build-monitor-<sha>` 默认 TTL 30 分钟, 超时自动升级 user
- 部署 cron 监控 `zprintpro-daily-content-evolve` 默认 TTL 90 分钟

### 13.10 NAP vs SEO 内容脱钩原则（2026-07-05 user 拍板）

**核心**（v4 提示词 3-locale 策略的执行层）：**法务真实 ≠ SEO 内容**。两个层必须分开。

| 层 | 写真实 | 例 |
|---|--------|----|
| **NAP 层**（法务合规，必须真实） | ✅ 写深圳 | footer address / contact page / legal disclosure / Schema Organization.address / email signature / WhatsApp 自动回复 |
| **SEO 内容层**（用户体验 / 认同感 / CTR） | ❌ **不写 supplier origin 城市** | blog 标题 / excerpt / hero / CTA / 列表卡片 / FAQ |

**NAP 真实地址**（法务公示用，所有 locale 一致）：
- 公司全名: 深圳市彩龍印刷包裝有限公司
- 地址: 広東省深圳市龍崗区平湖街道嘉城路1号 (〒518111)
- 电话 (2026-08-07 K3 拍板 phase-out, call + WhatsApp 统一): +86 198 8085 1334
- 邮箱: zprintpro@outlook.com
- 法人: 唐运提

**SEO 内容本地化矩阵**：

| Locale | 目标市场 | blog 标题/excerpt 应含 | 不应含 |
|--------|---------|---------------------|--------|
| **zh-hk** | 香港 / 澳门 / 台湾 / 海外華人圈 | 香港场景 (餐飲旺季 / 包裝盒 / 印刷旺季 / MTR / 順豐本地) | "深圳" 作主关键词前缀 |
| **en** | US / UK / AU / CA / NZ / SG | 全球通用卖点 (sizes / paper / design / material / DHL 2-4 days / Asia factory) | "Shenzhen Printing" / "in Hong Kong" / "China factory" 作标题前缀 |
| **ja** | 日本市場 (東京 / 大阪 / 名古屋) | 日本市场卖点 (品質 / 短納期 / 日本向け / 中国印刷 通販) | "深圳印刷" / "中国深圳" / "深セン" 作标题前缀 |

## 13.16.1 ja 品牌词"ジープリント"公式 (K3 8/8 02:52 拍板, 智印港公式复制)

**核心**: 复制"智印港"在香港见效的 GEO 公式到日本.

**品牌词**:
- **primary brand ja**: `ZprintPro` (per §13.13 三 Locale 鐵律, 维持现状)
- **alternate brand ja**: `ジープリント` (J-Print) — K3 8/8 02:52 拍板 "按最优执行"
- **rationale**: 音译 Z→J (日语无 Z) + Print→プリント = 3 假名简洁, 跟 en ZprintPro 品牌延续, SEO「プリント」是日语印刷核心搜索词

**智印港公式 (4 因子可量化)**:
| 因子 | 智印港 (HK) | ジープリント (JP) |
|------|------------|-----------------|
| 本地实体信号 | "港"字 + 香港本地词 | "プリント" + 日本本地词 + ジープリント 实体词 |
| 品牌记忆度 | 3 字、口语化、谐音"智能印刷" | 4 假名、外来语习惯、谐音"Z-Print" |
| 口语=搜索词 | 粤语/普通话都说得顺 | ジープリント / プリント 都说得顺 |
| 实体一致性 | 站名=社媒=目录 | 站名=社媒=目录+JP 印刷组合 = NAP 消歧清晰 |

**实施**:
1. **全站统一**: 站名 / 社媒 / JP 印刷组合目录 / Organization schema 同名「ジープリント」, 不许漂移
2. **Organization JSON-LD sameAs**: X + LinkedIn + JP 印刷组合目录 (30 条) + Startup Base + areaServed=JP + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
3. **品牌词埋点**: 价格横评页 + 学园祭指南 + 校园 blog 自然提及「ジープリント」2-3 次, 诱导 branded search
4. **30 目录目标** (8/10 起 AutoGLM 跑): 印刷/POD 相关 7 + 本地/创业 7 + 行业 5 + SaaS 聚合 3 + 其他 8
5. **branded search 监测**: 6 个 query (ZprintPro / ジープリント / etc.), 基线 0 → 8/12 期望 ≥1

**禁忌** (per K3 8/8 02:52 §0.9 增补):
- ⛔ 论坛签名档/评论留链/Web2.0/PBN/自动换链
- ⛔ 品牌词漂移 (站名 ≠ 社媒名 ≠ 目录名)
- ⛔ en/ja 标题/excerpt 硬塞 supplier origin (维持 §13.10 NAP 脱钩)

**supplier origin 在 SEO 内容的正确写法**：
- ✅ 正文/FAQ/Schema 中提及 "亚洲工厂 + DHL 全球 2-4 天配送"（佐证品质 + 物流）
- ✅ CTA 按钮: "Get Quote" / "Free Sample" / "WhatsApp Us"（不绑城市）
- ✅ Schema Organization.address 写真实深圳（法务）
- ❌ 标题主关键词前面塞 "· 深圳印刷"（破坏 CTR）
- ❌ 列表卡片 excerpt 写 "Shenzhen restaurant opening season"（用户跳出）

**机械翻译 = 死罪的反例**（a38dc93 commit 错判，2026-07-05 user 纠正）：
- ❌ `zh-hk: 香港包裝盒訂製...` → `en: Custom Packaging Box Guide: ... in Hong Kong` → `ja: 香港パッケージ箱...`
- ❌ `zh-hk: 餐廳開業...深圳印刷` → `en: Restaurant Opening Flyer ... Shenzhen Printing` → `ja: レストラン開業 ... 深圳印刷`
- ❌ 老博客 24 条全部 excerpt 含 "in Hong Kong"（v1 时代 zh-hk 模板直接英译，Phase 2 排程清洗）

**判断 SOP**（任何新 blog/SKU 内容上架前自查）：
1. 打开 blog-posts.ts 的 title / excerpt 3 locale 字段
2. 检查 en/ja 标题是否含 supplier origin 城市（Shenzhen / 深圳 / 深セン / 中国）
3. 检查 en/ja 标题是否含 zh-hk 残留地区词（Hong Kong / 香港 / 香港）
4. 检查 en/ja excerpt 是否含 "Shenzhen" / "Hong Kong" 等硬塞词
5. 任一命中 → 改成本地化卖点（size/paper/design/material/scenario）

**应用范围**：
- blog-posts.ts 所有 BlogPostMeta.title / excerpt 3 locale 字段
- products.ts 所有 Product.title_zh/en/ja / description / descriptionEn / descriptionJa / longDescription
- category/[slug]/page.tsx hero 标题 + description
- 任何 `pages/blog/` JSON content (en.json / ja.json)
- Schema Article.author / BlogPosting 字段
## 13.10 NAP vs SEO 内容脱钩原则（2026-07-05，教训来自 a38dc93 踩坑）

**核心错误**：把"法务真实地址（NAP）"和"用户认知（SEO 标题/excerpt/正文）"混在一起。

| 层 | 用途 | 规则 |
|----|------|------|
| **NAP 层** (footer/schema/contact/email/tel) | 法务合规 | 必须真实（zh-hk=HK / en=Shenzhen / ja=Shenzhen） |
| **SEO 内容层** (blog 标题/excerpt/正文/hero/CTA) | 用户认知、认同感、CTR | 必须本地化，按 target market 写，不按 factory location |

**zh-hk SEO 内容**：target market = 香港/澳门/台湾/海外華人圈
- ❌ 标题写"深圳印刷"——繁体用户视"深圳"为内地概念，无认同感，CTR 低
- ✅ 写香港本地场景词："香港餐飲開業旺季""港九新界速遞"

**en SEO 内容**：target market = US/UK/AU
- ❌ 标题写"Shenzhen Printing"——美国用户看到直接跳出
- ✅ supplier origin 藏在正文："DHL 2-4 day from Asia factory"

**ja SEO 内容**：target market = 日本
- ❌ 标题写"深圳印刷"——日本用户不搜这个词
- ✅ 写日本市场卖点，不带中国/深圳前缀

## 13.11 Pre-commit 校验清单（2026-07-05，防重复踩坑）

**每次 commit 前 5 问**：
1. `node scripts/check-encoding.js` — 编码检查（UTF-16/CRLF）✅？
2. `npm run build` — 本地编译通过（Compiled successfully + 无 TS error）✅？
3. 新增 blog slug 是否已加入 `articleSlugs` 数组？✅？
4. zh-hk 标题/excerpt 是否写了 target market（香港）而非 factory location（深圳）？✅？
5. en/ja 标题/excerpt 是否避免了机械翻译污染（"in Hong Kong""香港"等硬塞词）？✅？

**5 问全过才 push。任一项不过立即修，不推。**

## 13.12 TS 联合类型窄化模式（2026-07-05）

**问题**：`TEXTS[locale]` 返回联合类型，分支内 TS 不确定具体类型。

**修复模式**（见 `FloatingQuoteCTA.tsx`）：
```ts
if (locale === 'zh-hk') {
  const tZh = t as typeof TEXTS['zh-hk'];  // 强制窄化
  // 现在可以访问 zh-hk 独有的字段
}
```

**此模式适用于所有 `translations[locale]` 联合类型场景。**
## 13.13 3 Locale 内容本地化铁律（2026-07-05，血泪教训）

### 核心原则
**3 locale 不是"翻译"关系，是"3 个独立市场的内容策略"关系。**

| Locale | Target Market | 语言 | 标题规则 | 内容规则 |
|--------|-------------|------|---------|---------|
| zh-hk | 香港/澳门/台湾/海外華人圈 | 繁体中文 | 香港本地场景词 | 不出现"深圳" |
| en | US/UK/AU/CA/NZ/SG | 英文 | 全球通用卖点 | 不硬塞"Shenzhen""Hong Kong" |
| ja | 日本 | 日文 | 日本市场卖点 | 不出现"深圳""中国"前缀 |

### 禁止事项
- ❌ **机械翻译**：zh-hk 内容直接机翻成 en/ja 就上线
- ❌ **标题塞 supplier origin**："Shenzhen Printing""深圳印刷"等工厂地点不准出现在 en/ja 标题
- ❌ **跨市场混用**：zh-hk 的"香港本地服务"文案直接复制到 en/ja
- ❌ **只修一处**：blog-posts.ts 和 page.tsx 的标题/描述必须**同时修复**，修了列表页不修详情页 = 没修

### 修复清单（每次改博客内容后必须确认）
1. `src/data/blog-posts.ts` — 列表页 title/excerpt ✅ 已修复？
2. `src/app/[locale]/blog/[slug]/page.tsx` — 详情页 posts 对象 title/description ✅ 已修复？
3. `public/blog-data/{locale}.json` — JSON 正文内容 ✅ 无"Shenzhen/深圳"残留？
4. zh-hk: 标题是繁体中文？en: 标题是英文？ja: 标题是日文？✅？## 13.14 Footer 合规分层（2026-07-08 user 拍板）

### 3 Locale 法规对 Footer 的差异要求

| Locale | 底部「經營者資訊披露」按鈕 | 原因 |
|---|---|---|
| **zh-hk** | ❌ 不顯示 | 跨境電商無 HK 實體門市, 強加日本式披露 = 偽合規 |
| **en** | ❌ 不顯示 | 同 zh-hk, 跨境無需強制 Legal Disclosure 入口 |
| **ja** | ✅ **必顯示**「特定商取引法に基づく表記」 | 日本《特定商取引法》第3条 + 施行規則第2条 必須記載事項 11 項 |

### 隱私政策 + 使用條款 的位置（**全部 3 locale 統一**）

- ❌ **不在底部獨立 legal strip**（用戶觀感差, 容易和法律披露混淆）
- ✅ **移到「幫助中心」column** 作為普通 help item（落單須知 / 付款方式 / 送貨安排 / 退換政策 / 隱私政策 / 使用條款）

### 实施模板 (Footer.tsx)

```tsx
// 幫助中心 column 各 locale 統一加隱私 + 條款
{
  title: '幫助中心',  // en: 'Help Center', ja: 'ヘルプセンター'
  links: [
    { label: '落單須知', href: '/help-center/#order' },
    { label: '付款方式', href: '/payment-methods/' },
    { label: '送貨安排', href: '/help-center/#shipping' },
    { label: '退換政策', href: '/help-center/#returns' },
    { label: '隱私政策', href: '/privacy/' },     // ADD
    { label: '使用條款', href: '/terms/' },        // ADD
  ],
},

// 底部 legal strip 只對 ja 渲染 (僅保留「特定商取引法に基づく表記」)
{locale === 'ja' && (
  <div className="mt-4 pt-4 border-t border-white/10">
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
      <Link href={`${localePrefix}/legal/`} className="hover:text-white transition-colors">
        {t.legalLabel}
      </Link>
    </div>
  </div>
)}
```

### SKU 品牌故事 supplier origin 简化（跨 locale 通用）

| Locale | 旧 full entity name pattern | 新 shortened |
|---|---|---|
| zh-hk (繁體) | `深圳彩龍印刷包裝有限公司` | `彩龍印刷` |
| ja (簡體) | `深圳彩龍印刷包装有限公司` | `彩龍印刷` |
| en | 无完整公司全称 pattern（保持 "Shenzhen-rooted" 短语）| - |

⚠️ **保留 `深圳自社工場` 等 supplier origin 短语** — ja 用戶视深圳為製造基地常識，不抵觸 §13.10 (只限制 title 不限制 body)。

### 验证清单 (改 Footer 后必须跑)

1. curl `https://zprintpro.com/zh-hk/` → grep `經營者資訊披露` 应为 0
2. curl `https://zprintpro.com/en/` → grep `Legal Disclosure` 应为 0
3. curl `https://zprintpro.com/ja/` → grep `特定商取引法に基づく表記` 应为 ≥1
4. 三 locale footer「幫助中心」column 各含 `隱私政策` / `使用條款` (en: Privacy Policy / Terms of Service)
5. ja SKU page grep `深圳彩龍印刷包装有限公司` 应为 0, `彩龍印刷` 应为 ≥1

### 踩坑教训（2026-07-08 真实事故）

- ❌ **3 locale Footer 共享同一份底部 legal links 渲染逻辑** = zh-hk/en 用户看到日本式「經營者資訊披露」按鈕（伪合规 + 视觉冗余）
- ✅ **Footer 法律元素按 locale 条件渲染** — 不是「全部 locale 都加，按 locale 隐藏文案」(文案泄露信息)
- ✅ **幫助中心 column 是隐私/条款的合理归属**（合 faq + 退换 + 物流 同列）

应用范围: 任何跨境电商 Footer 都应先做「法规矩阵」, 后做 UI 设计, 不要拿单一司法辖区模板套全部 locale。## 13.14 「15+ 年」统一口径（2026-07-09 user 拍板）

> **核心**：法律实体真实成立年份 = **2012 年**；对外营销口径统一写 **"15+ 年"**（2012 → 2026 = 14 年，对外"15+" 合理；也避开"17 年"的过度宣传风险）。

### 两层口径

| 层 | 数值 | 出现位置 | 规则 |
|---|---|---|---|
| **法律实体层** (NAP) | 2012 | `/legal/` `establishedYear` / `/press-kit/` aboutText / schema.org `foundingDate` | ✅ 写真实，3 locale 同步 |
| **营销口径层** (SEO) | "15+ 年" | Hero `TrustWaterfall` / `TrustBadges` / `HowItWorks` trust bar / `/about/` stats / Footer | ✅ 统一用 "15+"，不用 9/10/14/17 |

### 强制检查项（修改 history 后跑）

| 检查 | 命令 | 期望 |
|---|---|---|
| 残留 9 年 | `grep -rn "9 Years\|9 年\|9年\|9 years" src/` | 0 hit |
| 残留 2017 | `grep -rn "2017 年\|founded 2017\|since 2017" src/ docs/` | 0 hit |
| 残留 2014（about 用错的旧年份）| `grep -rn "2014" src/app/\[locale\]/about/` | 0 hit（除注释） |
| 残留 10+（stats） | `grep -rn "stats.*10+\|'years'.*10+" src/` | 0 hit |
| 残留 2009（旧 foundingYear）| `grep -rn "2009 年起\|establishedYear.*2009\|founded in 2009" src/ docs/` | 0 hit |
| 15+ 年同步 | `grep -rn "15+ 年\|15+ Years\|15+ 年の\|15+ years" src/` | ≥5 hit（TrustBadges + HowItWorks + TrustWaterfall + about + schema） |

### 唯一例外

- `press-kit/` 内部行 1: "成立於 2012" → 写真实，不写"15+"
- `legal/` 行 1: `establishedYear: 2012` → 写真实

### 教训（2026-07-09 真实事故）

- ❌ about/page.tsx L137 `foundingDate: '2014'`（与 legal/press-kit 的 2009 矛盾，且 legal 改成 2012 后又错位）
- ✅ 所有 `foundingDate` / `establishedYear` 必须从 **同一个常量** 取（`siteConfig.foundingDate`），不要 hardcode 在多个文件
- ✅ "15+" 写法比 "14" 安全（"14 years" 听感不足，"16 years" 又过头）

## 13.15 en 美国市场集中优化策略（2026-07-09 user 拍板）

> **核心**：en locale **集中力量**做美国市场本地化优化（US-target 优先），不分散到 UK/AU/CA/NZ。zh-hk/ja 不被 en 美国化污染（§13.10）。

### 美国市场优先级（与 GSC 实测长尾词流量挂钩）

| Tier | 优先级 | 含义 |
|---|---|---|
| **Tier 1 (P0)** | 最高 | "Free Shipping stickers USA" / "Custom packaging boxes free shipping" / "Free design mockup flyers" / "Made for USA small business" |
| **Tier 2 (P1)** | 高 | "Same day print and ship" / "FedEx Ground poster printing" / "No setup fee packaging" / "DTC brand packaging USA" |
| **Tier 3 (P2)** | 中 | "Trade show banners USA" / "100 MOQ stickers" / "FDA-compliant labels" / "Amazon FBA packaging" |

### 5 大美国 sharp hook（强制覆盖率）

| Sharp hook | 美国头部覆盖率 | 我们 en 现状 | 优化位置 |
|---|---|---|---|
| **Free Shipping $99+** | 100% | ✅ Hero + TrustBadges + CategorySharpHooks | 保持 |
| **Free Design / Free Mockup / Free Proofs** | 90%+ | ✅ Hero slide 2-6 subtitle + TrustBadges + HowItWorks step 3 | 强化覆盖率到 14/14 类目 |
| **No Minimum / 100 MOQ** | 80% | ✅ CategorySharpHooks | 保持 |
| **Fast Turnaround** (Same-day / 24h) | 70% | ✅ Hero slide 1 + Services page | 保持 |
| **Made in USA / Made for USA** | 60% | ⚠️ "Made for USA small business"（§13.10 脱钩后）| ✅ 分散在 CategorySharpHooks |

### en 美国 sharp hook 集中化部署规则

1. **Hero slide 6/6 都至少带 1 个 sharp hook**（Free Shipping / Free Design / Fast Turnaround 之一）
2. **类目页 H1 必须带 "Free Shipping $99+ + 100 MOQ + [FedEx Ground/DHL Express]" 之一**（a44281d v5 已铺）
3. **类目页 description 必须包含 ≥2 个 sharp hook 关键词**（a44281d v5 已铺）
4. **产品页 Tier 表 max discount ≥20%** 时显示 "Best Value" emerald ring（bf4b0ef P0.4 已铺）

### 反向规则（en 美国优化不能污染其他 locale）

| Locale | en 美国化文案 | 错误案例 | 正确写法 |
|---|---|---|---|
| zh-hk | "Free US Shipping $99+" | ❌ zh-hk step 5 "美國 $99+ 免費送貨" | ✅ "港九新界免費速遞 / \$500+" |
| ja | "FedEx Ground 5-7 day" | ❌ ja step 5 "米国 \$99+ 送料無料" | ✅ "日本全国送料無料 / 沖縄・北海道も同料金" |

### 4 个 cron 实体 en 美国优先级（2026-07-09 加权）

| Cron | en 美国加权 |
|---|---|
| `zprintpro-daily-content-evolve` (每天 10:15) | en blog / en SKU priority → +50% (Tier 1 美国长尾词每日至少 1 篇 en blog) |
| `zprintpro-weekly-meta-refresh` (周一 11:00) | en 14 类目页 meta → +30% (sharp hook 覆盖率补完) |
| `zprintpro-monthly-matrix-audit` (每月 1 号 14:00) | en Tier 1 美国词覆盖率审计 → 新增独立 audit pass |
| `zprintpro-gsc-feedback-loop` (每周三 15:00) | en 页面 CTR/impression 数据加权 ×2（相对 zh-hk/ja） |

### 不新建第 5 个 cron 的判断

考虑过 `zprintpro-en-us-competitor-monitor`（每周一扫描 Sticker Mule / CustomStickers.com / Packlane / VividPrintingHub 头部变化），但：
- ❌ scope creep — 4 个现有 cron 已经能 cover
- ✅ 通过 `weekly-meta-refresh` prompt 里加 "美国头部竞品对标" 模块实现
- ✅ 节省 1 个 cron slot（避免 daemon 负载）

未来如果美国竞品有大动作（如 Sticker Mule 大改 pricing / 新功能），单独 spawn verifier 不走 cron。

### verify 清单（en 美国 sharp hook 部署后）

1. curl `https://zprintpro.com/en/` → grep `Free US Shipping\|Free design mockup\|No setup fees` 各 ≥1
2. curl `https://zprintpro.com/en/category/stickers/` → H1 含 "Free Shipping\|Free Design\|No Minimum" 之一
3. 14/14 en 类目页 description 含 "Free Shipping\|Free Design" 之一
4. Hero slide 6/6 至少含 1 sharp hook
5. zh-hk/ja 首页不应出现 "美國 \$99+" / "米国 \$99+" 等污染（§13.10）

## 13.16 Pre-commit 校验清单 v2（2026-07-09 强化版）

> 在 §13.11 v1 基础上加 3 项 en 美国集中 + 15 年口径检查。

**每次 commit 前 8 问**：
1. `node scripts/check-encoding.js` — 编码检查（UTF-16/CRLF）✅？
2. `npm run build` — 本地编译通过（Compiled successfully + 无 TS error）✅？
3. 新增 blog slug 是否已加入 `articleSlugs` 数组？✅？
4. zh-hk 标题/excerpt 是否写了 target market（香港）而非 factory location（深圳）？✅？
5. en/ja 标题/excerpt 是否避免了机械翻译污染（"in Hong Kong""米国"等硬塞词）？✅？
6. **en 改动是否触动了 5 大 sharp hook 之一**（Free Shipping / Free Design / No Minimum / Fast Turnaround / Made for USA）？✅？
7. **未引入 "9 年 / 2017 / 2014 / 2009 / 10+ year" 残留**（必须用 15+ / 2012）✅？
8. **zh-hk/ja 首页未被 en 美国化污染**（grep "美國 \$99\|米国 \$99" = 0）✅？

**8 问全过才 push。任一项不过立即修，不推。**

## 13.16.1 zh-hk 繁体字最高原则（2026-07-14 user 拍板）

### 最高原则
**zh-hk 输出 = 100% 繁体中文，零简体字泄漏。**

### 铁律
- ❌ **禁止**: 简体字出现在任何 zh-hk 输出（title_zh / H1 / Meta / Product page / Hero / Breadcrumb）
- ✅ **必须**: 所有 zh-hk 输出必须经过 `traditionalizeZh()` 转换
- ✅ **必须**: 所有源文件必须无简体字残留（`node scripts/scan-simplified.mjs` 通过）

### 验收标准
1. `node scripts/scan-simplified.mjs` — 退出码 0（无简体字残留）
2. `node scripts/test-traditionalize.mjs` — 10/10 测试通过
3. `curl https://zprintpro.com/zh-hk/` — grep 简体字 = 0
4. 所有产品页 H1 = 繁体（live verify）

### 违规后果
- 简体字泄漏 = 严重 SEO 降权（Google 判定为低质量内容）
- 简体字泄漏 = 用户信任度下降（香港用户视"简体"为内地概念）
- 简体字泄漏 = AGENTS.md 最高原则违约（P0 级修复）

### 自动化防御
- `scripts/scan-simplified.mjs` — 每次运行，报简体字位置
- `src/lib/h1-builder.ts` — 强制调用 `traditionalizeZh()` 转换
- `src/data/products.ts` — 所有 title_zh 必须繁体

### 修复流程
1. `node scripts/scan-simplified.mjs` 定位问题
2. 修复源文件（products.ts / h1-builder.ts / category-config.ts）
3. `node scripts/test-traditionalize.mjs` 验证
4. `npm run build` 本地通过
5. Commit + Push + Verify deploy
6. Live curl 验证繁体输出

## 13.17 PM × UX × SEO 3-perspective 复盘模板（任何 en 美国优化前必跑）

> 2026-07-09 en 美国优化 v5/v6 用过的复盘模板，已写入 `docs/competitor-analysis/en-us-market-optimization-pm-ux-seo-2026-07-09.md`。

### 模板（每次 en 美国类目/产品/Hero 改动前 30 分钟跑）

```markdown
## 一、美国市场头部竞品 sharp hook 调研（≥5 个头部）
| Sharp hook | 代表竞品 | 覆盖率 |
|---|---|---|
| Free Shipping | Sticker Mule / CustomStickers.com / Packlane / VividPrintingHub | ___% |
| Free Design / Free Mockup | Packlane / VividPrintingHub / CustomStickers.com | ___% |
| Made in USA / America | RogueStickers / EverPrint / USCustomStickers | ___% |
| No Minimum / Low MOQ | CustomStickers.com / Packlane | ___% |
| Fast Turnaround | samedaycalendars.com / FlyersASAP | ___% |

## 二、我们 en 站点 4 大缺口诊断
| Sharp hook | 美国头部 | 我们 en 现状 | 问题 |
|---|---|---|---|

## 三、本轮改动
| # | 文件 | 改动 | 影响 |

## 四、verify 结果
| 检查 | 结果 |
|---|---|

## 五、踩坑避免
- ✅ §13.10 NAP 脱钩
- ✅ §11 名片禁区
- ✅ §13.14 15+ 年口径

## 六、保留的差异化优势
- ✅ 30-second AI quote (全行业唯一)
- ✅ ISO 9001 / FSC 认证
```

**应用范围**：每次 en 美国类目/产品/Hero/H1/description 改动前必跑 30 分钟模板 → commit message 引用模板结论。

<!-- autoclaw:feishu-lark-skill-guidance -->
## Feishu / Lark Requests

When the user asks about Feishu/Lark/飞书 matters, route through Feishu/Lark skills first. This includes messaging, contacts, calendars, approvals, tasks, docs, sheets, Base, Drive, Wiki, mail, meetings, minutes, attendance, OKRs, or any other Feishu/Lark workspace operation.

1. If a relevant Feishu/Lark skill is already available, use that skill directly.
2. If no relevant skill is available, search the skill catalog/store or available skill list for a matching Feishu/Lark skill.
3. If you find a matching skill that is not installed or enabled, ask the user whether to install/enable and use it before proceeding.
4. If no matching skill exists, say so briefly and continue with the safest available fallback.
<!-- /autoclaw:feishu-lark-skill-guidance -->