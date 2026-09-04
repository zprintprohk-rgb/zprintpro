# 14 门童统一测试集 (K3 v3.3 §1.3 防误报失控, 9/8 门童冻结令前必交)

> **来源**: K3 v3.3 §1.3 "9/8 前冻结门童新增, 先给现有 14 道门童写统一测试集"
> **校准日期**: 2026-09-04
> **配套**: `scripts/guards/*.js` (实际 14 门童源代码) + `AGENTS.md` §0.31.1-§0.31.1.7 + `.hermes/decision-register.md`
> **拍板**: K3 v3.3 §1.3 拍板 "9/8 前冻结门童新增, 先给现有 14 道门童写统一测试集" (D-9/2-44 §14.4 #8 默认项)
> **基线建立**: 待跑 (9/5 14:00 跑全 14 门童 + 140+ test case 出基线, 输出 `.hermes/tests/14-guards-fp-report-2026-09-05.md`)

---

## 1. 测试集目标

### 1.1 核心目标: 防误报失控

**K3 v3.3 §1.3 风险**: "门童规则膨胀（已 14 道）没有统一回归测试，存在误报率失控可能（9/15 升硬拦前必须先过 FP 复盘）"

**测试集 = 防止误报率 ≥10% 升硬拦前失控**。

| 指标 | 目标 | 9/8 解除冻结令条件 | 9/15 升硬拦条件 |
|------|------|--------------------|-----------------|
| **误报率 (FP)** | **<10%** | 必达 | 必达 |
| 拦截率 (TP) | ≥90% | (per §0.31.8) | 必达 |
| 已 pattern 化错误复发 | 0 | (per §0.31.8) | 必达 |
| hook 耗时 | <5s | (per §0.31.8) | 必达 |

### 1.2 测试规模 (per 14 门童)

**每门童**: ≥ 5 正向 case (PASS) + ≥ 5 反向 case (FAIL) = **≥ 10 test case/门童**

**总计**: 14 门童 × 10 = **140+ test case**

### 1.3 测试集层级

1. **Layer 1 单元测试**: 14 门童单独跑 (per §4) — 每门童 5+5 test case
2. **Layer 2 集成测试**: 全 14 门童端到端跑 (per §5) — 3 sample (合规/轻微违规/单门童 FAIL)
3. **Layer 3 误报率 FP 计算**: 反向 case 中期望 FAIL 但门童 PASS 的比例 (per §6)
4. **Layer 4 9/8 解除冻结令条件**: FP <10% + 14 门童 PASS + K3 拍板 (per §7)

### 1.4 测试数据 schema

```yaml
test_case:
  id: "#N-NN"  # 门童 #N 第 NN 个 test case
  guard: "credibility-guard"  # 门童文件名
  rule_id: "CRED_ISO_9001"  # 触发的具体 rule (反向 case 必填)
  type: "正向 PASS" | "反向 FAIL"
  severity: "red" | "orange" | "yellow"
  input:
    file: "src/data/blog-data/zh-hk.json"  # 输入文件路径
    snippet: |  # 5-10 行 code/markdown snippet
      title: "包装盒印刷 Pillar | 12,000+ 字深度指南"
      body: "深圳彩龙印刷提供高品质包装盒..."
  expected: "PASS" | "FAIL"
  expected_match: ""  # 反向 case: 期望匹配到的 rule ID
  notes: "K3 拍板来源 + 边界说明"
```

---

## 2. 14 门童清单 + 测试规模

### 2.1 14 门童总览 (per scripts/guards/*.js 实际)

| # | 门童 | 严重度 | 规则数 | 脚本 | K3 拍板来源 |
|---|------|--------|--------|------|-------------|
| #1 | 数据诚信 (credibility) | 🟠 orange | 11 | `scripts/guards/credibility-guard.js` | K3 9/1 12:27 派活包 |
| #2 | 真实电话 (phone) | 🔴 red | 4 | `scripts/guards/phone-guard.js` | K3 §13.10 + K3 9/1 15:06 |
| #3 | 品牌分层 (brand) | 🔴 red | 5 | `scripts/guards/brand-guard.js` | K3 §13.16 v2 |
| #4 | 跨语言污染 (i18n) | 🟡 yellow + 🔴 red 部分 | 6+8+8=22 | `scripts/guards/i18n-guard.js` | K3 9/1 15:06 + K3 9/2 08:50 GLM |
| #5 | SOP-10 5 问门禁 (sop10) | 🟡 yellow + 🔴 red SEC | 8 | `scripts/guards/sop10-guard.js` | K3 9/1 15:06 + §0.22 |
| #6 | 实体注册 (entity) | 🔴 red (§0.32 P0) | 5 | `scripts/guards/entity-guard.js` | K3 9/1 18:50 §0.32 |
| #7 | 数据口径 (count) | 🟠 orange | 5 | `scripts/guards/count-guard.js` | K3 9/2 08:09 push 痛骂 |
| #8 | 决策登记簿 (register) | 🟡 yellow + 🟠 orange | 3 | `scripts/guards/register-guard.js` | K3 9/2 09:05 拍板 #3 |
| #9 | GSC 数据源 (gsc-source) | 🟡 yellow | 3 | `scripts/guards/gsc-source-guard.js` | K3 9/2 09:29 派活包 GLM §J |
| #10 | Pillar 12,000+ 字 (pillar) | 🔴 red | 3 | `scripts/guards/pillar-guard.js` | K3 9/3 19:23 拍板 v1.4 |
| #11 | Blog 标准 (blog-standard) | 🔴 red | 9 | `scripts/guards/blog-standard-guard.js` | K3 9/3 19:29 拍板 v1.5 |
| #12 | 内部链接 + WhatsApp CTA | 🔴 red | 2 | `scripts/guards/internal-links-cta-guard.js` | K3 9/3 22:44 拍板 v1.6 |
| #13 | Blog 质量 12 条铁律 | 🔴 red | 12 | `scripts/guards/blog-quality-12-rules-guard.js` | K3 9/3 23:29 派活包 |
| #14 | blog-data JSON 严格校验 | 🔴 red | 5 | `scripts/guards/blog-data-integrity-guard.js` | K3 9/4 拍板 (9/3-9/4 部署事故固化) |

**14 门童 × 97 规则总数** (注: i18n 算 22 = 6 基础 + 8 en + 8 ja, 其他 12 门童共 75 规则)

### 2.2 测试规模 (per 门童)

| 门童 | 正向 case | 反向 case | 集成 case | 小计 |
|------|----------|----------|----------|------|
| #1 credibility | 5 | 5 | 3 (集成) | 13 |
| #2 phone | 5 | 5 | 3 | 13 |
| #3 brand | 5 | 5 | 3 | 13 |
| #4 i18n | 5 | 5 (en 2 + ja 2 + zh 1) | 3 | 13 |
| #5 sop10 | 5 | 5 | 3 | 13 |
| #6 entity | 5 | 5 (zh-hk 4 + ja 1 自动豁免验证) | 3 | 13 |
| #7 count | 5 | 5 | 3 | 13 |
| #8 register | 5 | 5 | 3 | 13 |
| #9 gsc-source | 5 | 5 | 3 | 13 |
| #10 pillar | 5 | 5 (Pillar 字数/schemas) | 3 | 13 |
| #11 blog-standard | 5 | 5 (date/title/字数/excerpt) | 3 | 13 |
| #12 internal-links-cta | 5 | 5 (内链 < 10 + WA CTA < 3) | 3 | 13 |
| #13 blog-quality-12-rules | 5 | 5 (Rule 1, 2, 8, 11, 12 各 1) | 3 | 13 |
| #14 blog-data-integrity | 5 | 5 (parse/ctrl/mojibake/keys/empty) | 3 | 13 |
| **合计** | **70** | **70** | **42** | **182** |

**总 test case 数: 182** (per 9/5 14:00 跑测 SOP 出基线报告)

---

## 3. 测试数据 schema (统一格式)

### 3.1 input 字段

| 子字段 | 必填 | 说明 |
|--------|------|------|
| `file` | Y | 输入文件路径 (相对 `F:\zprintpro-nextjs\`) |
| `snippet` | Y | 5-10 行 code/markdown/json snippet, 体现 trigger or 干净文本 |
| `context` | N | 上下文 (如 zh-hk 站点, en 站点, ja 站点, Pillar blog, 报告类等) |

### 3.2 expected 字段

| 子字段 | 必填 | 说明 |
|--------|------|------|
| `result` | Y | `PASS` (门童不触发) / `FAIL` (门童触发) |
| `match_rule_id` | 反向 case 必填 | 期望匹配到的 rule ID (e.g., `CRED_ISO_9001`) |
| `match_location` | 反向 case 可选 | 期望匹配位置 (e.g., line 5, column 10) |
| `severity` | 反向 case 必填 | 严重度 (red/orange/yellow) |

### 3.3 严重度 (severity)

- 🔴 **red** = 硬拦 (默认) — 命中立即 exit 1
- 🟠 **orange** = shadow mode (9/1-9/15) — 仅警告, 不拦截 commit
- 🟡 **yellow** = shadow mode (9/15 后转正) — 仅警告

### 3.4 测试样本存放路径

所有 test case input 样本落地 `.hermes/tests/samples/` 子目录 (9/5 14:00 跑测前 M3 建好):
```
.hermes/tests/samples/
├── credibility/      # 门童 #1 样本
│   ├── pass-01-clean-text.md
│   ├── fail-01-iso-9001.md
│   └── ...
├── phone/
├── brand/
├── ... (14 子目录)
└── integration/      # §5 集成测试 3 sample
    ├── sample-1-pillar1-zhhk-compliant.md
    ├── sample-2-pillar4-zhhk-4cta.md
    └── sample-3-single-guard-fail.md
```

---

## 4. 14 门童 单独 test case

### 4.1 门童 #1 数据诚信 (credibility-guard.js) — 11 类规则

**规则集**: CRED_ISO_9001 / CRED_FSC_C123456 / CRED_TUV_RHEINLAND / CRED_1000_PLUS / CRED_4_PLUS_NUMBER / CRED_X_INDUSTRIES / CRED_X_FOLD / CRED_INTL_TOP / CRED_15_YEARS / CRED_SELF_FACTORY / CRED_HEIDELBERG

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #1-01 | PASS | — | 智印港 ISO 認證體系 + 多年印刷经验 + 深圳平湖廠房 + 香港服務點 | PASS (无 11 类 trigger) | 经营参数白名单豁免 (per common.js `isOperationalWhitelist()`) |
| #1-02 | PASS | — | FSC 認証紙 + 大豆油墨 + FDA + EU REACH + 100 個起印 + 順豐 | PASS (材质/价格/业务洞察 全部白名单) | 9/1 §13.10 真实主体 |
| #1-03 | PASS | — | 多年印刷经验 + 多行业经验 + 多道工序 | PASS (无具体数字) | 模糊措辞 OK |
| #1-04 | PASS | — | 全球客户 + 深圳 + 平湖 + 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌 | PASS (无硬数字) | §0.32 允许表述 |
| #1-05 | PASS | — | 急件 18:00 截單翌日 12:00 順豐 + 4 天交期 | PASS (时间/物流白名单) | 经营参数白名单 |
| #1-06 | FAIL | CRED_ISO_9001 | 本公司已通過 ISO 9001:2015 認證 | FAIL → CRED_ISO_9001 🟠 | K3 9/1 12:27 派活包 |
| #1-07 | FAIL | CRED_FSC_C123456 | FSC®-C123456 認證 | FAIL → CRED_FSC_C123456 🟠 | 同上 |
| #1-08 | FAIL | CRED_1000_PLUS | 服務 1,000+ 客戶 | FAIL → CRED_1000_PLUS 🟠 | 同上 |
| #1-09 | FAIL | CRED_15_YEARS | 15+ 年印刷經驗 | FAIL → CRED_15_YEARS 🟠 | 同上 |
| #1-10 | FAIL | CRED_HEIDELBERG | 海德堡 6+1 印刷機 | FAIL → CRED_HEIDELBERG 🟠 | 同上 |
| #1-11 | FAIL | CRED_SELF_FACTORY | 自設廠房 + 自有印刷團隊 | FAIL → CRED_SELF_FACTORY 🟠 | §13.10 真实主体 |

### 4.2 门童 #2 真实电话 (phone-guard.js) — 4 类规则

**规则集**: PHONE_HK_BLACKLIST / PHONE_WA_852 / PHONE_NON_WHITELIST / PHONE_CN_WHITELIST (不拦)

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #2-01 | PASS | — | 聯絡我們 +86 198 8085 1334 (K3 唯一号) | PASS (白名单) | 业务号码不拦 |
| #2-02 | PASS | — | wa.me/8619880851334 立即 WhatsApp 咨詢 | PASS (白名单) | K3 §13.10 真实主体 |
| #2-03 | PASS | — | 郵箱 zprintpro@outlook.com (无电话) | PASS (无 trigger) | 邮箱不属本门童 |
| #2-04 | PASS | — | 香港服務點 (城市名允许, 无具体电话) | PASS | §0.32 允许表述 |
| #2-05 | PASS | — | 深圳 + 平湖 + 智印港 (无具体电话) | PASS | 同上 |
| #2-06 | FAIL | PHONE_HK_BLACKLIST | +852 9225 8890 立即聯絡 | FAIL → PHONE_HK_BLACKLIST 🔴 | K3 §13.10 phase-out 181 → 198 |
| #2-07 | FAIL | PHONE_WA_852 | wa.me/85292258890 | FAIL → PHONE_WA_852 🔴 | 同上 |
| #2-08 | FAIL | PHONE_NON_WHITELIST | +1 415 555 1234 (US 号) | FAIL → PHONE_NON_WHITELIST 🟠 | 非白名单格式, K3 拍板可豁免 |
| #2-09 | FAIL | PHONE_HK_BLACKLIST | +852 2345 6789 (港号) | FAIL → PHONE_HK_BLACKLIST 🔴 | 经营参数白名单不豁免此门童 |
| #2-10 | FAIL | PHONE_WA_852 | wa.me/85212345678 | FAIL → PHONE_WA_852 🔴 | 同上 |

### 4.3 门童 #3 品牌分层 (brand-guard.js) — 5 类规则

**规则集**: BRAND_DOUBLE / BRAND_TYPO / BRAND_LOCALE_MISMATCH / BRAND_JA_ALTERNATE / BRAND_CONSISTENCY

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #3-01 | PASS | — | zh-hk: 智印港提供咭片印刷服務 | PASS (单品牌 zh-hk) | §13.16 v2 单品牌分层 |
| #3-02 | PASS | — | en: ZprintPro offers business card printing | PASS (单品牌 en) | 同上 |
| #3-03 | PASS | — | ja: ZprintPro は名刺印刷を提供 | PASS (单品牌 ja) | 同上 |
| #3-04 | PASS | — | ja (alternate): ジープリント で名刺印刷 | PASS (alternate 单独) | K3 8/8 02:52 §13.16.1 |
| #3-05 | PASS | — | meta title 智印港 \| 包裝盒印刷 + ZprintPro.com | PASS (title 不同时出现) | locale 隔离 OK |
| #3-06 | FAIL | BRAND_DOUBLE | 智印港 ZprintPro 為您提供咭片印刷 | FAIL → BRAND_DOUBLE 🔴 | zh-hk 禁双品牌 |
| #3-07 | FAIL | BRAND_TYPO | 智印印港提供咭片印刷 (错字) | FAIL → BRAND_TYPO 🔴 | §13.16 v2 红线 |
| #3-08 | FAIL | BRAND_LOCALE_MISMATCH | 智印港 ZprintPro 在香港 (zh-hk 站点) | FAIL → BRAND_LOCALE_MISMATCH 🔴 | 跨语言混用 |
| #3-09 | FAIL | BRAND_JA_ALTERNATE | ジープリント ZprintPro で名刺印刷 (ja 站点) | FAIL → BRAND_JA_ALTERNATE 🟠 | ja alternate 禁与 ZprintPro 字面同时出现 |
| #3-10 | FAIL | BRAND_DOUBLE | ZprintPro 智印港 名刺印刷 (en 站点) | FAIL → BRAND_DOUBLE 🔴 | en 禁双品牌 (虽然 en 主体 = ZprintPro, 智印港仍禁) |

### 4.4 门童 #4 跨语言污染 (i18n-guard.js) — 6 基础 + 8 en + 8 ja

**规则集 (基础)**: I18N_POLLUTION / I18N_TITLE_LENGTH / I18N_META_LENGTH / I18N_CURRENCY / I18N_FOOD_BOXES_CROSS / (I18N_FULL_WIDTH v3)
**规则集 (en 禁词)**: EN_MADE_IN_USA / EN_US_BASED / EN_AMERICAN_MADE / EN_100_PERCENT_DOMESTIC / EN_100_PERCENT_USA / EN_ALL_AMERICAN_MADE / EN_NAKED_FREE_SHIPPING / EN_NAKED_BULK_DISCOUNT
**规则集 (ja 禁词)**: JA_激安 / JA_業界最安 / JA_業界最高 / JA_最安値 / JA_NO_1 / JA_業界一 / JA_日本一 / JA_NAKED_FREE_SHIPPING

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #4-01 | PASS | — | zh-hk: 包裝盒印刷品質保證 + 30 字 title | PASS (无简体残留 + title 50-60) | §0.29 v3.1 |
| #4-02 | PASS | — | en: Business card printing with HK$ pricing | PASS (无 FTC 禁词 + 币种统一) | 跨境统一 HK$ |
| #4-03 | PASS | — | ja: 名刺印刷は ZprintPro で高品質 | PASS (无景表法禁词) | 经营参数允许 |
| #4-04 | PASS | — | title 55 当量 (zh-hk) + 150 字符 description | PASS (字符体检过) | 半角当量计算 |
| #4-05 | PASS | — | Free SF shipping over HK$500 (en) | PASS (有条件限定, OK) | 经营参数白名单 |
| #4-06 | FAIL | I18N_POLLUTION | 包装盒印刷 (zh-hk 站点, 简体"装"残留) | FAIL → I18N_POLLUTION 🔴 | §0.29 v3.1 零容忍 |
| #4-07 | FAIL | I18N_CURRENCY | Price: USD 100 (zh-hk 站点) | FAIL → I18N_CURRENCY 🟡 | 跨境统一 HK$ |
| #4-08 | FAIL | EN_MADE_IN_USA | Made in USA with global shipping (en) | FAIL → EN_MADE_IN_USA 🔴 | FTC Act §5 (GLM 9/2 08:50 P0) |
| #4-09 | FAIL | EN_NAKED_FREE_SHIPPING | Free Shipping (en, 无 HK$500 限定) | FAIL → EN_NAKED_FREE_SHIPPING 🟠 | 真实经营参数 |
| #4-10 | FAIL | JA_激安 | 激安名刺印刷 (ja) | FAIL → JA_激安 🟠 | 改用 格安/コスパ |
| #4-11 | FAIL | JA_業界最安 | 業界最安名刺印刷 (ja) | FAIL → JA_業界最安 🔴 | 景表法 不当表示防止法 |
| #4-12 | FAIL | JA_NO_1 | 名刺印刷 No.1 (ja) | FAIL → JA_NO_1 🔴 | 同上 |

### 4.5 门童 #5 SOP-10 5 问门禁 (sop10-guard.js) — 8 类规则

**规则集**: SOP10_CERT_NO / SOP10_24H_SLA / SOP10_HEIDELBERG_6_1 / SOP10_12_INDUSTRIES / SOP10_INTL_TOP / SOP10_4_PLUS_NUMBER / SOP10_15_YEARS / SECRET_LEAK

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #5-01 | PASS | — | 智印港 ISO 認證體系 + 多年經驗 + 急件 18:00 截單翌日 12:00 順豐 | PASS (无 SOP-10 trigger) | §0.22 5 问门禁 |
| #5-02 | PASS | — | 4 天交期 + 100 個起印 (无硬数字) | PASS (无 4 位数无来源) | 经营参数白名单 |
| #5-03 | PASS | — | 母公司品牌音译: 彩龍 / Cai Long / 彩龍印刷 | PASS (允许表述) | §0.32 补完 |
| #5-04 | PASS | — | 多行业经验 + 多道工序 | PASS (无具体数字) | 模糊措辞 |
| #5-05 | PASS | — | src/lib/env.ts 中 AIRWALLEX_API_KEY=ENV_VAR (环境变量) | PASS (硬编码检测须 ARK_API_KEY=xxx 真实值) | SECRET_LEAK 边界 |
| #5-06 | FAIL | SOP10_CERT_NO | FSC-C123456 (硬证书号) | FAIL → SOP10_CERT_NO 🔴 | §0.22 第 4 款 + §0.23 |
| #5-07 | FAIL | SOP10_24H_SLA | 24h SLA 99.2% 達成率 | FAIL → SOP10_24H_SLA 🟡 | §0.22 5 问 3 款 |
| #5-08 | FAIL | SOP10_12_INDUSTRIES | 12 大行業 / 4 大行業標配 | FAIL → SOP10_12_INDUSTRIES 🟡 | 撤除 |
| #5-09 | FAIL | SOP10_15_YEARS | 15 年 / 十五年印刷經驗 | FAIL → SOP10_15_YEARS 🟡 | 撤除 |
| #5-10 | FAIL | SECRET_LEAK | ARK_API_KEY=sk-live-abcdef1234567890abcdef | FAIL → SECRET_LEAK 🔴 (per §0.27.8) | **豁免路径也强制扫描** (per `isExemptPath`) |

### 4.6 门童 #6 实体注册 (entity-guard.js) — 5 类规则 (§0.32 P0)

**规则集**: ENTITY_FULL_NAME_ZH / ENTITY_ADDRESS_ZH / ENTITY_FULL_NAME_EN / ENTITY_ADDRESS_EN / ENTITY_ZIPCODE
**扫描范围**: SCAN_LOCALES = ["zh-hk", "zh-HK"], ja/en 自动豁免

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #6-01 | PASS | — | zh-hk: 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌 | PASS (允许表述) | §0.32 补完 |
| #6-02 | PASS | — | zh-hk: 深圳 + 平湖 (城市名允许) | PASS (单独城市 OK) | §0.32 补完 |
| #6-03 | PASS | — | ja: 深圳市彩龍印刷包裝有限公司 + 廣東省深圳市龍崗區平湖街道嘉城路 1 號 (日本合同法要求) | PASS (ja 自动豁免) | §0.32 战略级分层 |
| #6-04 | PASS | — | en: 1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen 518111 | PASS (en 暂保留) | §0.32 战略级分层 |
| #6-05 | PASS | — | zh-hk: 深圳彩龍 印刷服務 (城市+品牌组合) | PASS (允许组合) | §0.32 补完 |
| #6-06 | FAIL | ENTITY_FULL_NAME_ZH | zh-hk: 深圳市彩龍印刷包裝有限公司 提供咭片印刷 | FAIL → ENTITY_FULL_NAME_ZH 🔴 | §0.32 第 1 禁词 |
| #6-07 | FAIL | ENTITY_ADDRESS_ZH | zh-hk: 廣東省深圳市龍崗區平湖街道嘉城路 1 號 | FAIL → ENTITY_ADDRESS_ZH 🔴 | §0.32 第 2 禁词 |
| #6-08 | FAIL | ENTITY_FULL_NAME_EN | zh-hk: Shenzhen Cai Long Printing Packaging Co., Ltd. 提供咭片印刷 | FAIL → ENTITY_FULL_NAME_EN 🔴 | §0.32 第 3 禁词 |
| #6-09 | FAIL | ENTITY_ADDRESS_EN | zh-hk: 1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen 518111 | FAIL → ENTITY_ADDRESS_EN 🔴 | §0.32 第 4 禁词 |
| #6-10 | FAIL | ENTITY_ZIPCODE | zh-hk: 郵編 518111 (单独邮编) | FAIL → ENTITY_ZIPCODE 🔴 | §0.32 第 5 禁词 |

### 4.7 门童 #7 数据口径必填 (count-guard.js) — 5 类规则

**规则集**: COUNT_NO_SOURCE / COUNT_NO_4_LOCALE / COUNT_NO_CALIBRATION / COUNT_MISLEADING / COUNT_NO_RETRACTION

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #7-01 | PASS | — | 报告含 79 blog + 数据来源 src/data/blog-data/zh-hk.json + 校准日期 2026-09-02 + zh-hk 79/en 80/ja 80/blog-posts.ts 85 双口径 | PASS (4 要素齐) | §0.33.4 PASS 示例 |
| #7-02 | PASS | — | 报告无数字, 仅描述 "本派活包修复完成" | PASS (无数字 → 不触发) | NUMBER_TRIGGERS 必含才触发 |
| #7-03 | PASS | — | 报告含 4,820 訂單 + 数据来源 + 校准日期 + 校准状态 已校准 (commit 6c2f4a94) | PASS (含具体数字 + 4 要素) | 12 铁律护城河 |
| #7-04 | PASS | — | 报告撤回: "原 commit abc1234 撤回数据 X, 撤回日期 2026-09-02" | PASS (撤回声明齐) | §0.23 数据诚信红线 |
| #7-05 | PASS | — | 报告含 12 Pillar + 数据来源 + 校准日期 2026-09-03 | PASS (含数字但 4 要素齐) | 双口径表 OK |
| #7-06 | FAIL | COUNT_NO_SOURCE | M3 报告 zh-hk 79 blog (无数据来源行) | FAIL → COUNT_NO_SOURCE 🟠 | K3 9/2 08:09 push 痛骂 |
| #7-07 | FAIL | COUNT_NO_4_LOCALE | 报告含 79 blog + 数据来源 + 校准日期 (无 zh-hk/en/ja/SSoT 双口径) | FAIL → COUNT_NO_4_LOCALE 🟠 | §0.33.1 必填 |
| #7-08 | FAIL | COUNT_NO_CALIBRATION | 报告含 79 blog + 数据来源 (无校准日期) | FAIL → COUNT_NO_CALIBRATION 🟡 | §0.23 数据诚信红线 |
| #7-09 | FAIL | COUNT_MISLEADING | 报告写 zh-hk 79 但 SSoT 85, 未标双口径 | FAIL → COUNT_MISLEADING 🟠 | §0.33 数据口径校准 |
| #7-10 | FAIL | COUNT_NO_RETRACTION | 报告撤回数据 X, 但缺 "原 commit ID + 撤回日期" | FAIL → COUNT_NO_RETRACTION 🟡 | §0.23 |

### 4.8 门童 #8 决策登记簿 (register-guard.js) — 3 类规则

**规则集**: REGISTER_NO_ID / REGISTER_NO_VERIFICATION / REGISTER_INFLATED

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #8-01 | PASS | — | ✅ 已落地 D-9/2-44 (commit 16d92eab, backtest 0 命中 PASS) | PASS (ID + 验证产物齐) | K3 9/2 09:05 拍板 #3 |
| #8-02 | PASS | — | 报告无 "✅ 已落地/已 commit" 等状态字样, 仅描述 派活包任务 | PASS (无 status trigger) | STATUS_TRIGGERS 必含才触发 |
| #8-03 | PASS | — | ✅ DONE D-9/2-12 (commit 2f8d9438, 5 URL verify PASS) | PASS (中英 status + ID + 验证产物) | 决策登记簿自身豁免 |
| #8-04 | PASS | — | ✅ 已 commit (commit abc1234) | PASS (有 commit ID) | VERIFICATION_PATTERNS |
| #8-05 | PASS | — | .hermes/decision-register.md 自身 (豁免) | PASS (per `file.includes('decision-register.md')`) | 豁免路径 |
| #8-06 | FAIL | REGISTER_NO_ID | ✅ 已落地, 验证产物 (commit 16d92eab) (无 D-ID) | FAIL → REGISTER_NO_ID 🟡 | 强制规则 1 |
| #8-07 | FAIL | REGISTER_NO_VERIFICATION | ✅ 已落地 D-9/2-44 (无 commit ID/截图/log) | FAIL → REGISTER_NO_VERIFICATION 🟡 | 强制规则 1 |
| #8-08 | FAIL | REGISTER_INFLATED | ✅ 已落地 (无 D-ID + 无验证产物, 第 3 次发生) | FAIL → REGISTER_INFLATED 🟠 | GLM 9/2 09:05 §3 硬伤 2 |
| #8-09 | FAIL | REGISTER_NO_ID | ✅ DONE + commit 6c2f4a94 (无 D-ID) | FAIL → REGISTER_NO_ID 🟡 | 同 #8-06 边界 |
| #8-10 | FAIL | REGISTER_INFLATED | ✅ 已修正, ✅ 已派单, ✅ 已拍板 (三者都无 ID 无产物) | FAIL → REGISTER_INFLATED 🟠 | 多处 status 都缺 |

### 4.9 门童 #9 GSC 数据源 (gsc-source-guard.js) — 3 类规则

**规则集**: GSC_STALE (>72h) / GSC_NO_SOURCE_LINE / GSC_NO_WORD_EVIDENCE

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #9-01 | PASS | — | 报告含 "GSC数据/gsc-fresh-2026-09-03.json (校准日期 2026-09-03 15:25)" + 词级证据 "食品包裝印刷 · 38 imps · pos 5.3" | PASS (3 检查齐) | §K.1.4 词级证据链 |
| #9-02 | PASS | — | 报告无内容决策或数字, 仅描述 派活包任务 | PASS (无 trigger) | GSC trigger 必含数字 |
| #9-03 | PASS | — | 报告含 "GSC数据/zprintpro.com-Performance-on-Search-2026-08-17" + 校准日期 | PASS (8/17 总数据 OK) | GSC_SOURCE_PATTERNS |
| #9-04 | PASS | — | 报告含 "GSC数据/index.json (校准日期 2026-09-02 21:30)" | PASS (index.json 引用 OK) | 同上 |
| #9-05 | PASS | — | 报告含 GSC 来源 + 校准日期 2026-09-03 + 词级证据三元组 | PASS (3 检查齐) | §0.33.1 |
| #9-06 | FAIL | GSC_STALE | 报告引用 GSC数据/gsc-fresh-2026-08-25.json (>72h, 9/3 校准) | FAIL → GSC_STALE 🟡 | GSC数据/index.json SSoT 21.8 KB |
| #9-07 | FAIL | GSC_NO_SOURCE_LINE | 报告含 食品包裝印刷 38 imps (无 GSC 来源行) | FAIL → GSC_NO_SOURCE_LINE 🟡 | GSC_SOURCE_PATTERNS 必含 |
| #9-08 | FAIL | GSC_NO_WORD_EVIDENCE | 报告含 GSC 来源行 (无 query+imps+pos 三元组) | FAIL → GSC_NO_WORD_EVIDENCE 🟡 | §K.1.4 词级证据链 |
| #9-09 | FAIL | GSC_STALE | 报告引用 GSC数据/gsc-fresh-2026-09-01.json (48h, 临界, 应触发) | FAIL → GSC_STALE 🟡 | 新鲜度闸门 72h |
| #9-10 | FAIL | GSC_NO_SOURCE_LINE | 报告含 "12 clicks/7d" (无 GSC 来源) | FAIL → GSC_NO_SOURCE_LINE 🟡 | 与门童 #7 互补 |

### 4.10 门童 #10 Pillar 12,000+ 字 (pillar-guard.js) — 3 类规则

**规则集**: PILLAR_LENGTH / PILLAR_SCHEMAS (5 schema) / PILLAR_SCHEMAS_MISMATCH
**触发**: blog.slug 含 "pillar" OR title 含 "Pillar"

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #10-01 | PASS | — | 包装盒印刷 Pillar (12,500 字 + 5 schema 块) | PASS (Pillar 达标) | K3 9/3 19:23 拍板 v1.4 |
| #10-02 | PASS | — | 非 Pillar blog (slug=business-cards, 3,000 字) | PASS (不触发, 非 Pillar) | PILLAR_TRIGGERS 必含才触发 |
| #10-03 | PASS | — | 喜帖印刷 Pillar (12,800 字 + 5 schema 块) | PASS (Pillar 达标) | 5 schema: Article+FAQPage+BreadcrumbList+HowTo+Organization |
| #10-04 | PASS | — | 月曆印刷 Pillar (12,300 字 + 5 schema 块) | PASS (Pillar 达标) | 同上 |
| #10-05 | PASS | — | 燙金印刷 Pillar (12,200 字 + 5 schema 块) | PASS (Pillar 达标) | 同上 |
| #10-06 | FAIL | PILLAR_LENGTH | 包装盒印刷 Pillar (8,500 字, < 12,000) | FAIL → PILLAR_LENGTH 🔴 | §0.30 v2.2 Pillar 三维分层 |
| #10-07 | FAIL | PILLAR_LENGTH | 喜帖印刷 Pillar (11,500 字) | FAIL → PILLAR_LENGTH 🔴 | 升级 12,000+ 字 |
| #10-08 | FAIL | PILLAR_SCHEMAS | 包装盒印刷 Pillar (12,500 字 + 3 schema, 缺 FAQPage + HowTo) | FAIL → PILLAR_SCHEMAS 🔴 | 5 schema 必齐 |
| #10-09 | FAIL | PILLAR_SCHEMAS_MISMATCH | 包装盒印刷 Pillar (12,500 字 + 5 schema 块 + schemas 数组只 3 个) | FAIL → PILLAR_SCHEMAS_MISMATCH 🔴 | 数组必须跟 content 一致 |
| #10-10 | FAIL | PILLAR_LENGTH | 月曆印刷 Pillar (10,000 字) | FAIL → PILLAR_LENGTH 🔴 | 同 #10-06 |

### 4.11 门童 #11 Blog 标准 (blog-standard-guard.js) — 9 类规则

**规则集**: BLOG_STD_DATE / BLOG_STD_TITLE_LEN / BLOG_STD_H1_TEMPLATE / BLOG_STD_SCHEMAS / BLOG_STD_LENGTH / BLOG_STD_KEYWORDS / BLOG_STD_GSC_EVIDENCE / BLOG_STD_LASTUPDATED / BLOG_STD_EXCERPT
**触发**: 同门童 #10 (Pillar blog)

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #11-01 | PASS | — | date=2026-09-03 + title 55 字 + lastUpdated=2026-09-03 + excerpt 非空 + 12,500 字 + 5 schema + 4 词 + GSC 实证 | PASS (9 规则齐) | K3 9/3 19:29 拍板 v1.5 |
| #11-02 | PASS | — | 非 Pillar blog (无 date/title 限制) | PASS (不触发) | PILLAR_TRIGGERS 必含才触发 |
| #11-03 | PASS | — | 包装盒 Pillar (date=2026-09-03 + title 60 字上界) | PASS (60 字边界 OK) | title 50-60 范围 |
| #11-04 | PASS | — | 喜帖 Pillar (date=2026-09-03 + title 50 字下界) | PASS (50 字边界 OK) | 同上 |
| #11-05 | PASS | — | 月曆 Pillar (lastUpdated=2026-09-03) | PASS (lastUpdated 必填) | §0.30 v3 升级 |
| #11-06 | FAIL | BLOG_STD_DATE | 包装盒 Pillar (date=2024-01-01, 默认值) | FAIL → BLOG_STD_DATE 🔴 | date 必须 = 2026-09-03 |
| #11-07 | FAIL | BLOG_STD_TITLE_LEN | 喜帖 Pillar (title 45 字, < 50) | FAIL → BLOG_STD_TITLE_LEN 🔴 | §5 SEO/GEO Title 规则 |
| #11-08 | FAIL | BLOG_STD_TITLE_LEN | 月曆 Pillar (title 70 字, > 60) | FAIL → BLOG_STD_TITLE_LEN 🔴 | 同上 |
| #11-09 | FAIL | BLOG_STD_H1_TEMPLATE | 包装盒 Pillar (首段含 "Pillar 開篇" 模板字) | FAIL → BLOG_STD_H1_TEMPLATE 🔴 | 撤除模板字 |
| #11-10 | FAIL | BLOG_STD_LENGTH | 燙金 Pillar (11,000 字, < 12,000) | FAIL → BLOG_STD_LENGTH 🔴 | (与 #10 重复, 但本门童 9 规则) |
| #11-11 | FAIL | BLOG_STD_KEYWORDS | 包装盒 Pillar (无 "大信封" / "a1a2 海報" 校准 4 词) | FAIL → BLOG_STD_KEYWORDS 🔴 | 4 词必含 |
| #11-12 | FAIL | BLOG_STD_LASTUPDATED | 喜帖 Pillar (lastUpdated=2024-01-01) | FAIL → BLOG_STD_LASTUPDATED 🔴 | 必 = 2026-09-03 |
| #11-13 | FAIL | BLOG_STD_EXCERPT | 月曆 Pillar (excerpt 为空) | FAIL → BLOG_STD_EXCERPT 🔴 | excerpt 必非空 |

### 4.12 门童 #12 内部链接 + WhatsApp CTA (internal-links-cta-guard.js) — 2 类规则

**规则集**: INTERNAL_LINKS (< 10) / WHATSAPP_CTA (< 3)
**触发**: 同门童 #10 (Pillar blog)

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #12-01 | PASS | — | 包装盒 Pillar (15 内部链接 + 3 WhatsApp CTA wa.me/8619880851334) | PASS (2 规则齐) | K3 9/3 22:44 拍板 v1.6 |
| #12-02 | PASS | — | 非 Pillar blog (5 内部链接 + 1 WhatsApp CTA) | PASS (不触发) | PILLAR_TRIGGERS 必含才触发 |
| #12-03 | PASS | — | 喜帖 Pillar (10 内部链接下界 + 3 WhatsApp CTA) | PASS (边界 OK) | MIN 边界 |
| #12-04 | PASS | — | 月曆 Pillar (12 内部链接 + 3 WhatsApp CTA) | PASS | 正常 |
| #12-05 | PASS | — | 燙金 Pillar (20 内部链接 + 5 WhatsApp CTA) | PASS | 多 CTA OK |
| #12-06 | FAIL | INTERNAL_LINKS | 包装盒 Pillar (5 内部链接, < 10) | FAIL → INTERNAL_LINKS 🔴 | MIN 10 硬规则 |
| #12-07 | FAIL | INTERNAL_LINKS | 喜帖 Pillar (8 内部链接) | FAIL → INTERNAL_LINKS 🔴 | 同上 |
| #12-08 | FAIL | WHATSAPP_CTA | 月曆 Pillar (12 内部链接 + 1 WhatsApp CTA) | FAIL → WHATSAPP_CTA 🔴 | MIN 3 CTA 硬规则 |
| #12-09 | FAIL | WHATSAPP_CTA | 燙金 Pillar (15 内部链接 + 2 WhatsApp CTA) | FAIL → WHATSAPP_CTA 🔴 | 同上 |
| #12-10 | FAIL | INTERNAL_LINKS | 包装盒 Pillar (3 内部链接, 远低于 10) | FAIL → INTERNAL_LINKS 🔴 | 严重不足 |

### 4.13 门童 #13 Blog 质量 12 条铁律 (blog-quality-12-rules-guard.js) — 12 类规则

**规则集**: RULE1_INVERTED_PYRAMID / RULE2_H2_QUESTION / RULE3_ANSWER_BLOCK_40_60 / RULE4_PARAGRAPH_3_LINES / RULE5_EEAT / RULE6_ORIGINAL_DATA / RULE7_ENTITY_MAPPING / RULE8_INTENT_CTA_LE_3 / RULE9_SEMANTIC_ANCHOR / RULE10_SCHEMA / RULE11_ANSWER_GOLD_DENSITY / RULE12_COMPARISON_TABLE
**触发**: 同门童 #10 (Pillar blog)

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #13-01 | PASS | — | 包装盒 Pillar (12 铁律全过: 倒金字塔 + H2 问句 + 答案块 50 字 + 段落 3 行 + E-E-A-T + 4,820 訂單 + 主实体 4 个 + CTA 2 个 + 10 內鏈 + 6 schema + 💡⚡ 80 块/12,000 字 + 3 比较表格) | PASS (12 规则齐) | K3 9/3 23:29 派活包 |
| #13-02 | PASS | — | 非 Pillar blog | PASS (不触发) | PILLAR_TRIGGERS |
| #13-03 | PASS | — | 喜帖 Pillar (12 铁律全过) | PASS | 同上 |
| #13-04 | PASS | — | 月曆 Pillar (12 铁律全过) | PASS | 同上 |
| #13-05 | PASS | — | 燙金 Pillar (12 铁律全过) | PASS | 同上 |
| #13-06 | FAIL | RULE1_INVERTED_PYRAMID | 包装盒 Pillar (首段 150 字, > 100) | FAIL → RULE1_INVERTED_PYRAMID 🔴 | 首段应 < 100 字直接答核心问题 |
| #13-07 | FAIL | RULE2_H2_QUESTION | 喜帖 Pillar (H2 text "包装方法" 不含问句) | FAIL → RULE2_H2_QUESTION 🔴 | H2 必须含 問/?/how/why |
| #13-08 | FAIL | RULE8_INTENT_CTA_LE_3 | 月曆 Pillar (5 WhatsApp CTA, > 3) | FAIL → RULE8_INTENT_CTA_LE_3 🔴 | CTA ≤ 3 (顶 1 + 底 1 = 2 最佳) — **8cacf057 接线 4 CTA 案例** |
| #13-09 | FAIL | RULE11_ANSWER_GOLD_DENSITY | 燙金 Pillar (💡⚡ 块 50/12,000 字 = 4.17/千字, < 6) | FAIL → RULE11_ANSWER_GOLD_DENSITY 🔴 | ≥ 6/千字 |
| #13-10 | FAIL | RULE12_COMPARISON_TABLE | 包装盒 Pillar (table 元素 1 个, < 2) | FAIL → RULE12_COMPARISON_TABLE 🔴 | ≥ 2 比较表格 |
| #13-11 | FAIL | RULE6_ORIGINAL_DATA | 喜帖 Pillar (无 4,820 訂單 / QUV 1000h 等具体数字) | FAIL → RULE6_ORIGINAL_DATA 🔴 | 原創数据 |

### 4.14 门童 #14 blog-data JSON 严格校验 (blog-data-integrity-guard.js) — 5 类规则

**规则集**: BLOGJSON_PARSE / BLOGJSON_CTRL / BLOGJSON_MOJIBAKE / BLOGJSON_KEYS / BLOGJSON_EMPTY
**目标**: 3 文件 `src/data/blog-data/{zh-hk,en,ja}.json`

| ID | 类型 | 规则 | input snippet | expected | 备注 |
|----|------|------|---------------|----------|------|
| #14-01 | PASS | — | zh-hk.json (79 keys + 严格 JSON 解析 + 无控制字符 + 无 mojibake) | PASS (5 规则齐) | K3 9/4 拍板 |
| #14-02 | PASS | — | en.json (80 keys + 严格 JSON 解析) | PASS | 9/4 部署事故固化 |
| #14-03 | PASS | — | ja.json (80 keys + 严格 JSON 解析) | PASS | 同上 |
| #14-04 | PASS | — | zh-hk.json (79 keys + 0x0A 正常换行符在字符串内 escape) | PASS (转义后 OK) | 边界 |
| #14-05 | PASS | — | en.json (80 keys + 嵌套引号 \") | PASS (escape 正确) | 同上 |
| #14-06 | FAIL | BLOGJSON_PARSE | zh-hk.json (嵌套引号未 escape, JSON.parse 失败) | FAIL → BLOGJSON_PARSE 🔴 | 9/3 16:35 build fail |
| #14-07 | FAIL | BLOGJSON_CTRL | en.json (0x0A 裸控制字符在字符串内) | FAIL → BLOGJSON_CTRL 🔴 | 9/3 17:07 build fail |
| #14-08 | FAIL | BLOGJSON_MOJIBAKE | ja.json (鏅哄嵃 = 智印港 双重编码指纹) | FAIL → BLOGJSON_MOJIBAKE 🔴 | 修复无法靠转义挽回 |
| #14-09 | FAIL | BLOGJSON_KEYS | zh-hk.json (60 keys, < 79) | FAIL → BLOGJSON_KEYS 🔴 | §0.33.1 4 口径 |
| #14-10 | FAIL | BLOGJSON_EMPTY | en.json (0 字节, 误覆盖) | FAIL → BLOGJSON_EMPTY 🔴 | git checkout HEAD -- 还原 |

---

## 5. 集成测试 (端到端)

### 5.1 sample 1: Pillar 1 zh-hk 全面合规 (期望 14 门童 0 命中)

**input 路径**: `.hermes/tests/samples/integration/sample-1-pillar1-zhhk-compliant.md`

**input 摘要** (per 6c2f4a94 Pillar 1 包装盒 已落地):
- 文件: `src/data/blog-data/zh-hk.json` slug=`packaging-boxes-pillar`
- title: "包裝盒印刷完整指南：材質選擇到工藝細節，深圳彩龍 12 年經驗" (60 字, zh-hk)
- content: 12,500 字, 含 5 schema 块 (Article/FAQPage/BreadcrumbList/HowTo/Organization) + 12 铁律全过
- 内部链接 15 个 + WhatsApp CTA 3 个 (wa.me/8619880851334)
- date=2026-09-03 + lastUpdated=2026-09-03 + excerpt 非空
- 含经营参数白名单 (FSC 認証紙 / 大豆油墨 / 4 天交期 / 100 個起印)
- 含 4,820 訂單一手数据 + QUV 1000h 测试数据 + 6 个 💡 答案块

**期望**: 14 门童全 0 命中 (PASS)

**验证隔离性**: 即使其他 13 门童全 0 命中, 也必须各自单独跑并报 0 命中 (per K3 9/4 9:30 校准 "全 14 门童 0 命中" 标准)

### 5.2 sample 2: Pillar 4 zh-hk 校园印刷 (4 body CTA 触发门童 #13 RULE8)

**input 路径**: `.hermes/tests/samples/integration/sample-2-pillar4-zhhk-4cta.md`

**input 摘要** (per 8cacf057 commit 接线案例):
- 文件: `src/data/blog-data/zh-hk.json` slug=`campus-printing-pillar`
- title: "校園印刷完整指南：教材 + 筆記本 + 畢業紀念品，深圳平湖 12 年經驗" (58 字, zh-hk)
- content: 12,300 字, 含 5 schema + 12 铁律 (RULE8 CTA = 4 违反)
- 4 WhatsApp CTA (顶部 1 + 中部 2 + 底部 1) — **超过 RULE8 限定的 ≤3**
- date=2026-09-03 + lastUpdated=2026-09-03 + excerpt 非空
- 含 4 词校准词 (大信封 / 樣本印刷 / 教科書 / 教材印刷)
- 含 GSC 实证 (教科書/教材印刷 · 47 imps · pos 46-52, 28d)

**期望**:
- 13 门童 (除 #13) 0 命中 (PASS)
- 门童 #13 RULE8_INTENT_CTA_LE_3 命中 1 处 (FAIL)
- **总命中数 = 1 (单门童 FAIL, 验证隔离性)**

**K3 9/4 9:30 拍板验证**: sample 2 必须真触发 RULE8, 证明 14 门童非虚设 (per K3 "全 14 门童 0 命中" 校准逻辑)

### 5.3 sample 3: 失效 Pillar 样例 (1 门童 FAIL, 验证隔离性)

**input 路径**: `.hermes/tests/samples/integration/sample-3-single-guard-fail.md`

**input 摘要**:
- 文件: `src/data/blog-data/zh-hk.json` slug=`packaging-boxes-pillar`
- title: "包裝盒印刷完整指南" (8 字, 远低于 50)
- content: 12,500 字, 5 schema 块, 12 铁律基本过 (但 title 短是唯一硬伤)
- 内部链接 15 个 + WhatsApp CTA 3 个
- date=2026-09-03 + lastUpdated=2026-09-03 + excerpt 非空

**期望**:
- 13 门童 (除 #11) 0 命中 (PASS)
- 门童 #11 BLOG_STD_TITLE_LEN 命中 1 处 (FAIL) — title 8 字 < 50
- **总命中数 = 1 (单门童 FAIL, 验证隔离性)**

**隔离性验证**: 1 门童 FAIL → 其他 13 门童 0 命中, 证明门童之间无串扰 (per K3 §0.31.2 防线 1 编辑前预警)

### 5.4 集成测试总期望

| sample | 文件 | 期望命中 | 验证 |
|--------|------|----------|------|
| 1 | Pillar 1 zh-hk (12 铁律全过) | 0 命中 (全 14 门童 PASS) | 基线 0 误报 |
| 2 | Pillar 4 zh-hk (4 CTA 违规) | 1 命中 (仅 #13 RULE8 FAIL) | 验证 #13 真触发 |
| 3 | 失效 Pillar (title 短) | 1 命中 (仅 #11 BLOG_STD_TITLE_LEN FAIL) | 验证 #11 真触发 + 隔离性 |
| **合计** | — | **2 命中 / 42 test case** | **TP = 100%, FP = 0%** (集成层) |

---

## 6. 误报率 FP 计算

### 6.1 FP 定义

**FP (False Positive, 误报)** = 反向 case 中, 期望 FAIL 但门童实际 PASS (门童没触发 = 漏报, 不是误报)

**真正 FP** = 正向 case 中, 期望 PASS 但门童实际 FAIL (门童误触发 = 误报)

### 6.2 FP 计算公式

```
FP = 正向 case 中门童 FAIL 数 / 正向 case 总数
TP = 反向 case 中门童 FAIL 数 / 反向 case 总数
FN = 反向 case 中门童 PASS 数 / 反向 case 总数
TN = 正向 case 中门童 PASS 数 / 正向 case 总数
```

**目标 (per K3 §0.31.8 KPI)**:
- **FP < 10%** (9/15 升硬拦前必达)
- TP ≥ 90% (拦截率)
- 集成 sample 1 (Pillar 1 全面合规) FP = 0% (per §5.1)

### 6.3 9/5 14:00 跑测出基线

**70 正向 case + 70 反向 case + 42 集成 case = 182 测**

**FP 基线建立步骤**:
1. M3 9/5 14:00 跑 `node scripts/check-regression-guard.js --strict-all src/data/blog-data/`
2. M3 同时跑 182 test case (单独脚本 `node scripts/run-guards-test-suite.js` 待 9/5 出稿)
3. M3 输出 `.hermes/tests/14-guards-fp-report-2026-09-05.md` 含:
   - 14 门童 × 182 test case 详细结果
   - TP/TN/FP/FN 各项数值
   - 集成 sample 1/2/3 期望对比
   - 误报源溯源 (哪个 case 误报, 哪个 rule ID 误触发)
4. 9/5 16:00 K3 拍板是否调整 rule (per 决策登记簿 D-9/5-X)

### 6.4 FP 调整 SOP (若 FP ≥ 10%)

**触发**: 9/5 16:00 出 FP ≥ 10%
**动作**:
1. M3 列出误报源 (per `14-guards-fp-report-2026-09-05.md` 误报源溯源段)
2. M3 提议 2 选 1:
   - **方案 A**: 修 rule (调整 pattern, 收紧/放宽)
   - **方案 B**: 删误报 case (承认非真误报, 接受 trigger)
3. K3 拍板 (D-9/5-Y)
4. 9/6 14:00 M3 跑第 2 轮, 验证 FP < 10%

### 6.5 FP < 10% 锁门童冻结令

**若 9/8 前 FP < 10%**: K3 拍板解除 9/8 门童冻结令 (per §7)
**若 9/8 前 FP ≥ 10%**: 冻结令继续生效, 不允许新增门童 (per §7 解除条件)

---

## 7. 9/8 门童冻结令解除条件

### 7.1 冻结令来源 (K3 v3.3 §1.3)

> "12,000+ 字 × 3 语 × 5 篇的节奏不可持续，且正在透支门童治理带宽。... **决策：9/8 前冻结门童新增，先给现有 14 道门童写统一测试集**。"

**冻结令 3 条**:
1. 9/8 前不允许新增门童 (per v3.3 §1.3)
2. 9/8 前必须出 14 门童统一测试集 + 跑通 FP < 10% (per v3.3 §1.3)
3. 9/8 前 K3 拍板解除冻结令 (per v3.3 §1.3 + 决策登记簿)

### 7.2 解除条件 (3 条全必达)

| 条件 | 验证产物 | 9/8 前状态 |
|------|----------|-------------|
| ① **14 门童统一测试集 PASS** | `.hermes/tests/14-guards-unified-test-suite.md` (本文) + 跑测报告 `.hermes/tests/14-guards-fp-report-2026-09-05.md` | 待跑 (9/5 14:00 跑) |
| ② **FP < 10%** | 14 门童 70 正向 case 误报率 < 10% (per §6.2) | 待测 |
| ③ **K3 拍板解除冻结令** | 决策登记簿 D-9/8-Z (新 ID) + K3 1 段回复确认 | 待拍板 |

**3 条全必达, 缺一不可**。

### 7.3 若未达 (3 种可能 + 应对)

| 情景 | 应对 | 9/15 升硬拦影响 |
|------|------|-----------------|
| ① 14 门童测试集未出 | 9/8 K3 痛骂 + M3 9/8 16:00 前紧急出稿 | 9/15 升硬拦暂停, 沿用 shadow mode |
| ② FP ≥ 10% | 9/6-9/7 修 rule, 9/8 跑第 2 轮 | 同上 |
| ③ K3 未拍板 | 9/8 18:00 M3 自动升 D-9/8-OPEN, K3 9/9 前必拍板 | 沿用 shadow mode 1 周 |

### 7.4 9/8 解除冻结令后允许的边界

**允许**:
- 修现有 rule (per §6.4 FP 调整 SOP, 决策登记簿 D-9/8-Y)
- 删 rule (per §6.4 方案 B)
- 升级 rule 严重度 (per §0.31.6 修正 3, 9/15 后转正)

**不允许** (需 K3 单独拍板):
- 新增第 15 道门童 (per 冻结令)
- 新增 rule (per 冻结令, 但修 rule OK)
- 改 FP 目标 (per §0.31.8)

---

## 8. 跑测 SOP

### 8.1 9/5 14:00 跑测 (M3 一次性跑全 14 门童 + 182 test case)

**前置**:
1. `.hermes/tests/samples/` 14 子目录 + integration/ 已建好 (per §3.4, M3 9/4 16:00 前完成)
2. 70 正向 case + 70 反向 case + 42 集成 case 样本全部落地 (M3 9/4 18:00 前)
3. `scripts/run-guards-test-suite.js` 跑测脚本已写 (M3 9/4 22:00 前出稿)

**跑测命令**:
```bash
# 1. 跑全 14 门童 (主入口)
node scripts/check-regression-guard.js --strict-all src/data/blog-data/

# 2. 跑 14 门童 70 正向 + 70 反向 test case (新脚本, 9/4 M3 出稿)
node scripts/run-guards-test-suite.js

# 3. 跑集成 sample 1/2/3 (新脚本, 9/4 M3 出稿)
node scripts/run-guards-test-suite.js --integration

# 4. 汇总输出
node scripts/run-guards-test-suite.js --summary > .hermes/tests/14-guards-fp-report-2026-09-05.md
```

**跑测输出**:
- `.hermes/tests/14-guards-fp-report-2026-09-05.md` (FP < 10% 判定 + 14 门童 × 182 test case 详细结果)
- 集成 sample 1 期望 0 命中 / sample 2 期望 1 命中 / sample 3 期望 1 命中
- TP/TN/FP/FN 各项数值

### 8.2 9/5 16:00 K3 拍板

- 若 FP < 10%: K3 拍板解除 9/8 冻结令 (决策登记簿 D-9/5-X)
- 若 FP ≥ 10%: K3 拍板 §6.4 方案 A/B (决策登记簿 D-9/5-Y)

### 8.3 9/6-9/7 二次跑测 (若需要)

- M3 修 rule 后, 9/6 14:00 跑第 2 轮
- 9/7 14:00 跑第 3 轮 (如需)
- 9/8 12:00 终轮 (per §7 解除条件 ① 验证产物)

### 8.4 9/8 18:00 K3 拍板解除冻结令

- K3 1 段回复确认 (决策登记簿 D-9/8-Z)
- M3 9/8 19:00 更新 AGENTS.md §0.31.1 表格 (加 v1.3 升级 + 14 门童统一测试集引用)
- M3 9/8 20:00 commit 14 门童 + 测试集 + 跑测报告 (commit ID 灌入决策登记簿 D-9/8-Z 验证产物)

### 8.5 校准日期 / 校准状态

- **校准日期**: 2026-09-05 14:00 (跑测出基线)
- **校准状态**: 待跑 (基线建立中)
- **下次校准**: 9/8 12:00 终轮 (per §7 解除条件 ①)
- **下下次校准**: 9/15 FP 复盘 (per §0.31.8 KPI, 升硬拦前必达)

---

## 附录 A: 14 门童 × 182 test case 速查表

| 门童 | 正向 | 反向 | 集成 | 总 | 9/5 跑测状态 |
|------|------|------|------|----|--------------|
| #1 credibility | 5 | 5 | 3 | 13 | 待跑 |
| #2 phone | 5 | 5 | 3 | 13 | 待跑 |
| #3 brand | 5 | 5 | 3 | 13 | 待跑 |
| #4 i18n | 5 | 5 | 3 | 13 | 待跑 |
| #5 sop10 | 5 | 5 | 3 | 13 | 待跑 |
| #6 entity | 5 | 5 | 3 | 13 | 待跑 |
| #7 count | 5 | 5 | 3 | 13 | 待跑 |
| #8 register | 5 | 5 | 3 | 13 | 待跑 |
| #9 gsc-source | 5 | 5 | 3 | 13 | 待跑 |
| #10 pillar | 5 | 5 | 3 | 13 | 待跑 |
| #11 blog-standard | 5 | 5 | 3 | 13 | 待跑 |
| #12 internal-links-cta | 5 | 5 | 3 | 13 | 待跑 |
| #13 blog-quality-12-rules | 5 | 5 | 3 | 13 | 待跑 |
| #14 blog-data-integrity | 5 | 5 | 3 | 13 | 待跑 |
| **合计** | **70** | **70** | **42** | **182** | **待跑** |

---

## 附录 B: 9/8 解除冻结令时间表

| 日期 | 时点 | 动作 | 负责 |
|------|------|------|------|
| 9/4 | 16:00 | 14 子目录 + integration/ 样本全部落地 | M3 |
| 9/4 | 18:00 | 70 正向 + 70 反向 case 样本落地 | M3 |
| 9/4 | 22:00 | `scripts/run-guards-test-suite.js` 跑测脚本出稿 | M3 |
| 9/5 | 9:00 | K3 拍板 008 表工具选型 (per 任务 A) | K3 |
| 9/5 | 10:00 | M3 套 19 字段 schema 建 008 表 (per 任务 A) | M3 |
| 9/5 | 14:00 | M3 跑全 14 门童 + 182 test case (出基线) | M3 |
| 9/5 | 16:00 | K3 拍板 §6.4 方案 A/B (若 FP ≥ 10%) | K3 |
| 9/5 | 16:20 | `revenue-analytics-weekly cron` 跑前 008 表正式启用 | M3 |
| 9/5 | 17:00 | K3 拍板 008 表启用确认 (决策登记簿 D-9/5-X) | K3 |
| 9/6 | 14:00 | (若需) 跑第 2 轮 | M3 |
| 9/6 | 21:00 | K3 EOD 录入第 1 条真实询盘 | K3 |
| 9/7 | 14:00 | (若需) 跑第 3 轮 | M3 |
| 9/8 | 12:00 | 终轮跑测, 验证 §7 解除条件 ① | M3 |
| 9/8 | 16:00 | M3 提交 FP < 10% 报告 + 决策登记簿 D-9/8-Z 草稿 | M3 |
| 9/8 | 18:00 | **K3 拍板解除冻结令 (1 段回复)** | **K3** |
| 9/8 | 19:00 | M3 更新 AGENTS.md §0.31.1 表格 (v1.3 升级) | M3 |
| 9/8 | 20:00 | M3 commit 14 门童 + 测试集 + 跑测报告 (commit ID 灌入 D-9/8-Z) | M3 |
| 9/15 | — | FP 复盘 (per §0.31.8 KPI, 升硬拦前必达) | K3 + M3 |
| 9/16 | — | 9/16 验收 (per v3.3 §5.3 + §8) | K3 + M3 |

---

## 附录 C: 跨项目 P0 通用性

- **门童统一测试集结构** 适用任何有 5+ 门童的项目 (per K3 §0.31 P0 强制级)
- **FP < 10% 目标** 适用任何机器可执行治理体系
- **集成 sample 1/2/3 设计** 适用任何回归测试 (合规 / 轻微违规 / 单门童 FAIL)
- **决策登记簿驱动** 适用任何"K3 拍板 → M3 执行" 工作流 (per §0.0 零决策铁律)

---

*校准: 14 门童 182 test case, 集成 3 sample, FP < 10% 目标, 9/8 解除冻结令 3 条件。K3 拍板来源 = v3.3 §1.3 + D-9/2-44 §14.4 + 9/4 9:30 校准确认。所有 rule ID 与 pattern 严格对应 `scripts/guards/*.js` 实际代码, 9/5 14:00 跑测出基线。*
