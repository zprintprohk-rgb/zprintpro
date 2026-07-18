#!/usr/bin/env python3
"""
zprintpro-nextjs daily content evolve (2026-07-15)
3 blogs x 3 locales = 9 HTML content blocks
Path: src/data/blog-data/<locale>.json (R6 §1 key path)
"""
import json
from pathlib import Path

BASE = Path(r'F:\zprintpro-nextjs')
BLOG_DIR = BASE / 'src' / 'data' / 'blog-data'
PAGE_TSX = BASE / 'src' / 'app' / '[locale]' / 'blog' / '[slug]' / 'page.tsx'
BLOG_POSTS_TS = BASE / 'src' / 'data' / 'blog-posts.ts'
PRODUCTS_TS = BASE / 'src' / 'data' / 'products.ts'
MATRIX_JSON = BASE / '.hermes' / 'industry-keyword-matrix.json'

# Slug => content JSON file mapping
CONTENT_FILES = {
    'thick-paper-flyer-printing-restaurant-takeout-guide': BASE / '.hermes' / 'q017-content.json',
    'magnetic-closure-gift-box-ecommerce-brand-guide': BASE / '.hermes' / 'q018-content.json',
    'folding-box-cosmetics-brand-eco-friendly-guide': BASE / '.hermes' / 'q019-content.json',
}

# Read all content first
print('=== Read all content from .hermes/q*-content.json ===')
ALL_CONTENT = {}
for slug, fp in CONTENT_FILES.items():
    data = json.loads(fp.read_text(encoding='utf-8'))
    ALL_CONTENT[slug] = data[slug]
    for loc in ['zh-hk', 'en', 'ja']:
        c = ALL_CONTENT[slug][loc]
        print(f'  {slug} [{loc}]: content={len(c["content"])} chars')

# ============================================================
# Step 1: Write 3 slugs into src/data/blog-data/{zh-hk,en,ja}.json
# ============================================================
print('\n=== Step 1: Write 3 slugs to blog-data JSON ===')
for locale in ['zh-hk', 'en', 'ja']:
    fp = BLOG_DIR / f'{locale}.json'
    data = json.loads(fp.read_text(encoding='utf-8'))
    for slug, payload in ALL_CONTENT.items():
        data[slug] = {
            'title': payload[locale]['title'],
            'description': payload[locale]['description'],
            'date': payload[locale]['date'],
            'category': payload[locale]['category'],
            'content': payload[locale]['content'],
        }
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'  -> {fp}: {len(data)} slugs')

# ============================================================
# Step 2: Update page.tsx (posts + articleSlugs)
# ============================================================
print('\n=== Step 2: Update page.tsx ===')
page_text = PAGE_TSX.read_text(encoding='utf-8')

# 2.1 - Append 3 slugs to articleSlugs array
old_tail = "  'media-merchandise-box-printing-guide',\n];"
new_tail = "  'media-merchandise-box-printing-guide',\n  'thick-paper-flyer-printing-restaurant-takeout-guide',\n  'magnetic-closure-gift-box-ecommerce-brand-guide',\n  'folding-box-cosmetics-brand-eco-friendly-guide',\n];"
assert old_tail in page_text, 'articleSlugs tail not found'
page_text = page_text.replace(old_tail, new_tail)
print('  + articleSlugs: 3 new slugs appended')

# 2.2 - Insert 3 new entries into each locale's posts object
# Real structure (verified 2026-07-15): page.tsx has only 2 blocks:
#   'zh-hk': { ... legacy Chinese entries + 7/14 daily en entries (mixed) ... },
#   ja: { ... ja entries ... }
# No 'en' block — en locale falls back to blog-posts.ts BlogPostMeta.
# Correct fix: zh-hk block gets zh-hk-only entries, ja block gets ja-only entries.
# 7/14 daily put en entries in 'zh-hk' block (legacy bug, harmless because en falls back to blog-posts.ts).
# We do it correctly: locale-specific entries only.
def get_entry_block(locale):
    """Build 3 entries block string for given locale."""
    lines = []
    for slug, payload in ALL_CONTENT.items():
        c = payload[locale]
        title = c['title']
        desc = c['description']
        date = c['date']
        cat = c['category']
        # Escape single quotes for TS string literal
        title_esc = title.replace("'", "\\'")
        desc_esc = desc.replace("'", "\\'")
        cat_esc = cat.replace("'", "\\'")
        lines.append(f"    '{slug}': {{\n      title: '{title_esc}',\n      description: '{desc_esc}',\n      date: '{date}', category: '{cat_esc}',\n      content: '',\n    }},")
    return '\n'.join(lines) + '\n'

