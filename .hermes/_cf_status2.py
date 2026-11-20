# -*- coding: utf-8 -*-
import io, sys, json, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def api(path):
    req = urllib.request.Request('https://api.github.com' + path, headers={'User-Agent': 'zprintpro-probe', 'Accept': 'application/vnd.github+json'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)
d = api('/repos/zprintprohk-rgb/zprintpro/commits/3fa0d559/check-runs')
for cr in d.get('check_runs', []):
    if 'Cloudflare' in (cr.get('name') or ''):
        print(f"status={cr.get('status')} conclusion={cr.get('conclusion')}")
        break
