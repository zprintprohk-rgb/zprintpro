#!/usr/bin/env python3
"""
301 diff report (8/7 02:15 M3 跑)
对比 next.config.js 规则 vs live HTTP 实际行为
K3 8/6 0:39 早会 + Qwen 3.8 P1 301 止血要求
"""
import json
import os
import re
import sys
from urllib.parse import urlparse
import urllib.request
import urllib.error
import socket

CONFIG = r"F:\zprintpro-nextjs\next.config.js"
SAMPLE_URLS = [
    # 5 个抽样: 跨 category / 跨 locale, 验证 next.config.js 重定向
    "https://zprintpro.com/zh-hk/guide",
    "https://zprintpro.com/en/guide/buying-guide",
    "https://zprintpro.com/ja/product/gift-boxes",
    "https://zprintpro.com/zh-hk/product/custom-gift-boxes",
    "https://zprintpro.com/en/returns",
]

def get_config_rules():
    """Parse next.config.js redirects(). Returns list of {source, destination, status}."""
    with open(CONFIG, "r", encoding="utf-8") as f:
        content = f.read()
    # Extract source/destination pairs
    rules = []
    for m in re.finditer(r"source:\s*[`'\"]([^`'\"]+)[`'\"].*?destination:\s*[`'\"]([^`'\"]+)[`'\"]", content, re.DOTALL):
        source = m.group(1)
        dest = m.group(2)
        if ":slug+" in source or "blog" in dest or "help-center" in dest or "rigid-boxes" in dest:
            rules.append({"source": source, "destination": dest, "status": 308})
    return rules

def check_url(url, follow=True):
    """HEAD request, return (status_code, final_url, redirect_chain)."""
    chain = []
    current = url
    try:
        for _ in range(3):  # max 3 redirects
            req = urllib.request.Request(current, method="HEAD")
            req.add_header("User-Agent", "M3-301-verify/1.0")
            try:
                resp = urllib.request.urlopen(req, timeout=10)
                chain.append({"url": current, "status": resp.status})
                if not follow or resp.status not in (301, 302, 303, 307, 308):
                    return resp.status, current, chain
                # Get redirect target from Location header
                loc = resp.headers.get("Location") or resp.headers.get("location")
                if not loc:
                    return resp.status, current, chain
                if loc.startswith("/"):
                    parsed = urlparse(current)
                    loc = f"{parsed.scheme}://{parsed.netloc}{loc}"
                current = loc
            except urllib.error.HTTPError as e:
                chain.append({"url": current, "status": e.code, "error": str(e)})
                return e.code, current, chain
        return -1, current, chain
    except (urllib.error.URLError, socket.timeout) as e:
        return -1, current, [{"url": current, "error": str(e)}]

def main():
    print("=" * 80)
    print("301 DIFF REPORT - 8/7 02:15 M3 跑")
    print("=" * 80)

    rules = get_config_rules()
    print(f"\n[next.config.js] 解析到 {len(rules)} 条 redirect 规则")
    print(f"  抽样展示前 10 条:")
    for r in rules[:10]:
        print(f"    {r['source']:50s} -> {r['destination']}")

    print(f"\n[live 抽样验证] 5 个 URL 跨 locale/category")
    print("-" * 80)
    results = []
    for url in SAMPLE_URLS:
        status, final, chain = check_url(url)
        ok = status in (200, 308) and (status == 200 or len(chain) >= 2)
        results.append({"url": url, "status": status, "final": final, "chain": chain, "ok": ok})
        chain_str = " -> ".join(f"[{c.get('status', '?')}] {c.get('url', '?')[:50]}" for c in chain)
        print(f"  {url[:50]:50s} -> status={status} {'✅' if ok else '❌'}")
        print(f"    chain: {chain_str}")
        if status == 200:
            print(f"    final: {final[:80]}")

    pass_count = sum(1 for r in results if r["ok"])
    fail_count = len(results) - pass_count
    print("-" * 80)
    print(f"\n[小计] {pass_count}/5 PASS, {fail_count}/5 FAIL")

    print(f"\n[K3 行动] CF Bulk Redirect List enabled 状态")
    print("  - M3 无 CF API token, 不能直接查 CF Dashboard")
    print("  - K3 需 5min 自查 CF Dashboard -> Rules -> Bulk Redirect List")
    print("  - 检查项: zprintpro-301-redirects (或类似) enabled = true")
    print("  - 如 disabled: 立即 enable (Bulk Redirect List 配的 old_url -> new_url, 跟 next.config.js 是双层 301)")

    # 落报告
    report = {
        "report_at": "2026-08-07T02:15:00+08:00",
        "trigger": "K3 8/7 02:12 千问 3.8 策略 P1 301 止血 + K3 8/6 0:39 早会 §6.6 验收项",
        "config_rules_count": len(rules),
        "sample_results": results,
        "pass_count": pass_count,
        "fail_count": fail_count,
        "verdict": "PASS" if pass_count == 5 else f"PARTIAL ({pass_count}/5)",
        "k3_action_required": "5min check CF Dashboard Bulk Redirect List enabled state",
        "notes": "next.config.js 是 Next.js 应用层 301, CF Bulk Redirect List 是边缘层 301. 双层缺一, GSC 会报 '重定向错误'. K3 8/6 0:39 早会: 7/22 5/5 PASS → 8/5 1/5 PASS, 怀疑 Bulk Redirect List 被 disabled"
    }
    out = r"F:\zprintpro-nextjs\.hermes\reports\301-diff-2026-08-07.json"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"\n[OK] 报告落盘: {out}")

if __name__ == "__main__":
    main()
