# V25.9 图片集交接说明（5 SKU × HERO）

> 版本：V25.9 ｜ 生成日期：2026-08-25 ｜ 目标目录：`F:\zprintpro-nextjs\zprintpro-en-us-images\v25_9_pro_final`

---

## 一、目录结构约定

```
F:\zprintpro-nextjs\zprintpro-en-us-images\
├── v25_9_pro_final\                 ← 本批次根目录（新建）
│   ├── manifest.json                ← 生成清单（sku/市场/路径/大小/质量）
│   ├── seo_geo_alt_ledger.json      ← Alt 台账（JSON，机器可读，自动替换主数据源）
│   ├── seo_geo_alt_ledger.csv       ← Alt 台账（CSV，Excel 可开）
│   ├── seo_geo_alt_ledger.md        ← Alt 台账（MD，人读）
│   ├── _originals\                  ← 原始高清图归档（PNG，2048×2048，回滚源）
│   │   ├── BC-001_en.png
│   │   ├── PB-001_en.png
│   │   ├── PK-002_en.png
│   │   ├── RP-001_zh-hk.png
│   │   └── DJ-001_ja.png
│   ├── BC-001\                      ← SKU 编号文件夹
│   │   └── zprintpro-greeting-cards-premium-greeting-cards-en-hero.webp
│   ├── PB-001\
│   │   └── zprintpro-paper-bags-kraft-paper-bags-en-hero.webp
│   ├── PK-002\
│   │   └── zprintpro-packaging-cosmetic-boxes-en-hero.webp
│   ├── RP-001\
│   │   └── zprintpro-red-packets-foil-red-packets-zh-hk-hero.webp
│   └── DJ-001\
│       └── zprintpro-japan-doujin-doujinshi-printing-ja-hero.webp
```

**编号规则**：SKU 编号 = 品类缩写 + 序号（BC=greeting-cards、PB=paper-bags、PK=packaging、RP=red-packets、DJ=japan-doujin），与 `_sku_data.json` 的 `id` 字段一一对应；v25.7/v25.8 历史批次的 SKU 文件夹与命名完全一致，可无缝延续。

## 二、文件命名规则（SEO+GEO）

`zprintpro-{category-slug}-{sku-slug}-{lang}-{view}.webp`

- 前缀固定 `zprintpro`（品牌）
- `{category-slug}` = 类目（greeting-cards / paper-bags / packaging / red-packets / japan-doujin）
- `{sku-slug}` = 产品标识（premium-greeting-cards / kraft-paper-bags / cosmetic-boxes / foil-red-packets / doujinshi-printing）
- `{lang}` = 市场语言（en / zh-hk / ja）
- `{view}` = 视图（hero / detail / variety / multi-angle）
- 全部英文小写连字符，无空格无特殊字符；`SEO_FILENAME` 行由 V25.9 提示词文件直接给出，与台账一一对应

## 三、SEO+GEO Alt 台账用法

主数据源：`seo_geo_alt_ledger.json`。字段：

| 字段 | 说明 |
|---|---|
| sku / market / view | 定位键（网站图片选择依据） |
| webp_filename / webp_path | 文件名与绝对路径 |
| webp_size_kb / webp_quality / webp_dimensions | 规格证据（<120kb / 1200×1200） |
| original_png_path | 回滚源路径 |
| alt_text | SEO+GEO alt 文案（按市场语言：EN 英文 / ZH-HK 繁体中文 / JA 日文） |
| seo_keywords | 语义关键词（关键词与文件名、alt 一致映射） |
| prompt_version / prompt_file | 提示词溯源 |

**Alt 规则**：语义关键词（品类+产品）→ 产品标识（设计/文案/工艺）→ 场景描述（应用环境）→ 品牌背书（zprintpro）。示例：`Premium foil stamped greeting cards with WARM WISHES design, gold foil corners and floral botanicals on ivory cardstock, displayed on a warm wooden desk with fairy lights bokeh - custom greeting cards printing by zprintpro`

## 四、网站自动替换执行步骤

