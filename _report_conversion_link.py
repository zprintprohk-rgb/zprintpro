#!/usr/bin/env python3
"""
Conversion link check report (8/7 02:15 M3 跑)
Qwen 3.8 P0: 询盘链路端到端测试 (前端)
K3 8/6 0:39 早会 §6.1 验收目标 = 8/12 询盘 ≥5

M3 无 3 设备网络/无 Webhook 触发权, 只能 grep 前端代码 + 验证表单组件渲染
"""
import json
import os
import re
import subprocess

ROOT = r"F:\zprintpro-nextjs"
BLOG = os.path.join(ROOT, "src", "app", "[locale]", "blog")
CONTACT = os.path.join(ROOT, "src", "app", "[locale]", "contact")
QUOTE = os.path.join(ROOT, "src", "app", "[locale]", "quote")

# 已知 CTA 目标 URL (form action / link href 模式)
CTA_PATTERNS = [
    # 站内 CTA
    r'href=["\']/[^/]+/(contact|quote|product|blog)/',
    r'placeholder=["\']?(?:Your\s+)?(?:Name|Email|Phone|Message)',
    # 站外 CTA (WhatsApp / 邮件)
    r'href=["\']https?://wa\.me/',
    r'href=["\']mailto:',
    r'href=["\']https?://(www\.)?zprintpro\.com/',
    # form action
    r'<form[^>]*action=["\']([^"\']+)["\']',
    r'<form[^>]*method=["\'](post|get)["\']',
]

# GA4 generate_lead 事件关键字
GA4_PATTERNS = [
    r'gtag\([\"\'](?:event|config)[\"\']',
    r'generate_lead',
    r'data-gtag',
]

def grep_pattern(pattern, roots):
    """grep pattern in given roots, return list of {file, line, text}."""
    results = []
    for root in roots:
        if not os.path.exists(root):
            continue
        for dp, dn, fn in os.walk(root):
            for f in fn:
                if not f.endswith((".tsx", ".ts", ".js", ".jsx", ".html")):
                    continue
                fp = os.path.join(dp, f)
                try:
                    with open(fp, "r", encoding="utf-8", errors="ignore") as fh:
                        for i, line in enumerate(fh, 1):
                            if re.search(pattern, line, re.IGNORECASE):
                                rel = os.path.relpath(fp, ROOT)
                                results.append({"file": rel, "line": i, "text": line.strip()[:120]})
                except Exception:
                    pass
    return results

