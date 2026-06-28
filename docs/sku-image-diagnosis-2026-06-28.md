# SKU 产品图共用情况诊断报告

> **生成时间**: 2026-06-28 18:17 (Asia/Shanghai)
> **作者**: Mavis
> **触发**: AutoCrawl 报告 27 个 SKU 共用图；用户要求深度诊断
> **状态**: 诊断完成 · 待执行

---

## 1. 现状（实测数据）

`public/images/products/` 目录下共 **88 张 jpg**，按文件 size 聚类后只有 **42 个 unique size**：

| 维度 | 数量 |
|------|------|
| 总 jpg 文件 | 88 |
| Unique file size (实际不同图) | 42 |
| **复制品（同 size 复制成不同 slug 名）** | **46 (52%)** |
| 真正独立图 (count=1) | 23 |

> **结论**: 超过一半的"产品图"是同一张图复制成不同文件名 — 属于占位图模式（设计阶段占位，真实图未生成）。

---

## 2. 共用图最严重集群（按 size 聚类）

| 共用数 | size (bytes) | 被复制的 slug 名 |
|--------|-------------|------------------|
| 6 | 110996 | business-cards, matte-business-cards, premium-business-cards, rounded-corner-cards, spot-uv-business-cards, thick-business-cards-400g |
| 6 | 87705 | cartoon-red-packets, custom-red-packets, eco-red-packets, embossed-red-packets, foil-red-packets, large-red-packets |
| 6 | 112155 | a4-flyers, a5-flyers, double-sided-flyers, eco-flyers, same-day-flyers, thick-paper-flyers |
| 6 | 90161 | cosmetic-boxes, folding-boxes, gift-boxes, mailer-boxes, **packaging** (非标 slug), rigid-boxes |
| 5 | 107238 | fluorescent-stickers, foil-stickers, removable-stickers, security-stickers, small-batch-stickers |
| 4 | 83906 | custom-calendars, desk-calendars, magnetic-calendars, mini-calendars |
| 4 | 92231 | disposable-menus, drink-menus, laminated-menus, pvc-menus |
| 4 | 114533 | a1-posters, a2-posters, adhesive-posters, outdoor-posters |
| 3 | 99500 | kraft-paper-bags, large-bags, white-card-bags |
| 3 | 86085 | colored-envelopes, large-envelopes, pearl-envelopes |
| 2 | 105630 | hardcover-menus, photo-frame-calendars |
| 2 | 69562 | paper-bags-white, white-bag |
| 2 | 104307 | perfect-bound-books, textbooks |
| 2 | 95999 | roll-up-banners, school-flyers |
| 2 | 201664 | exercise-books, spiral-notebooks |
| 2 | 87418 | adhesive-banners, mesh-banners |
| 2 | 108269 | flyers, folded-leaflets |
| 2 | 91412 | handle-bags, paper-bags |
| 2 | 85583 | gift-box, kraft-bag |

**共计 19 个 cluster** 涉及 65 个 SKU 需要独立图。

---

## 3. 资源现状（prompt 库可用）

| 文件 | 大小 | 状态 |
|------|------|------|
| `image-prompts.md` | 3050 行 | ✅ 78 SKU prompt + JSON 调用模板 |
| `seedream-prompts-all-skus.txt` | 586 KB (GBK 编码) | ✅ 79 SKU 完整 block（3 locale SEO + Alt + Prices + Midjourney prompt） |
| `SEEDREAM-GUIDE.md` | — | ✅ Seedream 工具指南 |
| `seedream-automation.js` / `seedream-batch-v2.js` / `seedream-batch-v3.js` | — | ✅ 批量执行脚本 |
| `seedream-progress.json` / `seedream-progress-v3.json` | — | ✅ 进度跟踪 |

**Prompt 资源完整**：每个 SKU 都有 Midjourney/DALL·E prompt + Kimi 2.6 JSON 调用模板。

---

## 4. 推荐执行方案

### 方案 A：Seedream 批量生图（推荐）
- **输入**: `seedream-prompts-all-skus.txt` 79 SKU block
- **工具**: Seedream 4.5 (字节跳动) / Kimi 2.6
- **输出**: 65 张独立产品图（jpg/webp）
- **执行**: 用 `seedream-batch-v3.js` 批量调用 Kimi 2.6 generate_image API
- **预计时间**: 65 张 × 平均 30s/张 = 约 30-60 分钟（含 rate limit 重试）
- **预计费用**: 65 × 0.1 元 = 约 6.5 元

### 方案 B：分阶段（先核心 10 SKU）
- 优先做 6 大共用 cluster：business-cards 6 / red-packets 6 / flyers 6 / boxes 6 / stickers 5 / calendars 4
- 共 33 张图，覆盖 33 个核心 SKU
- 预计时间 15-20 分钟

### 方案 C：放弃独立图，保留共用 + 优化元数据
- 接受共用图，但每个 SKU 写独立 `alt` + 独立 SEO filename
- 短期不增加图片资源，但补全 SEO meta
- 0 张新图，0 元成本

---

## 5. 关键问题

- **`packaging.jpg` 是非标 slug**（其他 box 类都是 `-boxes` 后缀）— 修复时统一改成 `packaging-boxes.jpg`
- **`paper-bags-white.jpg` + `white-bag.jpg` 重复名**（同名不同图）— 命名混乱需清理
- **`gift-box.jpg` + `kraft-bag.jpg` 在 boxes/bags cluster 里** — 命名不一致
- 部分图是被复制而非共用（如 `a1-posters` 跟 `a2-posters` 视觉上不同 size 但实际相同字节 — 因为是同源图 resize）

---

## 6. 决策建议

**优先方案 B（先核心 33 张）+ 后期补方案 A 剩余 32 张**。

预计 1-2 周完成全部 65 张独立图。

---

## 附：实际产品 slug 列表（按聚类）

参见 `src/data/products.ts` 79 个产品定义。
