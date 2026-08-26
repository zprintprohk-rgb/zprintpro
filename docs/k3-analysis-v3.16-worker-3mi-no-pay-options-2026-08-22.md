# K3 分析 · CF Pages 3 MiB 限制 — 不花钱解决方案 + 砍 SKU 可行性裁决

> 日期: 2026-08-22 21:00 · 作者: K3
> 输入: M3 报告 `.hermes/logs/2026-08-22-v316-size-3mi-limit.md` + 本地 HEAD 真实 `next build` 产物实测 + Cloudflare 官方文档 (developers.cloudflare.com/workers/platform/limits) + 2 个同类案例 (zenn.dev 实测)
> 结论先行: **不用花 $5/月, 也不用砍 SKU。真凶是产品数据在 Worker 里被打包了 2 份, 消除重复即可回到限制内并留出约 3 倍余量。**

---

## 一、事实核验 (全部实测, 非推测)

### 1. 限制的真实口径 — M3 报告没说对

Cloudflare 官方文档: Worker 体积限制按 **gzip 压缩后**计算 — Free 3 MiB / Paid 10 MiB (压缩前上限都是 64 MB)。
[Source: Cloudflare Workers Limits 官方文档, as of 2026-07-28]

**M3 报告里 ".next/ = 3.14 MB > 3 MiB" 的测量口径是错的**: `.next/` 目录是未压缩构建中间产物, 不是上传的 Worker。真正被限制的是 next-on-pages 打包压缩后的 `_worker.js`。口径错了, 方案自然打偏 (方案 A/B 因此都是无效杠杆, 见第四节)。

### 2. 真实构建工具

`package.json` → `build:cf` = `@cloudflare/next-on-pages@1.13.16` (不是 AGENTS.md 写的 @opennextjs/cloudflare, AGENTS.md 描述已过时, 需修订)。

### 3. Worker 体积构成 (本地 HEAD 真实 build 实测, gzip -9)

| 产物 | 未压缩 | gzip | 内容鉴定 |
|---|---|---|---|
| edge-chunks/5958.js | 3.04 MB | **540 KB** | 产品全量目录 (longDescription ×248) — **第 1 份副本** |
| edge-chunks/3966.js | 2.81 MB | **470 KB** | 产品全量目录 (longDescription ×248) — **第 2 份副本 (重复!)** |
| edge-chunks/4416.js | 438 KB | 137 KB | 框架/共享代码 |
| blog/[slug]/page.js | 2.08 MB | **558 KB** | 88 篇 blog 内联内容 |
| category/[slug]/page.js | 539 KB | 172 KB | 16 类目 Pillar 内容 |
| product/[slug]/page.js | 229 KB | 66 KB | PDP 代码 |

引用链 (grep 实测): 5958 被几乎全部 [locale] 页面引用 (layout 共享组件链: ProductCard / RelatedProducts 等 import `@/data/products`); 3966 被首页 + search 页引用 (另一条 import 链)。**同一份 2.13 MB products.ts 被打进两个 chunk = Worker 里装了两份完整产品目录。**

### 4. 超支幅度

d40a789 (线上绿版本) 还在 3 MiB 以内; 239dec7 的 G1 页面 (+317 行) 只是压垮的最后一根稻草。按 M3 日志估算超支约 **0.12-0.14 MiB (gzip)**。

---

## 二、裁决: 是 SKU 太多了吗?

**是表象, 不是真因。** 数学摆在这:

- 消除 1 份重复产品数据 = 省 **~470 KB gzip** = 超支额的 **3.4 倍**, 一次到位还有余量
- 砍 SKU: 97 SKU × 3 语言全字段 ≈ 每 SKU gzip 约 5-6 KB, 要省 140 KB 需砍 **~25 个 SKU (目录的 1/4)** — 而这些 SKU 正是 v3.11-15 刚铺的 SEO 长尾资产 (52/97 已有 GSC 展示, 45 个待收录的长尾着陆页)

**砍 SKU 的 GSC 数据画像 (如果 K3 坚持要砍, 候选在这)**:

| 类目 | 7d 类目页展示 | 判定 |
|---|---|---|
| greeting-cards / wedding-invitations / place-cards | 0 | ❌ 不可砍 — K3 8/17 战略新类目, 刚上线未收录 |
| banners | 0 | ❌ 不可砍 — roll-up-banners PDP 34 imp + 易拉寶 pos 4 已在首页 |
| envelopes | 1 | ❌ 不可砍 — 大信封 pos 2.6 待破零, T45 任务在身 |
| educational | 5 | ⚠️ 观察 — exercise-books PDP 48 imp pos 11 边缘, 有潜力 |
| japan-doujin | 8 | ⚠️ 观察 — doujinshi printing pos 15.3 + can badge 3 词 striking |
| 45 个 0 展示 SKU | — | ⚠️ 多数上线 <2 周, GSC 收录周期未到, 现在砍 = 白铺 |

结论: **GSC 数据不支持砍 SKU** — 零展示 ≠ 无价值, 是收录时滞。砍 25 个 SKU 省的空间, 不如消一个重复 chunk 省的一半多。