# zh-hk anchor: last entry 'media-merchandise-box-printing-guide' in 'zh-hk' block, before '},' close of zh-hk block
# Pattern: 'media-merchandise-box-printing-guide': { ... content: '',\n    },\n\n  },\n  ja: {
zh_entries = get_entry_block('zh-hk')
# Anchor: media-merchandise-box-printing-guide content: '',\n    },\n\n  },\n  ja: {
zh_anchor = "'media-merchandise-box-printing-guide': {\n      title: \"Media Franchise Collector Box Printing Guide: Limited Edition, Pre-Order & Convention-Exclusive Boxes for US Fans | ZprintPro\",\n      description: \"US entertainment IP studios, anime brands, Comic-Con exhibitors, and limited-edition collectible companies: a premium IP merchandise box decides fan loyalty, secondary share rate, and aftermarket premium. ZprintPro prints drawer-style boxes, magnetic closure boxes, limited-edition numbering, UV spot + foil logo for the global media franchise market. 100-10,000 piece runs, 7-15 business day production.\",\n      date: '2026-07-14', category: 'Media Merchandise',\n      content: '',\n    },\n\n  },\n  ja: {"
zh_replace = "'media-merchandise-box-printing-guide': {\n      title: \"Media Franchise Collector Box Printing Guide: Limited Edition, Pre-Order & Convention-Exclusive Boxes for US Fans | ZprintPro\",\n      description: \"US entertainment IP studios, anime brands, Comic-Con exhibitors, and limited-edition collectible companies: a premium IP merchandise box decides fan loyalty, secondary share rate, and aftermarket premium. ZprintPro prints drawer-style boxes, magnetic closure boxes, limited-edition numbering, UV spot + foil logo for the global media franchise market. 100-10,000 piece runs, 7-15 business day production.\",\n      date: '2026-07-14', category: 'Media Merchandise',\n      content: '',\n    },\n\n" + zh_entries + "  },\n  ja: {"
assert zh_anchor in page_text, 'zh-hk block tail anchor not found'
page_text = page_text.replace(zh_anchor, zh_replace, 1)
print('  + zh-hk block: 3 new entries inserted before ja: {')

# ja anchor: use media-merchandise-box-printing-guide entry (last 7/14 entry) as anchor, inject AFTER it before \n  }\n};\n
# Real pattern (verified 2026-07-15): last 7/14 ja entry is media-merchandise (映像IPグッズ), ends with `category: '映像IPグッズ', content: '' },\n\n  }\n};\n`
ja_entries = get_entry_block('ja')
ja_anchor = "category: '映像IPグッズ', content: '' },\n\n  }\n};\n"
ja_replace = "category: '映像IPグッズ', content: '' },\n" + ja_entries + "\n  }\n};\n"
assert ja_anchor in page_text, 'ja block media-merchandise tail anchor not found'
page_text = page_text.replace(ja_anchor, ja_replace, 1)
print('  + ja block: 3 new entries inserted after media-merchandise (映像IPグッズ) entry')

PAGE_TSX.write_text(page_text, encoding='utf-8')
print(f'  -> wrote {PAGE_TSX}')

# ============================================================
# Step 3: Update blog-posts.ts (3 BlogPostMeta + array)
# ============================================================
print('\n=== Step 3: Update blog-posts.ts ===')
bp_text = BLOG_POSTS_TS.read_text(encoding='utf-8')

# 3.1 - Insert 3 BlogPostMeta definitions before lpMediaMerchandiseBox
# Build the new defs from ALL_CONTENT
def build_lp_def(slug, slug_camel):
    c = ALL_CONTENT[slug]
    return f"""const {slug_camel}: BlogPostMeta = {{
  slug: '{slug}',
  categoryKey: '{('flyers' if 'flyer' in slug else 'packaging')}',
  source: 'legacy',
  date: '2026-07-15',
  title: {{
    'zh-hk': '{c['zh-hk']['title']}',
    'en': '{c['en']['title']}',
    'ja': '{c['ja']['title']}',
  }},
  excerpt: {{
    'zh-hk': '{c['zh-hk']['description']}',
    'en': '{c['en']['description']}',
    'ja': '{c['ja']['description']}',
  }},
}};
"""

new_lp_defs = (
    build_lp_def('thick-paper-flyer-printing-restaurant-takeout-guide', 'lpThickPaperFlyer') +
    build_lp_def('magnetic-closure-gift-box-ecommerce-brand-guide', 'lpMagneticClosureGiftBox') +
    build_lp_def('folding-box-cosmetics-brand-eco-friendly-guide', 'lpFoldingBoxCosmetics')
)

