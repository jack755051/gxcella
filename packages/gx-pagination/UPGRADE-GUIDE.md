# GxPagination 升級指南

## 🎉 新功能：整合 GxSelect 組件

`gx-pagination-per-page` 現在使用 `gx-select` 組件，支援完整的設計系統特性！

---

## ✨ 新增功能

### 升級前（原生 select）

```html
<gx-pagination
  [showPerPageSelector]="true"
  [perPageOptions]="[10, 20, 50]"
/>
```

- ❌ 硬編碼樣式
- ❌ 不支援 Intent 系統
- ❌ 不支援變體
- ❌ 深色模式支援不完整

### 升級後（使用 GxSelect）

```html
<gx-pagination
  [showPerPageSelector]="true"
  [perPageOptions]="[10, 20, 50]"
  perPageSize="sm"
  perPageVariant="glass"
  perPageIntent="info"
/>
```

- ✅ 符合設計系統
- ✅ 支援 Intent 系統
- ✅ 支援 5 種變體
- ✅ 完整深色模式
- ✅ 完全可自訂

---

## 🆕 新增 Input 參數

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `perPageSize` | `'sm' \| 'md' \| 'lg'` | `'sm'` | 每頁選擇器尺寸 |
| `perPageVariant` | `'filled' \| 'outline' \| 'soft' \| 'ghost' \| 'glass'` | `'ghost'` | 每頁選擇器變體 |
| `perPageIntent` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 每頁選擇器 Intent |
| `perPageShowLabel` | `boolean` | `true` | 是否顯示「每頁 X 筆」標籤 |
| `perPageLabelPrefix` | `string` | `'每頁'` | 前綴標籤文字 |
| `perPageLabelSuffix` | `string` | `'筆'` | 後綴標籤文字 |

---

## 📖 使用範例

### 基本使用（向後兼容）

```html
<!-- 舊代碼仍然可用，無需修改 -->
<gx-pagination
  [config]="paginationConfig"
  [showPerPageSelector]="true"
  [perPageOptions]="[10, 20, 50, 100]"
/>
```

### 使用不同尺寸

```html
<!-- 小尺寸（預設） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageSize="sm"
/>

<!-- 中尺寸 -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageSize="md"
/>

<!-- 大尺寸 -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageSize="lg"
/>
```

### 使用不同變體

```html
<!-- Ghost（預設，透明背景） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageVariant="ghost"
/>

<!-- Outline（邊框樣式） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageVariant="outline"
/>

<!-- Filled（填充樣式） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageVariant="filled"
  perPageIntent="info"
/>

<!-- Soft（柔和背景） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageVariant="soft"
  perPageIntent="success"
/>

<!-- Glass（玻璃態效果） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageVariant="glass"
/>
```

### 使用不同 Intent

```html
<!-- Info（預設） -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageIntent="info"
/>

<!-- Success -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageIntent="success"
  perPageVariant="filled"
/>

<!-- Warning -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageIntent="warning"
  perPageVariant="soft"
/>

<!-- Error -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageIntent="error"
  perPageVariant="outline"
/>
```

### 自訂標籤文字

```html
<!-- 隱藏標籤 -->
<gx-pagination
  [showPerPageSelector]="true"
  [perPageShowLabel]="false"
/>

<!-- 自訂標籤文字 -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageLabelPrefix="顯示"
  perPageLabelSuffix="筆資料"
/>
<!-- 顯示為：「顯示 [20] 筆資料」 -->

<!-- 英文版 -->
<gx-pagination
  [showPerPageSelector]="true"
  perPageLabelPrefix="Show"
  perPageLabelSuffix="items"
/>
<!-- 顯示為：「Show [20] items」 -->
```

### 組合使用

```html
<gx-pagination
  [config]="paginationConfig"
  [showPerPageSelector]="true"
  [perPageOptions]="[10, 20, 50, 100]"
  perPageSize="sm"
  perPageVariant="glass"
  perPageIntent="info"
  perPageLabelPrefix="每頁"
  perPageLabelSuffix="筆"
/>
```

---

## 🎨 自訂樣式

### 使用 CSS Variables

