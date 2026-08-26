"""Inspect v20_9_parsed.json structure for WI-001"""
import json
from pathlib import Path
p = Path(r'C:\Users\Administrator\.openclaw-autoclaw\agents\zprintpro\workspace\.cluster\m3-exec-20260811\v20_9_parsed.json')
d = json.loads(p.read_text(encoding='utf-8'))

# find WI-001
for e in d['skus']:
    if e.get('sku_code') == 'WI-001':
        print('WI-001 keys:', list(e.keys()))
        print('slug:', e.get('slug'))
        print('seo_filename:', e.get('seo_filename'))
        print('view_count:', e.get('view_count'))
        views = e.get('views', {})
        print(f'views keys ({len(views)}):', list(views.keys()))
        for vk, vv in views.items():
            print(f'\n  view[{vk!r}] type={type(vv).__name__}')
            if isinstance(vv, dict):
                print(f'    keys: {list(vv.keys())}')
                # try to find the prompt
                for kk in ['prompt', 'full_prompt', 'text', 'description']:
                    if kk in vv:
                        v = str(vv[kk])[:200]
                        print(f'    {kk}: {v}')
            elif isinstance(vv, str):
                print(f'    (str): {vv[:200]}')
        break
