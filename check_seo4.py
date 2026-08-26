with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', 'rb') as f:
    raw = f.read()
# Find 'zh-hk': ' at offset 16279 - 8 = 16271
# Actually find by string "包裝盒"
needle = "包裝盒"
idx = raw.find(needle.encode('utf-8'))
print(f'Found 包裝盒 at byte {idx}')
if idx >= 0:
    # Print 100 bytes from idx - 30
    start = idx - 30
    snippet = raw[start:idx+100]
    print(f'Bytes [{start}:{idx+100}]:')
    for b in snippet:
        if 0x20 <= b <= 0x7e:
            print(f' 0x{b:02x} ({chr(b)})', end='')
        else:
            print(f' 0x{b:02x}', end='')
    print()

# Now decode the snippet in different ways
print()
print('As UTF-8:')
try:
    print(snippet.decode('utf-8'))
except Exception as e:
    print(f'Error: {e}')

print()
print('As GBK:')
try:
    print(snippet.decode('gbk'))
except Exception as e:
    print(f'Error: {e}')

# Try to figure out the actual encoding - look at byte pattern
# 'zh-hk': ' is ASCII
# '包' = U+5305 = GBK 0xB0, 0xA1
# But we have 0xE5 0x8D 0x97 = '荷' in UTF-8
# If GBK 0xB0A1 = '包' is misinterpreted as UTF-8, becomes '°¡'
print()
print(f'Byte 16265-16280:')
for i in range(16260, 16280):
    print(f'{raw[i]:02x}', end=' ')
print()
