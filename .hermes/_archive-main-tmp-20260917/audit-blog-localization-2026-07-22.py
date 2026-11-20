import json
import re
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
en = json.load(open(ROOT / 'src/data/blog-data/en.json', encoding='utf-8'))
ja = json.load(open(ROOT / 'src/data/blog-data/ja.json', encoding='utf-8'))

en_hints = [r'\bUSA\b', r'\bUS\b', r'\bAmerica\b', r'\bUS small business\b', r'\bDTC',
            r'\bDHL Express\b', r'\bFedEx\b', r'\bFree US Shipping\b', r'\bMade for USA\b']
ja_hints = [r'日本', r'短納期', r'高品質', r'オフセット', r'小ロット', r'データ入稿',
            r'校正無料', r'全国送料込み', r'翌日出荷', r'日本市場']

en_have = 0
en_missing_list = []
for slug, item in en.items():
    text = (item.get('title', '') + ' ' + item.get('description', '') + ' ' + (item.get('content', '') or '')[:2000])
    if any(re.search(p, text, re.IGNORECASE) for p in en_hints):
        en_have += 1
    else:
        en_missing_list.append(slug)

ja_have = 0
ja_missing_list = []
for slug, item in ja.items():
    text = (item.get('title', '') + ' ' + item.get('description', '') + ' ' + (item.get('content', '') or '')[:2000])
    if any(re.search(p, text) for p in ja_hints):
        ja_have += 1
    else:
        ja_missing_list.append(slug)

print(f'en blog total: {len(en)}, have-hint: {en_have}, missing-hint: {len(en_missing_list)}')
print(f'ja blog total: {len(ja)}, have-hint: {ja_have}, missing-hint: {len(ja_missing_list)}')
print()
print('=== en 缺 US 市场元素:')
for s in en_missing_list:
    print(f'  - {s}')
print()
print('=== ja 缺 JP 市场元素:')
for s in ja_missing_list:
    print(f'  - {s}')
