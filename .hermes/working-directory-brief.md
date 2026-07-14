# ZprintPro 工作目录指示与提醒 (宪法 + 技能 一表)

> **本文件作用**: 任何 session / cron / worker 进入 `F:\zprintpro-nextjs` 时,**第一份必读文件**。
> 浓缩三处真源: ① V3 教科书模板 ② `.hermes/context.md` 宪法 ③ `SKILL.md` 调度算法。
> 完整版以三处原文为准 (单源 SSoT), 本文件只做"开机即用"的速查。

---

## ⛔ 最高宪法原则 (Supreme Constitutional Principles · 不可违反)

> 违反任一 = abort + 升级 user, 不准"小改"绕过。

### C1. 品牌身份 (AGENTS.md §1)
- ✅ 品牌 = **智印云 / ZprintPro** (8 locale 主推 zh-hk / en / ja)
- ❌ 永远 **不写** "智印港" / "智印印港" (竞品)

### C2. 主营品类 (AGENTS.md §11)
- ✅ 核心: 貼紙 / 宣傳單張 / 包裝盒 / 紙袋 / 標籤
- ❌ 永不在 SKU/博客/SEO 出现: 名片 / 咭片 / business cards / 名刺

### C3. NAP vs SEO 脱钩 (AGENTS.md §13.10)
- NAP 真实地址 (深圳龙岗) **只** 写: footer / contact / legal / schema / email signature
- SEO 内容 (blog 标题/excerpt/hero/CTA/列表卡片) **不写** supplier origin 城市
  - zh-hk: 不写 "深圳", 写香港本地场景 (餐飲旺季 / MTR / 順豐)
  - en: 不写 "Shenzhen Printing" / "in Hong Kong", 写全球卖点 (sizes/paper/design/material)
  - ja: 不写 "中国/深圳", 写日本市場賣點 (小ロット / 納期厳守 / 高品質)

### C4. 3 locale 独立策略 (AGENTS.md §13.13)
- 3 locale = **3 个独立市场的内容策略**, 不是翻译关系
- ❌ 禁止: zh-hk 标题机翻成 en/ja 直接用
- ❌ 禁止: en 标题硬塞 "Shenzhen" / "Hong Kong" / "美國" 残留

### C5. 纯文字博客 (AGENTS.md §13.4)
- ❌ blog `cover` 字段不写
- ❌ HTML content 不出现 `<img>` 标签
- ❌ 标题硬塞 supplier origin (如 "· 深圳印刷")

### C6. 链接完整性 (AGENTS.md §13.6 / SKILL §7)
- ❌ 新内容里不写任何会 404 / 301 / 302 的链接
- ✅ 写前必查 `matrix.queue_entry.valid_internal_links` 清单
- ✅ 写后 curl 验证每个内链返回 200
- 有效路由白名单: `/{locale}/{category|product|blog|service|guide|quote|contact|...}/<slug>/`
- ❌ 无 locale 前缀 / `/products/` (错) / 未注册 slug / `/category/business-cards/`

### C7. Footer 法规分层 (AGENTS.md §13.14)
- ja: **必须**显示「特定商取引法に基づく表記」按钮 → `/legal/`
- zh-hk / en: **不显示** (跨境无强制)
- 三 locale 統一: 隱私政策 + 使用條款 移到「幫助中心」column, 不在底部独立 legal strip

### C8. 15+ 年口径 (AGENTS.md §13.14-13.15)
- 法律实体: 成立 2012 年
- 营销口径: "15+ 年" (TrustBadges / Hero / HowItWorks / about / Footer)
- ❌ 不用 9 年 / 10 年 / 14 年 / 17 年 / 2009 / 2014 / 2017

### C9. CF Pages 月度 build quota (AGENTS.md §11.5)
- 免费方案 500 build/月, **攒批量 push + 1 push = 1 build**
- ❌ 禁止 trivial commit 单独 push (typo / 注释 / 一行格式)
- ✅ push 前 3 步预检: `check-encoding.js` + `tsc --noEmit` + `npm run build` 看 "Compiled successfully"

### C10. 真实主体 (法务 NAP, 全 locale 一致)
- 公司: 深圳市彩龙印刷包装有限公司
- 地址: 广东省深圳市龙岗区平湖街道嘉城路1号 (邮编 518111)
- 显示电话: +86 198 8085 1334
- WhatsApp: +86 181 2638 0255
- 邮箱: zprintpro@outlook.com
- 法定代表人: 唐运提

