# -*- coding: utf-8 -*-
import subprocess, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['GIT_AUTHOR_NAME'] = 'M3'
env['GIT_AUTHOR_EMAIL'] = 'm3@zprintpro.local'
env['GIT_COMMITTER_NAME'] = 'M3'
env['GIT_COMMITTER_EMAIL'] = 'm3@zprintpro.local'
# commit msg 写文件, 然后 -F
commit_msg = '''chore(sitemap): 8/16 next-sitemap regen - lastmod 2026-08-14 -> 2026-08-16

M-time 9:14:35 (8/16) 触发生成, lastmod 字段升级. 603 URLs across
4 sitemaps + 266 product image URLs (next-sitemap build artifact).

Diff stat: 6 files, 603 + / 603 - (纯 lastmod 字段替换).

K3 8/16 09:45 拍板: 直接 push 部署.
npm run build PASS (603 URLs / Categories 14 / Products 85 / Blog 85).
Push 配额: 今日 4/5 (per K3 8/8 15:35 §0.17).
'''
with open(r'F:\zprintpro-nextjs\.hermes\_k3_commit_msg_sitemap.txt', 'w', encoding='utf-8') as f:
    f.write(commit_msg)
r = subprocess.run(['git', 'commit', '-F', r'.hermes\_k3_commit_msg_sitemap.txt'], capture_output=True, text=True, env=env, timeout=60)
print('commit rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR:', r.stderr[-500:] if r.stderr else '')
print()
# git log 看新 commit
r = subprocess.run(['git', 'log', '--oneline', '-3'], capture_output=True, text=True, env=env)
print('git log -3:')
print(r.stdout)
