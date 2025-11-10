// ==================== gx-table 實際使用方式 ====================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GxTableShell,
  GxTableHeader,
  GxTableBody,
  GxTableEmptyState,
  TableService,
  TableColumn
} from '@sanring/gx-table';
import { GxPagination } from '@sanring/gx-pagination';

// ==================== 使用場景 1: 最簡單的方式（直接組合組件） ====================

/**
 * 基礎用法：直接使用組件組合
 * 不需要 Model，不需要 Mapper，直接組合
 */
@Component({
  selector: 'app-simple-table',
  standalone: true,
  imports: [
    CommonModule,
    GxTableShell,
    GxTableHeader,
    GxTableBody,
  ],
  providers: [TableService],
  template: `
    <gx-table-shell [isEmpty]="data().length === 0">
      <table>
        <!-- 表頭 -->
        <gx-table-header
          [columns]="columns"
          [sortConfig]="tableService.state().sortConfig"
          (sort)="tableService.handleSort($event)">
        </gx-table-header>

        <!-- 表格主體 -->
        <gx-table-body
          [data]="tableService.sortedData()"
          [columns]="columns">
        </gx-table-body>
      </table>
    </gx-table-shell>
  `
})
export class SimpleTableComponent {
  // 資料
  data = signal([
    { id: '1', name: 'John', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'User' }
  ]);

  // 欄位定義
  columns: TableColumn[] = [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: '角色' }
  ];

  constructor(public tableService: TableService) {
    // 初始化 TableService
    tableService.initialize({
      data: this.data,
      columns: this.columns,
    });
  }
}

// ==================== 使用場景 2: 組合 + 選擇功能 ====================

/**
 * 帶選擇功能：添加 selectable 相關配置
 */
@Component({
  selector: 'app-selectable-table',
  standalone: true,
  imports: [CommonModule, GxTableShell, GxTableHeader, GxTableBody],
  providers: [TableService],
  template: `
    <gx-table-shell [isEmpty]="data().length === 0">
      <table>
        <!-- 表頭（帶 checkbox） -->
        <gx-table-header
          [columns]="columns"
          [sortConfig]="tableService.state().sortConfig"
          [selectable]="true"
          [isAllSelected]="tableService.isAllSelected()"
          [isIndeterminate]="tableService.isIndeterminate()"
          (sort)="tableService.handleSort($event)"
          (toggleSelectAll)="tableService.toggleSelectAll()">
        </gx-table-header>

        <!-- 表格主體（帶 checkbox） -->
        <gx-table-body
          [data]="tableService.sortedData()"
          [columns]="columns"
          [selectable]="true"
          [selectedIds]="tableService.state().selectedIds"
          (selectRow)="tableService.toggleSelectRow($event)">
        </gx-table-body>
      </table>
    </gx-table-shell>

    <!-- 顯示選擇狀態 -->
    <div class="selection-info">
      已選擇: {{ tableService.selectedCount() }} 筆
    </div>
  `
})
export class SelectableTableComponent {
  data = signal([
    { id: '1', name: 'Product A', price: 100, stock: 50 },
    { id: '2', name: 'Product B', price: 200, stock: 0 },
  ]);

  columns: TableColumn[] = [
    { key: 'name', label: '產品名稱', sortable: true },
    { key: 'price', label: '價格', sortable: true },
    { key: 'stock', label: '庫存', sortable: true },
  ];

  constructor(public tableService: TableService) {
    tableService.initialize({
      data: this.data,
      columns: this.columns,
      idKey: 'id',
      disabledPredicate: (row) => row.stock === 0, // 無庫存的產品無法選擇
    });
  }
}

// ==================== 使用場景 3: 組合 + Toolbar + Footer ====================

/**
 * 完整組合：Toolbar + Table + Pagination
 */
