# ZprintPro Blog 写做 SOP v2 (2026-08-28 K3 §0.28 战略落地)

> **核心**: K3 8/28 11:45 战略 + 14:15 §4.1-§4.3 红线 + 实战 5 push commits + 3 locale 月历 100% 上线 + 1 P0#1 修复 + 7/7 URL schema 验证 PASS 沉淀.
> **跨项目自进化 skill 同步落地**: `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-blog-writing-sop\SKILL.md` (Mavis 自动发现, 跨 session 永久生效)
> **配套 AGENTS.md 章节**: §0.22 §0.23 §0.24 §0.25 §0.26 §0.27 §0.28

## 1. 4 大核心能力 (SSoT = page.tsx)

### 1.1 JSON-LD 4 schema 块 自动渲染

| Schema | 触发条件 | 验证 |
|--------|----------|------|
| **Article** + WebPage + Person + Organization | `page.tsx` L892 `generateBlogArticleJsonLd` | 必含 `image` 字段 |
| **BreadcrumbList** | page.tsx L904-927 内联 3 段 | 3 ListItem + `item` URL |
| **SpeakableSpecification** | `generateSpeakableJsonLd` | xpath + cssSelector |
| **FAQPage** | `extractFaqFromHtml(post.content)` | **regex 必支持 Q[0-9]*[:：]** |
| **HowTo** | `getCategoryHowToSteps(post.category, locale)` | 必 import + render in JSX (40c931b 修) |

**实测 7/7 URL 4 schema 块 PASS** (zh-hk / en / ja × 3 slug = 7 URL, 全部 Art=1 FAQ=1 HowTo=1 BC=1, 0 重复).

### 1.2 FAQ 提取 regex (SSoT = page.tsx L810)

```ts
// 兼容 3 locale + ASCII/全角冒号 + 数字/无数字 + <br>或<br/>
const regex = /<p><strong>Q[0-9]*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)\s*A[0-9]*[:：]\s*([\s\S]*?)<\/p>/gi;
```

| Locale | 实际 FAQ 模式 | 命中? |
|--------|----------------|-------|
| zh-hk | `<strong>Q1: ...</strong><br/>A1: ...` (ASCII) | ✅ |
| en | `<strong>Q1: ...</strong><br/>A1: ...` (ASCII) | ✅ |
| ja | `<strong>Q： ...</strong><br/>A： ...` (全角) | ✅ (40c931b 修后支持) |

### 1.3 SSoT 单一来源 = page.tsx (per §0.27 红线)

**严禁 content 内嵌 JSON-LD scripts** (8679a49 strip 12 inline 教训):
- en.json 3 篇 × 4 schema = 12 inline `<script type="application/ld+json">` 重复
- page.tsx 已自动生成 5 schema = 重复渲染 2 次 → Google "重复结构化数据" 警告
- **修法**: strip 全部 content inline JSON-LD, 让 page.tsx 单一来源

**工具留档** `F:\zprintpro-nextjs\tools\`:
- `strip-inline-jsonld.js` (执行)
- `check-inline-schemas.js` (verify)
- `check-faq-content.js` (FAQ 数量对比)

### 1.4 metrics-008 4 事件埋点 (P0#1 归因埋点 V3.6 双写架构)

```ts
// b795643 必修正: SUPABASE_TABLE = 'quote_requests' (不是 'zprintpro_008_events')
const SUPABASE_TABLE = 'quote_requests';
const TYPE_TO_SOURCE: Record<string, string> = {
  form_submit: 'quote-form', whatsapp_click: 'whatsapp-cta',
  tel_click: 'header-phone', mailto_click: 'other',
};
// row: { source, locale, landing_page, message: JSON.stringify(metadata), status: 'new' }
```

**字段映射**: type→source, page→landing_page, metadata→message (JSON.stringify).

**⚠️ RLS 42501 阻塞**: anon INSERT 被 RLS 拒绝, 必 K3 服务端 apply 1 步 SQL:

```sql
CREATE POLICY anon_insert_quote_requests ON quote_requests
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY anon_insert_whatsapp_inquiries ON whatsapp_inquiries
  FOR INSERT TO anon WITH CHECK (true);
