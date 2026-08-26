with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', 'rb') as f:
    raw = f.read()
# Find byte 20183 (包裝盒)
# Show bytes 20180-20250
print('Bytes 20180-20250:')
for i in range(20180, 20250):
    print(f'{raw[i]:02x}', end=' ')
    if (i-20180) % 16 == 15:
        print()
print()
# Now decode just the line 397
# Use file content
src = raw.decode('utf-8', errors='replace')
lines = src.split('\n')
print(f'Line 397 (UTF-8 with replace): {lines[396]}')
