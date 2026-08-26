# -*- coding: utf-8 -*-
"""
fix-about-hero-testi-v3-2026-07-31.py
Line-based replace, 比 regex 更稳
"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ABOUT = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# === fix 1: Hero 改用 factory-banner.webp ===
# L259-L265 (0-indexed 258-264)
# L258: '        {/* Hero */}'
# L259-264: section
# L265: ''
old_hero_lines = lines[258:266]  # L259-L266 (含空行)
print('=== before fix 1 ===')
for l in old_hero_lines:
    print(f'  {l.rstrip()!r}')

new_hero_lines = [
    '        {/* 2026-07-31 K3 拍板 A: Hero 改用 factory-banner.webp 背景 + 深色蒙层 */}\n',
    '        <section className="relative text-white py-20 md:py-32 max-w-[1320px] mx-auto overflow-hidden">\n',
    '          <div className="absolute inset-0">\n',
    '            <img\n',
    '              src="/images/factory/factory-banner.webp"\n',
    '              alt="ZprintPro 工厂横幅 · 自家廠房實拍"\n',
    '              className="w-full h-full object-cover"\n',
    '            />\n',
    '            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A4A]/85 to-[#1E3A5F]/80" />\n',
    '          </div>\n',
    '          <div className="relative px-4 sm:px-6 lg:px-8 text-center">\n',
    '            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>\n',
    '            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>\n',
    '          </div>\n',
    '        </section>\n',
    '\n',  # 保留空行
]
lines[258:266] = new_hero_lines
print('[fix1] Hero -> factory-banner.webp background + dark overlay')

# === fix 2-4: 3 locale testimonials 改 industries ===
# 用整段 string 替换 (literal match)

content = ''.join(lines)

# zh-hk
content = content.replace(
    "testimonialSubtitle: '真實客戶反饋 (MOCK 占位，K3 拍客戶 logo 後替換)',",
    "testimonialSubtitle: '我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴',",
    1
)
old_zh_testi = r"""    testimonials: [
      { company: 'MOCK - 香港某連鎖餐廳', industry: '餐飲', quote: '宣傳單張質量超預期，3000 張只花了 HK\\$ 1,200，紙質厚實色彩鮮明，顧客拍照打卡率提高 40%。' },
      { company: 'MOCK - 美國某 DTC 品牌', industry: '電商美妝', quote: '客製包裝盒從設計到送達只用了 12 天，FedEx 直送美國倉，5000 個 HK\\$ 8/個，物流追蹤透明。' },
      { company: 'MOCK - 日本某活動策劃公司', industry: '活動', quote: '年曆印刷起訂 1000 本 HK\\$ 4/本，比 e-print 便宜 30%，10 月旺季前準時到貨。' }
    ],"""
new_zh_testi = """    industries: [
      { iconKey: 'fnb', name: '餐飲外賣', desc: '餐廳及外賣平台' },
      { iconKey: 'retail', name: '零售精品', desc: '實體店及品牌專櫃' },
      { iconKey: 'ecommerce', name: '跨境電商', desc: 'DTC 品牌及亞馬遜 FBA' },
      { iconKey: 'beauty', name: '美妝護膚', desc: '護膚品及化妝品' },
      { iconKey: 'education', name: '教育培訓', desc: '學校及培訓機構' },
      { iconKey: 'wedding', name: '婚慶活動', desc: '婚禮及商務活動' },
      { iconKey: 'creator', name: '文創 IP', desc: '設計師及藝術家' },
      { iconKey: 'pet', name: '寵物行業', desc: '寵物食品及用品' },
      { iconKey: 'baby', name: '母嬰產品', desc: '嬰幼兒及孕產' },
      { iconKey: 'beverage', name: '茶飲食品', desc: '茶莊及食品品牌' },
      { iconKey: 'logistics', name: '物流快遞', desc: '快遞面單及物流' },
      { iconKey: 'apparel', name: '服裝鞋帽', desc: '時尚及運動品牌' }
    ],"""
assert old_zh_testi in content, 'zh-hk testimonials not found'
content = content.replace(old_zh_testi, new_zh_testi, 1)
print('[fix2] zh-hk testimonials -> 12 industries')

# en
content = content.replace(
    "testimonialSubtitle: 'Real customer feedback (MOCK placeholder — replace with real client logos/quotes after K3 captures)',",
    "testimonialSubtitle: '12 industry segments served · 1,000+ business clients trusted us',",
    1
)
old_en_testi = r"""    testimonials: [
      { company: 'MOCK - HK Restaurant Chain', industry: 'F&B', quote: 'Flyer quality exceeded expectations. 3000 pieces for just HK\\$ 1,200, thick paper, vivid colors, customer photo-tagging rate up 40%.' },
      { company: 'MOCK - US DTC Beauty Brand', industry: 'DTC Beauty', quote: 'Custom packaging from design to delivery in 12 days, FedEx to US warehouse, 5000 units at HK\\$ 8 each, transparent logistics tracking.' },
      { company: 'MOCK - Japan Event Agency', industry: 'Events', quote: 'Calendar printing MOQ 1000 at HK\\$ 4 each, 30% cheaper than e-print, delivered before October peak season.' }
    ],"""
new_en_testi = """    industries: [
      { iconKey: 'fnb', name: 'Food & Beverage', desc: 'Restaurants & delivery platforms' },
      { iconKey: 'retail', name: 'Retail & Boutique', desc: 'Brick-and-mortar stores & counters' },
      { iconKey: 'ecommerce', name: 'Cross-border E-com', desc: 'DTC brands & Amazon FBA' },
      { iconKey: 'beauty', name: 'Beauty & Skincare', desc: 'Skincare & cosmetics' },
      { iconKey: 'education', name: 'Education & Training', desc: 'Schools & training institutes' },
      { iconKey: 'wedding', name: 'Weddings & Events', desc: 'Weddings & corporate events' },
      { iconKey: 'creator', name: 'Creator IP', desc: 'Designers & artists' },
      { iconKey: 'pet', name: 'Pet Industry', desc: 'Pet food & supplies' },
      { iconKey: 'baby', name: 'Baby & Maternity', desc: 'Baby & pregnancy products' },
      { iconKey: 'beverage', name: 'Tea & Beverage', desc: 'Tea brands & F&B' },
      { iconKey: 'logistics', name: 'Logistics', desc: 'Shipping labels & logistics' },
      { iconKey: 'apparel', name: 'Apparel & Footwear', desc: 'Fashion & sports brands' }
    ],"""
assert old_en_testi in content, 'en testimonials not found'
content = content.replace(old_en_testi, new_en_testi, 1)
print('[fix3] en testimonials -> 12 industries')

# ja
content = content.replace(
    "testimonialSubtitle: '実際のお客様のフィードバック (MOCK 占位、K3 撮影後に実際のロゴ・コメントと差し替え)',",
    "testimonialSubtitle: '12 業種のクライアントにサービス提供 · 累計 1,000 社以上',",
    1
)
old_ja_testi = r"""    testimonials: [
      { company: 'MOCK - 香港レストランチェーン', industry: '飲食', quote: 'チラシの品質が予想以上。3000 枚で HK\\$ 1,200、厚手の紙で色鮮明、お客様の写真投稿率が 40% アップ。' },
      { company: 'MOCK - 米国 DTC 美容ブランド', industry: 'DTC 美容', quote: 'カスタムパッケージがデザインから配送まで 12 日、FedEx で米国倉庫へ、5000 個で HK\\$ 8/個、物流追跡も透明。' },
      { company: 'MOCK - 日本イベント企画会社', industry: 'イベント', quote: 'カレンダー印刷 1000 部起で HK\\$ 4/部、e-print より 30% 安、10 月繁忙期前准时納品。' }
    ],"""
new_ja_testi = """    industries: [
      { iconKey: 'fnb', name: '飲食・テイクアウト', desc: 'レストラン・出前プラットフォーム' },
      { iconKey: 'retail', name: '小売・精品', desc: '実店舗・ブランドカウンター' },
      { iconKey: 'ecommerce', name: '越境 EC', desc: 'DTC ブランド・Amazon FBA' },
      { iconKey: 'beauty', name: '美容・スキンケア', desc: 'スキンケア・化粧品' },
      { iconKey: 'education', name: '教育・研修', desc: '学校・研修機関' },
      { iconKey: 'wedding', name: '結婚・イベント', desc: '結婚式・企業イベント' },
      { iconKey: 'creator', name: 'クリエイター IP', desc: 'デザイナー・アーティスト' },
      { iconKey: 'pet', name: 'ペット業界', desc: 'ペットフード・用品' },
      { iconKey: 'baby', name: 'ベビー・マタニティ', desc: '乳幼児・妊産婦向け' },
      { iconKey: 'beverage', name: 'お茶・飲料', desc: 'お茶ブランド・食品' },
      { iconKey: 'logistics', name: '物流・配送', desc: '配送ラベル・物流' },
      { iconKey: 'apparel', name: 'アパレル・靴', desc: 'ファッション・スポーツ' }
    ],"""
assert old_ja_testi in content, 'ja testimonials not found'
content = content.replace(old_ja_testi, new_ja_testi, 1)
print('[fix4] ja testimonials -> 12 industries')

# === fix 5: Testimonials section 渲染 ===
old_sec_str = """        {/* 2026-07-30 K4 拍板 2: Testimonials 3 段 mock (K3 拍图后替换为真实客户) */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3 text-center">{t.testimonialTitle}</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">{t.testimonialSubtitle}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {t.testimonials.map((tm, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-[#2873F5] text-3xl font-serif mb-2">"</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{tm.quote}</p>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="font-bold text-[#333333] text-sm">{tm.company}</div>
                    <div className="text-gray-500 text-xs">{tm.industry}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>"""
new_sec_str = """        {/* 2026-07-31 K3 拍板 A: 12 Tier A 行业 icon 卡片 (删 MOCK 占位, 不走网上搜真实 logo) */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3 text-center">{t.testimonialTitle}</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">{t.testimonialSubtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {t.industries.map((ind, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2873F5]/10 rounded-lg flex items-center justify-center shrink-0 text-[#2873F5]">
                    {INDUSTRY_ICONS[ind.iconKey]}
                  </div>
                  <div>
                    <div className="font-bold text-[#333333] text-sm">{ind.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{ind.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-8">累計 1,000+ 企業客戶 · 50+ 國家 · 15+ 年印刷經驗</p>
          </div>
        </section>"""
assert old_sec_str in content, 'Testimonials section not found'
content = content.replace(old_sec_str, new_sec_str, 1)
print('[fix5] Testimonials section -> 12 industries grid')

# === fix 6: 加 INDUSTRY_ICONS map ===
old_t_str = "  const t = translations[locale];\n"
new_t_str = """  // 2026-07-31 K3 拍板 A: 12 行业 icon map (zh-hk/en/ja 共享 icon, 名字各自本地化)
  const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
    fnb: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v6H3V3zm0 12h18v6H3v-6zm6-9v3m6-3v3" /></svg>,
    retail: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4l1-12z" /></svg>,
    ecommerce: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h13" /></svg>,
    beauty: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    education: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" /></svg>,
    wedding: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    creator: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485" /></svg>,
    pet: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9" /></svg>,
    baby: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>,
    beverage: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    logistics: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
    apparel: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
  };
  const t = translations[locale];
"""
assert old_t_str in content, 'const t = translations[locale] not found'
content = content.replace(old_t_str, new_t_str, 1)
print('[fix6] component 加 INDUSTRY_ICONS map')

# 写
with io.open(ABOUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
print('\n[done] about/page.tsx saved')

# 验证
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    new_content = f.read()
print(f'  size: {len(new_content)} bytes')
print(f'  MOCK occurrences: {new_content.count("MOCK")}')
print(f'  factory-banner.webp: {new_content.count("factory-banner.webp")}')
print(f'  INDUSTRY_ICONS: {new_content.count("INDUSTRY_ICONS")}')
print(f'  industries array: {new_content.count("industries: [")}')
