# -*- coding: utf-8 -*-
# 簇3 终检: 文件回读 lint + 内链真实性
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
SIMP = set('线发务动优仅们风飞历压县双变叶吗听启员呛响哑哒团围图圣场坏块坚坝备复够奋奖妇娱孙宁实宠审宫宽寻导尝层屿岁岚岛岭币帅带并庆库庙废弯弹归彻径忧怀恳恼悬惊惯愤愿戏战户扩扫扬扰抚抛抢护报拥拦拨择挂挠挡挣挤挥损换捣掷摆摇摊显晓暂机杀杂权构枪标栏树桥欢毙气沟沦泪泼浆测济浓涂润涨渐渔滚滤灭灾炼烂烦烧热牵献犹独狮猎环现疗疮疯皱盐盘祷祸离积稳穷窝窥竞笔签紧红级纯纲纵纸练组细织终经结绘绝绣续绳维绵绿缓编缩缴网罗羡翘职聪肃肾肿脏腊腾云价众伙传伤伦伫买乱争艺')
BANWORDS = ['工艺', '自带', '投产', '历年', '红包', '覆膜', '配电', '高频', '承载', '互译']
FAB = ['1,200 萬', '1200 萬', '年間1200', '40 萬', '40万', '300 萬', '300万', 'A/B', '+23%', '+31%', '3M', 'MBO', 'Stahl', '±0.5', '€', '智印印港', '名片', '咭片', '名刺', 'business card']

def lint(loc, text, tag):
    bad = [c for c in SIMP if c in text]
    words = [w for w in BANWORDS if w in text]
    fab = [w for w in FAB if w in text]
    assert not bad, (tag, loc, 'simp', bad[:6])
    assert not words, (tag, loc, 'word', words)
    assert not fab, (tag, loc, 'fab', fab)
    if loc == 'zh-hk':
        assert 'ZprintPro' not in text, (tag, 'brand-leak')
        assert '智印港' in text, (tag, 'missing-brand')
    else:
        assert '智印港' not in text, (tag, 'brand-leak')

cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
t = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
p = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
dec = json.JSONDecoder()

def hub_span(name):
    i = cs.index('const %s' % name)
    depth, instr, esc = 0, False, False
    k = cs.index('{', i)
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
    return cs[i:cs.index(';', k) + 1]

links_total = []
for name in ('flyersContent', 'postersContent'):
    blk = hub_span(name)
    for loc, key in (('zh-hk', "'zh-hk': {"), ('en', 'en: {'), ('ja', 'ja: {')):
        li = blk.index(key)
        end = blk.find("\n  },", li)
        seg = blk[li:end if end > -1 else len(blk)]
        lint(loc, seg, name)
        links_total += re.findall(r"href: '(/[^']+)'", seg)
    print(name, 'lint OK, bytes:', len(blk))

# leaflet 3 bodies
i = t.index('"folded-leaflets":')
blk = t[i:i+90000]
for loc in ('zh-hk', 'en', 'ja'):
    li = blk.index('"seo":')
    li = blk.index('"%s":' % loc, li)
    seg = blk[li:]
    bi = seg.index('"body":')
    body, _ = dec.raw_decode(seg[bi+7:].lstrip())
    lint(loc, body, 'leaflet')
    links_total += re.findall(r'\]\((/[^)]+)\)', body)
print('leaflet bodies lint OK')

# 链接真实性: /locale/product/xxx/ 或 /locale/category/xxx/ 或 /locale/quote/
for u in links_total:
    parts = u.strip('/').split('/')
    kind = parts[1]
    if kind == 'product':
        assert ("slug: '%s'" % parts[2]) in p, u
    elif kind == 'category':
        assert ("'%s':" % parts[2]) in cs or ('%s:' % parts[2]) in cs, u
    elif kind == 'quote':
        pass
    else:
        raise AssertionError(u)
print('links all real:', len(links_total))

# faqSchema 4 条
pi = p.index("slug: 'folded-leaflets'")
pseg = p[pi:pi+90000]
fj = pseg.index('faqSchema:')
arr, _ = dec.raw_decode(pseg[fj+10:].lstrip())
assert len(arr) == 4 and all(x['question'] for x in arr)
print('faqSchema OK:', arr[0]['question'][:60])
print('ALL FINAL LINT PASS')
