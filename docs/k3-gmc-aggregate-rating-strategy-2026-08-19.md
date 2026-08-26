# K3 战略统筹 · GMC aggregateRating / review 警告 (2026-08-19 晚)

> **触发**: K3 贴 GMC Console 截图 — 199 个商品缺 `aggregateRating` + `review`, 1 个商品缺 `validFrom` (offers), 9/10 deadline 22 天。
> **性质**: P1, 不紧急。但**触发战略冲突**, 必须 K3 拍板, Mavis 不可擅动。
> **数据源**: GMC Console 截图 + `src/lib/seo.ts` schema 代码 + K3 7/28 v2.1 战略约束。

---

## 一、现状实证 (Mavis 8/19 20:42 查证)

### 代码层

| 项 | 状态 | 来源 |
|---|------|------|
| `aggregateRating` 字段生成 | **条件渲染**: 仅当传 `rating` 参数才输出 (L1248 `if (rating && rating.ratingValue)`) | `src/lib/seo.ts:1248-1256` |
| `review` 字段生成 | **完全缺失** — `generateProductReviewsJsonLd` 函数存在但被 deprecated, **没有任何 .tsx 调用方** (7/28 v2.1 拍板停用) | `src/lib/seo.ts:1426-1429` + `product/[slug]/page.tsx:182` |
| `validFrom` 字段 | **已加** (8/11 K3 GSC warning 修复) — 写死 `'2026-01-01'` | `src/lib/seo.ts:1157` |
| 当前 product 页调用 | 显式传 `undefined` (跳 aggregateRating) | `src/app/[locale]/product/[slug]/page.tsx:182` |

### 战略层冲突

- **K3 7/28 v2.1 §3.3 约束 4**: "无真实评价数据时, 禁止编造 aggregateRating / review"
- **GMC 强制建议** (非 schema.org 强必填): 199 个商品标红 "未填写 aggregateRating / review"
- **冲突性质**: 道德 vs SEO/商业 — 7/28 拍板 "宁可丢 GMC free listing 也不编假数据"
- **8/19 about 页 P0-A 战略**: 刚移除 1,000+ 客户 / 98% 满意度等"不可验证自证数字" (per K3 战略文档 v1.2 §3.3 信任传递论) — 走编造数据路径会自打嘴巴

### 数据源可行性

| 源 | 可行性 | 时间 | 成本 |
|---|--------|------|------|
| Trustpilot Business API | ✅ 可接 | K3 1 h 注册 + 审核 1-3 天 + Mavis 1 d 接入 | Trustpilot free plan 有, paid plan $199/月 |
| Google Reviews API (Places) | ✅ 可接 | K3 验证 GBP (需真实门店) + API key 申请 | $5/1000 calls |
| 现有真实订单评价 | ❌ 无 | zprintpro 没后端订单评价系统, 询盘 → 邮件 → 跟单 (手工) | 0 短期无解 |
| 第三方 review widget (Judge.me / Yotpo) | ✅ SaaS | K3 注册 + 集成 widget | $15-100/月 |
| 站外公开评价 (Facebook, IG) | ⚠️ 难接 | 无 API, 需 scraper | 0 |

---

## 二、3 路径对比 (Mavis 不可擅动, K3 拍板)

### 路径 A: GMC 警告忽略 + 维持 7/28 拍板 (推荐)

**核心**: 跟 7/28 v2.1 §3.3 约束 4 一致, **0 代码修改**, GMC Console 里批量 dismiss 199 个警告。

**步骤**:
1. K3 5 min: GMC Console → 选全部 199 警告 → "Dismiss" → 备注 "Intentionally omitted per 7/28 v2.1 约束 4 (无真实评价数据, 禁止编造)"
2. 1 个 validFrom 警告: 8/11 已修, 等 GMC 下次抓取 (每 7 天) 自动消失
3. 0 代码改动, 0 道德风险, 0 法律风险, 0 push 消耗

**代价**:
- 失去 GMC free listing 资格 (商品在 Google Shopping tab 不再 free 显示)
- 但 zprintpro 流量来源 ≠ GMC free listing (主营: SEO 排名 + 直链 + K3 朋友圈/微信群) — 8/19 GSC 报告 84 国 3,203 imps 来源 organic search, 非 GMC
- GMC free listing 通常贡献 < 5% 跨境 EC 流量, 且对 B2B 印刷 (定制 / 非标 SKU / 询盘式) ROI 偏低 (GMC 偏标准化 SKU, 印刷定制难标准化)

**优点**:
- 跟 7/28 战略原则 100% 一致
- 0 道德 / 法律风险 (未来 AGI 抓取或监管审查都无法挑刺)
- 跟 8/19 about 页 P0-A 战略一致 (刚拍"不可验证数字全删")
- 0 push 消耗 (明早 8/20 push 配额不占)
- K3 5 min 完成

**风险**:
- GMC free listing 失去 = Google Shopping 自然流量 ↓ (估算 < 5% 整体)
- 9/10 deadline 之后再 dismiss, GMC 不会主动下架 (只是 free listing 降级)

---

### 路径 B: 接真实评价 API (Trustpilot / Google Places)

