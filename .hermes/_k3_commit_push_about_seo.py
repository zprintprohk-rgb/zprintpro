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
print('git add:', r.returncode)
# diff stat
r = subprocess.run(['git', 'diff', '--cached', '--stat'], capture_output=True, text=True, env=env)
print(r.stdout)
# commit
msg = '''feat(about): 8/16 关于我们板块 text + SEO + GEO + internal link 大改 (K3 16:51 拍板 "重要内容")

35 处改 × 3 locale (工厂图 22 figure 部署后第二批增量):
- factorySectionSubtitle: 3 locale - 加 6 stage 工序流概览 + #factory anchor link
- processSteps step 4/5: 3 locale - 加 22 figure + #factory + 主营品类 link (/category/stickers/ /flyers/ /packaging/ /paper-bags/) + 198 wa.me + /contact/
- advantages 3 项: 3 locale - 突出 22 figure 工序流 + 198 联系号 + 1,000+ 客户
- teams 3 项: 3 locale - 198 联系号 (call + WhatsApp 统一) + /contact/
- industries 6 Tier A: 3 locale - 加 /category/ + /blog/cross-border-ecommerce-shipping-box-guide/ 跨品类 internal link

SEO 优化:
- title: 主关键词前置 (印刷/printing/印刷サービス)
- meta: 3 locale 跨市场 (US/UK/AU/JP/HK)
- H1: 唯一, 含核心关键词 + 22 figure 工序流入口
- 内部链接: /quote/ + /contact/ + /category/ + /blog/ + /about/#factory

GEO 优化:
- 3 locale 内容分层 (zh-hk 香港场景 / en 全球通用 / ja 日本市場)
- §13.10 NAP 脱钩: en/ja 删 "Shenzhen" supplier origin (保留 22 figure + 自身优势)
- NAP 法律名 (深圳市彩龍印刷包裝) 仅 footer/contact/legal (per §13.10)
- 加 198 联系号 (真实主体 198 拍板 phase-out 8/7, 旧 181 phase-out)

K3 16:51 拍板:
- 关于我们 = 重要内容
- 不受 §0.17 1 天 ≤ 5 push 限制
- SEO + GEO + 超链接 优化

§0.1 §0.6 §0.7 §0.17: production smoke 3 步 PASS (encoding + 简体字 + npm run build 603 URLs)
'''
with open(r'F:\zprintpro-nextjs\.hermes\_k3_commit_about_seo.txt', 'w', encoding='utf-8') as f:
    f.write(msg)
r = subprocess.run(['git', 'commit', '-F', r'.hermes\_k3_commit_about_seo.txt'], capture_output=True, text=True, env=env, timeout=60)
print('commit rc:', r.returncode)
print('STDOUT:', r.stdout)
print('STDERR last 800:', r.stderr[-800:] if r.stderr else '')
# push
t0 = time.time()
r = subprocess.run(['git', 'push', 'origin_ssh', 'main'], capture_output=True, text=True, env=env, timeout=60)
elapsed = time.time() - t0
print('push rc:', r.returncode)
print('STDERR:', r.stderr[-500:] if r.stderr else '')
print('elapsed: {0:.1f}s'.format(elapsed))
# log
r = subprocess.run(['git', 'log', '--oneline', '-3'], capture_output=True, text=True, env=env)
print(r.stdout)
