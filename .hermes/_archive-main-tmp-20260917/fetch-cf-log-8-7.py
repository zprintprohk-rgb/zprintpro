# -*- coding: utf-8 -*-
"""Fetch CF Pages build log for failed deployment. Try Cloudflare API with token from env."""
import json, os, subprocess, urllib.request

deployment_id = "0bbcabb1-2f24-4372-9516-048c83dded65"
account_id = "32c174efaa22353f357c0fdff9d61b86"

# Check for CF API token in env or .env
token = os.environ.get('CLOUDFLARE_API_TOKEN', '')
if not token:
    # try .env / .env.local
    for envp in ['.env', '.env.local', '.env.production']:
        try:
            with open(envp, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line.startswith('CLOUDFLARE_API_TOKEN=') or line.startswith('CF_API_TOKEN='):
                        token = line.split('=', 1)[1].strip().strip('"').strip("'")
                        print(f"found token in {envp}")
                        break
        except Exception:
            pass
        if token:
            break

if not token:
    print("NO CLOUDFLARE_API_TOKEN found in env or .env files")
    print("trying CF_PAGES_API_TOKEN / wrangler config...")
    # wrangler.toml might have account_id only
    try:
        with open('wrangler.toml', 'r', encoding='utf-8') as f:
            print("wrangler.toml head:", f.read()[:500])
    except Exception as e:
        print("no wrangler.toml:", e)
else:
    # Fetch deployment logs
    url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/zprintpro/deployments/{deployment_id}/history/logs"
    req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}'})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        print("LOG RESPONSE keys:", list(data.keys()))
        logs = data.get('result', [])
        if isinstance(logs, list):
            for entry in logs[-80:]:
                ts = entry.get('ts', '')
                line = entry.get('line', '')
                print(f"{ts} {line}")
        else:
            print(json.dumps(data, indent=2)[:3000])
    except Exception as e:
        print(f"log fetch error: {e}")
        # try deployment detail
        url2 = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/zprintpro/deployments/{deployment_id}"
        req2 = urllib.request.Request(url2, headers={'Authorization': f'Bearer {token}'})
        try:
            with urllib.request.urlopen(req2, timeout=30) as resp2:
                d2 = json.loads(resp2.read().decode())
            print("DEPLOYMENT detail:", json.dumps(d2.get('result', {}), indent=2, ensure_ascii=False)[:2000])
        except Exception as e2:
            print(f"deployment detail error: {e2}")
