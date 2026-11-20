"""
Find transparent-stickers block closing `},` location
"""
from pathlib import Path
p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# find slug: 'transparent-stickers'
for i, line in enumerate(lines, 1):
    if "slug: 'transparent-stickers'" in line:
        start = i
        print(f"transparent-stickers starts at L{i}")
        break

# track braces after start to find closing `},` (where indentation is 4 and `},` at column 5)
brace_count = 0
in_longdesc = False
in_template = False
for i in range(start - 1, min(start + 4000, len(lines))):
    line = lines[i]
    # Track template literal
    if "longDescription: " in line and "`" in line:
        in_template = True
        # count backticks in this line
        backticks = line.count("`")
        if backticks >= 2:
            in_template = False
        continue
    if in_template:
        backticks = line.count("`")
        if backticks >= 1:
            in_template = False
        continue
    # Skip non-template lines
    if in_template:
        continue
    # Count braces
    opens = line.count("{")
    closes = line.count("}")
    brace_count += opens - closes
    if brace_count == 0 and i > start:
        # find next non-blank line
        if line.strip() in ("},", "}"):
            print(f"closing }} at L{i+1}: {line}")
            # show 5 lines around
            for j in range(max(0, i-2), min(len(lines), i+10)):
                print(f"  L{j+1}: {lines[j][:120]}")
            break
