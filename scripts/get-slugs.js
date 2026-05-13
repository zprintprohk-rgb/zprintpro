const fs = require('fs');

// Products
const productsContent = fs.readFileSync('src/data/products.ts', 'utf-8');
const productSlugs = [...productsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Products:', productSlugs.length);

// Categories
const categoriesContent = fs.readFileSync('src/data/categories.ts', 'utf-8');
const categorySlugs = [...categoriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Categories:', categorySlugs.length);

// Guides (pillars + clusters)
const pillarContent = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const guideSlugs = [...pillarContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Guides:', guideSlugs.length);

// Blog slugs
const blogDir = 'src/content/blog';
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const blogSlugs = blogFiles.map(f => f.replace(/\.mdx?$/, ''));
  console.log('Blog:', blogSlugs.length);
} else {
  console.log('Blog: directory not found');
}

// Static pages (excluding dynamic and utility pages)
const staticPages = [
  '', 'about', 'case-studies', 'contact', 'faq', 'help-center',
  'press-kit', 'privacy', 'service-areas', 'terms', 'quote', 'search',
  'cart', 'checkout', 'order-confirmation', 'company-news'
];
console.log('Static pages:', staticPages.length);
