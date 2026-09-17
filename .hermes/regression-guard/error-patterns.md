# 错误模式库 v1 — 反审门童（Regression Guard）SSoT

> **SSoT 路径**: `.hermes/regression-guard/error-patterns.md`
> **拍板来源**: K3 9/1 15:06 (12:37 派活包 + 4 修正 + 3 齿轮)
> **维护责任**: Mavis (M3) 自进化 SOP (per `playbook.md`)
> **DoD 铁律**: 任何派活包修复错误, 若未同步把 pattern 写入本文件, 视为任务未完成 (K3 9/1 15:06)
> **首次建立**: 2026-09-01 (v1.0, 历史 8/24-9/1 commit diff 回灌 seeding)

---

## 模式编号规范

`<门童#>-<类别#>-<序号#>` 例如 `CRED-FSC-001` = 门童 #1 数据诚信 / FSC 类别 / 规则 1

---

## 门童 #1 数据诚信 (credibility-guard) — orange shadow

### CRED-FSC-001 FSC-C123456 假证书号

- **类别**: 不可验证声明 (证号)
- **严重度**: orange
- **regex**: `/FSC-C\d{6}/g`
- **例子**:
  - "智印港標配 FSC Mix 認證紙（編號 FSC-C123456）" (b4c630f2 zh-hk blog)
