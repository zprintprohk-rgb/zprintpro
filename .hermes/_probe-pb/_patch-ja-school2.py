# -*- coding: utf-8 -*-
"""ja 补足第二轮: 数量別コスト最適化段 (数字全部已在 ja 正文/FAQ 中, 零新声明)"""
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
if '数量別のコスト最適化は' in c:
    print('already patched, skip'); sys.exit(0)

SEC = ('<h2>数量別のコスト最適化はどう考える？</h2>'
       '<p>本体価格は部数ティアで下がります：<strong>100 冊 HK$3.5/冊</strong>から、1,000 冊で HK$2.8/冊（-20%）、'
       '5,000 冊で HK$2.2/冊（-37%）、10,000 冊で HK$1.8/冊（-49%）。この価格は版を共有する「共通版」のティアで、'
       '100 冊からの少部数でもオフセット品質を維持できる仕組みです。'
       '学年ごとに分ける場合は、同じ版で表紙だけ差し替える「表紙差し替え」が最もコスト効率が良く、'
       '本文が同一なら部数をまとめるほど単価が下がります。'
       '反対に、学年ごとに本文の罫線や問題が変わる場合は、版を分ける分だけ単価が上がるため、'
       '発注前に「どの学年まで共通本文でよいか」を決めておくと見積もりがぶれません。'
       '品質面では全数検品（部数・ページ順・罫線・裁ち落とし）を実施し、'
       '納品後 30 日間の品質保証が付きます。不明点は WhatsApp で 24 時間以内に回答します。</p>')

anchor = '<h2>5 内部リンク</h2>'
idx = c.find(anchor)
if idx < 0:
    print('anchor NOT FOUND'); sys.exit(1)
c = c[:idx] + SEC + '\n' + c[idx:]
e['content'] = c
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
c2 = json.load(open(path, encoding='utf-8'))[SLUG]['content']
assert len(c2) == len(c), 'redump'
en = len(json.load(open('src/data/blog-data/en.json', encoding='utf-8'))[SLUG]['content'])
print('ja: %d -> %d | ja/en=%.0f%%' % (len(c) - len(SEC) - 1, len(c), len(c) / en * 100))
