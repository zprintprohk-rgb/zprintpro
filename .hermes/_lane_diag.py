# -*- coding: utf-8 -*-
# 五车道可靠性诊断: 10/24-10/26 缺口提取
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
ls = json.load(open(r'F:\zprintpro-nextjs\.hermes\logs\lane-status.json', encoding='utf-8'))
for lane in ls['lanes']:
    task = lane['task']
    sched = lane.get('scheduler', {})
    print(f"== {task} | Last={sched.get('Last')} Result={sched.get('Result')} Next={sched.get('Next')}")
    for d in lane.get('days', []):
        if d['day'] in ('2026-10-24', '2026-10-25', '2026-10-26'):
            rp = d.get('recovery_plan', {})
            print(f"  {d['day']} status={d['status']} state={d.get('state')} report={d.get('report')} action={rp.get('action')} reason={rp.get('reason','')[:60]} exit={d.get('exit')}")
print("== problems 段 ==")
for p in ls.get('problems', []):
    print(" ", json.dumps(p, ensure_ascii=False)[:150])
print("== need_human ==")
for n in ls.get('need_human', []):
    print(" ", json.dumps(n, ensure_ascii=False)[:150])
