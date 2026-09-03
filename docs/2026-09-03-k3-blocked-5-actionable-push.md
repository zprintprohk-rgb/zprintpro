# 9/3 5 项 BLOCKED 详细推进框架 (K3 9/3 16:28 派活包「具体展开 + 提前推进今天执行完成」)

> **拍板来源**: K3 9/3 16:28 push "这些具体展开什么问题,要提前推进今天执行完成" (K3 主动授权覆盖 §0.25 30 min 硬下限)
>
> **作者**: M3 (Mavis) 9 角色综合战略军师+CEO
>
> **校准日期**: 2026-09-03 16:30
>
> **D-9/2-32 已解锁**: 4 词 4 改 全部落地 (commit bbeab07f, 0 ahead)
>
> **校准状态**: 🟢 校准完成 + 5/6 BLOCKED 详细展开 + M3 今天 (9/3) 推进框架落地

---

## 0. commit bbeab07f 部署状态 (D-9/2-32 已解锁)

- ✅ **git push 成功** (0 ahead, 16:27 push)
- ⏳ **CF Pages 自动部署** (5-10 min 内, 校准前 9/3 14:00 已 PASS build 678 URLs + 95 blog + 8 Rush* 组件)
- ⏸️ **5 步真验收 curl 200 + body** 校准后 4 词落地页 (stickers/posters/envelopes/books) 待 CF Pages 部署完成后 跑 live verify
- **校准后 4 词 4 改 落地状态**:
  1. small-batch 系 (en) → `stickers` 类目 title 加 small batch + Free US Shipping $99+
  2. a1a2 海報 (zh-hk) → `posters` 类目 zh-hk title 加 a1a2 海報印刷主词
  3. 大信封 (zh-hk) → `envelopes` 类目 zh-hk title 加 校准后大信封文案
  4. 樣本印刷 (zh-hk) → `books` 类目 keywords 段 (zh-hk + en + ja 副词) (per K3 9/3 16:25 拍板"书籍印刷下面")

---

## 1. D-9/2-16 ARK key 撤销重发 (🥇 优先级最高, 16.5h 剩余, 9/4 09:18 预览窗结束)

### 1.1 具体问题 (3 个)

#### 问题 1.1.1: 旧 ARK API key 9/2 06:11 暴露
- 旧 key 已泄露 (per 8/2 commit 8c30b6a R6 兜底, 9/2 06:11 +0s)
- 安全风险: 旧 key 可能被滥用 → 撤销 + 重新签发是必须动作
- 9/4 09:18 预览窗结束后, 旧 key 自动失效, 但 R6 push 仍需新 key

#### 问题 1.1.2: K3 必亲手操作 (M3 不能擅自)
- §0.27.3 条件 3: ARK key 撤销重发 = K3 必亲手 (火山引擎控制台)
- 5 步 SOP: 1) 登录火山引擎控制台 2) ARK API → 密钥管理 → 撤销旧 key 3) 创建新 key (32 位 token, 命名 zprintpro-r6-0827) 4) 更新 .env (新增 ARK_API_KEY + ARK_MODEL) 5) 通知 M3 验证
- M3 必等 K3 必给凭证, 不能擅自

#### 问题 1.1.3: R6 push 延期 = P0 #5 9/3 截止撞墙
- R6 本地分支 feat/rush-redesign-0827 已就绪 (8 Rush* 组件 + rush-data.ts + rush-page.module.css + rush-printing-delivery 服务)
- build PASS: 678 URLs + 95 blog + 8 Rush* 组件
- 9/4 09:18 预览窗结束后, R6 push 延期 → P0 #5 9/3 截止撞墙 → 9/4 后 D-9/2-16 重新计算
- 延期 1 天 = 9 月 4 词摘果 4 词 src/ 改动延期, 9/5 验证窗开启时间延后

### 1.2 M3 今天 (9/3 推进)

