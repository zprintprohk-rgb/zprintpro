# -*- coding: utf-8 -*-
# Stage 2: products.ts (删9+插roll) + products-content + policy + scenario-links + alt-map + DoujinSKU + blog 计数
import io, re, os

RETIRE = ['fluorescent-stickers','drink-tokens','cafe-table-cards','wedding-place-cards','save-the-date-cards','wedding-seating-charts','wedding-suite-bundle','eco-tote-bag','postcard-set']

# ---------- products.ts ----------
p = 'src/data/products.ts'
lines = io.open(p, encoding='utf-8').read().split('\n')
# 1) 定位 9 个条目: 起点=上方最近的 "  {" 行, 终点=其后第一个 "  }" 或 "  }," 行
def _indent(l):
    return len(l) - len(l.lstrip(' '))

def find_entry(lines, slug):
    for i, ln in enumerate(lines):
        if ("slug: '%s'" % slug) in ln:
            n = _indent(ln)              # 字段缩进 (4=标准, 6=doujin 簇)
            k = n - 2                    # 条目花括号缩进
            s = i
            while s >= 0 and not (_indent(lines[s]) == k and lines[s].strip() == '{'):
                s -= 1
            assert s >= 0, 'no entry start for ' + slug
            e = s + 1
            while e < len(lines):
                if _indent(lines[e]) <= k and lines[e].strip() in ('}', '},'):
                    m = e + 1
                    while m < len(lines) and not lines[m].strip():
                        m += 1
                    if m >= len(lines):
                        break
                    nxs = lines[m].strip()
                    if _indent(lines[m]) <= k and (nxs.startswith('{') or nxs.startswith('//') or nxs in ('};', '];', '}', '},', '})', '});', ')')):
                        break
                e += 1
            assert e < len(lines), 'no entry end for ' + slug
            body = '\n'.join(lines[s:e+1])
            n_slug = len(re.findall(r"(?<!_)slug: '", body))
            assert 'id:' in body and n_slug == 1, 'range sanity fail for %s (%d slugs in range)' % (slug, n_slug)
            return s, e
    raise ValueError('slug not found: ' + slug)

ranges = []
for slug in RETIRE:
    s, e = find_entry(lines, slug)
    ranges.append((s, e, slug))
print('entries located:')
for s, e, slug in sorted(ranges):
    print('  %s L%d-%d' % (slug, s+1, e+1))

