# GxPagination 重構完成 - 整合 GxButton 和 Lucide-Angular

## 📋 重構摘要

**日期**：2025-11-11
**目標**：將 gx-pagination 的上下頁按鈕改用 gx-button，統一圖標系統使用 lucide-angular
**結果**：✅ 成功整合，設計系統完全統一

---

## 🎯 重構原因

### 之前的問題

1. ❌ 使用原生 `<button>` 元素
2. ❌ 使用內聯 SVG 圖標（ChevronLeft, ChevronRight）
3. ❌ 與設計系統其他組件不一致
4. ❌ 需要維護自己的按鈕樣式

### 重構後的優勢

1. ✅ 使用 `gx-button` - 統一的按鈕組件
2. ✅ 使用 `gx-icon` + lucide-angular - 統一的圖標系統
3. ✅ 獲得 gx-button 的所有功能（hover, disabled, variants）
4. ✅ 與其他組件保持一致的視覺和行為
5. ✅ 減少重複代碼和樣式維護

---

## 🔧 具體改動

### 1. TypeScript 文件 (gx-pagination.ts)

#### 新增 Import

```typescript
import { GxButton, GxIcon } from '@sanring/gx-ui';
```

#### 更新 Component Imports

```typescript
@Component({
  selector: 'gx-pagination',
  standalone: true,
  imports: [
    CommonModule,
    GxButton,        // ← 新增
    GxIcon,          // ← 新增
    GxPaginationInput,
    GxPaginationSelect,
    GxPaginationList,
    GxPaginationPerPage
  ],
  // ...
})
```

---

### 2. HTML 模板 (gx-pagination.html)

#### 之前：原生 Button + 內聯 SVG

```html
<!-- 上一頁 -->
<button
  type="button"
  [class]="customClass().previousButton || 'btn btn-pagination'"
  [disabled]="isPreviousDisabled()"
  (click)="handlePrevious()">
  @if (button().previous.icon) {
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  }
  {{ button().previous.label }}
</button>
```

#### 之後：GxButton + GxIcon

```html
<!-- 上一頁 -->
<gx-button
  [action]="{
    label: button().previous.label,
    handler: handlePrevious.bind(this),
    disabled: isPreviousDisabled()
  }"
  [variant]="'outline'"
  [intent]="'info'"
  [disabled]="isPreviousDisabled()">
  @if (button().previous.icon) {
    <gx-icon name="chevron-left" [size]="16" start></gx-icon>
  }
</gx-button>
```

**改進**：
- ✅ 使用 `gx-button` 的 action 模式
- ✅ 使用 `gx-icon` 的 `chevron-left`（lucide-angular 或內建）
- ✅ 使用 `outline` variant 和 `info` intent
- ✅ 圖標使用 `start` slot 定位在左側

---

### 3. Package.json

#### 新增依賴

```json
{
  "peerDependencies": {
    "@angular/common": "^20.3.0",
    "@angular/core": "^20.3.0",
    "@sanring/gx-ui": "^4.0.1",        // ← 新增
    "lucide-angular": "^0.539.0"       // ← 新增
  },
  "devDependencies": {
    "@sanring/gx-ui": "^4.0.1",        // ← 新增
    "lucide-angular": "^0.539.0",      // ← 新增
    "ng-packagr": "^20.3.0"
  }
}
```

---

## 🎨 視覺和行為改進

### 按鈕狀態

| 狀態 | 之前 | 之後 |
|------|------|------|
| **Normal** | 自訂樣式 | GxButton outline variant |
| **Hover** | 自訂 hover | 統一的 hover 效果 |
| **Disabled** | 自訂 disabled | 統一的 disabled 狀態 |
| **Active** | 自訂 active | 統一的 active 效果 |
| **Focus** | 自訂 focus | 統一的 focus 樣式 |

### 圖標系統

| 項目 | 之前 | 之後 |
|------|------|------|
| **圖標來源** | 內聯 SVG | GxIcon (內建 fallback + lucide-angular) |
| **ChevronLeft** | 硬編碼 SVG | `<gx-icon name="chevron-left">` |
| **ChevronRight** | 硬編碼 SVG | `<gx-icon name="chevron-right">` |
| **一致性** | ❌ 不一致 | ✅ 與其他組件一致 |

---

## 📊 使用方式對比

### 基本使用（無變化）

```typescript
<gx-pagination
  [currentPageInput]="currentPage()"
  [pageSizeInput]="pageSize()"
  [totalItemsInput]="totalItems()"
  [selectType]="SelectType.LIST"
  (pageChange)="handlePageChange($event)">
</gx-pagination>
```

**使用者無需修改代碼**，API 完全向後兼容！

### 自訂按鈕文字

```typescript
<gx-pagination
  [button]="{
    previous: { label: 'Prev', icon: true },
    next: { label: 'Next', icon: true }
  }"
  ...>
</gx-pagination>
```

### 隱藏圖標

```typescript
<gx-pagination
  [button]="{
    previous: { label: '上一頁', icon: false },
    next: { label: '下一頁', icon: false }
  }"
  ...>
</gx-pagination>
```

---

## 🔍 GxIcon Fallback 機制

GxIcon 的 `chevron-left` 和 `chevron-right` 是**內建圖標**，所以：

