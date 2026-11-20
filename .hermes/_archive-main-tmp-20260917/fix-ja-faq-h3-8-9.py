#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/9 补跑: ja FAQ H3 化 (retrofit 脚本 anchor "4 つのFAQ" 漏了"よくある"导致未匹配)
"""
import json
import re

SLUG = "baby-product-label-sticker-printing-guide"
path = r"F:\zprintpro-nextjs\src\data\blog-data\ja.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
content = data[SLUG]["content"]

faq_intro_old = "<h3>6. 4 つのよくある質問</h3>"
i = content.find(faq_intro_old)
if i < 0:
    print("FAIL: ja faq intro not found")
else:
    j = content.find("<h3>7. ZprintProを選ぶ理由</h3>", i)
    if j < 0:
        print("FAIL: ja h3 7 not found")
    else:
        faq_section = content[i + len(faq_intro_old):j]
        faq_p_pattern = re.compile(
            r"<p><strong>(Q:[^<]+)</strong><br/>(.*?)</p>", re.DOTALL
        )
        matches = faq_p_pattern.findall(faq_section)
        print(f"found {len(matches)} FAQ <p> blocks")
        if len(matches) >= 4:
            TEXT_DARK = "#333333"
            TEXT_PARA = "#444444"
            new_faq = ""
            for k, (q, a) in enumerate(matches[:4], 1):
                new_faq += (
                    f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
                    f"{q}</h3>"
                )
                a_with_num = a.replace("A:", f"A{k}：", 1) if a.startswith("A:") else a
                new_faq += (
                    f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
                    f"<strong>A{k}：</strong>{a_with_num}</p>"
                )
            new_content = (
                content[: i + len(faq_intro_old)] + new_faq + content[j:]
            )
            data[SLUG]["content"] = new_content
            new_len = len(new_content)
            print(
                f"ja FAQ H3 升级: chars {len(content)} -> {new_len} "
                f"(delta +{new_len - len(content)})"
            )
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print("wrote")
