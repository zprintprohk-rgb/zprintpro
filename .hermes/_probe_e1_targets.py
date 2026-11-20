import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def probe(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            html = r.read().decode('utf-8', errors='replace')
            t = re.search(r'<title>(.*?)</title>', html, re.S)
            return r.status, (t.group(1).strip()[:55] if t else '?'), len(html)
    except Exception as e:
        return 'ERR', str(e)[:60], 0
for u in ['https://zprintpro.com/en/product/small-batch-stickers/', 'https://zprintpro.com/en/product/doujinshi-printing/']:
    st, t, ln = probe(u)
    print(f'{st} | {t} | {ln}B | {u}')