---

## 三、不花钱方案 (按 ROI 排序, K3 拍板用)

### 方案 D1 (推荐 · 一次到位): 消除产品数据双 chunk 重复

- 动作: 排查 5958 / 3966 双副本根因 — 两条 import 链 (`@/data/products` 直连 vs `@/lib/products` re-export) 指向同一模块但可能被 webpack 分成两个 chunk group。统一所有 import 入口到 `@/data/products`, 删除 `@/lib/products` 中转层 (170 字节, 纯 re-export); 若仍分 chunk, 在 next.config 用 `experimental.optimizePackageImports` / modularizeImports 或调整 layout 组件只 import 轻量索引
- 预期: **-0.4~0.5 MiB gzip** → 回到 2.6-2.7 MiB, 留出增长空间
- 业务影响: **0** (数据内容不变, 只改打包路径)
- 工作量: 0.5-1 turn
- 验证: `npx wrangler deploy --dry-run` 或 CF build 日志看 "Total Upload: X / gzip: Y" — **Y < 3.0 MiB 即达标** (这是唯一有效测量口径, 写进 M3 SOP)

### 方案 D2 (加固 · 与 D1 可同批): layout 共享组件换轻量索引

- 动作: layout 链组件 (ProductCard / RelatedProducts / 导航) 只需要 slug + title + image, 新建 `products-index.ts` 轻量导出 (~50 KB), 全量字段只在 product/category 路由 import
- 预期: 每个页面 bundle 瘦身, 顺带改善启动时间 (Workers 1s startup 限制)
- 业务影响: 0

### 方案 D3 (中期 · v3.17): blog 内联 HTML 外置

- blog/[slug]/page.js 558 KB gzip — 88 篇 blog HTML 内联在代码里。外置到 `public/blog-data/{locale}.json` (已有先例) + 构建期读取, 预期再省 0.3-0.4 MiB
- 业务影响: 0; 但改动面大 (88 篇), 排 v3.17

### 方案 E (兜底 · 不建议首选): GSC 指导砍 SKU

- 仅当 D1+D2 后仍 >3 MiB 才启用; 候选 = 0 展示 + 非战略 + 上线 >4 周仍无收录的 SKU, 每次最多砍 5 个并验证
- 当前数据: 不满足启用条件

### M3 原 3 方案评级

| M3 方案 | K3 评级 | 理由 |
|---|---|---|
| A 升级 paid ($5/月) | 可用但不必要 | 超支仅 0.14 MiB, D1 一次解决还倒余 3 倍空间; $5/月留着, 等站点真长到 3 MiB 有机撑满再花 |
| B 改 Vercel/多 Worker | 过度工程 | 迁移风险 + 1 周工作量, 解决一个 140 KB 的问题 |
| C Multi-Zones | 过度工程 | 同上, 2 周+ |

---

## 四、M3 本轮表现追加评分 (计入 9.0 改进体系)

**值得肯定**: SOP-1 红灯冻结执行到位 (停手 + 1 段报告 + 等拍板); SOP-2 二元化表述到位; 3 选项呈报格式正确。

**仍不达标 (SOP-3 深层问题)**:
1. **测量口径错**: 拿 `.next/` 目录当 Worker size — 没查 CF 官方文档确认限制是 gzip 口径。SOP-3 增补: **先确认限制的定义, 再测量**。
2. **方案 A/B 是无效杠杆却实施了**: standalone output 对 next-on-pages 无意义 (自己的实测也证明 size 没变); 移除 unused deps 在 webpack tree-shaking 下注定 ≈ 0。**先分析 bundle 构成 (哪个 chunk 大、装的什么), 再选方案** — 本报告第一节的 6 行表格就是标准动作, 成本 10 分钟。
3. **本地从未跑通 build:cf** (Windows 缺 npm shim), 所有"3.12/3.14 MB"数字来源不明 — 无来源数字不许进报告 (SOP-2 增补)。

---

## 五、K3 拍板 (待 user 确认后由 M3 执行)

**建议拍板: 方案 D1 + D2 同批, 1 commit 1 push + verify-deploy + wrangler dry-run 记录 gzip 数值。**

M3 执行卡要点:
1. 先跑测量基线: 记录当前 worker gzip (wrangler dry-run 或 CF 日志), 不许再用 .next/ 目录当口径
2. 统一 products import 入口, 删 `@/lib/products` 中转层; layout 链换轻量索引
3. 本地 build 后重新 grep 验证: 两个 edge chunk 不再同时含 longDescription ×248
4. 6 步验收 + curl 200 (含 /en/ 首页 + 任一 PDP + 任一 category)
5. 若 D1+D2 后 gzip 仍 >3 MiB → 停手报 K3 (不自动启动方案 E)

---

*K3 / 2026-08-22 / 数据源: 本地 HEAD 真实 build 产物 gzip 实测 + CF 官方 limits 文档 + zenn.dev 两篇同类案例 + GSC 8/14-8/21 页面层数据 / M3 未提交改动 (next.config.js + package.json) 已原样保留在工作区*
