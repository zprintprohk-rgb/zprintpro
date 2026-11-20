# -*- coding: utf-8 -*-
# precise orphan-family scan across ALL blog-data (3 locales) — only the known wrong tokens
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
tokens = ['HK$1.5', 'HK$1.8', 'HK$3.5', 'US$0.19', 'US$0.23', 'US$0.45', '¥22', '¥28', '¥55',
          'HK$6-9', 'HK$10-16', 'HK$2.5 起/本', '$1.20', '¥180', '¥500', 'HK$10 起',
          '0.19 each', '0.23 each', '0.45 each']
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    print(f'########## {loc} ##########')
    for slug, post in d.items():
        s = json.dumps(post, ensure_ascii=False)
        for tok in tokens:
            for m in re.finditer(re.escape(tok), s):
                ctx = s[max(0, m.start()-70):m.end()+70].replace('\\n', ' ').replace('\\"', '"')
                print(f'{slug} :: [{tok}] ...{ctx}...')
    print()
