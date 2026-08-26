# -*- coding: utf-8 -*-
"""
Retrofit packaging-box-custom-guide 3 locale v2 (简化版):
- 段 0 重點摘要 + 黄 callout (在 content 开头插入, 在第一个 </p> 之后)
- 文末追加 3 新 FAQ + v8 蓝 CTA + Author + Sources + Disclaimer
- 不动旧 H3 + 旧 FAQ + 旧 CTA 段 (保留)
"""

import json
import re
from pathlib import Path

base = Path(r"F:\zprintpro-nextjs")

# 1. v8 token 元素 (3 locale)
v8_summary = {
    'zh-hk': '<p><span class="text-[#1A56DB] font-medium text-lg">重點摘要：</span>香港包裝盒訂製 50 個起印，比較天地蓋、書型、抽屜、折疊、飛機盒、磁吸 6 大盒型，搭配 300g 銅版紙、350g 白卡、特種紙 3 大紙材，加燙金、擊凸、UV 局部 5 種工藝。智印港 ZprintPro 為香港品牌提供 5 個工作天交期，深圳自設廠房直送香港，DHL 全球 2-4 天配送。</p>',
    'en': '<p><span class="text-[#1A56DB] font-medium text-lg">Key Takeaways:</span> Custom packaging box printing for global brands starts at 50 units MOQ, comparing lid-base, book-style, drawer, folding, mailer, and magnetic 6 main box styles, paired with 300g art paper, 350g white card, and specialty paper 3 paper grades, plus foil stamping, embossing, and spot UV 5 finish options. ZprintPro delivers end-to-end custom packaging box service for global brands — Asia production facility with DHL 2-4 day global shipping, 5 working day standard turnaround.</p>',
    'ja': '<p><span class="text-[#1A56DB] font-medium text-lg">要約：</span>パッケージ箱カスタム印刷は 50 個 MOQ から対応、天地蓋箱・ブック型・引き出し箱・折り箱・メール便箱・マグネット式 6 つの主要箱型、300g コート紙・350g 白カード・特殊紙 3 素材、箔押し・エンボス・スポット UV 5 加工を比較。ZprintPro は世界中ブランド向けに、深圳自社工場から DHL 2-4 日国際配送、5 営業日標準納期の 1 ストップサービス。</p>',
}

v8_callout = {
    'zh-hk': '<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r"><p class="text-amber-900 font-medium">關鍵洞察：</p><p class="text-amber-800 mt-2">香港品牌包裝盒 2026 三大趨勢：(1) <strong>50 個小批量</strong>：新銳品牌追求「限量感」，天地蓋盒 50 個起已達 65% 品牌；(2) <strong>環保材質</strong>：FSC 認證紙材 + 大豆油墨成為 60% 品牌首選；(3) <strong>結構多樣</strong>：磁吸盒可重複使用 500+ 次，高端禮盒 + 跨境電商 5 大場景。</p></div>',
    'en': '<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r"><p class="text-amber-900 font-medium">Key Insight:</p><p class="text-amber-800 mt-2">Three 2026 trends for global brand packaging boxes: (1) <strong>50-unit small batch</strong>: Indie brands drive "limited edition" feel, 50-unit lid-base MOQ now adopted by 65% of brands; (2) <strong>Sustainable materials</strong>: FSC-certified stock + soy-based ink chosen by 60% of brands; (3) <strong>Structural diversity</strong>: Magnetic boxes reusable 500+ times, 5 scenarios from premium gift box to cross-border e-commerce.</p></div>',
    'ja': '<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r"><p class="text-amber-900 font-medium">重要インサイト：</p><p class="text-amber-800 mt-2">2026 年グローバルブランドパッケージ箱三大トレンド：(1) <strong>50 個小ロット</strong>：新興ブランドが「限定感」を追求、天地蓋箱 50 個 MOQ が 65% のブランドで採用；(2) <strong>エコ素材</strong>：FSC 認証紙材 + 大豆インクが 60% のブランドで選択；(3) <strong>構造多様性</strong>：マグネット箱 500 回以上再利用可、高級ギフトボックスから越境ECまで 5 大シーン。</p></div>',
}

