import json
slugs = ['baby-food-packaging-box-printing-guide','real-estate-flyer-printing-guide','medical-device-packaging-box-guide','auto-parts-shopping-bag-printing-guide','sports-merchandise-gift-box-printing-guide']
for loc in ['zh-hk','en','ja']:
    with open(f'src/data/blog-data/{loc}.json','r',encoding='utf-8') as f:
        data = json.load(f)
    print(f"\n[{loc}] Total slugs: {len(data)}")
    for s in slugs:
        e = data.get(s, {})
        content = e.get('content','')
        print(f"  {s}: present={s in data}, content_len={len(content)}, has_img={'<img' in content}, has_cover={'cover' in str(e)}")
