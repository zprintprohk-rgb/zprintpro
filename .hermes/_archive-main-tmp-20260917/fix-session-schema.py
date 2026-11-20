#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix 8/1 cron_session to use standard schema (date/skus/pdp_review/note)."""
import json

with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

sessions = matrix.get('v7_cron_sessions', [])
# Find 8/1 session (with started_at or date = 2026-08-01)
for i, s in enumerate(sessions):
    if s.get('started_at', '').startswith('2026-08-01') or s.get('date') == '2026-08-01':
        print(f'Found at index {i}: {s}')
        # Replace with standard schema
        new_session = {
            'session': 'mvs_439eed322ad6463a8f58913bc3afbf52',
            'date': '2026-08-01',
            'deliverables': {
                'blog': 0,
                'sku_optimizations': 5,
                'pdp_reviews': 1,
                'matrix_updates': 1,
                'k3_section6_skip_count': 26,
            },
            'build_quota': 0,
            'strategy': 'v7 daily 1 push 计划 (8/1 是新一天, f5700f9 7/31 已 PASS, build 健康; 0 push 攒批等 §0.6 verify-deck + 0 candidate 8/12 复盘准备)',
            'skus': [
                'security-stickers (P0 stickers, round 1, 7 行业全新 - 雷射/易碎紙/防偽 3 SKU 之一)',
                'fluorescent-stickers (P0 stickers, round 1, 7 行业全新 - 螢光色彩/促銷/安全標識)',
                'thick-paper-flyers (P0 flyers, round 1, 7 行业全新 - 200g+ 厚紙/高端產品)',
                'gang-run-card-boxes (P0 packaging, round 1, 7 行业全新 - 拼版白卡彩盒, 4 種紙材 3 種盒型)',
                'tuck-end-boxes (P0 packaging, round 2 append 1 行, 跟 2026-07-21 R1 7 词并存)',
            ],
            'pdp_review': 'foil-stickers (P0 stickers × 跨境電商/美妝/食品, 5 维度 0 fixes + 0 pending 全过, 跟 7/31 v7-PDP-10 folding-boxes 同水准 - 但 foil-stickers R2 + R1 14 行业覆盖比 folding-boxes 单 7 行业 更广)',
            'note': '2026-08-01 v7.1 daily cron - A SKIP (K3 §6 0 候选常态 9 天 7/24-8/1, 跑 B+C+F 兜底) + B 5 SKU (4 R1 + 1 R2, 跨 4 P0 类目) + C 1 PDP (foil-stickers 5 dim 0+0) + F matrix tracking. matrix P0/P1 100% 饱和 9 天, P2 部分 pending-verify (Q-P2-01/02/03), 0 候选可写. P3 7/30-8/5 校园 3 页 (back-to-school-printing-usa en / new-semester-printing-japan ja / zh-hk educational hero 强化) blocklist 4 cron 严禁写 (M3 P3 reserved). 8/1 同时也是 monthly-matrix-audit cron 触发日 (14:00, §0.1 quota 例外, M3 v2.1 改 v3, K3 §3 v3 拍板 §0.1 1 push/day 维持). 本 cron root session 跑 daily (R1-R6 派生 vs 直接跑 trade-off, R6 5min self-reminder). 8/1 1 commit + 1 push 计划 (K3 §11.5 攒批 + 0 push 不强行, build 健康, §0.1 quota 1/天 维持). 8/12 P4 复盘准备: matrix tracking drift (v7-SKU-01~20 早期 16 个无 optimized_at) 一次性修整; §13.16.1 zh-hk 100% 繁体 7/22 之前旧 5 行追修评估; §6 8/12 验收 7 项 3 项不可达口径重定义.',
        }
        sessions[i] = new_session
        print(f'Updated to standard schema: {new_session["session"]} | {new_session["date"]} | {new_session["deliverables"]}')
        break

matrix['v7_cron_sessions'] = sessions

with open('.hermes/industry-keyword-matrix.json', 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print(f'\nFinal v7_cron_sessions count: {len(sessions)}')
print(f'k3_section6_skip_count: {matrix.get("k3_section6_skip_count")}')
print(f'last_updated: {matrix.get("last_updated")}')
