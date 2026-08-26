# -*- coding: utf-8 -*-
"""List recent check-runs for the latest commit to find CF Pages build status."""
import json, subprocess

# Get latest commits
out = subprocess.run(
    ["curl", "-s", "-H", "Accept: application/vnd.github+json",
     "https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits?per_page=3"],
    capture_output=True, text=True
).stdout
try:
    commits = json.loads(out)
    for c in commits:
        print(f"commit {c['sha'][:7]}: {c['commit']['message'][:60]}")
        # check-runs for this commit
        cr = subprocess.run(
            ["curl", "-s", "-H", "Accept: application/vnd.github+json",
             f"https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/{c['sha']}/check-runs"],
            capture_output=True, text=True
        ).stdout
        try:
            d = json.loads(cr)
            for r in d.get('check_runs', []):
                print(f"  run {r['id']}: {r.get('name')} status={r.get('status')} conclusion={r.get('conclusion')}")
        except Exception as e:
            print(f"  check-runs parse error: {e} | {cr[:150]}")
except Exception as e:
    print(f"commits parse error: {e} | {out[:200]}")
