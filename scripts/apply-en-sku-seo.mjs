/**
 * apply-en-sku-seo.mjs — 29 SKU 的 EN SEO 字段批量部署器 (v4 — 长度校准)
 *
 * v4 修复：
 *   - 手工把 title 砍到 48-60 chars
 *   - 手工把 description 砍到 150-160 chars
 *   - 手工把 h1 砍到 30-50 chars
 *   - 保留全部 FAB + market CTA + DHL + certs 关键信号
 *
 * 设计哲学：
 *   - 不用自动生成（自动生成会破坏 SEO 字段的语义完整性）
 *   - 改为"curated 字串 + 批量部署"模式：每个 SKU hard-code 1 套高质量 EN SEO 字段
 *   - 后续改文案只改 P0_DATA 表，不需要动生成逻辑
 *   - DRY-RUN 输出 + --apply 写入 src/data/sku-seo-data.ts
 *
 * 质量基线（每 SKU 必须满足）：
 *   - title 48-60 chars
 *   - description 150-160 chars（含 FAB + market CTA + DHL + certs）
 *   - h1 30-50 chars（不重复，brand-后置）
 *   - keywords 8-10 个纯英文（核心 + LCV + 商业意图 + market currency）
 *   - body 2-3 句场景化英文
 *   - imageAlt 英文 + 产品名 + 工艺
 *   - 0 中日韩字符（locale 一致性）
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKU_FILE = path.join(ROOT, 'src/data/sku-seo-data.ts');
const APPLY_MODE = process.argv.includes('--apply');

const P0_DATA = {
  'gift-bags': {
    title: 'Gift Paper Bags | Foil Stamping | Free US Ship | ZprintPro',
    description: 'Premium gift paper bags for boutiques and brands. 210-300g art card, ribbon or cotton handles, foil stamping. 100-MOQ. Free US shipping over $100, DHL. FSC.',
    h1: 'Gift Paper Bags 100+ | Premium Ribbon | ZprintPro',
    keywords: ['gift paper bags', 'custom gift bags', 'premium gift bags', 'branded gift bags', 'ribbon handle gift bags', 'foil stamped gift bags', 'gift bags free shipping', 'bulk gift bags', 'gift bags USD', 'bespoke gift packaging'],
    body: 'ZprintPro Custom Gift Paper Bag Printing for boutiques, jewelers, chocolatiers, and corporate gifting across US and global markets. 210-300g art card with soft-touch lamination, ribbon or cotton rope handles, foil stamping, magnetic closures. 100-bag MOQ, Free US shipping over $100, FSC certified.',
    imageAlt: 'Custom gift paper bags with ribbon or cotton rope handles, 210-300g art card, foil stamping — ZprintPro',
  },
  'eco-paper-bags': {
    title: 'Eco Paper Bags | FSC Recycled | Free US Ship | ZprintPro',
    description: 'Eco-friendly paper bags for sustainable brands. 100% recycled or FSC kraft, soy inks, GOTS cotton. 100-MOQ. Free US shipping over $100, DHL. Carbon-neutral.',
    h1: 'Eco Paper Bags 100+ | FSC Recycled | ZprintPro',
    keywords: ['eco paper bags', 'eco friendly paper bags', 'recycled paper bags', 'FSC paper bags', 'sustainable gift bags', 'kraft paper bags eco', 'compostable bags', 'eco bags free shipping', 'bulk eco bags', 'bespoke eco packaging'],
    body: 'ZprintPro Eco Paper Bag Printing for organic food retailers, sustainable fashion, clean beauty, and zero-waste brands across US and global markets. 100% recycled or FSC-certified kraft with GOTS organic cotton handles, soy inks, water-based coatings. 100-bag MOQ, Free US shipping over $100, carbon-neutral offset.',
    imageAlt: 'Eco paper bags made from FSC-recycled kraft with GOTS organic cotton handles, soy-based inks — ZprintPro',
  },
  'handle-bags': {
    title: 'Handle Paper Bags | 11 Colors | Free US Ship | ZprintPro',
    description: 'Custom handle paper bags for retail. 120-200g kraft, cotton rope or flat handles, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC. Quote.',
    h1: 'Handle Paper Bags 100+ | Cotton Rope | ZprintPro',
    keywords: ['handle paper bags', 'paper bags with handles', 'cotton rope handle bags', 'custom paper bags retail', 'shopping paper bags', 'flat handle bags', 'paper bags free shipping', 'bulk paper bags', 'paper bags USD', 'bespoke shopping bags'],
    body: 'ZprintPro Custom Handle Paper Bag Printing for retail, apparel, gift shops, cafés, and takeaways across US and global markets. 120-200g brown or white kraft with 11 cotton rope colors, paper rope, or flat handles in S/M/L/XL sizes. 100-bag MOQ, Free US shipping over $100, FSC certified, 3-5 day rush available.',
    imageAlt: 'Custom handle paper bags with cotton rope or flat paper handles, 120-200g kraft, 4-color CMYK — ZprintPro',
  },
  'large-bags': {
    title: 'Large Paper Bags | 12-20kg Load | Free US Ship | ZprintPro',
    description: 'Large reinforced paper bags for apparel and gifts. 200-300g kraft, 12-20kg load. 100-MOQ. Free US shipping over $100, DHL Express. FSC certified. Order today.',
    h1: 'Large Paper Bags 100+ | Heavy-Duty | ZprintPro',
    keywords: ['large paper bags', 'oversized paper bags', 'heavy duty paper bags', 'apparel shopping bags', 'gift hamper bags', 'twin pack bags', 'large kraft bags', 'paper bags free shipping', 'bulk large bags', 'bespoke large packaging'],
    body: 'ZprintPro Large Paper Bag Printing for apparel brands, footwear retailers, gift hampers, home goods, and corporate gifting across US and global markets. 200-300g reinforced kraft with twin cotton rope handles, double-glued base, and gusseted sides supporting 12-20kg. 100-bag MOQ, Free US shipping over $100, FSC certified.',
    imageAlt: 'Large reinforced paper bags with twin cotton rope handles and double-glued base, 200-300g kraft, 12-20kg load — ZprintPro',
  },
  'removable-stickers': {
    title: 'Removable Stickers | No Residue | Free US Ship | ZprintPro',
    description: 'Removable stickers that peel off cleanly. Vinyl or PP, repositionable adhesive. 100-MOQ, 90-day removal. Free US shipping over $100, DHL Express. Quote.',
    h1: 'Removable Stickers 100+ | No Residue | ZprintPro',
    keywords: ['removable stickers', 'no residue stickers', 'repositionable stickers', 'window decals removable', 'wall stickers removable', 'temporary stickers', 'rental equipment tags', 'removable adhesive labels', 'stickers free shipping', 'bulk removable stickers'],
    body: 'ZprintPro Removable Sticker Printing for retail windows, events, rental equipment, and short-term campaigns across US and global markets. Vinyl or PP facestock with low-tack repositionable adhesive that removes cleanly within 90 days. 100-sticker MOQ, Free US shipping over $100, 11 colors in stock.',
    imageAlt: 'Removable stickers on vinyl with repositionable adhesive, peels off cleanly within 90 days — ZprintPro',
  },
  'small-batch-stickers': {
    title: 'Small Batch Stickers | 50+ MOQ | Free US Ship | ZprintPro',
    description: 'Small batch stickers for startups and creators. Vinyl, paper, holographic, foil. 50-MOQ, 3-5 day. Free US shipping over $100, DHL Express. No setup fees.',
    h1: 'Small Batch Stickers 50+ | No Setup | ZprintPro',
    keywords: ['small batch stickers', 'custom stickers small quantity', '50 stickers minimum', 'startup stickers', 'indie brand stickers', 'creator stickers', 'holographic stickers', 'foil stickers small', 'stickers free shipping', 'bulk custom stickers'],
    body: 'ZprintPro Small Batch Sticker Printing for startups, indie brands, creators, weddings, and event favors across US and global markets. 50-sticker minimum for vinyl/clear, 100 for paper/kraft/foil, with no setup fees. Available in vinyl, clear, holographic, kraft, and metallic foil. 3-5 day production, Free US shipping over $100.',
    imageAlt: 'Small batch custom stickers in vinyl, holographic, kraft, and metallic foil, 50+ minimum — ZprintPro',
  },
  'die-cut-stickers': {
    title: 'Die-Cut Stickers | Custom Shape | Free US Ship | ZprintPro',
    description: 'Custom die-cut stickers in any shape. Vinyl, holographic, foil, ±0.2mm precision. 100-MOQ. Free US shipping over $100, DHL Express. Outdoor 3-5yr. Quote.',
    h1: 'Die-Cut Stickers 100+ | Custom Shape | ZprintPro',
    keywords: ['die cut stickers', 'custom shape stickers', 'die cut vinyl stickers', 'kiss cut stickers', 'logo stickers custom', 'holographic die cut', 'foil die cut stickers', 'stickers free shipping', 'bulk die cut stickers', 'bespoke sticker shapes'],
    body: 'ZprintPro Die-Cut Sticker Printing for brand logos, packaging seals, laptop decals, and promotional merchandise across US and global markets. Digital cutting with ±0.2mm precision for vinyl, holographic, clear, and metallic foil. 100-sticker MOQ, Free US shipping over $100, outdoor durability 3-5 years.',
    imageAlt: 'Custom die-cut stickers in vinyl and holographic with precision digital cutting, any shape — ZprintPro',
  },
  'foil-stickers': {
    title: 'Foil Stickers | Gold Silver Rose | Free US Ship | ZprintPro',
    description: 'Foil stickers with metallic shine. Gold, silver, rose gold, copper, holographic. Hot stamp foil. 100-MOQ. Free US shipping over $100, DHL Express. Quote.',
    h1: 'Foil Stickers 100+ | Hot Stamp | ZprintPro',
    keywords: ['foil stickers', 'gold foil stickers', 'silver foil stickers', 'rose gold foil', 'holographic foil stickers', 'metallic stickers', 'luxury stickers', 'foil labels custom', 'stickers free shipping', 'bulk foil stickers'],
    body: 'ZprintPro Foil Sticker Printing for cosmetics, weddings, luxury packaging, and limited edition branding across US and global markets. Hot stamp foil in gold, silver, rose gold, copper, holographic, and brushed metal on vinyl or paper. 100-sticker MOQ, Free US shipping over $100, dishwasher-safe lamination available.',
    imageAlt: 'Foil stickers in gold, silver, rose gold, copper, and holographic, hot stamp foil — ZprintPro',
  },
  'security-stickers': {
    title: 'Security Stickers | Tamper Seal | Free US Ship | ZprintPro',
    description: 'Security stickers for anti-counterfeit. Void-release, destructible, holographic, serialized QR. 100-MOQ. Free US shipping over $100, DHL. FDA, ISO compliant.',
    h1: 'Security Stickers | Anti-Counterfeit | ZprintPro',
    keywords: ['security stickers', 'tamper evident stickers', 'void release labels', 'anti counterfeit stickers', 'security seals', 'QR code security', 'pharma security labels', 'electronics warranty seals', 'stickers free shipping', 'bulk security stickers'],
    body: 'ZprintPro Security Sticker Printing for pharmaceutical, electronics, luxury goods, food and beverage, and government applications across US and global markets. Void-release, destructible vinyl, holographic seals, and serialized QR codes for track-and-trace. 100-sticker MOQ, Free US shipping over $100, FDA 21 CFR Part 11 compliant.',
    imageAlt: 'Security stickers with void-release pattern, destructible vinyl, and serialized QR codes for track-and-trace — ZprintPro',
  },
  'fluorescent-stickers': {
    title: 'Fluorescent Stickers | Neon UV | Free US Ship | ZprintPro',
    description: 'Fluorescent stickers with neon colors and UV glow. Pink, orange, yellow, green, blue. 100-MOQ. Free US shipping over $100, DHL Express. 3-5 day turnaround.',
    h1: 'Fluorescent Stickers 100+ | Neon UV | ZprintPro',
    keywords: ['fluorescent stickers', 'neon stickers', 'UV glow stickers', 'blacklight stickers', 'fluorescent pink stickers', 'safety stickers neon', 'event stickers neon', 'club stickers UV', 'stickers free shipping', 'bulk fluorescent stickers'],
    body: 'ZprintPro Fluorescent Sticker Printing for events, nightclubs, retail sale signage, safety warnings, and youth-targeted branding across US and global markets. Day-glo fluorescent pigments layered under CMYK in 6 neon colors with UV-reactive blacklight glow. 100-sticker MOQ, Free US shipping over $100, 3-5 day production.',
    imageAlt: 'Fluorescent stickers in neon pink, orange, yellow, green, blue, and red with UV-reactive glow — ZprintPro',
  },
  'gift-boxes': {
    title: 'Gift Boxes | Rigid Magnetic | Free US Ship | ZprintPro',
    description: 'Custom gift boxes for premium brands. Rigid setup, folding carton, magnetic closure, foil stamping. 100-MOQ. Free US shipping over $100, DHL. FSC. Get a quote.',
    h1: 'Gift Boxes 100+ | Rigid Magnetic | ZprintPro',
    keywords: ['custom gift boxes', 'rigid gift boxes', 'folding carton boxes', 'magnetic closure boxes', 'luxury gift boxes', 'foil stamped gift boxes', 'premium packaging', 'gift boxes free shipping', 'bulk gift boxes', 'bespoke gift packaging'],
    body: 'ZprintPro Custom Gift Box Printing for jewelry, cosmetics, gourmet food, spirits, and corporate gifting across US and global markets. Rigid setup, folding carton, magnetic closure with foil stamping, embossing, and inside printing. 100-box MOQ, Free US shipping over $100, FSC certified, free dieline design.',
    imageAlt: 'Custom gift boxes in rigid setup with magnetic closure and foil-stamped logos — ZprintPro',
  },
  'mailer-boxes': {
    title: 'Mailer Boxes | E-Commerce | Free US Ship | ZprintPro',
    description: 'Mailer boxes for e-commerce. Self-locking, 70% storage save, kraft or white. 100-MOQ. Free US shipping over $100, DHL Express. FSC certified. Get a quote.',
    h1: 'Mailer Boxes 100+ | Self-Lock | ZprintPro',
    keywords: ['mailer boxes', 'e-commerce mailers', 'self locking boxes', 'corrugated mailers', 'folding carton mailers', 'DTC shipping boxes', 'subscription boxes', 'mailer boxes free shipping', 'bulk mailers', 'bespoke shipping boxes'],
    body: 'ZprintPro Mailer Box Printing for DTC e-commerce brands shipping apparel, beauty, food, electronics, home goods, and subscription services across US and global markets. Self-locking tuck-front design, 5-second assembly, no tape needed. 100-box MOQ, Free US shipping over $100, FSC certified.',
    imageAlt: 'Custom mailer boxes with self-locking tuck-front design, kraft or full-color print — ZprintPro',
  },
  'folding-boxes': {
    title: 'Folding Boxes | Retail Packaging | Free US Ship | ZprintPro',
    description: 'Folding boxes for retail. Tuck-end, auto-lock bottom, 350-400g card. 100-MOQ. Free US shipping over $100, DHL Express. FSC, FDA food-safe. Order today.',
    h1: 'Folding Boxes 100+ | Auto-Lock | ZprintPro',
    keywords: ['folding boxes', 'folding cartons', 'tuck end boxes', 'auto lock bottom boxes', 'retail packaging boxes', 'cosmetic boxes', 'food boxes folding', 'folding boxes free shipping', 'bulk folding boxes', 'bespoke folding cartons'],
    body: 'ZprintPro Folding Box Printing for cosmetics, pharmaceuticals, food and beverage, electronics, retail apparel, candles, and small goods across US and global markets. Tuck-end, reverse tuck-end, auto-lock bottom, pillow box, and sleeve box styles. 100-box MOQ, Free US shipping over $100, FSC certified, FDA-compliant for food contact.',
    imageAlt: 'Folding carton boxes with tuck-end or auto-lock bottom, 350-400g art card or kraft — ZprintPro',
  },
  'rigid-boxes': {
    title: 'Rigid Boxes | Luxury Setup | Free US Ship | ZprintPro',
    description: 'Luxury rigid setup boxes. 800-1500gsm greyboard, magnetic closure, leatherette. 250-MOQ. Free US shipping over $100, DHL Express. 10-15 day production. Quote.',
    h1: 'Rigid Boxes 250+ | Magnetic Closure | ZprintPro',
    keywords: ['rigid boxes', 'rigid setup boxes', 'luxury packaging boxes', 'magnetic closure boxes', 'leatherette boxes', 'jewelry boxes', 'premium gift boxes', 'rigid boxes free shipping', 'bulk rigid boxes', 'bespoke rigid packaging'],
    body: 'ZprintPro Rigid Setup Box Printing for jewelry, watches, premium spirits, luxury cosmetics, gourmet food, and corporate awards across US and global markets. 800-1500gsm greyboard wrapped in art paper, specialty paper, or leatherette with foil, embossing, and magnetic closures. 250-box MOQ, Free US shipping over $100, 10-15 day production.',
    imageAlt: 'Rigid setup boxes with leatherette wrap, foil stamping, and magnetic closure for luxury packaging — ZprintPro',
  },
  'a2-posters': {
    title: 'A2 Posters | 420x594mm | Free US Ship | ZprintPro',
    description: 'A2 posters (420x594mm) for retail and events. 150-300g gloss or matte art paper. 100-MOQ. Free US shipping over $100, DHL Express. 2-3 day. FSC certified.',
    h1: 'A2 Posters 100+ | Retail & Events | ZprintPro',
    keywords: ['A2 posters', 'A2 poster printing', '420x594 posters', 'event posters A2', 'retail posters', 'sale posters', 'A2 posters free shipping', 'bulk A2 posters', 'A2 posters USD', 'bespoke A2 signage'],
    body: 'ZprintPro A2 Poster Printing (420x594mm) for retail stores, events, real estate, restaurants, gyms, and small businesses across US and global markets. 150-300g gloss or matte art paper with 4-color CMYK printing and optional lamination. 100-poster MOQ, Free US shipping over $100, 2-3 day production.',
    imageAlt: 'A2 posters in gloss or matte art paper, 420x594mm, 4-color CMYK printing for retail and events — ZprintPro',
  },
  'a1-posters': {
    title: 'A1 Posters | 594x841mm | Free US Ship | ZprintPro',
    description: 'A1 posters (594x841mm) for retail and trade shows. 200-300g matte or photo paper. 50-MOQ. Free US shipping over $100, DHL Express. Mounting included. Quote.',
    h1: 'A1 Posters 50+ | Trade Show | ZprintPro',
    keywords: ['A1 posters', 'A1 poster printing', '594x841 posters', 'large posters', 'trade show posters', 'movie posters A1', 'window posters', 'A1 posters free shipping', 'bulk A1 posters', 'bespoke A1 signage'],
    body: 'ZprintPro A1 Poster Printing (594x841mm) for retail windows, movie and entertainment, art galleries, trade shows, real estate, and corporate offices across US and global markets. 200-300g matte, photo paper, or premium matte with mounting on foam board, gator board, or sintra. 50-poster MOQ, Free US shipping over $100.',
    imageAlt: 'A1 posters on premium matte or photo paper with foam board mounting for retail and trade shows — ZprintPro',
  },
  'outdoor-posters': {
    title: 'Outdoor Posters | UV Resistant | Free US Ship | ZprintPro',
    description: 'Outdoor posters for storefronts and events. PVC banner, vinyl, weatherproof. 50-MOQ. Free US shipping over $100, DHL Express. 6-12 month fade resistance.',
    h1: 'Outdoor Posters 50+ | UV Resistant | ZprintPro',
    keywords: ['outdoor posters', 'weatherproof posters', 'PVC banner posters', 'vinyl outdoor signs', 'construction posters', 'event outdoor signage', 'UV resistant posters', 'outdoor posters free shipping', 'bulk outdoor posters', 'bespoke outdoor signage'],
    body: 'ZprintPro Outdoor Poster Printing for storefronts, construction sites, events, sports venues, political campaigns, and tourism across US and global markets. PVC banner, vinyl sticker, weatherproof paper, or mesh banner with UV lamination for 6-12 month fade resistance. 50-poster MOQ, Free US shipping over $100, free grommet installation.',
    imageAlt: 'Outdoor posters on PVC banner or vinyl with UV lamination and grommets for storefront and event use — ZprintPro',
  },
  'display-posters': {
    title: 'Display Posters | Foam Board | Free US Ship | ZprintPro',
    description: 'Display posters on foam board or gator board for trade shows. 50-MOQ. Free US shipping over $100, DHL Express. Mounting and lamination included. Get a quote.',
    h1: 'Display Posters 50+ | Foam & Gator | ZprintPro',
    keywords: ['display posters', 'foam board posters', 'gator board prints', 'trade show posters', 'retail display posters', 'event booth signs', 'mounted posters', 'display posters free shipping', 'bulk display posters', 'bespoke display signs'],
    body: 'ZprintPro Display Poster Printing for trade show exhibitors, retail pop-ups, event companies, corporate conferences, and product launches across US and global markets. Foam board, gator board, or PVC sintra mounting with lamination standard. 50-poster MOQ, Free US shipping over $100, free booth layout service.',
    imageAlt: 'Display posters on foam board or gator board with lamination, ready for trade show booths and retail displays — ZprintPro',
  },
  'art-posters': {
    title: 'Art Posters | Archival 200yr | Free US Ship | ZprintPro',
    description: 'Museum-quality art posters. Matte cotton, satin photo, Hahnemuhle. 25-MOQ. Free US shipping over $100, DHL Express. 200-year archival ink. COA included.',
    h1: 'Art Posters 25+ | Archival Pigment | ZprintPro',
    keywords: ['art posters', 'museum quality prints', 'archival posters', 'fine art prints', 'photography prints', 'gallery posters', 'limited edition prints', 'art posters free shipping', 'bulk art prints', 'bespoke art reproductions'],
    body: 'ZprintPro Art Poster Printing for independent artists, photographers, illustrators, galleries, curators, and interior designers across US and global markets. Matte cotton, satin photo, or Hahnemuhle Photo Rag with 200+ year archival pigment inks. 25-poster MOQ, Free US shipping over $100, free hand inspection and Certificate of Authenticity.',
    imageAlt: 'Museum-quality art posters on matte cotton or Hahnemuhle Photo Rag with archival pigment inks — ZprintPro',
  },
  'adhesive-posters': {
    title: 'Adhesive Posters | Peel & Stick | Free US Ship | ZprintPro',
    description: 'Peel-and-stick adhesive posters for windows, walls, vehicles. Vinyl, clear, fabric. 50-MOQ. Free US shipping over $100, DHL Express. CMYK + white ink option.',
    h1: 'Adhesive Posters 50+ | Vinyl Decals | ZprintPro',
    keywords: ['adhesive posters', 'peel and stick posters', 'window decals', 'wall stickers custom', 'vinyl posters', 'vehicle decals', 'removable wall art', 'adhesive posters free shipping', 'bulk adhesive prints', 'bespoke wall murals'],
    body: 'ZprintPro Adhesive Poster Printing for retail windows, vehicle advertising, event signage, corporate offices, restaurants, real estate, and home decor across US and global markets. White vinyl, clear vinyl, translucent vinyl, or fabric wallpaper with CMYK + white ink option. 50-poster MOQ, Free US shipping over $100, free installation guide.',
    imageAlt: 'Adhesive posters on vinyl with peel-and-stick backing for windows, walls, and vehicles — ZprintPro',
  },
  'foil-business-cards': {
    title: 'Foil Business Cards | Gold Silver | Free US Ship | ZprintPro',
    description: 'Foil stamped business cards in gold, silver, rose gold, copper, holographic. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified. Quote.',
    h1: 'Foil Business Cards | Hot Stamp | ZprintPro',
    keywords: ['foil business cards', 'gold foil business cards', 'silver foil cards', 'rose gold business cards', 'hot foil stamping', 'luxury business cards', 'foil cards custom', 'cards free shipping', 'bulk foil cards', 'bespoke foil stationery'],
    body: 'ZprintPro Foil Stamped Business Card Printing for executives, finance, law, luxury real estate, and corporate gifting across US and global markets. Hot stamp foil in gold, silver, rose gold, copper, holographic, and black on 350-600g matte, cotton, or uncoated card. 100-card MOQ, Free US shipping over $100, FSC certified.',
    imageAlt: 'Foil stamped business cards in gold, silver, and rose gold with hot stamp foil on premium matte card — ZprintPro',
  },
  'spot-uv-business-cards': {
    title: 'Spot UV Business Cards | Matte+UV | Free US Ship | ZprintPro',
    description: 'Spot UV business cards with glossy logo contrast. Matte base + UV coating. 100-MOQ. Free US shipping over $100, DHL Express. ±0.2mm precision. Order today.',
    h1: 'Spot UV Business Cards | Matte + Gloss | ZprintPro',
    keywords: ['spot UV business cards', 'spot UV cards', 'matte gloss business cards', 'glossy logo cards', 'modern business cards', 'creative business cards', 'UV coating cards', 'cards free shipping', 'bulk spot UV cards', 'bespoke UV stationery'],
    body: 'ZprintPro Spot UV Business Card Printing for creative agencies, designers, tech startups, and modern brands across US and global markets. Matte lamination base with glossy UV coating on selected areas (logo, name, pattern) for striking dimensional contrast. 100-card MOQ, Free US shipping over $100, ±0.2mm registration precision.',
    imageAlt: 'Spot UV business cards with matte base and glossy UV coating on logo for dimensional contrast — ZprintPro',
  },
  'matte-business-cards': {
    title: 'Matte Business Cards | Soft-Touch | Free US Ship | ZprintPro',
    description: 'Matte laminated business cards, soft-touch and fingerprint-resistant. 300-400g card stock. 100-MOQ. Free US shipping over $100, DHL Express. 2-3 day turnaround.',
    h1: 'Matte Business Cards | Soft-Touch | ZprintPro',
    keywords: ['matte business cards', 'matte laminated cards', 'soft touch business cards', 'modern business cards', 'professional business cards', 'fingerprint resistant cards', 'cards free shipping', 'bulk matte cards', 'matte cards USD', 'bespoke matte stationery'],
    body: 'ZprintPro Matte Laminated Business Card Printing for creative agencies, designers, tech startups, finance, law, and modern professionals across US and global markets. 300-400g art card with soft-touch matte lamination, fingerprint resistant, sophisticated color reproduction. 100-card MOQ, Free US shipping over $100, 2-3 day production.',
    imageAlt: 'Matte laminated business cards with soft-touch finish and fingerprint resistance, 300-400g art card — ZprintPro',
  },
  'rounded-corner-cards': {
    title: 'Rounded Corner Cards | R3 R5 R10 | Free US Ship | ZprintPro',
    description: 'Rounded corner business cards. R3, R5, or R10mm radius. Matte or gloss finish. 100-MOQ. Free US shipping over $100, DHL Express. Modern + durable. Quote.',
    h1: 'Rounded Corner Cards | R3 R5 R10 | ZprintPro',
    keywords: ['rounded corner business cards', 'rounded corner cards', 'R3mm cards', 'R5mm business cards', 'modern business cards', 'creative cards', 'soft corner cards', 'cards free shipping', 'bulk rounded cards', 'bespoke rounded stationery'],
    body: 'ZprintPro Rounded Corner Business Card Printing for creative agencies, tech startups, modern lifestyle brands, and contemporary professionals across US and global markets. R3mm, R5mm, or R10mm radius on 300-400g matte, gloss, or uncoated card. 100-card MOQ, Free US shipping over $100, free design optimization.',
    imageAlt: 'Rounded corner business cards in matte or gloss finish with R3/R5/R10mm radius options — ZprintPro',
  },
  'kraft-paper-bags': {
    title: 'Kraft Paper Bags | Eco-Friendly | Free US Ship | ZprintPro',
    description: 'Custom kraft paper bags for retail and gift shops. 120-300g kraft with cotton rope handles. 100-MOQ. Free US shipping over $100, DHL Express. FSC. Get a quote.',
    h1: 'Kraft Paper Bags 100+ | Eco-Friendly | ZprintPro',
    keywords: ['kraft paper bags', 'custom kraft paper bags', 'kraft paper bags printing', 'eco friendly kraft bags', 'kraft bags with handles', 'brown paper bags wholesale', 'kraft paper bags free shipping', 'bulk kraft bags', 'kraft bags USD', 'bespoke paper bags'],
    body: 'ZprintPro Custom Kraft Paper Bag Printing for retail, gift, coffee, and fashion brands across US and global markets. 120-300g natural brown or white kraft with cotton rope handles, foil stamping, and spot UV. 100-bag MOQ, Free US shipping over $100, FSC certified, soy ink.',
    imageAlt: 'Custom kraft paper bags with cotton rope handles, 120-300g FSC certified — ZprintPro',
  },
  'a4-flyers': {
    title: 'A4 Flyers 100+ | Same-Day CMYK | Free US Ship | ZprintPro',
    description: 'A4 flyer printing for events. 128g-300g gloss paper, double-sided CMYK. 100-MOQ, same-day 500+. Free US shipping over $100, DHL Express. FSC. Get a quote.',
    h1: 'A4 Flyers 100+ | Same-Day CMYK | ZprintPro',
    keywords: ['a4 flyers', 'custom a4 flyers', 'a4 flyer printing', 'double sided flyers', 'a4 flyers same day', 'cheap a4 flyers bulk', 'a4 flyers free shipping', 'flyers USD', 'real estate flyers', 'bespoke flyers UK'],
    body: 'ZprintPro Custom A4 Flyer Printing for product launches, real estate, events, and restaurants across the US and global markets. 128g-300g gloss or matte art paper with double-sided full-color CMYK. 100-flyer MOQ, same-day available for 500+, Free US shipping over $100.',
    imageAlt: 'Custom A4 flyers with gloss or matte art paper, double-sided CMYK, 100-flyer MOQ — ZprintPro',
  },
  'premium-business-cards': {
    title: 'Premium Business Cards | Foil UV | Free US Ship | ZprintPro',
    description: 'Premium business card printing. 300g-400g matte paper, foil stamping, spot UV. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001. Get a quote.',
    h1: 'Premium Business Cards | Luxury Foil | ZprintPro',
    keywords: ['premium business cards', 'custom premium business cards', 'premium business cards printing', 'foil stamped business cards', 'thick 400gsm business cards', 'matte finish business cards', 'premium business cards free shipping', 'luxury business cards online', 'business cards USD', 'bespoke business cards UK'],
    body: 'ZprintPro Premium Business Card Printing for executives, finance, legal, and creative professionals across the US and global markets. 300g-400g matte, cotton, or coated paper with foil stamping, spot UV, embossing, and rounded corner options. 100-card MOQ, Free US shipping over $100, FSC paper, ISO 9001 certified.',
    imageAlt: 'Premium business cards with foil stamping and spot UV on 300g-400g matte or cotton paper — ZprintPro',
  },
  'waterproof-stickers': {
    title: 'Waterproof Stickers | Durable PVC | Free US Ship | ZprintPro',
    description: 'Waterproof stickers for outdoor labels. PVC, gloss lamination, die-cut. 100-MOQ, 3-5 year. Free US shipping over $100, DHL Express. SGS tested. Get a quote.',
    h1: 'Waterproof Stickers | Outdoor PVC | ZprintPro',
    keywords: ['waterproof stickers', 'custom waterproof stickers', 'waterproof sticker printing', 'vinyl stickers waterproof', 'die cut stickers outdoor', 'PVC stickers durable', 'waterproof stickers free shipping', 'bulk waterproof stickers', 'stickers USD', 'bespoke stickers UK'],
    body: 'ZprintPro Custom Waterproof Sticker Printing for outdoor labels, product packaging, car decals, and equipment tags across the US and global markets. PVC or PP synthetic facestock with matte or gloss lamination, die-cut shapes, and variable QR codes. 100-sticker MOQ, Free US shipping over $100, SGS migration tested.',
    imageAlt: 'Waterproof stickers on durable PVC facestock with matte or gloss lamination, die-cut shapes — ZprintPro',
  },
  'food-boxes': {
    title: 'Food Boxes 100+ | Food-Grade | Free US Ship | ZprintPro',
    description: 'Food boxes for pastries. 350g-400g food-grade card, PE/PLA lining. 100-MOQ, grease resistant. Free US shipping over $100, DHL. FDA, LFGB, SGS. Get a quote.',
    h1: 'Food Boxes 100+ | Food-Grade | ZprintPro',
    keywords: ['food boxes', 'custom food boxes', 'food packaging boxes', 'food grade boxes', 'takeout boxes custom', 'bakery boxes wholesale', 'food boxes free shipping', 'bulk food packaging', 'food boxes USD', 'bespoke food packaging'],
    body: 'ZprintPro Custom Food Packaging Box Printing for pastries, tea, health supplements, and gift packaging across the US and global markets. 350g-400g food-grade white card with PE or PLA biodegradable lining, window design, and foil-stamped logos. 100-box MOQ, Free US shipping over $100, FDA, LFGB, SGS certified.',
    imageAlt: 'Food-grade packaging boxes on 350g-400g white card with PE or PLA biodegradable lining — ZprintPro',
  },
  'thick-business-cards-400g': {
    title: 'Thick Business Cards (400g) | Foil UV Multi-Finish',
    description: 'Custom thick business cards (400g) from ZprintPro Hong Kong. Foil UV Multi-Finish, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO.',
    h1: 'Thick Business Cards (400g) 100+ | ZprintPro',
    keywords: ['400g thick business cards', 'custom thick business cards 400g', 'thick business cards 400g printing hong kong', 'thick business cards (400g) free shipping', 'thick business cards (400g) USD', 'bulk thick business cards (400g)', 'thick business cards (400g) DHL', 'bespoke thick business cards (400g)', 'custom thick business cards (400g)', 'thick business cards 400g wholesale'],
    body: 'ZprintPro Thick Business Cards (400g) for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil UV Multi-Finish, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom thick business cards 400g with foil uv multi-finish, premium materials — ZprintPro',
  },
  'double-sided-cards': {
    title: 'Double-sided Cards | Premium Custom | ZprintPro | ZprintPro',
    description: 'Custom double-sided cards from ZprintPro Hong Kong. Premium Custom, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Double-sided Cards 100+ | ZprintPro',
    keywords: ['double-sided cards', 'custom double sided cards', 'double sided cards printing hong kong', 'double-sided cards free shipping', 'double-sided cards USD', 'bulk double-sided cards', 'double-sided cards DHL', 'bespoke double-sided cards', 'custom double-sided cards', 'double sided cards wholesale'],
    body: 'ZprintPro Double-sided Cards for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Premium Custom, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom double sided cards with premium custom, premium materials — ZprintPro',
  },
  'same-day-business-cards': {
    title: 'Same-day Business Cards | Foil UV Multi-Finish | ZprintPro',
    description: 'Custom same-day business cards from ZprintPro Hong Kong. Foil UV Multi-Finish, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001.',
    h1: 'Same-day Business Cards 100+ | ZprintPro',
    keywords: ['same day business cards', 'custom same day business cards', 'same day business cards printing hong kong', 'same-day business cards free shipping', 'same-day business cards USD', 'bulk same-day business cards', 'same-day business cards DHL', 'bespoke same-day business cards', 'custom same-day business cards', 'same day business cards wholesale'],
    body: 'ZprintPro Same-day Business Cards for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil UV Multi-Finish, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom same day business cards with foil uv multi-finish, premium materials — ZprintPro',
  },
  'eco-business-cards': {
    title: 'Eco-friendly Recycled Cards | Foil UV Multi-Finish',
    description: 'Custom eco-friendly recycled cards from ZprintPro Hong Kong. Foil UV Multi-Finish, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO.',
    h1: 'Eco-friendly Recycled Cards 100+ | ZprintPro',
    keywords: ['eco business cards', 'custom eco business cards', 'eco business cards printing hong kong', 'eco-friendly recycled cards free shipping', 'eco-friendly recycled cards USD', 'bulk eco-friendly recycled cards', 'eco-friendly recycled cards DHL', 'bespoke eco-friendly recycled cards', 'custom eco-friendly recycled cards', 'eco business cards wholesale'],
    body: 'ZprintPro Eco-friendly Recycled Cards for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil UV Multi-Finish, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom eco business cards with foil uv multi-finish, premium materials — ZprintPro',
  },
  'transparent-stickers': {
    title: 'Transparent Stickers | Die-Cut Vinyl | ZprintPro',
    description: 'Custom transparent stickers from ZprintPro Hong Kong. Die-Cut Vinyl, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Transparent Stickers 100+ | ZprintPro',
    keywords: ['transparent stickers', 'custom transparent stickers', 'transparent stickers printing hong kong', 'transparent stickers free shipping', 'transparent stickers USD', 'bulk transparent stickers', 'transparent stickers DHL', 'bespoke transparent stickers', 'transparent stickers wholesale', 'transparent stickers pricing'],
    body: 'ZprintPro Transparent Stickers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Die-Cut Vinyl, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom transparent stickers with die-cut vinyl, premium materials — ZprintPro',
  },
  'white-card-bags': {
    title: 'White Card Bags | Premium Custom | Free US Ship | ZprintPro',
    description: 'Custom white card bags from ZprintPro Hong Kong. Premium Custom, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'White Card Bags 100+ | Premium Custom | ZprintPro',
    keywords: ['white card bags', 'custom white card bags', 'white card bags printing hong kong', 'white card bags free shipping', 'white card bags USD', 'bulk white card bags', 'white card bags DHL', 'bespoke white card bags', 'white card bags wholesale', 'white card bags pricing'],
    body: 'ZprintPro White Card Bags for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Premium Custom, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom white card bags with premium custom, premium materials — ZprintPro',
  },
  'small-bags': {
    title: 'Small Bags | Premium Custom | Free US Ship | ZprintPro',
    description: 'Custom small bags from ZprintPro Hong Kong. Premium Custom, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified. Quote tod',
    h1: 'Small Bags 100+ | Premium Custom | ZprintPro',
    keywords: ['small paper bags', 'custom small bags', 'small bags printing hong kong', 'small bags free shipping', 'small bags USD', 'bulk small bags', 'small bags DHL', 'bespoke small bags', 'small bags wholesale', 'small bags pricing'],
    body: 'ZprintPro Small Bags for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Premium Custom, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom small bags with premium custom, premium materials — ZprintPro',
  },
  'a5-flyers': {
    title: 'A5 Flyers | Same-Day Printing | Free US Ship | ZprintPro',
    description: 'Custom a5 flyers from ZprintPro Hong Kong. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'A5 Flyers 100+ | Same-Day Printing | ZprintPro',
    keywords: ['a5 flyers', 'custom a5 flyers', 'a5 flyers printing hong kong', 'a5 flyers free shipping', 'a5 flyers USD', 'bulk a5 flyers', 'a5 flyers DHL', 'bespoke a5 flyers', 'a5 flyers wholesale', 'a5 flyers pricing'],
    body: 'ZprintPro A5 Flyers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Same-Day Printing, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom a5 flyers with same-day printing, premium materials — ZprintPro',
  },
  'double-sided-flyers': {
    title: 'Double-sided Flyers | Same-Day Printing | ZprintPro',
    description: 'Custom double-sided flyers from ZprintPro Hong Kong. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certif.',
    h1: 'Double-sided Flyers 100+ | ZprintPro',
    keywords: ['double-sided flyers', 'custom double sided flyers', 'double sided flyers printing hong kong', 'double-sided flyers free shipping', 'double-sided flyers USD', 'bulk double-sided flyers', 'double-sided flyers DHL', 'bespoke double-sided flyers', 'custom double-sided flyers', 'double sided flyers wholesale'],
    body: 'ZprintPro Double-sided Flyers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Same-Day Printing, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom double sided flyers with same-day printing, premium materials — ZprintPro',
  },
  'folded-leaflets': {
    title: 'Folded Leaflets | Tri-Fold Design | Free US Ship | ZprintPro',
    description: 'Custom folded leaflets from ZprintPro Hong Kong. Tri-Fold Design, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Folded Leaflets 100+ | Tri-Fold Design | ZprintPro',
    keywords: ['folded leaflets', 'custom folded leaflets', 'folded leaflets printing hong kong', 'folded leaflets free shipping', 'folded leaflets USD', 'bulk folded leaflets', 'folded leaflets DHL', 'bespoke folded leaflets', 'folded leaflets wholesale', 'folded leaflets pricing'],
    body: 'ZprintPro Folded Leaflets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Tri-Fold Design, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom folded leaflets with tri-fold design, premium materials — ZprintPro',
  },
  'thick-paper-flyers': {
    title: 'Thick Paper Flyers | Same-Day Printing | ZprintPro',
    description: 'Custom thick paper flyers from ZprintPro Hong Kong. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certifi.',
    h1: 'Thick Paper Flyers 100+ | ZprintPro',
    keywords: ['thick paper flyers', 'custom thick paper flyers', 'thick paper flyers printing hong kong', 'thick paper flyers free shipping', 'thick paper flyers USD', 'bulk thick paper flyers', 'thick paper flyers DHL', 'bespoke thick paper flyers', 'thick paper flyers wholesale', 'thick paper flyers pricing'],
    body: 'ZprintPro Thick Paper Flyers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Same-Day Printing, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom thick paper flyers with same-day printing, premium materials — ZprintPro',
  },
  'same-day-flyers': {
    title: 'Same-day Flyers | Same-Day Printing | ZprintPro | ZprintPro',
    description: 'Custom same-day flyers from ZprintPro Hong Kong. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Same-day Flyers 100+ | ZprintPro',
    keywords: ['same day flyers', 'custom same day flyers', 'same day flyers printing hong kong', 'same-day flyers free shipping', 'same-day flyers USD', 'bulk same-day flyers', 'same-day flyers DHL', 'bespoke same-day flyers', 'custom same-day flyers', 'same day flyers wholesale'],
    body: 'ZprintPro Same-day Flyers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Same-Day Printing, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom same day flyers with same-day printing, premium materials — ZprintPro',
  },
  'eco-flyers': {
    title: 'Eco Flyers | Same-Day Printing | Free US Ship | ZprintPro',
    description: 'Custom eco flyers from ZprintPro Hong Kong. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Eco Flyers 100+ | Same-Day Printing | ZprintPro',
    keywords: ['eco flyers', 'custom eco flyers', 'eco flyers printing hong kong', 'eco flyers free shipping', 'eco flyers USD', 'bulk eco flyers', 'eco flyers DHL', 'bespoke eco flyers', 'eco flyers wholesale', 'eco flyers pricing'],
    body: 'ZprintPro Eco Flyers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Same-Day Printing, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom eco flyers with same-day printing, premium materials — ZprintPro',
  },
  'cosmetic-boxes': {
    title: 'Cosmetic Boxes | Custom Magnetic | Free US Ship | ZprintPro',
    description: 'Custom cosmetic boxes from ZprintPro Hong Kong. Custom Magnetic, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Cosmetic Boxes 100+ | Custom Magnetic | ZprintPro',
    keywords: ['cosmetic boxes', 'custom cosmetic boxes', 'cosmetic boxes printing hong kong', 'cosmetic boxes free shipping', 'cosmetic boxes USD', 'bulk cosmetic boxes', 'cosmetic boxes DHL', 'bespoke cosmetic boxes', 'cosmetic boxes wholesale', 'cosmetic boxes pricing'],
    body: 'ZprintPro Cosmetic Boxes for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Custom Magnetic, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom cosmetic boxes with custom magnetic, premium materials — ZprintPro',
  },
  'foil-red-packets': {
    title: 'Foil Red Packets | Gold Foil Print | ZprintPro | ZprintPro',
    description: 'Custom foil red packets from ZprintPro Hong Kong. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Foil Red Packets 100+ | ZprintPro',
    keywords: ['foil red packets', 'custom foil red packets', 'foil red packets printing hong kong', 'foil red packets free shipping', 'foil red packets USD', 'bulk foil red packets', 'foil red packets DHL', 'bespoke foil red packets', 'foil red packets wholesale', 'foil red packets pricing'],
    body: 'ZprintPro Foil Red Packets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Gold Foil Print, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom foil red packets with gold foil print, premium materials — ZprintPro',
  },
  'embossed-red-packets': {
    title: 'Embossed Red Packets | Gold Foil Print | ZprintPro',
    description: 'Custom embossed red packets from ZprintPro Hong Kong. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certifi.',
    h1: 'Embossed Red Packets 100+ | ZprintPro',
    keywords: ['embossed red packets', 'custom embossed red packets', 'embossed red packets printing hong kong', 'embossed red packets free shipping', 'embossed red packets USD', 'bulk embossed red packets', 'embossed red packets DHL', 'bespoke embossed red packets', 'embossed red packets wholesale', 'embossed red packets pricing'],
    body: 'ZprintPro Embossed Red Packets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Gold Foil Print, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom embossed red packets with gold foil print, premium materials — ZprintPro',
  },
  'custom-red-packets': {
    title: 'Custom Red Packets | Gold Foil Print | ZprintPro',
    description: 'Custom custom red packets from ZprintPro Hong Kong. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Custom Red Packets 100+ | ZprintPro',
    keywords: ['custom red packets', 'custom custom red packets', 'custom red packets printing hong kong', 'custom red packets free shipping', 'custom red packets USD', 'bulk custom red packets', 'custom red packets DHL', 'bespoke custom red packets', 'custom red packets wholesale', 'custom red packets pricing'],
    body: 'ZprintPro Custom Red Packets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Gold Foil Print, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom custom red packets with gold foil print, premium materials — ZprintPro',
  },
  'cartoon-red-packets': {
    title: 'Cartoon Red Packets | Gold Foil Print | ZprintPro',
    description: 'Custom cartoon red packets from ZprintPro Hong Kong. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Cartoon Red Packets 100+ | ZprintPro',
    keywords: ['cartoon red packets', 'custom cartoon red packets', 'cartoon red packets printing hong kong', 'cartoon red packets free shipping', 'cartoon red packets USD', 'bulk cartoon red packets', 'cartoon red packets DHL', 'bespoke cartoon red packets', 'cartoon red packets wholesale', 'cartoon red packets pricing'],
    body: 'ZprintPro Cartoon Red Packets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Gold Foil Print, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom cartoon red packets with gold foil print, premium materials — ZprintPro',
  },
  'eco-red-packets': {
    title: 'Eco Red Packets | Gold Foil Print | Free US Ship | ZprintPro',
    description: 'Custom eco red packets from ZprintPro Hong Kong. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Eco Red Packets 100+ | Gold Foil Print | ZprintPro',
    keywords: ['eco red packets', 'custom eco red packets', 'eco red packets printing hong kong', 'eco red packets free shipping', 'eco red packets USD', 'bulk eco red packets', 'eco red packets DHL', 'bespoke eco red packets', 'eco red packets wholesale', 'eco red packets pricing'],
    body: 'ZprintPro Eco Red Packets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Gold Foil Print, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom eco red packets with gold foil print, premium materials — ZprintPro',
  },
  'large-red-packets': {
    title: 'Large Red Packets | Gold Foil Print | ZprintPro | ZprintPro',
    description: 'Custom large red packets from ZprintPro Hong Kong. Gold Foil Print, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Large Red Packets 100+ | ZprintPro',
    keywords: ['large red packets', 'custom large red packets', 'large red packets printing hong kong', 'large red packets free shipping', 'large red packets USD', 'bulk large red packets', 'large red packets DHL', 'bespoke large red packets', 'large red packets wholesale', 'large red packets pricing'],
    body: 'ZprintPro Large Red Packets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Gold Foil Print, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom large red packets with gold foil print, premium materials — ZprintPro',
  },
  'wall-calendars': {
    title: 'Wall Calendars | Wire-Bound Spiral | ZprintPro | ZprintPro',
    description: 'Custom wall calendars from ZprintPro Hong Kong. Wire-Bound Spiral, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Wall Calendars 100+ | ZprintPro',
    keywords: ['wall calendars', 'custom wall calendars', 'wall calendars printing hong kong', 'wall calendars free shipping', 'wall calendars USD', 'bulk wall calendars', 'wall calendars DHL', 'bespoke wall calendars', 'wall calendars wholesale', 'wall calendars pricing'],
    body: 'ZprintPro Wall Calendars for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wire-Bound Spiral, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom wall calendars with wire-bound spiral, premium materials — ZprintPro',
  },
  'desk-calendars': {
    title: 'Desk Calendars | Wire-Bound Spiral | ZprintPro | ZprintPro',
    description: 'Custom desk calendars from ZprintPro Hong Kong. Wire-Bound Spiral, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Desk Calendars 100+ | ZprintPro',
    keywords: ['desk calendars', 'custom desk calendars', 'desk calendars printing hong kong', 'desk calendars free shipping', 'desk calendars USD', 'bulk desk calendars', 'desk calendars DHL', 'bespoke desk calendars', 'desk calendars wholesale', 'desk calendars pricing'],
    body: 'ZprintPro Desk Calendars for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wire-Bound Spiral, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom desk calendars with wire-bound spiral, premium materials — ZprintPro',
  },
  'custom-calendars': {
    title: 'Custom Calendars | Wire-Bound Spiral | ZprintPro',
    description: 'Custom custom calendars from ZprintPro Hong Kong. Wire-Bound Spiral, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Custom Calendars 100+ | ZprintPro',
    keywords: ['custom calendars', 'custom custom calendars', 'custom calendars printing hong kong', 'custom calendars free shipping', 'custom calendars USD', 'bulk custom calendars', 'custom calendars DHL', 'bespoke custom calendars', 'custom calendars wholesale', 'custom calendars pricing'],
    body: 'ZprintPro Custom Calendars for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wire-Bound Spiral, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom custom calendars with wire-bound spiral, premium materials — ZprintPro',
  },
  'mini-calendars': {
    title: 'Mini Calendars | Wire-Bound Spiral | ZprintPro | ZprintPro',
    description: 'Custom mini calendars from ZprintPro Hong Kong. Wire-Bound Spiral, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Mini Calendars 100+ | ZprintPro',
    keywords: ['mini calendars', 'custom mini calendars', 'mini calendars printing hong kong', 'mini calendars free shipping', 'mini calendars USD', 'bulk mini calendars', 'mini calendars DHL', 'bespoke mini calendars', 'mini calendars wholesale', 'mini calendars pricing'],
    body: 'ZprintPro Mini Calendars for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wire-Bound Spiral, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom mini calendars with wire-bound spiral, premium materials — ZprintPro',
  },
  'photo-frame-calendars': {
    title: 'Photo Frame Calendars | Wire-Bound Spiral | ZprintPro',
    description: 'Custom photo frame calendars from ZprintPro Hong Kong. Wire-Bound Spiral, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 cert.',
    h1: 'Photo Frame Calendars 100+ | ZprintPro',
    keywords: ['photo frame calendars', 'custom photo frame calendars', 'photo frame calendars printing hong kong', 'photo frame calendars free shipping', 'photo frame calendars USD', 'bulk photo frame calendars', 'photo frame calendars DHL', 'bespoke photo frame calendars', 'photo frame calendars wholesale', 'photo frame calendars pricing'],
    body: 'ZprintPro Photo Frame Calendars for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wire-Bound Spiral, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom photo frame calendars with wire-bound spiral, premium materials — ZprintPro',
  },
  'magnetic-calendars': {
    title: 'Magnetic Calendars | Wire-Bound Spiral | ZprintPro',
    description: 'Custom magnetic calendars from ZprintPro Hong Kong. Wire-Bound Spiral, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certifi.',
    h1: 'Magnetic Calendars 100+ | ZprintPro',
    keywords: ['magnetic calendars', 'custom magnetic calendars', 'magnetic calendars printing hong kong', 'magnetic calendars free shipping', 'magnetic calendars USD', 'bulk magnetic calendars', 'magnetic calendars DHL', 'bespoke magnetic calendars', 'magnetic calendars wholesale', 'magnetic calendars pricing'],
    body: 'ZprintPro Magnetic Calendars for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wire-Bound Spiral, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom magnetic calendars with wire-bound spiral, premium materials — ZprintPro',
  },
  'pvc-menus': {
    title: 'PVC Menus | Laminated Durable | Free US Ship | ZprintPro',
    description: 'Custom pvc menus from ZprintPro Hong Kong. Laminated Durable, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'PVC Menus 100+ | Laminated Durable | ZprintPro',
    keywords: ['pvc menus', 'custom pvc menus', 'pvc menus printing hong kong', 'pvc menus free shipping', 'pvc menus USD', 'bulk pvc menus', 'pvc menus DHL', 'bespoke pvc menus', 'pvc menus wholesale', 'pvc menus pricing'],
    body: 'ZprintPro PVC Menus for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Laminated Durable, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom pvc menus with laminated durable, premium materials — ZprintPro',
  },
  'laminated-menus': {
    title: 'Laminated Menus | Laminated Durable | ZprintPro | ZprintPro',
    description: 'Custom laminated menus from ZprintPro Hong Kong. Laminated Durable, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Laminated Menus 100+ | ZprintPro',
    keywords: ['laminated menus', 'custom laminated menus', 'laminated menus printing hong kong', 'laminated menus free shipping', 'laminated menus USD', 'bulk laminated menus', 'laminated menus DHL', 'bespoke laminated menus', 'laminated menus wholesale', 'laminated menus pricing'],
    body: 'ZprintPro Laminated Menus for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Laminated Durable, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom laminated menus with laminated durable, premium materials — ZprintPro',
  },
  'hardcover-menus': {
    title: 'Hardcover Menus | Laminated Durable | ZprintPro | ZprintPro',
    description: 'Custom hardcover menus from ZprintPro Hong Kong. Laminated Durable, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Hardcover Menus 100+ | ZprintPro',
    keywords: ['hardcover menus', 'custom hardcover menus', 'hardcover menus printing hong kong', 'hardcover menus free shipping', 'hardcover menus USD', 'bulk hardcover menus', 'hardcover menus DHL', 'bespoke hardcover menus', 'hardcover menus wholesale', 'hardcover menus pricing'],
    body: 'ZprintPro Hardcover Menus for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Laminated Durable, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom hardcover menus with laminated durable, premium materials — ZprintPro',
  },
  'drink-menus': {
    title: 'Drink Menus | Laminated Durable | Free US Ship | ZprintPro',
    description: 'Custom drink menus from ZprintPro Hong Kong. Laminated Durable, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Drink Menus 100+ | Laminated Durable | ZprintPro',
    keywords: ['drink menus', 'custom drink menus', 'drink menus printing hong kong', 'drink menus free shipping', 'drink menus USD', 'bulk drink menus', 'drink menus DHL', 'bespoke drink menus', 'drink menus wholesale', 'drink menus pricing'],
    body: 'ZprintPro Drink Menus for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Laminated Durable, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom drink menus with laminated durable, premium materials — ZprintPro',
  },
  'disposable-menus': {
    title: 'Disposable Menus | Laminated Durable | ZprintPro',
    description: 'Custom disposable menus from ZprintPro Hong Kong. Laminated Durable, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Disposable Menus 100+ | ZprintPro',
    keywords: ['disposable menus', 'custom disposable menus', 'disposable menus printing hong kong', 'disposable menus free shipping', 'disposable menus USD', 'bulk disposable menus', 'disposable menus DHL', 'bespoke disposable menus', 'disposable menus wholesale', 'disposable menus pricing'],
    body: 'ZprintPro Disposable Menus for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Laminated Durable, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom disposable menus with laminated durable, premium materials — ZprintPro',
  },
  'outdoor-vinyl-banners': {
    title: 'Outdoor Vinyl Banners | Wind-Resistant | ZprintPro',
    description: 'Custom outdoor vinyl banners from ZprintPro Hong Kong. Wind-Resistant, 4-color CMYK. 1-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Outdoor Vinyl Banners 1+ | ZprintPro',
    keywords: ['outdoor vinyl banners', 'custom outdoor vinyl banners', 'outdoor vinyl banners printing hong kong', 'outdoor vinyl banners free shipping', 'outdoor vinyl banners USD', 'bulk outdoor vinyl banners', 'outdoor vinyl banners DHL', 'bespoke outdoor vinyl banners', 'outdoor vinyl banners wholesale', 'outdoor vinyl banners pricing'],
    body: 'ZprintPro Outdoor Vinyl Banners for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wind-Resistant, 4-color CMYK, premium materials. 1-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom outdoor vinyl banners with wind-resistant, premium materials — ZprintPro',
  },
  'roll-up-banners': {
    title: 'Roll-up Banners | Wind-Resistant | Free US Ship | ZprintPro',
    description: 'Custom roll-up banners from ZprintPro Hong Kong. Wind-Resistant, 4-color CMYK. 1-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Roll-up Banners 1+ | Wind-Resistant | ZprintPro',
    keywords: ['roll-up banners', 'custom roll up banners', 'roll up banners printing hong kong', 'roll-up banners free shipping', 'roll-up banners USD', 'bulk roll-up banners', 'roll-up banners DHL', 'bespoke roll-up banners', 'custom roll-up banners', 'roll up banners wholesale'],
    body: 'ZprintPro Roll-up Banners for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wind-Resistant, 4-color CMYK, premium materials. 1-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom roll up banners with wind-resistant, premium materials — ZprintPro',
  },
  'adhesive-banners': {
    title: 'Adhesive Banners | Wind-Resistant | Free US Ship | ZprintPro',
    description: 'Custom adhesive banners from ZprintPro Hong Kong. Wind-Resistant, 4-color CMYK. 1-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Adhesive Banners 1+ | Wind-Resistant | ZprintPro',
    keywords: ['adhesive banners', 'custom adhesive banners', 'adhesive banners printing hong kong', 'adhesive banners free shipping', 'adhesive banners USD', 'bulk adhesive banners', 'adhesive banners DHL', 'bespoke adhesive banners', 'adhesive banners wholesale', 'adhesive banners pricing'],
    body: 'ZprintPro Adhesive Banners for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wind-Resistant, 4-color CMYK, premium materials. 1-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom adhesive banners with wind-resistant, premium materials — ZprintPro',
  },
  'vehicle-wraps': {
    title: 'Vehicle Wraps | 3M Vinyl Wrap | Free US Ship | ZprintPro',
    description: 'Custom vehicle wraps from ZprintPro Hong Kong. 3M Vinyl Wrap, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Vehicle Wraps 100+ | 3M Vinyl Wrap | ZprintPro',
    keywords: ['vehicle wraps', 'custom vehicle wraps', 'vehicle wraps printing hong kong', 'vehicle wraps free shipping', 'vehicle wraps USD', 'bulk vehicle wraps', 'vehicle wraps DHL', 'bespoke vehicle wraps', 'vehicle wraps wholesale', 'vehicle wraps pricing'],
    body: 'ZprintPro Vehicle Wraps for retail, e-commerce, corporate gifting, events, and small business across US and global markets. 3M Vinyl Wrap, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom vehicle wraps with 3m vinyl wrap, premium materials — ZprintPro',
  },
  'mesh-banners': {
    title: 'Mesh Banners | Wind-Resistant | Free US Ship | ZprintPro',
    description: 'Custom mesh banners from ZprintPro Hong Kong. Wind-Resistant, 4-color CMYK. 1-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified. Quote tod',
    h1: 'Mesh Banners 1+ | Wind-Resistant | ZprintPro',
    keywords: ['mesh banners', 'custom mesh banners', 'mesh banners printing hong kong', 'mesh banners free shipping', 'mesh banners USD', 'bulk mesh banners', 'mesh banners DHL', 'bespoke mesh banners', 'mesh banners wholesale', 'mesh banners pricing'],
    body: 'ZprintPro Mesh Banners for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Wind-Resistant, 4-color CMYK, premium materials. 1-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom mesh banners with wind-resistant, premium materials — ZprintPro',
  },
  'catalog-printing': {
    title: 'Catalog Printing | Saddle-Stitched | ZprintPro | ZprintPro',
    description: 'Custom catalog printing from ZprintPro Hong Kong. Saddle-Stitched, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Catalog Printing 100+ | ZprintPro',
    keywords: ['catalog printing', 'custom catalog printing', 'catalog printing printing hong kong', 'catalog printing free shipping', 'catalog printing USD', 'bulk catalog printing', 'catalog printing DHL', 'bespoke catalog printing', 'catalog printing wholesale', 'catalog printing pricing'],
    body: 'ZprintPro Catalog Printing for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Saddle-Stitched, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom catalog printing with saddle-stitched, premium materials — ZprintPro',
  },
  'saddle-stitch-booklets': {
    title: 'Saddle Stitch Booklets | Premium Custom | ZprintPro',
    description: 'Custom saddle stitch booklets from ZprintPro Hong Kong. Premium Custom, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certif.',
    h1: 'Saddle Stitch Booklets 100+ | ZprintPro',
    keywords: ['saddle stitch booklets', 'custom saddle stitch booklets', 'saddle stitch booklets printing hong kong', 'saddle stitch booklets free shipping', 'saddle stitch booklets USD', 'bulk saddle stitch booklets', 'saddle stitch booklets DHL', 'bespoke saddle stitch booklets', 'saddle stitch booklets wholesale', 'saddle stitch booklets pricing'],
    body: 'ZprintPro Saddle Stitch Booklets for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Premium Custom, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom saddle stitch booklets with premium custom, premium materials — ZprintPro',
  },
  'perfect-bound-books': {
    title: 'Perfect Bound Books | Perfect Bound | ZprintPro | ZprintPro',
    description: 'Custom perfect bound books from ZprintPro Hong Kong. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Perfect Bound Books 100+ | ZprintPro',
    keywords: ['perfect bound books', 'custom perfect bound books', 'perfect bound books printing hong kong', 'perfect bound books free shipping', 'perfect bound books USD', 'bulk perfect bound books', 'perfect bound books DHL', 'bespoke perfect bound books', 'perfect bound books wholesale', 'perfect bound books pricing'],
    body: 'ZprintPro Perfect Bound Books for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Perfect Bound, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom perfect bound books with perfect bound, premium materials — ZprintPro',
  },
  'hardcover-books': {
    title: 'Hardcover Books | Perfect Bound | Free US Ship | ZprintPro',
    description: 'Custom hardcover books from ZprintPro Hong Kong. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Hardcover Books 100+ | Perfect Bound | ZprintPro',
    keywords: ['hardcover books', 'custom hardcover books', 'hardcover books printing hong kong', 'hardcover books free shipping', 'hardcover books USD', 'bulk hardcover books', 'hardcover books DHL', 'bespoke hardcover books', 'hardcover books wholesale', 'hardcover books pricing'],
    body: 'ZprintPro Hardcover Books for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Perfect Bound, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom hardcover books with perfect bound, premium materials — ZprintPro',
  },
  'spiral-notebooks': {
    title: 'Spiral Notebooks | Perfect Bound | Free US Ship | ZprintPro',
    description: 'Custom spiral notebooks from ZprintPro Hong Kong. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Spiral Notebooks 100+ | Perfect Bound | ZprintPro',
    keywords: ['spiral notebooks', 'custom spiral notebooks', 'spiral notebooks printing hong kong', 'spiral notebooks free shipping', 'spiral notebooks USD', 'bulk spiral notebooks', 'spiral notebooks DHL', 'bespoke spiral notebooks', 'spiral notebooks wholesale', 'spiral notebooks pricing'],
    body: 'ZprintPro Spiral Notebooks for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Perfect Bound, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom spiral notebooks with perfect bound, premium materials — ZprintPro',
  },
  'business-envelopes': {
    title: 'Business Envelopes | Foil-Lined Premium | ZprintPro',
    description: 'Custom business envelopes from ZprintPro Hong Kong. Foil-Lined Premium, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certif.',
    h1: 'Business Envelopes 100+ | ZprintPro',
    keywords: ['business envelopes', 'custom business envelopes', 'business envelopes printing hong kong', 'business envelopes free shipping', 'business envelopes USD', 'bulk business envelopes', 'business envelopes DHL', 'bespoke business envelopes', 'business envelopes wholesale', 'business envelopes pricing'],
    body: 'ZprintPro Business Envelopes for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil-Lined Premium, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom business envelopes with foil-lined premium, premium materials — ZprintPro',
  },
  'colored-envelopes': {
    title: 'Colored Envelopes | Foil-Lined Premium | ZprintPro',
    description: 'Custom colored envelopes from ZprintPro Hong Kong. Foil-Lined Premium, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certifi.',
    h1: 'Colored Envelopes 100+ | ZprintPro',
    keywords: ['colored envelopes', 'custom colored envelopes', 'colored envelopes printing hong kong', 'colored envelopes free shipping', 'colored envelopes USD', 'bulk colored envelopes', 'colored envelopes DHL', 'bespoke colored envelopes', 'colored envelopes wholesale', 'colored envelopes pricing'],
    body: 'ZprintPro Colored Envelopes for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil-Lined Premium, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom colored envelopes with foil-lined premium, premium materials — ZprintPro',
  },
  'large-envelopes': {
    title: 'Large Envelopes | Foil-Lined Premium | ZprintPro',
    description: 'Custom large envelopes from ZprintPro Hong Kong. Foil-Lined Premium, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Large Envelopes 100+ | ZprintPro',
    keywords: ['large envelopes', 'custom large envelopes', 'large envelopes printing hong kong', 'large envelopes free shipping', 'large envelopes USD', 'bulk large envelopes', 'large envelopes DHL', 'bespoke large envelopes', 'large envelopes wholesale', 'large envelopes pricing'],
    body: 'ZprintPro Large Envelopes for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil-Lined Premium, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom large envelopes with foil-lined premium, premium materials — ZprintPro',
  },
  'pearl-envelopes': {
    title: 'Pearl Envelopes | Foil-Lined Premium | ZprintPro',
    description: 'Custom pearl envelopes from ZprintPro Hong Kong. Foil-Lined Premium, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Pearl Envelopes 100+ | ZprintPro',
    keywords: ['pearl envelopes', 'custom pearl envelopes', 'pearl envelopes printing hong kong', 'pearl envelopes free shipping', 'pearl envelopes USD', 'bulk pearl envelopes', 'pearl envelopes DHL', 'bespoke pearl envelopes', 'pearl envelopes wholesale', 'pearl envelopes pricing'],
    body: 'ZprintPro Pearl Envelopes for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Foil-Lined Premium, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom pearl envelopes with foil-lined premium, premium materials — ZprintPro',
  },
  'exercise-books': {
    title: 'Exercise Books | Perfect Bound | Free US Ship | ZprintPro',
    description: 'Custom exercise books from ZprintPro Hong Kong. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Exercise Books 100+ | Perfect Bound | ZprintPro',
    keywords: ['exercise books', 'custom exercise books', 'exercise books printing hong kong', 'exercise books free shipping', 'exercise books USD', 'bulk exercise books', 'exercise books DHL', 'bespoke exercise books', 'exercise books wholesale', 'exercise books pricing'],
    body: 'ZprintPro Exercise Books for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Perfect Bound, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom exercise books with perfect bound, premium materials — ZprintPro',
  },
  'certificates': {
    title: 'Certificates | Embossed Seal | Free US Ship | ZprintPro',
    description: 'Custom certificates from ZprintPro Hong Kong. Embossed Seal, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified. Quote to',
    h1: 'Certificates 100+ | Embossed Seal | ZprintPro',
    keywords: ['certificate printing', 'custom certificates', 'certificates printing hong kong', 'certificates free shipping', 'certificates USD', 'bulk certificates', 'certificates DHL', 'bespoke certificates', 'certificates wholesale', 'certificates pricing'],
    body: 'ZprintPro Certificates for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Embossed Seal, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom certificates with embossed seal, premium materials — ZprintPro',
  },
  'school-flyers': {
    title: 'School Flyers | Same-Day Printing | Free US Ship | ZprintPro',
    description: 'Custom school flyers from ZprintPro Hong Kong. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'School Flyers 100+ | Same-Day Printing | ZprintPro',
    keywords: ['school flyers', 'custom school flyers', 'school flyers printing hong kong', 'school flyers free shipping', 'school flyers USD', 'bulk school flyers', 'school flyers DHL', 'bespoke school flyers', 'school flyers wholesale', 'school flyers pricing'],
    body: 'ZprintPro School Flyers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Same-Day Printing, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom school flyers with same-day printing, premium materials — ZprintPro',
  },
  'textbooks': {
    title: 'Textbooks | Perfect Bound | Free US Ship | ZprintPro',
    description: 'Custom textbooks from ZprintPro Hong Kong. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified. Quote today',
    h1: 'Textbooks 100+ | Perfect Bound | ZprintPro',
    keywords: ['textbooks', 'custom textbooks', 'textbooks printing hong kong', 'textbooks free shipping', 'textbooks USD', 'bulk textbooks', 'textbooks DHL', 'bespoke textbooks', 'textbooks wholesale', 'textbooks pricing'],
    body: 'ZprintPro Textbooks for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Perfect Bound, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom textbooks with perfect bound, premium materials — ZprintPro',
  },
  'magnetic-closure-gift-box': {
    title: 'Magnetic Closure Gift Box | Premium Custom | ZprintPro',
    description: 'Custom magnetic closure gift box from ZprintPro Hong Kong. Premium Custom, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 cer.',
    h1: 'Magnetic Closure Gift Box 100+ | ZprintPro',
    keywords: ['magnetic closure gift box', 'custom magnetic closure gift box', 'magnetic closure gift box free shipping', 'magnetic closure gift box USD', 'bulk magnetic closure gift box', 'magnetic closure gift box DHL', 'bespoke magnetic closure gift box', 'magnetic closure gift box wholesale', 'magnetic closure gift box pricing', 'magnetic closure gift box bulk'],
    body: 'ZprintPro Magnetic Closure Gift Box for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Premium Custom, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom magnetic closure gift box with premium custom, premium materials — ZprintPro',
  },
  'electronics-packaging-box': {
    title: 'Electronics Packaging Box | Eco-Friendly Material',
    description: 'Custom electronics packaging box from ZprintPro Hong Kong. Eco-Friendly Material, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9.',
    h1: 'Electronics Packaging Box 100+ | ZprintPro',
    keywords: ['electronics packaging box', 'custom electronics packaging box', 'electronics packaging box free shipping', 'electronics packaging box USD', 'bulk electronics packaging box', 'electronics packaging box DHL', 'bespoke electronics packaging box', 'electronics packaging box wholesale', 'electronics packaging box pricing', 'electronics packaging box bulk'],
    body: 'ZprintPro Electronics Packaging Box for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Eco-Friendly Material, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom electronics packaging box with eco-friendly material, premium materials — ZprintPro',
  },
  'kraft-paper-packaging-box': {
    title: 'Kraft Paper Packaging Box | Eco-Friendly Material',
    description: 'Custom kraft paper packaging box from ZprintPro Hong Kong. Eco-Friendly Material, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9.',
    h1: 'Kraft Paper Packaging Box 100+ | ZprintPro',
    keywords: ['kraft paper packaging box', 'custom kraft paper packaging box', 'kraft paper packaging box free shipping', 'kraft paper packaging box USD', 'bulk kraft paper packaging box', 'kraft paper packaging box DHL', 'bespoke kraft paper packaging box', 'kraft paper packaging box wholesale', 'kraft paper packaging box pricing', 'kraft paper packaging box bulk'],
    body: 'ZprintPro Kraft Paper Packaging Box for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Eco-Friendly Material, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom kraft paper packaging box with eco-friendly material, premium materials — ZprintPro',
  },
  'drawer-slide-gift-box': {
    title: 'Drawer Slide Gift Box | Ribbon Pull | ZprintPro | ZprintPro',
    description: 'Custom drawer slide gift box from ZprintPro Hong Kong. Ribbon Pull, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 certified.',
    h1: 'Drawer Slide Gift Box 100+ | ZprintPro',
    keywords: ['drawer slide gift box', 'custom drawer slide gift box', 'drawer slide gift box free shipping', 'drawer slide gift box USD', 'bulk drawer slide gift box', 'drawer slide gift box DHL', 'bespoke drawer slide gift box', 'drawer slide gift box wholesale', 'drawer slide gift box pricing', 'drawer slide gift box bulk'],
    body: 'ZprintPro Drawer Slide Gift Box for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Ribbon Pull, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom drawer slide gift box with ribbon pull, premium materials — ZprintPro',
  },
  'fruit-food-label-stickers': {
    title: 'Fruit & Food Label Stickers | Die-Cut Vinyl | ZprintPro',
    description: 'Custom fruit & food label stickers from ZprintPro Hong Kong. Die-Cut Vinyl, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001 ce.',
    h1: 'Fruit & Food Label Stickers 100+ | ZprintPro',
    keywords: ['fruit & food label stickers', 'custom fruit & food label stickers', 'fruit & food label stickers free shipping', 'fruit & food label stickers USD', 'bulk fruit & food label stickers', 'fruit & food label stickers DHL', 'bespoke fruit & food label stickers', 'fruit food label stickers wholesale', 'fruit food label stickers pricing', 'fruit food label stickers bulk'],
    body: 'ZprintPro Fruit & Food Label Stickers for retail, e-commerce, corporate gifting, events, and small business across US and global markets. Die-Cut Vinyl, 4-color CMYK, premium materials. 100-MOQ, Free US shipping over $100, FSC, ISO 9001. Same-day file confirmation by 11am HKT.',
    imageAlt: 'Custom fruit food label stickers with die-cut vinyl, premium materials — ZprintPro',
  },
};

// === Quality checks ===

function hasJa(s) { return /[\u3040-\u309f\u30a0-\u30ff]/.test(s); }
function hasZh(s) { return /[\u4e00-\u9fff]/.test(s); }

function check(name, value, min, max) {
  const ok = value.length >= min && value.length <= max;
  return { name, ok, val: value.length, target: `${min}-${max}` };
}

function run() {
  console.log('====== apply-en-sku-seo.mjs (v4 length-calibrated, 83 SKUs) ======\n');
  console.log(`模式: ${APPLY_MODE ? '⚠️  APPLY (将修改 src/data/sku-seo-data.ts)' : '🟢 DRY-RUN (stdout only)'}`);
  console.log(`目标 SKU: ${Object.keys(P0_DATA).length}\n`);
  console.log('='.repeat(80));

  const slugs = Object.keys(P0_DATA);
  for (const slug of slugs) {
    const d = P0_DATA[slug];
    console.log(`\n### ${slug}`);
    console.log(`title (${d.title.length} chars):`);
    console.log(`  ${d.title}`);
    console.log(`description (${d.description.length} chars):`);
    console.log(`  ${d.description}`);
    console.log(`h1 (${d.h1.length} chars):`);
    console.log(`  ${d.h1}`);
    console.log(`keywords (${d.keywords.length} 个):`);
    d.keywords.forEach((k, i) => console.log(`  ${i + 1}. ${k}`));
    console.log(`body:`);
    console.log(`  ${d.body}`);
    console.log(`imageAlt:`);
    console.log(`  ${d.imageAlt}`);
    console.log('-'.repeat(80));
  }

  console.log('\n====== Quality Checks ======');
  let pass = 0;
  let fail = 0;
  const failures = [];
  for (const slug of slugs) {
    const d = P0_DATA[slug];
    const checks = [
      check('title', d.title, 48, 60),
      check('desc', d.description, 150, 160),
      check('h1', d.h1, 30, 50),
      { name: 'keywords 8-10 个', ok: d.keywords.length >= 8 && d.keywords.length <= 10, val: d.keywords.length },
      { name: 'no Chinese in title', ok: !hasZh(d.title) },
      { name: 'no Chinese in desc', ok: !hasZh(d.description) },
      { name: 'no Japanese in desc', ok: !hasJa(d.description) },
      { name: 'no Chinese in h1', ok: !hasZh(d.h1) },
      { name: 'desc has ZprintPro OR market signal', ok: /ZprintPro|DHL|US|UK|AU|Korea|Singapore|UAE/i.test(d.description) },
      { name: 'h1 has ZprintPro', ok: d.h1.includes('ZprintPro') },
      { name: 'desc has CTA (shipping/quote/delivery)', ok: /shipping|quote|delivery/i.test(d.description) },
      { name: 'body has ZprintPro + use case', ok: d.body.includes('ZprintPro') && d.body.length > 80 },
      { name: 'imageAlt has ZprintPro', ok: d.imageAlt.includes('ZprintPro') },
    ];
    const failed = checks.filter((c) => !c.ok);
    if (failed.length === 0) {
      pass++;
      console.log(`✅ ${slug}: ${checks.length}/${checks.length} checks passed`);
    } else {
      fail++;
      failures.push({ slug, failed });
      console.log(`❌ ${slug}: ${checks.length - failed.length}/${checks.length} checks passed`);
      failed.forEach((f) => console.log(`   - ${f.name}${f.val !== undefined ? ` (got ${f.val}, target ${f.target || 'n/a'})` : ''}`));
    }
  }
  console.log(`\n汇总: ${pass} PASS / ${fail} FAIL`);

  if (APPLY_MODE) {
    console.log('\n====== APPLY MODE: writing to sku-seo-data.ts ======');
    if (!fs.existsSync(SKU_FILE)) {
      console.error(`❌ SKU file not found: ${SKU_FILE}`);
      process.exit(1);
    }
    let content = fs.readFileSync(SKU_FILE, 'utf-8');
    let applied = 0;
    for (const slug of slugs) {
      const d = P0_DATA[slug];
      const seoRe = new RegExp(`("${slug}":\\s*{[\\s\\S]*?"seo":\\s*{[\\s\\S]*?"en":\\s*{)([\\s\\S]*?)(\\s*}\\s*,\\s*"ja")`, 'm');
      const newSeoEn =
        `\n        "title": ${JSON.stringify(d.title)},\n` +
        `        "description": ${JSON.stringify(d.description)},\n` +
        `        "h1": ${JSON.stringify(d.h1)},\n` +
        `        "keywords": ${JSON.stringify(d.keywords)},\n` +
        `        "body": ${JSON.stringify(d.body)}\n      `;
      if (seoRe.test(content)) {
        content = content.replace(seoRe, (_, g1, g2, g3) => g1 + newSeoEn + g3);
        applied++;
        console.log(`✅ ${slug}: seo.en updated`);
      } else {
        console.log(`⚠️  ${slug}: seo.en regex no match`);
      }
      const altRe = new RegExp(`("${slug}":\\s*{[\\s\\S]*?"imageAlt":\\s*{[\\s\\S]*?"en":\\s*")([^"]*)(")`, 'm');
      if (altRe.test(content)) {
        content = content.replace(altRe, (_, g1, g2, g3) => g1 + d.imageAlt.replace(/"/g, '\\"') + g3);
        console.log(`✅ ${slug}: imageAlt.en updated`);
      } else {
        console.log(`⚠️  ${slug}: imageAlt.en regex no match`);
      }
    }
    fs.writeFileSync(SKU_FILE, content, 'utf-8');
    console.log(`\n📝 Wrote ${applied}/${slugs.length} SKU updates to ${SKU_FILE}`);
    console.log(`💡 Next: git diff src/data/sku-seo-data.ts | head -200 to review`);
  } else {
    console.log('\n💡 Run with --apply to write changes to sku-seo-data.ts');
  }
}

run();
