# GSC 商家信息「字段 brand 重复」终局处置报告 — 2026-11-14

> 性质: 查案 + 线上取证 + 代码固化 + 强制重抓。触发: GSC 商家信息「字段 brand 重复」验证失败
> (开始 2026/11/2 → 失败 2026/11/14, 受影响 2 项: `https://zprintpro.com/ja/product/white-card-boxes/`
> (白カードボックス, 上次抓取 2026-11-13) + `https://zprintpro.com/ja/product/die-cut-stickers/`
> (型抜きステッカー, 上次抓取 2026-11-01))。

## VERDICT / CONSUMED / DELIVERED / NEXT

- **VERDICT**: 站点端根因链已全部修复并线上验证干净（1 Product 节点 / 1 brand / 无 @id / feed 单 g:brand）；
  剩余 2 个 GSC 受影响项为 **Google 侧陈旧解析快照**（die-cut-stickers 抓取于 11/1 = 修复前；
  white-card-boxes 11/13 抓取仍报 = Google 商家数据解析缓存滞后，11/14 线上实测页面已干净）。
  已执行 IndexNow 强制重抓 297 URL，等待 Google 重解析后应自动清警。
- **CONSUMED**: GSC 报错截图（用户提供）；11/1-11/10 三修复链（brand.ts / JsonLd server / @id 移除 / category ItemList 去重）；
  CF Pages 部署历史（11/2 修复已上线）；线上 HTML 逐块取证。
- **DELIVERED**: ① 线上全站 schema 取证（本节 §1）② 代码固化门禁 #30（§3）③ RushDeliveryFAQ 客户端 schema 缺陷修复（§4）
  ④ IndexNow 297 URL 重抓（§5）⑤ 本报告。
- **NEXT**: K3 GSC 侧动作（§6）+ 11/21 复测（§7）。

## 1. 线上取证（2026-11-14 16:00+08，全部 200）

| 对象 | 结果 |
|---|---|
| /ja/product/white-card-boxes/ + /zh-hk/ + /en/ | 8 个 ld+json 块；Product 块 **1 个 brand**（`@type:Brand, name:ZprintPro`）；**无 @id**；全文档 `"brand"` 键合计 = 1 |
| /ja/product/die-cut-stickers/ + /zh-hk/ + /en/ | 同上：1 Product 节点 / 1 brand / 无 @id |
| category 页（packaging=12 Product=12 brand、stickers=9/9） | 11/10 去重修复在线：每 SKU 恰 1 个 Product 节点 + 1 个 brand |
| 首页 / 三语 | 0 Product / 0 brand（无内嵌商品 schema） |
| merchant-feed 3 locale | 83 items × 恰 1 个 `<g:brand>`（ZprintPro），0 重复 |
| www → apex / 无尾斜杠 → 308 | 均正确，无第二条 URL 变体携带旧 schema |

**残余观察项（非当前触发，记录待后续决策）**: RSC flight 载荷（`self.__next_f.push`）仍内嵌每份
JSON-LD 的完整拷贝（Next.js App Router 序列化服务端元素树的固有行为；2026-11-02 查案已证实 Google
会读取 flight）。@id 移除后 Google 不再把两份合并为同一商品节点（RRT 双样全绿 + GSC 76→3→2 递减即证据），
故 flight 拷贝不再触发 merchant「字段 brand 重复」；但为根除隐患，建议后续评估
「worker 层 HTML 后处理剥离 flight schema」方案（风险：hydration 一致性，需 suppressHydrationWarning 验证，见 §7）。

## 2. 根因链复盘（为什么 76 → 3 → 2）

