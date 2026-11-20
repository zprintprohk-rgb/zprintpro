# -*- coding: utf-8 -*-
"""ja 补足: 発注フロー段 (内容全部来自既有 FAQ Q3 六步, 零新声明) — 使 ja/en >= 80%"""
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
if '発注フローと支払いはどう進む' in c:
    print('already patched, skip'); sys.exit(0)

SEC = ('<h2>発注フローと支払いはどう進む？</h2>'
       '<p>発注は 6 ステップです：① WhatsApp で 30 秒見積もり（サイズ・用紙・部数・納期を送るだけ）→ '
       '② デジタル校正（表紙・本文・罫線を確認）→ ③ 50% 前金で生産開始 → ④ 5〜7 営業日で印刷・製本 → '
       '⑤ 100% 全数検品（部数・ページ順・罫線・裁ち落としを確認）→ ⑥ 順豊（香港ローカル）または DHL（海外 2〜4 日、50 カ国以上）で発送。'
       '支払いは HKD / USD の多通貨に対応し、前金 50%・残金は出荷前が標準です。'
       '学校案件では年間発注計画に合わせた分割納品（学期ごと・学年ごと）もご相談いただけます。'
       '見積もりは 24 時間 SLA で返信します。</p>')

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
