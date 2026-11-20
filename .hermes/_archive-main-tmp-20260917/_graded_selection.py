#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""_graded_selection.py - V20.6 STRICT >=9.0 评分选择 (K3 8/17 05:20 拍板).
不能降级, 一定要 >9.0 分. 推翻 B 级降级逻辑.

新规则 (K3 8/17 05:20):
- max(cand1, cand2) >= 9.0: PASS (正常定稿)
- max(cand1, cand2) < 9.0: PENDING (立即触发 emergency 第 3 张, 不需要人工)
- 3 张都 < 9.0: 报告 K3 拍板
- 3 张都 < 7.0: ABANDON (视为 SKU 失败, 报告 K3)
"""
import os
import sys
import json
import argparse
from pathlib import Path

# Constants
ROOT = Path(__file__).parent.parent
IMG_DIR = ROOT / "zprintpro-en-us-images"
LEDGER = ROOT / "zprintpro-en-us-images" / "v20_9_6_score_ledger.json"

# Thresholds (K3 8/17 05:20 strict - 推翻 B 级降级)
PASS_GRADE = 9.0  # 唯一硬门槛
EMERGENCY_THRESHOLD = 9.0  # 双 < 9.0 触发第 3 张
ABANDON_THRESHOLD = 7.0  # 三候选都 < 7.0 视为 SKU 失败


def load_ledger():
    if LEDGER.exists():
        with open(LEDGER, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_ledger(ledger):
    LEDGER.parent.mkdir(parents=True, exist_ok=True)
    with open(LEDGER, 'w', encoding='utf-8') as f:
        json.dump(ledger, f, indent=2, ensure_ascii=False)


def select_best(sku, view, cand1_score, cand2_score, cand3_score=None):
    """Apply STRICT >=9.0 selection (K3 8/17 05:20 不能降级)."""
    scores = [(1, cand1_score), (2, cand2_score)]
    if cand3_score is not None:
        scores.append((3, cand3_score))
    scores.sort(key=lambda x: -x[1])
    best_cand, best_score = scores[0]
    # K3 8/17 05:20 strict: ONLY >=9.0 pass
    if best_score >= PASS_GRADE:
        return {
            'best_cand': best_cand,
            'best_score': best_score,
            'grade': 'PASS',
            'needs_human_review': False,
            'needs_3rd': False,
            'all_scores': dict([(f'cand{c}', s) for c, s in scores])
        }
    # < 9.0: need 3rd (K3 strict)
    if cand3_score is None:
        return {
            'best_cand': None,
            'best_score': best_score,
            'grade': 'PENDING',
            'needs_human_review': False,
            'needs_3rd': True,
            'all_scores': dict([(f'cand{c}', s) for c, s in scores])
        }
    # Already 3 candidates, still < 9.0
    if best_score < ABANDON_THRESHOLD:
        return {
            'best_cand': None,
            'best_score': best_score,
            'grade': 'ABANDON',
            'needs_human_review': True,
            'needs_3rd': False,
            'all_scores': dict([(f'cand{c}', s) for c, s in scores])
        }
    return {
        'best_cand': best_cand,
        'best_score': best_score,
        'grade': 'PENDING',
        'needs_human_review': True,
        'needs_3rd': False,
        'all_scores': dict([(f'cand{c}', s) for c, s in scores])
    }


def process_sku_view(sku, view, ledger=None):
    if ledger is None:
        ledger = load_ledger()
    key = f"{sku}/{view}"
    entry = ledger.get(key, {})
    cand1 = entry.get('cand1_score')
    cand2 = entry.get('cand2_score')
    cand3 = entry.get('cand3_score')
    if cand1 is None or cand2 is None:
        return None
    result = select_best(sku, view, cand1, cand2, cand3)
    result['sku'] = sku
    result['view'] = view
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--sku', help='Single SKU')
    parser.add_argument('--view', help='Single view')
    parser.add_argument('--cand1', type=float, help='Cand1 score (test mode)')
    parser.add_argument('--cand2', type=float, help='Cand2 score (test mode)')
    parser.add_argument('--cand3', type=float, help='Cand3 score (test mode, optional)')
    parser.add_argument('--all', action='store_true', help='Process all entries in ledger')
    args = parser.parse_args()
    if args.cand1 is not None and args.cand2 is not None:
        result = select_best('TEST', 'TEST', args.cand1, args.cand2, args.cand3)
        print(json.dumps(result, indent=2))
        return
    ledger = load_ledger()
    print(f"Loaded ledger: {len(ledger)} entries")
    if args.sku and args.view:
        result = process_sku_view(args.sku, args.view, ledger)
        if result:
            print(json.dumps(result, indent=2))
        else:
            print(f"No ledger entry for {args.sku}/{args.view}")
        return
    if args.all:
        by_grade = {'PASS': 0, 'PENDING': 0, 'ABANDON': 0}
        for key in sorted(ledger.keys()):
            sku, view = key.split('/', 1)
            r = process_sku_view(sku, view, ledger)
            if r:
                by_grade[r['grade']] = by_grade.get(r['grade'], 0) + 1
                if r['grade'] != 'PASS':
                    marker = '⚠ ' if r['grade'] == 'PENDING' else '✗'
                    print('  ' + marker + ' ' + r['grade'] + ': ' + key + ' (best=' + str(r['best_score']) + ')')
        print()
        print('Grade distribution: ' + str(by_grade))
        return
    print('Usage: --cand1 X --cand2 Y [--cand3 Z] | --sku X --view Y | --all')


if __name__ == '__main__':
    main()
