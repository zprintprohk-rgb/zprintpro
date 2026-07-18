content = open(r'F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx', encoding='utf-8').read()
anchor = "      content: '',\n    },\n\n  }\n};\n"
print('anchor length:', len(anchor))
print('anchor repr:', repr(anchor))
print('content has anchor:', anchor in content)

# Find all 'content: \'\',' substrings
import re
matches = list(re.finditer(r"content: '',\s*\},", content))
print('close-brace matches:', len(matches))
for m in matches[-3:]:
    print(' match at', m.start(), repr(content[m.start():m.start()+50]))

# Check exact chars around last match
last = matches[-1]
around = content[last.start():last.start()+30]
print('exact chars:', repr(around))
print('hex:', ' '.join(f'{ord(c):02x}' for c in around[:20]))
