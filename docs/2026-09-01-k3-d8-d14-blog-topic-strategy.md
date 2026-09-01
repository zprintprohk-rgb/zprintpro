# D8-D14 7 篇选题战略层 SOP (K3 9/1 09:46 拍板 立即启动)

**拍板来源**: K3 9/1 09:46 "D 7 篇选题 D8-D14 🟡 待 K3 拍板 (战略层 9/1 立即启动) → ✅ 立即启动"
**前置依据**: `docs/2026-08-31-v2-30day-sprint-daily-plan.md` §2 (D8-D14 7 篇选题清单)
**配套**: D4 内链矩阵 9/4 + D12 CTR 验证窗关闭 + 9/13 首批合批
**核心方法**: 1 篇/天 (W2 全周) + 内容深度 (答案块 + FAQ schema + ≥3 内链) + 战略层文案预制, M3 只做实现

---

## §0 D8-D14 7 篇选题一览表 (战略层 9/1 立即启动, M3 9/8 起每日 1 篇落地)

| 日 | 日期 | locale | 选题 | 簇 | 内链目标 | K3 真人动作 | 交付物 |
|----|------|--------|------|------|----------|-------------|--------|
| **D8** | 9/8 周一 | zh-hk | 《食品包裝印刷完全指南》 | G1 头号词 | 食品包頁 (PK-003 70edfffa) + stickers + labels | **GBP 提交 (死线)** | 文章上线 + Article/FAQ schema + ≥3 内链 + GBP 回执 |
| **D9** | 9/9 周二 | zh-hk | 《2026 月曆訂製指南》 | G5 当令 (死线 9/15 提前 6 天) | 月曆类目 + 6dcfbb67 H1 强化页 | — | 文章上线 + 内链接入月曆页 + 月曆 H1 强化已落 |
| **D10** | 9/10 周三 | zh-hk | 《利是封設計與印刷指南》 | CNY 预埋 (距 CNY ~5 月) | 利是封类目 + 月曆 + 賀卡 (业务子类目) | — | 文章上线 + 内链接入利是封页 + 喜帖/賀卡 cross-link |
| **D11** | 9/11 周四 | en | 《Small Batch Sticker Printing: MOQ, Materials & Pricing》 | G1 簇 (stickers) | stickers 类目 + 客製化貼紙 + 防水貼紙 | — | 文章上线 + 内链接入 stickers 类目 + Sticker Mule 对标 |
| **D12** | 9/12 周五 | en | 《China Catalog Printing: A Buyer's Guide for US Businesses》 | G3 簇 (brochures/booklets) | brochures 类目 + booklets + catalogs | **CTR 验证窗关闭** — 导出 GSC 对比 8/29 批次 31 词 CTR 前后值 | 文章上线 + CTR 判定原始数据存档 (.hermes/logs/ctr-d12-2026-09-12.json) |
| **D13** | 9/13 周六 | ja | 《クラフト紙パッケージ印刷ガイド》 | G3 簇 (kraft paper packaging) | 紙袋类目 + 包裝盒 + 牛皮紙袋 | — | 文章上线 + CTR 判定报告 + 二次修复清单 (仍 0 点击的词进 title v2) |
| **D14** | 9/14 周日 | ja | 《教材・教科書の印刷製本》 | G3 簇 (textbook binding) | booklets 类目 + 書刊 + 同人誌 | — | 文章上线 + 7 篇全量接入内链矩阵 + W2 复盘 + **Gate 2 验收** |

---

## §1 7 篇内容深度统一标准 (K3 9/1 09:46 战略层强制)

### §1.1 答案块 (Answer Block) — 每篇首屏必含

| 字段 | 长度 | 例子 (D8 食品包頁) |
|------|------|---------------------|
| **核心问题** | 1 句, ≤30 字 | "食品包裝印刷怎麼選?100本起印,FDA 級內襯,香港 4 天交貨" |
| **数字钩子** | MOQ + 价格 + 交期 3 件套 | "100本起印 · HK$4 起/個 · 4 天交貨" |
| **信任锚点** | 4 项 (ISO / 真实订单 / 出口 / 案例) | "ISO 9001 · 4,500+ 訂單 · 出口 32 國 · 海德堡印刷" |
| **CTA** | 1 主 CTA (WhatsApp 浮窗 OR 表单 3 字段) | "WhatsApp 報價 / 立即報價" |

### §1.2 FAQ Schema (必含, per V2.0 §6.3)

- **4-6 FAQ** (问句型长尾, 提升长尾排名)
- 必含: 工艺 / 材质 / MOQ / 交期 / 价格 / 出口 6 大类问题

