# -*- coding: utf-8 -*-
import urllib.request, json, os
token = os.environ.get('GH_TOKEN', '')
if not token:
    # try to find token from .git config
    for line in open(r'C:\Users\Administrator\.gitconfig', 'r', encoding='utf-8').readlines() if os.path.exists(r'C:\Users\Administrator\.gitconfig') else []:
        pass
# direct API call
for endpoint in [
    'repos/zprintprohk-rgb/zprintpro/commits/647eb25/check-runs',
    'repos/zprintprohk-rgb/zprintpro/commits/647eb25/status',
]:
    url = 'https://api.github.com/' + endpoint
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'M3'})
        if token:
            req.add_header('Authorization', 'token ' + token)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print('---', endpoint, '---')
            if 'check_runs' in data:
                print('check_runs: {0}'.format(len(data['check_runs'])))
                for c in data['check_runs'][:8]:
                    print('  {0}: {1}/{2} ({3})'.format(c.get('name'), c.get('status'), c.get('conclusion'), c.get('html_url', '')[-50:]))
            elif 'state' in data:
                print('state:', data.get('state'))
                for s in data.get('statuses', [])[:5]:
                    print('  {0}: {1} ({2})'.format(s.get('context'), s.get('state'), s.get('description', '')[:50]))
    except Exception as e:
        print(endpoint, 'err:', e)
print()
# Recent deploys via CF Pages API or just info
print('--- check whether CF Pages is connected to repo ---')
# Use curl via urllib
import re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url + '?_=' + str(os.environ.get('RANDOM', 0)), headers={'User-Agent': 'M3-cache-bust', 'Pragma': 'no-cache'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
    # Find last modified
    print('cache-control:', resp.headers.get('Cache-Control'))
    print('cf-cache-status:', resp.headers.get('CF-Cache-Status'))
    print('cf-ray:', resp.headers.get('CF-Ray'))
    print('age:', resp.headers.get('Age'))
    print('last-modified:', resp.headers.get('Last-Modified'))
    print('etag:', resp.headers.get('ETag'))
