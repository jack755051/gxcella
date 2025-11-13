# @sanring/gx-table

完整、靈活且高效能的 Angular 表格組件庫，基於 Angular 20+ 和 Signal-based 架構。

## 特性

- ✅ **完全響應式**: 使用 Angular Signals 實現高效能狀態管理
- ✅ **模組化設計**: 可組合的子組件，靈活搭配使用
- ✅ **排序功能**: 內建客戶端排序，支援自訂排序邏輯
- ✅ **選擇功能**: 支援單選、多選、全選，可設定禁用行
- ✅ **空狀態**: 自訂空狀態顯示
- ✅ **固定表頭**: 支援表頭凍結和自訂高度
- ✅ **彈性佈局**: 支援固定和自動表格佈局
- ✅ **TypeScript**: 完整的類型定義
- ✅ **獨立組件**: 完全支援 Standalone API

## 安裝

\`\`\`bash
npm install @sanring/gx-table
# or
yarn add @sanring/gx-table
\`\`\`

## 快速開始

### 1. 基本使用

\`\`\`typescript
import { Component, signal } from '@angular/core';
import {
  GxTableShell,
  GxTableHeader,
  GxTableBody,
  TableColumn
} from '@sanring/gx-table';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [GxTableShell, GxTableHeader, GxTableBody],
  template: \`
    <gx-table-shell>
      <thead gx-table-header
        [columns]="columns"
        [sortConfig]="sortConfig()"
        (sort)="handleSort($event)"
      ></thead>

      <tbody gx-table-body
        [data]="data()"
        [columns]="columns"
      ></tbody>
    </gx-table-shell>
  \`
})
export class BasicTableComponent {
  columns: TableColumn[] = [
    { key: 'name', label: '姓名', sortable: true, width: '200px' },
    { key: 'email', label: '電子郵件', sortable: true },
    { key: 'role', label: '角色', align: 'center' }
  ];

  data = signal([
    { id: 1, name: '張三', email: 'zhang@example.com', role: 'Admin' },
    { id: 2, name: '李四', email: 'li@example.com', role: 'User' }
  ]);

  sortConfig = signal({ key: null, direction: 'asc' as const });

  handleSort(key: string) {
    const current = this.sortConfig();
    this.sortConfig.set({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    });
  }
}
\`\`\`

### 2. 使用 TableService（推薦）

\`\`\`typescript
import { Component, signal, effect } from '@angular/core';
import {
  GxTableShell,
  GxTableHeader,
  GxTableBody,
  TableService
} from '@sanring/gx-table';

@Component({
  selector: 'app-advanced-table',
  standalone: true,
  imports: [GxTableShell, GxTableHeader, GxTableBody],
  providers: [TableService],
  template: \`
    <gx-table-shell [isEmpty]="tableService.sortedData().length === 0">
      <thead gx-table-header
        [columns]="columns"
        [sortConfig]="tableService.state().sortConfig"
        [selectable]="true"
        [isAllSelected]="tableService.isAllSelected()"
        (sort)="tableService.handleSort($event)"
        (toggleSelectAll)="tableService.toggleSelectAll()"
      ></thead>

      <tbody gx-table-body
        [data]="tableService.sortedData()"
        [columns]="columns"
        [selectable]="true"
        [selectedIds]="tableService.state().selectedIds"
        (selectRow)="tableService.toggleSelectRow($event)"
      ></tbody>
    </gx-table-shell>
  \`
})
export class AdvancedTableComponent {
  columns = [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: '電子郵件', sortable: true }
  ];

  data = signal([/* 你的資料 */]);

  constructor(public tableService: TableService) {
    effect(() => {
      this.tableService.initialize({
        data: this.data,
        columns: this.columns,
        idKey: 'id'
      });
    });
  }
}
\`\`\`

## API 文件

### TableColumn

\`\`\`typescript
interface TableColumn {
  key: string;              // 欄位鍵值
  label: string;            // 欄位標籤
  sortable?: boolean;       // 是否可排序
  width?: string;           // 欄位寬度
  align?: 'left' | 'center' | 'right';  // 對齊方式
}
\`\`\`

### TableService 方法

- `initialize(options)` - 初始化服務
- `handleSort(key)` - 處理排序
- `toggleSelectAll()` - 切換全選
- `toggleSelectRow(id)` - 切換行選擇
- `clearSelection()` - 清除所有選擇

## 版本要求

- Angular >= 20.0.0
- TypeScript >= 5.8.0

## 授權

MIT
