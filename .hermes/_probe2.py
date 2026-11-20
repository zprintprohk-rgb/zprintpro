import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import time
def get(url, tries=3):
    for i in range(tries):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req, timeout=25) as r:
                return r.status, r.read().decode('utf-8', errors='replace')
        except Exception as e:
            last = f'{type(e).__name__}: {e}'
            time.sleep(2)
    return 'ERR', last
for url in ['https://zprintpro.com/robots.txt', 'https://zprintpro.com/', 'https://zprintpro.com/en/product/saddle-stitch-booklets/', 'https://zprintpro.com/en/product/exercise-books/']:
    st, body = get(url)
    if st == 200 and url == 'https://zprintpro.com/robots.txt':
        ai = ['GPTBot','OAI-SearchBot','ClaudeBot','anthropic-ai','PerplexityBot','Google-Extended','CCBot']
        print(f'{url}: {st} | AI allow 缺: {[a for a in ai if a not in body]} | sitemap-img: {"sitemap-image.xml" in body} | _next Disallow: {"/_next/" in body} | bytes={len(body)}')
    elif st == 200:
        import re
        m = re.search(r'<title>(.*?)</title>', body, re.S)
        print(f'{url}: {st} | title={m.group(1)[:60] if m else "?"} | bytes={len(body)}')
    else:
        print(f'{url}: {st} | {body[:120]}')
