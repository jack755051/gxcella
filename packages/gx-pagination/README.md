# @sanring/gx-pagination

完整、靈活且高效能的 Angular 分頁組件庫，基於 Angular 20+ 和 Signal-based 架構。

## 特性

- ✅ **多種模式**: 支援 Select（下拉）、Input（輸入）、List（按鈕列表）三種分頁選擇模式
- ✅ **完全響應式**: 使用 Angular Signals 實現高效能狀態管理
- ✅ **模組化設計**: 可組合的子組件，靈活搭配使用
- ✅ **彈性佈局**: 支援多種佈局位置（left, center, right, between）
- ✅ **每頁數量選擇**: 內建每頁顯示數量選擇器
- ✅ **TypeScript**: 完整的類型定義
- ✅ **獨立組件**: 完全支援 Standalone API
- ✅ **PaginationService**: 提供完整的分頁狀態管理

## 安裝

\`\`\`bash
npm install @sanring/gx-pagination
# or
yarn add @sanring/gx-pagination
\`\`\`

## 快速開始

### 1. 基本使用（Select 模式）

\`\`\`typescript
import { Component } from '@angular/core';
import { GxPagination, SelectType } from '@sanring/gx-pagination';

@Component({
  selector: 'app-basic-pagination',
  standalone: true,
  imports: [GxPagination],
  template: \`
    <gx-pagination
      [currentPageInput]="currentPage"
      [pageSizeInput]="pageSize"
      [totalItemsInput]="totalItems"
      [selectType]="SelectType.SELECT"
      (pageChange)="onPageChange($event)"
    />
  \`
})
export class BasicPaginationComponent {
  SelectType = SelectType;
  currentPage = 1;
  pageSize = 10;
  totalItems = 100;

  onPageChange(page: number) {
    this.currentPage = page;
    console.log('當前頁:', page);
  }
}
\`\`\`

### 2. Input 輸入模式

\`\`\`typescript
@Component({
  template: \`
    <gx-pagination
      [currentPageInput]="currentPage"
      [pageSizeInput]="pageSize"
      [totalItemsInput]="totalItems"
      [selectType]="SelectType.INPUT"
      [inputConfig]="{
        placeholder: '請輸入頁碼',
        inputClass: 'custom-input'
      }"
      (pageChange)="onPageChange($event)"
    />
  \`
})
export class InputPaginationComponent {
  SelectType = SelectType;
  // ...
}
\`\`\`

### 3. List 按鈕列表模式

\`\`\`typescript
@Component({
  template: \`
    <gx-pagination
      [currentPageInput]="currentPage"
      [pageSizeInput]="pageSize"
      [totalItemsInput]="totalItems"
      [selectType]="SelectType.LIST"
      (pageChange)="onPageChange($event)"
    />
  \`
})
export class ListPaginationComponent {
  SelectType = SelectType;
  // ...
}
\`\`\`

### 4. 帶每頁數量選擇器

\`\`\`typescript
@Component({
  template: \`
    <gx-pagination
      [currentPageInput]="currentPage"
      [pageSizeInput]="pageSize"
      [totalItemsInput]="totalItems"
      [showPerPageSelector]="true"
      [perPageOptions]="[10, 20, 50, 100]"
      [currentPerPage]="pageSize"
      (pageChange)="onPageChange($event)"
      (perPageChange)="onPerPageChange($event)"
    />
  \`
})
export class PerPagePaginationComponent {
  currentPage = 1;
  pageSize = 10;
  totalItems = 100;

  onPageChange(page: number) {
    this.currentPage = page;
    // 載入新頁面資料
  }

  onPerPageChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1; // 重置到第一頁
    // 重新載入資料
  }
}
\`\`\`

### 5. 自訂佈局位置

\`\`\`typescript
@Component({
  template: \`
    <!-- 分頁控制在中間，每頁選擇器在右側 -->
    <gx-pagination
      [currentPageInput]="currentPage"
      [pageSizeInput]="pageSize"
      [totalItemsInput]="totalItems"
      [selectorPosition]="'center'"
      [showPerPageSelector]="true"
      (pageChange)="onPageChange($event)"
    />

    <!-- 兩端對齊（預設） -->
    <gx-pagination
      [currentPageInput]="currentPage"
      [pageSizeInput]="pageSize"
      [totalItemsInput]="totalItems"
      [selectorPosition]="'between'"
      [showPerPageSelector]="true"
      (pageChange)="onPageChange($event)"
    />
  \`
})
export class LayoutPaginationComponent {
  // ...
}
\`\`\`

### 6. 使用 PaginationService（進階）

\`\`\`typescript
import { Component, signal, effect } from '@angular/core';
import { GxPagination, PaginationService } from '@sanring/gx-pagination';

@Component({
  selector: 'app-advanced-pagination',
  standalone: true,
  imports: [GxPagination],
  providers: [PaginationService],
  template: \`
    <gx-pagination
      [currentPageInput]="paginationService.currentPage()"
      [pageSizeInput]="paginationService.pageSize()"
      [totalItemsInput]="paginationService.totalItems()"
      (pageChange)="paginationService.goToPage($event)"
      (perPageChange)="paginationService.changePageSize($event)"
    />

    <div>
      目前顯示: {{ paginationService.startIndex() }} - 
      {{ paginationService.endIndex() }} / 
      {{ paginationService.totalItems() }}
    </div>
  \`
})
export class AdvancedPaginationComponent {
  constructor(public paginationService: PaginationService) {
    // 初始化分頁服務
    this.paginationService.initialize({
      currentPage: 1,
      pageSize: 10,
      totalItems: 100,
      pageSizeOptions: [10, 20, 50, 100]
    });

    // 監聽分頁狀態變化
    effect(() => {
      const state = this.paginationService.getState();
      console.log('分頁狀態:', state);
      // 這裡可以呼叫 API 載入資料
    });
  }
}
\`\`\`

## API 文件

### GxPagination Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `currentPageInput` | `number` | **必填** | 當前頁碼 |
| `pageSizeInput` | `number` | **必填** | 每頁顯示數量 |
| `totalItemsInput` | `number` | **必填** | 總項目數 |
| `selectType` | `SelectType` | `SelectType.SELECT` | 選擇模式 |
| `button` | `PaginationButton` | 預設按鈕配置 | 上一頁/下一頁按鈕配置 |
| `customClass` | `PaginationCustomClass` | `{}` | 自訂 CSS class |
| `inputConfig` | `PaginationInputProps` | `{}` | 輸入框配置（INPUT 模式） |
| `selectorPosition` | `SelectorPosition` | `'between'` | 分頁控制器位置 |
| `showPerPageSelector` | `boolean` | `false` | 是否顯示每頁數量選擇器 |
| `perPageOptions` | `number[]` | `[5, 10, 20, 50]` | 每頁選項 |
| `currentPerPage` | `number \| undefined` | `undefined` | 當前每頁數量（同步用） |

### GxPagination Outputs

| 事件 | 參數 | 說明 |
|------|------|------|
| `pageChange` | `number` | 頁碼變更 |
| `pageNext` | `number` | 下一頁 |
| `pagePrevious` | `number` | 上一頁 |
| `perPageChange` | `number` | 每頁數量變更 |

### SelectType 枚舉

\`\`\`typescript
enum SelectType {
  SELECT = 'select',  // 下拉選單
  INPUT = 'input',    // 輸入框
  LIST = 'list'       // 按鈕列表
}
\`\`\`

### SelectorPosition 類型

\`\`\`typescript
type SelectorPosition = 'left' | 'center' | 'right' | 'between';
\`\`\`

- `left`: 分頁控制器靠左
- `center`: 分頁控制器居中
- `right`: 分頁控制器靠右（靠近每頁選擇器）
- `between`: 兩端對齊（預設）

### PaginationService 方法

| 方法 | 參數 | 說明 |
|------|------|------|
| `initialize()` | `PaginationServiceOptions` | 初始化服務 |
| `goToPage()` | `page: number` | 跳轉到指定頁 |
| `nextPage()` | - | 下一頁 |
| `previousPage()` | - | 上一頁 |
| `firstPage()` | - | 第一頁 |
| `lastPage()` | - | 最後一頁 |
| `changePageSize()` | `size: number` | 更改每頁數量 |
| `updateTotalItems()` | `total: number` | 更新總項目數 |
| `reset()` | - | 重置到第一頁 |
| `getState()` | - | 獲取當前狀態 |

### PaginationService 計算屬性（Signals）

| 屬性 | 類型 | 說明 |
|------|------|------|
| `currentPage()` | `number` | 當前頁碼 |
| `pageSize()` | `number` | 每頁數量 |
| `totalItems()` | `number` | 總項目數 |
| `totalPages()` | `number` | 總頁數 |
| `hasPrevious()` | `boolean` | 是否有上一頁 |
| `hasNext()` | `boolean` | 是否有下一頁 |
| `startIndex()` | `number` | 當前頁起始索引 |
| `endIndex()` | `number` | 當前頁結束索引 |
| `isFirstPage()` | `boolean` | 是否為第一頁 |
| `isLastPage()` | `boolean` | 是否為最後一頁 |

## 子組件

### GxPaginationInput

輸入框形式的頁碼選擇器。

\`\`\`typescript
import { GxPaginationInput } from '@sanring/gx-pagination';

<gx-pagination-input
  [currentPage]="1"
  [totalPages]="10"
  [placeholder]="'頁碼'"
  (pageChange)="onPageChange($event)"
/>
\`\`\`

### GxPaginationSelect

下拉選單形式的頁碼選擇器。

\`\`\`typescript
import { GxPaginationSelect } from '@sanring/gx-pagination';

<gx-pagination-select
  [currentPage]="1"
  [totalPages]="10"
  (pageChange)="onPageChange($event)"
/>
\`\`\`

### GxPaginationList

按鈕列表形式的頁碼選擇器。

\`\`\`typescript
import { GxPaginationList } from '@sanring/gx-pagination';

<gx-pagination-list
  [currentPage]="1"
  [totalPages]="10"
  (pageChange)="onPageChange($event)"
/>
\`\`\`

### GxPaginationPerPage

每頁數量選擇器。

\`\`\`typescript
import { GxPaginationPerPage } from '@sanring/gx-pagination';

<gx-pagination-per-page
  name="per-page"
  [(perPage)]="pageSize"
  [perPageOptions]="[10, 20, 50]"
  (perPageChange)="onPerPageChange($event)"
/>
\`\`\`

## 樣式自訂

所有組件都支援 CSS 變數自訂：

\`\`\`css
:root {
  /* 按鈕 */
  --gx-pagination-button-color: #374151;
  --gx-pagination-button-bg: #ffffff;
  --gx-pagination-button-border: #d1d5db;
  
  /* 懸停狀態 */
  --gx-pagination-button-hover-bg: #f3f4f6;
  
  /* 當前頁 */
  --gx-pagination-active-color: #ffffff;
  --gx-pagination-active-bg: #3b82f6;
}
\`\`\`

## 與 @sanring/gx-table 整合

\`\`\`typescript
import { GxPagination } from '@sanring/gx-pagination';
import { GxTableShell, TableService } from '@sanring/gx-table';

@Component({
  template: \`
    <gx-table-shell>
      <thead gx-table-header [columns]="columns"></thead>
      <tbody gx-table-body [data]="pagedData()"></tbody>
      
      <div footer>
        <gx-pagination
          [currentPageInput]="currentPage"
          [pageSizeInput]="pageSize"
          [totalItemsInput]="totalItems"
          (pageChange)="onPageChange($event)"
        />
      </div>
    </gx-table-shell>
  \`
})
export class TableWithPaginationComponent {
  // ...
}
\`\`\`

## 版本要求

- Angular >= 20.0.0
- TypeScript >= 5.8.0

## 授權

MIT

## 相關連結

- [GitHub Repository](https://github.com/jack755051/gxcella)
- [NPM Package](https://www.npmjs.com/package/@sanring/gx-pagination)
- [@sanring/gx-table](https://www.npmjs.com/package/@sanring/gx-table)
- [問題回報](https://github.com/jack755051/gxcella/issues)
