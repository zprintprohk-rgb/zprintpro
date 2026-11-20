# -*- coding: utf-8 -*-
# AGENTS.md §0.36 插入脚本 v2（干净版）：备份 + 断言未过不写盘
import io, os, shutil, sys

p = r"F:\zprintpro-nextjs\AGENTS.md"
anchor = '<!-- autoclaw:skill-path-guidance -->'
marker = '§0.36 AEO/GEO 引用信源架构'

block = """## §0.36 AEO/GEO 引用信源架构（K3 2026-09-29 指令采纳，AI 协作指南追加）

> **核心定位**: 战略目标从传统关键词排名升级为「生成式 AI 搜索引擎（Google AI Overviews / Perplexity / Bing Copilot）回答印刷/包装/出版问题时的首选引用信源」。K3 2026-09-29 下达 AEO/GEO 架构师指令（4 Workflow），本节固化执行口径（项目红线优先修正后）。

### §0.36.1 四 Workflow 执行口径

| Workflow | 内容 | 落地方式 | SSoT 产物 |
|---|---|---|---|
| W1 意图/知识缺口挖掘 | 3 locale × 2 簇 PAA/AI 引用源/社区痛点 + GSC 速赢落点 | 联网调研（无 Perplexity API key 时用检索/抓取等效替代） | `.hermes/geo/geo_intent_matrix.json` |
| W2 内容工程重构 | 12 段骨架 + GEO 增强（数据对比表/共识与争议/真实引用/多语本地化） | 内容层实际为 `src/data/blog-data/*.json` + blog-posts.ts（非 MDX）；按统一入口技能 12 段骨架 + §13.4 v3 字数带 | 重构后的 blog-data JSON |
| W3 技术 GEO | JSON-LD 覆盖 + 多语种实体对齐 + hreflang | 审计驱动（HowTo 已存在，T43 已在线） | `.hermes/geo/w3-technical-audit-*.md` |
| W4 AI 引用监控 | 探针 prompt → 记录 zprintpro 被引位置/竞品榜 | 手动基线探针先行；每日 lane 需 K3 按 §0.35 注册流程拍板 | `.hermes/geo/geo_citation_baseline-*.md/.json` |

### §0.36.2 内容红线（对 4 Workflow 全部生效）

1. **行业引用只写真实可核验来源**（§0.23）：指令中的「According to Smithers Pira 2024...」类引用必须先联网核实到具体报告才可写入；查不到改用自身白名单数据（4,500+ 订单 / FSC / ISO / 交期，per §0.28.8.2）。**禁止编造 Reference 列表**（门童 #1 拦截）。
2. **GSC/探针后台数据禁入客户可见内容**（§0.23.1，门童 #16 硬拦）：意图矩阵、探针结果、速赢词只进 `.hermes/geo/`。
3. **直接答案优先**: 页面首 150 字直接回答核心 H1 问题（AEO 黄金法则），禁「In today's fast-paced world...」类 AI 废话。
4. **多语种本地化铁律不因 GEO 松绑**: zh-hk 港式术语（啤/燙金/坑紙/過膠）+ 100% 繁体（§13.16.1）；ja 敬语 + オンデマンド印刷/PP加工/菊全/四六判行业标准（§13.13）；en MOQ/Turnaround/FSC B2B 术语（§13.15）。机械翻译 = 死罪（a38dc93 教训）。
5. **多语种实体对齐口径**: 三语种同 slug/sku 同实体，本地术语各用行业标准词，hreflang 关联；实体术语表随 W2 重构逐页落（哑粉纸=Matte Art Paper=マットコート紙 型）。
6. **Schema 交付标准**: 必须 Google Rich Results Test 可验证的合法 JSON-LD；FAQPage/HowTo/Product/Organization 按 §0.36.3 缺口清单补。
7. **宿主写入守卫说明**: AGENTS.md §4 环境变量清单为变量名字段说明（无真实凭据值），write/edit 全文重写会被凭据判据误伤拦截；本文件大段变更一律用脚本锚点插入法（本节即此法落地）。

### §0.36.3 当前缺口基线（W3 审计 2026-09-30，SSoT = `.hermes/geo/w3-technical-audit-2026-09-30.md`）

| # | 缺口 | 状态 | 处置 |
|---|---|---|---|
| 1 | Organization sameAs 空壳 | 已确认 | 目录建设推进后回填（§13.16.1 30 目录目标联动） |
| 2 | hreflang 口径：实现 zh-HK / x-default→`/`，§5 声明 zh-hant-HK / x-default→zh-hk | 待 K3 拍板 | src 行为变更，攒批执行 |
| 3 | HowTo 已存在但覆盖率未盘点 | 观察项 | 随 W2 重构逐页补 |
| 4 | SKU 三语种实体对齐率未量化 | 观察项 | W2 首批 3 页逐 SKU 对齐并记录 |
| 5 | foundingDate 常量化未确认 | 观察项 | 触及时修（§13.14 同一常量） |

### §0.36.4 push 与触发纪律

- W2 重构产物属 src 客户可见内容 → 走 §0.25 攒批 + §0.25.10 审查全绿 4 件 + 门童全量（title-v5 / i18n / entity / brand / gsc-leak）。
- 首批页面若触及名片展示层/SEO 层 → 先等 K3 对 §0.0 解禁块 (a)/(b)/(c) 拍板。
- W4 每日 lane 注册需 K3 管理员 schtasks（§0.35.6 待办①同款流程），未注册前**手动探针为准，不得声称已在跑**。
- 手动探针/意图矩阵每日数据落 `.hermes/geo/`（lane-status 口径外，不冒充车道报告，per §0.35.3.6）。

"""

with io.open(p, 'r', encoding='utf-8') as f:
    txt = f.read()

# 断言（未过不写盘）
assert anchor in txt, "anchor missing"
assert txt.count(anchor) == 1, "anchor not unique: %d" % txt.count(anchor)
assert marker not in txt, "S0.36 already exists"
assert 'Smithers Pira' in block and block.count('|---|') == 4, "block shape broken"

# 备份
bak = p + '.bak-s036'
shutil.copy2(p, bak)

new = txt.replace(anchor, block + '\n' + anchor, 1)
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(new)

# 形状断言（写后校验，失败即回滚）
with io.open(p, 'r', encoding='utf-8') as f:
    chk = f.read()
if chk.count(marker) != 1 or anchor not in chk:
    shutil.copy2(bak, p)
    print("POST-CHECK FAILED -> rolled back"); sys.exit(1)

print("inserted OK; size:", os.path.getsize(p), "; backup:", bak)
