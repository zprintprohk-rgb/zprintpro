# -*- coding: utf-8 -*-
"""Check GitHub Actions run status via curl + json parsing."""
import json, subprocess

runs = [
    "92844836816",
]
for run_id in runs:
    out = subprocess.run(
        ["curl", "-s", "-H", "Accept: application/vnd.github+json",
         f"https://api.github.com/repos/zprintprohk-rgb/zprintpro/actions/runs/{run_id}"],
        capture_output=True, text=True
    ).stdout
    try:
        d = json.loads(out)
        print(f"run {run_id}: status={d.get('status')} conclusion={d.get('conclusion')} created={d.get('created_at')} updated={d.get('updated_at')}")
        if d.get('head_commit'):
            print(f"  head: {d['head_commit']['id'][:7]} {d['head_commit']['message'][:60]}")
    except Exception as e:
        print(f"run {run_id}: parse error {e} | raw head: {out[:200]}")
