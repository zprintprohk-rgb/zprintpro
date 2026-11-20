import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
req = urllib.request.Request("https://zprintpro.com/robots.txt", headers={'User-Agent':'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=20) as r:
    body = r.read().decode('utf-8', errors='replace')
print("robots 状态:", r.status)
print("AI allow 计数:", body.count("Allow"))
print("Sitemap:", body.count("Sitemap:"))
