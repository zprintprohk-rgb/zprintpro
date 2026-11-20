import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', f'{type(e).__name__}: {e}'
for url in ['https://zprintpro.com/sitemap.xml', 'https://zprintpro.com/sitemap-image.xml', 'https://zprintpro.com/ja/nengajo-2027/', 'https://zprintpro.com/manifest.webmanifest', 'https://zprintpro.com/robots.txt']:
    st, body = get(url)
    if st == 200:
        print(f'{url}: {st} | bytes={len(body)} | head={body[:90].strip()}')
    else:
        print(f'{url}: {st} | {body[:100]}')
