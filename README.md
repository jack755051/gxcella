# GxCella - Angular 20 組件庫

這是一個基於 Angular 20 的多庫套件專案，提供可重複使用的 UI 組件庫。

## 🏗️ 專案架構

本專案採用 monorepo 架構，使用 npm workspaces 管理多個套件：

```
gxcella/
├── apps/
│   └── gx-demo/          # Angular 20 示範應用程式
└── packages/
    ├── gx-breadcrumb/    # 麵包屑導航組件
    └── gx-styles/        # 樣式庫
```

## 📦 套件說明

### Demo 應用程式
- **`gx-demo`**: 基於 Angular 20 的示範應用程式，用於展示和測試組件庫功能

### 組件庫
- **`@sanring/gx-breadcrumb`**: 麵包屑導航組件
  - 提供靈活的導航路徑顯示
  - 支援自定義樣式和圖標
  - 整合 Lucide 圖標庫

- **`@sanring/gx-styles`**: 基礎樣式庫
  - 提供統一的設計系統
  - 支援主題自定義

## 🚀 技術堆疊

- **Angular**: 20.1.0
- **TypeScript**: 5.9.2
- **Tailwind CSS**: 4.1.11
- **Lucide Angular**: 圖標庫
- **ng-packagr**: 套件建置工具
- **Changesets**: 版本管理

## 📋 安裝需求

- Node.js (建議 18+ 版本)
- npm 或 yarn

## 🛠️ 開發指令

### 安裝依賴
```bash
npm install
```

### 建置所有套件
```bash
npm run build
```

### 建置樣式庫
```bash
npm run build:styles
```

### 啟動示範應用程式
```bash
cd apps/gx-demo
npm start
```

### 版本管理
```bash
# 建立變更集
npm run changeset

# 更新版本
npm run version-packages

# 發布套件
npm run publish-packages
```

## 📂 專案結構詳細說明

### Apps
- `gx-demo/`: 示範應用程式，展示組件庫的使用方式

### Packages
- `gx-breadcrumb/`: 麵包屑組件
  - 包含主要組件和子組件
  - 提供完整的 TypeScript 型別定義
  - 支援 CSS 自定義樣式

- `gx-styles/`: 樣式系統
  - 提供基礎 CSS 變數和類別
  - 支援主題切換

## 🔧 開發工作流程

1. 在 `packages/` 目錄下開發組件
2. 在 `apps/gx-demo/` 中測試組件
3. 使用 Changesets 管理版本變更
4. 建置並發布套件

## 📝 License

MIT

## 🤝 貢獻指南

歡迎提交 Pull Request 或建立 Issue 來改善這個專案。

---

> 這個專案使用 Angular 20 的最新功能，提供現代化的組件開發體驗。
