#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/14 3-locale spot check - 3 retrofit × 3 locale = 9 URL"""
import urllib.request
import urllib.error
import ssl
import re
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

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


# 3 retrofit × 3 locale = 9 URL
SLUGS = ["paper-materials", "cmyk-guide", "same-day-flyers-printing-hong-kong-guide"]
LOCALES = ["zh-hk", "en", "ja"]

print("=== 3-locale spot check 8/14 (9 URL, post CF build success) ===\n")
total = 0
passed = 0
for locale in LOCALES:
    for slug in SLUGS:
        url = f"https://zprintpro.com/{locale}/blog/{slug}/"
        status, html = fetch(url)
        total += 1
        ok = "??"
        if status == 200:
            has_ga4 = bool(re.search(r"gtag\('event',\s*'contact_form_submit'", html))
            has_article = "Article" in html
            has_breadcrumb = "BreadcrumbList" in html
            has_speakable = "SpeakableSpecification" in html
            has_wa = bool(re.search(r"wa\.me/8619\d{9}", html))
            if has_ga4 and has_article and has_breadcrumb and has_speakable and has_wa:
                ok = "[PASS]"
                passed += 1
            else:
                ok = f"[FAIL] gtag={has_ga4} article={has_article} breadcrumb={has_breadcrumb} speakable={has_speakable} wa={has_wa}"
        else:
            ok = f"[HTTP {status}]"
        print(f"  [{locale}] {slug}: {status} {ok}")
print(f"\n=== {passed}/{total} passed ===")