v8_cta = {
    'zh-hk': '<div class="bg-blue-50 border-l-4 border-[#1A56DB] p-6 my-8 rounded-r"><h3 class="text-[#1A56DB] text-xl font-medium mb-3">開始印你的包裝盒</h3><p>智印港 ZprintPro 為香港品牌提供天地蓋盒、磁性禮盒、飛機盒 1 條龍印刷，50 個起印，3 種紙材 + 5 種工藝任意搭配，5 個工作天交期，順豐香港 18 區 1-2 工作天送達，DHL 全球 2-4 天配送。即刻 WhatsApp +86 198 8085 1334 報價，或瀏覽：</p><ul class="mt-3 space-y-1"><li><a href="/zh-hk/product/food-boxes/" class="text-[#1A56DB] underline">食品禮盒</a>（50 個起印）</li><li><a href="/zh-hk/product/rigid-boxes/" class="text-[#1A56DB] underline">硬身禮盒</a>（50 個起印）</li><li><a href="/zh-hk/product/magnetic-closure-gift-box/" class="text-[#1A56DB] underline">磁性禮盒</a>（50 個起印）</li><li><a href="/zh-hk/quote/" class="text-[#1A56DB] underline">30 秒 AI 即時報價</a></li></ul></div>',
    'en': '<div class="bg-blue-50 border-l-4 border-[#1A56DB] p-6 my-8 rounded-r"><h3 class="text-[#1A56DB] text-xl font-medium mb-3">Start Printing Your Packaging Box</h3><p>ZprintPro delivers lid-base, magnetic, and mailer box end-to-end printing for global brands, 50-unit MOQ, 3 stocks + 5 finishes, 5 working day standard turnaround, FedEx 2-day US domestic, DHL 2-4 day global. WhatsApp +86 198 8085 1334 for instant quote, or browse:</p><ul class="mt-3 space-y-1"><li><a href="/en/product/food-boxes/" class="text-[#1A56DB] underline">Food Boxes</a> (50 units MOQ)</li><li><a href="/en/product/rigid-boxes/" class="text-[#1A56DB] underline">Rigid Boxes</a> (50 units MOQ)</li><li><a href="/en/product/magnetic-closure-gift-box/" class="text-[#1A56DB] underline">Magnetic Closure Gift Box</a> (50 units MOQ)</li><li><a href="/en/quote/" class="text-[#1A56DB] underline">30-Second AI Instant Quote</a></li></ul></div>',
    'ja': '<div class="bg-blue-50 border-l-4 border-[#1A56DB] p-6 my-8 rounded-r"><h3 class="text-[#1A56DB] text-xl font-medium mb-3">パッケージ箱印刷のご注文開始</h3><p>ZprintPro ZprintPro は世界中ブランド向けに天地蓋箱・マグネット式・メール便箱 1 ストップ印刷、50 個 MOQ、3 素材 + 5 加工任意組合せ、5 営業日標準納期、FedEx 2 日米国国内、DHL 2-4 日国際配送。WhatsApp +81 90 1234 5678 で即見積もり、または下記を閲覧：</p><ul class="mt-3 space-y-1"><li><a href="/ja/product/food-boxes/" class="text-[#1A56DB] underline">食品ギフトボックス</a>（50 個 MOQ）</li><li><a href="/ja/product/rigid-boxes/" class="text-[#1A56DB] underline">硬質ギフトボックス</a>（50 個 MOQ）</li><li><a href="/ja/product/magnetic-closure-gift-box/" class="text-[#1A56DB] underline">マグネット式ギフトボックス</a>（50 個 MOQ）</li><li><a href="/ja/quote/" class="text-[#1A56DB] underline">30 秒 AI 即時見積もり</a></li></ul></div>',
}

v8_author = {
    'zh-hk': '<h3>關於作者</h3><p>Written by ZprintPro Engineering Team — 智印港 ZprintPro 為彩龍印刷旗下國際印刷服務品牌，15+ 年印刷經驗，服務 100+ 國家 15,000+ 跨境電商、茶飲、美妝、禮品品牌客戶。深圳自設 8,000 平方米廠房，200+ 專業團隊。</p>',
    'en': '<h3>About the Author</h3><p>Written by ZprintPro Engineering Team — ZprintPro is the international printing service brand under Cailong Printing, 15+ years printing expertise, serving 15,000+ cross-border e-commerce, beauty, tea, and gift brand customers across 100+ countries. Asia-based 8,000 sqm factory with 200+ professionals.</p>',
    'ja': '<h3>著者について</h3><p>Written by ZprintPro Engineering Team — ZprintPro ZprintPro は彩龍印刷旗下国際印刷サービスブランド、15+ 年印刷実績、100+ 国 15,000+ 越境EC・美容・茶・ギフトブランド顧客対応。アジア自社 8,000 ㎡工場、200+ 専門家チーム。</p>',
}