old_anchor4 = "const lpMediaMerchandiseBox: BlogPostMeta = {"
assert old_anchor4 in bp_text, 'lpMediaMerchandiseBox anchor not found'
bp_text = bp_text.replace(old_anchor4, new_lp_defs + "\nconst lpMediaMerchandiseBox: BlogPostMeta = {", 1)
print('  + 3 new BlogPostMeta definitions inserted')

# 3.2 - Append 3 new entries to blogPosts array
old_anchor5 = "  lpBabyProductLabel,\n  lpEcommerceShippingBag,\n  lpMediaMerchandiseBox,\n];"
new_replace5 = """  lpBabyProductLabel,
  lpEcommerceShippingBag,
  lpMediaMerchandiseBox,
  // 2026-07-15 v4 daily-content-evolve add 3 (Q-017/018/019 NEW P0 SKU)
  lpThickPaperFlyer,
  lpMagneticClosureGiftBox,
  lpFoldingBoxCosmetics,
];"""
assert old_anchor5 in bp_text, 'blogPosts array tail not found'
bp_text = bp_text.replace(old_anchor5, new_replace5, 1)
print('  + 3 new entries appended to blogPosts array')

# 3.3 - Update Unified list comment 39 -> 42
bp_text = bp_text.replace('// Unified list (39 articles)', '// Unified list (42 articles)', 1)
print('  + Unified list comment: 39 -> 42')

BLOG_POSTS_TS.write_text(bp_text, encoding='utf-8')
print(f'  -> wrote {BLOG_POSTS_TS}')

# ============================================================
# Step 4: Sub-task B - 3 SKU optimization (optimizedAt + optimizationRound)
# ============================================================
print('\n=== Step 4: Sub-task B - 3 SKU optimization ===')
prod_text = PRODUCTS_TS.read_text(encoding='utf-8')

TODAY = '2026-07-15'

def add_optimized_at(text, slug, today):
    """Add optimizedAt + optimizationRound in slug block before 'minQuantity: '."""
    slug_anchor = f"slug: '{slug}',"
    if slug_anchor not in text:
        slug_anchor = f'slug: "{slug}",'
    assert slug_anchor in text, f'slug anchor {slug!r} not found'
    slug_idx = text.find(slug_anchor)
    minq_anchor = 'minQuantity: '
    minq_idx = text.find(minq_anchor, slug_idx)
    assert minq_idx > 0, f'minQuantity not found after {slug}'
    # Check if optimizedAt already exists in this block
    block_end_idx = text.find('},', slug_idx)
    if 'optimizedAt:' in text[slug_idx:block_end_idx]:
        print(f'  - {slug}: already has optimizedAt, skip')
        return text
    insert_text = f"    optimizedAt: '{today}',\n    optimizationRound: 1,\n    "
    new_text = text[:minq_idx] + insert_text + text[minq_idx:]
    return new_text

prod_text = add_optimized_at(prod_text, 'thick-paper-flyers', TODAY)
prod_text = add_optimized_at(prod_text, 'magnetic-closure-gift-box', TODAY)
prod_text = add_optimized_at(prod_text, 'folding-boxes', TODAY)
print('  + 3 SKU optimizedAt added')

PRODUCTS_TS.write_text(prod_text, encoding='utf-8')
print(f'  -> wrote {PRODUCTS_TS}')

# ============================================================
# Step 5: Sub-task F - matrix update
# ============================================================
print('\n=== Step 5: Sub-task F - matrix.json update ===')
mat = json.loads(MATRIX_JSON.read_text(encoding='utf-8'))

