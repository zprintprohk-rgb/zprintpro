# -*- coding: utf-8 -*-
"""Fix specs field names: finish → finishing, printType → printMethod."""
import os

PRODUCTS_FILE = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# Replace in specs: object - need to be careful to only affect specs: { ... } blocks
# Strategy: replace `finish:` with `finishing:` and `printType:` with `printMethod:`
# But these are short keys that could appear elsewhere
# Use a more specific match: `, finish:` and `, printType:` (with leading comma)
new_src = src.replace(', finish:', ', finishing:').replace(', printType:', ', printMethod:')

# Also handle first occurrence (no leading comma)
new_src = new_src.replace('finish: ', 'finishing: ', 1)  # Hmm this is risky
# Better: search for `finish: '` and `printType: '` (always followed by a quote for the string value)
# Use regex to be safe
import re
new_src = re.sub(r"finish: '", "finishing: '", new_src)
new_src = re.sub(r'finish: "', 'finishing: "', new_src)
new_src = re.sub(r"printType: '", "printMethod: '", new_src)
new_src = re.sub(r'printType: "', 'printMethod: "', new_src)

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

# Count
finish_count = new_src.count('finish:') - new_src.count('finishing:')
finishing_count = new_src.count('finishing:')
print(f"Remaining 'finish:' (should be 0): {finish_count}")
print(f"'finishing:' count: {finishing_count}")
printType_count = new_src.count('printType:') - new_src.count('printMethod:')
printMethod_count = new_src.count('printMethod:')
print(f"Remaining 'printType:' (should be 0): {printType_count}")
print(f"'printMethod:' count: {printMethod_count}")
