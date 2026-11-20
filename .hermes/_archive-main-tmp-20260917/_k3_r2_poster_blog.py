#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 R2 #3 poster-printing-price-guide (en) 内链加固
- rank 8.98 / 42 imps / 1 click
- 加 "Related Guides" 段: 5-7 内部链接 → en 流量枢纽
- 注入到 content 末尾 (FAQ 后)
"""
import json, os, re

EN_JSON = r"F:\zprintpro-nextjs\src\data\blog-data\en.json"
ZH_JSON = r"F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json"
JA_JSON = r"F:\zprintpro-nextjs\src\data\blog-data\ja.json"

def inject(json_path: str, slug: str, related_block_html: str, marker_comment: str):
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if slug not in data:
        print(f"  [WARN] {slug} not in {json_path}")
        return False
    content = data[slug].get("content", "")
    if not content:
        print(f"  [WARN] {slug} content empty in {json_path}")
        return False
    # 在 content 末尾前注入（如果已有 related guide 就不重复加）
    if "<!-- RELATED-GUIDES-2026-08 -->" in content:
        print(f"  [SKIP] {slug} already has related guides marker in {json_path}")
        return False
    # 在 content 末尾 (最后一个 </p> 或 </h3> 后) 注入
    new_content = content.rstrip() + "\n\n" + related_block_html
    data[slug]["content"] = new_content
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  [OK] {slug} related guides injected in {json_path}")
    return True

# === en 内链加固 (主战场, rank 8.98) ===
en_related = """<!-- RELATED-GUIDES-2026-08 -->
<div class="bg-[#F0F7FF] border-l-4 border-[#2873F5] p-6 my-8 rounded-r-lg">
  <h3 class="text-lg font-bold text-[#1A56DB] mb-3">📘 Related Guides &amp; Frequently Paired Products</h3>
  <p class="text-sm text-gray-700 mb-3">Posters rarely ship alone — pair them with these ZprintPro essentials to plan a complete campaign:</p>
  <ul class="text-sm text-gray-700 space-y-2">
    <li>🚀 <strong>Need it fast?</strong> See our <a href="/en/services/rush-printing-delivery/" class="text-[#2873F5] hover:underline font-medium">same-day rush printing service</a> — A1/A2 posters ship in 24-48 hours via DHL Express.</li>
    <li>🛍️ <strong>Pair with envelopes:</strong> Add branded <a href="/en/category/envelopes/" class="text-[#2873F5] hover:underline font-medium">custom envelopes</a> (100 MOQ, $0.45/pc kraft) to mail your posters as direct mailers.</li>
    <li>📦 <strong>Pair with packaging:</strong> <a href="/en/category/packaging/" class="text-[#2873F5] hover:underline font-medium">Custom packaging boxes</a> (100 MOQ) for retail shipments containing posters, prints, or merch.</li>
    <li>🛍️ <strong>Pair with paper bags:</strong> Branded <a href="/en/category/paper-bags/" class="text-[#2873F5] hover:underline font-medium">paper bags</a> with 100-MOQ to hand out posters at trade shows and pop-up events.</li>
    <li>📚 <strong>More size guides:</strong> Read our <a href="/en/blog/catalog-printing-guide/" class="text-[#2873F5] hover:underline font-medium">catalog &amp; art book printing guide</a> for premium bound print products.</li>
    <li>🏷️ <strong>Add stickers:</strong> Brand each poster tube or mailer with <a href="/en/product/small-batch-stickers/" class="text-[#2873F5] hover:underline font-medium">small batch vinyl stickers</a> (50 MOQ, $0.42/pc at 100 pieces).</li>
  </ul>
  <p class="text-xs text-gray-500 mt-4">Last updated: August 2026 · ZprintPro (智印港 ZprintPro) · Free shipping $99+ USA · DHL Express 2-4 days worldwide.</p>
