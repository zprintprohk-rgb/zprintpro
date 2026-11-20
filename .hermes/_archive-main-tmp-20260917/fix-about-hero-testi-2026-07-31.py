# -*- coding: utf-8 -*-
"""
fix-about-hero-testi-2026-07-31.py
K3 11:37 + 11:42 拍板 A:
  1. Hero 改用 factory-banner.webp 背景 (K3 11:37 提议)
  2. Testimonials 改 12 Tier A 行业 icon 卡片 (K3 11:42 拍板 A, 不走网上搜真实 logo)
  3. 删 MOCK 占位字样 (K3 11:37 要求)
"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ABOUT = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    content = f.read()

# === fix 1: Hero 改用 factory-banner.webp ===
# 原:
#       <section className="bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white py-16 md:py-24 max-w-[1320px] mx-auto">
#         <div className="px-4 sm:px-6 lg:px-8 text-center">
#           <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
#           <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
#         </div>
#       </section>
#
# 改: factory-banner.webp + 深色蒙层 + 文字 overlay

old_hero = '''      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white py-16 md:py-24 max-w-[1320px] mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>'''

new_hero = '''      {/* 2026-07-31 K3 拍板 A: Hero 改用 factory-banner.webp 背景 + 深色蒙层 (K3 11:37 提议) */}
      <section className="relative text-white py-20 md:py-32 max-w-[1320px] mx-auto overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/factory/factory-banner.webp"
            alt="ZprintPro 工厂横幅 · 自家廠房實拍"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A4A]/85 to-[#1E3A5F]/80" />
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>'''

assert old_hero in content, 'Hero block not found'
content = content.replace(old_hero, new_hero, 1)
print('[fix1] Hero -> factory-banner.webp background + dark overlay')

# === fix 2: zh-hk testimonials 改 12 Tier A 行业 icon 卡片 ===
# 原 testimonialSubtitle 删 MOCK
# 原 testimonials 3 段 (MOCK - HK Restaurant / MOCK - US DTC / MOCK - Japan Event) 改 12 行业

# zh-hk 替换
old_zh_subtitle = "    testimonialSubtitle: '真實客戶反饋 (MOCK 占位，K3 拍客戶 logo 後替換)',"
new_zh_subtitle = "    testimonialSubtitle: '我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴',"
assert old_zh_subtitle in content
content = content.replace(old_zh_subtitle, new_zh_subtitle, 1)
print('[fix2a] zh-hk testimonialSubtitle MOCK removed')

old_zh_testi = """    testimonials: [
      { company: 'MOCK - 香港某連鎖餐廳', industry: '餐飲', quote: '宣傳單張質量超預期，3000 張只花了 HK\\$ 1,200，紙質厚實色彩鮮明，顧客拍照打卡率提高 40%。' },
      { company: 'MOCK - 美國某 DTC 品牌', industry: '電商美妝', quote: '客製包裝盒從設計到送達只用了 12 天，FedEx 直送美國倉，5000 個 HK\\$ 8/個，物流追蹤透明。' },
      { company: 'MOCK - 日本某活動策劃公司', industry: '活動', quote: '年曆印刷起訂 1000 本 HK\\$ 4/本，比 e-print 便宜 30%，10 月旺季前準時到貨。' }
    ],"""

new_zh_testi = """    industries: [
      { key: 'fnb', name: '餐飲外賣', desc: '餐廳及外賣平台' },
      { key: 'retail', name: '零售精品', desc: '實體店及品牌專櫃' },
      { key: 'ecommerce', name: '跨境電商', desc: 'DTC 品牌及亞馬遜 FBA' },
      { key: 'beauty', name: '美妝護膚', desc: '護膚品及化妝品' },
      { key: 'education', name: '教育培訓', desc: '學校及培訓機構' },
      { key: 'wedding', name: '婚慶活動', desc: '婚禮及商務活動' },
      { key: 'creator', name: '文創 IP', desc: '設計師及藝術家' },
      { key: 'pet', name: '寵物行業', desc: '寵物食品及用品' },
      { key: 'baby', name: '母嬰產品', desc: '嬰幼兒及孕產' },
      { key: 'beverage', name: '茶飲食品', desc: '茶莊及食品品牌' },
      { key: 'logistics', name: '物流快遞', desc: '快遞面單及物流' },
      { key: 'apparel', name: '服裝鞋帽', desc: '時尚及運動品牌' }
    ],"""

assert old_zh_testi in content
content = content.replace(old_zh_testi, new_zh_testi, 1)
print('[fix2b] zh-hk testimonials -> 12 industries array')

# === fix 3: en testimonialSubtitle + testimonials ===
old_en_subtitle = "    testimonialSubtitle: 'Real customer feedback (MOCK placeholder — replace with real client logos/quotes after K3 captures)',"
new_en_subtitle = "    testimonialSubtitle: '12 industry segments served · 1,000+ business clients trusted us',"
assert old_en_subtitle in content
content = content.replace(old_en_subtitle, new_en_subtitle, 1)
print('[fix3a] en testimonialSubtitle MOCK removed')

old_en_testi = """    testimonials: [
      { company: 'MOCK - HK Restaurant Chain', industry: 'F&B', quote: 'Flyer quality exceeded expectations. 3000 pieces for just HK\\$ 1,200, thick paper, vivid colors, customer photo-tagging rate up 40%.' },
      { company: 'MOCK - US DTC Beauty Brand', industry: 'DTC Beauty', quote: 'Custom packaging from design to delivery in 12 days, FedEx to US warehouse, 5000 units at HK\\$ 8 each, transparent logistics tracking.' },
      { company: 'MOCK - Japan Event Agency', industry: 'Events', quote: 'Calendar printing MOQ 1000 at HK\\$ 4 each, 30% cheaper than e-print, delivered before October peak season.' }
    ],"""

new_en_testi = """    industries: [
      { key: 'fnb', name: 'Food & Beverage', desc: 'Restaurants & delivery platforms' },
      { key: 'retail', name: 'Retail & Boutique', desc: 'Brick-and-mortar stores & counters' },
      { key: 'ecommerce', name: 'Cross-border E-com', desc: 'DTC brands & Amazon FBA' },
      { key: 'beauty', name: 'Beauty & Skincare', desc: 'Skincare & cosmetics' },
      { key: 'education', name: 'Education & Training', desc: 'Schools & training institutes' },
      { key: 'wedding', name: 'Weddings & Events', desc: 'Weddings & corporate events' },
      { key: 'creator', name: 'Creator IP', desc: 'Designers & artists' },
      { key: 'pet', name: 'Pet Industry', desc: 'Pet food & supplies' },
      { key: 'baby', name: 'Baby & Maternity', desc: 'Baby & pregnancy products' },
      { key: 'beverage', name: 'Tea & Beverage', desc: 'Tea brands & F&B' },
      { key: 'logistics', name: 'Logistics', desc: 'Shipping labels & logistics' },
      { key: 'apparel', name: 'Apparel & Footwear', desc: 'Fashion & sports brands' }
    ],"""

assert old_en_testi in content
content = content.replace(old_en_testi, new_en_testi, 1)
print('[fix3b] en testimonials -> 12 industries array')

# === fix 4: ja testimonialSubtitle + testimonials ===
old_ja_subtitle = "    testimonialSubtitle: '実際のお客様のフィードバック (MOCK 占位、K3 撮影後に実際のロゴ・コメントと差し替え)',"
new_ja_subtitle = "    testimonialSubtitle: '12 業種のクライアントにサービス提供 · 累計 1,000 社以上',"
assert old_ja_subtitle in content
content = content.replace(old_ja_subtitle, new_ja_subtitle, 1)
print('[fix4a] ja testimonialSubtitle MOCK removed')

old_ja_testi = """    testimonials: [
      { company: 'MOCK - 香港レストランチェーン', industry: '飲食', quote: 'チラシの品質が予想以上。3000 枚で HK\\$ 1,200、厚手の紙で色鮮明、お客様の写真投稿率が 40% アップ。' },
      { company: 'MOCK - 米国 DTC 美容ブランド', industry: 'DTC 美容', quote: 'カスタムパッケージがデザインから配送まで 12 日、FedEx で米国倉庫へ、5000 個で HK\\$ 8/個、物流追跡も透明。' },
      { company: 'MOCK - 日本イベント企画会社', industry: 'イベント', quote: 'カレンダー印刷 1000 部起で HK\\$ 4/部、e-print より 30% 安、10 月繁忙期前准时納品。' }
    ],"""

new_ja_testi = """    industries: [
      { key: 'fnb', name: '飲食・テイクアウト', desc: 'レストラン・出前プラットフォーム' },
      { key: 'retail', name: '小売・精品', desc: '実店舗・ブランドカウンター' },
      { key: 'ecommerce', name: '越境 EC', desc: 'DTC ブランド・Amazon FBA' },
      { key: 'beauty', name: '美容・スキンケア', desc: 'スキンケア・化粧品' },
      { key: 'education', name: '教育・研修', desc: '学校・研修機関' },
      { key: 'wedding', name: '結婚・イベント', desc: '結婚式・企業イベント' },
      { key: 'creator', name: 'クリエイター IP', desc: 'デザイナー・アーティスト' },
      { key: 'pet', name: 'ペット業界', desc: 'ペットフード・用品' },
      { key: 'baby', name: 'ベビー・マタニティ', desc: '乳幼児・妊産婦向け' },
      { key: 'beverage', name: 'お茶・飲料', desc: 'お茶ブランド・食品' },
      { key: 'logistics', name: '物流・配送', desc: '配送ラベル・物流' },
      { key: 'apparel', name: 'アパレル・靴', desc: 'ファッション・スポーツ' }
    ],"""

assert old_ja_testi in content
content = content.replace(old_ja_testi, new_en_testi.replace('en', 'ja').replace('12 industry segments served · 1,000+ business clients trusted us', '12 業種のクライアントにサービス提供 · 累計 1,000 社以上') if False else new_ja_testi, 1)
print('[fix4b] ja testimonials -> 12 industries array')

# === fix 5: 改 testimonials section 渲染 (L373-391) 用 industries 数组 ===
old_section = """        {/* 2026-07-30 K4 拍板 2: Testimonials 3 段 mock (K3 拍图后替换为真实客户) */}
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

