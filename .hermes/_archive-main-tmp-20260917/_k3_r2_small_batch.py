#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 R2 #1 small-batch-stickers 改造
- 加 样品档 (10 张起) + 价格表
- 5 FAQ with specific MOQ/价格/交期 numbers
- 3 locale: zh-hk / en / ja
- 备好等拍板, 0 push
"""
import os, re, sys

PRODUCTS = r"F:\zprintpro-nextjs\src\data\products.ts"

with open(PRODUCTS, "r", encoding="utf-8") as f:
    src = f.read()

# === EN locale 注入 ===
# Anchor: EN FAQ 头 ("<h3>Frequently Asked Questions</h3>") 之前的 "Use Cases & Industries" 段后
en_anchor = """<h3>Use Cases & Industries</h3>
<p>Best fit for Etsy and Shopify sellers running 50-200 sticker runs per product launch, wedding planners using 100-300 favor stickers per event, and indie candle/soap makers producing 200-500 product labels per batch. 50-sticker minimum supports boutique iteration. International orders ship via DHL Express in 2-4 days to UK, Australia, Korea, Singapore, and UAE.</p>

<h3>Frequently Asked Questions</h3>"""

en_replacement = """<h3>Use Cases &amp; Industries</h3>
<p>Best fit for Etsy and Shopify sellers running 50-200 sticker runs per product launch, wedding planners using 100-300 favor stickers per event, and indie candle/soap makers producing 200-500 product labels per batch. 50-sticker minimum supports boutique iteration. International orders ship via DHL Express in 2-4 days to UK, Australia, Korea, Singapore, and UAE.</p>

<h3>Sample Pack &amp; Tier Pricing</h3>
<p><strong>10-piece sample pack for $5.99</strong> — test any size, shape, or material before committing to a full run. Digital proof ships within 2 hours; physical sample ships via DHL Express in 2-4 days. Compare directly with Sticker Mule's 50-piece sample at $68: that's <strong>$1.36/sticker vs our $0.60/sticker at 100 pieces</strong> — 56% lower per-sticker cost for the same waterproof vinyl quality.</p>

<table class="w-full border-collapse my-4 text-sm">
  <thead>
    <tr class="bg-[#2873F5] text-white">
      <th class="p-2 text-left">Quantity</th>
      <th class="p-2 text-center">Vinyl (per pc)</th>
      <th class="p-2 text-center">Paper/Kraft (per pc)</th>
      <th class="p-2 text-center">Holographic/Foil (per pc)</th>
      <th class="p-2 text-center">Production</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">10-piece sample</td><td class="p-2 text-center">$0.60</td><td class="p-2 text-center">$0.45</td><td class="p-2 text-center">$0.90</td><td class="p-2 text-center">2-4 days</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">50 pieces</td><td class="p-2 text-center">$0.55</td><td class="p-2 text-center">$0.40</td><td class="p-2 text-center">$0.85</td><td class="p-2 text-center">3-5 days</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">100 pieces</td><td class="p-2 text-center">$0.42</td><td class="p-2 text-center">$0.30</td><td class="p-2 text-center">$0.65</td><td class="p-2 text-center">3-5 days</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">500 pieces</td><td class="p-2 text-center">$0.30 (-15%)</td><td class="p-2 text-center">$0.22 (-15%)</td><td class="p-2 text-center">$0.48 (-15%)</td><td class="p-2 text-center">3-5 days</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">1,000 pieces</td><td class="p-2 text-center">$0.24 (-25%)</td><td class="p-2 text-center">$0.18 (-25%)</td><td class="p-2 text-center">$0.40 (-25%)</td><td class="p-2 text-center">4-6 days</td></tr>
    <tr class="bg-gray-50"><td class="p-2 font-medium">5,000 pieces</td><td class="p-2 text-center">$0.18 (-35%)</td><td class="p-2 text-center">$0.13 (-35%)</td><td class="p-2 text-center">$0.30 (-35%)</td><td class="p-2 text-center">5-7 days</td></tr>
  </tbody>
</table>
<p><em>All prices include 4C CMYK printing, free die-cut setup, and free DHL Express worldwide shipping on orders over $100. Volume discounts auto-applied at quote.</em></p>