1. **读取台账**：`seo_geo_alt_ledger.json`，按 `sku + market + view` 匹配目标图片位
2. **取图**：按 `webp_path` 读取 webp 文件；若部署到 CDN，用 `webp_filename` 作为上传键名
3. **替换**：页面上 `<img>` 的 `src` 换成新 webp 路径，`alt` 换成 `alt_text`，`width/height` 建议写 1200（占位防 CLS）
4. **校验**：替换后确认 (a) src 可达 200；(b) 文件大小 <120kb；(c) alt 与台账一致；(d) 文件名含 `zprintpro-` 前缀
5. **记录**：替换完成后在台账追加一列 `deployed_at`（或写回 `deployment_log`），保证可审计

## 五、风险项

| 风险 | 说明 | 缓解 |
|---|---|---|
| 原图水印残留 | autoglm 通道服务端叠加"AutoClaw AI生成"水印 | 已裁右下 8% 并逐张视觉验证无残留；若生成新图按 SOP 再裁 |
| RP-001 深色调 | V25.9 ZH-HK 红包提示词 category tones/场景与浅色主基调矛盾 | 本次已修正重生成（浅粉/香槟金/象牙白背景）；后续批量需同步修提示词 |
| webp 压缩 | 117KB 上限附近，复杂纹理可能被迫降质 | 已按质量 84-90 输出，清晰度逐张验证通过；回滚源 PNG 保留 |
| 文件名冲突 | 同 SKU 同视图多市场 | lang 段（en/zh-hk/ja）保证唯一，台账校验无重名 |

## 六、回滚方案

- **重新生成 webp**（原图未删）：`python finalize_v259.py`（工作台脚本，路径见交付说明），从 `_originals\*.png` 重新裁切/压缩——本批所有 webp 均由 `_originals` PNG 无损派生，随时可重建
- **换回旧图**：历史批次目录 `v25_7_pro_final\`、`v25_8_pro_final\` 原样保留，改回对应 src/alt 即可
- **整批重跑**：提示词源 `F:\电商生图提示词重要\V25.9_*_full_99sku_4views.txt`（RP-001 用修正版提示词，见 v259-gen-prompts.json），通道 autoglm seedream，流程：生图 → 视觉验证 → 裁水印 → 1200×1200 → webp<120kb → 台账
---

## 七、编号文件夹 + 自动上传协议（2026-08-25 追加）

### 7.1 编号映射（固定不变）

| 编号文件夹 | SKU | 类目 | 市场 |
|---|---|---|---|
| sku001 | BC-001 | greeting-cards | en |
| sku002 | PB-001 | paper-bags | en |
| sku003 | PK-002 | packaging | en |
| sku004 | RP-001 | red-packets | zh-hk |
| sku005 | DJ-001 | japan-doujin | ja |

每个编号文件夹内：`{SEO+GEO文件名}.webp`（成图）+ `sku.json`（该 SKU 完整元数据：编号/SKU/类目/市场/视图/webp 文件名/alt/关键词/original_png）。

### 7.2 自动上传索引（程序读取入口）

中央索引：`sku-index.json`（与 sku001-005 同步生成）。自动上传脚本只读这一个文件：

```json
{ "folders": [ { "number": "sku001", "sku": "BC-001", "sku_json": "...sku.json", "webp": "zprintpro-....webp", "market": "en", "size_kb": 109.45 }, ... ] }
```

### 7.3 自动上传执行步骤（按编号）

1. 读 `sku-index.json` → 遍历 `folders[]`（或按网站 SKU 反查 number）
2. 对每个文件夹：读 `sku.json` → 取 `images[].webp_path` + `alt_text`
3. 上传 webp 到 CDN/站点图片目录（文件名保持不变，覆盖更新）
4. 同时更新页面 `<img>` 的 `alt` 为 `alt_text`（台账同源，不依赖记忆）
5. 上传后写回 `manifest.json` + 台账追加 `deployed_at` 时间戳

### 7.4 后续扩展

每 SKU 补 full 视图集（detail/variety/multi-angle）时：同名 webp 继续放进对应编号文件夹，`sku.json` 的 `images[]` 追加条目，`sku-index.json` 重建一次（幂等），自动上传逻辑无需改动。
