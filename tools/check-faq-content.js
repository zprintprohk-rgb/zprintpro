const fs = require('fs');
const en = JSON.parse(fs.readFileSync('./src/data/blog-data/en.json', 'utf8'));
const slug = '2027-monthly-calendar-printing-timetable';
const p = en[slug];
const c = p.content || '';

// Extract inline FAQPage JSON
const faqMatch = c.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?FAQPage[\s\S]*?)<\/script>/);
if (faqMatch) {
  const f = JSON.parse(faqMatch[1]);
  console.log('=== INLINE FAQPage ===');
  console.log('Question count:', f.mainEntity.length);
  f.mainEntity.forEach((q, i) => console.log('  Q' + (i+1) + ':', q.name.substring(0, 60)));
}

// Extract Q/A from visible content (what extractFaqFromHtml would extract)
const qaMatches = [...c.matchAll(/<p[^>]*>\s*<strong>\s*Q\d+:?\s*([^<]+?)<\/strong>[\s\S]*?<br\s*\/?>\s*A\d*:?\s*([^<]+?)\s*<\/p>/g)];
console.log('\n=== HTML Q/A pattern (Q1:/A1:) ===');
console.log('Count:', qaMatches.length);
qaMatches.forEach((m, i) => console.log('  Q' + (i+1) + ':', m[1].substring(0, 60)));
