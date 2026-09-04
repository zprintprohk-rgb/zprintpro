import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from pathlib import Path

PATTERNS = [
    (r'## 3\..*?完整新 content 字段.*?```(?:\w+)?\n(.*?)```', 'zh-hk'),
    (r'## 3\..*?Complete New content Field.*?```(?:\w+)?\n(.*?)```', 'en'),
    (r'## 3\..*?完全新 content フィールド.*?```(?:\w+)?\n(.*?)```', 'ja'),
]
ZH_HK_FORBIDDEN = [
    '深圳市彩龍印刷包裝有限公司', '深圳市彩龙印刷包装有限公司',
    '深圳市龍崗區平湖街道嘉城路 1 號', 'Shenzhen Cai Long Printing Packaging',
    '1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen', '518111',
]
print(f'{"File":<40} {"Content":>8} {"Forbidden":>10} {"Locale":>8}')
print('-' * 75)
for p in sorted(Path('.hermes/patches').glob('pillar-*-12rules.md')):
    text = p.read_text(encoding='utf-8')
    locale = 'unknown'
    matched = False
    for pat, loc in PATTERNS:
        m = re.search(pat, text, re.DOTALL)
        if m:
            matched = True
            content = m.group(1)
            locale = loc
            forbidden_in_content = [f for f in ZH_HK_FORBIDDEN if f in content]
            print(f'{p.name:<40} {len(content):>8} {len(forbidden_in_content):>10} {locale:>8}')
            for f in forbidden_in_content:
                print(f'  HIT in content: {f}')
            break
    if not matched:
        print(f'{p.name:<40} NO MATCH')
