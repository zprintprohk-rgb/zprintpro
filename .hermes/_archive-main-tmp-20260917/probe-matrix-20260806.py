import json, os
os.chdir(r'F:\zprintpro-nextjs')
with open('.hermes/industry-keyword-matrix.json', encoding='utf-8') as f:
    m = json.load(f)
q = m.get('queue', [])
print("queue items:", len(q))
for item in q[:20]:
    print("-", item.get('slug') or item.get('keyword') or str(item)[:60], "| next_due:", item.get('next_due'), "| tier:", item.get('tier') or item.get('industry_tier'), "| status:", item.get('status'))
cov = m.get('covered', [])
print("covered count:", len(cov))
print("top-level keys:", list(m.keys()))
