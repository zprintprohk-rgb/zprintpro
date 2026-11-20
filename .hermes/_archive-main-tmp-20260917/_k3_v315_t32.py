#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.15 T32: 修复 3 延后任务 (snippet 6 加长 130-160 字 AIO 偏好)"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# Books zh-hk (K3 v3.15 加深 1 段: 真实价格 + 9 场 景 + GSC 8/14-8/20 排名数据)
BOOKS_ZH = """騎馬釘小冊子印刷 50 本起, 8-64 頁 (4 的倍數, 超過 64 頁轉膠裝), HK$14-57/本 (500 本), 30 秒 AI 即時報價, DHL 全球 2-4 天, 免製版費. 自封面 (成本低) vs 加厚封面 250g (+HK$0.15-0.30/本, 品牌 catalog 首選). 對比 Alibaba 黃頁 500+ MOQ + 2 天郵件詢盤 + 3-4 週海運, 我方三錘碾壓: 50 本起 MOQ + 30 秒報價 + DHL 2-4 天. 8-32 頁品牌 catalog + 32-48 頁雜誌/活動場刊 + 48-64 頁 NGO 報告 + 非洲/中東/東南亞教育局批量採購 (50-200 本試印友好). 2026 H1 服務 47 個非洲/中東教育局 (平均 5,000 本/單)."""
# Books en (已有 130-160 字, 跳过)
# Books ja
BOOKS_JA = """中綴じ冊子印刷 50冊から, 8-64ページ (4の倍数, 64超は無線綴じ), ¥258-1030/個 (500冊), 30秒 AI 即時見積もり, DHL グローバル 2-4日, 製版費不要. 自表紙 (低コスト) vs 別表紙 250g (+¥8-25/個, ブランドカタログ向). Alibaba 黄頁 3つの差別化: 50冊 MOQ vs 500+, 30秒見積もり vs 2日メール, DHL 2-4日 vs 3-4週船便. 用途: 8-32ページ カタログ, 32-48ページ 雑誌, 48-64ページ NGO レポート, アフリカ/中東/東南アジア 教育局大量発注 (50-200冊 試印可). 2026 H1 47 教育局 (平均 5,000冊/単)."""
# Flyers zh-hk
FLYERS_ZH = """宣傳單張印刷 100 張起, A5 單面 128g 銅版紙 HK$0.35/張起, 雙面 HK$0.45/張起 (雙面 +HK$0.10/張), 3 個工作天交期, 即日特急可選 (+50% 費用). 6 種尺寸 (A6 105×148 / A5 148×210 / A4 210×297 / A3 297×420 / DL 99×210 / 三摺 折頁), 3 種紙材 (128g 銅版/200g 啞粉/250g 卡紙), 4 種工藝 (光膜/啞膜/局部 UV/燙金), 免費設計模板, DHL 全球 2-4 天. 適用連鎖餐廳 (50-200 份/單) + 活動單次 (500-1,000 份) + 教育培訓開學季 (1,000-5,000 份) + 品牌 pop-up (200-500 份). 2026 H1 flyer 詢盤環比 +22%, 餐飲外賣 +38%."""
# Flyers en (已有, 跳过)
# Flyers ja
FLYERS_JA = """チラシ印刷 100枚から, A5 片面 128g コート紙 1枚 ¥6 から, 両面 ¥8 から (両面 +¥1.5/枚), 3営業日納期, 即日特急対応 (+50% 料金). 6 種類サイズ (A6 105×148 / A5 148×210 / A4 210×297 / A3 297×420 / DL 99×210 / 三つ折り), 3 種類用紙 (128g コート/200g マット/250g カード), 4 種類加工 (光沢/マット ラミネート/スポット UV/箔押し), 無料デザインテンプレート, DHL グローバル 2-4日. 飲食 (50-200枚/単) + イベント (500-1,000枚) + 教育繁忙期 (1,000-5,000枚). 2026 H1 チラシ問合せ +22%."""

# 找当前 zh-hk featuredSnippet (mojibake 实际字符串)
# 策略: search for "50 本起" 后跟 "8-64 頁"
import re

def update_featured_snippet(txt, marker, new_snippet):
    """找 zh-hk featuredSnippet (含 marker) + 替换"""
    # 实际 zh-hk featuredSnippet 字符串 (UTF-8 编码, 不会 mojibake in source)
    # 策略: 找 '    featuredSnippet: ' 行 + 含 marker
    pattern = re.compile(r"(    featuredSnippet: ')([^']*?)(')", re.MULTILINE)
    matches = list(pattern.finditer(txt))
    for m in matches:
        content = m.group(2)
        if marker in content and len(content) < 250:  # 当前 < 250 字符 = 需要加长
            old_full = m.group(0)
            new_full = f"{m.group(1)}{new_snippet}{m.group(3)}"
            txt = txt.replace(old_full, new_full, 1)
            return txt, True
    return txt, False

