#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""诊断 cron 注册表: 各任务的 model 引用格式 vs 运行状态 (ASCII 输出, 避免控制台编码问题)。"""
import json
import collections

P = r'C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json'
d = json.load(open(P, encoding='utf-8'))
jobs = d.get('jobs') or d
if isinstance(jobs, dict):
    jobs = list(jobs.values())

print('total jobs:', len(jobs))
print()
print('idx | enabled | model-ref                                    | fallbacks | lastStatus      | errReason')
print('-' * 118)
status_by_model = collections.Counter()
for i, j in enumerate(jobs):
    p = j.get('payload') or {}
    model = p.get('model') or '(inherit/default)'
    fb = p.get('fallbacks') or []
    st = j.get('state') or {}
    ls = st.get('lastRunStatus') or st.get('lastStatus') or ('NEVER' if not st.get('lastRunAtMs') else '?')
    reason = st.get('lastErrorReason') or '-'
    status_by_model[(model, ls)] += 1
    print(f'{i:<3} | {str(j.get("enabled")):<7} | {model[:44]:<44} | {len(fb):<9} | {ls:<15} | {reason[:18]}')

print()
print('=== 按 (model, 状态) 汇总 ===')
for (m, s), c in status_by_model.most_common():
    print(f'  {c:>2}x  status={s:<8}  model={m[:60]}')

print()
print('=== 所有出现过的 model 引用 (去重) ===')
for m in sorted({(j.get('payload') or {}).get('model') or '(inherit)' for j in jobs}):
    print('  -', m)

print()
print('=== zprintpro agent 的 6 个任务详解 ===')
for i, j in enumerate(jobs):
    if (j.get('agentId') or '') != 'zprintpro':
        continue
    p = j.get('payload') or {}
    st = j.get('state') or {}
    print(f'  idx{i} expr={j.get("schedule",{}).get("expr")} enabled={j.get("enabled")}')
    print(f'        model={p.get("model")} fallbacks={p.get("fallbacks")} timeout={p.get("timeoutSeconds")}')
    print(f'        state keys={sorted(st.keys())}')
    print(f'        lastRunAtMs={st.get("lastRunAtMs")} lastStatus={st.get("lastRunStatus")} err={(st.get("lastErrorReason") or "-")}')
