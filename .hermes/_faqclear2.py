import re

SRC = '.hermes/_bak-sku-seo-data-before-faq-clear-20260921.ts'
OUT = 'src/data/sku-seo-data.ts'

txt = open(SRC, encoding='utf-8').read()


def find_faq_blocks(s):
    """Return list of (start, end) spans covering '"faqs": [ ... ]' plus trailing comma."""
    spans = []
    i = 0
    while True:
        j = s.find('"faqs": [', i)
        if j == -1:
            break
        k = j + len('"faqs": [')
        depth = 1
        instr = False
        esc = False
        while k < len(s) and depth > 0:
            c = s[k]
            if instr:
                if esc:
                    esc = False
                elif c == chr(92):
                    esc = True
                elif c == '"':
                    instr = False
            else:
                if c == '"':
                    instr = True
                elif c == '[':
                    depth += 1
                elif c == ']':
                    depth -= 1
            k += 1
        if depth != 0:
            raise SystemExit('unbalanced at %d' % j)
        end = k
        if end < len(s) and s[end] == ',':
            end += 1
        spans.append((j, end))
        i = end
    return spans


spans = find_faq_blocks(txt)
print('blocks:', len(spans))

out = []
prev = 0
for (a, b) in spans:
    out.append(txt[prev:a])
    out.append('"faqs": [],')
    prev = b
out.append(txt[prev:])
result = ''.join(out)

data = result[result.index('export const'):]
print('residual q:', data.count('"q":'), ' residual a:', data.count('"a":'))
print('faqs total:', result.count('"faqs":'), ' empty:', result.count('"faqs": []'))
print('CRLF?', chr(13) in result)
open(OUT, 'w', encoding='utf-8', newline='\n').write(result)
print('written', OUT, len(result), 'bytes')
