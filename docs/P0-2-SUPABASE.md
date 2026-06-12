# P0-2: Supabase WhatsApp 询盘落库（超详细版）

> **目的**：建 `whatsapp_inquiries` 表，让每次 WhatsApp 点击都能存到 Supabase
> **预计时间**：5 分钟
> **难度**：★★☆☆☆（打开 Supabase → 复制粘贴 SQL → 运行）
> **前置**：有 Supabase 项目（zprintpro 已经有）

---

## 阶段 A：打开 Supabase SQL Editor（1 分钟）

### A.1 登录 Supabase

1. 打开 `https://supabase.com/dashboard`
2. 用 zprintpro 项目的 Supabase 账号登录

### A.2 选择项目

如果有多个项目：
1. 看项目列表
2. 找到 zprintpro 对应的项目
3. 点击进入

**预期看到**：项目首页，左侧有菜单栏

### A.3 打开 SQL Editor

1. 左侧菜单栏，找 "**SQL Editor**" 图标（一个数据库图标或写着 "SQL"）
2. 点击进入

**预期看到**：一个 SQL 编辑器界面，中间是大块白色代码区域

---

## 阶段 B：创建新查询 + 粘贴 SQL（2 分钟）

### B.1 新建查询

1. SQL Editor 页面右上角，找到 "**+ New query**" 按钮（绿色或蓝色）
2. 点击

**预期看到**：一个空白的代码编辑区域，标题默认是 "Untitled query"

### B.2 复制 SQL 内容

#### 方法 A：用文件管理器复制

1. 打开文件资源管理器
2. 进入 `F:\zprintpro-nextjs\supabase\migrations\`
3. 右键点击 `002_create_whatsapp_inquiries.sql` 文件
4. 选择 "**打开方式**" → "**记事本**"（或 VS Code）
5. 在文件里按 **Ctrl+A** 全选
6. 按 **Ctrl+C** 复制

#### 方法 B：让我列出来（如果上面打不开）

直接在 Supabase SQL Editor 粘贴下面这段 SQL（约 100 行）：

```sql
-- ==============================================
-- 002: WhatsApp 询盘追踪表
-- ==============================================
-- 用途：记录每次 WhatsApp 链接点击，转化漏斗分析
-- 创建时间：2026-06-07
-- 配套代码：src/lib/whatsapp-inquiry.ts + src/lib/whatsapp.ts onClick

CREATE TABLE IF NOT EXISTS whatsapp_inquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 上下文信息（从 WhatsAppContext）
  locale VARCHAR(10) NOT NULL,
  source VARCHAR(100),
  phone VARCHAR(50),

  -- 产品信息（如果有）
  product_slug VARCHAR(100),
  product_name VARCHAR(255),
  size VARCHAR(100),
  material VARCHAR(100),
  quantity VARCHAR(50),

  -- 上下文标志
  has_context BOOLEAN DEFAULT FALSE,

  -- 用户/页面信息
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  ip_address INET,

  -- 后续追踪
  contacted_at TIMESTAMP WITH TIME ZONE,
  converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMP WITH TIME ZONE,
  order_id UUID REFERENCES orders(id),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_created_at ON whatsapp_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_source ON whatsapp_inquiries(source);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_locale ON whatsapp_inquiries(locale);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_converted ON whatsapp_inquiries(converted);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_phone ON whatsapp_inquiries(phone);

COMMENT ON TABLE whatsapp_inquiries IS 'WhatsApp 询盘追踪表 - 每次链接点击都记录';

ALTER TABLE whatsapp_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON whatsapp_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON whatsapp_inquiries
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON whatsapp_inquiries
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE VIEW whatsapp_inquiry_funnel AS
SELECT
  locale,
  source,
  phone,
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_clicks,
  COUNT(*) FILTER (WHERE has_context) AS contextual_clicks,
  COUNT(*) FILTER (WHERE converted) AS conversions,
  ROUND(100.0 * COUNT(*) FILTER (WHERE converted) / NULLIF(COUNT(*), 0), 2) AS conversion_rate
