from pathlib import Path
import re

root = Path(__file__).resolve().parent
secret_key = re.compile(
    r'(?im)^(\s*["\'\w.-]*(?:api[-_]?key|token|secret|password)["\'\w.-]*\s*:\s*).+$'
)
for path in root.glob('*.source.y*ml'):
    text = path.read_text(encoding='utf-8-sig', errors='replace')
    text = secret_key.sub(r'\1<REDACTED>', text)
    target = path.with_name(path.name.replace('.source', '.sanitized'))
    target.write_text(text, encoding='utf-8')
    print(target.name)
