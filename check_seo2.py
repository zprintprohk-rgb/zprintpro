with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', 'rb') as f:
    raw = f.read()
# Check bytes around the issue
# Find 'zh-hk' string in raw bytes
needle = b"'zh-hk': '"
idx = raw.find(needle)
print(f'First zh-hk at: {idx}')
if idx >= 0:
    print(f'Bytes from zh-hk: {raw[idx:idx+100]}')
# Check the actual byte order
print()
print('First 200 bytes:')
print(raw[:200])
print()
# Try GBK decode
try:
    gbk = raw.decode('gbk')
    print('GBK decode OK, first 200:')
    print(gbk[:200])
except Exception as e:
    print(f'GBK decode error: {e}')
