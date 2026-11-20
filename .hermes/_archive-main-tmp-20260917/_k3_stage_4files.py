# -*- coding: utf-8 -*-
import subprocess, os
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
files = [
    'src/components/layout/Footer.tsx',
    'src/app/[locale]/contact/page.tsx',
    'src/app/[locale]/contact/ContactFormWrapper.tsx',
    'src/components/quote/QuoteForm.tsx',
    'src/app/[locale]/about/page.tsx',
]
# git add one by one
for f in files:
    r = subprocess.run(['git', 'add', f], capture_output=True, text=True, env=env)
    print('{0}: rc={1}'.format(f, r.returncode))
print()
# diff stat
r = subprocess.run(['git', 'diff', '--cached', '--stat'], capture_output=True, text=True, env=env)
print(r.stdout)