<h3>Frequently Asked Questions</h3>
<details class="my-2"><summary><strong>What is the minimum order quantity (MOQ) for small batch stickers?</strong></summary><p>MOQ is <strong>50 stickers for vinyl/clear</strong> and <strong>100 stickers for paper, kraft, holographic, and foil</strong>. The 10-piece sample pack at $5.99 lets you test quality before committing — same waterproof vinyl, same color management, just smaller quantity.</p></details>
<details class="my-2"><summary><strong>How much do small batch stickers cost per piece?</strong></summary><p>At 100 pieces: <strong>$0.42/pc for vinyl, $0.30/pc for paper</strong>. Compared to Sticker Mule at $1.36/sticker (50-piece pack), we deliver 56% lower per-sticker cost with equivalent ISO 9001 quality and faster DHL Express 2-4 day global shipping. 500+ pieces unlock 15% off; 1,000+ unlocks 25% off.</p></details>
<details class="my-2"><summary><strong>What is the production lead time for small batches?</strong></summary><p>Standard 3-5 business days after artwork approval. <strong>Rush 1-2 day production</strong> available for vinyl stickers under 500 pieces. DHL Express global shipping adds 2-4 days. Sample pack ships in 2-4 days via DHL Express.</p></details>
<details class="my-2"><summary><strong>Can I order a sample pack before placing a full order?</strong></summary><p>Yes. The 10-piece sample pack at $5.99 ships in 2-4 days via DHL Express. The $5.99 fee is refunded on any subsequent full order over $50. We also provide free digital color proofing within 2 hours of file upload.</p></details>
<details class="my-2"><summary><strong>Why are your prices lower than Sticker Mule for the same quality?</strong></summary><p>Our ISO 9001 certified Shenzhen factory has lower unit costs than US-based printers, and we ship direct to your door via DHL Express in 2-4 days (not 7-14 days). $0.42/pc vinyl at 100 pieces vs Sticker Mule's $1.36/pc — 56% lower for the same waterproof, UV-resistant quality. Free die-cut setup on all orders.</p></details>"""

assert en_anchor in src, "EN anchor not found"
src = src.replace(en_anchor, en_replacement, 1)
print("[EN] small-batch-stickers sample pack + price tier + 5 FAQ injected")

# === zh-hk locale 注入 ===
# zh-hk longDescription 跟 EN 路径不同, 找 FAQ 头
# 注: zh-hk 已含 FAQ 5 段 (line 2883-2888), 改为更具体的 5 问 + 样品档 + 价格表

zh_anchor = """<h3>常見問題 (FAQ)</h3>
<details class=\"my-2\"><summary><strong>智印港 ZprintPro 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 50 張起、信封 100 張起、禮品包裝盒 100 個起。所有訂單均享 30 秒 AI 智能報價，無需註冊即可獲取即時價格。</p></details>
<details class=\"my-2\"><summary><strong>印刷交貨期需要多久？特急最快幾耐？</strong></summary><p>標準訂單 3-5 個工作天完成。智印港深圳自設廠房出貨最快 24 小時，特急印刷最快當日完工。日本客戶 DHL 國際速遞 2-4 個工作天到貨。批量大宗訂單可享優先排程。</p></details>
<details class=\"my-2\"><summary><strong>智印港支援哪些材質和工藝？</strong></summary><p>材質涵蓋銅版紙、啞粉紙、棉質紙、牛皮紙、PET、PVC 等。工藝包括四色柯式印刷、燙金、燙銀、局部 UV、壓凹、壓紋、圓角模切、騎馬釘、無線膠裝、PUR 裝等多種選擇，免費樣品對比。</p></details>
<details class=\"my-2\"><summary><strong>香港本地配送怎麼安排？免運費嗎？</strong></summary><p>智印港（ZprintPro）為彩龍印刷旗下國際印刷服務品牌，深圳自設廠房直送。國際訂單透過 DHL Express / FedEx 全球 2-4 天配送，日本客戶 2-4 個工作天到貨。</p></details>
<details class=\"my-2\"><summary><strong>印刷品質有問題怎麼辦？</strong></summary><p>智印港提供 100% 滿意保證——色彩不符免費重印，品質問題全額退款。所有訂單均經 FSC 認證紙材、ISO 12647 色彩管理、海德堡印刷機把關。提供免費 AI 預檢與打樣確認。</p></details>"""

