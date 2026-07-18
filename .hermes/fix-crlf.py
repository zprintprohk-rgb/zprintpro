import os
files = [
    r'F:\zprintpro-nextjs\public\sitemap-en.xml',
    r'F:\zprintpro-nextjs\public\sitemap-ja.xml',
    r'F:\zprintpro-nextjs\public\sitemap-zh-hk.xml',
    r'F:\zprintpro-nextjs\public\sitemap.xml',
    r'F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx',
    r'F:\zprintpro-nextjs\src\data\blog-data\en.json',
    r'F:\zprintpro-nextjs\src\data\blog-data\ja.json',
    r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json',
    r'F:\zprintpro-nextjs\src\data\blog-posts.ts',
    r'F:\zprintpro-nextjs\src\data\products.ts',
]
for fp in files:
    data = open(fp, 'rb').read()
    if b'\r\n' in data:
        new = data.replace(b'\r\n', b'\n')
        open(fp, 'wb').write(new)
        print(f'  + fixed CRLF: {fp}')
    else:
        print(f'  - already LF: {fp}')
