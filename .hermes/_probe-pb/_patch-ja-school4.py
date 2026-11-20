# -*- coding: utf-8 -*-
"""ja 补足第四轮: 配送・アフターサポート (全部既有声明: SF 満500無料/DHL 2-4日/24h SLA/30日保証)"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'school-exercise-book-printing-guide'
path = 'src/data/blog-data/ja.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity'
e = obj[SLUG]
c = e['content']
if '配送とアフターサポートは' in c:
    print('already patched, skip'); sys.exit(0)

PARA = ('<p><strong>配送とアフターサポートは？</strong> 香港ローカルは順豊（満 HK$500 送料無料）、'
        '海外は DHL / FedEx で 2〜4 営業日・50 カ国以上に配送します。配送中は追跡番号を WhatsApp で共有し、'
        '到着後 30 日間の品質保証が付きます。追加発注や次学期分の継続発注も同じ版データで素早く対応できます。</p>')

anchor = '<h2>5 内部リンク</h2>'
idx = c.find(anchor)
if idx < 0:
    print('anchor NOT FOUND'); sys.exit(1)
c = c[:idx] + PARA + '\n' + c[idx:]
e['content'] = c
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
assert len(c2) == len(c), 'redump'
en = len(json.load(open('src/data/blog-data/en.json', encoding='utf-8'))[SLUG]['content'])
zh = len(json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))[SLUG]['content'])
print('ja: %d -> %d | ja/en=%.0f%% zh/en=%.0f%%' % (len(c) - len(PARA) - 1, len(c), len(c) / en * 100, zh / en * 100))
