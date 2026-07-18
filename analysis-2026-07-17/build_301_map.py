# -*- coding: utf-8 -*-
"""老站全站 301 映射表 (最终版)
输入: old-site-all-urls.txt (全量 140 URL) + 网页.csv (GSC 流量数据)
输出: 301-map-full.csv (人工审核版) + cloudflare-bulk-redirect.csv (CF 直接导入版)
"""
import pandas as pd, sys, io, os, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

# ---- GSC 流量数据 (用于优先级) ----
g = pd.read_csv(os.path.join(BASE, '网页.csv'))
g.columns = ['url','clicks','imps','ctr','pos']
gsc = {r['url'].strip().rstrip('/'): (int(r['clicks']), int(r['imps'])) for _, r in g.iterrows()}

# ---- 全量 URL ----
urls = []
for line in open(os.path.join(BASE, 'old-site-all-urls.txt'), encoding='utf-8'):
    u = line.strip()
    if u.startswith('http'):
        urls.append(u)
# 去重保序
seen = set()
urls = [u for u in urls if not (u in seen or seen.add(u))]
print(f"全量 URL (去重后): {len(urls)}")

NEW = 'https://zprintpro.com'
CAT_MAP = {
    'poster-printing': '/zh-hk/category/posters/',
    'School-Educational-Printing': '/zh-hk/category/educational/',
    'digital-printing': '/zh-hk/category/educational/',
    'packaging-box-printing': '/zh-hk/category/packaging/',
    'label-sticker-printing': '/zh-hk/category/stickers/',
    'red-packet-wedding-invitation-printing': '/zh-hk/category/red-packets/',
    'enterprise-brochure-printing': '/zh-hk/category/books/',
    'paper-bag-printing': '/zh-hk/category/paper-bags/',
    'large-format-printing': '/zh-hk/category/banners/',
    'flyer-printing': '/zh-hk/category/flyers/',
    'calendar-printing': '/zh-hk/category/calendars/',
    'envelope-printing': '/zh-hk/category/envelopes/',
    'folder-printing': '/zh-hk/category/books/',
    'business-card-printing': None,  # ⚠️ 禁区决策点
}
NEWS_TOPIC = {
    'brochure-knowledge': '/zh-hk/category/books/',
    'sticker-knowledge': '/zh-hk/category/stickers/',
    'packaging-box-knowledge': '/zh-hk/category/packaging/',
    'printing-techniques': '/zh-hk/blog/',
    'design-printing': '/zh-hk/blog/',
    'faq-printing': '/zh-hk/faq/',
}
# 高流量/高价值产品页手工映射 (GSC Top + 校园/宣传单张保留车道)
HAND = {
    '24hour-poster-printing-a1-a2-mongkok-causewaybay-hk.html': ('/zh-hk/services/rush-printing-delivery/', 'high', '急件页→急送服务页'),
    'document-printing-2hour-pickup-mongkok-causewaybay-hk.html': ('/zh-hk/services/rush-printing-delivery/', 'high', '急件页→急送服务页'),
    'same-day-poster-printing-a1-a2-a3-photo-vinyl-hk.html': ('/zh-hk/services/rush-printing-delivery/', 'high', '即日海报→急送服务页'),
    'same-day-printing-a4-a3-book-poster-door-delivery-hk.html': ('/zh-hk/services/rush-printing-delivery/', 'med', '即日→急送服务页'),
    'student-printing-thesis-homework-24hour-binding-hk.html': ('/zh-hk/category/educational/', 'high', '论文→教育类目(校园车道)'),
    'student-poster-printing-homework-presentation-2hour-hk.html': ('/zh-hk/category/educational/', 'med', '学生海报→教育类目'),
    'certificate-printing-diploma-award-foil-security-paper-hk.html': ('/zh-hk/product/certificates/', 'high', '证书→证书SKU'),
    'graduation-certificate-printing-foil-special-paper-hk.html': ('/zh-hk/product/certificates/', 'high', '证书→证书SKU'),
    'class-timetable-printing-a4-laminated-rush-hk.html': ('/zh-hk/category/educational/', 'high', '校园→教育类目'),
    'school-yearbook-a4-perfect-bound.html': ('/zh-hk/category/educational/', 'high', '毕业纪念册→教育类目'),
    'school-homework-bag-printing-transparent-pvc-hk.html': ('/zh-hk/category/educational/', 'med', '校园→教育类目'),
    'school-envelope-printing-report-card-c5-bulk-hk.html': ('/zh-hk/category/educational/', 'med', '校园信封→教育类目'),
    'school-red-envelope-printing-recycled-paper-class-order.html': ('/zh-hk/category/educational/', 'med', '校园利是封→教育类目'),
    'graduation-folder-printing-school-crest-name-hk.html': ('/zh-hk/category/educational/', 'med', '毕业folder→教育类目'),
    'a5-saddle-stitched-booklet-printing.html': ('/zh-hk/product/saddle-stitch-booklets/', 'high', '骑马钉→对应SKU'),
    'a5-perfect-bound-brochure-printing.html': ('/zh-hk/product/perfect-bound-books/', 'high', '胶装→对应SKU'),
    'waterproof-round-sticker-printing-outdoor-vehicle.html': ('/zh-hk/product/waterproof-stickers/', 'high', '防水贴纸→对应SKU'),
    'flyer-printing-a5-double-sided-100pcs.html': ('/zh-hk/product/a5-flyers/', 'high', 'A5单张→对应SKU(宣传单张车道)'),
    'a5-basic-flyer-printing-100pcs-student.html': ('/zh-hk/product/a5-flyers/', 'med', '学生单张→A5 SKU'),
    'flyer-printing-free-design-a5-a4-100pcs.html': ('/zh-hk/product/a4-flyers/', 'med', 'A4单张→对应SKU'),
    'restaurant-coupon-flyer-tear-off-a5.html': ('/zh-hk/product/a5-flyers/', 'med', '餐饮单张→A5 SKU'),
    'property-flyer-a4-waterproof-200pcs-same-day.html': ('/zh-hk/product/a4-flyers/', 'med', '地产单张→A4 SKU'),
    'waterproof-a5-flyer-250g-matte-laminate.html': ('/zh-hk/product/a5-flyers/', 'med', '防水单张→A5 SKU'),
    'personal-red-envelope-printing-mongkok-2hour.html': ('/zh-hk/category/red-packets/', 'med', '利是封→类目'),
    'wedding-invitation-printing-foil-ribbon-envelope.html': ('/zh-hk/category/red-packets/', 'med', '喜帖→利是封类目'),
    'same-day-banner-printing-6x3ft-waterproof-hk.html': ('/zh-hk/category/banners/', 'med', 'banner→横幅类目'),
}
SPECIAL = {
    'https://www.z-printpro.com': ('/zh-hk/', 'high', '首页'),
    'https://www.z-printpro.com/printing-guide.html': ('/zh-hk/blog/', 'med', '指南→博客'),
    'https://www.z-printpro.com/contact-us.html': ('/zh-hk/contact/', 'high', '联系页'),
    'https://www.z-printpro.com/help-center.html': ('/zh-hk/help-center/', 'high', '帮助中心'),
}

