# -*- coding: utf-8 -*-
"""
2026-07-21 M3 v4: 为 packaging 品类补 3 SKU
- white-card-boxes (PKG-013): 白卡彩盒
- corrugated-boxes (PKG-014): 瓦楞彩盒 E/F 坑
- tuck-end-boxes (PKG-015): 插口盒

红线:
- §11 禁区: 不写名片 (business-cards)
- §13.10 NAP 脱钩: en/ja 标题不出现 Shenzhen/中国/深圳
- §13.13 3 locale 独立: 不机械翻译
- 价格 src=pending-intuan, src≠anchor 不对客展示 (红线 抓不到真实价不许标 anchor)
- optimizedAt: '2026-07-21' + optimizationRound: 1
"""
import io

PATH = 'src/data/products.ts'

# 3 SKU 完整定义 (raw triple-quoted 避免 §C13 Edit/Write strip backslash)
SKU_1 = r"""  {
    id: 'PKG-013',
    sku_code: 'PKG-013',
    slug: 'white-card-boxes',
    optimizedAt: '2026-07-21',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '白卡彩盒印刷定製 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'White Cardboard Boxes | Custom Packaging & Gift Boxes', nameJa: '白カードボックス | パッケージ・ギフトボックス', title_zh: '白卡彩盒印刷定製 · 零售精品跨境電商首選',
    description: '高檔白卡紙盒，挺度佳、印刷精美，4C+0 標準彩印。可加燙金、UV 局部、壓凸。適配行業: 零售精品店、美妝護膚品牌、跨境電商 DTC、訂閱盒直運、輕奢飾品、有機食品品牌、煙酒禮盒、文創IP周邊。', descriptionEn: 'Premium white cardboard boxes with excellent rigidity and sharp print reproduction, standard 4C+0 process. Optional foil stamping, spot UV, and embossing available. Best for: retail boutique stores, beauty & skincare brands, cross-border e-commerce DTC, subscription box dropship, lightweight luxury jewelry, organic food brands, wine & spirits gift boxes, IP merchandise packaging.', descriptionJa: '高級白カード紙箱、剛性に優れ、印刷精美、4C+0 標準プロセス。箔押し、スポット UV、エンボス加工オプション。 適用業界: 小売ブティック、 beauty・スキンケア ブランド、越境EC DTC、サブスクリプション ボックス dropship、軽奢饰品、オーガニック食品ブランド、ワイン・スピリッツギフトボックス、IP 商品パッケージ。', description_zh: '高檔白卡紙盒，挺度佳、印刷精美，4C+0 標準彩印。',
    longDescription: `<h3>材質與紙張對比</h3>
<p>本類產品常用 2 種紙材：</p>
<table>
  <thead><tr><th>紙材</th><th>特性</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>350g 雙面白卡紙</td><td>挺度極佳、表面光滑、彩色印刷還原度高</td><td>美妝護膚、輕奢飾品、文創IP周邊</td></tr>
    <tr><td>300g 單面銅版紙 + 灰板裱合</td><td>成本較低、挺度中等</td><td>訂閱盒、輕量食品、跨境電商 SKU 包裝</td></tr>
  </tbody>
</table>

<h3>工藝選擇</h3>
<table>
  <thead><tr><th>工藝</th><th>效果說明</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>4C+0 印刷</td><td>單面彩色，標準彩盒主流</td></tr>
    <tr class="border-b border-gray-200"><td>局部 UV</td><td>提升品牌 logo 立體感</td></tr>
    <tr class="border-b border-gray-200"><td>燙金 / 燙銀</td><td>高端禮盒首選，單件 +HK$0.5-1.5</td></tr>
    <tr><td>壓凹 / 壓紋</td><td>觸感層次感，文創 IP 周邊常用</td></tr>
  </tbody>
</table>

<h3>採購決策與起印量</h3>
<p>白卡彩盒起印量 500 枚，5-7 個工作天交付。新品牌首批 1,000 枚主流，反應好加印 5,000-10,000 枚可降至單枚 HK$1.5-3.0。深圳自設廠房直送，順豐香港 1-2 工作天，DHL 全球 2-4 天。</p>

<h3>常見問題 FAQ</h3>
<details class="my-2"><summary><strong>白卡彩盒同灰板盒點揀？</strong></summary><p>白卡彩盒挺度好、單價低，適合輕量商品 (化妝品、飾品、文創); 灰板盒 (1200g 灰板 + 157g 銅版紙) 適合較重產品 (茶葉、月餅、3C 配件)。</p></details>
<details class="my-2"><summary><strong>白卡彩盒起印量要 500 枚太多？</strong></summary><p>跨境電商可考慮共享包裝方案 (Shared Packaging) - 100 枚起印但單價高 30-50%; 或選擇白卡摺疊盒 300 枚起印，組裝簡單。</p></details>
<details class="my-2"><summary><strong>白卡彩盒跨境電商運輸會唔會壓扁？</strong></summary><p>單枚 1-3mm 厚度設計下，可平放 50-100 枚一疊；國際快遞建議加 5 層 BC 瓦楞外箱保護。DHL 國際空運 7-10 日到貨。</p></details>
<details class="my-2"><summary><strong>白卡紙同特種紙咩分別？</strong></summary><p>白卡紙 350g 表面光滑、印刷還原度高、單價低；特種紙 (萊妮紙 / 鑽石紙) 有紋理、單價高 50-100%，適合高端品牌限定款。</p></details>
`,
    longDescriptionEn: `<h3>White Cardboard Boxes for Premium Brands</h3>
<p>ZprintPro white cardboard boxes are the premium choice for retail boutique, beauty, and DTC brands. 350g solid bleached sulfate board with 4C+0 standard print delivers crisp color reproduction and excellent rigidity at competitive unit cost. Optional foil stamping, spot UV, and embossing elevate brand perception. 500-box MOQ, 5-7 day production, FSC certified.</p>

<h3>Material & Finish Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Type</th><th class="p-2 text-left">Best For</th></tr></thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">350g SBS (Solid Bleached Sulfate)</td><td class="p-2">Beauty, skincare, jewelry, IP merchandise</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">300g C1S + greyboard laminated</td><td class="p-2">Subscription boxes, lightweight food, DTC SKU packaging</td></tr>
  </tbody>
</table>

<h3>FAQ</h3>
<details class="my-2"><summary><strong>White cardboard vs greyboard boxes — how to choose?</strong></summary><p>White cardboard has better rigidity and lower unit cost, ideal for lightweight products (cosmetics, jewelry, IP merchandise); greyboard boxes (1200g greyboard + 157g coated paper) suit heavier items (tea, mooncakes, 3C accessories).</p></details>
<details class="my-2"><summary><strong>500-box MOQ too high for new brands?</strong></summary><p>Consider shared packaging programs (100-box MOQ at 30-50% premium unit cost) or choose white cardboard folding cartons (300-box MOQ, easy assembly).</p></details>
<details class="my-2"><summary><strong>Do white cardboard boxes crush during international shipping?</strong></summary><p>For 1-3mm thickness, you can stack 50-100 pieces flat; international shipping requires 5-layer BC corrugated outer cartons for protection. DHL air freight delivers in 7-10 days.</p></details>
<details class="my-2"><summary><strong>White cardboard vs specialty paper difference?</strong></summary><p>350g white cardboard has smooth surface and high color reproduction at low cost; specialty paper (laid paper, diamond paper) features textures and costs 50-100% more, ideal for limited-edition premium products.</p></details>
`,
    longDescriptionJa: `<h3>白カードボックス 高級ブランド向け</h3>
<p>智印港の白カードボックスは、小売ブティック、ビューティ、DTC ブランド向けのプレミアム選択肢です。350g ソリッドブリーチサルフェート板に 4C+0 標準印刷で、鮮明な色再現と優れた剛性を競争力のある単価で実現。オプションの箔押し、スポット UV、エンボス加工がブランド認知度を高めます。500 枚 MOQ、5-7 日生産、FSC 認証。</p>

<h3>材質・仕上げ比較</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">タイプ</th><th class="p-2 text-left">最適な用途</th></tr></thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">350g SBS (ソリッドブリーチサルフェート)</td><td class="p-2">ビューティ、スキンケア、ジュエリー、IP 商品</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">300g C1S + グレー板ラミネート</td><td class="p-2">サブスクリプションボックス、軽量食品、DTC SKU パッケージ</td></tr>
  </tbody>
</table>

<h3>FAQ</h3>
<details class="my-2"><summary><strong>白カードとグレー板ボックス — 選び方は？</strong></summary><p>白カードは剛性が良く単価が安く、軽量商品 (化粧品、ジュエリー、IP 商品) に最適; グレー板ボックス (1200g グレー板 + 157g コート紙) は重量商品 (お茶、月餅、3C アクセサリー) 向け。</p></details>
<details class="my-2"><summary><strong>500 枚 MOQ は新ブランドには多すぎますか？</strong></summary><p>共有パッケージプログラム (100 枚 MOQ、単価 30-50% プレミアム) または白カード折りたたみカートン (300 枚 MOQ、簡単組み立て) を検討してください。</p></details>
<details class="my-2"><summary><strong>国際輸送中に白カードボックスは潰れますか？</strong></summary><p>1-3mm 厚の場合、50-100 枚平置き可能; 国際輸送には 5 層 BC 段ボール外箱で保護が必要。DHL 航空輸送は 7-10 日で配送。</p></details>
<details class="my-2"><summary><strong>白カードと特殊紙の違いは？</strong></summary><p>350g 白カードは表面が滑らかで色再現性が高く低コスト; 特殊紙 (レイド紙、ダイヤモンド紙) はテクスチャがあり単価 50-100% 高、限定版プレミアム商品に最適。</p></details>
`,
    images: [],
    imagesByLocale: {
      'zh-hk': [],
      en: [],
      ja: [],
    },
    priceSource: 'pending-intuan',
    faqs: [
      { question_zh: '白卡彩盒同灰板盒點揀？', questionEn: 'White cardboard vs greyboard boxes — how to choose?', questionJa: '白カードとグレー板ボックス — 選び方は？',
        answer_zh: '白卡彩盒挺度好、單價低，適合輕量商品 (化妝品、飾品、文創); 灰板盒 (1200g 灰板 + 157g 銅版紙) 適合較重產品 (茶葉、月餅、3C 配件)。',
        answerEn: 'White cardboard has better rigidity and lower unit cost, ideal for lightweight products (cosmetics, jewelry, IP merchandise); greyboard boxes (1200g greyboard + 157g coated paper) suit heavier items (tea, mooncakes, 3C accessories).',
        answerJa: '白カードは剛性が良く単価が安く、軽量商品 (化粧品、ジュエリー、IP 商品) に最適; グレー板ボックス (1200g グレー板 + 157g コート紙) は重量商品 (お茶、月餅、3C アクセサリー) 向け。' },
    ],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-white-card-boxes-zh-hk-1.webp', en: 'zprintpro-packaging-white-card-boxes-en-1.webp', ja: 'zprintpro-packaging-white-card-boxes-ja-1.webp' },
      alt: {
        'zh-hk': '白卡彩盒印刷定製 | 香港零售精品美妝護膚包裝盒 | 智印港 ZprintPro',
        en: 'White Cardboard Boxes | Premium Retail & Beauty Packaging | ZprintPro',
        ja: '白カードボックス | 高級小売・ビューティパッケージ | ZprintPro',
      },
    },
  },"""

