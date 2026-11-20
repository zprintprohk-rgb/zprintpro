import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', f'{type(e).__name__}'
for url in ['https://zprintpro.com/en/product/saddle-stitch-booklets/', 'https://zprintpro.com/en/product/exercise-books/', 'https://zprintpro.com/ja/nengajo-2027/', 'https://zprintpro.com/zh-hk/nengajo-2027/']:
    st, html = get(url)
    if st == 200:
        t = re.search(r'<title>(.*?)</title>', html, re.S)
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.S)
        title = t.group(1).strip()[:65] if t else '?'
        h1v = re.sub(r'<[^>]+>', '', h1.group(1)).strip()[:65] if h1 else '?'
        print(f'{url.split("zprintpro.com")[1]}: {st} | title={title}')
        print(f'  h1={h1v}')
    else:
        print(f'{url.split("zprintpro.com")[1]}: {st}')