**核心**: 等真实评价数据到位, 1 周+ 时间, 拿真数据填 aggregateRating / review 字段。

**步骤**:
1. K3 注册 Trustpilot Business account (1 h, 需企业域名验证) → 拿到 reviewCount + ratingValue API
2. Mavis 改 `src/lib/seo.ts` generateProductJsonLd, 接收真实 rating + reviews 数组
3. 后端 cron 每天拉 Trustpilot API 一次, 缓存到 Supabase
4. product/[slug]/page.tsx 从 Supabase 读真实数据
5. K3 8/19 8/20 拍板接受, Mavis 1 d 开发, push 1-2 次

**代价**:
- K3 1 h 注册 + 等审核 1-3 天
- Trustpilot free plan 限制 (无 API), paid plan $199/月
- 真实评价从 0 开始积累, 短期 (1-3 月) aggregateRating 还是 0/0 → GMC 还是报缺
- 跟 K3 朋友圈/whatsapp 私域评价习惯冲突 (客户下单后不主动留 Trustpilot)

**优点**:
- 真实数据, 100% 合法, GMC 完全满足
- 长期品牌资产 (Trustpilot score 是 B2B 决策重要参考)
- 跟 7/28 原则 100% 兼容 (用真数据)

**风险**:
- 投资 vs ROI 不确定 ($199/月, 短期 GMC 警告还在)
- 数据积累需要 1-3 月, 期间 9/10 deadline 前 GMC 警告无法消除
- 9/10 deadline 前若 dismiss 警告, 接 B 路径后还要 revert dismiss 状态

---

### 路径 C: 恢复 generateProductReviewsJsonLd (编造数据) — **不推荐**

**核心**: 改 7/28 v2.1 拍板, 恢复 8/4 删除的假 review 数据 (L1430 那些 張先生/李小姐 编造姓名)。

**步骤**:
1. Mavis 改 `src/lib/seo.ts:1430` generateProductReviewsJsonLd, 重新启用
2. 改 `product/[slug]/page.tsx:182` 传 rating={4.8} + reviewCount={27}
3. 8/19 或 8/20 push

**代价**:
- **直接违反 K3 7/28 v2.1 §3.3 约束 4**
- **直接违反 8/19 P0-A 战略 (刚拍"不可验证数字全删")**
- **违反 Google "fake review spam policy"** — 抓到一次警告, 抓到两次降权
- **违反 FTC Endorsement Guides** (美国市场, 跨境法务风险)
- **K3 6/18 user_profile 明确: "对他人编的擦边方案要核: 真实合法还是真擦边违法"** — 编造 review = 真违法
- 1 push 消耗

**优点**: 0 (除了短期 GMC 警告消失, 但风险远大于收益)

**风险**: 见上述, 不再展开, 7/28 拍板是 K3 自己定的, 自己推翻需重大理由

---

## 三、Mavis 建议 + 拍板卡

**Mavis 建议**: 路径 A (GMC 警告忽略 + 维持 7/28 拍板)

**理由 (5 条)**:
1. **跟 K3 反教条原则一致** — 7/28 拍板 36 天前, 7/28 当时就是预见到 GMC 警告, 仍拍 "宁可丢 free listing 也不编"
2. **跟 8/19 about 页 P0-A 战略一致** — 刚拍"不可验证自证数字全删", 转身编 aggregateRating 自打嘴巴
3. **9/10 deadline 22 天充裕** — 不是 immediate P0, 不需要 panic
4. **GMC free listing 流量贡献 < 5%** — 主营 SEO/GEO/直链, GMC 不是核心 channel
5. **路径 B 投资 vs ROI 不确定** — $199/月 Trustpilot + 1-3 月数据积累, 短期 GMC 警告仍存在

**不擅自改代码**: aggregateRating / review 字段 跟 K3 7/28 §3.3 约束 4 直接冲突, 路径 A 是 dismiss GMC 警告 (GMC 端操作, 0 代码); 路径 B 是 L1 K3 真人接 API (Mavis 不能代注册); 路径 C 违反原则 不可走。

---

## 四、拍板卡 (K3 一句话回)

```
GMC aggregateRating/review 警告处理路径:
- [ ] A. 忽略警告 + 维持 7/28 拍板 (5 min, 推荐)
- [ ] B. 接 Trustpilot Business API (1 周+, 真实数据, $199/月)
- [ ] C. 编造数据 (不推荐, 违反 7/28 + 8/19 双拍板)
- 其他: ____________
```

---

## 五、紧急程度 + 时间线

- **deadline**: 9/10/2026 (22 天充裕)
- **validFrom 警告 1 个**: 8/11 已修, 等 GMC 7 天抓取周期自动消失 (8/18 抓的应是改后, 但截图说 8/10 抓 → 下次 8/17 抓 → 8/24 显示修复)
- **aggregateRating 199 / review 199**: 拍板后 K3 5 min (路径 A) 或 1 周+ (路径 B) 处理
- **紧急程度**: P1 (非 immediate, 但不能拖到 9/9 临时抱佛脚)

---

*Mavis / K3 战略统筹 · 2026-08-19 20:42 · 本地落盘不 push*