# 12 行业 icon 用 Lucide React (现有依赖), 但 page.tsx 没用 lucide-react 之前, 用 inline SVG
INDUSTRY_ICONS = {
    'fnb': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l1.5 1.5M6 3l-3 3 3 3M3 6h12M9 3v3a3 3 0 003 3v9a3 3 0 01-6 0V3" /></svg>',
    'retail': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',
    'ecommerce': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.705 11l.707-7A2 2 0 0110.41 2h3.18a2 2 0 011.998 1.992l.707 7M7 11h10v8a1 1 0 01-1 1H8a1 1 0 01-1-1v-8z" /></svg>',
    'beauty': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>',
    'education': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-3 6h.008" /></svg>',
    'wedding': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>',
    'creator': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>',
    'pet': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>',
    'baby': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
    'beverage': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    'logistics': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>',
    'apparel': '<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>',
}

# 12 行业 cards HTML
industries_jsx = ''
for key, name_desc in {
    'fnb': ('餐飲外賣', '餐廳及外賣平台', INDUSTRY_ICONS['fnb']),
    'retail': ('零售精品', '實體店及品牌專櫃', INDUSTRY_ICONS['retail']),
    'ecommerce': ('跨境電商', 'DTC 品牌及亞馬遜 FBA', INDUSTRY_ICONS['ecommerce']),
    'beauty': ('美妝護膚', '護膚品及化妝品', INDUSTRY_ICONS['beauty']),
    'education': ('教育培訓', '學校及培訓機構', INDUSTRY_ICONS['education']),
    'wedding': ('婚慶活動', '婚禮及商務活動', INDUSTRY_ICONS['wedding']),
    'creator': ('文創 IP', '設計師及藝術家', INDUSTRY_ICONS['creator']),
    'pet': ('寵物行業', '寵物食品及用品', INDUSTRY_ICONS['pet']),
    'baby': ('母嬰產品', '嬰幼兒及孕產', INDUSTRY_ICONS['baby']),
    'beverage': ('茶飲食品', '茶莊及食品品牌', INDUSTRY_ICONS['beverage']),
    'logistics': ('物流快遞', '快遞面單及物流', INDUSTRY_ICONS['logistics']),
    'apparel': ('服裝鞋帽', '時尚及運動品牌', INDUSTRY_ICONS['apparel']),
}.items():
    nm, desc, ic = name_desc
    industries_jsx += f'''        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2873F5]/10 rounded-lg flex items-center justify-center shrink-0 text-[#2873F5]">
            {ic}
          </div>
          <div>
            <div className="font-bold text-[#333333] text-sm">{{ind.name}}</div>
            <div className="text-gray-500 text-xs mt-0.5">{{ind.desc}}</div>
          </div>
        </div>
'''

