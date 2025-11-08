# GX-Pagination

一個功能完整且高度客製化的 Angular 分頁組件，提供直觀的分頁導航體驗。採用 Angular Standalone Components 架構實現，內建 Signal 狀態管理，適合用於資料列表、搜尋結果、報表展示等場景。

## ✅ 已完成的組件

### 核心組件
- ✅ `GxPagination` - 分頁導航組件（支援頁碼、首尾頁、上下頁、頁面大小選擇）

### 類型定義
- ✅ `PaginationConfig` - 分頁配置介面
- ✅ `PageChangeEvent` - 頁面變更事件
- ✅ `PaginationCustomClass` - 自定義樣式介面
- ✅ `PaginationLabels` - 國際化標籤介面

## 📦 安裝

```bash
npm install @sanring/gx-pagination
```

## 🎯 使用方式

### 基本範例

```typescript
import { Component, signal } from '@angular/core';
import { GxPagination, PageChangeEvent } from '@sanring/gx-pagination';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GxPagination],
  template: `
    <gx-pagination
      [currentPageInput]="currentPage()"
      [pageSizeInput]="pageSize()"
      [totalItemsInput]="totalItems()"
      (pageChange)="onPageChange($event)">
    </gx-pagination>
  `
})
export class ExampleComponent {
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(100);

  onPageChange(event: PageChangeEvent) {
    console.log('Page changed:', event);
    this.currentPage.set(event.currentPage);
    // 載入新的資料
  }
}
```

### 使用 Config 物件

```typescript
import { Component, signal } from '@angular/core';
import { GxPagination, PaginationConfig } from '@sanring/gx-pagination';

@Component({
  selector: 'app-config-example',
  standalone: true,
  imports: [GxPagination],
  template: `
    <gx-pagination
      [config]="paginationConfig()"
      (pageChange)="onPageChange($event)">
    </gx-pagination>
  `
})
export class ConfigExampleComponent {
  paginationConfig = signal<Partial<PaginationConfig>>({
    currentPage: 1,
    pageSize: 20,
    totalItems: 200,
    maxVisiblePages: 7,
    showFirstLast: true,
    showPrevNext: true,
    showPageNumbers: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50, 100],
    disabled: false,
  });

  onPageChange(event: PageChangeEvent) {
    console.log('Current page:', event.currentPage);
    console.log('Page size:', event.pageSize);
    console.log('Total pages:', event.totalPages);
  }
}
```

### 完整功能範例

```typescript
import { Component, signal } from '@angular/core';
import { GxPagination, PaginationLabels } from '@sanring/gx-pagination';

@Component({
  selector: 'app-full-example',
  standalone: true,
  imports: [GxPagination],
  template: `
    <div class="data-list">
      <!-- 顯示資料 -->
      @for (item of currentPageData(); track item.id) {
        <div class="data-item">{{ item.name }}</div>
      }
    </div>

    <gx-pagination
      [currentPageInput]="currentPage()"
      [pageSizeInput]="pageSize()"
      [totalItemsInput]="totalItems()"
      [showInfo]="true"
      [labels]="customLabels()"
      [config]="{
        showFirstLast: true,
        showPrevNext: true,
        showPageNumbers: true,
        showPageSize: true,
        maxVisiblePages: 5,
        pageSizeOptions: [10, 25, 50, 100]
      }"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)">
    </gx-pagination>
  `
})
export class FullExampleComponent {
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(250);

  allData = signal([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    // ... 更多資料
  ]);

  customLabels = signal<PaginationLabels>({
    first: '首頁',
    previous: '上一頁',
    next: '下一頁',
    last: '末頁',
    page: '頁',
    of: '共',
    items: '筆',
    itemsPerPage: '每頁顯示：',
  });

  currentPageData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.allData().slice(start, end);
  });

  onPageChange(event: PageChangeEvent) {
    this.currentPage.set(event.currentPage);
    // 載入資料或更新 UI
  }

  onPageSizeChange(newSize: number) {
    console.log('Page size changed to:', newSize);
    this.pageSize.set(newSize);
    // 重新載入資料
  }
}
```

### 自定義樣式

```typescript
@Component({
  template: `
    <gx-pagination
      [currentPageInput]="1"
      [pageSizeInput]="10"
      [totalItemsInput]="100"
      [customClass]="{
        container: 'my-pagination',
        nav: 'my-pagination-nav',
        list: 'my-pagination-list',
        item: 'my-pagination-item',
        link: 'my-pagination-link',
        active: 'my-active',
        disabled: 'my-disabled',
        ellipsis: 'my-ellipsis',
        pageSize: 'my-page-size',
        info: 'my-info'
      }">
    </gx-pagination>
  `,
  styles: [`
    .my-pagination {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
    }

    .my-pagination-link.my-active {
      background: #10b981;
      border-color: #10b981;
    }

    .my-pagination-link:hover:not(:disabled) {
      background: #d1fae5;
    }
  `]
})
export class CustomStyledPaginationComponent {
  // ...
}
```

## 📖 API 文檔

