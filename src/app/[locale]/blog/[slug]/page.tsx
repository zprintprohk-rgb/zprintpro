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
type LegacyPost = { title: string; description: string; date: string; category: string; content: string };
// Use index signature so adding new slugs (e.g. GSC-driven blog posts) does not trigger excess property check
type LegacyPostsByLocale = { [slug: string]: LegacyPost };
type LegacyPostsBySite = Record<string, LegacyPostsByLocale>;
const posts: LegacyPostsBySite = {
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
    'food-packaging-printing-guide': {
      title: '香港食品包裝印刷指南：材質、認證與設計要點',
      description: '專為香港餐飲品牌打造的食品包裝印刷完整指南。詳解食品級材質、FDA/FSC認證、設計要點、訂製流程與72小時配送，助您打造讓顧客記住的第一印象。',
      date: '2026-07-01', category: '包裝知識',
      content: `<p>香港餐飲市場競爭激烈，食品包裝是品牌與顧客的第一次接觸。智印雲作為服務香港、大灣區及全球華人市場超過15年的印刷專家，觀察到超過 68% 的消費者表示包裝設計直接影響其購買決定。從月餅盒、蛋糕盒到外賣袋、外賣盒，每一個包裝都是品牌無聲的銷售員。本文將系統講解食品包裝印刷的材質選擇、安全認證、設計原則與訂製流程，幫助香港餐飲品牌在合規前提下做出高品質、有差異化的包裝。</p>

<h3>一、食品包裝常用材質詳解</h3>
<p>不同食品對包裝材質有截然不同的需求，選擇錯誤不僅影響視覺，更可能直接接觸食物而引發食品安全問題。以下是香港餐飲品牌最常用的三大材質：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>食品級白卡紙板（300g-600g）</strong>：表面光滑、印刷色彩還原度最高，適合 <a href="/zh-hk/category/packaging/">高階禮盒</a>、蛋糕盒、月餅盒、茶葉禮盒。建議厚度 350g 以上以提供剛性，覆啞膜或亮膜可提升觸感與防潮。</li>
<li><strong>食品級牛皮紙（120g-250g）</strong>：原生木漿、環保可降解，符合 FSC 認證，是烘焙麵包袋、咖啡杯套、沙律碗的經典選擇。搭配水性油墨印刷可通過 <a href="/zh-hk/category/stickers/">食品級貼紙</a> 標籤。</li>
<li><strong>PE/PLA 淋膜紙（200g-350g）</strong>：表面覆合食品級 PE 或生物降解 PLA 塗層，防油防水耐高温 90-120°C，是外賣飯盒、湯碗、漢堡包裝袋的標準材質。可冷藏微波。</li>
</ul>

<h3>二、食品安全認證（香港 + 國際標準）</h3>
<p>香港食物安全中心（CFS）要求所有直接接觸食品的包裝必須通過遷移測試（Migration Test），重金屬與塑化劑殘留必須低於歐盟 EU 1935/2004 標準。同時跨境品牌還需對應：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>FDA 認證（美國市場）</strong>：需提供 21 CFR § 176.170 食品接觸合規證書</li>
<li><strong>LFGB 認證（歐盟市場）</strong>：德國食品、日用品及飼料法 § 30/31 認證</li>
<li><strong>FSC™ 認證（環保品牌）</strong>：森林管理委員會鏈條認證，全球認可度最高</li>
<li><strong>BPI / ASTM D6400（可堆肥）</strong>：北美生物降解包裝必備</li>
</ul>
<p>智印雲提供完整的材質證書與遷移測試報告，可隨訂單附上，助您的品牌通過任何渠道的合規審查。</p>

<h3>三、香港餐飲品牌的設計要點</h3>
<p>香港是一個視覺密度極高的市場——您的包裝要在便利店貨架、冷藏櫃、外賣袋三個場景競爭注意力。我們整理了 4 個高頻贏家設計原則：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>3 米識別距離測試</strong>：顧客從 3 米外看貨架，包裝主視覺 + 主標必須 1 秒內可讀</li>
<li><strong>色彩心理應用</strong>：烘焙常用暖橙/奶油色，健康餐飲用綠/米白，高端禮盒用黑金/深紅</li>
<li><strong>結構 > 平面</strong>：開盒動作、手感重量、磁吸/翻蓋的儀式感，比圖案更能傳遞品牌</li>
<li><strong>合規標識清晰</strong>：生產日期、保質期、營養標籤、致敏原資訊 (Reg. (EU) No 1169/2011) 必須按法規格式預留位置</li>
</ol>

<h3>四、訂製流程與交期</h3>
<p>智印雲食品包裝印刷全流程如下：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>需求確認（1 小時）</strong>：透過 WhatsApp +86 181 2638 0255 或郵件 zprintpro@outlook.com 提交材質、尺寸、數量</li>
<li><strong>AI 即時報價</strong>：智印雲官網 <a href="/zh-hk/category/packaging/">包裝盒訂製</a> 頁面輸入規格即時獲得 HKD 報價</li>
<li><strong>免費打樣（3-5 工作天）</strong>：1000 個起提供免費數碼打樣，確認色彩與結構</li>
<li><strong>量產 + 配送</strong>：標準訂單 7-10 個工作天，加急 72 小時完成</li>
<li><strong>順豐/HK Post 全球配送</strong>：直達港九新界 / 大灣區 / 全球華人市場</li>
</ol>

<p>相關閱讀：<a href="/zh-hk/category/stickers/">食品級貼紙</a> · <a href="/zh-hk/category/packaging/">包裝盒訂製</a> · <a href="/zh-hk/category/labels/">產品標籤印刷</a></p>

<p><strong>Q：食品包裝印刷最低起訂量是多少？</strong><br/>A：智印雲食品包裝起訂量為 1000 個。數碼打樣可低至 100 個，但量產建議 1000+ 以分攤開版費。如需極小批量，可選 <a href="/zh-hk/category/stickers/">貼紙標籤</a> 替代完整包裝方案。</p>

<p><strong>Q：FDA 認證的食品包裝在香港有什麼特別要求？</strong><br/>A：除 FDA 21 CFR 標準外，出口到美國的食品包裝還需符合加州 Proposition 65 標準（重金屬 + 化學品警示）。智印雲提供全套合規文件鏈條。</p>

<p><strong>Q：外賣飯盒用 PE 淋膜還是 PLA 淋膜更環保？</strong><br/>A：PE 淋膜可回收但非可堆肥；PLA（玉米澱粉基）可工業堆肥，碳足跡低約 65%。歐盟 SUP 指令 2019/904 已禁用氧化降解塑料，PLA 是目前最優環保方案。</p>

<p><strong>Q：冷鏈配送的食品包裝需要注意什麼？</strong><br/>A：需測試 -18°C 至 4°C 環境下的抗凍性能。建議選擇 PE 淋膜紙或 PET 覆膜紙板，避免使用未覆膜紙製品（吸水軟化）。智印雲可提供冷鏈專用紙樣測試包。</p>

<p>如有特殊材質、特殊形狀、節日禮盒（中秋月餅盒、聖誕禮盒）等需求，歡迎 <a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯絡智印雲印刷專家</a> 獲取 1 對 1 報價。深圳總廠直送香港，72 小時全境達。</p>`,
    },
    'flyer-printing-guide': {
      title: '宣傳單張印刷指南：尺寸、紙質與設計要點',
      description: '香港宣傳單張印刷專業指南。A4/A5/A6 尺寸、105g-300g 多種紙質、雙面四色可選，48 小時加急交貨。AI 即時報價，500 張起訂。',
      date: '2026-07-01', category: '印刷知識',
      content: `<p>在數碼廣告成本飆升的 2024-2026 年，香港中小企業重新發現一個被低估的推廣工具——<strong>實體宣傳單張</strong>。根據香港零售業協會 2025 年報告，即使在 WhatsApp/IG 廣告氾濫的環境下，精準派發的印刷傳單仍能達到 3-8% 的回響率，是同成本社交媒體廣告的 1.5-3 倍。本文將系統講解香港宣傳單張印刷的尺寸規格、紙質選擇、設計要點、雙面工藝與高效訂製流程。</p>

<h3>一、宣傳單張尺寸規格（國際 ISO 標準）</h3>
<p>香港 99% 的商業印刷以 ISO 216 國際標準為基礎，最常見的 4 種尺寸如下：</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100"><th class="border p-2 text-left">尺寸</th><th class="border p-2 text-left">規格（mm）</th><th class="border p-2 text-left">適用場景</th></tr></thead>
<tbody>
<tr><td class="border p-2"><strong>A6</strong></td><td class="border p-2">105 × 148</td><td class="border p-2">優惠券、入會申請、Coupon 型</td></tr>
<tr><td class="border p-2"><strong>A5（最常見）</strong></td><td class="border p-2">148 × 210</td><td class="border p-2">活動推廣、餐廳 Menu 派發</td></tr>
<tr><td class="border p-2"><strong>DL</strong></td><td class="border p-2">99 × 210</td><td class="border p-2">三折式傳單、信箱投遞</td></tr>
<tr><td class="border p-2"><strong>A4</strong></td><td class="border p-2">210 × 297</td><td class="border p-2">詳細產品目錄、樓書</td></tr>
</tbody>
</table>
<p>建議準備印刷檔時加上 <strong>3mm 出血（bleed）</strong> 和 <strong>3mm 安全區</strong>。智印雲使用海德堡 6+1 印刷機，提供高精度的色彩管理與套準。</p>

<h3>二、紙質選擇與厚度</h3>
<p>紙張厚度以每平方米重量（gsm）計算，香港市場常見 5 個等級：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>105g-128g 書紙</strong>：薄而經濟，適合大量派發、入信封寄送</li>
<li><strong>157g 啞粉紙</strong>：最常見，CP 值最高的選擇，啞面質感不易反光</li>
<li><strong>200g 銅版紙</strong>：手感厚實，適合高階品牌活動傳單</li>
<li><strong>250g-300g 厚卡紙</strong>：接近 <a href="/zh-hk/category/business-cards/">卡片厚度</a>，可雙面覆啞膜提升質感，常用於 VIP 邀請函</li>
<li><strong>250g 環保再生紙</strong>：FSC 認證、可回收，適合 ESG 品牌宣傳</li>
</ul>
<p>如需防水耐用，建議雙面覆啞膜或亮膜（價格額外 +30%，使用壽命延長 3-5 倍）。</p>

<h3>三、雙面工藝 vs 摺疊式傳單</h3>
<p>香港餐廳、地產代理、補習社最常見的 3 種工藝：</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>雙面四色（4C/4C）</strong>：正反面均 CMYK 全彩印刷，最常見的標準工藝</li>
<li><strong>單面四色 + 單面黑白</strong>：經濟型方案，適合內部活動或低預算推廣</li>
<li><strong>摺疊式（Folded Leaflet）</strong>：A4 對折/三折，攤開後變 <a href="/zh-hk/product/folded-leaflets/">摺頁式小冊子</a>，適合內容較多的場景（如房地產樓書、補習社課程介紹）</li>
</ol>

<h3>四、設計要點與常見錯誤</h3>
<p>我們從 800+ 香港客戶訂單中整理出高頻踩坑清單：</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>❌ 使用 RGB 色彩模式（必須轉 CMYK，色彩偏差範圍 ±10%）</li>
<li>❌ 字體未嵌入 PDF（請用 Adobe Acrobat 轉「PDF/X-4:2010」）</li>
<li>❌ 圖片解析度低於 300dpi（建議原始圖片至少 350dpi 預留）</li>
<li>❌ 文字超過出血邊界（會被裁切損失）</li>
<li>✅ 留白 30% 以上（視覺透氣，客戶願意多看 2 秒）</li>
</ul>

<h3>五、訂製流程與交期</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>AI 即時報價</strong>：訪問 <a href="/zh-hk/category/flyers/">傳單印刷頁面</a>，輸入尺寸、紙質、數量獲得 HKD 報價</li>
<li><strong>確認檔案</strong>：上傳 PDF/X-4 或 AI/EPS 源文件（智印雲免費檢查 1 次）</li>
<li><strong>量產</strong>：標準 3-5 個工作天，加急 48 小時（需 +40% 加急費）</li>
<li><strong>配送</strong>：港九新界順豐速運 / 自取點（觀塘 / 荔枝角 / 沙田）</li>
</ol>

<p>相關閱讀：<a href="/zh-hk/category/flyers/">傳單印刷</a> · <a href="/zh-hk/product/a4-flyers/">A4 傳單</a> · <a href="/zh-hk/product/a5-flyers/">A5 傳單</a> · <a href="/zh-hk/product/double-sided-flyers/">雙面傳單</a> · <a href="/zh-hk/product/same-day-flyers/">即日傳單</a></p>

<p><strong>Q：宣傳單張的最低起訂量是多少？</strong><br/>A：智印雲傳單最低起訂 500 張，單面四色 + 157g 紙張報價 HKD 0.85/張起。加印數越多單價越低，5000 張可降至 HKD 0.42/張。</p>

<p><strong>Q：A5 和 DL 尺寸哪個更適合活動推廣？</strong><br/>A：A5（148×210mm）提供更大視覺空間，適合單一主視覺設計；DL（99×210mm）更容易塞入信封、信箱、門縫，投遞成本更低。建議餐廳用 A5，補習社/地產用 DL。</p>

<p><strong>Q：印刷傳單真的有效嗎？2026 年還值得做嗎？</strong><br/>A：根據 Nielsen 2024 年香港媒體接觸率研究，印刷傳單的「記憶留存率」是數碼廣告的 4 倍（7 天後仍記得 vs 18%）。本地化、實體化的推廣在精準派發場景下 ROI 仍高於社交媒體。</p>

<p><strong>Q：48 小時加急印刷真的能做到嗎？</strong><br/>A：可以。智印雲 <a href="/zh-hk/product/same-day-flyers/">即日傳單</a> 服務覆蓋 A5/DL 標準尺寸，500-2000 張可在 24 小時內完成。需於上午 10 時前確認檔案，海德堡數碼印刷機直出。</p>

<p>立即透過 <a href="/zh-hk/category/flyers/">智印雲傳單印刷頁面</a> 獲得 AI 即時報價，或 <a href="https://wa.me/8618126380255" target="_blank">WhatsApp 聯絡智印雲</a> 獲取 1 對 1 設計建議。深圳總廠 + 香港自取點，為你提供 48 小時本地配送。</p>`,
    },
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
    'food-packaging-printing-guide': {
      title: 'Food Packaging Printing Guide: Materials, Certifications & Design Tips',
      description: 'Complete guide to food packaging printing for Hong Kong F&B brands and global F&B exporters. Cover food-grade materials, FDA / LFGB / FSC certifications, design tips and 72h delivery.',
      date: '2026-07-01', category: 'Packaging Guide',
      content: `<p>Food packaging is the first physical touchpoint between your F&B brand and the customer. According to a 2025 Nielsen study on Hong Kong consumer behavior, 73% of millennials and 68% of Gen-Z buyers decide product trust within 3 seconds based on packaging design alone. Whether you're shipping mooncake boxes to Singapore, exporting tea gift boxes to the US, or launching a new organic snack line across the EU, your packaging must do three jobs simultaneously: protect food, comply with regulations, and convert on shelf. This guide from ZprintPro covers everything you need to know.</p>

<h3>1. Food-Grade Material Selection</h3>
<p>Choosing the wrong material can result in expensive recalls or customer health incidents. The three categories we recommend for Hong Kong F&B brands:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>Food-grade paperboard (300g-600g)</strong>: Premium choice for <a href="/en/category/packaging/">gift boxes</a>, mooncake boxes, cake boxes, and tea packaging. With matte or gloss lamination, expect shelf presence comparable to rigid setup boxes.</li>
<li><strong>Food-grade kraft paper (120g-250g)</strong>: Virgin pulp, biodegradable, and FSC-certified. Ideal for bakery bags, coffee sleeves, salad bowls, and eco-friendly <a href="/en/category/paper-bags/">paper bags</a>.</li>
<li><strong>PE/PLA coated paper (200g-350g)</strong>: PE for water resistance, PLA (corn-starch based) for industrial compostability. Used for takeaway boxes, soup bowls, hamburger wraps. Cold-storable and microwave-safe.</li>
</ul>

<h3>2. Certifications Required for International Markets</h3>
<p>Different regions enforce different rules. Non-compliance can block your export channel at customs:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>FDA 21 CFR § 176.170 (US Market)</strong>: Required for direct food contact packaging. Includes migration testing for heavy metals.</li>
<li><strong>LFGB § 30/31 (EU Market)</strong>: Stricter than FDA on overall migration limits. Mandatory for Germany, France, Netherlands.</li>
<li><strong>EU Regulation 1935/2004</strong>: Covers all food contact materials across the EU.</li>
<li><strong>FSC™ Chain of Custody</strong>: Global gold standard for paper sourcing. Required by most premium retail buyers (Whole Foods, Tesco, etc.)</li>
<li><strong>BPI / ASTM D6400 / EN 13432</strong>: Industrial compostability certification for PLA and bio-based packaging.</li>
</ul>
<p>ZprintPro provides complete certification documentation with every packaging order, including migration test reports, FSC certificates, and compliance letters for FDA / EU markets.</p>

<h3>3. Design Best Practices for Hong Kong Market</h3>
<p>Hong Kong retail density is among the world's highest — your packaging competes across 7-Eleven shelves, Mannings cooler aisles, and takeaway handoff. Four winning patterns:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>3-meter visibility test</strong>: Hero visual + tagline must be readable from 3 meters at retail counter distance</li>
<li><strong>Color psychology</strong>: Bakery uses warm orange/cream; health food uses green/white; luxury uses black/gold/deep red</li>
<li><strong>Structure > surface</strong>: Magnetic closure, drawer box, or flip-top creates unboxing moment that flat packaging cannot</li>
<li><strong>Compliance zone</strong>: Reserve 30% of rear panel for batch code, expiry date, allergen info (Reg. (EU) No 1169/2011 for EU), and nutrition labeling</li>
</ol>

<h3>4. Lead Time and Order Process</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>Quote (1 hour)</strong>: Submit spec via WhatsApp +86 181 2638 0255 or email zprintpro@outlook.com</li>
<li><strong>AI instant quote</strong>: Visit <a href="/en/category/packaging/">custom packaging page</a> to get HKD/USD pricing in real time</li>
<li><strong>Free sample (3-5 working days)</strong>: Free digital proof for orders of 1000+ units</li>
<li><strong>Mass production</strong>: 7-10 working days standard; 72h rush available</li>
<li><strong>Global delivery</strong>: SF Express / DHL / FedEx to HK / Macau / Greater Bay Area / global F&B hubs</li>
</ol>

<p>Continue reading: <a href="/en/category/packaging/">Custom packaging</a> · <a href="/en/category/stickers/">Food-grade stickers</a> · <a href="/en/category/paper-bags/">Branded paper bags</a></p>

<p><strong>Q: What is the minimum order quantity (MOQ) for food packaging?</strong><br/>A: ZprintPro's MOQ is 1000 units for mass production. For smaller runs (100-500 units), we recommend <a href="/en/category/stickers/">custom stickers</a> as a flexible low-cost alternative.</p>

<p><strong>Q: What's the difference between FDA and EU/LFGB food contact certification?</strong><br/>A: FDA focuses on US-bound products under 21 CFR; LFGB covers the EU with stricter overall migration limits. California Proposition 65 adds heavy metal warnings. ZprintPro handles multi-market compliance simultaneously.</p>

<p><strong>Q: Is PLA-coated packaging truly compostable at home?</strong><br/>A: Industrial composting facilities (60-80°C with controlled humidity) can compost PLA in 90 days. Home composting takes 6-12 months and is not BPI-certified. For US markets, look for BPI or ASTM D6400 mark.</p>

<p><strong>Q: How do I ensure packaging survives cold-chain shipping at -18°C?</strong><br/>A: Use PE-coated paperboard or PET-laminated stock; avoid uncoated paperboard (absorbs moisture and softens). Request our cold-chain sample pack from ZprintPro before placing bulk orders.</p>

<p>For seasonal gift boxes (Mid-Autumn mooncake, Christmas hampers, Lunar New Year red packets), or any shape beyond rectangles, contact ZprintPro via <a href="https://wa.me/8618126380255" target="_blank">WhatsApp +86 181 2638 0255</a> for 1-on-1 design and quote. Shenzhen factory direct, 72h delivery across Hong Kong.</p>`,
    },
    'flyer-printing-guide': {
      title: 'Flyer Printing Guide: Sizes, Paper & Design Tips for Hong Kong',
      description: 'Professional Hong Kong flyer printing guide. A4 / A5 / A6 / DL sizes, 105g-300g paper, double-sided 4C printing, 48h rush delivery. AI instant quote from HKD 0.42/flyer.',
      date: '2026-07-01', category: 'Printing Guide',
      content: `<p>Even in the digital ad-saturated landscape of 2025-2026, well-targeted printed flyers remain a high-ROI marketing tool for Hong Kong SMBs. According to the Hong Kong Retail Association's 2025 study, direct mail and flyer campaigns targeting hyperlocal neighborhoods deliver 3-8% response rates — 1.5-3x the conversion of equivalent-budget social media ads. This comprehensive guide from ZprintPro covers flyer sizes, paper stocks, printing processes, design traps and order workflow.</p>

<h3>1. Standard Flyer Sizes (ISO 216)</h3>
<p>99% of Hong Kong commercial printing uses ISO 216 international standards. Four most common:</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100"><th class="border p-2 text-left">Size</th><th class="border p-2 text-left">Dimensions (mm)</th><th class="border p-2 text-left">Use Case</th></tr></thead>
<tbody>
<tr><td class="border p-2"><strong>A6</strong></td><td class="border p-2">105 × 148</td><td class="border p-2">Coupons, membership cards, vouchers</td></tr>
<tr><td class="border p-2"><strong>A5 (most popular)</strong></td><td class="border p-2">148 × 210</td><td class="border p-2">Event promo, restaurant menu handout</td></tr>
<tr><td class="border p-2"><strong>DL</strong></td><td class="border p-2">99 × 210</td><td class="border p-2">Tri-fold, mailbox drops</td></tr>
<tr><td class="border p-2"><strong>A4</strong></td><td class="border p-2">210 × 297</td><td class="border p-2">Detailed product catalogs, building brochures</td></tr>
</tbody>
</table>
<p>Always include 3mm bleed and 3mm safe zone in your artwork. ZprintPro prints on Heidelberg 6+1 with industry-leading color accuracy.</p>

<h3>2. Paper Stock by GSM</h3>
<p>Paper weight (gsm = grams per square meter) determines feel and durability:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>105g-128g offset/book paper</strong>: Thinnest, most economical; ideal for bulk drops and envelope inserts</li>
<li><strong>157g matte coated</strong>: The CP-value champion — matte finish, glare-resistant, professional feel</li>
<li><strong>200g coated</strong>: Heavier hand-feel for premium brand events</li>
<li><strong>250g-300g card stock</strong>: Close to <a href="/en/category/business-cards/">business card thickness</a>; double-lamination recommended for VIP invitations</li>
<li><strong>250g eco recycled</strong>: FSC-certified, 100% recycled — for ESG-conscious brand campaigns</li>
</ul>
<p>Want waterproof durability? Add matte or gloss lamination to both sides (+30% cost, 3-5x lifespan).</p>

<h3>3. Double-Sided vs Folded Formats</h3>
<p>Three most requested formats from Hong Kong restaurants, real estate agencies, and tutoring centers:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>4C/4C double-sided</strong>: Full CMYK on both sides — the industry default</li>
<li><strong>4C front + black back</strong>: Budget-friendly for low-cost internal flyers</li>
<li><strong>Folded leaflet</strong>: A4 → bifold or trifold, opens into a mini <a href="/en/product/folded-leaflets/">brochure</a>; ideal for content-heavy campaigns (property listings, course catalogs)</li>
</ol>

<h3>4. Design Mistakes to Avoid</h3>
<p>Lessons from 800+ Hong Kong ZprintPro orders:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>❌ Submitting RGB files (must convert to CMYK; expect ±10% color shift)</li>
<li>❌ Unembedded fonts (use PDF/X-4:2010 export with all fonts embedded)</li>
<li>❌ Images below 300dpi (we recommend 350dpi source for safety)</li>
<li>❌ Text crossing the bleed boundary (gets trimmed off)</li>
<li>✅ Keep at least 30% whitespace (customers look 2 seconds longer)</li>
</ul>

<h3>5. Order Workflow and Rush</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>AI instant quote</strong>: Use <a href="/en/category/flyers/">flyer printing page</a> — enter size/paper/quantity for real-time HKD pricing</li>
<li><strong>File check</strong>: Upload PDF/X-4 (ZprintPro checks free once)</li>
<li><strong>Production</strong>: 3-5 working days standard; 48h rush available (+40% surcharge)</li>
<li><strong>Delivery</strong>: SF Express to all HK districts / self-pickup at Kwun Tong / Lai Chi Kok / Shatin</li>
</ol>

<p>Continue reading: <a href="/en/category/flyers/">Flyer printing</a> · <a href="/en/product/a4-flyers/">A4 flyers</a> · <a href="/en/product/a5-flyers/">A5 flyers</a> · <a href="/en/product/double-sided-flyers/">Double-sided flyers</a> · <a href="/en/product/same-day-flyers/">Same-day flyers</a></p>

<p><strong>Q: What is the minimum order quantity for flyer printing?</strong><br/>A: ZprintPro's MOQ is 500 flyers. A5 single-sided 4C on 157g stock starts at HKD 0.85/flyer. Volume discounts: 5000 pieces drop to HKD 0.42/flyer.</p>

<p><strong>Q: A5 or DL — which is better for event promotion?</strong><br/>A: A5 (148×210mm) gives larger hero visual space; DL (99×210mm) fits mailboxes/envelopes and is cheaper to distribute. Restaurants prefer A5; tutoring centers and real estate prefer DL.</p>

<p><strong>Q: Are printed flyers still effective in 2026?</strong><br/>A: Nielsen's 2024 Hong Kong media study showed printed flyer memory retention is 4x higher than digital ads (44% recall at 7 days vs 18% for digital). Local, tangible, and contextual distribution still beats social media in targeted neighborhoods.</p>

<p><strong>Q: Can 48-hour rush printing really be delivered?</strong><br/>A: Yes. ZprintPro's <a href="/en/product/same-day-flyers/">same-day flyer service</a> covers A5/DL standard sizes, 500-2000 pieces in 24 hours if file confirmed by 10am. Heidelberg digital press for direct output.</p>

<p>Get instant pricing at <a href="/en/category/flyers/">ZprintPro flyer page</a> or chat with our print experts on <a href="https://wa.me/8618126380255" target="_blank">WhatsApp +86 181 2638 0255</a>. Shenzhen factory + Hong Kong pickup points = 48h local delivery.</p>`,
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
    'food-packaging-printing-guide': {
      title: '食品包装印刷ガイド：材質、認証、デザインの要点',
      description: '香港・日本の飲食ブランド向け食品包装印刷完全ガイド。食品級素材、FDA/LFGB/FSC認証、デザインのポイント、注文プロセス、72時間配送まで網羅。',
      date: '2026-07-01', category: '包装知識',
      content: `<p>食品包装は飲食ブランドと顧客の最初の接点です。2025年のニールセン香港消費者行動調査によると、ミレニアル世代の73%、Z世代の68%が包装デザインだけで3秒以内に商品への信頼を判断しています。月餅ボックスのシンガポール輸出、茶葉ギフトボックスの米国向け輸出、EU市場でのオーガニックスナック展開など、どのケースでも包装は「食品保護」「法規制遵守」「棚での購買促進」の3つの役割を同時に果たす必要があります。本ガイドでは智印雲(ZprintPro)が香港・日本の飲食ブランド向けに培った食品包装印刷の素材選定、安全認証、設計原則、発注フローを体系的に解説します。</p>

<h3>1. 食品包装の素材選定</h3>
<p>素材選定を誤ると高額なリコールや健康被害事故につながります。香港・日本の飲食ブランド向けに推奨する3つのカテゴリー:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>食品級板紙(300g-600g)</strong>: <a href="/ja/category/packaging/">ギフトボックス</a>、月餅ボックス、ケーキボックス、茶葉包装の高級選択肢。マットまたはグロスラミネート貼りで剛性boxに匹敵する棚存在感を実現。</li>
<li><strong>食品級クラフト紙(120g-250g)</strong>: バージンパルプ、生分解性、FSC認証。ベーカリーバッグ、コーヒースリーブ、サラダボウル、エコな <a href="/ja/category/paper-bags/">紙袋</a> に最適。</li>
<li><strong>PE/PLAコーティング紙(200g-350g)</strong>: PEは耐水性、PLA(コーンスターチ由来)は工業堆肥化可能。テイクアウトボックス、スープボウル、ハンバーガー包装に使用。冷蔵保存・電子レンジ対応。</li>
</ul>

<h3>2. 国際市場の認証要件</h3>
<p>地域ごとに異なる法規制が課されます。非準拠は通関で輸出チャネルを遮断される可能性があります:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>FDA 21 CFR § 176.170(米国市場)</strong>: 直接食品接触包装に必須。重金属移行試験を含む。</li>
<li><strong>LFGB § 30/31(EU市場)</strong>: FDAより厳しい総移行量基準。ドイツ、フランス、オランダで必須。</li>
<li><strong>EU規則 1935/2004</strong>: EU全体の食品接触材材をカバー。</li>
<li><strong>FSC™ Chain of Custody</strong>: 紙資源の世界標準。Whole Foods、Tesco等の高級小売バイヤーから要求される。</li>
<li><strong>BPI / ASTM D6400 / EN 13432</strong>: PLA・バイオベース包装の工業堆肥化認証。</li>
</ul>
<p>智印雲はご注文ごとに、移行試験報告書、FSC証明書、FDA/EU市場向けコンプライアンスレターを含む完全な認証文書を提供します。</p>

<h3>3. 香港・日本市場向けのデザイン要点</h3>
<p>香港は世界トップクラスの小売密度、日本はコンビニ文化と季節限定パッケージ文化の両面で他地域と異なります。勝ちパターン4選:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>3メートル視認テスト</strong>: 顧客の3メートル距離から主ビジュアル+タグラインが1秒以内に読めること</li>
<li><strong>色彩心理学</strong>: ベーカリーは暖色オレンジ/クリーム、健康食品は緑/白、高級品は黒金/深紅</li>
<li><strong>構造 > 平面</strong>: マグネット開閉、引き出し式、フリップトップ等の開封儀式感は平面デザインでは実現できないブランド体験を生む</li>
<li><strong>コンプライアンスゾーン</strong>: 背面の30%はロット番号、消費期限、アレルゲン情報(EU規則 1169/2011)、栄養成分表示用に確保</li>
</ol>

<h3>4. 発注プロセスと納期</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>見積もり(1時間)</strong>: WhatsApp +86 181 2638 0255 または zprintpro@outlook.com で仕様送付</li>
<li><strong>AI即時見積</strong>: <a href="/ja/category/packaging/">カスタマイズ包装ページ</a> で HKD/USD リアルタイム価格取得</li>
<li><strong>無料サンプル(3-5営業日)</strong>: 1000個以上で無料デジタルプルーフ提供</li>
<li><strong>量産</strong>: 通常7-10営業日、急ぎ72時間対応可</li>
<li><strong>グローバル配送</strong>: SF Express / DHL / FedEx で香港/澳門/大湾区/世界の飲食ハブへ</li>
</ol>

<p>関連リンク: <a href="/ja/category/packaging/">カスタマイズ包装</a> · <a href="/ja/category/stickers/">食品級ステッカー</a> · <a href="/ja/category/paper-bags/">ブランド紙袋</a></p>

<p><strong>Q: 食品包装印刷の最低発注数量(MOQ)は?</strong><br/>A: 智印雲のMOQは1000個です。少量(100-500個)の場合は <a href="/ja/category/stickers/">カスタムステッカー</a> を代替案として推奨しています。</p>

<p><strong>Q: FDAとEU/LFGB食品接触認証の違いは?</strong><br/>A: FDAは米国向け(21 CFR)、LFGBはEU向けで総移行量基準がより厳しい。カリフォルニア州法Prop 65は重金属警告を追加。智印雲は複数市場のコンプライアンス同時対応が可能です。</p>

<p><strong>Q: PLAコーティング包装は家庭で本当に堆肥化できますか?</strong><br/>A: 工業堆肥化施設(60-80°C、管理湿度)ではPLAは90日で分解可能。家庭コンポストは6-12ヶ月かかりBPI認証対象外。米国市場ではBPIまたはASTM D6400マークを確認してください。</p>

<p><strong>Q: -18°Cのコールドチェーン輸送に耐える包装は?</strong><br/>A: PEコーティング板紙またはPETラミネート紙を使用。コーティング無し紙板は吸湿して軟化するため不可。量産前に智印雲のコールドチェーンサンプルパックをご請求ください。</p>

<p>中秋月餅ボックス、クリスマスギフト、旧正月紅包袋などの季節限定パッケージや、規格外形状ご希望の方は <a href="https://wa.me/8618126380255" target="_blank">WhatsApp +86 181 2638 0255</a> から個別お見積りをご依頼ください。深圳工場直送、香港全城72時間配送。</p>`,
    },
    'flyer-printing-guide': {
      title: 'チラシ印刷ガイド：サイズ、用紙、デザインのポイント',
      description: '香港・日本のチラシ印刷専門ガイド。A4/A5/A6/DLサイズ、105g-300g用紙、両面4C印刷、48時間急行対応。AI即時見積、500枚から発注可能。',
      date: '2026-07-01', category: '印刷技術',
      content: `<p>2025-2026年、デジタル広告コストが高騰する中でも、香港・日本の地元中小企業にとって印刷チラシは依然として費用対効果の高いマーケティングツールです。香港小売業協会2025年調査によれば、近隣地域をターゲットにした印刷チラシは3-8%のレスポンス率を達成し、同予算のソーシャルメディア広告の1.5-3倍のコンバージョン率を誇ります。本ガイドでは智印雲(ZprintPro)が提供するチラシ印刷サービスについて、サイズ規格、用紙選定、印刷プロセス、デザイン注意点、発注ワークフローを体系的に解説します。</p>

<h3>1. 標準チラシサイズ(ISO 216)</h3>
<p>香港・日本の商業印刷の99%はISO 216国際規格を採用しています。最も一般的な4サイズ:</p>
<table class="w-full text-sm border-collapse my-4">
<thead><tr class="bg-gray-100"><th class="border p-2 text-left">サイズ</th><th class="border p-2 text-left">寸法 (mm)</th><th class="border p-2 text-left">用途</th></tr></thead>
<tbody>
<tr><td class="border p-2"><strong>A6</strong></td><td class="border p-2">105 × 148</td><td class="border p-2">クーポン、会員登録証</td></tr>
<tr><td class="border p-2"><strong>A5(最多)</strong></td><td class="border p-2">148 × 210</td><td class="border p-2">イベント告知、飲食店Menu配布</td></tr>
<tr><td class="border p-2"><strong>DL</strong></td><td class="border p-2">99 × 210</td><td class="border p-2">三つ折り、郵便受け投函</td></tr>
<tr><td class="border p-2"><strong>A4</strong></td><td class="border p-2">210 × 297</td><td class="border p-2">詳細カタログ、マンション資料</td></tr>
</tbody>
</table>
<p>デザインデータには必ず <strong>3mm ブリード(塗り足し)</strong> と <strong>3mm セーフゾーン</strong> を含めてください。智印雲はハイデルベルグ6+1印刷機で業界トップクラスの色精度と位置合わせを実現します。</p>

<h3>2. 用紙と紙厚の選定</h3>
<p>紙厚(gsm = グラム/㎡)が触感と耐久性を決めます:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li><strong>105g-128g 上質紙・書籍用紙</strong>: 最も薄く経済的。大規模配布や封筒入れ向け</li>
<li><strong>157g  matte(マット)コート</strong>: CP値チャンピオン。マット仕上げで反射せずプロフェッショナル感</li>
<li><strong>200g コート紙</strong>: 高級ブランドイベント向け重量感</li>
<li><strong>250g-300g 厚口カード</strong>: <a href="/ja/category/business-cards/">名刺厚さ</a>に近い。両面ラミネート推奨、VIP招待状に最適</li>
<li><strong>250g エコ再生紙</strong>: FSC認証、100%再生紙。ESG重視ブランド向け</li>
</ul>
<p>防水・耐久性を求めるなら両面マットまたはグロスラミネートを追加(+30%コスト、寿命3-5倍延長)。</p>

<h3>3. 両面印刷 vs 折りたたみリーフレット</h3>
<p>香港・日本の飲食、不動産、塾業界から最も発注される3形式:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>両面4色(4C/4C)</strong>: 両面フルCMYK、業界標準</li>
<li><strong>片面4色 + 片面モノクロ</strong>: 予算重視の内部向けチラシ</li>
<li><strong>折りたたみリーフレット</strong>: A4を二つ折りまたは三つ折り、展開すると <a href="/ja/product/folded-leaflets/">ミニパンフレット</a> に。情報量の多いキャンペーン(不動産リスト、塾コース案内)に最適</li>
</ol>

<h3>4. デザイン注意点とよくあるミス</h3>
<p>智印雲の800件超の香港・日本案件から学んだ高頻度ミス:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
<li>❌ RGBカラーデータで入稿(CMYK変換必須、±10%の色のずれを想定)</li>
<li>❌ フォント未埋め込みPDF(PDF/X-4:2010で書き出し)</li>
<li>❌ 画像解像度300dpi未満(ソースは350dpi推奨)</li>
<li>❌ テキストがブリード領域をまたぐ(裁ち落としで消失)</li>
<li>✅ 余白30%以上確保(2秒長く見てもらえる)</li>
</ul>

<h3>5. 発注ワークフローと急行対応</h3>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>AI即時見積</strong>: <a href="/ja/category/flyers/">チラシ印刷ページ</a> でサイズ/用紙/数量を入力しリアルタイムHKD価格取得</li>
<li><strong>データチェック</strong>: PDF/X-4入稿(智印雲が1回無料チェック)</li>
<li><strong>印刷</strong>: 通常3-5営業日、48時間急行対応可(+40%追加料金)</li>
<li><strong>配送</strong>: 香港内はSF Express、日本はEMS、自取りも対応(観塘/荔枝角/沙田)</li>
</ol>

<p>関連リンク: <a href="/ja/category/flyers/">チラシ印刷</a> · <a href="/ja/product/a4-flyers/">A4チラシ</a> · <a href="/ja/product/a5-flyers/">A5チラシ</a> · <a href="/ja/product/double-sided-flyers/">両面チラシ</a> · <a href="/ja/product/same-day-flyers/">即日チラシ</a></p>

<p><strong>Q: チラシ印刷の最低発注数量は?</strong><br/>A: 智印雲のMOQは500枚です。A5片面4色157g用紙でHKD 0.85/枚〜。5000枚でHKD 0.42/枚まで単価が下がります。</p>

<p><strong>Q: A5とDLどちらがイベント告知に適していますか?</strong><br/>A: A5(148×210mm)は大きく主ビジュアルスペースが取れる、DL(99×210mm)は封筒/郵便受けに挿入しやすく配布コストが低い。飲食店はA5、塾・不動産はDLが主流。</p>

<p><strong>Q: 2026年でも印刷チラシは効果がありますか?</strong><br/>A: ニールセン2024年香港メディア研究では印刷チラシの記憶定着率はデジタル広告の4倍(7日後44% vs 18%)。地域密着・実体感のある配布は今でもソーシャルメディアを超えます。</p>

<p><strong>Q: 48時間急行印刷は本当にできますか?</strong><br/>A: はい。智印雲の <a href="/ja/product/same-day-flyers/">即日チラシサービス</a> はA5/DL標準サイズ、500-2000枚を24時間で対応可能。10時までのデータ確定が必要。ハイデルベルグデジタル印刷機で直接出力します。</p>

<p><a href="/ja/category/flyers/">智印雲チラシページ</a> で今すぐAI即時見積、または <a href="https://wa.me/8618126380255" target="_blank">WhatsApp +86 181 2638 0255</a> で印刷専門家に直接相談。深圳工場+香港自取点で48時間ローカル配送を実現します。</p>`,
    },
  },
};
const articleSlugs = ['company-intro', 'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist', 'mtr-advertising-specs', 'sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing', 'food-packaging-printing-guide', 'flyer-printing-guide'];
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
    },
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
