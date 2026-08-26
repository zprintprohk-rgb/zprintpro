import re

def textify(path):
    h = open(path, encoding='utf-8', errors='ignore').read()
    t = re.sub(r'<[^>]+>', '|', h)
    return re.sub(r'\s+', ' ', t)

t = textify('.hermes/tmp-eprint-digital-flyer.html')
i = t.find('$50')
print(t[max(0,i-900):i+1400])
