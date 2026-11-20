# -*- coding: utf-8 -*-
# hkg 进攻面 title: poster-printing-guide + poster-printing-price-guide zh 加 HK$9 钩子
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
p = r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json'
d = json.load(open(p, encoding='utf-8'))
REPL = [
    ('poster-printing-guide',
     '香港海報印刷完全指南：尺寸、紙質、工藝與設計要點 | 智印港',
     '香港海報印刷 HK$9起：尺寸・紙質・工藝・設計要點 | 智印港'),
    ('poster-printing-price-guide',
     'A1 A2 海報印刷價格指南：單價・紙材・工藝・批量折扣全拆解 | 智印港',
     'A1 A2 海報印刷價格 HK$9起 單價紙材批量折扣 | 智印港'),
]
ok = 0
for slug, old, new in REPL:
    cur = d[slug].get('title', '')
    n = cur.count(old)
    if n != 1:
        print(f'FAIL count={n} {slug}: cur={cur[:60]}')
        continue
    d[slug]['title'] = cur.replace(old, new)
    print(f'OK {slug}: -> {new[:44]}')
    ok += 1
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(f'done {ok}/2')
