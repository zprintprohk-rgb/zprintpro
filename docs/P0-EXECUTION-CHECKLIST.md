# zprintpro SEO/GEO 4 个 P0 —— 详细执行清单

> **目标**：把"代码完成"推进到"生产可用 + 数据回流"
> **预计总时间**：30-45 分钟
> **用户**：手动执行 4 个动作
> **AI**：等待 + 验证

---

## 动作 1：Plausible 接入（用户做，5-10 分钟）

**目的**：让 Plausible script 真正注入到生产页面，采集真实用户行为数据。

### Step 1.1：注册 Plausible

1. 打开 https://plausible.io/register
2. 用邮箱注册（30 天免费试用，之后 $9/月，OPC 1 人公司可承担）
3. 邮箱验证

### Step 1.2：添加域名

1. 登录 Plausible Dashboard
2. 点击 "**+ Add your first site**"
3. 输入域名：`zprintpro.com`（**只填主域，不要加 https://**）
4. 时区选 **Asia/Hong_Kong**
5. 点击 "**Start collecting data**"

### Step 1.3：复制 Plausible 集成代码（备用）

Plausausible 不需要手动加 script——我会从环境变量自动注入。但**先获取你的 site ID**：

1. 左侧菜单 → "**Site settings**"
2. 找到 "**Site domain**" —— 应该是 `zprintpro.com`
3. 这个值就是你要填到 `.env.local` 的 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

### Step 1.4：本地 `.env.local` 配置

1. 在 `F:\zprintpro-nextjs\` 下创建文件 `.env.local`（如果不存在）
2. 完整内容（其他变量也准备好）：

```env
# Supabase（数据库）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Plausible（埋点）⭐ 新增
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=zprintpro.com

# Google Analytics 4（可选）
NEXT_PUBLIC_GA_ID=

# Stripe / Airwallex（可选）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# 网站配置
NEXT_PUBLIC_SITE_URL=https://zprintpro.com
```

3. ⚠️ **注意 Supabase URL/Key** —— 如果没填，WhatsApp 落库会失败（fallback 静默）

### Step 1.5：Cloudflare Pages 环境变量（重要！）

**只有 `.env.local` 不够**，生产环境是 Cloudflare Pages，必须在 Cloudflare 配置：

1. 打开 https://dash.cloudflare.com → 选择账号 → "**Workers & Pages**" → 点击 `zprintpro`
2. 左侧 → "**Settings**" → "**Environment variables**"
3. 点击 "**Add variable**"，添加：

| Variable name | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `zprintpro.com` | Production |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://zprintpro.com` | Production |

4. 点击 "**Save**"
5. **重要**：CF Pages 会自动触发重新部署

### Step 1.6：验证 Plausible 生效

1. 等待 2-3 分钟（部署 + 缓存）
2. 打开 https://zprintpro.com（生产域名）
3. **右键 → View Page Source**（或 Ctrl+U）
4. **Ctrl+F** 搜 `plausible.io`
5. 应该看到类似：
   ```html
   <script async defer data-domain="zprintpro.com" src="https://plausible.io/js/script.js"></script>
   ```
6. **没看到**？检查：
   - `.env.local` 是否有 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - Cloudflare Pages 环境变量是否配置
   - 强制刷新（Ctrl+Shift+R）绕过 CDN 缓存

7. 回到 Plausible Dashboard → 应该看到 1 个实时访客（你自己）

---

## 动作 2：Supabase Migration 002（用户做，5 分钟）

**目的**：创建 `whatsapp_inquiries` 表，让每次 WhatsApp 点击都能落库。

### Step 2.1：打开 Supabase SQL Editor

1. 打开 https://supabase.com/dashboard
2. 选择 zprintpro 项目
3. 左侧菜单 → "**SQL Editor**"
4. 点击 "**New query**"（新建查询）

### Step 2.2：执行 Migration

1. 打开文件 `F:\zprintpro-nextjs\supabase\migrations\002_create_whatsapp_inquiries.sql`
2. 复制**全部内容**（约 100 行）
3. 粘贴到 Supabase SQL Editor
4. 点击右下角 "**Run**" 按钮

**预期结果**：
- "Success. No rows returned"（建表 + 视图 + RLS 都没返回行，正常）
- 错误？检查 SQL 语法或权限

