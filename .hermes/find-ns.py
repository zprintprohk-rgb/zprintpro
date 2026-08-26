import json, re
d = json.load(open('.hermes/wb-snap-a09.json', encoding='utf-8'))
t = json.dumps(d, ensure_ascii=False)
ns = set(re.findall(r'[a-z]+\.ns\.cloudflare\.com', t))
print('NS found:', ns)
for m in list(re.finditer(r'"name": "([^"]*(?:ameserver|assigned|Update)[^"]*)"', t))[:10]:
    print(m.group(1))
