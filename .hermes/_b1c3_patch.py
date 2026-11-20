# -*- coding: utf-8 -*-
# B1c3 patcher: 2 类目块整换 + folded-leaflets 3 body + faqSchema + CSV 行 (含 imageAlt 对齐)
import io, json, csv, sys
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
sys.path.insert(0, str(ROOT/'.hermes'))
from _b1c3_content import FLYERS, LAST
from _b1c3_content2 import POSTERS, LEAFLET_BODY, LEAFLET_FAQ, LEAFLET_CSV

# ---------- lint ----------
SIMP = set('线发务动优仅们风飞历压县参双变叶吗听启员呛响哑哒团围图圣场坏块坚坝备复够奋奖妇娱孙宁实宠审宫宽寻导尝层屿岁岚岛岭币帅带并庆库庙废弯弹归彻径忧怀恳恼悬惊惯愤愿戏战户扩扫扬扰抚抛抢护报拥拦拨择挂挠挡挣挤挥损换捣掷摆摇摊显晓暂机杀杂权构枪标栏树桥欢毙气沟沦泪泼浆测济浓涂润涨渐渔滚滤灭灾炼烂烦烧热牵献犹独狮猎环现疗疮疯皱盐盘祷祸离积稳穷窝窥竞笔签紧红级纯纲纵纸练组细织终经结绘绝绣续绳维绵绿缓编缩缴网罗羡翘职聪肃肾肿脏腊腾云价众伙传伤伦伫买乱争艺'.replace('参', ''))  # 参=参考 is standard ja, exclude (簇2 lesson)
BANWORDS = ['工艺', '自带', '投产', '历年', '红包', '覆膜', '配电', '高频', '承载', '互译']
FAB = ['1,200 萬', '1,200萬', '1200 萬', '1200萬', '年間1200', '40 萬', '40萬', '40 万', '40万', '300 萬', '300萬', '300 万', '300万', '2025 年', '2025年', 'A/B', '+23%', '+31%', '+12%', '+8%', '+5%', '3M', 'MBO', 'Stahl', '±0.5', '$0.007', '$0.004', '¥0.8/枚', '$0.11', '$0.55', '$0.85', '35%', '80% 即棄', '€', '智印印港']

def lint(loc, text, tag):
    bad = [c for c in SIMP if c in text]
    words = [w for w in BANWORDS if w in text]
    fab = [w for w in FAB if w in text]
    assert not bad, (tag, loc, 'simp', bad[:8])
    assert not words, (tag, loc, 'word', words)
    assert not fab, (tag, loc, 'fab', fab)
    if loc == 'zh-hk':
        assert 'ZprintPro' not in text, (tag, loc, 'brand-leak')
        assert '智印港' in text, (tag, loc, 'missing-brand')
    else:
        assert '智印港' not in text, (tag, loc, 'brand-leak-ja-en')

def all_text(d):
    out = []
    def w(x):
        if isinstance(x, str): out.append(x)
        elif isinstance(x, (list, tuple)):
            for y in x: w(y)
        elif isinstance(x, dict):
            for y in x.values(): w(y)
    w(d)
    return '\n'.join(out)

for tag, d in (('FLYERS', FLYERS), ('POSTERS', POSTERS)):
    for loc, v in d.items():
        lint(loc, all_text(v), tag)
for loc, v in LEAFLET_BODY.items():
    lint(loc, v, 'LEAFLET')
    assert '[30 秒 AI 報價](/zh-hk/quote/)' in v or '[30-second AI quote](/en/quote/)' in v or '[30秒AI見積](/ja/quote/)' in v, (loc, 'missing quote CTA')
print('lint OK: FLYERS/POSTERS/LEAFLET ×3 locales')

# ---------- TS 生成器 ----------
def q(s):  # 单引号转义
    assert '\\' not in s, 'backslash in %s' % s[:40]
    return "'" + s.replace("'", "\\'") + "'"