### Step 2.3：验证表已创建

1. 左侧菜单 → "**Table Editor**"
2. 应该看到新表 `whatsapp_inquiries`
3. 点击表，看 schema：
   - id, created_at, locale, source, phone, product_name, size, material, quantity, has_context, user_agent, referrer, page_url, ip_address, contacted_at, converted, converted_at, order_id, notes

### Step 2.4：验证视图已创建

1. 左侧菜单 → "**Database**" → "**Views**"
2. 应该看到：
   - `whatsapp_inquiry_funnel`
   - `whatsapp_inquiry_by_locale`

### Step 2.5：测试 RLS 策略

1. Supabase SQL Editor → 新建 query
2. 运行：
   ```sql
   -- 模拟 anon 角色插入
   SET ROLE anon;
   INSERT INTO whatsapp_inquiries (locale, source, has_context)
   VALUES ('zh-hk', 'test', false);
   RESET ROLE;
   ```
3. 应该看到 "Success. 1 row affected"（RLS 允许 anon insert）

### Step 2.6：生产验证

1. 等待 CF Pages 重新部署（环境变量变更后）
2. 打开 https://zprintpro.com
3. 点击任何 WhatsApp 链接
4. 回到 Supabase Table Editor → `whatsapp_inquiries` → 看是否新增 1 行
5. 应该看到 source = `footer` / `hot-products` / 等

**没看到**？检查：
- Cloudflare Pages 环境变量有 `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase URL 没写错（不要 `https://` 后面漏字符）
- 浏览器 Console 没有 CORS 错误

---

## 动作 3：GSC 4 Property 接入（用户做，10-15 分钟）

**目的**：让 Google Search Console 开始采集 zprintpro.com 的搜索数据，4 个 property 覆盖 3 语言。

**详细指南**：`docs/GSC-SETUP.md`（已写），下面是极简版：

### Step 3.1：注册/登录 GSC

1. 打开 https://search.google.com/search-console/welcome
2. 用 Google 账号登录（任何 Gmail）

### Step 3.2：添加主域 property

1. 点击 "**Add property**"
2. 选 "**URL Prefix**" 模式
3. 输入 `https://zprintpro.com/`
4. 推荐选 "**HTML tag**" 验证（**不是 DNS**）
5. 复制 GSC 提供的 `<meta>` 标签，类似：
   ```html
   <meta name="google-site-verification" content="abc123def456" />
   ```
6. 打开 `F:\zprintpro-nextjs\src\app\[locale]\layout.tsx`
7. 在 `<head>` 找到 `<meta name="viewport" ... />`，**下面添加**：
   ```tsx
   <meta name="google-site-verification" content="abc123def456" />
   ```
8. 保存 + 等待自动部署
9. 回到 GSC 点击 "**Verify**"

### Step 3.3：添加 3 个子目录 property

重复 Step 3.2，但每次换 URL prefix：
- `https://zprintpro.com/zh-hk/`
- `https://zprintpro.com/en/`
- `https://zprintpro.com/ja/`

每个都需要独立 HTML 标签验证（4 个不同的 tag）。

### Step 3.4：提交 sitemap（4 个 property 都做）

1. 进入每个 property
2. 左侧 → "**Sitemaps**"
3. 添加：
   - `sitemap.xml`
   - `sitemap-image.xml`
4. 状态会显示 "Processing" → 几小时后变 "Success"

### Step 3.5：区域定位

对 **zh-hk property**：
1. Settings → International Targeting
2. Target: **Hong Kong**

对 **en property**：
- 跳过（en-US/en-GB/en-AU 共用，不设国家）

对 **ja property**：
1. Settings → International Targeting
2. Target: **Japan**

### Step 3.6：W1 末看真实数据

部署后 24-48h，GSC 开始显示数据。重点看：
- **Performance** → Queries / Pages / Countries / Devices
- **Coverage** → 哪些 URL 已被索引
- **Sitemaps** → 已提交 / 已索引数量

**基线快照**（W1 末保存作为对比基准）：
- 每语 5 关键词排名
- 每语 Top 10 页面流量
- 索引率

---

## 动作 4：Blog 内容生成（用户做，30-60 分钟/篇）

**目的**：把 `blog-content-calendar.json` 的 12 篇 brief 变成实际可发布的博客。