FROM whatsapp_inquiries
GROUP BY locale, source, phone, DATE_TRUNC('day', created_at)
ORDER BY day DESC, total_clicks DESC;

COMMENT ON VIEW whatsapp_inquiry_funnel IS 'WhatsApp 询盘转化漏斗 - 按 locale/source/phone/day 聚合';

CREATE OR REPLACE VIEW whatsapp_inquiry_by_locale AS
SELECT
  locale,
  COUNT(*) AS total_clicks,
  COUNT(DISTINCT source) AS source_count,
  COUNT(DISTINCT DATE_TRUNC('day', created_at)) AS active_days,
  ROUND(100.0 * COUNT(*) FILTER (WHERE has_context) / NULLIF(COUNT(*), 0), 2) AS context_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE converted) / NULLIF(COUNT(*), 0), 2) AS conversion_rate
FROM whatsapp_inquiries
GROUP BY locale
ORDER BY total_clicks DESC;

COMMENT ON VIEW whatsapp_inquiry_by_locale IS '3 语言 WhatsApp 询盘表现对比';
```

### B.3 粘贴到 SQL Editor

1. 回到 Supabase SQL Editor 页面
2. 点击代码编辑区域（白色大块）
3. 按 **Ctrl+V** 粘贴

**预期看到**：代码完整粘贴，左侧有行号（1, 2, 3...）

---

## 阶段 C：执行 SQL（1 分钟）

### C.1 点击运行按钮

1. 在代码区域**下方或右上角**找 "**Run**" 按钮（通常是绿色或蓝色，文字 "Run" 或 ▶ 三角图标）
2. 点击

### C.2 等待执行结果

**预期看到**（成功的标志）：
- 底部出现 "**Success. No rows returned**" 消息
- 绿色对勾
- 没红色错误

### C.3 常见错误

#### 错误 1：syntax error
```
ERROR: syntax error at or near "..."
```
**原因**：复制时少复制了一段
**解决**：回到 B.2 重新复制完整 SQL

#### 错误 2：relation "orders" does not exist
```
ERROR: relation "orders" does not exist
```
**原因**：migration 002 引用了 `orders` 表（外键），但 001 migration 没跑过
**解决**：先跑 `001_create_quotes_table.sql`，再跑 002

#### 错误 3：policy already exists
```
ERROR: policy "..." already exists
```
**原因**：之前跑过这个 SQL
**解决**：忽略，已存在

---

## 阶段 D：验证表已创建（1 分钟）

### D.1 打开 Table Editor

1. 左侧菜单 → "**Table Editor**"（一个表格图标）
2. 点击

### D.2 找到新表

在表列表中找：
- `whatsapp_inquiries` ← **新建的表**

**预期看到**：`whatsapp_inquiries` 在列表中

### D.3 查看表结构

1. 点击 `whatsapp_inquiries` 表名
2. 右侧会出现表的 schema（字段列表）

**预期字段**（从上到下）：
- `id` (bigint)
- `created_at` (timestamptz)
- `locale` (varchar)
- `source` (varchar)
- `phone` (varchar)
- `product_slug` (varchar)
- `product_name` (varchar)
- `size` (varchar)
- `material` (varchar)
- `quantity` (varchar)
- `has_context` (bool)
- `user_agent` (text)
- `referrer` (text)
- `page_url` (text)
- `ip_address` (inet)
- `contacted_at` (timestamptz)
- `converted` (bool)
- `converted_at` (timestamptz)
- `order_id` (uuid)
- `notes` (text)

如果看到这些字段 = 表创建成功 ✅

### D.4 验证视图

1. 左侧菜单 → "**Database**"
2. 点击
3. 找 "**Views**" 区域
4. 应该看到 2 个视图：
   - `whatsapp_inquiry_funnel`
   - `whatsapp_inquiry_by_locale`

---

## 阶段 E：测试 RLS 策略（1 分钟）

### E.1 新建测试 query

1. 回到 "**SQL Editor**"
2. 点击 "**+ New query**"

### E.2 粘贴测试 SQL

```sql
-- 模拟 anon 角色插入测试
SET ROLE anon;
INSERT INTO whatsapp_inquiries (locale, source, has_context)
VALUES ('zh-hk', 'test', false);
RESET ROLE;

