# -*- coding: utf-8 -*-
# A2 fix: ja.json JA-family absolute price claims + ISO 9001 unratified claims
# Method: byte-level pinpoint replacement, count assertions, JSON validation
import json, shutil, io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SRC = r'F:\zprintpro-nextjs\src\data\blog-data\ja.json'
BAK = r'F:\zprintpro-nextjs\.hermes\_bak-blogdata-ja-before-a2-20261023.json'

raw_bytes = open(SRC, 'rb').read()
raw = raw_bytes.decode('utf-8')

before = {
    '業界最安水準': raw.count('業界最安水準'),
    'ISO 9001': raw.count('ISO 9001'),
    '最安値': raw.count('最安値'),
    '激安': raw.count('激安'),
    '多個': raw.count('多個'),
}
print('BEFORE:', before)

# backup (byte-identical)
shutil.copyfile(SRC, BAK)
print('backup ->', BAK, os.path.getsize(BAK), 'bytes')

REPLACEMENTS = [
    # JA-family absolute self price claims (order-19/20 caliber) + MT artifacts in same sentences
    ('多個基本価格は業界最安水準', '大口基本価格は低価格帯でご提供', 1),
    ('個〜業界最安水準', '個〜低価格帯でご提供', 1),
    ('、多個 14 日納品', '、大口 14 日納品', 2),
    ('多個超量産', '大口超量産', 2),
    # ISO 9001 unratified claims (standing CRED adjudication 10-17, lane false-negative corrected)
    ('【ISO 9001品質体制】工場はISO 9001品質管理体制で認証済み。',
     '【品質管理体制】印刷責任者レベルの色校正を実施。', 9),
    ('EU REACH + ISO 9001 + FSC 認証', 'EU REACH + FSC 認証', 1),
    ('+ FSC + ISO 9001 認証完備', '+ FSC 認証完備', 1),
]

for old, new, expected in REPLACEMENTS:
    actual = raw.count(old)
    assert actual == expected, f'PATTERN MISMATCH: [{old}] expected {expected}, found {actual}'
    raw = raw.replace(old, new)
    print(f'OK [{old[:30]}...] x{expected}')

# post assertions
after = {
    '業界最安水準': raw.count('業界最安水準'),
    'ISO 9001': raw.count('ISO 9001'),
    '最安値': raw.count('最安値'),
    '激安': raw.count('激安'),
    '多個': raw.count('多個'),
}
print('AFTER :', after)
assert after['業界最安水準'] == 0, '業界最安水準 not zero'
assert after['ISO 9001'] == 0, 'ISO 9001 not zero'
assert after['最安値'] == before['最安値'] == 2, '最安値 KEEP disturbed'
assert after['激安'] == 0, '激安 changed unexpectedly'
assert after['多個'] == before['多個'] - 5, '多個 delta wrong'

# write bytes
open(SRC, 'wb').write(raw.encode('utf-8'))

# JSON validation
json.load(open(SRC, encoding='utf-8'))
print('JSON parse: PASS')

# byte-level sanity: only expected regions changed
new_bytes = open(SRC, 'rb').read()
print('size before/after:', len(raw_bytes), '->', len(new_bytes), '(delta', len(new_bytes)-len(raw_bytes), 'bytes)')
print('ALL ASSERTIONS PASS')
