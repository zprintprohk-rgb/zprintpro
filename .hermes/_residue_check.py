# -*- coding: utf-8 -*-
# 线上探针: robots.txt + saddle/exercise H1 (CF build 后)
import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode('utf-8', errors='replace')
            return r.status, body
    except Exception as e:
        return 'ERR', str(e)

st, robots = get('https://zprintpro.com/robots.txt')
print('robots.txt status:', st)
if st == 200:
    ai = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bytespider', 'CCBot']
    missing = [a for a in ai if a not in robots]
    print('12 AI allow 缺失:', missing if missing else '无 (12/12 全含)')
    print('sitemap-image.xml:', 'sitemap-image.xml' in robots)
    print('含 /_next/ Disallow:', '/_next/' in robots)
    print('Disallow 行:', [l for l in robots.splitlines() if l.startswith('Disallow')])
else:
    print('robots 非 200:', robots[:200])

for path, h1pat in [('/en/product/saddle-stitch-booklets/', 'from 10 Copies'),
                     ('/en/product/exercise-books/', 'from 10 Copies')]:
    st2, html = get('https://zprintpro.com' + path)
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.S | re.I)
    h1 = h1s[0].strip() if h1s else '?'
    print(f'{path} status={st2} h1={h1[:70]} | 含"from 10 Copies": {"from 10 Copies" in h1}')
    for bad in ['100 本起印', '50冊〜', 'Perfect Bound, 4-color']:
        if bad in html:
            print(f'  ⚠ 残留: {bad}')
























