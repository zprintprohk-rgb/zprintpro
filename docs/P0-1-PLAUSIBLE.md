# P0-1: Plausible 接入（超详细版）

> **目的**：让 zprintpro.com 接入 Plausible 埋点，采集真实用户行为
> **预计时间**：5-10 分钟
> **难度**：★★☆☆☆（需要登录 2 个网站 + 复制粘贴）
> **前置**：能打开浏览器、能复制粘贴

---

## 阶段 A：注册 Plausible（3 分钟）

### A.1 打开 Plausible 注册页

1. 打开浏览器
2. 地址栏输入：`https://plausible.io/register`
3. 按回车

**预期看到**：一个注册页面，中间有 "Sign up" 或 "Get started" 按钮

### A.2 填写注册信息

页面上的字段（从上到下）：

| 字段名 | 填什么 |
|---|---|
| Email | 你的邮箱（如 zprintpro@outlook.com）|
| Password | 设置一个密码（8 位以上）|
| Confirm password | 再输入一次 |

填完后点击页面下方的 **"Create account"** 按钮

### A.3 验证邮箱

1. 打开你的邮箱
2. 找到 Plausible 发来的邮件（标题类似 "Confirm your Plausible account"）
3. 点击邮件里的 **"Confirm your email"** 链接
4. 会跳回 Plausible 登录页

---

## 阶段 B：添加域名 zprintpro.com（2 分钟）

### B.1 登录 Plausible

1. 打开 `https://plausible.io/login`
2. 输入邮箱 + 密码
3. 点击 **"Log in"**

### B.2 添加新站点

登录后会自动进入引导流程：
1. 看到 "**+ Add your first site**" 按钮（大蓝色）
2. 点击它

如果已经登录过 dashboard：
1. 右上角找到 **"+ Add site"** 链接
2. 点击

### B.3 填写域名

页面会显示一个表单：

| 字段 | 填什么 | 注意 |
|---|---|---|
| Domain | `zprintpro.com` | **只填主域，不加 `https://` 或 `www.`** |
| Time zone | 选择 `Asia/Hong_Kong` | 在下拉框里找 |
| Enable sessions | 留空（默认）| 不需要勾 |

填完点击 **"Start collecting data"** 按钮

### B.4 跳过引导（重要！）

可能会弹出一些提示，问你用哪种方式集成网站，**全部跳过**：
- 如果有 "**Use our script**" 选项 → 不选
- 如果有 "**Use a tag manager**" → 不选
- 如果有 "**Use our WordPress plugin**" → 不选

**原因**：zprintpro 已经用环境变量自动注入 Plausible script，不需要你手动加代码。

**直接找页面右上角的 "**X**" 关闭按钮** 或者 "**Skip**" 链接关闭引导。

### B.5 记录你的 Site Domain

1. 进入 Plausible Dashboard
2. 左侧菜单 → "**Site settings**"
3. 找到 "**Site domain**" 字段
4. **确认它显示 `zprintpro.com`**
5. 记住这个值（不需要复制）

---

## 阶段 C：配置 .env.local（2 分钟）

### C.1 创建 .env.local 文件

⚠️ **如果文件已存在，跳到 C.2**

1. 打开文件资源管理器
2. 进入 `F:\zprintpro-nextjs\` 目录
3. 右键 → "**新建**" → "**文本文档**"
4. 命名为 `.env.local`（注意前面有个点）
5. 如果 Windows 提示"必须输入文件名"，选"是"

⚠️ **如果看不到新建的文件**：文件资源管理器 → 菜单 "**查看**" → 勾选 "**文件扩展名**" 和 "**隐藏的项目**"

### C.2 编辑 .env.local

1. 右键点击 `.env.local` 文件
2. 选择 "**用记事本打开**" 或 "**用 VS Code 打开**"
3. 复制下面整段内容，粘贴到文件：

```env
# Supabase 数据库（如果已经有，保留）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-key-here

# Plausible 埋点（必须填）
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=zprintpro.com

# Google Analytics 4（可选，先留空）
NEXT_PUBLIC_GA_ID=

# 网站配置
NEXT_PUBLIC_SITE_URL=https://zprintpro.com
```

4. 把 `your-project.supabase.co` 和 `your-key-here` 替换成真实的 Supabase 值
   - 打开 Supabase Dashboard → Project Settings → API
   - 复制 "**Project URL**" → 替换 `NEXT_PUBLIC_SUPABASE_URL`
   - 复制 "**anon public**" key → 替换 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. 保存文件（Ctrl+S）

---

## 阶段 D：配置 Cloudflare Pages 环境变量（2 分钟）⚠️ 关键

**如果只配 `.env.local` 不配这里，生产环境 Plausible 不会生效！**

### D.1 打开 Cloudflare Dashboard

1. 打开 `https://dash.cloudflare.com`
2. 登录（用 zprintpro 的 Cloudflare 账号）