### §1.3 内链接入 (≥3 条, per V2.0 §6.4)

| 类型 | 数量 | 例子 (D8) |
|------|------|-----------|
| **核心产品页** | 1 | `/zh-hk/product/food-boxes/` (PK-003 70edfffa 已强化) |
| **品类页** | 1 | `/zh-hk/category/packaging-boxes/` |
| **辅助博客** | 1+ | `/zh-hk/blog/fsc-certified-printing-guide/` (0c2e9803) + `/zh-hk/blog/2027-calendar-printing-guide/` |
| **业务子类目 (豁免)** | 0-1 | `/zh-hk/category/greeting-cards/` (D10 用) |

### §1.4 Schema 必含 (per V2.0 §6.3)

- **Article** (基础)
- **FAQPage** (FAQ 必含)
- **BreadcrumbList** (导航)
- **ImageObject** (封面图 alt 含主关键词, 选填)
- **Organization** (footer 复用)

---

## §2 写作交付物 (M3 + 战略层分工)

### §2.1 战略层交付 (9/1-9/7, K3 + 战略层文案预制)

| 交付 | 截止 | 责任 |
|------|------|------|
| 7 篇选题标题 (zh-hk/en/ja 3 段各 1 套) | 9/3 | K3 + 战略层 |
| 7 篇答案块 (3 段各 1 套, 数字钩子 + 信任锚点 + CTA) | 9/4 | K3 + 战略层 |
| 7 篇 FAQ 4-6 条 (3 段各 1 套) | 9/5 | K3 + 战略层 |
| 7 篇内链清单 (matrix.valid_internal_links 复用) | 9/6 | M3 + 战略层 |
| D8 GBP 提交回执 (K3 真人动作, 死线 9/8) | 9/8 | K3 必亲自 |

### §2.2 M3 交付 (9/8-9/14, 每日 1 篇落地)

| 交付 | 时间 | 工具 |
|------|------|------|
| D8 食品包頁 zh-hk 落地 | 9/8 10:15 | zprintpro-daily-content cron |
| D9 月曆 zh-hk 落地 | 9/9 10:15 | zprintpro-daily-content cron |
| D10 利是封 zh-hk 落地 | 9/10 10:15 | zprintpro-daily-content cron |
| D11 stickers en 落地 | 9/11 10:15 | zprintpro-daily-content cron |
| D12 catalog en 落地 + CTR 验证窗关闭 | 9/12 10:15 | zprintpro-daily-content cron + zprintpro-gsc-feedback-loop |
| D13 kraft ja 落地 + CTR 判定报告 | 9/13 10:15 | zprintpro-daily-content cron |
| D14 textbook ja 落地 + W2 复盘 + Gate 2 | 9/14 22:00 | zprintpro-daily-content cron + 周报 |

---

## §3 调度算法升级 (per §0.30 v3 关键词价值分层 + 重点带钱词地图 v2)

### §3.1 D8-D14 簇分类 (per GSC 8/31 + 重点带钱词地图 v2)

| 簇 | 主导意图 | GSC 实证 | 7 篇分布 |
|----|----------|----------|----------|
| **G1 头号词** | 印刷/訂製/批發 | zh-hk 28d CTR 2.63%, 7d CTR 2.32% 上升 | D8 (食品包頁) + D11 (stickers) |
| **G3 簇** | 包装/出口/ToB | en/ja 28d CTR 0.53%/1.77% | D12 (catalog) + D13 (kraft) + D14 (textbook) |
| **G5 当令** | 季节性 | 月曆 9/15 死线 | D9 (月曆) |
| **CNY 预埋** | 事件型 | 利是封 距 CNY ~5 月 | D10 (利是封) |

### §3.2 7 篇标题规范 (per §0.29 v2 升级, K3 9/1 02:58 GLM 拍板)

- **半角当量 50-60** (zh-hk 25-30 全角, en 50-60 chars, ja 21-30 全角+半角)
- **字符体检 3 行**: 满格线 ≥55 禁加 / 不足线 <45 按序补 / 跨语言污染零容忍
- **不上第 2 个长尾**: 1 主词 + 1 长尾 + 1 数字钩子 + 品牌
- **跨语言污染校验**: zh-hk 不出日文, en 不出中日, ja 不出简体

### §3.3 重点带钱词地图 v2 (3 语言 × T1-T4, 32 词核心)

#### zh-hk T1 速赢窗 5 词 (D8/D9/D10 优先)

