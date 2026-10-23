# -*- coding: utf-8 -*-
# alignment prototype: for a ja 多個 window, find en sibling passage via shared numerals
import json, re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ja = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\ja.json', encoding='utf-8'))
en = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\en.json', encoding='utf-8'))

def windows_with(s, needle, w=80):
    out = []
    for m in re.finditer(re.escape(needle), s):
        out.append(s[max(0, m.start()-w):m.end()+w])
    return out

def nums(s):
    return re.findall(r'[0-9][0-9,\.]*', s)

tests = [
    ('cosmetics-packaging-box-printing-guide', '500-多個 MOQ'),
    ('industrial-nameplate-printing-guide', '多個 $156'),
    ('packaging-box-price-2026', '500 個 -10%、多個 -20%'),
    ('tea-beverage-gift-box-printing-guide', '1,000-多個 MOQ、1 箱 ¥30'),
]
for slug, needle in tests:
    print(f'==== {slug} | {needle} ====')
    post_ja = ja[slug]
    s_ja = json.dumps(post_ja, ensure_ascii=False)
    for w in windows_with(s_ja, needle)[:2]:
        print('  [ja]', w.replace('\n', ' ')[:140])
        cand = set(n for n in nums(w) if len(n) >= 2 or n in ('24','42','62','31','114'))
        post_en = en.get(slug)
        s_en = json.dumps(post_en, ensure_ascii=False)
        best = None
        for n in cand:
            for m in re.finditer(re.escape(n), s_en):
                ctx = s_en[max(0, m.start()-90):m.end()+90].replace('\n',' ')
                if best is None or len(ctx) > len(best): best = ctx
                break
        if best: print('  [en~]', best[:170])
        else: print('  [en~] NO NUMERIC ANCHOR', sorted(cand))
    print()
