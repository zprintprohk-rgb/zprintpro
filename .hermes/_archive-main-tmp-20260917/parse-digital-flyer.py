import re

def textify(path):
    h = open(path, encoding='utf-8', errors='ignore').read()
    t = re.sub(r'<[^>]+>', '|', h)
    return re.sub(r'\s+', ' ', t)

t = textify('.hermes/tmp-eprint-digital-flyer.html')
m = re.search(r'<title>(.*?)</title>', open('.hermes/tmp-eprint-digital-flyer.html', encoding='utf-8', errors='ignore').read(), re.S)
print('TITLE:', m.group(1).strip() if m else None)
# 找價錢表区域
i = t.find('價錢表')
print(t[i:i+1800] if i >= 0 else 'no 價錢表; 找 $ 痕迹:')
if i < 0:
    print([x for x in re.findall(r'\$[\d,]+', t)][:20])
