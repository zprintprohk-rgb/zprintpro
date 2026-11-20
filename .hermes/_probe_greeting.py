import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
req = urllib.request.Request('https://zprintpro.com/en/category/greeting-cards/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=25).read().decode('utf-8', errors='replace')
t = re.search(r'<title>(.*?)</title>', html, re.S)
print('线上 title:', t.group(1).strip()[:80] if t else '?')
h2 = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.S)
clean = [re.sub(r'<[^>]+>', '', h).strip()[:60] for h in h2]
print('H2 命中 100 MOQ:', [c for c in clean if 'MOQ' in c])
print('页面含 .50:', '.50' in html, '| 含 from \.13:', 'from .13' in html)
print('页面含 30% 回购:', '30%' in html, '| TikTok:', 'TikTok' in html, '| \.07:', '.07' in html)
