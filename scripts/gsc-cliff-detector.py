#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/gsc-cliff-detector.py — GSC 断崖检测器 (spam 恢复防护机制, K3 2026-10-12)

背景: 2026-09 spam 更新 10/8 完成推送后整站命中 (诊断 v2, commit fcdd5b57)。
恢复期内需要每日机器判据: ①有没有新的断崖 ②恢复曲线是否在爬升 ③数据是否新鲜。

数据源: GSC数据/<站点>站点28天数据*.xlsx (sheet「图表」= 逐日 日期/点击/展示/CTR/排名)
        + 可选 实时24小时*.xlsx (逐小时, 全 property, 最鲜信号)

判据 (§0.35.4 机器判据, 不看自我播报):
  CRITICAL_CLIFF : 最新完整日展示 < 前 7 日均值 × 30%       → exit 1
  WARN_DEPRESSED : 近 3 日均值 < 28 天日均 × 50% (持续低位, 恢复期跟踪用, 不拦)
  WARN_STALE     : 最新数据日期距今天 > 5 天 (GSC 自身滞后 ~3 天 + 导出 slack 2 天)
  WARN_NO_FILE   : 某站点找不到 28 天档

用法: python scripts/gsc-cliff-detector.py [--json]   # exit 1 = 有 CRITICAL
"""
import glob
import json
import re
import sys
import warnings
from datetime import date, datetime
from pathlib import Path

warnings.filterwarnings('ignore')  # openpyxl 「无默认样式」UserWarning 无害

ROOT = Path(__file__).resolve().parent.parent
GSC_DIR = ROOT / 'GSC数据'
LOG_DIR = ROOT / '.hermes' / 'logs'
CLIFF_RATIO = 0.30
DEPRESSED_RATIO = 0.50
STALE_DAYS = 5
SITES = {'香港': 'hk', '日本': 'jp', '美国': 'us'}


def latest_file(pattern):
    files = sorted(glob.glob(str(GSC_DIR / pattern)), key=lambda p: _file_date(p), reverse=True)
    return Path(files[0]) if files else None


def _file_date(p):
    m = re.search(r'(\d{4}-\d{2}-\d{2})', Path(p).name)
    return m.group(1) if m else '0000-00-00'


def read_daily(path):
    import openpyxl
    wb = openpyxl.load_workbook(path, read_only=True)
    ws = wb['图表'] if '图表' in wb.sheetnames else wb.active
    rows = []
    for r in ws.iter_rows(values_only=True):
        if r and r[0] and re.match(r'^\d{4}-\d{2}-\d{2}$', str(r[0])):
            rows.append({'date': str(r[0]), 'clicks': float(r[1] or 0), 'imps': float(r[2] or 0),
                         'ctr': float(r[3] or 0), 'pos': float(r[4] or 0)})
    return rows


def read_hourly(path):
    import openpyxl
    wb = openpyxl.load_workbook(path, read_only=True)
    ws = wb['图表'] if '图表' in wb.sheetnames else wb.active
    rows = []
    for r in ws.iter_rows(values_only=True):
        if r and r[0] and re.match(r'^\d{4}-\d{2}-\d{2}T', str(r[0])):
            rows.append({'hour': str(r[0]), 'clicks': float(r[1] or 0), 'imps': float(r[2] or 0)})
    return rows


def main():
    today = date.today()
    report = {'date': today.isoformat(), 'sites': {}, 'realtime_24h': None, 'alerts': []}

    for site_zh, code in SITES.items():
        f = latest_file(f'{site_zh}站点28天数据*.xlsx')
        if not f:
            report['alerts'].append({'level': 'WARN_NO_FILE', 'site': code, 'detail': '找不到 28 天档'})
            continue
        rows = read_daily(f)
        if len(rows) < 8:
            report['alerts'].append({'level': 'WARN_NO_FILE', 'site': code, 'detail': f'{f.name} 行数不足 ({len(rows)})'})
            continue
        last = rows[-1]
        prior7 = rows[-8:-1]
        prior7_mean = sum(r['imps'] for r in prior7) / len(prior7)
        trail3 = rows[-3:]
        trail3_mean = sum(r['imps'] for r in trail3) / len(trail3)
        mean28 = sum(r['imps'] for r in rows) / len(rows)
        last_date = datetime.strptime(last['date'], '%Y-%m-%d').date()
        age = (today - last_date).days

        s = {
            'file': f.name, 'days': len(rows), 'latest_date': last['date'], 'data_age_days': age,
            'latest_imps': last['imps'], 'prior7d_mean_imps': round(prior7_mean, 1),
            'trailing3d_mean_imps': round(trail3_mean, 1), 'mean28_imps': round(mean28, 1),
            'total28_imps': sum(r['imps'] for r in rows), 'total28_clicks': sum(r['clicks'] for r in rows),
            'cliff_ratio': round(last['imps'] / prior7_mean, 3) if prior7_mean else None,
            'depression_ratio': round(trail3_mean / mean28, 3) if mean28 else None,
        }
        report['sites'][code] = s

        if age > STALE_DAYS:
            report['alerts'].append({'level': 'WARN_STALE', 'site': code,
                                     'detail': f'最新数据 {last["date"]} 已 {age} 天 (> {STALE_DAYS}), 需导出新档'})
        if prior7_mean >= 20 and last['imps'] < prior7_mean * CLIFF_RATIO:
            report['alerts'].append({'level': 'CRITICAL_CLIFF', 'site': code,
                                     'detail': f'{last["date"]} 展示 {last["imps"]:.0f} < 前7日均 {prior7_mean:.0f} × {CLIFF_RATIO} — 新断崖!'})
        if mean28 >= 20 and trail3_mean < mean28 * DEPRESSED_RATIO:
            report['alerts'].append({'level': 'WARN_DEPRESSED', 'site': code,
                                     'detail': f'近3日均 {trail3_mean:.0f} = 28天日均 {mean28:.0f} 的 {trail3_mean / mean28 * 100:.0f}% (持续低位)'})

    rt = latest_file('实时24小时*.xlsx')
    if rt:
        hours = read_hourly(rt)
        if hours:
            combined_mean = sum(s['mean28_imps'] for s in report['sites'].values())
            rt_imps = sum(h['imps'] for h in hours)
            report['realtime_24h'] = {
                'file': rt.name, 'hours': len(hours),
                'window': f'{hours[0]["hour"]} ~ {hours[-1]["hour"]}',
                'imps': rt_imps, 'clicks': sum(h['clicks'] for h in hours),
                # 恢复曲线主指标: 实时 24h 展示 / 断崖前日均 (28d 档止于 10-05 = 命中前窗口, 可作基线)
                'recovery_ratio_vs_precliff': round(rt_imps / combined_mean, 3) if combined_mean else None,
            }

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    out = LOG_DIR / f'gsc-cliff-{today.isoformat()}.json'
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    critical = [a for a in report['alerts'] if a['level'] == 'CRITICAL_CLIFF']
    for code, s in report['sites'].items():
        print(f"[cliff] {code}: 最新日 {s['latest_date']} 展示 {s['latest_imps']:.0f} | 前7日均 {s['prior7d_mean_imps']:.0f} | "
              f"近3日均 {s['trailing3d_mean_imps']:.0f} ({(s['depression_ratio'] or 0) * 100:.0f}% of 28d日均) | 数据龄 {s['data_age_days']}d")
    if report['realtime_24h']:
        r = report['realtime_24h']
        rr = r.get('recovery_ratio_vs_precliff')
        print(f"[cliff] realtime24h ({r['window']}): 展示 {r['imps']:.0f} / 点击 {r['clicks']:.0f}"
              + (f" | 恢复系数 {rr * 100:.1f}% (vs 断崖前日均, 目标爬回 100%)" if rr is not None else ""))
    for a in report['alerts']:
        print(f"[cliff] {a['level']} [{a.get('site', '-')}] {a['detail']}")
    print(f"[cliff] 报告 -> {out}")

    if '--json' in sys.argv:
        print(json.dumps(report, ensure_ascii=False))
    sys.exit(1 if critical else 0)


if __name__ == '__main__':
    main()