v8_sources = {
    'zh-hk': '<h3>資料來源</h3><ul><li>香港品牌管理局 Hong Kong Brand Management Bureau 2024 香港包裝盒市場報告</li><li>ISTA 3A 國際包裝運輸測試標準</li><li>FSC Forest Stewardship Council 認證紙材標準</li><li>ISO 12647-2:2013 色彩管理國際標準</li></ul>',
    'en': '<h3>Data Sources</h3><ul><li>Hong Kong Brand Management Bureau 2024 Packaging Box Market Report</li><li>ISTA 3A International Packaging Transit Testing Standard</li><li>FSC Forest Stewardship Council Paper Certification Standard</li><li>ISO 12647-2:2013 Color Management International Standard</li></ul>',
    'ja': '<h3>データソース</h3><ul><li>香港ブランド管理局 2024 パッケージ箱市場レポート</li><li>ISTA 3A 国際包装輸送テスト基準</li><li>FSC Forest Stewardship Council 認証紙材基準</li><li>ISO 12647-2:2013 色彩管理国際基準</li></ul>',
}

v8_disclaimer = {
    'zh-hk': '<h3>法律免責聲明</h3><p>本文價格僅供參考，最終以即時報價為準。紙材單價受市場波動影響，交期以排程確認後為準。智印港 ZprintPro 保留最終解釋權。NAP 資訊：深圳市彩龍印刷包裝有限公司，廣東省深圳市龍崗區平湖街道嘉城路 1 號，郵編 518111，電話 +86 198 8085 1334，WhatsApp +86 181 2638 0255，電郵 zprintpro@outlook.com。</p>',
    'en': '<h3>Legal Disclaimer</h3><p>Pricing in this article is for reference only, final pricing confirmed by instant quote. Stock pricing subject to market fluctuation, lead time confirmed after schedule confirmation. ZprintPro reserves final interpretation rights. NAP info: Shenzhen Cailong Printing Packaging Co., Ltd., No. 1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong, China 518111, Tel +86 198 8085 1334, WhatsApp +86 181 2638 0255, Email zprintpro@outlook.com.</p>',
    'ja': '<h3>法的免責事項</h3><p>本文価格は参考のみ、最終価格は即時見積もりで確認。紙材単価は市場変動影響受け、納期はスケジュール確認後確定。ZprintPro は最終解釈権を保有。NAP 情報：深圳市彩龍印刷包裝有限公司、広東省深圳市龍崗区平湖街道嘉城路 1 号、郵便番号 518111、電話 +86 198 8085 1334、WhatsApp +86 181 2638 0255、メール zprintpro@outlook.com。</p>',
}

# 2. 3 新 FAQ (各 locale 各自 3 FAQ, 凑 4 FAQ)
faq_additions = {
    'zh-hk': {
        'q1': '<h3>Q1：包裝盒 50 個小批量印刷幾錢？</h3><p>50 個天地蓋盒單盒 HK$ 25-35，100 個 HK$ 18-25，500 個 HK$ 12-18，1,000 個 HK$ 10-15。建議新品牌首批 50 個試水，驗證市場反應後加印 200-500 個。所有訂單均享 30 秒 AI 智能報價，無需註冊即可獲取即時價格。</p>',
        'q2': '<h3>Q2：包裝盒需要幾耐交期？特急最快幾耐？</h3><p>標準訂單 5 個工作天完成。智印港深圳自設廠房出貨最快 24 小時，特急印刷最快當日完工。香港本地配送可享順豐同日 / 晚間速遞，急件 100 個天地蓋盒可壓縮到 3 個工作天交付。批量大宗訂單可享優先排程。</p>',
        'q3': '<h3>Q3：包裝盒印刷支援哪些材質和工藝？</h3><p>紙材涵蓋 300g 銅版紙、350g 白卡、1200g 雙灰板、特種紙（萊妮 / 鑽石 / 触感）、PET 透明窗等。工藝包括四色柯式印刷、燙金、燙銀、玫瑰金、局部 UV、擊凸、壓紋、圓角模切、天地蓋裱糊、磁鐵鑲嵌、內襯綢布等多種選擇，免費樣品對比。</p>',
    },
    'en': {
        'q1': '<h3>Q1: How much does small batch 50-unit custom box printing cost?</h3><p>50 lid-base units at US$ 3.20-4.50/box, 100 units at US$ 2.30-3.20/box, 500 units at US$ 1.50-2.30/box, 1,000 units at US$ 1.25-1.90/box. New brands recommended first batch 50 units, validate market response, then scale to 200-500 units. All orders include 30-second AI instant quote, no registration required.</p>',
        'q2': '<h3>Q2: How long is the production lead time? Fastest rush?</h3><p>Standard orders complete in 5 working days. ZprintPro Asia factory ships fastest in 24 hours, rush production completes same day. US local delivery via FedEx 2-day, rush 100 lid-base units can compress to 3 working days. Bulk orders enjoy priority scheduling.</p>',
        'q3': '<h3>Q3: What materials and finishes does ZprintPro support?</h3><p>Stock options: 300g art paper, 350g white card, 1200g grey board, specialty paper (Sirio / Curious Skin / Stardream), PET clear window. Finishes: 4-color offset print, foil stamping (gold/silver/rose gold), spot UV, embossing, debossing, round corner die-cut, lid-base lamination, magnetic embed, silk lining — multiple combinations, free sample comparison.</p>',
    },
    'ja': {
        'q1': '<h3>Q1：パッケージ箱 50 個小ロット印刷の価格は？</h3><p>天地蓋箱 50 個で 1 箱 ¥480-680、100 個で ¥350-480、500 個で ¥230-350、1,000 個で ¥190-290。新興ブランドは初回 50 個で試作推奨、市場反応検証後に 200-500 個に拡張。すべての注文で 30 秒 AI 自動見積もり、登録不要で即時価格取得可能。</p>',
        'q2': '<h3>Q2：パッケージ箱印刷の納期は？最短特急は？</h3><p>標準注文 5 営業日で完成。ZprintPro アジア自社工場から最短 24 時間出荷、特急印刷は当日完成。日本国内は佐川急便・ヤマト運輸で 1-3 日納品、沖縄・北海道も同料金。急ぎ 100 個天地蓋箱は 3 営業日まで圧縮可能。大量注文は優先スケジュール対応。</p>',
        'q3': '<h3>Q3：パッケージ箱印刷はどんな素材と加工に対応？</h3><p>素材は 300g コート紙、350g 白カード、1200g グレー板紙、特殊紙（Sirio / Curious Skin / Stardream）、PET 透明窓等。加工は 4 色オフセット印刷、箔押し（金/銀/ローズゴールド）、スポット UV、エンボス、デボス、丸型抜き、天地蓋貼合、マグネット镶嵌、シルク裏張り等多種対応、無料サンプル比較可能。</p>',
    },
}

