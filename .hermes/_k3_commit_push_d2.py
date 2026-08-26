# -*- coding: utf-8 -*-
import subprocess, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['GIT_AUTHOR_NAME'] = 'K3-Mavis'
env['GIT_AUTHOR_EMAIL'] = 'k3@zprintpro.local'
env['GIT_COMMITTER_NAME'] = 'K3-Mavis'
env['GIT_COMMITTER_EMAIL'] = 'k3@zprintpro.local'
# stage contact
r = subprocess.run(['git', 'add', 'src/app/[locale]/contact/page.tsx'], capture_output=True, text=True, env=env)
print('add:', r.returncode)
r = subprocess.run(['git', 'diff', '--cached', '--stat'], capture_output=True, text=True, env=env)
print(r.stdout)
msg = '''fix(contact): 8/16 Push 2 (D) follow-up - contact 页 officeHoursValue + 24/7 WhatsApp + support JSX 渲染

修复 1cda9f9 commit 单引号 vs 双引号 mismatch, contact page 翻译字段没改:
- zh-hk officeHoursValue: 週一至週五 → 週一至週六 (週六也開) + (GMT+8)
- en officeHoursValue: Mon - Fri → Mon - Sat + (GMT+8)
- ja officeHoursValue: 月〜金 → 月〜土 + (GMT+8)
- 3 locale whatsapp247: 24/7 WhatsApp 即時回覆 (zh-hk/en/ja)
- 3 locale support: 中國大陸 24h 響應 · 香港本地客服

JSX 渲染:
- t.officeHoursValue 下方加 24/7 WhatsApp + support 副文案
- 3 个 data-cf-analytics attr:
  · contact_office_hours_view
  · contact_whatsapp_247_view
  · contact_support_view

K3 17:49 拍板 (Push 2 D 完整版) - 转化基建完整 = 服务时间 + 24/7 WhatsApp + 中國大陸 24h
'''
with open(r'F:\zprintpro-nextjs\.hermes\_k3_commit_d2.txt', 'w', encoding='utf-8') as f:
    f.write(msg)
r = subprocess.run(['git', 'commit', '-F', r'.hermes\_k3_commit_d2.txt'], capture_output=True, text=True, env=env, timeout=60)
print('commit:', r.returncode)
print(r.stdout)
print(r.stderr[-500:] if r.stderr else '')
print()
t0 = time.time()
r = subprocess.run(['git', 'push', 'origin_ssh', 'main'], capture_output=True, text=True, env=env, timeout=60)
print('push:', r.returncode, 'elapsed', time.time()-t0)
print(r.stderr[-300:] if r.stderr else '')
print()
r = subprocess.run(['git', 'log', '--oneline', '-4'], capture_output=True, text=True, env=env)
print(r.stdout)
