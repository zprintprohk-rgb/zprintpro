from pathlib import Path
import time

root = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images")
total_done = 0
detail = []
for sku in ['WI-001','WI-002','WI-003','WI-004','WI-005','WI-006',
            'PC-001','PC-002','PC-003','PC-004','PC-005','PC-006']:
    d = root / sku
    if not d.exists():
        detail.append(f'{sku}: dir-missing')
        continue
    webps = list(d.glob('*.webp'))
    pngs = list(d.glob('*.png'))
    jpgs = list(d.glob('*.jpg'))
    if webps or pngs or jpgs:
        total_done += 1
        all_imgs = webps + pngs + jpgs
        latest_mtime = max(p.stat().st_mtime for p in all_imgs)
        age_min = (time.time() - latest_mtime) / 60
        names = ','.join(sorted(p.name for p in all_imgs)[:6])
        detail.append(f'{sku}: {len(webps)}w+{len(pngs)}p+{len(jpgs)}j (last {age_min:.1f}min ago) [{names}]')
    else:
        detail.append(f'{sku}: 0 files')

print(f'TOTAL done: {total_done}/12')
for d in detail: print(' ', d)

# check bg task
import subprocess
try:
    r = subprocess.run(['tasklist', '/FI', 'IMAGENAME eq python.exe', '/FO', 'CSV', '/NH'],
                       capture_output=True, text=True, timeout=10)
    procs = [l for l in r.stdout.splitlines() if 'python' in l.lower()]
    print(f'\nPython procs: {len(procs)}')
    for p in procs[:5]:
        print(' ', p[:200])
except Exception as e:
    print(f'proc check err: {e}')
