import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.status, r.read().decode('utf-8', errors='replace')
# 1. E1 源页 (已验)
# 2. robots 保持
st, rb = fetch('https://zprintpro.com/robots.txt')
print(f'[P0] robots.txt: {st} | AI allow={rb.count("Allow")} | Sitemap={rb.count("Sitemap:")}')
# 3. 目标 PDP
st2, h2 = fetch('https://zprintpro.com/en/product/small-batch-stickers/')
t2 = re.search(r'<title>(.*?)</title>', h2, re.S)
print(f'[E1] small-batch PDP: {st2} | title={t2.group(1).strip()[:55] if t2 else "?"}')
# 4. doujin C109 保持
st4, h4 = fetch('https://zprintpro.com/en/product/doujinshi-printing/')
print(f'[PEER] doujin C109: {st4} | /comiket-c109/={"/comiket-c109/" in h4} | 页长={len(h4)}B')
# 5. en/ja doujin C109
for loc in ['en','ja']:
    st5, h5 = fetch(f'https://zprintpro.com/{loc}/product/doujinshi-printing/')
    print(f'[PEER] doujin {loc}: {st5} | C109={"/comiket-c109/" in h5}')
