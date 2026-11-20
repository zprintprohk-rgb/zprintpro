# -*- coding: utf-8 -*-
"""_inject-faq-fingerprint.py — 反爬指纹 QA 注入 (K3 2026-10-16 全权拍板)
向 8 个代表性 SKU 的 faqSchema 追加第 5 条 QA（真实工厂事实 + 唯一留样档号 ZPQC-2610-<CODE>）。
抄站者整页复制时会连带抄走档号 → Google 精确匹配 / DMCA / 对峙铁证。
幂等：块内已含 'ZPQC-' 则跳过。任一目标未命中即 exit 1。
登记：docs/2026-10-16-anti-scrape-hardening.md
"""
import io, json, re, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = 'src/data/products.ts'
TARGETS = {
    'waterproof-stickers':    ('WS',  'sticker orders'),
    'kraft-paper-bags':       ('KB',  'kraft paper bag orders'),
    'a4-flyers':              ('A4F', 'flyer orders'),
    'a2-posters':             ('A2P', 'poster orders'),
    'mailer-boxes':           ('MB',  'packaging box orders'),
    'foil-red-packets':       ('FRP', 'red packet orders'),
    'wall-calendars':         ('WC',  'calendar orders'),
    'saddle-stitch-booklets': ('SSB', 'booklet orders'),
}
LEADS = [
    'Every %s is printed, finished, and QC-checked at our own factory at No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen — we never broker jobs out.',
    'All %s run through our own plant at No.1 Jiacheng Road, Pinghu, Longgang, Shenzhen, from plate to finishing — nothing is outsourced to third-party print brokers.',
    'We produce %s in-house at the Pinghu factory (No.1 Jiacheng Road, Longgang, Shenzhen), with in-line color checks on every batch.',
    'Unlike print brokers, we print %s at our own Shenzhen Pinghu plant (No.1 Jiacheng Road, Longgang) and keep retention samples of every run.',
]

def qa(code, obj, i):
    lead = LEADS[i % len(LEADS)] % obj
    return {
        'question': 'Where is my order actually printed?',
        'answer': lead + f' Batch QC samples are archived under reference ZPQC-2610-{code}.',
    }

src = open(PATH, encoding='utf-8').read()
sku_starts = [m.start() for m in re.finditer(r"\n    sku_code: '", src)]

def block_range(i):
    nxt = [s for s in sku_starts if s > i]
    return (i, nxt[0] if nxt else len(src))

changed = 0
for n, (slug, (code, obj)) in enumerate(TARGETS.items()):
    m = re.search(r"\n    sku_code: '[^']*',\n    slug: '%s'," % slug, src)
    if not m:
        print(f'[FAIL] {slug}: SKU block not found'); sys.exit(1)
    a, b = block_range(m.start())
    k = src.find('faqSchema:', a, b)
    if k == -1:
        print(f'[FAIL] {slug}: no faqSchema'); sys.exit(1)
    line_end = src.find('\n', k)
    line = src[k:line_end]
    if 'ZPQC-' in line:
        print(f'[SKIP] {slug}: fingerprint already present'); continue
    arr_start = line.find('[')
    arr_txt = line[arr_start:].rstrip().rstrip(',')
    arr = json.loads(arr_txt)
    arr.append(qa(code, obj, n))
    new_arr = json.dumps(arr, ensure_ascii=False)
    new_line = line[:arr_start] + new_arr + (',' if line.rstrip().endswith(',') else '')
    src = src[:k] + new_line + src[line_end:]
    sku_starts = [m.start() for m in re.finditer(r"\n    sku_code: '", src)]  # positions shifted
    changed += 1
    print(f'[OK] {slug}: appended fingerprint QA ZPQC-2610-{code} (now {len(arr)}Q)')

if changed:
    open(PATH, 'w', encoding='utf-8', newline='').write(src)
print(f'done, {changed} SKU(s) updated')