1. **食品包裝印刷** (D8 头号)
2. **月曆訂製** (D9 死线 9/15)
3. **利是封印刷** (D10 CNY 预埋)
4. **貼紙印刷** (G1 簇, 验证窗监控中)
5. **禮盒訂製** (D8 内链目标, 业务子类目豁免)

#### en T1 速赢窗 5 词 (D11/D12 优先)

1. **custom stickers** (D11 G1)
2. **small batch sticker printing** (D11)
3. **china catalog printing** (D12 G3)
4. **custom packaging boxes** (D12 跨链)
5. **kraft paper packaging** (D13)

#### ja T1 速赢窗 5 词 (D13/D14 优先)

1. **クラフト紙パッケージ** (D13)
2. **教材印刷** (D14)
3. **同人誌印刷** (D14 跨链)
4. **食品パッケージ** (D13 跨链)
5. **短納期印刷** (D13/D14 通用)

---

## §4 内链矩阵接入 (per D4 9/4 配套)

### §4.1 D8-D14 内链规划

- **D8 (食品包頁 zh-hk)**: 食品包頁 PK-003 + packaging-boxes 类目 + FSC 證書 blog (0c2e9803)
- **D9 (月曆 zh-hk)**: 月曆类目 + 6dcfbb67 H1 强化页 + 賀卡 (业务子类目)
- **D10 (利是封 zh-hk)**: 利是封类目 + 喜帖 (业务子类目) + 燙金工艺 blog
- **D11 (stickers en)**: stickers 类目 + 客製化貼紙 + Sticker Mule 竞品对标
- **D12 (catalog en)**: brochures 类目 + booklets + china-catalog-printing 服务页
- **D13 (kraft ja)**: 紙袋类目 + 包裝盒 + 牛皮紙袋 + ジープリント 品牌埋点 (per §13.16.1)
- **D14 (textbook ja)**: booklets 类目 + 書刊 + 同人誌 + ZprintPro 品牌埋点

### §4.2 黑名单 (per V2.0 §5.2 验证窗纪律)

