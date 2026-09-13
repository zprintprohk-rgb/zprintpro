# 门禁豁免政策与 sunset（2026-09-13，K3 转述千问 3.8max 复核后收紧）

**依据**: K3 2026-09-13 转述千问 3.8max 复核结论 —— 「meta 豁免认可；`src/data` 豁免不认可整树豁免，收紧为白名单制 + 设 sunset」

---

## 1. 现行豁免口径（三档）

| 档 | 路径/对象 | 口径 | 理由 |
|---|---|---|---|
| **A. 全规则豁免** | `AGENTS.md`（规则书）、`.hermes/logs|reports|memory`（证据日志）、`scripts/guards/`、`scripts/check-*`、`scripts/canonical/`、`.githooks/`（门禁基础设施自身） | 跳过全部规则 | 规则书必须能引用禁用形态作反例；日志是历史记录；门禁代码自引用。**千问认可**（行业标准做法） |
| **B. 引用型规则豁免** | `docs/**` 等既有豁免路径 | 仅豁免「引用型规则」：`BRAND_DOUBLE`·`BRAND_TYPO`·`BRAND_LOCALE_MISMATCH`·`BRAND_JA_ALTERNATE`·`I18N_POLLUTION`·`I18N_TITLE_LENGTH`·`I18N_CURRENCY`·`PHONE_*` | 文档需引用禁用字面；数据诚信类（`CRED_*`/`SOP10_*`）**仍强制扫描** |
| **C. locale 作用域 + token 白名单** | `src/**`（含 `src/data/**`，**已无整树豁免**） | 语言混用类规则按 **locale 字段作用域**判定（命中落在哪个 locale 键管辖范围内）；另设 `LEGIT_MIX_TOKENS` 枚举白名单（币种/标准认证码/自有品牌/机型/纸张尺寸） | 千问意见：src/data 是用户可见字符串最密集处，整树豁免 = 摘掉守卫；改为真同源检查后只豁免枚举 token |

## 2. 为什么不是「整树豁免」

千问的硬理由（采纳）：`src/data` 里是 faq JSON、quickAnswers、`sku-seo-data`、product-faqs 等**用户可见字符串最密集**的文件；在那里豁免语言混用检查，等于把守卫从暴露最高的面上摘掉 —— 下次有人往 data JSON 塞混用字符串，门禁静默放行、直接上线。

收紧后的实测效果（`blog-posts.ts` 同一文件）：
- `I18N_POLLUTION` 34 → **0**（ja 文本里的「会」不再误报）
- `I18N_CURRENCY` → **0**
- `BRAND_LOCALE_MISMATCH` 16 → **8**，且**剩余 8 条是真阳性**（zh-hk 字段内出现 `ZprintPro`）——正是整树豁免会掩盖掉的那一类。

## 3. 流程补偿（伴随 C 档）

凡**触碰 `src/data/**`** 的批次，commit 前须附一次「语言混用 diff 人工复核」：
```bash
node scripts/check-i18n-mix-diff.mjs          # 只报告 staged diff 的语言混用命中, 供人工判读
```

## 4. sunset（无到期日的豁免就是永久漏洞）

- **复审时点**：T 批（title/schema 面品牌收口）结束后**立即**复审一次本文件 C 档口径。
- **复审内容**：① 是否仍有必要保留 token 白名单（若混用误报已归零 → 撤白名单）② `BRAND_LOCALE_MISMATCH` 的 locale 判定是否升级为语法级（当前是「最近左侧 locale 键」启发式，对三元表达式等代码写法会误判，已知局限）。
- **复审产出**：更新本文件 + 记录决定（收紧 / 维持 / 撤回）+ 若维持须给出下一个 sunset 日期。
