# M3 执行卡: 批 1 十五词 title/meta 重写 (2026-08-26 12:05 K3 拍板)

> **性质**: 照单执行卡, 1 commit 收口. K3 12:05 拍板跟 rush 收口 + blog W1 一起打包, M3 今天一起带走
> **大信封第一优先**: GSC 8/18 baseline pos 2.21 (24 imp 0 click) — B7 W1 #3 选题已绑, 撞车 = M3 自主
> **设计稿/数据来源 SSoT**:
> - 22 词清单: `.hermes/B-22词清单-attachment.txt` (B-22 词清单 1:1 拼对, 8/5 25 词 - 3 金矿已落 = 22 词)
> - GSC baseline: gsc_data.csv 8/18 (大信封 pos 2.21 / 24 imp / 0 click)
> - 模式 per 7481e51 (menus/calendars 改法): 机会词前置 + 卖点中段 + 品牌后置
> - K3 §6 P0: 大信封 pos 2.21 第一优先 (W1 #3 选题 8/19 改完, 此卡先做 15 词 title/meta 抢占首页)

---

## §1 差距矩阵 (15 词 ↔ 现状 slug ↔ 动作)

| # | 词 | imps | pos | slug | locale | 来源 | 现状 | 动作 |
|---|----|------|-----|------|--------|------|------|------|
| 1 | **大信封** | **24** | **2.21** | rush-printing-delivery | zh-hk | 8/18 GSC | ❌ 旧 "即日印刷 CMYK 全彩" 抢词失败 | **第 1 优先, title 改 "大信封印刷 A4/C4/C5 規格 + 起價表"** |
| 2 | poster 印刷 | 61 | 23.84 | posters | zh-hk | 8/18 GSC | ✅ B2 (1baf7fc) 已加固 MTR 12 sheet | 不动 (B2 已撞) |
| 3 | 海報 | 18 | 36.78 | posters | zh-hk | 8/5 25 #9 | ❌ 旧 "即日印刷 CMYK" 不相关 | **title 改 "海報印刷 A0/A1/A2 + MTR 12 sheet 燈箱"** |
| 4 | 信封 | 12 | 51.0 | envelopes | zh-hk | 8/5 25 #24 | ❌ 旧 title 抢词弱 | **title 改 "信封印刷 A4/C4/C5 + 大信封 100 張起印"** |
| 5 | 紙袋 | 13 | 60.85 | paper-bags | zh-hk | 8/5 25 #19 | ❌ 旧 "白卡/牛皮" 抢词弱 | **title 改 "紙袋印刷 100 個起 + 牛皮/白卡/珠光 + 急單 18:00 截單"** |
| 6 | 海報印刷 | 23 | 29.35 | posters | zh-hk | 8/5 25 #7 | ✅ B2 已撞 | 不动 |
| 7 | 信封 印刷 | 15 | — | envelopes | zh-hk | 8/18 GSC 新词 | ❌ 缺 | **title 改 "信封印刷規格 + 100 張起印 + DHL 全球配送"** |
| 8 | 信封顏色 | 8 | — | envelopes | zh-hk | 8/18 GSC 新词 | ❌ 缺 | **title 加 "信封顏色 CMYK/Pantone + 燙金/擊凸"** |
| 9 | 彩色信封 | 8 | — | envelopes | zh-hk | 8/18 GSC 新词 | ❌ 缺 | **title 加 "彩色信封 100 張起印 + 急單"** |
| 10 | 大型封筒 | 6 | — | envelopes | ja | 8/18 GSC 新词 | ❌ 缺 | **title 改 "大型封筒 印刷 A2/B4 + 100 枚〜"** |
| 11 | pearl envelopes | 5 | — | envelopes | en | 8/18 GSC 新词 | ❌ 缺 | **title 加 "Pearl Envelopes Printing 100 MOQ + Custom Color"** |
| 12 | envelope printing price quote china | 4 | — | envelopes | en | 8/18 GSC 新词 | ❌ 缺 | **title 改 "China Envelope Printing Price Quote 100 MOQ"** |
| 13 | 信封 封面 | 5 | — | envelopes | zh-hk | 8/18 GSC 新词 | ❌ 缺 | **title 加 "信封封面設計 + 燙金/擊凸/UV"** |
| 14 | 2 meter poster | 4 | — | posters | en | 8/18 GSC 新词 | ❌ 缺 | **title 加 "2 Meter Poster Printing + 防水 UV"** |
| 15 | 即日 印刷 | 28 | 15.25 | rush-printing-delivery | zh-hk | 8/5 25 #3 | ✅ 8/18 续做 (3 词 rush 改) | 不动 (B1a + rush 收口已撞) |

**实际 15 词改写 (skip #2 #6 #15 已撞)**: 大信封/海報/信封/紙袋/信封 印刷/信封顏色/彩色信封/大型封筒/pearl envelopes/envelope printing price quote china/信封 封面/2 meter poster = **12 处 title/meta 改写, 3 词不撞 skip** (实际 12 处 ≠ 15 词, 因为 3 词已在 B1/B2/rush 收口落地)

**注**: 撞车 = 标题大改 = 撞墙 = M3 自主 (K3 §0.22 SOP-10 第 3 款), 上报 K3 必拍前先查"原数据/拍板来源" (本卡 §0 SSoT)

---

## §2 执行步骤 (顺序不可乱)

### Step 1: 修 5 类目 src/lib/seo.ts 12 改动 (zh-hk + en + ja)

按 7481e51 改法 (机会词前置 + 卖点中段 + 品牌后置), 4 类目 × 3 locale × 1 处 title 改 = 12 改动:

**zh-hk (4 改动)**:
1. `envelopes` title: "信封印刷 A4/C4/C5 + 大信封 100 張起印 | 智印港"
2. `paper-bags` title: "紙袋印刷 100 個起 + 牛皮/白卡/珠光 + 急單 18:00 截單 | 智印港"
3. `posters` title: "海報印刷 A0/A1/A2 + MTR 12 sheet 燈箱 | 智印港"
4. `rush-printing-delivery` title: "大信封印刷 A4/C4/C5 規格 + 起價表 | 即日 18:00 截單 | 智印港"

**en (4 改动)**:
5. `envelopes` title: "Pearl Envelopes Printing 100 MOQ + Custom Color | ZprintPro"
6. `envelopes` title: "China Envelope Printing Price Quote 100 MOQ + DHL Global | ZprintPro"
7. `posters` title: "2 Meter Poster Printing + Waterproof UV + Same-Day Rush | ZprintPro"
8. (其他不动)

**ja (3 改动)**:
9. `envelopes` title: "大型封筒 印刷 A2/B4 + 100 枚〜 + 短納期 | ZprintPro"
10. (其他不动)

**meta description 同步改**: 12 改动对应 12 处 desc, 含「100 張起印」+「順豐/DHL」+「WhatsApp 30 秒報價」

### Step 2: 1 词 description 加强 (大信封第 1 优先)

`rush-printing-delivery` desc 第 1 句: "大信封印刷 A4/C4/C5 規格 + 起價表, 100 張起印, CMYK 全彩防水. 18:00 截單, 順豐翌日中午 12:00 前送到. WhatsApp 30 秒即時報價."

### Step 3: 内部链接加固 (12 处相关类目, 1 commit 内)

每处 title 改完, 在 page.tsx metadata 同步加 canonical + hreflang, 1 类目 1 处改 (per §0.18 重定向上线 SOP 4 步)

### Step 4: pre-commit 3 步 + push

按 §0.7 production smoke 4 步:
- `node scripts/check-encoding.js --fix`
- `npx tsc --noEmit` (54 baseline 不新增)
- `node scripts/verify-deploy.mjs` (push 后 5 min 内)

---

## §3 预检 + 验收 (全过才 push)

### 预检 3 步
```powershell
node scripts/check-encoding.js --fix      # UTF-8 LF
npx tsc --noEmit                          # 54 baseline 不新增
```

### 验收 grep (deploy 后 curl live 跑, 全 PASS 才报完成)
```powershell
curl -s https://zprintpro.com/zh-hk/category/envelopes/ -o env-live.html
curl -s https://zprintpro.com/zh-hk/category/paper-bags/ -o bag-live.html
curl -s https://zprintpro.com/zh-hk/category/posters/ -o poster-live.html
curl -s https://zprintpro.com/zh-hk/services/rush-printing-delivery/ -o rush-live.html

# 12 处 title 改 PASS
(Select-String -Pattern '大信封印刷 A4/C4/C5' rush-live.html).Matches.Count    # ≥1
(Select-String -Pattern '信封印刷 A4/C4/C5' env-live.html).Matches.Count        # ≥1
(Select-String -Pattern '紙袋印刷 100 個起' bag-live.html).Matches.Count        # ≥1
(Select-String -Pattern '海報印刷 A0/A1/A2' poster-live.html).Matches.Count      # ≥1
(Select-String -Pattern 'Pearl Envelopes' env-live.html).Matches.Count           # ≥1 (en)
(Select-String -Pattern '大型封筒' env-live.html).Matches.Count                   # ≥1 (ja)

# 禁词 0 (per §11 主营品类约束 + SOP-10 第 4 款)
(Select-String -Pattern '名片|咭片|business cards' env-live.html+bag-live.html+poster-live.html+rush-live.html).Matches.Count  # =0

# verify-deploy PASS
node scripts/verify-deploy.mjs   # exit 0
```

### 撞车兜底
- 任一验收 grep 不过 → 不 push / 立即修, 禁"勉强达标" (SOP-2)
- 大信封 pos 2.21 验证 ≥ 7d 后 pos 推升 ≤ 1.5 = GSC 8/28 中检 KPI #1/2 推进

---

## §4 红线

1. ⛔ 不删 SKU/文案/长文本字段 (K3 8/22 17:58 F0 业务 0 改动红线)
2. ⛔ 1 commit 收口, 不拆多次 push (K3 §4 红线第 4 条 + §0.21 攒批作废, push 配额充裕)
3. ⛔ 禁词 0 命中 (咭片/名片/business cards, 12 处全部跳过, per §11)
4. ⛔ en/ja title 禁带 Shenzhen/Hong Kong 硬塞前缀 (per §13.10)
5. ⛔ 8/19 大信封 blog 选题前不删 src/lib/seo.ts 现有 title 字段 (W1 #3 选题即将发布, 跟 title 改协同)

---

*整理: M3 12:05 / 数据: 22 词清单 + GSC 8/18 baseline + B2/B3/B1a 已撞跳过 / 跟 rush 收口 + blog W1 一起打包 / docs-only 卡 0 代码改动*
