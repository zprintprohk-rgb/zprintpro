# -*- coding: utf-8 -*-
"""Crawl live PDP titles for 16 SKUs x 3 locales -> JSON (title verbatim source)"""
import io, json, re, urllib.request, time

slugs = ['save-the-date-cards', 'foil-wedding-invitations', 'wedding-thank-you-cards',
         'wedding-place-cards', 'wedding-seating-charts', 'wedding-suite-bundle',
         'corrugated-boxes', 'electronics-packaging-box', 'kraft-paper-packaging-box',
         'magnetic-closure-gift-box', 'tuck-end-boxes', 'white-card-boxes', 'gang-run-card-boxes',
         'cafe-table-cards', 'drink-tokens', 'fruit-food-label-stickers']
out = {}
for slug in slugs:
    out[slug] = {}
    for loc in ['zh-hk', 'en', 'ja']:
        url = 'https://zprintpro.com/%s/product/%s/' % (loc, slug)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req, timeout=40).read().decode('utf-8', 'replace')
            m = re.search(r'(?s)<title>(.*?)</title>', html)
            title = re.sub(r'\s+', ' ', m.group(1)).strip() if m else ''
            out[slug][loc] = title
            print('%-28s %-5s %s' % (slug, loc, title[:80]))
        except Exception as e:
            out[slug][loc] = ''
            print('%-28s %-5s ERR %s' % (slug, loc, str(e)[:40]))
        time.sleep(1.2)
io.open(r'F:\zprintpro-nextjs\.hermes\b2b-live-titles.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1))
print('saved .hermes/b2b-live-titles.json')