### Step 4.1：选择 AI 工具

**推荐顺序**（质量 × 中文 × 成本）：
1. **Kimi 2.6**（国内访问快，中文最好）—— https://kimi.moonshot.cn
2. **Claude Sonnet 4.5**（长文质量最佳）—— https://claude.ai
3. **ChatGPT GPT-4o**（通用）—— https://chatgpt.com

### Step 4.2：准备 brief

1. 打开 `F:\zprintpro-nextjs\docs\blog-content-calendar.json`
2. 找到第一篇 post（如 Week 1 zh-hk）：
   ```json
   {
     "week": 1,
     "locale": "zh-hk",
     "topic": "香港 Same Day 印刷完全指南",
     "keyword": "香港 Same Day 印刷",
     "intent": "service",
     "meta_description": "...",
     "slug": "香港-same-day-印刷",
     "outline": [...],
     "faq": [...],
     "ai_prompt": "..."
   }
   ```
3. 复制 `ai_prompt` 字段的完整内容

### Step 4.3：AI 生成博客

1. 打开 Kimi / Claude / ChatGPT
2. 粘贴 ai_prompt
3. 点击发送 / Enter
4. 等待 30-60 秒
5. AI 输出 1500-2000 字 markdown 博客

### Step 4.4：保存博客

1. 创建文件夹 `F:\zprintpro-nextjs\src\content\blog\zh-hk\`（如果不存在）
2. 保存为 `{slug}.md`，例如 `香港-same-day-印刷.md`
3. 文件结构：
   ```markdown
   ---
   title: "香港 Same Day 印刷完全指南"
   meta_description: "..."
   keywords: ["香港 Same Day 印刷", ...]
   date: "2026-06-07"
   author: "智印云 ZPrintPro"
   ---

   # 香港 Same Day 印刷完全指南

   （AI 生成的正文...）
   ```

### Step 4.5：人工 review（关键！）

- ✅ 标题包含目标关键词
- ✅ H2 子标题包含关键词变体
- ✅ 内链 3-5 个 → zprintpro.com 分类/产品页
- ✅ 外链 2-3 个 → 权威来源（如 Google 官方、香港政府统计）
- ✅ Meta description 150-160 字
- ✅ 图片 alt 包含关键词
- ✅ FAQ 5 个 Q&A，结构化
- ✅ 数据来源标注（不要编造数据）
- ✅ 港式繁體中文（不是简體）

### Step 4.6：网站集成（如果还没有 blog 系统）

**重要**：zprintpro 当前有 blog 系统吗？检查 `src/app/[locale]/blog/[slug]/page.tsx` 是否有静态博客支持。

- 如果有 → 把 md 转换为该格式
- 如果没有 → 暂时保存为 markdown，下次 sprint 集成

### Step 4.7：发布

1. git add + commit + push
2. CF Pages 自动部署
3. 提交 GSC 重新索引（左侧 → URL Inspection → 输入新 URL → Request Indexing）

### Step 4.8：节奏

- **目标**：每周 ≥ 4 篇
- **现实**：第 1 周 2-3 篇热身，第 2 周起 4 篇稳定
- **总览**：12 brief 在 4 周内完成 → 每月 12 篇 = 每月 36 篇（3 语言）

---

## 总执行顺序（推荐）

1. **先做 #1 Plausible**（5-10 分钟，立即可看效果）
2. **再做 #2 Supabase migration**（5 分钟，建表）
3. **再做 #3 GSC**（10-15 分钟，4 property）
4. **最后 #4 Blog**（持续 4 周，30-60 分钟/篇）

**总时间**：30-45 分钟（不算 Blog） + Blog 4 周持续产出

---

## 执行后的反馈给我

完成任一动作后告诉我，我帮你验证：

| 动作 | 反馈什么 |
|---|---|
| Plausible | "Plausible Dashboard 看到访客 / 没看到" |
| Supabase | "whatsapp_inquiries 表已建 / 跑 SQL 出错" |
| GSC | "4 property 验证通过 / 失败原因" |
| Blog | "第 1 篇已生成 / Kimi 输出质量" |
| Build | "CF Pages 部署成功 / 失败" |

**我等的反馈**：
- Plausible 接入是否成功
- Supabase migration 跑通
- GSC 4 property 验证
- CF Pages 部署状态