#### M3 自主可做 (per docs/2026-09-03-k3-blocked-6-actionable-prep.md §5.2)
- [x] M3 9/3 16:05 6 项 actionable 准备框架 落 (commit 6799d666)
- [x] M3 9/3 16:14 D-9/2-32 3 改 落地 (commit 70afd65c)
- [x] M3 9/3 16:27 D-9/2-32 4 改 全部落地 (commit bbeab07f)
- [ ] M3 准备 R6 push 验证清单 (5 步 SOP 文档化, 等 K3 必给 ARK key)
- [ ] M3 准备 R6 push 实施脚本 (`scripts/r6-push.sh`, 自动跑: verify-ark-key.js + git add + commit + push origin + CF Pages build + verify-deploy 5 min)

#### K3 必亲手 (16.5h 倒计时)
- [ ] K3 立即登录火山引擎控制台 → 撤销旧 key + 创建新 key (32 位)
- [ ] K3 通知 M3 配置 .env (新 ARK_API_KEY + ARK_MODEL)
- [ ] M3 立即 R6 push (push origin feat/rush-redesign-0827) + CF Pages build + verify-deploy 5 min
- [ ] 5 URL spot check (live verify rush-printing-delivery 落地页 + 8 Rush* 组件)

### 1.3 风险评估

- **风险 1 · 旧 key 泄露**: 9/4 09:18 自动失效前被滥用 → 立即撤销
- **风险 2 · K3 未及时给凭证**: 9/4 09:18 预览窗结束 → R6 延期 → P0 #5 9/3 截止撞墙
- **风险 3 · 新 key 配置错误**: M3 验证 verify-ark-key.js PASS + 5 URL spot check FAIL → 重试

---

## 2. D-9/2-33 12 篇 Pillar 范围 (🥈 优先级次高, 5d 剩余, 9/8 截止)

### 2.1 具体问题 (3 个)

#### 问题 2.1.1: 4 Pillar 选题 (M3 已准备, 等 K3 必拍)
- **Pillar 1 · 包裝盒** (主战场, zh-hk 校准后 7d imps 4,413) — 食品包裝 / 礼盒 / 化妝品包裝 / 跨境电商品牌
- **Pillar 2 · 貼紙與標籤** (zh-hk 校准后 18 SKU 联动 6 SKU) — small batch stickers / waterproof / vinyl / fluorescent
- **Pillar 3 · 宣傳單張** (含海報/傳單 specs) — 校准后 a1a2 海報 + small-batch 系 (摘果 4 词)
- **Pillar 4 · 校園教育印刷** (新晋, 校准后 90 天 12 queries 落盘) — 校園 / 學校 / 教材 / 教科書
- 12 篇 = 4 Pillar × 3 locale × 1 篇 = 12 篇深度文

#### 问题 2.1.2: 验收标准 (per 8/31 d1-k3-paban-package §D + 9/3 16:05 6 项 actionable 准备框架 §2.4)
- 深度分 ≥80 (per §0.29 v2 字符体检)
- 5 schema (Article/FAQ/Breadcrumb/HowTo/Organization)
- 10 内链 (类目蓝块 + 产品详情下方)
- 4 口径校准后基线 (zh-hk 79 / en 80 / ja 80 / SSoT 85)
- 答案块 + GSC 提交 + 9/5-9/12 CTR 验证窗

#### 问题 2.1.3: 9/8-9/22 排产 (per 8/31 v2 daily plan §3 + V2.0 §7.2)
- D8 (9/8): Pillar 1 zh-hk 包裝盒
- D9 (9/9): Pillar 1 en 包裝盒
- D10 (9/10): Pillar 1 ja 包裝盒
- D11 (9/11): Pillar 2 zh-hk 貼紙
- D12 (9/12): Pillar 2 en small-batch 系 + **CTR 验证窗关闭**
- D13 (9/13): Pillar 3 zh-hk 宣傳單張
- D14 (9/14): Pillar 4 zh-hk 校園 + **CTR 判定报告**
- D15 (9/15): Pillar 4 ja 校園
- D16-D18: Pillar 4 en 校園 + Pillar 1/2/3 ja
- D19-D22: 12 篇全量上线 + 内链矩阵铺完

