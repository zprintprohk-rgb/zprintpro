import re, glob
pattern = re.compile(r'[\u4e00-\u9fff].*[a-zA-Z]{3,}|[a-zA-Z]{3,}.*[\u4e00-\u9fff]|[\u3040-\u309f\u30a0-\u30ff].*[a-zA-Z]{3,}|[a-zA-Z]{3,}.*[\u3040-\u309f\u30a0-\u30ff]')
files = glob.glob('src/**/*.tsx', recursive=True)
results = []
for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            for i, line in enumerate(file, 1):
                if pattern.search(line) and not line.strip().startswith('//') and not line.strip().startswith('*'):
                    if 'import ' in line or 'from ' in line or 'href=' in line or 'url:' in line or 'slug:' in line:
                        continue
                    results.append((f, i, line.strip()))
                    if len(results) >= 100:
                        break
    except:
        pass
    if len(results) >= 100:
        break
for r in results[:60]:
    print(f'{r[0]}:{r[1]}: {r[2]}')
