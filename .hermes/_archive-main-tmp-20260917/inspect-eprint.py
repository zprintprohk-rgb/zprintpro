import re
h = open('.hermes/tmp-eprint-flyer.html', encoding='utf-8', errors='ignore').read()
print('len', len(h))
for pat in [r'HK\$\s*[\d,]+', r'\$[\d,]{2,}', r'price[^<]{0,80}', r'宣傳單張|单张|單張|flyer|Flyer|書刊|booklet']:
    m = re.findall(pat, h)[:8]
    print(pat, '->', m)
# 标题
t = re.search(r'<title>(.*?)</title>', h, re.S)
print('TITLE:', t.group(1) if t else None)
