import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
url = "https://zprintpro.com/en/blog/sticker-guide/"
req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=25) as r:
    html = r.read().decode('utf-8', errors='replace')
marker_old = "small-batch restocking for cross-border sellers"
marker_new = "product/small-batch-stickers/"
print("状态 200 | 页长", len(html))
print("旧锚文本(无链接)存在:", marker_old in html)
print("E1 链接已存在(pre-push 应为 False):", marker_new in html)
