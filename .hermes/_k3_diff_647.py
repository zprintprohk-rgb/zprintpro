# -*- coding: utf-8 -*-
import subprocess, os
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
r = subprocess.run(['git', 'show', '647eb25', '--', 'src/app/[locale]/about/page.tsx'], capture_output=True, timeout=30, env=env)
with open(r'F:\zprintpro-nextjs\.hermes\_k3_raw_647eb25.bin', 'wb') as f:
    f.write(r.stdout)
raw = r.stdout
if raw[:3] == b'\xef\xbb\xbf':
    raw = raw[3:]
diff = raw.decode('utf-8', errors='replace')
adds = [l for l in diff.split('\n') if l.startswith('+') and not l.startswith('+++')]
img_adds = [l for l in adds if ('.webp' in l or '<figure' in l or '<img' in l or 'alt' in l or 'cap' in l)]
print('647eb25 +img/alt/cap lines: {0}'.format(len(img_adds)))
for l in img_adds[:30]:
    print(' ', l[:200])
print()
# removed
rems = [l for l in diff.split('\n') if l.startswith('-') and not l.startswith('---')]
img_rems = [l for l in rems if ('.webp' in l or '<figure' in l or '<img' in l or 'alt' in l or 'cap' in l or 'false' in l or 'true' in l)]
print('647eb25 -img lines: {0}'.format(len(img_rems)))
for l in img_rems[:20]:
    print(' ', l[:200])
