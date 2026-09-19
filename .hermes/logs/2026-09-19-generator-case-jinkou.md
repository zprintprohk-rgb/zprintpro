# 生成器排查结案 — `進口印刷設備` 为何出现在英文/日文客户可见正文

> **立案**: 2026-09-19（Step E 并行项，K3 序 6）｜**性质**: **人工占位 + 生成器无 locale 守卫**（非单一脚本 bug）
> **现状**: **未修**（属批 2 范围，待 Step E 术语拍板后随批量替换一并处置）

---

## 一、现象

| 语系 | `進口印刷設備` 出现 | 判定 |
|---|---|---|
| `blog-data/zh-hk.json` | **48** | ✅ 正常（繁体中文语境，指「进口印刷设备」） |
| `blog-data/ja.json` | **21** | 🔴 **污染**（日文正文出现中文） |
| `blog-data/en.json` | **40** | 🔴 **污染** |

污染形态（en）：
- `German 進口印刷設備 presses for precise color reproduction`
- `ZprintPro features 進口印刷設備 6+1 printing presses`
- `equipment (進口印刷設備/Komori)` ← 括注里同时出现中文与竞品品牌

污染形态（ja）：`智印港は… 進口印刷設備 6+1 機台プルーフ …`（后段已是日文）

---

## 二、根因（两段，缺一不可）

### 2.1 第一段：门童的「修法建议」被写成**中文术语**，且被当**字面替换串**用

`scripts/guards/credibility-guard.js`：
```js
{ id: 'CRED_HEIDELBERG', pattern: /海德堡\s*柯式|海德堡\s*6\+1|Heidelberg|HP\s*Indigo/g,
  fix: '撤除 (per §0.23 数据诚信), 改用 "进口印刷设备" 描述' }
```
`scripts/guards/sop10-guard.js`：
```js
{ id: 'SOP10_HEIDELBERG_6_1', pattern: /海德堡\s*6\s*\+\s*1/g,
  fix: '撤除 (per §0.22 SOP-10 5 问 3 款), 改用 "进口印刷设备"' }
```
历史 remediation（`be744435 fix(blog-data-credibility-sweep): 全站 239 blog / 508 处硬数据撤除` 等批）
把品牌名（`Heidelberg` / `HP Indigo`）撤除时，**采用了 fix 建议里的中文串**作为替换文本，
并在**三语**一起做了全局替换 ⇒ 英文/日文正文里留下了中文术语。

> ⚠️ 注意方向：不是「脚本拿 fix 文案当替换串」这么单一 —— 同一时期的人工/半自动编辑
> （见 `.hermes/_archive-main-tmp-20260917/tmp-apply-rush.cjs` L23/L33 的模板文本，
> 其「12 件事屬實」清单本身就写着 `…多年，客戶，進口印刷設備，急件 18:00 截單`）
> 也把该中文串当成了品牌名的**替代表述**，并被复制进 en/ja。

### 2.2 第二段：**没有任何 locale 守卫**拦住中文进入 en/ja 值

- 门童 #4 双向化（`I18N_POLLUTION_EN`）**建于 2026-09-19**，即上述替换发生**之后**，
  故当时无任何机审能拦下「中文进入 en 值」；
- 门童 #16（GSC 泄漏）、#3（品牌名）等管的是**别的面**，都不管这件事。

---

## 三、影响面（量化）

| 项 | 值 |
|---|---|
| 污染处数 | **en 40 + ja 21 = 61 处**（zh-hk 48 处正常，不动） |
| 门童口径字符 | 计入 `I18N_POLLUTION_EN` 的 `進口印刷設備` = **240 字符（40 次）** |
| 占 Step E 术语表比重 | **240 / 778 ≈ 31%**（单一术语最大项之一，仅次 `國際認證體系` 270） |

---

## 四、处置建议

| # | 动作 | 归属 |
|---|---|---|
| 1 | **术语拍板**：`進口印刷設備` 的批准英文 = `imported presses` 或 `Heidelberg presses`（后者依赖 `CRED_HEIDELBERG` 选 A「允许」的既有裁決） | K3 / Step E |
| 2 | **en/ja 批量替换**该 61 处（en → 批准英文；ja → 批准日文，如 `輸入印刷機` / `ハイデルベルク印刷機`） | 批 2 |
| 3 | **修两个门童的 `fix` 文案**：改为**不含可被误用为替换串**的表述（例如 `改用中性描述，禁写品牌名`），从源头断掉「fix 文案被当替换串」的可能 | 建议同批 |
| 4 | **补 locale 守卫（已具备）**：门童 #4 双向化现已能拦此类，**建议补一条注入回放用例**：往 en 值注入中文工具名词 ⇒ 门童 #4 必须命中 | 建议同批 |

---

## 五、教训（已登记 `error-patterns.md`）

**门禁的 `fix` 文案是「给人看的建议」，不是「给机器用的替换串」。**
一旦建议文案里出现**具体可复制的字符串**，就有被下游当字面替换值使用的风险 ——
本次事故中，门禁的修法建议反过来成了污染源。
**规则**：门禁的 `fix` 字段不得包含可直接落盘的成品文案；如需给出示例，必须显式标注「示例，勿直接替换」，
且替换类操作必须有**目标语系守卫**（本事故的两段根因缺一不可）。

---

## 六、复跑命令

```bash
cd F:\zprintpro-nextjs
# 现象复现
node -e "const fs=require('fs');for(const l of ['en','ja','zh-hk']){const t=fs.readFileSync('src/data/blog-data/'+l+'.json','utf8');console.log(l, t.split('進口印刷設備').length-1)}"
# 历史溯源
git log --oneline -S'進口印刷設備' -- src/data/blog-data/ja.json
# 门童修法文案
grep -n '进口印刷设备' scripts/guards/credibility-guard.js scripts/guards/sop10-guard.js
```
