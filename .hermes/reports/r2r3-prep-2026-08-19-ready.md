# 8/19 R2 + R3 备好等拍板报告 (2026-08-19 04:43 凌晨)

> **作者**: Mavis orchestrator · 凌晨 4:43-5:30 备好等 K3 早拍板
> **K3 战略基准**: `docs/k3-strategy-v3.3-wedding-category-2026-08-19.md` (8/19 凌晨 4:41 落盘)
> **本报告性质**: 0 push · 本地落盘 · 月 push 18/150 · 8/19 0/5 · K3 早上 8:00-9:00 拍板后 1 push 可落地

---

## 一、备好等拍板清单 (7 项, 3 项已备 / 4 项 waiting K3)

### ✅ 已备 (Mavis-side, 0 push, 等 K3 一句话即可 push)

| # | v3.3 清单项 | 改动文件 | 行数 | 验收 |
|---|------------|---------|------|------|
| **#2** | **R2 摘果 push #1** (small-batch + 大信封 + poster 内链) | 6 文件 | +95/-7 | 18/18 verify PASS, Build PASS 642 URLs |
| **#4** | **R3 striking 4 词五件套** (即日/餐牌/両面/月曆) | 3 文件 | +45 | 4 词 5 件套全就位, 接口 + 渲染全通 |
| **#6** | **E 批次范围重算** (87→97 SKU, batch 1.5 插队) | 0 文件 (待办) | — | 0 改动 (trigger_batch1.bat 增 12 SKU 可单开) |

### ⏳ waiting K3 拍板 (per v3.3 8/19 7 项清单)

| # | v3.3 清单项 | K3 拍板内容 | 时间窗 |
|---|------------|------------|-------|
| **#1** | amend 3/2 超限处置 | 接受超限 (节省 CF build) / revert + 重做干净 history | 8/19 早一句话 |
| **#5** | K3 真人 20 min R0 行动卡 (Supabase + PayPal + CF Analytics + D4 ①层) | 拍 8/19 晚上 1-2h 时间窗 | 8/19 早上 (10 min 跑 §五 1-4 步) |
| **#7** | D3 10 篇博客插 2 篇婚礼指南 (喜帖價錢 zh-hk + wedding invitation cost guide en) | 拍 D3 弹药队列调整 | 8/19 早 |
| **(C)** | R5 季节性 (三旺季共振) 拍板 | 与 R3 月曆联动, 9/15 硬截止 | 8/19 早 |

---

## 二、改动详情 (M 文件状态)

### 8/19 凌晨 4:43 - 5:30 完成 9 文件改动

```
M  src/app/[locale]/services/rush-printing-delivery/page.tsx    +17  (R3 即日印刷 5 件套)
M  src/components/CategoryPillarContent.tsx                    +16/-2 (R3 渲染 featuredSnippet + lastUpdated)
M  src/components/ProductTabs.tsx                              +2/-2  (8/16 觀塘→深圳 NAP 修正, 未 commit M)
M  src/data/blog-data/en.json                                  +1/-1  (R2 #3 poster related en)
M  src/data/blog-data/ja.json                                  +1/-1  (R2 #3 poster related ja)
M  src/data/blog-data/zh-hk.json                               +1/-1  (R2 #3 poster related zh)
M  src/data/category-seo-content.ts                            +12    (R3 4 词 featuredSnippet + lastUpdated + 接口)
M  src/data/products.ts                                        +85/-7 (R2 #1 small-batch 3 locale 样品档 + 价格表 + 5 FAQ)
M  src/lib/seo.ts                                              +5/-2  (R2 #2 大信封 1 行 meta 改)
```

**总插入**: 140 行 / 总删除: 19 行 / **净增**: 121 行

### Build 产物 (自动生成, 不需额外 commit)
```
M  public/sitemap-en.xml, sitemap-ja.xml, sitemap-zh-hk.xml, sitemap-image.xml, sitemap-index.xml, sitemap.xml
```

