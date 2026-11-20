# -*- coding: utf-8 -*-
import subprocess, os, time
os.chdir(r'F:\zprintpro-nextjs')
env = os.environ.copy()
env['PYTHONIOENCODING'] = 'utf-8'
env['GIT_AUTHOR_NAME'] = 'K3-Mavis'
env['GIT_AUTHOR_EMAIL'] = 'k3@zprintpro.local'
env['GIT_COMMITTER_NAME'] = 'K3-Mavis'
env['GIT_COMMITTER_EMAIL'] = 'k3@zprintpro.local'
msg = '''feat(contact+footer): 8/16 Push 2 (D) - 服务时间 + 24/7 WhatsApp + 中国大陆 24h 響應 + data-cf-analytics attr 全站启用

K3 17:49 拍板 (千问建议 D 优先 + K3 16:51 重要内容 + 不受 push 限制):
执行顺序 D → A → B (千问建议), D 是 "止血与造血" 紧急转化基建

改动 3 files / 38+/6-:
- src/components/layout/Footer.tsx (37+): 
  · 3 locale serviceHours (週一至週六 09:00-18:00 GMT+8 / Mon-Sat / 月〜土)
  · 3 locale whatsapp247 (24/7 即時回覆文案)
  · 3 locale support (中國大陸 24h 響應 · 香港本地客服 / China mainland 24h · Hong Kong local / 中国本土 24時間対応)
  · Footer tel: link + data-cf-analytics="footer_phone_click"
  · Footer mailto: link + data-cf-analytics="footer_email_click" + 16px/600 显眼化
  · Footer WhatsApp 列链接 + data-cf-analytics="footer_whatsapp_click"
- src/app/[locale]/contact/page.tsx (5+): 
  · 3 locale officeHoursValue: 週一至週五→週一至週六 (周六也开) + GMT+8
  · contact tel: link + data-cf-analytics="contact_phone_click"
  · contact mailto: link + data-cf-analytics="contact_email_click"
  · contact WhatsApp CTA + data-cf-analytics="contact_whatsapp_click"
- src/components/quote/QuoteForm.tsx (2+):
  · form onSubmit + data-cf-analytics="contact_quote_submit" (表单提交事件追踪)

千问建议 (战略层) 已应用:
- GEO: NAP 一致性 (198 + zprintpro@outlook.com + 深圳地址 全站统一)
- SEO: 24/7 WhatsApp 提示 + 服务时间显式 = E-E-A-T 强化
- Analytics: data-cf-analytics attribute 启用 (CF Web Analytics 0 成本, 替代 Plausible D1+D2 阻塞 2 周)

§0.1 §0.6 §0.7 §0.17: production smoke 3 步 PASS (encoding + 简体字 + npm run build 603 URLs)
K3 16:51 拍板豁免 §0.17 1 天 ≤ 5 push 限制 (重要内容)
'''
with open(r'F:\zprintpro-nextjs\.hermes\_k3_commit_d.txt', 'w', encoding='utf-8') as f:
    f.write(msg)
r = subprocess.run(['git', 'commit', '-F', r'.hermes\_k3_commit_d.txt'], capture_output=True, text=True, env=env, timeout=60)
print('commit rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR last 800:', r.stderr[-800:] if r.stderr else '')
print()
t0 = time.time()
r = subprocess.run(['git', 'push', 'origin_ssh', 'main'], capture_output=True, text=True, env=env, timeout=60)
elapsed = time.time() - t0
print('push rc:', r.returncode)
print('STDERR:', r.stderr[-500:] if r.stderr else '')
print('elapsed: {0:.1f}s'.format(elapsed))
print()
r = subprocess.run(['git', 'log', '--oneline', '-3'], capture_output=True, text=True, env=env)
print(r.stdout)
