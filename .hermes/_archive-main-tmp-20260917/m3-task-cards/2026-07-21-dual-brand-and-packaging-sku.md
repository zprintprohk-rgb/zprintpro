# M3 任务卡 2026-07-21:智印港双品牌落地 + Packaging SKU 补齐

> 优先级: P1 | 预计 1 commit(攒批,1 次 build)| K3 已拍板,user 已批准方案 A
> 收入关联: 智印港品牌词是老站 GSC 点击榜第 1(老站 CTR 64% → 新站仅 10%),301 后必须接住;卡盒/坑盒是盒子类走量主体,当前 0 SKU。

---

## Part 1: 智印港双品牌分层(zh-hk 启用,en/ja 不动)

### 背景数据(勿改判断,直接执行)
- 老站 z-printpro.com GSC:「智印港」16 点击 / 25 展示 / CTR 64% / 排名 1
- 新站 zprintpro.com GSC:「智印港」3 点击 / 30 展示 / CTR 10% / 排名 2.57
- 诊断: 用户搜「智印港」落地页看不到「智印港」,不敢点。301 生效后老站消失,此流量必须承接。

### 1.1 Logo 按 locale 切换
文件: `src/components/layout/Header.tsx`(当前 line ~321,硬编码 `/images/logo-new-200x55.png` alt="ZprintPro")

- zh-hk → 新 logo 文件 `public/images/logo-zhiyingang-200x55.png`
  - **资产状态**: 源文件在 `F:\网站z-printpro\智印港.psd`(PSD 无法直接处理)。若 user 尚未提供 PNG,**fallback 方案**: zh-hk 用 styled text 组合 —— 主标「智印港」(品牌色粗体)+ 副标小字「ZprintPro」,视觉权重与图片 logo 一致,后续拿到 PNG 再替换。不要自己用脚本从 PSD 转图。
  - alt 文案: zh-hk = "智印港 ZprintPro";en/ja = "ZprintPro"(不变)
  - 尺寸规格与现 logo 一致(h-[34px] sm:h-[44px] lg:h-[52px] w-auto)
- en / ja → 保持 `logo-new-200x55.png` 不动
- Favicon 全站统一,不换

### 1.2 Schema alternateName 扩容
文件: `src/lib/seo.ts` line 16

```ts
// 改前
alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲印刷'],
// 改后
alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲印刷', '智印港'],
```
- `name: '智印雲'` 不动(实体稳定性优先,alternateName 足以建立「智印港 = 同一实体」关联)
- 注意: 该对象注释里 2026-06-17 的"品牌切割"背景已过时(301 已合体),在注释末尾追加一行: `// 2026-07-21: 301 合体后改双品牌分层,智印港为 zh-hk 合法品牌词(AGENTS.md §1 v2)`,**不要删旧注释**(历史决策留痕)

### 1.3 zh-hk 品牌区文案(只动 zh-hk locale)
- zh-hk 首页 title 后缀: `| 智印雲 ZprintPro` → `| 智印港 ZprintPro`(只改 zh-hk 的 messages/translations,en/ja 保持 `| ZprintPro`)
- zh-hk 首页 H1 或 hero 品牌区出现「智印雲」处 → 「智印港」(全站 zh-hk 范围 grep `智印雲`,逐一判断是否品牌名语境后替换;**产品介绍正文里描述性用法不动**)
- ❌ en/ja 任何文件禁止出现「智印港」汉字
- Footer NAP 层(公司全名/地址/电话)不动 —— 法务真实主体 = 深圳市彩龍印刷包裝有限公司,与品牌名无关

### 1.4 黑名单清理(智印港从"竞品"平反)
- `grep -rn "智印港" scripts/ src/ .hermes/ --include="*.js" --include="*.py" --include="*.ts" --include="*.mjs"` 找出所有把智印港当竞品过滤/告警的逻辑
- 过滤器类(如 GSC 分析脚本排除品牌词)→ 改为「智印港 = 自有品牌词,单独统计」
- 告警类 → 删除
- AGENTS.md 条款修订由 K3 走提案,**M3 不改 AGENTS.md**