### D.2 进入 Pages 项目

1. 左侧菜单 → "**Workers & Pages**"
2. 在列表中找到 `zprintpro` 项目
3. 点击进入

### D.3 打开环境变量设置

1. 进入项目后，顶部有 4 个标签："Deployments" / "Functions" / "Settings" / "Logs"
2. 点击 "**Settings**" 标签
3. 左侧子菜单 → "**Environment variables**"
4. 点击 "**Add variable**" 按钮（右上角或中间）

### D.4 添加 3 个变量

**变量 1：Plausible**

| 字段 | 填什么 |
|---|---|
| Variable name | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Value | `zprintpro.com` |
| Environment | 勾选 "**Production**" |

点击 "**Save**"

**变量 2：Supabase URL**

| 字段 | 填什么 |
|---|---|
| Variable name | `NEXT_PUBLIC_SUPABASE_URL` |
| Value | 你的 Supabase Project URL（从 Supabase Dashboard 复制）|
| Environment | 勾选 "**Production**" |

点击 "**Save**"

**变量 3：Supabase Anon Key**

| 字段 | 填什么 |
|---|---|
| Variable name | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Value | 你的 Supabase anon public key |
| Environment | 勾选 "**Production**" |

点击 "**Save**"

### D.5 触发重新部署

添加环境变量后，Cloudflare 会**自动触发重新部署**。如果没有：
1. 进入 "**Deployments**" 标签
2. 找到最新一次部署（状态可能是 "Failed" 或 "Building"）
3. 等 2-3 分钟让它完成
4. 看到 "**Success**" 状态

---

## 阶段 E：验证 Plausible 生效（1 分钟）

### E.1 等待部署完成

看 Cloudflare Pages 部署状态 = "Success"（绿色）

### E.2 访问 zprintpro.com

1. 打开 `https://zprintpro.com`
2. 等待页面加载完成

### E.3 查看页面源代码

1. 在页面上**右键** → "**View Page Source**"（或按 Ctrl+U）
2. 会打开一个充满 HTML 的新标签页

### E.4 搜索 Plausible script

1. 在源代码页按 **Ctrl+F**
2. 输入 `plausible.io`
3. 按回车

**预期看到**：
```html
<script defer data-domain="zprintpro.com" src="https://plausible.io/js/script.js"></script>
```

### E.5 检查 Plausible Dashboard

1. 回到 Plausible Dashboard
2. 顶部应该显示 "**1 visitor in the last 5 min**" 或类似的实时访客统计
3. 如果看到 0 visitor，刷新几次 zprintpro.com 试试

---

## 故障排查

### ❌ 看不到 Plausible script

**按顺序检查**：

1. **`.env.local` 是否有 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`？**
   - 打开 `.env.local`，确认那行存在
   - 值是不是 `zprintpro.com`（不带 `https://` 或 `www.`）

2. **Cloudflare Pages 环境变量是否配置？**
   - 进 Cloudflare → Pages → zprintpro → Settings → Environment variables
   - 确认 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` 存在且值 = `zprintpro.com`

3. **部署是否成功？**
   - 进 Cloudflare → Pages → zprintpro → Deployments
   - 最新一次应该是 "Success"

4. **强制刷新浏览器**（Ctrl+Shift+R）—— CDN 可能有缓存

5. **重启本地 dev server**（如果你本地跑 `npm run dev`）

### ❌ Plausible Dashboard 显示 0 visitor

1. 访问 https://zprintpro.com 时是否真的加载了 Plausible script？
2. 打开浏览器 Console（F12）→ Console 标签 → 看有没有 Plausible 相关错误
3. Plausible 第一次安装需要 1-2 分钟才显示数据

### ❌ Supabase 配置错误

- 打开 Supabase Dashboard → Project Settings → API
- "Project URL" 应该是 `https://xxxxx.supabase.co` 格式
- "anon public" 是以 `eyJ` 开头的一长串字符

---

## 完成后

✅ **Plausible Dashboard 看到 1 个实时访客** = 成功  
✅ **页面源代码包含 plausible.io script** = 成功  
✅ **Cloudflare Pages 部署状态 = Success** = 成功

告诉我结果，我帮你看下一步。
