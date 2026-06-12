#!/usr/bin/env python3
"""
Crawl all en URLs from sitemap and parse SEO/GEO metadata.
Output: F:\\zprintpro-nextjs\\docs\\seo-audit-en\\parsed-data.json
"""
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path

# Force UTF-8 stdout (Windows-safe)
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SITEMAP_URL = "https://zprintpro.com/sitemap.xml"
RAW_DIR = Path(r"F:\zprintpro-nextjs\docs\seo-audit-en\raw")
OUTPUT = Path(r"F:\zprintpro-nextjs\docs\seo-audit-en\parsed-data.json")
TASK_OUTPUT = Path(r"C:\Users\Administrator\.mavis\plans\plan_97396231\outputs\phase-a2-core-eeat")
TASK_OUTPUT.mkdir(parents=True, exist_ok=True)
TASK_PARSED = TASK_OUTPUT / "parsed-data.json"

USER_AGENT = "Mozilla/5.0 (compatible; ZprintPro-SEOCrawler/1.0)"
TIMEOUT = 30
MAX_WORKERS = 8

RAW_DIR.mkdir(parents=True, exist_ok=True)


def fetch_url(url, retries=2):
    """Fetch URL with retries."""
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
                content = resp.read()
                # Try UTF-8 first, fallback to latin1
                try:
                    return content.decode('utf-8')
                except UnicodeDecodeError:
                    return content.decode('latin1', errors='replace')
        except Exception as e:
            if attempt < retries:
                time.sleep(0.5)
            else:
                print(f"  [FAIL] {url}: {e}", flush=True)
                return None
    return None


def extract_en_urls_from_sitemap(sitemap_xml):
    """Extract en URLs from sitemap XML."""
    return re.findall(r'<loc>(https://zprintpro\.com/en/[^<]+)</loc>', sitemap_xml)


def safe_filename(url):
    """Convert URL to safe filename."""
    return url.replace('https://zprintpro.com/en/', '').rstrip('/').replace('/', '__') + '.html'


