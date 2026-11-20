# -*- coding: utf-8 -*-
# Push 后探针: 内链渲染验证 + robots 保持 + 部署保持
import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', ''

# 内链目标: 源页 -> (锚文本, 目标URL路径)
LINKS = [
    ('https://zprintpro.com/en/product/saddle-stitch-booklets/', 'perfect binding', '/en/product/perfect-bound-books/'),
    ('https://zprintpro.com/en/product/exercise-books/', 'custom textbooks', '/en/product/textbooks/'),
    ('https://zprintpro.com/en/product/exercise-books/', 'saddle stitch', '/en/product/saddle-stitch-booklets/'),
    ('https://zprintpro.com/en/product/catalog-printing/', 'saddle stitch booklet', '/en/product/saddle-stitch-booklets/'),
    ('https://zprintpro.com/en/product/catalog-printing/', 'perfect binding', '/en/product/perfect-bound-books/'),
    ('https://zprintpro.com/en/product/catalog-printing/', 'china catalog printing', '/en/blog/catalog-printing-china-supplier-guide/'),
]

print('=== 1. 内链渲染验证 (锚文本应为 <a> 链接, 非纯文本) ===')
for url, anchor, target in LINKS:
    st, html = get(url)
    if st != 200:
        print(f'  {url.split("zprintpro.com")[1]}: HTTP {st} (FAIL)')
        continue
    # 已渲染: <a ... href="/en/...">anchor</a> (encode anchor for regex safety)
    a_esc = re.escape(anchor)
    rendered = re.search(r'<a[^>]*href="' + re.escape(target) + r'"[^>]*>' + a_esc + r'</a>', html)
    # 未渲染(纯文本残留): [anchor](/en/...)
    raw = re.search(r'\[' + a_esc + r'\]\(' + re.escape(target) + r'\)', html)
    page = url.split("zprintpro.com")[1]
    if rendered:
        print(f'  {page} | "{anchor}" -> {target}: ✅ 已渲染为 <a>')
    elif raw:
        print(f'  {page} | "{anchor}" -> {target}: ⚠️ 仍是 Markdown 纯文本 [text](url)')
    else:
        print(f'  {page} | "{anchor}" -> {target}: ? 未找到锚文本 (可能文案变体)')

print()
print('=== 2. robots.txt 保持 200 ===')
st, body = get('https://zprintpro.com/robots.txt')
print(f'  robots.txt: HTTP {st} | 12 AI: {sum(1 for a in ["GPTBot","ClaudeBot","PerplexityBot","Google-Extended","Applebot-Extended","Bytespider","CCBot","OAI-SearchBot","ChatGPT-User","Claude-Web","anthropic-ai","Perplexity-User"] if "User-agent: "+a in body)}/12 | sitemap-img: {"sitemap-image.xml" in body}')

print()
print('=== 3. 部署保持 (H1 + 年賀状) ===')
for url in ['https://zprintpro.com/en/product/saddle-stitch-booklets/',
            'https://zprintpro.com/ja/nengajo-2027/']:
    st, h = get(url)
    if st == 200:
        t = re.search(r'<title>(.*?)</title>', h, re.S)
        print(f'  {url.split("zprintpro.com")[1]}: 200 | {t.group(1).strip()[:45] if t else "?"}')
    else:
        print(f'  {url.split("zprintpro.com")[1]}: {st}')
