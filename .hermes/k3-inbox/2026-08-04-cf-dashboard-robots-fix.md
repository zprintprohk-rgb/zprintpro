# K3 浏览器操作清单: Cloudflare Dashboard 修 P0-1 robots.txt AI 爬虫

**触发**: 2026-08-04 14:30 K3 拍板 P0 修复
**M3 已做**: src/app/robots.ts (NEW) Application level 覆盖, commit 8f3948d push PASS
**仍需 K3 浏览器操作**: Cloudflare Dashboard → Security → Bots → 允许 AI crawlers
**原因**: Cloudflare edge Managed Content 段 Disallow 优先生效, 覆盖 M3 application level

## 操作步骤 (5 min)

### 步骤 1: 登录 Cloudflare Dashboard
- 域名: zprintpro.com
- 入口: https://dash.cloudflare.com/

### 步骤 2: Security → Bots
- 左侧菜单: Security → Bots
- 或: Security → Security Events → Bots

### 步骤 3: AI Bots / Crawlers 配置
找以下 9 个 AI 爬虫, 全部改为 **Allow**:

| AI Crawler | 当前状态 | 目标状态 |
|---|---|---|
| GPTBot (OpenAI) | Blocked (CF Managed) | **Allowed** |
| ChatGPT-User (OpenAI) | (可能未列) | Allowed |
| OAI-SearchBot | (可能未列) | Allowed |
| ClaudeBot (Anthropic) | Blocked (CF Managed) | **Allowed** |
| Claude-Web (Anthropic) | (可能未列) | Allowed |
| anthropic-ai | (可能未列) | Allowed |
| PerplexityBot | (可能未列) | Allowed |
| Perplexity-User | (可能未列) | Allowed |
| Google-Extended | Blocked (CF Managed) | **Allowed** |
| Applebot-Extended | Blocked (CF Managed) | Allowed |
| Bytespider (字节/豆包) | Blocked (CF Managed) | Allowed |
| CCBot (Common Crawl) | Blocked (CF Managed) | Allowed |

### 步骤 4: 保存 + 验证
- 保存配置
- 5 min 后验证: `curl -s https://zprintpro.com/robots.txt | grep -E "GPTBot|ClaudeBot"`
- 期望: 只看到 `Allow: /`, **无 `Disallow: /`**

## 替代方案 (如果 Dashboard 操作复杂)

### 备选 A: WAF Custom Rule
- Security → WAF → Custom Rules → Create rule
- 路径: `/robots.txt`
- Action: Skip (绕过 CF Managed)
- 但这会绕过所有 CF Managed, 不推荐

### 备选 B: Content Signal 调整
- 域名设置 → Content Signals
- 当前: `ai-train=no`
- 改为: `ai-train=yes` (允许 AI 训练)
- 但 Content Signal 跟 AI bots Disallow 是两个独立机制, 都需要改

## 预期效果

- Zprintpro 立即进入 9 AI 爬虫训练数据范围
- 7-14 天后 ChatGPT/Claude/Google AI 搜索开始引用
- 48-72h GSC 可能显示 "google-extended" user-agent 抓取
- 7 天后用 ChatGPT 搜索 "custom packaging boxes manufacturer" 验证

## 8/5 09:00 同步 P1 修复

- Hreflang (1h) + HSTS (5 min) 同批提交
- src/app/robots.ts 已写完整 (CF Dashboard 操作完就生效)
- M3 8/5 09:00-10:05 自动执行 P1 修复
