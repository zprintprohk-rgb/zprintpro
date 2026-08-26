# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\.hermes\_k3_raw_1cda9f9.bin', 'rb') as f:
    raw = f.read()
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]
diff = raw.decode('utf-8', errors='replace')
# Find added image/figure lines (only + not +++)
adds = [l[1:] for l in diff.split('\n') if l.startswith('+') and not l.startswith('+++')]
img_adds = [l for l in adds if ('img' in l or 'figure' in l or 'webp' in l)]
print('1cda9f9 +img/figure/webp lines: {0}'.format(len(img_adds)))
for l in img_adds:
    print(' ', l[:200])
print()
print('--- removed (- lines) ---')
rems = [l[1:] for l in diff.split('\n') if l.startswith('-') and not l.startswith('---')]
img_rems = [l for l in rems if ('img' in l or 'figure' in l or 'webp' in l)]
print('1cda9f9 -img/figure/webp lines: {0}'.format(len(img_rems)))
for l in img_rems:
    print(' ', l[:200])