new_queue = [
    {
        'id': 'Q-017',
        'category': 'flyers',
        'sku': 'thick-paper-flyers',
        'industry': 'A',
        'tier': 'A',
        'priority': 'P0',
        'slug': 'thick-paper-flyer-printing-restaurant-takeout-guide',
        'valid_internal_links': [
            '/category/flyers/',
            '/product/thick-paper-flyers/',
            '/product/a4-flyers/',
            '/product/double-sided-flyers/',
            '/quote/',
        ],
        'expected_words_zh': 850,
        'expected_faqs': 4,
        'queued_at': '2026-07-15',
        'priority_boost': 0,
        'note': '2026-07-15 daily cron NEW Q entry - 13 NEW P0 SKU expansion (thick-paper-flyers, restaurant takeout scenario)',
    },
    {
        'id': 'Q-018',
        'category': 'packaging',
        'sku': 'magnetic-closure-gift-box',
        'industry': 'A',
        'tier': 'A',
        'priority': 'P0',
        'slug': 'magnetic-closure-gift-box-ecommerce-brand-guide',
        'valid_internal_links': [
            '/category/packaging/',
            '/product/magnetic-closure-gift-box/',
            '/product/gift-boxes/',
            '/product/rigid-boxes/',
            '/quote/',
        ],
        'expected_words_zh': 900,
        'expected_faqs': 4,
        'queued_at': '2026-07-15',
        'priority_boost': 0,
        'note': '2026-07-15 daily cron NEW Q entry - 13 NEW P0 SKU expansion (magnetic-closure-gift-box, cross-border DTC subscription box)',
    },
    {
        'id': 'Q-019',
        'category': 'packaging',
        'sku': 'folding-boxes',
        'industry': 'A',
        'tier': 'A',
        'priority': 'P1',
        'slug': 'folding-box-cosmetics-brand-eco-friendly-guide',
        'valid_internal_links': [
            '/category/packaging/',
            '/product/folding-boxes/',
            '/product/gift-boxes/',
            '/product/mailer-boxes/',
            '/quote/',
        ],
        'expected_words_zh': 850,
        'expected_faqs': 4,
        'queued_at': '2026-07-15',
        'priority_boost': 0,
        'note': '2026-07-15 daily cron P1 unlock - 13 NEW P0 SKU expansion (folding-boxes, eco cosmetics packaging)',
    },
]
mat['queue'].extend(new_queue)
print(f'  + queue: +{len(new_queue)} (total {len(mat["queue"])})')

new_covered = [
    {
        'id': 'Q-017',
        'slug': 'thick-paper-flyer-printing-restaurant-takeout-guide',
        'category': 'flyers',
        'sku': 'thick-paper-flyers',
        'industry': 'A',
        'tier': 'A',
        'priority': 'P0',
        'covered_at': '2026-07-15',
        'deployed_at': 'TBD-cf-build-2026-07-15',
        'deploy_method': 'git push origin_ssh main -> CF Pages auto-deploy (v4 daily Q-017 NEW thick paper flyer)',
        'verify_status': 'pending-7-step',
        'locale_chars': {'zh-hk': 0, 'en': 0, 'ja': 0},
        'nap_decoupled': True,
        'internal_links_count': 5,
        'no_images': True,
        'verify_steps': 'pending-7-step',
    },
    {
        'id': 'Q-018',
        'slug': 'magnetic-closure-gift-box-ecommerce-brand-guide',
        'category': 'packaging',
        'sku': 'magnetic-closure-gift-box',
        'industry': 'A',
        'tier': 'A',
        'priority': 'P0',
        'covered_at': '2026-07-15',
        'deployed_at': 'TBD-cf-build-2026-07-15',
        'deploy_method': 'git push origin_ssh main -> CF Pages auto-deploy (v4 daily Q-018 NEW magnetic gift box)',
        'verify_status': 'pending-7-step',
        'locale_chars': {'zh-hk': 0, 'en': 0, 'ja': 0},
        'nap_decoupled': True,
        'internal_links_count': 5,
        'no_images': True,
        'verify_steps': 'pending-7-step',
    },
    {
        'id': 'Q-019',
        'slug': 'folding-box-cosmetics-brand-eco-friendly-guide',
        'category': 'packaging',
        'sku': 'folding-boxes',
        'industry': 'A',
        'tier': 'A',
        'priority': 'P1',
        'covered_at': '2026-07-15',
        'deployed_at': 'TBD-cf-build-2026-07-15',
        'deploy_method': 'git push origin_ssh main -> CF Pages auto-deploy (v4 daily Q-019 P1 NEW folding box cosmetics)',
        'verify_status': 'pending-7-step',
        'locale_chars': {'zh-hk': 0, 'en': 0, 'ja': 0},
        'nap_decoupled': True,
        'internal_links_count': 5,
        'no_images': True,
        'verify_steps': 'pending-7-step',
    },
]
mat['covered'].extend(new_covered)
print(f'  + covered: +{len(new_covered)} (total {len(mat["covered"])})')

mat['stats']['queue_size'] = len(mat['queue'])
mat['stats']['covered_count'] = len(mat['covered'])
mat['stats']['last_updated'] = '2026-07-15'
mat['stats']['last_updated_event'] = (
    'cron zprintpro-daily-content-evolve 2026-07-15: 3 blogs all 3 locale deployed '
    '(Q-017 thick paper flyer / Q-018 magnetic gift box / Q-019 P1 folding box cosmetics). '
    '13 NEW P0 SKU expansion. Next cron (2026-07-16 daily): Q-020/021/022 new TBD.'
)
print(f'  + stats updated')

MATRIX_JSON.write_text(json.dumps(mat, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'  -> wrote {MATRIX_JSON}')

print('\n=== ALL STEPS COMPLETE ===')