# 简化: industries 12 项的图标直接 inline 12 个 SVG (避免 t.industries.find 复杂度)
# 但 industries 是 zh-hk en ja 3 locale 不同, 名字 + desc 不同, icon 相同 (SVG)
# 所以用 t.industries 数组 + render 时按 key 选 icon

new_section_template = """        {/* 2026-07-31 K3 拍板 A: Testimonials 改 12 Tier A 行业 icon 卡片 (删 MOCK 占位, 不走网上搜真实 logo) */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3 text-center">{t.testimonialTitle}</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">{t.testimonialSubtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {t.industries.map((ind, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2873F5]/10 rounded-lg flex items-center justify-center shrink-0 text-[#2873F5]">
                    {ind.icon}
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

# 但 t.industries 现在没 icon 字段, 改 industries 数组加入 icon (用 JSX 字符串)
# 实际更优: industries 数据结构里加 icon (svg path), render 时动态渲染
# 但 industries 数据在 translations 对象里, 不能直接放 JSX (TS 不支持)

# 改方案: industries 加 iconKey 字段, render 时用 map[iconKey] 选 SVG
# 但 TSX 里这个 map 要在 component 内定义

# 简化: 直接放 12 个 SVG 字符串作为字面量
# 但 12 个 locale 都要 12 SVG, 工作量大
# 改: icon 放 JSX 字符串, 用 12 个 if/else 或 map

# 最简单: 在 component 里建 iconMap = { fnb: <svg>...}, industries 加 iconKey 字段
# industries 数组里加 iconKey, render ind.iconKey ? iconMap[ind.iconKey] : null
# 但 iconKey 在 3 locale 都是 fnb/retail/..., 通用

# 实现:
# 1. component 加 iconMap
# 2. industries 数组加 iconKey 字段
# 3. render 改用 ind.iconKey

# 这样改动比较大. 简化: 写 12 个独立 div, 每个 div 写死 zh-hk 名字 + icon
# 实际 3 locale 不同名, 不能写死.
# 唯一方案: industries 加 iconKey, render 用 map

# 改 strategy: industries 数组加 iconKey, component 加 INDUSTRY_ICONS_MAP
# 这样 3 locale 共享 icon (iconKey 相同), 名字 + desc 各自本地化

# 改 industries 数组 (3 locale)
# 之前已经加 industries 数组 (无 iconKey), 现在再加 iconKey 字段

# zh-hk industries 加 iconKey
content = content.replace(
    """    industries: [
      { key: 'fnb', name: '餐飲外賣', desc: '餐廳及外賣平台' },
      { key: 'retail', name: '零售精品', desc: '實體店及品牌專櫃' },""",
    """    industries: [
      { iconKey: 'fnb', name: '餐飲外賣', desc: '餐廳及外賣平台' },
      { iconKey: 'retail', name: '零售精品', desc: '實體店及品牌專櫃' },""",
    1
)
# 简单 1 次替换, 后面 10 个 key 也用同样 pattern, 再单独替换 (用 iconKey 替换 key)
# 或者: 一次性 regex 替换所有 12 个 key -> iconKey
import re
content = re.sub(r"\{ key: '(\w+)', name:", r"{ iconKey: '\1', name:", content)
print('[fix5a] industries 数组 key -> iconKey (3 locale)')

# 在 component 里加 INDUSTRY_ICONS_MAP + 改 render
# 在 const t = translations[locale]; 之前加
old_team_start = "  const t = translations[locale];\n"
new_team_start = """  // 2026-07-31 K3 拍板 A: 12 行业 icon map (zh-hk/en/ja 共享 icon, 名字各自本地化)
  const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
    fnb: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    retail: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    ecommerce: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.705 11l.707-7A2 2 0 0110.41 2h3.18a2 2 0 011.998 1.992l.707 7" /></svg>,
    beauty: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    education: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
    wedding: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    creator: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    pet: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20" /></svg>,
    baby: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    beverage: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    logistics: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" /></svg>,
    apparel: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
  };
  const t = translations[locale];
"""

# 找 const t = translations[locale]; 这一行
import re
m = re.search(r"  const t = translations\[locale\];\n", content)
if m:
    content = content[:m.start()] + new_team_start + content[m.end():]
    print('[fix5b] component 加 INDUSTRY_ICONS map')

# 改 render: testimonials 12 行业 card
# 找 testimonials section
old_section_pattern = re.compile(
    r"        \{/\* 2026-07-30 K4 拍板 2: Testimonials 3 段 mock \(K3 拍图后替换为真实客户\) \*/\}.*?</section>\n",
    re.DOTALL
)
m_sec = old_section_pattern.search(content)
if m_sec:
    new_section = """        {/* 2026-07-31 K3 拍板 A: 12 Tier A 行业 icon 卡片 (删 MOCK 占位, 不走网上搜真实 logo) */}
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
        </section>
"""
    content = content[:m_sec.start()] + new_section + content[m_sec.end():]
    print('[fix5c] Testimonials section -> 12 industries grid')

# 写
with io.open(ABOUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
print('\n[done] about/page.tsx saved')
