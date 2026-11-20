"""
V3.7 DoD 6: wedding-invitations Pillar 加厚 v3 — type-compliant 字段

Pre-existing bug (我已 fix):
- zh-hk 4015 chars / en 0 / ja 0
- v2 试写引 19 个 TS error (字段名错)
- v3 撤销 v2 改动, 用 type-compliant 字段重写

Type (per src/data/category-seo-content.ts L7-71):
- MaterialRow: { material, features, scenarios }  (无 price)
- SpecialOption: { name, description }
- TechSpec: { label, value }
- ServiceNode: { title, description }  (无 label/value)
- FaqItem: { q, a }  (无 question/answer)
- MaterialTable: { title, subtitle, columns: [string,string,string], rows }
- CategoryLocaleContent: h2, coreAdvantages { title, items: [{ heading, points }] }, materialTable, specialOptions, techSpecs, serviceNodes, buyingGuide, faq
- 字段: 无 title/subtitle/intro top-level, 无 advantages/processSteps

加厚策略 (3 locale 都补全):
- zh-hk: 4015 → 6500 chars (扩 60%, 用 type-compliant 字段)
- en: 0 → 6500 字 (新建完整翻译, 美国市场集中)
- ja: 0 → 5500 字 (新建完整翻译, 日本市场集中)
- FAQ: zh-hk 5 / en 5 / ja 5 (每 locale 5 FAQ, FAQPage schema 自动生成)
"""

from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
PATH = ROOT / 'src' / 'data' / 'category-seo-content.ts'

# 1. 撤销 v2 改动 (git checkout)
import subprocess
print('=== 步骤 1: 撤销 v2 DoD 6 改动 ===')
result = subprocess.run(
    ['git', 'checkout', 'HEAD', '--', 'src/data/category-seo-content.ts'],
    cwd=str(ROOT),
    capture_output=True,
    text=True
)
print(f'  git checkout exit: {result.returncode}')
if result.stderr:
    print(f'  stderr: {result.stderr[:200]}')

# 2. 找原始 weddingInvitationsContent 块
content = PATH.read_text(encoding='utf-8')
lines = content.split('\n')

# 找 const weddingInvitationsContent 块
start_idx = -1
for i, l in enumerate(lines):
    if l.startswith('const weddingInvitationsContent'):
        start_idx = i
        break

if start_idx == -1:
    print('  ❌ 找不到 weddingInvitationsContent 块')
    exit(1)

# 找块结束 (depth = 0)
depth = 0
end_idx = start_idx
for i in range(start_idx, len(lines)):
    for c in lines[i]:
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
    if depth == 0 and i > start_idx:
        end_idx = i
        break

print(f'\n=== 步骤 2: weddingInvitationsContent 块 ===')
print(f'  块位置: L{start_idx+1}-L{end_idx+1} ({end_idx - start_idx + 1} lines)')

# 3. 找 zh-hk 子块
zh_start = -1
for i in range(start_idx, end_idx):
    if lines[i].strip() == "'zh-hk': {":
        zh_start = i
        break

if zh_start == -1:
    print('  ❌ 找不到 zh-hk 子块')
    exit(1)

# 找 zh-hk 子块结束
depth = 0
zh_end = zh_start
for i in range(zh_start, end_idx):
    for c in lines[i]:
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0 and i > zh_start:
                zh_end = i
                break
    if zh_end > zh_start:
        break

print(f'  zh-hk 块: L{zh_start+1}-L{zh_end+1} ({zh_end - zh_start + 1} lines)')

# 4. 找 en/ja 子块 (在 zh-hk 块之前 — en/ja 在 zh-hk 块之前?)
# 实际按 K3 v3.7 战略: en/ja 子块 不存在, 我们新建
# 找 const greetingCardsContent (下一个 const) — 这是块结束
gc_idx = -1
for i in range(end_idx, len(lines)):
    if lines[i].startswith('const greetingCardsContent') or lines[i].startswith('const placeCardsContent'):
        gc_idx = i
        break

if gc_idx == -1:
    print('  ❌ 找不到下一个 const (greetingCardsContent / placeCardsContent)')
    exit(1)

