# -*- coding: utf-8 -*-
import subprocess, os
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['GIT_AUTHOR_NAME'] = 'K3-Mavis'
env['GIT_AUTHOR_EMAIL'] = 'k3@zprintpro.local'
env['GIT_COMMITTER_NAME'] = 'K3-Mavis'
env['GIT_COMMITTER_EMAIL'] = 'k3@zprintpro.local'
# PREVIEW diff for K3
print('=== PREVIEW: git diff HEAD -- src/app/[locale]/about/page.tsx ===')
r = subprocess.run(['git', 'diff', '--no-color', 'HEAD', '--', 'src/app/[locale]/about/page.tsx'], capture_output=True, text=True, env=env)
diff = r.stdout
# only show imageSlot lines for preview brevity
keep = []
for line in diff.split('\n'):
    if 'imageSlot' in line or line.startswith('@@') or line.startswith('diff --git') or line.startswith('index'):
        keep.append(line)
for line in keep:
    print(line)
print()
print('=== total diff stat ===')
r = subprocess.run(['git', 'diff', '--stat', 'HEAD', '--', 'src/app/[locale]/about/page.tsx'], capture_output=True, text=True, env=env)
print(r.stdout)
