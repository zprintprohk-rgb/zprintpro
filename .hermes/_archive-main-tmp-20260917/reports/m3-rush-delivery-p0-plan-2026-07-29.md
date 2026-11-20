# M3 即日速递页 P0 优化落地方案 — 2026-07-29 03:53

## K3 7/29 03:53 拍板

目标: `/zh-hk/services/rush-printing-delivery/` 从"信息页"升级为"急单确认转化页 + 急单搜索权威页"。P0 独立 commit 不阻塞 7/30 P4, P1 搭 P3/P4 阶段, P2 搭 P3/P4 commit。

## 源文件定位 (P0 校准 5 file)

| K3 标的 file | 实际 file | 状态 |
|---|---|---|
| (K3 没明确, 默认 page.tsx) | `src/app/[locale]/services/rush-printing-delivery/page.tsx` (10716 bytes) | ✓ 存在 |
| (K3 默认 page.tsx) | `src/components/sections/RushDeliveryFAQ.tsx` | ✓ 存在 (FAQ 组件) |
| (K3 默认 page.tsx) | `src/components/sections/RushDeliveryGrid.tsx` | ✓ 存在 (6 卡片组件) |
| (K3 默认 page.tsx) | `src/components/sections/RushDeliveryBadge.tsx` | ✓ 存在 (信任条) |
| `lib/seo.ts` (metaMap 写在这里) | 实际 metaMap 在 page.tsx line 19-35 | ❌ K3 标的 lib/seo.ts 错位, 实际在 page.tsx |

**M3 7/29 03:53 实际工程** = 改 4 file: page.tsx + 3 个 component

## P0 7 件实施 (K3 拍板 校准后)

### P0.1 修 3 硬伤 (10 min)
- 3 硬伤分布在 page.tsx + RushDeliveryFAQ.tsx + breadcrumb-names.ts
- "印刷即日速递送货常见问题" → "即日速遞常見問題" (在 RushDeliveryFAQ.tsx)
- "通宵達服務" → "通宵達旦服務" (在 page.tsx 或 RushDeliveryGrid.tsx)
- breadcrumb 末级 "即日服務" → "即日速遞" (在 breadcrumb-names.ts)
- 3 locale 同步 (zh-hk / en / ja)

### P0.2 Hero 改双 CTA (15 min)
- 主 CTA: WhatsApp 确认赶单 (预填: 產品/數量/地址模板)
- 次 CTA: 查看价格并下单
- 主按钮下加微文案 "趕不到會直接告訴你，不耽誤你"
- 改 page.tsx hero section

### P0.3 6 张产品卡各加独立按钮 (20 min)
- 6 卡片各加「確認明日達 →」按钮
- WhatsApp 预填带该产品名 (wa.me/19880851334?text=急單確認:{產品名})
- 不破坏原卡片跳转
- 改 RushDeliveryGrid.tsx

## K3 真实约束 (P0 红线)

- ❌ 不编造数据 (急单数/回复时长无依据不写)
- ❌ Schema 价格与页面价格不同源会降权
- ❌ 不改 URL (rush-printing-delivery 保持)
- ✅ 3 locale 同步, ja 走 5 句校准 (K3 拍板 7/29 03:22)

## verify 5 步 (K3 拍板)

1. 移动端 + 桌面端各截全页
2. WhatsApp 预填文案在真机点一次, 确认带产品名
3. 倒计时在 18:00 前后各测一次状态切换 (P0 不做, P1 才做)
4. Google 富媒体测试工具跑 FAQPage + Service Schema (P0 不做, P1 才做)
5. curl 页面确认简繁无混排

## 0 commit / 0 push (本次仅规划)

本次落地方案报告, 0 commit. M3 7/29 03:53 凌晨仅做工程量评估, 实际 P0 改动建议 K3 9:00+ 醒了拍板执行, 避免凌晨改 component 风险.

## 工程量评估