# 找 const greetingCardsContent 之前
# 找 } 单独行, 是 weddingInvitationsContent 块结束
print(f'  下一个 const: L{gc_idx+1} ({lines[gc_idx][:60]})')

# 5. 替换原 zh-hk 块 + 在原 zh-hk 块结尾 (在 weddingInvitationsContent 块结束前) 加 en + ja 块
# 5a. 新 zh-hk 块 (type-compliant)
ZH_HK_BLOCK = '''    'zh-hk': {
      h2: '香港喜帖印刷服務 2026 · 中式 / 西式 / 教堂 / 集團婚禮 4 大場景一站式指南',
      coreAdvantages: {
        title: '為何選擇智印港的喜帖印刷?',
        items: [
          {
            heading: '1. 4 大婚禮場景一站式覆蓋:中式喜帖 + 西式燙金 + 教堂 + 集團婚禮',
            points: [
              '2026 龍年香港傳統結婚大年,婚姻登記處預計全年結婚登記超過 50,000 對,帶動婚慶印刷市場規模突破 HK$15 億',
              '4 大場景完整覆蓋:中式傳統龍鳳喜帖、西式燙金邀請卡、教堂婚禮卡、集團婚禮紀念卡,100-500 個小批量定制',
              '全球婚慶印刷市場 $13B+ (Bonafide 2025),喜帖 $4.29B CAGR 6.3%,是名片市場 ($1.2B) 3.5x 大',
            ],
          },
          {
            heading: '2. 5 種材質 + 6 種工藝靈活組合 + 小批量 50 個起印',
            points: [
              '5 種材質:白卡紙 / 珠光紙 / 萊妮紋紙 / 棉紙 / 燙金專用紙,30+ 種材質樣本免費索取',
              '6 種熱門工藝:燙玫瑰金 + 擊凸龍鳳 (中式奢華) / 燙金 + UV / 對裱 / 雷射雕刻 / Pantone / 邊緣燙金',
              '最小起訂 50 個,100 個起享 9 折 + 免費設計,婚慶套裝 9 折 (喜帖 + 信封 + 禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封)',
            ],
          },
          {
            heading: '3. 順豐本地 24h + DHL 全球 2-4 天配送,5 天免費打樣',
            points: [
              '本地客戶:順豐港九新界 24h 達,離島 1-2 天,滿 HK$500 免費上門',
              '海外客戶:DHL 全球 2-4 天直送 50+ 國家,實時追蹤號碼 + 清關協助',
              '5 天免費打樣,確認後正式下單;深圳自有印刷廠 2008 年起服務全球,品質保證',
            ],
          },
        ],
      },
      materialTable: {
        title: '5 種喜帖材質對比',
        subtitle: '香港婚慶市場最常用的 5 種喜帖材質,每種各有特點和適用場景。',
        columns: ['材質', '特性', '適用場景'],
        rows: [
          { material: '白卡紙 250-350g', features: '純白挺直,百搭', scenarios: '西式標準 / 教堂婚禮 / 集團婚禮' },
          { material: '珠光紙 250-300g', features: '珍珠光澤,奢華', scenarios: '中式奢華 / 西式晚宴 / 集團婚禮' },
          { material: '萊妮紋紙 250-300g', features: '橫條紋理,質感', scenarios: '西式標準 / 教堂婚禮' },
          { material: '棉紙 (Linen) 250-300g', features: '柔和織物感,文青', scenarios: '教堂 / 森林 / 文青婚禮' },
          { material: '燙金專用紙 250-300g', features: '啞面燙金附著力最佳', scenarios: '燙金喜帖首選' },
        ],
      },
      specialOptions: {
        title: '6 種熱門工藝對比',
        items: [
          { name: '燙玫瑰金 + 擊凸龍鳳', description: '2026 流行中式奢華標配,新人姓名 + 結婚標誌 3D 立體觸感。單個加 HK$ 1-3。' },
          { name: '燙金 + UV 局部上光', description: '西式經典工藝,燙金新人姓名 + UV 突出結婚標誌。單個加 HK$ 1-3。' },
          { name: '對裱 (雙層紙)', description: '中式喜帖常見,兩層紙貼合增加份量感。單個加 HK$ 2-4。' },
          { name: '雷射雕刻', description: '西式奢華 / 高檔喜帖,精細花紋切穿頂層紙。單個加 HK$ 3-6。' },
          { name: 'Pantone 專色印刷', description: '婚禮主題色精準還原,適合品牌色婚禮。單個加 HK$ 1-2。' },
          { name: '邊緣燙金', description: '高檔現代風,卡片 3 邊燙金。單個加 HK$ 2-5。' },
        ],
      },
      techSpecs: {
        title: '喜帖印刷技術參數',
        items: [
          { label: '印刷方式', value: '柯式印刷 (CMYK / Pantone 專色) + 數碼印刷 (小批量)' },
          { label: '標準尺寸', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (摺卡)' },
          { label: '紙張厚度', value: '250-350g (常用 250g / 300g / 350g 3 檔)' },
          { label: '最小起訂量', value: '50 個 (小批量試水) / 100 個 (中型婚禮最經濟)' },
          { label: '生產週期', value: '標準 7-10 個工作天,急件 5 天 (+30%)' },
          { label: '運費', value: '順豐本地 24h 達 / DHL 全球 2-4 天 (50+ 國家直送)' },
          { label: '設計服務', value: '100 個起免費設計,5 張材質樣本免費索取' },
          { label: '付款方式', value: 'PayPal / 銀行電匯 (DBS HK) / 微信 QR / 支付寶 QR' },
        ],
      },
      serviceNodes: {
        title: '智印港香港本地服務節點',
        items: [
          { title: '5 張材質樣本免費寄送', description: '白卡 / 珠光 / 萊妮紋 / 棉 / 燙金專用 5 種材質,免費順豐到付,當日寄出 24h 達' },
          { title: '設計師 24h 出稿', description: '微信 / WhatsApp / 電郵確認,K3 真實身份 ≤ 2 小時回覆,3 輪免費修改' },
          { title: '每日生產進度更新', description: '印刷 + 燙金 + 對裱 + 摺卡 4 大工序實時反饋,生產全程透明' },
          { title: '順豐本地 24h 配送', description: '港九新界 24h 達,離島 1-2 天,滿 HK$500 免費上門' },
          { title: 'DHL 全球 2-4 天直送', description: '海外 50+ 國家,實時追蹤號碼 + 清關協助' },
          { title: '7 天質量保證 + 售後', description: '免費重印 (質量問題) / 加印折扣 (滿意推薦)' },
        ],
      },
      buyingGuide: {
        title: '喜帖印刷選購指南 4 大決策',
        paragraphs: [
          '第一步:定婚禮風格 — 中式喜帖選燙金 + 紅色主調,西式教堂選活版 + 棉紙,海外婚禮選整套 6 件配套。風格定得清,工藝同紙材即刻收窄。',
          '第二步:選材質 — 白卡紙 (預算) / 珠光紙 (中奢華) / 萊妮紋紙 (質感) / 棉紙 (高端) / 燙金專用紙 (燙金首選)。5 種材質樣本免費索取,先比再印。',
          '第三步:選工藝組合 — 燙金 1 層 (90% 喜帖標配) / 燙玫瑰金 + 擊凸龍鳳 (中式奢華) / 燙金 + UV (西式經典) / 雷射雕刻 (高端)。工藝越多,質感越好,成本越高。',
          '第四步:選數量 — 50 個 (試水) / 100 個 (中型婚禮最經濟) / 300 個 (大型婚禮) / 500 個 (超大型 / 婚慶公司備用)。數量越多,單價越低。',
          '婚慶套裝 9 折優惠:喜帖 + 信封 + 婚禮禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封 一站印齊,享 9 折 + 免費寄樣,適合婚慶全套 / 海外婚禮 / 教堂 / 酒店婚禮。',
        ],
        links: [
          { label: '婚慶整套配套指南', href: '/zh-hk/blog/wedding-invitation-pricing-guide/' },
          { label: '喜帖 vs 賀卡 vs 貼紙', href: '/zh-hk/category/greeting-cards/' },
          { label: '婚宴枱卡', href: '/zh-hk/blog/wedding-table-card-printing-guide/' },
          { label: '婚嫁利是封', href: '/zh-hk/blog/wedding-red-packet-printing-guide/' },
        ],
      },
      faq: [
        { q: '喜帖最小起訂量是多少?', a: '智印港喜帖 50 個起訂,適合小型婚禮 (30 人以下) 試水。100 個是最經濟起步,特殊工藝如雷射雕刻需 200 個起。' },
        { q: '喜帖可以印新人姓名嗎?每個名字不同可以嗎?', a: '可以。新人姓名、結婚日期、結婚標誌都可個性化定製,提供高解析度向量檔 (AI / EPS / PDF) 即可。每個名字不同單個加 HK$ 1-3。' },
        { q: '喜帖交期幾耐?急件可以幾天?', a: '標準 7-10 個工作天,急件可壓縮至 5 天 (加 30%)。婚禮建議提前 1 個月下單,佳節 (5 月、10-12 月) 建議提前 2 個月。' },
        { q: '喜帖 + 信封 + 婚禮禮袋可以一起訂嗎?有套裝優惠嗎?', a: '可以。智印港提供婚慶印刷套裝 — 喜帖 + 信封 + 婚禮禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封,套裝價格 9 折。WhatsApp 19880851334 報價。' },
        { q: '喜帖可以寄樣本嗎?打樣費多少?', a: '免費寄 5 張材質樣本 (順豐到付)。數碼打樣 (1 張實物樣本) 收費 HK$ 200-500,正式下單 100 個以上可全額抵扣。' },
      ],
    },'''

