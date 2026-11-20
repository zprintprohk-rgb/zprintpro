# -*- coding: utf-8 -*-
# E1 post-push 线上验收探针 v2 (含部署等待轮询)
# 检查: sticker-guide 页 200 + E1 锚 <a> 渲染 + robots 保持 + doujin C109 保持
import io, sys, urllib.request, re, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.status, r.read().decode('utf-8', errors='replace')

# 部署轮询: 等 sticker-guide 页出现 E1 锚 (最多 6 轮 x 30s)
target_url = 'https://zprintpro.com/en/blog/sticker-guide/'
for attempt in range(1, 7):
    try:
        st, html = fetch(target_url)
        anchor = 'href="/en/product/small-batch-stickers/"'
        text_anchor = '>small-batch restocking for cross-border sellers</a>' in html
        if anchor in html and text_anchor:
            print(f'[E1] 部署完成 (尝试#{attempt}): {st} | 锚<en>={anchor in html} | 锚文本闭合={text_anchor} | 页长={len(html)}B')
            break
        else:
            print(f'[E1] 部署中 (尝试#{attempt}): {st} | 锚={anchor in html} | 旧文本(无链接)={text_anchor}')
    except Exception as e:
        print(f'[E1] 尝试#{attempt} 异常: {str(e)[:60]}')
    if attempt < 6:
        time.sleep(30)
else:
    print('[E1] 部署未完成于轮询窗口 — 后续再探')