---

## 📋 V3 教科书模板 (4 元素评分)

> 来源: `docs/audit-en-multi-market-2026-06-19.md` §1.1 — 任何 PDP/H1/title 优化必须满足。

| 元素 | 标准 | 覆盖目标 | 缺失后果 |
|------|------|---------|---------|
| **H3** | ≥ 6 个 | 100% (84/84) | 章节深度不足, SEO 弱 |
| **TBL** | ≥ 2 个 | 100% (84/84) | 对比/规格信息缺失 |
| **DHL** | 物流段 | 97.6% (82/84) | 国际配送信号弱 |
| **ISO/FSC** | 9001/12647/FSC | 73.8% (62/84) | 信任信号弱, B2B 弃单 |

**TEXTBOOK 4 件套都满足 = SEO 教科书级**; 缺一件 = MEDIUM, 需补段。

**快速自检命令**:
```bash
node scripts/audit-h1.cjs                    # 扫 H1 长度 + 结构
node scripts/check-encoding.js --fix         # 编码/CRLF
npx tsc --noEmit                             # TS 类型
npm run build 2>&1 | grep -E "Compiled|Error"  # 编译
```

---

## 🔄 4 Sub-task 工作流 (cron 共享, daily/weekly/monthly/gsc 通用)

> 完整版见 `.hermes/context.md` §4; 本节只列 cron 关心的差异点。

### Sub-task A — 博客生产 (共享模板, cron 配数量/优先级/Tier 差异)

| Cron | 数量 | 优先级 | 行业 Tier | 字数 (zh-hk) |
|------|------|--------|----------|-------------|
| daily (10:15) | 1-2 篇 | P0 | A | 800-1000 |
| weekly-meta (周一 11:00) | 3-5 篇 | T1-T5 | B | 700-900 |
| monthly-audit (1 号 14:00) | 0 (重写 orphan top 10) | orphan | A/B/C | 200-300 补充 |
| gsc-feedback (周三 15:00) | 0 (不写内容) | — | — | — |

**关键路径** (2026-07-06 user 拍板, 踩坑教训):
- ✅ 内容写到 `src/data/blog-data/<locale>.json` (tsconfig paths 解析)
- ❌ **不写** 到 `public/blog-data/` (dead code)
- ✅ 同时更新 `src/data/blog-posts.ts` (BlogPostMeta) + `src/app/[locale]/blog/[slug]/page.tsx` (`articleSlugs` 数组)
- ✅ 跑 `node scripts/generate-sitemap.js` 重建 sitemap

**内容结构**: 9 段 (引子 / 行业概况 / 材質工艺 / 设计细节 / 选购决策 / 常见问题 / CTA + 隐式 schema)
- 4 FAQ + Article + BreadcrumbList + FAQPage JSON-LD
- 3-5 个内链 → `valid_internal_links` 清单

### Sub-task B — SKU 自进化 (不引新 SKU)

- 改 `src/data/products.ts` 现有 SKU: `title_zh/en/ja` + 1-2 Tier A 关键词
- `description/En/Ja` 末尾追加"**适配行业**"列表 (5-8 个)
- 不动 `slug` / `schema` / `images`
- 加 `optimizedAt: 'YYYY-MM-DD'` + `optimizationRound: N`

### Sub-task C — 类目 meta refresh (周一专属)

- 更新 `src/app/[locale]/category/[slug]/page.tsx`:
  - H1 末尾加 1 个行业最广关键词
  - 新增"**服务行业**"区块, cross-link 到 matrix 已铺博客
  - 类目 seoData 在 `seo.ts` 里 descriptions 注入 1 个 Tier A 长尾

### Sub-task D — Matrix Tracking (每次必跑)

- 读 `.hermes/industry-keyword-matrix.json`
- `covered[]` 追加 `slug` + `deployed_commit` + `cf_build_run`
- `next_due` 重算 (P0 80% 阈值 + 同类 5 天不重复 + GSC orphan +1)
- 写回 matrix.json

---

## 🎯 自进化调度算法 (SKILL.md §3.8, 完整版)

