# GX-Table 組件生成說明

## 已創建的組件

### ✅ 核心類型
- `model/table.types.ts` - 所有 TypeScript 類型定義

### ✅ 已完成的組件
1. **gx-table-shell** - 主容器組件
2. **gx-table-empty-state** - 空狀態組件
3. **gx-table-header** - 表頭組件

### ⏳ 需要補充的組件

由於回應長度限制，以下組件請使用創建腳本生成：

```bash
cd /Users/charlie010583/Desktop/01_private/gxcella

# 創建剩餘組件
./scripts/create-component.sh gx-table table-header-cell
./scripts/create-component.sh gx-table table-body
./scripts/create-component.sh gx-table table-row
./scripts/create-component.sh gx-table table-cell
```

然後參考 Vue 版本的實現填充邏輯。

## 完整的使用範例

```typescript
// app.component.ts
import { Component } from '@angular/core';
import {
  GxTableShell,
  GxTableHeader,
  GxTableBody,
  GxTableRow,
  GxTableCell,
  TableColumn
} from '@sanring/gx-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GxTableShell,
    GxTableHeader,
    GxTableBody,
    GxTableRow,
    GxTableCell
  ],
  template: `
    <gx-table-shell [isEmpty]="data.length === 0">
      <!-- Toolbar -->
      <div toolbar>
        <h2>使用者列表</h2>
      </div>

      <!-- Table -->
      <gx-table-header
        [columns]="columns"
        [selectable]="true"
        [sortConfig]="sortConfig"
        (sort)="onSort($event)"
        (toggleSelectAll)="onToggleSelectAll()">
      </gx-table-header>

      <gx-table-body
        [data]="data"
        [columns]="columns"
        [selectable]="true"
        [selectedIds]="selectedIds"
        (selectRow)="onSelectRow($event)">
      </gx-table-body>

      <!-- Footer -->
      <div footer>
        <pagination></pagination>
      </div>
    </gx-table-shell>
  `
})
export class AppComponent {
  columns: TableColumn[] = [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: '信箱', sortable: true },
    { key: 'role', label: '角色', align: 'center' }
  ];

  data = [
    { id: '1', name: 'John', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'User' }
  ];

  sortConfig = { key: null, direction: 'asc' as const };
  selectedIds: string[] = [];

  onSort(key: string) {
    // 處理排序
  }

  onToggleSelectAll() {
    // 處理全選
  }

  onSelectRow(id: string) {
    // 處理行選擇
  }
}
```

## 下一步

1. 使用腳本生成剩餘組件
2. 參考 TPI 項目的 Vue 實現填充邏輯
3. 測試構建
4. 創建完整的使用文檔
