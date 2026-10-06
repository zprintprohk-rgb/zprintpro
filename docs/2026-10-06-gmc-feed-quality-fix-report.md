# GMC 商品数据源质量修复报告 (2026-10-06 深夜批次)

> 执行层: AutoClaw 会话 · 触发: K3 提供 GSC Merchant 后台「您的商家在 Google 上的信息」快照 (10/6)
> 状态: **代码修复已 push 生产并线上验收通过** (commit `07c61e45`, CF Pages success)
> 上游衔接: `docs/2026-09-29-gsc-merchant-center-fix-report.md` (9/29 批次, 4 条未获批准 = 已下架 SKU 残留)

---

## 0. K3 快照数据演变解读 (9/29 → 10/6)

| 指标 | 10/6 快照 | 与 7 天前比 | 解读 |
|------|-----------|------------|------|
| 商品总数 | 226 | -17 | 9/29 修复报告口径 239 已批准; 总数下降主因 = 下架 SKU 残留条目被后续抓取周期自动移除 + feed 只输出 91 SKU × 3 locale 口径差异 |
| 已批准 | 217 | -22 | 同上; 批准池整体健康 |
| 受限 | 0 | +0 | 无政策受限, 健康 |
| 未获批准 | 5 | +1 | 详见 §1 逐条归因: 3 条旧残留 + 2 条「年賀状印刷」图片评估残留 |
| 审核中 | 4 | +4 | Google 对既有商品重新评估的正常中间态 (feed 价格/类目变更触发), 见 §4 |

**结论**: 9/29 报告预判的「让 feed 抓取成功 → Google 自动移除残留」正在发生 (未获批准 4→5 的表象下, 旧 keychain/badge 残留在消退, 新的贺卡图片评估条目在轮换)。

---

## 1. 5 条未获批准逐条归因 (证据链闭环)

| # | 商品 (MC 显示名) | 对应实体 | 未批准原因 | 归因 |
|---|-----------------|----------|-----------|------|
| 1 | アクリルキーホルダー (ja) | 已下架 acrylic-keychain (2026-09-22, commit 2e46b1f1) | 缺价格 + 缺颜色 | **旧残留** — SKU 已不在 feed, 等抓取周期自动移除 |
| 2 | Acrylic Keychain (en) | 同上 | 缺价格 + 缺颜色 | 同上 |
| 3 | Can Badge Printing (en) | 已下架 can-badge (2026-09-23, commit 3606d042) | 缺价格 + 缺颜色 | 同上 |
| 4 | 年賀状印刷 (ja) ×2 | 在架贺卡 BC-001~BC-006 的 ja 名称 (v22 名片→贺卡 1:1 改名资产) | 图片类型不受支持 [image_link] | **见 §2 专项判定** |

「缺少商品价格 3 个 (1.3%)」「缺少颜色 3 个 (1.3%)」与 3 条下架残留一一对上 (226 × 1.3% ≈ 3), **在架商品无一命中价格/颜色缺失** — 本次修复后 color 91/91 全覆盖, 价格三 locale 真值, 这两类问题在在架层已结构性消除。

---

## 2. 「图片类型不受支持」专项判定 (双方法复算, §0.23.2)

### 2.1 表面假设 → 推翻

「WebP 不受支持」的直觉假设被官方文档推翻: GMC image_link 官方支持格式 =
**JPEG / WebP / PNG / GIF / BMP / TIFF** (support.google.com/merchants/answer/6324350, 10/6 抓取核实)。

### 2.2 图片资产本体复算 (方法 1: Pillow 本地 / 方法 2: 线上 HTTP + magic bytes)

| 检查项 | 结果 |
|--------|------|
| 6 张贺卡 hero.webp 本地解析 | 全部 WEBP 格式, **1200×1200**, 单帧非动图, RGB 模式 |
| 2027-01-31 新政 ≥500×500 | 全部 PASS (1200×1200) |
| 线上 HTTP (Googlebot-Image UA) | 全部 200 + `Content-Type: image/webp` |
| Magic bytes (RIFF....WEBP) | 全部有效, 无 HTML 错误页伪装 |
| robots.txt (zprintpro.com 与 pages.dev 双域) | `User-agent: * Allow: /`, Googlebot-Image 可达 |
| 扩展名-格式匹配 | .webp = WebP, 官方明示的「扩展名错配导致此报错」情形不成立 |