```python
def pick_next_blog_topic(matrix, gsc_signals, last_3_days_written):
    # Rule 1: P0 优先, P0 铺到 80% 才解锁 P1
    p0_cov = covered_P0 / queue_P0
    p1_cov = covered_P1 / queue_P1
    if p0_cov < 0.8:    cat = next_uncovered(priority='P0')
    elif p1_cov < 0.8:  cat = next_uncovered(priority='P1')
    else:                cat = next_uncovered(priority='P2')

    # Rule 2: 同 category 5 天内不重复同 SKU
    if cat.sku in last_3_days_written.get(cat.category, []):
        cat = pick_adjacent_sku(cat)

    # Rule 3: GSC 已展示 >50 但无着陆页 → 优先级 +1
    if gsc_signals.has_orphan(cat.next_due_slug):
        cat.priority_boost += 1

    # Rule 4: 标题按 locale 本地化 (§13.13 铁律)
    cat.title_template = matrix.queue_entry.title_template_<locale>

    # Rule 5: 输出无图
    cat.no_images = True

    # Rule 6: 内链全部用 valid_internal_links 清单
    cat.allowed_internal_links = matrix.queue_entry.valid_internal_links

    return cat
```

**关键认知**:
- `matrix.queue[]` 是数据源, cron **不**自己拍脑袋选题
- `priority_boost` 是 GSC 反馈, **不**主观打分
- `valid_internal_links` 是已 curl 200 验证的清单, 写链接前必查

---

## 🏷️ 行业 Tier 分级 (按印刷品复购频次, 不是市场规模)

- **Tier A** (高复购, 月/周, 优先铺): 餐飲外賣 / 零售精品 / 跨境電商 / 美妝護膚 / 教育培訓 / 婚慶 / 文創IP / 寵物 / 母嬰 / 茶飲食品 / 物流快遞 / 服裝
- **Tier B** (中频, 季, 次铺): 房地產 / 酒店民宿 / 醫藥保健 / 汽車汽配 / 金融證券 / 珠寶鐘錶 / 體育賽事
- **Tier C** (低频, 年/项目, 按需): 工業機械 / 五金工具 / 化工 / 建築工程 / 宗教文化 / 政企 / 影視IP / 同人周邊

## 🗂️ 类目优先级 (P0/P1/P2)

- **P0 主推** (先铺): stickers / flyers / packaging / paper-bags
- **P1 辅助** (次铺): posters / books / educational / menus / red-packets / calendars
- **P2 长尾** (按需): banners / envelopes / japan-doujin
- **禁区**: business-cards (AGENTS.md §11)

---

## ✅ 7 步 verify 流水线 (cron 完成判定, 缺一不可)

| Step | 命令 | 通过条件 |
|------|------|---------|
| 1 | `git status -sb` | 无 ahead (push 真成功) |
| 2 | `find public/sitemap*.xml -mtime -1` | 有输出 |
| 3 | `curl -sI https://zprintpro.com/<locale>/<url>/` × 3 locale | 全 200 |
| 4 | `curl -s <url> \| grep -c <主关键词>` | ≥ 1 |
| 5 | `curl -s <url> \| grep -E "Article\|BreadcrumbList\|FAQPage"` | ≥ 3 |
| 6 | `curl -s <url> \| grep -E "<img\|cover"` | 0 (无图硬约束) |
| 7 | 逐个 curl matrix `valid_internal_links` | 全 200 不 301/302/404 |

**任一不过 = 不算完成, 升级 user, 不报完成。**

---

## 🚪 cron / worker 退出条件 (R6 协议, SKILL §5)

每个 cron 必须 3 个 hard-coded 出口:
- (a) **TTL 过期自删**: 启动时检查时间窗口, 跳过本次 + 累积 N → `mavis cron delete self`
- (b) **报告落盘自删**: `.hermes/logs/YYYY-MM-DD-*.md` 存在且 24h 内 → 立即退出
- (c) **静默阈值升级**: 连续 N 次 verify 失败 → 升级 user, 不继续静默 tick

---

## 🛠️ 工作技能清单 (Skills / Scripts / Tools)

### 调度 skill (mavis orchestrator)
| Skill | 用途 | 路径 |
|-------|------|------|
| **zprintpro-seo-evolve** | SEO 自进化主控 (4 cron 协同) | `C:\Users\Administrator\.mavis\agents\mavis\skills\zprintpro-seo-evolve\SKILL.md` |
| multi-locale-content-audit | 多 locale 联动审计 | `~/.mavis/skills/` |
| seo-geo-optimizer | 关键词 / schema / FAQ 优化 | `~/.mavis/skills/` |

