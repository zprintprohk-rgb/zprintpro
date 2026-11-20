#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/14 5 步转化验证 - 27f0c7f push 后 6 retrofit GA4 复跑"""
import json
import re
import sys
import urllib.request
import urllib.error
import ssl
from pathlib import Path
from datetime import datetime, timezone, timedelta

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

BASE = Path(r"F:\zprintpro-nextjs")
REPORT = BASE / ".hermes" / "reports" / "conversion-link-check-2026-08-14.json"

PAGES = [
    "https://zprintpro.com/zh-hk/blog/baby-product-label-sticker-printing-guide/",
    "https://zprintpro.com/zh-hk/blog/paper-materials/",
    "https://zprintpro.com/zh-hk/blog/same-day-flyers-printing-hong-kong-guide/",
    "https://zprintpro.com/zh-hk/blog/apparel-shopping-bag-printing-guide/",
    "https://zprintpro.com/zh-hk/blog/cross-border-ecommerce-shipping-box-guide/",
    "https://zprintpro.com/zh-hk/blog/cmyk-guide/",
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE


def fetch(url, timeout=20):
    try:
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Mozilla/5.0 (zprintpro-cron)")
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)


def check_page(url):
    result = {
        "url": url,
        "step1_cta": {},
        "step2_form": {},
        "step3_ga4": {},
        "step4_wa_mailto": {},
        "step5_verdict": "pending",
    }
    status, html = fetch(url)
    if status != 200:
        result["step5_verdict"] = "broken"
        result["error"] = f"HTTP {status}"
        return result
    cta_hrefs = re.findall(r'<a[^>]+href="([^"]+)"', html)
    bad_cta = [h for h in cta_hrefs if h.startswith("#") or h.startswith("javascript:") or h == "" or "/blog/<" in h]
    result["step1_cta"] = {"total_cta": len(cta_hrefs), "bad_cta": bad_cta[:5], "bad_cta_count": len(bad_cta), "ok": len(bad_cta) == 0}
    form_match = bool(re.search(r'<form[^>]+action="[^"]*(/contact|/quote|/api/quote)[^"]*"', html))
    quote_form = "/quote" in html or "QuoteForm" in html or "ContactFormWrapper" in html
    result["step2_form"] = {"form_action_match": form_match, "quote_or_contact_present": quote_form, "ok": form_match or quote_form}
    ga4_event = bool(re.search(r"trackContactFormSubmit|gtag\('event',\s*'contact_form_submit'|'generate_lead'", html))
    result["step3_ga4"] = {"ga4_event_present": ga4_event, "ok": ga4_event}
    wa_present = bool(re.search(r"wa\.me/8619\d{9}|wa\.me/\d+", html))
    mailto_present = bool(re.search(r'mailto:[^"]+', html))
    result["step4_wa_mailto"] = {"wa_me": wa_present, "mailto": mailto_present, "ok": wa_present or mailto_present}
    steps_ok = [result["step1_cta"]["ok"], result["step2_form"]["ok"], result["step3_ga4"]["ok"], result["step4_wa_mailto"]["ok"]]
    if all(steps_ok):
        result["step5_verdict"] = "verified"
    else:
        result["step5_verdict"] = "broken"
    return result


def main():
    print("=== 5 步转化验证 8/14 (6 retrofit, post 27f0c7f push) ===", flush=True)
    results = []
    for url in PAGES:
        r = check_page(url)
        results.append(r)
        print(f"\n{r['url']}: {r['step5_verdict']}", flush=True)
        for step, k in [("step1_cta", "CTA 链接"), ("step2_form", "Form 组件"), ("step3_ga4", "GA4 事件"), ("step4_wa_mailto", "wa/mailto")]:
            ok = r[step].get("ok", False)
            mark = "[OK]" if ok else "[FAIL]"
            print(f"  {mark} {k}: {r[step]}", flush=True)
    verified = sum(1 for r in results if r["step5_verdict"] == "verified")
    broken = sum(1 for r in results if r["step5_verdict"] == "broken")
    summary = {
        "generated_at": datetime.now(timezone(timedelta(hours=8))).isoformat(),
        "scope": "8/14 batch 27f0c7f push (3 in 1: batch 2 名片清扫 + 6 retrofit GA4 修复 + 16 files bundle)",
        "pages_total": len(PAGES),
        "verified": verified,
        "broken": broken,
        "results": results,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"\n=== Summary: {verified}/{len(PAGES)} verified, {broken} broken ===", flush=True)
    print(f"Report: {REPORT}", flush=True)


if __name__ == "__main__":
    main()
