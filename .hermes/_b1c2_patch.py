# -*- coding: utf-8 -*-
# B1c 簇2 主补丁器: lint → category hub 换块 → 2 SKU body → faqSchema → CSV title/desc/h1/keywords
import io, json, re, csv, shutil, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from _b1c2_content import HUB, FOIL, CUSTOM, FAQSCHEMA

ROOT = Path(r'F:\zprintpro-nextjs')

# ---------- 0. lint ----------
SIMP = set('线发务动优仅们风飞历压县参双变叶吗听启员呛响哑哒团围图圣场坏块坚坝备复够奋奖妇娱孙宁实宠审宫宽寻导尝层屿岁岚岛岭币帅带并庆库庙废弯弹归彻径忧怀恳恼悬惊惯愤愿戏战户扩扫扬扰抚抛抢护报拥拦拨择挂挠挡挣挤挥损换捣掷摆摇摊显晓暂机杀杂权构枪标栏树桥欢毙气沟沦泪泼浆测济浓涂润涨渐渔滚滤灭灾炼烂烦烧热牵献犹独狮猎环现疗疮疯皱盐盘祷祸离积稳穷窝窥竞笔签紧红级纯纲纵纸练组细织终经结绘绝绣续绳维绵绿缓编缩缴网罗羡翘职聪肃肾肿脏腊腾云价众优伙传伤伦伫买乱争艺')
BANWORDS = ['工艺', '自带', '投产', '历年', '红包', '覆膜', '配电']
FAB = ['3 億', '3億', '800 萬', '800萬', '200+', '12 家上市', '12家上市', '3.2 倍', '3.2倍', '15 億', '15億', '2019', 'ΔE', '觀塘', '±0.2', 'e-print', 'E-print']

def lint(name, text, locale):
    hits = [w for w in FAB if w in text]
    assert not hits, (name, locale, 'fabrication', hits)
    bad = [c for c in SIMP if c in text]
    words = [w for w in BANWORDS if w in text]
    assert not bad, (name, locale, 'simplified-char', bad[:10])
    assert not words, (name, locale, 'simplified-word', words)
    if locale == 'zh-hk':
        assert 'ZprintPro' not in text, (name, 'brand-leak zh')
        assert '智印港' in text, (name, 'zh missing 智印港')
    else:
        assert '智印港' not in text, (name, locale, 'brand-leak')

for loc, d in HUB.items():
    lint('hub-' + loc, d['featuredSnippet'] + ''.join(d['paragraphs']) + ''.join(x['label'] for x in d['links']) + ''.join(f['q'] + f['a'] for f in d['faq']), loc)
for slug, bodies in (('foil', FOIL), ('custom', CUSTOM)):
    for loc, b in bodies.items():
        lint(slug + '-' + loc, b, loc)
print('lint OK: 9 bodies + hub blocks')

# ---------- 1. category hub 换块 ----------
def tsq(s):
    assert "'" not in s and '\\' not in s, 'quote/backslash in TS string'
    return "'" + s + "'"

