# Google Search Console 接入指南

> **目标**：3 个 GSC property 验证 + 提交 sitemap
> **预期时间**：5-10 分钟
> **数据获得时间**：W1 末（24-48h）

---

## Step 1: 验证主域 zprintpro.com

### 方法 A：DNS TXT 记录（**推荐**）

1. 打开 https://search.google.com/search-console
2. 点击 "Add property" → 选择 "URL Prefix" 模式
3. 输入 `https://zprintpro.com`
4. 选择 "HTML tag" 或 "DNS TXT record" 验证
5. **DNS TXT 方式**（推荐）—— 在 Cloudflare DNS 添加：
   ```
   Type: TXT
   Name: @
   Content: google-site-verification=xxxxx（Search Console 提供的 token）
   TTL: Auto
   ```
6. 回到 GSC 点击 "Verify"

### 方法 B：HTML 文件上传

1. 下载 GSC 提供的 `googleXXXXX.html` 验证文件
2. 放到 `F:\zprintpro-nextjs\public\googleXXXXX.html`
3. 部署（push 到 main）
4. GSC 验证

---

## Step 2: 验证子目录

**GSC 不直接支持子目录 property**，但支持 URL Prefix 包含子目录路径：

| Property | URL Prefix |
|---|---|
| 主域 | `https://zprintpro.com/` |
| zh-hk | `https://zprintpro.com/zh-hk/` |
| en | `https://zprintpro.com/en/` |
| ja | `https://zprintpro.com/ja/` |

**操作**：重复 Step 1，每次输入对应 URL prefix。

**注意**：4 个 property 都需要独立验证（DNS TXT 在主域，子目录自动继承）。

---

## Step 3: 提交 sitemap

每个 property 验证后：
1. 进入 "Sitemaps" 菜单
2. 添加 sitemap：
   - 主域：`https://zprintpro.com/sitemap.xml`
   - zh-hk / en / ja：同主域（GSC 自动按子目录筛选）
3. 添加 image sitemap：`https://zprintpro.com/sitemap-image.xml`

**已生成**（从之前的 build log 确认）：
- `public/sitemap.xml` — 417 URLs（13 分类 × 79 产品 × 31 博客 + 16 静态 × 3 语言）
- `public/sitemap-image.xml` — 1017 张图

---

## Step 4: 设置区域定位（重要）

对 **zh-hk property**：
- Settings → International Targeting → Target: **Hong Kong**

对 **en property**：
- 建议**不设置国家**（en-US/en-GB/en-AU 共用）

对 **ja property**：
- Settings → International Targeting → Target: **Japan**

---

## Step 5: W1 末看真实数据

部署后 24-48h，GSC 开始显示数据。重点看：
- **Search Performance** → Queries / Pages / Countries / Devices
- **Coverage** → 哪些 URL 已被索引
- **Sitemaps** → 已提交 / 已索引数量

**基线快照**（W1 末保存作为对比基准）：
- 每语 5 关键词排名
- 每语 Top 10 页面流量
- 索引率

---

## 关键文件

| 文件 | 用途 | 路径 |
|---|---|---|
| 主 sitemap | 417 URLs | `public/sitemap.xml` |
| Image sitemap | 1017 张图 | `public/sitemap-image.xml` |
| robots.txt | 搜索引擎爬虫规则 | `public/robots.txt` |
| 验证文件（如用方法 B）| GSC 验证 | `public/googleXXXXX.html` |

---

## 常见问题

**Q：为什么 4 个 property 都要验证？**
A：hreflang 5 区域（zh-HK / en-US / en-GB / en-AU / ja / x-default=en）需要 GSC 独立数据才能精准优化。

**Q：sitemap 多久更新一次？**
A：每次 `npm run build` 自动重新生成。CF Pages 部署触发。

**Q：W1 没数据怎么办？**
A：正常。GSC 抓取+索引有 24-72h 延迟。W2 末会有初步数据。

**Q：需要 GSC API 自动化吗？**
A：暂不需要（OPC 1 人手动查够用）。规模化后可加。