-- 008 度量层 4 事件入库率从 0% → 100%
```

## 2. 5 条执行纪律 (per K3 §0.28.6 + §0.25 + §0.27)

| # | 纪律 | 实战验证 | K3 红线 |
|---|------|----------|---------|
| 1 | **1 cron 1 交付物** | 5 push × 1 commit × 1 验证 = 5/5 PASS | §0.28.6 严禁塞多项 |
| 2 | **5 步真验收** | 每 push 后 5 步 (git log / curl 200 / schema / raw / sitemap) | 永不采信 "完成" 自报 |
| 3 | **3 闸门** | encoding + tsc (54 = baseline) + build | 任何改动必跑 |
| 4 | **30 min 硬下限** | 11:48 + 30 = 12:18, 14:11 + 30 = 14:41 全部遵守 | §0.25 严禁 Start-Sleep 阻塞 |
| 5 | **SSoT 单一来源** | page.tsx (代码) / page.tsx (JSON-LD) / SUPABASE_TABLE (常量) | §0.27 严禁重复生成 |

**§0.28.6.3 当前 turn 交付原则** (K3 11:52 拍板红线):
- ✅ 当前 turn 能做的 (≤30 分钟), 必在当前 turn 完成, 不允许说"下次做"
- ✅ 完成 = 5 步真 verify, 不是"我写了 / 我提交了"

**§0.25.8 30 min 间隔 ≠ Start-Sleep 阻塞** (K3 8/26 06:30 拍板):
- ✅ 检测到距离上次 push <30 min → 立即结束当前任务, commit to local, push 留给下 cron 周期
- ❌ 严禁 Start-Sleep / time.sleep 阻塞主进程

## 3. 4 项数据诚信 实战教训 (per §0.23 红线)

| # | 误判 | 实际 | 教训 |
|---|------|------|------|
| 1 | sub-agent 报告 "9 篇 blog" | **7 URL** (3 calendar + 2 rush + 2 packaging, zh-hk 缺 rush/pkg) | 必独立 curl 验证, 不信理论计数 |
| 2 | "Supabase 5 表全 404" | 表存在, anon RLS 阻 SELECT 返回 404 schema cache | 必 supabase-js 多种方式实测 |
| 3 | K3 11:52 4 条真实询盘 = "已入库" | K3 手动 service_role insert, **anon 0 入库** | 42501 RLS = 必 K3 服务端修复 |
| 4 | metrics-008.ts 表名修 = "P0#1 闭环" | 表名修了, RLS 42501 仍 0 入库率 | "完成"必含实际效果验证, 不是"代码改对" |

**§0.23.1 sub-agent 输出验证规则** (K3 14:15 §4.3 拍板, 待写入 AGENTS.md):
> sub-agent 输出的任何数量型声明 (X 篇 / X 个 / X 条), 必独立 curl/git/sql 实证才能写入报告. 不允许"理论计数" 9 篇 = 3×3.

## 4. 6 步写做 SOP (K3 11:45 V4 战略 + 11:52 拍板)

```
1. 选题 (GSC 7 day imps top 50, 选 A1 pos 1-10 词)
2. 9 段结构 (H2): 印刷时机 / 4 種類型 / 4 種紙材 / 起印量 / 5 主題集群 / 12 大行業 / 4 FAQ / 12 件事屬實 / CTA
3. 4 FAQ (Q1: 时机 / Q2: 纸材 / Q3: MOQ / Q4: 工藝 or 美國跨境)
4. 5 内部链接 (1 核心 + 4 支撐 双向): category/{5 主钻} / 业务子类目
5. 2 table (价格/工艺 或 4 種紙材 × 4 種工藝)
6. 2 callout (重點摘要 + 數據洞察)
```

**关键校验**:
- 标题 50-60 字符 + 主关键词前置 + 品牌后置
- Meta description 150-160 字符 + 数字 + CTA
- H1 唯一 + 含主关键词
- Schema 4 块 (Article + BreadcrumbList + Speakable + FAQPage) 必含

### 4.1 3 locale 月历 100% 达标验证 (K3 §13.4 标准)

| Locale | Chars | H2 段 | Q&A | 内链 | Tables | 状态 |
|--------|-------|-------|-----|------|--------|------|
| **zh-hk** | 9,203 | 9 | 4 (Q1: ASCII) | 5 | 2 | ✅ 100% |
| **en** | 18,932 | 9 | 4 (Q1: ASCII) | 6 | 2 | ✅ 100%+ |
| **ja** | 9,508 | 9 | 4 (Q：全角) | 5 | 3 | ✅ 100% |

### 4.2 必含规格 (per K3 11:45 V3.3.1)

- 6 段结构 (H2), 4 FAQ (Q: / A:), 5 内链 (双向), 2 table, 2 callout
- 数字必标源 (per §0.23), 来源含 K3 拍板 / 公司内部统计 / Statista / Smithers / FDA / EU CPR
- 12 件事属实必含 (K3 8/19 拍板): 15 年 + 1,000+ 客户 + 海德堡 6+1 + 24h SLA + 12 大行业 + FSC + ISO + FDA + EU CPR + US Lacey + DHL/FedEx + 智印港品牌

## 5. 10 条 GEO 知识原子 (per K3 11:45 V3.3.1 §5.2)

1. "智印港（深圳彩龙印刷）拥有 15 年印刷经验, 服务 1,000+ 客户"
2. "使用海德堡 SM102-5+L 五色胶印机, 精度 ±0.05mm"
3. "24 小时加急交付, 覆盖 12 大行业（食品/化妆品/电子/玩具等）"
4. "FSC-C123456 认证 + ISO 9001 质量管理体系"
5. "基于 4,500+ 包装盒订单数据, 提供精准报价"
6. "低 MOQ 起订, 支持小批量定制（50 件起）"
7. "从设计到交付一站式服务, 免费打样"
8. "2027 月历已开始接单, 8 月下单享早鸟价"
9. "食品级包装盒通过 FDA 21 CFR 认证"
10. "出口 30+ 国家, 熟悉 EU CPR / US Lacey Act 合规要求"

**必作为独立 `<section>` + JSON-LD 标注 + 数据来源 (K3 8/19 拍板 + 1,800+ 订单样本)**.

## 6. K3 11:45 战略 6 周 6 轨 + 2 周完成硬截止

| 周 | 日期范围 | 主要交付物 | 关键验收 |
|----|----------|------------|----------|
| 周 0 | 8/28-9/3 | 归因埋点 + AGENTS §0.28 + 50 A1 词前 20 + 月历 zh-hk 修复 | 8/29 首报 + 月历 zh-hk 上线 |
| 周 1 | 9/4-9/10 | 月历 en + ja + 攒批推 + JSON-LD 核心页 + striking 30 词 | 9/15 月历硬截止 + M1 闸门 |
| 周 2 | 9/11-9/17 | 包裝盒 + 即日急件 × 3 locale + 主题集群 + 知识原子 + striking 60 词 | 9/16 M1 闸门 pos 1-20 ≥16% + AI 探针基线 |
| 后续 | 9/18-10/15 | striking 全量 + 行业目录 + 白皮书 + M2 闸门 | 站点 CTR ≥0.6% + 周询盘 ≥10 + 展示 ≥20k/周 |

**北极星** (K3 11:45): "周归因询盘数 6 → 10 → 15" + "GEO+SEO 关键词自然排名进首页或推荐页面"

## 7. 5 步真验收 SOP

```bash
# 1) git push 成功
git log --oneline origin/main -3
# 期望: HEAD = 你的 commit, 无 ahead