- **拦截方式**: pre-commit hook v7 (red 硬拦, shadow mode 仅警告)
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "FSC認証紙" (材质描述, 经营参数白名单, 仍可保留)
- **首次发现**: b4c630f2 (9/1 10:11 W5 #2 即日印刷 blog)
- **K3 拍板来源**: "全站撤除所有无 K3 拍板来源的硬数字 (FSC-C123456 / 海德堡 6+1 / 15 年 / 1,000+ / 4,500+ / 4,200+ / 1,200+ / 12 大行業 / 7 重 / 國際頂級 / 4 大行業標配)"

### CRED-ISO-001 ISO 9001:2015 / ISO 9001 认证

- **类别**: 不可验证声明 (认证)
- **严重度**: orange
- **regex**: `/ISO\s*9001:?(2015)?/g`
- **例子**:
  - "智印港 ... ISO 9001:2015 認證" (b4c630f2 + 8/30 blog)
- **拦截方式**: pre-commit hook v7
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "ISO 认证体系" (描述性)

### CRED-TUV-001 TÜV Rheinland 认证

- **类别**: 不可验证声明 (认证)
- **严重度**: orange
- **regex**: `/TÜV\s*Rheinland/g`
- **K3 拍板**: 9/1 12:27 撤除

### CRED-1K-001 1,000+ / 1000+ 客户

- **类别**: 不可验证声明 (客户数)
- **严重度**: orange
- **regex**: `/\b1,?000\+/g`
- **例子**:
  - "智印港 ... 1,000+ 客戶" (b4c630f2)
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "全球客户" / "跨境客户"

### CRED-4K-001 4 位数无来源数字 (4,200+ / 15,000+ / 1,200+ / 4,500+)

- **类别**: 不可验证声明 (数字无来源)
- **严重度**: orange
- **regex**: `/\b\d{1,3},\d{3}\+?\b/g`
- **例子**:
  - "4,200 張急件實證" (b4c630f2)
  - "服務 100+ 國家 15,000+ 客戶" (b4c630f2)
  - "急件 1,200+ 客戶" (b4c630f2 即日印刷)
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "急件 99.2% 達成率" (内部可核实, K3 拍板) / "100 個起印" (经营参数)

### CRED-IND-001 X 大行业 / X 大行業 / X 大行业标配

- **类别**: 不可验证声明 (行业经验)
- **严重度**: orange
- **regex**: `/\b\d+\s*大\s*[行業行业行業]\b/g`
- **例子**:
  - "12 大行業" (8/26 包装盒 blog)
  - "4 大行業標配" (8/26 包装盒 blog)
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "多行业经验"

### CRED-FOLD-001 X 重 (7 重 / 8 重 工序)

- **类别**: 不可验证声明 (工序)
- **严重度**: orange
- **regex**: `/\b\d+\s*重\b/g`
- **K3 拍板**: 9/1 12:27 撤除

### CRED-TOP-001 国际顶级 / 國際頂級

- **类别**: 不可验证声明 (评级)
- **严重度**: orange
- **regex**: `/國際頂級|国际顶级/g`
- **K3 拍板**: 9/1 12:27 撤除

### CRED-15Y-001 15 年 / 15+ 年 / 十五年 经验

- **类别**: 不可验证声明 (年限)
- **严重度**: orange
- **regex**: `/\b15\+?\s*年\b|十五年/g`
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "多年印刷经验"

### CRED-FACT-001 自設廠房 / 自设厂房

- **类别**: 不可验证声明 (实体)
- **严重度**: orange
- **regex**: `/自設廠房|自设厂房/g`
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "深圳平湖廠房 + 香港服務點" (per §13.10 真实主体)

### CRED-HEID-001 海德堡 / Heidelberg / HP Indigo 印刷机

- **类别**: 不可验证声明 (设备)
- **严重度**: orange
- **regex**: `/海德堡\s*柯式|海德堡\s*6\+1|Heidelberg|HP\s*Indigo/g`
- **K3 拍板**: 9/1 12:27 撤除
- **替代文案**: "进口印刷设备"

---

## 门童 #2 真实电话 (phone-guard) — red 硬拦

### PHONE-HK-001 +852 港号黑名单

- **类别**: 品牌资产 (真实联系号)
- **严重度**: red
- **regex**: `/\+852[\s-]?\d{4}[\s-]?\d{4}/g`
- **例子**:
  - "WhatsApp +852 9225 8890" (b4c630f2 即日印刷 blog Q3 + 末段)
- **拦截方式**: pre-commit hook v7 (red 硬拦, 立即 exit 1)
- **K3 拍板**: 9/1 12:23 改 +86 198 8085 1334
- **替代**: 唯一联系号 +86 198 8085 1334 (per §13.10 真实主体 phase-out 181)

### PHONE-WA-852 wa.me/852 港号 wa 链接

- **类别**: 品牌资产 (wa.me 链接)
- **严重度**: red
- **regex**: `/wa\.me\/852\d+/g`
- **例子**:
  - `wa.me/85292258890` (b4c630f2)
- **K3 拍板**: 9/1 12:23 改 wa.me/8619880851334

### PHONE-NON-WL-001 非白名单电话格式

- **类别**: 品牌资产 (未知电话)
- **严重度**: orange
- **regex**: `/\+\d{1,3}[\s-]?\d{4,}/g`
- **拦截方式**: shadow mode (yellow 提示)
- **白名单**: +86 198 8085 1334 / wa.me/8619880851334

---

## 门童 #3 品牌分层 (brand-guard) — red 硬拦

### BRAND-DOUBLE 双品牌同时出现

- **类别**: 品牌资产 (§13.16 v2 红线)
- **严重度**: red
- **regex**: `/智印港\s*ZprintPro|ZprintPro\s*智印港|智印港\s*ジープリント|ジープリント\s*智印港/g`
- **拦截方式**: pre-commit hook v7 (red 硬拦)
- **K3 拍板**: 9/1 02:54 §13.16 v2 单品牌分层
- **替代**: zh-hk=智印港 / en=ZprintPro / ja=ZprintPro (单品牌, 不混)

### BRAND-TYPO 错字 智印印港

- **类别**: 品牌资产 (§13.16 v2 红线)
- **严重度**: red
- **regex**: `/智印印港/g`
- **拦截方式**: pre-commit hook v7 (red 硬拦)
- **K3 拍板**: §13.16 v2 红线 (错字绝写)

### BRAND-LOCALE 跨语言品牌混用

- **类别**: 品牌资产
- **严重度**: red
- **regex**: `/[一-鿿]+.*ZprintPro.*[一-鿿]+/g` (中文字符上下文出现 ZprintPro)
- **拦截方式**: pre-commit hook v7

### BRAND-JA-ALT ja ジープリント 不与 ZprintPro 字面同时出现

- **类别**: 品牌资产 (§13.16.1 单独埋点)
- **严重度**: orange
- **regex**: `/ジープリント.*ZprintPro|ZprintPro.*ジープリント/g`
- **K3 拍板**: 8/8 02:52 §13.16.1 单独埋点, 不与 ZprintPro 字面同时出现

---

## 门童 #4 跨语言污染 (i18n-guard) — red 部分 + yellow shadow

### I18N-POLLUTION zh-hk/ja 文本内简体字残留

- **类别**: 字符体检 (§0.29 v3.1)
- **严重度**: red
- **regex**: `/[复电业为发这们个时来会说过对开现应学页]/g`
- **K3 拍板**: §0.29 v3.1 跨语言污染零容忍

### I18N-TITLE-LEN title 字符体检 50-60

- **类别**: 字符体检 (§0.29 v3.1)
- **严重度**: yellow
- **regex**: 自定义 (title 字段 + 半角当量计算)
- **首次发现**: 12:32 包装盒任务实弹测试 (K3 9/1 15:06)
- **案例**: 拟定 `包裝盒印刷價格 2026：500/1000/5000 個・FOB 深圳・跨境 DHL 2-4 天 | 智印港` 实测 73 当量 > 65, 必被截断
- **修正版**: `包裝盒印刷價格 2026：500/1000/5000 個・禮盒訂製 | 智印港` (56 当量 ✅)

### I18N-META-LEN meta description 字符体检 150-160

- **类别**: 字符体检 (§0.29 v3.1)
- **严重度**: yellow

### I18N-CURRENCY 币种格式不统一

- **类别**: 跨境规范
- **严重度**: yellow
- **regex**: `/US\$|USD|JPY|￥/g`
- **替代**: 统一 HK$ (per zprintpro §5 多币种)

### I18N-FOOD-BOXES food-boxes en/ja 误用 zh-hk 文本

- **类别**: 跨语言污染 (历史 P0 教训)
- **严重度**: red
- **regex**: `/food-boxes.*[一-鿿]{20,}/g`
- **K3 拍板**: 9/1 02:50 fd22275f 修复 + 本门童拦截
- **首次发现**: 9/1 02:50 food-boxes en/ja 误用 zh-hk 文本

---

## 门童 #5 SOP-10 5 问门禁 (sop10-guard) — yellow shadow + red 秘密泄漏

### SOP10-CERT-NO 虚假证书号

- **类别**: §0.22 SOP-10 第 4 款
- **严重度**: red
- **regex**: `/FSC-C\d{6}|01\s*100\s*150\s*1234/g`

### SOP10-24H-SLA 24h SLA / 99.2% 达成率

- **类别**: §0.22 SOP-10 5 问 3 款
- **严重度**: yellow
- **regex**: `/\b24\s*[hH小时]\s*SLA\b|99\.2%\s*達成率|99\.2%\s*达成率/g`
- **替代**: "急件 18:00 截單翌日 12:00 順豐" (经营参数)

### SOP10-12-IND 12 大行业 / 4 大行业标配

- **类别**: §0.22 SOP-10 5 问 3 款
- **严重度**: yellow
- **regex**: `/\b12\s*大\s*[行業行业]\b|\b4\s*大\s*[行業行业]\s*[標标]配\b/g`

### SOP10-INTL-TOP 国际顶级 / 國際頂級

- **类别**: §0.22 SOP-10 5 问 3 款
- **严重度**: yellow
- **regex**: `/國際頂級|国际顶级/g`

### SECRET-LEAK API key / token 硬编码

- **类别**: §0.27.8 秘密零容忍 (跨项目 P0)
- **严重度**: red
- **regex**: `/(ARK_API_KEY|sk-[a-zA-Z0-9]{20,}|pk_live_[a-zA-Z0-9]{20,}|sk_live_[a-zA-Z0-9]{20,}|AIRWALLEX_API_KEY=[a-zA-Z0-9-]{20,})/g`
- **K3 拍板**: 8/28 07:48 §0.27.8 ARK key 不暴露红线
- **首次发现**: 8/28 07:10 _batch*.py 5 文件 VolcEngine ARK API Key 硬编码

---

## 门童 #15 blog-data JSON 严格校验 (blog-data-integrity-guard) — red 硬拦 (用户 2026-09-04 拍板)

> **拍板原文 (用户 2026-09-04)**: "把这次教训固化进门童：任何对 blog-data JSON 的修改，改完必须先过 python -c \"json.load(...)\" 严格校验，再进 commit"
>
> **事故背书**: K3-2026-09-03-2300-blog-json-broken-v1 (见 error-log.md 同事件条目)

### BLOGJSON_PARSE JSON 严格解析失败

- **类别**: 数据完整性 (部署阻断)
- **严重度**: red
- **检测**: `JSON.parse` 严格解析 (等价 Python `json.loads` 严格模式), 失败即拦
- **拦截方式**: pre-commit hook 2.5 步硬拦 (staged 含 blog-data JSON 时) + 主入口 GUARDS 注册
- **典型命中**: 嵌套引号未 escape (9/3 fix script 状态机把 schema value 的 closing `"` 当 inner quote escape)
- **修法**: 从最近合法 commit 还原 (实测 6c2f4a94 三语全合法) + `JSON.stringify`/`json.dumps` 重新序列化; **禁止在损坏文件上手写转义补丁** (状态机已失败 2 次)

### BLOGJSON_CTRL 字符串字面量内裸控制字符

- **类别**: 数据完整性 (部署阻断)
- **严重度**: red
- **检测**: 按引号边界扫描, 仅字符串内 `0x00-0x1F` 命中 (字符串外换行是合法空白, 不误报)
- **典型命中**: `\u000a` 裸换行写入 content 字段 (Python `json.loads` 报 "Bad control character")
- **修法**: 同 BLOGJSON-PARSE

### BLOGJSON_MOJIBAKE mojibake 双重编码指纹

- **类别**: 数据完整性 (内容不可逆损坏)
- **严重度**: red
- **检测**: 指纹库 (鏅哄嵃 = 智印港 / ӡˢ = 印刷 类变形, 指纹库可扩展)
- **典型命中**: 9/4 损坏文件 `2kg <乱码>, ӡˢɫ<乱码>` = GBK 字节被按 UTF-8 二次写回
- **修法**: **转义修复救不回已损坏的中文** — 正文必须从 git 历史或 .hermes 草稿重取原文 + 重新序列化

### BLOGJSON_KEYS 键数完整性

- **类别**: 数据完整性 (防整段丢失)
- **严重度**: red
- **检测**: zh-hk ≥79 / en ≥80 / ja ≥80 (per §0.33.1 4 口径对照表)
- **典型命中**: 误删整个 locale 的 blog 条目; 文件被截断成 `{}`
- **修法**: 核对最近合法 commit 键数; 有意删除需 K3 拍板

### BLOGJSON_EMPTY 文件缺失/0 字节

- **类别**: 数据完整性
- **严重度**: red
- **检测**: 文件不存在或 0 字节
- **修法**: `git checkout HEAD -- src/data/blog-data/<locale>.json`

### 配套机制

- 钩子: `scripts/canonical/pre-commit` 2.5 步 (staged 含 3 文件 → 硬拦; 未含 → 廉价全检仅警告)
- 主入口: `scripts/check-regression-guard.js` GUARDS.blogDataIntegrity 注册
- 独立运行: `node scripts/guards/blog-data-integrity-guard.js` (cron 可挂)
- 负向测试: 8 用例全过 (合法 0 命中 / 控制字符 / 嵌套引号 / mojibake / 键数 / 空对象 / 0 字节 / 合法换行不误报)

---

## 历史 commit 8/24-9/1 回灌 seeding (K3 9/1 15:06 齿轮 3)

| commit | 日期 | 命中门童 | 命中规则 | K3 拍板 | 状态 |
|--------|------|---------|---------|---------|------|
| b4c630f2 | 9/1 10:11 | #1 + #2 + #4 | CRED-4K-001 / CRED-1K-001 / CRED-FSC-001 / CRED-15Y-001 / CRED-ISO-001 / PHONE-HK-001 / PHONE-WA-852 | 9/1 12:23 + 12:27 撤除 | 待修 (Commit 2) |
| 8c... (历史) | 8/24-8/31 | #1 | CRED-ISO-001 / CRED-15Y-001 / CRED-1K-001 (8/30 blog 残留) | 9/1 12:27 撤除 | 待全站 audit |

---

**自进化记录**: 后续每周 (5 cron SSoT v6.4 嵌入) 输出新发现 + 复发率, 增量追加

---

### 规则 GSC_LEAK_CUSTOMER_VISIBLE — GSC 后台数据泄漏到客户可见内容 (K3 2026-09-17 拍板, 门童 #16)

> **拍板原话**: 「为什么这些GSC的数据出现在客户阅读的blog文章中，造成数据的污染，写进规则，这些信息是后台只有我能看到的数据，怎么出现在的文章中，这也是非常高的规则，反审门童是干嘛用的，这个问题说过不止一次」

**触发条件** (任一命中即 red 硬拦):
- 客户可见字段 (title/description/excerpt/keywords/content) 含 `GSC pos X` / `pos X` / `X imps` / `imps X` / `攻艱` / `攻堅` / `衝首頁` / `TOP3` / `突入` / `gsc-fresh-*.json` 等后台黑话
- 客户可见内容含 GSC 数据源行 (`数据出處：GSC 數據 / gsc-fresh-*.json`)
- 客户可见内容含 GSC 校准/基线运营笔记 (如 `GSC 8/18 baseline ... pos 2.0 + 16 imps`)

**机审**: `scripts/guards/gsc-leak-guard.js` — 扫描 `src/data/blog-data/*.json` + `blog-posts.ts` + `buying-guides.ts` + `products.ts` + `pillar-content.ts` 的客户可见字段值 (JSON 全字段 + TS 单行字段 + 多行对象, 跳过 // 注释)

**豁免 (合法客户语境, 不拦)**:
- `US$0.10-0.20/imp` / `HK$X/imp` / `¥X/imp` (每印象成本, 客户营销语境)
- `8,000-12,000 imp` (营销统计发放量) / `cost-per-impression`
- `Impressions` 单词 (艺术/营销语境, 不跟数字) / `position/pose/positive` / `TOP 3` 带空格 / `top-3 picks` 类

**教训固化**: 2026-09-17 全站清查 116 处泄漏 (67 META + 49 CONTENT): sticker-material / foil-stamping / school-exercise-book / kraft-paper-box / poster-size / campus / calendar × 3 locale; 双品牌 `智印港 ZprintPro` 2 处 zh-hk title 同批修复。根因: 门童 #9 gscSource 跳过 src/ 无客户可见泄漏检测。

**配套**: AGENTS.md §0.23.1 (规则 SSoT) | 门童 #16 注册于 check-regression-guard.js | pre-commit 钩子端到端验证已过 (注入泄漏 → commit 被拦)


---

### 规则 CE_TRUNCATION_CUSTOMER_VISIBLE — 批量文本脚本删除 "ce" 序列毁掉客户可见文本 (2026-09-02 事故, 2026-09-17 修复, 门童 #17)

**事故形态**: 某批量文本处理脚本 (commit `2f8d9438` "packaging-blog-reorg-v3" 2026-09-02 06:13) 把客户可见文本里**所有 "ce" 字符序列删除**, 破坏 **2,799 处**并存活 15 天:

| 破坏 | 应为 | 处数 | 影响 |
|------|------|------|------|
| `servi` | service | 168 | 最高频商业词被毁 |
| `spa-y-1` | space-y-1 | **762** | **Tailwind CSS 类名被毁 → 版面样式失效** |
| `rtification` | certification | 68 | 认证表述被毁 |
| `nstatd.gov.hk` | censtatd.gov.hk | 3 | **香港政府统计处网址被毁** |
| `Pamaker` | Pacemaker | 9 | NSPA 年鉴奖项名 (面向美国学校客户) |
| `offirs` | officers | 2 | — |
| `e-commer` | e-commerce | 50+ | — |
| `pre-ra` / `Dreamfor` / `llophane` | pre-race / Dreamforce / cellophane | — | 铁证: 连字符词/专有名词同样中招 |

**为什么能存活 15 天**: 门童 #9 gscSource 跳过 src/; 门童 #15 blog-data-integrity 只校验 JSON 结构不校验文本正确性; 门童 #16 GSC 泄漏只管后台黑话 —— **没有任何门童检查"英文文本是否完整"**。

**触发条件** (任一命中即 red 硬拦):
- 客户可见内容出现基线中 323 个 ce 截断 token (如 `servi` / `complian` / `rtification` / `spa-y-` / `e-commer`)

**机审**: `scripts/guards/ce-truncation-guard.js` + 基线 `scripts/guards/data/ce-truncation-baseline.json` (323 条, 从干净父版本 `be744435` 自动学得)

**修复方法 (可复用)**: 用 `git log -S <受破坏字符串>` + 二分定位引入 commit → 取其**父 commit** 为干净参照 → 用 token 集差集自动生成 `(截断 → 正确)` 映射 → 全词边界替换 + JSON 断言。**比人工核对快且不漏**。

**教训固化**:
1. **批量文本脚本必须做"文本完整性"断言** (§12 三件套只要求计数/形状断言, 不足以拦住"每个词少 2 个字母")
2. **回归检测要找机器可判的锚点**: 本次用"干净版本 token 差集"自动学得 323 条基线, 而非人工列词表
3. **CSS 类名也是客户可见内容**: `spa-y-1` 不会报错、不会 404, 只会让版面悄悄失效 —— 与文字错误同样优先
4. **事故存活期 = 门童盲区期**: 覆盖不到的地方, 错误不会自己消失

**配套**: 门童 #17 注册于 check-regression-guard.js | 修复 commit (2026-09-17) | 全站残留验证 0


---

### 规则 SCENARIO_LINK_POSITION_MISMATCH — 品类页行业场景链接位置索引错配 (2026-09-17 K3 报告)

**事故形态**: 品类页「服務行業與應用場景」卡片的「查看完整方案 →」用**位置索引**取目标 blog:

```js
// 旧实现 (bug)
const blogSlug = coveredSlugs[Math.min(posInTier, coveredSlugs.length - 1)];
```

用「Tier 内位置」去索引**另一个独立排序的数组** —— 两边顺序一旦不一致就错配:

| 品类 | 场景 (按 priority) | 映射表 (独立排序) | 实际链接 |
|------|-------------------|-------------------|----------|
| packaging | [0]beauty [1]ecommerce [2]**茶飲** [3]real_estate | [0]化妝品盒 [1]跨境快遞盒 [2]**樓盤書** [3]茶飲禮盒 | **茶飲食品 → 豪宅樓書指南** |

**客户体验损失** (比 404 更重):
- 客户在卡片上读到「茶飲品牌禮盒 · 天地蓋+抽屜式 · FSC 環保紙」→ 点「查看完整方案」
- 得到「香港新盤樓書印刷指南」→ 第一反应「点错了?」→ 第二反应「这网站链接乱放」→ **信任崩塌**
- 404 是「暂时没有」(可理解); 错配是「给你错的」(不可原谅) —— 且**不报错、不监控、无声流失**

**同源问题**:
1. **tier B 场景完全无链接** (`covered = tier === 'A'`) → 19 个场景显示「查看完整方案 →」却是 `<div>`, 点了没反应
2. **超出范围 fallback 到最后一个** (`Math.min(posInTier, len-1)`) → stickers 的 3 个场景全指向「藥品標籤」
3. 无 404 检查 → 若 blog slug 写错, 直接断链

**修复原则 (第一性原理)**:
> 卡片承诺了具体场景, 「查看完整方案」= 客户声明「我要看**这个场景**怎么做」。
> 链接目标必须与卡片语义一致。**三层降级: 专属指南 > 同场景 SKU > 品类页兜底**。
> **唯一不可接受的是「给他另一个场景的内容」。**

**机审**: `scripts/verify-scenario-links.ts` (`npm run scenario:check`) —— 216 断言:
- A/B: 每场景 href 非空 + 目标真实存在 (blog slug ∈ blog-posts.ts / SKU slug ∈ products.ts)
- C: ★ 回归用例 (packaging.tea_beverage 必须→茶飲禮盒指南, 不得→樓盤書)
- D: ★ 反模式 (同品类内不同场景不得指向同一目标 = 位置索引错配特征)
- E/F: 每品类至少一条可下单路径 + 场景覆盖率

**教训固化**:
1. **禁止用位置索引对齐两个独立排序的列表** —— 用**语义 key** 映射 (`SCENARIO_LINKS[品类][场景key]`)
2. **CTA 有文案就必须有链接**: 显示「查看完整方案 →」的卡片点了不能没反应
3. **降级链必须有终点**: blog → SKU → 品类页, 保证永不断链/永不 404
4. **已验证 0 处 404 但仍要测**: 本次 404 检查全过, 问题是「能打开但不对」—— **可达性 ≠ 相关性**

**配套**: `src/data/industry-scenario-links.ts` (语义映射 SSoT) | `CategoryIndustries.tsx` (主组件 + getIndustryCards) | `CategoryPageV9.tsx` (v9 复用方)


---

### 规则 GSC_LEAK_PATTERNS_V2 — 门童从「枚举措辞」升级为「语义类别 + 内部代号锚点」(K3 2026-09-17 二次报告)

**K3 二次报告原话**: 「7 + 0 click, school exercise book printing +.6 (3mo 海外大單簇). 这里面是不是还有 GSC 里面的内容呢 … 这也是最新的 blog 文章，**门童机制呢？**」

**为什么门童 #16 没拦住 (根因: 设计缺陷, 不是漏跑)**:

门童 #16 v1 是**枚举措辞**——把当时见到的形态写成正则:
`pos X` / `X imps` / `攻艱` / `衝首頁` / `TOP3` / `gsc-fresh-*.json`。

但 GSC 后台数据的**表达变体无穷**, 枚举必然漏:

| 漏检形态 | 实例 |
|---------|------|
| 点击指标 | `7 + 0 click`、`1 click 真实数据` |
| 时间窗 | `(3mo 海外大單簇)` |
| 位置变化 | `+.6` |
| 内容簇 | `主簇`/`子簇`/`海外大單簇` |
| 内容分级 | `Pillar #3 12,000+ 字深度版`、`Pillar 1 包裝盒 12 鐵律` |
| 内部拍板 | `(K3 8/19 拍板 12 件事屬實, 必含)`、`(K3 9/3 23:29 拍板…CTA 減至 2 個)`、`K3 R5 hard deadline` |
| 内部表 | `008 案例庫待校準` |
| 内部定价口径 | `校準報價`、`校準錨點`、`校準來源`、`reference calibration` |

**★ 根本教训**: **正则门童若靠列举已知样本, 覆盖率 = 已知样本 / 全部可能, 必然随时间漏**。
正确做法 = 按**语义类别 + 内部代号锚点**覆盖, 让"没见过的新措辞"也落网:
- **内部代号锚点**: `K3`(排除 K1-K3)、`008 案例庫`、`gsc-fresh`、`GSC`、`Search Console`
- **指标类别**: 数字 + (click|imps|pos|CTR) 的组合
- **内容架构术语**: `Pillar + 数字`、`跨 Pillar`、`主簇/子簇`、`跨品類內鏈`
- **内部流程口径**: `校準報價/校準錨點/校準來源/待校準/已校準/真實校準`
- **时间窗/位置变化**: `\d+mo`、`+\d.\d`

**机审 (2026-09-17 升级)**: `scripts/guards/gsc-leak-guard.js` 模式从 15 → **27 条**, 新增 7 类语义模式;
豁免同步扩展 (避免误伤行业标准术语):
- ✅ 保留: `色彩校準`/`ICC`/`ISO 12647` (印刷色彩管理标准)、`K1-K3` (幼儿园年级)、
  `Pillar Wrap` (地铁广告柱包裹形式)、`9-12 mo` (月份范围)、`3D/2D` (技术术语)、
  `ED-002/BC-002/PKG-007` (产品目录编号, 客户可理解)、URL slug `pillar-guide` (改动会 404)

**验证 (端到端)**:
- 三语空跑 0 命中
- **注入 K3 报告的原句 → 抓到 4 命中** (`0 click` / `簇` / `3mo` / `+.6`)
- 10 个合法语境**全部放行, 0 误报**

**本次清除 (3 语共 58 处)**:
- campus-education SEO title/description/excerpt/JSON-LD 含 `Pillar 完整指南` (**会显示在 Google 搜索标题**)
- `K3` 内部拍板记录 6 处 (多语言措辞变体: `board reduced`/`per K3`/`拍板で…削減`)
- `Pillar #N` 内容分级 11 处、跨品类内链策略描述 6 处
- `008 案例庫待校準` 2 处、内部定价口径 (`校準報價/錨點/來源`) 7 处
- GSC 指标句 2 处 (K3 报告的 `7 + 0 click…` + `1 click 真实数据`)
- `main cluster/sub-cluster/クラスター` 内容分组 4 处

**边界判断 (记录)**: `campus-education-printing-pillar-guide` 这个 **URL slug 保留不改** ——
slug 是 SEO 技术标识, 改动会造成 404 并需 301 链, 成本 > 收益; 客户可见的**正文术语**已全部清除。


---

### 规则 CRON_HARDCODED_WORKTREE_PATH — 定时任务脚本硬编码已移除的 worktree 路径 (2026-09-17 K3 报告)

**K3 报告原话**: 「在这里我们的定时任务还是没有建设好，在M3里面去执行了，思考理解问题，分析研究给到解决方案。」

**事故形态**: cron/lane 脚本把**执行目录硬编码**为 `F:\zprintpro-main-tmp`（M3 时代的主工作目录）。
该 worktree 按 K3 2026-09-17 目录铁律被移除后，任务**照常被触发、照常 exit=0**，但实际什么都没做：

| 时间 | 现象 |
|------|------|
| 9/13 | K3 v9.4 cron-rearm 改用 schtasks + deepseek harness，脚本写死 main-tmp（当时有效） |
| 9/14–9/17 早 | 正常执行（main-tmp 存在） |
| **9/17 白天** | K3 目录铁律移除 main-tmp worktree |
| **9/17 21:17** | `ZP-daily-content` lane 报 **BLOCKED**（declared repo root is empty；`.hermes/cron-prompts/*.md` not found），但 **dsh exit=0** |
| **9/17 22:43** | `ZP-gsc-feedback` 同样 BLOCKED |
| — | host-side git 也失败：`can't open file 'F:\zprintpro-main-tmp\scripts\lane-git-commit.py'` |

**★ 最危险的特征**: `schtasks` 的 `Last Result` 显示 **0（成功）** ——
**任务在看板上全绿，实际零产出**。这类"假成功"比直接报错危险得多，因为它不会触发任何告警，
只能靠 watchdog 的"报告新鲜度"间接发现，且容差 26h 意味着**最长可静默一整天**。

**触发条件**（任一命中即需修）:
- cron / lane / wrapper 脚本中出现**已从 `git worktree list` 消失的路径**
- 脚本中出现**硬编码的项目根目录**（应自动探测）
- `cd /d "<path>"` 的 path 为空或不存在

**修复模式 (可复用)**:
1. **禁止硬编码项目根** → 用自动探测：`os.path.dirname(os.path.dirname(os.path.abspath(__file__)))`（Python）
   或 `$Repo = 'F:\zprintpro-nextjs'` 单点定义（PowerShell 生成器，其余路径全部 join 它）
2. **单一事实源**：生成器（`register-cron-tasks.ps1`）里的路径变量是唯一来源，生成的 wrapper 不得另有假设
3. **生成物入库**：`.hermes/cron-run/` 11 个脚本此前**从未被 git 跟踪** → 迁移/灾难恢复不可复现；
   本次入库，配合生成器保证一致性
4. **改 PS1 生成器必须保持 ASCII-only**：文件头已注明 "Windows PowerShell 5.1 reads non-BOM UTF-8
   as ANSI and mangles CJK -> parser errors"；本次我在 `$MainRepo = $Repo` 附近加中文注释，
   直接导致变量解析失败、生成 `cd /d ""` 空路径 —— **回归即被自己的这次教训印证**

**机审建议**: 在 cron 巡检里加"脚本路径存在性"断言（脚本内所有绝对路径必须 Test-Path 通过）。

**遗留 (待 K3)**:
- `F:\zprintpro-main-tmp` 空壳目录建议删除（内容已备份 2329 文件至 `.hermes/_archive-main-tmp-20260917/`）
- **exit=0 假成功**：lane BLOCKED 时 dsh 仍返 0 → 依赖 watchdog 次日告警兜底，建议 wrapper 增加
  "本次是否产出新报告"的判定并把无产出转为非 0
- `autoclaw jobs.json` 内 40 条任务（12 enabled）为 M3 时代残留僵尸（**从未建实体**）→ 建议清理


---

### 规则 CROSS_ARTICLE_PRICE_CONFLICT — 同品类跨文章价格口径互斥 (2026-09-18 K3 裁定, 门童 #19)

**K3 裁定原话**: 「HK8-25/份」（对应我上报的「跨文价格冲突」遗留项）

**事故形态**: 同一品类（月曆印刷）在**同一站点、同一语言**上给出三个互不相容的基准价区间，
客户任何一次跨文对比都会立刻发现矛盾：

| 文章 (slug) | zh-hk | en | ja |
|---|---|---|---|
| `calendar-printing-guide` | HK$3-8/本 | $0.40/pc | 1部50円から |
| `2027-calendar-printing-complete-guide` | HK$14-57/本 | US$1.80-7.30/pc | 1冊280〜1,140円 |
| `2027-monthly-calendar-printing-timetable` | HK$3-15 | $0.40-1.90/pc | $0.40-1.90/冊 |

**最大差 3-5 倍**（HK$3 vs HK$57）。三篇都是 2026-08/09 批量生成内容，**各自算术自洽、互相矛盾**
——单看任何一篇都发现不了，只有横读三篇才暴露。

**为什么能存活**: 门童 #16/#17 管的是「泄漏」与「残缺」，**没有任何门童做跨文一致性校验**；
批量生成时每篇独立取材，没有共享的价格 SSoT。

**★ 根本教训**: **跨文件语义一致性不是任何单文件校验能覆盖的**。
单文件「格式合法 + 无禁词 + 无残缺」全绿，仍然可以是**自相矛盾**的。
凡是「同一事实在多处被陈述」的字段（价格 / 交期 / 起订量 / 认证 / 年限），
必须有一个**跨文件基准 + 门童比对**。

**修复 (2026-09-18)**:
- 基准区间 = **HK$8-25/份**（K3 裁定）；汇率口径**沿用文章自身换算**，不新定汇率：
  en 7.8（文章 A 自身 14/1.80=7.78、57/7.30=7.81）→ US$1.00-3.20/pc；
  ja HK$1 = 20円（文章 A 文中明示）→ 160〜500円
- 共改 **16 处**：zh-hk 5 / en 6 / ja 5（description / excerpt / 摘要 / FAQ / 快速答案 / 单價表行）

**★ 作用域陷阱 (必须记住)**: 全文本 `split/join` 替换会**跨品类误伤**，本批实测：
- `HK$14-57/本` 全文 7 处 — **仅 3 处是月曆**，另 4 处是 `saddle-stitch-booklet-printing-guide`(3) 与
  `catalog-printing-china-supplier-guide`(1) 的**小冊子價**
- `HK$3-8/本` 全文 9 处 — 月曆 6 处，另 3 处是 pillar 内的**燙金附加費**（不是月曆單價）
⇒ 必须**按 slug 窗口限定作用域**（相邻 `"slug":` 键之间），并对「必须保留」的同类字符串设反向断言。

**机审**: `scripts/guards/price-band-guard.js`（门童 #19，red 硬拦，**不依赖变更文件列表、每次 commit 全量复核**）：
- 必需断言：三篇 × 3 locale 各自必须出现本 locale 基准区间字样（防被改回 / 被清空）
- 禁止断言：窗口内不得再出现任一旧值（防回归 + 防新增第 4 个口径）
- 边界断言：他品类同名价格串（小冊子/附加費）必须原样保留

**配套 (危险写入三件套, §12)**: `.hermes/fix-calendar-price-band-20260918.cjs` ——
① 计数断言（按 slug 窗口，非全文）② 结果形状断言（JSON 可解析 + 条目数不变 + 无 BOM + 旧串净减 n +
**逐行 diff 独立复核：每条差异行必须等于该行所属 slug 的计划替换结果**）③ 备份 `.hermes/_bak-calendar-price-20260918/`。
**实测拦下 2 次**：首次 5 条计数不符（作用域判定为全文）→ 拒绝写盘；二次 3 条形状不符（断言本身写错）→ 自动回滚。
**断言写错也会拦 —— 宁可误拦，不可误写。**

**遗留 (待 K3)**: 三篇正文内的**材质/行业子档次价格表**（zh-hk pillar 26 条、en pillar 27 条）
仍跨越 HK$2-57，未纳入本次基准（基准只统一「基准区间声明」）。
子档次要否一并压进 HK$8-25 带内、或另给各材质档位 → 需 K3 一句话，**不自行编造子档位价格**。
