#!/bin/bash

# 部署前檢查腳本
# 檢查項目是否準備好部署

set -e

echo "🔍 開始部署前檢查..."

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查 Node.js 版本
echo "📦 檢查 Node.js 版本..."
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then 
    echo -e "${GREEN}✓ Node.js 版本符合要求: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js 版本過低: $NODE_VERSION (需要 >= $REQUIRED_VERSION)${NC}"
    exit 1
fi

# 檢查 package.json 是否存在
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ package.json 不存在${NC}"
    exit 1
fi
echo -e "${GREEN}✓ package.json 存在${NC}"

# 檢查 next.config.js 是否存在
if [ ! -f "next.config.js" ]; then
    echo -e "${RED}✗ next.config.js 不存在${NC}"
    exit 1
fi
echo -e "${GREEN}✓ next.config.js 存在${NC}"

# 檢查輸出模式是否為 export
if ! grep -q "output: 'export'" next.config.js && ! grep -q 'output: "export"' next.config.js; then
    echo -e "${RED}✗ next.config.js 中未設置 output: 'export'${NC}"
    exit 1
fi
echo -e "${GREEN}✓ next.config.js 已設置 static export${NC}"

# 檢查 tsconfig.json 是否存在
if [ ! -f "tsconfig.json" ]; then
    echo -e "${RED}✗ tsconfig.json 不存在${NC}"
    exit 1
fi
echo -e "${GREEN}✓ tsconfig.json 存在${NC}"

# 檢查 tailwind.config.js 是否存在
if [ ! -f "tailwind.config.js" ]; then
    echo -e "${RED}✗ tailwind.config.js 不存在${NC}"
    exit 1
fi
echo -e "${GREEN}✓ tailwind.config.js 存在${NC}"

# 檢查關鍵目錄是否存在
echo "📁 檢查關鍵目錄..."
DIRECTORIES=("src/app" "src/components" "src/lib" "src/data" "public")
for dir in "${DIRECTORIES[@]}"; do
    if [ ! -d "$dir" ]; then
        echo -e "${RED}✗ 目錄 $dir 不存在${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ 目錄 $dir 存在${NC}"
done

# 檢查關鍵文件是否存在
echo "📄 檢查關鍵文件..."
FILES=(
    "src/app/[locale]/layout.tsx"
    "src/app/[locale]/page.tsx"
    "src/app/[locale]/category/[slug]/page.tsx"
    "src/app/[locale]/product/[slug]/page.tsx"
    "src/data/products.ts"
    "src/lib/seo.ts"
    "src/lib/utils.ts"
)
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗ 文件 $file 不存在${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ 文件 $file 存在${NC}"
done

# 檢查產品數量
echo "📊 檢查產品數據..."
PRODUCT_COUNT=$(grep -c "id: '" src/data/products.ts || echo "0")
if [ "$PRODUCT_COUNT" -lt 79 ]; then
    echo -e "${YELLOW}⚠ 產品數量可能不足: $PRODUCT_COUNT (預期 79)${NC}"
else
    echo -e "${GREEN}✓ 產品數量符合要求: $PRODUCT_COUNT${NC}"
fi

# 檢查環境變量（如果存在 .env 文件）
if [ -f ".env" ]; then
    echo "🔐 檢查環境變量..."
    # 這裡可以添加特定的環境變量檢查
    echo -e "${GREEN}✓ .env 文件存在${NC}"
fi

# 統計信息
echo ""
echo "📈 項目統計:"
echo "  - TypeScript 文件數: $(find src -name "*.tsx" -o -name "*.ts" | wc -l)"
echo "  - 組件數: $(find src/components -name "*.tsx" 2>/dev/null | wc -l)"
echo "  - 頁面數: $(find src/app -name "page.tsx" | wc -l)"
echo ""

echo -e "${GREEN}✅ 所有檢查通過！項目已準備好部署。${NC}"
echo ""
echo "🚀 下一步:"
echo "   1. 運行: npm install"
echo "   2. 運行: npm run build"
echo "   3. 部署 out/ 目錄到您的服務器"
