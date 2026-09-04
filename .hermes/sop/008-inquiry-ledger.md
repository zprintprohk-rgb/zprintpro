# 008 询盘台账 SOP (K3 v3.3 §5 转化漏斗 关键基础设施)

> **来源**: K3 v3.3 §5 转化漏斗 + D-9/2-44 §14.4 #8 (008 台账本周启用 默认决策)
> **校准日期**: 2026-09-04
> **配套**: `.hermes/decision-register.md` D-9/2-44 + `src/lib/whatsapp.ts` (已具备 #src= 采集能力)
> **状态**: 🟡 IN_PROGRESS (K3 9/4 9:30 拍板本周启用 → 9/5 16:20 启用)
> **作者**: M3 (Mavis) Worker
> **北极星关联**: 12 月 $20k/月 = B2B 复购 50% ($10k) + SEO 35% ($7k) + GEO 15% ($3k) — 此 SOP 度量北极星 50% 引擎

---

## 1. 询盘台账目标

### 1.1 战略定位

**008 台账 = 北极星 50% 引擎 (B2B 复购 $10k/月) 度量基础设施**

| 维度 | 当前 (9/3 实测) | 9/16 目标 | 度量手段 |
|------|----------------|-----------|----------|
| 7d clicks | 12 | ≥25 | GSC 校准 (现有) |
| 首页词数 | ~3 | ≥8 | GSC 校准 (现有) |
| **询盘 (台账)** | **0 度量** | **≥2 条/周** | **008 台账 (本周启用)** |
| 询盘→成交转化率 | 未度量 | ≥30% (推演) | 008 台账 + 手动回填 |
| 客单价 | 未度量 | ≥$500 USD | 008 台账 成交金额字段 |
| 复购率 | 未度量 | ≥40% (推演) | 008 台账 复购标记字段 |

### 1.2 三条断裂的修复对应

```
GSC 2,207 imps/7d → 12 clicks (CTR 0.54%) → 询盘 ~0 (度量缺失) → 成交走转账 (零归因)
```

| 断裂点 | 度量缺口 | 008 台账修复动作 |
|--------|----------|------------------|
| ① 首页零点击 | 223 imps 浪费 | GSC 摘果 (per v3.3 §4 P0-1) — 已在跑 |
| ② 落地页→询盘 | 无度量 | WhatsApp ?text=#src= 已具备, 008 台账承接 |
| ③ **询盘→成交** | **零归因** | **008 台账 人工回填 (此 SOP 主体)** |

### 1.3 为什么是手动台账不是支付系统

**K3 v3.3 §5.2 拍板**: 成交以转账/线下为主, 无在线支付闭环 (per user_profile 2026-06-25 拍板: 深圳主体不开 Airwallex/HK 子公司)。**手动台账 2 周就能跑通** (推演: 每单回填耗时 <1 分钟), 不要等支付系统。

**唯一可行的归因** = WhatsApp/邮件/报价单手动台账 + 成交转账时人工回填。**008 表启用 = 北极星 50% 引擎何时可度量的分水岭**。

---

## 2. 询盘入口全清单 (5 类)

### 2.1 5 类入口矩阵

| # | 入口 | src 参数 | 度量机制 | 当前 9/3 状态 |
|---|------|----------|----------|---------------|
| 1 | **网站 WhatsApp 浮动按钮** (site-wide) | `whatsapp-floating` | `src/lib/whatsapp.ts` `source='floating'` + Plausible/GA 事件 + 询盘落库 | 已上线 (9/3 3 处) |
| 2 | **5 Pillar blog 顶/底 WhatsApp CTA** | `whatsapp-pillar-top` / `whatsapp-pillar-bottom` | 同上 + Pillar 上下文 | 已上线 (9/3 3 处) |
| 3 | **报价表单 5 字段** (公司/品类/数量/交期/联系方式) | `quote-form` | Supabase `quotes` 表 + 询盘落库 (per `trackQuoteRequestFromWhatsApp`) | 已上线 |
| 4 | **邮件询盘** (zprintpro@outlook.com) | `email` | 邮件主题 prefix `[src=...]` + 手工录入 | 待落地 (9/5 启用) |
| 5 | **跨境平台** (Alibaba / Global Sources 等) | `cross-border` | 平台 IM 转 WhatsApp + 手工录入 src | 待落地 (9/5 启用) |

### 2.2 入口 src 命名规范 (per `src/lib/whatsapp.ts` WhatsAppContext.source)

**已落地命名** (per src/lib/whatsapp.ts 现有用法):
- `hero-banner` (首页 Hero 区)
- `product-detail` (PDP 详情页)
- `calculator` (报价计算器)
- `contact` (联系页)
- `footer` (页脚)
- `whatsapp-cta` (通用 CTA 触发)
- `floating` (浮动按钮)

**008 台账专用 src 命名 (5 入口顶层命名 + 位置扩展)**:
```
src=whatsapp-floating                # 入口 1
src=whatsapp-floating&pos=hero      # 入口 1 细分位置 (扩展字段)
src=whatsapp-pillar-top             # 入口 2 Pillar 顶部
src=whatsapp-pillar-bottom          # 入口 2 Pillar 底部
src=whatsapp-pillar-mid             # 入口 2 Pillar 中部 (新加, per 9/4 9:30 校准)
src=quote-form                       # 入口 3 报价表单
src=email                            # 入口 4 邮件询盘
src=cross-border                     # 入口 5 跨境平台
src=cross-border&platform=alibaba    # 入口 5 细分平台
```

### 2.3 5 入口上线时序

| 日期 | 入口 | 上线动作 | 负责 |
|------|------|----------|------|
| 9/3 | 1+2+3 | WhatsApp 浮动 + Pillar 顶/底 + 报价表单 (per b11ad573) | M3 已完成 |
| 9/5 | 4 | 邮件主题 prefix `[src=email]` 协议 + 自动规则 | M3 出稿, K3 确认 |
| 9/5 | 5 | Alibaba/Global Sources IM 转发 WhatsApp 协议 | M3 出稿, K3 确认 |

---

## 3. 字段定义 (台账 schema)

### 3.1 主字段表 (11 个核心字段)

| # | 字段名 | 类型 | 必填 | 来源 | 说明 |
|---|--------|------|------|------|------|
| 1 | `inquiry_id` | string | Y | auto | 询盘 ID 格式: `ZL-YYYYMMDD-NNN` (例: `ZL-20260906-001`) |
| 2 | `inquiry_timestamp` | datetime | Y | auto | 询盘接收时间 (ISO 8601, +08:00) |
| 3 | `src` | string | Y | auto/manual | 5 入口顶层 src (per §2.2) |
| 4 | `company` | string | Y | manual | 公司名称 (从 WhatsApp 文本/表单/邮件抽取) |
| 5 | `contact_name` | string | Y | manual | 联系人姓名 |
| 6 | `phone` | string | Y | manual | 联系电话 (门童 #2 验证必须是 K3 唯一号 +86 198 8085 1334 或真实客户号) |
| 7 | `email` | string | N | manual | 邮箱 (optional) |
| 8 | `category` | enum | Y | manual | 询盘品类 (8 大主营: 咭片/包裝盒/貼紙/喜帖/月曆/利是封/校園印刷/燙金/其他) |
| 9 | `quantity` | int | N | manual | 数量 (optional, 报价表单必填) |
| 10 | `deadline` | date | N | manual | 交期 (optional) |
| 11 | `budget` | decimal | N | manual | 预算 (optional, HK$) |

### 3.2 跟进 + 成交字段 (8 个状态字段)

| # | 字段名 | 类型 | 必填 | 来源 | 枚举/格式 |
|---|--------|------|------|------|-----------|
| 12 | `status` | enum | Y | manual | NEW / QUOTED / NEGOTIATING / WON / LOST |
| 13 | `quoted_price` | decimal | N | manual | 报价金额 (HK$, 仅 QUOTED 状态) |
| 14 | `quote_date` | date | N | manual | 报价日期 |
| 15 | `won_amount` | decimal | N | manual | **成交金额 (HK$, 仅 WON 状态) — 唯一归因动作** |
| 16 | `won_date` | date | N | manual | 成交日期 (转账到账日) |
| 17 | `is_repeat` | bool | Y | manual | 复购标记 (Y/N) — 第 1 笔 vs 第 2+ 笔 |
| 18 | `repeat_count` | int | N | manual | 复购次数 (1=第 2 笔, 2=第 3 笔...) |
| 19 | `notes` | text | N | manual | 备注 (跟进过程/客户偏好/产品细节) |

### 3.3 字段合计 = 19 个

**核心 11 + 状态 8 = 19 字段**。第 1-2 字段 (inquiry_id + timestamp) auto 生成, 第 3 字段 (src) auto/manual 混合, 第 4-19 字段全部 manual 录入。

### 3.4 询盘 ID 命名规范 (inquiry_id)

**格式**: `ZL-YYYYMMDD-NNN`
- `ZL` = ZprintPro 缩写
- `YYYYMMDD` = 询盘日期 (per K3 拍板, 跟决策登记簿 D-9/2-NN 命名一致)
- `NNN` = 当日 3 位流水号 (001, 002, ... 999)

**示例**:
- `ZL-20260906-001` = 9/6 第 1 条询盘
- `ZL-20260915-007` = 9/15 第 7 条询盘 (季节内容硬截止日)

**生成规则** (manual 录入时): K3 打开 008 台账, 查最大流水号 +1, 写入新行。

### 3.5 8 大主营品类 (category 枚举)

| 枚举值 | 中文 | 主营定位 |
|--------|------|----------|
| `card` | 咭片 | B2B 复购王, 8 旺季节点全占 |
| `packaging-box` | 包裝盒 | 2026 9-10 月大旺季, 复购率最高 |
| `sticker` | 貼紙 | B2C 高频 (DIY/校园/活动), 防水類复购稳定 |
| `wedding-invitation` | 喜帖 | 季节强 (3-5 月 + 10-12 月), 9/15 硬截止 |
| `calendar` | 月曆 | **9 月做 2027 月曆客户名单**, 复购发动机 #1 |
| `red-pocket` | 利是封 | 12-1 月旺季, 9 月预热 |
| `campus-print` | 校園印刷 | 8-9 月开学季, 复购中等 |
| `foil-stamp` | 燙金 | 高客单 ($500+), B2B 大单 |
| `other` | 其他 | 兜底分类 |

---

## 4. src 参数采集 SOP

### 4.1 WhatsApp ?text=#src= 格式 (入口 1+2)

**已具备能力** (per `src/lib/whatsapp.ts` `generateWhatsAppLink` 现有实现):

```typescript
// src/lib/whatsapp.ts 现有实现
const trackingParams: string[] = [];
if (ctx.source) trackingParams.push(`src=${ctx.source}`);
if (ctx.productName) trackingParams.push(`sku=${encodeURIComponent(ctx.productName)}`);
if (ctx.size) trackingParams.push(`size=${encodeURIComponent(ctx.size)}`);
if (ctx.material) trackingParams.push(`mat=${encodeURIComponent(ctx.material)}`);
if (ctx.quantity) trackingParams.push(`qty=${ctx.quantity}`);
const hash = trackingParams.length > 0 ? `#${trackingParams.join('&')}` : '';

return `https://wa.me/${(ctx.phone || PHONE).replace(/\D/g, '')}?text=${encodeURIComponent(text)}${hash}`;
```

**生成示例** (per K3 唯一联系号 `wa.me/8619880851334`):
```
https://wa.me/8619880851334?text=你好，我想咨询包裝盒的报价。尺寸：A4 材質：250g 灰板 數量：5000 來源：產品詳情頁#src=whatsapp-floating&pos=hero&sku=%E5%8C%85%E8%A3%9D%E7%9B%92
```

**WhatsApp 端可读** (K3 在 WhatsApp 收到客户咨询时, 消息末尾的 `#src=...&...` hash 自动可见)。

**008 台账录入动作** (K3 收到 WhatsApp 后):
1. 长按消息 → 复制 → 看末尾 hash → 提取 `src=whatsapp-floating`
2. 翻 008 表, 写入 `inquiry_id` (按 §3.4 命名) + `src` + 基础字段

### 4.2 报价表单 hidden 字段 src (入口 3)

**当前实现** (per `src/lib/whatsapp.ts` 现有):
```typescript
// 已落地: trackQuoteRequestFromWhatsApp('whatsapp-cta', locale, ctx)
// 已落地: 询盘落库 (Supabase whatsapp_inquiries 表)
```

**008 表录入动作**: 报价表单提交即自动写入 Supabase `quotes` 表, K3 EOD 跑 1 次导出 (CSV) 灌入 008 台账。

**期望增强** (M3 9/5 出稿): 报价表单提交时同步把 `inquiry_id` 写入 Supabase `quotes.inquiry_id` 字段, 008 表通过 `inquiry_id` 关联 Supabase。

### 4.3 邮件主题 prefix (入口 4)

**协议** (K3 9/5 确认):
- zprintpro@outlook.com 邮箱自动规则: 主题 `[src=email]` 前缀
- 客户发到 zprintpro@outlook.com 的邮件, 主题必须含 `[src=email]` (客服/M3 自动加, 客户原主题保留在后半段)
- 008 表录入: K3 每天 9:00 查邮箱 → 主题含 `[src=email]` → 提取 inquiry_id (auto 命名) + 抄写正文到 `notes` 字段

**示例邮件主题**: `[src=email] 询价 喜帖 1000 张 9 月底前`
**008 表记录**:
- `inquiry_id`: `ZL-20260905-001`
- `src`: `email`
- `category`: `wedding-invitation`
- `quantity`: `1000`
- `deadline`: `2026-09-30`
- `notes`: 邮件正文 (含客户联系方式)

### 4.4 跨境平台 (入口 5)

**协议** (K3 9/5 确认):
- Alibaba/Global Sources 平台 IM 收到的询盘, K3 转发到自己 WhatsApp (发到 wa.me/8619880851334)
- 转发时主题加 `[src=cross-border&platform=alibaba]`
- 008 表录入: K3 每天 9:00 + 17:00 各查 1 次平台 IM 通知

---

## 5. 人工回填 SOP (成交转账后)

### 5.1 触发

**每笔银行转账到账通知** (per K3 转账主用 DBS HK 账户, 到账微信/邮件通知)。

### 5.2 动作 (K3 手动)

1. 收到到账通知 → 打开 008 台账
2. 按 `company` / `contact_name` / `phone` 字段模糊查询 (or 按 `src` + `category` 组合查)
3. 找到对应询盘行 (inquiry_id) → 更新字段:
   - `status`: `QUOTED` → `WON`
   - `won_amount`: 实际到账金额 (HK$)
   - `won_date`: 到账日期
   - `is_repeat`: `Y` / `N` (查历史 `company` 是否已有 WON 行)
   - `repeat_count`: 累计复购次数 (1=第 2 笔, 2=第 3 笔...)

### 5.3 耗时推演

**每单回填 < 1 分钟** (per K3 v3.3 §5.2 推演):
- 30s = 查台账 (Ctrl+F 模糊搜索)
- 15s = 填 5 字段 (status / won_amount / won_date / is_repeat / repeat_count)
- 15s = 注释 + notes 字段补充 (可选)

**月耗时推演**:
- 假设月度询盘 8 条 + 成交 4 条 (推演 50% 转化率)
- 月耗时 = 8 × 30s 录入 + 4 × 1min 回填 = 4 + 4 = 8 分钟/月
- **可接受** (< 30 分钟/月)

### 5.4 频率

**每日 EOD** (End of Day) — 9/5 启用起, K3 每天 21:00 前回填当日所有:
- 新询盘 (NEW/QUOTED 状态)
- 当日成交 (WON 状态)

**per `k3-ceo-daily-review cron 21:12` 触发前 12 分钟手动完成** (per AGENTS.md §0.28 1 cron 1 交付物)。

**per `revenue-analytics-weekly cron 16:20`** (K3 9/4 9:30 校准): 每周 5 16:20 跑, 008 表自动汇总周询盘数/周成交数/周金额/归因完整度。

### 5.5 LOST 状态回填

**询盘 14 天无响应** → K3 标 `status=LOST` + `notes=14天无响应`。
**询盘 30 天报价未成交** → K3 复盘: 是否降报价 / 是否换产品 / 是否真丢。

---

## 6. 度量指标

### 6.1 基础指标 (5 类, 周度更新)

| 指标 | 计算公式 | 基线 (9/6 第 1 条) | 9/16 目标 |
|------|----------|-------------------|-----------|
| **周询盘数** | count(`inquiry_id` WHERE `inquiry_timestamp` 周内) | 0 → 1 | ≥2 条/周 |
| **询盘→成交转化率** | count(WON) / count(inquiry_id) 30 天滚动 | 0% | ≥30% (推演) |
| **客单价 (分品类)** | avg(won_amount) GROUP BY category | 0 HK$ | ≥$500 USD = ~HK$3,900 |
| **复购率 (月)** | count(WON WHERE is_repeat=Y) / count(WON) | 0% | ≥40% (推演) |
| **归因完整度** | count(inquiry_id WHERE src NOT NULL) / count(inquiry_id) | 100% | ≥95% (允许手动录入遗留 5%) |

### 6.2 高级指标 (北极星 50% 引擎专属, 月度更新)

| 指标 | 公式 | 9/16 目标 | 12 月目标 |
|------|------|-----------|-----------|
| 月成交金额 (B2B) | sum(won_amount) WHERE status=WON 月内 | ≥$1k USD (推演) | **$10k USD** (北极星 50%) |
| 月新客数 | count(DISTINCT company WHERE is_repeat=N) | ≥1 | ≥2 |
| 月复购客数 | count(DISTINCT company WHERE is_repeat=Y) | ≥1 | ≥3 |
| 月度品类占比 | sum(won_amount) GROUP BY category | (基线建立中) | 咭片 25% + 包裝盒 30% + 喜帖 15% + 月曆 15% + 其他 15% |
| 客户终身价值 (LTV) | sum(won_amount) per company (滚动 12 月) | (基线建立中) | ≥$2k USD/客户 |
| 复购间隔 (天) | avg(won_date[i] - won_date[i-1]) per company | (基线建立中) | 月曆 ≤365 天 / 包裝盒 ≤180 天 |

### 6.3 度量产物

- **周报**: `revenue-analytics-weekly cron 16:20` 自动生成 `.hermes/reports/weekly-inquiry-YYYY-MM-DD.md`
- **月报**: `monthly-revenue cron` 自动生成 `.hermes/reports/monthly-inquiry-YYYY-MM.md`
- **北极星追踪**: K3 9/4 起每月 1 日校准 008 表数据 vs 北极星 $10k/月目标

---

## 7. 复购引擎 (北极星 50% 主战场)

### 7.1 复购触发矩阵 (4 大品类)

| 品类 | 复购周期 | 触发动作 | 时点 |
|------|----------|----------|------|
| **月曆** | 年度 (12 个月) | 9 月做 2027 月曆客户名单 → 主动 WhatsApp 触达 | 9/15-9/30 (本年度) + 1-3 月 (下年度转化) |
| **利是封** | 年度 (12 个月) | 10 月起做 2027 利是封客户名单 → 11 月批量触达 | 10/15-11/15 (本年度) + 12-1 月 (下年度转化) |
| **喜帖** | 半年度 (6 个月) | 婚礼季前 3 个月触达 (3-5 月旺季 + 10-12 月小旺季) | 2-3 月 / 9-10 月 |
| **包裝盒** | 季度 (3 个月) | 季度首月主动问询 (B2B 合同制) | 1/4/7/10 月 |
| **咭片** | 月度 (高频) | 月度老客户主动问询 (新设计/新员工) | 每月 25 日 |
| **校園印刷** | 学期 (4 个月) | 学期初主动问询 (8-9 月开学季 + 1-2 月寒假后) | 8/9/1/2 月 |

### 7.2 复购主动触达 SOP

**触发**:
1. **08 表自动筛选** (per K3 拍板 9/15 前 M3 出脚本): 满足复购周期 + 客户类型 (B2B 高单价) → 自动生成触达清单 (CSV)
2. **K3 EOD 21:00 复盘**: 008 表筛 LOST 状态 → 30 天后自动再触达 1 次

**触达方式**: WhatsApp 直拨 (主) + 邮件 (次)
- WhatsApp 模板: "您好 [公司], 您 [日期] 询盘的 [品类] 复购期到了, 我是智印港, 现在 [新品类/新优惠], 方便聊聊吗?"
- 邮件模板: 略 (per zprintpro 邮件营销 SOP)

**008 表回写**:
- 触达成功 → 新建 1 条 NEW 询盘 (inquiry_id 命名同日复购, notes 标 "复购触达 from [原 inquiry_id]")
- 触达失败 → LOST + notes 标 "复购触达未响应"

### 7.3 北极星 50% 引擎贡献分解

**12 月 $10k/月 B2B 复购 =**:
- 月曆复购 $2.5k (25%) — 2026/9-2027/1 共 4 月主推
- 包裝盒复购 $3k (30%) — B2B 合同制主力
- 喜帖复购 $1.5k (15%) — 季节性强
- 咭片复购 $1.5k (15%) — 高频低单价
- 校園印刷 $0.8k (8%) — 学期制
- 其他 (烫金/贴纸/利是封) $0.7k (7%)

---

## 8. 9/5 启用 SOP

### 8.1 9/4 拍板 (K3 9/4 9:30 确认)

✅ **K3 拍板**: 008 台账本周启用 (per D-9/2-44 §14.4 #8 默认决策, v3.3 §8 9/5 字段定稿 + src 参数回填 SOP 任务派单)。

### 8.2 9/5 启用动作 (K3 9/5 16:20 前完成)

| 时点 | 动作 | 负责 | 验证 |
|------|------|------|------|
| 9/5 9:00 | K3 选定工具 (Google Sheets / Notion / Supabase 三选一) | K3 | 拍板 1 段回复 |
| 9/5 10:00 | M3 套 19 字段 schema 建表 + 5 入口 src 命名规范 | M3 | 截图回传 |
| 9/5 14:00 | M3 跑全 14 门童 dry-run 验证 008 表无触发 (per 任务 B) | M3 | `.hermes/tests/14-guards-fp-report-2026-09-05.md` |
| 9/5 16:00 | K3 手动录入第 1 条测试询盘 (假数据, 验证流程) | K3 | 008 表截图 |
| 9/5 16:20 | `revenue-analytics-weekly cron` 跑前, 008 表正式启用 | M3 | cron 跑无报错 |
| 9/5 17:00 | K3 拍板 008 表启用确认 (1 段回复) | K3 | 决策登记簿 D-9/5-X 新增 |
| 9/6 21:00 | K3 EOD 录入第 1 条真实询盘 | K3 | 008 表新增 ≥1 行 |

### 8.3 9/6-9/16 验收

| 验收项 | 9/16 目标 | 验证 |
|--------|-----------|------|
| 008 表已启用 | ✓ | 工具选定 + K3 拍板 |
| 第 1 条真实询盘录入 | ≥1 | 008 表 9/6-9/16 至少 1 行 |
| 周询盘数基线 | ≥2 条/周 | 9/6-9/13 周报 + 9/13-9/16 半周报 |
| 询盘→成交转化率基线 | ≥30% (推演) | 9/6-9/16 30 天滚动窗口 |
| 5 入口全部 src 命名启用 | 5/5 | §2.1 矩阵全绿 |
| 9 门童 0 命中 (per 任务 B) | ✓ | `.hermes/tests/14-guards-fp-report-2026-09-05.md` |

### 8.4 风险与缓解

| 风险 | 概率 | 影响 | 缓解 |
|------|------|------|------|
| K3 9/5 16:20 前未拍板工具选型 | 中 | 高 | M3 9/4 16:00 前提交 3 选 1 建议 (§9) + 9/5 9:00 二次提醒 |
| 第 1 周询盘 = 0 (无真实询盘) | 中 | 中 | K3 手动录入假数据 3 条, 验证 schema + 跑通流程 |
| src 命名遗漏 (某入口未带 #src=) | 低 | 中 | 9/5 14:00 全站 grep `wa.me/8619880851334` 验证 100% 带 src |
| 14 门童触发 (per 任务 B) | 中 | 中 | 9/5 14:00 跑测试, 如触发先修门童再启用 008 |
| 复购追踪逻辑漏 (公司名变更) | 中 | 低 | 008 表加 `company_alias` 字段 (第 20 字段, 9/15 考虑) |

---

## 9. 工具选型 (3 候选)

### 9.1 候选 A: Supabase 表 (跟 R0 一起, 但 K3 必给 G-XXXX/SQL)

**优点**:
- 跟 `whatsapp_inquiries` 表 + `quotes` 表同一数据库, 关联查询方便
- 自动时间戳 + 索引 + RLS
- 跟 Supabase `tracking_events` 表 (per `src/lib/whatsapp.ts` 9 月统一事件) 同源

**缺点**:
- K3 需 G-XXXX/SQL 凭据 (per `decision-register.md` D-9/2-44 §14.4 历史依赖)
- K3 直接操作 SQL 门槛高 (per K3 8/19 反馈 "我不会写 SQL")
- 移动端体验一般 (Supabase dashboard 移动端)

**预估搭建时间**: 2-3 小时 (M3 出 schema + K3 拍板 G-XXXX)

### 9.2 候选 B: Notion database (快速, K3 直接用)

**优点**:
- K3 移动端 + PC 端体验统一
- 模板/视图/筛选器开箱即用
- 历史回溯 (Notion timeline) 适合复购追踪
- K3 已习惯 Notion 工作流 (per K3 daily review 模板)

**缺点**:
- 跟 Supabase 数据双向同步复杂 (需要 webhook 桥接)
- 19 字段全填入 Notion 表格会臃肿
- API 限制 (per 9/3 限流)

**预估搭建时间**: 1 小时 (M3 出模板 + K3 复制)

### 9.3 候选 C: Google Sheets (最简, 协作)

**优点**:
- 0 学习成本 (K3 已用)
- 移动端 App 体验好
- 多人协作 (K3 + 客服/助手)
- 导出 CSV/Excel 灵活
- Apps Script 自动化 (周报/月报)

**缺点**:
- 19 字段表格化体验一般
- 无数据库事务/索引
- 多人并发编辑冲突

**预估搭建时间**: 30 分钟 (M3 出 sheet 模板 + K3 复制)

### 9.4 建议

**短期 (9/5-9/15)**: 候选 C Google Sheets 起步 (最低成本, 验证 schema + 流程)
**中期 (9/15-10/1)**: 切到候选 A Supabase (per R0 一起, K3 给 G-XXXX)
**长期 (10/1+)**: Supabase 为主 + Google Sheets 导出 (per 客服/助手 协作)

**K3 9/5 9:00 拍板**: 三选一 (建议 C, K3 自定)。

---

## 附录 A: 字段速查 (Cheatsheet)

```
[19 字段速查 — 008 台账必备]
1.  inquiry_id         (auto)  ZL-YYYYMMDD-NNN
2.  inquiry_timestamp  (auto)  ISO 8601 +08:00
3.  src                (auto)  whatsapp-floating/whatsapp-pillar-top/whatsapp-pillar-bottom/quote-form/email/cross-border
4.  company            (manual)
5.  contact_name       (manual)
6.  phone              (manual) 门童 #2 验证
7.  email              (manual, optional)
8.  category           (manual) card/packaging-box/sticker/wedding-invitation/calendar/red-pocket/campus-print/foil-stamp/other
9.  quantity           (manual, optional)
10. deadline           (manual, optional)
11. budget             (manual, optional)
12. status             (manual) NEW/QUOTED/NEGOTIATING/WON/LOST
13. quoted_price       (manual, optional, HK$)
14. quote_date         (manual, optional)
15. won_amount         (manual, optional, HK$) — 唯一归因
16. won_date           (manual, optional)
17. is_repeat          (manual) Y/N
18. repeat_count       (manual, optional, 1=第 2 笔)
19. notes              (manual, optional)
```

---

## 附录 B: 度量产物清单

- **008 表本身**: 工具选定后落地 (Google Sheets / Notion / Supabase)
- **周报**: `.hermes/reports/weekly-inquiry-YYYY-MM-DD.md` (auto by cron)
- **月报**: `.hermes/reports/monthly-inquiry-YYYY-MM.md` (auto by cron)
- **北极星追踪**: K3 每月 1 日校准
- **决策登记簿**: D-9/2-44 §14.4 #8 启用默认决策 + D-9/5-X 启用确认

---

## 附录 C: 跨项目 P0 通用性

- **北极星 50% 引擎度量** 适用任何 B2B 业务 (per K3 v3.3 §0)
- **5 入口 src 命名规范** 适用任何多渠道获客 (per src/lib/whatsapp.ts 已落地)
- **人工台账 + 唯一归因动作** 适用任何转账/线下成交场景 (无在线支付)
- **19 字段 schema** 可平移至其他 zprintpro 类项目 (togthr 暂不适用, togthr 主 SaaS 订阅非定制)

---

*校准: 008 表 schema 19 字段, 5 入口, 8 大主营品类, 9/5 启用 SOP, 9/16 验收 6 项。所有 K3 拍板来源 = v3.3 §5.2 + D-9/2-44 §14.4 #8 + 9/4 9:30 校准确认。*