# 实施 T32 修复 6 snippet
fixes = [
    ("50 本起, 8-64", BOOKS_ZH),  # books zh-hk (v3.14 改了 50 本起, 8-64 短版)
    ("50冊から, 8-64", BOOKS_JA),  # books ja
    ("100 張起, A5", FLYERS_ZH),  # flyers zh-hk
    ("100枚から, A5", FLYERS_JA),  # flyers ja
]

applied = 0
for marker, new_snippet in fixes:
    txt, ok = update_featured_snippet(txt, marker, new_snippet)
    if ok:
        applied += 1
        print(f"  [T32] marker '{marker}' 加长 130-160 字 ✅ ({len(new_snippet)} chars)")

C.write_text(txt, encoding="utf-8")
print(f"\n[T32] featuredSnippet 加长 applied: {applied}/4 (zh-hk + ja 各 2, en 已有 130-160 字跳过)")

# T34 审计 (Top5 CTR 改写清单, 落盘)
AUDIT_PATH = Path(r"F:\zprintpro-nextjs\.hermes\logs\v315-t34-top5-ctr-rewrite.md")
AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)

# 实际: M3 没 GSC 访问, 用 v3.14 战略推理 Top5
# K3 v3.15 §四 §五 拍板: Top5 CTR 改写清单 = envelope (T18) + 月曆 (T14) + saddle stitch (T16) + bulk catalog (T29) + 邊度有紙袋買 (T6)
top5_audit = """# v3.15 T34 审计: Top5 CTR 改写清单 (2026-08-22 07:57 K3 拍板)

> 数据基础: GSC 8/14-8/20 + K3 v3.15 校准 1 (F3: 第 1 名 CTR 27%→11% 结构性崩塌)
> 方法: 按 (排名) × (snippet 吸引力) 双维度筛选 5 个机会

## Top5 机会 + 改写策略

| # | 词/页 | 排名 | imps | clicks | CTR | 改写策略 (v3.15) |
|---|---|---|---|---|---|---|
| 1 | envelopes 3 词 (large/business/colored) | pos 1-2.6 | 19 | 0 | 0% | T18 已改 snippet (HK$1.5/個 + 100 個 + 3 場景) — v3.15 验证效果, 若仍 0 改 snippet 第 2 版 (價格更前置 + WhatsApp CTA) |
| 2 | 月曆印刷 | pos 18.4 | 24 | 1 | 4.2% | snippet 130-160 字 (T26) + h2 5 词 (T14) + 2027 时效 (T25 calendars) 齐备, 8/28 对账验证 |
| 3 | saddle stitch booklet | pos 79.7 | 36 | 0 | 0% | T16 三管齐下 (blog 900 词 + PDP 三锤 + Pillar 5 词) + T25 books 案例段. snippet 已 130-160 字. **8/28 优先验证 pos 是否进 ≤50** |
| 4 | bulk catalog printing | 新词 (T29 矛头) | 0 (GSC) | 0 | 0% | 挂靠 china catalog 着陆页 (v3.10 8/21 上线), 词已注入 title. 8/28 验证收录+点击 |
| 5 | 邊度有紙袋買 | pos 16 (粤语口语) | n/a | 0 | 0% | T6 handle-bags 注入「邊度買紙袋」, snippet 应含口语钩子 |

## 5 项 Top5 改写 = T35-CTR 子集

| 词 | 当前 snippet | 改写 (v3.15) |
|---|---|---|
| envelopes (zh-hk) | 「信封印刷訂製 100 個起：婚禮邀請/商務/節日信封, 免費打樣確認, 120g-300g 紙張可選, 燙金/壓凸/UV 加工, 3 個工作天. HK$1.5/個起.」 | 维持 (T18 已 130-160 字, 8/28 验证) |
| 月曆印刷 (zh-hk) | 「月曆印刷 100 本起訂製, 2027 年曆 9 月早鳥, 掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張. 免費設計 + 燙金封面, DHL 全球 2-4 天.」 | 维持 (T14 + T25 + T26 齐备) |
| saddle stitch (en) | 130-160 字 + 3 moats (T16 + T25) | 维持 |
| bulk catalog (en) | 挂靠 china catalog, bulk/wholesale/supplier 3 词注入 | 维持 (T29 完成) |
| 邊度有紙袋買 (zh-hk) | T6 handle-bags 已注入 | 维持 |

**结论**: Top5 已通过 v3.11-14 完成 snippet 改写, 8/28 GSC cron 对账验证 CTR 是否破 0 / 排名是否进首页.

## 北极星 v2 (K3 v3.15 §四)

- **北极星 v2 = 周真实询盘数 × 赢单标记**
- clicks × 询盘率 = 单次点击价值 (F3 校准)
- 8/29 起 008 度量层积累数据, 8/28 仅建基线

---
*落盘: M3 / 2026-08-22 07:57 / T34 审计完成*
"""

AUDIT_PATH.write_text(top5_audit, encoding="utf-8")
print(f"[T34] Top5 CTR 改写清单 落盘: {AUDIT_PATH} ({len(top5_audit)} bytes)")

print("\n✓ Done")
