# GxCella - Angular 20 ## 📦 套件說明

### Demo 應用程式

- **`gx-demo`**: 基於 Angular 20 的示範應用程式，用於展示和測試組件庫功能

### 組件庫

- **`@sanring/gx-ui`** (v0.0.1): 核心 UI 組件庫個基於 Angular 20 的多庫套件專案，提供可重複使用的 UI 組件庫。

## 🏗️ 專案架構

本專案採用 monorepo 架構，使用 npm workspaces 管理多個套件：

```
gxcella/
├── apps/
│   └── gx-demo/          # Angular 20 示範應用程式
├── docs/
│   ├── GX-UI-GUIDE.md    # UI 組件使用指南
│   └── GX-TOAST-GUIDE.md # Toast 組件使用指南
└── packages/
    ├── gx-breadcrumb/    # 麵包屑導航組件
    ├── gx-card/          # 卡片組件
    ├── gx-drag-drop/     # 拖放功能組件
    ├── gx-styles/        # 樣式庫
    └── gx-ui/            # 核心 UI 組件庫
```

## 📦 套件說明

### Demo 應用程式
- **`gx-demo`**: 基於 Angular 20 的示範應用程式，用於展示和測試組件庫功能

### 組件庫

- **`@sanring/gx-ui`** (v0.0.1): 核心 UI 組件庫
  - **Button**: 按鈕組件，支援多種樣式和狀態
  - **Icon**: 圖標組件，整合 Lucide 圖標庫
  - **Loading**: 載入動畫組件
    - 支援 bar、spinner、dots、skeleton 類型
    - 可自定義尺寸、速度、顏色
  - **Skeleton**: 骨架屏組件，提供內容載入佔位符
  - **Tag**: 標籤組件，支援多種顏色和樣式
  - **Toast**: 通知提示組件
  - **Overlay**: 覆蓋層工具

- **`@sanring/gx-card`** (v0.0.1): 卡片組件
  - 提供彈性的卡片佈局
  - 支援卡片群組排列
  - 整合 gx-ui 和 gx-styles
  - 依賴 Lucide 圖標庫

- **`@sanring/gx-drag-drop`** (v0.0.1): 拖放功能組件
  - 輕量級拖放工具
  - 支援原生 HTML5 拖放 API
  - 可選整合 Angular CDK 拖放功能
  - 提供拖放樣式工具

- **`@sanring/gx-breadcrumb`**: 麵包屑導航組件
  - 提供靈活的導航路徑顯示
  - 支援自定義樣式和圖標
  - 整合 Lucide 圖標庫
  - 提供服務化導航管理

- **`@sanring/gx-styles`**: 基礎樣式庫
  - 提供統一的設計系統
  - 支援主題自定義
  - 定義 CSS 變數和語意化樣式

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

### 建置特定套件

```bash
# 建置樣式庫
npm run build:styles

# 建置 gx-card 組件
npm run build --workspace @sanring/gx-card
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
  - 提供互動式組件範例
  - 包含路由頁面：Home、About、Button、Cards、Tag、Loading、Product 等

### Packages

- `gx-ui/`: 核心 UI 組件庫
  - 包含 Button、Icon、Loading、Skeleton、Tag、Toast、Overlay 等組件
  - 提供完整的 TypeScript 型別定義
  - 支援 standalone components

- `gx-card/`: 卡片組件
  - 包含 Card 和 CardGroup 組件
  - 提供靈活的佈局選項
  - 支援自定義樣式

- `gx-drag-drop/`: 拖放功能
  - 提供原生和 CDK 兩種實現
  - 輕量級設計
  - 包含拖放樣式工具

- `gx-breadcrumb/`: 麵包屑組件
  - 包含主要組件和子組件
  - 提供服務化導航管理
  - 支援自定義樣式和圖標

- `gx-styles/`: 樣式系統
  - 提供基礎 CSS 變數和類別
  - 語意化設計系統
  - 支援主題切換

## 🔧 開發工作流程

1. 在 `packages/` 目錄下開發組件
2. 在 `apps/gx-demo/` 中測試組件
3. 使用 Changesets 管理版本變更
4. 建置並發布套件

## 📚 文檔

- [GX-UI 元件庫操作指南](./docs/GX-UI-GUIDE.md) - 詳細的 UI 組件使用說明
- [GX-TOAST 使用指南](./docs/GX-TOAST-GUIDE.md) - Toast 通知組件的使用方法

## ✨ 主要特性

- ✅ 基於 Angular 20 最新版本
- ✅ 完整的 TypeScript 型別支援
- ✅ Standalone Components 架構
- ✅ 支援 Tailwind CSS 4.x
- ✅ 整合 Lucide 圖標庫
- ✅ Monorepo 架構便於管理
- ✅ 可獨立發布的組件套件
- ✅ 完整的文檔和範例

## 📝 License

MIT

## 🤝 貢獻指南

歡迎提交 Pull Request 或建立 Issue 來改善這個專案。

---

> 這個專案使用 Angular 20 的最新功能，提供現代化的組件開發體驗。
