# -*- coding: utf-8 -*-
# Push 后探针: robots.txt (CF Functions 方案) + buildId 对照 + 既有部署保持
import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except urllib.error.HTTPError as e:
        return e.code, ''
    except Exception as e:
        return 'ERR', f'{type(e).__name__}'

AI = ['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-Web','anthropic-ai',
      'PerplexityBot','Perplexity-User','Google-Extended','Applebot-Extended','Bytespider','CCBot']

print('=== 1. robots.txt ===')
st, body = get('https://zprintpro.com/robots.txt')
print(f'  status: {st}')
if st == 200:
    missing = [a for a in AI if a not in body]
    print(f'  12 AI allow: {"全命中" if not missing else "缺失 " + str(missing)}')
    print(f'  sitemap-image.xml: {"sitemap-image.xml" in body} | sitemap.xml: {"Sitemap: https://zprintpro.com/sitemap.xml" in body}')
    print(f'  /_next/ Disallow: {"/_next/" in body}')
else:
    print('  FAIL: 非 200')

print('=== 2. buildId 对照 ===')
st2, html = get('https://zprintpro.com/en/')
bid = re.search(r'/_next/static/chunks/webpack-([a-f0-9]+)', html)
print(f'  线上 webpack hash: {bid.group(1) if bid else "?"}')
try:
    local = open(r'F:\zprintpro-nextjs\.next\BUILD_ID', encoding='utf-8').read().strip()
    print(f'  本地 BUILD_ID: {local}')
except Exception as e:
    print(f'  本地 BUILD_ID: ? ({e})')

print('=== 3. 既有部署保持 ===')
for url in ['https://zprintpro.com/en/product/saddle-stitch-booklets/',
            'https://zprintpro.com/en/product/exercise-books/',
            'https://zprintpro.com/ja/nengajo-2027/']:
    s, h = get(url)
    if s == 200:
        t = re.search(r'<title>(.*?)</title>', h, re.S)
        print(f'  {url.split("zprintpro.com")[1]}: 200 | {t.group(1).strip()[:50] if t else "?"}')
    else:
        print(f'  {url.split("zprintpro.com")[1]}: {s}')
