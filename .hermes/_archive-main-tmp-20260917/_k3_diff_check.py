# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\.hermes\_k3_diff_647eb25.txt', 'rb') as f:
    raw = f.read()
# skip BOM
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]
diff = raw.decode('utf-8', errors='replace')
adds = [l for l in diff.split('\n') if l.startswith('+') and ('img' in l or 'figure' in l or 'section' in l)]
print('647eb25 +image/figure/section lines: {0}'.format(len(adds)))
for a in adds[:30]:
    print(' ', a[:200])
print()
webps = re.findall(r'[\w-]+\.webp', diff)
print('webp mentions in diff: {0}'.format(len(webps)))
for w in sorted(set(webps)):
    print('  -', w)
