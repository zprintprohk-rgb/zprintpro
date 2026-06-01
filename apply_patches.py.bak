#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import json
import glob
import re
from datetime import datetime

PROJECT_ROOT = r"F:\zprintpro-nextjs"
PATCHES_DIR = os.path.join(PROJECT_ROOT, "patches")
APP_DIR = os.path.join(PROJECT_ROOT, "app", "zh-hk", "services")

def get_latest_patch_file():
    files = glob.glob(os.path.join(PATCHES_DIR, "patches_v2_*.json")) or glob.glob(os.path.join(PATCHES_DIR, "patches_v2.json"))
    if not files:
        return None
    return max(files, key=os.path.getctime)

def slugify(keyword):
    mapping = {
        "食品包裝印刷": "food-packaging-printing",
        "宣傳單張": "leaflet",
        "宣傳單張印刷": "leaflet-printing",
        "海報印刷": "poster-printing",
        "印海報": "poster-printing",
    }
    return mapping.get(keyword, keyword.replace(' ', '-').lower())

def create_missing_page(patch):
    keyword = patch['keyword']
    slug = slugify(keyword)
    page_dir = os.path.join(APP_DIR, slug)
    page_file = os.path.join(page_dir, "page.tsx")
    if os.path.exists(page_file):
        return False
    os.makedirs(page_dir, exist_ok=True)

    title = patch['optimized_title']
    description = patch['optimized_meta_desc']
    h1 = patch['optimized_h1']
    faq_list = patch.get('faq_list', [])
    schema_json = patch.get('schema_snippet', '{}')
    try:
        schema_obj = json.loads(schema_json)
    except:
        schema_obj = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": []}
    schema_str = json.dumps(schema_obj, ensure_ascii=False)

    # 生成函数名: 将 slug 中的连字符转为下划线
    func_name = slug.replace('-', '_') + "Page"

    faq_jsx = '\n'.join([
        f'''        <div key={i}>
            <h3 className="text-lg font-semibold">{faq['question']}</h3>
            <p className="text-gray-600 mt-1">{faq['answer']}</p>
        </div>'''
        for i, faq in enumerate(faq_list)
    ])

    page_code = f'''import {{ Metadata }} from 'next';
import Script from 'next/script';

export const metadata: Metadata = {{
  title: '{title}',
  description: '{description}',
}};

export default function {func_name}() {{
  const schemaData = {schema_str};

  return (
    <>
      <Script id="faq-schema" type="application/ld+json">
        {{JSON.stringify(schemaData)}}
      </Script>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">{h1}</h1>
        <div className="prose max-w-none">
          <p>欢迎来到智印云，我们提供专业的{keyword}服务。请联系我们获取报价。</p>
        </div>
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">常見問題</h2>
          <div className="space-y-4">
{faq_jsx}
          </div>
        </div>
      </div>
    </>
  );
}}
'''
    with open(page_file, 'w', encoding='utf-8') as f:
        f.write(page_code)
    print(f"✅ 已创建页面并注入Schema: {page_file}")
    return True

def update_existing_page(patch, page_file):
    # 简单起见，直接覆盖内容（谨慎操作会备份）
    backup_file = page_file + ".bak"
    if not os.path.exists(backup_file):
        with open(page_file, 'r', encoding='utf-8') as f:
            old_content = f.read()
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(old_content)
    # 重新创建页面（使用最新补丁内容）
    return create_missing_page(patch)

def apply_patch(patch):
    keyword = patch['keyword']
    slug = slugify(keyword)
    page_dir = os.path.join(APP_DIR, slug)
    page_file = os.path.join(page_dir, "page.tsx")
    if not os.path.exists(page_file):
        return create_missing_page(patch)
    else:
        return update_existing_page(patch, page_file)

def main():
    patch_file = get_latest_patch_file()
    if not patch_file:
        print("❌ 未找到补丁文件（patches_v2*.json）")
        return
    with open(patch_file, 'r', encoding='utf-8') as f:
        patches = json.load(f)
    success = 0
    for patch in patches:
        if apply_patch(patch):
            success += 1
    print(f"\n🎉 共处理 {len(patches)} 个补丁，成功 {success} 个。")

if __name__ == "__main__":
    main()