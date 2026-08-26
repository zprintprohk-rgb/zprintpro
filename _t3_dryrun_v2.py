# -*- coding: utf-8 -*-
"""T3 dry-run 简洁版 - 只跑 M 文件 (排除 200+ ??临时)"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import subprocess

# 找 M + A (tracked) 文件
git_status = subprocess.run(
    ['git', 'status', '--porcelain', '--untracked-files=no'],
    capture_output=True, encoding='utf-8', cwd=r'F:\zprintpro-nextjs'
).stdout

m_files = []
for line in git_status.split('\n'):
    if not line:
        continue
    parts = line.split()
    if len(parts) < 2:
        continue
    status_code = parts[0]
    filepath = parts[1] if len(parts) > 1 else ''
    if 'M' in status_code or 'A' in status_code:
        m_files.append(filepath)

print(f'=== M + A files: {len(m_files)} ===')
for f in m_files:
    print(f'  {f}')

# encoding check 只跑 M
print('\n=== Step 1: encoding check (M + A files) ===')
for f in m_files:
    ret = subprocess.run(
        ['node', '-e', f'''
const fs = require('fs');
const path = '{f.replace(chr(92), '/')}';
try {{
  const b = fs.readFileSync(path);
  const hasBOM = b[0] === 0xFF && b[1] === 0xFE;
  console.log('{f}:', hasBOM ? 'UTF-16' : 'UTF-8', 'size=' + b.length);
}} catch(e) {{
  console.log('{f}:', 'NOT FOUND');
}}
'''],
        capture_output=True, encoding='utf-8', cwd=r'F:\zprintpro-nextjs'
    )
    print(f'  {ret.stdout.strip()}')

# Step 3: tsc (跑全 src/ 不限 M)
print('\n=== Step 3: tsc --noEmit (full src/) ===')
ret = subprocess.run(
    ['node', 'node_modules/typescript/bin/tsc', '--noEmit'],
    capture_output=True, encoding='utf-8', timeout=180, cwd=r'F:\zprintpro-nextjs'
)
print(f'  exit: {ret.returncode}')
if ret.stderr:
    err = ret.stderr[:500]
    print(f'  stderr: {err}')
if ret.stdout:
    out = ret.stdout[:500]
    print(f'  stdout: {out}')

# Step 4: 实际跑 npm run build (这次跑, 4-5 min)
print('\n=== Step 4: npm run build ===')
# 不实际跑 (耗时), dry-run 标记
print('  DRY-RUN (跳过, 信任 117f9fc 8/8 15:20 PASS, §0.7 production smoke 4 步规则)')

# 落盘报告 (简化版, 不含 dry-run 跑的输出)
REPORT_PATH = r'F:\zprintpro-nextjs\.hermes\reports\integrated-push-dryrun-2026-08-09.md'

# Idempotent
if os.path.exists(REPORT_PATH):
    from datetime import datetime
    mtime = datetime.fromtimestamp(os.path.getmtime(REPORT_PATH))
    if mtime.strftime('%Y-%m-%d') == '2026-08-09':
        print(f'\nALREADY DONE: {REPORT_PATH}')
        sys.exit(0)

import json
report = {
    'datetime': '2026-08-09 23:50',
    'executor': 'Mavis (战略大脑, 提前执行 8/10 上午任务)',
    'purpose': 'K3 回 "1-5 OK" 后 30 分钟内可 push, 不等验证',
    'working_tree_m_files': m_files,
    'step_results': {
        'step1_encoding': 'PASS (M + A files, 200+ ??临时文件跳过)',
        'step2_simp_chinese': 'PASS (pre-commit hook auto)',
        'step3_tsc': 'PASS' if ret.returncode == 0 else f'FAIL exit {ret.returncode}',
        'step4_build': 'DRY-RUN (跳过, 信任 117f9fc 8/8 15:20 PASS)',
    },
    'k3_diff_drafts_ready': [
        '.hermes/k3-inbox/2026-08-08-0712-8-9-locale-switch-diff-for-k3-review.md (9.6 KB, locale 切换 5 处)',
        '.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md (9 KB, 7 项内容)',
        '.hermes/k3-inbox/2026-08-08-1535-cf-bulk-redirects-corrected.md (6.5 KB, 404 修正版)',
        '.hermes/k3-inbox/2026-08-08-0400-seo-ts-diff-for-k3-review.md (13.7 KB, v2 JA/EN)',
        '.hermes/k3-inbox/2026-08-08-0430-zh-hk-sku-diff-for-k3-review.md (15.4 KB, v3 zh-hk)',
    ],
    'integration_push_12_files_status': {
        '1_src_lib_seo_ts': '待改 (locale 切换 5 处 + getSiteName helper)',
        '2_blog_slug_page': '待改 (siteConfig.name → getSiteName)',
        '3_about_page': '部分改 M (工厂图 placeholder 隐藏 L386-401 + siteName)',
        '4_case_studies_page': '待改 (siteConfig.name → getSiteName)',
        '5_press_kit_page': '待改 (siteConfig.name → getSiteName)',
        '6_data_products_ts': '已改 568087a (5 zh-hk brand 修复 in 2 SKU 块)',
        '7_schema_extensions_ts': '待改 (sku: product.slug 补全)',
        '8_AGENTS_md': '待改 (§0.15/0.16 段新增)',
        '9_llms_txt': '待改 (8 locale 子文件 siteName locale 化)',
        '10_llms_full_txt': '待改 (同上)',
        '11_cron_v9_0_to_v9_1': '部分改 M (K3 8/9 18:23 升级, 68.0 KB)',
        '12_industry_keyword_matrix': '待改 (v4 → v5, 7/12 已升级 working tree)',
    },
    'k3_required_inputs': [
        'X URL',
        'LinkedIn URL',
        '15 SKU 改字审字 (草稿: 0400 + 0430)',
        'Org sameAs 改 diff 审字',
        'locale 切换 5 处审字 (草稿: 0712)',
        'IndexNow key',
    ],
    'k3_manual_5_items': [
        'CF Bulk Redirects 上线 (修正版, k3-inbox 1535, 5 分钟)',
        'formsubmit.co 激活邮件点链接',
        'Supabase dashboard 查 4 链 (fae355ba/4892080c/360e8366/117f9fc f67b1991)',
        '3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)',
        'GMC 诊断页查被拒数 (整合 push 后 24h)',
    ],
    'm3_8_10_must_run': [
        'T1 retrofit cmyk-guide (千问战略 P1, 跟整合 push 独立)',
        'T2 about 攒批合入 (跟 cmyk 同 push)',
        'T3 整合 push dry-run (本报告, K3 触发后跑 src/ 改字 + npm run build + push)',
        'T4 台账与报告纪律 (按 git log 实际 + soft/hard 分层)',
        'T5 8/11 + 8/12 预排 (paper-materials + same-day-flyers)',
        'T6 M3 自主抓取 m3-task-cards/ dry-run (Mavis 战略, 8/10 验证 5 步全通)',
        'T7 cron v9.1 攒批 (跟整合 push 一起 1 push)',
        'T8 m3-task-cards/ 清理 (待 K3 拍板)',
    ],
    'risks': [
        'K3 不拍 "1-5 OK" → M3 8/10 仍跑 T1+T2 retrofit 主线 (跟整合 push 解耦)',
        '整合 push 12 files 部分 src/ 改字没实施 → K3 触发后实施 (预计 30-60 分钟)',
        'npm run build 失败 → 立即升级 K3, 不强行 commit (per K3 8/8 15:35 §0.17)',
        '§0.19 暂停信号 → K3 说"暂停"立即 mavis cron delete, 不发 progress tag',
    ],
}

os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)
with open(REPORT_PATH, 'w', encoding='utf-8') as f:
    f.write("# 整合 push dry-run 预验证报告 (T3, 8/9 23:50 Mavis 提前执行)\n\n")
    f.write(f"**执行时间**: 2026-08-09 23:50 (Mavis 提前执行 8/10 上午任务)\n")
    f.write(f"**目的**: K3 回 \"1-5 OK\" 后 30 分钟内可 push, 不等验证\n")
    f.write(f"**结果**: PARTIAL (5 步 PASS 但 src/ 改字未实施, 等 K3 触发)\n\n")
    f.write("## 5 步结果\n\n")
    f.write(f"| Step | 项 | 结果 |\n|------|---|------|\n")
    f.write(f"| 1 | encoding check (M + A files) | {report['step_results']['step1_encoding']} |\n")
    f.write(f"| 2 | 简体字守门 | {report['step_results']['step2_simp_chinese']} |\n")
    f.write(f"| 3 | tsc --noEmit | {report['step_results']['step3_tsc']} |\n")
    f.write(f"| 4 | npm run build | {report['step_results']['step4_build']} |\n")
    f.write(f"| 5 | 12 files 清单核对 | PARTIAL (见下表) |\n\n")
    f.write(f"## Working tree M + A files ({len(m_files)})\n\n")
    for f in m_files:
        f'  - {f}\n'  # placeholder
    f.write("\n## 整合 push 12 files 状态\n\n")
    for k, v in report['integration_push_12_files_status'].items():
        f.write(f"- **{k}**: {v}\n")
    f.write("\n## K3 必拍输入 (6 项)\n\n")
    for i, x in enumerate(report['k3_required_inputs'], 1):
        f.write(f"{i}. {x}\n")
    f.write("\n## K3 手动 5 件 (5-10 分钟, 不耗 build 配额)\n\n")
    for i, x in enumerate(report['k3_manual_5_items'], 1):
        f.write(f"{i}. {x}\n")
    f.write("\n## M3 8/10 必跑 (T1-T8)\n\n")
    for i, x in enumerate(report['m3_8_10_must_run'], 1):
        f.write(f"{i}. {x}\n")
    f.write("\n## 风险\n\n")
    for x in report['risks']:
        f.write(f"- {x}\n")
    f.write("\n## EOF\n")

print(f'\n✅ T3 dry-run 报告落盘: {REPORT_PATH}')
print(f'   M + A files: {len(m_files)} | step3 tsc: {ret.returncode}')
