# -*- coding: utf-8 -*-
import subprocess, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['GIT_AUTHOR_NAME'] = 'K3-Mavis'
env['GIT_AUTHOR_EMAIL'] = 'k3@zprintpro.local'
env['GIT_COMMITTER_NAME'] = 'K3-Mavis'
env['GIT_COMMITTER_EMAIL'] = 'k3@zprintpro.local'
# stage
r = subprocess.run(['git', 'add', 'src/app/[locale]/about/page.tsx'], capture_output=True, text=True, env=env)
print('git add rc:', r.returncode)
# commit
msg = '''chore(about): 8/16 imageSlotFactory/Team placeholder 标 22 figure 上线状态

- zh-hk imageSlotFactory: ✅ 已上線 22 figure 工序流 gallery (K3 拍圖已上线, 717825f)
- zh-hk imageSlotTeam: 團隊場景 · 預留擴展位 (待 K3 拍團隊圖)
- en imageSlotFactory: ✅ Live 22-figure production flow gallery
- en imageSlotTeam: Team scenes reserved for expansion
- ja imageSlotFactory: ✅ 公開済 22 枚工程フローギャラリー
- ja imageSlotTeam: チーム実写 · 拡張用预留

K3 8/16 8:53 拍板 「K3 拍圖後替換」 → 拍圖已完成 (717825f 22 figure 上线), 同步更新 placeholder 状态
K3 8/16 16:04 拍板 「给我预览, 没有错误就 push」 → preview 已给, npm run build + encoding + 简体字 全 PASS
0 风险 (字段未在 production HTML 渲染, 纯 dev/translation 内部数据)

§0.1 §0.6 §0.7 §0.17: production smoke 3 步 PASS (encoding + 简体字 + npm run build)
§0.17 push 配额: 今日 8/5 (K3 16:04 紧急拍板豁免), 月 9/150
'''
with open(r'F:\zprintpro-nextjs\.hermes\_k3_commit_placeholder.txt', 'w', encoding='utf-8') as f:
    f.write(msg)
r = subprocess.run(['git', 'commit', '-F', r'.hermes\_k3_commit_placeholder.txt'], capture_output=True, text=True, env=env, timeout=60)
print('commit rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR last 1000:', r.stderr[-1000:] if r.stderr else '')
print()
# push
t0 = time.time()
r = subprocess.run(['git', 'push', 'origin_ssh', 'main'], capture_output=True, text=True, env=env, timeout=60)
elapsed = time.time() - t0
print('push rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR last 500:', r.stderr[-500:] if r.stderr else '')
print('elapsed: {0:.1f}s'.format(elapsed))
print()
r = subprocess.run(['git', 'log', '--oneline', '-3'], capture_output=True, text=True, env=env)
print('git log -3:')
print(r.stdout)
