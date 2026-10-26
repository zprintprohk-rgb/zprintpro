# 2026-10-26 退场词/进攻面 title 修复 + C4 价格架构分析 — 执行报告

> 执行依据: K3「穷尽 100% 能力分析研究后继续执行 NEXT 清单」· 数据诚信: 本报告含数据来源行

## VERDICT
- ✅ **5 个 SEO title 修复已上线**（blog-posts.ts 真渲染源 + blog-data JSON 双源同步），线上探针 5/5 PASS
- ✅ **C4 价格架构分析包完成**（docs/2026-10-26-c4-price-architecture-analysis.md，A/B/C 方案供 K3 拍板）
- ✅ **lane 缺口修正**：确认 3 个真实缺口（上轮只报 2 个）
- 🔴 待 K3：C4 方案选定（a2/a1/white-card 硬伤 + A/B 类孤儿校准）、lane 缺口管理员排查

## CONSUMED
- lane-status（3 天，7 lane）/ products.ts 31 SKU 三语字段 dump / price-tables {books,posters,flyers,stickers}.json 全档 dump / GSC 退场词（gsc-query-country-2026-10-25.json 1,562 rows）/ title-window-freeze.ts 冻结槽 / blog-posts.ts + blog-data JSON 双源核对

## DELIVERED

### 1. 退场词 title 修复（GSC 零点击词，pos 1.0）
| slug | locale | 旧 title | 新 title | SSoT 支撑 | 当量 |
|---|---|---|---|---|---|
| cny-2027-red-packet-printing-guide | ja | 箔押し 100 枚から **HK$1.1** 起（币种错） | 100枚から **¥64 起** | red-packets ja=64 ✓ | 54 |
| saddle-stitch-booklet-printing-guide | ja | 完全ガイド：ページ数・用紙・価格（无价格数字，原 69 当量**超阻断线**） | **10冊から ¥258/冊〜 低MOQ** | saddle ja=258 ✓ | 52 |
| graduation-yearbook-printing-guide | zh-hk | 印刷指南 · 香港中學大學院校定制方案（无价格） | **HK$45起** · 香港中學大學院校定制方案 | yearbook zh=45 ✓ | 56 |

### 2. hkg 进攻面 title 强化（海報印刷 260 imps/0 点击簇）
| slug | locale | 新 title | SSoT 支撑 | 当量 |
|---|---|---|---|---|
| poster-printing-guide | zh-hk | 香港海報印刷 **HK$9起**：尺寸・紙質・工藝・設計要點 | a2 qty50=9.0/張 ✓ | 56 |
| poster-printing-price-guide | zh-hk | A1 A2 海報印刷價格 **HK$9起** 單價紙材批量折扣（原 65 当量**超阻断线**一并修正） | a2 qty50=9.0 ✓ | 51 |

### 3. C4 价格架构分析包（docs/2026-10-26-c4-price-architecture-analysis.md）
- **3 硬伤**：a2 price_range 'HK$95-1,017' 编造带（无档）/ a1 basePrice 20 无档（qty1=45）/ white-card-boxes basePrice 129 = 整批 500 个价（basePrice 语义全站不统一——title-v5 PRICE_MISMATCH 根因）
- **1 模式**：多市场定价（zh 带独立 vs en/ja 从 en USD×135-140 换算，同规格跨语价差 2-13 倍）——K3 定口径
- **A/B/C 方案**：A=最小改动+多市场保留（推荐）/ B=全球统一价（大改）/ C=只修硬伤

### 4. lane 缺口修正（3 个真实缺口）
| lane | 应跑 | LastRun/结果 | 状态 |
|---|---|---|---|
| ZP-weekly-meta | 10-24 20:52（周五） | LastRun 10-24 02:18 result 0x800710E0 | **漏跑**（10-25/26 周末正常不跑） |
| ZP-gsc-feedback | 10-25 20:13 | 10-25 无记录（result 1 停在 10-24 20:13:01） | **漏跑** |
| ZP-blog-deepfix | 10-25 23:47（周六） | last=10-24 | **漏跑（本轮补报）** |
| ZP-k3-review | 10-26 07:10 | OK（已注册在跑 ✓，推翻 §0.35.6 待办①「未注册」过时假设） | 正常 |

## 新发现（本轮深挖）
- **blog title 双源**：页面 title 渲染源 = blog-posts.ts（BlogPostMeta.title），blog-data JSON title 为内容源——两源曾漂移（本轮已同步 5 处）；**SOP-5 建议：blog title 统一由 blog-posts.ts 为 SSoT**
- **saddle zh excerpt「HK$14-57/本 (500 本)」孤儿**：vs products.ts saddle 带 6-32（57 > 32 上限）——K3 校准域新增
- **price-tables 双态**：qty10-99 = modeled 待校準模型值（线上 PDP 批价行在用）/ qty100+ = anchor/intuan 校准真值

## NEXT（K3 拍板）
1. C4 方案 A/B/C 选定 → 我执行（products.ts + blog 批量本地化 + title-v5 复检）
2. A/B 类孤儿校准（kraft-types/school-exercise/poster-price/marathon/folding/sticker-guide/same-day/zine/packaging-box/textbook ja）
3. saddle zh excerpt 14-57 校准
4. lane 缺口：需管理员查 Task Scheduler（\ZP-* 任务 result 异常，weekly-meta 0x800710E0）
5. 退场词修复效果 4 周后 GSC 复测（燙金利是封 ja pos 1.0/33 imps → 点击率）

数据来源:
- products.ts 31 SKU 三语字段 dump（2026-10-26 07:05）
- price-tables/{books,posters,flyers,stickers}.json 全档 dump（2026-10-26 07:06-07:08）
- lane-status.mjs --days=3（2026-10-26 07:31）
- GSC query×country: .hermes/logs/gsc-query-country-2026-10-25.json（1,562 rows，28d）
- title-equiv.js 当量计算（scripts/guards/title-equiv.js，官方口径）
- 线上探针: .hermes/_verify_titles.py（2026-10-26 09:04，CF build success 后 5/5 PASS）
- commits: 3fa0d559（5 title + C4 分析包）/ 8c3dd996（blog-posts.ts 双源同步）
