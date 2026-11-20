# -*- coding: utf-8 -*-
# 终检: 从文件读回全部新内容, 复跑 lint (品牌/简中/编造) + 内部链接真实性
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
SIMP = set('线发务动优仅们风飞历压县参双变叶吗听启员呛响哑哒团围图圣场坏块坚坝备复够奋奖妇娱孙宁实宠审宫宽寻导尝层屿岁岚岛岭币帅带并庆库庙废弯弹归彻径忧怀恳恼悬惊惯愤愿戏战户扩扫扬扰抚抛抢护报拥拦拨择挂挠挡挣挤挥损换捣掷摆摇摊显晓暂机杀杂权构枪标栏树桥欢毙气沟沦泪泼浆测济浓涂润涨渐渔滚滤灭灾炼烂烦烧热牵献犹独狮猎环现疗疮疯皱盐盘祷祸离积稳穷窝窥竞笔签紧红级纯纲纵纸练组细织终经结绘绝绣续绳维绵绿缓编缩缴网罗羡翘职聪肃肾肿脏腊腾云价众优伙传伤伦伫买乱争艺')
BANWORDS = ['工艺', '自带', '投产', '历年', '红包', '覆膜', '配电']
FAB = ['3 億', '3億', '800 萬', '800萬', '200+', '12 家上市', '12家上市', '3.2 倍', '3.2倍', '15 億', '15億', '2019', 'ΔE', '觀塘', '±0.2', 'e-print']

cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
i = cs.index('const redPacketsContent')
block = cs[i:i+30000]

def lint(loc, text):
    bad = [c for c in SIMP if c in text]
    words = [w for w in BANWORDS if w in text]
    fab = [w for w in FAB if w in text]
    assert not bad, (loc, 'simplified-char', bad[:8])
    assert not words, (loc, 'simplified-word', words)
    assert not fab, (loc, 'fabrication', fab)
    if loc == 'zh-hk':
        assert 'ZprintPro' not in text, (loc, 'brand-leak')
        assert '智印港' in text, (loc, 'missing brand')
    else:
        assert '智印港' not in text, (loc, 'brand-leak')

keys = {'zh-hk': "'zh-hk': {", 'en': 'en: {', 'ja': 'ja: {'}
starts = {loc: block.index(k) for loc, k in keys.items()}
order = sorted(starts, key=starts.get)
for idx, loc in enumerate(order):
    end = starts[order[idx+1]] if idx+1 < len(order) else block.index('\n};')
    seg = block[starts[loc]:end]
    lint(loc, seg)
    assert '利是封' in seg or 'red packet' in seg.lower() or 'ポチ袋' in seg or '祝儀袋' in seg
print('hub block lint OK x3 locales, bytes:', len(block))

# SKU bodies + faqSchema + 内链 URL 真实性
t = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
p = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
for slug in ('foil-red-packets', 'custom-red-packets'):
    i = t.index('"%s":' % slug)
    blk = t[i:i+90000]
    for loc in ('zh-hk', 'en', 'ja'):
        si = blk.index('"seo":')
        li = blk.index('"%s":' % loc, si)
        seg = blk[li:]
        bi = seg.index('"body":')
        body, _ = dec.raw_decode(seg[bi+7:].lstrip())
        lint(loc, body)
        links = re.findall(r'\]\((/[^)]+)\)', body)
        for u in links:
            seg2 = u.split('/')
            # /zh-hk/product/xxx/ 或 /en/category/yyy/
            kind, target = seg2[2], seg2[3]
            if kind == 'product':
                assert ("slug: '%s'" % target) in p, (slug, loc, u)
            else:
                assert ("'%s'" % target) in p, (slug, loc, u)
        print(slug, loc, 'body ok, links:', links)
    fi = p.index("slug: '%s'" % slug)
    fseg = p[fi:fi+90000]
    fj = fseg.index('faqSchema:')
    arr, _ = dec.raw_decode(fseg[fj+10:].lstrip())
    assert len(arr) == 4 and all(x['question'] and x['answer'] for x in arr)
    print(slug, 'faqSchema 4 items ok; Q1:', arr[0]['question'][:60])
print('ALL FINAL LINT PASS')
