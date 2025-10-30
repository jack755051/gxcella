#!/bin/bash

# Gxcella Package Publishing Script
# 自動化發布流程：創建 changeset -> 版本升級 -> 建構 -> 發布 -> 推送

set -e  # 遇到錯誤立即退出

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函數：顯示使用說明
show_usage() {
    echo -e "${BLUE}使用方式:${NC}"
    echo "  ./scripts/publish.sh"
    echo ""
    echo -e "${BLUE}此腳本會引導你完成以下步驟:${NC}"
    echo "  1. 選擇要更新的套件"
    echo "  2. 選擇版本升級類型 (patch/minor/major)"
    echo "  3. 輸入變更摘要"
    echo "  4. 創建 changeset 並更新版本"
    echo "  5. 建構所有套件"
    echo "  6. 發布到 npm (需要 OTP)"
    echo "  7. 提交並推送到 GitHub"
    echo ""
}

# 函數：顯示步驟標題
step() {
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# 函數：顯示錯誤
error() {
    echo -e "${RED}❌ 錯誤: $1${NC}" >&2
    exit 1
}

# 函數：顯示成功
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 函數：顯示警告
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 檢查是否在專案根目錄
if [ ! -f "package.json" ] || [ ! -d ".changeset" ]; then
    error "請在專案根目錄執行此腳本"
fi

# 檢查 git 狀態
step "步驟 1: 檢查 Git 狀態"
if [[ -n $(git status --porcelain | grep -v '.claude/settings.local.json') ]]; then
    warning "工作目錄有未提交的變更:"
    git status --short | grep -v '.claude/settings.local.json'
    echo ""
    read -p "是否繼續? (y/N): " continue
    if [[ ! $continue =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi
success "Git 狀態檢查完成"

# 選擇要更新的套件
step "步驟 2: 選擇要更新的套件"
echo "請選擇要更新的套件 (可多選，用空格分隔):"
echo "  1) @sanring/gx-breadcrumb"
echo "  2) @sanring/gx-card"
echo "  3) @sanring/gx-ui"
echo "  4) 全部套件"
echo ""
read -p "請輸入選項 (例: 1 2 或 4): " package_choice

# 解析套件選擇
packages=""
case "$package_choice" in
    *4*)
        packages="@sanring/gx-breadcrumb @sanring/gx-card @sanring/gx-ui"
        ;;
    *)
        [[ $package_choice == *1* ]] && packages="$packages @sanring/gx-breadcrumb"
        [[ $package_choice == *2* ]] && packages="$packages @sanring/gx-card"
        [[ $package_choice == *3* ]] && packages="$packages @sanring/gx-ui"
        ;;
esac

if [ -z "$packages" ]; then
    error "未選擇任何套件"
fi

packages=$(echo $packages | xargs)  # 移除多餘空格
success "已選擇: $packages"

# 選擇版本升級類型
step "步驟 3: 選擇版本升級類型"
echo "請選擇版本升級類型:"
echo "  1) patch  - 修復錯誤 (2.0.5 -> 2.0.6)"
echo "  2) minor  - 新增功能 (2.0.5 -> 2.1.0)"
echo "  3) major  - 重大變更 (2.0.5 -> 3.0.0)"
echo ""
read -p "請輸入選項 (1-3): " bump_choice

case "$bump_choice" in
    1) bump_type="patch" ;;
    2) bump_type="minor" ;;
    3) bump_type="major" ;;
    *) error "無效的選項" ;;
esac

success "版本升級類型: $bump_type"

# 輸入變更摘要
step "步驟 4: 輸入變更摘要"
echo "請輸入此次變更的摘要 (例: fix: 修復卡片圖片比例問題):"
read -p "摘要: " summary

if [ -z "$summary" ]; then
    error "摘要不能為空"
fi

# 創建 changeset 檔案
step "步驟 5: 創建 Changeset"
changeset_file=".changeset/auto-$(date +%s).md"

cat > "$changeset_file" << EOF
---
EOF

for pkg in $packages; do
    echo "\"$pkg\": $bump_type" >> "$changeset_file"
done

cat >> "$changeset_file" << EOF
---

$summary
EOF

success "Changeset 已創建: $changeset_file"
cat "$changeset_file"

# 更新版本
step "步驟 6: 更新套件版本"
yarn changeset version
success "版本已更新"

# 顯示新版本
echo ""
echo -e "${BLUE}新版本:${NC}"
for pkg in $packages; do
    pkg_dir=$(echo $pkg | sed 's/@sanring\/gx-/gx-/')
    if [ -f "packages/$pkg_dir/package.json" ]; then
        version=$(grep '"version"' "packages/$pkg_dir/package.json" | head -1 | sed 's/.*: "\(.*\)".*/\1/')
        echo "  $pkg: $version"
    fi
done

# 確認是否繼續
echo ""
read -p "是否繼續建構和發布? (y/N): " continue
if [[ ! $continue =~ ^[Yy]$ ]]; then
    warning "已取消發布流程"
    exit 0
fi

# 建構套件
step "步驟 7: 建構所有套件"
yarn build
success "建構完成"

# 輸入 OTP
step "步驟 8: 發布到 npm"
echo -e "${YELLOW}請從你的驗證器應用程式取得 OTP (一次性密碼)${NC}"
read -p "請輸入 6 位數 OTP: " otp

if [[ ! $otp =~ ^[0-9]{6}$ ]]; then
    error "OTP 必須是 6 位數字"
fi

# 發布到 npm
echo ""
echo "正在發布到 npm..."
yarn changeset publish --access public --otp="$otp"
success "發布完成"

# 輸入 commit message
step "步驟 9: 提交變更到 Git"
echo "請輸入 commit message (留空則使用: 'chore: release packages'):"
read -p "Commit message: " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="chore: release packages"
fi

# 推送到 GitHub
step "步驟 10: 推送到 GitHub"
echo "正在推送變更和標籤到 GitHub..."
git push --follow-tags
success "推送完成"

# 完成
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 發布流程完成!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}已發布套件:${NC}"
for pkg in $packages; do
    pkg_dir=$(echo $pkg | sed 's/@sanring\/gx-/gx-/')
    if [ -f "packages/$pkg_dir/package.json" ]; then
        version=$(grep '"version"' "packages/$pkg_dir/package.json" | head -1 | sed 's/.*: "\(.*\)".*/\1/')
        echo "  ✅ $pkg@$version"
    fi
done
echo ""
