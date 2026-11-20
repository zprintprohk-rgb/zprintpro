import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.status, r.read().decode('utf-8', errors='replace')
st, html = fetch("https://zprintpro.com/en/blog/sticker-guide/")
print("状态:", st, "| 页长:", len(html))
print("E1 锚出现:", 'href="/en/product/small-batch-stickers/"' in html)
print("锚文本闭合:", ">small-batch restocking for cross-border sellers</a>" in html)