### 2.3 判定

**当前在架贺卡图片资产无任何可复现的格式缺陷。** 「图片类型不受支持 ×2 (年賀状印刷)」最合理解释:
Google 对这些商品**上一次成功抓取时点**的评估残留 (恰逢 9/22-9/26 SKU 改名/下架/价格波动窗口, 图片 URL 曾指向不稳定源, 见 §3.1), 而非当前资产问题。

**处置**: 不改图片 (资产健康), 等 MC 重新抓取后自愈; 若 2 个抓取周期后仍报此错, 再用 Search Console 网址检查工具单测图片 URL (官方建议路径)。

---

## 3. 探针挖出的 4 个 feed 结构性缺陷 (本次已修复 4/4)

> 全部由 10/6 线上探针实证 (3 locale × 91 items = 273 条逐条核验), 非推断。

| # | 缺陷 | 实证 | 风险 | 修复 |
|---|------|------|------|------|
| C1 | **feed link/image_link 全量指向预览域** `zprintpro-19p.pages.dev` | 273/273 条命中 (CF Pages 环境变量 `NEXT_PUBLIC_SITE_URL` 被配为预览域, 与 schema-extensions.ts 2026-07-18 修过的 GSC 实测同根因) | 预览域无生产 SLA; Googlebot-Image 对预览域抓取的间歇失败 = 「图片类型不受支持」最大嫌疑源; 落地页流量泄漏到预览域 | `SITE_URL` 硬编码 `https://zprintpro.com` (schema-extensions 同款先例) |
| C2 | **locale 价格错标**: feed 直接输出 HKD `basePrice` 数值配 locale 币种 | ja feed BC-001 = `1.00 JPY` (实际 ja 定价 ¥20); en 应 $0.13 | 价格失真 → 价格不匹配拒批 + 信任崩塌 | `getLocalePrice()`: 优先 `basePrice_en/_ja`, 缺失按 pricing.ts 同款 fallback 汇率换算 (USD 0.128 / JPY 19.5); JPY 0 位小数 |
| C3 | **google_product_category 全 SKU 硬编码 3370** | 官方 taxonomy 核实: 3370 = *Sporting Goods > Outdoor Recreation > Boating & Water Sports > Towed Water Sports > **Kneeboarding*** (滑水板) | 类目错乱 → 触发 Apparel 系 color 强制要求 (正是「缺少颜色」报错的政策路径) + 类目投放错位 | 按 16 品类映射官方 taxonomy: 贺卡=95 (Greeting & Note Cards) / 贴纸=4054 / 纸袋=1837 / 包裝=973 / 月曆=927 / 海報=500044 / 傳單=5884 / 橫幅=976 / 書=784 / 信封=958 / 紅包=958 / 教育=961 / 菜單=3457 / 喜帖=1371 / 枱卡=2104 / 同人=784 |
| C4 | **79/91 条缺 color** | 探针实测 zh-hk/en/ja 各 91 条仅 12 条有 color | 「缺少颜色」类未获批准直接诱因 | `getColor()` 未映射品类默认 `White` (纸品主色), color 91/91 |

### 3.1 修复后线上验收 (push 后实探, 全绿)

```
[zh-hk] 91/91 有color | BC-001: link=zprintpro.com/zh-hk/product/premium-greeting-cards/ | price=1.00 HKD | category=95 | brand=智印港
[en]    91/91 有color | BC-001: price=0.13 USD | category=95 | brand=ZprintPro
[ja]    91/91 有color | BC-001: price=20 JPY   | category=95 | brand=ジープリント
首页 canonical/og:url = zprintpro.com, 含 pages.dev = 否 (SEO 层无同源污染)
```

本地 vs feed 对账: products.ts 91 SKU = ja feed 91 ids, **0 缺失** (9/29 后 keychain/badge 已彻底出清)。

---

## 4. 「审核中 +4」解读

