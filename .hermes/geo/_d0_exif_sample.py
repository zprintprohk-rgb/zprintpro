# D0: EXIF/XMP alt sampling from v28_5 library + final_verification summary — read-only
import json, os, re, sys
ROOT = r'zprintpro-en-us-images/v28_5_webp'
FAMS = ['BC-001','ST-001','ST-006','CL-001','PKG-007','PKG-013','PO-001','FL-001','PB-001','ED-001','BK-001','DJ-001','EV-001','BN-001','PK-002','MN-001','RP-001','WI-001','PC-001']
CLAIM_PATS = [
    ('ISO9001', re.compile(r'ISO\s*9001', re.I)),
    ('FSC', re.compile(r'FSC', re.I)),
    ('MOQ', re.compile(r'(?:MOQ|min\.?\s*order|起訂|起订|起印|\b\d+\s*(?:個|pcs|pieces|枚|張|本)\s*起)', re.I)),
    ('SLA_TURNAROUND', re.compile(r'(?:24\s*h|48\s*h|SLA|翌日|same[- ]day|當日|当日|小時出貨)', re.I)),
    ('EQUIPMENT', re.compile(r'(?:海德堡|Heidelberg|HP\s*Indigo|小森|Komori)', re.I)),
    ('BRAND', re.compile(r'(?:ZprintPro|智印港|ジープリント)', re.I)),
    ('COUNT', re.compile(r'(?:\d{1,3},\d{3}\+?|\d+\s*\+?\s*(?:clients|customers|orders|客戶|客户|订单|訂單))', re.I)),
    ('CERT_NO', re.compile(r'(?:C\d{6}|證書號|证书号)', re.I)),
]
XMP_DESC = re.compile(r'<dc:description>.*?</dc:description>', re.S)
RDF_LI = re.compile(r'<rdf:li[^>]*>(.*?)</rdf:li>', re.S)
XML_TAG = re.compile(r'<[^>]+>')

def xmp_alt(b):
    m = XMP_DESC.search(b)
    if not m: return None
    lis = RDF_LI.findall(m.group(0))
    if lis: return XML_TAG.sub('', lis[0]).strip()
    return XML_TAG.sub('', m.group(0)).strip()

def exif_desc(p):
    try:
        from PIL import Image
        im = Image.open(p)
        ex = im.getexif()
        for tag in (270, 40091, 37510):
            v = ex.get(tag)
            if v: return f'tag{tag}: {v}'
        return None
    except Exception as e:
        return f'ERR {e}'

out = []
for fam in FAMS:
    d = os.path.join(ROOT, fam)
    if not os.path.isdir(d):
        out.append({'family': fam, 'missing': True}); continue
    fs_ = sorted(f for f in os.listdir(d) if f.lower().endswith('.webp'))
    if not fs_:
        out.append({'family': fam, 'empty': True}); continue
    f = fs_[0]
    p = os.path.join(d, f)
    b = open(p, 'rb').read()
    x = xmp_alt(b)
    e = exif_desc(p)
    text = ' | '.join(t for t in [x, e] if t)
    claims = [name for name, pat in CLAIM_PATS if pat.search(text or '')]
    out.append({'family': fam, 'file': f, 'alt': (text or '')[:400], 'claims': claims})
# hero sample
hd = os.path.join(ROOT, 'hero')
if os.path.isdir(hd):
    hf = sorted(f for f in os.listdir(hd) if f.lower().endswith('.webp'))[:1]
    for f in hf:
        p = os.path.join(hd, f); b = open(p, 'rb').read()
        text = ' | '.join(t for t in [xmp_alt(b), exif_desc(p)] if t)
        out.append({'family': 'hero', 'file': f, 'alt': text[:400], 'claims': [n for n, pat in CLAIM_PATS if pat.search(text or '')]})
print(json.dumps(out, ensure_ascii=False, indent=1))
# final_verification
fv = os.path.join(ROOT, '_ledger', 'final_verification.json')
if os.path.exists(fv):
    j = json.load(open(fv, encoding='utf-8'))
    summary = {}
    def walk(o, pref=''):
        if isinstance(o, dict):
            for k, v in o.items():
                if isinstance(v, (int, str, bool, float)) and any(s in str(k).lower() for s in ('violation','violations','total','count','ok','pass','fail','status')):
                    summary[pref + str(k)] = v if not isinstance(v, str) or len(v) < 80 else v[:80]
                elif isinstance(v, (dict, list)) and len(pref) < 40:
                    walk(v, pref + str(k) + '.')
        elif isinstance(o, list) and o and len(pref) < 40:
            walk(o[0], pref + '[0].')
    walk(j)
    print('FINAL_VERIFICATION_KEYS=' + json.dumps(list(j.keys())[:20] if isinstance(j, dict) else [f'list[{len(j)}]'], ensure_ascii=False))
    print('FINAL_VERIFICATION_SUMMARY=' + json.dumps(summary, ensure_ascii=False)[:1500])
else:
    print('FINAL_VERIFICATION=NOT_FOUND')
