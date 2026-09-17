# K3 执行脚本卡 — 010 Lane O 归因字段 (v10 P0-3)

> **数据来源**: K3 v10 outbound masterplan §三 Spec 1/2 + §七 执行顺序第 3 项
> **拍板**: K3 2026-09-17 v10 卡（P0-3 = 008 表加 lead_source 字段 + quote 页 UTM 捕获，透传到 008 插入）
> **性质**: 一次性迁移（同 008 模式），K3 亲跑，**9 分钟闭环**
> **前置**: 008 quote_requests 已在线上（8/20 已跑）

---

## 一、这一步解决什么问题

v10 卡 §三 归因断层原文：
> 话术带深链但没带 UTM —— outbound 询盘进 008 后与 organic 混在一起，北极星「周真实询盘数×赢单标记」会被污染，**无法判定获客车道 ROI**。

010 让每个询盘带**车道标签**，周报才能按车道拆：

| 车道 | lead_source | 说明 |
|------|-------------|------|
| Reddit | `reddit` | Lane O 主力（先养号 2 周，9:1） |
| LinkedIn | `linkedin` | 公司页同步建 |
| Quora | `quora` | |
| Email | `email` | |
| WhatsApp | `wa` | |
| 自然/其他 | `organic` | 兜底（无 UTM 或非 outbound UTM） |

**没有 lead_id 的触达 = 白做**（v10 §三 原文）。

---

## 二、K3 真人窗口（9 min）

### Step 1 (5 min) — 跑 010 SQL

1. 打开 https://supabase.com/dashboard → zprintpro project → **SQL Editor**
2. **+ New query** → 粘贴 `F:\zprintpro-nextjs\supabase\migrations\010_add_lead_source_attribution.sql` **全文**
3. **Run** (▶)
4. **预期输出（4 个 OK，0 ERROR）**：
   ```
   NOTICE: OK: quote_requests 3 列就位 (utm_content / lead_id / lead_source)
   NOTICE: OK: tracking_events 3 列就位 (utm_content / lead_id / lead_source)
   NOTICE: OK: public schema 全部表已启用 RLS
   NOTICE: OK: 010 视图 = v_lane_o_attribution / v_lead_id_conversion / v_lane_o_deeplink_clicks
   ```
5. 若出现 `WARNING: 只就位 x / 3 列` → 把报错整段发我，不要自己改

### Step 2 (2 min) — 自查（粘贴跑一次）

```sql
SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'quote_requests'
  AND column_name IN ('utm_content', 'lead_id', 'lead_source')
ORDER BY column_name;
-- 期望 3 行

SELECT conname FROM pg_constraint WHERE conname = 'chk_quote_requests_lead_source';
-- 期望 1 行 (值域约束就位)
```

### Step 3 (2 min) — 回一句给我

> "010 SQL 跑完 + 自查 3 列，push + verify"

我随后：precheck（encoding + tsc + guard）→ commit + push → verify-deploy → **线上深链端到端验收**。

---

## 三、深链标准（话术上线前强制，v10 §三 Spec 1）

```
https://zprintpro.com/{locale}/quote/?utm_source={reddit|linkedin|quora|email|wa}
    &utm_medium=outreach
    &utm_campaign=lane-o-{品类}
    &utm_content={lead_id}
```

- `{locale}` = `zh-hk` | `en` | `ja`（**注**：v10 卡原文写 `/zht-hk/` 是笔误，实际 locale 是 `zh-hk`）
- `{品类}` 例：`sticker` / `packaging` / `label` / `flyer`
- `{lead_id}` = 雷达台账行号（例 `L-00042`）→ 落 `utm_content` + `lead_id` 两列

**示例（Reddit 第 42 号 lead，贴纸品类）**：
```
https://zprintpro.com/zh-hk/quote/?utm_source=reddit&utm_medium=outreach&utm_campaign=lane-o-sticker&utm_content=L-00042
```

### 深链实际链路（已修，重要）

`/[locale]/quote/` 页**没有表单**，它是重定向页；真正的报价表单 `QuoteForm` 渲染在 **`/contact/`**：

```
深链 /zh-hk/quote/?utm_...  →  (QuoteRedirect: 先捕获归因 → 再跳转，保留 UTM)
                            →  /zh-hk/contact/?utm_...
                            →  QuoteForm 提交 → 008 quote_requests (lead_source/lead_id 落库)
```

