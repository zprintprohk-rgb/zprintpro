# -*- coding: utf-8 -*-
"""
301 迁移灰度测试 — NS 生效后运行: python analysis-2026-07-17/301-grey-test.py
判定标准: 源 URL 必须「一跳 301」到期望目标 (不允许 302/多跳/200 直出)。
"""
import subprocess, sys

CASES = [
    ("home",        "https://www.z-printpro.com/", "https://zprintpro.com/zh-hk/"),
    ("bare-domain", "https://z-printpro.com/",     "https://zprintpro.com/zh-hk/"),
    ("contact",     "https://www.z-printpro.com/contact-us.html", "https://zprintpro.com/zh-hk/contact/"),
    ("school",      "https://www.z-printpro.com/products/enterprise-brochure-printing/school-yearbook-a4-perfect-bound.html", "https://zprintpro.com/zh-hk/category/educational/"),
    ("flyer",       "https://www.z-printpro.com/products/flyer-printing/", "https://zprintpro.com/zh-hk/category/flyers/"),
    ("rush-poster", "https://www.z-printpro.com/products/poster-printing/24hour-poster-printing-a1-a2-mongkok-causewaybay-hk.html", "https://zprintpro.com/zh-hk/services/rush-printing-delivery/"),
    ("paper-bag",   "https://www.z-printpro.com/products/paper-bag-printing/", "https://zprintpro.com/zh-hk/category/paper-bags/"),
    ("sticker",     "https://www.z-printpro.com/products/label-sticker-printing/qr-code-sticker-tracking.html", "https://zprintpro.com/zh-hk/category/stickers/"),
    ("booklet",     "https://www.z-printpro.com/products/enterprise-brochure-printing/a5-saddle-stitched-booklet-printing.html", "https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/"),
    ("packaging",   "https://www.z-printpro.com/products/packaging-box-printing/", "https://zprintpro.com/zh-hk/category/packaging/"),
    ("wedding",     "https://www.z-printpro.com/products/red-packet-wedding-invitation-printing/wedding-invitation-printing-foil-ribbon-envelope.html", "https://zprintpro.com/zh-hk/category/red-packets/"),
]

def head(url):
    p = subprocess.run(["curl.exe", "-sI", "--max-time", "20", url],
                       capture_output=True, text=True)
    status, location = "", ""
    for line in p.stdout.splitlines():
        low = line.lower()
        if low.startswith("http/") and not status:
            status = line.split()[1] if len(line.split()) > 1 else "?"
        if low.startswith("location:"):
            location = line.split(":", 1)[1].strip()
    return status, location

fails = []
print(f"{'case':12s} {'status':6s} {'location match':14s} {'target 200':10s} result")
for label, src, want in CASES:
    status, loc = head(src)
    loc_ok = loc.rstrip("/") == want.rstrip("/")
    t_status, _ = head(want)
    t_ok = t_status == "200"
    ok = (status == "301") and loc_ok and t_ok
    if not ok:
        fails.append((label, src, status, loc, t_status))
    print(f"{label:12s} {status:6s} {str(loc_ok):14s} {t_status:10s} {'PASS' if ok else 'FAIL'}")

if fails:
    print("\nFAILED CASES:")
    for f in fails:
        print(" ", f)
    sys.exit(1)
print(f"\nALL {len(CASES)} CASES PASS")
