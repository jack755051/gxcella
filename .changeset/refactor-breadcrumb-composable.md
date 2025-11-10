---
'@sanring/gx-breadcrumb': major
---

# 🎉 重大重構：組合式設計（Breaking Changes）

參考 `@sanring/gx-table` 的成功架構，完全重構 gx-breadcrumb 為組合式設計。

## 💥 Breaking Changes

- 原有的 `<gx-breadcrumb>` 組件重命名為 `<gx-breadcrumb-legacy>`
- 新的 `<gx-breadcrumb>` 組件採用不同的 API（支援 `mode` 屬性）

## ✨ 新功能

### 🆕 組合式組件（推薦使用）

- **GxBreadcrumbContainer** - 容器組件，提供主題和變體樣式
- **GxBreadcrumbList** - 列表組件，負責渲染麵包屑項目容器
- **GxBreadcrumbItemV2** - 項目組件，完全獨立可用

### 🆕 包裝組件（便捷使用）

- **GxBreadcrumb** - 支援三種模式：
  - `mode="auto"` - 從路由自動生成（預設）
  - `mode="manual"` - 手動提供資料
  - `mode="custom"` - 完全自定義投影內容

### 🆕 Signal API

- **BreadcrumbStateService** - 基於 Signal 的狀態管理服務
- 完整的 Angular Signal 支援，使用 `toSignal` 和 `computed`

### 🆕 主題擴展

- 新增 `minimal` 和 `colorful` 變體
- 新增 `dark` 和 `brand` 主題
- 更完善的 CSS 變數系統

## 📦 升級指南

### 方式 1：使用舊版 API（向後兼容）

```typescript
// 將 imports 改為 GxBreadcrumbLegacy
import { GxBreadcrumbLegacy } from '@sanring/gx-breadcrumb';

@Component({
  imports: [GxBreadcrumbLegacy],
  template: `<gx-breadcrumb-legacy [data]="breadcrumbs" />`
})
```

### 方式 2：升級到新的包裝組件

```typescript
import { GxBreadcrumb } from '@sanring/gx-breadcrumb';

@Component({
  imports: [GxBreadcrumb],
  template: `
    <!-- 自動模式 -->
    <gx-breadcrumb mode="auto" />

    <!-- 或手動模式 -->
    <gx-breadcrumb mode="manual" [data]="breadcrumbs" />
  `
})
```

### 方式 3：使用新的組合式 API（推薦）

```typescript
import {
  GxBreadcrumbContainer,
  GxBreadcrumbList,
  GxBreadcrumbItemV2
} from '@sanring/gx-breadcrumb';

@Component({
  imports: [GxBreadcrumbContainer, GxBreadcrumbList, GxBreadcrumbItemV2],
  template: `
    <gx-breadcrumb-container theme="default" variant="modern">
      <gx-breadcrumb-list>
        <gx-breadcrumb-item-v2
          label="首頁"
          link="/"
          [showIcon]="true"
          icon="🏠"
        />
        <gx-breadcrumb-item-v2
          label="產品"
          [active]="true"
          [showSeparator]="false"
        />
      </gx-breadcrumb-list>
    </gx-breadcrumb-container>
  `
})
```

## 🎯 優勢

1. ✅ **完全控制** - 每個組件都可以獨立使用
2. ✅ **高度可組合** - 可以在 Item 之間插入自定義內容
3. ✅ **更好的抽象** - 清晰的組件職責分離
4. ✅ **Signal 原生支援** - 現代化的響應式狀態管理
5. ✅ **類似 gx-table** - 一致的設計語言，學習曲線低

## 📚 詳細文檔

請參閱更新後的 README.md 獲取完整使用指南。
