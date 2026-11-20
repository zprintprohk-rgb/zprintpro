"""Final v2: extract 12 SKU prompts for K3 to manually paste in console.volcengine.com"""
import json
from pathlib import Path

WS = Path(r"C:\Users\Administrator\.openclaw-autoclaw\agents\zprintpro\workspace\.cluster\m3-exec-20260811")
SRC = WS / "v20_9_parsed.json"
OUT_MD = Path(r"F:\zprintpro-nextjs\.hermes\k3-wedding-prompts-C-2026-08-19.md")
OUT_JSON = Path(r"F:\zprintpro-nextjs\.hermes\k3-wedding-prompts-C-2026-08-19.json")

# view -> file suffix (matches existing v20 batch output naming)
VIEW_SUFFIX = {
    'HERO': 'hero',
    'DETAIL': 'detail',
    'VARIETY-C': 'variety',
    'MULTI-ANGLE': 'multi-angle',
    'SPREAD': 'spread',
}

VIEW_ORDER = ['HERO', 'DETAIL', 'VARIETY-C', 'MULTI-ANGLE', 'SPREAD']

d = json.loads(SRC.read_text(encoding='utf-8'))
by_sku = {e['sku_code']: e for e in d['skus']}

# Inspect actual existing webp filenames so we mirror the convention
IMG_ROOT = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images")

# Verify naming convention
print('--- Existing file naming check ---')
for sku in ['WI-001', 'WI-006']:
    d_dir = IMG_ROOT / sku
    if d_dir.exists():
        for f in sorted(d_dir.glob('*.webp')):
            print(f'  {sku}: {f.name}')

# Build extraction
TARGET_SKUS = ['WI-001','WI-002','WI-003','WI-004','WI-005','WI-006',
               'PC-001','PC-002','PC-003','PC-004','PC-005','PC-006']

# Track done (existing) vs needed
status = {}
needed_prompts = {}
for sku in TARGET_SKUS:
    e = by_sku.get(sku)
    if not e:
        status[sku] = 'missing-in-json'
        continue
    base = e.get('seo_filename','').rsplit('.',1)[0]  # e.g. zprintpro-foil-wedding-invitations-en
    views = e.get('views', {})
    if not views:
        status[sku] = 'no-views'
        continue
    # existing files
    d_dir = IMG_ROOT / sku
    existing = set(f.stem for f in d_dir.glob('*.webp')) if d_dir.exists() else set()
    # needed (skip if exists)
    needed = {}
    for view in VIEW_ORDER:
        if view not in views:
            continue
        suffix = VIEW_SUFFIX[view]
        expected_stem = f'{base}-{suffix}'
        if expected_stem in existing:
            continue  # already done
        needed[view] = {'prompt': views[view], 'suffix': suffix, 'expected_filename': f'{expected_stem}.webp'}
    needed_prompts[sku] = {'base': base, 'views': needed}
    if not needed:
        status[sku] = 'all-done'
    else:
        status[sku] = f'need-{len(needed)}'

# Summary
print('\n--- Status summary ---')
for sku, s in status.items():
    print(f'  {sku}: {s}')

total_needed = sum(len(p['views']) for p in needed_prompts.values())
print(f'\nTotal prompts needed: {total_needed}')

# Build markdown
lines = []
lines.append('# 婚礼 12 SKU 缺失提示词 (K3 拍板 C 路径 - 网页粘贴下载)')
lines.append('')
lines.append('**生成地址**: https://console.volcengine.com/ark/region:cn-beijing+/experience/gen_image?model=doubao-seedream-5-0-260128')
lines.append('')
lines.append('**参数**: model=doubao-seedream-5-0-260128, size=2K, watermark=关 (付费用户已开)')
lines.append('')
lines.append('**操作流程**:')
lines.append('1. 打开 console URL → 输入提示词 → 点"生成" → 等 10-30 sec')
lines.append('2. 检查图片质量 (无水印/无小字/无人脸 → OK; 模糊/坏图 → 重新生成)')
lines.append('3. 点"下载" → 改文件名 (按"目标文件名"列) → 放进 `F:\\zprintpro-nextjs\\zprintpro-en-us-images\\<SKU>\\`')
lines.append('')
lines.append('**已经完成的 (无需再生)**: WI-001~005 (4 webp each), WI-006 (HERO + DETAIL)')
lines.append('')
lines.append('---')
lines.append('')

for sku in TARGET_SKUS:
    p = needed_prompts.get(sku)
    if not p or not p['views']:
        continue
    lines.append(f'## {sku}')
    lines.append('')
    base = p['base']
    for view in VIEW_ORDER:
        v = p['views'].get(view)
        if not v:
            continue
        lines.append(f'### {view}')
        lines.append(f'**目标文件名**: `{v["expected_filename"]}`')
        lines.append('')
        lines.append('**提示词** (复制下面整段):')
        lines.append('')
        lines.append('```')
        lines.append(v['prompt'])
        lines.append('```')
        lines.append('')
    lines.append('---')
    lines.append('')

OUT_MD.write_text('\n'.join(lines), encoding='utf-8')
print(f'\nMD: {OUT_MD} ({OUT_MD.stat().st_size} bytes)')
print(f'JSON: {OUT_JSON}')

# Also JSON
out_json = {}
for sku, p in needed_prompts.items():
    if not p['views']: continue
    out_json[sku] = {
        'base_filename': p['base'],
        'views': {view: {'prompt': v['prompt'], 'expected_filename': v['expected_filename']}
                  for view, v in p['views'].items()}
    }
OUT_JSON.write_text(json.dumps(out_json, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'JSON: {OUT_JSON} ({OUT_JSON.stat().st_size} bytes)')
