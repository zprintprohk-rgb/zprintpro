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
};

// === Quality checks ===

function hasJa(s) { return /[\u3040-\u309f\u30a0-\u30ff]/.test(s); }
function hasZh(s) { return /[\u4e00-\u9fff]/.test(s); }

function check(name, value, min, max) {
  const ok = value.length >= min && value.length <= max;
  return { name, ok, val: value.length, target: `${min}-${max}` };
}

function run() {
  console.log('====== apply-en-sku-seo.mjs (v4 length-calibrated, 29 SKUs) ======\n');
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