# 2) roll-stickers 新条目 (插在 fluorescent 原位置)
ROLL = """  {
    id: 'ST-010',
    sku_code: 'ST-010',
    slug: 'roll-stickers',
    optimizedAt: '2026-10-12',
    optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '卷裝貼紙 | 卷裝標籤 / 貼標機適用', nameEn: 'Roll Labels | Custom Roll Stickers for Label Applicators', nameJa: 'ロールラベル | ラベラー対応 ロールシール', title_zh: '卷裝貼紙',
    description: '卷裝貼紙出貨即成卷，上貼標機即用：卷芯直徑 4cm、出標方向可選、每卷 1,000 張，銅板紙熱熔膠格仔底，食品飲料、美妝、日化生產線適用。10 張起印，3,000 張低至 HK$0.20/張。', descriptionEn: 'Roll labels shipped wound on 4cm cores, unwind direction options, 1,000 labels per roll - applicator-ready for food, beverage, beauty and FMCG lines. From 10 pcs, as low as $0.03 per label at 3,000 pcs.', descriptionJa: 'ロールラベルは巻芯径4cm・繰り出し方向指定可・1巻1,000枚で出荷、食品・飲料・化粧品・日用品のラベラーラインにそのまま対応。10枚から、3,000枚で1枚¥4.1〜。', description_zh: '卷裝貼紙出貨即成卷，上貼標機即用：卷芯直徑 4cm、出標方向可選、每卷 1,000 張，銅板紙熱熔膠格仔底。',
    features: [
      '【貼標機適用】卷芯直徑 4cm、出標方向可選（如橫版左出標）、每卷 1,000 張，上機即用',
      '【熱熔膠銅板】格仔底紙 + 熱熔膠，貼附牢、出標順，通用食品飲料與日化瓶罐',
      '【小批量起印】10 張起印數碼快印，試產與大貨同線，3,000 張低至 HK$0.20/張',
      '【異形模切】任意形狀啤切，品牌輪廓標籤亦可上機',
      '【可變資料】序號／QR／條碼逐張可變，批次管理與防竄貨',
      '【SGS 遷移測試】油墨無重金屬遷移，間接食品接觸適用',
      '【1 小時打稿】免費數碼打稿 + 2 次免費修改，5-7 個工作天交貨',
    ],
    specs: {
      material: '銅板紙（熱熔膠）＋格仔底紙',
      size: '常用 150×100mm 級距，任意尺寸可報',
      printMethod: 'HP Indigo 數碼／柯式（依數量）',
      finishing: '卷裝復卷（卷芯 4cm・出標方向可選・每卷 1,000 張）、異形模切(啤)',
    },
    price_range: 'HK$0.20-5.50/張',
    basePrice: 0.20,
    basePrice_en: 0.03,
    basePrice_ja: 4,
    weight_score: 80,
    isHot: false,
    isNew: true,
    minQuantity: 10,
    images: ['/images/products/roll-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-roll-stickers-zh-hk.webp', en: 'zprintpro-stickers-roll-stickers-en.webp', ja: 'zprintpro-stickers-roll-stickers-ja.webp' },
    alt: {
      'zh-hk': '卷裝貼紙 / 卷裝標籤 | 香港卷裝標籤印刷 卷芯4cm 貼標機適用 | 智印港',
      en: 'Custom Roll Labels on 4cm cores for label applicators | ZprintPro',
      ja: 'ロールラベル 印刷 | 巻芯径4cm・ラベラー対応 | ZprintPro'
    },
  },

    // === 2026-10-12 新建: 卷裝貼紙 (K3 拍板荧光→卷裝), 價格真值 = price-data.generated.ts roll 檔 ===
    variables: {
      quantities: [
        { value: 10, label: '10', discount: 7.75 },
        { value: 25, label: '25', discount: 3.24 },
        { value: 50, label: '50張', discount: 1.72 },
        { value: 75, label: '75張', discount: 1.23 },
        { value: 99, label: '99張', discount: 1 },
        { value: 3000, label: '3000張', discount: 0.29 },
      ],
    },
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    faqSchema: [{"question": "What core size and unwind direction do your roll labels come in?", "answer": "Standard core diameter is 4cm with unwind direction options such as landscape left unwind. Labels are wound 1,000 per roll - tell us your applicator model and we will match the winding spec."}, {"question": "What is the minimum order for roll labels?", "answer": "10 labels with no setup fees. Volume tiers go up to 3,000 pcs at HK$0.20 per label."}, {"question": "Which adhesive do the roll labels use?", "answer": "Art paper with hot-melt adhesive on grid backing as standard - strong tack for bottles, jars and cartons. Other adhesives quoted on request."}, {"question": "Can roll labels include variable data such as serials or QR codes?", "answer": "Yes. Digital printing supports a different serial number, QR code or barcode on every label for batch tracking and anti-diversion."}],
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},"""

# 3) 执行: 先插 roll 到 fluorescent 起点, 再统一删除全部 9 个旧范围
fluor_s, fluor_e, _ = [(s, e, sl) for s, e, sl in ranges if sl == 'fluorescent-stickers'][0]
# 重叠检查 (起点排序后相邻区间不得重叠)
sr = sorted(ranges)
for a, b in zip(sr, sr[1:]):
    assert a[1] < b[0], 'OVERLAP: %s ends L%d, %s starts L%d' % (a[2], a[1]+1, b[2], b[0]+1)
print('fluorescent full range: L%d-%d' % (fluor_s+1, fluor_e+1))
out = lines[:fluor_s] + ROLL.split('\n') + lines[fluor_s:]
# 重新定位删除范围 (插入后行号偏移)
ranges2 = []
for slug in RETIRE:
    s, e = find_entry(out, slug)
    ranges2.append((s, e, slug))
# 荧光条目现在是 roll-stickers  occupying fluorescent's old slot? 不 — find_entry('fluorescent-stickers') 仍能定位旧荧光条目(roll 插在它前面)
# 从后往前删除
for s, e, slug in sorted(ranges2, reverse=True):
    del out[s:e+1]
    print('deleted:', slug)
