import json, re
zh = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))

ANCH = re.compile(r"href=[\"'](/[^\"']+)[\"'][^>]*>([^<]+)</a>")
Q = re.compile(r'[?？]|how|why|when|which|多少|邊種|哪种|什麼|點揀|點樣|是咩|係咩')

def audit(slug):
    e = zh.get(slug)
    if not e:
        print(slug, 'MISSING'); return
    c = e.get('content', '')
    txt = re.sub(r'<[^>]+>', '', c)
    h2 = re.findall(r'<h2[^>]*>([\s\S]*?)</h2>', c)
    h2q = [h for h in h2 if Q.search(re.sub(r'<[^>]+>', '', h))]
    div_alert = len(re.findall(r'<div class="bg-(?:amber|blue|red|green|gray)-50', c))
    schemas = e.get('schemas', []) or []
    has_person = 'Person' in json.dumps(schemas) or re.search(r'"@type"\s*:\s*"Person"', c) is not None
    nums = len(re.findall(r'\d{2,}', txt))
    wa = len(re.findall(r'wa\.me/8619880851334', c))
    anchors = ANCH.findall(c)
    anchors5 = [a for a in anchors if len(a[1].strip()) >= 5]
    tables = len(re.findall(r'<table', c))
    print(f'--- {slug} ---')
    print(f'  chars={len(c)} txt={len(txt)} date={e.get("date")}')
    print(f'  schemas_field={schemas}')
    print(f'  h2_total={len(h2)} h2_question={len(h2q)}')
    print(f'  div_alert_blocks={div_alert} (R3 need >=3)')
    print(f'  Person={has_person} linkedin={"linkedin.com" in c} FDA={"FDA" in c} REACH={"EU REACH" in c} (R5 need all)')
    print(f'  numbers={nums} (R6 need >=10) wa_cta={wa} (R8 need <=3)')
    print(f'  anchors={len(anchors)} ge5chars={len(anchors5)} (R9 need >=7)')
    print(f'  tables={tables} (R12 need >=2)')

for s in ['packaging-box-pricing-2026', 'sticker-material-pvc-vinyl-removable',
          'poster-size-guide', 'campus-education-printing-pillar-guide',
          'foil-stamping-3-applications-2026']:
    audit(s)
