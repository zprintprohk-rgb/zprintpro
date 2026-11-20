# -*- coding: utf-8 -*-
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\functions\robots.txt.ts', encoding='utf-8').read()
# 稳健提取: 取 'const body = ' 后的第一个反引号 到 最后一个反引号
start = src.index('const body = ') + len('const body = ')
assert src[start] == '', '起始反引号缺失'
end = src.rindex('')
body = src[start+1:end]
print('body length:', len(body))
AI = ['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-Web','anthropic-ai',
      'PerplexityBot','Perplexity-User','Google-Extended','Applebot-Extended','Bytespider','CCBot']
n = sum(1 for a in AI if 'User-agent: '+a in body)
print('12 AI allow:', n == 12, f'({n}/12)')
print('sitemap.xml:', 'Sitemap: https://zprintpro.com/sitemap.xml' in body)
print('sitemap-image.xml:', 'Sitemap: https://zprintpro.com/sitemap-image.xml' in body)
print('no /_next/ Disallow:', '/_next/' not in body)
print('Disallow group:', all(d in body for d in ['/admin/','/api/','/cdn-cgi/','/manifest.json','/manifest.webmanifest','/sw.js','/workbox-*.js']))
print('User-agent: *:', 'User-agent: *' in body)
print('首行:', body.splitlines()[0][:60])
