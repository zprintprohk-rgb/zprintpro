# -*- coding: utf-8 -*-
import io, sys, json, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def api(path):
    req = urllib.request.Request('https://api.github.com' + path, headers={'User-Agent': 'zprintpro-probe', 'Accept': 'application/vnd.github+json'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)
for head in ['b0e30769']:
    d = api(f'/repos/zprintprohk-rgb/zprintpro/commits/{head}/check-runs')
    print(f'== {head} ==')
    for cr in d.get('check_runs', []):
        if 'Cloudflare' in (cr.get('name') or ''):
            print(f"  {cr['name']}: status={cr.get('status')} conclusion={cr.get('conclusion')} created={cr.get('created_at')} completed={cr.get('completed_at')}")
    if not d.get('check_runs'):
        print('  no check-runs (build not triggered yet?)')
