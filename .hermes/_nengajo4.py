import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def probe(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            html = r.read().decode('utf-8', errors='replace')
            t = re.search(r'<title>(.*?)</title>', html, re.S)
            return r.status, (t.group(1).strip()[:60] if t else '?')
    except Exception as e:
        return 'ERR', str(e)[:40]
for slug in ['nengajo-2027', 'nengajo', 'new-year-card-2027', 'nengajo-printing']:
    st, t = probe(f'https://zprintpro.com/ja/product/{slug}/')
    print(f'{st} | {t} | /ja/product/{slug}/')
