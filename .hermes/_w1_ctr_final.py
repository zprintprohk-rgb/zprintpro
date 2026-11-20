# -*- coding: utf-8 -*-
# 文件回读终检: titles 当量带 / desc 真值 / 品牌层
import io, re, subprocess
s = io.open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
# node equiv 测量
cand = {}
for cat in ('paper-bags', 'menus', 'packaging'):
    i = s.index("'%s': {" % cat)
    seg = s[i:i + 6000]
    ti = seg.index('titles:')
    di = seg.index('descriptions:')
    for loc, key in (('zh-hk', "'zh-hk': '"), ('en', "en: '"), ('ja', "ja: '")):
        mt = re.search(re.escape(key) + r"([^']+)'", seg[ti:di])
        md = re.search(re.escape(key) + r"([^']+)'", seg[di:])
        if mt:
            cand['%s.%s.title' % (cat, loc)] = mt.group(1)
        if md:
            cand['%s.%s.desc' % (cat, loc)] = md.group(1)
import json
js = 'const m=require("./scripts/guards/title-equiv.js");const eq=m.equivalentChars||m.default||m.equiv||m;const d=%s;for(const[k,v]of Object.entries(d)){if(k.endsWith(".title"))console.log(eq(v),k,"|",v.slice(0,50))}' % json.dumps({k: v for k, v in cand.items() if k.endswith('title')}, ensure_ascii=False)
io.open(r'F:\zprintpro-nextjs\.hermes\_w1_ctr_final_equiv.mjs', 'w', encoding='utf-8').write(js)
# 真值/品牌 lint
BAD = []
for k, v in cand.items():
    for x in ('0.14', '¥20〜', 'HK$0.22', '$0.85', '100張起訂'):
        if x in v:
            BAD.append((k, x))
    if k.endswith('.title') or k.endswith('.desc'):
        loc = k.split('.')[1]
        if loc == 'zh-hk' and 'ZprintPro' in v:
            BAD.append((k, 'brand-leak'))
        if loc in ('en', 'ja') and '智印港' in v:
            BAD.append((k, 'brand-leak-ja/en'))
print('lint BAD:', BAD if BAD else 'none')
# 新真值必须在位
for k, v in cand.items():
    cat = k.split('.')[0]
    if cat == 'menus' and ('$1.84' in v or '¥258' in v or 'HK$5' in v):
        pass
print('menus.zh title:', cand.get('menus.zh-hk.title'))
print('menus.en title:', cand.get('menus.en.title'))
print('paper-bags.zh desc head:', cand.get('paper-bags.zh-hk.desc', '')[:60])
