import io, sys, urllib.request, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
# 用 cache-buster query 绕过 CF 缓存
url = "https://zprintpro.com/en/blog/sticker-guide/?cb=" + str(int(time.time()))
req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=25) as r:
    html = r.read().decode('utf-8', errors='replace')
print("状态:", r.status, "| 页长:", len(html))
print("E1 锚出现:", 'href="/en/product/small-batch-stickers/"' in html)
print("锚文本闭合:", ">small-batch restocking for cross-border sellers</a>" in html)
