# Etsy 篇写作要件（en 单语）· 2026-09-19 · K3 三项终裁后定稿

> **状态**: 要件就绪，**待 K3 定稿措辞卡后即可开写**
> **口径来源**: title v4 SSoT `docs/2026-09-09-k3-title-rule-v4-write-full.md`
> （原文：半角当量 = 全角 CJK ×2 / 半角 ×1；**en 50-54 raw chars**；9/13 后新改一律 ≤54）

---

## 1. 标题（选定：候选 4）

```
Etsy Seller Printing: 1 Copy, Free Proof | ZprintPro
```
- **半角字符数 = 52**（写满区 50-54 ✅；口径 A/B 对纯 ASCII 恒等）
- 品牌 `ZprintPro` **末尾一次** ✅
- 内含 **4 项痛点中的 2 项**（1 Copy 起订 / Free Proof 打样）

**备选**（均达标，供替换）：

| # | 标题 | 半角数 | 含痛点 |
|---|---|---|---|
| 2 | `Etsy Printing Guide: 1-Copy Min, FDA Files \| ZprintPro` | 54 | 起订 / 合规 |
| 5 | `Etsy Print Partner: From 1 Copy, 2-4 Day \| ZprintPro` | 52 | 起订 / 补货 |
| 3 | `Printing for Etsy Sellers: 1 Copy to Restock \| ZprintPro` | 56 ⚠️超2 | 起订 / 补货 |

> ❌ 已淘汰：`Etsy Seller Printing Guide: From 1 Copy, DHL 2-4 Day Restock | ZprintPro`（72，远超限）

---

## 2. meta description（选定：候选 2）

```
Etsy sellers print from 1 copy with no minimum order and get a free digital proof, DHL 2-4 day restock plus FDA and REACH files on request. 30-second quote.
```
- **156 字符**（目标 150-160 ✅）· 含数字（`1`/`2-4`/`30`）+ CTA（`30-second quote`）
- 覆盖 **全部 4 项痛点**

**备选**：[1] 151 / [3] 151（均达标）

---

## 3. 骨架（6 段，聚焦 K3 裁定的 4 项痛点）

| 段 | 内容 | 口径约束 |
|---|---|---|
| 1 | **H1 + 开篇**：Etsy 卖家为何最关心「起订量」与「补货速度」 | **零竞品对比**（不写 vs Alibaba / 不写平台优劣） |
| 2 | **痛点① 低起订** | 复用 1-B 已上线 `MOQ_DISPLAY[en]` = `From 1 copy (digital) · 100+ cheaper on offset` —— **不新造口径** |
| 3 | **痛点② 免费打样** | 站内既有 `free proof`；**禁「最快 / 保证 / 100%」**（门童 #18 承诺口径） |
| 4 | **痛点③ DHL 2-4 天补货** | 场景化：小批快补、降低压货；**不写倍数 / 量级数字** |
| 5 | **痛点④ FDA + REACH 合规** | `FDA 21 CFR 175.105` + `EU REACH`；文件表述用 **`documents available on request`**，**禁「已获得全部认证」** |
| 6 | **收尾**：材质/工艺速览 + 30 秒 AI 报价 CTA + 内链 | CTA 与内链见 §4 |

---

## 4. 内链（真实 slug，已从 `en.json` 反查核实，非猜测）

| 目标 | 与 Etsy 卖家相关性 |
|---|---|
| `/en/blog/sticker-guide/` | 贴纸类目（Etsy 高频品类）|
| `/en/blog/food-packaging-printing-guide/` | 食品包装（FDA 场景）|
| `/en/blog/paper-bag-printing-guide/` | 纸袋（品牌包装）|
| `/en/blog/packaging-box-custom-guide/` | 定制盒（礼盒/订阅盒）|
| `/en/blog/baby-food-packaging-box-printing-guide/` | 母婴食品（合规场景）|
| `/en/blog/pet-food-sticker-printing-guide/` | 宠物食品（合规场景）|
| `/en/blog/cosmetics-packaging-box-printing-guide/` | 美妆（Etsy 主力品类）|
| `/en/blog/ip-character-sticker-printing-guide/` | IP/同人（Etsy 手工 IP 场景）|

---

## 5. 结构约束（开工硬要求）

1. **en 单语**（K3 裁决 1）—— ja/zh-hk 后置；
2. user-facing 文本含 `[text](url)` 必须走 `parseInlineLinks()`（§0.22 SOP-10 第 5 款）；
3. 标题 ≤54 raw chars（本表已核）；
4. meta description 150-160（本表已核）；
5. H1 唯一且含主词 `Etsy`；
6. 收尾必过「门童六命令 + 三闸门 + 线上验收」。

---

## 6. 合规自检（本要件自身）

✅ 0 命中：竞品名 / 量级数字 / 倍数 / 绝对化（`cheapest`/`guaranteed`/`best`）—— 标题与描述均干净。

> **写作时同样适用**：正文每写一段，须满足措辞卡 §1.2 硬禁止清单（`.hermes/logs/2026-09-19-etsy-wording-card.md`）。
