with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', 'rb') as f:
    raw = f.read()
src = raw.decode('utf-8')
# Check 'zh-hk' lines
lines = src.split('\n')
for i in range(394, 401):
    line = lines[i]
    if 'zh-hk' in line or 'envelopes' in line or 'packaging' in line or 'paper-bags' in line or 'calendars' in line:
        print(f'{i+1}: {line[:80]}')
