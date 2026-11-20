# -*- coding: utf-8 -*-
import os, subprocess, time
for f in ['public/sitemap.xml', 'public/sitemap-index.xml', 'public/sitemap-en.xml', 'public/sitemap-image.xml']:
    p = r'F:\zprintpro-nextjs' + '/' + f
    mtime = os.path.getmtime(p)
    print('{0}: mtime={1}'.format(f, time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(mtime))))
print()
out = subprocess.run(['git', 'log', '--pretty=format:%h %ai %s', '-5'], capture_output=True, text=True, encoding='utf-8', cwd=r'F:\zprintpro-nextjs')
print(out.stdout)
print()
with open(r'F:\zprintpro-nextjs\public\sitemap.xml', 'r', encoding='utf-8') as fp:
    head = fp.read(500)
print('sitemap.xml head:')
print(head)
print('---')
# 看看 diff 是增是减
out = subprocess.run(['git', 'diff', '--stat', 'HEAD', '--', 'public/sitemap.xml'], capture_output=True, text=True, encoding='utf-8', cwd=r'F:\zprintpro-nextjs')
print('diff stat:')
print(out.stdout)
# 看 diff 前 30 行
out = subprocess.run(['git', 'diff', 'HEAD', '--', 'public/sitemap.xml'], capture_output=True, text=True, encoding='utf-8', cwd=r'F:\zprintpro-nextjs')
lines = out.stdout.splitlines()
print('diff first 30 lines:')
for l in lines[:30]:
    print(l)