### 核心 scripts (项目本地)
```bash
# 编译 / 编码 / 部署
node scripts/check-encoding.js --fix         # 编码 + CRLF
npx tsc --noEmit                              # TS 类型
npm run build 2>&1 | grep -E "Compiled|Error" # 编译
npm run build:cf                              # CF Pages build (含 npx --legacy-peer-deps)
node scripts/verify-deploy.mjs                # CF Pages status check
node scripts/generate-sitemap.js              # sitemap 重建

# H1 / 标题 优化
node scripts/audit-h1.cjs                     # H1 长度扫描
node scripts/pick-cat-top-kws.cjs             # 类目 Top KWs 提取 (Node.js, 避免 GBK)
node scripts/check-i18n.js                    # 8 locale 完整性

# SKU / 关键词吸收
node scripts/pick-top-kws.py                  # xlsx 关键词吸收
node scripts/fix-optimized-at.py              # optimizedAt indent 修复
```

### 4 条 cron 母版 (SSoT)
| Cron | 母版路径 |
|------|---------|
| zprintpro-daily-content-evolve | `F:\zprintpro-nextjs\.hermes\cron-prompts\mavis\daily-content-evolve.md` |
| zprintpro-weekly-meta-refresh | `...weekly-meta-refresh.md` |
| zprintpro-monthly-matrix-audit | `...monthly-matrix-audit.md` |
| zprintpro-gsc-feedback-loop | `...gsc-feedback-loop.md` |

**重要**: mavis cron prompt 通过 HTTP API 加载, 大 prompt 写不进去 CLI buffer (>5800 char) — 改 prompt 必走 `.hermes/cron-prompts/` SSoT + `curl PATCH /mavis/api/...`。

---

## 🚨 异常上报路径 (SKILL §8)

| 信号 | 动作 |
|------|------|
| CF build 失败 | 升级 user + 报 commit + run id |
| 新博客 7 天 GSC 无收录 | 升级 user, 排查索引问题 |
| 任一 verify 步骤不通过 | **不**报完成, 修到通过再升级 |
| Token 消耗 > 50 万 | 暂停, 升级 user 决定 |
| matrix.json 损坏 / token > 50 万 | 暂停, 升级 user |
| Cron 静默超算力阈值 (上午 20min / 下午 40min) | kill + force-spawn replacement |
| push 失败 / 5xx / 404 / 301 | 立即升级 user, 不报完成 |
| Daemon crash 后 cron 静默 disable | guard cron 必须 `mavis cron get` 验证 enabled=true, 立即恢复 |

---

## ❌ Anti-patterns (绝对禁止, 来自真实事故)

1. ❌ 写日志不上线 (2026-07-01 4 天 3 篇只写 .hermes/logs 的教训)
2. ❌ 写到 `public/blog-data/` (2026-07-06 path bug, tsconfig 解析到 `src/data/blog-data/`)
3. ❌ zh-hk 标题机械翻译到 en/ja 残留 "Hong Kong" / "Shenzhen" / "中国" (2026-07-05 user 拍板 §13.10)
4. ❌ SKU 改 `slug` (改 slug = 改 URL = 死链)
5. ❌ 跨日内链不查 `valid_internal_links` 清单
6. ❌ commit 完成不 push (togthr 2026-06-26 / zprintpro 2026-07-10 教训)
7. ❌ `--legacy-peer-deps` 缺漏导致 npx 临时装包失败 (CF Pages build 卡 install)
8. ❌ 信任 worker 自报 "完成" 不独立 verify (7 步流水线必须 orchestrator 自己跑)
9. ❌ "force_execution_constraint" — 不准用 "太晚 / 犯困 / ROI 延后" 简化任务 (2026-07-06 user 拍板)
10. ❌ Pre-commit 8 问任一不过 (编码 / build / slug 数组 / NAP 脱钩 / 3 locale 独立 / en 美国 sharp hook / 15+ 年口径 / 不污染其他 locale)

---

## 🧭 Pre-commit 8 问 (每次 commit 前 30 秒跑, 8/8 才允许 push)

1. `node scripts/check-encoding.js` — 编码检查 (UTF-16/CRLF) ✅?
2. `npm run build` — 本地编译 (Compiled successfully + 无 TS error) ✅?
3. 新增 blog/slug 是否已加入 `articleSlugs` 数组 ✅?
4. zh-hk 标题/excerpt 写 target market (香港) 而非 factory location (深圳) ✅?
5. en/ja 标题/excerpt 避免机械翻译污染 ("in Hong Kong" / "米国" / "深圳" 残留) ✅?
6. en 改动是否触动 5 大 sharp hook 之一 (Free Shipping / Free Design / No Minimum / Fast Turnaround / Made for USA) ✅?
7. 未引入 "9 年 / 2017 / 2014 / 2009 / 10+ year" 残留 (必须用 15+ / 2012) ✅?
8. zh-hk/ja 首页未被 en 美国化污染 (grep "美國 \$99" / "米国 \$99" = 0) ✅?

