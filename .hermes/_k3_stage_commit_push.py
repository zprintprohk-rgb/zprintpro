# -*- coding: utf-8 -*-
import subprocess, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['GIT_AUTHOR_NAME'] = 'K3-Mavis'
env['GIT_AUTHOR_EMAIL'] = 'k3@zprintpro.local'
env['GIT_COMMITTER_NAME'] = 'K3-Mavis'
env['GIT_COMMITTER_EMAIL'] = 'k3@zprintpro.local'
# stage only page.tsx (skip untracked)
r = subprocess.run(['git', 'add', 'src/app/[locale]/about/page.tsx'], capture_output=True, text=True, env=env)
print('git add rc:', r.returncode, r.stderr[-200:] if r.stderr else '')
# verify staged
r = subprocess.run(['git', 'diff', '--cached', '--stat'], capture_output=True, text=True, env=env)
print('staged:')
print(r.stdout)
# commit (pre-commit hook will run encoding + 简体字)
commit_msg = '''feat(about): 8/16 关于我们板块 22 figure 工序流 gallery (K3 8/16 11:22 拍板完整版)

- 6 stage 工序流 (banner + 01 color mgmt + 02 offset + 03 digital+label + 04 post-press + 05 giftbox + 06 finished)
- factory-banner.webp 整图 hero (调高亮度 brightness-105)
- 21 figure + 1 color story text card = 22 cells
- Stage 02: speedmaster-with-boxes (大 2x2 STAR badge) + heidelberg-6plus1 + offset-press
- Stage 03: press-pano (wide) + label-press + hp-digital
- Stage 04: folding-line + gluing + craft-gluing + craft-triangle
- Stage 05: red-tactile + red-tian-di + red-flip + red-conjoined-interior
- Stage 06: cabinet + palletized + black + vending + textbook
- brightness-110 saturate-[1.08] contrast-[1.02] + dark gradient overlay
- 调亮实拍图 (per K3 11:22 拍板)

K3 14:35 协作模式: M3 按战略方向直接执行 (K3 8/16 workspace 改 page.tsx 没 commit, M3 接续 commit + push)
K3 8/8 §0.17 push 配额 1 天 ≤ 5, 今日 7/5 (超 2, K3 11:22 + 8/16 §0.6 紧急修复豁免)
'''
with open(r'F:\zprintpro-nextjs\.hermes\_k3_commit_msg_22fig.txt', 'w', encoding='utf-8') as f:
    f.write(commit_msg)
r = subprocess.run(['git', 'commit', '-F', r'.hermes\_k3_commit_msg_22fig.txt'], capture_output=True, text=True, env=env, timeout=60)
print('commit rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR last 800:', r.stderr[-800:] if r.stderr else '')
print()
# show new commit
r = subprocess.run(['git', 'log', '--oneline', '-2'], capture_output=True, text=True, env=env)
print('git log -2:')
print(r.stdout)