def gen_block(name, D):
    L = ['const %s: Record<string, CategoryLocaleContent> = {' % name]
    for li, loc in enumerate(('zh-hk', 'en', 'ja')):
        v = D[loc]
        key = "'zh-hk'" if loc == 'zh-hk' else loc
        comma = ',' if li < 2 else ''
        L.append('  %s: {' % key)
        L.append('    featuredSnippet: %s,' % q(v['featuredSnippet']))
        L.append('    lastUpdated: %s,' % q(LAST))
        L.append('    h2: %s,' % q(v['h2']))
        L.append('    coreAdvantages: {')
        L.append('      title: %s,' % q(v['adv_title']))
        L.append('      items: [')
        for h, pts in v['adv_items']:
            L.append('        {')
            L.append('          heading: %s,' % q(h))
            L.append('          points: [')
            for p in pts:
                L.append('            %s,' % q(p))
            L.append('          ],')
            L.append('        },')
        L.append('      ],')
        L.append('    },')
        L.append('    materialTable: {')
        L.append('      title: %s,' % q(v['mat_title']))
        L.append('      subtitle: %s,' % q(v['mat_sub']))
        L.append('      columns: [%s],' % ', '.join(q(c) for c in v['mat_cols']))
        L.append('      rows: [')
        for r in v['mat_rows']:
            L.append('        { material: %s, features: %s, scenarios: %s },' % (q(r[0]), q(r[1]), q(r[2])))
        L.append('      ],')
        L.append('    },')
        L.append('    specialOptions: {')
        L.append('      title: %s,' % q(v['opt_title']))
        L.append('      items: [')
        for n, dsc in v['opt_items']:
            L.append('        { name: %s, description: %s },' % (q(n), q(dsc)))
        L.append('      ],')
        L.append('    },')
        L.append('    techSpecs: {')
        L.append('      title: %s,' % q(v['spec_title']))
        L.append('      items: [')
        for lb, val in v['spec_items']:
            L.append('        { label: %s, value: %s },' % (q(lb), q(val)))
        L.append('      ],')
        L.append('    },')
        L.append('    serviceNodes: {')
        L.append('      title: %s,' % q(v['svc_title']))
        L.append('      items: [')
        for tt, dd in v['svc_items']:
            L.append('        { title: %s, description: %s },' % (q(tt), q(dd)))
        L.append('      ],')
        L.append('    },')
        L.append('    buyingGuide: {')
        L.append('      title: %s,' % q(v['bg_title']))
        L.append('      paragraphs: [')
        for p in v['bg_paras']:
            L.append('        %s,' % q(p))
        L.append('      ],')
        L.append('      links: [')
        for lb, href in v['bg_links']:
            L.append('        { label: %s, href: %s },' % (q(lb), q(href)))
        L.append('      ],')
        L.append('    },')
        L.append('    faq: [')
        for qq, aa in v['faqs']:
            L.append('      { q: %s, a: %s },' % (q(qq), q(aa)))
        L.append('    ],')
        L.append('  }%s' % comma)
    L.append('};')
    return '\n'.join(L) + '\n'

def replace_block(t, name, new_block):
    j = t.index('const %s' % name)
    i = t.index('{', j)
    depth, instr, esc = 0, False, False
    k = i
    while k < len(t):
        c = t[k]
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
    end = t.index(';', k) + 1
    return t[:j] + new_block.rstrip('\n') + t[end:]

# ---------- 1) 类目块 ----------
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
cs = replace_block(cs, 'flyersContent', gen_block('flyersContent', FLYERS))
cs = replace_block(cs, 'postersContent', gen_block('postersContent', POSTERS))
io.open(ROOT/'src/data/category-seo-content.ts', 'w', encoding='utf-8', newline='\n').write(cs)
print('category blocks replaced')

# ---------- 2) leaflet bodies ----------
dec = json.JSONDecoder()
t = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
SLUG = 'folded-leaflets'

def set_field(src, loc, field, value):
    i = src.index('"%s":' % SLUG)
    block = src[i:i + 90000]
    li = block.index('"seo":')
    li2 = block.index('"%s":' % loc, li)
    seg = block[li2:]
    fi = seg.index('"%s":' % field)
    abs_fi = i + li2 + fi + len('"%s":' % field)
    txt = src[abs_fi:].lstrip()
    lead = len(src[abs_fi:]) - len(txt)
    _, used = dec.raw_decode(txt)
    return src[:abs_fi + lead] + json.dumps(value, ensure_ascii=False) + src[abs_fi + lead + used:]

for loc, body in LEAFLET_BODY.items():
    t = set_field(t, loc, 'body', body)
io.open(ROOT/'src/data/sku-seo-data.ts', 'w', encoding='utf-8', newline='\n').write(t)
print('leaflet bodies replaced ×3')

# ---------- 3) faqSchema ----------
p = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
i = p.index("slug: '%s'" % SLUG)
block = p[i:i + 90000]
fj = block.index('faqSchema:')
abs_fj = i + fj + len('faqSchema:')
txt = p[abs_fj:].lstrip()
lead = len(p[abs_fj:]) - len(txt)
_, used = dec.raw_decode(txt)
p = p[:abs_fj + lead] + json.dumps(LEAFLET_FAQ, ensure_ascii=False, indent=2).replace('\n', '\n  ') + p[abs_fj + lead + used:]
io.open(ROOT/'src/data/products.ts', 'w', encoding='utf-8', newline='\n').write(p)
print('faqSchema replaced (4 items)')

# ---------- 4) CSV 行 + imageAlt 对齐 ----------
t2 = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
def get_field(src, loc, field):
    i = src.index('"%s":' % SLUG)
    block = src[i:i + 90000]
    li = block.index('"seo":')
    li2 = block.index('"%s":' % loc, li)
    seg = block[li2:]
    fi = seg.index('"%s":' % field)
    v, _ = dec.raw_decode(seg[fi + len('"%s":' % field):].lstrip())
    return v

rows = list(csv.reader(io.open(ROOT/'zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
def col(name, x):
    return hdr.index('%s(%s)' % (name, x))
patched = False
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    if r[si].strip() != SLUG:
        continue
    for li, loc in enumerate(('zh-hk', 'en', 'ja')):
        x = ('ZH', 'EN', 'JA')[li]
        r[col('SEO标题', x)] = LEAFLET_CSV['title'][loc]
        r[col('SEO描述', x)] = LEAFLET_CSV['description'][loc]
        r[col('H1标题', x)] = LEAFLET_CSV['h1'][loc]
        r[col('SEO关键词', x)] = LEAFLET_CSV['keywords'][loc]
        alt = get_field(t2, loc, 'imageAlt')
        r[col('图片Alt标签', x)] = alt
    patched = True
assert patched, 'leaflet row not found in CSV'
w = io.open(ROOT/'zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV leaflet row patched (12 SEO cells + 3 imageAlt aligned from ts)')