### 2.2 M3 今天 (9/3 推进)

#### M3 自主可做 (per docs/2026-09-03-k3-blocked-6-actionable-prep.md §2.2)
- [x] M3 9/3 16:05 4 Pillar 选题 落 (commit 6799d666, 文档化)
- [ ] M3 写 12 篇 Pillar 深度文大纲 (答案块 + 5 schema + 10 内链 占位)
- [ ] M3 写 4 Pillar zh-hk 深度文 选题 + 校准后 41 词分层 + 18 SKU 联动 (D8 Pillar 1 zh-hk 包裝盒 主战场先写)
- [ ] M3 写 GSC 提交 + CTR 验证窗监测 SOP (9/5-9/12)

#### K3 必拍 (5d 倒计时)
- [ ] K3 9/8 前必拍 Pillar 范围 (4 Pillar 选题 + 深度分 ≥80 + 5 schema + 10 内链)
- [ ] K3 必给战略层 7 篇初稿 (per d1 §D 9/1 拍板, 战略层 7 篇初稿 ⏳ 战略层)

### 2.3 风险评估

- **风险 1 · 战略层 7 篇初稿未出** — M3 不能创作, 9/8-9/22 排产撞墙
- **风险 2 · 深度分 ≥80 不达标** — 12 篇内链 + schema 不全, 验收 FAIL
- **风险 3 · 4 Pillar 选题范围不拍** — 9/8 拍板延期 → 12 篇全量延期

---

## 3. D-9/2-24 校園 Pillar go/no-go (🥉 优先级第三, 5d 剩余, 9/8 截止)

### 3.1 具体问题 (3 个)

#### 问题 3.1.1: 校准后 90 天校园 12 queries 落盘
- 校准后 3m ja/en/hk 校园 imps 校准后实测 (per GSC数据/campus-90d-2026-09-03.json, 3681 bytes)
- 校園 / 學校 / 教育 / 教材 / 教科書 / 学校印刷 / 教育印刷 / 製本 / 等
- 9/3-9/8 5 天 校准数据稳定窗 (校准后 90 天数据)

#### 问题 3.1.2: go/no-go 拍板标准 (per docs/2026-09-03-k3-blocked-6-actionable-prep.md §3.2)
- **GO 推荐条件** (满足 ≥3 项): 校准后 3m 校园 imps ≥ 50 + 校准后 3m 校园 1 个 A1 词 (pos ≤10) + 校准后 3m 校园 1 个 Striking 词 (pos 11-20) + 校准后 3m 校园 CTR ≥ 0.5% + 校准后 3m 校园 click ≥ 1
- **NO-GO 推荐条件** (满足 ≥2 项): 校准后 3m 校园 imps < 20 + 校准后 3m 校园 0 A1 词 + 校准后 3m 校园 0 Striking 词 + 校准后 3m 校园 CTR = 0% + 校准后 3m 校园 click = 0
- **PILLAR 推迟条件** (满足 ≥2 项): 校准后 3m 校园 imps 20-50 (低量但有信号) + 校准后 3m 校园 0 A1 但有 Striking + 校准后 3m 校园 CTR < 0.5% 但 > 0% + 校准后 3m 校园 0 click 但有 imps

#### 问题 3.1.3: 9/8 拍板 5 决策项
1. 校准后 90 天取证数据 (12 queries × 3 站点)
2. 拍板 4 Pillar 是否包含校園 (D-9/2-33 4 Pillar 选题)
3. 校園 Pillar 12 篇排产 (9/8-9/22)
4. 校園 Pillar K3 必给资源 (校准后 41 词分层 + 18 SKU 联动)
5. 校園 Pillar 拍板后立即接入 Pillar 4 排产 (D15 9/15 ja 校園)