### GxPagination

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `config` | `Partial<PaginationConfig>` | `undefined` | 完整的分頁配置物件 |
| `currentPageInput` | `number` | `1` | 當前頁碼 |
| `pageSizeInput` | `number` | `10` | 每頁顯示數量 |
| `totalItemsInput` | `number` | `0` | 總資料筆數 |
| `customClass` | `PaginationCustomClass` | `undefined` | 自定義樣式類別 |
| `labels` | `PaginationLabels` | 預設英文標籤 | 國際化標籤 |
| `showInfo` | `boolean` | `false` | 是否顯示資訊文字 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `pageChange` | `EventEmitter<PageChangeEvent>` | 頁面變更事件 |
| `pageSizeChange` | `EventEmitter<number>` | 頁面大小變更事件 |

### PaginationConfig 介面

```typescript
interface PaginationConfig {
  currentPage: number;           // 當前頁碼
  pageSize: number;              // 每頁顯示數量
  totalItems: number;            // 總資料筆數
  maxVisiblePages?: number;      // 最多顯示幾個頁碼按鈕（預設：5）
  showFirstLast?: boolean;       // 是否顯示首尾頁按鈕（預設：true）
  showPrevNext?: boolean;        // 是否顯示上下頁按鈕（預設：true）
  showPageNumbers?: boolean;     // 是否顯示頁碼按鈕（預設：true）
  showPageSize?: boolean;        // 是否顯示頁面大小選擇器（預設：false）
  pageSizeOptions?: number[];    // 頁面大小選項（預設：[10, 25, 50, 100]）
  disabled?: boolean;            // 是否禁用所有按鈕（預設：false）
}
```

### PageChangeEvent 介面

```typescript
interface PageChangeEvent {
  currentPage: number;    // 當前頁碼
  pageSize: number;       // 每頁顯示數量
  totalPages: number;     // 總頁數
  totalItems: number;     // 總資料筆數
}
```

### PaginationCustomClass 介面

```typescript
interface PaginationCustomClass {
  container?: string;     // 容器樣式
  nav?: string;          // 導航區樣式
  list?: string;         // 列表樣式
  item?: string;         // 項目樣式
  link?: string;         // 連結/按鈕樣式
  active?: string;       // 啟用狀態樣式
  disabled?: string;     // 禁用狀態樣式
  ellipsis?: string;     // 省略符號樣式
  pageSize?: string;     // 頁面大小選擇器樣式
  info?: string;         // 資訊文字樣式
}
```

### PaginationLabels 介面

```typescript
interface PaginationLabels {
  first?: string;         // 首頁按鈕文字（預設：'«'）
  previous?: string;      // 上一頁按鈕文字（預設：'‹'）
  next?: string;          // 下一頁按鈕文字（預設：'›'）
  last?: string;          // 末頁按鈕文字（預設：'»'）
  page?: string;          // 頁面文字（預設：'Page'）
  of?: string;            // 「共」文字（預設：'of'）
  items?: string;         // 項目單位文字（預設：'items'）
  itemsPerPage?: string;  // 每頁項目文字（預設：'Items per page:'）
}
```

## 🎨 樣式自定義

使用 CSS 變數進行自定義：

```css
:root {
  /* 字型 */
  --gx-pagination-font-family: system-ui, -apple-system, sans-serif;

  /* 間距 */
  --gx-pagination-gap: 0.25rem;
  --gx-pagination-button-size: 2.5rem;
  --gx-pagination-button-padding: 0.5rem 0.75rem;

  /* 字體大小 */
  --gx-pagination-button-font-size: 0.875rem;
  --gx-pagination-button-font-weight: 500;
  --gx-pagination-info-font-size: 0.875rem;
  --gx-pagination-page-size-font-size: 0.875rem;

  /* 按鈕顏色 */
  --gx-pagination-button-color: #374151;
  --gx-pagination-button-bg: transparent;
  --gx-pagination-button-hover-bg: #f3f4f6;
  --gx-pagination-button-hover-border: #9ca3af;

  /* 啟用狀態 */
  --gx-pagination-active-color: #ffffff;
  --gx-pagination-active-bg: #3b82f6;
  --gx-pagination-active-border: #3b82f6;

  /* 邊框 */
  --gx-pagination-border-color: #d1d5db;
  --gx-pagination-border-radius: 0.375rem;

  /* 其他元素 */
  --gx-pagination-info-color: #6b7280;
  --gx-pagination-ellipsis-color: #6b7280;
  --gx-pagination-page-size-color: #374151;
  --gx-pagination-select-bg: #ffffff;
}
```

## 🔄 技術實現

本組件採用 Angular 18+ 的 Standalone Components 架構。

### 核心特性
- **響應式狀態管理**：完全使用 Angular Signals，提供高效能的資料響應
- **智能頁碼顯示**：自動計算並顯示合適的頁碼範圍，避免過多按鈕
- **彈性配置**：支援多種配置方式，可顯示/隱藏各種元素
- **國際化支援**：所有文字標籤皆可自定義，支援多語言
- **完整的樣式系統**：提供 CSS 變數與自定義類別兩種方式客製化樣式
- **無障礙支援**：遵循 ARIA 標準，提升可用性

### 使用場景
- 資料表格分頁
- 搜尋結果分頁
- 文章列表分頁
- 產品目錄分頁
- 任何需要分頁導航的場景

## 🛠️ 開發

```bash
# 安裝依賴
cd packages/gx-pagination
npm install

# 構建
npm run build

# 查看生成的文件
ls -la ../../dist/gx-pagination
```

## 🤝 貢獻

歡迎提交 Issue 與 Pull Request 來改進組件功能！

## 📄 授權

MIT
