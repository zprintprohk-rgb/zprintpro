import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', str(e)[:50]
# 探 robots (稳定) + doujin (对端部署确认) + small-batch PDP
for u in ['https://zprintpro.com/robots.txt', 'https://zprintpro.com/en/product/small-batch-stickers/', 'https://zprintpro.com/en/product/doujinshi-printing/']:
    st, body = fetch(u)
    print(f"{st} | {len(body)}B | {u}")