```css
/* 全局覆寫每頁選擇器樣式 */
gx-pagination-per-page {
    /* 選擇器樣式（繼承自 gx-select） */
    --gx-select-radius: 12px;
    --gx-select-px: 16px;
    --gx-select-height: 36px;
}

/* 針對特定變體 */
gx-pagination-per-page gx-select[variant="glass"] {
    --gx-glass-backdrop: blur(20px);
}
```

### 標籤樣式

```css
gx-pagination-per-page .per-page-label {
    font-size: 1rem;
    color: var(--gx-color-primary-500);
    font-weight: 600;
}
```

---

## 🔄 遷移步驟

### 步驟 1：檢查現有代碼

如果你的代碼是這樣：

```html
<gx-pagination
  [showPerPageSelector]="true"
  [perPageOptions]="[10, 20, 50]"
/>
```

**好消息：無需修改！** 向後完全兼容。

### 步驟 2：選擇性升級

如果想使用新特性，添加新參數：

```html
<gx-pagination
  [showPerPageSelector]="true"
  [perPageOptions]="[10, 20, 50]"
  perPageVariant="glass"  <!-- 新增 -->
  perPageSize="sm"        <!-- 新增 -->
/>
```

### 步驟 3：測試

確保：
- ✅ 每頁選擇器正常顯示
- ✅ 選項值正確
- ✅ 變更事件正常觸發
- ✅ 樣式符合預期

---

## 🐛 常見問題

### Q1: 升級後樣式變了？

**A:** 新組件使用設計系統的預設樣式。如果需要保持舊樣式，可以：

```css
/* 使用 CSS Variables 自訂 */
gx-pagination-per-page {
    --gx-select-radius: 0.375rem;
    --gx-select-px: 0.75rem;
    --gx-select-py: 0.375rem;
}
```

### Q2: 標籤「每頁 X 筆」位置變了？

**A:** 現在標籤由 `gx-pagination-per-page` 組件內部處理。如果需要隱藏：

```html
<gx-pagination
  [perPageShowLabel]="false"
/>
```

### Q3: 如何使用深色模式？

**A:** 深色模式自動響應，或手動設置：

```html
<html data-theme="dark">
  <!-- 或 -->
<html class="dark">
```

### Q4: `customClass` 屬性還能用嗎？

**A:** 該屬性已棄用，建議使用 CSS Variables：

```css
/* 舊方式（已棄用） */
[customClass]="'my-class'"

/* 新方式（推薦） */
gx-pagination-per-page {
    --gx-select-radius: 12px;
}
```

---

## 📊 效能影響

- ✅ **構建大小**：幾乎無影響（gx-select 已在 gx-ui 中）
- ✅ **運行效能**：相同或更好
- ✅ **渲染速度**：相同

---

## 🎯 完整範例

```typescript
import { Component, signal } from '@angular/core';
import { GxPagination } from '@sanring/gx-pagination';

@Component({
  standalone: true,
  imports: [GxPagination],
  template: `
    <gx-pagination
      [config]="paginationConfig()"
      [showPerPageSelector]="true"
      [perPageOptions]="[10, 20, 50, 100]"
      perPageSize="sm"
      perPageVariant="glass"
      perPageIntent="info"
      perPageLabelPrefix="每頁"
      perPageLabelSuffix="筆"
      (pageChange)="onPageChange($event)"
      (perPageChange)="onPerPageChange($event)"
    />
  `
})
export class TableComponent {
  paginationConfig = signal({
    currentPage: 1,
    pageSize: 20,
    totalItems: 1000
  });

  onPageChange(page: number) {
    this.paginationConfig.update(config => ({
      ...config,
      currentPage: page
    }));
  }

  onPerPageChange(pageSize: number) {
    this.paginationConfig.update(config => ({
      ...config,
      pageSize,
      currentPage: 1  // 重置到第一頁
    }));
  }
}
```

---

## 🔗 相關文檔

- [GxSelect 文檔](../gx-ui/src/lib/select/README.md)
- [設計系統指南](../../DESIGN_SYSTEM_GUIDE.md)
- [GxPagination 文檔](./README.md)

---

**升級愉快！** 🚀

如有問題請提交 Issue。
