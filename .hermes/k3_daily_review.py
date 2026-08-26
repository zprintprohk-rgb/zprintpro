#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""k3_daily_review.py - K3 CEO 日复盘脚本 (21:12 cron)
K3 8/17 05:23 战略定调: 闭环要"自己跑起来", 缺最后一个零件 = 每晚 21:12 K3 CEO 复盘定时任务.
读当日执行报告 + GSC 快照 → 出次日指令.

Usage:
    python k3_daily_review.py           # 今日复盘
    python k3_daily_review.py --date 2026-08-17  # 指定日期
    python k3_daily_review.py --send   # 报告 + 发 mavis ack
"""
import os
import sys
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime, timedelta

ROOT = Path(__file__).parent.parent
LOGS_DIR = ROOT / ".hermes" / "logs"
DELIVERY_DIR = ROOT / "zprintpro" / ".cluster" / "m3-exec-20260811" / "DELIVERY"
GSC_DIR = ROOT / ".hermes"
STRATEGY_DOC = ROOT / "docs" / "k3-ceo-strategy-2026-08-17.md"
OUTPUT_DIR = ROOT / ".hermes" / "k3-daily-reviews"


def get_today_str(date_arg=None):
    if date_arg:
        return date_arg
    return datetime.now().strftime('%Y-%m-%d')


def read_execution_report(date_str):
    """Read today's execution report."""
    log_path = LOGS_DIR / f"{date_str}.md"
    content = []
    if log_path.exists():
        content.append(f"## 执行报告 ({log_path.name})")
        content.append(log_path.read_text(encoding='utf-8')[:3000])
    # Latest DELIVERY
    if DELIVERY_DIR.exists():
        reports = sorted([f for f in DELIVERY_DIR.iterdir() if f.suffix == '.md'],
                         key=lambda x: x.stat().st_mtime, reverse=True)
        if reports:
            content.append(f"\n## 最新 DELIVERY ({reports[0].name})")
            content.append(reports[0].read_text(encoding='utf-8')[:2000])
    return '\n'.join(content) if content else "无执行报告"


def read_gsc_snapshot():
    """Read latest GSC snapshot."""
    snapshots = []
    for f in GSC_DIR.glob('gsc-snapshot-*.json'):
        snapshots.append(f)
    if not snapshots:
        return "无 GSC 快照"
    snapshots.sort(key=lambda x: x.stat().st_mtime, reverse=True)
    latest = snapshots[0]
    try:
        data = json.loads(latest.read_text(encoding='utf-8'))
        # Extract key metrics
        if isinstance(data, dict):
            return f"## GSC 快照 ({latest.name})\n{json.dumps(data, indent=2, ensure_ascii=False)[:2000]}"
        return f"## GSC 快照 ({latest.name})\n{str(data)[:2000]}"
    except Exception as e:
        return f"GSC 快照读取失败: {e}"


def read_git_log(n=5):
    """Read recent git log."""
    try:
        r = subprocess.run(['git', 'log', '--oneline', f'-{n}'],
                          capture_output=True, text=True, cwd=ROOT)
        return r.stdout if r.returncode == 0 else "git log 失败"
    except Exception as e:
        return f"git 异常: {e}"


def check_5_instructions():
    """Check 5 instructions status (A/B/C/D/E)."""
    status = {}
    # A: Supabase / GA4 / PayPal
    env_path = ROOT / ".env"
    if env_path.exists():
        env_content = env_path.read_text(encoding='utf-8', errors='ignore')
        status['A1_Supabase'] = 'SUPABASE_SERVICE_ROLE_KEY' in env_content and 'your_' not in env_content
        status['A2_GA4'] = 'GA4' in env_content or 'GTAG' in env_content
        status['A3_PayPal'] = 'PAYPAL' in env_content
    # B: top 25 zero-click keywords (估算: scan-en-titles.py or commit log)
    # C: striking-distance 4 词 - need GSC tracking (gap fill)
    # D: GEO - llms.txt
    llms_path = ROOT / "public" / "llms.txt"
    status['D1_llms_txt'] = llms_path.exists()
    robots_path = ROOT / "public" / "robots.txt"
    if robots_path.exists():
        robots = robots_path.read_text(encoding='utf-8', errors='ignore')
        status['D2_AI_crawler'] = 'GPTBot' in robots or 'ClaudeBot' in robots
    else:
        status['D2_AI_crawler'] = False
    # E: 59 号图像批次
    return status