def gen_locale(loc, with_snippet):
    d = HUB[loc]
    L = []
    ind = '  '
    if with_snippet:
        L.append("    featuredSnippet: %s," % tsq(d['featuredSnippet']))
        L.append("    lastUpdated: '2026-10-13',")
    h2map = {'zh-hk': '香港利是封印刷 — 材質×工藝×尺寸完整指南',
             'en': 'Red Packet Printing in Hong Kong — Materials, Finishing & Sizes Guide',
             'ja': 'ポチ袋印刷 — 素材×加工×サイズ完全ガイド'}
    L.append("    h2: %s," % tsq(h2map[loc]))
    ca_title = {'zh-hk': '核心競爭優勢', 'en': 'Why ZprintPro for Red Packets', 'ja': 'ZprintPro祝儀袋印刷の強み'}[loc]
    advs = {
     'zh-hk': [('1. 材質×工藝專業配對',
       ['銅版紙、珠光紙、觸感紙三大材質陣營，對應大眾派發到奢侈品全場景',
        '燙金、擊凸、局部UV、過膠按「主工藝+點綴」邏輯配對，預算分級清晰',
        '經濟型到奢侈型四檔組合，小預算也能做出高級感']),
      ('2. 100 個起訂・5-7 個工作天交貨',
       ['100 個起印無庫存壓力，500 個以上轉膠印單價階梯下降',
        '標準工藝 5-7 個工作天，複雜工藝 7-8 天，旺季建議 11 月底前下單',
        '港九新界免費速遞，順豐上門，跨境訂單全球配送']),
      ('3. 免費設計 3 稿・品質合規齊全',
       ['48 小時內出 3 個設計方向，含 2 輪修改，無隱藏收費',
        'ISO 9001 認證工廠質檢，FSC 認證紙張與大豆油墨可選',
        '30 秒 AI 報價即時出價，WhatsApp 客服一對一跟進'])],
     'en': [('1. Expert material-finishing pairing',
       ['Coated, pearl and soft-touch stock families cover mass to luxury tiers',
        'Hot stamp, emboss, spot UV and lamination paired by a primary-plus-accent logic',
        'Four budget tiers from economy to luxury, premium feel at any spend']),
      ('2. 100 pcs MOQ, 5-7 day turnaround',
       ['100-piece MOQ with no inventory pressure; offset savings from 500 pcs',
        '5-7 business days standard, 7-8 for complex finishing; order before end of November for CNY',
        'Free local delivery, global shipping for cross-border orders']),
      ('3. Free design and certified quality',
       ['3 design concepts within 48 hours with 2 revision rounds, no hidden fees',
        'ISO 9001 certified production; FSC paper and soy inks available',
        'Instant 30-second AI quote with WhatsApp follow-up'])],
     'ja': [('1. 素材×加工のプロフェッショナルペアリング',
       ['コート紙・パール紙・ソフトタッチ紙の3大素材で大衆配布からラグジュアリーまで対応',
        '箔押し・エンボス・部分UV・ラミネートを「主加工+アクセント」で最適配分',
        'エコノミーからラグジュアリーまで4段階の組み合わせで予算に合わせた高級感を実現']),
      ('2. 100個から・5-7営業日納品',
       ['100個からの小ロット対応、500個以上でオフセットに切替え単価ダウン',
        '標準加工5-7営業日、複雑加工7-8日。正月前納品は11月末までの注文を推奨',
        '日本全国配送、クロスボーダー注文はグローバル発送']),
      ('3. 無料デザイン3案・品質コンプライアンス',
       ['48時間以内に3案のデザイン方向を提示、修正2回込み',
        'ISO 9001認証工場の品質検査、FSC認証紙・大豆インク対応',
        '30秒AI見積りで即時試算、LINE/WhatsAppでデザイン相談'])],
    }
    L.append("    coreAdvantages: {")
    L.append("      title: %s," % tsq(ca_title))
    L.append("      items: [")
    for h, pts in advs[loc]:
        L.append("        {")
        L.append("          heading: %s," % tsq(h))
        L.append("          points: [")
        for p in pts:
            L.append("            %s," % tsq(p))
        L.append("          ],")
        L.append("        },")
    L.append("      ],")
    L.append("    },")
    # materialTable
    mt = {
     'zh-hk': ('材質速查', '三大材質陣營 × 適配工藝', ['材質', '關鍵特性', '適配工藝 / 場景'],
       [('銅版紙 157–300gsm', '平滑挺括、發色鮮豔', '膠印、過膠、燙金；大量派發、促銷'),
        ('珠光紙 200–280gsm', '自帶珍珠光澤、免過膠', '燙金、擊凸；金融機構、中高端品牌'),
        ('觸感紙 250–350gsm', '天鵝絨啞面、不留指紋', '燙金、局部UV；奢侈品、高端酒店'),
        ('牛皮紙 120–250gsm', '質樸環保、自然紋理', '單色印刷、燙金；環保品牌、文青風'),
        ('特種紋理紙 200–300gsm', '布紋/蛋殼紋立體肌理', '擊凸效果最佳；婚禮、限量款')]),
     'en': ('Stock Quick Reference', 'Three stock families x compatible finishing', ['Stock', 'Key traits', 'Finishing / best for'],
       [('Coated 157-300gsm', 'Smooth, crisp, color-true', 'Offset, lamination, foil; mass distribution'),
        ('Pearl 200-280gsm', 'Inherent sheen, no lamination', 'Foil, emboss; financial institutions'),
        ('Soft-touch 250-350gsm', 'Velvet matte, fingerprint-free', 'Foil, spot UV; luxury brands, hotels'),
        ('Kraft 120-250gsm', 'Rustic, eco, natural texture', 'Mono print, foil; eco brands'),
        ('Textured 200-300gsm', 'Linen / eggshell relief', 'Emboss shines; weddings, limited editions')]),
     'ja': ('素材早見表', '3大素材カテゴリー × 対応加工', ['素材', '主な特徴', '対応加工 / シーン'],
       [('コート紙 157–300gsm', '滑らかでハリがあり発色良好', 'オフセット、ラミ、箔押し；大量配布'),
        ('パール紙 200–280gsm', '特有の光沢、ラミ不要', '箔押し、エンボス；金融機関'),
        ('ソフトタッチ 250–350gsm', 'ベルベットマット、指紋つかない', '箔押し、部分UV；ラグジュアリー'),
        ('クラフト 120–250gsm', '素朴でエコな風合い', '単色印刷、箔押し；エコブランド'),
        ('特殊エンボス紙 200–300gsm', '布目・卵殻の立体感', 'エンボス効果最大；結婚式、限定品')]),
    }
    t, st, cols, rows = mt[loc]
    L.append("    materialTable: {")
    L.append("      title: %s," % tsq(t))
    L.append("      subtitle: %s," % tsq(st))
    L.append("      columns: [%s]," % ', '.join(tsq(c) for c in cols))
    L.append("      rows: [")
    for r in rows:
        L.append("        { material: %s, features: %s, scenarios: %s }," % (tsq(r[0]), tsq(r[1]), tsq(r[2])))
    L.append("      ],")
    L.append("    },")
    # specialOptions
    so = {
     'zh-hk': ('常用工藝', [('燙金（12 色）', '金銀玫瑰金等 12 種箔色，品牌感最強的單一工序'), ('擊凸', '立體觸感，配珠光紙效果最佳'), ('局部UV', '過膠後追加高光對比'), ('過膠', '啞膠/光膠保護印刷面，珠光紙與觸感紙無需')]),
     'en': ('Popular Finishing', [('Hot stamp (12 colors)', '12 foils from gold to holographic; the strongest single-process brand lift'), ('Emboss', 'Tactile depth; pairs best with pearl stock'), ('Spot UV', 'Gloss contrast after lamination'), ('Lamination', 'Matte/gloss protection; pearl and soft-touch skip it')]),
     'ja': ('主な加工', [('箔押し（12色）', '金・銀・ローズゴールドなど12色、単一工程で最もブランド感を高める'), ('エンボス', '立体触感、パール紙との相性が抜群'), ('部分UV', 'ラミ後のハイライト対比'), ('ラミネート', 'マット/グロスで印刷面を保護、パール紙とソフトタッチは不要')]),
    }
    t, items = so[loc]
    L.append("    specialOptions: {")
    L.append("      title: %s," % tsq(t))
    L.append("      items: [")
    for n, ds in items:
        L.append("        { name: %s, description: %s }," % (tsq(n), tsq(ds)))
    L.append("      ],")
    L.append("    },")
    # techSpecs
    tsp = {
     'zh-hk': [('最低起訂量', '100 個'), ('標準交期', '5-7 個工作天（複雜工藝 7-8 天）'), ('價格區間', 'HK$1.10-7.50/個（視工藝與數量）'), ('常用尺寸', '標準三摺 90×170mm；大號 100×190mm'), ('認證', 'ISO 9001；FSC 紙張可選'), ('報價', '30 秒 AI 即時報價')],
     'en': [('Minimum order', '100 pcs'), ('Turnaround', '5-7 business days (7-8 complex)'), ('Price range', 'HK$1.10-7.50/pc by finishing and volume'), ('Sizes', 'Standard tri-fold 90x170mm; large 100x190mm'), ('Certification', 'ISO 9001; FSC paper options'), ('Quoting', 'Instant 30-second AI quote')],
     'ja': [('最低ロット', '100個'), ('納期', '5-7営業日（複雑加工は7-8日）'), ('価格帯', 'HK$1.10-7.50/個（加工と数量による）'), ('サイズ', '標準三つ折り90×170mm、大型100×190mm'), ('認証', 'ISO 9001、FSC認証紙対応'), ('見積り', '30秒AI即時見積')],
    }
    L.append("    techSpecs: {")
    L.append("      title: %s," % tsq({'zh-hk': '規格一覽', 'en': 'Specifications', 'ja': '仕様一覧'}[loc]))
    L.append("      items: [")
    for lb, v in tsp[loc]:
        L.append("        { label: %s, value: %s }," % (tsq(lb), tsq(v)))
    L.append("      ],")
    L.append("    },")
    # serviceNodes
    sn = {
     'zh-hk': [('免費設計', '3 稿 48 小時內出稿，含 2 輪修改'), ('快速報價', '30 秒 AI 報價，價格透明'), ('品質質檢', '按比例抽檢，出貨前附著力測試'), ('配送', '港九新界免費速遞，跨境全球發貨')],
     'en': [('Free design', '3 concepts in 48 hours, 2 revision rounds'), ('Fast quoting', '30-second AI quote, transparent pricing'), ('QC', 'Sampled inspection with adhesion tests before shipping'), ('Delivery', 'Free local delivery; global shipping')],
     'ja': [('無料デザイン', '3案を48時間以内に提示、修正2回込み'), ('即時見積', '30秒AI見積り、透明な価格'), ('品質検査', '抜き取り検査、出荷前に密着テスト'), ('配送', '日本全国配送、グローバル発送対応')],
    }
    L.append("    serviceNodes: {")
    L.append("      title: %s," % tsq({'zh-hk': '服務節點', 'en': 'Service Highlights', 'ja': 'サービス概要'}[loc]))
    L.append("      items: [")
    for tt, ds in sn[loc]:
        L.append("        { title: %s, description: %s }," % (tsq(tt), tsq(ds)))
    L.append("      ],")
    L.append("    },")
    # buyingGuide
    bg_title = {'zh-hk': '利是封印刷完整指南', 'en': 'The Complete Red Packet Printing Guide', 'ja': 'ポチ袋印刷完全ガイド'}[loc]
    L.append("    buyingGuide: {")
    L.append("      title: %s," % tsq(bg_title))
    L.append("      paragraphs: [")
    for p in d['paragraphs']:
        L.append("        %s," % tsq(p))
    L.append("      ],")
    L.append("      links: [")
    for x in d['links']:
        L.append("        { label: %s, href: %s }," % (tsq(x['label']), tsq(x['href'])))
    L.append("      ],")
    L.append("    },")
    # faq
    L.append("    faq: [")
    for f in d['faq']:
        L.append("      { q: %s, a: %s }," % (tsq(f['q']), tsq(f['a'])))
    L.append("    ],")
    return '\n'.join(L)

