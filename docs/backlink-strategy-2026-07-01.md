# ZprintPro 全球外链策略 — 3 Locale 分市场执行手册

> 生成: 2026-07-01 | 背景: GSC 28天 67点击, 平均排名 27.7, sameAs 为空

---

## 0. 当前外链状态

| 指标 | 当前 | 目标 |
|------|------|------|
| Google 引用域名 | ~0 | 20+ |
| sameAs profiles | 空 | 15+ (5/locale) |
| 商业目录 listing | 0 | 30+ |
| 行业媒体引用 | 0 | 3-5 |
| 社媒 profile | 0 | 3-5 |

**核心问题**: 排名 27.7 的根因之一是零外链。Google 把 backlinks 当"投票"，没有投票的网站很难进首页。

---

## 1. 外链策略分层

### Tier 1: NAP 一致性引用（必做, 0 成本）
这些是 Google 用来验证实体存在的"权威引用"：

| 平台 | zh-hk | en | ja | 优先级 |
|------|-------|----|----|--------|
| Google Business Profile | ✅ | ✅ | ✅ | P0 |
| Bing Places | ✅ | ✅ | ✅ | P0 |
| Apple Maps Connect | ✅ | ✅ | - | P1 |
| Yelp (US market) | - | ✅ | - | P1 |
| 食べログ 或 ホットペッパー | - | - | ✅ | P1 |

### Tier 2: 商业目录（批量提交, 部分免费）

**zh-hk 市场**:
| 平台 | URL | 类型 | 费用 |
|------|-----|------|------|
| HK Yellow Pages | yp.com.hk | 目录 | 免费 |
| Kompass HK | hk.kompass.com | B2B 目录 | 免费 |
| HKTDC | hktdc.com | 贸易目录 | 免费 |
| AsiaXPAT | hk.asiaxpat.com | 商业目录 | 免费 |
| 88DB | 88db.com.hk | 分类目录 | 免费 |
| Google Maps HK | maps.google.com | 地图 | 免费 |

**en 市场**:
| 平台 | URL | 类型 | 费用 |
|------|-----|------|------|
| Clutch | clutch.co | B2B 评价 | 免费 profile |
| ThomasNet | thomasnet.com | 工业目录 | 免费 |
| Alibaba | alibaba.com | 贸易平台 | 免费 |
| Trustpilot | trustpilot.com | 评价平台 | 免费 |
| Crunchbase | crunchbase.com | 公司数据库 | 免费 |
| Manta | manta.com | 小企业目录 | 免费 |

**ja 市场**:
| 平台 | URL | 类型 | 费用 |
|------|-----|------|------|
| iタウンページ | itp.ne.jp | 电话簿 | 免费 |
| エキテン | ekiten.jp | 店铺 review | 免费 |
| ビジネスモール | b-mall.ne.jp | B2B | 免费 |
| 全国法人情報 | houjin-bangou.nta.go.jp | 法人登记 | 免费 |
| Google Maps JP | maps.google.com | 地图 | 免费 |

### Tier 3: 行业媒体/PR（高质量, 需时间）
| 类型 | 平台 | Locale |
|------|------|--------|
| 印刷行业 | printmag.com, package-printing.org | en |
| 包装设计 | thedieline.com, packagingoftheworld.com | en |
| 日本印刷 | jfpi.or.jp, jas-pes.or.jp | ja |
| 设计社区 | behance.net, dribbble.com | en/all |

---

## 2. 3 Locale 注册信息

### zh-hk 用
```
公司名: 智印雲 ZprintPro
地址: 香港九龍新蒲崗大有街3號萬廣大廈15樓C室
电话: +852 5905 1334
网站: https://zprintpro.com/zh-hk/
邮箱: zprintpro@outlook.com
简介: 香港專業印刷服務，貼紙/宣傳單張/包裝盒定制，即日交貨，港九新界免費速遞。
```

### en 用
```
Company: ZprintPro (Shenzhen Cailong Printing & Packaging Co., Ltd.)
Address: No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China
Phone: +86 198 8085 1334
Website: https://zprintpro.com/en/
Email: zprintpro@outlook.com
Description: Custom printing service — stickers, flyers, packaging boxes. ISO 9001 certified. 72h global DHL delivery.
```

### ja 用
```
事業者名: 深圳市彩龍印刷包装有限公司 (ZprintPro)
所在地: 広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）
電話: +86 198 8085 1334
ウェブサイト: https://zprintpro.com/ja/
メール: zprintpro@outlook.com
事業内容: ステッカー、チラシ、パッケージ印刷。深圳工場直結、ISO 9001認証。3〜5営業日納品。
```

---

## 3. 提交优先级（ROI 排序）

1. **Google Business Profile** (3 locale) — 直接提升本地搜索排名
2. **Bing Places** (3 locale) — 第二大搜索引擎
3. **各市场 Top 3 商业目录** — 高质量 NAP 引用
4. **Alibaba** (en) — B2B 流量 + backlink
5. **Clutch / Trustpilot** (en) — 信任信号
6. **行业媒体提交** — 最高质量但需要内容配合

---

## 4. 技术实现状态

- ✅ `getSiteNAP(locale).sameAs` 字段已建（3 locale 独立）
- ✅ `generateOrganizationSchema` 自动输出 `sameAs` 到 JSON-LD
- ⏳ 待在各平台注册后填入 profile URL
- ⏳ 注册后更新 `seo.ts` 中的 `sameAs` 数组

## 5. 注册后填入代码

```ts
// src/lib/seo.ts getSiteNAP 函数中, 把注释取消并填入真实 URL:
sameAs: [
  'https://www.google.com/maps/place/ZprintPro+HK',
  'https://hk.kompass.com/c/zprintpro/...',
  'https://www.hktdc.com/manufacturers-suppliers/ZprintPro/...',
],
```

## 6. 预期效果

- 第 1 个月: Google 发现 10+ 引用域名, NAP 一致性验证通过
- 第 2-3 个月: 平均排名从 27.7 → 20 以下
- 第 4-6 个月: 核心关键词进入首页, 月点击从 67 → 500+
