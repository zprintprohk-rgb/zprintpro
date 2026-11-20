import json, re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

loc = sys.argv[1] if len(sys.argv) > 1 else 'en'
d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
c = d['roll-up-banner-printing-guide']['content']
# 每个 HTML 块一行，便于读
blocks = re.split(r'(?=<)', c)
out = []
for b in blocks:
    stripped = re.sub(r'\s+', ' ', b).strip()
    if stripped:
        out.append(stripped)
print('=== %s content: %d blocks ===' % (loc, len(out)))
for i, b in enumerate(out):
    print('[%02d] %s' % (i, b[:500]))
