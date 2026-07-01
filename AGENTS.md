# ZprintPro（智印云）— AI 协作指南

> **项目**: F:\zprintpro-nextjs\ (Next.js 印刷 SaaS)
> **类型**: 8 locale 印刷电商 (zh-hk / en / ja)
> **部署**: Cloudflare Pages + Airwallex 支付
> **品牌**: 智印云 / ZprintPro (**不是** "智印港",后者是竞品必须排除)
>
> **真实主体 (2026-06-18 user-corrected)**: 深圳市彩龙印刷包装有限公司
> **法定代表人**: 唐运提
> **真实地址**: 広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）
> **真实電話**: +86 181 2638 0255
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

1. **品牌名 = 智印云 / ZprintPro**，绝不写"智印港"
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
- **品牌关键词**: 智印云 / ZprintPro,**过滤 "智印港"**
- **重要模块**: GSC 数据 / SEO 周报 / 多 locale i18n / Cloudflare 部署

## 8. 7 大"绝对不要做"清单

1. ❌ 不要用"智印港" / 任何竞品名
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