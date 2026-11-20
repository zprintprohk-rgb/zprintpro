#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Step 3.3: Add poster-size-guide content to src/data/blog-data/{zh-hk,en,ja}.json
- zh-hk: >=600字, FAQ x4, 3-5 internal links
- en: 250-350 words, FAQ x4
- ja: 250-350 words, FAQ x4
No <img>, no competitor names, no business cards. Pure text.
"""
import json

# ============ zh-hk content ============
ZH_CONTENT = """<p>A1 / A2 / A3 海報尺寸點樣揀？香港零售店、展會參展商、活動策劃公司每日都要面對海報尺寸的選擇——印得太細遠處睇唔清楚，印得太大又浪費預算。本文整理三種主流尺寸的完整對照表（mm / cm / 英吋）、唔同場景的應用建議、紙材與防水工藝選擇，附 4 條印刷前必睇 FAQ，協助 10-1,000 張小至大批量精準落單。</p>
<h3>一、A1 / A2 / A3 標準尺寸對照表</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>A3</strong>：297 × 420 mm（29.7 × 42 cm / 11.7 × 16.5 吋），約兩張 A4 併埋，適合店內海報、枱面展示、細面積櫥窗</li><li><strong>A2</strong>：420 × 594 mm（42 × 59.4 cm / 16.5 × 23.4 吋），四張 A4 面積，零售店櫥窗、展會易拉架旁、會議室主視覺的常見尺寸</li><li><strong>A1</strong>：594 × 841 mm（59.4 × 84.1 cm / 23.4 × 33.1 吋），八張 A4 面積，戶外燈箱、地鐵站內、大型活動背板的標準選擇</li><li><strong>記憶口訣</strong>：A 系列每大一級，面積加倍；A3 → A2 → A1 對應 2 倍、4 倍、8 倍 A4 面積</li></ul>
<h3>二、唔同場景點樣揀尺寸</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>零售店櫥窗 / 店內促銷</strong>：A2 為主，3-5 米閱讀距離清晰可見，配合人形架或貼窗展示</li><li><strong>展會攤位 / 研討會</strong>：A1 掛牆或配 A-frame 展示架，吸引 5-8 米外人流目光</li><li><strong>戶外燈箱 / 巴士站</strong>：A1 或以上，需配防水 PP 膜或啞面膠膜保護，防雨防褪色</li><li><strong>枱面 / 櫃枱小海報</strong>：A3 已足夠，成本最低，適合餐牌推介、新產品上架</li></ul>
<h3>三、紙材與防水工藝選擇</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>銅版紙（光面 / 啞面）</strong>：157g-250g，室內使用色彩鮮艷，啞面防反光更適合燈光環境</li><li><strong>防水 PP 膜</strong>：可濕水擦拭，櫥窗長期展示、戶外短期活動首選</li><li><strong>合成紙 / 啞面膠膜</strong>：耐撕裂、耐刮花，展會循環使用 2-3 次都唔變形</li><li><strong>戶外油畫布</strong>：A1 大尺寸活動背板、簽名牆，質感高級可回收</li><li><strong>工藝</strong>：UV 局部上光突顯 Logo、過啞膠/光膠保護、打孔掛繩方便展會吊掛</li></ul>
<h3>四、訂製流程與交期</h3>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>提供設計稿（PDF/X-1a，含 3mm 出血位）或使用免費設計服務</li><li>揀尺寸、紙材、工藝與數量，30 秒 AI 報價即時出單</li><li>數碼打樣確認色彩（RGB 螢幕與 CMYK 印刷色差需打樣確認）</li><li>生產：10-1,000 張小至大批量，常規 3-5 個工作天</li><li>順豐本地配送或 DHL 全球 2-4 天送達</li></ol>
<p>相關閱讀：<a href="/zh-hk/category/posters/">海報印刷類目</a> · <a href="/zh-hk/product/a1-posters/">A1 海報印刷</a> · <a href="/zh-hk/product/a2-posters/">A2 海報印刷</a> · <a href="/zh-hk/product/outdoor-posters/">戶外防水海報</a> · <a href="/zh-hk/blog/poster-printing-guide/">海報印刷完整指南</a></p>
<p><strong>Q: A2 海報實際尺寸係幾多？</strong><br/>A: A2 尺寸為 420 × 594 mm（16.5 × 23.4 吋），約等於四張 A4 拼埋，係香港零售店櫥窗與展會展示最常用嘅尺寸。</p>
<p><strong>Q: A3 同 A2 海報應該點揀？</strong><br/>A: 3 米內閱讀（櫃枱、枱面、細櫥窗）揀 A3；3-5 米閱讀距離（大櫥窗、展會攤位）揀 A2。面積差距一倍，印刷成本約差 30-50%。</p>
<p><strong>Q: 戶外海報需要特別加工嗎？</strong><br/>A: 需要。戶外建議選防水 PP 膜或啞面膠膜，配合 UV 油墨防褪色，短期活動可維持 2-4 星期，長期燈箱建議用合成紙或油畫布。</p>
<p><strong>Q: 海報印刷最低數量係幾多？</strong><br/>A: 智印港 10 張起印，數碼印刷適合 10-300 張小批量急單，300 張以上轉柯式印刷，單張成本可降低 40% 以上。</p>
<p><strong>WhatsApp 即時報價</strong>：+86 181 2638 0255（香港時間 9:00-21:00）</p>"""

# ============ en content ============
EN_CONTENT = """<p>Choosing between A1, A2 and A3 poster sizes can be confusing — print too small and it disappears at a distance, too large and you burn budget. This guide covers exact dimensions in mm, cm and inches, best use cases for retail, trade shows and outdoor, plus paper and waterproof finish options, with 4 FAQs for print buyers ordering 10-1,000 piece runs.</p>
<h3>1. A1 / A2 / A3 Standard Size Chart</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>A3</strong>: 297 × 420 mm (11.7 × 16.5 in) — two A4 sheets; countertop displays, small windows, menu boards</li><li><strong>A2</strong>: 420 × 594 mm (16.5 × 23.4 in) — four A4 sheets; shop windows, booth displays, meeting room visuals</li><li><strong>A1</strong>: 594 × 841 mm (23.4 × 33.1 in) — eight A4 sheets; outdoor light boxes, station posters, event backdrops</li><li><strong>Rule of thumb</strong>: each A-series step up doubles the area — A3, A2, A1 equal 2x, 4x, 8x A4</li></ul>
<h3>2. Choosing a Size by Use Case</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Retail windows / in-store promo</strong>: A2 works best, readable from 3-5 m, pairs with floor stands</li><li><strong>Trade shows / conferences</strong>: A1 wall prints or A-frames pull attention from 5-8 m</li><li><strong>Outdoor light boxes / bus stops</strong>: A1 and up, always with waterproof PP film or matte lamination</li><li><strong>Countertop mini posters</strong>: A3 keeps cost lowest for menu specials and new launches</li></ul>
<h3>3. Paper & Waterproof Finishes</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Art paper (gloss / matte)</strong>: 157-250 gsm, vivid color indoors, matte reduces glare under lights</li><li><strong>Waterproof PP film</strong>: wipeable, best for long-term windows and short outdoor runs</li><li><strong>Synthetic paper / matte laminate</strong>: tear-resistant, survives 2-3 show cycles</li><li><strong>Outdoor canvas</strong>: premium feel for event backdrops and signing walls</li><li><strong>Finishing</strong>: UV spot varnish for logos, gloss/matte lamination, grommet holes for hanging</li></ul>
<h3>4. Ordering Process & Turnaround</h3>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>Submit print-ready PDF/X-1a with 3 mm bleed, or use free design service</li><li>Choose size, paper, finish and quantity — 30-second AI quote</li><li>Digital proof to confirm color (RGB screen vs CMYK print)</li><li>Production: 10-1,000 piece runs, standard 3-5 business days</li><li>DHL Express 2-4 day worldwide delivery from Asia factory</li></ol>
<p>Related: <a href="/en/category/posters/">Poster Printing Category</a> · <a href="/en/product/a1-posters/">A1 Posters</a> · <a href="/en/product/a2-posters/">A2 Posters</a> · <a href="/en/product/outdoor-posters/">Outdoor Waterproof Posters</a> · <a href="/en/blog/poster-printing-guide/">Complete Poster Printing Guide</a></p>
<p><strong>Q: What are the exact A2 poster dimensions?</strong><br/>A: A2 is 420 × 594 mm (16.5 × 23.4 in), roughly four A4 sheets — the most common size for retail windows and trade show booths.</p>
<p><strong>Q: Should I choose A3 or A2 for my poster?</strong><br/>A: Use A3 for reading within 3 m (countertops, small windows); A2 for 3-5 m viewing (large windows, booths). A2 costs about 30-50% more than A3.</p>
<p><strong>Q: Do outdoor posters need special treatment?</strong><br/>A: Yes — choose waterproof PP film or matte lamination with UV-resistant ink. Short outdoor runs last 2-4 weeks; permanent light boxes need synthetic paper or canvas.</p>
<p><strong>Q: What is the minimum order for posters?</strong><br/>A: ZprintPro starts at 10 pieces. Digital printing suits 10-300 piece rush runs; 300+ pieces switch to offset for 40%+ lower unit cost.</p>
<p><strong>WhatsApp instant quote</strong>: +86 181 2638 0255</p>"""

# ============ ja content ============
JA_CONTENT = """<p>A1・A2・A3 ポスターサイズの選び方に迷っていませんか？小さすぎると遠くから見えず、大きすぎると予算を無駄にします。本ガイドでは正確な寸法（mm / cm / インチ）、小売・展示会・屋外での用途別の選び方、用紙と防水加工の選び方を解説し、印刷発注前の FAQ 4 件も収録。10〜1,000 枚の小〜大ロットに対応します。</p>
<h3>1. A1 / A2 / A3 標準サイズ早見表</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>A3</strong>：297 × 420 mm（11.7 × 16.5 インチ）— A4 2 枚分。カウンター、小窓、メニューボード向け</li><li><strong>A2</strong>：420 × 594 mm（16.5 × 23.4 インチ）— A4 4 枚分。ショーウィンドウ、ブース、会議室のメインビジュアル向け</li><li><strong>A1</strong>：594 × 841 mm（23.4 × 33.1 インチ）— A4 8 枚分。屋外ライトボックス、駅構内、イベント背景パネル向け</li><li><strong>覚え方</strong>：A シリーズは 1 つ上がるごとに面積 2 倍 — A3・A2・A1 は A4 の 2 倍・4 倍・8 倍</li></ul>
<h3>2. 用途別サイズの選び方</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>小売ウィンドウ / 店内プロモーション</strong>：A2 が最適、3〜5 m から読めてフロアスタンドとも併用可</li><li><strong>展示会 / セミナー</strong>：A1 壁掛けや A 型スタンドで 5〜8 m 先の視線を集める</li><li><strong>屋外ライトボックス / バス停</strong>：A1 以上、防水 PP フィルムまたはマットラミネート必須</li><li><strong>カウンター小型ポスター</strong>：A3 でコスト最小、メニュー特集や新商品案内に</li></ul>
<h3>3. 用紙と防水加工の選び方</h3>
<ul class="list-disc pl-5 my-3 space-y-1"><li><strong>コート紙（グロス / マット）</strong>：157〜250 gsm、室内の色再現に優れ、マットは照明下の映り込みを防止</li><li><strong>防水 PP フィルム</strong>：拭き取り可能、長期ウィンドウ展示と短期屋外に最適</li><li><strong>合成紙 / マットラミネート</strong>：引き裂きに強く、展示会での再利用に耐える</li><li><strong>屋外キャンバス</strong>：イベント背景・サインウォールに高級感のある仕上がり</li><li><strong>加工</strong>：ロゴへの UV スポット、グロス/マットラミネート、吊り下げ用ハトメ穴</li></ul>
<h3>4. 発注フローと納期</h3>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>入稿データ（PDF/X-1a、3 mm 塗り足し）を用意、または無料デザインサービスを利用</li><li>サイズ・用紙・加工・数量を選び、30 秒 AI 見積もりで即時発注</li><li>デジタル校正で色を確認（RGB モニターと CMYK 印刷の差）</li><li>生産：10〜1,000 枚小〜大ロット、標準 3〜5 営業日</li><li>ヤマト運輸・佐川急便で全国配送、DHL 国際配送 2〜4 日</li></ul>
<p>関連リンク：<a href="/ja/category/posters/">ポスター印刷カテゴリ</a> · <a href="/ja/product/a1-posters/">A1 ポスター印刷</a> · <a href="/ja/product/a2-posters/">A2 ポスター印刷</a> · <a href="/ja/product/outdoor-posters/">屋外防水ポスター</a> · <a href="/ja/blog/poster-printing-guide/">ポスター印刷完全ガイド</a></p>
<p><strong>Q: A2 ポスターの正確な寸法は？</strong><br/>A: A2 は 420 × 594 mm（16.5 × 23.4 インチ）、A4 約 4 枚分。小売ウィンドウや展示会ブースで最も一般的なサイズです。</p>
<p><strong>Q: A3 と A2 はどちらを選ぶべき？</strong><br/>A: 3 m 以内で読むなら A3（カウンター・小窓）、3〜5 m から見せるなら A2（大型ウィンドウ・ブース）。A2 は A3 より印刷費が約 30〜50% 高くなります。</p>
<p><strong>Q: 屋外ポスターに特別な加工は必要？</strong><br/>A: 必要です。防水 PP フィルムまたはマットラミネート＋UV インクで短期屋外は 2〜4 週間持ち、常設ライトボックスには合成紙やキャンバスが適します。</p>
<p><strong>Q: ポスターの最小ロットは？</strong><br/>A: 10 枚から受注可能。デジタル印刷は 10〜300 枚の急ぎ小ロット向け、300 枚以上はオフセット印刷で単価 40% 以上ダウン。</p>
<p><strong>WhatsApp 即時見積もり</strong>：+86 181 2638 0255</p>"""

entries = {
    'zh-hk': {
        'slug': 'poster-size-guide',
        'title': 'A1 A2 A3 海報尺寸指南：印刷尺寸對照表・應用場景・紙材選擇 | 智印港 ZprintPro',
        'description': 'A1 / A2 / A3 海報尺寸點樣揀？本文整理三種尺寸對照表（mm / cm / 英吋）、零售・展會・戶外場景應用建議、紙材與防水工藝選擇，附 4 條常見 FAQ，協助 10-1,000 張小至大批量落單，3-5 個工作天交付。',
        'date': '2026-08-05',
        'category': '海報印刷',
        'content': ZH_CONTENT,
    },
    'en': {
        'slug': 'poster-size-guide',
        'title': 'A1 A2 A3 Poster Size Guide: Dimensions Chart, Uses & Paper Choices | ZprintPro',
        'description': 'A1, A2 and A3 poster sizes compared — exact dimensions in mm / cm / inches, best use cases for retail, trade shows and outdoor, paper & waterproof finish choices, 4 FAQs, 10-1,000 piece runs, 3-5 day production from Asia factory.',
        'date': '2026-08-05',
        'category': 'Poster Printing',
        'content': EN_CONTENT,
    },
    'ja': {
        'slug': 'poster-size-guide',
        'title': 'A1 A2 A3 ポスターサイズガイド：寸法早見表・用途・用紙選び | ZprintPro',
        'description': 'A1・A2・A3 ポスターサイズを徹底比較。寸法（mm / cm / インチ）早見表、小売・展示会・屋外での用途別選び方、用紙と防水加工の選び方、よくある質問 4 件、10-1,000 枚小〜大ロット、3-5 営業日生産。',
        'date': '2026-08-05',
        'category': 'ポスター印刷',
        'content': JA_CONTENT,
    },
}

for locale, entry in entries.items():
    path = f'src/data/blog-data/{locale}.json'
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    data['poster-size-guide'] = entry
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'{path}: added poster-size-guide, content chars={len(entry["content"])}')

# sanity: word counts
print()
print('zh-hk content chars:', len(ZH_CONTENT))
print('en content words:', len(EN_CONTENT.split()))
print('ja content chars:', len(JA_CONTENT))