### 3.2 M3 今天 (9/3 推进)

#### M3 自主可做
- [x] M3 9/3 15:25 GSC 校准 + 90 天校园 12 queries 落盘 (commit 322b2333 GSC数据/campus-90d-2026-09-03.json)
- [x] M3 9/3 16:05 9/8 拍板框架 落 (commit 6799d666)
- [ ] M3 写 9/8 拍板决策 docs (per 5 决策项 + go/no-go 拍板标准)

#### K3 必拍 (5d 倒计时)
- [ ] K3 9/8 必拍 go/no-go (校園 Pillar 是否纳入 4 Pillar)

### 3.3 风险评估

- **风险 1 · 校准后 90 天 imps < 20** — NO-GO 推荐, 校園 Pillar 推迟
- **风险 2 · K3 9/8 拍板延期** — 校園 Pillar 12 篇排产撞墙
- **风险 3 · 校園 Pillar 资源不足** — 41 词分层 + 18 SKU 联动 不支持校園

---

## 4. D-9/2-17 R0 4 项 (4️⃣ 优先级第四, 7d 剩余, 9/10 截止)

### 4.1 具体问题 (4 个 R0 子项)

#### 问题 4.1.1: GA4 接入 (M1 验收 9/16 baseline + 全站漏斗 L3 阻塞)
- TrackingEvents.tsx 已埋点 (per K3 8/12 11:00 拍板, commit 4286c0c data-cf-analytics) ✅
- CF Beacon fallback 已配 ✅
- ⏳ GA4 Measurement ID (G-XXXXXXXXXX) 待 K3 必亲手获取 + 注入 .env.local
- M3 立即 5 步 SOP (per docs/2026-09-03-k3-blocked-6-actionable-prep.md §6.2)

#### 问题 4.1.2: 008 Supabase RLS 解锁 (询盘归因 L4 + M1 验收阻塞)
- 008 Supabase key 已注入 .env (per 8/30 R6 兜底 7d957ca7) ✅
- ⏳ RLS unlock migration 待 K3 必拍授权后 跑
- M3 立即 5 步 SOP: K3 拍板授权 M3 跑 unlock migration → npx supabase db push → select * from v_event_funnel → K3 review → D26 (9/26) 漏斗基线读取

#### 问题 4.1.3: 008 询盘周报 cron (询盘基线点亮) — M3 自主可做
- 9 月底前必点亮 (per 8/31 v2 daily plan §0.2 期望 + §5 W4 D26)
- M3 立即 写 cron 配置 (per d1 §9.3-5 已落)
- 0 阻塞 (M3 自主可做)

#### 问题 4.1.4: PayPal 工单 (small batch 系 跨境 B2B 支付)
- 校准后 en 7d small batch 系 23 imp 0 click 跨境 B2B 需求
- ⏳ PayPal merchant account access + 工单 待 K3 必给
- M3 立即 写 PayPal checkout 接入 SOP

### 4.2 M3 今天 (9/3 推进)

#### M3 自主可做 (R0 #3 008 询盘周报 cron)
- [ ] M3 写 008 询盘周报 cron 配置 (cron_008_inquiry_weekly) + 9 月底前点亮
- [ ] M3 写 R0 工单模板 (per docs/2026-09-03-k3-blocked-6-actionable-prep.md §6)

#### K3 必给 (7d 倒计时)
- [ ] K3 9/10 前必给 GA4 G-XXXX (3 凭证之一)
- [ ] K3 9/10 前必给 Supabase schema access (3 凭证之一)
- [ ] K3 9/10 前必给 PayPal merchant access (3 凭证之一)
- [ ] K3 必拍 R0 4 项 工单 (4 子项 必亲自授权)

### 4.3 风险评估