rows = []
for url in urls:
    base = url.rstrip('/')
    clicks, imps = gsc.get(base, gsc.get(url, (0, 0)))
    new_url, conf, note, rule = None, 'low', '', ''
    key = base if base in SPECIAL else url
    if key in SPECIAL:
        tgt, conf, note = SPECIAL[key]; new_url, rule = NEW + tgt, 'special'
    else:
        m = re.search(r'/products/([^/]+)/([^/]+\.html?)$', url)
        mc = re.search(r'/products/([^/]+)/?$', url)
        mn = re.search(r'/news/([^/]+)/', url)
        if m:
            cat, page = m.group(1), m.group(2)
            if page in HAND:
                tgt, conf, note = HAND[page]; new_url, rule = NEW + tgt, 'hand-map'
            elif CAT_MAP.get(cat):
                new_url, conf, note, rule = NEW + CAT_MAP[cat], 'med', f'→{cat}类目', 'cat-fallback'
            elif cat == 'business-card-printing':
                new_url, conf, note, rule = '', 'DECIDE', '⚠️名片禁区: 301→flyers 或 410, 待 user 拍板', 'bc-decision'
            else:
                new_url, note, rule = NEW + '/zh-hk/', f'未知类目{cat}', 'root-fallback'
        elif mc:
            cat = mc.group(1)
            if CAT_MAP.get(cat):
                new_url, conf, note, rule = NEW + CAT_MAP[cat], 'high', '类目页→对应类目', 'category'
            elif cat == 'business-card-printing':
                new_url, conf, note, rule = '', 'DECIDE', '⚠️名片禁区: 301→flyers 或 410, 待 user 拍板', 'bc-decision'
        elif mn:
            topic = mn.group(1)
            tgt = NEWS_TOPIC.get(topic, '/zh-hk/blog/')
            new_url, conf, note, rule = NEW + tgt, 'med' if 'category' in tgt else 'low', f'news→{topic}主题页', 'news'
        else:
            new_url, note, rule = NEW + '/zh-hk/', '未识别,人工核对', 'unmatched'
    rows.append({'old_url': url, 'new_url': new_url, 'clicks_91d': clicks, 'imps_91d': imps,
                 'rule': rule, 'confidence': conf, 'note': note})

df = pd.DataFrame(rows).sort_values(['clicks_91d','imps_91d'], ascending=False)
df.to_csv(os.path.join(BASE, '301-map-full.csv'), index=False, encoding='utf-8-sig')

# CF Bulk Redirect 导入版 (source,target; 去掉待决策行)
cf = df[df['rule'] != 'bc-decision'][['old_url','new_url']]
cf.columns = ['Source URL', 'Target URL']
cf.to_csv(os.path.join(BASE, 'cloudflare-bulk-redirect.csv'), index=False, encoding='utf-8-sig')

print(f"\n按规则分布:")
print(df.groupby('rule').agg(n=('old_url','count'), clicks=('clicks_91d','sum'), imps=('imps_91d','sum')).to_string())
bc = df[df['rule']=='bc-decision']
print(f"\n⚠️ 名片决策点: {len(bc)} URL, 91天点击 {bc['clicks_91d'].sum()}, 展示 {bc['imps_91d'].sum()}")
zero = df[(df['clicks_91d']==0)&(df['imps_91d']==0)]
print(f"无流量 URL (GSC 91天无记录): {len(zero)} / {len(df)}")
top = df.head(15)
print("\n--- Top 15 (按点击) ---")
print(top[['old_url','new_url','clicks_91d','imps_91d']].to_string(index=False))
print(f"\n已输出: 301-map-full.csv ({len(df)} 行), cloudflare-bulk-redirect.csv ({len(cf)} 行)")
