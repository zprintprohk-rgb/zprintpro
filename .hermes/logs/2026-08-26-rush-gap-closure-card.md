# M3 执行卡: Rush 页 50% 差距补齐 (2026-08-26 11:38 K3 拍板)

> **性质**: 照单执行卡, 1 commit 收口。设计稿已 K3 拍板, **照转组件, 禁止自己发挥** (文案/配色/结构以设计稿为唯一准)
> **设计稿唯一来源**: `C:\Users\Administrator\.openclaw-autoclaw\agents\zprintpro\workspace\.cluster\rush-page-20260826\deliverable-A-rush-page.html` (488 行)
> **现状实测 (8/26 11:30 curl live)**: 8 Section 只上了 4 个 (capacity/price/cta-form/floating), Hero/时间轴/场景卡/FAQ 仍是旧骨架, title/meta 未换, 埋点仅 2 处

---

## §1 差距矩阵 (设计稿行号 ↔ 现状 ↔ 动作)

| 设计稿 Section | 行号 | 现状 | 动作 |
|---------------|------|------|------|
| S1 hero | **L204-230** | ❌ 旧 hero (H1「印刷即日速递送货」) | **新建 RushHero.tsx 替换** |
| S2 timeline | **L231-266** | ❌ 缺失 | **新建 RushTimeline.tsx** |
| S3 scenarios | **L267-313** | ❌ 旧 RushDeliveryGrid 凑数 | **新建 RushScenarios.tsx 替换** |
| S4 capacity | L314-339 | ✅ RushCapacity 已上 | 不动 |
| S5 price | L340-366 | ✅ RushPriceTable 已上 | 不动 |
| S6 faq | **L367-400** | ❌ 旧 RushDeliveryFAQ 凑数 | **新建 RushFaq.tsx 替换** (定稿 6 条) |
| S7 cta-form | L401-433 | ✅ RushCtaForm 已上 | 核对字段即可 |
| S8 floating | L434-440 | ✅ RushFloating 已上 | 不动 |
| title/meta | L8-10 (head) | ❌ 旧文案 | **page.tsx metadata 3 locale 全换** |
| 埋点 | L218/222/361/406-410/434/438-439 | ❌ live 仅 2 处 | **全 CTA 补齐 ≥8 处** |

## §2 执行步骤 (顺序不可乱)

### Step 1: 转 4 个新组件 (照设计稿行号逐段转, 复制文案 verbatim)