- **风险 1 · GA4 未接入** — M1 验收 9/16 baseline 无法锁定, 7d clicks ≥75 评估撞墙
- **风险 2 · Supabase RLS 未解锁** — 询盘归因 L4 阻塞, 008 询盘表无数据
- **风险 3 · PayPal 未开通** — small batch 系 跨境 B2B 支付 撞墙, 询盘 → 成交 漏斗断裂
- **风险 4 · K3 3 凭证延期** — 9/10 截止撞墙, M1 验收 9/16 延期

---

## 5. D-9/2-34 en china/factory-direct 10 月落地预算 (5️⃣ 优先级最低, 27d 剩余, 9/30 截止)

### 5.1 具体问题 (3 个)

#### 问题 5.1.1: 校准后差异化信号
- 校准后 en 28d china catalog printing imps +110% (per 校准后词图 v4)
- 校准后 en 28d 1,498 imps / 6 clicks / CTR 0.40% / pos 47.99
- 校准后 en 7d 416 imps / 1 click / CTR 0.24% / pos 39.81
- 校准后 28d china catalog printing 61 imp / 1 click (校准后)

#### 问题 5.1.2: 4 周落地计划 (per docs/2026-09-03-k3-en-china-factory-direct-content-line.md 22.2 KB, 9/2 20:58 9 角色综合最优方案执行落地)
- 周 1 (10/1-10/7): 选题 + 内容生产 (en 1 篇 "China Catalog Printing: A Buyer's Guide for US Businesses")
- 周 2 (10/8-10/14): 内链 + 校准 (en 1 篇 "Factory-Direct Printing: Why US Brands Choose Asia Suppliers")
- 周 3 (10/15-10/21): Raksul 校准 + 信任要素 (工厂实拍 + 出口案例)
- 周 4 (10/22-10/31): 转化 + 复盘 (询盘归因 + 9 月底复盘 + 10 月 P2 深耕期计划)

#### 问题 5.1.3: 预算 (per K3 9/2 20:58 9 角色综合最优方案执行, 校准后基线)
- 9/3 校准后 en 28d 1,498 imps / 6 clicks / CTR 0.40%
- 10 月落地预算 15,000-26,000 元/月 (K3 必拍 9/30)
- 用途: 内容生产 8,000 元 + 内链校准 4,000 元 + 信任要素 6,000 元 + 询盘归因 4,000 元 + 缓冲 4,000 元

### 5.2 M3 今天 (9/3 推进)

#### M3 自主可做 (4 周落地计划已落)
- [x] M3 9/2 20:58 4 周落地计划 落 (commit 8b11f6ed, docs/2026-09-03-k3-en-china-factory-direct-content-line.md 22.2 KB)
- [ ] M3 写 china/factory-direct 4 周详细选题 (per 9 月底策划稿定稿)
- [ ] M3 写 china/factory-direct 8 大类目 SEO 数据 (per 5 sharp hook)
- [ ] M3 写 china/factory-direct 4 trust elements 内容 (per 8 sharp hook + 4 trust elements)

#### K3 必拍 (27d 倒计时, 9/30 截止)
- [ ] K3 9/30 前必拍预算 15,000-26,000 元/月

### 5.3 风险评估

- **风险 1 · K3 9/30 拍板延期** — 10 月落地延期, china/factory-direct 差异化主线撞墙
- **风险 2 · 预算 15,000-26,000 元/月不足** — 4 周落地计划缩水
- **风险 3 · china catalog printing imps +110% 放缓** — 校准后 28d imps 1,498 (校准后), 战略信号待 9 月中旬再验证

---

## 6. M3 今天 (9/3 16:30) 立即推进 (K3 9/3 16:28 拍板"提前推进今天执行完成")

### 6.1 M3 自主可做 5 项 (1 commit 1 push 攒批)

