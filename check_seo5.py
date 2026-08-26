with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', 'rb') as f:
    raw = f.read()

# Find all occurrences of 包裝盒 (encoded as UTF-8)
needle_utf8 = '包裝盒'.encode('utf-8')
print(f'Looking for: {needle_utf8.hex()}')
pos = 0
while True:
    idx = raw.find(needle_utf8, pos)
    if idx < 0: break
    print(f'Found at byte {idx}')
    # Show context
    start = max(0, idx - 20)
    end = min(len(raw), idx + 200)
    snippet = raw[start:end]
    print(f'  Snippet bytes: {snippet[:80].hex()}')
    # Try decoding snippet
    try:
        print(f'  UTF-8: {snippet.decode("utf-8")[:200]}')
    except Exception as e:
        print(f'  UTF-8 err: {e}')
    try:
        print(f'  GBK:  {snippet.decode("gbk", errors="replace")[:200]}')
    except Exception as e:
        print(f'  GBK err: {e}')
    print()
    pos = idx + 1