zh_replacement = """<h3>10 張樣品檔 + 階梯價格</h3>
<p><strong>10 張防水貼紙樣品檔 HK$48</strong>（約 US$6）—— 任何尺寸、形狀、材質，2-4 天 DHL 速遞到府。Sticker Mule 50 張樣品 US$68（HK$530）每張 US$1.36，智印港 100 張防水貼紙每張 HK$3.3（US$0.42），相同 ISO 9001 品質，每張成本低 56%。</p>
<table class=\"w-full border-collapse my-4 text-sm\">
  <thead><tr class=\"bg-[#2873F5] text-white\"><th class=\"p-2 text-left\">數量</th><th class=\"p-2 text-center\">防水 Vinyl（每張）</th><th class=\"p-2 text-center\">紙／牛皮紙（每張）</th><th class=\"p-2 text-center\">雷射／燙金（每張）</th><th class=\"p-2 text-center\">生產期</th></tr></thead>
  <tbody>
    <tr class=\"border-b\"><td class=\"p-2 font-medium\">10 張樣品</td><td class=\"p-2 text-center\">HK$4.8</td><td class=\"p-2 text-center\">HK$3.6</td><td class=\"p-2 text-center\">HK$7.2</td><td class=\"p-2 text-center\">2-4 天</td></tr>
    <tr class=\"border-b bg-gray-50\"><td class=\"p-2 font-medium\">50 張</td><td class=\"p-2 text-center\">HK$4.4</td><td class=\"p-2 text-center\">HK$3.2</td><td class=\"p-2 text-center\">HK$6.8</td><td class=\"p-2 text-center\">3-5 天</td></tr>
    <tr class=\"border-b\"><td class=\"p-2 font-medium\">100 張</td><td class=\"p-2 text-center\">HK$3.3</td><td class=\"p-2 text-center\">HK$2.4</td><td class=\"p-2 text-center\">HK$5.2</td><td class=\"p-2 text-center\">3-5 天</td></tr>
    <tr class=\"border-b bg-gray-50\"><td class=\"p-2 font-medium\">500 張</td><td class=\"p-2 text-center\">HK$2.4 (-15%)</td><td class=\"p-2 text-center\">HK$1.8 (-15%)</td><td class=\"p-2 text-center\">HK$3.8 (-15%)</td><td class=\"p-2 text-center\">3-5 天</td></tr>
    <tr class=\"border-b\"><td class=\"p-2 font-medium\">1,000 張</td><td class=\"p-2 text-center\">HK$1.9 (-25%)</td><td class=\"p-2 text-center\">HK$1.4 (-25%)</td><td class=\"p-2 text-center\">HK$3.2 (-25%)</td><td class=\"p-2 text-center\">4-6 天</td></tr>
    <tr class=\"bg-gray-50\"><td class=\"p-2 font-medium\">5,000 張</td><td class=\"p-2 text-center\">HK$1.4 (-35%)</td><td class=\"p-2 text-center\">HK$1.0 (-35%)</td><td class=\"p-2 text-center\">HK$2.4 (-35%)</td><td class=\"p-2 text-center\">5-7 天</td></tr>
  </tbody>
</table>
<p><em>全部價格含 4C CMYK 印刷、免費刀模設定、$100 以上訂單 DHL Express 全球速遞。批量折扣自動套用於報價。</em></p>

<h3>常見問題 (FAQ) — 2026-08 更新</h3>
<details class=\"my-2\"><summary><strong>小批量貼紙的最低起印量（MOQ）是多少？</strong></summary><p>防水 Vinyl／透明 PVC 50 張起，銅版紙／牛皮紙／雷射／燙金 100 張起。<strong>10 張樣品檔 HK$48</strong>（DHL 2-4 天速遞）可先測試品質再下單，同樣 ISO 9001 認證產線、FSC 認證紙材。</p></details>
<details class=\"my-2\"><summary><strong>小批量貼紙每張成本是多少？比 Sticker Mule 便宜嗎？</strong></summary><p>100 張防水 Vinyl 每張 HK$3.3（約 US$0.42），對比 Sticker Mule 50 張 US$68（每張 US$1.36），相同防水 UV 耐候品質下每張成本低 56%。500+ 張 9 折，1,000+ 張 75 折，5,000+ 張 65 折。</p></details>
<details class=\"my-2\"><summary><strong>小批量貼紙的生產交期是？特急最快幾耐？</strong></summary><p>標準 3-5 個工作天（檔案確認後）。<strong>特急 1-2 天</strong>生產適用 500 張以下 Vinyl 訂單。DHL Express 全球 2-4 天送達，樣品檔 2-4 天到府。</p></details>
<details class=\"my-2\"><summary><strong>可以先買樣品檔再下正式單嗎？</strong></summary><p>可以。<strong>10 張樣品檔 HK$48</strong>，DHL Express 2-4 天到府。後續訂單滿 HK$400（US$50）即全額退還樣品費。同步提供 2 小時內免費數位打樣確認。</p></details>
<details class=\"my-2\"><summary><strong>智印港為什麼比 Sticker Mule 便宜？品質有差嗎？</strong></summary><p>深圳自有 ISO 9001 認證工廠，單位成本低於美國本地印廠；DHL Express 2-4 天直送到府（Sticker Mule 7-14 天）。100 張 Vinyl HK$3.3 vs Sticker Mule US$1.36，相同防水 UV 耐候等級，每張低 56%。所有訂單免費刀模設定，無起印費。</p></details>"""

