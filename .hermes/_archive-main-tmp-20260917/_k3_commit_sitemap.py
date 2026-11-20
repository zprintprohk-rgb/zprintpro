# -*- coding: utf-8 -*-
import subprocess, os
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
# Stage 6 sitemap
r = subprocess.run(['git', 'add', 'public/sitemap.xml', 'public/sitemap-en.xml', 'public/sitemap-ja.xml', 'public/sitemap-zh-hk.xml', 'public/sitemap-image.xml', 'public/sitemap-index.xml'], capture_output=True, text=True, env=env)
print('git add rc:', r.returncode)
print(r.stdout)
print(r.stderr)
print()
# Pre-commit hook: encoding + 简体字
r = subprocess.run(['git', 'status', '-sb'], capture_output=True, text=True, env=env)
print('git status after add:')
print(r.stdout)
