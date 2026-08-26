# -*- coding: utf-8 -*-
"""Fetch Cloudflare Pages build logs for failed run."""
import json, subprocess

run_id = "92847100197"
# Get jobs for the run
out = subprocess.run(
    ["curl", "-s", "-H", "Accept: application/vnd.github+json",
     f"https://api.github.com/repos/zprintprohk-rgb/zprintpro/actions/runs/{run_id}/jobs"],
    capture_output=True, text=True
).stdout
try:
    d = json.loads(out)
    for j in d.get('jobs', []):
        print(f"JOB {j['id']}: {j.get('name')} status={j.get('status')} conclusion={j.get('conclusion')}")
        print(f"  steps:")
        for s in j.get('steps', []):
            print(f"    {s.get('number')}. {s.get('name')}: {s.get('conclusion')}")
except Exception as e:
    print(f"parse error: {e} | {out[:300]}")

# Try to get the CF Pages deployment status via check-run details
out2 = subprocess.run(
    ["curl", "-s", "-H", "Accept: application/vnd.github+json",
     f"https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/788f1d3/check-runs"],
    capture_output=True, text=True
).stdout
try:
    d2 = json.loads(out2)
    for r in d2.get('check_runs', []):
        print(f"\nCHECK RUN {r['id']}: {r.get('name')} status={r.get('status')} conclusion={r.get('conclusion')}")
        print(f"  details_url: {r.get('details_url')}")
        print(f"  output title: {r.get('output', {}).get('title')}")
        print(f"  output summary: {str(r.get('output', {}).get('summary'))[:500]}")
except Exception as e:
    print(f"check-runs parse error: {e} | {out2[:300]}")