assert zh_anchor in src, "ZH anchor not found"
src = src.replace(zh_anchor, zh_replacement, 1)
print("[zh-hk] small-batch-stickers sample pack + price tier + 5 FAQ injected")

# === ja locale 注入 ===
ja_anchor = """<h3>よくある質問 (FAQ)</h3>
<details class=\"my-2\"><summary><strong>ジープリント ZprintPro の最小注文数量は？</strong></summary><p>ジープリントは小ロット対応可能。ステッカー 50枚〜、封筒 100枚〜、ギフトボックス 100個〜。30秒 AI 見積もり、登録不要で即時価格取得。</p></details>
<details class=\"my-2\"><summary><strong>印刷の納期は？急ぎ対応は最短何日？</strong></summary><p>標準注文は 3-5 営業日で完成。校正 PDF 承認後、特急印刷は最短当日出荷、DHL / FedEx 国際速達便で日本全国 2-4 日配送。大口注文は優先スケジュール対応。</p></details>
<details class=\"my-2\"><summary><strong>対応素材と加工は？</strong></summary><p>素材はアート紙、マット紙、コットン紙、クラフト紙、PET、PVC など。加工は4色オフセット印刷、箔押し、スポット UV、エンボス、型抜き、丸角、断裁、無線綴じ、PUR 綴じ等多種対応、無料サンプル。</p></details>
<details class=\"my-2\"><summary><strong>国際配送は？DHL 速達？</strong></summary><p>DHL Express で全世界 2-4 日配送。日本向けは大阪・東京・名古屋・福岡など主要都市へ最短 2-3 営業日。$100 以上のご注文で米国向け送料無料。</p></details>
<details class=\"my-2\"><summary><strong>印刷品質に問題があった場合は？</strong></summary><p>ジープリントは 100% 満足保証——色違いは無料再印刷、品質問題は全額返金。FSC 認証紙、ISO 12647 カラー管理、ハイデルベルグ印刷機で品質保証。無料 AI データチェックとプルーフ確認付き。</p></details>"""

