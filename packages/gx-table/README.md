# GX-Table

一個功能強大且靈活的 Angular 表格組件，提供排序、選擇、空狀態等完整功能。採用 Angular Standalone Components 架構實現，內建 Signal 狀態管理，適合用於資料列表、管理後台、報表展示等場景。

## ✅ 已完成的組件

### 核心組件
- ✅ `GxTableShell` - 表格容器（支援 toolbar、footer、empty state）
- ✅ `GxTableHeader` - 表頭（支援排序、全選）
- ✅ `GxTableHeaderCell` - 表頭單元格（支援排序指示器）
- ✅ `GxTableBody` - 表格主體（支援資料渲染、行選擇）
- ✅ `GxTableRow` - 表格行（支援選擇、禁用狀態）
- ✅ `GxTableCell` - 表格單元格（支援自定義內容）
- ✅ `GxTableEmptyState` - 空狀態顯示

### 服務
- ✅ `TableService` - 狀態管理服務（排序、選擇、禁用行）

### 類型定義
- ✅ `TableColumn` - 欄位配置介面
- ✅ `SortConfig` - 排序配置介面
- ✅ `TableState` - 表格狀態介面
- ✅ `SortEvent` - 排序事件介面
- ✅ `RowSelectEvent` - 行選擇事件介面

## 📦 安裝

```bash
npm install @sanring/gx-table
```

## 🎯 使用方式

### 基本範例（使用 TableService）

```typescript
import { Component, signal } from '@angular/core';
import {
  GxTableShell,
  GxTableHeader,
  GxTableBody,
  TableColumn,
  TableService
} from '@sanring/gx-table';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GxTableShell, GxTableHeader, GxTableBody],
  providers: [TableService],
  template: `
    <gx-table-shell [isEmpty]="data().length === 0">
      <table>
        <gx-table-header
          [columns]="columns"
          [sortConfig]="tableService.state().sortConfig"
          [selectable]="true"
          [isAllSelected]="tableService.isAllSelected()"
          [isIndeterminate]="tableService.isIndeterminate()"
          (sort)="tableService.handleSort($event)"
          (toggleSelectAll)="tableService.toggleSelectAll()">
        </gx-table-header>

        <gx-table-body
          [data]="tableService.sortedData()"
          [columns]="columns"
          [selectable]="true"
          [selectedIds]="tableService.state().selectedIds"
          (selectRow)="tableService.toggleSelectRow($event)">
        </gx-table-body>
      </table>
    </gx-table-shell>
  `
})
export class ExampleComponent {
  data = signal([
    { id: '1', name: 'John', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'User' }
  ]);

  columns: TableColumn[] = [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: '信箱', sortable: true, width: '200px' },
    { key: 'role', label: '角色', align: 'center' }
  ];

  constructor(public tableService: TableService) {
    // 初始化 TableService
    this.tableService.initialize({
      data: this.data,
      columns: this.columns,
    });
  }
}
```

### 帶 Toolbar 和 Footer

```typescript
template: `
  <gx-table-shell [isEmpty]="data.length === 0" maxHeight="500px">
    <!-- Toolbar -->
    <div toolbar>
      <h2>使用者列表</h2>
      <button>新增</button>
    </div>

    <!-- Table Header -->
    <gx-table-header
      [columns]="columns"
      [sortConfig]="sortConfig"
      (sort)="handleSort($event)">
    </gx-table-header>

    <!-- Table Body -->
    <gx-table-body
      [data]="tableService.sortedData()"
      [columns]="columns"
      [selectable]="true"
      [selectedIds]="tableService.state().selectedIds"
      (selectRow)="tableService.toggleSelectRow($event)">
    </gx-table-body>

    <!-- Footer -->
    <div footer>
      <pagination [page]="currentPage" (pageChange)="onPageChange($event)">
      </pagination>
    </div>

    <!-- Custom Empty State -->
    <div empty>
      <gx-table-empty-state
        [title]="'無資料'"
        [description]="'請新增第一筆資料'">
        <button action>新增資料</button>
      </gx-table-empty-state>
    </div>
  </gx-table-shell>
`
```

## 📖 API 文檔

### GxTableShell

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `isEmpty` | `boolean` | `false` | 是否顯示空狀態 |
| `maxHeight` | `string?` | `undefined` | 最大高度（如 '500px', '70vh'） |

**插槽：**
- `[toolbar]` - 工具列區域
- `[footer]` - 底部區域（分頁等）
- `[empty]` - 自定義空狀態

### GxTableHeader

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `columns` | `TableColumn[]` | **必填** | 欄位配置 |
| `sortConfig` | `SortConfig` | `{key:null, direction:'asc'}` | 排序配置 |
| `selectable` | `boolean` | `false` | 是否可選擇 |
| `isAllSelected` | `boolean` | `false` | 是否全選 |
| `isIndeterminate` | `boolean` | `false` | 是否部分選中 |

**事件：**
- `sort: EventEmitter<string>` - 排序事件
- `toggleSelectAll: EventEmitter<void>` - 全選切換事件

### GxTableBody

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `data` | `any[]` | **必填** | 表格資料 |
| `columns` | `TableColumn[]` | **必填** | 欄位配置 |
| `selectable` | `boolean` | `false` | 是否可選擇 |
| `selectedIds` | `string[]` | `[]` | 已選中的 ID 列表 |
| `idKey` | `string` | `'id'` | ID 欄位鍵值 |
| `isRowDisabled` | `(row: any) => boolean` | `undefined` | 判斷行是否禁用的函數 |