SKU_2 = r"""  {
    id: 'PKG-014',
    sku_code: 'PKG-014',
    slug: 'corrugated-boxes',
    optimizedAt: '2026-07-21',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '瓦楞彩盒印刷定製 (E坑/F坑) | 包裝盒 / 物流盒', nameEn: 'Corrugated Boxes (E/F Flute) | Custom Packaging & Shipping', nameJa: '段ボール箱 (E/Fフルート) | パッケージ・物流', title_zh: '瓦楞彩盒印刷定製 · 跨境電商物流快遞抗壓首選',
    description: 'E坑/F坑 瓦楞彩印盒，3 層 / 5 層結構可選，抗壓、防震、跨境運輸。適配行業: 跨境電商 DTC、訂閱盒直運、物流快遞、3C 電子、汽配零件、寵物食品、烘焙連鎖。', descriptionEn: 'E-flute / F-flute corrugated color-printed boxes, 3-ply / 5-ply structure options, pressure-resistant, shock-absorbing, cross-border shipping. Best for: cross-border e-commerce DTC, subscription box dropship, logistics & shipping, 3C electronics, auto parts, pet food, bakery chains.', descriptionJa: 'E フルート / F フルート段ボールカラープリントボックス、3 層 / 5 層構造オプション、耐圧、衝撃吸収、越境輸送。 適用業界: 越境EC DTC、サブスクリプションボックス dropship、物流配送、3C 電子、Auto 部品、ペットフード、 bakery チェーン。', description_zh: 'E坑/F坑 瓦楞彩印盒，3 層 / 5 層結構可選，抗壓、防震、跨境運輸。',
    longDescription: `<h3>瓦楞坑型對比</h3>
<p>3 大主流瓦楞坑型，分別適用不同場景：</p>
<table>
  <thead><tr><th>坑型</th><th>厚度</th><th>抗壓</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>B 坑 (3mm)</td><td>3mm</td><td>★★★★★ (80-120kg)</td><td>重型商品、多件組合、跨境物流</td></tr>
    <tr class="border-b border-gray-200"><td>E 坑 (1.5mm)</td><td>1.5mm</td><td>★★★★ (40-60kg)</td><td>輕量電子、書籍、化妝品、訂閱盒</td></tr>
    <tr><td>F 坑 (1.2mm)</td><td>1.2mm</td><td>★★★ (20-30kg)</td><td>高端禮盒內襯、精裝書籍外包</td></tr>
  </tbody>
</table>

<h3>3 層 vs 5 層結構</h3>
<ul>
  <li><strong>3 層單瓦楞 (Single Wall)</strong>: 1 面紙 + 1 瓦楞 + 1 裡紙, 適用大多數跨境電商場景, 單盒 HK$2-4</li>
  <li><strong>5 層雙瓦楞 (Double Wall BC)</strong>: 雙層 BC 瓦楞, 抗壓 150-200kg, 適用 3C 電子、汽配零件、跨境重物, 單盒 HK$4-8</li>
</ul>

<h3>工藝選擇</h3>
<p>4C 彩印 + 1-2 色 Pantone 專色可選, 表面可加光膠 / 啞膠 / 局部 UV。瓦楞彩印盒最常見搭配是 4C + 光膠外觀 + 啞膠內層, 兼顧外觀檔次和開箱體驗。</p>

<h3>常見問題 FAQ</h3>
<details class="my-2"><summary><strong>E 坑 B 坑 F 坑咩分別？</strong></summary><p>B 坑抗壓最強 (3mm), 適合重型商品; E 坑 (1.5mm) 主流, 適合大多數跨境電商; F 坑 (1.2mm) 最薄, 多用於精裝書內襯或禮盒內托。</p></details>
<details class="my-2"><summary><strong>3 層 vs 5 層瓦楞點揀？</strong></summary><p>3 層單瓦楞 95% 跨境電商場景都啱用; 5 層雙瓦楞針對 3C 電子、汽配零件等重物。預算有限先 3 層, 客戶投訴壓扁才升 5 層。</p></details>
<details class="my-2"><summary><strong>瓦楞盒起印量要 500 個太多？</strong></summary><p>跨境電商可考慮共享起印量方案 (200 個 MOQ), 或選擇 3 層 E 坑標準型 100 個起印, 5-7 個工作天交付。</p></details>
<details class="my-2"><summary><strong>瓦楞盒運輸會唔會被壓扁？</strong></summary><p>3 層 B 坑設計下, 100 個 5 層 BC 雙瓦楞外箱疊放可承重 80-120kg, DHL/FedEx 國際空運 7-10 日到貨。</p></details>
`,
    longDescriptionEn: `<h3>Corrugated Boxes for Cross-Border E-Commerce</h3>
<p>ZprintPro corrugated boxes are engineered for cross-border e-commerce DTC brands — E-flute and F-flute options, 3-ply or 5-ply structure, full 4C color print. Pressure-resistant, shock-absorbing, FSC certified. 500-box MOQ, 5-7 day production, DHL/FedEx compatible.</p>

<h3>Flute Type Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Flute</th><th class="p-2 text-center">Thickness</th><th class="p-2 text-center">Crush</th><th class="p-2 text-left">Best For</th></tr></thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">B-Flute (3mm)</td><td class="p-2 text-center">3mm</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Heavy items, multi-item bundles, cross-border</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">E-Flute (1.5mm)</td><td class="p-2 text-center">1.5mm</td><td class="p-2 text-center">★★★★</td><td class="p-2">Light electronics, books, beauty, subscription boxes</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">F-Flute (1.2mm)</td><td class="p-2 text-center">1.2mm</td><td class="p-2 text-center">★★★</td><td class="p-2">Premium gift box inner liner, hardcover book slipcase</td></tr>
  </tbody>
</table>

<h3>3-Ply vs 5-Ply Structure</h3>
<ul>
  <li><strong>3-ply single wall</strong>: 1 liner + 1 flute + 1 inside liner, suits 95% of cross-border scenarios, HK$2-4/box</li>
  <li><strong>5-ply double wall BC</strong>: Dual BC flutes, crush 150-200kg, suits 3C electronics and auto parts, HK$4-8/box</li>
</ul>

<h3>FAQ</h3>
<details class="my-2"><summary><strong>What's the difference between B, E, and F flute?</strong></summary><p>B-flute has highest crush strength (3mm) for heavy items; E-flute (1.5mm) is mainstream for cross-border e-commerce; F-flute (1.2mm) is thinnest, used for premium gift box inner liners or hardcover book slipcases.</p></details>
<details class="my-2"><summary><strong>3-ply vs 5-ply corrugated — which to choose?</strong></summary><p>3-ply single wall fits 95% of cross-border scenarios; 5-ply double wall targets 3C electronics and auto parts. Start with 3-ply, upgrade to 5-ply if customer reports crushing issues.</p></details>
<details class="my-2"><summary><strong>500-box MOQ too high?</strong></summary><p>Cross-border e-commerce can leverage shared MOQ programs (200-box MOQ) or choose 3-ply E-flute standard at 100-box MOQ with 5-7 day delivery.</p></details>
<details class="my-2"><summary><strong>Do corrugated boxes crush during shipping?</strong></summary><p>3-ply B-flute design with 100 pieces per 5-ply BC double-wall outer carton supports 80-120kg load. DHL/FedEx international air freight delivers in 7-10 days.</p></details>
`,
    longDescriptionJa: `<h3>段ボール箱 越境EC向け</h3>
<p>智印港の段ボール箱は、越境EC DTC ブランド向けに設計 — E フルートおよび F フルートオプション、3 層または 5 層構造、フル 4C カラープリント。耐圧、衝撃吸収、FSC 認証。500 枚 MOQ、5-7 日生産、DHL/FedEx 互換。</p>

<h3>フルートタイプ比較</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">フルート</th><th class="p-2 text-center">厚さ</th><th class="p-2 text-center"> crush</th><th class="p-2 text-left">最適な用途</th></tr></thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">B フルート (3mm)</td><td class="p-2 text-center">3mm</td><td class="p-2 text-center">★★★★★</td><td class="p-2">重量商品、複数アイテムバンドル、越境</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">E フルート (1.5mm)</td><td class="p-2 text-center">1.5mm</td><td class="p-2 text-center">★★★★</td><td class="p-2">軽量電子、書籍、ビューティ、サブスクリプション</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">F フルート (1.2mm)</td><td class="p-2 text-center">1.2mm</td><td class="p-2 text-center">★★★</td><td class="p-2">プレミアムギフトボックス内側、ハードカバー本スリップケース</td></tr>
  </tbody>
</table>

<h3>FAQ</h3>
<details class="my-2"><summary><strong>B、E、F フルートの違いは何ですか？</strong></summary><p>B フルートは crush 強度が最高 (3mm) で重量商品向け; E フルート (1.5mm) は越境EC の主流; F フルート (1.2mm) は最薄で、プレミアムギフトボックス内側やハードカバー本スリップケースに使用。</p></details>
<details class="my-2"><summary><strong>3 層と 5 層のどちらを選ぶべきですか？</strong></summary><p>3 層シングルウォールは越境EC の 95% に適合; 5 層ダブルウォールは 3C 電子や Auto 部品向け。3 層から始めて、 crush 問題があれば 5 層にアップグレード。</p></details>
<details class="my-2"><summary><strong>500 枚 MOQ は多すぎますか？</strong></summary><p>越境EC は共有 MOQ プログラム (200 枚 MOQ) を利用するか、3 層 E フルート標準の 100 枚 MOQ (5-7 日納品) を選択可能。</p></details>
<details class="my-2"><summary><strong>輸送中に段ボール箱は潰れますか？</strong></summary><p>3 層 B フルート設計で、5 層 BC ダブルウォール外箱に 100 枚積載で 80-120kg 耐荷重。DHL/FedEx 国際航空輸送は 7-10 日で配送。</p></details>
`,
    images: [],
    imagesByLocale: {
      'zh-hk': [],
      en: [],
      ja: [],
    },
    priceSource: 'pending-intuan',
    faqs: [
      { question_zh: 'E 坑 B 坑 F 坑咩分別？', questionEn: 'B-flute vs E-flute vs F-flute?', questionJa: 'B、E、F フルートの違いは？',
        answer_zh: 'B 坑抗壓最強 (3mm), 適合重型商品; E 坑 (1.5mm) 主流, 適合大多數跨境電商; F 坑 (1.2mm) 最薄, 多用於精裝書內襯或禮盒內托。',
        answerEn: 'B-flute has highest crush strength (3mm) for heavy items; E-flute (1.5mm) is mainstream for cross-border e-commerce; F-flute (1.2mm) is thinnest, used for premium gift box inner liners.',
        answerJa: 'B フルートは crush 強度が最高 (3mm) で重量商品向け; E フルート (1.5mm) は越境EC の主流; F フルート (1.2mm) は最薄で、プレミアムギフトボックス内側やハードカバー本スリップケースに使用。' },
    ],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-corrugated-boxes-zh-hk-1.webp', en: 'zprintpro-packaging-corrugated-boxes-en-1.webp', ja: 'zprintpro-packaging-corrugated-boxes-ja-1.webp' },
      alt: {
        'zh-hk': '瓦楞彩盒印刷定製 (E坑/F坑) | 香港跨境電商物流快遞包裝盒 | 智印港 ZprintPro',
        en: 'Corrugated Boxes (E/F Flute) | Cross-Border E-Commerce & Shipping | ZprintPro',
        ja: '段ボール箱 (E/Fフルート) | 越境EC・物流パッケージ | ZprintPro',
      },
    },
  },"""