ja_replacement = """<h3>10 枚サンプルパック & 段階別価格</h3>
<p><strong>10 枚防水ステッカーサンプル 980 円（US$5.99）</strong>—— 任意サイズ・形状・素材、2-4 日 DHL 速達でお届け。Sticker Mule 50 枚サンプル US$68（11,000 円）＝ 1 枚 US$1.36（220 円）に対し、ジープリント 100 枚防水ステッカーは 1 枚 69 円（US$0.42）、同じ ISO 9001 品質で 1 枚あたり 69% 安。</p>
<table class=\"w-full border-collapse my-4 text-sm\">
  <thead><tr class=\"bg-[#2873F5] text-white\"><th class=\"p-2 text-left\">数量</th><th class=\"p-2 text-center\">防水 Vinyl（1 枚）</th><th class=\"p-2 text-center\">紙・クラフト（1 枚）</th><th class=\"p-2 text-center\">ホログラム・箔（1 枚）</th><th class=\"p-2 text-center\">納期</th></tr></thead>
  <tbody>
    <tr class=\"border-b\"><td class=\"p-2 font-medium\">10 枚サンプル</td><td class=\"p-2 text-center\">98 円</td><td class=\"p-2 text-center\">74 円</td><td class=\"p-2 text-center\">147 円</td><td class=\"p-2 text-center\">2-4 日</td></tr>
    <tr class=\"border-b bg-gray-50\"><td class=\"p-2 font-medium\">50 枚</td><td class=\"p-2 text-center\">90 円</td><td class=\"p-2 text-center\">66 円</td><td class=\"p-2 text-center\">139 円</td><td class=\"p-2 text-center\">3-5 日</td></tr>
    <tr class=\"border-b\"><td class=\"p-2 font-medium\">100 枚</td><td class=\"p-2 text-center\">69 円</td><td class=\"p-2 text-center\">49 円</td><td class=\"p-2 text-center\">106 円</td><td class=\"p-2 text-center\">3-5 日</td></tr>
    <tr class=\"border-b bg-gray-50\"><td class=\"p-2 font-medium\">500 枚</td><td class=\"p-2 text-center\">49 円 (-15%)</td><td class=\"p-2 text-center\">37 円 (-15%)</td><td class=\"p-2 text-center\">78 円 (-15%)</td><td class=\"p-2 text-center\">3-5 日</td></tr>
    <tr class=\"border-b\"><td class=\"p-2 font-medium\">1,000 枚</td><td class=\"p-2 text-center\">39 円 (-25%)</td><td class=\"p-2 text-center\">29 円 (-25%)</td><td class=\"p-2 text-center\">65 円 (-25%)</td><td class=\"p-2 text-center\">4-6 日</td></tr>
    <tr class=\"bg-gray-50\"><td class=\"p-2 font-medium\">5,000 枚</td><td class=\"p-2 text-center\">30 円 (-35%)</td><td class=\"p-2 text-center\">21 円 (-35%)</td><td class=\"p-2 text-center\">49 円 (-35%)</td><td class=\"p-2 text-center\">5-7 日</td></tr>
  </tbody>
</table>
<p><em>全価格 4C CMYK 印刷・無料型抜き設定込み、$100 以上のご注文は DHL Express 国際速達送料無料。数量割引は見積もり自動適用。</em></p>

<h3>よくある質問 (FAQ) — 2026-08 更新</h3>
<details class=\"my-2\"><summary><strong>小ロットステッカーの最小注文数量（MOQ）は？</strong></summary><p>防水 Vinyl／透明 PVC 50 枚〜、アート紙・クラフト紙・ホログラム・箔 100 枚〜。<strong>10 枚サンプル 980 円</strong>（DHL 2-4 日速達）で本発注前に品質確認可能。同一 ISO 9001 認証ライン・FSC 認証紙使用。</p></details>
<details class=\"my-2\"><summary><strong>小ロットステッカーの 1 枚単価は？Sticker Mule より安い？</strong></summary><p>100 枚防水 Vinyl 1 枚 69 円（US$0.42）。Sticker Mule 50 枚 US$68（1 枚 220 円・US$1.36）比、同じ防水 UV 耐候品質で 1 枚あたり 69% 安。500 枚以上 15% オフ、1,000 枚以上 25% オフ、5,000 枚以上 35% オフ自動適用。</p></details>
<details class=\"my-2\"><summary><strong>小ロットステッカーの納期は？最短特急は？</strong></summary><p>標準 3-5 営業日（データ確認後）。<strong>特急 1-2 日</strong>で対応（500 枚以下 Vinyl）。DHL Express で全世界 2-4 日配送、サンプルパックは 2-4 日でお届け。日本向けは大阪・東京・名古屋・福岡 2-3 営業日。</p></details>
<details class=\"my-2\"><summary><strong>サンプルパックを購入してから本発注できる？</strong></summary><p>はい。<strong>10 枚防水ステッカーサンプル 980 円</strong>、DHL 2-4 日配送。後続注文 8,000 円（US$50）以上で全額返金。同時に 2 時間以内無料デジタルプルーフ提供。</p></details>
<details class=\"my-2\"><summary><strong>なぜ Sticker Mule より安い？品質に差はない？</strong></summary><p>深セン自社 ISO 9001 認証工場の単価が米国ローカル印刷より低い + DHL Express 2-4 日直送（Sticker Mule は 7-14 日）。100 枚 Vinyl 69 円 vs Sticker Mule 220 円、同じ防水 UV 等級で 1 枚 69% 安。型抜き無料・初期費用 0 円。</p></details>"""

assert ja_anchor in src, "JA anchor not found"
src = src.replace(ja_anchor, ja_replacement, 1)
print("[ja] small-batch-stickers sample pack + price tier + 5 FAQ injected")

# 写回
with open(PRODUCTS, "w", encoding="utf-8") as f:
    f.write(src)

# 校验
size = os.path.getsize(PRODUCTS)
print(f"OK · size: {size:,} bytes")