**修复前**：无 `product` 的深链会被跳到 `/contact/` 且**不带任何参数** → UTM 当场丢光
→ lead_id 归零 → 车道 ROI 不可判（正是 v10 §一-1 说的"归因断层"）。
**修复后**：`QuoteRedirect` 先捕获（写 localStorage 30 天）+ 三个跳转分支全部保留 UTM，双保险。

---

## 三点五、K3 验收方法（跑完 SQL 后）

**方法 1（最快，看落库）**：
1. 手机/浏览器打开深链（把 `L-00042` 换成你自己的测试号）：
   `https://zprintpro.com/zh-hk/quote/?utm_source=reddit&utm_medium=outreach&utm_campaign=lane-o-test&utm_content=L-TEST01`
2. 确认页面落到 `/zh-hk/contact/`，且**地址栏仍带 UTM 参数**
3. 填表提交（姓名/电邮/电话/留言必填）
4. Supabase → SQL Editor 跑：
   ```sql
   SELECT lead_source, lead_id, utm_campaign, source, created_at
   FROM quote_requests ORDER BY created_at DESC LIMIT 3;
   -- 期望最新一行: lead_source='reddit', lead_id='L-TEST01'
   ```
5. 清测试数据（可选）：
   ```sql
   DELETE FROM quote_requests WHERE lead_id = 'L-TEST01';
   ```

**方法 2（看车道总览）**：
```sql
SELECT * FROM v_lane_o_attribution;
SELECT * FROM v_lead_id_conversion WHERE lead_source <> 'organic';
```

**方法 3（跳页归因不丢）**：打开深链 → 先点进任意产品页 → 再回 `/contact/` 提交
→ 仍应落 `lead_source='reddit', lead_id='L-TEST01'`（localStorage 兜底生效）。

---

## 四、跑完后可用视图（周复盘读这些）

| 视图 | 用途 | 对应 KPI |
|------|------|----------|
| `v_lane_o_attribution` | 按车道看 30 天询盘数 + 赢单数 + 赢单率 | Lane O **终局指标** |
| `v_lead_id_conversion` | 逐条 lead_id 看是否真带来询盘/成交 | 台账对账（哪个 lead 值钱） |
| `v_lane_o_deeplink_clicks` | 深链点击（含未提交询盘的点击） | Lane O **领先指标** |

```sql
-- 车道归因总览
SELECT * FROM v_lane_o_attribution;
-- 单车→询盘对账
SELECT * FROM v_lead_id_conversion WHERE lead_source <> 'organic' LIMIT 20;
```

---

## 五、工程侧已做的容错（K3 不必操作）

代码已 pre-merge 下列保护，**迁移前后都不会破**：

1. **008 询盘层降级重试**：若 010 未跑，带新列的 insert 会被 PostgREST 拒（PGRST204）→ 自动去掉新列重试，**度量层照常写入**（不出现"上线即死"）。
2. **009 事件层会话级降级**：008 一旦探测到列缺失就打 `localStorage` 标记 → 事件层自动不带新列，事件不丢。
3. **UTM 持久化（last-touch, 30 天窗口）**：outbound 深链落地后用户若先浏览其他页再回 `/quote/` 提交，`window.location.href` 已无 UTM —— 归因从 `localStorage` 兜底读取，**lead_id 不会丢**。没有这层，Lane O 的 ROI 会系统性低估。

---

## 六、已发现的既有问题（不属 P0-3，待 K3 裁决）

`src/components/services/RushCtaForm.tsx` 提交到 `/api/quote`，但其 body 字段（`name/email/phone/product/qty/time/note`）
与 `/api/quote` 的 zod schema（要求 `productSlug/productName/quantity/size{w,h,unit}/material/deadline/unitPrice/totalPrice/customerName/customerEmail`）
**不匹配 → 该表单必然 400，提交不到 Supabase**。

- 该组件在 **§0.25.9.3 冻结名单**（`src/components/services/Rush*` 8 组件），按规则**未改动**。
- 本卡只给 `/api/quote` 加了 UTM 透传能力（不改冻结组件）。
- 建议：K3 决定是否解冻修 rush 表单（或让它改走客户端 `trackQuoteRequest` 直写 008，与 QuoteForm 同路）。
