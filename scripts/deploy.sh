#!/bin/bash

# 部署腳本
# 構建並部署 ZPrintPro 網站

set -e

echo "🚀 ZPrintPro 部署腳本"
echo "======================"

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 檢查參數
DEPLOY_TARGET=${1:-"local"}

# 顯示幫助
function show_help() {
    echo "用法: ./deploy.sh [target]"
    echo ""
    echo "部署目標:"
    echo "  local     - 本地構建 (默認)"
    echo "  vercel    - 部署到 Vercel"
    echo "  netlify   - 部署到 Netlify"
    echo "  cloudflare - 部署到 Cloudflare Pages"
    echo ""
    echo "示例:"
    echo "  ./deploy.sh local"
    echo "  ./deploy.sh vercel"
}

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_help
    exit 0
fi

echo "📦 部署目標: $DEPLOY_TARGET"
echo ""

# 步驟 1: 運行預部署檢查
echo -e "${BLUE}步驟 1/5: 運行預部署檢查...${NC}"
if [ -f "scripts/pre-deploy-check.sh" ]; then
    bash scripts/pre-deploy-check.sh
else
    echo -e "${YELLOW}⚠ 預部署檢查腳本不存在，跳過${NC}"
fi
echo ""

# 步驟 2: 安裝依賴
echo -e "${BLUE}步驟 2/5: 安裝依賴...${NC}"
if [ ! -d "node_modules" ]; then
    echo "📥 安裝依賴..."
    npm install
else
    echo -e "${GREEN}✓ node_modules 已存在${NC}"
fi
echo ""

# 步驟 3: 運行構建
echo -e "${BLUE}步驟 3/5: 構建項目...${NC}"
echo "🔨 開始構建..."
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}✗ 構建失敗: out 目錄不存在${NC}"
    exit 1
fi
echo -e "${GREEN}✓ 構建成功${NC}"
echo ""

# 步驟 4: 運行健康檢查
echo -e "${BLUE}步驟 4/5: 運行健康檢查...${NC}"
if [ -f "scripts/health-check.js" ]; then
    node scripts/health-check.js
else
    echo -e "${YELLOW}⚠ 健康檢查腳本不存在，跳過${NC}"
fi
echo ""

# 步驟 5: 部署
echo -e "${BLUE}步驟 5/5: 部署...${NC}"

case $DEPLOY_TARGET in
    local)
        echo -e "${GREEN}✓ 本地構建完成${NC}"
        echo ""
        echo "📁 構建輸出: out/"
        echo "   - 總文件數: $(find out -type f | wc -l)"
        echo "   - HTML 文件: $(find out -name "*.html" | wc -l)"
        echo "   - 總大小: $(du -sh out | cut -f1)"
        echo ""
        echo "🌐 本地預覽:"
        echo "   npx serve out"
        ;;
    
    vercel)
        echo "🚀 部署到 Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}⚠ Vercel CLI 未安裝，正在安裝...${NC}"
            npm install -g vercel
        fi
        vercel --prod
        ;;
    
    netlify)
        echo "🚀 部署到 Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo -e "${YELLOW}⚠ Netlify CLI 未安裝，正在安裝...${NC}"
            npm install -g netlify-cli
        fi
        netlify deploy --prod --dir=out
        ;;
    
    cloudflare)
        echo "🚀 部署到 Cloudflare Pages..."
        if ! command -v wrangler &> /dev/null; then
            echo -e "${YELLOW}⚠ Wrangler 未安裝，正在安裝...${NC}"
            npm install -g wrangler
        fi
        wrangler pages deploy out --project-name=zprintpro
        ;;
    
    *)
        echo -e "${RED}✗ 未知的部署目標: $DEPLOY_TARGET${NC}"
        show_help
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""

# 顯示部署統計
echo "📊 部署統計:"
echo "  - 總頁面數: 279 (3 首頁 + 39 分類頁 + 237 產品頁)"
echo "  - 語言版本: 3 (繁體中文、英文、日文)"
echo "  - 產品 SKU: 79"
echo ""

# 顯示網站 URL
case $DEPLOY_TARGET in
    local)
        echo "🌐 本地預覽: http://localhost:3000"
        ;;
    vercel)
        echo "🌐 網站 URL: https://zprintpro.vercel.app"
        ;;
    netlify)
        echo "🌐 網站 URL: https://zprintpro.netlify.app"
        ;;
    cloudflare)
        echo "🌐 網站 URL: https://zprintpro.pages.dev"
        ;;
esac
