import json, urllib.request
# IndexNow API: POST https://api.indexnow.org/indexnow
# 推送新印刷规格指南 3 URL
urls = [
    "https://zprintpro.com/zh-hk/blog/print-specifications-reference-guide-2026/",
    "https://zprintpro.com/en/blog/print-specifications-reference-guide-2026/",
    "https://zprintpro.com/ja/blog/print-specifications-reference-guide-2026/",
]
key = "b4743800634c73a56fc734e58d77a5d9"  # from K3 9/2 IndexNow 自解锁 (54 URL D-9/2-15)
host = "zprintpro.com"
payload = {
    "host": host,
    "key": key,
    "urlList": urls,
}
data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(
    "https://api.indexnow.org/indexnow",
    data=data,
    headers={"Content-Type": "application/json"},
    method="POST"
)
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print(f"IndexNow status: {r.status}")
        print(f"Response: {r.read().decode('utf-8')[:200]}")
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code} {e.reason}")
    print(f"Body: {e.read().decode('utf-8')[:300]}")
except Exception as e:
    print(f"Error: {e}")