1. `src/components/services/RushHero.tsx` ← 设计稿 L204-230
   - H1 必须 verbatim: `即日印刷・即日急件 — 今晚 6 點前落單，聽日中午 12 點前到` (L209)
   - 副题 + 主 CTA「WhatsApp 即時報價」(橙 #F87314) + 副 CTA「致電 +86 198 8085 1334」(描边)
   - 信任条 verbatim: 「✓ 30 秒 AI 報價 ✓ 自營工廠直印 ✓ 順豐翌日中午前送達 ✓ 每日 18:00 截單」
   - 背景用已上线的 `/images/factory/factory-hero.webp` + 深色遮罩
2. `src/components/services/RushTimeline.tsx` ← L231-266
   - 4 时刻: 18:00 你落單 → 22:00 印刷完成 → 06:00 分揀包裝 → 翌日 12:00 你收貨
   - 大数字时刻 + 橙圆点 + 底部截單提示行
3. `src/components/services/RushScenarios.tsx` ← L267-313
   - 6 卡 verbatim: 展會物料/投標文件/活動海報/開業傳單/易拉寶急單/貼紙急單
4. `src/components/services/RushFaq.tsx` ← L367-400
   - 定稿 6 条 verbatim (18:00 截單/價錢差/過點點算/順豐+港鐵交收/文件格式/改稿)
   - ⛔ 禁「自取點」字眼 (无 HK 門市)

### Step 2: page.tsx 骨架重排

`src/app/[locale]/services/rush-printing-delivery/page.tsx`:
- 删: 旧 hero 段 (L220 附近 h1)、`<RushDeliveryGrid>` (L306)、`<RushDeliveryFAQ>` (L315) 及对应 import (L13-14)
- 新顺序: RushHero → RushTimeline → RushScenarios → RushCapacity → RushPriceTable → RushFaq → RushCtaForm → RushFloating
- ⛔ 旧组件文件不删 (RushDeliveryGrid 首页还在用, grep 确认引用后再定)

### Step 3: title/meta 3 locale 全换 (page.tsx generateMetadata)

- zh-hk title: `即日印刷・即日急件｜18:00 截單 聽日 12:00 前到 | 智印港 ZprintPro`
- zh-hk description: 含 18:00 截單 + 100 張起 + 順豐翌日中午 + WhatsApp 30 秒報價 (150-160 字符)
- en: `Same-Day Printing HK | Order by 6pm, Delivered Next Day 12pm | ZprintPro` (en 市场用 same-day 语义, 描述不带 Shenzhen)
- ja: `即日印刷・当日特急 | 18:00締切 翌日12時着 | ZprintPro`
- ⛔ en/ja 禁带 Shenzhen/Hong Kong 硬塞前缀 (§13.10)

### Step 4: 埋点补齐 (与已有 4 组件同一 zpTrack 模式)

- 所有 CTA: `data-event` (whatsapp_click/tel_click/form_open/form_submit) + `data-source="rush-printing"` + `data-locale={locale}`
- 参照设计稿行号: L218 / L222 / L361 / L406-410 / L434 / L438-439 共 ≥8 处
- WhatsApp 链接统一走 `getWhatsAppLinkProps` (系统 1, 进 whatsapp_inquiries 表), ⛔ 禁裸 `<a href="wa.me">` 无埋点

### Step 5: JSON-LD 核对

- 现有 3 块保留; FAQPage mainEntity 必须换成 RushFaq 新 6 条 (与页面可见 FAQ 一致, Google 要求内容匹配)
- Organization address 深圳不变

## §3 预检 + 验收 (全过才 push)

### 预检 3 步
```bash
node scripts/check-encoding.js --fix     # UTF-8 LF, python 写文件 newline='\n'
npx tsc --noEmit                         # 54 baseline 不新增
npm run build                            # Compiled successfully
```

### 验收 grep (deploy 后 curl live 跑, 全 PASS 才报完成)
```bash
curl -s https://zprintpro.com/zh-hk/services/rush-printing-delivery/ -o rush-live.html
grep -c '即日印刷・即日急件 — 今晚 6 點前落單' rush-live.html   # 期望 ≥1 (新 H1)
grep -o '<title>[^<]*</title>' rush-live.html                   # 期望含「18:00 截單 聽日 12:00 前到」
grep -o '22:00\|06:00\|分揀包裝' rush-live.html | wc -l         # 期望 ≥3 (时间轴)
grep -c '展會物料\|投標文件\|開業傳單' rush-live.html           # 期望 ≥3 (新场景卡)
grep -c 'data-event' rush-live.html                             # 期望 ≥8
grep -coE '名片|咭片|business cards|4 小時出貨|今日落單|14:00 截單|當日達|自取點' rush-live.html  # 期望 0
grep -c 'application/ld+json' rush-live.html                    # 期望 ≥3
node scripts/verify-deploy.mjs                                  # 期望 exit 0
```

### 撞车兜底
- 任一验收 grep 不过 → 不 push / 立即修, 禁"勉强达标"措辞 (SOP-2)
- 设计稿与现有代码冲突 (如 class 命名) → 以设计稿视觉为准, Tailwind 等价实现, 不报假设不 retrofit (SOP-9)
- RushDeliveryGrid/RushDeliveryFAQ 删除引发其他页报错 → grep 引用确认, 首页仍用则保留文件只摘 rush 页引用

## §4 红线

1. ⛔ 不改 nav (23b4feb nav 入口已 K3 拍板上线, 不动)
2. ⛔ 不动已上线 4 组件 (capacity/price/cta-form/floating) 除非 Step 4 埋点补齐需要
3. ⛔ 禁词清单验收时必须 0 命中, 含「自取點」
4. ⛔ 1 commit 收口, 不拆多次 push (CF quota)
5. ⛔ 文案以设计稿 verbatim, 禁自由发挥; 如需调整 → 撞墙升级 K3

*整理: 2026-08-26 / 数据来源: 设计稿行号实测 + live curl 实测 / 本卡替代一切口头转述*
