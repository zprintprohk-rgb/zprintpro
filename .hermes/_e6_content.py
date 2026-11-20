import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
data = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\en.json', encoding='utf-8'))
# 结构探查
def walk(o, path=''):
    if isinstance(o, dict):
        for k,v in o.items():
            if k == 'slug' and v == 'eco-paper-bag-gsm':
                print('FOUND at', path)
                print('  keys:', list(o.keys())[:15])
                for kk in ['title','excerpt','date','updatedAt','metaTitle']:
                    if kk in o: print(f'  {kk}:', str(o[kk])[:90])
                if 'content' in o:
                    c = o['content']
                    print('  content len:', len(c))
                    print('  content 前 300:', re.sub(r'<[^>]+>',' ',c)[:300])
                return True
            else:
                if walk(v, path+'/'+k): return True
    elif isinstance(o, list):
        for i, v in enumerate(o):
            if walk(v, path+f'[{i}]'): return True
    return False
walk(data)
