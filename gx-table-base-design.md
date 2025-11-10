# GxTableBase 設計建議

## 🎯 核心問題分析

### 您的需求
1. ✅ 做一個基礎的 `GxTableBase` 組件，整合所有子組件
2. ✅ 提供 `default` 模式（開箱即用）和 `custom` 模式（自由組合）
3. ✅ 統一資料格式入口

### 目前 gx-table 的設計理念
- ❌ **沒有預設的完整資料格式** - 故意設計成組合式
- ✅ 只提供基礎類型：`TableColumn`, `TableState`, `SortConfig`
- ✅ 鼓勵使用者自己組合組件

---

## 💡 建議方案

### ❌ 不建議：直接在 gx-table 套件內做 GxTableBase

**原因：**
1. 會違背 gx-table 的組合式設計理念
2. 會讓套件變得臃腫
3. 會降低靈活性

### ✅ 建議：在您的專案中創建包裝組件

**架構：**
```
@sanring/gx-table (套件)
└── 提供基礎組件 (GxTableShell, GxTableHeader, GxTableBody, TableService)

您的專案
├── shared/components/
│   └── gx-table-wrapper/  (您的包裝組件)
│       ├── gx-table-wrapper.component.ts
│       ├── gx-table-wrapper.types.ts
│       └── gx-table-wrapper.config.ts
```

---

## 🏗️ 實際設計方案

### 方案 1: 簡單包裝（推薦）

創建一個包裝組件，提供 `default` 和 `custom` 兩種模式：

#### 1. 類型定義

```typescript
// shared/components/gx-table-wrapper/gx-table-wrapper.types.ts

import { TableColumn } from '@sanring/gx-table';
import { Signal, WritableSignal } from '@angular/core';

/**
 * Table 渲染模式
 */
export type GxTableMode = 'default' | 'custom';

/**
 * 基礎 Table 配置
 */
export interface GxTableWrapperConfig<T = any> {
  /** 渲染模式 */
  mode?: GxTableMode;

  /** 欄位定義 */
  columns: TableColumn[];

  /** 資料源 */
  data: WritableSignal<T[]> | Signal<T[]>;

  /** ID 欄位鍵值 */
  idKey?: string;

  /** 功能配置 */
  features?: {
    /** 可選擇 */
    selectable?: boolean;
    /** 可排序 */
    sortable?: boolean;
    /** 顯示分頁 */
    pagination?: boolean;
    /** 顯示工具列 */
    toolbar?: boolean;
  };

  /** 工具列配置 */
  toolbar?: {
    title?: string;
    actions?: Array<{
      label: string;
      icon?: string;
      onClick: () => void;
    }>;
  };

  /** 分頁配置 */
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange?: (page: number) => void;
  };

  /** 空狀態配置 */
  emptyState?: {
    title?: string;
    description?: string;
  };

  /** 禁用行判斷 */
  disabledPredicate?: (row: T) => boolean;
}
```

#### 2. 包裝組件實現

