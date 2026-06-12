# P0-3: Google Search Console 4 Property 接入（超详细版）

> **目的**：让 Google Search Console 开始采集 zprintpro.com 的搜索数据
> **预计时间**：15-20 分钟
> **难度**：★★★☆☆（要复制 meta 标签、改代码、push 部署）
> **前置**：有 Google 账号、能 push 代码到 GitHub

---

## 阶段 A：登录 GSC（1 分钟）

### A.1 打开 GSC 欢迎页

1. 浏览器打开 `https://search.google.com/search-console/welcome`
2. 用 Google 账号登录（任何 Gmail 即可）

### A.2 进入 GSC 主页

**预期看到**：搜索控制台主页，右上角有你的头像
- 第一次进入：会显示 "Add your first property" 引导
- 已经有其他 property：会显示 property 列表

---

## 阶段 B：添加主域 zprintpro.com（3 分钟）

### B.1 点击添加 property

如果你是新用户：
1. 看到 "**Add property**" 大按钮
2. 点击

如果已经有其他 property：
1. 搜索栏左侧的 "**+ Add property**" 按钮（顶部）
2. 点击

### B.2 选择验证方式

**重要：选 URL Prefix，不是 Domain**

| 选项 | 选哪个 |
|---|---|
| **Domain** (DNS 验证) | ❌ 不选 |
| **URL Prefix** (HTML 标签验证) | ✅ **选这个** |

点击 "**URL Prefix**" 卡片

### B.3 输入主域 URL

1. 在输入框里输入：`https://zprintpro.com/`
   - 注意末尾有 `/`
   - `https://` 必须有
2. 点击 "**Continue**" 按钮

### B.4 选 HTML tag 验证

页面会显示多种验证方式，选 "**HTML tag**" 标签

**预期看到**：一段 `<meta>` 标签代码，类似：
```html
<meta name="google-site-verification" content="aBc123XyZ" />
```

**操作**：
1. 找到这段代码
2. 点击代码右侧的 "**Copy**" 按钮（或者手动复制）
3. 保存这段代码到记事本（备用）

**示例**（你的会不一样）：
```
google-site-verification 内容: aBc123XyZ
```

⚠️ **先不要关闭这个页面** —— 后面还要回来点 "Verify"

---

## 阶段 C：把 meta 标签加到代码（5 分钟）

### C.1 打开 layout.tsx

1. 打开 VS Code（或任何编辑器）
2. 文件 → 打开
3. 路径：`F:\zprintpro-nextjs\src\app\[locale]\layout.tsx`
4. 打开

### C.2 找到 `<head>` 标签

在文件中找 `<head>`（按 Ctrl+F 搜 "head"）

**预期看到**：
```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  ...
</head>
```

### C.3 添加 meta 标签

在 `<head>` 内**任意位置**添加一行（**注意保留前面的 `>`**）：

```tsx
<meta name="google-site-verification" content="aBc123XyZ" />
```

⚠️ **把 `aBc123XyZ` 替换成你刚才复制的真实 content 值！**

**完整示例**：
```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <meta name="google-site-verification" content="aBc123XyZ" />  ← 新增
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  ...
</head>
```

### C.4 保存

按 Ctrl+S 保存

### C.5 提交到 GitHub

打开 PowerShell（或 Git Bash），运行：

```bash
cd F:\zprintpro-nextjs
git add src/app/\[locale\]/layout.tsx
git commit -m "feat(seo): add GSC verification meta tag (main domain)"
git push origin main
```

⚠️ **如果 push 失败用 SSH**：
```bash
git push origin_ssh main
```

**预期看到**：
- 1 file changed, 1 insertion(+)
- `b2bf21b..xxxxxxx main -> main`

### C.6 等部署

CF Pages 会自动重新部署（约 1-2 分钟）

---

## 阶段 D：完成主域验证（1 分钟）

### D.1 回到 GSC

回到之前没关掉的 GSC 验证页面

### D.2 点击 Verify

1. 找到 "**Verify**" 按钮
2. 点击

**预期看到**：
- ✅ "**Ownership verified**" 绿色对勾
- 或者 "**Verification successful**"

**可能失败的情况**：
- "**Verification failed**" → meta 标签没生效
  - 检查：访问 `https://zprintpro.com/`
  - 右键 → View Source
  - 搜 `google-site-verification`
  - 看到了吗？没看到 → push 没成功或部署没完成

### D.3 进入 property

验证成功后：
1. 自动跳转到 zprintpro.com 的 Search Console 页面
2. 顶部菜单有：Performance / URL Inspection / Coverage / Sitemaps / etc.

---

## 阶段 E：添加 3 个子目录 property（9 分钟）

⚠️ **每个 property 都需要独立验证**，主域的 meta 标签不共享给子目录

### E.1 添加 zh-hk

1. 顶部 → 搜索栏左侧 → "**+ Add property**"（或 "**Add another property**"）
2. 选 "**URL Prefix**"
3. 输入：`https://zprintpro.com/zh-hk/`
4. Continue → 选 "**HTML tag**"
5. **复制新的 meta 标签**（内容跟主域的**不一样**！是新的字符串）
6. 回到 VS Code
7. 打开 `F:\zprintpro-nextjs\src\app\[locale]\layout.tsx`
8. 找到刚刚加的 meta 标签（`google-site-verification`）
9. 在它**正下方**加新的一行：
   ```tsx
   <meta name="google-site-verification-zh-hk" content="新的content" />
   ```
   ⚠️ **注意**：name 用 `google-site-verification-zh-hk`（带后缀），避免与主域重复