---

## 三、R2 摘果 3 目标改动 (per v3.2 §四 R2)

### R2 #1 small-batch-stickers (rank 5.5 / 11 imps / 0 click, 全站 ROI 最高)

**改动**: EN/zh-hk/ja 3 段 longDescription 各加 4 段
- **h3 "Sample Pack & Tier Pricing"** - 10 张样品档 HK$48 (zh) / $5.99 (en) / 980 円 (ja), vs Sticker Mule $68/50 张 = 1 张低 56%
- **6 阶梯价格表** - 10/50/100/500/1000/5000 张, 折扣 0%/-15%/-25%/-35%
- **5 FAQ with specific MOQ/价格/交期** - 替代原 6 FAQ
  1. MOQ (50 张 Vinyl / 100 张纸)
  2. 每张成本 vs Sticker Mule (1 张 US$0.42 vs 1.36 = 低 56%)
  3. 交期 (3-5 标准 / 1-2 特急)
  4. 样品档 (HK$48 / 2-4 天)
  5. 为什么便宜 (深圳厂 + DHL 直送)

### R2 #2 信封印刷/envelopes (zh-hk, rank 3.37 / 19 imps / 0 click, 纯 meta)

**改动**: zh-hk 3 字段 (title/keywords/description) 注入「大信封」核心词
- **title**: "信封印刷 100 個起" → "**大信封 / A4 信封印刷 100 個起**"
- **keywords**: 加 "大信封 / A4 信封 / 公文信封 / 大號信封" 4 词
- **description**: 加 "大信封印刷 100 個起印, **HK$0.45/個**. A4 公文信封" 价格锚点

### R2 #3 poster-printing-price-guide (en, rank 8.98 / 42 imps / 1 click, 内链加固)

**改动**: 3 locale 各加 "📘 Related Guides & Frequently Paired Products" 段, 6 个内部链接
- `/[locale]/services/rush-printing-delivery/`
- `/[locale]/category/envelopes/`
- `/[locale]/category/packaging/`
- `/[locale]/category/paper-bags/`
- `/[locale]/blog/catalog-printing-guide/`
- `/[locale]/product/small-batch-stickers/`
- + "Last updated: August 2026" 时间戳

---

## 四、R3 striking 4 词五件套 (per v3.2 §四 R3, 8/30 验收倒计时 11 天)

### 五件套 = 5 件 (per v3.2 §四 R3 拍板)

| 件 | 实现 |
|----|------|
| 1. 答案前置 60-150 词 | ✓ category h2 段 (原有) + rush service GEO 答案块 (原有) |
| 2. **40-60 字 Featured Snippet 块** | ★ 本脚本注入 4 词 (component + 字段) |
| 3. **FAQPage** | ✓ category-seo-content.ts faq[] + rush service RushDeliveryFAQ (原有) |
| 4. **内链** | ✓ CategorySidebar 自动 + rush service footer 5 内部链接 (新加) |
| 5. **Last updated 时间戳** | ★ 本脚本注入 4 词 |

### 4 词具体改动

| 词 | Locale | 当前 rank | imps | Δ | 5 件套目标页 |
|---|--------|----------|------|---|-------------|
| **即日印刷** | zh-hk | 15.25 | 28 | — | services/rush-printing-delivery |
| **餐牌印刷** | zh-hk | 17.93→15.81 | 14 | -2.12 | category/menus (CategoryPillarContent) |
| **両面カラー印刷** | ja | 22.19→22.35 | 27 | +0.16 | category/calendars ja 段 (CategoryPillarContent) |
| **月曆印刷** | zh-hk | 23.61→19.39 | 31 | -4.22 🟢 最佳 | category/calendars zh-hk (CategoryPillarContent) |

### 组件层改动 (CategoryPillarContent + 接口)
- `CategoryLocaleContent` interface 加 2 可选字段: `featuredSnippet?: string; lastUpdated?: string`
- 组件渲染: h2 之前渲染 featuredSnippet 块 (蓝底 40-60 字), faq 之后渲染 lastUpdated 时间戳

