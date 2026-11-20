content = open(r'src/app/[locale]/product/[slug]/page.tsx', encoding='utf-8').read()
lines = content.split('\n')

print('--- relatedBlog 引用 ---')
for i, l in enumerate(lines):
    if 'relatedBlog' in l:
        print(f'  L{i+1}: ' + l[:120])
        # 上下文
        for j in range(max(0, i-3), min(len(lines), i+4)):
            if j != i:
                print(f'    L{j+1}: ' + lines[j][:120])
        print('  ---')

print('')
print('--- /blog/ href 引用 ---')
for i, l in enumerate(lines):
    if '/blog/' in l and 'href' in l:
        print(f'  L{i+1}: ' + l[:140])