---

## 📂 必读文件清单 (新 session 第一份)

1. **本文件**: `.hermes/working-directory-brief.md` (宪法 + 技能 一表)
2. **宪法 SSoT**: `.hermes/context.md` (v4, 2026-07-06) — 完整宪法
3. **品牌/品类/3 locale 规则**: `AGENTS.md` (§1 / §11 / §13.4 / §13.10 / §13.13 / §13.14 / §13.16)
4. **调度算法 + 7 步 verify**: `C:\Users\Administrator\.mavis\agents\mavis\skills\zprintpro-seo-evolve\SKILL.md`
5. **矩阵数据源**: `F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json`
6. **教科书评分**: `docs/audit-en-multi-market-2026-06-19.md` §1.1 (4 元素标准)

---

## 🗺️ 工作目录地图 (F:\zprintpro-nextjs)

```
F:\zprintpro-nextjs\
├── AGENTS.md                    # 品牌/品类/3 locale 规则 (§11/§13.x)
├── .hermes/
│   ├── context.md               # ⭐ 宪法 SSoT (v4)
│   ├── industry-keyword-matrix.json   # 调度数据源
│   ├── cron-prompts/mavis/      # 4 cron 母版
│   ├── memory/MEMORY.md         # 项目专属 memory
│   ├── logs/                    # 运营记录 (中间产物, **不是** 最终交付)
│   └── working-directory-brief.md  # ⭐ 本文件 (开机速查)
├── src/
│   ├── app/[locale]/            # 8 locale 路由
│   ├── data/
│   │   ├── products.ts          # 84 SKU 真理源
│   │   ├── blog-posts.ts        # BlogPostMeta 列表
│   │   ├── blog-data/<locale>.json  # ⭐ 博客内容 (tsconfig 解析路径)
│   │   ├── sku-seo-data.ts      # SKU SEO 数据
│   │   └── image-alt-map.ts     # 类目 alt 映射
│   └── lib/
│       ├── h1-builder.ts        # H1 模板 (v1/v2)
│       ├── seo.ts
│       ├── pricing.ts
│       └── airwallex.ts
├── public/                      # 静态资源 (注意: blog-data 不在这)
├── scripts/                     # 编译/SEO/审计 工具集
├── docs/                        # 审计/计划/教科书评分
├── patches/                     # SEO 补丁
├── seo-research/                # 竞品研究
├── supabase/                    # DB 迁移
├── wrangler.toml                # CF Pages 配置
├── next.config.js
├── package.json
└── build.log / build3.log       # 最近部署日志
```

**注意**:
- ❌ `public/blog-data/` 是 **dead code** (tsconfig paths 解析到 `src/data/blog-data/`)
- ✅ 写博客 → `src/data/blog-data/<locale>.json`

---

## 📌 单一真源 (Single Source of Truth) 索引

| 主题 | SSoT 位置 |
|------|----------|
| 品牌/品类/3 locale 硬约束 | `AGENTS.md` (§1/§11/§13.x) |
| 宪法 / 4 cron / 4 sub-task / 7 步 verify | `.hermes/context.md` |
| 调度算法 / 4 cron 差异 | `SKILL.md` §3.8 |
| 行业 × Tier 关键词矩阵 | `.hermes/industry-keyword-matrix.json` |
| NAP / 真实主体 | `AGENTS.md` + `siteConfig` |
| 4 cron 母版 | `.hermes/cron-prompts/mavis/<name>.md` |
| 教科书 4 元素标准 | `docs/audit-en-multi-market-2026-06-19.md` §1.1 |

**改业务规则 = 改 SSoT, 改 cron prompt 不算升级**。本文件不持有规则, 只指向 SSoT。

---

**Updated**: 2026-07-14 (v1 — 工作目录开机速查)
**Source 真源**: `.hermes/context.md` v4 (2026-07-06) + `AGENTS.md` §11/§13.x + `SKILL.md` (2026-07-08) + `docs/audit-en-multi-market-2026-06-19.md`
**Author**: Mavis orchestrator (user 授权)