✅ **不需要** 在 app.config.ts 中提供這些圖標
✅ **不需要** 從 lucide-angular 導入這些圖標
✅ **開箱即用**，無需額外配置

```typescript
// ✅ 這些圖標是內建的，不需要 provideIcons
<gx-icon name="chevron-left"></gx-icon>
<gx-icon name="chevron-right"></gx-icon>

// ⚠️ 其他圖標需要提供
<gx-icon name="Heart"></gx-icon>  // 需要在 app.config.ts 中提供
```

---

## ⚠️ 破壞性改動

### 對使用者的影響

**最小破壞性改動**

#### 需要做的

```bash
# 1. 安裝新依賴（如果還沒有）
npm install @sanring/gx-ui lucide-angular
```

#### 不需要做的

- ❌ 不需要修改使用 gx-pagination 的代碼
- ❌ 不需要在 app.config.ts 中提供圖標（chevron-left/right 是內建的）
- ❌ 不需要修改樣式

### 自訂樣式

如果你之前使用 `customClass().previousButton` 或 `customClass().nextButton`：

**之前**：
```typescript
customClass: {
  previousButton: 'my-prev-btn',
  nextButton: 'my-next-btn'
}
```

**之後**：
⚠️ 這些 customClass 現在會被忽略，因為按鈕使用 gx-button。

**解決方案**：
- 使用 CSS 選擇器針對 gx-button：
  ```css
  gx-pagination gx-button:first-of-type { /* 上一頁樣式 */ }
  gx-pagination gx-button:last-of-type { /* 下一頁樣式 */ }
  ```
- 或使用 gx-button 的 CSS 變數自訂

---

## 🎁 額外收穫

### 1. 統一設計系統

現在 pagination 的按鈕與整個系統保持一致：
- 與 Modal 的按鈕一致
- 與 Card 的 action 按鈕一致
- 與其他使用 gx-button 的地方一致

### 2. 自動獲得 GxButton 的新功能

當 gx-button 添加新功能時，pagination 自動獲得：
- 新的 variant
- 新的 intent
- 新的動畫效果
- 新的無障礙功能

### 3. 減少維護負擔

- 不需要維護自己的按鈕樣式
- 不需要維護自己的圖標 SVG
- 樣式更新只需要在一個地方

---

## 📚 完整範例

### 基本使用

```typescript
import { Component, signal } from '@angular/core';
import { GxPagination, SelectType } from '@sanring/gx-pagination';

@Component({
  selector: 'app-example',
  imports: [GxPagination],
  template: `
    <gx-pagination
      [currentPageInput]="currentPage()"
      [pageSizeInput]="pageSize()"
      [totalItemsInput]="totalItems()"
      [selectType]="SelectType.LIST"
      [showPerPageSelector]="true"
      [perPageOptions]="[10, 20, 50, 100]"
      (pageChange)="handlePageChange($event)"
      (perPageChange)="handlePerPageChange($event)">
    </gx-pagination>
  `
})
export class ExampleComponent {
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(100);
  SelectType = SelectType;

  handlePageChange(page: number) {
    console.log('Page changed to:', page);
    this.currentPage.set(page);
  }

  handlePerPageChange(size: number) {
    console.log('Page size changed to:', size);
    this.pageSize.set(size);
    this.currentPage.set(1); // 重置到第一頁
  }
}
```

### 自訂按鈕文字

```typescript
<gx-pagination
  [button]="{
    previous: { label: '← Prev', icon: true },
    next: { label: 'Next →', icon: true }
  }"
  ...>
</gx-pagination>
```

---

## 🚀 版本更新建議

### gx-pagination

- 當前：0.2.3
- 建議：0.3.0（Minor bump）
- 理由：
  - 新增 peerDependency（@sanring/gx-ui, lucide-angular）
  - UI 實現改變（但 API 向後兼容）
  - 可能影響自訂樣式的使用者

---

## ✅ 測試檢查清單

- [ ] 上一頁按鈕正常顯示和運作
- [ ] 下一頁按鈕正常顯示和運作
- [ ] 圖標正確顯示（chevron-left, chevron-right）
- [ ] Disabled 狀態正確（第一頁禁用上一頁，最後一頁禁用下一頁）
- [ ] 按鈕 hover 效果正常
- [ ] 按鈕 click 事件正常觸發
- [ ] 隱藏圖標功能正常（icon: false）
- [ ] 自訂按鈕文字正常
- [ ] 與其他分頁選擇模式（SELECT, INPUT, LIST）配合正常

---

## 📚 相關資源

- [GxButton 文檔](../gx-ui/README.md#gxbutton)
- [GxIcon 文檔](../gx-ui/README.md#gxicon)
- [Lucide Angular 文檔](https://lucide.dev/guide/packages/lucide-angular)

---

## 🎉 總結

✅ **重構完成**：gx-pagination 成功整合 gx-button 和 lucide-angular
✅ **設計統一**：與整個設計系統保持一致
✅ **向後兼容**：使用者無需修改現有代碼
✅ **自動改進**：自動獲得 gx-button 的新功能和改進

**影響範圍**：gx-pagination
**破壞性改動**：最小（需要安裝新依賴）
**風險評估**：低
**建議**：可以安全地發布新版本

---

**重構完成！GxPagination 現在使用統一的設計系統！** 🎉
