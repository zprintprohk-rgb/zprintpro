#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""K3 5 个定时任务「首次运行」核验器 (2026-09-13 建)。

用途: 21:17 (每日内容) / 22:43 (GSC) 之后跑一次, 判断 K3 指令的 5 个任务是否终于跑起来了。
判据 (任一为真即 PASS):
  - state.lastRunAtMs 出现   -> 首次被启动
  - state.nextRunAtMs 前进到未来 -> 调度器已重新装载并重算
若两者皆否 -> 调度器仍未装载这 5 条 -> 需要重启 AutoClaw 后再验。

用法: python .hermes/cron-check-tonight.py
退出码: 0 = 已跑起来 / 2 = 仍未装载 / 3 = 注册表读不到
"""
import json
import sys
import datetime

P = r'C:\Users\Administrator\.openclaw-autoclaw\cron\jobs.json'
LABELS = {
    5: 'daily 21:17 每日内容1x7w',
    6: 'gsc 22:43 GSC反哺',
    7: 'weekly Fri 23:07 meta刷新',
    8: 'blog Sat 05:37 深度重写',
    9: 'monthly 1st 06:13 月度矩阵审计',
}

try:
    d = json.load(open(P, encoding='utf-8'))
except Exception as e:  # noqa: BLE001
    print('FAIL: 读不到注册表:', e)
    sys.exit(3)

jobs = d.get('jobs') or d
if isinstance(jobs, dict):
    jobs = list(jobs.values())

now = datetime.datetime.now()
now_ms = now.timestamp() * 1000
launched = 0
rescheduled = 0

print('now =', now.strftime('%Y-%m-%d %H:%M:%S'))
print('-' * 96)
for i, label in LABELS.items():
    j = jobs[i]
    st = j.get('state') or {}
    lr = st.get('lastRunAtMs')
    nx = st.get('nextRunAtMs')
    lr_s = datetime.datetime.fromtimestamp(lr / 1000).strftime('%m-%d %H:%M') if lr else 'NEVER'
    nx_s = datetime.datetime.fromtimestamp(nx / 1000).strftime('%m-%d %H:%M') if nx else 'none'
    future = 'future' if (nx and nx > now_ms) else ('overdue' if nx else 'no-nextRun')
    if lr:
        launched += 1
    if nx and nx > now_ms:
        rescheduled += 1
    print(f'  idx{i} {label:<28} enabled={j.get("enabled")} lastRun={lr_s:<12} nextRun={nx_s:<12} ({future}) lastStatus={st.get("lastRunStatus")} err={st.get("lastErrorReason") or "-"}')

print('-' * 96)
verdict = f'首次启动: {launched}/5    已重算 nextRun: {rescheduled}/5'
print(verdict)
if launched:
    verdict += ' -> PASS: 至少一个任务已首次运行 (若 lastStatus=error 请查模型层 402/model_not_found)'
    code = 0
elif rescheduled:
    verdict += ' -> PARTIAL: 调度器已重新装载并重算, 但还没到触发点, 按各自 expr 等到点再看'
    code = 0
else:
    verdict += ' -> FAIL: 5 条仍未被调度器装载 (无 lastRun 且无未来 nextRun), 需要重启 AutoClaw 后再验'
    code = 2
print(verdict)

# 独立看门狗: 自行落盘报告 (不依赖 AutoClaw 调度器, 也不依赖 cmd 重定向/日期格式)
LOG = r'F:\zprintpro-nextjs\.hermes\logs\cron-check-tonight.md'
try:
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(f'## {now.strftime("%Y-%m-%d %H:%M")} 独立看门狗核验\n{verdict}\n\n')
    print('report ->', LOG)
except Exception as e:  # noqa: BLE001
    print('WARN: 报告落盘失败:', e)

sys.exit(code)