class SEOParser:
    """Parse HTML head for SEO/GEO metadata."""

    def __init__(self, html, base_url):
        self.html = html
        self.base_url = base_url
        self.data = {
            "url": base_url,
            "url_path": base_url.replace('https://zprintpro.com', ''),
            "page_type": self.detect_page_type(base_url),
            "title": None,
            "title_len": 0,
            "description": None,
            "description_len": 0,
            "keywords": None,
            "canonical": None,
            "hreflang": [],  # list of (lang, url)
            "og_title": None,
            "og_description": None,
            "og_image": None,
            "og_type": None,
            "og_locale": None,
            "twitter_card": None,
            "twitter_title": None,
            "twitter_description": None,
            "twitter_image": None,
            "json_ld": [],  # list of dicts
            "json_ld_types": [],  # just type names
            "schema_breadcrumblist": False,
            "schema_faqpage": False,
            "schema_product": False,
            "schema_article": False,
            "schema_speakable": False,
            "schema_howto": False,
            "schema_organization": False,
            "schema_itemlist": False,
            "schema_aggregaterating": False,
            "preload_images": [],  # first 5
            "img_total": 0,
            "img_missing_alt": 0,
            "h1": None,
            "h1_count": 0,
            "h2_count": 0,
            "h2_samples": [],
            "h3_count": 0,
            "paragraph_count": 0,
            "word_count": 0,
            "internal_links": 0,
            "external_links": 0,
            "html_lang": None,
            "first_150_words": "",
            "has_faq_section": False,
            "has_table": False,
            "has_takeaway_box": False,
            "has_summary": False,
            "first_party_data_signals": [],  # e.g. pricing tables, sample numbers
            "author_markup": False,
            "publish_date_markup": False,
            "speakable_css_selector": None,
            "en_locale_data_mismatch": False,
            "title_has_brand": False,
            "title_brand_position": None,
            "title_has_keyword": False,
            "og_image_alt": None,
            "viewport": None,
            "robots": None,
            "fetch_status": "ok",
            "fetch_error": None,
        }
        self._parse()

    @staticmethod
    def detect_page_type(url):
        u = url.lower()
        if u.endswith('/en/') or u.endswith('/en'):
            return "home"
        if '/product/' in u:
            return "product"
        if '/category/' in u:
            return "category"
        if '/blog/' in u or '/guide/' in u:
            return "blog"
        if '/services/' in u:
            return "service"
        if '/case-studies/' in u:
            return "case_study"
        if u.endswith('/cart/') or u.endswith('/checkout/') or '/order-confirmation' in u or '/payment/' in u:
            return "transactional"
        return "info"

    def _parse(self):
        h = self.html
        if not h:
            return

        # html lang
        m = re.search(r'<html[^>]*\slang="([^"]+)"', h)
        if m:
            self.data["html_lang"] = m.group(1)

        # Title
        m = re.search(r'<title[^>]*>([^<]+)</title>', h, re.IGNORECASE)
        if m:
            t = m.group(1).strip()
            self.data["title"] = t
            self.data["title_len"] = len(t)
            # Brand detection
            self.data["title_has_brand"] = "ZprintPro" in t or "智印云" in t
            if self.data["title_has_brand"]:
                # Position
                if t.lower().endswith("zprintpro") or t.lower().endswith("智印云"):
                    self.data["title_brand_position"] = "end"
                elif t.lower().startswith("zprintpro") or t.lower().startswith("智印云"):
                    self.data["title_brand_position"] = "start"
                else:
                    self.data["title_brand_position"] = "middle"
            # Duplicate brand (e.g. "X | ZprintPro | ZprintPro")
            brand_count = t.count("ZprintPro") + t.count("智印云")
            self.data["title_brand_duplicate"] = brand_count > 1

        # Meta description
        m = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', h, re.IGNORECASE)
        if not m:
            m = re.search(r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\']', h, re.IGNORECASE)
        if m:
            d = m.group(1).strip()
            self.data["description"] = d
            self.data["description_len"] = len(d)

        # Meta keywords
        m = re.search(r'<meta[^>]*name=["\']keywords["\'][^>]*content=["\']([^"\']*)["\']', h, re.IGNORECASE)
        if not m:
            m = re.search(r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']keywords["\']', h, re.IGNORECASE)
        if m:
            self.data["keywords"] = m.group(1).strip()

        # Robots
        m = re.search(r'<meta[^>]*name=["\']robots["\'][^>]*content=["\']([^"\']*)["\']', h, re.IGNORECASE)
        if m:
            self.data["robots"] = m.group(1).strip()

        # Viewport
        m = re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*content=["\']([^"\']*)["\']', h, re.IGNORECASE)
        if m:
            self.data["viewport"] = m.group(1).strip()

        # Canonical
        m = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', h, re.IGNORECASE)
        if m:
            self.data["canonical"] = m.group(1)

        # hreflang
        for m in re.finditer(r'<link[^>]*rel=["\']alternate["\'][^>]*hreflang=["\']([^"\']*)["\'][^>]*href=["\']([^"\']+)["\']', h, re.IGNORECASE):
            lang, href = m.group(1), m.group(2)
            self.data["hreflang"].append({"lang": lang, "href": href})
        # Try alt attribute order
        if not self.data["hreflang"]:
            for m in re.finditer(r'<link[^>]*hreflang=["\']([^"\']*)["\'][^>]*href=["\']([^"\']+)["\']', h, re.IGNORECASE):
                lang, href = m.group(1), m.group(2)
                self.data["hreflang"].append({"lang": lang, "href": href})

        # OG tags
        og_pat = re.compile(r'<meta[^>]*property=["\']og:([^"\']+)["\'][^>]*content=["\']([^"\']*)["\']', re.IGNORECASE)
        for m in og_pat.finditer(h):
            key, val = m.group(1).lower(), m.group(2)
            if key == 'title':
                self.data["og_title"] = val
            elif key == 'description':
                self.data["og_description"] = val
            elif key == 'image':
                self.data["og_image"] = val
            elif key == 'type':
                self.data["og_type"] = val
            elif key == 'locale':
                self.data["og_locale"] = val
            elif key == 'image:alt':
                self.data["og_image_alt"] = val
        # alt attr order
        if not self.data["og_title"]:
            for m in re.finditer(r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*property=["\']og:title["\']', h, re.IGNORECASE):
                self.data["og_title"] = m.group(1)

        # Twitter
        tw_pat = re.compile(r'<meta[^>]*name=["\']twitter:([^"\']+)["\'][^>]*content=["\']([^"\']*)["\']', re.IGNORECASE)
        for m in tw_pat.finditer(h):
            key, val = m.group(1).lower(), m.group(2)
            if key == 'card':
                self.data["twitter_card"] = val
            elif key == 'title':
                self.data["twitter_title"] = val
            elif key == 'description':
                self.data["twitter_description"] = val
            elif key == 'image':
                self.data["twitter_image"] = val

        # JSON-LD blocks
        for m in re.finditer(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', h, re.DOTALL | re.IGNORECASE):
            raw = m.group(1).strip()
            if not raw:
                continue
            # Some sites dump multiple objects; try parsing as JSON
            try:
                # Strip comments / trailing commas defensively
                obj = json.loads(raw)
                self._absorb_jsonld(obj)
            except Exception:
                # Try wrapping in array
                try:
                    obj = json.loads("[" + raw + "]")
                    if isinstance(obj, list):
                        for item in obj:
                            self._absorb_jsonld(item)
                except Exception:
                    pass

        # Preload images
        for m in re.finditer(r'<link[^>]*rel=["\']preload["\'][^>]*as=["\']image["\'][^>]*href=["\']([^"\']+)["\']', h, re.IGNORECASE):
            self.data["preload_images"].append(m.group(1))
        self.data["preload_images"] = self.data["preload_images"][:5]

        # Img alt coverage (whole doc)
        imgs = re.findall(r'<img[^>]*>', h, re.IGNORECASE)
        self.data["img_total"] = len(imgs)
        miss = 0
        for tag in imgs:
            if re.search(r'\salt=["\']', tag, re.IGNORECASE) is None:
                miss += 1
            else:
                am = re.search(r'\salt=["\']([^"\']*)["\']', tag, re.IGNORECASE)
                if am and not am.group(1).strip():
                    miss += 1
        self.data["img_missing_alt"] = miss

        # H1
        h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', h, re.DOTALL | re.IGNORECASE)
        if h1s:
            clean = [re.sub(r'<[^>]+>', ' ', x).strip() for x in h1s]
            clean = [' '.join(c.split()) for c in clean if c.strip()]
            self.data["h1_count"] = len(clean)
            self.data["h1"] = clean[0] if clean else None

        # H2
        h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', h, re.DOTALL | re.IGNORECASE)
        h2_clean = []
        for x in h2s:
            t = ' '.join(re.sub(r'<[^>]+>', ' ', x).split())
            if t:
                h2_clean.append(t)
        self.data["h2_count"] = len(h2_clean)
        self.data["h2_samples"] = h2_clean[:5]

        # H3
        self.data["h3_count"] = len(re.findall(r'<h3[^>]*>', h, re.IGNORECASE))

        # Paragraphs
        ps = re.findall(r'<p[^>]*>(.*?)</p>', h, re.DOTALL | re.IGNORECASE)
        clean_ps = []
        for p in ps:
            t = ' '.join(re.sub(r'<[^>]+>', ' ', p).split())
            if len(t) > 20:  # skip trivial
                clean_ps.append(t)
        self.data["paragraph_count"] = len(clean_ps)

        # Word count (text content of body, naive)
        body_m = re.search(r'<body[^>]*>(.*?)</body>', h, re.DOTALL | re.IGNORECASE)
        body_text = body_m.group(1) if body_m else h
        # Strip scripts/styles
        body_text = re.sub(r'<script[^>]*>.*?</script>', ' ', body_text, flags=re.DOTALL | re.IGNORECASE)
        body_text = re.sub(r'<style[^>]*>.*?</style>', ' ', body_text, flags=re.DOTALL | re.IGNORECASE)
        # Strip tags
        text_only = re.sub(r'<[^>]+>', ' ', body_text)
        text_only = ' '.join(text_only.split())
        self.data["word_count"] = len(text_only.split())

        # First 150 words
        words = text_only.split()[:150]
        self.data["first_150_words"] = ' '.join(words)

        # Internal vs external links
        anchors = re.findall(r'<a[^>]*href=["\']([^"\']+)["\']', h, re.IGNORECASE)
        for a in anchors:
            if a.startswith('http'):
                if 'zprintpro.com' in a:
                    self.data["internal_links"] += 1
                else:
                    self.data["external_links"] += 1
            elif a.startswith('/') or a.startswith('#'):
                self.data["internal_links"] += 1

        # FAQ section (look for FAQPage schema OR FAQ-like content)
        self.data["has_faq_section"] = (
            self.data["schema_faqpage"] or
            bool(re.search(r'(FAQ|Frequently Asked|常見問題|问答)', h, re.IGNORECASE))
        )

        # Tables
        tables = re.findall(r'<table[^>]*>', h, re.IGNORECASE)
        self.data["has_table"] = len(tables) > 0

        # Takeaways / Summary
        self.data["has_takeaway_box"] = bool(re.search(r'(key takeaway|key point|summary|highlight|takeaway|要點|重點|總結)', h, re.IGNORECASE))
        self.data["has_summary"] = bool(re.search(r'(<summary|in summary|summary box|TL;DR|tldr)', h, re.IGNORECASE))

        # First-party data signals (look for numbers + units, prices, sizes)
        signals = []
        if re.search(r'(USD|HKD|\$\s*\d|\d+\s*pcs|\d+\s*pieces|HKD\s*\d+)', body_text):
            signals.append("pricing_or_quantity_in_text")
        if re.search(r'\d+\s*(mm|cm|inch|inches|gsm|g/m²)', body_text, re.IGNORECASE):
            signals.append("dimensions_in_text")
        if re.search(r'\d+\s*(days?|hours?|weeks?)', body_text, re.IGNORECASE):
            signals.append("lead_time_in_text")
        if re.search(r'(survey|study|research|statistic|report|data shows|according to)', body_text, re.IGNORECASE):
            signals.append("citable_research_mention")
        self.data["first_party_data_signals"] = signals

        # Author markup (rel=author, itemprop=author, schema Author)
        self.data["author_markup"] = (
            self.data["schema_article"] or
            bool(re.search(r'(rel=["\']author["\']|itemprop=["\']author["\'])', h, re.IGNORECASE))
        )

        # Publish date (time tag, itemprop=datePublished, schema Article datePublished)
        self.data["publish_date_markup"] = bool(re.search(r'(itemprop=["\']datePublished["\']|<time[^>]*datetime=)', h, re.IGNORECASE))

        # Speakable CSS selector (Speakable schema has cssSelector field)
        for sch in self.data["json_ld"]:
            if isinstance(sch, dict) and 'speakable' in str(sch).lower():
                self.data["schema_speakable"] = True
                sp = sch.get('speakable')
                if isinstance(sp, dict) and 'cssSelector' in sp:
                    self.data["speakable_css_selector"] = sp['cssSelector']
                break

        # en locale data mismatch: description/keywords/title contain Chinese but lang=en
        if self.data["html_lang"] and self.data["html_lang"].lower().startswith("en"):
            cn_pat = re.compile(r'[\u4e00-\u9fff]')
            for field in ['title', 'description', 'keywords', 'og_title', 'og_description', 'twitter_title', 'twitter_description']:
                val = self.data.get(field)
                if val and cn_pat.search(val):
                    self.data["en_locale_data_mismatch"] = True
                    self.data["en_mismatch_fields"] = self.data.get("en_mismatch_fields", []) + [field]
                    break

    def _absorb_jsonld(self, obj):
        """Recursively absorb JSON-LD object and flag types."""
        if obj is None:
            return
        # Use string repr to capture @graph arrays
        self.data["json_ld"].append(obj if not isinstance(obj, str) else {"raw": obj})
        if isinstance(obj, dict):
            t = obj.get("@type")
            if isinstance(t, list):
                for tt in t:
                    self.data["json_ld_types"].append(tt)
                    self._flag_schema(tt)
            elif isinstance(t, str):
                self.data["json_ld_types"].append(t)
                self._flag_schema(t)
            # @graph
            if "@graph" in obj and isinstance(obj["@graph"], list):
                for sub in obj["@graph"]:
                    self._absorb_jsonld(sub)

    def _flag_schema(self, t):
        m = {
            "BreadcrumbList": "schema_breadcrumblist",
            "FAQPage": "schema_faqpage",
            "Product": "schema_product",
            "Article": "schema_article",
            "NewsArticle": "schema_article",
            "BlogPosting": "schema_article",
            "SpeakableSpecification": "schema_speakable",
            "HowTo": "schema_howto",
            "Organization": "schema_organization",
            "ItemList": "schema_itemlist",
            "AggregateRating": "schema_aggregaterating",
        }
        if t in m:
            self.data[m[t]] = True


def main():
    print(f"[{time.strftime('%H:%M:%S')}] Fetching sitemap...", flush=True)
    sitemap_xml = fetch_url(SITEMAP_URL)
    if not sitemap_xml:
        print("FAIL: cannot fetch sitemap", flush=True)
        sys.exit(1)

    en_urls = extract_en_urls_from_sitemap(sitemap_xml)
    en_urls = sorted(set(en_urls))
    # Always include home
    if "https://zprintpro.com/en/" not in en_urls:
        en_urls.insert(0, "https://zprintpro.com/en/")
    print(f"[{time.strftime('%H:%M:%S')}] Found {len(en_urls)} en URLs", flush=True)

    # Crawl in parallel
    print(f"[{time.strftime('%H:%M:%S')}] Crawling {len(en_urls)} pages with {MAX_WORKERS} workers...", flush=True)
    results = {}
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(fetch_url, url): url for url in en_urls}
        done = 0
        for fut in as_completed(future_to_url):
            url = future_to_url[fut]
            html = fut.result()
            done += 1
            if html:
                # Save raw
                fname = RAW_DIR / safe_filename(url)
                with open(fname, 'w', encoding='utf-8') as f:
                    f.write(html)
                results[url] = html
                print(f"  [{done}/{len(en_urls)}] OK   {url}", flush=True)
            else:
                results[url] = None
                print(f"  [{done}/{len(en_urls)}] FAIL {url}", flush=True)

    # Parse
    print(f"[{time.strftime('%H:%M:%S')}] Parsing {len(results)} pages...", flush=True)
    parsed = {}
    page_types = {}
    for url, html in results.items():
        if html is None:
            parsed[url] = {
                "url": url,
                "url_path": url.replace('https://zprintpro.com', ''),
                "page_type": SEOParser.detect_page_type(url),
                "fetch_status": "failed",
                "fetch_error": "fetch returned None",
            }
        else:
            p = SEOParser(html, url)
            parsed[url] = p.data
        pt = parsed[url].get("page_type", "unknown")
        page_types[pt] = page_types.get(pt, 0) + 1

    # Write
    print(f"[{time.strftime('%H:%M:%S')}] Writing parsed-data.json...", flush=True)
    output_obj = {
        "metadata": {
            "generated_at": time.strftime("%Y-%m-%dT%H:%M:%S+08:00"),
            "total_urls": len(parsed),
            "page_types": page_types,
            "source": "sitemap.xml + direct crawl",
        },
        "pages": parsed,
    }

    # Sort by URL
    sorted_pages = dict(sorted(parsed.items()))
    output_obj["pages"] = sorted_pages

    # Write to docs/ and task output
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(output_obj, f, ensure_ascii=False, indent=2)
    with open(TASK_PARSED, 'w', encoding='utf-8') as f:
        json.dump(output_obj, f, ensure_ascii=False, indent=2)

    print(f"[{time.strftime('%H:%M:%S')}] DONE. Wrote {OUTPUT} ({OUTPUT.stat().st_size} bytes)", flush=True)
    print(f"         Wrote {TASK_PARSED} ({TASK_PARSED.stat().st_size} bytes)", flush=True)
    print(f"Page types: {page_types}", flush=True)


if __name__ == "__main__":
    main()