-- 查看是否插入成功
SELECT * FROM whatsapp_inquiries WHERE source = 'test';
```

### E.3 运行

1. 点击 "**Run**"

**预期看到**：
- 第一行：`SET ROLE` 成功
- 第二行：`INSERT 0 1`（插入 1 行成功）
- 第三行：返回 1 行数据（你刚插入的测试数据）

### E.4 删除测试数据

1. 新建 query
2. 运行：
```sql
DELETE FROM whatsapp_inquiries WHERE source = 'test';
```

**预期看到**：`DELETE 1`（删除 1 行）

---

## 阶段 F：生产验证（CF Pages 部署后）

### F.1 确认 .env.local 配好

回到 P0-1 文档，确保 `.env.local` 已经有：
- `NEXT_PUBLIC_SUPABASE_URL`（不是占位符）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`（不是占位符）

### F.2 确认 Cloudflare Pages 环境变量

Cloudflare Pages Settings → Environment variables 也要有这 2 个变量（不只是本地 .env.local）

### F.3 等部署完成

CF Pages 会自动重新部署（环境变量变更触发）

### F.4 测试询盘落库

1. 打开 https://zprintpro.com
2. 页面右上角或底部找到 WhatsApp 链接
3. 点击
4. 浏览器会打开 WhatsApp（wa.me 链接）
5. 回到 Supabase Table Editor → whatsapp_inquiries
6. **应该看到 1 行新数据**（如果看不到，等 10 秒刷新）

**新行的字段值预期**：
- `locale`: `zh-hk`（根据你点击的页面）
- `source`: `footer` / `hot-products` / `header` 等
- `has_context`: `false`（如果没有产品上下文）
- `user_agent`: 你浏览器的 UA
- `page_url`: 你点击时的页面 URL
- `created_at`: 当前时间

如果看到新行 = WhatsApp 询盘落库成功 ✅

---

## 故障排查

### ❌ 创建表失败：syntax error

**原因**：复制时少了一段 / 多了一段
**解决**：
- 重新打开 `F:\zprintpro-nextjs\supabase\migrations\002_create_whatsapp_inquiries.sql`
- 全选 (Ctrl+A) + 复制 (Ctrl+C)
- 粘贴到 Supabase SQL Editor
- Run

### ❌ relation "orders" does not exist

**原因**：001 migration 没跑过
**解决**：
- 找 `F:\zprintpro-nextjs\supabase\migrations\001_create_quotes_table.sql`
- 先跑 001，再跑 002

### ❌ 跑了 SQL 但生产没数据

**按顺序检查**：

1. **Cloudflare Pages 环境变量有 Supabase URL + Key？**
   - 进 Cloudflare → Pages → zprintpro → Settings → Environment variables
   - 确认 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 都有

2. **`.env.local` 配了 Supabase？**
   - 打开 `.env.local`，看那 2 行
   - 值不是占位符（不是 `your-project.supabase.co` 或 `eyJhbGc...your-key-here`）

3. **部署完成？**
   - Cloudflare Pages → Deployments → 最新状态 = Success

4. **浏览器 Console 报错？**
   - F12 → Console 标签
   - 看有没有 CORS / 401 / 404 错误

5. **等 10 秒再刷新**
   - Supabase 有几百毫秒延迟

### ❌ 报错：permission denied for table whatsapp_inquiries

**原因**：RLS 策略配置问题
**解决**：
- 跑 SQL Editor 修复：
```sql
DROP POLICY IF EXISTS "Allow anonymous insert" ON whatsapp_inquiries;
CREATE POLICY "Allow anonymous insert" ON whatsapp_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);
```

---

## 完成后

✅ **Table Editor 看到 `whatsapp_inquiries` 表** = 成功  
✅ **测试 SQL 跑通（SET ROLE / INSERT / SELECT）** = 成功  
✅ **点击 WhatsApp 后 Supabase 看到新行** = 成功

告诉我结果。