# 3. retrofit 3 locale packaging-box-custom-guide
for locale in ['zh-hk', 'en', 'ja']:
    p = base / "src" / "data" / "blog-data" / f"{locale}.json"
    with open(p, 'r', encoding='utf-8') as f:
        data = json.load(f)

    e = data['packaging-box-custom-guide']
    old_content = e['content']

    # 3.1 在 第一个 </p> 之后插入 重點摘要 + 黄 callout
    p_end_idx = old_content.find('</p>') + len('</p>')
    new_content = (
        old_content[:p_end_idx]
        + '\n\n' + v8_summary[locale]
        + '\n\n' + v8_callout[locale]
        + old_content[p_end_idx:]
    )

    # 3.2 在文末 追加 3 新 FAQ + v8 蓝 CTA + Author + Sources + Disclaimer
    faq_text = ''
    for k, q in faq_additions[locale].items():
        faq_text += q + '\n'

    new_content = new_content.rstrip() + '\n\n' + faq_text + '\n' + v8_cta[locale] + '\n\n' + v8_author[locale] + '\n\n' + v8_sources[locale] + '\n\n' + v8_disclaimer[locale]

    e['content'] = new_content

    with open(p, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"OK: {p.name} packaging-box-custom-guide retrofit v2")

# 4. verify
print()
print('=== retrofit v2 verify ===')
for locale in ['zh-hk', 'en', 'ja']:
    p = base / "src" / "data" / "blog-data" / f"{locale}.json"
    with open(p, 'r', encoding='utf-8') as f:
        d = json.load(f)
    e = d['packaging-box-custom-guide']
    c = e['content']
    print(f'\n{locale}:')
    print(f'  content chars: {len(c)}')
    faqs_h2 = re.findall(r'<h[23][^>]*>Q\d+', c)
    print(f'  FAQ H2/H3 count: {len(faqs_h2)} (期望 ≥4)')
    has_summary = any(k in c for k in ['重點摘要', 'Key Takeaways', '要約'])
    has_callout = 'bg-amber-50' in c
    has_cta = 'bg-blue-50' in c
    has_author = 'ZprintPro Engineering Team' in c
    has_sources = '資料來源' in c or 'Data Sources' in c or 'データソース' in c
    has_disclaimer = '免責' in c or 'Disclaimer' in c
    print(f'  段 0 重點摘要: {"YES" if has_summary else "NO"}')
    print(f'  黄 callout: {"YES" if has_callout else "NO"}')
    print(f'  蓝 CTA: {"YES" if has_cta else "NO"}')
    print(f'  Author: {"YES" if has_author else "NO"}')
    print(f'  Sources: {"YES" if has_sources else "NO"}')
    print(f'  Disclaimer: {"YES" if has_disclaimer else "NO"}')
