"""Extract 12 SKU x 5 view prompts from v20_9_parsed.json
Output: K3 友好的 markdown (粘贴到 console.volcengine.com 即用)
+ JSON file (后续 V22 script 也能用)
"""
import json
from pathlib import Path

WS = Path(r"C:\Users\Administrator\.openclaw-autoclaw\agents\zprintpro\workspace\.cluster\m3-exec-20260811")
SRC = WS / "v20_9_parsed.json"
ENHANCE = WS / "enhance_rules.json"

OUT_MD = Path(r"F:\zprintpro-nextjs\.hermes\k3-wedding-prompts-C-2026-08-19.md")
OUT_JSON = Path(r"F:\zprintpro-nextjs\.hermes\k3-wedding-prompts-C-2026-08-19.json")

TARGET_SKUS = ['WI-001','WI-002','WI-003','WI-004','WI-005','WI-006',
               'PC-001','PC-002','PC-003','PC-004','PC-005','PC-006']
VIEW_ORDER = ['HERO', 'DETAIL', 'VARIETY-C', 'MULTI-ANGLE', 'SPREAD']

data = json.loads(SRC.read_text(encoding='utf-8'))
sku_entries = data.get('skus', data) if isinstance(data, dict) else data
if isinstance(sku_entries, list):
    by_sku = {e.get('id', e.get('sku')): e for e in sku_entries}
else:
    by_sku = sku_entries

# 输出 dict: {sku: {view: {prompt, suffix}}}
result = {}
for sku in TARGET_SKUS:
    e = by_sku.get(sku, {})
    views = e.get('views', {})
    out_views = {}
    for view in VIEW_ORDER:
        v = views.get(view, {})
        prompt = v.get('prompt') or v.get('full_prompt') or v.get('text', '')
        if not prompt:
            # fallback: 找 view name match
            for k, v2 in views.items():
                if k.upper() == view:
                    prompt = v2.get('prompt') or v2.get('full_prompt') or v2.get('text', '')
                    break
        suffix = v.get('suffix') or v.get('slug', view.lower())
        out_views[view] = {'prompt': prompt, 'suffix': suffix}
    result[sku] = out_views

# JSON out
OUT_JSON.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'JSON: {OUT_JSON} ({OUT_JSON.stat().st_size} bytes)')

# MD out: K3 友好格式
lines = []
lines.append('# 婚礼 12 SKU × 5 View 提示词 (K3 手动跑 C 路径专用)')
lines.append('')
lines.append('**生成地址**: https://console.volcengine.com/ark/region:cn-beijing+/experience/gen_image?model=doubao-seedream-5-0-260128')
lines.append('')
lines.append('**参数**: size=2K, watermark=关 (付费用户), model=doubao-seedream-5-0-260128')
lines.append('')
lines.append('**命名规则**: 下载后改文件名 `<SKU>_<view>_<en|zh-hk|ja>.webp` 放进对应目录')
lines.append('')
lines.append('**目录**: `F:\\zprintpro-nextjs\\zprintpro-en-us-images\\<SKU>\\`')
lines.append('')
lines.append('---')
lines.append('')

for sku in TARGET_SKUS:
    views = result[sku]
    title = sku
    if sku.startswith('WI-'):
        idx = int(sku.split('-')[1])
        title = f'{sku} (喜帖 #{idx})'
    elif sku.startswith('PC-'):
        idx = int(sku.split('-')[1])
        title = f'{sku} (枱卡 #{idx})'

    lines.append(f'## {title}')
    lines.append('')

    for view in VIEW_ORDER:
        v = views.get(view, {})
        prompt = v.get('prompt', '')
        suffix = v.get('suffix', view.lower())
        if not prompt:
            lines.append(f'### {view} (skip - 无提示词)')
            lines.append('')
            continue
        lines.append(f'### {view} → 文件名: `{sku}_{suffix}_en.webp`')
        lines.append('')
        lines.append('```')
        lines.append(prompt)
        lines.append('```')
        lines.append('')
    lines.append('---')
    lines.append('')

OUT_MD.write_text('\n'.join(lines), encoding='utf-8')
print(f'MD: {OUT_MD} ({OUT_MD.stat().st_size} bytes)')

# sanity
total_prompts = sum(1 for sku in result for v in result[sku].values() if v['prompt'])
total_views = sum(len(v) for v in result.values())
print(f'\n总计: {len(result)} SKU × 5 view = {total_views} slots, {total_prompts} prompts non-empty')
print(f'缺失提示词: {total_views - total_prompts} (空白 slots, K3 自己补)')
