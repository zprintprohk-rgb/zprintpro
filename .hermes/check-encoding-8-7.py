import os
os.chdir(r'F:\zprintpro-nextjs')
for f in ['src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json', 'src/data/products.ts', 'src/data/blog-posts.ts']:
    with open(f, 'rb') as fp:
        data = fp.read()
    bom = data[:3] == b'\xef\xbb\xbf'
    # check CRLF
    crlf_count = data.count(b'\r\n')
    lf_count = data.count(b'\n') - crlf_count
    print(f'{f}: size={len(data)} bytes, BOM={bom}, LF={lf_count}, CRLF={crlf_count}')
