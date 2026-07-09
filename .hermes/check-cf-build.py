import json, subprocess, sys
out = subprocess.check_output(['gh', 'api', 'repos/zprintprohk-rgb/zprintpro/actions/runs?per_page=5'], text=True)
data = json.loads(out)
for r in data.get('workflow_runs', [])[:5]:
    print(f"{r['head_sha'][:7]} | {r['name'][:40]:40} | {r['status']:10} | {(r.get('conclusion') or 'in_progress'):12} | {r['created_at'][:19]}")