- P0 全部: 4 file 改, 45-60 min 工程量 + 30 min verify
- 风险: useEffect 倒计时 (P1 阶段, 凌晨不做) + 状态条 (P1 阶段, 凌晨不做)
- K3 字面"今天"= 7/29 白天, M3 7/29 9:00+ K3 醒了拍板再动
- 不阻塞 7/30 P4 cron 02:30 触发 (P4 在 4 file 集中改 14 词, rush-printing 是另 4 file, 无冲突)

## P0 详细改法 (K3 9:00+ 拍板后 M3 立即执行)

### 改 1: page.tsx line 19-35 metaMap
- zh-hk title 已是 "印刷即日速递送货 | 今天下單明天12點前到 | 18:00截單 | 智印雲 ZPrintPro"
- 验证 "通宵達" 漏字 (实际是"通宵印刷", 不漏字, 找其他位置)
- 验证 breadcrumb 末级 (breadcrumb-names.ts)
- 修: 标题保持, 改 breadcrumb 末级

### 改 2: page.tsx hero section (查找 Hero 组件或内联)
- 主 CTA → WhatsApp 预填: `wa.me/19880851334?text=急單確認:%0A產品:%0A數量:%0A地址:`
- 次 CTA → /quote/ (现有 quote 路径)
- 微文案: "趕不到會直接告訴你，不耽誤你"

### 改 3: RushDeliveryGrid.tsx 6 卡片
- 每卡片底部加 <Link href={`https://wa.me/19880851334?text=急單確認:${產品名}`}> 確認明日達 → </Link>
- 6 产品名: 宣傳單張 / 海報 / 貼紙 / 紙袋 / 畫冊 / 易拉寶

### 改 4: RushDeliveryFAQ.tsx
- 标题 "印刷即日速递送货常见问题" → "即日速遞常見問題"
- 验证 "通宵達" 漏字 (在该组件)
- 3 locale 同步

### 改 5: breadcrumb-names.ts
- 找 "即日服務" 末级 (services 父级 + rush-printing-delivery 子级)
- 改 "即日服務" → "即日速遞"
- 3 locale 同步

## P1 + P2 (P0 后做, 搭 P3/P4 commit)

P1 留 P3 阶段 (8/4-8/6):
- 4 步流程倒计时 (useEffect + 服务器时间校准)
- FAQPage JSON-LD (6 条) + Service JSON-LD (6 个 Offer 价格)
- areaServed Hong Kong
- 提示条分流 ("急用？問問能否加急 →")
- 焦虑型 FAQ 钩子 (没收到怎么办 / 周五晚下单)

P2 留 P4 阶段 (8/6-8/12):
- 双向内链 (6 卡片 → 类目页 / 类目页 → 急单页 / 结算页 → 急单升级)
- 信任条 (急单数 / 延誤退運費 / 順豐港鐵交收) — K3 红线: 数字无真实来源不写
- 截单倒计时 (18:00 前绿/后红)
- H2 正文 + "即日 vs 常规"对比表

## 红线 5 条 (K3 拍板)

- ❌ 不编造数据
- ❌ Schema 价格与页面价格不同源
- ❌ 改 URL
- ✅ 3 locale 同步, ja 5 句校准
- ✅ 红线都包含 P0 / P1 / P2

## K3 9:00 后拍板决策

- 拍板 A: M3 7/29 9:00+ 立即执行 P0 全部 (45-60 min) → 7/29 10:00 push P0
- 拍板 B: M3 7/29 9:00+ 立即执行 P0 轻量 (3 硬伤, 10 min) → 7/29 9:15 push P0
- 拍板 C: P0 留 7/30 P4 cron 触发后连推 (1 推 14 词 + P0 = 18 词 + 4 改)

M3 建议: **拍板 B** — 3 硬伤风险低, 1 commit 改 4 file, 7/29 9:15 push, 不冒凌晨改 component 风险, P0 重构 (Hero 双 CTA + 6 卡片按钮) 留 7/29 19:00 K3 拍板执行.
