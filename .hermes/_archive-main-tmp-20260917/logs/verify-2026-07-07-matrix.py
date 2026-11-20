import json
from pathlib import Path
m = json.loads(Path(r'F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json').read_text(encoding='utf-8'))

print('=== priority_boost 字段 clamp 检查 ===')
issues = 0
for entry in m['queue']:
    pb = entry.get('priority_boost', 0)
    status = 'OK' if -3 <= pb <= 3 else 'VIOLATION'
    print(f"  [{status}] {entry['id']:10s}: priority_boost={pb:+d}")
    if status == 'VIOLATION':
        issues += 1
print(f'\nTotal queue: {len(m["queue"])}')
print(f'Violations: {issues}')

print('\n=== covered[] 完整性 ===')
covered = m.get('covered', [])
print(f'  total covered: {len(covered)}')
all_verified = all(c.get('verify_status') == 'PASS' for c in covered)
print(f'  all PASS: {all_verified}')
all_have_id = all('id' in c for c in covered)
all_have_covered_at = all('covered_at' in c for c in covered)
print(f'  all have id: {all_have_id}')
print(f'  all have covered_at: {all_have_covered_at}')

print('\n=== priority_boost_history 全 trace ===')
for entry in m.get('priority_boost_history', []):
    chg = entry.get('changes', [])
    print(f"  {entry.get('date')} | {entry.get('trigger')[:60]} | {len(chg)} changes")
    for c in chg[:3]:
        print(f'    - {c.get("id")}: {c.get("old", 0)} → {c.get("new", 0)}')