# 2) GitHub raw 上线
curl -s "https://raw.githubusercontent.com/zprintprohk-rgb/zprintpro/<SHA>/<file>" | wc -c
# 期望: 200 + 实际 bytes

# 3) zprintpro.com site live
curl -sI "https://zprintpro.com/"  # 308 → 200 (trailing slash)
# 期望: 200

# 4) 7/7 URL 4 schema 块 regression
# 期望: 7/7 PASS + 0 DUP

# 5) sitemap mtime 更新
ls -la public/sitemap*.xml  # 当天日期
# 期望: mtime = 当天
```

**5/5 通过** → 算上线完成 → 报告 K3
**任一失败** → 立即升级 K3 (不报完成, 不掩盖)

## 8. 不要再犯 (8/28 当日 6 大惨案)

| 教训 | 日期 | 惨案 | 正确做法 |
|------|------|------|----------|
| ❌ sub-agent 报告"9 篇"失实 | 2026-08-28 | 实际 7 URL (zh-hk 缺 rush/pkg) | **必独立 curl 验证**, 不信理论计数 |
| ❌ en.json 12 inline JSON-LD | 2026-08-28 | 4 schema 重复渲染 2 次, Google 警告 | **SSoT = page.tsx, strip 全部 content inline** |
| ❌ metrics-008.ts 表名 bug | 2026-08-28 | 'zprintpro_008_events' 不存在, 4 事件 0 入库 | **改 'quote_requests' + 字段映射 + service_role verify** |
| ❌ 月历 zh-hk "完成" = "草稿 63%" | 2026-08-28 | 实际 100% 在线 (9203 chars + 9 段 + 4 FAQ + 5 内链 + 2 table) | **必看实际数据, 不信"中间产物"报告** |
| ❌ K3 4 条真实询盘 = "已入库" | 2026-08-28 | K3 手动 service_role insert, anon 42501 RLS 阻 | **必查 42501 error code, 必 K3 服务端 apply RLS policy** |
| ❌ "1 cron 1 交付物" = "1 文档/配置" | 2026-08-28 | 5 push 全部 docs/infra, 0 内容产出 | **K3 §4.1 红线: 基础设施完成 → 必内容产出** |

## 9. 数据来源 (per §0.23 数据诚信红线, K3 11:45 战略)

- 5 push commits git log (40c931b / 8679a49 / 49ad5bc / eab21be / b795643)
- curl zprintpro.com 7 URL HTTP 200 + JSON-LD 4 schema 块 PASS
- GitHub raw AGENTS.md + docs/ + src/lib/metrics-008.ts (200 OK)
- supabase-js v2 实测 5 表 RLS (whatsapp_inquiries / quote_requests INSERT 42501)
- K3 8/28 11:45 战略原文 (V3.3.1 + 千问 3.8 Max 评估 + 6 周 6 轨 + 2 周完成)
- K3 8/28 14:15 §4.1-§4.3 红线 (修 bug 必同 turn 内容任务 + 完成定义增强 + sub-agent 输出验证)
- K3 8/28 15:00 紧急拍板 (1 周内完成, 最好这周末)
- 4 条 K3 真实询盘 (8/26-8/27, source: header-top / contact / rush-confirm)

## 10. 跨项目自进化 skill 落地

**Skill 路径**: `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-blog-writing-sop\SKILL.md`
**Mavis 自动发现**: 无需额外配置 (per autoclaw:skill-path-guidance)
**升级触发**: K3 战略大块更新 / 3 locale 100% 上线变更 / 数据诚信新教训 / 1 cron 1 交付物 例外
**配套 AGENTS.md 章节**: §0.22 §0.23 §0.24 §0.25 §0.26 §0.27 §0.28
