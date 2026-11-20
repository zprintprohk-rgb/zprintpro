# -*- coding: utf-8 -*-
# full tables of poster-printing-guide (zh) + orphan scan of other poster guides
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json', encoding='utf-8'))
content = d['poster-printing-guide']['content']
# print tables fully
for m in re.finditer(r'<table.*?</table>', content, re.S):
    print('=== TABLE ===')
    print(re.sub(r'\s+', ' ', m.group(0))[:1500])
    print()
# print the material list block + Q sections fully
for pat in [r'<p>5 種紙質揀邊個.*?</p>', r'<li><strong>A3 / A4.*?</li>', r'<li><strong>A1 / A2 / A0.*?</li>', r'<li><strong>A1 數碼急件.*?</li>', r'<p>以下 3 個組合.*?</p>']:
    for m in re.finditer(pat, content, re.S):
        print('=== SEG ===')
        print(re.sub(r'\s+', ' ', m.group(0))[:900])
        print()
print('=== orphan-family scan: OTHER poster guides ===')
tokens = ['HK$0.30', 'HK$0.80', 'HK$1.20', 'HK$3.50', 'HK$2.00', 'HK$8-120', 'HK$15-120', 'HK$15-30', 'HK$60-120', 'HK$8-15', '¥200', '¥300-600', 'US$8-15']
for slug in ['poster-size-guide', 'retail-shop-poster-printing-guide', 'marathon-event-poster-printing-guide', 'real-estate-floor-plan-poster-printing-guide']:
    p = d.get(slug)
    if not p: continue
    s = json.dumps(p, ensure_ascii=False)
    for tok in tokens:
        for mm in re.finditer(re.escape(tok), s):
            ctx = s[max(0, mm.start()-55):mm.end()+45].replace('\\n',' ').replace('\\"','"')
            print(f'{slug} :: [{tok}] ...{ctx[:120]}...')
