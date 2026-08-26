import json, urllib.request
url = 'https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/0a3faa6/check-runs'
try:
    with urllib.request.urlopen(url, timeout=15) as r:
        data = json.loads(r.read().decode('utf-8'))
    print('--- check-runs for 0a3faa6 ---')
    for cr in data.get('check_runs', []):
        name = cr['name']
        status = cr['status']
        conclusion = cr.get('conclusion') or '(none)'
        print('  ' + name.ljust(40) + ' | status: ' + status.ljust(12) + ' | conclusion: ' + conclusion)
    if not data.get('check_runs'):
        print('  (no check_runs yet)')
        print('  total_count:', data.get('total_count'))
except Exception as e:
    print('FAIL:', e)
