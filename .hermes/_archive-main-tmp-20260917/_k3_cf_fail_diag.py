# -*- coding: utf-8 -*-
import json, os, urllib.request

token = ''
for envp in ['.env', '.env.local', '.env.production']:
    try:
        with open(envp, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('CLOUDFLARE_API_TOKEN=') or line.startswith('CF_API_TOKEN='):
                    token = line.split('=', 1)[1].strip().strip('"').strip("'")
                    break
    except Exception:
        pass
    if token: break

if not token:
    print('NO TOKEN'); raise SystemExit

account_id = '32c174efaa22353f357c0fdff9d61b86'
def api(url):
    req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode('utf-8'))

deps = api(f'https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/zprintpro/deployments?per_page=5')
for d in deps.get('result', []):
    print(d.get('id'), d.get('latest_stage',{}).get('name'), d.get('latest_stage',{}).get('status'),
          (d.get('deployment_trigger',{}) or {}).get('metadata',{}).get('commit_hash','')[:8],
          d.get('created_on',''))
