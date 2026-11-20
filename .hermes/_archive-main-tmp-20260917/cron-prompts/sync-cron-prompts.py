"""
sync-cron-prompts.py — 把 .hermes/cron-prompts/mavis/*.md 同步到 mavis daemon

【为什么需要这个脚本】
- mavis cron update --prompt CLI 有 ~5800 字节 buffer 截断 (cmd 包装 + 编码问题)
- 多行 prompt 在 CLI 第一个 \\n 处被切
- daemon 内存里的 prompt 是启动时从 .md 读入, 直接写 .md 不会触发 reload
- 解决: 走 HTTP API PATCH /mavis/api/agent/mavis/cron/{name}, 无 buffer 限制

【用法】
  python sync-cron-prompts.py              # 同步所有 4 个 zprintpro cron
  python sync-cron-prompts.py --dry-run    # 只 diff 不写
  python sync-cron-prompts.py --name zprintpro-gsc-feedback-loop  # 只同步 1 个

【前提】
- mavis daemon 跑在 127.0.0.1:15321
- 源文件: F:\\zprintpro-nextjs\\.hermes\\cron-prompts\\mavis\\<name>.md
- 目标: HTTP PATCH /mavis/api/agent/mavis/cron/<name>

【幂等】dry-run 默认, --apply 标志才真写
"""
import argparse
import os
import sys
import requests

PORT = 15321
BASE = f'http://127.0.0.1:{PORT}/mavis/api/agent/mavis/cron'
SOURCE_DIR = r'F:\zprintpro-nextjs\.hermes\cron-prompts\mavis'

# 6 个 zprintpro cron: 源文件名 + 关键 marker (用于完整性验证)
# K3 v7 (2026-07-20 user 拍板): 4 改 + 2 新
CRONS = [
    {
        'name': 'zprintpro-daily-content-1x7w',
        'src':  'daily-content-1x7w.md',
        'markers': ['v7 关键变化', '完成标准', 'Sub-task A', '1200+ 字'],
    },
    {
        'name': 'zprintpro-weekly-meta-refresh',
        'src':  'weekly-meta-refresh.md',
        'markers': ['v4 关键变化', '完成标准', 'PDP 转化要素审查', '内链自生长'],
    },
    {
        'name': 'zprintpro-gsc-feedback-loop',
        'src':  'gsc-feedback-loop.md',
        'markers': ['v3 关键变化', '完成标准', '141 残杀词', '301 抓取异常'],
    },
    {
        'name': 'zprintpro-monthly-matrix-audit',
        'src':  'monthly-matrix-audit.md',
        'markers': ['v4 关键变化', '完成标准', '半年冲刺', 'src:modeled'],
    },
    {
        'name': 'zprintpro-revenue-analytics-weekly',
        'src':  'revenue-analytics-weekly.md',
        'markers': ['战略定位', '完成标准', '漏斗转化率', 'GA4 流量分析', 'Supabase 询盘'],
    },
    {
        'name': 'zprintpro-build-quota-cleanup',
        'src':  'build-quota-cleanup.md',
        'markers': ['战略定位', '完成标准', '保留清单', 'git mv', 'self-reminder'],
    },
]


def fetch_current_prompt(name: str) -> str | None:
    """读 daemon 当前的 prompt"""
    r = requests.get(f'{BASE}/{name}', timeout=10)
    r.raise_for_status()
    j = r.json()
    return j.get('prompt')


def sync_one(cron: dict, dry_run: bool = True) -> tuple[bool, str]:
    """同步单个 cron。返回 (changed, message)"""
    src_path = os.path.join(SOURCE_DIR, cron['src'])
    if not os.path.exists(src_path):
        return False, f"❌ 源文件不存在: {src_path}"

    with open(src_path, 'r', encoding='utf-8') as f:
        new_content = f.read()

    # 读 daemon 当前 prompt
    try:
        current = fetch_current_prompt(cron['name'])
    except Exception as e:
        return False, f"❌ 读 daemon 失败: {e}"

    if current is None:
        return False, f"❌ daemon 没返回 prompt"

    # 验证源文件完整性 (用 marker)
    missing = [m for m in cron['markers'] if m not in new_content]
    if missing:
        return False, f"❌ 源文件缺关键 marker: {missing}"

    # 比较: 如果 daemon 已有相同内容, 跳过
    if current == new_content:
        return False, f"✅ 已同步 ({len(current)} chars, 全部 marker 在)"

    diff_chars = len(new_content) - len(current)
    diff_pct = (diff_chars / max(len(current), 1)) * 100

    if dry_run:
        return True, f"🔍 [DRY-RUN] 需要更新: {len(current)} → {len(new_content)} chars ({diff_pct:+.0f}%)"

    # 真写
    r = requests.patch(
        f'{BASE}/{cron["name"]}',
        json={'prompt': new_content},
        timeout=30,
    )
    if r.status_code != 200:
        return False, f"❌ PATCH 失败 {r.status_code}: {r.text[:200]}"

    # 写后 verify
    new_stored = fetch_current_prompt(cron['name'])
    if new_stored != new_content:
        return False, f"❌ 写后 verify 失败: 长度 {len(new_stored)} ≠ 预期 {len(new_content)}"
    missing_after = [m for m in cron['markers'] if m not in new_stored]
    if missing_after:
        return False, f"❌ 写后缺 marker: {missing_after}"

    return True, f"✅ 已更新: {len(current)} → {len(new_stored)} chars"


def main():
    parser = argparse.ArgumentParser(description='Sync zprintpro cron prompts from .md to mavis daemon')
    parser.add_argument('--apply', action='store_true', help='真写 (默认 dry-run)')
    parser.add_argument('--name', help='只同步指定 cron (默认全部)')
    args = parser.parse_args()

    targets = CRONS
    if args.name:
        targets = [c for c in CRONS if c['name'] == args.name]
        if not targets:
            print(f"❌ 未知 cron: {args.name}")
            print(f"   可选: {[c['name'] for c in CRONS]}")
            sys.exit(1)

    mode = 'APPLY' if args.apply else 'DRY-RUN'
    print(f"=== sync-cron-prompts.py [{mode}] ===\n")

    changes = 0
    for c in targets:
        changed, msg = sync_one(c, dry_run=not args.apply)
        print(f"  {c['name']}: {msg}")
        if changed:
            changes += 1

    print(f"\n=== {changes} 个需要更新 ===" if not args.apply else f"\n=== 实际更新 {changes} 个 ===")
    sys.exit(0 if changes == 0 or args.apply else 1)


if __name__ == '__main__':
    main()
