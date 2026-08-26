import re

def textify(path):
    h = open(path, encoding='utf-8', errors='ignore').read()
    t = re.sub(r'<[^>]+>', '|', h)
    return re.sub(r'\s+', ' ', t)

for f, label in [('.hermes/tmp-eprint-digital-booklet.html', 'DIGITAL-BOOKLET'),
                 ('.hermes/tmp-eprint-offset-booklet.html', 'OFFSET-BOOKLET')]:
    t = textify(f)
    print('=====', label, 'len', len(t))
    for m in re.finditer(r'價目表|價錢表', t):
        i = m.start()
        print('--- 价表@', i, ':', t[i:i+1200])
        print()
        break