**事件：**
- `selectRow: EventEmitter<string>` - 行選擇事件

### GxTableRow

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `row` | `any` | **必填** | 行資料 |
| `columns` | `TableColumn[]` | **必填** | 欄位配置 |
| `selectable` | `boolean` | `false` | 是否可選擇 |
| `selected` | `boolean` | `false` | 是否已選中 |
| `disabled` | `boolean` | `false` | 是否禁用 |

**事件：**
- `select: EventEmitter<void>` - 選擇事件

### GxTableCell

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `column` | `TableColumn` | **必填** | 欄位配置 |
| `row` | `any` | **必填** | 行資料 |

**插槽：**
- 支援 ng-content 自定義內容

### TableService

**初始化方法：**
```typescript
initialize(options: TableServiceOptions): void
```

**TableServiceOptions：**
```typescript
interface TableServiceOptions<T = any> {
  data: WritableSignal<T[]> | Signal<T[]>;  // 表格資料
  columns: TableColumn[];                    // 欄位配置
  sortableColumns?: string[];                // 可排序的欄位
  idKey?: string;                            // ID 欄位鍵值
  disabledPredicate?: (row: T) => boolean;   // 判斷行是否禁用
  onSort?: (key: string, direction: 'asc' | 'desc') => void;  // API 排序回調
}
```

**狀態屬性（Signal）：**
- `state: WritableSignal<TableState>` - 表格狀態
- `sortedData: Signal<T[]>` - 排序後的資料
- `hasSelection: Signal<boolean>` - 是否有選擇
- `selectedCount: Signal<number>` - 已選數量
- `isAllSelected: Signal<boolean>` - 是否全選
- `isIndeterminate: Signal<boolean>` - 是否部分選中

**方法：**
- `handleSort(key: string): void` - 處理排序
- `toggleSelectAll(): void` - 全選/取消全選
- `toggleSelectRow(id: string): void` - 切換單行選擇
- `isRowDisabled(row: T): boolean` - 判斷行是否禁用
- `isRowSelected(id: string): boolean` - 判斷行是否已選中
- `getSelectedRows(): T[]` - 獲取已選中的資料
- `setSelectedIds(ids: string[]): void` - 設置選中的 ID
- `clearSelection(): void` - 清空選擇
- `reset(): void` - 重置狀態

### TableColumn 介面

```typescript
interface TableColumn {
  key: string;           // 欄位鍵值
  label: string;         // 欄位標籤
  sortable?: boolean;    // 是否可排序
  width?: string;        // 寬度（'100px', '20%'）
  minWidth?: string;     // 最小寬度
  maxWidth?: string;     // 最大寬度
  align?: 'left' | 'center' | 'right';  // 對齊方式
}
```

## 🎨 樣式自定義

使用 CSS 變數進行自定義：

```css
:root {
  /* 表格容器 */
  --gx-table-bg: #ffffff;
  --gx-table-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --gx-table-border-color: #e5e7eb;

  /* 表頭 */
  --gx-table-header-bg: #e6f8f9;
  --gx-table-header-text-color: #6b7280;
  --gx-table-header-hover-bg: rgba(0, 0, 0, 0.05);

  /* 排序圖標 */
  --gx-table-sort-icon-color: #9ca3af;
  --gx-table-sort-icon-active-color: #3b82f6;

  /* Checkbox */
  --gx-table-checkbox-border: #d1d5db;
  --gx-table-checkbox-color: #3b82f6;
  --gx-table-checkbox-focus: #3b82f6;

  /* 空狀態 */
  --gx-table-empty-icon-color: #9ca3af;
  --gx-table-empty-title-color: #111827;
  --gx-table-empty-description-color: #6b7280;
}
```

## 🔄 技術實現

本組件採用 Angular 18+ 的 Standalone Components 架構，提供現代化且高效能的表格解決方案。

### 組件架構

| 組件名稱 | 功能說明 |
|---------|---------|
| `GxTableShell` | 表格容器，管理整體佈局與空狀態 |
| `GxTableHeader` | 表頭組件，支援排序與全選功能 |
| `GxTableHeaderCell` | 表頭單元格，提供排序指示器 |
| `GxTableBody` | 表格主體，處理資料渲染與行選擇 |
| `GxTableRow` | 表格行，支援選擇與禁用狀態 |
| `GxTableCell` | 表格單元格，支援自定義內容 |
| `GxTableEmptyState` | 空狀態顯示組件 |
| `TableService` | 狀態管理服務，統一管理排序與選擇 |

### 核心特點
- **響應式狀態管理**：完全使用 Angular Signals，提供高效能的資料響應
- **模組化設計**：靈活的組件結構，支援自由組合與客製化
- **內建服務層**：提供 `TableService` 統一管理表格狀態（排序、選擇等）
- **豐富的插槽系統**：支援自定義 toolbar、footer、empty state 等區塊
- **無障礙支援**：遵循 ARIA 標準，提升可用性
- **TypeScript 類型安全**：完整的類型定義，提供更好的開發體驗

## 🛠️ 開發

```bash
# 構建
npm run build

# 查看生成的文件
ls -la dist/gx-table
```

## 🤝 貢獻

歡迎提交 Issue 與 Pull Request 來改進組件功能！