new_block = "const redPacketsContent: Record<string, CategoryLocaleContent> = {\n"
new_block += "  'zh-hk': {\n" + gen_locale('zh-hk', True) + "\n  },\n"
new_block += "  en: {\n" + gen_locale('en', False) + "\n  },\n"
new_block += "  ja: {\n" + gen_locale('ja', False) + "\n  },\n"
new_block += "};"

cs_path = ROOT/'src/data/category-seo-content.ts'
cs = io.open(cs_path, encoding='utf-8').read()
j = cs.find('const redPacketsContent')
assert j > -1
# 字符串感知配对块尾
depth, instr, esc = 0, False, False
i = cs.index('{', j)
k = i
while k < len(cs):
    c = cs[k]
    if instr:
        if esc: esc = False
        elif c == '\\': esc = True
        elif c == "'": instr = False
    else:
        if c == "'": instr = True
        elif c == '{': depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0: break
    k += 1
assert cs[k:k+2] == '};' or cs[k+1:k+3] == '};', cs[k:k+6]
end = cs.index(';', k) + 1
shutil.copy2(cs_path, ROOT/'.hermes/_bak-category-seo-before-b1c2.ts')
cs = cs[:j] + new_block + cs[end:]
assert 'e-print' not in cs[j:j+len(new_block)]
io.open(cs_path, 'w', encoding='utf-8', newline='\n').write(cs)
print('category hub block replaced: %d -> %d bytes' % (end - j, len(new_block)))

