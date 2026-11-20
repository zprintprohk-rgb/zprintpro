# -*- coding: utf-8 -*-
import os, json, time
ROOT = 'public/images'
DIRS = ['products','products-localized','factory','samples','categories','japan','articles','v26','blog','blog-m3']
EXT = {'.jpg','.jpeg','.png','.webp'}
cutoff = time.time() - 10*60
done = {}
for d in DIRS:
    for dp, _, fs in os.walk(os.path.join(ROOT, d)):
        for f in fs:
            if os.path.splitext(f)[1].lower() not in EXT:
                continue
            p = os.path.join(dp, f)
            st = os.stat(p)
            if st.st_mtime > cutoff:
                rel = os.path.relpath(p).replace(os.sep, '/')
                done[rel] = f'{st.st_mtime_ns}:{st.st_size}'
os.makedirs('.hermes/logs', exist_ok=True)
json.dump(done, open('.hermes/logs/watermark-done.json', 'w'))
print('seeded', len(done))