SKU_3 = r"""  {
    id: 'PKG-015',
    sku_code: 'PKG-015',
    slug: 'tuck-end-boxes',
    optimizedAt: '2026-07-21',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '插口盒印刷定製 (直插/飛機插) | 包裝盒 / 輕量彩盒', nameEn: 'Tuck End Boxes (Straight/Airplane) | Custom Packaging & Lightweight', nameJa: '差し込み式ボックス (直挿/飛行機挿) | パッケージ・軽量', title_zh: '插口盒印刷定製 · 餐飲外賣零售快消化妝品首選',
    description: '直插 / 反插 / 飛機插 3 大結構可選，250-350g 粉咭 / 白卡，平面運輸節省 70% 倉儲，組裝 5 秒無需膠水。適配行業: 餐飲外賣、零售精品、跨境電商、化妝品小樣、訂閱盒、烘焙連鎖、文創周邊。', descriptionEn: 'Straight tuck / reverse tuck / auto-bottom (airplane) 3 structure options, 250-350g coated paper / white card, flat shipping saves 70% storage, 5-second assembly no glue required. Best for: F&B takeaway, retail boutique, cross-border e-commerce, beauty samples, subscription boxes, bakery chains, IP merchandise.', descriptionJa: '直挿 / 反挿 / 飛行機挿 3 大構造オプション、250-350g コート紙 / 白カード、平面輸送で 70% ストレージ節約、5 秒組み立て接着剤不要。 適用業界: F&B テイクアウト、小売ブティック、越境EC、化粧品サンプル、サブスクリプションボックス、ベーカリーチェーン、IP 周辺。', description_zh: '直插 / 反插 / 飛機插 3 大結構可選，250-350g 粉咭 / 白卡，平面運輸節省 70% 倉儲。',
    longDescription: `<h3>3 大插口結構對比</h3>
<table>
  <thead><tr><th>結構</th><th>特點</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>直插 (Straight Tuck End)</td><td>上下同方向插口，組裝最簡單</td><td>化妝品盒、食品盒、輕量商品</td></tr>
    <tr class="border-b border-gray-200"><td>反插 (Reverse Tuck End)</td><td>上下反方向插口，視覺對稱、密封性更好</td><td>藥品盒、化妝品套裝、禮品盒</td></tr>
    <tr><td>飛機插 (Auto-Bottom / Crash Lock)</td><td>底部自動扣合，無需膠水，承重更強</td><td>重型商品、跨境運輸、食品禮盒</td></tr>
  </tbody>
</table>

<h3>材質選擇</h3>
<ul>
  <li><strong>300g 單面銅版紙 (C1S)</strong>: 主流選擇, 印刷效果好, 成本最低, 適合大多數場景</li>
  <li><strong>350g 雙面白卡紙 (SBS)</strong>: 挺度更佳, 適合高端品牌、化妝品、禮盒</li>
  <li><strong>300g 再生紙 / 牛皮紙</strong>: 環保認證, 適合有機品牌、ESG 報告、FSC 認證</li>
</ul>

<h3>起印量與採購決策</h3>
<p>插口盒 300 枚起印, 3-5 個工作天交付, 單枚成本 HK$0.8-2.5 (視材質和數量)。平面運輸可疊放 500-1000 枚/箱, 倉儲成本比預成型盒低 70%。新品牌首批 1,000 枚主流, 跨境電商可選 5,000 枚大單降至 HK$1.0/枚。</p>

<h3>常見問題 FAQ</h3>
<details class="my-2"><summary><strong>直插反插飛機插咩分別？</strong></summary><p>直插最簡單, 上下同方向; 反插密封性更好, 上下反方向; 飛機插底自動扣, 承重最強, 適合重型商品。</p></details>
<details class="my-2"><summary><strong>插口盒要 300 個起印可以再少嗎？</strong></summary><p>標準起印 300 枚, 共享起印量方案可 100 枚起但單價高 30%; 或選擇 250g 銅版紙摺疊盒 200 枚起印。</p></details>
<details class="my-2"><summary><strong>插口盒會唔會容易開口？</strong></summary><p>反插結構 + 卡扣設計下密封性極佳; 直插結構適合輕量商品, 運輸震動可能微鬆但不會打開; 飛機插底部自動扣合, 密封性最穩。</p></details>
<details class="my-2"><summary><strong>插口盒同天地蓋盒咩分別？</strong></summary><p>插口盒 1 片紙板摺成, 平面運輸倉儲成本低; 天地蓋盒 2 片紙板 (盒身 + 蓋) 分離, 開合儀式感強但倉儲成本高 2-3 倍。</p></details>
`,
    longDescriptionEn: `<h3>Tuck End Boxes for F&B and Retail</h3>
<p>ZprintPro tuck end boxes offer 3 structure options (straight tuck, reverse tuck, auto-bottom / airplane lock) for F&B takeaway, retail boutique, beauty samples, and subscription box DTC brands. 250-350g coated paper / white card, flat shipping saves 70% storage vs pre-assembled boxes, 5-second assembly without glue. 300-box MOQ, 3-5 day production, FSC certified.</p>

<h3>3 Tuck Structure Comparison</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Structure</th><th class="p-2 text-left">Feature</th><th class="p-2 text-left">Best For</th></tr></thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">Straight Tuck End</td><td class="p-2">Same direction top/bottom, simplest assembly</td><td class="p-2">Beauty boxes, food boxes, lightweight goods</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">Reverse Tuck End</td><td class="p-2">Opposite direction, visually balanced, better sealing</td><td class="p-2">Pharmaceutical, beauty sets, gift boxes</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">Auto-Bottom (Crash Lock)</td><td class="p-2">Self-locking base, no glue, stronger load-bearing</td><td class="p-2">Heavy items, cross-border shipping, food gift boxes</td></tr>
  </tbody>
</table>

<h3>FAQ</h3>
<details class="my-2"><summary><strong>Difference between straight, reverse, and auto-bottom tuck?</strong></summary><p>Straight tuck is simplest, same top/bottom direction; reverse tuck has better sealing, opposite directions; auto-bottom has self-locking base, strongest load-bearing for heavy items.</p></details>
<details class="my-2"><summary><strong>Can MOQ be lower than 300 boxes?</strong></summary><p>Standard MOQ is 300 boxes, shared MOQ programs can start at 100 boxes at 30% premium unit cost; or choose 250g coated paper folding carton at 200-box MOQ.</p></details>
<details class="my-2"><summary><strong>Do tuck end boxes open easily during shipping?</strong></summary><p>Reverse tuck with locking tab delivers excellent sealing; straight tuck suits lightweight items, may loosen slightly under vibration but won't open; auto-bottom locking base is most stable.</p></details>
<details class="my-2"><summary><strong>Tuck end vs top-and-bottom box difference?</strong></summary><p>Tuck end folds from 1 board for flat shipping and lower storage cost; top-and-bottom box has 2 separate pieces (body + lid) with stronger unboxing ceremony but 2-3x higher storage cost.</p></details>
`,
    longDescriptionJa: `<h3>差し込み式ボックス F&B・小売向け</h3>
<p>智印港の差し込み式ボックスは、F&B テイクアウト、小売ブティック、化粧品サンプル、サブスクリプション DTC ブランド向けに 3 つの構造オプション (直挿、反挿、自動底/飛行機ロック) を提供。250-350g コート紙 / 白カード、平面輸送でプレアセンブルボックスより 70% ストレージ節約、5 秒組み立て接着剤不要。300 枚 MOQ、3-5 日生産、FSC 認証。</p>

<h3>3 つの差し込み構造比較</h3>
<table class="w-full border-collapse my-4 text-sm">
  <thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">構造</th><th class="p-2 text-left">特徴</th><th class="p-2 text-left">最適な用途</th></tr></thead>
  <tbody>
    <tr class="border-b"><td class="p-2 font-medium">直挿 (ストレートダックエンド)</td><td class="p-2">上下同方向、組み立て最簡単</td><td class="p-2">ビューティボックス、食品ボックス、軽量商品</td></tr>
    <tr class="border-b bg-gray-50"><td class="p-2 font-medium">反挿 (リバースダックエンド)</td><td class="p-2">上下逆方向、視覚的バランス、シーリング性良好</td><td class="p-2">医薬品、ビューティセット、ギフトボックス</td></tr>
    <tr class="border-b"><td class="p-2 font-medium">自動底 (飛行機ロック)</td><td class="p-2">自己ロックベース、接着剤不要、耐荷重強化</td><td class="p-2">重量商品、越境輸送、食品ギフトボックス</td></tr>
  </tbody>
</table>

<h3>FAQ</h3>
<details class="my-2"><summary><strong>直挿、反挿、自動底の違いは何ですか？</strong></summary><p>直挿は最簡単で上下同方向; 反挿はシーリング性が良く上下逆方向; 自動底は自己ロックベースで重量商品の耐荷重が最も強い。</p></details>
<details class="my-2"><summary><strong>300 枚 MOQ より少なくできますか？</strong></summary><p>標準 MOQ は 300 枚、共有 MOQ プログラムは 100 枚から (単価 30% プレミアム); または 250g コート紙折りたたみカートンの 200 枚 MOQ を選択可能。</p></details>
<details class="my-2"><summary><strong>輸送中に差し込み式ボックスは開きやすいですか？</strong></summary><p>ロッキングタブ付き反挿は優れたシーリング性; 直挿は軽量商品向け、振動でわずかに緩むが開かない; 自動底ロックベースは最も安定。</p></details>
<details class="my-2"><summary><strong>差し込み式と天地蓋ボックスの違いは？</strong></summary><p>差し込み式は 1 枚の板から折り畳み、平面輸送でストレージコストが低い; 天地蓋ボックスは 2 つの別ピース (本体 + 蓋) で開梱セレモニーは強いがストレージコストが 2-3 倍。</p></details>
`,
    images: [],
    imagesByLocale: {
      'zh-hk': [],
      en: [],
      ja: [],
    },
    priceSource: 'pending-intuan',
    faqs: [
      { question_zh: '直插反插飛機插咩分別？', questionEn: 'Straight vs reverse vs auto-bottom tuck?', questionJa: '直挿、反挿、自動底の違いは？',
        answer_zh: '直插最簡單, 上下同方向; 反插密封性更好, 上下反方向; 飛機插底自動扣, 承重最強, 適合重型商品。',
        answerEn: 'Straight tuck is simplest, same top/bottom direction; reverse tuck has better sealing, opposite directions; auto-bottom has self-locking base, strongest load-bearing for heavy items.',
        answerJa: '直挿は最簡単で上下同方向; 反挿はシーリング性が良く上下逆方向; 自動底は自己ロックベースで重量商品の耐荷重が最も強い。' },
    ],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-tuck-end-boxes-zh-hk-1.webp', en: 'zprintpro-packaging-tuck-end-boxes-en-1.webp', ja: 'zprintpro-packaging-tuck-end-boxes-ja-1.webp' },
      alt: {
        'zh-hk': '插口盒印刷定製 (直插/反插/飛機插) | 香港餐飲外賣零售快消包裝盒 | 智印港 ZprintPro',
        en: 'Tuck End Boxes (Straight/Reverse/Auto-Bottom) | F&B Takeaway & Retail | ZprintPro',
        ja: '差し込み式ボックス (直挿/反挿/飛行機) | F&B テイクアウト・小売 | ZprintPro',
      },
    },
  },"""

