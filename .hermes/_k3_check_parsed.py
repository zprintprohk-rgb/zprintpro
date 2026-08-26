import json
with open(r'zprintpro\.cluster\m3-exec-20260811\v20_9_parsed.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
print(f'Type: {type(d).__name__}')
if isinstance(d, list):
    skus = [x.get('sku', x.get('id', '?')) for x in d]
elif isinstance(d, dict):
    skus = [x.get('sku', x.get('id', '?')) for x in d.get('items', d.values()) if isinstance(x, dict)]
else:
    skus = []
print(f'Total SKU: {len(skus)}')
wedding = [s for s in skus if s and ('WI-' in s or 'PC-' in s)]
print(f'Wedding SKUs (WI/PC): {len(wedding)}')
print(f'  Examples: {wedding[:5]}')
# Show first 5 SKU names
print(f'First 5 SKUs: {skus[:5]}')