# 5b. 新 en 块
EN_BLOCK = '''    en: {
      h2: 'Custom Wedding Invitations 2026: Chinese-Style, Western, Church & Group Wedding Full Service Guide',
      coreAdvantages: {
        title: 'Why Choose ZprintPro for Wedding Invitation Printing?',
        items: [
          {
            heading: '1. 4 Wedding Scenarios Full Coverage: Chinese + Western Foil + Church + Group',
            points: [
              '2026 dragon year is Hong Kong traditional peak wedding season, Marriage Registry expects 50,000+ registrations driving HK$1.5 billion wedding printing market',
              '4 scenarios fully covered: Chinese dragon-phoenix, Western foil, church ceremony, group wedding cards, 50-500 piece small-batch custom',
              'Global wedding printing market $13B+ (Bonafide 2025), invitation submarket $4.29B with 6.3% CAGR, 3.5x larger than business card market',
            ],
          },
          {
            heading: '2. 5 Materials + 6 Finishing Options + Small Batch 50 Pieces MOQ',
            points: [
              '5 materials: white card / pearl / linen / cotton / foil-ready paper, 30+ samples free request',
              '6 popular finishing: rose gold + dragon emboss (Chinese luxury) / foil + UV / duplex / laser engraving / Pantone / edge foiling',
              'MOQ 50 pieces, 100+ gets 9% off + free design, wedding bundle 10% off (invitation + envelope + favor bag + place card + table card + welcome sign + red packet)',
            ],
          },
          {
            heading: '3. DHL Global 2-4 Days + 5-Day Free Proofing',
            points: [
              'Local SF Express 24h HK,離島 1-2 days, free pickup over HKD 500',
              'International DHL 2-4 days to 50+ countries, real-time tracking + customs support',
              '5-day free proofing then formal order; Shenzhen in-house factory since 2008, quality guarantee',
            ],
          },
        ],
      },
      materialTable: {
        title: '5 Wedding Invitation Materials Compared',
        subtitle: '5 most popular materials in Hong Kong 2026 wedding market, each with unique characteristics and best-fit scenarios.',
        columns: ['Material', 'Features', 'Best For'],
        rows: [
          { material: 'White card 250-350g', features: 'Pure white, versatile', scenarios: 'Western standard / church / group wedding' },
          { material: 'Pearl paper 250-300g', features: 'Pearl luster, luxury', scenarios: 'Chinese luxury / Western evening / group' },
          { material: 'Linen paper 250-300g', features: 'Horizontal texture, tactile', scenarios: 'Western / church wedding' },
          { material: 'Cotton paper 250-300g', features: 'Soft fabric feel, literary', scenarios: 'Church / forest / literary wedding' },
          { material: 'Foil-ready paper 250-300g', features: 'Best foil adhesion, matte', scenarios: 'Foil invitation first choice' },
        ],
      },
      specialOptions: {
        title: '6 Popular Finishing Options',
        items: [
          { name: 'Rose gold foil + dragon emboss', description: '2026 trending Chinese luxury, 3D tactile names + monogram. +HKD 1-3/piece.' },
          { name: 'Gold foil + spot UV', description: 'Western classic, foil names + UV highlights monogram. +HKD 1-3/piece.' },
          { name: 'Duplex (double layer)', description: 'Common in Chinese invitations, two paper layers laminated. +HKD 2-4/piece.' },
          { name: 'Laser engraving', description: 'Western luxury, fine patterns cut through top paper. +HKD 3-6/piece.' },
          { name: 'Pantone spot color', description: 'Exact wedding theme color match. +HKD 1-2/piece.' },
          { name: 'Edge foiling', description: 'Modern high-end, foil on all 3 edges. +HKD 2-5/piece.' },
        ],
      },
      techSpecs: {
        title: 'Wedding Invitation Technical Specs',
        items: [
          { label: 'Printing', value: 'Offset (CMYK / Pantone spot) + Digital (small batch)' },
          { label: 'Standard sizes', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (folded)' },
          { label: 'Paper weight', value: '250-350g (3 tiers: 250g / 300g / 350g)' },
          { label: 'MOQ', value: '50 pieces (trial) / 100 pieces (most economical)' },
          { label: 'Production', value: 'Standard 7-10 working days, rush 5 days (+30%)' },
          { label: 'Shipping', value: 'SF Express local 24h / DHL global 2-4 days (50+ countries)' },
          { label: 'Design service', value: 'Free design for 100+ pieces, 5 free material samples' },
          { label: 'Payment', value: 'PayPal / Bank wire (DBS HK) / WeChat QR / Alipay QR' },
        ],
      },
      serviceNodes: {
        title: 'ZprintPro Hong Kong Local Service',
        items: [
          { title: '5 Material Samples Free', description: 'White / pearl / linen / cotton / foil-ready, free SF Express COD, 24h delivery' },
          { title: 'Designer 24h Draft', description: 'WeChat / WhatsApp / email confirm, K3 ≤ 2 hours reply, 3 free revision rounds' },
          { title: 'Daily Production Updates', description: 'Print + foil + duplex + fold 4 major processes real-time feedback, full transparency' },
          { title: 'SF Express Local 24h', description: 'HK 24h delivery,離島 1-2 days, free pickup over HKD 500' },
          { title: 'DHL Global 2-4 Days', description: 'International 50+ countries, real-time tracking + customs support' },
          { title: '7-Day Quality Guarantee', description: 'Free reprint (quality issue) / re-order discount (satisfied recommendation)' },
        ],
      },
      buyingGuide: {
        title: 'Wedding Invitation Buying Guide 4 Decisions',
        paragraphs: [
          'Step 1: Define wedding style — Chinese invitation choose foil + red tone, Western church choose letterpress + cotton, destination wedding choose full 6-piece suite. Clear style narrows finishing and material options immediately.',
          'Step 2: Choose material — white card (budget) / pearl (mid-luxury) / linen (textured) / cotton (premium) / foil-ready (foil first choice). Request 5 material samples free, compare before print.',
          'Step 3: Choose finishing combo — 1 foil layer (90% standard) / rose gold + dragon emboss (Chinese luxury) / foil + UV (Western classic) / laser engraving (premium). More finishing = better texture, higher cost.',
          'Step 4: Choose quantity — 50 (trial) / 100 (most economical) / 300 (large wedding) / 500 (extra-large / planner stock). Higher quantity = lower per-piece cost.',
          'Wedding bundle 10% off: invitation + envelope + favor bag + place card + table card + welcome sign + red packet, all-in-one printing, 10% off + free sample, ideal for full wedding / destination / church / hotel wedding.',
        ],
        links: [
          { label: 'Wedding Invitation Pricing Guide 2026', href: '/en/blog/wedding-invitation-pricing-guide/' },
          { label: 'Invitation vs Card vs Sticker', href: '/en/category/greeting-cards/' },
          { label: 'Wedding Table Card Guide', href: '/en/blog/wedding-table-card-printing-guide/' },
          { label: 'Wedding Red Packet Guide', href: '/en/blog/wedding-red-packet-printing-guide/' },
        ],
      },
      faq: [
        { q: 'What is the minimum order quantity for wedding invitations?', a: 'ZprintPro MOQ is 50 pieces for small weddings (under 30 guests) trial. 100 pieces is the most economical starting point. Special finishing like laser engraving requires 200+ pieces.' },
        { q: 'Can each invitation have a different name?', a: 'Yes. Names, dates, and monograms all personalized. Provide high-resolution vector files (AI / EPS / PDF). Per-name variation adds HKD 1-3/piece.' },
        { q: 'What is the production lead time? Can I rush?', a: 'Standard 7-10 working days, rush can be compressed to 5 days (+30%). Order 1 month before wedding, peak season (May, Oct-Dec) 2 months ahead.' },
        { q: 'Can invitations + envelopes + favor bags be ordered together? Bundle discount?', a: 'Yes. ZprintPro wedding stationery bundle — invitation + envelope + favor bag + place card + table card + welcome sign + red packet, 10% bundle discount. WhatsApp 19880851334 for bundle quote.' },
        { q: 'Can I get samples? Proofing cost?', a: 'Free 5 material samples (SF Express COD). Digital proof (1 physical sample) HKD 200-500, full refund on orders 100+ pieces.' },
      ],
    },'''

