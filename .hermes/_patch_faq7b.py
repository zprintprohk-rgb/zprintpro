# -*- coding: utf-8 -*-
import io, os
P = '.hermes/_faq7_add.py'
t = io.open(P, encoding='utf-8').read()
old = '''for slug, rows in DATA.items():
    for r in rows:
        assert "份" not in r[2] + r[5], f"{slug} ja 含 份"
        joined = r[3] + r[4] + r[5]
    assert ("HK$" in joined) or ("HK$" in r[3]), f"{slug} 无价格锚"'''
# 实际文件里的原始片段
old2 = '''for slug, rows in DATA.items():
    for r in rows:
        assert "份" not in r[2] + r[5], f"{slug} ja 含 份"
    joined = r[3] + r[4] + r[5]
    assert ("HK$" in joined) or ("HK$" in r[3]), f"{slug} 无价格锚"'''
new = '''for slug, rows in DATA.items():
    for r in rows:
        assert "份" not in r[2] + r[5], f"{slug} ja 含 份"
    assert "HK$" in rows[0][3], f"{slug} 首问无价格锚"'''
if old2 in t:
    t = t.replace(old2, new)
elif old in t:
    t = t.replace(old, new)
else:
    raise SystemExit('pattern not found')
io.open(P, 'w', encoding='utf-8').write(t)
print('patched')
