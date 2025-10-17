#!/bin/bash

echo "🧠 Wutmeme - 自動配置腳本"
echo "================================"

# 設置錯誤時退出
set -e

# 定義顏色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印帶顏色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 檢查命令是否存在
check_command() {
    if command -v $1 &> /dev/null; then
        print_success "$1 已安裝"
        return 0
    else
        print_error "$1 未安裝，請先安裝 $1"
        return 1
    fi
}

# 主要配置函數
main() {
    print_info "開始配置 Wutmeme 項目..."
    
    # 檢查必要工具
    print_info "檢查系統環境..."
    check_command "docker" || exit 1
    check_command "docker-compose" || exit 1
    check_command "node" || exit 1
    check_command "npm" || exit 1
    
    # 檢查.env文件
    if [ ! -f "./backend/.env" ]; then
        print_warning "backend/.env 文件不存在，已自動創建"
    else
        print_success "backend/.env 文件已存在"
    fi
    
    # 設置npm鏡像以加速下載
    print_info "配置npm鏡像..."
    npm config set registry https://registry.npmmirror.com
    print_success "npm鏡像已設置為國內源"
    
    # 創建必要的目錄
    print_info "創建必要的目錄..."
    mkdir -p backend/uploads
    mkdir -p backend/logs
    print_success "目錄創建完成"
    
    # 停止並清理現有容器（如果存在）
    print_info "清理現有容器..."
    docker-compose down -v 2>/dev/null || true
    print_success "容器清理完成"
    
    # 構建並啟動服務
    print_info "構建並啟動服務..."
    print_info "這可能需要幾分鐘時間，請耐心等待..."
    
    # 先拉取基礎鏡像
    docker pull postgres:15
    docker pull node:18-alpine
    
    # 構建並啟動
    docker-compose up --build -d
    
    # 等待服務啟動
    print_info "等待服務啟動..."
    sleep 10
    
    # 檢查服務狀態
    print_info "檢查服務狀態..."
    if docker-compose ps | grep -q "Up"; then
        print_success "服務啟動成功！"
        echo ""
        echo "🎉 配置完成！"
        echo "================================"
        echo "📁 項目地址: $(pwd)"
        echo "🌐 前端地址: http://localhost:5173"
        echo "🔧 後端API: http://localhost:3000"
        echo "🐘 數據庫: postgresql://wutmeme_user:wutmeme_pass@localhost:5432/wutmeme"
        echo ""
        echo "📋 常用命令："
        echo "  docker-compose up -d      # 啟動所有服務"
        echo "  docker-compose down       # 停止所有服務"
        echo "  docker-compose logs -f    # 查看日誌"
        echo "  docker-compose ps         # 查看服務狀態"
        echo ""
        print_info "查看實時日誌: docker-compose logs -f"
        
        # 恢復npm鏡像
        print_info "恢復npm鏡像設置..."
        npm config set registry https://registry.npmjs.org
        print_success "npm鏡像已恢復為官方源"
    else
        print_error "服務啟動失敗，請檢查日誌"
        docker-compose logs
        exit 1
    fi
}

# 執行主函數
main