4 条审核中 = Google 对 feed 中价格/类目字段变更商品的重新评估中间态 (C2 价格 + C3 类目变更触发)。**属预期自愈流程, 不需人工干预**; 下一次抓取后应转入已批准。若 7 天后仍停留审核中, 在 MC 逐条查看具体拒批原因再升级。

---

## 5. 待 K3 人工动作 (MC 后台, 一次性)

1. **触发一次手动抓取** (或等下次定时抓取): 让新 feed (生产域 + 真值价格 + 正确类目) 全量生效。
2. **抓取后核对 5 条未获批准**: 3 条下架残留应自动消失; 2 条「年賀状印刷」图片评估应转绿。若 1-2 个周期后仍残留 → MC 商品列表手动删除 (下架残留) / 网址检查工具单测图片 URL (贺卡)。
3. **核对 Scheduled fetch URL 是否带尾斜杠** `https://zprintpro.com/api/merchant-feed/<locale>/` (9/29 报告 §3.1 遗留项, 无尾斜杠版本 308)。
4. **(建议) 核对 CF Pages 环境变量** `NEXT_PUBLIC_SITE_URL`: 本次 feed 侧已硬编码免疫, 但该 env 若仍为 pages.dev, 其他消费点 (case-studies page.tsx 等) 仍有泄漏面, 建议改回生产域。
5. 449 项 aggregateRating/review (Enhancement) 维持 9/29 结论: 唯一合法路径 = 真实评价接入 (GCR / WhatsApp 整理), 不编造。

---

## 6. 交付物与验证记录

| 项 | 内容 |
|----|------|
| commit | `07c61e45` (7 文件: route.ts 修复 + 6 个可复跑探针脚本) |
| 改动面 | 仅 `src/app/api/merchant-feed/[locale]/route.ts` + scripts/ 探针, 不触名片资产/middleware 301/blog-data (§0.0 两条禁止遵守) |
| 审查全绿 4 件 (§0.25.10.3) | tsc 54=54 持平 · build PASS · diff 逐行核对 83 行 ±7 行均在本批次范围 · 门童 0 red/0 orange |
| push | `7b592897..07c61e45` (距上次 push 58 min ≥ 30 min 硬下限) |
| deploy | CF Pages check-runs: in_progress → **success** |
| 复跑命令 | `node scripts/probe-gmc-feed-v2-2026-10-06.mjs` (feed 字段) / `node scripts/probe-gmc-images-2026-10-06.mjs` (图片 magic bytes) / `python scripts/check-gmc-image-quality-2026-10-06.py` (本地图片复算) |

---

## 7. 数据来源 (§0.23 必含)

```
数据来源:
- K3 提供的 GSC/Merchant Center「您的商家在 Google 上的信息」快照 (2026-10-06, 对比 7 天前)
- docs/2026-09-29-gsc-merchant-center-fix-report.md (9/29 批次基线: 239 批准 / 4 未获批准 / 91 SKU feed)
- 线上 feed 探针 (10/6 修复前): /api/merchant-feed/{zh-hk,en,ja}/ 各 91 items, 273/273 link+image 指向 pages.dev
- 线上 feed 探针 (10/6 修复后): 同端点, 273/273 指向 zprintpro.com, color 91/91, 价格三 locale 真值, category=95
- Google Merchant 官方文档: image_link 支持格式 (support.google.com/merchants/answer/6324350, 10/6 抓取)
- Google 官方 taxonomy: taxonomy-with-ids.en-US.txt (2021-09-21 版, 10/6 下载, 3370=Kneeboarding 核实行)
- src/data/products.ts: 91 SKU / basePrice_en 79 处 / basePrice_ja 75 处 / BC-001..006 basePrice_ja = 20..35
- 本地图片复算: Pillow 6 张 hero.webp = 1200×1200 静态 RGB WEBP
- git log: 2e46b1f1 (9/22 SKU 下架) / 3606d042 (9/23 can-badge 下架) / 7b592897 (10/6 23:06 上一次 push)
双方法复算声明: feed 缺陷 4 项均经「线上 XML 解析」+「本地 products.ts/官方文档独立核对」两法一致;
图片「格式不支持」假设经「官方文档」+「本地 Pillow」+「线上 magic bytes」三法一致推翻。
```