```typescript
// shared/components/gx-table-wrapper/gx-table-wrapper.component.ts

import { Component, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GxTableShell,
  GxTableHeader,
  GxTableBody,
  GxTableEmptyState,
  TableService,
} from '@sanring/gx-table';
import { GxPagination } from '@sanring/gx-pagination';
import { GxTableWrapperConfig, GxTableMode } from './gx-table-wrapper.types';

@Component({
  selector: 'gx-table-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    GxTableShell,
    GxTableHeader,
    GxTableBody,
    GxTableEmptyState,
    GxPagination,
  ],
  providers: [TableService],
  template: `
    <!-- default 模式：完整預設 UI -->
    @if (config().mode === 'default' || !config().mode) {
      <gx-table-shell
        [isEmpty]="tableService.sortedData().length === 0"
        [maxHeight]="maxHeight()">

        <!-- Toolbar -->
        @if (config().features?.toolbar && config().toolbar) {
          <div toolbar class="gx-table-toolbar">
            <h2>{{ config().toolbar?.title }}</h2>
            <div class="toolbar-actions">
              @for (action of config().toolbar?.actions; track action.label) {
                <button (click)="action.onClick()">
                  {{ action.label }}
                </button>
              }
            </div>
          </div>
        }

        <table>
          <!-- Header -->
          <gx-table-header
            [columns]="config().columns"
            [sortConfig]="tableService.state().sortConfig"
            [selectable]="config().features?.selectable ?? false"
            [isAllSelected]="tableService.isAllSelected()"
            [isIndeterminate]="tableService.isIndeterminate()"
            (sort)="tableService.handleSort($event)"
            (toggleSelectAll)="tableService.toggleSelectAll()">
          </gx-table-header>

          <!-- Body -->
          <gx-table-body
            [data]="tableService.sortedData()"
            [columns]="config().columns"
            [selectable]="config().features?.selectable ?? false"
            [selectedIds]="tableService.state().selectedIds"
            [isRowDisabled]="tableService.isRowDisabled.bind(tableService)"
            (selectRow)="tableService.toggleSelectRow($event)">
          </gx-table-body>
        </table>

        <!-- Pagination -->
        @if (config().features?.pagination && config().pagination) {
          <div footer>
            <gx-pagination
              [currentPageInput]="config().pagination!.currentPage"
              [pageSizeInput]="config().pagination!.pageSize"
              [totalItemsInput]="config().pagination!.totalItems"
              (pageChange)="onPageChange($event)">
            </gx-pagination>
          </div>
        }

        <!-- Empty State -->
        <div empty>
          <gx-table-empty-state
            [title]="config().emptyState?.title ?? '暫無資料'"
            [description]="config().emptyState?.description ?? ''">
          </gx-table-empty-state>
        </div>
      </gx-table-shell>
    }

    <!-- custom 模式：投影插槽，完全自定義 -->
    @if (config().mode === 'custom') {
      <ng-content></ng-content>
    }
  `,
  styles: [`
    .gx-table-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .toolbar-actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class GxTableWrapper<T extends Record<string, any> = any> implements OnInit {
  /** Table 配置 */
  config = input.required<GxTableWrapperConfig<T>>();

  /** 最大高度 */
  maxHeight = input<string>('600px');

  /** 選擇變更事件 */
  selectionChange = output<{ selectedIds: string[]; selectedRows: T[] }>();

  /** 排序變更事件 */
  sortChange = output<{ key: string; direction: 'asc' | 'desc' }>();

  constructor(public tableService: TableService<T>) {}

  ngOnInit() {
    // 初始化 TableService
    this.tableService.initialize({
      data: this.config().data,
      columns: this.config().columns,
      idKey: this.config().idKey || 'id',
      disabledPredicate: this.config().disabledPredicate,
    });
  }

  onPageChange(event: any) {
    this.config().pagination?.onPageChange?.(event.currentPage);
  }
}
```

#### 3. 使用範例

```typescript
// ========================================
// 使用方式 1: default 模式（開箱即用）
// ========================================

import { Component, signal } from '@angular/core';
import { GxTableWrapper, GxTableWrapperConfig } from '@shared/components/gx-table-wrapper';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [GxTableWrapper],
  template: `
    <!-- ✅ 一行搞定！完整功能的 Table -->
    <gx-table-wrapper [config]="tableConfig" />
  `
})
export class EmployeeListComponent {
  data = signal([
    { id: '1', name: 'Alice', email: 'alice@company.com', status: 'active' },
    { id: '2', name: 'Bob', email: 'bob@company.com', status: 'inactive' },
  ]);

  tableConfig: GxTableWrapperConfig = {
    mode: 'default',  // ✅ default 模式

    columns: [
      { key: 'name', label: '姓名', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'status', label: '狀態' },
    ],

    data: this.data,

    features: {
      selectable: true,
      sortable: true,
      toolbar: true,
      pagination: true,
    },

    toolbar: {
      title: '員工列表',
      actions: [
        { label: '新增員工', onClick: () => console.log('Add') },
        { label: '匯出', onClick: () => console.log('Export') },
      ],
    },

    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 100,
      onPageChange: (page) => console.log('Page:', page),
    },

    disabledPredicate: (row) => row.status === 'inactive',
  };
}

// ========================================
// 使用方式 2: custom 模式（完全自定義）
// ========================================

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [GxTableWrapper, GxTableShell, GxTableHeader, GxTableBody],
  template: `
    <gx-table-wrapper [config]="tableConfig">
      <!-- ✅ 完全自定義：自由組合子組件 -->
      <gx-table-shell>
        <div toolbar>
          <h1>我的自定義 Toolbar</h1>
        </div>

        <table>
          <gx-table-header [columns]="tableConfig.columns" />
          <gx-table-body [data]="data()" [columns]="tableConfig.columns" />
        </table>
      </gx-table-shell>
    </gx-table-wrapper>
  `
})
export class CustomTableComponent {
  data = signal([...]);

  tableConfig: GxTableWrapperConfig = {
    mode: 'custom',  // ✅ custom 模式
    columns: [...],
    data: this.data,
  };
}
```

---

### 方案 2: 更進階的設計（可選）

如果您需要更複雜的功能，可以創建多個預設組合：

```typescript
// shared/components/gx-table-presets/

// 預設 1: 簡單列表
export class GxTableSimple {
  // 只有 Header + Body，無其他功能
}

// 預設 2: 可選擇列表
export class GxTableSelectable {
  // Header + Body + 選擇功能
}

// 預設 3: 完整功能列表
export class GxTableFull {
  // Header + Body + 選擇 + 排序 + 分頁 + Toolbar
}

