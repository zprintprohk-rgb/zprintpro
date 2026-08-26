# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\.hermes\_k3_raw_647eb25.bin', 'rb') as f:
    raw = f.read()
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]
diff = raw.decode('utf-8', errors='replace')
# Look for all <figure / alt changes
fig_adds = [l for l in diff.split('\n') if l.startswith('+') and ('<figure' in l or '</figure>' in l or '.webp' in l or 'alt=' in l)]
print('647eb25 figure/img adds: {0}'.format(len(fig_adds)))
for l in fig_adds[:30]:
    print(' ', l[:200])
print()
fig_rems = [l for l in diff.split('\n') if l.startswith('-') and ('<figure' in l or '</figure>' in l or '.webp' in l)]
print('647eb25 figure/img rems: {0}'.format(len(fig_rems)))
for l in fig_rems[:30]:
    print(' ', l[:200])
print()
# Check the SRC for total webp count
src = open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8').read()
src_figs = re.findall(r'<figure', src)
src_imgs = re.findall(r'<img', src)
print('current page.tsx source: figure={0}, img={1}'.format(len(src_figs), len(src_imgs)))
