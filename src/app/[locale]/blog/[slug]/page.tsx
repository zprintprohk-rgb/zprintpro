import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, siteConfig } from '@/lib/seo';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

const posts: Record<string, Record<string, { title: string; description: string; date: string; category: string; content: string }>> = {
  'zh-hk': {
    'sticker-guide': {
      title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解',
      description: '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。智印港專家為您詳解防水貼紙、透明貼紙、燙金貼紙等熱門選項。',
      date: '2024-04-15', category: '貼紙知識',
      content: `<p>貼紙是品牌宣傳和產品包裝中不可或缺的元素。無論是產品標籤、促銷宣傳還是個性化裝飾，選擇合適的貼紙材質和工藝都能大幅提升品牌形象。本文將為您詳細介紹香港貼紙印刷的各種選擇。</p>

<h3>一、常見貼紙材質對比</h3>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">材質</th><th class="border p-2 text-left">特性</th><th class="border p-2 text-left">適用場景</th></tr></thead><tbody>
<tr><td class="border p-2">銅版紙貼紙</td><td class="border p-2">成本低、色彩鮮豔</td><td class="border p-2">促銷標籤、臨時貼紙</td></tr>
<tr><td class="border p-2">防水合成紙</td><td class="border p-2">防水防油、耐用</td><td class="border p-2">食品標籤、戶外使用</td></tr>
<tr><td class="border p-2">透明PET</td><td class="border p-2">高透明、質感佳</td><td class="border p-2">玻璃瓶、高檔包裝</td></tr>
<tr><td class="border p-2">雷射/全息貼紙</td><td class="border p-2">防偽、視覺效果好</td><td class="border p-2">防偽標籤、證書</td></tr>
</tbody></table>

<h3>二、表面處理工藝</h3>
<p>貼紙的表面處理直接影響觸感和視覺效果：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>光膠（Glossy Lamination）</strong>：表面光滑反光，色彩飽和度高，適合鮮豔設計</li>
<li><strong>啞膠（Matte Lamination）</strong>：質感柔和不反光，給人高檔沉穩的感覺</li>
<li><strong>燙金（Foil Stamping）</strong>：金屬光澤效果，提升品牌奢華感</li>
<li><strong>UV局部上光</strong>：突出重點圖案，增加層次感</li>
</ul>

<h3>三、如何選擇適合的貼紙</h3>
<p>選擇貼紙時需要考慮以下因素：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>使用環境</strong>：室內還是戶外？是否接觸水油？</li>
<li><strong>貼附表面</strong>：紙張、塑膠、金屬還是玻璃？</li>
<li><strong>使用期限</strong>：臨時使用還是長期標籤？</li>
<li><strong>預算範圍</strong>：不同材質價格差異較大</li>
</ol>

<h3>四、智印港貼紙印刷服務</h3>
<p>智印港提供全面的<a href="/zh-hk/product/waterproof-stickers/">防水貼紙印刷</a>服務，採用高品質合成紙材質，具有出色的防水防油性能，非常適合食品包裝、化妝品標籤等場景。我們的<a href="/zh-hk/product/transparent-stickers/">透明貼紙</a>採用PET材質，貼合後呈現無感效果，完美展現產品本身。</p>
<p>對於追求獨特效果的客戶，我們的<a href="/zh-hk/product/die-cut-stickers/">異形模切貼紙</a>可以製作出任意形狀，讓您的品牌設計不受限制。而<a href="/zh-hk/product/foil-stickers/">燙金貼紙</a>則能為產品增添奢華質感，特別適合高端禮品和限量版產品。</p>

<h3>五、常見問題</h3>
<div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3">
<p><strong>Q: 貼紙印刷的最小訂購量是多少？</strong><br/>A: 一般為100張起訂，部分特殊工藝需500張起。</p>
<p><strong>Q: 防水貼紙真的可以泡水嗎？</strong><br/>A: 是的，我們的防水貼紙採用合成紙+防水膠水，可承受短時間浸泡。</p>
<p><strong>Q: 貼紙的交貨時間多久？</strong><br/>A: 標準3-5個工作日，急件可安排即日交貨。</p>
</div>

<p>無論您需要哪種貼紙，智印港都能為您提供專業建議和優質服務。立即<a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯繫我們</a>獲取免費報價！</p>`,
    },
    'business-card-design': {
      title: '名片設計的10個黃金法則：打造令人難忘的專業形象',
      description: '從排版到色彩搭配，掌握名片設計的核心技巧。智印港設計專家分享10個黃金法則，助您打造令人印象深刻的專業名片。',
      date: '2024-04-10', category: '名片知識',
      content: `<p>名片是商業交往中的第一印象。一張設計精良的名片不僅能傳遞聯繫方式，更能展現品牌專業度和個人品味。以下是智印港設計團隊總結的10個名片設計黃金法則。</p>

<h3>法則1：留白是設計的靈魂</h3>
<p>不要試圖在名片上塞入所有信息。適當的留白能讓重點內容更加突出，給人簡潔專業的印象。建議信息區域佔用不超過名片面積的60%。</p>

<h3>法則2：字體不超過兩種</h3>
<p>名片上最多使用兩種字體：一種用於標題/姓名（如襯線體或粗體無襯線體），一種用於正文信息。過多字體會顯得雜亂無章。</p>

<h3>法則3：色彩傳遞品牌個性</h3>
<p>色彩心理學在名片設計中非常重要：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>藍色：專業、可信、穩重（適合金融、科技）</li>
<li>紅色：熱情、活力、醒目（適合銷售、餐飲）</li>
<li>黑色：奢華、高端、簡約（適合奢侈品、設計）</li>
<li>綠色：環保、健康、自然（適合醫療、環保）</li>
</ul>

<h3>法則4：材質決定觸感</h3>
<p>智印港提供多種<a href="/zh-hk/product/premium-business-cards/">高級商務名片</a>材質選擇：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>300g銅版紙：經濟實惠，適合大量派發</li>
<li><a href="/zh-hk/product/thick-business-cards-400g/">400g厚身名片</a>：厚實手感，彰顯尊貴品質</li>
<li><a href="/zh-hk/product/foil-business-cards/">燙金名片</a>：高檔質感，奢華體驗</li>
<li><a href="/zh-hk/product/spot-uv-business-cards/">局部UV名片</a>：立體效果，視覺層次豐富</li>
</ul>

<h3>法則5：信息層級分明</h3>
<p>名片信息應按重要性排列：姓名 > 職位 > 公司名 > 聯繫方式。使用字號大小和粗細來區分層級。</p>

<h3>法則6：雙面設計的妙用</h3>
<p><a href="/zh-hk/product/double-sided-cards/">雙面名片</a>可以將聯繫信息放在正面，品牌宣言或產品服務放在背面，充分利用空間。</p>

<h3>法則7：二維碼的現代化</h3>
<p>在名片上添加個人微信/WhatsApp二維碼，讓對方一掃即可添加聯繫，提升轉化率。</p>

<h3>法則8：圓角的柔和感</h3>
<p><a href="/zh-hk/product/rounded-corner-cards/">圓角名片</a>比直角名片更具設計感和親和力，也能避免邊角磨損。</p>

<h3>法則9：環保理念的體現</h3>
<p>選擇<a href="/zh-hk/product/eco-business-cards/">環保名片</a>使用再生紙或大豆油墨，展現企業社會責任。</p>

<h3>法則10：與印刷廠充分溝通</h3>
<p>設計稿交付印刷前，務必確認出血位、色彩模式（CMYK）、分辨率（300dpi）等技術細節。智印港提供免費打樣服務，確保成品符合預期。</p>

<h3>立即行動</h3>
<p>準備好升級您的名片了嗎？智印港提供<a href="/zh-hk/product/same-day-business-cards/">即日名片印刷</a>服務，最快當天即可取貨。立即<a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯繫唐先生</a>獲取設計建議和報價！</p>`,
    },
    'packaging-trends': {
      title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出',
      description: '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質。智印港為您解析如何讓產品包裝成為品牌最佳代言人。',
      date: '2024-04-05', category: '包裝知識',
      content: `<p>在競爭激烈的零售市場中，包裝盒不僅是產品的保護殼，更是品牌與消費者的第一接觸點。2024年的包裝設計趨勢呈現出哪些新方向？讓我們一起探討。</p>

<h3>趨勢一：極簡主義持續盛行</h3>
<p>少即是多（Less is More）的設計哲學在包裝領域越發明顯。消費者更傾向於選擇簡潔、信息清晰的包裝。大面積留白、單一主色、精煉的產品名稱成為主流。</p>

<h3>趨勢二：可持續包裝成為標配</h3>
<p>環保不再是加分項，而是基本要求。可降解材料、再生紙板、植物基油墨越來越受歡迎。智印港的<a href="/zh-hk/product/eco-paper-bags/">環保紙袋</a>和可回收包裝盒選項，助您實現ESG目標。</p>

<h3>趨勢三：個性化與定制化</h3>
<p>消費者渴望獨特的產品體驗。小批量、多款式的定制包裝成為新常態。智印港支持<a href="/zh-hk/product/gift-boxes/">禮品盒定制</a>，最低100個起訂，讓中小企業也能擁有專屬包裝。</p>

<h3>趨勢四：智能包裝的興起</h3>
<p>AR擴增實境、NFC芯片、溫度指示標籤等技術開始融入包裝設計。掃描包裝即可查看產品溯源、使用教程或品牌故事。</p>

<h3>趨勢五：情感化設計</h3>
<p>包裝設計越來越注重情感連結。開箱體驗（Unboxing Experience）成為品牌營銷的重要環節。精心設計的內襯、感謝卡、防偽貼紙都能提升消費者好感度。</p>

<h3>熱門包裝類型推薦</h3>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">包裝類型</th><th class="border p-2 text-left">適用產品</th><th class="border p-2 text-left">特點</th></tr></thead><tbody>
<tr><td class="border p-2"><a href="/zh-hk/product/gift-boxes/">禮品盒</a></td><td class="border p-2">化妝品、首飾、電子產品</td><td class="border p-2">精美外觀，提升品牌檔次</td></tr>
<tr><td class="border p-2"><a href="/zh-hk/product/mailer-boxes/">快遞盒</a></td><td class="border p-2">電商產品</td><td class="border p-2">堅固耐用，運輸安全</td></tr>
<tr><td class="border p-2"><a href="/zh-hk/product/cosmetic-boxes/">化妝品盒</a></td><td class="border p-2">護膚品、彩妝</td><td class="border p-2">時尚設計，品牌加分</td></tr>
<tr><td class="border p-2"><a href="/zh-hk/product/food-boxes/">食品盒</a></td><td class="border p-2">烘焙、零食</td><td class="border p-2">食品級材質，安全衛生</td></tr>
</tbody></table>

<h3>包裝設計 checklist</h3>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>品牌 Logo 是否清晰可見？</li>
<li>產品信息是否符合法規要求？</li>
<li>開箱體驗是否順暢愉悅？</li>
<li>材質是否環保可持續？</li>
<li>運輸過程中是否足夠保護產品？</li>
</ul>

<p>想為您的產品打造完美的包裝盒？智印港提供從設計到印刷的一站式<a href="/zh-hk/product/packaging/">包裝盒定制</a>服務。立即<a href="https://wa.me/8618126380255" target="_blank">聯繫我們</a>獲取免費設計方案！</p>`,
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷色彩模式完全詳解',
      description: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。智印港印刷專家為您詳解色彩管理。',
      date: '2024-03-28', category: '印刷工藝',
      content: `<p>色彩管理是印刷品質的關鍵。許多客戶在收到印刷成品後發現顏色與屏幕顯示不一致，這往往源於對色彩模式的理解不足。本文將詳細解析 CMYK 與 RGB 的區別。</p>

<h3>RGB 色彩模式</h3>
<p>RGB（紅、綠、藍）是光學色彩模式，用於屏幕顯示。三種顏色光以不同強度混合，產生各種顏色。RGB 的色域（可顯示顏色範圍）非常廣泛，能呈現鮮豔明亮的顏色。</p>

<h3>CMYK 色彩模式</h3>
<p>CMYK（青、品紅、黃、黑）是印刷色彩模式。這四種油墨以不同比例混合，在紙張上呈現顏色。由於油墨的物理限制，CMYK 的色域比 RGB 窄，某些鮮豔的屏幕顏色無法完全還原。</p>

<h3>為什麼印刷前必須轉 CMYK？</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>設備限制</strong>：印刷機使用 CMYK 四色油墨，無法直接輸出 RGB</li>
<li><strong>色彩偏差</strong>：RGB 轉 CMYK 時，鮮豔顏色會變暗</li>
<li><strong>預期管理</strong>：提前轉換可預見最終效果，避免失望</li>
</ol>

<h3>常見色彩問題與解決方案</h3>
<div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3">
<p><strong>問題1：藍色變紫</strong><br/>A: 屏幕藍色（RGB #0000FF）轉 CMYK 後會偏紫。設計時使用 CMYK 值 C100 M60 Y0 K0 可獲得更純正的藍色。</p>
<p><strong>問題2：黑色不夠黑</strong><br/>A: 四色黑（C60 M40 Y40 K100）比單色黑（K100）更深更飽和。</p>
<p><strong>問題3：漸變出現色階</strong><br/>A: 增加漸變長度，或使用專色印刷。</p>
</div>

<h3>智印港色彩管理服務</h3>
<p>智印港採用專業色彩管理系統，確保從屏幕到印刷的色彩一致性。我們提供免費打樣服務，讓您在批量印刷前確認顏色效果。</p>

<p>想了解更多印刷知識？<a href="https://wa.me/8618126380255" target="_blank">聯繫智印港</a>獲取專業建議。</p>`,
    },
    'paper-materials': {
      title: '印刷紙材選擇指南：從銅版紙到特種紙',
      description: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。智印港300+種紙材任您選擇。',
      date: '2024-03-20', category: '印刷工藝',
      content: `<p>紙張是印刷品的靈魂。不同的紙材不僅影響視覺效果，更決定了觸感和品質印象。本文將為您詳細介紹常見印刷紙材及其適用場景。</p>

<h3>銅版紙（Art Paper）</h3>
<p>最常用的高檔印刷紙，表面光滑，色彩還原度高。適合畫冊、海報、宣傳單等需要鮮豔色彩的產品。</p>

<h3>道林紙（Woodfree Paper）</h3>
<p>表面略帶紋理，給人自然質樸的感覺。適合書籍、筆記本、信紙等閱讀類產品。</p>

<h3>牛皮紙（Kraft Paper）</h3>
<p>環保、復古風格，強度高。常用於<a href="/zh-hk/product/kraft-paper-bags/">牛皮紙袋</a>、包裝盒、吊牌等。</p>

<h3>特種紙（Specialty Paper）</h3>
<p>包括珠光紙、萊妮紋紙、剛古紙等，具有獨特視覺和觸感效果。適合高端邀請卡、名片、年報等。</p>

<h3>紙材選擇對照表</h3>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">產品類型</th><th class="border p-2 text-left">推薦紙材</th><th class="border p-2 text-left">克重</th></tr></thead><tbody>
<tr><td class="border p-2">名片</td><td class="border p-2">300g銅版紙 / 特种纸</td><td class="border p-2">300-400g</td></tr>
<tr><td class="border p-2">宣傳單</td><td class="border p-2">157g銅版紙</td><td class="border p-2">128-200g</td></tr>
<tr><td class="border p-2">畫冊</td><td class="border p-2">200g銅版紙封面 + 157g內頁</td><td class="border p-2">157-250g</td></tr>
<tr><td class="border p-2">包裝盒</td><td class="border p-2">白卡紙 / 牛皮紙</td><td class="border p-2">250-400g</td></tr>
</tbody></table>

<p>智印港提供超過300種紙材選擇，專業顧問為您推薦最適合的方案。立即<a href="https://wa.me/8618126380255" target="_blank">聯繫我們</a>獲取紙材樣本！</p>`,
    },
    'eco-printing': {
      title: '環保印刷：企業ESG與可持續包裝的未來',
      description: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。智印港助您實現綠色印刷目標。',
      date: '2024-03-15', category: '行業趨勢',
      content: `<p>可持續發展已經成為全球趨勢。越來越多的企業將 ESG（環境、社會、治理）納入核心戰略，而環保印刷正是其中的重要一環。</p>

<h3>什麼是環保印刷？</h3>
<p>環保印刷是指在整个印刷過程中盡量減少對環境的負面影響，包括：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>使用再生紙或FSC認證紙張</li>
<li>採用大豆油墨等環保油墨</li>
<li>減少化學藥劑使用</li>
<li>優化生產流程降低能耗</li>
</ul>

<h3>環保材質推薦</h3>
<p>智印港提供多種環保印刷選項：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/zh-hk/product/eco-paper-bags/">環保紙袋</a>：使用再生牛皮紙，可完全降解</li>
<li><a href="/zh-hk/product/eco-business-cards/">環保名片</a>：再生紙+大豆油墨</li>
<li><a href="/zh-hk/product/eco-flyers/">環保傳單</a>：FSC認證紙張</li>
</ul>

<h3>環保印刷的商業價值</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>品牌形象提升</strong>：消費者更願意支持環保品牌</li>
<li><strong>合規要求</strong>：滿足越來越嚴格的環保法規</li>
<li><strong>成本優化</strong>：減少材料浪費，長期降低印刷成本</li>
</ol>

<p>想為您的品牌加入環保元素？<a href="https://wa.me/8618126380255" target="_blank">聯繫智印港</a>獲取綠色印刷方案。</p>`,
    },
  },
  en: {
    'sticker-guide': {
      title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications',
      description: 'Deep dive into sticker material choices, surface treatments, and application scenarios.',
      date: '2024-04-15', category: 'Sticker Guide',
      content: `<p>Stickers are essential elements in brand promotion and product packaging. This guide covers everything you need to know about sticker printing in Hong Kong.</p><h3>Material Comparison</h3><p>Choose from art paper, waterproof synthetic, transparent PET, and holographic options. Each material serves different purposes and environments.</p><h3>Surface Finishes</h3><p>Glossy, matte, foil stamping, and spot UV each create unique visual effects. Select based on your brand positioning.</p><p>Order your <a href="/en/product/waterproof-stickers/">waterproof stickers</a> or <a href="/en/product/transparent-stickers/">transparent stickers</a> today!</p>`,
    },
    'business-card-design': {
      title: '10 Golden Rules for Business Card Design',
      description: 'Master the core techniques of business card design.',
      date: '2024-04-10', category: 'Card Guide',
      content: `<p>Business cards create the first impression in commercial interactions. Here are 10 golden rules from ZprintPro design experts.</p><h3>Rule 1: White Space is Essential</h3><p>Don't overcrowd your card. Leave adequate breathing room for key information.</p><p>Order <a href="/en/product/premium-business-cards/">premium business cards</a> with professional design support.</p>`,
    },
    'packaging-trends': {
      title: '2024 Packaging Design Trends Analysis',
      description: 'Explore latest packaging design trends.',
      date: '2024-04-05', category: 'Packaging Guide',
      content: `<p>Packaging design is undergoing a revolution. Discover the top trends for 2024.</p><h3>Trend 1: Minimalism Continues</h3><p>Clean, simple designs with ample white space dominate the market.</p><p>Get your <a href="/en/product/gift-boxes/">custom gift boxes</a> today!</p>`,
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB: Complete Guide to Print Color Modes',
      description: 'Understand color modes for optimal print results.',
      date: '2024-03-28', category: 'Printing Techniques',
      content: `<p>Color management is key to print quality. Learn the difference between RGB and CMYK.</p><h3>Why Convert to CMYK?</h3><p>Printers use CMYK inks. RGB colors must be converted, which can cause shifts in bright colors.</p>`,
    },
    'paper-materials': {
      title: 'Paper Selection Guide: From Art Paper to Specialty Stock',
      description: 'Analysis of different paper characteristics.',
      date: '2024-03-20', category: 'Printing Techniques',
      content: `<p>Paper is the soul of printed materials. Explore 300+ paper options at ZprintPro.</p><h3>Art Paper</h3><p>Smooth surface, high color reproduction. Ideal for catalogs and posters.</p>`,
    },
    'eco-printing': {
      title: 'Eco-Friendly Printing: The Future of Sustainable Packaging',
      description: 'Learn about eco-friendly printing materials.',
      date: '2024-03-15', category: 'Industry Trends',
      content: `<p>Sustainability has become a global trend. Discover eco-friendly printing options.</p><h3>Eco Materials</h3><p>Recycled paper, soy-based inks, and biodegradable options available.</p>`,
    },
  },
  ja: {
    'sticker-guide': {
      title: 'ステッカー印刷完全ガイド：材質、加工と応用場面',
      description: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。',
      date: '2024-04-15', category: 'ステッカー知識',
      content: `<p>ステッカーはブランド宣伝に欠かせない要素です。材質、加工、応用場面を詳しく解説します。</p><h3>材質比較</h3><p>アート紙、防水合成紙、透明PET、ホログラムなど、目的に応じて選択しましょう。</p><p><a href="/ja/product/waterproof-stickers/">防水ステッカー</a>を今すぐ注文！</p>`,
    },
    'business-card-design': {
      title: '名刺デザインの10の黄金法則',
      description: 'レイアウトから配色まで、名刺デザインの核心技術をマスターしましょう。',
      date: '2024-04-10', category: '名刺知識',
      content: `<p>名刺はビジネスでの第一印象を作ります。ZprintProデザイン専門家の10の黄金法則をご紹介。</p><p><a href="/ja/product/premium-business-cards/">高級名刺</a>を注文する</p>`,
    },
    'packaging-trends': {
      title: '2024年パッケージデザイントレンド解析',
      description: '最新のパッケージデザイントレンドを探ります。',
      date: '2024-04-05', category: '包装知識',
      content: `<p>パッケージデザインに革命が起きています。2024年のトップトレンドを発見。</p><p><a href="/ja/product/gift-boxes/">ギフトボックス</a>をカスタマイズ</p>`,
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷カラーモード完全解説',
      description: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。',
      date: '2024-03-28', category: '印刷技術',
      content: `<p>カラーマネージメントは印刷品質の鍵です。RGBとCMYKの違いを学びましょう。</p>`,
    },
    'paper-materials': {
      title: '印刷用紙選択ガイド：アート紙から特殊紙まで',
      description: '異なる紙の特性を分析し、最適な用紙を選びましょう。',
      date: '2024-03-20', category: '印刷技術',
      content: `<p>紙は印刷物の魂です。ZprintProで300種類以上の用紙からお選びいただけます。</p>`,
    },
    'eco-printing': {
      title: 'エコ印刷：持続可能な包装の未来',
      description: '地球とブランドの両方のために、エコ印刷について学びましょう。',
      date: '2024-03-15', category: '業界トレンド',
      content: `<p>持続可能性は世界的なトレンドになっています。エコ印刷オプションをご紹介。</p>`,
    },
  },
};

const articleSlugs = ['sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing'];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  ['zh-hk', 'en', 'ja'].forEach((locale) => {
    articleSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const post = posts[locale]?.[params.slug];
  return {
    title: post?.title || 'Blog Post',
    description: post?.description || '',
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}blog/${params.slug}/`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = params.locale as Locale;
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;
  const post = posts[locale]?.[params.slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-[#333333]">Post not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`${localePrefix}/blog/`} className="text-[#2873F5] hover:underline text-sm mb-6 inline-block">
          ← Back to Blog
        </Link>
        <article className="bg-white rounded-xl border border-gray-100 p-8">
          <span className="text-xs font-medium text-[#F87314] bg-orange-50 px-2 py-1 rounded">{post.category}</span>
          <h1 className="mt-3 text-2xl md:text-3xl font-bold text-[#333333]">{post.title}</h1>
          <p className="mt-2 text-sm text-gray-400">{post.date}</p>
          <div
            className="mt-6 prose prose-blue max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}
