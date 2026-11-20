# -*- coding: utf-8 -*-
# 猎窗爆发器: 探针(auth window)每 20s 一次; 窗口一开 → 连发补齐全部缺失图; 窗关 → 回探针
# 上限 90 min; 断点续跑 (已存在文件跳过)。免费探针不计费; 真图 0.12元/张 ×11 = 1.32元
import json, time, sys, io
from pathlib import Path
from PIL import Image
import requests
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(r'F:\zprintpro-nextjs')
sys.path.insert(0, str(ROOT / '.hermes'))
src = open(ROOT / '.hermes' / '_roll_images2.py', encoding='utf-8').read()
ns = {'__name__': 'rollbatch'}
exec(src[:src.index('# 前台分片跑')], ns)
ORDER = ns['ORDER']; gen = ns['gen']; ARK_KEY = ns['ARK_KEY']; ARK_URL = ns['ARK_URL']
RAW_DIR = ns['RAW_DIR']; WEBP_DIR = ns['WEBP_DIR']; ALT = ns['ALT']
make_exif = ns['make_exif']

CAP_MIN = 90
t0 = time.time()
windows = 0

def missing():
    out = []
    for loc, view, n in ORDER:
        base = 'zprintpro-stickers-roll-stickers-%s-%d' % (loc, n)
        if not ((RAW_DIR / (base + '.png')).exists() and (WEBP_DIR / (base + '.webp')).exists()):
            out.append((loc, view, n, base))
    return out

def probe():
    try:
        rp = requests.post(ARK_URL, json={'model': 'no-such-model-probe', 'prompt': 'probe', 'response_format': 'url', 'size': '1024x1024', 'watermark': False, 'n': 1},
                           headers={'Authorization': 'Bearer %s' % ARK_KEY, 'Content-Type': 'application/json'}, timeout=30)
        return rp.status_code != 401
    except Exception:
        return False

def save_one(loc, view, n, base):
    prompt = ns['build_prompt'](loc, view)
    data = gen(prompt)
    url = data['data'][0]['url']
    img_r = requests.get(url, timeout=120)
    img_r.raise_for_status()
    png = RAW_DIR / (base + '.png')
    png.write_bytes(img_r.content)
    img = Image.open(io.BytesIO(img_r.content))
    if img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    webp = WEBP_DIR / (base + '.webp')
    q = 80
    for q in (80, 75, 70, 65, 60, 55):
        img.resize((1200, 1200), Image.LANCZOS).save(webp, 'WEBP', quality=q, method=6, exif=make_exif(ALT[loc]))
        if webp.stat().st_size < 120 * 1024:
            break
    back = Image.open(webp)
    try:
        exif_ok = back.getexif().get(0x010E) == ALT[loc]
    except Exception:
        exif_ok = False
    print('[IMG] %s raw=%dKB webp=%dKB q=%d exif=%s (+%.0fs)' % (base, len(img_r.content)//1024, webp.stat().st_size//1024, q, exif_ok, time.time()-t0), flush=True)

while time.time() - t0 < CAP_MIN * 60:
    todo = missing()
    if not todo:
        print('ALL 11 DONE in %.0fs, windows used: %d' % (time.time()-t0, windows), flush=True)
        sys.exit(0)
    if probe():
        windows += 1
        print('[WINDOW %d OPEN] %.0fs, %d images to go' % (windows, time.time()-t0, len(todo)), flush=True)
        for loc, view, n, base in todo:
            try:
                save_one(loc, view, n, base)
            except Exception as e:
                msg = str(e)
                print('[IMG] %s FAIL: %s' % (base, msg[:120]), flush=True)
                if '401' in msg or 'window never opened' in msg:
                    break  # 窗关, 回探针
        continue
    time.sleep(20)

left = missing()
print('CAP %d min reached, %d still missing: %s' % (CAP_MIN, len(left), [b for _, _, _, b in left]), flush=True)
sys.exit(2 if left else 0)