### 1.5 验收清单
1. `curl -s https://zprintpro.com/zh-hk/ | grep -o "智印港"` ≥ 3 处(logo alt + title + hero)
2. `curl -s https://zprintpro.com/en/ | grep -c "智印港"` = 0;ja 同
3. `curl -s https://zprintpro.com/zh-hk/ | grep -o 'alternateName[^]]*]'` 含 智印港
4. en/ja 页面 logo src 仍为 logo-new-200x55.png

---

## Part 2: Packaging SKU 补齐(卡盒/坑盒 0 → 3)

### 现状(user 拍板确认的结构失衡)
packaging 10 SKU 中精品礼盒/硬盒占 4(gift-boxes / rigid-boxes / magnetic-closure-gift-box / drawer-slide-gift-box),走量的卡盒、坑盒 = **0**。mailer-boxes(飞机盒)已存在,不重复建。

### 新增 3 个 SKU(写入 `src/data/products.ts`,category: 'packaging')

| slug | zh-hk 名称 | en 名称 | ja 名称 | 规格要点 |
|---|---|---|---|---|
| `white-card-boxes` | 白卡彩盒 | White Cardboard Boxes | 白カードボックス | 350g 白卡,4C+0,小/中/大 3 尺寸,500/1000/3000/5000 枚,5-7 工作天 |
| `corrugated-boxes` | 瓦楞彩盒(E/F 坑) | Corrugated Boxes (E/F Flute) | 段ボール箱(E/Fフルート) | E坑/F坑 彩印,中号 2 款 + 大号 1 款,500 起 |
| `tuck-end-boxes` | 插口盒(直插/飛機插) | Tuck End Boxes | 差し込み式ボックス | 250-350g 粉咭/白卡,小批量 300 起,反向插口可选 |

### 每个 SKU 必须包含(对齐现有 packaging SKU 字段结构)
- `title_zh / title_en / title_ja`:含 1-2 个 Tier A 行业词(零售精品 / 美妝護膚 / 跨境電商)
- `description / descriptionEn / descriptionJa`:末尾"适配行业"列表 5-8 个
- `longDescription`:行业场景,无图
- `optimizedAt: '2026-07-21'` + `optimizationRound: 1`
- 价格字段:**暂不写死价格**,标 `priceSource: 'pending-intuan'`(intuan 校准价到位后由 K3 写入 price-tables,src≠anchor 不得对客展示 —— 红线)
- 图片:复用同品类现有图或占位规则与现有一致(不要新增外链图)
- ❌ 不改 slug 路由结构;❌ 名片禁区;❌ 3 locale 不机械翻译(en 不出现 Hong Kong/Shenzhen,ja 不出现 深圳/中国 前缀)

### 验收清单
1. `curl -s https://zprintpro.com/zh-hk/category/packaging/ | grep -c "white-card-boxes\|corrugated-boxes\|tuck-end-boxes"` ≥ 3
2. 3 locale × 3 新 PDP = 9 个 URL 全部 200
3. sitemap 重新生成(`node scripts/generate-sitemap.js`)含新 URL

---

## 统一执行纪律(两部分 1 个 commit)
> 注意: K3 已在本地 commit `36680bb`(AGENTS.md 宪法修订,未 push)。你的 push 会顺带把它带上去 —— 正常 `git push origin_ssh main` 即可,不用管,也不要 rebase/reset 掉它。
1. commit 前: `node scripts/check-encoding.js --fix` → `node node_modules/typescript/bin/tsc --noEmit 2>&1 | grep -v "__tests__\|No index signature\|missing the following"` 干净 → 关键文件 BOM spot check
2. commit message: `feat(brand+sku): zh-hk 智印港 dual-brand layer + 3 packaging SKUs (white-card/corrugated/tuck-end)`
3. `git push origin_ssh main`(严禁 origin / --force)
4. push 后: `node scripts/verify-deploy.mjs` 见 PASS 才报完成
5. 报完成时附: 验收清单 1.5/2 的 curl 结果原文(自证清白协议)
