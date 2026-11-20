# -*- coding: utf-8 -*-
"""ja 补足第三轮: 内側ページ・罫線の選び方 (源自 products.ts 三種內頁選項, 零新声明)"""
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
if '内側ページ・罫線は' in c:
    print('already patched, skip'); sys.exit(0)

PARA = ('<p><strong>内側ページ・罫線はどう選ぶ？</strong> 内側は「横罫・方眼・無地」の 3 種類から選べます。'
        '横罫は書き取り・国語・英語の練習に、方眼は算数・図形・グラフの学習に、無地は自由帳やスケッチに最適です。'
        '罫線の有無・行間・マス目の指定は入稿時にご指定ください。プリプレスチームが学年と用途に合わせて'
        'レイアウトの初期案を無料で作成し、校正で確定してから印刷に入ります。</p>')

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
print('ja: %d -> %d | ja/en=%.0f%%' % (len(c) - len(PARA) - 1, len(c), len(c) / en * 100))