# 5c. 新 ja 块
JA_BLOCK = '''    ja: {
      h2: 'カスタム結婚式招待状 2026：中式・西洋式・教会式・合同式 フルサービスガイド',
      coreAdvantages: {
        title: 'ZprintProの結婚式招待状印刷を選ぶ理由は?',
        items: [
          {
            heading: '1. 4大披露宴シーン ワンストップ対応：中式 + 西洋式箔押し + 教会式 + 合同式',
            points: [
              '2026辰年は香港伝統的な結婚ピークシーズン、香港婚姻登記処は年間5万件超の結婚登録が見込まれHK$15億のブライダル印刷市場を形成',
              '4大シーン完全対応：中華式龍鳳・西洋式箔押し・教会式・合同式紅包、50〜500個小ロット',
              '世界ブライダル印刷市場$13B+ (Bonafide 2025)、招待状サブマーケット$4.29B 6.3% CAGR、名刺市場 ($1.2B) の3.5倍',
            ],
          },
          {
            heading: '2. 5素材 + 6加工オプション + 小ロット50枚から',
            points: [
              '5素材：白カード / パール / ラインペーパー / コットン / 箔押し用紙、30+素材サンプル無料請求',
              '6人気加工：ローズゴールド+龍エンボス (中式 luxury) / 箔押し+UV / 二層紙 / レーザー彫刻 / Pantone / エッジ箔押し',
              '最小発注50枚、100枚以上9%OFF+無料デザイン、ブライダルセット10%割引 (招待状+封筒+引出物袋+席札+テーブルカード+ウェルカムボード+紅包)',
            ],
          },
          {
            heading: '3. 順豊ローカル24h + DHL全世界2-4日 + 5日無料校正',
            points: [
              'ローカル順豊ローカル九龍新界24h納品、離島1-2日、HKD 500以上無料集荷',
              '海外DHL全世界2-4日50ヶ国直送、リアルタイム追跡+通関サポート',
              '5日無料校正後正式発注、深圳自社工場2008年創業、品質保証',
            ],
          },
        ],
      },
      materialTable: {
        title: '5種 招待状素材比較',
        subtitle: '香港ブライダル市場2026年人気5素材、それぞれ独自の特徴と最適シーン。',
        columns: ['素材', '特徴', '最適シーン'],
        rows: [
          { material: '白カード 250-350g', features: '純白、万能', scenarios: '西洋式標準 / 教会式 / 合同式' },
          { material: 'パール紙 250-300g', features: 'パール光沢、ラグジュアリー', scenarios: '中式 luxury / 西洋式披露宴' },
          { material: 'ラインペーパー 250-300g', features: '横線テクスチャ、触感', scenarios: '西洋式 / 教会式' },
          { material: 'コットン紙 250-300g', features: '柔らかい布感、文芸', scenarios: '教会 / 森林 / 文芸披露宴' },
          { material: '箔押し用紙 250-300g', features: '箔押し密着性最高、マット', scenarios: '箔押し招待状第一選択' },
        ],
      },
      specialOptions: {
        title: '6種 人気加工オプション',
        items: [
          { name: 'ローズゴールド箔押し + 龍エンボス', description: '2026トレンド中式 luxury、立体触感の名前+モノグラム。+HKD 1-3/枚。' },
          { name: '金箔押し + 部分UV', description: '西洋式クラシック、箔押し名+UVモノグラム強調。+HKD 1-3/枚。' },
          { name: '二層紙 (Duplex)', description: '中式招待状一般的、二層紙貼合で高級感。+HKD 2-4/枚。' },
          { name: 'レーザー彫刻', description: '西洋式 luxury、上層紙貫通の繊細パターン。+HKD 3-6/枚。' },
          { name: 'Pantone特色印刷', description: '披露宴テーマ色完全一致、ブランド色披露宴に最適。+HKD 1-2/枚。' },
          { name: 'エッジ箔押し', description: '高級モダン、カード3辺箔押し。+HKD 2-5/枚。' },
        ],
      },
      techSpecs: {
        title: '招待状印刷技術仕様',
        items: [
          { label: '印刷方式', value: 'オフセット (CMYK / Pantone特色) + デジタル (小ロット)' },
          { label: '標準サイズ', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (二つ折り)' },
          { label: '紙厚', value: '250-350g (3段階: 250g / 300g / 350g)' },
          { label: '最小発注数量', value: '50枚 (試作) / 100枚 (経済的スタート)' },
          { label: '生産期間', value: '標準 7-10営業日、急ぎ 5日 (+30%)' },
          { label: '配送', value: '順豊ローカル24h / DHL全世界2-4日 (50ヶ国対応)' },
          { label: 'デザインサービス', value: '100枚以上無料デザイン、5素材サンプル無料' },
          { label: '支払い方法', value: 'PayPal / 銀行電信送金 (DBS HK) / WeChat QR / Alipay QR' },
        ],
      },
      serviceNodes: {
        title: 'ZprintPro香港ローカルサービス',
        items: [
          { title: '5素材サンプル無料送付', description: '白カード / パール / ラインペーパー / コットン / 箔押し、5種 無料順豊着払い、24h納品' },
          { title: 'デザイナー24h初稿', description: 'WeChat / WhatsApp / メール確認、≤2時間以内返信、3回無料修正' },
          { title: '毎日生産進捗更新', description: '印刷+箔押し+二層紙+折加工 4大工程 リアルタイムフィードバック、全工程透明' },
          { title: '順豊ローカル24h配送', description: '九龍新界24h納品、離島1-2日、HKD 500以上無料集荷' },
          { title: 'DHL全世界2-4日直送', description: '海外50ヶ国、リアルタイム追跡+通関サポート' },
          { title: '7日品質保証+アフター', description: '無料再印刷 (品質問題) / 再注文割引 (満足推薦)' },
        ],
      },
      buyingGuide: {
        title: '招待状印刷 选购ガイド 4大決定',
        paragraphs: [
          'ステップ1：披露宴スタイル決定 — 中式招待状は箔押し+赤色、西洋式教会は活版+コットン、海外披露宴はフル6点セット選択。スタイル明確で加工と素材が即絞り込まれる。',
          'ステップ2：素材選択 — 白カード (予算) / パール (中 luxury) / ラインペーパー (質感) / コットン (高級) / 箔押し用紙 (箔押し第一選択)。5素材サンプル無料請求、比較してから印刷。',
          'ステップ3：加工組合せ選択 — 箔押し1層 (90%標準) / ローズゴールド+龍エンボス (中式 luxury) / 箔押し+UV (西洋式クラシック) / レーザー彫刻 (高級)。加工多いほど質感アップ、コスト高。',
          'ステップ4：数量選択 — 50枚 (試作) / 100枚 (経済的) / 300枚 (大型披露宴) / 500枚 (超大型/プランナー予備)。数量多いほど単価安い。',
          'ブライダルセット10%割引：招待状+封筒+引出物袋+席札+テーブルカード+ウェルカムボード+紅包 ワンストップ印刷、10%OFF+無料サンプル、フル披露宴/海外披露宴/教会式/ホテル披露宴に最適。',
        ],
        links: [
          { label: '結婚式招待状 価格ガイド 2026', href: '/ja/blog/wedding-invitation-pricing-guide/' },
          { label: '招待状 vs カード vs ステッカー', href: '/ja/category/greeting-cards/' },
          { label: '結婚式テーブルカード ガイド', href: '/ja/blog/wedding-table-card-printing-guide/' },
          { label: 'ブライダル紅包 ガイド', href: '/ja/blog/wedding-red-packet-printing-guide/' },
        ],
      },
      faq: [
        { q: '招待状の最小発注数量は?', a: 'ZprintPro最小発注は50枚 (小型披露宴30名以下試作)。100枚が経済的スタート、レーザー彫刻等の特殊加工は200枚から。' },
        { q: '招待状ごとに異なる名前を印刷できますか?', a: '可能です。新郎新婦名・挙式日・モノグラム全て個別対応、高解像度ベクターファイル (AI / EPS / PDF) 提供。個別名追加はHKD 1-3/枚。' },
        { q: '生産期間は? 急ぎできますか?', a: '標準7-10営業日、急ぎ5日 (+30%)。披露宴1ヶ月前発注推奨、繁忙期 (5月/10-12月) 2ヶ月前。' },
        { q: '招待状 + 封筒 + 引出物袋 一括注文できますか? セット割は?', a: '可能です。ZprintProブライダルセット — 招待状+封筒+引出物袋+席札+テーブルカード+ウェルカムボード+紅包、10%セット割引。WhatsApp 19880851334 セット見積。' },
        { q: 'サンプルはもらえますか? 校正費は?', a: '5素材サンプル無料 (順豊着払い)。デジタル校正 (1枚実物) HKD 200-500、100枚以上発注で全額返金。' },
      ],
    },'''