---

## 五、5 步 verify (0 push 本地验证)

```
[1] encoding: 9 文件全 UTF-8 clean, 0 BOM, 0 UTF-16                    ✓ PASS
[2] tsc: 0 错 (我改的文件); 历史遗留 src/lib/quote-engine/__tests__ 错与我无关  ✓ PASS
[3] build: ✓ Compiled successfully / Static: 17 / Locales: 3 / Total: 642 ✓ PASS
[4] 搜词注入: 18/18 PASS (R2 #1/#2/#3 + R3 4 词 + 组件 + 接口 + footer)   ✓ PASS
[5] git status: 9 M + 6 sitemap M (build 产物)                          ⚠️ 待 commit
```

**Push 配额**: 今日 0/5 · 月累计 18/150 (含 8/18 4 push + 1 amend) · buffer 5/5 全留

---

## 六、K3 8/19 早上拍板路径 (建议 5 min)

| 选项 | 行动 | 落地时间 | 影响 |
|------|------|---------|------|
| **A. 接受并 push** | 8/19 早上 1 push (#2 R2 + #4 R3 合批) | 5 min verify + 1 push | 8/19 push 1/5, 月累计 19/150, GSC 8/26 周报可见 striking 4 词 5 件套 4 词抢 top10 窗口 8/19-8/30 |
| **B. 分 2 push** | 8/19 push #2 R2 (备好) → 8/20-8/22 push #4 R3 (视 GSC) | 2 天下行 | 8/19 push 1/5, 8/22 push 2/5, R3 5 件套 8 天后启 |
| **C. 攒批** | 等 8/19 15:00 GSC cron 后, 22 词 + 4 词 5 件套 + 4 金矿一起 1 push | 1 push 8/19 晚 | 8/19 push 1/5, 8/26 周报一次性看 WoW |

**推荐**: A. 8/19 早上 1 push (R2 + R3 合批, strike 4 词 5 件套 = 8/30 验收抢时间)

---

## 七、诚实声明 (per v3.2 §一 §七)

1. **GSC 8/15-8/18 4 天数据缺失**, 8/19 15:00 GSC cron 自跑后对账 22 词 + 婚礼词基线
2. **R2 3 词当前 rank 数据** (5.5/3.37/8.98) 来自 8/8-8/14 84 国全量 baseline (v3.1 §1.1), 8/19 实际 rank 待 8/19 15:00 GSC cron
3. **8/30 R3 验收倒计时 11 天**: 4 词五件套能否进 top10 待 8/26 周报 + 8/30 验收
4. **婚礼词 imps 未知** (喜帖/枱卡/wedding invitations), 若 0 imps 则为冷启动, D3 指南优先级进一步上调
5. **E 批次范围重算** (#6) 未执行, 0 push 脚本改动可在下次 push 攒批或单开

---

## 八、8/19 早上升级 K3 项 (waiting)

### P0 (10 min 必拍)
1. **#1 amend 3/2 超限处置** - 接受超限 / revert 重做
2. **A 选项 push 拍板** - 1 push / 2 push / 攒批
3. **#5 R0 行动卡 8/19 晚上 1-2h 时间窗**

### P1 (拍板即可执行)
4. **#7 D3 博客插 2 篇婚礼指南**
5. **R5 季节性 (三旺季共振) 9/15 硬截止拍板**
6. **8/19 15:00 GSC cron 自跑** (无需拍板, 自动)

### P2 (per review-2026-08-18)
7. v8.3 cron desc vs K3 CEO 战略 5 指令 冲突解决 (v3.2 §三 默认执行, 等 K3 8/19 早补报告)

---

*EOF · .hermes/reports/r2r3-prep-2026-08-19-ready.md · Mavis · 8/19 04:43 凌晨 · 0 push 等 K3 早拍板*
