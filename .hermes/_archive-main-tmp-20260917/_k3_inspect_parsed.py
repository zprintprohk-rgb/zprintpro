import json
with open(r'zprintpro\.cluster\m3-exec-20260811\v20_9_parsed.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
print(f'Top-level keys: {list(d.keys())[:10]}')
# Find SKUs in the structure
for k, v in d.items():
    if isinstance(v, list):
        print(f'{k}: list of {len(v)}')
        if v and isinstance(v[0], dict):
            print(f'  first item keys: {list(v[0].keys())[:8]}')
            print(f'  first sku: {v[0].get("sku", v[0].get("id", "?"))}')
    elif isinstance(v, dict):
        skus = [k for k in v.keys() if k.startswith(('WI-', 'PC-', 'BC-', 'ST-', 'PK-', 'FL-', 'MN-'))]
        print(f'{k}: dict with {len(v)} keys, {len(skus)} SKU-like')
        if skus:
            print(f'  Wedding SKUs: {[s for s in skus if s.startswith(("WI-", "PC-"))]}')
            print(f'  Sample keys: {skus[:3]}')
