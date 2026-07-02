import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, siteConfig, generateFaqJsonLd } from '@/lib/seo';
import {
  generateBlogArticleJsonLd,
  generateSpeakableJsonLd,
  standardSpeakableSelectors,
} from '@/lib/seo/schema-extensions';
import { JsonLd } from '@/components/JsonLd';
import { getBuyingGuideBySlug, getAllBuyingGuideSlugs } from '@/data/buying-guides';
import { getClusterBySlug, getAllClusterSlugs } from '@/data/pillar-content';
import { getBlogCover } from '@/data/blog-posts';
import { products, getProductTitle, getProductDescription, getProductBySlug } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

const translations = {
  'zh-hk': {
    backToBlog: '← 返回印刷知識',
    hotProducts: '熱門產品',
    viewMore: '查詢更多',
    authorPrefix: '作者：',
    author: '智印雲印刷專家',
    published: '發布於',
    relatedProducts: '相關產品推薦',
  },
  'en': {
    backToBlog: '← Back to Blog',
    hotProducts: 'Hot Products',
    viewMore: 'View More',
    authorPrefix: 'By ',
    author: 'ZprintPro Printing Experts',
    published: 'Published',
    relatedProducts: 'Related Products',
  },
  'ja': {
    backToBlog: '← ブログに戻る',
    hotProducts: '人気製品',
    viewMore: '詳細を見る',
    authorPrefix: '執筆：',
    author: 'ZprintPro印刷専門家',
    published: '公開日',
    relatedProducts: '関連製品',
  },
};

// 文章封面图现统一在 src/data/blog-posts.ts (2026-06-25)
// 通过 getBlogCover(slug, locale) 解析

