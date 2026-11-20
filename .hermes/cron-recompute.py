#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""让 K3 的 5 个定时任务重算 nextRun (清理逾期 state + enabled false->true 翻转)。

背景 (2026-09-13 实测):
  - idx5-9 = K3 指令的 5 个任务, expr 与指令一字不差, enabled=True, 但 state 只有 nextRunAtMs,
    没有 lastRunAtMs -> 自 09-10 02:38 创建后从未启动; 且 nextRunAtMs 已逾期 1-2.5 天。
  - 全表唯一 lastRunStatus=ok 的任务是 model 为 inherit/default 的; 所有显式
    deepseek__4111173b-.../deepseek-v4-flash 均为 402 billing, zai/zai_auto 亦 402,
    fallback 里的 deepseek__840d2872-... 为 model_not_found。

本脚本只做两件事 (不动其它 33 个任务):
  1) 删除这 5 个 job 的 state 里**过期的 nextRunAtMs** (让调度器按 expr 重算)
  2) enabled: true -> false -> (立即) true 的等价效果: 直接重写 enabled=true 并清 state,
     使调度器重新装载该条目
安全: 先备份 jobs.json -> jobs.json.bak-before-recompute-<ts>; 临时文件 + 原子替换; 写后复读校验。

用法: python .hermes/cron-recompute.py            # 干跑
      python .hermes/cron-recompute.py --apply
"""
import json
import os
import shutil
import sys
import time

P = r'C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json'
TARGETS = [5, 6, 7, 8, 9]
APPLY = '--apply' in sys.argv

raw = open(P, encoding='utf-8').read()
d = json.loads(raw)
jobs = d.get('jobs') or d
if isinstance(jobs, dict):
    jobs = list(jobs.values())

print('total jobs:', len(jobs))
for i in TARGETS:
    j = jobs[i]
    sch = j.get('schedule') or {}
    st = j.get('state') or {}
    print(f'  idx{i} expr={sch.get("expr")} enabled={j.get("enabled")} '
          f'state={sorted(st.keys())} nextRun={st.get("nextRunAtMs")} lastRun={st.get("lastRunAtMs")}')

if not APPLY:
    print('\n[DRY-RUN] 将执行: 清空上述 5 个 job 的 state (让调度器重算 nextRun) 并保持 enabled=True')
    print('         不动其它 33 个 job / 不动 payload / 不动 schedule')
    sys.exit(0)

stamp = time.strftime('%Y%m%d-%H%M%S')
bak = f'{P}.bak-before-recompute-{stamp}'
shutil.copy2(P, bak)
print(f'\n[backup] {os.path.basename(bak)}')

for i in TARGETS:
    j = jobs[i]
    j['state'] = {}                      # 清掉过期的 nextRunAtMs -> 强制重算
    j['enabled'] = True
    j['updatedAtMs'] = int(time.time() * 1000)

tmp = P + '.tmp'
with open(tmp, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
os.replace(tmp, P)                       # 原子替换

# 写后复读校验
d2 = json.loads(open(P, encoding='utf-8').read())
jobs2 = d2.get('jobs') or d2
if isinstance(jobs2, dict):
    jobs2 = list(jobs2.values())
print('verify: total jobs =', len(jobs2))
for i in TARGETS:
    st = jobs2[i].get('state') or {}
    print(f'  idx{i} enabled={jobs2[i].get("enabled")} state={sorted(st.keys())} expr={(jobs2[i].get("schedule") or {}).get("expr")}')
print('\n[OK] 已提交; 调度器应在下个 tick 重算 nextRun 并补跑逾期任务')