// 預設 4: 完全自定義
export class GxTableCustom {
  // 只是包裝，所有子組件由使用者提供
}
```

---

## 🎯 最終建議

### ✅ 推薦做法

1. **在您的專案中創建 `GxTableWrapper` 組件**
   - 不要修改 `@sanring/gx-table` 套件
   - 在專案的 `shared/components` 創建包裝組件

2. **提供兩種模式**
   ```typescript
   mode: 'default' | 'custom'
   ```
   - `default`: 完整預設 UI（開箱即用）
   - `custom`: 投影插槽（完全自定義）

3. **統一資料格式**
   ```typescript
   interface GxTableWrapperConfig<T> {
     mode?: 'default' | 'custom';
     columns: TableColumn[];
     data: Signal<T[]>;
     features?: {...};
     toolbar?: {...};
     pagination?: {...};
   }
   ```

### ❌ 不建議做法

1. ❌ 在 `@sanring/gx-table` 套件內創建 `GxTableBase`
   - 會破壞組合式設計
   - 會增加套件複雜度
   - 會降低靈活性

2. ❌ 強制所有使用者使用統一格式
   - 會失去 gx-table 的最大優勢（靈活性）

---

## 📁 專案結構建議

```
your-project/
├── src/
│   ├── app/
│   │   └── shared/
│   │       └── components/
│   │           ├── gx-table-wrapper/
│   │           │   ├── gx-table-wrapper.component.ts  ✅ 包裝組件
│   │           │   ├── gx-table-wrapper.types.ts      ✅ 類型定義
│   │           │   └── index.ts
│   │           │
│   │           └── table-presets/  (可選)
│   │               ├── simple-table.component.ts
│   │               ├── selectable-table.component.ts
│   │               └── full-table.component.ts
│   │
│   └── features/
│       ├── employee/
│       │   └── employee-list.component.ts  ✅ 使用 GxTableWrapper
│       └── product/
│           └── product-list.component.ts   ✅ 使用 GxTableWrapper
```

---

## 🎨 完整範例

```typescript
// ========================================
// Step 1: 創建包裝組件
// ========================================
// src/app/shared/components/gx-table-wrapper/gx-table-wrapper.component.ts

import { Component, input } from '@angular/core';
import { GxTableShell, GxTableHeader, GxTableBody, TableService } from '@sanring/gx-table';

@Component({
  selector: 'gx-table-wrapper',
  standalone: true,
  imports: [GxTableShell, GxTableHeader, GxTableBody],
  providers: [TableService],
  template: `
    @if (mode() === 'default') {
      <gx-table-shell [isEmpty]="data().length === 0">
        <table>
          <gx-table-header
            [columns]="columns()"
            [sortConfig]="tableService.state().sortConfig"
            (sort)="tableService.handleSort($event)">
          </gx-table-header>
          <gx-table-body
            [data]="tableService.sortedData()"
            [columns]="columns()">
          </gx-table-body>
        </table>
      </gx-table-shell>
    }

    @if (mode() === 'custom') {
      <ng-content></ng-content>
    }
  `
})
export class GxTableWrapper<T extends Record<string, any>> {
  mode = input<'default' | 'custom'>('default');
  columns = input.required<TableColumn[]>();
  data = input.required<Signal<T[]>>();

  constructor(public tableService: TableService<T>) {
    effect(() => {
      this.tableService.initialize({
        data: this.data(),
        columns: this.columns(),
      });
    });
  }
}

// ========================================
// Step 2: 使用包裝組件
// ========================================

// 方式 1: default 模式
@Component({
  template: `
    <gx-table-wrapper
      [mode]="'default'"
      [columns]="columns"
      [data]="data">
    </gx-table-wrapper>
  `
})
export class SimpleUseComponent {
  data = signal([...]);
  columns: TableColumn[] = [...];
}

// 方式 2: custom 模式
@Component({
  template: `
    <gx-table-wrapper [mode]="'custom'" [columns]="columns" [data]="data">
      <!-- 完全自定義 -->
      <gx-table-shell>
        <div>我的自定義內容</div>
      </gx-table-shell>
    </gx-table-wrapper>
  `
})
export class CustomUseComponent {
  data = signal([...]);
  columns: TableColumn[] = [...];
}
```

---

## ✅ 總結

### 關鍵決策

| 問題 | 答案 |
|------|------|
| 是否在 gx-table 套件內做 GxTableBase？ | ❌ 不建議 |
| 在哪裡創建包裝組件？ | ✅ 您的專案 `shared/components` |
| 是否需要統一資料格式？ | ✅ 在包裝組件中定義 |
| mode 的選擇？ | ✅ `default` / `custom` |
| gx-table 的類型在哪？ | ✅ `table.types.ts`（只有基礎類型） |

### 最佳實踐

1. ✅ **保持 gx-table 套件的純粹性** - 只提供基礎組件
2. ✅ **在專案中創建包裝層** - 封裝常用模式
3. ✅ **提供兩種模式** - default（快速） + custom（靈活）
4. ✅ **統一但不強制** - 提供預設，允許覆蓋

這樣設計既保持了 gx-table 的靈活性，又提供了開箱即用的便利性！