- ❌ **D5-D12 验证窗内 8/30 31 词** 改前 31 段 + 改后 31 段不可反向链入
- ❌ **en small batch 3 词** (D3 #3 #4 #5 冻结) 不可链入
- ❌ **31 词窗内所有页面** 不可作为锚文本

---

## §5 Gate 2 验收 (D14 9/14, per V2.0 §0)

### §5.1 7 项硬指标

| # | 指标 | 通过条件 | 验证工具 |
|---|------|----------|----------|
| 1 | **7/7 上线** | D8-D14 7 篇全部 src/data/blog-data/<locale>.json 落盘 + src/data/blog-posts.ts 注册 + articleSlugs 数组 + sitemap 重建 | `git log` + `find src/data/blog-data/ -name '*.json' \| wc -l` ≥ 7 |
| 2 | **CTR 判定完成** | 8/29 批次 31 词 CTR 前后对比报告落 `.hermes/logs/ctr-d12-2026-09-12.json` (含数据来源行) | `cat .hermes/logs/ctr-d12-*.json` 字段完整 |
| 3 | **食品包頁曝光数据** | 70edfffa zh-hk GSC 7d 数据 ≥10 imp | GSC 9/12 7d 拉取 |
| 4 | **7 篇 ≥3 内链** | 每篇 ≥3 条 valid_internal_links, 全部 200 | `grep -c 'href' src/data/blog-data/<locale>.json` ≥ 3 + curl 200 |
| 5 | **D12 验证窗关闭** | 8/30 31 词 9/5-9/12 冻结 8 天, GSC 监控 5 词首屏 + CTR 0.79% 基线 + 食品包頁 41 imp pos 6.4 CTR 0% | GSC 9/12 拉取 + 对比 |
| 6 | **D8 GBP 回执** | GBP 9/8 提交, K3 必亲自, 提交回执存档 | `.hermes/logs/gbp-d8-2026-09-08.json` |
| 7 | **5 个 schema 落地** | Article / FAQPage / BreadcrumbList / ImageObject / Organization 每篇必含 | `curl -s <url> \| grep -E 'Article\|FAQPage\|BreadcrumbList'` ≥ 3 |

### §5.2 异常处理

- **任一不过 = M3 自主修复至通过, 24h 内升级 K3**
- **D12 CTR 判定报告若 31 词全部 0 clk**: 升级 K3, 9/13 验证期后首批合批触发 (per §0.29 v2 验证窗纪律)

---

## §6 跨 cron 协作 (per §0.28 1 cron 1 交付物红线)

| Cron | D8-D14 角色 | 交付物 |
|------|-------------|--------|
| **zprintpro-daily-content** | 主战场, 每日 10:15 落地 1 篇 | src/data/blog-data/<locale>.json + blog-posts.ts + sitemap |
| **zprintpro-blog-deepfix** | 每日 11:00 跟进深度修复 | 答案块 / FAQ / 内链密度 |
| **zprintpro-gsc-feedback-loop** | 周三 15:00 拉 GSC + D12 CTR 验证 | matrix.next_due 加权 + ctr-d12-2026-09-12.json |
| **zprintpro-weekly-meta-refresh** | 周一 11:00 类目 meta refresh | 类目页 H1 加行业最广关键词 |
| **zprintpro-monthly-matrix-audit** | 9/1 14:00 + 10/1 14:00 audit | matrix 覆盖率 + orphan 仓库 |

**5 cron SSoT v6.2 升级同步** (K3 9/1 09:46 拍板): 5 .md + 5 _v6-prompt-*.txt + 1 dispatch header + 1 JSON payload = 12 文件

---

## §7 SOP-10 5 问 + 数据来源 (per §0.22 + §0.23 强制级)

### §7.1 §0.22 SOP-10 5 问

1. **架构差异**: 7 篇按 V2.0 daily plan §2 D8-D14 已规划, 不冲突 daily-content cron 既有结构
2. **约束适用范围**: K3 9/1 09:46 派活包授权 D8-D14 立即启动, 不需 §0.6 紧急修复
3. **原数据/拍板来源**: V2.0 daily plan 8/31 已落 (`docs/2026-08-31-v2-30day-sprint-daily-plan.md` 12.6KB) + K3 9/1 09:46 拍板
4. **字段值策略**: 7 篇内容必含答案块 + FAQ + ≥3 内链, 不留联系方式, business-cards 主营误用禁
5. **Markdown 渲染**: 答案块 / FAQ 必含 [text](url) → 走 `parseInlineLinks()` 工具

### §7.2 §0.23 数据来源

- 7 篇选题 = V2.0 daily plan §2 D8-D14 (8/31 落)
- GSC 8/31 12 Excel = `_gsc_read_v2_2026-09-01.py` 重新汇总
- 重点带钱词地图 v2 = 9 角色战略报告 §1.2 (41KB, 9/1 09:30 落)
- 验证窗纪律 = §0.29 验证窗纪律 + K3 8/30 18:47 选项 A + K3 9/1 02:58 GLM 拍板
- D4 内链矩阵 = 9/4 配套 (per K3 8/30 12:51 暗示 "早执行 早收益")
- 5 cron SSoT v6.1 = 2bdacde3 9/1 03:30 落, v6.2 升级同步

---

## §8 关键风险 + 兜底

| 风险 | 触发 | 兜底 |
|------|------|------|
| **D8 GBP K3 未拍** | 9/8 K3 未提交 GBP | M3 9/7 23:00 升级 K3, GBP 9/8 死线 = 当日提交 |
| **31 词改可能 4-7 天 0 流量** | 9/13 首批合批后 GSC 骤降 | 9/15 验证 + 9/20 复盘, 准备二次修复清单 (per D13) |
| **战略层文案预制延迟** | K3 + 战略层 9/3-9/7 未按时交付 | M3 9/3 23:00 升级 K3, 缺答案块/FAQ 不上线 |
| **M3 30 min 间隔撞车** | 多 cron 同期 push | §0.25.9 v3 攒批优先 + K3 派活包豁免覆盖 |
| **§0.30 v3 关键词分层冲突** | 7 篇簇分配与重点带钱词地图 v2 不一致 | 7 篇按 §3.1 簇分类执行, 偏离升级 K3 |

---

## §9 教训固化源头

- V2.0 daily plan 8/31 落 (D8-D14 7 篇选题清单, 12.6KB)
- 9 角色战略报告 §1.2 重点带钱词地图 v2 (41KB, 9/1 09:30 落)
- K3 9/1 09:46 "D 7 篇选题 D8-D14 立即启动 + E ToB SOP D25 启动 + 新版标题规则写进技能 + 同步更新定时任务指令"
- §0.29 v2 K3 9/1 02:58 GLM 拍板升级 (半角当量 + 字符体检 3 行 + 跨语言污染)
- §0.30 v3 关键词价值分层 + 重点带钱词地图 v2 (per V3.0 K3 9/1 09:31 拍板)
- 5 cron SSoT v6.1 (2bdacde3 9/1 03:30 落) → v6.2 升级同步
- 跨项目 P0: 7 篇选题 D8-D14 + ToB SOP D25 = 战略层启动标准动作
