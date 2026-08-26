import re

h = open('.hermes/tmp-eprint-mono-booklet.html', encoding='utf-8', errors='ignore').read()
t = re.sub(r'<[^>]+>', '|', h)
t = re.sub(r'\s+', ' ', t)
m = re.search(r'<title>(.*?)</title>', h, re.S)
print('TITLE:', m.group(1).strip() if m else None)
# 找 本/張 + $ 价目区
i = t.find('價目表')
if i >= 0:
    print(t[i:i+2500])
else:
    hits = re.findall(r'\$[\d,]+(?:\.\d+)?', t)
    print('prices:', hits[:30])