1. **10/28-10/31**（51→60→76 项）: Product `@id` per-locale + hreflang 归并 → 三语品牌名（智印港/ZprintPro/ジープリント）冲突；feed g:id/mpn 也参与（已修：g:id 前缀 10/28、g:mpn 移除 10/31）。
2. **11/1**（414549e5）: `src/lib/brand.ts` PRODUCT_BRAND_NAME='ZprintPro' —— Product.brand / ItemList 内嵌 brand / feed g:brand 三语统一（可见品牌分层不变）。
3. **11/2**（9b46dc5c + c4605923）: 真正根因 = **'use client' JsonLd 把整份 schema 序列化进 RSC flight**，页面两份 schema，同 @id 被 Google 合并 → 字段重复。修法: JsonLd 去 'use client'（服务端组件）+ 移除 Product @id（不再合并）。
4. **11/10**（c1f99244）: category 页 ItemList 重复发射（18→9 Product 节点）去重。
5. **11/14（本次）**: 线上全站取证确认 1.5 步均已生效且在线；剩余 2 项 = 陈旧快照（证据: die-cut-stickers 抓取 11/1 修复前；white-card-boxes 11/13 抓取但页面 11/2 起已干净，且 CF 部署历史证明修复于 11/2 19:28 上线、此后 schema 代码零变更）。

## 3. 代码固化（防复发，门禁 #30）

- 新增 `scripts/guards/ldjson-client-guard.js`（门童 #30，red 硬拦）: 任何带 `'use client'` 指令的组件
  文件出现 `application/ld+json` / `<JsonLd` / `ld+json` → 拦截（注释字面豁免，JsonLd.tsx 反例注释不误报）。
- 注册: `scripts/check-regression-guard.js`（GUARDS + GUARD_LABELS）；`guard-manifest.json` 已重生成（max #30）。
- 验证: `node scripts/check-regression-guard.js --strict src/` → **🔴 0 命中**（LDJSON_IN_CLIENT_COMPONENT 全量 0）。

## 4. 代码修复: RushDeliveryFAQ 客户端 schema 缺陷

- `src/components/sections/RushDeliveryFAQ.tsx`: 'use client' 组件内联 `<script type="application/ld+json">`
  （FAQPage schema）—— 与 11/2 JsonLd 同缺陷类。已移除客户端 schema script（FAQPage 由服务端组件输出），
  加门禁 #30 规则注释。当前该组件为死代码（全仓零引用），修复后门禁全绿。

## 5. IndexNow 强制重抓（本次关键动作）

- 2 受影响 URL 定向 POST + 297 URL 全量商品批（3 locale × 99 slug）→ `api.indexnow.org` **HTTP 200**。
- 记录: `.hermes/logs/indexnow-2026-11-14.json`。Key/keyLocation 线上可用（200）。
- 预期: Bing/Yandex/Naver 立即重抓；Google 在数天内按 IndexNow 信号重抓重解析。

## 6. K3 GSC 侧动作（真人 3 件，共 ~5 min）

1. **URL Inspection 请求编入索引**: `https://zprintpro.com/ja/product/white-card-boxes/` + `.../die-cut-stickers/`
   （GSC → URL 检查 → 请求编入索引；确认「上次抓取」翻新到 11/14 之后）。
2. **重跑「验证修复」**: 商家信息 → 字段 brand 重复 → 验证修复（待 IndexNow 重抓落地后，建议 11/18 后点）。
3. **7 天后复查**: 受影响项目数应降为 0；若 white-card-boxes 仍报，则基本坐实 Google 解析缓存问题，届时用
   GSC 反馈「重新抓取」+ 本报告 §1 线上取证作证据。

## 7. 后续监控与残余风险

- **复测节点**: 11/21（本周数据窗）查 GSC 商家信息受影响数；预期 0。
- **残余风险 A（flight 载荷）**: 全站 Product/FAQ 等 schema 在 RSC flight 有一份拷贝（Next.js 固有）。
  已证不触发当前错误（@id 移除后 Google 不再合并）；若未来 Google 收紧对 flight 的解析，需评估
  worker 层剥离方案（`cloudflare-entry.ts` 后处理 + `suppressHydrationWarning`，先本地 hydration 实测再上线）。
- **残余风险 B（可见品牌 vs 机器 brand）**: Product.brand 恒为 'ZprintPro'（机器身份），seller/可见文案按语种
  （zh-hk=智印港 / ja=ジープリント）—— 维持 K3 单品牌分层拍板，不因本次改回。
- **数据来源**: GSC 商家信息截图（用户提供，2026-11-14）；CF Pages API deployments 列表（11/2-11/14）；
  线上 curl 探针（本报告 §1，2026-11-14 16:00+08）；git log c4605923/9b46dc5c/414549e5/c1f99244。