</div>"""

# === zh-hk 内链加固 (主战场, 同步) ===
zh_related = """<!-- RELATED-GUIDES-2026-08 -->
<div class="bg-[#F0F7FF] border-l-4 border-[#2873F5] p-6 my-8 rounded-r-lg">
  <h3 class="text-lg font-bold text-[#1A56DB] mb-3">📘 相關指南與常用搭配</h3>
  <p class="text-sm text-gray-700 mb-3">海報通常不會單獨寄出，搭配以下智印港產品規劃完整活動：</p>
  <ul class="text-sm text-gray-700 space-y-2">
    <li>🚀 <strong>趕時間？</strong>查看我們的<a href="/zh-hk/services/rush-printing-delivery/" class="text-[#2873F5] hover:underline font-medium">即日印刷特急服務</a>——A1/A2 海報 DHL 24-48 小時送達。</li>
    <li>✉️ <strong>搭配信封：</strong>加印<a href="/zh-hk/category/envelopes/" class="text-[#2873F5] hover:underline font-medium">定制信封</a>（100 個起, HK$3.5/個 牛皮紙）作為直郵包裝。</li>
    <li>📦 <strong>搭配包裝盒：</strong><a href="/zh-hk/category/packaging/" class="text-[#2873F5] hover:underline font-medium">定制包裝盒</a>（100 個起）用於零售或活動派送。</li>
    <li>🛍️ <strong>搭配紙袋：</strong>品牌<a href="/zh-hk/category/paper-bags/" class="text-[#2873F5] hover:underline font-medium">紙袋</a>（100 個起）配合展會派發海報。</li>
    <li>📚 <strong>更多尺寸指南：</strong>閱讀我們的<a href="/zh-hk/blog/catalog-printing-guide/" class="text-[#2873F5] hover:underline font-medium">畫冊印刷指南</a>。</li>
    <li>🏷️ <strong>加貼紙：</strong>每個海報筒用<a href="/zh-hk/product/small-batch-stickers/" class="text-[#2873F5] hover:underline font-medium">小批量貼紙</a>（50 張起, 100 張 HK$3.3/張）封口。</li>
  </ul>
  <p class="text-xs text-gray-500 mt-4">最後更新：2026 年 8 月 · 智印港 ZprintPro · 港九新界滿 HK$500 順豐免運 · DHL 全球 2-4 天。</p>
</div>"""

# === ja 内链加固 (Tier A 备) ===
ja_related = """<!-- RELATED-GUIDES-2026-08 -->
<div class="bg-[#F0F7FF] border-l-4 border-[#2873F5] p-6 my-8 rounded-r-lg">
  <h3 class="text-lg font-bold text-[#1A56DB] mb-3">📘 関連ガイド＆よく一緒に注文される商品</h3>
  <p class="text-sm text-gray-700 mb-3">ポスターは単独で発送されることは稀——以下のジープリント商品と組み合わせて、キャンペーン全体を計画：</p>
  <ul class="text-sm text-gray-700 space-y-2">
    <li>🚀 <strong>お急ぎの方へ：</strong><a href="/ja/services/rush-printing-delivery/" class="text-[#2873F5] hover:underline font-medium">即日印刷サービス</a>——A1/A2 ポスター DHL 24-48 時間配送。</li>
    <li>✉️ <strong>封筒とセット：</strong><a href="/ja/category/envelopes/" class="text-[#2873F5] hover:underline font-medium">カスタム封筒</a>（100 個〜、クラフト 74 円/枚）を DM 包装に。</li>
    <li>📦 <strong>パッケージとセット：</strong><a href="/ja/category/packaging/" class="text-[#2873F5] hover:underline font-medium">カスタムパッケージ</a>（100 個〜）で小売り・イベント配送に。</li>
    <li>🛍️ <strong>紙袋とセット：</strong>ブランド<a href="/ja/category/paper-bags/" class="text-[#2873F5] hover:underline font-medium">紙袋</a>（100 個〜）で展示会・ポップアップ配布に。</li>
    <li>📚 <strong>サイズガイド：</strong><a href="/ja/blog/catalog-printing-guide/" class="text-[#2873F5] hover:underline font-medium">カタログ印刷ガイド</a>もご覧ください。</li>
    <li>🏷️ <strong>ステッカー追加：</strong>各ポスター筒に<a href="/ja/product/small-batch-stickers/" class="text-[#2873F5] hover:underline font-medium">小ロットステッカー</a>（50 枚〜、100 枚 69 円/枚）封印。</li>
  </ul>
  <p class="text-xs text-gray-500 mt-4">最終更新：2026 年 8 月 · ジープリント ZprintPro · 日本全国 DHL 2-4 日配送 · $100 以上で米国向け無料配送。</p>
</div>"""

print("[EN]")
inject(EN_JSON, "poster-printing-price-guide", en_related, "en")
print("[zh-hk]")
inject(ZH_JSON, "poster-printing-price-guide", zh_related, "zh")
print("[ja]")
inject(JA_JSON, "poster-printing-price-guide", ja_related, "ja")

print("\n=== 3 locale 注入完成 ===")