@Component({
  selector: 'app-full-table',
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
    <gx-table-shell
      [isEmpty]="data().length === 0"
      [maxHeight]="'600px'">

      <!-- Toolbar（自定義插槽） -->
      <div toolbar class="table-toolbar">
        <h2>員工管理</h2>
        <div class="actions">
          <button (click)="addEmployee()">新增員工</button>
          <button (click)="exportData()">匯出</button>
        </div>
      </div>

      <table>
        <!-- 表頭 -->
        <gx-table-header
          [columns]="columns"
          [sortConfig]="tableService.state().sortConfig"
          [selectable]="true"
          [isAllSelected]="tableService.isAllSelected()"
          [isIndeterminate]="tableService.isIndeterminate()"
          (sort)="tableService.handleSort($event)"
          (toggleSelectAll)="tableService.toggleSelectAll()">
        </gx-table-header>

        <!-- 表格主體 -->
        <gx-table-body
          [data]="currentPageData()"
          [columns]="columns"
          [selectable]="true"
          [selectedIds]="tableService.state().selectedIds"
          [isRowDisabled]="tableService.isRowDisabled.bind(tableService)"
          (selectRow)="tableService.toggleSelectRow($event)">
        </gx-table-body>
      </table>

      <!-- Footer - Pagination -->
      <div footer>
        <gx-pagination
          [currentPageInput]="currentPage()"
          [pageSizeInput]="pageSize()"
          [totalItemsInput]="totalItems()"
          (pageChange)="onPageChange($event)">
        </gx-pagination>
      </div>

      <!-- Empty State（自定義插槽） -->
      <div empty>
        <gx-table-empty-state
          [title]="'暫無員工資料'"
          [description]="'點擊「新增員工」按鈕來新增第一位員工'">
        </gx-table-empty-state>
      </div>
    </gx-table-shell>
  `,
  styles: [`
    .table-toolbar {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class FullTableComponent {
  // 所有資料
  allData = signal([
    { id: '1', name: 'Alice', email: 'alice@company.com', status: 'active' },
    { id: '2', name: 'Bob', email: 'bob@company.com', status: 'inactive' },
    // ... 更多資料
  ]);

  // 分頁狀態
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(100);

  // 當前頁資料（計算屬性）
  currentPageData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.tableService.sortedData().slice(start, end);
  });

  columns: TableColumn[] = [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: '狀態' },
  ];

  constructor(public tableService: TableService) {
    tableService.initialize({
      data: this.allData,
      columns: this.columns,
      idKey: 'id',
      disabledPredicate: (row) => row.status === 'inactive',
    });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.currentPage);
  }

  addEmployee() {
    console.log('Add employee');
  }

  exportData() {
    const selected = this.tableService.getSelectedRows();
    console.log('Export:', selected);
  }
}

// ==================== 使用場景 4: 組合 + 自定義欄位（按鈕） ====================

/**
 * 自定義欄位渲染：在 TableBody 中使用 ng-template
 */