io.open(p, 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
# 断言
final = io.open(p, encoding='utf-8').read()
for slug in RETIRE:
    assert "slug: '%s'" % slug not in final, 'still present: ' + slug
assert final.count("slug: 'roll-stickers'") == 1
assert final.count("id: 'ST-010'") == 1
print('products.ts: 9 retired, roll-stickers inserted @ST-010')

# ---------- products-content.ts: 删 fluorescent 块 ----------
p = 'src/data/products-content.ts'
t = io.open(p, encoding='utf-8').read()
i = t.index("  'fluorescent-stickers': {")
# 块尾: 下一个 "  '" 开头键 或 文件对象尾
m = re.search(r"\n  '[a-z0-9-]+': \{", t[i+10:])
end = i + 10 + m.start() if m else len(t)
t = t[:i] + t[end+1:]
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('products-content.ts: fluorescent block removed')

# ---------- print-method-policy.ts ----------
p = 'src/data/print-method-policy.ts'
t = io.open(p, encoding='utf-8').read()
assert t.count("  'fluorescent-stickers',\n") == 1
t = t.replace("  'fluorescent-stickers',\n", "  'roll-stickers', // 2026-10-12 荧光退役→卷裝 (K3 拍板)\n")
old = "  'fluorescent-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },\n"
assert t.count(old) == 1
t = t.replace(old, "  'roll-stickers': { target: 10, unit: '張', label: '貼紙/標籤' },\n")
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('print-method-policy.ts: swapped fluorescent→roll')

# ---------- industry-scenario-links.ts ----------
p = 'src/data/industry-scenario-links.ts'
t = io.open(p, encoding='utf-8').read()
old = "    comiket: { sku: 'postcard-set' },\n    original_ip: { sku: 'eco-tote-bag' },"
assert t.count(old) == 1
t = t.replace(old, "    // 2026-10-12 Tier1 退役: postcard-set/eco-tote-bag 收拢 → doujinshi-printing 承接\n    comiket: { sku: 'doujinshi-printing' },\n    original_ip: { sku: 'doujinshi-printing' },")
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('industry-scenario-links.ts: comiket/original_ip retargeted')

# ---------- image-alt-map.ts ----------
p = 'src/data/image-alt-map.ts'
t = io.open(p, encoding='utf-8').read()
for slug in ('postcard-set', 'eco-tote-bag'):
    i = t.index("  '%s': {" % slug)
    e = t.index('\n  },', i) + len('\n  },')
    t = t[:i] + t[e+1:]
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('image-alt-map.ts: 2 blocks removed')

# ---------- DoujinSKU.tsx: 删 6 行卡片 ----------
p = 'src/components/japan/DoujinSKU.tsx'
t = io.open(p, encoding='utf-8').read()
n = 0
for line_sel in [r"\s*\{ slug: 'postcard-set',[^\n]*\n", r"\s*\{ slug: 'eco-tote-bag',[^\n]*\n"]:
    t, k = re.subn(line_sel, '', t)
    n += k
assert n == 6, 'expected 6 card lines, got %d' % n
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('DoujinSKU.tsx: 6 retired cards removed')

# ---------- blog-data: SKU 计数 91→83 ----------
NEWCOUNT = 83
for loc in ('zh-hk', 'en', 'ja'):
    p = 'src/data/blog-data/%s.json' % loc
    t = io.open(p, encoding='utf-8').read()
    cnt = 0
    for a, b in [('91 個在售 SKU', '%d 個在售 SKU' % NEWCOUNT), ('91 個 SKU', '%d 個 SKU' % NEWCOUNT),
                 ('91 live SKUs', '%d live SKUs' % NEWCOUNT), ('91 SKUs in 16 categories', '%d SKUs in 16 categories' % NEWCOUNT),
                 ('91 の実 SKU', '%d の実 SKU' % NEWCOUNT), ('91 SKU', '%d SKU' % NEWCOUNT)]:
        k = t.count(a)
        if k:
            t = t.replace(a, b)
            cnt += k
    io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
    print('blog-data %s: %d count fixes' % (loc, cnt))
print('STAGE 2 COMPLETE')
