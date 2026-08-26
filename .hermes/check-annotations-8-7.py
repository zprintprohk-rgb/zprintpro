# -*- coding: utf-8 -*-
"""Fetch check-run annotations for the failed CF Pages build."""
import json, subprocess

run_id = "92847100197"
out = subprocess.run(
    ["curl", "-s", "-H", "Accept: application/vnd.github+json",
     f"https://api.github.com/repos/zprintprohk-rgb/zprintpro/check-runs/{run_id}/annotations"],
    capture_output=True, text=True
).stdout
try:
    d = json.loads(out)
    if isinstance(d, list):
        if not d:
            print("no annotations")
        for a in d:
            print(f"[{a.get('annotation_level')}] {a.get('path')}:{a.get('start_line')} — {a.get('title')}")
            print(f"  message: {str(a.get('message'))[:800]}")
    else:
        print("response:", json.dumps(d)[:500])
except Exception as e:
    print(f"parse error: {e} | {out[:300]}")

# Also fetch the full check-run detail for output text
out2 = subprocess.run(
    ["curl", "-s", "-H", "Accept: application/vnd.github+json",
     f"https://api.github.com/repos/zprintprohk-rgb/zprintpro/check-runs/{run_id}"],
    capture_output=True, text=True
).stdout
try:
    d2 = json.loads(out2)
    out_o = d2.get('output', {})
    print("\noutput.title:", out_o.get('title'))
    print("output.summary:", str(out_o.get('summary'))[:800])
    print("output.text:", str(out_o.get('text'))[:800])
except Exception as e:
    print(f"detail parse error: {e} | {out2[:300]}")
