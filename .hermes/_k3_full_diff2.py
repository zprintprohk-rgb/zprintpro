# -*- coding: utf-8 -*-
import subprocess, os
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
r = subprocess.run(['git', 'show', '1cda9f9', '--', 'src/app/[locale]/about/page.tsx'], capture_output=True, timeout=30, env=env)
# write raw bytes to avoid PS GBK
with open(r'F:\zprintpro-nextjs\.hermes\_k3_raw_1cda9f9.bin', 'wb') as f:
    f.write(r.stdout)
# count + lines
raw = r.stdout
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]
diff = raw.decode('utf-8', errors='replace')
adds = [l for l in diff.split('\n') if l.startswith('+') and not l.startswith('+++')]
print('1cda9f9 + lines: {0}'.format(len(adds)))
# Find image references
img_lines = [l for l in adds if 'img' in l or 'webp' in l or 'figure' in l or 'section' in l or '工廠' in l or '設備' in l or '車間' in l]
print('img/figure/section +: {0}'.format(len(img_lines)))
for l in img_lines[:20]:
    print(' ', l[:200])
