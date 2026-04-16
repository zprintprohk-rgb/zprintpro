# 智印港 ZPrintPro - Next.js 14 印刷服務網站

這是一個基於 Next.js 14 構建的三語言（繁體中文、英文、日文）印刷服務網站，包含 279 個靜態頁面，79 個 SKU 產品數據，完整的 SEO + GEO 優化。

## 項目概覽

- **框架**: Next.js 14 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **UI 組件**: shadcn/ui
- **總頁數**: 279 頁
  - 3 個首頁（每語言各 1 個）
  - 39 個分類頁（13 個分類 × 3 語言）
  - 237 個產品頁（79 個產品 × 3 語言）
- **產品 SKU**: 79 個
- **語言版本**: 3 個（繁體中文、英文、日文）

## 項目結構

```
zprintpro-nextjs/
├── src/
│   ├── app/[locale]/              # 多語言路由
│   │   ├── layout.tsx             # 根佈局
│   │   ├── page.tsx               # 首頁
│   │   ├── category/[slug]/       # 分類頁
│   │   └── product/[slug]/        # 產品頁
│   ├── components/
│   │   ├── layout/                # 佈局組件
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/                  # 首頁組件
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── HotProducts.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   └── KnowledgeSection.tsx
│   │   ├── product/               # 產品頁組件
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductTabs.tsx
│   │   │   ├── RelatedProducts.tsx
│   │   │   └── QuoteCalculator.tsx
│   │   ├── category/              # 分類頁組件
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── Pagination.tsx
│   │   └── JsonLd.tsx             # 結構化數據組件
│   ├── lib/
│   │   ├── seo.ts                 # SEO 工具函數
│   │   └── utils.ts               # 通用工具函數
│   └── data/
│       └── products.ts            # 產品數據（79 SKU）
├── supabase/
│   └── migrations/
│       └── 001_create_quotes_table.sql  # 數據庫遷移
├── scripts/
│   ├── pre-deploy-check.sh        # 部署前檢查
│   ├── deploy.sh                  # 部署腳本
│   ├── health-check.js            # 健康檢查
│   └── generate-sitemap.js        # 站點地圖生成
├── public/
│   ├── robots.txt
│   └── manifest.json
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 快速開始

### 1. 安裝依賴

```bash
cd zprintpro-nextjs
npm install
```

### 2. 本地開發

```bash
npm run dev
```

訪問 http://localhost:3000

### 3. 構建

```bash
npm run build
```

構建輸出將位於 `out/` 目錄。

### 4. 部署

#### 本地預覽
```bash
npx serve out
```

#### 部署到 Vercel
```bash
./scripts/deploy.sh vercel
```

#### 部署到 Netlify
```bash
./scripts/deploy.sh netlify
```

#### 部署到 Cloudflare Pages
```bash
./scripts/deploy.sh cloudflare
```

## SEO + GEO 優化

### 已實現的優化

1. **頁面元數據**
   - 每頁獨立的 title、description、keywords
   - Open Graph 標籤
   - Twitter Card 標籤

2. **結構化數據 (JSON-LD)**
   - Organization Schema
   - LocalBusiness Schema
   - Product Schema
   - BreadcrumbList Schema
   - FAQPage Schema
   - WebSite Schema (含站內搜索)

3. **Hreflang 標籤**
   - 三語言版本互相關聯
   - x-default 設置

4. **站點地圖**
   - 自動生成 sitemap.xml
   - 多語言 sitemap 索引
   - 包含所有 279 個頁面

5. **Robots.txt**
   - 允許所有爬蟲
   - 指向站點地圖

6. **性能優化**
   - 靜態導出 (SSG)
   - 圖片優化
   - 代碼分割

## 產品數據

79 個 SKU 分佈在 8 大分類：

1. **貼紙** (10 SKU) - 圓形貼紙、長方形貼紙、模切貼紙等
2. **標籤** (10 SKU) - 產品標籤、物流標籤、食品標籤等
3. **卡片** (10 SKU) - 名片、員工證、明信片等
4. **書刊** (10 SKU) - 小冊子、產品目錄、傳單等
5. **包裝** (10 SKU) - 產品盒、快遞盒、紙袋等
6. **大型噴畫** (10 SKU) - 橫額、海報、易拉架等
7. **文具** (10 SKU) - 信紙、信封、便條簿等
8. **宣傳品** (9 SKU) - 書籤、磁石貼、杯墊等

## 報價計算器

產品頁內置即時報價計算器，支持：

- 數量選擇
- 材質選擇
- 尺寸選擇
- 加工選項
- 製作時間選擇
- 自動計算單價和總價

## 數據庫

使用 Supabase 存儲：

- 報價請求
- 訂單
- 購物車
- 用戶資料

運行遷移：
```bash
psql -h your-host -U your-user -d your-db -f supabase/migrations/001_create_quotes_table.sql
```

## 環境變量

創建 `.env.local` 文件：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (可選)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# 網站配置
NEXT_PUBLIC_SITE_URL=https://zprintpro.com
```

## 腳本

### 部署前檢查
```bash
bash scripts/pre-deploy-check.sh
```

### 構建並部署
```bash
bash scripts/deploy.sh [local|vercel|netlify|cloudflare]
```

### 健康檢查
```bash
node scripts/health-check.js
```

### 生成站點地圖
```bash
node scripts/generate-sitemap.js
```

## 瀏覽器支持

- Chrome (最新 2 個版本)
- Firefox (最新 2 個版本)
- Safari (最新 2 個版本)
- Edge (最新 2 個版本)

## 授權

© 2024 智印港 ZPrintPro. All rights reserved.

## 聯絡

- 網站: https://zprintpro.com
- 電話: 2154 1318
- 電郵: info@zprintpro.com
- 地址: 香港觀塘成業街16號怡生工業中心
