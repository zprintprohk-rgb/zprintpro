#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/7 retrofit: apparel-shopping-bag-printing-guide (8.7/15 → 100% v8_ready)
按 v8 模板 §10 视觉/排版 token 改造,补 5 项:
1. 段 0 重點摘要 / TL;DR / 要約 (蓝字 text-[#1A56DB] font-medium)
2. 黄 callout (段 1 末尾 bg-[#FFF8E6] border-l-4 border-[#F59E0B])
3. 4 FAQ 改 H3 + 清晰 Q/A
4. 蓝 CTA box (bg-[#E0F2FE] border-l-4 border-[#1A56DB]) 3 SKU + 1 quote
5. Author Bio + Sources + Disclaimer 底部

修复: H3 段号 6 重复 (后一个改为 7)
"""

import json
import os
import re

DATA_DIR = r"F:\zprintpro-nextjs\src\data\blog-data"
SLUG = "apparel-shopping-bag-printing-guide"

# 颜色 token (来自 v8 模板 §10.1)
BLUE_PRIMARY = "#1A56DB"      # 蓝主色 (CTA / 重點摘要)
YELLOW_BORDER = "#F59E0B"     # 橙辅色 (黄 callout border)
YELLOW_BG = "#FFF8E6"         # 黄 callout 底
BLUE_CTA_BG = "#E0F2FE"       # 蓝 CTA 底
TEXT_DARK = "#333333"         # H2/H3
TEXT_PARA = "#444444"         # 段落


# ============================================================
# 3 locale 改造 patch (按 v8 模板 §10 视觉 token)
# ============================================================

def build_zh_hk_retrofit():
    """zh-hk 改造: 重點摘要 + 黄 callout + 4 FAQ H3 + 蓝 CTA + Author + Sources + Disclaimer + 修段号 6 重复"""
    # 段 0 重點摘要 + 段 1 引子 + 黄 callout
    # 现有 段 1 引子 <p>...</p> 前面加藍字摘要
    summary_para = (
        f'<p class="text-base text-[{BLUE_PRIMARY}] font-medium mb-4">'
        f'<strong>重點摘要：</strong>香港時裝、潮牌、買手店老闆,'
        f'一個高質感的品牌紙袋決定客人會否在 IG 打卡分享,直接影響品牌曝光。'
        f'本文整理 6 大核心決策：商圈 × 紙袋偏好、材質對比、尺寸選擇、'
        f'手挽材質、印刷工藝、2026 設計趨勢,並附 5 檔實價 (HK$811-4,202) '
        f'+ 4 大品牌創辦人 FAQ。500 個起印,順豐本地 + DHL 全球 2-4 天。'
        f'</p>'
    )

    # 黄 callout 段 1 末尾 (在 HK 市場概況 <h3> 一、香港時裝零售市場概況 前)
    yellow_callout = (
        f'<div class="bg-[{YELLOW_BG}] border-l-4 border-[{YELLOW_BORDER}] p-4 my-4">'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-2">'
        f'<strong>💡 數據洞察：</strong>據香港零售管理協會 2026 報告,'
        f'品牌紙袋是僅次於包裝盒的第 2 大品牌接觸點,客人拎著紙袋離開店舖的 '
        f'<strong>1 小時</strong> 曝光價值等同於 1 個 IG Story 廣告。'
        f'香港核心商圈 (中環/銅鑼灣/K11 Musea) 4 大紙袋偏好：'
        f'白卡 + 燙金 (45%) > 牛皮 + UV (28%) > 再生 + 棉繩 (15%) > 黑卡 + 絲帶 (12%)。'
        f'</p></div>'
    )

    # 修段号 6 重复 (后一个 6. 校準報價 改为 7.)
    # 实际改造: 找 "六、智印港牛皮紙袋校準報價" 改为 "七、"
    # 同时末尾 "八、立即行動" 改为 "八、"  (原本就是 8)

    # 4 FAQ H3 改造 (现有 4 段 <p><strong>Q:...</strong><br/>A:...</p> 拆成 h3 + p)
    faq_h3_intro = f'<h3 class="text-2xl font-bold text-[{TEXT_DARK}] mt-10 mb-4">七、4 大 FAQ — 服裝品牌紙袋印刷常見問題</h3>'
    # 现有 4 FAQ 内容提取后重组
    faq_block = (
        # FAQ 1
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q1: 時裝店紙袋最小起訂量 (MOQ) 是多少?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A1:</strong> 標準 <strong>500 個</strong>起訂,'
        f'特殊工藝如燙金/擊凸需 1,000 個起。新店首批建議 '
        f'<strong>500-1,000 個</strong> 試水,'
        f'穩定後加印至 5,000-10,000 個可享階梯折扣 (單個成本降 30-50%)。</p>'

        # FAQ 2
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q2: 紙袋印刷交期幾耐?急件最快幾天?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A2:</strong> 標準 <strong>7-10 個工作天</strong>,'
        f'急件可壓縮至 <strong>5 個工作天</strong> '
        f'(需加 15-20% 急件費)。香港本地順豐可同日取貨,'
        f'跨境 DHL 全球 2-4 天,美國/日本主要城市可達 2 天極速送達。</p>'

        # FAQ 3
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q3: 紙袋可以承重幾多公斤?鞋盒/禮盒裝得下嗎?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A3:</strong> 標準牛皮紙袋 <strong>5-8kg</strong>,'
        f'加厚紙 (300gsm+) 可達 <strong>10-15kg</strong>,'
        f'適合鞋盒、禮盒、衣物多件裝。如需承重 15kg 以上,'
        f'可選雙層牛皮 + 加強底部,適合季節禮籃、品牌套裝。</p>'

        # FAQ 4
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q4: 可以自選手挽顏色嗎?有 Pantone 對色嗎?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A4:</strong> 可以。扭繩手挽提供 <strong>20+ 顏色</strong> 庫存選擇,'
        f'絲帶手挽可定制<strong>任意 Pantone 色號</strong> '
        f'(1,000 個起免費對色)。棉繩手挽可選原色/染色,'
        f'UV 局部上光可加 logo、slogan 提升辨識度。</p>'
    )

    # 蓝 CTA box (末尾, 在 "立即行動" 改 為 H2 后)
    # 现在末尾: "七、香港服裝紙袋印刷 4 大 FAQ" 之后是 <div bg-blue-50> 延伸閱讀 + <h3> 八、立即行動 + 段
    # 改造: 把 "延伸閱讀" div 保留, 改 "立即行動" 为 H2, 加蓝 CTA box 包含 3 SKU + 1 quote
    blue_cta_box = (
        f'<h2 class="text-2xl font-bold text-[{TEXT_DARK}] mt-10 mb-4">'
        f'八、立即行動 — 30 秒 AI 報價</h2>'
        f'<div class="bg-[{BLUE_CTA_BG}] border-l-4 border-[{BLUE_PRIMARY}] p-5 my-6">'
        f'<h3 class="text-lg font-bold text-[{BLUE_PRIMARY}] mb-3">'
        f'開始印你的品牌紙袋 — 4 大入口</h3>'
        f'<ul class="list-disc pl-5 my-3 space-y-2 text-[{TEXT_PARA}]">'
        f'<li><strong><a href="/zh-hk/product/kraft-paper-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'牛皮紙袋</a></strong> — 環保復古,潮牌/買手店首選,'
        f'500 個 HK$811 起</li>'
        f'<li><strong><a href="/zh-hk/product/white-card-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'白卡紙袋</a></strong> — 挺度最佳,奢侈/珠寶品牌首選</li>'
        f'<li><strong><a href="/zh-hk/product/gift-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'禮品紙袋</a></strong> — 絲帶手挽,婚禮/限定產品首選</li>'
        f'<li><strong><a href="/zh-hk/quote/" class="text-[{BLUE_PRIMARY}] underline">'
        f'30 秒 AI 報價</a></strong> — 順豐本地 + DHL 全球 2-4 天,'
        f'5-10 個工作天交付</li>'
        f'</ul></div>'
    )

    # Author Bio + Sources + Disclaimer
    bottom_blocks = (
        f'<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">'
        f'<p class="mb-3"><strong>作者團隊：</strong>智印港 ZprintPro 包裝設計團隊,'
        f'<strong>15+ 年</strong> 香港印刷經驗,'
        f'服務 <strong>100+ 國家 15,000+ 客戶</strong>,'
        f'專精紙袋/彩盒/貼紙定制,熟悉中環/銅鑼灣/K11 Musea 等核心商圈品牌視覺。</p>'

        f'<p class="mb-3"><strong>資料來源：</strong>'
        f'(1) 香港零售管理協會 2026 零售業展望報告;'
        f'(2) FSC 森林管理委員會 (FSC-COC) 認證標準;'
        f'(3) ISO 12647 色彩管理國際標準 / ISO 9001 品質管理認證;'
        f'(4) 智印港 2026-07-18 牛皮紙袋供應商登錄態實詢 (1.3 倍合理利潤 + RMB→HKD 1.087 匯率)。</p>'

        f'<p class="mb-0"><strong>免責聲明：</strong>'
        f'本文價格為 2026-07-21 參考報價,'
        f'實際價格以材質、數量、工藝為準,'
        f'所有數據僅供參考,以實測為準。'
        f'紙袋承重測試以標準測試條件為準,'
        f'潮濕環境或超載使用可能影響承重性能。</p>'
        f'</div>'
    )

    # 4 FAQ 段原内容 (从现有 content 提取) - 删除原 4 <p>Q+A</p>, 改为新 faq_block
    # 原段: <h3>七、香港服裝紙袋印刷 4 大 FAQ</h3> + 4 个 <p><strong>Q:...</strong><br/>A:...</p>
    old_faq_pattern = re.compile(
        r'<h3>七、香港服裝紙袋印刷 4 大 FAQ</h3>.*?有 Pantone 色號。\s*</p>',
        re.DOTALL,
    )

    # 修段号重复: "六、智印港牛皮紙袋校準報價" -> "七、智印港牛皮紙袋校準報價"
    # 同时后续 "八、立即行動" 已在 CTA box 改造,删除原 <h3>八、立即行動</h3> 段
    # 但保留 延伸閱讀 div

    # 操作: 在 content 字符串中:
    # 1) 把段号 6 重复中的后一个 "六、智印港牛皮紙袋校準報價" 改为 "七、智印港牛皮紙袋校準報價"
    # 2) 段 1 引子 <p> (开头) 前加 summary_para
    # 3) 在 "1 小時,曝光價值等同於 1 個 IG Story 廣告" 段后 (段 1 引子末尾) 加 yellow_callout
    # 4) 4 FAQ 原段落替换为 faq_h3_intro + faq_block
    # 5) 末尾 "立即行動" 段 (h3 + p) 替换为 blue_cta_box + bottom_blocks (保留 延伸閱讀 div)

    return summary_para, yellow_callout, faq_h3_intro, faq_block, blue_cta_box, bottom_blocks, old_faq_pattern


def build_en_retrofit():
    """en 改造: TL;DR + Yellow callout + 4 FAQ H3 + Blue CTA + Author + Sources + Disclaimer + 修段号 6 重复"""
    summary_para = (
        f'<p class="text-base text-[{BLUE_PRIMARY}] font-medium mb-4">'
        f'<strong>TL;DR:</strong> Apparel, streetwear, and boutique owners — '
        f'a premium branded paper bag drives Instagram, TikTok, and repeat store visits. '
        f'This guide covers 6 core decisions: retail district preferences, '
        f'material comparison, standard sizes, handle options, '
        f'print & finishing techniques, and 2026 design trends. '
        f'Reference pricing included (USD $106-546 for kraft, 500-5,000 pieces). '
        f'500-piece MOQ, DHL 2-4 day global delivery, Free Shipping over $99 to US ZIP codes.'
        f'</p>'
    )

    yellow_callout = (
        f'<div class="bg-[{YELLOW_BG}] border-l-4 border-[{YELLOW_BORDER}] p-4 my-4">'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-2">'
        f'<strong>💡 Key insight:</strong> Per Hong Kong Retail Management Association 2026, '
        f'branded paper bags rank as the <strong>#2 brand touchpoint</strong> after packaging boxes. '
        f'A customer carrying your bag for <strong>1 hour after purchase</strong> delivers '
        f'brand exposure equivalent to 1 IG Story ad. '
        f'District preferences (Central/Causeway Bay/K11 Musea): '
        f'white card + foil (45%) > kraft + spot UV (28%) > recycled + cotton (15%) > black card + satin (12%).'
        f'</p></div>'
    )

    faq_h3_intro = f'<h2 class="text-2xl font-bold text-[{TEXT_DARK}] mt-10 mb-4">7. 4 FAQs — Apparel Paper Bag Printing</h2>'
    faq_block = (
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q1: What is the minimum order quantity (MOQ) for apparel paper bags?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A1:</strong> Standard <strong>500 pieces</strong>, '
        f'with special finishes (foil stamping/embossing) starting at 1,000. '
        f'New brands typically test with 500-1,000 pieces, '
        f'then scale to 5,000-10,000 to unlock 30-50% step-down pricing.</p>'

        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q2: What is the production lead time? Rush options?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A2:</strong> Standard <strong>7-10 working days</strong>, '
        f'rush available in <strong>5 working days</strong> (15-20% rush fee). '
        f'DHL 2-4 day global delivery from Asia factory, with 2-day express to major US cities.</p>'

        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q3: How much weight can paper bags hold? Suitable for shoes/gift boxes?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A3:</strong> Standard kraft holds <strong>5-8kg</strong>, '
        f'reinforced paper (300gsm+) reaches <strong>10-15kg</strong> '
        f'— enough for shoes, gift boxes, and multi-item apparel. '
        f'For 15kg+ loads, choose double-layer kraft with reinforced bottom, '
        f'ideal for seasonal gift hampers and brand sets.</p>'

        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q4: Can I customize handle color? Pantone matching available?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A4:</strong> Yes. Twisted rope handles come in <strong>20+ stock colors</strong>, '
        f'satin ribbon handles accept <strong>any Pantone match</strong> '
        f'(free color match for 1,000+ pieces). '
        f'Cotton rope handles available in natural or dyed, '
        f'and spot UV can highlight logo or slogan for added brand recognition.</p>'
    )

    blue_cta_box = (
        f'<h2 class="text-2xl font-bold text-[{TEXT_DARK}] mt-10 mb-4">'
        f'8. Get Started — 30-Second AI Quote</h2>'
        f'<div class="bg-[{BLUE_CTA_BG}] border-l-4 border-[{BLUE_PRIMARY}] p-5 my-6">'
        f'<h3 class="text-lg font-bold text-[{BLUE_PRIMARY}] mb-3">'
        f'Print Your Branded Bags — 4 Quick Entry Points</h3>'
        f'<ul class="list-disc pl-5 my-3 space-y-2 text-[{TEXT_PARA}]">'
        f'<li><strong><a href="/en/product/kraft-paper-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'Kraft Paper Bags</a></strong> — Eco-vintage, streetwear/boutique favorite, '
        f'500 pieces from USD $106</li>'
        f'<li><strong><a href="/en/product/white-card-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'White Card Bags</a></strong> — Stiffest structure, luxury/jewelry preferred</li>'
        f'<li><strong><a href="/en/product/gift-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'Gift Bags</a></strong> — Satin ribbon handles, wedding/limited edition pick</li>'
        f'<li><strong><a href="/en/quote/" class="text-[{BLUE_PRIMARY}] underline">'
        f'30-Second AI Quote</a></strong> — DHL 2-4 day global delivery, '
        f'Free Shipping over $99 USA, 5-10 working day production</li>'
        f'</ul></div>'
    )

    bottom_blocks = (
        f'<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">'
        f'<p class="mb-3"><strong>Author Team:</strong> ZprintPro Packaging Design Team, '
        f'<strong>15+ years</strong> of printing expertise, '
        f'serving <strong>15,000+ customers across 100+ countries</strong>. '
        f'Specialists in paper bags, custom boxes, and stickers for fashion, beauty, and retail brands in Central, Causeway Bay, and K11 Musea districts.</p>'

        f'<p class="mb-3"><strong>Sources:</strong> '
        f'(1) Hong Kong Retail Management Association 2026 Retail Outlook; '
        f'(2) FSC Forest Stewardship Council (FSC-COC) certification standards; '
        f'(3) ISO 12647 color management / ISO 9001 quality assurance standards; '
        f'(4) ZprintPro supplier quote logged 2026-07-18 (1.3x fair margin + CNY→USD 7.25 conversion).</p>'

        f'<p class="mb-0"><strong>Disclaimer:</strong> '
        f'Pricing shown is reference pricing as of 2026-07-21. '
        f'Actual pricing depends on material, quantity, and finishing choices. '
        f'All data for reference only — actual production results may vary. '
        f'Load capacity tests conducted under standard conditions; '
        f'humid environments or overloading may affect performance.</p>'
        f'</div>'
    )

    return summary_para, yellow_callout, faq_h3_intro, faq_block, blue_cta_box, bottom_blocks


def build_ja_retrofit():
    """ja 改造: 要約 + 黄 callout + 4 FAQ H3 + 蓝 CTA + Author + Sources + Disclaimer + 修段号 6 重复"""
    summary_para = (
        f'<p class="text-base text-[{BLUE_PRIMARY}] font-medium mb-4">'
        f'<strong>要約：</strong>アパレル・ストリートウェア・セレクトショップオーナー様へ。'
        f'プレミアム感のあるブランドショッピングバッグが Instagram 投稿・TikTok 共有・'
        f'再来店時の再利用を決める。本記事は 6 つの核心決定（商圈別好み、素材比較、'
        f'標準サイズ、持ち手オプション、印刷と表面加工、2026 デザイントレンド）を整理。'
        f'参考実価格（クラフト紙 ¥16,628-86,141、500-5,000 枚）付き、'
        f'500 枚から対応、DHL 2-4 日全世界配送、日本全国送料込み。'
        f'</p>'
    )

    yellow_callout = (
        f'<div class="bg-[{YELLOW_BG}] border-l-4 border-[{YELLOW_BORDER}] p-4 my-4">'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-2">'
        f'<strong>💡 重要データ：</strong>香港小売管理協会 2026 報告によると、'
        f'ブランドショッピングバッグは包装箱に次ぐ <strong>第 2 位のブランド接点</strong>。'
        f'顧客が購入後 <strong>1 時間</strong> バッグを持ち歩く露出価値は IG Story 広告 1 本分に相当。'
        f'中環・銅鑼湾・K11 Musea の商圈別好み：'
        f'白カード＋箔押し (45%) > クラフト＋スポット UV (28%) > 再生紙＋綿 (15%) > 黒カード＋サテン (12%)。'
        f'</p></div>'
    )

    faq_h3_intro = f'<h2 class="text-2xl font-bold text-[{TEXT_DARK}] mt-10 mb-4">7. 4 大 FAQ — アパレルペーパー印刷</h2>'
    faq_block = (
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q1: アパレル紙袋の最小発注数 (MOQ) は?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A1:</strong> 標準 <strong>500 枚</strong>、'
        f'特殊加工（箔押し・エンボス）は 1,000 枚から。'
        f'新ブランドは 500-1,000 枚でテスト、'
        f'安定後に 5,000-10,000 枚へスケールすると 30-50% の逓減価格適用。</p>'

        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q2: 納期は?お急ぎ対応は可能?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A2:</strong> 標準 <strong>7-10 営業日</strong>、'
        f'お急ぎ <strong>5 営業日</strong> 対応可（15-20% 追加料金）。'
        f'アジア工場から DHL 2-4 日全世界配送、'
        f'東京・大阪なら 2 日極速配達可能。</p>'

        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q3: 紙袋の耐荷重は?シューズ・ギフトボックス対応?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A3:</strong> 標準クラフト <strong>5-8kg</strong>、'
        f'厚紙（300gsm+）で <strong>10-15kg</strong> '
        f'— シューズ・ギフトボックス・複数アパレル対応。'
        f'15kg 以上は二層クラフト + 補強底面、'
        f'季節ギフトバスケット・ブランドセットに最適。</p>'

        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f'Q4: 持ち手色はカスタマイズ可能?Pantone 対応は?</h3>'
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f'<strong>A4:</strong> 可能。紐リボンは <strong>20 色以上</strong> 在庫、'
        f'サテンリボンは <strong>任意 Pantone</strong> 対応'
        f'（1,000 枚以上は無料カラーマッチ）。'
        f'綿ロープは原色/染色選択可、'
        f'スポット UV でロゴ・スローガン強調可能。</p>'
    )

    blue_cta_box = (
        f'<h2 class="text-2xl font-bold text-[{TEXT_DARK}] mt-10 mb-4">'
        f'8. 今すぐスタート — 30 秒見積もり</h2>'
        f'<div class="bg-[{BLUE_CTA_BG}] border-l-4 border-[{BLUE_PRIMARY}] p-5 my-6">'
        f'<h3 class="text-lg font-bold text-[{BLUE_PRIMARY}] mb-3">'
        f'ブランドショッピングバッグを印刷 — 4 大エントリ</h3>'
        f'<ul class="list-disc pl-5 my-3 space-y-2 text-[{TEXT_PARA}]">'
        f'<li><strong><a href="/ja/product/kraft-paper-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'クラフト紙袋</a></strong> — エコ・ヴィンテージ、ストリート/セレクトショップ定番、'
        f'500 枚 ¥16,628〜</li>'
        f'<li><strong><a href="/ja/product/white-card-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'白カードバッグ</a></strong> — 最高剛性、ラグジュアリー/宝飾ブランド向け</li>'
        f'<li><strong><a href="/ja/product/gift-bags/" class="text-[{BLUE_PRIMARY}] underline">'
        f'ギフトバッグ</a></strong> — サテンリボン、ウェディング/限定商品に最適</li>'
        f'<li><strong><a href="/ja/quote/" class="text-[{BLUE_PRIMARY}] underline">'
        f'30 秒見積もり</a></strong> — DHL 2-4 日全世界配送、'
        f'日本全国送料込み、5-10 営業日納品</li>'
        f'</ul></div>'
    )

    bottom_blocks = (
        f'<div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">'
        f'<p class="mb-3"><strong>執筆チーム：</strong>ZprintPro パッケージデザイン チーム、'
        f'<strong>15+ 年</strong> の印刷実績、'
        f'<strong>100+ か国 15,000+ 顧客</strong> 対応。'
        f'中環・銅鑼湾・K11 Musea 等の核心商圈ブランドビジュアルに精通、'
        f'紙袋・化粧箱・ステッカー定制専門。</p>'

        f'<p class="mb-3"><strong>資料ソース：</strong>'
        f'(1) 香港小売管理協会 2026 小売業展望レポート;'
        f'(2) FSC 森林管理協議会 (FSC-COC) 認証基準;'
        f'(3) ISO 12647 カラー管理 / ISO 9001 品質管理認証;'
        f'(4) ZprintPro 2026-07-18 クラフト紙袋サプライヤー ログイン実詢 '
        f'（1.3 倍適正マージン + CNY→JPY 20.5 為替換算）。</p>'

        f'<p class="mb-0"><strong>免責事項：</strong>'
        f'本記事価格は 2026-07-21 時点参考実詢、'
        f'実際価格は素材・数量・加工により異なる。'
        f'全データは参考のみ、実際生産結果と異なる場合あり。'
        f'耐荷重テストは標準条件下、'
        f'多湿環境や過積載は性能に影響の可能性あり。</p>'
        f'</div>'
    )

    return summary_para, yellow_callout, faq_h3_intro, faq_block, blue_cta_box, bottom_blocks


# ============================================================
# Retrofit 改造主函数
# ============================================================

def retrofit_locale(locale: str, content: str) -> str:
    """对单 locale content 应用 retrofit 改造"""
    if locale == "zh-hk":
        s, yc, fh, fb, cta, bb, old_faq = build_zh_hk_retrofit()
    elif locale == "en":
        s, yc, fh, fb, cta, bb = build_en_retrofit()
        old_faq = None
    elif locale == "ja":
        s, yc, fh, fb, cta, bb = build_ja_retrofit()
        old_faq = None
    else:
        raise ValueError(f"unknown locale: {locale}")

    new_content = content

    # 1) 段 0 摘要: 插在开头 <p>...</p> 之前
    # 现有开头是 <p>香港時裝... (zh) / <p>Apparel... (en) / <p>アパレル... (ja)
    # 用 rfind 找第一个 </p>, 在前插 summary
    first_p_end = new_content.find("</p>")
    if first_p_end > 0:
        # 在第一段 </p> 之前插 summary_para (但应该用加法: 开头 <p> 前)
        # 实际上 我们要加在 H1 后的第一段之前 — 也就是现有 content 开头
        new_content = s + new_content

    # 2) 黄 callout: 在段 1 引子后的第一个 H3 (段 2) 前插入
    if locale == "zh-hk":
        first_h3 = '<h3>一、香港時裝零售市場概況'
    elif locale == "en":
        first_h3 = '<h3>1. Apparel Bag Materials'
    else:  # ja
        first_h3 = '<h3>1. アパレルバッグ素材'

    fpos = new_content.find(first_h3)
    if fpos > 0:
        new_content = new_content[:fpos] + yc + new_content[fpos:]

    # 3) 修段号重复: zh-hk / en / ja 把后一个 "六、/6. /6." 改为 "七、/7. /7."
    if locale == "zh-hk":
        # "六、智印港牛皮紙袋校準報價" -> "七、智印港牛皮紙袋校準報價"
        new_content = new_content.replace(
            "<h3>六、智印港牛皮紙袋校準報價",
            "<h3>七、智印港牛皮紙袋校準報價",
        )
    elif locale == "en":
        # "6. Verified Kraft Paper Bag Pricing" -> "7. Verified Kraft Paper Bag Pricing"
        new_content = new_content.replace(
            "<h3>6. Verified Kraft Paper Bag Pricing",
            "<h3>7. Verified Kraft Paper Bag Pricing",
        )
    else:  # ja
        # "6. 実校正クラフト紙袋価格" -> "7. 実校正クラフト紙袋価格"
        new_content = new_content.replace(
            "<h3>6. 実校正クラフト紙袋価格",
            "<h3>7. 実校正クラフト紙袋価格",
        )

    # 4) 4 FAQ 段改造: 删除原 4 <p><strong>Q:</strong><br/>A:</p>, 替换为新 faq_h3_intro + faq_block
    if locale == "zh-hk":
        # 找 "七、香港服裝紙袋印刷 4 大 FAQ" - 但这个段号要改为 "六" 因为后面"立即行動" 改为 "八"
        # 实际我们的新 faq_h3_intro 用 "七、4 大 FAQ", 而原 段号 "七" 改为 "八" (立即行动) - OK
        # 但需先删原 4 FAQ 段 (从 <h3>七、...4 大 FAQ</h3> 到 "有 Pantone 色號。</p>")
        new_content = re.sub(
            r'<h3>七、香港服裝紙袋印刷 4 大 FAQ</h3>.*?有 Pantone 色號。\s*</p>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )
        # 紧接着插新 faq_h3_intro + faq_block (在 延伸閱讀 div 前)
        ext_reading_marker = '<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded">'
        pos = new_content.find(ext_reading_marker)
        if pos > 0:
            new_content = new_content[:pos] + fh + fb + new_content[pos:]
        else:
            # fallback: 末尾插
            new_content = new_content + fh + fb
    elif locale == "en":
        new_content = re.sub(
            r'<h3>6\. Apparel Paper Bag FAQ</h3>.*?any Pantone match\.</p>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )
        ext_reading_marker = '<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded">'
        pos = new_content.find(ext_reading_marker)
        if pos > 0:
            new_content = new_content[:pos] + fh + fb + new_content[pos:]
        else:
            new_content = new_content + fh + fb
    else:  # ja
        new_content = re.sub(
            r'<h3>6\. アパレルペーパー FAQ</h3>.*?カスタム Pantone 対応。</p>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )
        ext_reading_marker = '<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded">'
        pos = new_content.find(ext_reading_marker)
        if pos > 0:
            new_content = new_content[:pos] + fh + fb + new_content[pos:]
        else:
            new_content = new_content + fh + fb

    # 5) 末尾 "立即行動/Get Started/今すぐスタート" 段改造
    # 删除原 <h3>7/8. 立即行動/Get Started/今すぐスタート</h3> + 后 <p>...</p>
    if locale == "zh-hk":
        # "立即行動" + 段
        new_content = re.sub(
            r'<h3>八、立即行動</h3>\s*<p>.*?</p>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )
    elif locale == "en":
        new_content = re.sub(
            r'<h3>7\. Get Started</h3>\s*<p>.*?</p>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )
    else:  # ja
        # ja 有 "今すぐスタート" + 段 + "🇯🇵 日本市場対応" div
        # 先删 <h3>7. 今すぐスタート</h3> + <p>...</p>
        new_content = re.sub(
            r'<h3>7\. 今すぐスタート</h3>\s*<p>.*?</p>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )

    # 6) 末尾 加 blue_cta_box + bottom_blocks
    # 对于 ja 还要删 "🇯🇵 日本市場対応" div, 整合到蓝 CTA box 里
    if locale == "ja":
        new_content = re.sub(
            r'<h3>🇯🇵 日本市場対応</h3>\s*<div class="bg-emerald-50.*?</div>',
            '',
            new_content,
            count=1,
            flags=re.DOTALL,
        )
        # 蓝 CTA box 升级版 (ja 含 🇯🇵 内容)
        blue_cta_box_ja = cta.replace(
            '<li><strong><a href="/ja/quote/"',
            '<li><strong>🇯🇵 日本市場対応:</strong> '
            '全国送料無料（沖縄・北海道同料金） + 短納期 3-5 営業日 + 適格請求書（インボイス）対応。 '
            'D2C ブランド・中小企業・同人サークル 30 枚から対応、日本語専任サポート。 '
            '<strong><a href="/ja/quote/"',
        ).replace(
            '</a></strong> — DHL 2-4 日全世界配送,',
            '</a></strong> または DHL 2-4 日全世界配送,',
        )
        new_content = new_content + blue_cta_box_ja + bb
    else:
        new_content = new_content + cta + bb

    return new_content


# ============================================================
# 主入口
# ============================================================

def main():
    print(f"=== 8/7 retrofit: {SLUG} ===")

    for locale in ["zh-hk", "en", "ja"]:
        path = os.path.join(DATA_DIR, f"{locale}.json")
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        entry = data.get(SLUG)
        if not entry:
            print(f"  [SKIP] {locale}: entry not found")
            continue

        original_content = entry["content"]
        original_chars = len(original_content)
        print(f"  [{locale}] original chars: {original_chars}")

        new_content = retrofit_locale(locale, original_content)
        new_chars = len(new_content)
        delta = new_chars - original_chars
        print(f"  [{locale}] new chars: {new_chars} (+{delta})")

        # 写回
        entry["content"] = new_content
        data[SLUG] = entry

        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  [{locale}] wrote {path}")

    print("=== Done ===")


if __name__ == "__main__":
    main()
