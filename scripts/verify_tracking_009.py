# verify_tracking_009.py
"""STEP 3/4/4b 验证: migration 009 落地后 tracking_events 表 + 视图可用"""
import os, json, sys, urllib.request, urllib.error
from datetime import datetime, timezone

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "").rstrip("/") or "https://hgexjbscqopiqoyxpcae.supabase.co"
ANON_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "") or "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZXhqYnNjcW9waXFveXhwY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODY1MTgsImV4cCI6MjA5MDQ2MjUxOH0.YZtPr4QIWB-BH3WLppStCzlhg6mW9acEVQs8fig8L-8"
TIMEOUT = 15

def log(level, msg):
    ts = datetime.now(timezone.utc).strftime("%H:%M:%S")
    print(f"[{ts}] {level:5s} | {msg}", flush=True)

def call(method, path, body=None):
    url = f"{SUPABASE_URL}{path}"
    headers = {"apikey": ANON_KEY}
    data = json.dumps(body).encode() if body else None
    if data:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, method=method, headers=headers, data=data)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.status, json.loads(resp.read().decode() or "null")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode(errors="replace")

# STEP 3: 查表存在
status, resp = call("GET", "/rest/v1/tracking_events?select=id&limit=1")
log("STEP3", f"GET tracking_events: HTTP {status}, resp: {resp}")
assert status == 200, f"Table not found or no permission: {status}"
log("PASS", "STEP 3: tracking_events table exists, anon SELECT 200")

# STEP 4: 插入一条 page-view
body = {
    "event_type": "page-view",
    "locale": "zh-hk",
    "page_url": "https://zprintpro.com/zh-hk/verify-script",
    "session_id": f"verify-{int(datetime.now().timestamp())}",
    "label": "/zh-hk/ (verify-script)"
}
status, resp = call("POST", "/rest/v1/tracking_events", body)
log("STEP4", f"POST page-view: HTTP {status}, resp: {str(resp)[:200]}")
assert status == 201, f"INSERT failed: {status}"
log("PASS", "STEP 4: page-view write succeeded (anon INSERT 201)")

# STEP 4b: 视图
status, resp = call("GET", "/rest/v1/v_event_funnel?limit=1")
log("STEP4b", f"GET v_event_funnel: HTTP {status}, resp: {str(resp)[:200]}")
assert status == 200, f"View not found: {status}"
log("PASS", "STEP 4b: v_event_funnel view available")

print()
print("=" * 60)
print("STEP 3/4/4b ALL PASS, migration 009 closed loop")
print("=" * 60)
print("Next: real user data in 24h, v_conversion_funnel numbers")