1. **5 项 BLOCKED 详细推进框架 docs 落** (本文件 8 KB, K3 9/3 16:28 派活包拍板)
2. **决策登记簿 D-9/2-42 增量** (5 项 BLOCKED 详细 + M3 今天推进)
3. **008 询盘周报 cron 配置 (R0 #3)** (per 8/31 d1 §9.3-5 已落, M3 立即跑)
4. **D-9/2-32 5 步真验收 curl 200 + body** (校准后 4 词落地页 live verify, 等 CF Pages 部署完成)
5. **5 cron SSoT §N 段嵌入** (校准后 §K 段更新, 校准后 SOP §6 阶段 3 落地)

### 6.2 K3 今天 (9/3) 必亲手 (1-3 项, M3 等 K3 必给)

1. **D-9/2-16 ARK key 撤销重发** (16.5h 倒计时, 9/4 09:18 预览窗结束, 优先级最高) — K3 立即登录火山引擎控制台
2. **D-9/2-17 R0 4 项 3 凭证** (7d 倒计时, 9/10 截止) — K3 必给 GA4 G-XXXX + Supabase schema + PayPal merchant
3. **D-9/2-33 Pillar 4 Pillar 选题拍板** (5d 倒计时, 9/8 截止) — K3 必拍 4 Pillar 范围 + 深度分 ≥80 + 5 schema + 10 内链

### 6.3 K3 5d-27d 必拍 (5 项)

1. **D-9/2-16 ARK key** (16.5h 倒计时) — K3 必给
2. **D-9/2-33 Pillar 范围** (5d 倒计时) — K3 必拍
3. **D-9/2-24 校園 Pillar go/no-go** (5d 倒计时) — K3 必拍
4. **D-9/2-17 R0 4 项** (7d 倒计时) — K3 必给
5. **D-9/2-34 10 月预算** (27d 倒计时) — K3 必拍

---

## 7. 数据来源 (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则)

- K3 9/3 16:28 push "这些具体展开什么问题,要提前推进今天执行完成" (本 commit 拍板, K3 主动授权覆盖 §0.25 30 min 硬下限)
- K3 9/3 16:25 push "哪首先要确认样本印刷应该是在会产品类目下对吗,我认为应该在书籍印刷下面" (D-9/2-32 樣本印刷 → books 类目)
- K3 9/3 16:23 push "现在样本印刷有什么难题" (3 个根因 + 3 个解决方案)
- K3 9/3 16:21 push "envelopes.types.push('samples')" 建议 (后被 K3 9/3 16:25 替代)
- K3 9/3 16:06 push "要你执行了" (D-9/2-32 立即执行)
- K3 9/3 16:03 push "全部按我们的最高规则立即执行" (6 项 actionable 准备框架)
- K3 9/3 15:50 push "全部执行" (4 项 M3 自主可做)
- K3 9/3 15:52 push "9 角色综合能力按最优自主决定" (K3 主动授权)
- K3 9/3 15:22 push "GSC数据 文件夹更新了今天最新的GSC数据excel文件...使用这些数据 解决我们的 [9 角色综合能力执行 P0 级问题]" (GSC 校准)
- HEAD = bbeab07f (0 ahead, D-9/2-32 4 词 4 改全部落地, 9/3 16:27 push)
- 校准日期: 2026-09-03 16:30
- 校准状态: 🟢 5 项 BLOCKED 详细展开 + M3 今天推进框架落地
- 累计 16 commit 落地 (per 9/3 16:27 push)

---

**报告生成时间**: 2026-09-03 16:30 GMT+8
**作者**: M3 (Mavis) 9 角色综合战略军师+CEO
**拍板来源**: K3 9/3 16:28 push "这些具体展开什么问题,要提前推进今天执行完成" + K3 9/3 16:25 push "书籍印刷下面"
**配套**: 5 项 BLOCKED 详细展开 + M3 今天 (9/3) 推进框架 + 决策登记簿 D-9/2-42 增量
**校准日期**: 2026-09-03 16:30
**校准状态**: 🟢 5 项 BLOCKED 详细展开 + M3 今天推进框架落地