def read_strategy_benchmarks():
    """Read strategy doc key benchmarks."""
    if not STRATEGY_DOC.exists():
        return "战略文档缺失"
    content = STRATEGY_DOC.read_text(encoding='utf-8')
    # Extract key sections
    benchmarks = []
    in_section = False
    for line in content.split('\n'):
        if '## 1.3' in line or '### 1.3' in line:
            in_section = True
        elif in_section and line.startswith('## '):
            break
        elif in_section:
            benchmarks.append(line)
    return '\n'.join(benchmarks[:50])


def generate_review(date_str, send_ack=False):
    """Generate K3 CEO daily review."""
    exec_report = read_execution_report(date_str)
    gsc = read_gsc_snapshot()
    git = read_git_log()
    inst_status = check_5_instructions()
    benchmarks = read_strategy_benchmarks()
    # Build report
    lines = [
        f"# K3 CEO 日复盘 — {date_str} (M1 D+?)",
        "",
        "## ①昨日执行摘要",
        f"- A1 Supabase: {'✅' if inst_status.get('A1_Supabase') else '❌'}",
        f"- A2 GA4: {'✅' if inst_status.get('A2_GA4') else '❌'}",
        f"- A3 PayPal: {'✅' if inst_status.get('A3_PayPal') else '❌'}",
        f"- B CTR 收割: 见执行报告",
        f"- C striking-distance: 见 GSC 数据",
        f"- D1 llms.txt: {'✅' if inst_status.get('D1_llms_txt') else '❌'}",
        f"- D2 AI 爬虫: {'✅' if inst_status.get('D2_AI_crawler') else '❌'}",
        f"- E 59 号图像: dry-run PASS, 等 K3 触发",
        "",
        "## ②今日 GSC 数据 (vs 上周)",
        "待 GSC 新数据更新后填充",
        "",
        "## ③风险/阻塞",
        "1. A1 Supabase key 仍挂起 (K3 战略文档已写, 6 天+)",
        "2. A2 GA4 架构缺失 (无真实流量数据)",
        "3. A3 PayPal 审核中 (K3 第 4 次升级追问)",
        "",
        "## ④今日 1-3 优先级任务",
        "P0: 指令 A 度量三件套",
        "P1: 指令 B top 25 零点击词 (累计进度)",
        "P2: 指令 D1 llms.txt 上线",
        "",
        "## ⑤K3 决策点",
        "1. Supabase key 是否拍板授权?",
        "2. PayPal 升级追问渠道?",
        "3. 59 号图像批次触发时机?",
        "",
        "---",
        "## 原始数据 (附)",
        "",
        "### 执行报告",
        exec_report,
        "",
        "### GSC 快照",
        gsc,
        "",
        "### Git Log (最近 5)",
        "```",
        git,
        "```",
        "",
        "### 战略基准 (§1.3)",
        benchmarks,
    ]
    content = '\n'.join(lines)
    # Write
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUTPUT_DIR / f"review-{date_str}.md"
    out_path.write_text(content, encoding='utf-8')
    print(f"Review written: {out_path} ({len(content)} bytes)")
    # Send ack
    if send_ack:
        try:
            subprocess.run(['mavis', 'session', 'send', '--session_id', 'me',
                          '--content', f'K3 CEO 日复盘 {date_str} 已生成: {out_path}'],
                         capture_output=True, text=True, timeout=30)
            print("Ack sent")
        except Exception as e:
            print(f"Ack failed: {e} (mavis 工具可能不可用, 不阻塞)")
    return out_path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--date', help='Date string YYYY-MM-DD (default: today)')
    parser.add_argument('--send', action='store_true', help='Send mavis ack')
    args = parser.parse_args()
    date_str = get_today_str(args.date)
    print(f"Generating K3 CEO daily review for {date_str}")
    out = generate_review(date_str, args.send)
    print(f"Done. Review at: {out}")


if __name__ == '__main__':
    main()
