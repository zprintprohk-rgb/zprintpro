"""verify ja home head meta tags after cefe895 deploy."""
import urllib.request
import re

req = urllib.request.Request(
    "https://zprintpro.com/ja/",
    headers={"Cache-Control": "no-cache, max-age=0", "Pragma": "no-cache"},
)
body = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="replace")
head_end = body.find("</head>")
head = body[: head_end + 10] if head_end > 0 else body[:3000]

print("=== ja home head meta tags ===")
for label, pat in [
    ("og:site_name", r'<meta property="og:site_name" content="([^"]+)"'),
    ("og:locale",    r'<meta property="og:locale" content="([^"]+)"'),
    ("og:title",     r'<meta property="og:title" content="([^"]+)"'),
    ("title",        r"<title>([^<]+)</title>"),
    ("html lang",    r'<html lang="([^"]+)"'),
]:
    m = re.search(pat, head)
    val = m.group(1)[:100] if m else "(none)"
    print(f"  {label:14s} = {val}")
