import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', f'{type(e).__name__}'
st, body = get('https://zprintpro.com/robots.txt')
print(f'robots.txt: {st}')
if st == 200:
    ai = ['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-Web','anthropic-ai','PerplexityBot','Perplexity-User','Google-Extended','Applebot-Extended','Bytespider','CCBot']
    print('  AI allow 缺失:', [a for a in ai if a not in body] or '无(12/12)')
    print('  sitemap-image:', 'sitemap-image.xml' in body, '| /_next/ Disallow:', '/_next/' in body)
for url in ['https://zprintpro.com/en/product/saddle-stitch-booklets/', 'https://zprintpro.com/en/product/exercise-books/', 'https://zprintpro.com/ja/nengajo-2027/']:
    st2, html = get(url)
    if st2 == 200:
        t = re.search(r'<title>(.*?)</title>', html, re.S); h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.S)
        print(f'{url.split("zprintpro.com")[1]}: {st2} title={t.group(1).strip()[:55] if t else "?"}')
        print(f'   h1={re.sub(r"<[^>]+>","",h1.group(1)).strip()[:50] if h1 else "?"}')
    else:
        print(f'{url.split("zprintpro.com")[1]}: {st2}')