// Legacy posts (existing 10 articles per locale)
const posts: Record<string, Record<string, { title: string; description: string; date: string; category: string; content: string }>> = {
  'zh-hk': {
    'company-intro': {
      title: '智印雲印刷公司簡介：專業設備與一站式印刷服務',
      description: '智印雲擁有海德堡6+1印刷機、HP數碼印刷機、馬天尼膠裝線等先進設備，提供從設計到印刷到後加工的一站式服務，服務香港及大灣區客戶超過15年。',
      date: '2024-06-01', category: '公司新聞',
      content: `<p>智印雲（ZprintPro）是一家專業的綜合性印刷服務企業，深耕香港及大灣區市場超過15年。我們致力於為企業客戶提供從設計、印刷到後加工的一站式解決方案，涵蓋商務印刷、包裝印刷、出版印刷及數碼印刷等多個領域。</p>
<h3>一、企業概況</h3>
<p>智印雲總部位於深圳，毗鄰香港，擁有現代化標準廠房逾8,000平方米。公司配備了國際領先的印刷及後加工設備，年產能達到數億印張。我們的客戶遍及金融、地產、零售、教育、醫療等多個行業，為眾多知名企業提供長期穩定的印刷服務。</p>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
  <div class="bg-gray-50 rounded-xl p-4 text-center">
    <p class="text-2xl font-bold text-[#F87314]">8,000+</p>
    <p class="text-sm text-gray-500 mt-1">平方米廠房面積</p>
  </div>
  <div class="bg-gray-50 rounded-xl p-4 text-center">
    <p class="text-2xl font-bold text-[#F87314]">200+</p>
    <p class="text-sm text-gray-500 mt-1">專業員工</p>
  </div>
  <div class="bg-gray-50 rounded-xl p-4 text-center">
    <p class="text-2xl font-bold text-[#F87314]">50+</p>
    <p class="text-sm text-gray-500 mt-1">台先進設備</p>
  </div>
  <div class="bg-gray-50 rounded-xl p-4 text-center">
    <p class="text-2xl font-bold text-[#F87314]">15+</p>
    <p class="text-sm text-gray-500 mt-1">年行業經驗</p>
  </div>
</div>
<h3>二、核心印刷設備</h3>
<p>工欲善其事，必先利其器。智印雲始終堅持以最先進的設備保障出品質量，主要印刷設備包括：</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-heidelberg-6plus1.jpg" alt="海德堡全新6+1印刷機" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">海德堡全新6+1印刷機</p>
      <p class="text-xs text-gray-500 mt-1">高精度色彩還原，適合高端商務印刷</p>
    </div>
  </div>
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-hp-digital.png" alt="HP數碼印刷機" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">HP數碼印刷機</p>
      <p class="text-xs text-gray-500 mt-1">支持可變數據印刷，短版快印首選</p>
    </div>
  </div>
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-weigang-uv.jpg" alt="煒岡6色UV輪轉機" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">煒岡6色UV輪轉機</p>
      <p class="text-xs text-gray-500 mt-1">UV固化技術，即印即乾，效率極高</p>
    </div>
  </div>
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-color-chart.jpg" alt="印刷機長色卡校對" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">專業色彩管理</p>
      <p class="text-xs text-gray-500 mt-1">機長級色彩校對，確保批次一致性</p>
    </div>
  </div>
</div>
<h3>三、後加工設備</h3>
<p>除了強大的印刷能力，智印雲還配備了完善的後加工生產線，滿足客戶多樣化的工藝需求：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>馬天尼膠裝線</strong>：全自動膠裝，適合書刊、畫冊的大量生產</li>
<li><strong>海德堡折頁機群</strong>：多台聯動，支持多種折頁方式</li>
<li><strong>全自動糊盒機</strong>：高效完成包裝盒的糊盒工序</li>
<li><strong>模切、燙金、UV</strong>：多種表面處理工藝一站式完成</li>
</ul>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-martini-1.jpg" alt="馬天尼膠裝車間" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">馬天尼膠裝車間</p>
    </div>
  </div>
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-heidelberg-folding.jpg" alt="海德堡折頁機群" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">海德堡折頁機群</p>
    </div>
  </div>
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-gluing.jpg" alt="糊盒機車間" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">全自動糊盒機車間</p>
    </div>
  </div>
  <div class="rounded-xl overflow-hidden border border-gray-100">
    <img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-manual.jpg" alt="手工工藝車間" class="w-full aspect-[4/3] object-cover"/>
    <div class="p-3">
      <p class="font-semibold text-sm text-[#333333]">手工精裝工藝車間</p>
    </div>
  </div>
</div>
<h3>四、品質與服務承諾</h3>
<p>智印雲始終堅持「品質第一、客戶至上」的經營理念：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>全線採用環保油墨及紙張，通過ISO9001質量管理體系認證</li>
<li>專業跟單團隊一對一服務，從報價到交貨全程跟進</li>
<li>香港地區滿HK$500免運費，支持送貨上門</li>
<li>急件支持24小時內交貨，滿足緊急商務需求</li>
</ul>
<h3>五、聯繫我們</h3>
<p>無論您是需要名片、傳單、畫冊，還是禮品盒、紙袋、標籤貼紙，智印雲都能為您提供專業的印刷解決方案。歡迎蒞臨參觀我們的工廠，或通過以下方式聯繫：</p>
<div class="bg-gray-50 rounded-xl p-5 my-4 space-y-2">
<p><strong>WhatsApp：</strong><a href="https://wa.me/8618126380255" target="_blank">+86 181 2638 0255</a>（唐先生）</p>
<p><strong>服務時間：</strong>週一至週六 09:00 - 21:00（香港時間同步）</p>
<p><strong>工廠地址：</strong>深圳市龍崗區平湖街道（毗鄰香港，物流便捷）</p>
</div>`,
    },
    'sticker-guide': {
      title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解',
      description: '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。智印雲專家為您詳解防水貼紙、透明貼紙、燙金貼紙等熱門選項。',
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
<h3>四、智印雲貼紙印刷服務</h3>
<p>智印雲提供全面的<a href="/product/waterproof-stickers/">防水貼紙印刷</a>服務，採用高品質合成紙材質，具有出色的防水防油性能，非常適合食品包裝、化妝品標籤等場景。我們的<a href="/product/transparent-stickers/">透明貼紙</a>採用PET材質，貼合後呈現無感效果，完美展現產品本身。</p>
<p>對於追求獨特效果的客戶，我們的<a href="/product/die-cut-stickers/">異形模切貼紙</a>可以製作出任意形狀，讓您的品牌設計不受限制。而<a href="/product/foil-stickers/">燙金貼紙</a>則能為產品增添奢華質感，特別適合高端禮品和限量版產品。</p>
<h3>五、常見問題</h3>
<div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3">
<p><strong>Q: 貼紙印刷的最小訂購量是多少？</strong><br/>A: 一般為100張起訂，部分特殊工藝需500張起。</p>
<p><strong>Q: 防水貼紙真的可以泡水嗎？</strong><br/>A: 是的，我們的防水貼紙採用合成紙+防水膠水，可承受短時間浸泡。</p>
<p><strong>Q: 貼紙的交貨時間多久？</strong><br/>A: 標準3-5個工作日，急件可安排即日交貨。</p>
</div>
<p>無論您需要哪種貼紙，智印雲都能為您提供專業建議和優質服務。立即<a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯繫我們</a>獲取免費報價！</p>`,
    },
    'business-card-design': {
      title: '名片設計的10個黃金法則：打造令人難忘的專業形象',
      description: '從排版到色彩搭配，掌握名片設計的核心技巧。智印雲設計專家分享10個黃金法則，助您打造令人印象深刻的專業名片。',
      date: '2024-04-10', category: '名片知識',
      content: `<p>名片是商業交往中的第一印象。一張設計精良的名片不僅能傳遞聯繫方式，更能展現品牌專業度和個人品味。以下是智印雲設計團隊總結的10個名片設計黃金法則。</p>
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
<p>智印雲提供多種<a href="/product/premium-business-cards/">高級商務名片</a>材質選擇：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>300g銅版紙：經濟實惠，適合大量派發</li>
<li><a href="/product/thick-business-cards-400g/">400g厚身名片</a>：厚實手感，彰顯尊貴品質</li>
<li><a href="/product/foil-business-cards/">燙金名片</a>：高檔質感，奢華體驗</li>
<li><a href="/product/spot-uv-business-cards/">局部UV名片</a>：立體效果，視覺層次豐富</li>
</ul>
<h3>法則5：信息層級分明</h3>
<p>名片信息應按重要性排列：姓名 > 職位 > 公司名 > 聯繫方式。使用字號大小和粗細來區分層級。</p>
<h3>法則6：雙面設計的妙用</h3>
<p><a href="/product/double-sided-cards/">雙面名片</a>可以將聯繫信息放在正面，品牌宣言或產品服務放在背面，充分利用空間。</p>
<h3>法則7：二維碼的現代化</h3>
<p>在名片上添加個人微信/WhatsApp二維碼，讓對方一掃即可添加聯繫，提升轉化率。</p>
<h3>法則8：圓角的柔和感</h3>
<p><a href="/product/rounded-corner-cards/">圓角名片</a>比直角名片更具設計感和親和力，也能避免邊角磨損。</p>
<h3>法則9：環保理念的體現</h3>
<p>選擇<a href="/product/eco-business-cards/">環保名片</a>使用再生紙或大豆油墨，展現企業社會責任。</p>
<h3>法則10：與印刷廠充分溝通</h3>
<p>設計稿交付印刷前，務必確認出血位、色彩模式（CMYK）、分辨率（300dpi）等技術細節。智印雲提供免費打樣服務，確保成品符合預期。</p>
<h3>立即行動</h3>
<p>準備好升級您的名片了嗎？智印雲提供<a href="/product/same-day-business-cards/">即日名片印刷</a>服務，最快當天即可取貨。立即<a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯繫唐先生</a>獲取設計建議和報價！</p>`,
    },
    'packaging-trends': {
      title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出',
      description: '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質。智印雲為您解析如何讓產品包裝成為品牌最佳代言人。',
      date: '2024-04-05', category: '包裝知識',
      content: `<p>在競爭激烈的零售市場中，包裝盒不僅是產品的保護殼，更是品牌與消費者的第一接觸點。2024年的包裝設計趨勢呈現出哪些新方向？讓我們一起探討。</p>
<h3>趨勢一：極簡主義持續盛行</h3>
<p>少即是多（Less is More）的設計哲學在包裝領域越發明顯。消費者更傾向於選擇簡潔、信息清晰的包裝。大面積留白、單一主色、精煉的產品名稱成為主流。</p>
<h3>趨勢二：可持續包裝成為標配</h3>
<p>環保不再是加分項，而是基本要求。可降解材料、再生紙板、植物基油墨越來越受歡迎。智印雲的<a href="/product/eco-paper-bags/">環保紙袋</a>和可回收包裝盒選項，助您實現ESG目標。</p>
<h3>趨勢三：個性化與定制化</h3>
<p>消費者渴望獨特的產品體驗。小批量、多款式的定制包裝成為新常態。智印雲支持<a href="/product/gift-boxes/">禮品盒定制</a>，最低100個起訂，讓中小企業也能擁有專屬包裝。</p>
<h3>趨勢四：智能包裝的興起</h3>
<p>AR擴增實境、NFC芯片、溫度指示標籤等技術開始融入包裝設計。掃描包裝即可查看產品溯源、使用教程或品牌故事。</p>
<h3>趨勢五：情感化設計</h3>
<p>包裝設計越來越注重情感連結。開箱體驗（Unboxing Experience）成為品牌營銷的重要環節。精心設計的內襯、感謝卡、防偽貼紙都能提升消費者好感度。</p>
<h3>熱門包裝類型推薦</h3>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">包裝類型</th><th class="border p-2 text-left">適用產品</th><th class="border p-2 text-left">特點</th></tr></thead><tbody>
<tr><td class="border p-2"><a href="/product/gift-boxes/">禮品盒</a></td><td class="border p-2">化妝品、首飾、電子產品</td><td class="border p-2">精美外觀，提升品牌檔次</td></tr>
<tr><td class="border p-2"><a href="/product/mailer-boxes/">快遞盒</a></td><td class="border p-2">電商產品</td><td class="border p-2">堅固耐用，運輸安全</td></tr>
<tr><td class="border p-2"><a href="/product/cosmetic-boxes/">化妝品盒</a></td><td class="border p-2">護膚品、彩妝</td><td class="border p-2">時尚設計，品牌加分</td></tr>
<tr><td class="border p-2"><a href="/product/food-boxes/">食品盒</a></td><td class="border p-2">烘焙、零食</td><td class="border p-2">食品級材質，安全衛生</td></tr>
</tbody></table>
<p>想為您的產品打造完美的包裝盒？智印雲提供從設計到印刷的一站式<a href="/product/packaging/">包裝盒定制</a>服務。立即<a href="https://wa.me/8618126380255" target="_blank">聯繫我們</a>獲取免費設計方案！</p>`,
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷色彩模式完全詳解',
      description: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。智印雲印刷專家為您詳解色彩管理。',
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
<h3>智印雲色彩管理服務</h3>
<p>智印雲採用專業色彩管理系統，確保從屏幕到印刷的色彩一致性。我們提供免費打樣服務，讓您在批量印刷前確認顏色效果。</p>
<p>想了解更多印刷知識？<a href="https://wa.me/8618126380255" target="_blank">聯繫智印雲</a>獲取專業建議。</p>`,
    },
    'paper-materials': {
      title: '印刷紙材選擇指南：從銅版紙到特種紙',
      description: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。智印雲300+種紙材任您選擇。',
      date: '2024-03-20', category: '印刷工藝',
      content: `<p>紙張是印刷品的靈魂。不同的紙材不僅影響視覺效果，更決定了觸感和品質印象。本文將為您詳細介紹常見印刷紙材及其適用場景。</p>
<h3>銅版紙（Art Paper）</h3>
<p>最常用的高檔印刷紙，表面光滑，色彩還原度高。適合畫冊、海報、宣傳單等需要鮮豔色彩的產品。</p>
<h3>道林紙（Woodfree Paper）</h3>
<p>表面略帶紋理，給人自然質樸的感覺。適合書籍、筆記本、信紙等閱讀類產品。</p>
<h3>牛皮紙（Kraft Paper）</h3>
<p>環保、復古風格，強度高。常用於<a href="/product/kraft-paper-bags/">牛皮紙袋</a>、包裝盒、吊牌等。</p>
<h3>特種紙（Specialty Paper）</h3>
<p>包括珠光紙、萊妮紋紙、剛古紙等，具有獨特視覺和觸感效果。適合高端邀請卡、名片、年報等。</p>
<h3>紙材選擇對照表</h3>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">產品類型</th><th class="border p-2 text-left">推薦紙材</th><th class="border p-2 text-left">克重</th></tr></thead><tbody>
<tr><td class="border p-2">名片</td><td class="border p-2">300g銅版紙 / 特种纸</td><td class="border p-2">300-400g</td></tr>
<tr><td class="border p-2">宣傳單</td><td class="border p-2">157g銅版紙</td><td class="border p-2">128-200g</td></tr>
<tr><td class="border p-2">畫冊</td><td class="border p-2">200g銅版紙封面 + 157g內頁</td><td class="border p-2">157-250g</td></tr>
<tr><td class="border p-2">包裝盒</td><td class="border p-2">白卡紙 / 牛皮紙</td><td class="border p-2">250-400g</td></tr>
</tbody></table>
<p>智印雲提供超過300種紙材選擇，專業顧問為您推薦最適合的方案。立即<a href="https://wa.me/8618126380255" target="_blank">聯繫我們</a>獲取紙材樣本！</p>`,
    },
    'eco-printing': {
      title: '環保印刷：企業ESG與可持續包裝的未來',
      description: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。智印雲助您實現綠色印刷目標。',
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
<p>智印雲提供多種環保印刷選項：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><a href="/product/eco-paper-bags/">環保紙袋</a>：使用再生牛皮紙，可完全降解</li>
<li><a href="/product/eco-business-cards/">環保名片</a>：再生紙+大豆油墨</li>
<li><a href="/product/eco-flyers/">環保傳單</a>：FSC認證紙張</li>
</ul>
<p>想為您的品牌加入環保元素？<a href="https://wa.me/8618126380255" target="_blank">聯繫智印雲</a>獲取綠色印刷方案。</p>`,
    },
    'hong-kong-printing-guide': {
      title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？',
      description: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價，幫您找到最適合的印刷合作夥伴。',
      date: '2024-05-20', category: '香港本地',
      content: `<p>香港作為國際商業中心，每天都有成千上萬的企業需要各類印刷服務。無論是<a href="/product/premium-business-cards/">名片印刷</a>、<a href="/product/a4-flyers/">宣傳單張</a>，還是<a href="/product/gift-boxes/">包裝盒定制</a>，選擇一家可靠的印刷公司至關重要。本文將為您詳細分析香港各區印刷公司的特點，特別是觀塘這個印刷業重鎮。</p><h3>一、香港各區印刷公司分佈概況</h3><p>香港的印刷業主要集中在以下幾個區域：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>觀塘（Kwun Tong）</strong>：傳統工業區，印刷廠密度最高，價格競爭激烈，適合大批量訂單</li><li><strong>九龍灣（Kowloon Bay）</strong>：新興商業區，結合設計與印刷，適合品牌定制需求</li><li><strong>荃灣（Tsuen Wan）</strong>：新界西的中心，租金較低，性價比高</li><li><strong>上環/中環</strong>：高端商業區，主打精品印刷，價格較高</li></ul><h3>二、如何評估印刷公司的可靠性</h3><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>設備水準</strong>：是否使用海德堡、小森等國際品牌印刷機？這直接影響色彩還原度</li><li><strong>色彩管理</strong>：是否有專業的色彩校準流程？能否提供數碼打樣？</li><li><strong>交貨時間</strong>：標準交貨是3-5天，急件能否做到24小時？</li><li><strong>客戶案例</strong>：是否服務過知名企業？有無實體樣品可以參考？</li><li><strong>售後服務</strong>：印刷出現問題時的處理機制如何？</li></ol><h3>三、觀塘印刷公司的優勢</h3><p>觀塘作為香港傳統的工業重鎮，擁有全港最密集的印刷產業鏈。這裡的印刷公司普遍具有以下優勢：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>價格競爭力</strong>：由於廠家集中，成本控制較好，同品質下價格通常比中環便宜20-30%</li><li><strong>產能充足</strong>：大型印刷廠多，能夠承接萬級以上的大單</li><li><strong>交通便利</strong>：觀塘線直達，從觀塘站步行10分鐘即可到達大多數印刷廠</li><li><strong>配套完善</strong>：設計、印刷、後加工一條龍服務</li></ul><h3>四、智印雲的差異化優勢</h3><p>智印雲位於觀塘成業街，深耕香港印刷市場多年，我們的優勢包括：</p><ul class="list-disc pl-5 my-3 space-y-1"><li>採用德國海德堡印刷設備，確保色彩精準還原</li><li>支持24小時急件印刷，滿足香港快節奏商業需求</li><li>提供免費數碼打樣，大貨印刷前確認效果</li><li>滿HK$500免費送貨，覆蓋全港十八區</li><li>一站式服務：從設計、印刷到配送，全程無憂</li></ul><p>無論您在<a href="/product/premium-business-cards/">名片</a>、<a href="/product/a4-flyers/">傳單</a>、<a href="/product/kraft-paper-bags/">紙袋</a>還是<a href="/product/gift-boxes/">包裝盒</a>有任何印刷需求，歡迎<a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯繫智印雲</a>獲取免費報價和專業建議。</p>`,
    },
    'design-file-specs': {
      title: '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂',
      description: '從出血位設置到色彩模式轉換，這篇指南將幫助設計師和企業避免最常見的印刷文件錯誤，確保印刷成品完美無瑕。',
      date: '2024-05-15', category: '設計技巧',
      content: `<p>很多設計師和企業市場部在準備印刷文件時都會遇到各種問題：成品邊緣出現白邊、圖片模糊不清、顏色與屏幕顯示差異巨大……這些問題大多源於對印刷文件規範的不了解。本文將詳細講解出血位、分辨率和色彩模式這三個核心概念。</p><h3>一、什麼是出血位（Bleed）？</h3><p>出血位是指在設計稿中超出成品裁切線的部分。由於印刷後需要裁切，如果設計剛好到邊緣，任何微小的裁切誤差都會導致露出白邊。因此，我們通常需要在成品尺寸外預留<strong>3mm</strong>的出血位。</p><h4>常見產品的出血位設置</h4><table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">產品</th><th class="border p-2 text-left">成品尺寸</th><th class="border p-2 text-left">設計尺寸（含出血）</th></tr></thead><tbody><tr><td class="border p-2">標準名片</td><td class="border p-2">90 × 54mm</td><td class="border p-2">96 × 60mm</td></tr><tr><td class="border p-2">A4 傳單</td><td class="border p-2">210 × 297mm</td><td class="border p-2">216 × 303mm</td></tr><tr><td class="border p-2">A3 海報</td><td class="border p-2">297 × 420mm</td><td class="border p-2">303 × 426mm</td></tr></tbody></table><h3>二、分辨率：為什麼 300dpi 是標準？</h3><p>分辨率決定了印刷品的清晰度。屏幕上顯示通常只需要72dpi，但印刷需要<strong>至少300dpi</strong>才能保證圖片清晰銳利。</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>72dpi</strong>：僅適用於網頁、社交媒體</li><li><strong>150dpi</strong>：大型海報、遠距離觀看的印刷品可以接受的最低標準</li><li><strong>300dpi</strong>：名片、書刊、宣傳單等近距離觀看印刷品的標準</li></ul><h3>三、CMYK vs RGB</h3><p>屏幕使用 RGB 色彩模式（紅綠藍光疊加），而印刷使用 CMYK 色彩模式（青品黃黑油墨疊加）。RGB 的色域比 CMYK 廣，直接印刷 RGB 文件會導致顏色變暗、鮮豔度下降。</p><h3>四、文件格式建議</h3><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>PDF/X-1a</strong>：最佳選擇，字體嵌入、色彩穩定</li><li><strong>AI（Adobe Illustrator）</strong>：矢量文件，適合 Logo 和圖形</li><li><strong>PSD（Photoshop）</strong>：點陣文件，適合照片類設計</li></ol><p>不確定您的文件是否符合印刷標準？<a href="https://wa.me/8618126380255" target="_blank">聯繫智印雲</a>，我們提供免費文件檢查服務。</p>`,
    },
    'brand-materials-checklist': {
      title: '企業品牌物料清單：從名片到展架的全套印刷方案',
      description: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求，確保品牌形象的一致性。',
      date: '2024-05-10', category: '品牌建設',
      content: `<p>品牌形象的建立需要系統化的物料支持。從一張<a href="/product/premium-business-cards/">名片</a>到一個<a href="/product/gift-boxes/">產品包裝盒</a>，每一個觸點都是品牌與客戶溝通的機會。本文將為您提供一份完整的企業品牌物料清單。</p><h3>一、基礎品牌識別物料</h3><ul class="list-disc pl-5 my-3 space-y-1"><li><a href="/product/premium-business-cards/">名片</a>：員工標配，建議準備雙面設計</li><li><a href="/product/envelopes/">信封</a>：正式商務溝通的必備品</li><li>信紙：合同、報價單等正式文件使用</li><li>文件夾：客戶會議、投標時使用，提升專業形象</li></ul><h3>二、市場推廣物料</h3><ul class="list-disc pl-5 my-3 space-y-1"><li><a href="/product/a4-flyers/">宣傳單張</a>：活動推廣、產品介紹</li><li><a href="/product/folded-leaflets/">摺頁/小冊子</a>：產品目錄、服務介紹</li><li><a href="/product/posters/">海報</a>：店內裝飾、活動宣傳</li><li><a href="/product/roll-up-banners/">易拉架</a>：展會、路演必備</li></ul><h3>三、產品包裝物料</h3><ul class="list-disc pl-5 my-3 space-y-1"><li><a href="/product/kraft-paper-bags/">紙袋</a>：零售購物袋，環保且有質感</li><li><a href="/product/gift-boxes/">禮品盒</a>：高端產品包裝，提升品牌檔次</li><li><a href="/product/mailer-boxes/">快遞盒</a>：電商發貨用</li></ul><h3>四、品牌物料規劃建議</h3><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>統一設計語言</strong>：所有物料使用相同的色彩、字體和圖形元素</li><li><strong>分階段製作</strong>：初創企業先完成基礎物料，再逐步擴展</li><li><strong>選擇可靠供應商</strong>：與一家能夠提供全套服務的印刷公司合作，確保品質一致性</li></ol><p>智印雲提供一站式品牌物料印刷服務。<a href="https://wa.me/8618126380255" target="_blank">立即聯繫我們</a>獲取專屬品牌物料方案。</p>`,
    },
    'mtr-advertising-specs': {
      title: '港鐵廣告印刷規格全解析：港島線、觀塘線、荃灣線投放指南',
      description: '詳細解析港鐵各線路廣告位的印刷規格、尺寸要求和投放策略，助您在香港最繁忙的交通網絡中精準觸達目標客戶。',
      date: '2024-05-05', category: '香港本地',
      content: `<p>香港港鐵（MTR）每天服務超過500萬人次，是香港最繁忙的公共交通系統。對於希望在<a href="/product/posters/">海報</a>和展示物料上投放廣告的企業來說，港鐵廣告無疑是極具性價比的選擇。</p><h3>一、港鐵廣告的主要形式</h3><h4>站內廣告</h4><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>月台燈箱（12-sheet / 48-sheet）</strong>：最常見的形式，位於月台牆面</li><li><strong>車站大堂燈箱</strong>：位於付費區大堂，人流量大</li><li><strong>月台門貼（Platform Screen Door）</strong>：新型廣告位，視覺衝擊力極強</li><li><strong>立柱包裝（Pillar Wrap）</strong>：將車站立柱包裹成廣告位</li></ul><h4>車廂廣告</h4><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>車廂內海報</strong>：車門上方和車廂連接處的標準海報位</li><li><strong>全車身廣告（Train Wrap）</strong>：整列車的外觀廣告，曝光率最高</li></ul><h3>二、主要廣告位印刷規格</h3><table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">廣告類型</th><th class="border p-2 text-left">尺寸（寬×高）</th><th class="border p-2 text-left">解析度要求</th></tr></thead><tbody><tr><td class="border p-2">12-sheet 燈箱</td><td class="border p-2">3000 × 1500mm</td><td class="border p-2">100dpi @ 實際尺寸</td></tr><tr><td class="border p-2">48-sheet 燈箱</td><td class="border p-2">6096 × 3048mm</td><td class="border p-2">72-100dpi</td></tr><tr><td class="border p-2">車廂內海報</td><td class="border p-2">1189 × 841mm (A0)</td><td class="border p-2">150dpi</td></tr></tbody></table><h3>三、各線路投放策略建議</h3><h4>港島線（Island Line）</h4><p>途經中環、金鐘、灣仔、銅鑼灣等核心商業區，受眾以白領、金融人士和遊客為主。</p><h4>觀塘線（Kwun Tong Line）</h4><p>連接觀塘、九龍灣等工業和商業混合區，以及旺角、油麻地等人流密集區。</p><h4>荃灣線（Tsuen Wan Line）</h4><p>貫穿新界和九龍，覆蓋住宅區和商業區。適合投放家庭消費品、教育和房地產廣告。</p><h3>四、印刷注意事項</h3><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>色彩模式</strong>：必須使用 CMYK，RGB 文件會被拒收</li><li><strong>字體嵌入</strong>：PDF 文件必須嵌入所有字體</li><li><strong>材質</strong>：燈箱廣告使用背噴燈片（Backlit Film），車廂海報使用 PP 合成紙</li></ol><p>智印雲提供港鐵廣告物料的專業印刷服務。<a href="https://wa.me/8618126380255" target="_blank">聯繫我們</a>獲取報價。</p>`,
    },
    'flyer-printing-guide': {
      title: '香港傳單印刷完全指南：A4/A5 尺寸、紙質選擇與派發策略',
      description: '從 A4、A5 傳單尺寸到銅版紙、書紙材質，從設計要點到派發渠道，智印雲為您拆解香港傳單印刷的每個關鍵環節，助您用最低成本觸達最多客戶。',
      date: '2026-07-02', category: '印刷工藝',
      content: `<p>傳單（Flyer）是香港中小企業最常用的營銷工具之一。相比數碼廣告，<a href="/product/a4-flyers/">印刷傳單</a>具有成本可控、觸達精準、無需依賴演算法等優勢。本文將為您系統拆解香港傳單印刷的尺寸選擇、紙質對比、設計要點與派發策略。</p><h3>一、傳單尺寸怎麼選？</h3><p>香港最常見的傳單尺寸是 A4（210 × 297mm）和 A5（148 × 210mm），選擇時主要考慮以下因素：</p><table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">尺寸</th><th class="border p-2 text-left">適合場景</th><th class="border p-2 text-left">單張成本</th></tr></thead><tbody><tr><td class="border p-2">A4 單面</td><td class="border p-2">活動推廣、新品發佈</td><td class="border p-2">HK$0.15-0.30</td></tr><tr><td class="border p-2">A4 雙面</td><td class="border p-2">菜單、產品目錄、服務介紹</td><td class="border p-2">HK$0.25-0.50</td></tr><tr><td class="border p-2">A5 單面</td><td class="border p-2">折扣券、優惠券、街派</td><td class="border p-2">HK$0.08-0.18</td></tr><tr><td class="border p-2">A5 雙面</td><td class="border p-2">小型目錄、活動邀請</td><td class="border p-2">HK$0.15-0.30</td></tr><tr><td class="border p-2">三摺 DL</td><td class="border p-2">高階服務介紹、B2B</td><td class="border p-2">HK$0.30-0.60</td></tr></tbody></table><h3>二、紙質選擇全攻略</h3><p>傳單最常用的紙張是銅版紙（Art Paper）和書紙（Woodfree Paper）：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>128g 銅版紙</strong>：最經濟實惠，街派首選</li><li><strong>157g 銅版紙</strong>：色彩還原度好，標準選擇</li><li><strong>200g 銅版紙</strong>：高檔感，雙面印刷不易透</li><li><strong>80g 書紙</strong>：環保紙張，適合文字密集型傳單</li><li><strong>100g 書紙</strong>：略厚書紙，更顯品質</li></ul><h3>三、表面處理工藝</h3><p>智印雲為您提供多種表面處理工藝選擇：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>光膠（Glossy Lamination）</strong>：表面光亮，色彩更鮮豔，適合產品推廣</li><li><strong>啞膠（Matte Lamination）</strong>：質感柔和，適合高檔品牌、餐廳菜單</li><li><strong>UV 局部上光</strong>：突出 logo 或圖片，視覺衝擊力強</li><li><strong>燙金 / 燙銀</strong>：高階品牌傳單首選</li></ul><h3>四、派發策略與 ROI 提升</h3><p>傳單印好之後，如何派發才能達到最佳效果？</p><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>目標人群定向</strong>：根據您的客戶畫像選擇派發地點（地鐵站、商場、社區）</li><li><strong>結合 QR Code</strong>：在傳單上加 WhatsApp / IG QR Code，將線下流量導入線上</li><li><strong>配合限時優惠</strong>：傳單上印「限 7 天」「憑傳單 9 折」等限定話術</li><li><strong>後續追蹤</strong>：每張傳單加獨立優惠碼，統計哪個渠道轉化最好</li></ol><p>智印雲提供從<a href="/product/a4-flyers/">A4 傳單</a>、<a href="/product/a5-flyers/">A5 傳單</a>到<a href="/product/folded-leaflets/">摺頁傳單</a>的全系列印刷服務，最快 24 小時交貨。<a href="https://wa.me/8618126380255" target="_blank">立即 WhatsApp 查詢報價</a>。</p><h3>五、常見問題 FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q: 傳單印刷的最小起訂量是多少？</strong><br/>A: 一般 100 張起訂，部分特殊工藝需 500 張起。</p><p><strong>Q: 急件最快幾耐可以交貨？</strong><br/>A: 標準件 3-5 個工作日，急件支援 24 小時內交貨。</p><p><strong>Q: 銅版紙同書紙有咩分別？</strong><br/>A: 銅版紙表面有塗層，色彩鮮豔適合圖片；書紙無塗層，質感柔和適合文字。</p><p><strong>Q: 傳單設計檔案有咩要求？</strong><br/>A: 需提供 300dpi 以上 CMYK 印刷格式（PDF/AI），出血位 3mm。</p></div>`,
    },
    'food-packaging-printing-guide': {
      title: '食品包裝印刷完全指南：材質、安全認證與設計實務',
      description: '食品級包裝印刷點樣揀？從牛皮紙盒到食品級淋膜，食品安全認證到設計實務，智印雲為您拆解食品包裝印刷的每個關鍵環節。',
      date: '2026-07-02', category: '包裝知識',
      content: `<p>食品包裝印刷是<a href="/category/packaging/">包裝盒</a>印刷中要求最嚴格的細分領域。除了視覺設計，更涉及食品安全、防油防水、材質合規等多個維度。本文將系統拆解食品包裝印刷的材質選擇、安全認證與設計實務。</p><h3>一、食品包裝常用材質</h3><p>不同食品類型對包裝材質有不同要求：</p><table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">食品類型</th><th class="border p-2 text-left">推薦材質</th><th class="border p-2 text-left">關鍵特性</th></tr></thead><tbody><tr><td class="border p-2">烘焙糕點</td><td class="border p-2">食品級白卡紙 + 淋膜</td><td class="border p-2">防油、可直接接觸食品</td></tr><tr><td class="border p-2">外賣速食</td><td class="border p-2">牛皮紙 + PE 淋膜</td><td class="border p-2">耐熱、防水、防油</td></tr><tr><td class="border p-2">冷凍食品</td><td class="border p-2">瓦楞紙盒 + 鋁箔內層</td><td class="border p-2">保溫、防潮、抗凍</td></tr><tr><td class="border p-2">糖果零食</td><td class="border p-2">銅版紙 + 食品級油墨</td><td class="border p-2">色彩鮮豔、印刷精美</td></tr><tr><td class="border p-2">飲品杯</td><td class="border p-2">食品級 PE 淋膜紙</td><td class="border p-2">耐熱 90°C、防水</td></tr></tbody></table><h3>二、食品安全認證</h3><p>正規食品包裝印刷必須取得以下認證之一：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>FDA 認證（美國食品藥物管理局）</strong>：出口美國市場必備</li><li><strong>EU 10/2011（歐盟食品接觸材料法規）</strong>：出口歐盟市場必備</li><li><strong>GB 4806.8（中國國家食品安全標準）</strong>：中國市場銷售必備</li><li><strong>LFGB（德國食品、日用品及飼料法）</strong>：出口德國市場必備</li></ul><p>智印雲所有食品包裝均使用通過 FDA / GB 認證的食品級油墨及材質，並可提供認證證書複印件。</p><h3>三、食品包裝的關鍵工藝</h3><h4>淋膜工藝</h4><p>PE 淋膜是食品包裝最常用的防水防油工藝，分單面淋膜和雙面淋膜：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>單面 PE 淋膜</strong>：適用於外層包裝盒、糕點盒</li><li><strong>雙面 PE 淋膜</strong>：適用於冷凍食品、速食盒</li><li><strong>PLA 可降解淋膜</strong>：環保新選擇，符合歐盟 SUP 指令</li></ul><h4>印刷工藝</h4><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>水性油墨印刷</strong>：無溶劑殘留，食品包裝首選</li><li><strong>UV 固化印刷</strong>：色彩飽和度高，但需確認 UV 油墨安全性</li><li><strong>柔版印刷（Flexo）</strong>：大批量食品包裝最經濟的工藝</li></ul><h3>四、食品包裝設計要點</h3><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>強制標示信息</strong>：成分表、營養標示、生產日期、保質期、過敏原、生產商地址必須清晰標示</li><li><strong>條碼與 QR Code</strong>：EAN-13 條碼是商品流通必備；二維碼可用於追溯、防偽、行銷</li><li><strong>視覺層級</strong>：品牌 logo > 產品名稱 > 賣點 > 規格 > 法規信息</li><li><strong>材質環保</strong>：選擇可回收、可降解材質提升品牌形象</li></ol><h3>五、智印雲食品包裝印刷服務</h3><p>智印雲提供從<a href="/product/gift-boxes/">禮品盒</a>、<a href="/product/food-boxes/">食品盒</a>、<a href="/product/kraft-paper-bags/">牛皮紙袋</a>到<a href="/product/waterproof-stickers/">食品標籤</a>的全系列食品包裝印刷服務，所有材質均通過食品安全認證。<a href="https://wa.me/8618126380255" target="_blank">立即 WhatsApp 獲取食品包裝方案及報價</a>。</p><h3>六、常見問題 FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q: 食品包裝可以直接接觸食品嗎？</strong><br/>A: 必須使用食品級材質（PE 淋膜紙、食用級白卡）和食品級油墨，不可使用普通辦公油墨。</p><p><strong>Q: 包裝盒印刷需要哪些認證？</strong><br/>A: 視乎銷售市場：中國 GB 4806.8、美國 FDA、歐盟 EU 10/2011、日本 JFSL 等。</p><p><strong>Q: 食品包裝定製最小起訂量？</strong><br/>A: 一般 500 個起訂，特殊工藝如燙金、UV 局部需 1000 個起。</p><p><strong>Q: 急件食品包裝幾耐交貨？</strong><br/>A: 標準 7-10 個工作日，急件可壓縮至 5 個工作日。</p></div>`,
    },
    'paper-bag-printing-guide': {
      title: '香港紙袋印刷完全指南：材質、尺寸、手挽與設計趨勢',
      description: '從牛皮紙、白卡紙到禮品紙袋，從手挽、提繩到設計工藝，智印雲為您拆解香港紙袋印刷的每個關鍵環節，助您打造高質感品牌包裝。',
      date: '2026-07-02', category: '包裝知識',
      content: `<p>紙袋（Paper Bag）是品牌包裝的重要組成部分。無論是零售購物、禮品包裝，還是活動紀念品，一個高質感的<a href="/product/kraft-paper-bags/">品牌紙袋</a>都能大幅提升客戶體驗和品牌檔次感。本文將為您系統拆解紙袋印刷的材質、尺寸、手挽與設計趨勢。</p><h3>一、紙袋材質怎麼選？</h3><p>紙袋的材質直接決定檔次感和成本：</p><table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">材質</th><th class="border p-2 text-left">特點</th><th class="border p-2 text-left">適合場景</th></tr></thead><tbody><tr><td class="border p-2">白牛皮紙</td><td class="border p-2">純白、挺度高、可染色</td><td class="border p-2">高檔品牌、化妝品、禮品</td></tr><tr><td class="border p-2">黃牛皮紙</td><td class="border p-2">環保、復古、價格實惠</td><td class="border p-2">咖啡店、有機品牌、零售</td></tr><tr><td class="border p-2">白卡紙</td><td class="border p-2">挺度最佳、表面光滑</td><td class="border p-2">奢侈品、珠寶、首飾</td></tr><tr><td class="border p-2">銅版紙</td><td class="border p-2">印刷精美、色彩鮮豔</td><td class="border p-2">促銷活動、節日禮品</td></tr><tr><td class="border p-2">黑卡紙</td><td class="border p-2">神秘高檔、質感獨特</td><td class="border p-2">高端品牌、限定產品</td></tr><tr><td class="border p-2">再生紙</td><td class="border p-2">環保認證、紋理獨特</td><td class="border p-2">環保品牌、有機產品</td></tr></tbody></table><h3>二、紙袋的常見尺寸</h3><p>香港紙袋最常見的尺寸（寬 × 高 × 側）：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>小型：200 × 250 × 80mm</strong>：飾品、文具、小型禮品</li><li><strong>中型：280 × 350 × 100mm</strong>：化妝品、書籍、服飾</li><li><strong>大型：350 × 450 × 120mm</strong>：鞋盒、禮盒、購物</li><li><strong>特大型：450 × 550 × 150mm</strong>：多件商品、節日禮籃</li></ul><h3>三、紙袋手挽材質選擇</h3><p>手挽是紙袋的重要細節，直接影響使用體驗：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>扭繩手挽（Twisted Rope Handle）</strong>：最經典，承重 5-8kg，適合大多數場景</li><li><strong>扁平手挽（Flat Ribbon Handle）</strong>：高檔質感，承重 3-5kg，適合禮品袋</li><li><strong>打孔手挽（Die-cut Handle）</strong>：經濟實惠，承重 2-3kg，適合促銷袋</li><li><strong>絲帶手挽（Satin Ribbon Handle）</strong>：極致高檔，婚禮、限定產品首選</li><li><strong>棉繩手挽（Cotton Rope Handle）</strong>：環保自然，文創、咖啡品牌常見</li></ul><h3>四、紙袋印刷工藝</h3><p>智印雲為您提供多種印刷和表面處理工藝：</p><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>四色印刷（CMYK）</strong>：標準印刷，色彩鮮豔</li><li><strong>專色印刷（Spot Color）</strong>：精準還原品牌色，如 Tiffany Blue</li><li><strong>燙金 / 燙銀</strong>：高檔品牌標識首選</li><li><strong>UV 局部上光</strong>：突出 logo，提升質感</li><li><strong>擊凸 / 壓凹</strong>：立體效果，奢侈品包裝必備</li></ul><h3>五、2026 紙袋設計趨勢</h3><ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>環保材質</strong>：再生紙、FSC 認證紙漿成為主流</li><li><strong>極簡設計</strong>：減少油墨使用面積，大面積留白顯檔次</li><li><strong>多用途設計</strong>：可重複使用的購物袋設計</li><li><strong>個性化手挽</strong>：定制手挽顏色、材質成為差異化點</li><li><strong>互動設計</strong>：QR Code、AR 互動印刷提升體驗</li></ol><p>智印雲提供從<a href="/product/kraft-paper-bags/">牛皮紙袋</a>、<a href="/product/white-card-bags/">白卡紙袋</a>到<a href="/product/gift-bags/">禮品紙袋</a>的全系列紙袋印刷服務。<a href="https://wa.me/8618126380255" target="_blank">立即 WhatsApp 獲取紙袋方案及報價</a>。</p><h3>六、常見問題 FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-1"><p><strong>Q: 紙袋印刷最小起訂量？</strong><br/>A: 一般 500 個起訂，特殊工藝如燙金需 1000 個起。</p><p><strong>Q: 紙袋定製交貨時間？</strong><br/>A: 標準 7-10 個工作日，急件可壓縮至 5 個工作日。</p><p><strong>Q: 紙袋可以承重幾多？</strong><br/>A: 標準牛皮紙袋可承重 5-8kg，加厚紙可達 10-15kg。</p><p><strong>Q: 可以自選手挽顏色嗎？</strong><br/>A: 可以，扭繩手挽提供 20+ 顏色選擇，絲帶手挽可定制任意 Pantone 色。</p></div>`,
    },
  },
  en: {
    'company-intro': { title: 'About ZprintPro: Professional Equipment & One-Stop Printing Services', description: 'ZprintPro features Heidelberg 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing solutions.', date: '2024-06-01', category: 'Company News', content: `<p>ZprintPro is a professional integrated printing service company with over 15 years of experience serving Hong Kong and the Greater Bay Area. We provide one-stop solutions from design to printing to post-processing.</p><h3>Company Overview</h3><p>Our modern factory covers over 8,000 square meters, equipped with international leading printing and post-processing equipment. We serve clients across finance, real estate, retail, education, and healthcare industries.</p><div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6"><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">8,000+</p><p class="text-sm text-gray-500 mt-1">sqm Factory</p></div><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">200+</p><p class="text-sm text-gray-500 mt-1">Staff</p></div><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">50+</p><p class="text-sm text-gray-500 mt-1">Machines</p></div><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">15+</p><p class="text-sm text-gray-500 mt-1">Years</p></div></div><h3>Core Printing Equipment</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-heidelberg-6plus1.jpg" alt="Heidelberg 6+1 Printing Machine" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Heidelberg 6+1 Printing Press</p><p class="text-xs text-gray-500 mt-1">High-precision color reproduction</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-hp-digital.png" alt="HP Digital Printer" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">HP Digital Printer</p><p class="text-xs text-gray-500 mt-1">Variable data printing support</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-weigang-uv.jpg" alt="Weigang 6-Color UV Rotary Press" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Weigang 6-Color UV Rotary</p><p class="text-xs text-gray-500 mt-1">Instant UV curing technology</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-color-chart.jpg" alt="Color Management" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Professional Color Management</p><p class="text-xs text-gray-500 mt-1">Consistent batch quality</p></div></div></div><h3>Post-Processing Equipment</h3><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>Martini Perfect Binding Line</strong>: Automated book binding</li><li><strong>Heidelberg Folding Machines</strong>: Multi-unit folding capacity</li><li><strong>Automatic Carton Gluing</strong>: Efficient packaging production</li><li><strong>Die-cutting, Foil, UV</strong>: Comprehensive finishing</li></ul><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-martini-1.jpg" alt="Martini Binding Workshop" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Martini Perfect Binding Workshop</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-heidelberg-folding.jpg" alt="Heidelberg Folding" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Heidelberg Folding Machines</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-gluing.jpg" alt="Gluing Workshop" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Automatic Carton Gluing</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-manual.jpg" alt="Manual Workshop" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">Handcraft Finishing Workshop</p></div></div></div><h3>Contact Us</h3><div class="bg-gray-50 rounded-xl p-5 my-4 space-y-2"><p><strong>WhatsApp:</strong> <a href="https://wa.me/8618126380255" target="_blank">+86 181 2638 0255</a></p><p><strong>Hours:</strong> Mon-Sat 09:00 - 21:00 (HKT)</p><p><strong>Address:</strong> Pinghu Street, Longgang District, Shenzhen</p></div>` },
    'sticker-guide': { title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', description: 'Deep dive into sticker material choices, surface treatments, and application scenarios.', date: '2024-04-15', category: 'Sticker Guide', content: `<p>Stickers are essential elements in brand promotion and product packaging. This guide covers everything you need to know about sticker printing in Hong Kong.</p><h3>Material Comparison</h3><p>Choose from art paper, waterproof synthetic, transparent PET, and holographic options. Each material serves different purposes and environments.</p><h3>Surface Finishes</h3><p>Glossy, matte, foil stamping, and spot UV each create unique visual effects. Select based on your brand positioning.</p><p>Order your <a href="/en/product/waterproof-stickers/">waterproof stickers</a> or <a href="/en/product/transparent-stickers/">transparent stickers</a> today!</p>` },
    'business-card-design': { title: '10 Golden Rules for Business Card Design', description: 'Master the core techniques of business card design.', date: '2024-04-10', category: 'Card Guide', content: `<p>Business cards create the first impression in commercial interactions. Here are 10 golden rules from ZprintPro design experts.</p><h3>Rule 1: White Space is Essential</h3><p>Don't overcrowd your card. Leave adequate breathing room for key information.</p><p>Order <a href="/en/product/premium-business-cards/">premium business cards</a> with professional design support.</p>` },
    'packaging-trends': { title: '2024 Packaging Design Trends Analysis', description: 'Explore latest packaging design trends.', date: '2024-04-05', category: 'Packaging Guide', content: `<p>Packaging design is undergoing a revolution. Discover the top trends for 2024.</p><h3>Trend 1: Minimalism Continues</h3><p>Clean, simple designs with ample white space dominate the market.</p><p>Get your <a href="/en/product/gift-boxes/">custom gift boxes</a> today!</p>` },
    'cmyk-guide': { title: 'CMYK vs RGB: Complete Guide to Print Color Modes', description: 'Understand color modes for optimal print results.', date: '2024-03-28', category: 'Printing Techniques', content: `<p>Color management is key to print quality. Learn the difference between RGB and CMYK.</p><h3>Why Convert to CMYK?</h3><p>Printers use CMYK inks. RGB colors must be converted, which can cause shifts in bright colors.</p>` },
    'paper-materials': { title: 'Paper Selection Guide: From Art Paper to Specialty Stock', description: 'Analysis of different paper characteristics.', date: '2024-03-20', category: 'Printing Techniques', content: `<p>Paper is the soul of printed materials. Explore 300+ paper options at ZprintPro.</p><h3>Art Paper</h3><p>Smooth surface, high color reproduction. Ideal for catalogs and posters.</p>` },
    'eco-printing': { title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', description: 'Learn about eco-friendly printing materials.', date: '2024-03-15', category: 'Industry Trends', content: `<p>Sustainability has become a global trend. Discover eco-friendly printing options.</p><h3>Eco Materials</h3><p>Recycled paper, soy-based inks, and biodegradable options available.</p>` },
    'hong-kong-printing-guide': { title: 'Hong Kong Printing Company Guide: Kwun Tong, Kowloon & NT', description: 'Compare printing companies across Hong Kong from pricing to quality to find your ideal partner.', date: '2024-05-20', category: 'Hong Kong Local', content: `<p>Hong Kong is a global business hub with thousands of companies needing printing services daily. This guide compares printing companies across Kwun Tong, Kowloon, and the New Territories.</p><h3>Hong Kong Printing Districts</h3><p>Kwun Tong remains the traditional industrial heartland with the highest concentration of printing factories. Kowloon Bay offers design-printing integration, while Tsuen Wan provides cost-effective solutions.</p><p><a href="https://wa.me/8618126380255" target="_blank">Contact ZprintPro</a> for a free quote.</p>` },
    'design-file-specs': { title: 'Print File Design Specifications: Bleed, Resolution & Color Modes', description: 'Master bleed settings, resolution requirements, and color mode conversions for perfect prints.', date: '2024-05-15', category: 'Design Tips', content: `<p>Common print file mistakes include white edges, blurry images, and color shifts. This guide covers bleed, resolution, and color modes.</p><h3>Bleed Settings</h3><p>Always add 3mm bleed beyond the final trim size to avoid white edges after cutting.</p><h3>Resolution Standards</h3><p>300dpi is the standard for business cards and brochures. Large posters can use 150dpi.</p><p><a href="https://wa.me/8618126380255" target="_blank">Contact us</a> for free file checking.</p>` },
    'brand-materials-checklist': { title: 'Corporate Brand Materials Checklist: From Cards to Displays', description: 'A complete checklist of printed brand materials for startups and brand refreshes.', date: '2024-05-10', category: 'Branding', content: `<p>Building a brand requires systematic material support. From <a href="/en/product/premium-business-cards/">business cards</a> to <a href="/en/product/gift-boxes/">packaging</a>, every touchpoint matters.</p><h3>Essential Brand Items</h3><ul class="list-disc pl-5 my-3 space-y-1"><li>Business cards, envelopes, letterheads</li><li>Flyers, brochures, posters, banners</li><li>Packaging: bags, boxes, labels</li></ul><p><a href="https://wa.me/8618126380255" target="_blank">Contact ZprintPro</a> for a custom brand package.</p>` },
    'mtr-advertising-specs': { title: 'MTR Advertising Print Specs: Island, Kwun Tong & Tsuen Wan Lines', description: 'Detailed specifications and strategies for MTR advertising across Hong Kong.', date: '2024-05-05', category: 'Hong Kong Local', content: `<p>Hong Kong's MTR serves over 5 million passengers daily. This guide covers advertising specs and placement strategies.</p><h3>Advertising Formats</h3><ul class="list-disc pl-5 my-3 space-y-1"><li>Platform lightboxes (12-sheet / 48-sheet)</li><li>Concourse displays</li><li>Platform screen door ads</li><li>Train interior posters</li></ul><p><a href="https://wa.me/8618126380255" target="_blank">Contact us</a> for MTR advertising material printing.</p>` },
    'flyer-printing-guide': {
      title: 'Flyer Printing Guide: Sizes, Paper, Design & Distribution in Hong Kong',
      description: 'From A4 to A5, bi-fold to tri-fold, art paper to book paper — a complete guide to flyer printing in Hong Kong.',
      date: '2026-07-02', category: 'Printing Guide',
      content: `<p>Flyers remain one of the most cost-effective marketing tools for Hong Kong SMEs. Choose A4 or A5, art paper or book paper, glossy or matte finish. Add QR codes to bridge offline to online. Use time-limited offers for higher conversion.</p><p>ZprintPro offers <a href="/en/product/a4-flyers/">A4 flyers</a>, <a href="/en/product/a5-flyers/">A5 flyers</a>, and <a href="/en/product/folded-leaflets/">folded leaflets</a> with 24-hour rush delivery. <a href="https://wa.me/8618126380255" target="_blank">WhatsApp us</a> for a quote.</p><h3>FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q: MOQ?</strong><br/>A: 100 standard, 500 for special finishes.</p><p><strong>Q: Rush delivery?</strong><br/>A: 24 hours available.</p><p><strong>Q: Paper choice?</strong><br/>A: Art paper for vivid colors; book paper for soft feel.</p><p><strong>Q: File specs?</strong><br/>A: 300dpi CMYK PDF/AI with 3mm bleed.</p></div>`,
    },
    'food-packaging-printing-guide': {
      title: 'Food Packaging Printing Guide: Materials, Safety & Compliance',
      description: 'Food-grade packaging printing essentials — from kraft boxes to food-safe lamination, certifications to design best practices.',
      date: '2026-07-02', category: 'Packaging Guide',
      content: `<p>Food packaging requires food-safe materials and certifications (FDA, EU 10/2011, GB 4806.8, LFGB) depending on your target market. ZprintPro uses water-based inks and food-grade materials with PE or PLA lamination for moisture/oil resistance.</p><p>Browse <a href="/en/product/gift-boxes/">gift boxes</a>, <a href="/en/product/food-boxes/">food boxes</a>, <a href="/en/product/kraft-paper-bags/">kraft bags</a>, and <a href="/en/product/waterproof-stickers/">food labels</a>. <a href="https://wa.me/8618126380255" target="_blank">WhatsApp us</a> for a quote.</p><h3>FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q: Can packaging touch food directly?</strong><br/>A: Only with food-grade materials and inks.</p><p><strong>Q: Certifications needed?</strong><br/>A: FDA / EU 10/2011 / GB 4806.8 / LFGB / JFSL.</p><p><strong>Q: MOQ?</strong><br/>A: 500 standard; 1,000 for foil/UV finishes.</p><p><strong>Q: Lead time?</strong><br/>A: 7-10 days standard; 5 days rush.</p></div>`,
    },
    'paper-bag-printing-guide': {
      title: 'Paper Bag Printing Guide: Materials, Sizes, Handles & Design Trends',
      description: 'Kraft bags, white card bags, gift bags, eco bags — a complete guide to paper bag printing in Hong Kong.',
      date: '2026-07-02', category: 'Packaging Guide',
      content: `<p>Choose from white kraft, brown kraft, white card, art paper, black card, or recycled paper. Sizes range from 200×250×80mm (small) to 450×550×150mm (extra-large). Handle options include twisted rope, flat ribbon, die-cut, satin ribbon, and cotton rope.</p><p>2026 trends: sustainable materials, minimalist design, multi-use bags, custom handle colors, interactive QR/AR printing.</p><p>Browse <a href="/en/product/kraft-paper-bags/">kraft bags</a>, <a href="/en/product/white-card-bags/">white card bags</a>, and <a href="/en/product/gift-bags/">gift bags</a>. <a href="https://wa.me/8618126380255" target="_blank">WhatsApp us</a> for a quote.</p><h3>FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-1"><p><strong>Q: MOQ?</strong><br/>A: 500 standard; 1,000 for foil finishes.</p><p><strong>Q: Lead time?</strong><br/>A: 7-10 days; 5 days rush.</p><p><strong>Q: Weight capacity?</strong><br/>A: 5-8kg standard; up to 10-15kg reinforced.</p><p><strong>Q: Custom handle colors?</strong><br/>A: Yes — 20+ rope colors; Pantone for satin.</p></div>`,
    },
  },
  ja: {
    'company-intro': { title: 'ZprintPro会社概要：専門設備とワンストップ印刷サービス', description: 'ZprintProはハイデルベルグ6+1印刷機、HPデジタル印刷機、マルティニ製本ラインなどの先進設備を保有し、ワンストップ印刷サービスを提供しています。', date: '2024-06-01', category: '会社ニュース', content: `<p>ZprintProは香港および大湾エリアで15年以上の実績を持つ総合印刷サービス企業です。デザインから印刷、後加工までワンストップでご提供いたします。</p><h3>企業概要</h3><p>深圳に本社を置き、8,000平方メートル以上の現代工場を保有。金融、不動産、小売、教育、医療など幅広い業界のお客様にご利用いただいております。</p><div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-6"><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">8,000+</p><p class="text-sm text-gray-500 mt-1">平方メートル</p></div><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">200+</p><p class="text-sm text-gray-500 mt-1">従業員</p></div><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">50+</p><p class="text-sm text-gray-500 mt-1">設備</p></div><div class="bg-gray-50 rounded-xl p-4 text-center"><p class="text-2xl font-bold text-[#F87314]">15+</p><p class="text-sm text-gray-500 mt-1">年の実績</p></div></div><h3>主要印刷設備</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-heidelberg-6plus1.jpg" alt="ハイデルベルグ6+1印刷機" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">ハイデルベルグ6+1印刷機</p><p class="text-xs text-gray-500 mt-1">高精度カラー再現</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-hp-digital.png" alt="HPデジタル印刷機" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">HPデジタル印刷機</p><p class="text-xs text-gray-500 mt-1">可変データ印刷対応</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-weigang-uv.jpg" alt="煒岡6色UV輪転機" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">煒岡6色UV輪転機</p><p class="text-xs text-gray-500 mt-1">UV硬化技術</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-color-chart.jpg" alt="カラー管理" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">プロフェッショナルカラー管理</p><p class="text-xs text-gray-500 mt-1">バッチ品質の一貫性</p></div></div></div><h3>後加工設備</h3><ul class="list-disc pl-5 my-3 space-y-1"><li><strong>マルティニ製本ライン</strong>：自動化された無線綴じ</li><li><strong>ハイデルベルグ折り機</strong>：複数台連動</li><li><strong>全自動箱貼り機</strong>：効率的な包装生産</li><li><strong>型抜き、箔押し、UV</strong>：総合的な仕上げ</li></ul><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-martini-1.jpg" alt="マルティニ製本工場" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">マルティニ製本工場</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-heidelberg-folding.jpg" alt="ハイデルベルグ折り機" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">ハイデルベルグ折り機群</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-gluing.jpg" alt="箱貼り工場" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">全自動箱貼り工場</p></div></div><div class="rounded-xl overflow-hidden border border-gray-100"><img loading="lazy" decoding="async" width="400" height="300" src="/images/factory/factory-manual.jpg" alt="手工芸工場" class="w-full aspect-[4/3] object-cover"/><div class="p-3"><p class="font-semibold text-sm text-[#333333]">手作り仕上げ工場</p></div></div></div><h3>お問い合わせ</h3><div class="bg-gray-50 rounded-xl p-5 my-4 space-y-2"><p><strong>WhatsApp:</strong> <a href="https://wa.me/8618126380255" target="_blank">+86 181 2638 0255</a></p><p><strong>営業時間:</strong> 月〜土 09:00 - 21:00（香港時間）</p><p><strong>工場所在地:</strong> 深圳市龍崗区平湖街道</p></div>` },
    'sticker-guide': { title: 'ステッカー印刷完全ガイド：材質、加工と応用場面', description: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。', date: '2024-04-15', category: 'ステッカー知識', content: `<p>ステッカーはブランド宣伝に欠かせない要素です。材質、加工、応用場面を詳しく解説します。</p><h3>材質比較</h3><p>アート紙、防水合成紙、透明PET、ホログラムなど、目的に応じて選択しましょう。</p><p><a href="/ja/product/waterproof-stickers/">防水ステッカー</a>を今すぐ注文！</p>` },
    'business-card-design': { title: '名刺デザインの10の黄金法則', description: 'レイアウトから配色まで、名刺デザインの核心技術をマスターしましょう。', date: '2024-04-10', category: '名刺知識', content: `<p>名刺はビジネスでの第一印象を作ります。ZprintProデザイン専門家の10の黄金法則をご紹介。</p><p><a href="/ja/product/premium-business-cards/">高級名刺</a>を注文する</p>` },
    'packaging-trends': { title: '2024年パッケージデザイントレンド解析', description: '最新のパッケージデザイントレンドを探ります。', date: '2024-04-05', category: '包装知識', content: `<p>パッケージデザインに革命が起きています。2024年のトップトレンドを発見。</p><p><a href="/ja/product/gift-boxes/">ギフトボックス</a>をカスタマイズ</p>` },
    'cmyk-guide': { title: 'CMYK vs RGB：印刷カラーモード完全解説', description: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。', date: '2024-03-28', category: '印刷技術', content: `<p>カラーマネージメントは印刷品質の鍵です。RGBとCMYKの違いを学びましょう。</p>` },
    'paper-materials': { title: '印刷用紙選択ガイド：アート紙から特殊紙まで', description: '異なる紙の特性を分析し、最適な用紙を選びましょう。', date: '2024-03-20', category: '印刷技術', content: `<p>紙は印刷物の魂です。ZprintProで300種類以上の用紙からお選びいただけます。</p>` },
    'eco-printing': { title: 'エコ印刷：持続可能な包装の未来', description: '地球とブランドの両方のために、エコ印刷について学びましょう。', date: '2024-03-15', category: '業界トレンド', content: `<p>持続可能性は世界的なトレンドになっています。エコ印刷オプションをご紹介。</p>` },
    'hong-kong-printing-guide': { title: '香港印刷会社選び完全ガイド', description: '香港の観塘、九龍、新界の印刷会社を比較し、最適なパートナーを選びましょう。', date: '2024-05-20', category: '香港ローカル', content: `<p>香港には数多くの印刷会社がありますが、信頼できるパートナーを見つけるのは容易ではありません。</p>` },
    'design-file-specs': { title: '印刷用デザインファイル仕様', description: '裁ち落とし、解像度、カラーモードについて学びましょう。', date: '2024-05-15', category: 'デザインチップ', content: `<p>印刷用ファイルを正しく作成することは、高品質な印刷を確保するために不可欠です。</p>` },
    'brand-materials-checklist': { title: '企業ブランド物料チェックリスト', description: '名刺から展示物まで、ブランド構築に必要な印刷物料を確認しましょう。', date: '2024-05-10', category: 'ブランディング', content: `<p>一貫性のあるブランド物料は、企業のプロフェッショナリズムを示します。</p>` },
    'mtr-advertising-specs': { title: 'MTR広告印刷仕様', description: '港島線、観塘線、荃湾線の広告印刷規格について解説します。', date: '2024-05-05', category: '香港ローカル', content: `<p>香港のMTRは毎日数百万人の乗客を運んでおり、効果的な広告媒体です。</p>` },
    'flyer-printing-guide': {
      title: '香港チラシ印刷完全ガイド',
      description: 'A4、A5、二つ折り、三つ折りチラシの完全ガイド。', date: '2026-07-02', category: '印刷知識',
      content: `<p>チラシは香港の中小企業にとって最も費用対効果の高いマーケティングツールの一つです。A4またはA5、コート紙または書籍用紙、光沢またはマット仕上げなど、ニーズに合わせてお選びいただけます。</p><p><a href="/ja/product/a4-flyers/">A4チラシ</a>、<a href="/ja/product/a5-flyers/">A5チラシ</a>、<a href="/ja/product/folded-leaflets/">折り畳みリーフレット</a>を24時間特急でお届けします。<a href="https://wa.me/8618126380255" target="_blank">WhatsAppで見積もり依頼</a>。</p><h3>FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q: 最小注文数量は？</strong><br/>A: 標準100枚、特殊加工は500枚から。</p><p><strong>Q: 特急配送は？</strong><br/>A: 24時間対応可能。</p><p><strong>Q: 用紙の選び方は？</strong><br/>A: コート紙は鮮やかな色彩、書籍用紙は柔らかな質感。</p><p><strong>Q: ファイル仕様は？</strong><br/>A: 300dpi CMYK PDF/AI、塗りたし3mm。</p></div>`,
    },
    'food-packaging-printing-guide': {
      title: '食品パッケージ印刷完全ガイド',
      description: '食品グレード包装印刷の材質、安全性、認証について詳しく解説。', date: '2026-07-02', category: '包装知識',
      content: `<p>食品パッケージ印刷には、食品グレードの材質と認証（FDA、EU 10/2011、GB 4806.8、LFGB）が必要です。智印雲は水性インクと食品グレード素材、PEまたはPLAラミネートを使用しています。</p><p><a href="/ja/product/gift-boxes/">ギフトボックス</a>、<a href="/ja/product/food-boxes/">食品ボックス</a>、<a href="/ja/product/kraft-paper-bags/">クラフト紙袋</a>、<a href="/ja/product/waterproof-stickers/">食品ラベル</a>を取り揃えています。<a href="https://wa.me/8618126380255" target="_blank">WhatsAppで見積もり依頼</a>。</p><h3>FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q: 直接食品に触れても大丈夫？</strong><br/>A: 食品グレード素材とインクのみ使用可能。</p><p><strong>Q: 必要な認証は？</strong><br/>A: FDA / EU 10/2011 / GB 4806.8 / LFGB / JFSLなど。</p><p><strong>Q: 最小注文数量は？</strong><br/>A: 標準500個、箔押し・UV加工は1000個から。</p><p><strong>Q: 納期は？</strong><br/>A: 標準7-10営業日、特急5営業日。</p></div>`,
    },
    'paper-bag-printing-guide': {
      title: '香港紙袋印刷完全ガイド',
      description: 'クラフト紙袋、白カード紙袋、ギフト紙袋の完全ガイド。', date: '2026-07-02', category: '包装知識',
      content: `<p>クラフト紙、白カード紙、アート紙、黒カード紙、再生紙から選択可能。サイズは200×250×80mm（小型）から450×550×150mm（特大）まで。持ち手は紐リボン、フラットリボン、打抜き、サテンリボン、綿ロープからお選びいただけます。</p><p>2026年のトレンド：持続可能な素材、ミニマルデザイン、多用途バッグ、カスタム持ち手色、インタラクティブQR/AR印刷。</p><p><a href="/ja/product/kraft-paper-bags/">クラフト紙袋</a>、<a href="/ja/product/white-card-bags/">白カード紙袋</a>、<a href="/ja/product/gift-bags/">ギフト紙袋</a>を取り揃えています。<a href="https://wa.me/8618126380255" target="_blank">WhatsAppで見積もり依頼</a>。</p><h3>FAQ</h3><div class="bg-gray-50 rounded-lg p-4 my-4 space-y-1"><p><strong>Q: 最小注文数量は？</strong><br/>A: 標準500個、箔押し加工は1000個から。</p><p><strong>Q: 納期は？</strong><br/>A: 標準7-10営業日、特急5営業日。</p><p><strong>Q: 耐荷重は？</strong><br/>A: 標準クラフト紙袋は5-8kg、厚紙強化で10-15kgまで対応。</p><p><strong>Q: 持ち手色はカスタマイズ可能？</strong><br/>A: 20色以上のロープカラーから選択可能、サテンリボンはPantone対応。</p></div>`,
    },
  }
};

const articleSlugs = ['company-intro', 'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist', 'mtr-advertising-specs', 'sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing', 'flyer-printing-guide', 'food-packaging-printing-guide', 'paper-bag-printing-guide'];
const guideSlugs = getAllBuyingGuideSlugs();
const clusterSlugs = getAllClusterSlugs();
const allSlugs = [...articleSlugs, ...guideSlugs, ...clusterSlugs];

function getPostData(locale: Locale, slug: string) {
  const legacyPost = posts[locale]?.[slug];
  if (legacyPost) {
    // Fix hardcoded paths without locale prefix
    let content = legacyPost.content;
    // Replace /product/ with /{locale}/product/
    content = content.replace(/href="\/product\//g, `href="/${locale}/product/`);
    // Replace /en/product/ or /ja/product/ with correct locale
    content = content.replace(/href="\/(en|ja)\/product\//g, `href="/${locale}/product/`);
    // Replace /category/ with /{locale}/category/
    content = content.replace(/href="\/category\//g, `href="/${locale}/category/`);
    content = content.replace(/href="\/(en|ja)\/category\//g, `href="/${locale}/category/`);
    return {
      title: legacyPost.title,
      description: legacyPost.description,
      date: legacyPost.date,
      category: legacyPost.category,
      content,
      keywords: '',
      isBuyingGuide: false,
      linkedProducts: [] as string[],
    };
  }
  const guide = getBuyingGuideBySlug(slug);
  if (guide) {
    return {
      title: guide.title[locale],
      description: guide.description[locale],
      date: guide.date,
      category: guide.category[locale],
      content: guide.content[locale],
      keywords: guide.keywords[locale],
      isBuyingGuide: true,
      linkedProducts: guide.relatedProducts || [],
    };
  }
  const cluster = getClusterBySlug(slug);
  if (cluster) {
    const content = cluster.content[locale].replace(/\/{locale}\//g, `/${locale}/`);
    return {
      title: cluster.title[locale],
      description: cluster.description[locale],
      date: cluster.date,
      category: cluster.pillarSlug,
      content,
      keywords: cluster.keywords[locale].join(','),
      isBuyingGuide: false,
      linkedProducts: cluster.linkedProducts || [],
    };
  }
  return null;
}

function getOgLocale(locale: Locale): string {
  return locale === 'zh-hk' ? 'zh_HK' : locale === 'ja' ? 'ja_JP' : 'en_US';
}

function extractFaqFromHtml(html: string): { question: string; answer: string }[] | null {
  const faqs: { question: string; answer: string }[] = [];
  const regex = /<p><strong>Q:\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)\s*A:\s*([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs.length > 0 ? faqs : null;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  ['zh-hk', 'en', 'ja'].forEach((locale) => {
    allSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const post = getPostData(locale, params.slug);
  const langPrefix = `${locale}/`;
  const canonical = `${siteConfig.url}/${langPrefix}blog/${params.slug}/`;

  return {
    title: post?.title || 'Blog Post',
    description: post?.description || '',
    keywords: post?.keywords,
    openGraph: {
      title: post?.title || 'Blog Post',
      description: post?.description || '',
      url: canonical,
      siteName: siteConfig.name,
      locale: getOgLocale(locale),
      type: 'article',
      publishedTime: post?.date,
      modifiedTime: post?.date,
      section: post?.category,
      authors: [`https://zprintpro.com/${locale}/about/`],
      tags: post?.keywords ? post.keywords.split(',') : undefined,
      images: [
        {
          url: `${siteConfig.url}/images/articles/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: post?.title || 'Blog Post',
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/blog/${params.slug}/`,
        'en': `${siteConfig.url}/en/blog/${params.slug}/`,
        'ja': `${siteConfig.url}/ja/blog/${params.slug}/`,
        'x-default': `${siteConfig.url}/zh-hk/blog/${params.slug}/`,
      },
  }
};
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const post = getPostData(locale, params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-[#333333]">Post not found</h1>
        </div>
      </main>
    );
  }

  const langPrefix = `${locale}/`;
  const canonical = `${siteConfig.url}/${langPrefix}blog/${params.slug}/`;
  const postImage = getBlogCover(params.slug, locale);

  // 2026-06-10 Phase B 修复 P0-3：使用 generateBlogArticleJsonLd（author = Person 类型，E-E-A-T 关键）
  // 旧实现：author = Organization 类型 → AI 抓取时无作者归属，信任度低。
  const articleJsonLd = generateBlogArticleJsonLd(
    {
      title: post.title,
      description: post.description,
      image: `${siteConfig.url}${postImage}`,
      publishedAt: post.date,
      updatedAt: post.date,
      url: canonical,
    },
    locale
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム',
        item: `${siteConfig.url}/${locale}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh-hk' ? '印刷知識' : locale === 'en' ? 'Blog' : 'ブログ',
        item: `${siteConfig.url}/${langPrefix}blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  // 2026-06-10 Phase B 修复 P0-3：Speakable 注入（语音 / AI 抓取）
  const speakableJsonLd = generateSpeakableJsonLd(
    standardSpeakableSelectors.blog.xpath,
    standardSpeakableSelectors.blog.cssSelector
  );

  const faqs = extractFaqFromHtml(post.content);
  const faqJsonLd = faqs ? generateFaqJsonLd(faqs) : null;

  // Hot products for sidebar
  const hotProducts = products
    .filter((p) => p.isHot)
    .sort((a, b) => b.weight_score - a.weight_score)
    .slice(0, 4);

  const linkedProductSlugs = post.linkedProducts?.slice(0, 4) || [];
  const linkedProducts = linkedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={speakableJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`${localePrefix}/blog/`} className="text-[#2873F5] hover:underline text-sm mb-6 inline-block">
          {t.backToBlog}
        </Link>

        <div className="flex gap-8 items-start">
          {/* Left: Article Content */}
          <article className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Hero Image */}
            <div className="aspect-[21/9] relative overflow-hidden bg-gray-100">
              <Image
                src={postImage}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            <div className="p-8">
              <span className="text-xs font-medium text-[#F87314] bg-orange-50 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold text-[#333333]">{post.title}</h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                <span>{t.published} {post.date}</span>
                <span>·</span>
                <span className="text-[#2873F5]">
                  {t.authorPrefix}{t.author}
                </span>
              </div>
              <div
                className="mt-6 prose prose-blue max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* 相關產品推薦 */}
              {linkedProducts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-[#333333] mb-4">{t.relatedProducts}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {linkedProducts.map((product) => (
                      <a
                        key={product.slug}
                        href={`${localePrefix}/product/${product.slug}/`}
                        className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-square bg-white relative overflow-hidden">
                          <img
                            src={getProductMainImage(product, locale)}
                            alt={getProductTitle(product, locale)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-bold text-[#333333] line-clamp-2 group-hover:text-[#2873F5] transition-colors">
                            {getProductTitle(product, locale)}
                          </h4>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Right: Hot Products Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="text-lg font-bold text-[#333333] mb-5 pb-3 border-b border-gray-100">
                {t.hotProducts}
              </h3>
              <div className="space-y-5">
                {hotProducts.map((product) => (
                  <Link
                    key={product.sku_code}
                    href={`${localePrefix}/product/${product.slug}/`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 mb-3">
                      <Image
                        src={getProductMainImage(product, locale)}
                        alt={getProductTitle(product, locale)}
                        width={300}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2">
                      {getProductTitle(product, locale)}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {getProductDescription(product, locale).slice(0, 50)}...
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-[#F87314] font-bold">
                        {convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug).split('-')[0]}
                      </span>
                      <span className="text-xs px-3 py-1 border border-[#2873F5] text-[#2873F5] rounded-full group-hover:bg-[#2873F5] group-hover:text-white transition-colors">
                        {t.viewMore}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