# ---------- 2. sku-seo bodies ----------
ss_path = ROOT/'src/data/sku-seo-data.ts'
s = io.open(ss_path, encoding='utf-8').read()
shutil.copy2(ss_path, ROOT/'.hermes/_bak-sku-seo-before-b1c2-bodies.ts')
dec = json.JSONDecoder()
for slug, bodies in (('foil-red-packets', FOIL), ('custom-red-packets', CUSTOM)):
    i = s.index('"%s":' % slug)
    cursor = i
    for loc in ('zh-hk', 'en', 'ja'):
        li = s.index('"%s":' % loc, cursor)
        bi = s.index('"body":', li)
        start = bi + len('"body":')
        txt = s[start:].lstrip()
        lead = len(s[start:]) - len(txt)
        val, used = dec.raw_decode(txt)
        assert val != bodies[loc], (slug, loc, 'same body?')
        newlit = json.dumps(bodies[loc], ensure_ascii=False)
        assert '\u2028' not in newlit and '\u2029' not in newlit
        s = s[:start + lead] + newlit + s[start + lead + used:]
        cursor = start + lead + len(newlit)
    print('body replaced:', slug)
io.open(ss_path, 'w', encoding='utf-8', newline='\n').write(s)

# ---------- 3. products.ts faqSchema ----------
pt_path = ROOT/'src/data/products.ts'
t = io.open(pt_path, encoding='utf-8').read()
shutil.copy2(pt_path, ROOT/'.hermes/_bak-products-before-b1c2-faq.ts')
base = t.index('export const products')
for slug in ('foil-red-packets', 'custom-red-packets'):
    i = t.index("slug: '%s'" % slug, base)
    fi = t.index('faqSchema:', i)
    start = fi + len('faqSchema:')
    txt = t[start:].lstrip()
    lead = len(t[start:]) - len(txt)
    val, used = dec.raw_decode(txt)
    newlit = json.dumps(FAQSCHEMA[slug], ensure_ascii=False)
    t = t[:start + lead] + newlit + t[start + lead + used:]
    print('faqSchema replaced:', slug, '(old %d -> new %d items)' % (len(val), len(FAQSCHEMA[slug])))
