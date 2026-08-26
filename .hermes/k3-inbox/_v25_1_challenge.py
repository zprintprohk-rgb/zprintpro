# -*- coding: utf-8 -*-
"""V25.1 4 张挑战图实测 — BC-001 / BN-001 / RP-001 / DJ-001 HERO 视图

调用火山引擎 Seedream 5.0 Lite API, 每 SKU 2 候选 = 8 张图
成本: ~¥1.6-2.4 (官方 ¥0.20-0.30/张)
"""
import io, sys, json, time, urllib.request, urllib.error, re
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# === API 配置 (K3 8/16 提供) ===
ARK_API_KEY = "ark-a829bb4d-9890-471f-b543-0561caa9e7a1-d4810"
ARK_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations"
ARK_MODEL = "doubao-seedream-5-0-lite-260128"

# === 路径 ===
WORKSPACE = Path(r"F:\zprintpro-nextjs")
PROMPTS_FILE = Path(r"F:\电商生图提示词重要\V25.3 EN提示词（十代迭代精华，396条）.txt")
OUTPUT_DIR = WORKSPACE / "zprintpro-en-us-images" / "v25_3_challenge"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# === 4 张挑战图 ===
CHALLENGE_SKUS = ['BC-001', 'BN-001', 'RP-001', 'DJ-001']


def extract_hero_prompt(prompts_text, sku_id):
    """从 V25.1 提示词文件提取指定 SKU 的 HERO 视图提示词"""
    # 找 SKU 段
    pattern = rf"### SKU-\d+\s*\|\s*{re.escape(sku_id)}\b.*?(?=\n### SKU-|\Z)"
    m = re.search(pattern, prompts_text, re.DOTALL)
    if not m:
        return None, None
    block = m.group(0)
    
    # 找 ALT
    alt_m = re.search(r"SEO\+GEO ALT:\s*(.+)", block)
    alt = alt_m.group(1).strip() if alt_m else ""
    
    # 找 HERO 段
    hero_m = re.search(r"\[HERO\]\s*\(\d+\s*chars\)\n(.+?)(?=\n\[DETAIL\]|\n\[VARIETY\]|\n\[MULTI-ANGLE\]|\n###|\Z)", block, re.DOTALL)
    if not hero_m:
        return None, alt
    hero_prompt = hero_m.group(1).strip()
    return hero_prompt, alt


def call_seedream_api(prompt, n=2, image_size="1024x1024"):
    """调用 Seedream 5.0 Lite API"""
    payload = {
        "model": ARK_MODEL,
        "prompt": prompt,
        "image_size": image_size,
        "n": n,
        "response_format": "url",
        "watermark": False,
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        ARK_BASE_URL, data=data,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {ARK_API_KEY}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode('utf-8'))


def download_image(url, out_path):
    """下载图片"""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as resp:
        out_path.write_bytes(resp.read())
    return out_path


def main():
    print("=" * 70)
    print("V25.1 4 张挑战图实测 — Seedream 5.0 Lite")
    print("=" * 70)
    print(f"SKUs: {CHALLENGE_SKUS}")
    print(f"每 SKU: HERO 视图 × 2 候选 = 8 张图")
    print(f"输出: {OUTPUT_DIR}")
    print()
    
    # 读取提示词文件
    prompts_text = PROMPTS_FILE.read_text(encoding='utf-8')
    
    results = []
    total_cost = 0.0
    
    for sku_id in CHALLENGE_SKUS:
        print(f"\n{'─'*50}")
        print(f"[{sku_id}] 提取 V25.1 HERO 提示词...")
        
        hero_prompt, alt = extract_hero_prompt(prompts_text, sku_id)
        if not hero_prompt:
            print(f"  FAIL: HERO 提示词未找到")
            continue
        
        print(f"  提示词长度: {len(hero_prompt)} 字符")
        print(f"  ALT: {alt[:100]}...")
        
        # 调用 API
        print(f"  调用 Seedream 5.0 Lite API (n=2)...", end=' ', flush=True)
        try:
            result = call_seedream_api(hero_prompt, n=2, image_size="1024x1024")
            urls = [item['url'] for item in result.get('data', [])]
            usage = result.get('usage', {})
            cost = usage.get('total_cost', 0)
            total_cost += cost
            
            if not urls:
                print("FAIL (no urls)")
                continue
            
            print(f"OK ({len(urls)} 张, cost ¥{cost:.3f})")
            
            # 下载图片
            sku_dir = OUTPUT_DIR / sku_id
            sku_dir.mkdir(exist_ok=True)
            
            saved = []
            for i, url in enumerate(urls, 1):
                out_path = sku_dir / f"HERO_cand{i}.jpg"
                download_image(url, out_path)
                size_kb = out_path.stat().st_size // 1024
                saved.append((out_path, size_kb))
                print(f"    cand{i}: {out_path.name} ({size_kb} KB)")
            
            results.append({'sku': sku_id, 'alt': alt, 'prompt_len': len(hero_prompt), 'images': saved, 'cost': cost})
            
        except Exception as e:
            print(f"FAIL: {e}")
            continue
        
        # 限速: 每 2 秒 1 个请求
        time.sleep(2)
    
    # 汇总
    print(f"\n{'='*70}")
    print("V25.1 挑战图实测完成")
    print(f"{'='*70}")
    print(f"成功 SKU: {len(results)}/{len(CHALLENGE_SKUS)}")
    print(f"总图片数: {sum(len(r['images']) for r in results)}")
    print(f"估算成本: ¥{total_cost:.2f}")
    print()
    for r in results:
        print(f"  {r['sku']}: {len(r['images'])} 张, prompt {r['prompt_len']} 字符, ¥{r['cost']:.3f}")
        for img_path, size_kb in r['images']:
            print(f"    {img_path} ({size_kb} KB)")
    
    print(f"\n输出目录: {OUTPUT_DIR}")


if __name__ == '__main__':
    main()
