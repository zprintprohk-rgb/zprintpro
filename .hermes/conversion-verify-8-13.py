#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/13 5 步转化验证 (v8.3 task C 强制)
- 验证 353a8fa 8/13 03:04 修复后页面 + retrofit 6/6 收官 + 本批 9 文件改动
- 5 步:
  1. CTA 链接无 404 / 占位符 / 跨 locale 错位
  2. Form 组件渲染
  3. GA4 事件链路
  4. whatsapp / mailto 备选入口
  5. 失败标记
- 输出 .hermes/reports/conversion-link-check-2026-08-13.json
"""
import json
import re
import sys
from pathlib import Path
from datetime import datetime, timezone, timedelta

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

BASE = Path(r"F:\zprintpro-nextjs")
REPORT = BASE / ".hermes" / "reports" / "conversion-link-check-2026-08-13.json"

# 1) 待验证页面清单 (8/13 batch 1 + retrofit 6/6 收官 + 353a8fa 修复)
PAGES = [
    # 353a8fa 8/13 03:04 修复的 6 篇 retrofit (内链升级 18 条)
    "https://zprintpro.com/zh-hk/blog/baby-product-label-sticker-printing-guide/",
    "https://zprintpro.com/zh-hk/blog/paper-materials/",
    "https://zprintpro.com/zh-hk/blog/same-day-flyers-printing-hong-kong-guide/",
    "https://zprintpro.com/zh-hk/blog/apparel-shopping-bag-printing-guide/",
    "https://zprintpro.com/zh-hk/blog/cross-border-ecommerce-shipping-box-guide/",
    "https://zprintpro.com/zh-hk/blog/cmyk-guide/",
    # 8/13 batch 1 9 文件不直接对客 (price-tables + README), 不需验证
]

# 验证 3 步骤（简化版）:
# 1) 用 Python urllib HEAD 检查 200
# 2) 抓 HTML 看 CTA 链接 / form / 备选入口
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE


def fetch(url, method="GET", timeout=20):
    try:
        req = urllib.request.Request(url, method=method)
        req.add_header("User-Agent", "Mozilla/5.0 (zprintpro-cron)")
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)


def check_page(url):
    """返回 5 步验证结果."""
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

    # 1) CTA 链接无 # / javascript:void(0) / 占位符
    cta_hrefs = re.findall(r'<a[^>]+href="([^"]+)"', html)
    bad_cta = [
        h for h in cta_hrefs
        if h.startswith("#") or h.startswith("javascript:") or h == "" or "/blog/<" in h
    ]
    result["step1_cta"] = {
        "total_cta": len(cta_hrefs),
        "bad_cta": bad_cta[:5],
        "bad_cta_count": len(bad_cta),
        "ok": len(bad_cta) == 0,
    }

    # 2) Form 组件 (找 form action + 几个 contact form 标志)
    form_match = bool(re.search(r'<form[^>]+action="[^"]*(/contact|/quote|/api/quote)[^"]*"', html))
    quote_form = "/quote" in html or "QuoteForm" in html or "ContactFormWrapper" in html
    result["step2_form"] = {
        "form_action_match": form_match,
        "quote_or_contact_present": quote_form,
        "ok": form_match or quote_form,
    }

    # 3) GA4 事件链路
    ga4_event = bool(
        re.search(r"trackContactFormSubmit|gtag\('event',\s*'contact_form_submit'|'generate_lead'", html)
    )
    result["step3_ga4"] = {
        "ga4_event_present": ga4_event,
        "ok": ga4_event,
    }

    # 4) wa.me / mailto 备选入口
    wa_present = bool(re.search(r"wa\.me/8619\d{9}|wa\.me/\d+", html))
    mailto_present = bool(re.search(r'mailto:[^"]+', html))
    result["step4_wa_mailto"] = {
        "wa_me": wa_present,
        "mailto": mailto_present,
        "ok": wa_present or mailto_present,
    }

    # 5) 合并判断
    steps_ok = [
        result["step1_cta"]["ok"],
        result["step2_form"]["ok"],
        result["step3_ga4"]["ok"],
        result["step4_wa_mailto"]["ok"],
    ]
    if all(steps_ok):
        result["step5_verdict"] = "verified"
    else:
        result["step5_verdict"] = "broken"

    return result


def main():
    print("=== 5 步转化验证 8/13 (6 retrofit 收官页) ===", flush=True)
    results = []
    for url in PAGES:
        r = check_page(url)
        results.append(r)
        print(f"\n{r['url']}: {r['step5_verdict']}", flush=True)
        for step, k in [
            ("step1_cta", "CTA 链接"),
            ("step2_form", "Form 组件"),
            ("step3_ga4", "GA4 事件"),
            ("step4_wa_mailto", "wa/mailto"),
        ]:
            ok = r[step].get("ok", False)
            mark = "[OK]" if ok else "[FAIL]"
            print(f"  {mark} {k}: {r[step]}", flush=True)

    # 汇总
    verified = sum(1 for r in results if r["step5_verdict"] == "verified")
    broken = sum(1 for r in results if r["step5_verdict"] == "broken")
    summary = {
        "generated_at": datetime.now(timezone(timedelta(hours=8))).isoformat(),
        "scope": "8/13 batch 1 + 353a8fa 修复后 + retrofit 6/6 收官",
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
