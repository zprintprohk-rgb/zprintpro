# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\.hermes\_k3_diff_1cda9f9.txt', 'rb') as f:
    raw = f.read()
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]
diff = raw.decode('utf-8', errors='replace')
# Find all added lines (excluding +++ header)
adds = [l[1:] for l in diff.split('\n') if l.startswith('+') and not l.startswith('+++')]
print('1cda9f9 + lines: {0}'.format(len(adds)))
# Look for altTextbook / altFoldingLine / altBlack / etc
keys = ['altTextbook', 'altBlack', 'altCabinet', 'altPalletized', 'altVending', 'altFoldingLine', 'altPressPano', 'altGluing', 'altInterior', 'capTextbook', 'capFoldingLine', 'capPressPano']
for k in keys:
    if k in diff:
        # show context
        m = re.search(r'.{0,100}' + k + r'.{0,100}', diff)
        if m:
            print('  {0}: {1}'.format(k, m.group(0)[:200]))
print()
# Section markers
print('section +:')
for l in diff.split('\n'):
    if l.startswith('+') and ('section' in l or 'Section' in l or '工廠' in l or '設備' in l or '車間' in l or 'gallery' in l.lower()):
        print(' ', l[:200])
