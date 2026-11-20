# -*- coding: utf-8 -*-
import io
P = '.hermes/_pkg_compare_add.py'
t = io.open(P, encoding='utf-8').read()
old = '''    depth = 0
    end = None
    for idx in range(pp + len("paragraphs: "), len(block)):
        ch = block[idx]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                end = idx
                break
    assert end, tag + " array end"
    inner = block[pp:end]
    # 断言：段尾是 ',\\n      ' 形式
    assert inner.rstrip().endswith("],") or inner.rstrip().endswith("]"), inner[-40:]
    return block[:end] + "\\n        " + payload + block[end:]'''
new = '''    m = re.search(r"\\n      \\],", block[pp:])
    assert m, tag + " paragraphs close not found"
    end = pp + m.start()          # 指向 "\\n      ]," 的换行位置
    inner = block[pp:end]
    assert inner.rstrip().endswith("'") or inner.rstrip().endswith(","), inner[-50:]
    return block[:end] + "\\n        " + payload + block[end:]'''
assert old in t, 'pattern not found'
t = t.replace(old, new)
io.open(P, 'w', encoding='utf-8').write(t)
print('patched')
