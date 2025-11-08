#!/bin/bash

# 套件更新腳本
# 此腳本用於更新 @sanring/gx-wizard 和 @sanring/gx-table 套件
# 版本將升級到 2.0.2

set -e  # 遇到錯誤時立即停止

echo "🚀 開始套件更新流程..."
echo ""

# 步驟 1: 創建 changeset
echo "📝 步驟 1/6: 創建 changeset..."
echo "請在接下來的互動式介面中："
echo "  - 選擇 @sanring/gx-wizard 和 @sanring/gx-table"
echo "  - 選擇 patch bump（兩個都選）"
echo "  - summary: fix: include all dist files in npm package"
echo ""
read -p "按 Enter 繼續..." </dev/tty

yarn changeset

echo ""
echo "✅ Changeset 已創建"
echo ""

# 步驟 2: 更新版本到 2.0.2
echo "📦 步驟 2/6: 更新版本到 2.0.2..."
yarn version-packages

echo ""
echo "✅ 版本已更新"
echo ""

# 步驟 3: 提交版本變更
echo "💾 步驟 3/6: 提交版本變更..."
git add .
git commit -m "chore: bump to 2.0.2"

echo ""
echo "✅ 版本變更已提交"
echo ""

# 步驟 4: 重新建構所有套件
echo "🔨 步驟 4/6: 重新建構套件..."

echo "  Building gx-breadcrumb..."
cd packages/gx-breadcrumb && yarn build && cd ../..

echo "  Building gx-ui..."
cd packages/gx-ui && yarn build && cd ../..

echo "  Building gx-card..."
cd packages/gx-card && yarn build && cd ../..

echo "  Building gx-wizard..."
cd packages/gx-wizard && yarn build && cd ../..

echo "  Building gx-table..."
cd packages/gx-table && yarn build && cd ../..

echo ""
echo "✅ 所有套件建構完成"
echo ""

# 步驟 5: 發布到 npm
echo "📤 步驟 5/6: 發布到 npm..."
read -p "確認要發布到 npm 嗎？(y/n) " -n 1 -r </dev/tty
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    yarn changeset publish
    echo ""
    echo "✅ 套件已發布到 npm"
else
    echo "❌ 已取消發布"
    exit 0
fi

echo ""

# 步驟 6: 推送到 GitHub
echo "🔼 步驟 6/6: 推送到 GitHub..."
read -p "確認要推送到 GitHub 嗎？(y/n) " -n 1 -r </dev/tty
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    git push --follow-tags
    echo ""
    echo "✅ 已推送到 GitHub"
else
    echo "❌ 已取消推送"
    exit 0
fi

echo ""
echo "🎉 所有步驟完成！"
echo "   - gx-wizard 已更新到 2.0.2"
echo "   - gx-table 已更新到 2.0.2"
echo ""