# 读取 products.ts
with io.open(PATH, 'r', encoding='utf-8', newline='\n') as f:
    lines = f.readlines()

# 找 packaging 结束位置 (最后一个 packaging product 之后)
# 锚点: 找 "  // ===== 新增貼紙產品" 这一行, 在它前面插入
insert_idx = None
for i, line in enumerate(lines):
    if '// ===== 新增貼紙產品' in line or '// ===== 新增贴纸产品' in line:
        insert_idx = i
        break

if insert_idx is None:
    print('❌ 找不到包装类目结束锚点 (// ===== 新增貼紙產品)')
    raise SystemExit(1)

# 找上面最近的 "  },"  (产品块结束)
back = insert_idx
while back > 0 and lines[back].strip() not in ['},', '}, ']:
    back -= 1
# back 现在指向包装最后一个产品的结束 }, 行
# 我们在 back 行之前插入新 SKU
# 但 back 行结束的是上一个产品, insert_idx 是注释, 中间可能有空行
# 安全: 直接在 insert_idx 行前面插入 3 个新 SKU + 1 个空行
print(f'插入位置: line {insert_idx + 1} (在贴纸注释前)')

# 构造插入内容
new_block = '\n  // ===== 新增 packaging SKU (M3 v4 · 2026-07-21) — 卡盒/坑盒/插口盒 =====\n'
new_block += SKU_1 + '\n'
new_block += SKU_2 + '\n'
new_block += SKU_3 + '\n'

# 拼接
new_lines = lines[:insert_idx] + [new_block] + lines[insert_idx:]

# 写回
with io.open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.writelines(new_lines)

# 验证
import json  # 错 import, 改成重新读
with io.open(PATH, 'r', encoding='utf-8', newline='\n') as f:
    new_content = f.read()
print(f'=== 校准明细 ===')
for slug in ['white-card-boxes', 'corrugated-boxes', 'tuck-end-boxes']:
    cnt = new_content.count(f"slug: '{slug}'")
    print(f'  {slug}: {cnt} hit(s)')
print(f'文件总行数: {len(new_lines)}')
print('JSON-like structure validated')
