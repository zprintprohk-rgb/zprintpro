import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def probe(url, marker):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            html = r.read().decode('utf-8', errors='replace')
            has = marker in html
            return r.status, has, len(html)
    except Exception as e:
        return 'ERR', str(e)[:50], 0
# doujin PDP en: 对端 bb7b157c 加 /comiket-c109/ 内链
for u in ['https://zprintpro.com/en/product/doujinshi-printing/', 'https://zprintpro.com/ja/product/doujinshi-printing/']:
    st, has, ln = probe(u, '/comiket-c109/')
    print(f'{st} | C109链接={has} | {ln}B | {u}')
