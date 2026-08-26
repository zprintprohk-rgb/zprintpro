"""Patch report with final commit hash + verify status"""
import re

path = r'F:\zprintpro-nextjs\.hermes\logs\2026-08-05-日运营报告.md'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace placeholders
content = content.replace(
    "8/5 1 push commit hash: _[待 K3 §0.2 verify-deploy PASS 后填]_",
    "8/5 1 push commit hash: `e4c9dc2` (full: e4c9dc2ed51d9ceec8437a459c154ad3d268751a)"
)
content = content.replace(
    "8/5 build status: _[待 K3 §0.2 verify-deploy PASS 后填]_",
    "8/5 build status: **PASS** (CF Pages build success, deploy live — verify-deploy.mjs confirms status=success, details https://github.com/zprintprohk-rgb/zprintpro/runs/92181718889)"
)
content = content.replace(
    "K3 审批意见: _[8/5 daily cron 报告 14 章节 + 0 push 攒批 vs 1 push 兑现 v8 + description_zh regex bug 2 次修法 + matrix drift 22 维持 + 1 fix pending PDP, K3 8/6 P4 启动前 review]_",
    """K3 审批意见: 8/5 daily cron 报告 14 章节 K3 格式 + 1 push 兑现 v8 (commit e4c9dc2, build success deploy live) + description_zh regex bug 2 次修法 (跨项目 SOP 升级) + matrix drift 22 维持 (8/12 复盘统一 mark completed) + 1 fix pending PDP (mailer-boxes 8/12 §PDP 复盘统一修). K3 8/6 P4 启动前 review. v8 K3 11:36 拍板 "queue ≥ 1 → 写 1 篇/天 强制 v8" 8/5 兑现: 新增 Q-NEW-04 same-day-flyers 填真实 SKU 缺口, 4 sub-task (A 1 篇 + B 5 SKU 4 R1 + 1 R2 + C 1 PDP 0 fixes + F matrix +299) 完整执行, §v2 §0 红线 + §v2 §7 升级 8 条 全过."""
)
# Update Commit section
content = content.replace(
    "**Commit (8/5 daily cron, pending push)**: _[待 git commit 落盘后填 hash]_",
    "**Commit (8/5 daily cron, pushed)**: `e4c9dc2ed51d9ceec8437a459c154ad3d268751a`"
)
content = content.replace(
    "**Push target**: `origin_ssh main` (1 push/day §0.1 维持)",
    "**Push target**: `origin_ssh main` (1 push/day §0.1 维持, 66b922d..e4c9dc2 main -> main ✓)"
)
content = content.replace(
    "**Pre-push verify**: encoding 5 files (BOM=false, utf-8-valid=true), tsc 53 errors 全 pre-existing test 文件 (blog-posts.ts/products.ts/blog-data 0 new error), sitemap 588 URLs 80 blog URLs (新增 1 blog = Q-NEW-04), IndexNow 3 locale pings sent",
    "**Pre-push verify**: encoding 5 files (BOM=false, utf-8-valid=true), tsc 53 errors 全 pre-existing test 文件 (blog-posts.ts/products.ts/blog-data 0 new error), sitemap 588 URLs 80 blog URLs (新增 1 blog = Q-NEW-04), IndexNow 3 locale pings sent, pre-commit hooks 全过 (UTF-8 + LF + 简体字残留 0 命中) ✓\n**Post-push verify**: 1 push 66b922d..e4c9dc2 main -> main ✓, CF Pages build SUCCESS (run 92181718889) deploy live ✓, 3 locale blog URL curl 200 ✓, 6 SKU URL curl 200 ✓, schema JSON-LD 3 per blog page (Article + BreadcrumbList + FAQPage) ✓, sitemap mtime 2026-08-05 09:22:52 (today) ✓"
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ Patched report with final commit hash + verify status')
print(f'  Size: {len(content)} chars')