10. 保存
11. PowerShell:
    ```bash
    cd F:\zprintpro-nextjs
    git add src/app/\[locale\]/layout.tsx
    git commit -m "feat(seo): add GSC verification meta tag (zh-hk)"
    git push origin_ssh main
    ```
12. 等 1-2 分钟部署
13. 回到 GSC → Verify

### E.2 添加 en

重复 E.1，但：
- URL：`https://zprintpro.com/en/`
- meta name：`google-site-verification-en`
- commit message：`feat(seo): add GSC verification meta tag (en)`

### E.3 添加 ja

重复 E.1，但：
- URL：`https://zprintpro.com/ja/`
- meta name：`google-site-verification-ja`
- commit message：`feat(seo): add GSC verification meta tag (ja)`

### E.4 验证全部

回到 GSC，应该看到 4 个 property：
- `https://zprintpro.com/`
- `https://zprintpro.com/zh-hk/`
- `https://zprintpro.com/en/`
- `https://zprintpro.com/ja/`

每个都是 "**Verified**" 状态

---

## 阶段 F：提交 sitemap（2 分钟）

### F.1 选主域 property

1. GSC 顶部 property 切换器 → 选 `https://zprintpro.com/`
2. 左侧菜单 → "**Sitemaps**"

### F.2 添加 sitemap

在 "**Add a new sitemap**" 输入框：

1. 输入 `sitemap.xml`，点 "**Submit**"
2. 输入 `sitemap-image.xml`，点 "**Submit**"

**预期状态**：
- "Success" 绿色对勾
- "Discovered URLs" 数量会逐渐增加

### F.3 重复 3 个子目录

对 `/zh-hk/`、`/en/`、`/ja/` 3 个 property **也提交** 同样的 sitemap：
- `sitemap.xml`
- `sitemap-image.xml`

GSC 会自动按子目录筛选 URL。

---

## 阶段 G：设置区域定位（2 分钟）

### G.1 zh-hk → Hong Kong

1. GSC 顶部 → 选 `https://zprintpro.com/zh-hk/`
2. 左侧 → "**Settings**"（底部）
3. 找 "**International Targeting**" 区域
4. 找到 "**Target**" 下拉框
5. 选 "**Hong Kong**"
6. 点击 "**Save**"

### G.2 ja → Japan

1. 切换到 `https://zprintpro.com/ja/`
2. Settings → International Targeting
3. Target → **Japan**
4. Save

### G.3 en → 不设置

1. 切换到 `https://zprintpro.com/en/`
2. **跳过 International Targeting**
3. 原因：en-US / en-GB / en-AU 共用一个 en property，不设国家

---

## 阶段 H：W1 末看真实数据

### H.1 等待 24-48 小时

GSC 抓取 + 索引有延迟。**部署后 1-2 天**开始有数据。

### H.2 查看 Performance

1. 选任意 property
2. 左侧 → "**Performance**"
3. 看：
   - **Queries**（搜索词）
   - **Pages**（被搜索到的页面）
   - **Countries**（哪个国家搜的）
   - **Devices**（桌面/手机）

### H.3 4 property 数据对比

切换不同 property 看 3 语言的搜索表现：
- `/zh-hk/` 应该有香港的搜索
- `/en/` 应该有美/英/澳的搜索
- `/ja/` 应该有日本的搜索

### H.4 保存基线快照

W1 末，截图或记录 4 个 property 的：
- 每语 5 关键词排名
- 每语 Top 10 页面
- 索引率（已索引 URL 数 / 已提交 URL 数）

**这是 W2/W3 优化的基准**。

---

## 故障排查

### ❌ Verification failed

**可能原因**：
1. **meta 标签没生效**：
   - 访问 https://zprintpro.com/
   - View Source → Ctrl+F 搜 `google-site-verification`
   - 找不到？检查 push 和部署状态
2. **meta 标签 name 重复**：
   - 如果 4 个 property 都加同一个 `name="google-site-verification"`
   - 只有第一个会被 GSC 识别，其他报错
   - 解决：每个 property 用不同 name（带后缀如 `-zh-hk` / `-en` / `-ja`）
3. **部署没完成**：
   - Cloudflare Pages → Deployments → 最新是不是 Success
   - 没完成就等

### ❌ 子目录验证 404

**原因**：URL Prefix 输入错了
- ❌ `https://zprintpro.com/zh-hk`（没末尾 /）
- ✅ `https://zprintpro.com/zh-hk/`

### ❌ 部署后还没看到 meta 标签

1. **强制刷新浏览器** Ctrl+Shift+R
2. **CDN 缓存**——等 5-10 分钟
3. **检查 build**：看 `mavis agent info` 或本地跑 `npm run build` 看输出

### ❌ Sitemap 提交失败

**可能原因**：
1. **sitemap.xml 404**：访问 `https://zprintpro.com/sitemap.xml` 看看能不能打开
2. **格式错误**：sitemap 必须符合 sitemaps.org 协议
3. **太大**：单 sitemap < 50MB / < 50000 URL

### ❌ GSC 显示 0 数据

**正常**：刚部署 1-2 天
**W1 末再查**：会有初步数据
**W2 末**：会有完整数据

---

## 完成后

✅ **4 property 全部 Verified** = 成功  
✅ **4 property 都提交 sitemap.xml + sitemap-image.xml** = 成功  
✅ **zh-hk 和 ja 设置了区域定位** = 成功  
✅ **W1 末看到 Performance 数据** = 成功

告诉我 4 个 property 验证状态 + 区域定位是否设好。