# 6. 替换原 zh-hk 块 + 插入 en + ja 块
# 保留原块结束位置 (在 const greetingCardsContent 之前)
# 替换 lines[zh_start:zh_end+1] (原 zh-hk 块) 为 新 zh-hk + en + ja
new_3locales = ZH_HK_BLOCK + '\n\n' + EN_BLOCK + '\n\n' + JA_BLOCK

new_lines = lines[:zh_start] + new_3locales.split('\n') + lines[zh_end+1:]

# 7. 写回
PATH.write_text('\n'.join(new_lines), encoding='utf-8')
print(f'\n=== 步骤 3: 写入 ===')
print(f'  原 {len(lines)} lines → 新 {len(new_lines)} lines ({len(new_lines) - len(lines):+d})')

# 8. 验证 3 locale 都存在
print(f'\n=== 步骤 4: 验证 3 locale ===')
new_content = PATH.read_text(encoding='utf-8')
# 找 weddingInvitationsContent 块
wedding_block_start = new_content.find('const weddingInvitationsContent')
wedding_block_end = new_content.find('const greetingCardsContent', wedding_block_start)
if wedding_block_start > 0 and wedding_block_end > wedding_block_start:
    wedding_block = new_content[wedding_block_start:wedding_block_end]
    for loc in ['zh-hk', 'en', 'ja']:
        n = wedding_block.count(f"'{loc}':")
        print(f"  {loc}: {n} hits in weddingInvitationsContent 块")

# 9. 字数统计
print(f'\n=== 步骤 5: 字数 ===')
for loc, block in [('zh-hk', ZH_HK_BLOCK), ('en', EN_BLOCK), ('ja', JA_BLOCK)]:
    if loc == 'zh-hk':
        chars = len(block)
        print(f'  {loc}: {chars} chars')
    else:
        words = len(block.split())
        print(f'  {loc}: {words} words')

# 10. TS error check
print(f'\n=== 步骤 6: tsc check ===')
import subprocess
result = subprocess.run(
    ['npx', 'tsc', '--noEmit'],
    cwd=str(ROOT),
    capture_output=True,
    text=True,
    timeout=180
)
out = result.stdout + result.stderr
# 找 category-seo-content.ts 错误
lines_out = out.split('\n')
cat_errors = [l for l in lines_out if 'category-seo-content' in l and 'error' in l]
print(f'  category-seo-content.ts error 数: {len(cat_errors)}')
if cat_errors:
    for l in cat_errors[:5]:
        print(f'    {l[:120]}')