io.open(pt_path, 'w', encoding='utf-8', newline='\n').write(t)

# ---------- 4. CSV title/desc/h1/keywords ----------
CSV = ROOT/'zprintpro-sku-seo-data.csv'
shutil.copy2(CSV, ROOT/'.hermes/_bak-csv-before-b1c2.csv')
CSV_NEW = {
 'foil-red-packets': {
  't': {'zh-hk': '燙金利是封印刷 | 金箔銀箔12色 100個起 HK$1.10起 | 智印港',
        'en': 'Hot Stamp Red Packet Printing | 12 Foil Colors 100pcs HK$1.10+ | ZprintPro',
        'ja': '箔押しポチ袋印刷 | 12色の箔 100個から HK$1.10起 | ZprintPro'},
  'k': {'zh-hk': '燙金利是封,燙金利是封印刷,金箔利是封,銀箔利是封,利是封印刷,香港利是封,新年利是封',
        'en': 'hot stamp red packets,foil stamped red envelopes,gold foil red packets,red packet printing,custom red packets,lunar new year envelopes',
        'ja': '箔押しポチ袋,箔押し祝儀袋,金箔ポチ袋,ポチ袋印刷,オリジナル祝儀袋,お年玉袋,正月グッズ'},
  'd': {'zh-hk': '智印港燙金利是封印刷：12種箔色任選，珠光紙/觸感紙/銅版紙配對建議，分版套印工藝解說。100個起 HK$1.10起，5-7個工作天交貨，免費設計3稿，30秒AI報價即時試算。',
        'en': 'Hot stamp red packet printing in 12 foil colors on pearl, soft-touch and coated stocks. Split-plate registration for large areas. 100 pcs MOQ from HK$1.10, 5-7 day turnaround, free design. 30-second AI quote.',
        'ja': '箔押し祝儀袋印刷：12色の箔、パール紙・ソフトタッチ紙・コート紙の組み合わせガイド、大面積は分割版見当で対応。100個から HK$1.10起、5-7営業日、無料デザイン3案。30秒AI見積り。'},
  'h': {'zh-hk': '燙金利是封印刷 — 箔色選型到成本優化的工藝指南',
        'en': 'Hot Stamp Red Packet Printing — Foil Selection to Cost Optimization',
        'ja': '箔押し祝儀袋印刷 — 箔色選定からコスト最適化まで'},
 },
 'custom-red-packets': {
  't': {'zh-hk': '企業利是封定製 | 品牌Logo利是封 100個起 HK$1.90起 | 智印港',
        'en': 'Corporate Red Packet Customization | Brand Logo 100pcs HK$1.90+ | ZprintPro',
        'ja': '企業向けポチ袋カスタマイズ | ロゴ入り 100個から HK$1.90起 | ZprintPro'},
  'k': {'zh-hk': '企業利是封,企業利是封定製,品牌利是封,公司利是封,利是封印刷,訂製利是封,新年企業禮品',
        'en': 'corporate red packets,business red envelopes,branded red packets,company red packet printing,custom red packets bulk,lunar new year corporate gifts',
        'ja': '企業向けポチ袋,祝儀袋カスタマイズ,ロゴ入りポチ袋,会社ポチ袋,オリジナル祝儀袋,正月企業ギフト'},
  'd': {'zh-hk': '智印港企業利是封定製：品牌規範對接、免費設計3稿、分點包裝配送、年度版本留檔。100個起 HK$1.90起，標準5-7個工作天，ISO 9001質檢，旺季提前8週鎖定產能。',
        'en': 'Corporate red packet customization with brand guideline compliance, free 3-concept design, per-store packing and annual version archives. 100 pcs MOQ from HK$1.90, 5-7 day turnaround, ISO 9001 QC.',
        'ja': '企業向け祝儀袋カスタマイズ：ブランドガイドライン準拠、無料デザイン3案、拠点別梱包配送、年度アーカイブ対応。100個から HK$1.90起、5-7営業日、ISO 9001品質検査。'},
  'h': {'zh-hk': '企業利是封定製 — 從品牌簡報到分點配送的全流程',
        'en': 'Corporate Red Packet Customization — From Brand Brief to Multi-Site Delivery',
        'ja': '企業向け祝儀袋カスタマイズ — ブランドブリーフから拠点配送まで'},
 },
}
rows = list(csv.reader(io.open(CSV, encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
idx = {'t': [hdr.index('SEO标题(ZH)'), hdr.index('SEO标题(EN)'), hdr.index('SEO标题(JA)')],
       'k': [hdr.index('SEO关键词(ZH)'), hdr.index('SEO关键词(EN)'), hdr.index('SEO关键词(JA)')],
       'd': [hdr.index('SEO描述(ZH)'), hdr.index('SEO描述(EN)'), hdr.index('SEO描述(JA)')],
       'h': [hdr.index('H1标题(ZH)'), hdr.index('H1标题(EN)'), hdr.index('H1标题(JA)')]}
locs = ['zh-hk', 'en', 'ja']
n = 0
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[si].strip()
    if slug in CSV_NEW:
        for kind in ('t', 'k', 'd', 'h'):
            for li, loc in enumerate(locs):
                assert r[idx[kind][li]].strip(), (slug, kind, loc)
                r[idx[kind][li]] = CSV_NEW[slug][kind][loc]
        n += 1
assert n == 2, n
w = io.open(CSV, 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV patched rows:', n)