@Component({
  selector: 'app-custom-column-table',
  standalone: true,
  imports: [CommonModule, GxTableShell, GxTableHeader, GxTableBody, GxTableRow, GxTableCell],
  providers: [TableService],
  template: `
    <gx-table-shell [isEmpty]="data().length === 0">
      <table>
        <!-- 表頭 -->
        <gx-table-header
          [columns]="columns"
          [sortConfig]="tableService.state().sortConfig"
          (sort)="tableService.handleSort($event)">
        </gx-table-header>

        <!-- 自定義表格主體 -->
        <tbody>
          @for (row of tableService.sortedData(); track row.id) {
            <gx-table-row [row]="row" [columns]="columns">
              <!-- 自定義每個欄位 -->
              @for (column of columns; track column.key) {
                <gx-table-cell [column]="column" [row]="row">
                  @if (column.key === 'actions') {
                    <!-- 自定義動作欄位 -->
                    <div class="actions">
                      <button
                        class="btn-info"
                        (click)="viewOrder(row)">
                        查看
                      </button>
                      <button
                        class="btn-warning"
                        (click)="editOrder(row)"
                        [disabled]="row.status === 'completed'">
                        編輯
                      </button>
                      <button
                        class="btn-error"
                        (click)="cancelOrder(row)"
                        [disabled]="row.status === 'cancelled'">
                        取消
                      </button>
                    </div>
                  } @else {
                    <!-- 預設顯示 -->
                    {{ row[column.key] }}
                  }
                </gx-table-cell>
              }
            </gx-table-row>
          }
        </tbody>
      </table>
    </gx-table-shell>
  `,
  styles: [`
    .actions {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class CustomColumnTableComponent {
  data = signal([
    { id: 'o1', orderNumber: 'ORD-001', customer: 'John', status: 'pending' },
    { id: 'o2', orderNumber: 'ORD-002', customer: 'Jane', status: 'completed' },
  ]);

  columns: TableColumn[] = [
    { key: 'orderNumber', label: '訂單編號', sortable: true },
    { key: 'customer', label: '客戶' },
    { key: 'status', label: '狀態' },
    { key: 'actions', label: '操作', align: 'center' },
  ];

  constructor(public tableService: TableService) {
    tableService.initialize({
      data: this.data,
      columns: this.columns,
    });
  }

  viewOrder(row: any) {
    console.log('View order:', row);
  }

  editOrder(row: any) {
    console.log('Edit order:', row);
  }

  cancelOrder(row: any) {
    console.log('Cancel order:', row);
  }
}

// ==================== 使用場景 5: 結合 Model + Mapper（進階用法） ====================

import { TableModelMapper, FullTableModel } from './table-model-mapper-pattern';

/**
 * 進階用法：使用 Model + Mapper
 * 當需要複雜的業務邏輯或支援多 UI 框架時使用
 */
@Component({
  selector: 'app-model-based-table',
  standalone: true,
  imports: [CommonModule, GxTableShell, GxTableHeader, GxTableBody],
  providers: [TableService],
  template: `
    <gx-table-shell [isEmpty]="tableUI.data().length === 0">
      <table>
        <gx-table-header
          [columns]="tableUI.columns"
          [sortConfig]="tableService.state().sortConfig"
          [selectable]="tableUI.selectable"
          [isAllSelected]="tableService.isAllSelected()"
          [isIndeterminate]="tableService.isIndeterminate()"
          (sort)="tableService.handleSort($event)"
          (toggleSelectAll)="tableService.toggleSelectAll()">
        </gx-table-header>

        <gx-table-body
          [data]="tableService.sortedData()"
          [columns]="tableUI.columns"
          [selectable]="tableUI.selectable"
          [selectedIds]="tableService.state().selectedIds"
          [isRowDisabled]="tableService.isRowDisabled.bind(tableService)"
          (selectRow)="tableService.toggleSelectRow($event)">
        </gx-table-body>
      </table>
    </gx-table-shell>
  `
})
export class ModelBasedTableComponent {
  // 1. 定義純業務模型（可從 API、Service 獲取）
  private employeeModel: FullTableModel<any> = {
    id: 'employee-table',
    data: [
      { id: 'e1', name: 'Alice', email: 'alice@company.com', status: 'active' },
    ],
    columns: [
      { field: 'name', header: '姓名', sortable: true },
      { field: 'email', header: 'Email', sortable: true },
      { field: 'status', header: '狀態' },
    ],
    features: {
      selectable: true,
      sortable: true,
    },
    rules: {
      canSelect: (row) => row.status !== 'inactive',
    },
  };

  // 2. 使用 Mapper 轉換為 UI 配置
  tableUI = TableModelMapper.toTableWithFullFeatures(this.employeeModel);

  constructor(public tableService: TableService) {
    // 3. 初始化 TableService
    tableService.initialize({
      data: this.tableUI.data,
      columns: this.tableUI.columns,
      idKey: 'id',
      disabledPredicate: this.tableUI.disabledPredicate,
    });
  }
}

// ==================== 總結：gx-table 的使用方式 ====================

/**
 * gx-table 的核心設計理念：組合式組件
 *
 * ✅ 優點：
 * 1. 靈活：像樂高積木一樣組合
 * 2. 可控：每個組件都可以單獨配置
 * 3. 漸進式：從簡單到複雜，逐步添加功能
 * 4. 可擴展：可以自定義任何部分
 *
 * 📦 基礎組件：
 * - GxTableShell    : 容器（提供 toolbar、footer、empty 插槽）
 * - GxTableHeader   : 表頭（支援排序、全選）
 * - GxTableBody     : 表格主體（渲染資料行）
 * - GxTableRow      : 單一資料行
 * - GxTableCell     : 單個儲存格
 * - GxTableEmptyState: 空狀態
 *
 * 🔧 輔助服務：
 * - TableService    : 狀態管理（排序、選擇）
 *
 * 🎯 使用模式：
 *
 * 1️⃣ 簡單場景：直接組合組件
 *    → 不需要 Model，不需要 Mapper
 *    → 適合：簡單列表、快速開發
 *
 * 2️⃣ 中等場景：組合 + 功能配置
 *    → 添加 selectable、sortable 等配置
 *    → 適合：需要選擇、排序、分頁的場景
 *
 * 3️⃣ 複雜場景：組合 + 自定義渲染
 *    → 使用 ng-template 自定義欄位
 *    → 適合：需要按鈕、圖片、自定義元素
 *
 * 4️⃣ 進階場景：Model + Mapper + 組合
 *    → 分離業務邏輯和 UI
 *    → 適合：複雜業務、多 UI 框架、高度可測試
 *
 * 🌟 核心原則：
 * "組件只提供基礎能力，使用者通過組合創造價值"
 */

// ==================== 實際項目範例 ====================

/**
 * 真實場景：產品管理頁面
 */
@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    GxTableShell,
    GxTableHeader,
    GxTableBody,
    GxPagination,
  ],
  providers: [TableService],
  template: `
    <div class="page-container">
      <h1>產品管理</h1>

      <gx-table-shell
        [isEmpty]="products().length === 0"
        [maxHeight]="'calc(100vh - 300px)'">

        <!-- Toolbar -->
        <div toolbar class="toolbar">
          <div class="toolbar-left">
            <input
              type="text"
              placeholder="搜尋產品..."
              (input)="onSearch($event)">
            <select (change)="onCategoryChange($event)">
              <option value="">所有分類</option>
              <option value="electronics">電子產品</option>
              <option value="clothing">服飾</option>
            </select>
          </div>
          <div class="toolbar-right">
            <button (click)="addProduct()">新增產品</button>
            <button
              (click)="deleteSelected()"
              [disabled]="!tableService.hasSelection()">
              刪除所選 ({{ tableService.selectedCount() }})
            </button>
            <button (click)="exportProducts()">匯出</button>
          </div>
        </div>

        <table>
          <!-- 表頭 -->
          <gx-table-header
            [columns]="columns"
            [sortConfig]="tableService.state().sortConfig"
            [selectable]="true"
            [isAllSelected]="tableService.isAllSelected()"
            [isIndeterminate]="tableService.isIndeterminate()"
            (sort)="onSort($event)"
            (toggleSelectAll)="tableService.toggleSelectAll()">
          </gx-table-header>

          <!-- 表格主體 -->
          <gx-table-body
            [data]="displayedProducts()"
            [columns]="columns"
            [selectable]="true"
            [selectedIds]="tableService.state().selectedIds"
            [isRowDisabled]="isProductDisabled"
            (selectRow)="tableService.toggleSelectRow($event)">
          </gx-table-body>
        </table>

        <!-- Pagination -->
        <div footer>
          <gx-pagination
            [currentPageInput]="pagination.currentPage()"
            [pageSizeInput]="pagination.pageSize()"
            [totalItemsInput]="pagination.totalItems()"
            (pageChange)="onPageChange($event)"
            (pageSizeChange)="onPageSizeChange($event)">
          </gx-pagination>
        </div>

        <!-- Empty State -->
        <div empty>
          <gx-table-empty-state
            [title]="'暫無產品'"
            [description]="'點擊「新增產品」按鈕來新增第一個產品'">
          </gx-table-empty-state>
        </div>
      </gx-table-shell>
    </div>
  `
})
export class ProductManagementComponent {
  // 原始資料（來自 API）
  products = signal<Product[]>([]);

  // 顯示資料（經過篩選、排序、分頁）
  displayedProducts = computed(() => {
    return this.tableService.sortedData();
  });

  // 分頁狀態
  pagination = {
    currentPage: signal(1),
    pageSize: signal(10),
    totalItems: signal(0),
  };

  // 欄位定義
  columns: TableColumn[] = [
    { key: 'name', label: '產品名稱', sortable: true, width: '200px' },
    { key: 'category', label: '分類', sortable: true, width: '120px' },
    { key: 'price', label: '價格', sortable: true, width: '100px', align: 'right' },
    { key: 'stock', label: '庫存', sortable: true, width: '100px', align: 'right' },
    { key: 'status', label: '狀態', width: '100px' },
  ];

  constructor(
    public tableService: TableService,
    private productService: ProductService
  ) {
    this.loadProducts();
  }

  async loadProducts() {
    const response = await this.productService.getProducts();
    this.products.set(response.data);
    this.pagination.totalItems.set(response.total);

    // 初始化 TableService
    this.tableService.initialize({
      data: this.products,
      columns: this.columns,
      idKey: 'id',
      disabledPredicate: this.isProductDisabled,
    });
  }

  isProductDisabled = (product: Product) => {
    return product.stock === 0; // 無庫存的產品無法選擇
  };

  onSort(key: string) {
    this.tableService.handleSort(key);
    // 如果是 API 排序，在這裡調用 API
  }

  onPageChange(event: any) {
    this.pagination.currentPage.set(event.currentPage);
    // 調用 API 載入新頁面資料
  }

  onPageSizeChange(size: number) {
    this.pagination.pageSize.set(size);
    this.pagination.currentPage.set(1);
    // 調用 API 載入資料
  }

  onSearch(event: any) {
    const keyword = event.target.value;
    // 實現搜尋邏輯
  }

  deleteSelected() {
    const selected = this.tableService.getSelectedRows();
    console.log('Delete products:', selected);
  }
}