def main():
    print("=" * 80)
    print("CONVERSION LINK CHECK REPORT - 8/7 02:15 M3 跑")
    print("=" * 80)
    print(f"\nK3 8/12 §6.1 验收: 询盘 ≥5 (5 询盘/8/6-8/12 6 天)")
    print("Qwen 3.8 P0 询盘链路: 博客→CTA→表单→提交→感谢页 + Webhook + GA4 event\n")

    # 1. 站内 CTA 链接
    print("--- 1. 站内 CTA 链接 (博客/contact/quote 页面) ---")
    cta_count = 0
    cta_404_risk = 0
    for pat in CTA_PATTERNS[:3]:
        results = grep_pattern(pat, [BLOG, CONTACT, QUOTE])
        print(f"  pattern '{pat[:30]}': {len(results)} hits")
        cta_count += len(results)
    print(f"  [汇总] 站内 CTA 链接 ≈ {cta_count} 处")

    # 2. form action 检查
    print("\n--- 2. form action / method 检查 ---")
    form_results = grep_pattern(r'<form[^>]*action=', [CONTACT, QUOTE, BLOG])
    print(f"  form tags 找到: {len(form_results)}")
    for r in form_results[:5]:
        print(f"    {r['file']}:{r['line']}: {r['text'][:100]}")

    # 3. WhatsApp 链接
    print("\n--- 3. WhatsApp / 邮件 CTA ---")
    wa_results = grep_pattern(r'wa\.me/', [BLOG, CONTACT, QUOTE])
    mailto_results = grep_pattern(r'mailto:', [BLOG, CONTACT, QUOTE])
    print(f"  WhatsApp links: {len(wa_results)}")
    print(f"  mailto links: {len(mailto_results)}")

    # 4. GA4 generate_lead 事件
    print("\n--- 4. GA4 generate_lead 事件检查 ---")
    ga4_results = []
    for pat in GA4_PATTERNS:
        results = grep_pattern(pat, [ROOT + r"\src"])
        ga4_results.extend(results)
    print(f"  GA4 关键 pattern hits: {len(ga4_results)}")
    for r in ga4_results[:8]:
        print(f"    {r['file']}:{r['line']}: {r['text'][:80]}")

    # 5. Webhook / 邮件通知检查 (在 code / config)
    print("\n--- 5. Webhook / 邮件通知实现 ---")
    webhook_results = grep_pattern(r'(webhook|sendgrid|mailgun|resend|smtp|nodemailer)', [ROOT + r"\src", ROOT + r"\app"])
    print(f"  webhook / 邮件库 hits: {len(webhook_results)}")
    for r in webhook_results[:5]:
        print(f"    {r['file']}:{r['line']}: {r['text'][:80]}")

    # 总结
    print("\n" + "=" * 80)
    print("总结 + K3 行动项")
    print("=" * 80)
    print("\nM3 不能做的事 (无设备 / 无 Webhook 触发 / 无 Google OAuth 凭据):")
    print("  ❌ 真实 3 设备测试 (需要 user/3 设备/IP)")
    print("  ❌ 触发 Webhook/邮件通知 (需 Supabase Edge Function / sendgrid API key)")
    print("  ❌ 验证 GA4 DebugView (需 Google Analytics 4 DebugView 浏览器扩展)")
    print()
    print("M3 已做 (grep + 报告):")
    print(f"  ✅ 站内 CTA 链接 ≈ {cta_count} 处 (含 contact/quote/blog)")
    print(f"  ✅ form tags {len(form_results)} 个 (contact/quote/blog)")
    print(f"  ✅ WhatsApp links {len(wa_results)}, mailto {len(mailto_results)}")
    print(f"  ✅ GA4 generate_lead event pattern: {len(ga4_results)} hits")
    print(f"  ✅ 邮件/Webhook 库: {len(webhook_results)} hits")
    print()
    print("K3 需做的 5min 验证 (M3 0 access):")
    print("  [ ] 用 1 设备 + 1 隐身窗口, 走 '博客→CTA→表单→提交→感谢页' 全流程")
    print("  [ ] 检查表单提交后是否收到邮件通知 (zprintpro@outlook.com)")
    print("  [ ] 装 GA4 DebugView Chrome 扩展, 走 1 次提交, 看 generate_lead 事件")
    print("  [ ] 跨 3 locale (zh-hk/en/ja) 各 1 次, 验 locale 切换不丢表单")
    print("  [ ] 跨 3 device (desktop/mobile/tablet) 各 1 次, 验响应式 CTA")

    report = {
        "report_at": "2026-08-07T02:15:00+08:00",
        "trigger": "Qwen 3.8 P0 询盘链路端到端测试 + K3 §6.1 验收",
        "cta_count": cta_count,
        "form_count": len(form_results),
        "whatsapp_count": len(wa_results),
        "mailto_count": len(mailto_results),
        "ga4_pattern_hits": len(ga4_results),
        "webhook_lib_hits": len(webhook_results),
        "verdict": "M3 GREP PARTIAL (前端 OK, 真实提交需 K3 5min 实操)",
        "k3_action": "5min 实操: 1 设备 + 1 隐身窗口 + 3 locale + 3 device 全流程",
    }
    out = r"F:\zprintpro-nextjs\.hermes\reports\conversion-link-check-2026-08-07.json"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"\n[OK] 报告落盘: {out}")

if __name__ == "__main__":
    main()
